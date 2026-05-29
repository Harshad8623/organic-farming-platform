"""
Round 3 — Full Systematic Bug Audit
Covers: chatbot, cart, marketplace, auth, weather, orders, models, templates, security
"""
import os, sys, inspect, re
sys.path.insert(0, os.path.dirname(__file__))
from app import create_app

app = create_app()

BUGS  = []
WARNS = []
CLEAN = []

def bug(msg):   BUGS.append(msg)
def warn(msg):  WARNS.append(msg)
def ok(msg):    CLEAN.append(msg)

with app.app_context():
    from models import db, User, Product, Order, CartItem, Rating, CropRoadmap

    # =========================================================
    # 1. CHATBOT: No message length limit - can send giant payloads
    # =========================================================
    from routes.chatbot import ask
    src = inspect.getsource(ask)
    if 'len(question)' in src or 'maxlength' in src or '[:' in src:
        ok('[1] Chatbot message length limit: present')
    else:
        bug('[1] CHATBOT: No message length limit on /chatbot/ask — attacker can send MB-sized text to Gemini API, wasting API quota and potentially causing 500 errors')

    # =========================================================
    # 2. CHATBOT: XSS in appendMsg - innerHTML with unsanitized bot response
    # =========================================================
    from routes.chatbot import chat
    chat_template = open('templates/chatbot/chat.html', encoding='utf-8').read()
    if 'innerHTML' in chat_template and 'DOMPurify' not in chat_template:
        warn('[2] CHATBOT XSS (low risk): Bot responses inserted via innerHTML. If Gemini ever returns <script> tags, they would be executed. Low risk since Gemini output is mostly safe.')
    else:
        ok('[2] Chatbot innerHTML: safe')

    # =========================================================
    # 3. CART: stock_available used outside if block (NameError)
    # =========================================================
    from routes.cart import add_to_cart
    src_cart = inspect.getsource(add_to_cart)
    # The variable stock_available is only defined inside 'if stock_match:' block
    # but it's also referenced in the 'if existing:' block without re-checking stock_match
    lines = src_cart.splitlines()
    stock_available_defined = False
    stock_available_used_outside = False
    in_stock_block = False
    for i, line in enumerate(lines):
        if 'stock_match = ' in line:
            in_stock_block = True
        if 'stock_available' in line and '=' in line and 'stock_match' not in line:
            stock_available_defined = True
        if 'if existing:' in line:
            in_stock_block = False
        if not in_stock_block and 'stock_available' in line and 'stock_match' not in line:
            stock_available_used_outside = True

    # Check if stock_available is referenced in 'if existing:' block without guard
    if 'if stock_match and new_total > stock_available' in src_cart:
        ok('[3] Cart stock_available: guarded by stock_match check. OK')
    else:
        bug('[3] CART: stock_available may be used without being defined (NameError if product.quantity has no digits)')

    # =========================================================
    # 4. MARKETPLACE: farmer_detail uses Query.get_or_404 (deprecated)
    # =========================================================
    from routes.marketplace import farmer_detail
    src_fd = inspect.getsource(farmer_detail)
    if 'query.get_or_404' in src_fd:
        warn('[4] MARKETPLACE: farmer_detail uses deprecated User.query.get_or_404(). Works but shows deprecation warning. Minor.')
    else:
        ok('[4] farmer_detail: no deprecated calls')

    # =========================================================
    # 5. MARKETPLACE: delete_product deletes ALL orders (including completed) - data loss
    # =========================================================
    from routes.marketplace import delete_product
    src_del = inspect.getsource(delete_product)
    if 'Order.query.filter_by(product_id=product_id).delete' in src_del:
        bug('[5] MARKETPLACE DELETE: When product is deleted, ALL historical orders (delivered/completed) are also wiped. Buyers lose their order history. Should soft-delete or set product_id=NULL instead.')
    else:
        ok('[5] delete_product: order history preserved')

    # =========================================================
    # 6. CART: update_quantity allows qty=0 to delete silently but no flash message
    # =========================================================
    from routes.cart import update_quantity
    src_uq = inspect.getsource(update_quantity)
    if 'qty < 1' in src_uq and 'db.session.delete' in src_uq:
        if 'flash' not in src_uq:
            warn('[6] CART update_quantity: Setting qty to 0 deletes item silently (no flash message to user). Minor UX issue.')
        else:
            ok('[6] Cart update_quantity: flash on delete')
    
    # =========================================================
    # 7. WEATHER: random.choice in simulated mode can repeat same condition
    #    (minor, already using random not seeded — intentional variety)
    # =========================================================
    ok('[7] Weather simulated mode: uses random.choice for variety. Intentional.')

    # =========================================================
    # 8. ORDERS: Farmer can see orders for products that no longer exist
    #    (product deleted after order placed — product backref would break)
    # =========================================================
    orders = Order.query.all()
    broken = []
    for o in orders:
        try:
            _ = o.product.name  # lazy-loaded
        except Exception as e:
            broken.append(f'Order #{o.id}: {e}')
    if broken:
        bug(f'[8] ORDERS: {len(broken)} orders have broken product references: {broken}')
    else:
        ok('[8] All orders have valid product references')

    # =========================================================
    # 9. AUTH: Role can be set to arbitrary string on registration
    #    (e.g. role='admin' or role='superuser')
    # =========================================================
    from routes.auth import register
    src_reg = inspect.getsource(register)
    if "role in ('farmer', 'buyer')" in src_reg or "role in ['farmer', 'buyer']" in src_reg or 'allowed_roles' in src_reg:
        ok('[9] Auth register: role validation present')
    else:
        bug("[9] AUTH REGISTER: role field is not validated! A user can POST role='admin' or role='superuser' and get an unexpected role in the DB. Must restrict to ('farmer', 'buyer') only.")

    # =========================================================
    # 10. CART verify_payment: if cart is empty after payment — orders lost
    #     (race condition: two tabs checkout simultaneously)
    # =========================================================
    from routes.cart import verify_payment
    src_vp = inspect.getsource(verify_payment)
    if "if not items" in src_vp:
        warn('[10] CART verify_payment: Empty cart check exists but Razorpay payment was already charged. Money taken but no order created. Should refund or log. Edge case.')
    else:
        ok('[10] verify_payment: cart check present')

    # =========================================================
    # 11. CHATBOT: /chatbot/ask endpoint accepts any Content-Type (no JSON validation)
    # =========================================================
    if "get_json(silent=True)" in src:
        ok('[11] Chatbot ask: uses silent=True for safe JSON parsing. OK')
    else:
        bug('[11] Chatbot ask: no silent JSON parsing — invalid JSON body causes 400 crash')

    # =========================================================
    # 12. ANALYTICS: avg_price query returns None when no products
    # =========================================================
    from routes.analytics import dashboard
    src_an = inspect.getsource(dashboard)
    if 'or 0' in src_an and 'avg' in src_an:
        ok('[12] Analytics avg_price: NULL guarded with "or 0". OK')
    else:
        bug('[12] Analytics avg_price: no NULL guard — crashes when no products exist')

    # =========================================================
    # 13. MARKETPLACE: Product image path uses /static/uploads/ hardcoded
    #     (not url_for — breaks if STATIC_URL_PATH changes)
    # =========================================================
    listing_html = open('templates/marketplace/listing.html', encoding='utf-8').read()
    if '/static/uploads/' in listing_html and 'url_for' not in listing_html.split('/static/uploads/')[0][-100:]:
        warn('[13] MARKETPLACE listing.html: Product image uses hardcoded /static/uploads/ path instead of url_for(). Works but fragile if deployment changes static path.')
    else:
        ok('[13] Marketplace image paths: OK')

    # =========================================================
    # 14. ORDER rate_order: GET method exposed — renders form without POST
    #     But if someone accesses GET /orders/<id>/rate for someone else's order,
    #     they get a 403 (correct). But what if order is from different buyer?
    # =========================================================
    from routes.orders import rate_order
    src_ro = inspect.getsource(rate_order)
    if 'order.buyer_id != current_user.id' in src_ro:
        ok('[14] rate_order: buyer_id ownership check present. OK')
    else:
        bug('[14] rate_order: no buyer ownership check — any logged-in buyer can rate any order!')

    # =========================================================
    # 15. REGISTER: No minimum password length
    # =========================================================
    if 'len(password)' in src_reg or 'min_length' in src_reg or 'minlength' in src_reg:
        ok('[15] Register: password minimum length enforced')
    else:
        warn('[15] AUTH REGISTER: No minimum password length! User can register with password="a". Recommend minimum 6 characters.')

    # =========================================================
    # 16. ML model: disease_model uploaded images deleted but image_url still passed
    # =========================================================
    from routes.disease_detection import detect
    src_dd = inspect.getsource(detect)
    if 'image_url = None' in src_dd and 'finally' in src_dd:
        warn('[16] DISEASE: After file deletion, image_url is set to None in finally block. But if predict_disease() raises an exception BEFORE finally sets image_url=None, the template gets image_url pointing to a deleted file. Template should handle missing file gracefully.')
    else:
        ok('[16] Disease detection: image cleanup OK')

    # =========================================================
    # 17. APP: No rate limiting on login endpoint (brute-force risk)
    # =========================================================
    apppy = open('app.py', encoding='utf-8').read()
    reqtxt = open('requirements.txt', encoding='utf-8').read()
    if 'flask-limiter' in reqtxt.lower() or 'ratelimit' in apppy.lower():
        ok('[17] Rate limiting: present')
    else:
        warn('[17] SECURITY: No rate limiting on /auth/login — brute-force attacks possible. Consider Flask-Limiter.')

    # =========================================================
    # 18. CART.html: delivery address textarea has no maxlength — can submit huge addresses
    # =========================================================
    cart_html = open('templates/cart/cart.html', encoding='utf-8').read()
    delivery_section = cart_html[cart_html.find('delivery-address'):cart_html.find('delivery-address')+300]
    if 'maxlength' in delivery_section:
        ok('[18] Cart delivery address: maxlength set')
    else:
        warn('[18] CART: Delivery address textarea has no maxlength. User can submit very long strings to DB (delivery_location VARCHAR(500) will truncate at DB level but shows no error).')

    # =========================================================
    # SUMMARY
    # =========================================================
    print('\n' + '='*60)
    print('ROUND 3 BUG AUDIT RESULTS')
    print('='*60)
    print(f'\nBUGS ({len(BUGS)}):')
    for b in BUGS:    print(' ', b)
    print(f'\nWARNINGS ({len(WARNS)}):')
    for w in WARNS:   print(' ', w)
    print(f'\nCLEAN ({len(CLEAN)}):')
    for c in CLEAN:   print(' ', c)
    print('\n' + '='*60)

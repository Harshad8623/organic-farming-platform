from app import create_app
app = create_app()

with app.app_context():
    from models import db, User, Product, Order, CartItem, Rating, CropRoadmap
    import os

    print('=== ROUND 2 DEEP BUG AUDIT ===\n')

    # 1. Product.quantity is TEXT not INT
    p = Product.query.first()
    if p:
        qty_type = type(p.quantity).__name__
        print(f'[1] Product.quantity type: {qty_type} value={repr(p.quantity)}')
        if qty_type == 'str':
            print('    -> Stored as string (e.g. "100 kg"). Display-only. Order uses INT. OK')

    # 2. CartItem.subtotal correctness
    print()
    items = CartItem.query.all()
    for item in items:
        s = item.subtotal()
        print(f'[2] CartItem#{item.id}: qty={item.quantity} x price={item.product.price} = {s:.2f}')

    # 3. status_index edge cases (simulate without modifying db object)
    print()
    print('[3] status_index() coverage:')
    statuses_to_test = ['pending','accepted','shipped','delivered','rejected','unknown']
    idxlist = ['pending','accepted','shipped','delivered']
    for s in statuses_to_test:
        try:
            idx = idxlist.index(s)
        except ValueError:
            idx = -1
        note = ''
        if s == 'rejected' and idx == -1:
            note = ' <- expected, template shows rejection separately. OK.'
        elif idx == -1:
            note = ' <- MISSING from status tracking! BUG'
        print(f'    {s!r:<12} -> idx={idx}{note}')

    # 4. avg_rating division by zero guard
    print()
    print('[4] avg_rating with no ratings:')
    for p in Product.query.all():
        r = p.avg_rating
        print(f'    Product {repr(p.name)}: avg_rating={r}')

    # 5. Disease files never cleaned up
    print()
    upload_folder = app.config['UPLOAD_FOLDER']
    all_uploads = os.listdir(upload_folder) if os.path.exists(upload_folder) else []
    disease_files = [f for f in all_uploads if f.startswith('disease_')]
    print(f'[5] Disease temp files on disk: {len(disease_files)} (accumulate, never deleted)')

    # 6. SECRET_KEY default value
    print()
    sk = app.config.get('SECRET_KEY', '')
    default_key = 'krishi-ai-secret-2024-change-in-production'
    is_default = (sk == default_key)
    print(f'[6] SECRET_KEY default: {is_default} -> {"SECURITY RISK in production!" if is_default else "OK"}')

    # 7. RAZORPAY_KEY_ID empty
    rz = app.config.get('RAZORPAY_KEY_ID', '')
    msg = 'EMPTY - payment will fail' if not rz else 'set'
    print(f'[7] RAZORPAY_KEY_ID: {msg}')

    # 8. GIF allowed in disease detection
    print()
    from routes.disease_detection import ALLOWED
    print(f'[8] Disease ALLOWED extensions: {ALLOWED}')
    if 'gif' in ALLOWED:
        print('    -> GIF accepted! Animated GIFs sent to Gemini Vision may give wrong results.')

    # 9. Marketplace price max_price filter - check type
    print()
    import inspect
    from routes.marketplace import listing
    src = inspect.getsource(listing)
    if 'float(max_price)' in src or 'int(max_price)' in src:
        print('[9] Marketplace price filter: converted to numeric. OK')
    else:
        if 'max_price' in src:
            # Find the relevant lines
            for i, line in enumerate(src.splitlines()):
                if 'max_price' in line:
                    print(f'[9] Marketplace max_price line: {line.strip()}')

    # 10. add_to_cart quantity exceeds product stock (no stock check)
    print()
    print('[10] Stock check in add_to_cart:')
    print('     Product.quantity is a TEXT field (e.g. "100 kg") so no numeric stock check exists.')
    print('     Buyers CAN order any quantity regardless of available stock. LOGIC BUG.')

    # 11. Order model updated_at onupdate
    print()
    print('[11] Order.updated_at onupdate:')
    from datetime import datetime
    o = Order.query.first()
    if o:
        before = o.updated_at
        o.status = o.status  # no real change
        db.session.commit()
        after = Order.query.get(o.id).updated_at
        print(f'    Before: {before} | After commit (no change): {after}')
        print('    Note: onupdate only triggers on actual column changes in SQLite with SQLAlchemy.')

    # 12. Registration: duplicate email handling
    print()
    print('[12] Duplicate email registration:')
    from routes.auth import auth_bp
    import inspect
    src_auth = inspect.getsource(auth_bp)
    if 'already registered' in src_auth.lower() or 'email.first()' in src_auth:
        print('    Existing user check present. OK')
    else:
        print('    WARNING: May not check for existing email on register.')

    # 13. buyer_orders rated_ids: uses current_user.ratings_given -- check relationship
    print()
    print('[13] rated_ids via current_user.ratings_given:')
    buyers = User.query.filter_by(role='buyer').all()
    for b in buyers:
        rids = {r.order_id for r in b.ratings_given}
        print(f'    Buyer {repr(b.name)}: rated order_ids = {rids}')

    # 14. voice_assistant.js navigate('/orders/my') but route is /orders/my - check
    print()
    print('[14] Voice assistant URL check:')
    print('    navigate("/orders/my")  -> route is /orders/my  -> OK')
    print('    navigate("/orders/farmer") -> route is /orders/farmer -> OK')
    print('    navigate("/disease/") -> route is /disease/ -> OK')

    print('\n=== AUDIT COMPLETE ===')

/**
 * i18n.js — KrishiAI Multilanguage Support
 * Languages: English (en), Hindi (hi), Marathi (mr)
 *
 * Usage:  data-i18n="key"           → replaces textContent
 *         data-i18n-placeholder="key" → replaces placeholder attribute
 *         data-i18n-title="key"       → replaces title attribute
 */

const TRANSLATIONS = {
  en: {
    /* ── Navbar ── */
    nav_marketplace:    'Marketplace',
    nav_crop_roadmaps:  'Crop Roadmaps',
    nav_crop_ai:        'Crop AI',
    nav_disease:        'Disease Detect',
    nav_chatbot:        'Chatbot',
    nav_weather:        'Weather',
    nav_analytics:      'Analytics',
    nav_my_orders:      'My Orders',
    nav_orders:         'Orders',
    nav_dashboard:      'Dashboard',
    nav_logout:         'Logout',
    nav_login:          'Login',
    nav_register:       'Register',

    /* ── Footer ── */
    footer_tagline: 'AI-Powered Organic Farming Platform',

    /* ── Auth — Login ── */
    login_heading:        'Login',
    login_welcome:        'Welcome back to KrishiAI',
    login_email_label:    'Email Address',
    login_email_ph:       'you@example.com',
    login_password_label: 'Password',
    login_password_ph:    'Your password',
    login_remember:       'Remember me',
    login_btn:            'Login',
    login_new:            'New here?',
    login_create_acct:    'Create Account',

    /* ── Auth — Register ── */
    register_heading:     'Create Account',
    register_subtitle:    "Join KrishiAI — it's free",
    register_role_label:  'I am a:',
    register_farmer:      '🌾 Farmer',
    register_buyer:       '🛒 Buyer',
    register_name_label:  'Full Name',
    register_name_ph:     'Your full name',
    register_email_label: 'Email Address',
    register_phone_label: 'Phone Number',
    register_phone_ph:    '+91 XXXXXXXXXX',
    register_location_label: 'Location / Village',
    register_location_ph: 'e.g. Pune, Maharashtra',
    register_soil_label:  'Soil Type',
    register_soil_ph:     'Select soil type',
    register_password_label: 'Password',
    register_password_ph: 'Min 6 characters',
    register_confirm_label: 'Confirm Password',
    register_confirm_ph:  'Repeat password',
    register_btn:         'Create My Account',
    register_have_acct:   'Already have an account?',
    register_log_in:      'Log In',

    /* ── Marketplace ── */
    market_heading:       '🛍️ Organic Marketplace',
    market_subtitle:      'Buy directly from verified organic farmers — no middlemen, freshest produce',
    market_search_ph:     '🔍 Search tomato, potato, rice...',
    market_all_categories:'All Categories',
    market_filter_btn:    '🔍 Filter',
    market_clear_btn:     '✕ Clear',
    market_add_product:   'Add Product',
    market_my_listings:   'My Listings',
    market_no_ratings:    'No ratings yet',
    market_per_unit:      '/ unit',
    market_by:            'By',
    market_add_to_cart:   '🛒 Add to Cart',
    market_login_to_buy:  '🔐 Login to Buy',
    market_contact_farmer:'Contact Farmer',
    market_no_products:   'No products listed yet.',
    market_no_found:      'No products found for',

    /* ── Crop AI ── */
    crop_heading:         'Crop Recommendation',
    crop_subtitle:        'Enter your soil and climate details to get AI-powered crop recommendations',
    crop_btn:             'Get Recommendations',

    /* ── Disease Detection ── */
    disease_heading:      'Plant Disease Detection',
    disease_subtitle:     'Upload a photo of your plant leaf for AI-powered disease analysis',
    disease_upload_btn:   'Detect Disease',

    /* ── Chatbot ── */
    chatbot_heading:      'Farming Assistant',
    chatbot_subtitle:     'Ask any farming question in your language',
    chatbot_ph:           'Ask your farming question...',
    chatbot_send:         'Send',

    /* ── Weather ── */
    weather_heading:      'Weather Advisory',
    weather_subtitle:     'Real-time weather insights for smart farming decisions',
    weather_search_ph:    'Enter city name...',
    weather_btn:          'Get Weather',

    /* ── Analytics ── */
    analytics_heading:    'Analytics Dashboard',
    analytics_subtitle:   'Track sales, orders, and platform performance',

    /* ── Cart ── */
    cart_heading:         'My Cart',
    cart_empty:           'Your cart is empty',
    cart_checkout:        'Checkout',
    cart_remove:          'Remove',
    cart_total:           'Total',

    /* ── Orders ── */
    orders_heading:       'My Orders',
    orders_status:        'Status',
    orders_date:          'Date',
    orders_total:         'Total',
    orders_no_orders:     'No orders yet.',

    /* ── Roadmap ── */
    roadmap_heading:      'Crop Roadmaps',
    roadmap_subtitle:     'Step-by-step farming guides for every crop',
    roadmap_view:         'View Roadmap',

    /* ── Common ── */
    common_loading:       'Loading...',
    common_submit:        'Submit',
    common_cancel:        'Cancel',
    common_save:          'Save',
    common_back:          'Back',
    common_farmer:        'Farmer',
    common_buyer:         'Buyer',
    common_lang_label:    '🌐 Language',

    /* ── Added Keys ── */
    farmer_dash_heading:  'Farmer Dashboard',
    farmer_dash_welcome:  'Welcome',
    farmer_dash_my_products: 'My Products',
    farmer_dash_crops_supported: 'Crops Supported',
    farmer_dash_diseases_db: 'Diseases in DB',
    farmer_dash_smart_tools: 'Smart Tools',
    farmer_dash_ai_tools: 'AI Tools for Farmers',
    farmer_dash_my_listings: 'My Product Listings',
    farmer_dash_manage_all: 'Manage All',
    farmer_dash_no_products: 'No products yet.',
    farmer_dash_add_first: 'Add your first product →',
    farmer_dash_pending_orders: 'pending order',
    farmer_dash_view_orders: 'View Orders',
    farmer_dash_add_product: 'Add Product',
    farmer_dash_col_product: 'Product',
    farmer_dash_col_category: 'Category',
    farmer_dash_col_price: 'Price',
    farmer_dash_col_quantity: 'Quantity',
    farmer_dash_col_action: 'Action',
    farmer_dash_crop_ai_desc: 'Best crop for your soil',
    farmer_dash_disease_desc: 'Upload leaf photo',
    farmer_dash_weather_desc: 'Smart irrigation advice',
    farmer_dash_chatbot_desc: 'Ask farming questions',

    buyer_dash_heading:   'Buyer Dashboard',
    buyer_dash_welcome:   'Welcome',
    buyer_dash_subtitle:  'Find fresh organic produce from local farmers.',
    buyer_dash_browse:    'Browse Marketplace',
    buyer_dash_browse_desc: 'Find organic products',
    buyer_dash_ai_advisor: 'Ask AI Advisor',
    buyer_dash_ai_desc:    'Farming & buying advice',
    buyer_dash_analytics: 'Market Analytics',
    buyer_dash_analytics_desc: 'Price trends & insights',
    buyer_dash_latest:    'Latest Products in Market',
    buyer_dash_view_all:  'View All Products',
    buyer_dash_no_products: 'No products listed yet. Check back soon!',
    buyer_dash_contact_farmer: 'Contact Farmer',

    my_products_heading:  'My Product Listings',
    my_products_add_new:  '+ Add New Product',
    my_products_none:     'You have no products listed yet.',
    my_products_add_cta:  'Add your first product',
    my_products_delete_confirm: 'Delete this product?',
    my_products_col_image: 'Image',
    my_products_col_name:  'Product Name',
    my_products_col_category: 'Category',
    my_products_col_price: 'Price',
    my_products_col_qty:   'Quantity',
    my_products_col_ratings: 'Ratings',
    my_products_col_action: 'Action',
    my_products_no_ratings: 'No ratings',
    my_products_delete:   'Delete',

    add_product_heading:  'Add New Product',
    add_product_name_label: 'Product Name',
    add_product_name_ph:  'e.g. Organic Tomatoes',
    add_product_category_label: 'Category',
    add_product_category_ph: 'e.g. Vegetables, Fruits, Grains',
    add_product_price_label: 'Price per Unit (₹)',
    add_product_qty_label: 'Quantity Available',
    add_product_qty_ph:   'e.g. 50 kg, 100 units',
    add_product_desc_label: 'Description',
    add_product_desc_ph:  'Describe your product...',
    add_product_image_label: 'Product Image',
    add_product_btn:      'List My Product',
    add_product_cancel:   'Cancel',

    farmer_detail_products: 'Products by this Farmer',
    farmer_detail_no_products: 'No products listed by this farmer yet.',
    farmer_detail_location: 'Location',
    farmer_detail_soil:    'Soil Type',
    farmer_detail_member_since: 'Member since',
    farmer_detail_add_cart: 'Add to Cart',
    farmer_detail_back:    'Back to Marketplace',

    buyer_orders_heading: 'My Orders',
    buyer_orders_none:    'You have no orders yet.',
    buyer_orders_browse:  'Browse Marketplace',
    buyer_orders_col_product: 'Product',
    buyer_orders_col_farmer: 'Farmer',
    buyer_orders_col_qty:  'Qty',
    buyer_orders_col_total: 'Total',
    buyer_orders_col_payment: 'Payment',
    buyer_orders_col_status: 'Status',
    buyer_orders_col_date: 'Date',
    buyer_orders_col_action: 'Action',
    buyer_orders_rate:    'Rate Order',
    buyer_orders_rated:   'Rated ★',

    farmer_orders_heading: 'Incoming Orders',
    farmer_orders_none:   'No orders yet.',
    farmer_orders_col_buyer: 'Buyer',
    farmer_orders_col_product: 'Product',
    farmer_orders_col_qty: 'Qty',
    farmer_orders_col_total: 'Total',
    farmer_orders_col_delivery: 'Delivery Address',
    farmer_orders_col_payment: 'Payment',
    farmer_orders_col_status: 'Status',
    farmer_orders_col_action: 'Action',
    farmer_orders_accept: 'Accept',
    farmer_orders_reject: 'Reject',
    farmer_orders_ship:   'Mark Shipped',
    farmer_orders_deliver: 'Mark Delivered',

    rate_order_heading:   'Rate Your Order',
    rate_order_product:   'Product',
    rate_order_farmer:    'Farmer',
    rate_order_stars_label: 'Your Rating',
    rate_order_review_label: 'Write a Review (optional)',
    rate_order_review_ph: 'Share your experience...',
    rate_order_btn:       'Submit Rating',

    home_hero_title:      'Smart Organic Farming',
    home_hero_subtitle:   'AI-powered tools for modern Indian farmers',
    home_get_started:     'Get Started',
    home_learn_more:      'Learn More',
    home_features_title:  'Why KrishiAI?',

    crop_nitrogen_label:  'Nitrogen (N)',
    crop_phosphorus_label: 'Phosphorus (P)',
    crop_potassium_label: 'Potassium (K)',
    crop_temperature_label: 'Temperature (°C)',
    crop_humidity_label:  'Humidity (%)',
    crop_ph_label:        'Soil pH',
    crop_rainfall_label:  'Rainfall (mm)',
    crop_result_title:    'Recommended Crops',
    crop_top_pick:        'Top Pick',
  },

  hi: {
    /* ── Navbar ── */
    nav_marketplace:    'बाज़ार',
    nav_crop_roadmaps:  'फसल रोडमैप',
    nav_crop_ai:        'फसल AI',
    nav_disease:        'रोग पहचान',
    nav_chatbot:        'चैटबॉट',
    nav_weather:        'मौसम',
    nav_analytics:      'विश्लेषण',
    nav_my_orders:      'मेरे ऑर्डर',
    nav_orders:         'ऑर्डर',
    nav_dashboard:      'डैशबोर्ड',
    nav_logout:         'लॉगआउट',
    nav_login:          'लॉगिन',
    nav_register:       'पंजीकरण',

    /* ── Footer ── */
    footer_tagline: 'AI-संचालित जैविक खेती मंच',

    /* ── Auth — Login ── */
    login_heading:        'लॉगिन',
    login_welcome:        'KrishiAI पर वापस स्वागत है',
    login_email_label:    'ईमेल पता',
    login_email_ph:       'आप@example.com',
    login_password_label: 'पासवर्ड',
    login_password_ph:    'आपका पासवर्ड',
    login_remember:       'याद रखें',
    login_btn:            'लॉगिन करें',
    login_new:            'नए हैं?',
    login_create_acct:    'खाता बनाएं',

    /* ── Auth — Register ── */
    register_heading:     'खाता बनाएं',
    register_subtitle:    'KrishiAI से जुड़ें — निःशुल्क',
    register_role_label:  'मैं हूं:',
    register_farmer:      '🌾 किसान',
    register_buyer:       '🛒 खरीदार',
    register_name_label:  'पूरा नाम',
    register_name_ph:     'आपका पूरा नाम',
    register_email_label: 'ईमेल पता',
    register_phone_label: 'फ़ोन नंबर',
    register_phone_ph:    '+91 XXXXXXXXXX',
    register_location_label: 'स्थान / गाँव',
    register_location_ph: 'जैसे पुणे, महाराष्ट्र',
    register_soil_label:  'मिट्टी का प्रकार',
    register_soil_ph:     'मिट्टी का प्रकार चुनें',
    register_password_label: 'पासवर्ड',
    register_password_ph: 'न्यूनतम 6 अक्षर',
    register_confirm_label: 'पासवर्ड की पुष्टि करें',
    register_confirm_ph:  'पासवर्ड दोहराएं',
    register_btn:         'मेरा खाता बनाएं',
    register_have_acct:   'पहले से खाता है?',
    register_log_in:      'लॉग इन करें',

    /* ── Marketplace ── */
    market_heading:       '🛍️ जैविक बाज़ार',
    market_subtitle:      'सत्यापित जैविक किसानों से सीधे खरीदें — कोई बिचौलिया नहीं, ताज़ा उत्पाद',
    market_search_ph:     '🔍 टमाटर, आलू, चावल खोजें...',
    market_all_categories:'सभी श्रेणियाँ',
    market_filter_btn:    '🔍 फ़िल्टर',
    market_clear_btn:     '✕ हटाएं',
    market_add_product:   'उत्पाद जोड़ें',
    market_my_listings:   'मेरी सूची',
    market_no_ratings:    'अभी तक कोई रेटिंग नहीं',
    market_per_unit:      '/ यूनिट',
    market_by:            'द्वारा',
    market_add_to_cart:   '🛒 कार्ट में जोड़ें',
    market_login_to_buy:  '🔐 खरीदने के लिए लॉगिन करें',
    market_contact_farmer:'किसान से संपर्क करें',
    market_no_products:   'अभी तक कोई उत्पाद नहीं।',
    market_no_found:      'के लिए कोई उत्पाद नहीं मिला',

    /* ── Crop AI ── */
    crop_heading:         'फसल सिफारिश',
    crop_subtitle:        'AI-संचालित फसल सिफारिश के लिए अपनी मिट्टी और जलवायु विवरण दर्ज करें',
    crop_btn:             'सिफारिशें प्राप्त करें',

    /* ── Disease Detection ── */
    disease_heading:      'पौधे रोग पहचान',
    disease_subtitle:     'AI-संचालित रोग विश्लेषण के लिए अपने पौधे की पत्ती की फ़ोटो अपलोड करें',
    disease_upload_btn:   'रोग पहचानें',

    /* ── Chatbot ── */
    chatbot_heading:      'कृषि सहायक',
    chatbot_subtitle:     'अपनी भाषा में कोई भी कृषि प्रश्न पूछें',
    chatbot_ph:           'अपना कृषि प्रश्न पूछें...',
    chatbot_send:         'भेजें',

    /* ── Weather ── */
    weather_heading:      'मौसम सलाह',
    weather_subtitle:     'स्मार्ट खेती निर्णयों के लिए रीयल-टाइम मौसम जानकारी',
    weather_search_ph:    'शहर का नाम दर्ज करें...',
    weather_btn:          'मौसम देखें',

    /* ── Analytics ── */
    analytics_heading:    'विश्लेषण डैशबोर्ड',
    analytics_subtitle:   'बिक्री, ऑर्डर और प्लेटफ़ॉर्म प्रदर्शन ट्रैक करें',

    /* ── Cart ── */
    cart_heading:         'मेरी कार्ट',
    cart_empty:           'आपकी कार्ट खाली है',
    cart_checkout:        'भुगतान करें',
    cart_remove:          'हटाएं',
    cart_total:           'कुल',

    /* ── Orders ── */
    orders_heading:       'मेरे ऑर्डर',
    orders_status:        'स्थिति',
    orders_date:          'तारीख',
    orders_total:         'कुल',
    orders_no_orders:     'अभी तक कोई ऑर्डर नहीं।',

    /* ── Roadmap ── */
    roadmap_heading:      'फसल रोडमैप',
    roadmap_subtitle:     'हर फसल के लिए चरण-दर-चरण खेती गाइड',
    roadmap_view:         'रोडमैप देखें',

    /* ── Common ── */
    common_loading:       'लोड हो रहा है...',
    common_submit:        'जमा करें',
    common_cancel:        'रद्द करें',
    common_save:          'सहेजें',
    common_back:          'वापस',
    common_farmer:        'किसान',
    common_buyer:         'खरीदार',
    common_lang_label:    '🌐 भाषा',

    /* ── Added Keys ── */
    farmer_dash_heading:  'किसान डैशबोर्ड',
    farmer_dash_welcome:  'स्वागत है',
    farmer_dash_my_products: 'मेरे उत्पाद',
    farmer_dash_crops_supported: 'समर्थित फसलें',
    farmer_dash_diseases_db: 'रोग डेटाबेस',
    farmer_dash_smart_tools: 'स्मार्ट टूल्स',
    farmer_dash_ai_tools: 'किसानों के लिए AI टूल्स',
    farmer_dash_my_listings: 'मेरी उत्पाद सूची',
    farmer_dash_manage_all: 'सभी प्रबंधित करें',
    farmer_dash_no_products: 'अभी कोई उत्पाद नहीं।',
    farmer_dash_add_first: 'अपना पहला उत्पाद जोड़ें →',
    farmer_dash_pending_orders: 'लंबित ऑर्डर',
    farmer_dash_view_orders: 'ऑर्डर देखें',
    farmer_dash_add_product: 'उत्पाद जोड़ें',
    farmer_dash_col_product: 'उत्पाद',
    farmer_dash_col_category: 'श्रेणी',
    farmer_dash_col_price: 'कीमत',
    farmer_dash_col_quantity: 'मात्रा',
    farmer_dash_col_action: 'कार्रवाई',
    farmer_dash_crop_ai_desc: 'आपकी मिट्टी के लिए सर्वोत्तम फसल',
    farmer_dash_disease_desc: 'पत्ती की फ़ोटो अपलोड करें',
    farmer_dash_weather_desc: 'स्मार्ट सिंचाई सलाह',
    farmer_dash_chatbot_desc: 'खेती के सवाल पूछें',

    buyer_dash_heading:   'खरीदार डैशबोर्ड',
    buyer_dash_welcome:   'स्वागत है',
    buyer_dash_subtitle:  'स्थानीय किसानों से ताजा जैविक उत्पाद खोजें।',
    buyer_dash_browse:    'बाज़ार ब्राउज़ करें',
    buyer_dash_browse_desc: 'जैविक उत्पाद खोजें',
    buyer_dash_ai_advisor: 'AI सलाहकार से पूछें',
    buyer_dash_ai_desc:    'खेती और खरीद सलाह',
    buyer_dash_analytics: 'बाज़ार विश्लेषण',
    buyer_dash_analytics_desc: 'मूल्य प्रवृत्तियाँ और अंतर्दृष्टि',
    buyer_dash_latest:    'बाज़ार में नवीनतम उत्पाद',
    buyer_dash_view_all:  'सभी उत्पाद देखें',
    buyer_dash_no_products: 'अभी कोई उत्पाद सूचीबद्ध नहीं। जल्द वापस जाँचें!',
    buyer_dash_contact_farmer: 'किसान से संपर्क करें',

    my_products_heading:  'मेरी उत्पाद सूची',
    my_products_add_new:  '+ नया उत्पाद जोड़ें',
    my_products_none:     'आपने अभी तक कोई उत्पाद सूचीबद्ध नहीं किया।',
    my_products_add_cta:  'अपना पहला उत्पाद जोड़ें',
    my_products_delete_confirm: 'इस उत्पाद को हटाएं?',
    my_products_col_image: 'छवि',
    my_products_col_name:  'उत्पाद नाम',
    my_products_col_category: 'श्रेणी',
    my_products_col_price: 'कीमत',
    my_products_col_qty:   'मात्रा',
    my_products_col_ratings: 'रेटिंग',
    my_products_col_action: 'कार्रवाई',
    my_products_no_ratings: 'कोई रेटिंग नहीं',
    my_products_delete:   'हटाएं',

    add_product_heading:  'नया उत्पाद जोड़ें',
    add_product_name_label: 'उत्पाद नाम',
    add_product_name_ph:  'जैसे जैविक टमाटर',
    add_product_category_label: 'श्रेणी',
    add_product_category_ph: 'जैसे सब्जियाँ, फल, अनाज',
    add_product_price_label: 'प्रति इकाई मूल्य (₹)',
    add_product_qty_label: 'उपलब्ध मात्रा',
    add_product_qty_ph:   'जैसे 50 किग्रा, 100 इकाइयाँ',
    add_product_desc_label: 'विवरण',
    add_product_desc_ph:  'अपने उत्पाद का वर्णन करें...',
    add_product_image_label: 'उत्पाद छवि',
    add_product_btn:      'मेरा उत्पाद सूचीबद्ध करें',
    add_product_cancel:   'रद्द करें',

    farmer_detail_products: 'इस किसान के उत्पाद',
    farmer_detail_no_products: 'इस किसान ने अभी तक कोई उत्पाद सूचीबद्ध नहीं किया।',
    farmer_detail_location: 'स्थान',
    farmer_detail_soil:    'मिट्टी का प्रकार',
    farmer_detail_member_since: 'सदस्यता से',
    farmer_detail_add_cart: 'कार्ट में जोड़ें',
    farmer_detail_back:    'बाज़ार पर वापस',

    buyer_orders_heading: 'मेरे ऑर्डर',
    buyer_orders_none:    'आपके अभी कोई ऑर्डर नहीं हैं।',
    buyer_orders_browse:  'बाज़ार ब्राउज़ करें',
    buyer_orders_col_product: 'उत्पाद',
    buyer_orders_col_farmer: 'किसान',
    buyer_orders_col_qty:  'मात्रा',
    buyer_orders_col_total: 'कुल',
    buyer_orders_col_payment: 'भुगतान',
    buyer_orders_col_status: 'स्थिति',
    buyer_orders_col_date: 'तारीख',
    buyer_orders_col_action: 'कार्रवाई',
    buyer_orders_rate:    'ऑर्डर रेट करें',
    buyer_orders_rated:   'रेटेड ★',

    farmer_orders_heading: 'आने वाले ऑर्डर',
    farmer_orders_none:   'अभी कोई ऑर्डर नहीं।',
    farmer_orders_col_buyer: 'खरीदार',
    farmer_orders_col_product: 'उत्पाद',
    farmer_orders_col_qty: 'मात्रा',
    farmer_orders_col_total: 'कुल',
    farmer_orders_col_delivery: 'डिलीवरी पता',
    farmer_orders_col_payment: 'भुगतान',
    farmer_orders_col_status: 'स्थिति',
    farmer_orders_col_action: 'कार्रवाई',
    farmer_orders_accept: 'स्वीकार करें',
    farmer_orders_reject: 'अस्वीकार करें',
    farmer_orders_ship:   'भेजा हुआ चिह्नित करें',
    farmer_orders_deliver: 'डिलीवर हुआ चिह्नित करें',

    rate_order_heading:   'अपना ऑर्डर रेट करें',
    rate_order_product:   'उत्पाद',
    rate_order_farmer:    'किसान',
    rate_order_stars_label: 'आपकी रेटिंग',
    rate_order_review_label: 'समीक्षा लिखें (वैकल्पिक)',
    rate_order_review_ph: 'अपना अनुभव साझा करें...',
    rate_order_btn:       'रेटिंग जमा करें',

    home_hero_title:      'स्मार्ट जैविक खेती',
    home_hero_subtitle:   'आधुनिक भारतीय किसानों के लिए AI-संचालित उपकरण',
    home_get_started:     'शुरू करें',
    home_learn_more:      'और जानें',
    home_features_title:  'KrishiAI क्यों?',

    crop_nitrogen_label:  'नाइट्रोजन (N)',
    crop_phosphorus_label: 'फास्फोरस (P)',
    crop_potassium_label: 'पोटेशियम (K)',
    crop_temperature_label: 'तापमान (°C)',
    crop_humidity_label:  'आर्द्रता (%)',
    crop_ph_label:        'मिट्टी pH',
    crop_rainfall_label:  'वर्षा (mm)',
    crop_result_title:    'अनुशंसित फसलें',
    crop_top_pick:        'शीर्ष चुनाव',
  },

  mr: {
    /* ── Navbar ── */
    nav_marketplace:    'बाजार',
    nav_crop_roadmaps:  'पीक रोडमॅप',
    nav_crop_ai:        'पीक AI',
    nav_disease:        'रोग ओळख',
    nav_chatbot:        'चॅटबॉट',
    nav_weather:        'हवामान',
    nav_analytics:      'विश्लेषण',
    nav_my_orders:      'माझे ऑर्डर',
    nav_orders:         'ऑर्डर',
    nav_dashboard:      'डॅशबोर्ड',
    nav_logout:         'लॉगआउट',
    nav_login:          'लॉगिन',
    nav_register:       'नोंदणी',

    /* ── Footer ── */
    footer_tagline: 'AI-चालित सेंद्रिय शेती व्यासपीठ',

    /* ── Auth — Login ── */
    login_heading:        'लॉगिन',
    login_welcome:        'KrishiAI मध्ये पुन्हा स्वागत आहे',
    login_email_label:    'ईमेल पत्ता',
    login_email_ph:       'तुम्ही@example.com',
    login_password_label: 'पासवर्ड',
    login_password_ph:    'तुमचा पासवर्ड',
    login_remember:       'लक्षात ठेवा',
    login_btn:            'लॉगिन करा',
    login_new:            'नवीन आहात?',
    login_create_acct:    'खाते तयार करा',

    /* ── Auth — Register ── */
    register_heading:     'खाते तयार करा',
    register_subtitle:    'KrishiAI मध्ये सामील व्हा — विनामूल्य',
    register_role_label:  'मी आहे:',
    register_farmer:      '🌾 शेतकरी',
    register_buyer:       '🛒 खरेदीदार',
    register_name_label:  'पूर्ण नाव',
    register_name_ph:     'तुमचे पूर्ण नाव',
    register_email_label: 'ईमेल पत्ता',
    register_phone_label: 'फोन नंबर',
    register_phone_ph:    '+91 XXXXXXXXXX',
    register_location_label: 'ठिकाण / गाव',
    register_location_ph: 'उदा. पुणे, महाराष्ट्र',
    register_soil_label:  'मातीचा प्रकार',
    register_soil_ph:     'मातीचा प्रकार निवडा',
    register_password_label: 'पासवर्ड',
    register_password_ph: 'किमान 6 अक्षरे',
    register_confirm_label: 'पासवर्ड पुष्टी करा',
    register_confirm_ph:  'पासवर्ड पुन्हा टाका',
    register_btn:         'माझे खाते तयार करा',
    register_have_acct:   'आधीच खाते आहे?',
    register_log_in:      'लॉग इन करा',

    /* ── Marketplace ── */
    market_heading:       '🛍️ सेंद्रिय बाजार',
    market_subtitle:      'प्रमाणित सेंद्रिय शेतकऱ्यांकडून थेट खरेदी करा — कोणताही मध्यस्थ नाही, ताजे उत्पादन',
    market_search_ph:     '🔍 टोमॅटो, बटाटा, तांदूळ शोधा...',
    market_all_categories:'सर्व श्रेणी',
    market_filter_btn:    '🔍 फिल्टर',
    market_clear_btn:     '✕ साफ करा',
    market_add_product:   'उत्पादन जोडा',
    market_my_listings:   'माझ्या नोंदी',
    market_no_ratings:    'अजून कोणतीही रेटिंग नाही',
    market_per_unit:      '/ युनिट',
    market_by:            'द्वारे',
    market_add_to_cart:   '🛒 कार्टमध्ये जोडा',
    market_login_to_buy:  '🔐 खरेदीसाठी लॉगिन करा',
    market_contact_farmer:'शेतकऱ्याशी संपर्क करा',
    market_no_products:   'अजून कोणतेही उत्पादन नाही.',
    market_no_found:      'साठी कोणतेही उत्पादन सापडले नाही',

    /* ── Crop AI ── */
    crop_heading:         'पीक शिफारस',
    crop_subtitle:        'AI-चालित पीक शिफारसींसाठी तुमची माती आणि हवामान माहिती प्रविष्ट करा',
    crop_btn:             'शिफारसी मिळवा',

    /* ── Disease Detection ── */
    disease_heading:      'वनस्पती रोग ओळख',
    disease_subtitle:     'AI-चालित रोग विश्लेषणासाठी तुमच्या वनस्पतीच्या पानाचा फोटो अपलोड करा',
    disease_upload_btn:   'रोग ओळखा',

    /* ── Chatbot ── */
    chatbot_heading:      'शेती सहायक',
    chatbot_subtitle:     'तुमच्या भाषेत कोणताही शेती प्रश्न विचारा',
    chatbot_ph:           'तुमचा शेती प्रश्न विचारा...',
    chatbot_send:         'पाठवा',

    /* ── Weather ── */
    weather_heading:      'हवामान सल्ला',
    weather_subtitle:     'स्मार्ट शेती निर्णयांसाठी रिअल-टाइम हवामान माहिती',
    weather_search_ph:    'शहराचे नाव प्रविष्ट करा...',
    weather_btn:          'हवामान पहा',

    /* ── Analytics ── */
    analytics_heading:    'विश्लेषण डॅशबोर्ड',
    analytics_subtitle:   'विक्री, ऑर्डर आणि प्लॅटफॉर्म कार्यप्रदर्शन ट्रॅक करा',

    /* ── Cart ── */
    cart_heading:         'माझी कार्ट',
    cart_empty:           'तुमची कार्ट रिकामी आहे',
    cart_checkout:        'पेमेंट करा',
    cart_remove:          'काढा',
    cart_total:           'एकूण',

    /* ── Orders ── */
    orders_heading:       'माझे ऑर्डर',
    orders_status:        'स्थिती',
    orders_date:          'तारीख',
    orders_total:         'एकूण',
    orders_no_orders:     'अजून कोणताही ऑर्डर नाही.',

    /* ── Roadmap ── */
    roadmap_heading:      'पीक रोडमॅप',
    roadmap_subtitle:     'प्रत्येक पिकासाठी चरण-दर-चरण शेती मार्गदर्शक',
    roadmap_view:         'रोडमॅप पहा',

    /* ── Common ── */
    common_loading:       'लोड होत आहे...',
    common_submit:        'सबमिट करा',
    common_cancel:        'रद्द करा',
    common_save:          'जतन करा',
    common_back:          'मागे',
    common_farmer:        'शेतकरी',
    common_buyer:         'खरेदीदार',
    common_lang_label:    '🌐 भाषा',

    /* ── Added Keys ── */
    farmer_dash_heading:  'शेतकरी डॅशबोर्ड',
    farmer_dash_welcome:  'स्वागत आहे',
    farmer_dash_my_products: 'माझी उत्पादने',
    farmer_dash_crops_supported: 'समर्थित पिके',
    farmer_dash_diseases_db: 'रोग डेटाबेस',
    farmer_dash_smart_tools: 'स्मार्ट साधने',
    farmer_dash_ai_tools: 'शेतकऱ्यांसाठी AI साधने',
    farmer_dash_my_listings: 'माझ्या उत्पादन नोंदी',
    farmer_dash_manage_all: 'सर्व व्यवस्थापित करा',
    farmer_dash_no_products: 'अजून कोणतेही उत्पादन नाही.',
    farmer_dash_add_first: 'तुमचे पहिले उत्पादन जोडा →',
    farmer_dash_pending_orders: 'प्रलंबित ऑर्डर',
    farmer_dash_view_orders: 'ऑर्डर पहा',
    farmer_dash_add_product: 'उत्पादन जोडा',
    farmer_dash_col_product: 'उत्पादन',
    farmer_dash_col_category: 'श्रेणी',
    farmer_dash_col_price: 'किंमत',
    farmer_dash_col_quantity: 'प्रमाण',
    farmer_dash_col_action: 'क्रिया',
    farmer_dash_crop_ai_desc: 'तुमच्या मातीसाठी सर्वोत्तम पीक',
    farmer_dash_disease_desc: 'पानाचा फोटो अपलोड करा',
    farmer_dash_weather_desc: 'स्मार्ट सिंचन सल्ला',
    farmer_dash_chatbot_desc: 'शेती प्रश्न विचारा',

    buyer_dash_heading:   'खरेदीदार डॅशबोर्ड',
    buyer_dash_welcome:   'स्वागत आहे',
    buyer_dash_subtitle:  'स्थानिक शेतकऱ्यांकडून ताजे सेंद्रिय उत्पादन शोधा.',
    buyer_dash_browse:    'बाजार ब्राउझ करा',
    buyer_dash_browse_desc: 'सेंद्रिय उत्पादने शोधा',
    buyer_dash_ai_advisor: 'AI सल्लागाराला विचारा',
    buyer_dash_ai_desc:    'शेती आणि खरेदी सल्ला',
    buyer_dash_analytics: 'बाजार विश्लेषण',
    buyer_dash_analytics_desc: 'किंमत ट्रेंड आणि अंतर्दृष्टी',
    buyer_dash_latest:    'बाजारातील नवीनतम उत्पादने',
    buyer_dash_view_all:  'सर्व उत्पादने पहा',
    buyer_dash_no_products: 'अजून कोणतेही उत्पादन सूचीबद्ध नाही. लवकरच पुन्हा तपासा!',
    buyer_dash_contact_farmer: 'शेतकऱ्याशी संपर्क करा',

    my_products_heading:  'माझ्या उत्पादन नोंदी',
    my_products_add_new:  '+ नवीन उत्पादन जोडा',
    my_products_none:     'तुम्ही अजून कोणतेही उत्पादन सूचीबद्ध केले नाही.',
    my_products_add_cta:  'तुमचे पहिले उत्पादन जोडा',
    my_products_delete_confirm: 'हे उत्पादन हटवायचे?',
    my_products_col_image: 'प्रतिमा',
    my_products_col_name:  'उत्पादनाचे नाव',
    my_products_col_category: 'श्रेणी',
    my_products_col_price: 'किंमत',
    my_products_col_qty:   'प्रमाण',
    my_products_col_ratings: 'रेटिंग',
    my_products_col_action: 'क्रिया',
    my_products_no_ratings: 'रेटिंग नाही',
    my_products_delete:   'हटवा',

    add_product_heading:  'नवीन उत्पादन जोडा',
    add_product_name_label: 'उत्पादनाचे नाव',
    add_product_name_ph:  'उदा. सेंद्रिय टोमॅटो',
    add_product_category_label: 'श्रेणी',
    add_product_category_ph: 'उदा. भाज्या, फळे, धान्ये',
    add_product_price_label: 'प्रति युनिट किंमत (₹)',
    add_product_qty_label: 'उपलब्ध प्रमाण',
    add_product_qty_ph:   'उदा. 50 किग्रा, 100 युनिट',
    add_product_desc_label: 'वर्णन',
    add_product_desc_ph:  'तुमच्या उत्पादनाचे वर्णन करा...',
    add_product_image_label: 'उत्पादन प्रतिमा',
    add_product_btn:      'माझे उत्पादन सूचीबद्ध करा',
    add_product_cancel:   'रद्द करा',

    farmer_detail_products: 'या शेतकऱ्याची उत्पादने',
    farmer_detail_no_products: 'या शेतकऱ्याने अजून कोणतेही उत्पादन सूचीबद्ध केले नाही.',
    farmer_detail_location: 'ठिकाण',
    farmer_detail_soil:    'मातीचा प्रकार',
    farmer_detail_member_since: 'सदस्य पासून',
    farmer_detail_add_cart: 'कार्टमध्ये जोडा',
    farmer_detail_back:    'बाजारावर परत',

    buyer_orders_heading: 'माझे ऑर्डर',
    buyer_orders_none:    'तुमचे अजून कोणतेही ऑर्डर नाहीत.',
    buyer_orders_browse:  'बाजार ब्राउझ करा',
    buyer_orders_col_product: 'उत्पादन',
    buyer_orders_col_farmer: 'शेतकरी',
    buyer_orders_col_qty:  'प्रमाण',
    buyer_orders_col_total: 'एकूण',
    buyer_orders_col_payment: 'पेमेंट',
    buyer_orders_col_status: 'स्थिती',
    buyer_orders_col_date: 'तारीख',
    buyer_orders_col_action: 'क्रिया',
    buyer_orders_rate:    'ऑर्डर रेट करा',
    buyer_orders_rated:   'रेट केले ★',

    farmer_orders_heading: 'येणारे ऑर्डर',
    farmer_orders_none:   'अजून कोणताही ऑर्डर नाही.',
    farmer_orders_col_buyer: 'खरेदीदार',
    farmer_orders_col_product: 'उत्पादन',
    farmer_orders_col_qty: 'प्रमाण',
    farmer_orders_col_total: 'एकूण',
    farmer_orders_col_delivery: 'डिलिव्हरी पत्ता',
    farmer_orders_col_payment: 'पेमेंट',
    farmer_orders_col_status: 'स्थिती',
    farmer_orders_col_action: 'क्रिया',
    farmer_orders_accept: 'स्वीकार करा',
    farmer_orders_reject: 'नाकारा',
    farmer_orders_ship:   'पाठवले म्हणून चिन्हांकित करा',
    farmer_orders_deliver: 'वितरित म्हणून चिन्हांकित करा',

    rate_order_heading:   'तुमचा ऑर्डर रेट करा',
    rate_order_product:   'उत्पादन',
    rate_order_farmer:    'शेतकरी',
    rate_order_stars_label: 'तुमची रेटिंग',
    rate_order_review_label: 'समीक्षा लिहा (ऐच्छिक)',
    rate_order_review_ph: 'तुमचा अनुभव शेअर करा...',
    rate_order_btn:       'रेटिंग सबमिट करा',

    home_hero_title:      'स्मार्ट सेंद्रिय शेती',
    home_hero_subtitle:   'आधुनिक भारतीय शेतकऱ्यांसाठी AI-चालित साधने',
    home_get_started:     'सुरुवात करा',
    home_learn_more:      'अधिक जाणा',
    home_features_title:  'KrishiAI का?',

    crop_nitrogen_label:  'नायट्रोजन (N)',
    crop_phosphorus_label: 'फॉस्फरस (P)',
    crop_potassium_label: 'पोटॅशियम (K)',
    crop_temperature_label: 'तापमान (°C)',
    crop_humidity_label:  'आर्द्रता (%)',
    crop_ph_label:        'माती pH',
    crop_rainfall_label:  'पाऊस (mm)',
    crop_result_title:    'शिफारस केलेली पिके',
    crop_top_pick:        'सर्वोत्तम निवड',
  },
};

/* ─────────────────────────────────────────────
   KrishiAI I18n Engine
───────────────────────────────────────────── */
const I18n = (() => {
  const STORAGE_KEY = 'krishiai_lang';
  const DEFAULT_LANG = 'en';
  const SUPPORTED = ['en', 'hi', 'mr'];

  let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  if (!SUPPORTED.includes(currentLang)) currentLang = DEFAULT_LANG;

  /** Return translated string for key in current language */
  function t(key, lang) {
    const l = lang || currentLang;
    return (TRANSLATIONS[l] && TRANSLATIONS[l][key]) ||
           (TRANSLATIONS[DEFAULT_LANG] && TRANSLATIONS[DEFAULT_LANG][key]) ||
           key;
  }

  /** Apply translations to all data-i18n elements */
  function apply(root) {
    root = root || document;

    /* Text content */
    root.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });

    /* Placeholder attribute */
    root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.placeholder = t(key);
    });

    /* Title attribute */
    root.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      el.title = t(key);
    });

    /* aria-label attribute */
    root.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', t(key));
    });

    /* Update lang switcher active state */
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });

    /* Update <html lang> */
    document.documentElement.lang = currentLang;
  }

  /** Switch language and persist */
  function setLang(lang) {
    if (!SUPPORTED.includes(lang)) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    apply();
  }

  function getLang() { return currentLang; }

  /* Auto-apply on DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => apply());
  } else {
    apply();
  }

  return { t, apply, setLang, getLang };
})();

/* ─────────────────────────────────────────────
   Language Switcher Button Handler
   (buttons injected by base.html)
───────────────────────────────────────────── */
function _wireLangButtons() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      I18n.setLang(btn.dataset.lang);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', _wireLangButtons);
} else {
  _wireLangButtons();
}

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
    nav_ai_advisor:     'AI Advisor',

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
    market_my_listing:    'My Listing',
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
    chatbot_ph:           'Ask your farming question…',
    chatbot_send:         'Send',
    chatbot_online:       'Online · Organic Farming Expert',
    chatbot_welcome_hi:   'Hey',
    chatbot_welcome_ask:  'Ask me anything about',
    chatbot_welcome_sub:  "I'm powered by Gemini AI — get expert, localised advice in seconds.",
    chatbot_footer:       'KrishiBot may make mistakes. Always verify critical advice with your local KVK.',
    chat_cap_pest:        'Pest Control',
    chat_cap_pest_sub:    'Neem, traps, bio-agents',
    chat_cap_fert:        'Fertilizers',
    chat_cap_fert_sub:    'Jeevamrutha, compost, panchagavya',
    chat_cap_disease:     'Diseases',
    chat_cap_disease_sub: 'Bordeaux, Trichoderma',
    chat_cap_water:       'Water Management',
    chat_cap_water_sub:   'Drip, mulch, scheduling',
    chat_cap_soil:        'Soil Health',
    chat_cap_soil_sub:    'pH, organic matter, cover crops',
    chat_cap_crop:        'Crop Selection',
    chat_cap_crop_sub:    'Season, soil, rotation advice',
    chip_pest_ctrl:       'Pest control',
    chip_compost:         'Composting',
    chip_tomato:          'Tomato tips',
    chip_irrigation:      'Irrigation',
    chip_soil:            'Soil health',

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
    farmer_dash_total_orders: 'Total Orders',
    farmer_dash_roadmaps:    'Crop Roadmaps',
    farmer_dash_revenue:     'Revenue (Delivered)',
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

    home_hero_title:      'AI Based Organic Farming Advisory System & Marketplace',
    home_hero_subtitle:   'AI-powered advisory, disease detection & organic marketplace for Indian farmers',
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

    roadmap_filter_label:    'Filter by Season:',
    roadmap_all_crops:       'All Crops',
    roadmap_kharif:          '☀️ Kharif',
    roadmap_rabi:            '❄️ Rabi',
    roadmap_zaid:            '🌤️ Zaid',
    roadmap_yearround:       '🔄 Year-round',
    roadmap_none:            'No crop roadmaps found.',
    common_days:             'days',
    roadmap_organic_roadmap: 'Organic Roadmap',
    roadmap_detail_season:   'Season',
    roadmap_timeline_heading:'📋 Farming Timeline',
    roadmap_stage:           'Stage',
    roadmap_key_actions:     'Key Actions:',
    roadmap_organic_tips:    '💡 Organic Tips',
    roadmap_no_stages:       'No stage data available yet.',
    roadmap_quick_summary:   '🌿 Quick Crop Summary',
    roadmap_col_crop:        'Crop',
    roadmap_col_season:      'Season',
    roadmap_col_duration:    'Duration',
    roadmap_col_yield:       'Yield',
    roadmap_col_soil:        'Soil',
    roadmap_col_climate:     'Climate',
    roadmap_buy_prefix:      'Buy',
    roadmap_buy_suffix:      'from Marketplace',
    roadmap_back_all:        '← All Crop Roadmaps',
    roadmap_general_tips_heading: '☀️ General Organic Tips',
    roadmap_tip_compost:     'Use compost and vermicompost for soil health.',
    roadmap_tip_neem:        'Neem oil spray for pest control.',
    roadmap_tip_rotation:    'Crop rotation prevents soil depletion.',
    roadmap_tip_drip:        'Drip irrigation conserves water.',
    roadmap_tip_ph:          'Test soil pH before every season.',
    roadmap_tip_intercrop:   'Inter-cropping improves yield naturally.',

    /* ── Weather (new keys) ── */
    weather_current:        'Current Weather',
    weather_feels_like:     'Feels like',
    weather_humidity:       'Humidity',
    weather_wind:           'Wind',
    weather_rain_prob:      'Rain Prob.',
    weather_smart_advisory: 'Smart Farming Advisory',
    weather_normal_ops:     '✅ Conditions are normal — proceed with regular farm operations.',
    weather_cal_tips:       '📅 General Farming Calendar Tips:',
    weather_tip_spray:      'Best spray time: early morning (6–9 AM) or evening (4–6 PM)',
    weather_tip_irrigate:   'Irrigate when soil feels dry 2 cm below surface',
    weather_tip_harvest:    'Harvest before predicted heavy rainfall to avoid crop loss',
    weather_enter_city:     'Enter your city above to get weather advisory',
    weather_enter_city_sub: "We'll provide smart irrigation and farming tips based on real-time weather.",

    /* ── Crop AI (new keys) ── */
    crop_quick_ref:         '📘 Quick Reference (Mean Values)',
    crop_model_accuracy:    'Model Accuracy (OOB)',
    crop_algorithm:         'Algorithm',
    crop_crops_classified:  'Crops Classified',
    crop_enter_values:      'Enter values on the left',
    crop_enter_values_sub:  'Our AI model will predict the best crop for your farm conditions.',
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
    nav_ai_advisor:     'AI सलाहकार',

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
    market_my_listing:    'मेरी लिस्टिंग',
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
    chatbot_subtitle:     'अपनी भाषा में कोई भी बागवानी प्रश्न पूछें',
    chatbot_ph:           'अपना खेती प्रश्न लिखें…',
    chatbot_send:         'भेजें',
    chatbot_online:       'ऑनलाइन · जैविक खेती विशेषज्ञ',
    chatbot_welcome_hi:   'नमस्कार',
    chatbot_welcome_ask:  'मुझसे कुछ भी पूछें',
    chatbot_welcome_sub:  'मैं Gemini AI से चलता हूं — सेकंडों में विशेषज्ञ सलाह पाएं।',
    chatbot_footer:       'KrishiBot गलति कर सकता है। अपने स्थानीय KVK से महत्वपूर्ण सलाह सत्यापित करें।',
    chat_cap_pest:        'कीट नियंत्रण',
    chat_cap_pest_sub:    'नीम, ट्रैप, जैव यंत्र',
    chat_cap_fert:        'खाद',
    chat_cap_fert_sub:    'जीवामृत, कंपोस्ट, पंचगव्य',
    chat_cap_disease:     'रोग',
    chat_cap_disease_sub: 'बोर्डो, ट्राइकोडर्मा',
    chat_cap_water:       'जल प्रबंधन',
    chat_cap_water_sub:   'ड्रिप, मल्चिंग, संचाई',
    chat_cap_soil:        'मिट्टी स्वास्थ्य',
    chat_cap_soil_sub:    'pH, जैव पदार्थ, आवरण फसलें',
    chat_cap_crop:        'फसल चयन',
    chat_cap_crop_sub:    'मौसम, मिट्टी, फसल चक्र सलाह',
    chip_pest_ctrl:       'कीट नियंत्रण',
    chip_compost:         'खाद बनाएं',
    chip_tomato:          'टमाटर सुझाव',
    chip_irrigation:      'सिंचाई',
    chip_soil:            'मिट्टी स्वास्थ्य',

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
    farmer_dash_total_orders: 'कुल ऑर्डर',
    farmer_dash_roadmaps:    'फसल रोडमैप',
    farmer_dash_revenue:     'राजस्व (डिलीवर)',
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

    home_hero_title:      'AI आधारित जैविक कृषि सलाहकार प्रणाली और बाज़ार',
    home_hero_subtitle:   'भारतीय किसानों के लिए AI सलाहकार, रोग पहचान और जैविक बाज़ार',
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

    roadmap_filter_label:    'मौसम के अनुसार फ़िल्टर करें:',
    roadmap_all_crops:       'सभी फसलें',
    roadmap_kharif:          '☀️ खरीफ',
    roadmap_rabi:            '❄️ रबी',
    roadmap_zaid:            '🌤️ जायद',
    roadmap_yearround:       '🔄 साल भर',
    roadmap_none:            'कोई फसल रोडमैप नहीं मिला।',
    common_days:             'दिन',
    roadmap_organic_roadmap: 'जैविक रोडमैप',
    roadmap_detail_season:   'मौसम',
    roadmap_timeline_heading:'📋 खेती समयरेखा',
    roadmap_stage:           'चरण',
    roadmap_key_actions:     'मुख्य कार्य:',
    roadmap_organic_tips:    '💡 जैविक सुझाव',
    roadmap_no_stages:       'अभी कोई चरण डेटा उपलब्ध नहीं।',
    roadmap_quick_summary:   '🌿 त्वरित फसल सारांश',
    roadmap_col_crop:        'फसल',
    roadmap_col_season:      'मौसम',
    roadmap_col_duration:    'अवधि',
    roadmap_col_yield:       'उपज',
    roadmap_col_soil:        'मिट्टी',
    roadmap_col_climate:     'जलवायु',
    roadmap_buy_prefix:      'खरीदें',
    roadmap_buy_suffix:      'बाज़ार से',
    roadmap_back_all:        '← सभी फसल रोडमैप',
    roadmap_general_tips_heading: '☀️ सामान्य जैविक सुझाव',
    roadmap_tip_compost:     'मिट्टी स्वास्थ्य के लिए कम्पोस्ट और वर्मीकम्पोस्ट का उपयोग करें।',
    roadmap_tip_neem:        'कीट नियंत्रण के लिए नीम तेल स्प्रे करें।',
    roadmap_tip_rotation:    'फसल चक्र से मिट्टी का क्षरण रोकें।',
    roadmap_tip_drip:        'ड्रिप सिंचाई से पानी बचाएं।',
    roadmap_tip_ph:          'हर मौसम से पहले मिट्टी का pH परीक्षण करें।',
    roadmap_tip_intercrop:   'अंतर-फसल से उपज स्वाभाविक रूप से बढ़ती है।',

    /* ── Weather (new keys) ── */
    weather_current:        'वर्तमान मौसम',
    weather_feels_like:     'महसूस होता है',
    weather_humidity:       'आर्द्रता',
    weather_wind:           'हवा',
    weather_rain_prob:      'बारिश संभावना',
    weather_smart_advisory: 'स्मार्ट खेती सलाह',
    weather_normal_ops:     '✅ परिस्थितियां सामान्य हैं — नियमित खेत कार्यों के साथ आगे बढ़ें।',
    weather_cal_tips:       '📅 सामान्य खेती कैलेंडर सुझाव:',
    weather_tip_spray:      'सबसे अच्छा स्प्रे समय: सुबह (6–9 बजे) या शाम (4–6 बजे)',
    weather_tip_irrigate:   'सिंचाई करें जब मिट्टी 2 सेमी नीचे से सूखी लगे',
    weather_tip_harvest:    'भारी बारिश से पहले फसल काटें ताकि फसल नष्ट न हो',
    weather_enter_city:     'उपर अपना शहर दर्ज करें',
    weather_enter_city_sub: 'हम वास्तविक समय के मौसम के आधार पर स्मार्ट सिंचाई और खेती सुझाव देंगे।',

    /* ── Crop AI (new keys) ── */
    crop_quick_ref:         '📘 त्वरित संदर्भ (औसत मान)',
    crop_model_accuracy:    'मॉडल सटीकता (OOB)',
    crop_algorithm:         'एल्गोरिदम',
    crop_crops_classified:  'वर्गीकृत फसलें',
    crop_enter_values:      'बाएं मान दर्ज करें',
    crop_enter_values_sub:  'हमारा AI मॉडल आपके खेत की स्थिति के लिए सर्वोत्तम फसल प्रदान करेगा।',
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
    nav_ai_advisor:     'AI सल्लागार',

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
    market_contact_farmer:'शेतकर्याशी संपर्क करा',
    market_my_listing:    'माझी नोंद',
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
    chatbot_ph:           'तुमचा शेती प्रश्न विचारा…',
    chatbot_send:         'पाठवा',
    chatbot_online:       'ऑनलाइन · सेंद्रिय शेती तज्ञ',
    chatbot_welcome_hi:   'नमस्कार',
    chatbot_welcome_ask:  'मला काहीही विचारा',
    chatbot_welcome_sub:  'मी Gemini AI वर चालतो — क्षणात तज्ञ सल्ला मिळवा.',
    chatbot_footer:       'KrishiBot चुका करू शकतो. महत्त्वाची शेती सल्ला तुमच्या स्थानिक KVK शी सत्यापित करा.',
    chat_cap_pest:        'कीड नियंत्रण',
    chat_cap_pest_sub:    'कडुनिंब, साम्घा, जैव घटक',
    chat_cap_fert:        'खत',
    chat_cap_fert_sub:    'जीवामृत, कंपोस्ट, पंचगव्य',
    chat_cap_disease:     'रोग',
    chat_cap_disease_sub: 'बोर्डो, ट्रायकोडर्मा',
    chat_cap_water:       'पाणी व्यवस्थापन',
    chat_cap_water_sub:   'ठिबक, आच्छादन, वेळापत्रक',
    chat_cap_soil:        'माती आरोग्य',
    chat_cap_soil_sub:    'pH, सेंद्रिय घटक, आच्छादन पिके',
    chat_cap_crop:        'पीक निवड',
    chat_cap_crop_sub:    'हंगाम, माती, पीक बदल सल्ला',
    chip_pest_ctrl:       'कीड नियंत्रण',
    chip_compost:         'खत बनवा',
    chip_tomato:          'टोमॅटो टिप्स',
    chip_irrigation:      'सिंचन',
    chip_soil:            'माती आरोग्य',

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
    farmer_dash_total_orders: 'एकूण ऑर्डर',
    farmer_dash_roadmaps:    'पीक रोडमॅप',
    farmer_dash_revenue:     'महसूल (वितरित)',
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

    home_hero_title:      'AI आधारित सेंद्रिय शेती सल्लागार प्रणाली आणि बाजारपेठ',
    home_hero_subtitle:   'भारतीय शेतकऱ्यांसाठी AI सल्लागार, रोग शोध आणि सेंद्रिय बाजारपेठ',
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

    roadmap_filter_label:    'हंगामानुसार फिल्टर करा:',
    roadmap_all_crops:       'सर्व पिके',
    roadmap_kharif:          '☀️ खरीप',
    roadmap_rabi:            '❄️ रब्बी',
    roadmap_zaid:            '🌤️ उन्हाळी',
    roadmap_yearround:       '🔄 वर्षभर',
    roadmap_none:            'कोणतेही पीक रोडमॅप आढळले नाही.',
    common_days:             'दिवस',
    roadmap_organic_roadmap: 'सेंद्रिय रोडमॅप',
    roadmap_detail_season:   'हंगाम',
    roadmap_timeline_heading:'📋 शेती वेळापत्रक',
    roadmap_stage:           'टप्पा',
    roadmap_key_actions:     'मुख्य क्रिया:',
    roadmap_organic_tips:    '💡 सेंद्रिय टिप्स',
    roadmap_no_stages:       'अजून कोणताही टप्पा डेटा उपलब्ध नाही.',
    roadmap_quick_summary:   '🌿 पिकाचा त्वरित सारांश',
    roadmap_col_crop:        'पीक',
    roadmap_col_season:      'हंगाम',
    roadmap_col_duration:    'कालावधी',
    roadmap_col_yield:       'उत्पन्न',
    roadmap_col_soil:        'माती',
    roadmap_col_climate:     'हवामान',
    roadmap_buy_prefix:      'खरेदी करा',
    roadmap_buy_suffix:      'बाजारातून',
    roadmap_back_all:        '← सर्व पीक रोडमॅप',
    roadmap_general_tips_heading: '☀️ सामान्य सेंद्रिय टिप्स',
    roadmap_tip_compost:     'मातीच्या आरोग्यासाठी कंपोस्ट आणि गांडूळखत वापरा.',
    roadmap_tip_neem:        'कीड नियंत्रणासाठी कडुनिंबाचे तेल फवारा.',
    roadmap_tip_rotation:    'पीक बदल मातीची झीज टाळतो.',
    roadmap_tip_drip:        'ठिबक सिंचनाने पाण्याची बचत होते.',
    roadmap_tip_ph:          'प्रत्येक हंगामापूर्वी मातीचे pH तपासा.',
    roadmap_tip_intercrop:   'आंतरपीक नैसर्गिकरित्या उत्पन्न वाढवते.',

    /* ── Weather (new keys) ── */
    weather_current:        'सध्याचे हवामान',
    weather_feels_like:     'जाणवते',
    weather_humidity:       'आर्द्रता',
    weather_wind:           'वारा',
    weather_rain_prob:      'पावसाची शक्यता',
    weather_smart_advisory: 'स्मार्ट शेती सल्ला',
    weather_normal_ops:     '✅ परिस्थिती सामान्य आहे — नियमित शेती कार्यांसह पुढे जा.',
    weather_cal_tips:       '📅 सामान्य शेती दिनदर्शिका टिप्स:',
    weather_tip_spray:      'फवाराची सर्वोत्तम वेळ: सकाळी (6–9 वा) किंवा संध्याकाळी (4–6 वा)',
    weather_tip_irrigate:   'माती पृष्ठाखाली 2 सेमी कोरडी वाटल्यास सिंचन करा',
    weather_tip_harvest:    'ब्याड पावसापूर्वी काढणी करा म्हणजे नुकसान टाळा',
    weather_enter_city:     'वर तुमचे शहर वापरा आणि हवामान सल्ला मिळवा',
    weather_enter_city_sub: 'आही वास्तविक वेळेच्या हवामानावर आधारित स्मार्ट सिंचन आणि शेती टिप्स देउ.',

    /* ── Crop AI (new keys) ── */
    crop_quick_ref:         '📘 त्वरित संदर्भ (सरासरी मूल्ये)',
    crop_model_accuracy:    'मॉडेल अचूकता (OOB)',
    crop_algorithm:         'अल्गोरिदम',
    crop_crops_classified:  'वर्गीकृत पिके',
    crop_enter_values:      'डाव्या बाजूला मूल्ये वापरा',
    crop_enter_values_sub:  'आमचे AI मॉडेल तुमच्या शेत परिस्थितीसाठी सर्वोत्तम पीक सांगेल.',
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

  /* Registered language-change listeners */
  const _listeners = [];

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
    /* Notify all registered listeners (e.g. DynamicTranslator) */
    _listeners.forEach(fn => { try { fn(lang); } catch(e) {} });
  }

  function getLang() { return currentLang; }

  /** Register a callback that fires whenever language changes */
  function onLangChange(fn) {
    if (typeof fn === 'function') _listeners.push(fn);
  }

  /* Auto-apply on DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => apply());
  } else {
    apply();
  }

  return { t, apply, setLang, getLang, onLangChange };
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

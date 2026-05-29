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
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      I18n.setLang(btn.dataset.lang);
    });
  });
});

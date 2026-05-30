/**
 * translate.js
 * ─────────────────────────────────────────────────────────────
 * Dynamic content translator for Dharti Rakshak.
 * Translates any element marked with [data-translate] from
 * English → Hindi / Marathi using the /api/translate endpoint.
 *
 * Usage in templates:
 *   <span data-translate>Some English text from DB</span>
 *   <li data-translate>Action from database JSON</li>
 *
 * The engine:
 *  1. Reads current language from I18n.getLang()
 *  2. Collects all [data-translate] elements on the page
 *  3. Batches their text and calls /api/translate
 *  4. Caches results in localStorage (key = lang+hash)
 *  5. Swaps element text with translations
 *  6. Re-runs whenever language changes
 * ─────────────────────────────────────────────────────────────
 */

const DynamicTranslator = (() => {

  const CACHE_PREFIX = 'krishi_tx_';
  const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

  /* ── Simple hash (djb2) for cache key generation ── */
  function hashText(s) {
    let h = 5381;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
    return (h >>> 0).toString(36);
  }

  /* ── Load from localStorage ── */
  function cacheGet(key) {
    try {
      const raw = localStorage.getItem(CACHE_PREFIX + key);
      if (!raw) return null;
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts > CACHE_TTL_MS) { localStorage.removeItem(CACHE_PREFIX + key); return null; }
      return data;
    } catch { return null; }
  }

  /* ── Save to localStorage ── */
  function cacheSet(key, data) {
    try {
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ data, ts: Date.now() }));
    } catch { /* quota exceeded — ignore */ }
  }

  /* ── Show a translation progress indicator ── */
  function showBar() {
    let bar = document.getElementById('tx-progress-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'tx-progress-bar';
      bar.style.cssText = `
        position:fixed; top:0; left:0; width:0%; height:3px; z-index:9999;
        background:linear-gradient(90deg,#2ed573,#1e8449);
        transition:width 0.4s ease; border-radius:0 2px 2px 0;
        box-shadow: 0 0 8px rgba(46,213,115,0.6);
      `;
      document.body.appendChild(bar);
    }
    bar.style.width = '30%';
    return bar;
  }

  function hideBar(bar) {
    if (!bar) return;
    bar.style.width = '100%';
    setTimeout(() => { bar.style.opacity = '0'; setTimeout(() => bar.remove(), 400); }, 300);
  }

  /* ── Core translate function ── */
  async function translatePage(lang) {
    if (!lang || lang === 'en') {
      restoreOriginals();
      return;
    }

    const elements = Array.from(document.querySelectorAll('[data-translate]'));
    if (!elements.length) return;

    // Store original text if not already stored
    elements.forEach(el => {
      if (!el.dataset.originalText) {
        el.dataset.originalText = el.innerText.trim();
      }
    });

    const originals = elements.map(el => el.dataset.originalText);
    const cacheKey  = lang + '_' + hashText(originals.join('|'));
    const cached    = cacheGet(cacheKey);

    if (cached && cached.length === originals.length) {
      applyTranslations(elements, cached);
      return;
    }

    const bar = showBar();

    try {
      const res = await fetch('/api/translate', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ texts: originals, target: lang })
      });
      bar.style.width = '80%';

      if (!res.ok) { hideBar(bar); return; }
      const data = await res.json();

      if (data.translations && data.translations.length === originals.length) {
        cacheSet(cacheKey, data.translations);
        applyTranslations(elements, data.translations);
      }
    } catch (err) {
      console.warn('DynamicTranslator: fetch failed', err);
    } finally {
      hideBar(bar);
    }
  }

  function applyTranslations(elements, translations) {
    elements.forEach((el, i) => {
      if (translations[i] && translations[i] !== el.dataset.originalText) {
        // Preserve child elements (like <strong>, emoji spans)
        // by only replacing text nodes when possible
        el.innerText = translations[i];
      }
    });
  }

  function restoreOriginals() {
    document.querySelectorAll('[data-translate]').forEach(el => {
      if (el.dataset.originalText) {
        el.innerText = el.dataset.originalText;
      }
    });
  }

  /* ── Public API ── */
  return {
    init() {
      // Run on page load with current language
      const lang = typeof I18n !== 'undefined' && I18n.getLang ? I18n.getLang() : 'en';
      if (lang !== 'en') translatePage(lang);

      // Hook into I18n language changes
      if (typeof I18n !== 'undefined' && I18n.onLangChange) {
        I18n.onLangChange(newLang => translatePage(newLang));
      }
    },
    translate: translatePage,
    clearCache() {
      Object.keys(localStorage)
        .filter(k => k.startsWith(CACHE_PREFIX))
        .forEach(k => localStorage.removeItem(k));
    }
  };
})();

/* Auto-init when DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => DynamicTranslator.init());
} else {
  DynamicTranslator.init();
}

/**
 * translate.js — Free translation utility using MyMemory API
 *
 * ⚠️  API NOT CONNECTED — Pending integration:
 *   - Primary:  MyMemory (free, no key needed for low volume)
 *   - Upgrade:  Set VITE_TRANSLATE_API_KEY in .env to use a paid tier
 *              or swap the fetch URL for Google Cloud Translation / DeepL
 *
 * MyMemory free tier: 500 words/day per IP — no API key required.
 * Paid tier: add key param `&key=YOUR_KEY` to the URL.
 */

const TRANSLATE_API_KEY = import.meta.env.VITE_TRANSLATE_API_KEY || "";

/**
 * Translate text to a target language using MyMemory API.
 * @param {string} text        — The text to translate
 * @param {string} targetLang  — ISO 639-1 code ("en", "fr", "am")
 * @param {string} sourceLang  — Source language code (default: "auto")
 * @returns {Promise<string>}  — Translated text, or original on failure
 */
export async function translateText(text, targetLang = "en", sourceLang = "auto") {
  if (!text || !text.trim()) return text;
  if (sourceLang === targetLang) return text;

  // MyMemory uses "en-GB", "fr-FR" etc. — map our short codes
  const langMap = { en: "en-GB", fr: "fr-FR", am: "am-ET" };
  const tl = langMap[targetLang] || targetLang;
  const sl = sourceLang === "auto" ? "" : (langMap[sourceLang] || sourceLang);

  const langPair = sl ? `${sl}|${tl}` : `|${tl}`;
  const keyParam = TRANSLATE_API_KEY ? `&key=${TRANSLATE_API_KEY}` : "";

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}${keyParam}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data?.responseStatus === 200 && data?.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
    throw new Error("Translation failed: " + data?.responseStatus);
  } catch (err) {
    console.warn("[EthioExplore] Translation error:", err.message);
    return text; // Graceful fallback — return original
  }
}

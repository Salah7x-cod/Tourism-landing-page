/**
 * chatbotIntents.js — Rule-based chatbot intent tree for EthioExplore
 *
 * ⚠️  AI API NOT CONNECTED — Pending integration:
 *   - Set VITE_OPENAI_API_KEY  for OpenAI GPT-4o
 *   - Set VITE_GEMINI_API_KEY  for Google Gemini
 *   - Set VITE_ANTHROPIC_API_KEY for Claude
 *   Once connected, replace the matchIntent() lookup with a real API call.
 *
 * Structure: array of { patterns: string[], response: { en, am, fr } }
 */

export const INTENTS = [
  {
    patterns: ["hello", "hi", "hey", "greetings", "bonjour", "salut", "ሰላም", "ሃይ"],
    response: {
      en: "Hello! 👋 Welcome to EthioExplore! I can help you discover Ethiopia's most breathtaking destinations, plan your trip, handle bookings, or answer questions about our services. What would you like to explore?",
      fr: "Bonjour ! 👋 Bienvenue sur EthioExplore ! Je peux vous aider à découvrir les destinations les plus magnifiques d'Éthiopie, planifier votre voyage ou répondre à vos questions. Que souhaitez-vous explorer ?",
      am: "ሰላም! 👋 ወደ ኢትዮ ኤክስፕሎር እንኳን ደህና መጡ! የኢትዮጵያን ድንቅ መዳረሻዎች ለማግኘት፣ ጉዞዎን ለማቀድ ወይም ጥያቄዎችዎን ለመመለስ ዝግጁ ነኝ። ምን ማስስ ይፈልጋሉ?",
    },
  },
  {
    patterns: ["book", "booking", "reserve", "reservation", "trip", "réserver", "réservation", "voyage", "ቦታ ያስይዙ", "ቦታ", "ጉዞ"],
    response: {
      en: "📅 **Booking a Trip:**\n1. Browse destinations in **Explore** or the home page.\n2. Click a destination → tap **'Book This Trip'**.\n3. Select your travel dates and number of travelers.\n4. Click **'Confirm Booking'** — you'll receive a confirmation email.\n\nNeed help finding the perfect destination?",
      fr: "📅 **Réserver un voyage :**\n1. Parcourez les destinations dans **Explorer**.\n2. Cliquez sur une destination → appuyez sur **'Réserver ce voyage'**.\n3. Sélectionnez vos dates et le nombre de voyageurs.\n4. Cliquez sur **'Confirmer la réservation'** — vous recevrez un email de confirmation.\n\nBesoin d'aide pour choisir ?",
      am: "📅 **ጉዞ ለማስያዝ:**\n1. **ያስሱ** ክፍልን ወይም ዋና ገጹን ይጎብኙ።\n2. መዳረሻ ይምረጡ → **'ጉዞ ያስይዙ'** ይጫኑ።\n3. የጉዞ ቀኖችዎን እና ተጓዦቹ ቁጥር ይምረጡ።\n4. **'ቦታ ያስይዙ'** ይጫኑ — የማረጋገጫ ኢሜይል ይደርስዎታል።",
    },
  },
  {
    patterns: ["pay", "payment", "price", "cost", "fee", "payer", "paiement", "prix", "ክፍያ", "ዋጋ"],
    response: {
      en: "💳 **Payment Information:**\n- We accept **Visa, Mastercard, and Telebirr** (Ethiopia's mobile money).\n- All prices shown in USD — auto-converted to your selected currency.\n- Secure SSL-encrypted transactions.\n- Full refund available up to **48 hours** before your trip.\n\nFor payment issues, email: **payments@ethioexplore.com**",
      fr: "💳 **Informations de paiement :**\n- Nous acceptons **Visa, Mastercard et Telebirr**.\n- Les prix sont affichés en USD et convertis dans votre devise.\n- Transactions sécurisées par SSL.\n- Remboursement intégral disponible jusqu'à **48 heures** avant le voyage.\n\nProblème de paiement ? Email : **payments@ethioexplore.com**",
      am: "💳 **የክፍያ መረጃ:**\n- **Visa፣ Mastercard እና Telebirr** ተቀባዮ ነን።\n- ዋጋዎች በዶላር ታይተው ወደ ምርጦ ምንዛሬ ይቀየራሉ።\n- SSL የተሸፈነ ደህንነቱ የተጠበቀ ግብይት።\n- ሙሉ ተመላሽ ስለ **48 ሰዓት** ቀደም ብሎ ይቻላል።\n\nለክፍያ ጉዳይ: **payments@ethioexplore.com**",
    },
  },
  {
    patterns: ["destination", "place", "where", "visit", "go", "destination", "lieu", "visiter", "aller", "መዳረሻ", "ቦታ", "ጎብኚ"],
    response: {
      en: "🗺️ **Top Destinations in Ethiopia:**\n- 🦁 **Simien Mountains** — UNESCO World Heritage trekking\n- 🏺 **Lalibela** — Ancient rock-hewn churches (12th century)\n- 🌊 **Danakil Depression** — Earth's lowest & hottest landscape\n- 🐘 **Omo Valley** — Diverse indigenous tribes\n- 🦒 **Awash National Park** — Wildlife & bird watching\n- ⛪ **Axum** — Ancient obelisks & the Ark of the Covenant\n\nVisit our **Explore** page to see all destinations!",
      fr: "🗺️ **Meilleures destinations en Éthiopie :**\n- 🦁 **Montagnes du Simien** — Trekking UNESCO\n- 🏺 **Lalibela** — Églises rupestres (XIIe siècle)\n- 🌊 **Dépression du Danakil** — Paysage le plus bas et chaud\n- 🐘 **Vallée de l'Omo** — Tribus indigènes diverses\n- 🦒 **Parc national d'Awash** — Faune et observation d'oiseaux\n- ⛪ **Axoum** — Obélisques antiques\n\nVisitez notre page **Explorer** !",
      am: "🗺️ **ዋና የኢትዮጵያ መዳረሻዎች:**\n- 🦁 **ስሜን ተራሮች** — UNESCO የቅርስ ቦታ\n- 🏺 **ላሊበላ** — ጥንታዊ የቋጥኝ አብያተ ክርስቲያናት\n- 🌊 **ዳናኪል ቆላ** — ዓለም ዝቅተኛ ምድር\n- 🐘 **የኦሞ ሸለቆ** — ልዩ ብሔረሰቦች\n- 🦒 **አዋሽ ብሔራዊ ፓርክ** — የዱር እንስሳ ቦታ\n- ⛪ **አክሱም** — ጥንታዊ ሐውልቶች\n\n**ያስሱ** ገጻችንን ይጎብኙ!",
    },
  },
  {
    patterns: ["service", "offer", "provide", "what do you do", "service", "offre", "fournir", "que faites-vous", "አገልግሎት", "ምን ትሰጣላችሁ"],
    response: {
      en: "✨ **EthioExplore Services (8 total):**\n1. 🏔️ Cultural & Heritage Tours\n2. 🥾 Trekking & Hiking Expeditions\n3. 📸 Photography Tour Packages\n4. 🎉 Festival & Event Experiences\n5. 🦁 Wildlife Safari Safaris\n6. 🛤️ Historic Route Guided Journeys\n7. 📖 Community Travel Blog Platform\n8. 🤝 Personalized Trip Planning\n\nAll services include professional local guides and 24/7 support.",
      fr: "✨ **Services EthioExplore (8 au total) :**\n1. 🏔️ Circuits culturels et patrimoniaux\n2. 🥾 Expéditions de trekking et randonnée\n3. 📸 Forfaits circuits photo\n4. 🎉 Expériences festivals et événements\n5. 🦁 Safaris animaliers\n6. 🛤️ Voyages guidés sur routes historiques\n7. 📖 Plateforme de blog communautaire\n8. 🤝 Planification de voyage personnalisée\n\nTous nos services incluent des guides locaux professionnels.",
      am: "✨ **የኢትዮ ኤክስፕሎር አገልግሎቶች (8 ጠቅላላ):**\n1. 🏔️ ባህላዊ እና ቅርሳቅርስ ጉብኝቶች\n2. 🥾 ተራራ መውጣት ጉዞዎች\n3. 📸 የፎቶ ጉብኝት ፓኬጆች\n4. 🎉 የበዓልና ዝግጅት ተሞክሮዎች\n5. 🦁 የዱር አራዊት ሳፋሪ\n6. 🛤️ ታሪካዊ መንገድ ጉብኝቶች\n7. 📖 ማህበረሰባዊ ብሎግ መድረክ\n8. 🤝 ግላዊ የጉዞ እቅድ\n\nሁሉም አገልግሎቶች ሙያዊ አካባቢ መሪዎችን ያካትታሉ።",
    },
  },
  {
    patterns: ["contact", "email", "phone", "support", "help", "contacter", "email", "téléphone", "aide", "ያግኙ", "ኢሜይል", "ስልክ", "ድጋፍ"],
    response: {
      en: "📬 **Contact EthioExplore:**\n- 📧 General: **info@ethioexplore.com**\n- 💳 Payments: **payments@ethioexplore.com**\n- 🌐 Website: **www.ethioexplore.com**\n- ⏰ Support: 9AM–6PM EAT (Mon–Sat)\n\nFor complex requests, I'll escalate your query to our team! Just describe your issue.",
      fr: "📬 **Contacter EthioExplore :**\n- 📧 Général : **info@ethioexplore.com**\n- 💳 Paiements : **payments@ethioexplore.com**\n- 🌐 Site : **www.ethioexplore.com**\n- ⏰ Support : 9h–18h (Lun–Sam)\n\nPour les demandes complexes, je transmets votre requête à notre équipe !",
      am: "📬 **ኢትዮ ኤክስፕሎርን ያግኙ:**\n- 📧 አጠቃላይ: **info@ethioexplore.com**\n- 💳 ክፍያ: **payments@ethioexplore.com**\n- 🌐 ድረ-ገጽ: **www.ethioexplore.com**\n- ⏰ ድጋፍ: 9AM–6PM (ሰኞ–ቅዳሜ)\n\nለውስብስብ ጥያቄዎች ወደ ቡድናችን አስተላልፋለሁ!",
    },
  },
  {
    patterns: ["weather", "climate", "best time", "season", "when to go", "météo", "climat", "meilleure saison", "ወቅት", "አየር", "መቼ"],
    response: {
      en: "🌤️ **Best Time to Visit Ethiopia:**\n- **Oct–Jan** (Dry season) — Best overall. Clear skies, excellent trekking.\n- **Feb–May** (Short rains) — Fewer crowds, lush landscapes.\n- **Jun–Sep** (Rainy/Kiremt) — Waterfalls peak; some roads impassable.\n\n🎉 **Timkat Festival** (Jan 19–20) & **Meskel** (Sep 27) are must-experiences!",
      fr: "🌤️ **Meilleure période pour visiter l'Éthiopie :**\n- **Oct–Jan** (Saison sèche) — Idéale. Ciels clairs, trekking excellent.\n- **Fév–Mai** (Petites pluies) — Moins de monde, paysages verdoyants.\n- **Jun–Sep** (Saison des pluies) — Cascades magnifiques.\n\n🎉 Le festival **Timkat** (19-20 jan) et **Meskel** (27 sep) sont incontournables !",
      am: "🌤️ **ኢትዮጵያን ለመጎብኘት ምርጥ ጊዜ:**\n- **ጥቅምት–ጥር** (ደረቅ ወቅት) — ምርጡ። ጨምቀ ሰማይ፣ ተራራ ለመውጣት ምቹ።\n- **የካቲት–ሚያዝያ** (አጭር ዝናብ) — ጥቂት ጎብኚ፣ ለምለም ቦታዎች።\n- **ሰኔ–መስከረም** (ክረምት) — ፏፏቴዎች ቁመት ላይ።\n\n🎉 **ጥምቀት** (ጥር 11) እና **መስቀል** (መስከረም 17) ልምዱ ዋጋ ያለው!",
    },
  },
  {
    patterns: ["cancel", "refund", "annuler", "remboursement", "ሰርዝ", "ተመላሽ"],
    response: {
      en: "🔄 **Cancellation & Refund Policy:**\n- Cancel **48+ hours before**: Full refund ✅\n- Cancel **24–48 hours before**: 50% refund ⚠️\n- Cancel **< 24 hours before**: No refund ❌\n\nTo cancel, go to **Dashboard → My Bookings → Cancel**.\nFor urgent help: **info@ethioexplore.com**",
      fr: "🔄 **Politique d'annulation et de remboursement :**\n- Annulation **48h+ avant** : Remboursement complet ✅\n- Annulation **24–48h avant** : 50% remboursé ⚠️\n- Annulation **< 24h avant** : Pas de remboursement ❌\n\nPour annuler : **Tableau de bord → Mes réservations → Annuler**",
      am: "🔄 **የሰርዛ እና ተመላሽ ፖሊሲ:**\n- **48+ ሰዓት ቀደም ብሎ** ሰርዛ: ሙሉ ተመላሽ ✅\n- **24–48 ሰዓት ቀደም ብሎ**: 50% ተመላሽ ⚠️\n- **24 ሰዓት ወደ ታች**: ተመላሽ የለም ❌\n\nለሰርዛ: **ዳሽቦርድ → ቦታ ማስያዝ → ሰርዝ**",
    },
  },
  {
    patterns: ["visa", "passport", "entry", "require", "visas", "passeport", "entrée", "exigences", "ቪዛ", "ፓስፖርት"],
    response: {
      en: "🛂 **Visa & Entry Requirements:**\n- Most nationalities can get an **e-Visa online** at evisa.gov.et.\n- African Union citizens: Visa-free ✅\n- Typical processing: **3–5 business days**.\n- Yellow fever vaccination required from certain countries.\n\nAlways check your country's current requirements before travel.",
      fr: "🛂 **Exigences visa et entrée :**\n- La plupart des nationalités peuvent obtenir un **e-Visa** sur evisa.gov.et.\n- Citoyens de l'Union Africaine : Sans visa ✅\n- Traitement : **3 à 5 jours ouvrables**.\n- Vaccination contre la fièvre jaune requise de certains pays.",
      am: "🛂 **ቪዛ እና ወደ ሀገር የመግቢያ መስፈርቶች:**\n- አብዛኛዎቹ ዜጎች **ኢ-ቪዛ** ከ evisa.gov.et ማግኘት ይችላሉ።\n- የአፍሪካ ህብረት ዜጎች: ቪዛ አያስፈልጋቸውም ✅\n- ሂደት: **3–5 የስራ ቀናት**።\n- ከብዙ ሀገራት የቢጫ ትኩሳት ክትባት ያስፈልጋል።",
    },
  },
  {
    patterns: ["thank", "thanks", "merci", "ありがとう", "gracias", "አመሰግናለሁ", "ጥሩ"],
    response: {
      en: "You're very welcome! 😊 It's our pleasure to help you explore the wonders of Ethiopia. Is there anything else I can assist you with?",
      fr: "De rien ! 😊 C'est notre plaisir de vous aider à explorer les merveilles de l'Éthiopie. Puis-je vous aider avec autre chose ?",
      am: "እንኳን ደስ አለዎ! 😊 የኢትዮጵያ ድንቅ ቦታዎችን ለማሳወቅ ደስ ይለናል። ሌላ ምን ልረዳዎ?",
    },
  },
];

const DEFAULT_RESPONSE = {
  en: "I'm not sure I understand that completely. 🤔 Here's what I can help with:\n- **Bookings & reservations**\n- **Destinations & top spots**\n- **Payment & pricing**\n- **Visa & entry requirements**\n- **Cancellation policy**\n- **Our services (8 types)**\n- **Weather & best time to visit**\n\nOr type **'contact'** to reach our team directly!",
  fr: "Je ne suis pas sûr de comprendre complètement. 🤔 Voici ce que je peux faire :\n- **Réservations**\n- **Destinations**\n- **Paiements et tarifs**\n- **Visa et conditions d'entrée**\n- **Politique d'annulation**\n- **Nos services**\n\nTapez **'contact'** pour joindre notre équipe !",
  am: "ሙሉ በሙሉ አልገባኝም። 🤔 ልረዳ የምችለው:\n- **ቦታ ማስያዝ**\n- **መዳረሻዎች**\n- **ክፍያ**\n- **ቪዛ**\n- **የሰርዛ ፖሊሲ**\n- **አገልግሎቶቻችን**\n\n**'ያግኙ'** ብለው ቡድናችንን ያናግሩ!",
};

/**
 * Match user input to a known intent.
 * @param {string} input — Raw user message
 * @param {string} lang  — Current language code
 * @returns {string}     — Response text in current language
 */
export function matchIntent(input, lang = "en") {
  const lower = input.toLowerCase().trim();
  if (!lower) return DEFAULT_RESPONSE[lang] || DEFAULT_RESPONSE.en;

  for (const intent of INTENTS) {
    if (intent.patterns.some((p) => lower.includes(p.toLowerCase()))) {
      return intent.response[lang] || intent.response.en;
    }
  }
  return DEFAULT_RESPONSE[lang] || DEFAULT_RESPONSE.en;
}

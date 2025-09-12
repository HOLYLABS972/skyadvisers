export const locales = ["en", "he"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const translations = {
  en: {
    // Navigation
    "nav.services": "Services",
    "nav.about": "About Us",
    "nav.testimonials": "Testimonials",
    "nav.blog": "Blog",
    "nav.contact": "Contact",

    // Hero Section
    "hero.title": "Strategic Advisory for Visionary Leaders",
    "hero.subtitle":
      "Empowering CEOs and founders with expert guidance on investment, startup evaluation, and business strategy.",
    "hero.cta": "Get Started",

    // Services
    "services.title": "Our Services",
    "services.investment.title": "Investment Advisory",
    "services.investment.description": "Expert guidance on funding strategies and investor relations.",
    "services.evaluation.title": "Startup Evaluation",
    "services.evaluation.description": "Comprehensive assessment of startup potential and market viability.",
    "services.strategy.title": "Business Strategy",
    "services.strategy.description": "Strategic planning and execution for sustainable growth.",

    // About
    "about.title": "About Skyadvisers",
    "about.description":
      "We are a team of experienced advisors dedicated to helping CEOs and founders navigate the complex world of business strategy and investment.",

    // Blog
    "blog.title": "Insights & Expertise",
    "blog.subtitle":
      "Stay informed with the latest insights on business strategy, investment trends, and startup guidance from our expert advisors.",
    "blog.search": "Search articles...",
    "blog.readMore": "Read more",
    "blog.backToBlog": "Back to Blog",
    "blog.moreArticles": "More Articles",

    // Contact
    "contact.title": "Get In Touch",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.submit": "Send Message",

    // Footer
    "footer.address": "123 Business District, Tel Aviv, Israel",
    "footer.phone": "+972-3-123-4567",
    "footer.email": "info@skyadvisers.com",
  },
  he: {
    // Navigation
    "nav.services": "שירותים",
    "nav.about": "אודותינו",
    "nav.testimonials": "המלצות",
    "nav.blog": "בלוג",
    "nav.contact": "צור קשר",

    // Hero Section
    "hero.title": "ייעוץ אסטרטגי למנהיגים בעלי חזון",
    "hero.subtitle": "מעצימים מנכ״לים ומייסדים עם הדרכה מומחית בהשקעות, הערכת סטארט-אפים ואסטרטגיה עסקית.",
    "hero.cta": "התחל עכשיו",

    // Services
    "services.title": "השירותים שלנו",
    "services.investment.title": "ייעוץ השקעות",
    "services.investment.description": "הדרכה מומחית באסטרטגיות מימון ויחסי משקיעים.",
    "services.evaluation.title": "הערכת סטארט-אפים",
    "services.evaluation.description": "הערכה מקיפה של פוטנציאל סטארט-אפים וכדאיות שוק.",
    "services.strategy.title": "אסטרטגיה עסקית",
    "services.strategy.description": "תכנון אסטרטגי וביצוע לצמיחה בת קיימא.",

    // About
    "about.title": "אודות Skyadvisers",
    "about.description":
      "אנחנו צוות של יועצים מנוסים המוקדשים לעזור למנכ״לים ומייסדים לנווט בעולם המורכב של אסטרטגיה עסקית והשקעות.",

    // Blog
    "blog.title": "תובנות וExpertיות",
    "blog.subtitle":
      "הישארו מעודכנים עם התובנות האחרונות על אסטרטגיה עסקית, מגמות השקעה והדרכת סטארט-אפים מהיועצים המומחים שלנו.",
    "blog.search": "חפש מאמרים...",
    "blog.readMore": "קרא עוד",
    "blog.backToBlog": "חזור לבלוג",
    "blog.moreArticles": "מאמרים נוספים",

    // Contact
    "contact.title": "צור קשר",
    "contact.name": "שם",
    "contact.email": "אימייל",
    "contact.message": "הודעה",
    "contact.submit": "שלח הודעה",

    // Footer
    "footer.address": "רחוב העסקים 123, תל אביב, ישראל",
    "footer.phone": "+972-3-123-4567",
    "footer.email": "info@skyadvisers.com",
  },
}

export function getTranslation(locale: Locale, key: string): string {
  const keys = key.split(".")
  let value: any = translations[locale]

  for (const k of keys) {
    value = value?.[k]
  }

  return value || key
}

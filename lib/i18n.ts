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
    "hero.badge": "Strategic Business Advisory",
    "hero.welcome.title": "Welcome to Skyadvisors",
    "hero.welcome.subtitle": "Your trusted business advisory partner",
    "hero.stats.startups": "Startups Advised",
    "hero.stats.funding": "Funding Raised",
    "hero.stats.years": "Years Experience",
    "hero.stats.success": "Success Rate",

    // Clients
    "clients.title": "Our Clients",

    // Services
    "services.title": "Our Services",
    "services.investment.title": "Investment Advisory",
    "services.investment.description": "Expert guidance on funding strategies and investor relations.",
    "services.evaluation.title": "Startup Evaluation",
    "services.evaluation.description": "Comprehensive assessment of startup potential and market viability.",
    "services.strategy.title": "Business Strategy",
    "services.strategy.description": "Strategic planning and execution for sustainable growth.",

    // About
    "about.title": "About Skyadvisors",
    "about.description":
      "We are a team of experienced advisors dedicated to helping CEOs and founders navigate the complex world of business strategy and investment.",
    "about.features.expertTeam.title": "Expert Team",
    "about.features.expertTeam.desc": "Seasoned professionals with decades of combined experience",
    "about.features.provenResults.title": "Proven Results",
    "about.features.provenResults.desc": "Track record of successful exits and funding rounds",
    "about.features.globalReach.title": "Global Reach",
    "about.features.globalReach.desc": "International network of investors and partners",

    // Testimonials
    "testimonials.subtitle": "What our clients say about working with us",
    "testimonials.items.0.name": "Sarah Chen",
    "testimonials.items.0.title": "CEO, TechFlow",
    "testimonials.items.0.content":
      "Skyadvisors helped us navigate our Series A funding round with incredible expertise. Their strategic guidance was invaluable.",
    "testimonials.items.1.name": "David Rodriguez",
    "testimonials.items.1.title": "Founder, InnovateLab",
    "testimonials.items.1.content":
      "The team's deep understanding of the startup ecosystem and investor mindset made all the difference in our growth strategy.",
    "testimonials.items.2.name": "Rachel Kim",
    "testimonials.items.2.title": "CEO, DataVision",
    "testimonials.items.2.content":
      "Professional, insightful, and results-driven. Skyadvisors exceeded our expectations in every aspect of their service.",

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
    "contact.subtitle": "Ready to take your business to the next level? Let's discuss your goals.",
    "contact.sendMessage": "Send us a message",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.submit": "Send Message",
    "contact.sending": "Sending...",
    "contact.emailLabel": "Email",
    "contact.phoneLabel": "Phone",
    "contact.addressLabel": "Address",
    "contact.businessHours": "Business Hours",
    "contact.mondayFriday": "Monday - Friday",
    "contact.saturday": "Saturday",
    "contact.sunday": "Sunday",
    "contact.closed": "Closed",
    "contact.placeholders.name": "Your full name",
    "contact.placeholders.email": "your.email@company.com",
    "contact.placeholders.message": "Tell us about your business goals and how we can help...",
    "contact.toasts.success.title": "Message sent successfully!",
    "contact.toasts.success.desc": "We'll get back to you within 24 hours.",
    "contact.toasts.error.title": "Error sending message",
    "contact.toasts.error.desc": "Please try again or contact us directly.",

    // Footer
    "footer.quickLinks": "Quick Links",
    "footer.contactInfo": "Contact Info",
    "footer.email": "Email",
    "footer.phone": "Phone",
    "footer.address": "Address",
    "footer.privacyPolicy": "Privacy Policy",
    "footer.termsOfService": "Terms of Service",
    "footer.cookiePolicy": "Cookie Policy",
    "footer.allRightsReserved": "All rights reserved",
    "footer.addressValue": "123 Business District, Tel Aviv, Israel",
    "footer.phoneValue": "+972-3-123-4567",
    "footer.emailValue": "info@skyadvisers.com",
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
    "hero.badge": "ייעוץ עסקי אסטרטגי",
      "hero.welcome.title": " Skyadvisors ברוכים הבאים",
    "hero.welcome.subtitle": "שותף הייעוץ העסקי המהימן שלכם",
    "hero.stats.startups": "סטארטאפים שליווינו",
    "hero.stats.funding": "מימון שגויס",
    "hero.stats.years": "שנות ניסיון",
    "hero.stats.success": "שיעור הצלחה",

    // Clients
    "clients.title": "הלקוחות שלנו",

    // Services
    "services.title": "השירותים שלנו",
    "services.investment.title": "ייעוץ השקעות",
    "services.investment.description": "הדרכה מומחית באסטרטגיות מימון ויחסי משקיעים.",
    "services.evaluation.title": "הערכת סטארט-אפים",
    "services.evaluation.description": "הערכה מקיפה של פוטנציאל סטארט-אפים וכדאיות שוק.",
    "services.strategy.title": "אסטרטגיה עסקית",
    "services.strategy.description": "תכנון אסטרטגי וביצוע לצמיחה בת קיימא.",

    // About
    "about.title": "אודות Skyadvisors",
    "about.description":
      "אנחנו צוות של יועצים מנוסים המוקדשים לעזור למנכ״לים ומייסדים לנווט בעולם המורכב של אסטרטגיה עסקית והשקעות.",
    "about.features.expertTeam.title": "צוות מומחים",
    "about.features.expertTeam.desc": "אנשי מקצוע ותיקים עם עשורים של ניסיון מצטבר",
    "about.features.provenResults.title": "תוצאות מוכחות",
    "about.features.provenResults.desc": "רקורד של אקזיטים מוצלחים וסבבי גיוס",
    "about.features.globalReach.title": "נוכחות גלובלית",
    "about.features.globalReach.desc": "רשת בינלאומית של משקיעים ושיתופי פעולה",

    // Testimonials
    "testimonials.subtitle": "מה הלקוחות שלנו אומרים על העבודה איתנו",
    "testimonials.items.0.name": "Sarah Chen",
    "testimonials.items.0.title": "מנכ״לית, TechFlow",
    "testimonials.items.0.content":
      "Skyadvisors סייעו לנו לנווט את סבב גיוס ה‑Series A במקצועיות יוצאת דופן. ההכוונה האסטרטגית שלהם הייתה בלתי‑החלפה.",
    "testimonials.items.1.name": "David Rodriguez",
    "testimonials.items.1.title": "מייסד, InnovateLab",
    "testimonials.items.1.content":
      "ההבנה העמוקה של הצוות את אקוסיסטם הסטארטאפים ואת מחשבת המשקיעים עשתה את כל ההבדל באסטרטגיית הצמיחה שלנו.",
    "testimonials.items.2.name": "Rachel Kim",
    "testimonials.items.2.title": "מנכ״לית, DataVision",
    "testimonials.items.2.content":
      "מקצועיים, חדים ומוכווני תוצאות. Skyadvisors עלו על כל הציפיות בכל היבט של השירות.",

    // Blog
    "blog.title": "תובנות ומומחיות",
    "blog.subtitle":
      "הישארו מעודכנים עם התובנות האחרונות על אסטרטגיה עסקית, מגמות השקעה והדרכת סטארט-אפים מהיועצים המומחים שלנו.",
    "blog.search": "חפש מאמרים...",
    "blog.readMore": "קרא עוד",
    "blog.backToBlog": "חזור לבלוג",
    "blog.moreArticles": "מאמרים נוספים",

    // Contact
    "contact.title": "צור קשר",
    "contact.subtitle": "מוכנים לקחת את העסק שלכם לשלב הבא? בואו נדבר על המטרות שלכם.",
    "contact.sendMessage": "שלחו לנו הודעה",
    "contact.name": "שם",
    "contact.email": "אימייל",
    "contact.message": "הודעה",
    "contact.submit": "שלח הודעה",
    "contact.sending": "שולח...",
    "contact.emailLabel": "אימייל",
    "contact.phoneLabel": "טלפון",
    "contact.addressLabel": "כתובת",
    "contact.businessHours": "שעות פעילות",
    "contact.mondayFriday": "יום שני - יום שישי",
    "contact.saturday": "יום שבת",
    "contact.sunday": "יום ראשון",
    "contact.closed": "סגור",
    "contact.placeholders.name": "השם המלא שלכם",
    "contact.placeholders.email": "your.email@company.com",
    "contact.placeholders.message": "ספרו לנו על המטרות העסקיות שלכם ואיך אנחנו יכולים לעזור...",
    "contact.toasts.success.title": "הודעה נשלחה בהצלחה!",
    "contact.toasts.success.desc": "נחזור אליכם תוך 24 שעות.",
    "contact.toasts.error.title": "שגיאה בשליחת ההודעה",
    "contact.toasts.error.desc": "אנא נסו שוב או צרו קשר ישירות.",

    // Footer
    "footer.quickLinks": "קישורים מהירים",
    "footer.contactInfo": "פרטי יצירת קשר",
    "footer.email": "אימייל",
    "footer.phone": "טלפון",
    "footer.address": "כתובת",
    "footer.privacyPolicy": "מדיניות פרטיות",
    "footer.termsOfService": "תנאי שירות",
    "footer.cookiePolicy": "מדיניות עוגיות",
    "footer.allRightsReserved": "כל הזכויות שמורות",
    "footer.addressValue": "רחוב העסקים 123, תל אביב, ישראל",
    "footer.phoneValue": "+972-3-123-4567",
    "footer.emailValue": "info@skyadvisers.com",
  },
}

export function getTranslation(key: string, locale: Locale): string {
  const translation = translations[locale]
  if (!translation) {
    console.warn(`No translations found for locale: ${locale}`)
    return key
  }
  
  const result = (translation as any)[key]
  if (result === undefined) {
    console.warn(`Translation key "${key}" not found for locale "${locale}"`)
    return key
  }
  
  return result
}

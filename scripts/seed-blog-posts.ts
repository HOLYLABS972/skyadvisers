// Seed script to create sample blog posts for testing

import { getAdminDb } from "@/lib/firebase-admin"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"

const samplePosts = [
  {
    title: "The Future of Startup Investment in 2024",
    slug: "future-startup-investment-2024",
    excerpt:
      "Explore the emerging trends and opportunities shaping the startup investment landscape in 2024, from AI-driven ventures to sustainable business models.",
    content: `The startup investment landscape is evolving rapidly in 2024, driven by technological advances and changing market dynamics.

Key trends we're observing:

1. **AI and Machine Learning Integration**
   Startups leveraging AI are attracting significant investor attention, particularly those solving real-world problems with practical applications.

2. **Sustainability Focus**
   Environmental, Social, and Governance (ESG) criteria are becoming central to investment decisions, with green tech startups leading the charge.

3. **Remote-First Business Models**
   The pandemic has permanently shifted how we think about work, creating opportunities for startups that enable distributed teams.

4. **Fintech Evolution**
   Beyond traditional banking disruption, we're seeing innovation in areas like embedded finance and cryptocurrency infrastructure.

For founders seeking investment, it's crucial to understand these trends and position your startup accordingly. The key is demonstrating not just innovative technology, but sustainable business models that can scale effectively.

At Skyadvisers, we help founders navigate this complex landscape, providing strategic guidance on positioning, valuation, and investor relations.`,
    status: "published",
    locale: "en",
    author: "Skyadvisers Team",
  },
  {
    title: "מדריך להערכת סטארט-אפים: מה משקיעים באמת מחפשים",
    slug: "startup-evaluation-guide-hebrew",
    excerpt: "מדריך מקיף להבנת תהליך הערכת סטארט-אפים מנקודת המבט של משקיעים, כולל הקריטריונים החשובים ביותר להצלחה.",
    content: `הערכת סטארט-אפים היא תהליך מורכב הדורש הבנה עמוקה של השוק, הטכנולוגיה והצוות.

הקריטריונים העיקריים להערכה:

1. **גודל השוק והזדמנות**
   משקיעים מחפשים שווקים גדולים עם פוטנציאל צמיחה משמעותי.

2. **איכות הצוות**
   הצוות המייסד הוא לעתים קרובות הגורם החשוב ביותרIntialized ההשקעה.

3. **המוצר והטכנולוגיה**
   יתרון טכנולוגי ברור ומוצר שפותר בעיה אמיתית.

4. **מודל עסקי בר קיימא**
   דרך ברורה להפקת רווחים וצמיחה.

5. **תחרות ומיקום**
   הבנת הנוף התחרותי והיתרון הייחודי.

בסקיי-אדוויזרס, אנו מסייעים למייסדים להכין את הסטארט-אפ שלהם להערכה מקצועית ולהציג את הפוטנציאל שלהם בצורה הטובה ביותר.`,
    status: "published",
    locale: "he",
    author: "צוות Skyadvisers",
  },
  {
    title: "Building Strategic Partnerships: A CEO's Guide",
    slug: "building-strategic-partnerships-ceo-guide",
    excerpt:
      "Learn how successful CEOs identify, negotiate, and maintain strategic partnerships that drive business growth and competitive advantage.",
    content: `Strategic partnerships can be game-changers for businesses of all sizes. As a CEO, your ability to identify and cultivate these relationships often determines your company's trajectory.

**Identifying the Right Partners**

Look for companies that complement your strengths and fill your gaps. The best partnerships are mutually beneficial, where both parties bring unique value to the table.

**Key Partnership Types:**
- Technology integrations
- Distribution channels
- Co-marketing opportunities
- Joint ventures
- Supplier relationships

**Negotiation Best Practices**

1. Start with alignment on vision and values
2. Define clear success metrics
3. Establish governance structures
4. Plan for conflict resolution
5. Build in flexibility for growth

**Maintaining Long-term Success**

Regular communication, performance reviews, and adaptation to changing market conditions are essential for partnership longevity.

Remember: the best partnerships feel less like contracts and more like extensions of your own team.`,
    status: "draft",
    locale: "en",
    author: "Skyadvisers Team",
  },
]

async function seedBlogPosts() {
  try {
    console.log("Seeding blog posts...")

    for (const post of samplePosts) {
      const docRef = await addDoc(collection(getAdminDb(), "blog_posts"), {
        ...post,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      console.log(`Created blog post: ${post.title} (ID: ${docRef.id})`)
    }

    console.log("Blog posts seeded successfully!")
    return { success: true }
  } catch (error) {
    console.error("Error seeding blog posts:", error)
    return { success: false, error }
  }
}

// Export for use in other scripts
export { seedBlogPosts }

// Run if called directly
if (require.main === module) {
  seedBlogPosts()
}

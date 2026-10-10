import type { Competitor } from "./competitors";

/**
 * Product Bundles comparison records.
 *
 * Facts below were checked against public sources in October 2026.
 * App Store ratings/review counts and plan prices are taken from each
 * listing on the check date. If the App Store shows a feature, the cell
 * is yes. If we could not confirm a fact from public docs, the cell is
 * Unclear. Install counts are omitted — Shopify does not publish them.
 *
 * The Appfox column was checked against bundles-app-new main (08ad87e)
 * on 9 October 2026. POS is still Unclear.
 *
 * Check date: October 2026.
 */

const CHECKED = "October 2026";

export const bundleCompetitors: Competitor[] = [
  {
    app: "product-bundles",
    slug: "kaching-bundles",
    name: "Kaching Bundles App & Upsells",
    shortName: "Kaching Bundles",
    category: "Product Bundles & Upsells",
    tagline:
      "Kaching is the category's most-reviewed bundle app, with POS, layouts, and live chat to match. Appfox Product Bundles covers the same core offer types - and stays free.",
    framing:
      "Kaching has the reviews, the Built for Shopify badge, and a mature widget system; the comparison comes down to whether you need that depth, or unlimited volume discounts, mix-and-match, and BOGO without a revenue-metered bill.",
    metaTitle: "Kaching Alternative: Appfox Product Bundles vs Kaching (2026)",
    metaDescription:
      "Looking for a Kaching Bundles alternative? Appfox is free, with volume discounts, mix-and-match, BOGO, and FBT. Kaching has 6,000+ reviews, POS, and a sales meter from $14.99/mo.",
    intro:
      "Kaching Bundles App & Upsells is the Shopify App Store's most-reviewed dedicated bundle app as of October 2026: 5.0 from 6,243 reviews, a Built for Shopify badge, and a listing that covers quantity breaks, fixed and mix-and-match bundles, BOGO, free gifts, progress bars, A/B testing, Shopify POS, and nine storefront languages. That depth is real, and so is the price: live stores start at $14.99/month for up to $1,000 of additional revenue, then $29.99 / $59.99 and higher Flex Billing tiers as attributed revenue grows. Appfox Product Bundles is the smaller, newer app - 5.0 from 4 reviews, seven storefront languages, POS unclear - that still ships the offer types most stores actually run (volume discounts, fixed bundles, mix-and-match, BOGO, FBT) for $0.",
    bestFor:
      "Merchants who want volume discounts, mix-and-match, and BOGO without paying a percentage of the extra revenue those offers create - and who can live with a younger widget and a much smaller review base.",
    whyAppfox: [
      {
        title: "Free, with no additional-revenue meter",
        description:
          "Kaching's paid plans are the same feature set at every tier; you pay more as the app attributes more additional revenue, and bundles pause if you hit the cap. Appfox Product Bundles is free to install, with no paid plans published on its listing.",
      },
      {
        title: "The offer types most stores actually run",
        description:
          "Volume and quantity-break discounts, fixed bundles, mix-and-match / build-a-box, and BOGO are on both listings. If that is the job, you do not need Kaching's progress bars, gift-wrap add-ons, or POS to get it done.",
      },
      {
        title: "A quieter settings surface",
        description:
          "Kaching's strength is a dense builder: layouts, custom CSS/HTML, drag-and-drop, multi-currency. Appfox is the simpler bet - theme-integrated Shopify 2.0 widgets, set up in about five minutes.",
      },
      {
        title: "Predictable cost as bundles work",
        description:
          "Kaching's help center is explicit: plans do not auto-downgrade, and hitting the monthly additional-revenue limit pauses bundles until the next cycle or an upgrade. Appfox has no published usage cap.",
      },
    ],
    comparison: [
      { feature: "Price (live stores)", appfox: "Free", competitor: "From $14.99/mo" },
      { feature: "Pricing model", appfox: "Free, no limits", competitor: "From $14.99/mo, scales with sales" },
      { feature: "Free plan for live stores", appfox: true, competitor: "Free on dev stores" },
      { feature: "Shopify App Store rating", appfox: "5.0 (4 reviews)", competitor: "5.0 (6,243 reviews)" },
      { feature: "Built for Shopify badge", appfox: false, competitor: true },
      { feature: "Volume discounts & quantity breaks", appfox: true, competitor: true },
      { feature: "Fixed / classic bundles", appfox: true, competitor: true },
      { feature: "Mix & match / build-a-box", appfox: true, competitor: true },
      { feature: "BOGO / Buy X Get Y", appfox: true, competitor: true },
      { feature: "Frequently bought together", appfox: true, competitor: true },
      { feature: "A/B testing", appfox: true, competitor: true },
      { feature: "Progress bars", appfox: "Step indicator on Build-a-Box", competitor: true },
      { feature: "Free gifts / gift wrap", appfox: "Gifts; wrap via checkbox add-on", competitor: true },
      { feature: "Shopify POS", appfox: "Unclear", competitor: true },
      { feature: "Widget / layout customization", appfox: "4 layouts, 3 badge styles, brand presets", competitor: "Multiple layouts, CSS/HTML" },
      { feature: "Storefront languages", appfox: "7 languages + Shopify locales", competitor: "9 languages" },
      { feature: "Analytics dashboard", appfox: true, competitor: true },
    ],
    faq: [
      {
        q: "Is Appfox a real alternative to Kaching Bundles?",
        a: "For the core job - quantity breaks, fixed bundles, mix-and-match, BOGO, and a product-page widget - yes. Kaching is ahead on reviews, POS, layout variety, progress bars, and live chat. Appfox is ahead on price: free, with no additional-revenue cap published.",
      },
      {
        q: "How does Kaching's pricing actually work?",
        a: "Kaching's App Store plans start at $14.99/month for up to $1,000 of additional revenue, then $29.99 (up to $5,000) and $59.99 (up to $10,000). Their help center documents further Flex Billing tiers up to $299/month above $50,000 of additional revenue. Features are the same across plans; the meter is attributed revenue. Hitting the cap pauses bundles until you upgrade or the month resets.",
      },
      {
        q: "When is Kaching the better choice?",
        a: "If you need Shopify POS, a large template library, progress bars, subscriptions inside bundles, or the reassurance of 6,000+ reviews and a Built for Shopify badge, Kaching is the stronger product. Pay for that depth when you will use it.",
      },
    ],
    whereTheyWin: [
      {
        title: "Reviews, badge, and installed confidence",
        description:
          "Kaching's 5.0 from 6,243 reviews and Built for Shopify badge are in a different league from Appfox's 5.0 from 4 reviews. That social proof is a real reason to pick them, especially on a Plus store that has to justify the app to a team.",
      },
      {
        title: "Widget look-and-feel and template variety",
        description:
          "Kaching's listing and help center emphasize multiple layouts, drag-and-drop, custom CSS/HTML, progress bars, and fine-grained styling. Appfox ships theme-integrated widgets. If matching a highly designed theme pixel-for-pixel is the job, Kaching is further along.",
      },
      {
        title: "POS, gifts, and subscriptions in the bundle",
        description:
          "Kaching lists Shopify POS, free gifts, gift wrap, subscription boxes, and a Kaching Subscriptions connector. Appfox's listing works with Checkout and Shopify Admin only. Those channels are missing on our side.",
      },
      {
        title: "Languages and live chat",
        description:
          "Kaching lists nine storefront languages and live chat support. Appfox ships seven built-in languages plus any Shopify locale, and in-app live chat. Kaching still wins on review volume and the extra two languages.",
      },
    ],
    sources: [
      { label: "Kaching Bundles App Store listing", url: "https://apps.shopify.com/bundle-deals" },
      { label: "Kaching Flex Billing help article", url: "https://support.kachingappz.com/en/articles/12290748-understanding-flex-billing-performance-based-pricing" },
      { label: "Kaching billing-plan differences", url: "https://support.kachingappz.com/en/articles/8367481-what-s-the-difference-between-billing-plans" },
      { label: "Appfox Product Bundles App Store listing", url: "https://apps.shopify.com/trust-bundles" },
    ],
    checked: CHECKED,
  },
  {
    app: "product-bundles",
    slug: "fast-bundle",
    name: "FBP | Fast Bundle & Upsell App",
    shortName: "Fast Bundle",
    category: "Product Bundles & Upsells",
    tagline:
      "Fast Bundle is a broad bundle-and-upsell suite with AI frequently-bought-together and bundle-as-product. Appfox Product Bundles does the core offers, free, without a sales meter.",
    framing:
      "Fast Bundle prices live stores on monthly bundle sales from $19/month; Appfox Product Bundles is free, so the real question is whether you need AI recommendations and bundle-as-product, or volume discounts and mix-and-match that simply run.",
    metaTitle: "Fast Bundle Alternative: Appfox Product Bundles vs Fast Bundle (2026)",
    metaDescription:
      "Looking for a Fast Bundle alternative? Appfox is free for volume discounts, mix-and-match, and BOGO. Fast Bundle adds AI FBT and bundle-as-product, from $19/mo as sales grow.",
    intro:
      "Fast Bundle (FBP) is one of the broadest bundle suites on the App Store: 5.0 from 3,533 reviews, mix-and-match, fixed bundles, BOGO, Buy X Get Y, volume discounts, product add-ons, AI-powered frequently bought together, and a dedicated bundle-as-product flow. Live pricing is a sales meter - Standard plans at $19 / $49 / $139 per month tied to monthly bundle revenue, with a free tier for development stores and eligible merchants up to $500/month, and an Enterprise tier (listed around $249–$299/month) for unlimited revenue, cart detection, and POS. Appfox Product Bundles is narrower and free: the common offer types, theme-integrated widgets, and analytics, without AI merchandising or a published paid ladder.",
    bestFor:
      "Stores that want mix-and-match, quantity breaks, and BOGO on a free app - and do not need Fast Bundle's AI frequently-bought-together or bundle-as-product architecture.",
    whyAppfox: [
      {
        title: "No bundle-sales meter",
        description:
          "Fast Bundle's live plans step up as monthly revenue generated through the app grows. Appfox Product Bundles publishes a single free install, with no usage-based paid tiers on its listing.",
      },
      {
        title: "Core offers without the suite",
        description:
          "Both listings cover fixed bundles, mix-and-match, volume discounts, and BOGO / Buy X Get Y. If you are not buying AI recommendations or combo-as-product SKUs, the extra surface is optional.",
      },
      {
        title: "Analytics without a higher tier",
        description:
          "Appfox includes bundle performance reports on the free install. Fast Bundle's App Store analytics tags are real; several advanced merchandising tools sit on Standard or Enterprise.",
      },
      {
        title: "A five-minute setup",
        description:
          "Fast Bundle is a large product - add-ons, FBT, combo products, page-builder connectors. Appfox is built to create an offer, drop a Shopify 2.0 block, and go live the same afternoon.",
      },
    ],
    comparison: [
      { feature: "Price (live stores)", appfox: "Free", competitor: "From $19/mo" },
      { feature: "Pricing model", appfox: "Free, no limits", competitor: "From $19/mo, scales with sales" },
      { feature: "Free plan", appfox: "Free, no limits", competitor: "Free on dev stores, or up to $500/mo" },
      { feature: "Shopify App Store rating", appfox: "5.0 (4 reviews)", competitor: "5.0 (3,533 reviews)" },
      { feature: "Volume discounts & quantity breaks", appfox: true, competitor: true },
      { feature: "Fixed / classic bundles", appfox: true, competitor: true },
      { feature: "Mix & match / build-a-box", appfox: true, competitor: true },
      { feature: "BOGO / Buy X Get Y", appfox: true, competitor: true },
      { feature: "Frequently bought together", appfox: true, competitor: "AI FBT on paid plans" },
      { feature: "Bundle as a product (combo SKU)", appfox: false, competitor: true },
      { feature: "Product add-ons", appfox: true, competitor: true },
      { feature: "Shopify POS", appfox: "Unclear", competitor: "Enterprise plan" },
      { feature: "Subscription-app integrations", appfox: false, competitor: "Standard+" },
      { feature: "Storefront languages", appfox: "7 languages + Shopify locales", competitor: "10 languages" },
      { feature: "Analytics dashboard", appfox: true, competitor: true },
    ],
    faq: [
      {
        q: "Is Fast Bundle more expensive than Appfox?",
        a: "For a live store, yes, once you leave their free/eligible tier. Fast Bundle's App Store Standard plans start at $19/month for up to $1,000 of monthly bundle sales, then $49 and $139. Appfox Product Bundles lists a free install with no paid plans.",
      },
      {
        q: "Does Fast Bundle do things Appfox does not?",
        a: "Yes. Their site documents bundle-as-product, AI frequently bought together (paid), product add-ons, subscription-app integrations on Standard, and POS plus auto cart detection on Enterprise. Appfox does not list those.",
      },
      {
        q: "When is Fast Bundle the better choice?",
        a: "When you want one suite for combo products, AI recommendations, add-ons, and (on Enterprise) POS - and you are comfortable paying a monthly fee tied to bundle sales. If you only need quantity breaks and mix-and-match, Appfox covers that job at $0.",
      },
    ],
    whereTheyWin: [
      {
        title: "AI frequently bought together and bundle-as-product",
        description:
          "Fast Bundle's own pricing page lists AI FBT (paid) and bundle-as-product on every plan. Appfox's listing tags FBT as a category; it does not describe an AI recommender or a combo-SKU builder. If that architecture is the job, they are ahead.",
      },
      {
        title: "Review base and integrations",
        description:
          "3,533 reviews versus 4, plus named connectors for PageFly, GemPages, UpCart, and several subscription apps. Appfox lists Checkout and Shopify Admin only.",
      },
      {
        title: "POS and high-GMV tooling",
        description:
          "Their pricing page puts Shopify POS, auto bundle detection, and priority onboarding on Enterprise. Appfox does not list POS. High-volume stores that sell bundles in-store will use what they charge for.",
      },
      {
        title: "Languages",
        description:
          "Fast Bundle lists ten storefront languages. Appfox lists English. Non-English storefronts should start with Fast Bundle (or another multilingual app), not us.",
      },
    ],
    sources: [
      { label: "Fast Bundle App Store listing", url: "https://apps.shopify.com/fast-bundle-product-bundles" },
      { label: "Fast Bundle pricing page", url: "https://fastbundle.co/pricing/" },
      { label: "Appfox Product Bundles App Store listing", url: "https://apps.shopify.com/trust-bundles" },
    ],
    checked: CHECKED,
  },
  {
    app: "product-bundles",
    slug: "bundler",
    name: "Bundler » Product Bundles App",
    shortName: "Bundler",
    category: "Product Bundles",
    tagline:
      "Bundler earned a following with a useful free plan and flat paid tiers. Appfox Product Bundles puts mix-and-match and analytics on the free install, not behind an upgrade.",
    framing:
      "Bundler's free plan is genuinely useful for volume discounts and Buy X Get Y; mix-and-match and analytics sit on $9.99 and $19.99 plans. Appfox includes those on a free listing, with a much smaller review base.",
    metaTitle: "Bundler Alternative: Appfox Product Bundles vs Bundler (2026)",
    metaDescription:
      "Looking for a Bundler alternative? Appfox includes mix-and-match and analytics on a free install. Bundler’s free plan is strong for volume discounts and POS; mix-and-match starts at $9.99/mo.",
    intro:
      "Bundler is a long-running, Built for Shopify bundle app: 4.9 from 2,719 reviews, launched in 2019, with a free plan that is not a demo. That free tier includes unlimited revenue, Buy X Get Y, volume discounts and quantity breaks, product-page upsells, Shopify POS, and auto-apply discounts. Mix-and-match, landing pages, and funnel upsells unlock at $9.99/month; the analytics dashboard is $19.99/month. Appfox Product Bundles is newer and much less proven (4 reviews) but lists mix-and-match, BOGO, volume discounts, and analytics on a free install, without POS or Bundler's 17 listing languages.",
    bestFor:
      "Merchants who want mix-and-match and bundle analytics without stepping onto Bundler's paid tiers - and who do not need POS or a 17-language widget.",
    whyAppfox: [
      {
        title: "Mix-and-match on the free install",
        description:
          "Bundler's App Store pricing puts Mix & Match, tiered Mix & Match, and sectioned Mix & Match on the $9.99 plan. Appfox lists mix-and-match / customer-built bundles on the free listing.",
      },
      {
        title: "Analytics without $19.99/month",
        description:
          "Bundler's $19.99 plan is the analytics tier: total revenue, AOV, conversions, sales, discounts, most-popular bundles. Appfox lists sales and revenue reports on the free install.",
      },
      {
        title: "No upgrade ladder for the core job",
        description:
          "If your program is quantity breaks plus a couple of mix-and-match boxes plus a dashboard, Bundler wants two paid tiers. Appfox publishes one free plan for that set.",
      },
      {
        title: "A smaller surface to configure",
        description:
          "Bundler covers landing pages, funnel upsells, subscription-product hooks, and POS. Useful when you need them; extra when you do not. Appfox stays on the product-page widget.",
      },
    ],
    comparison: [
      { feature: "Price", appfox: "Free", competitor: "Free, then $9.99 / $19.99/mo" },
      { feature: "Free-plan revenue cap", appfox: "None", competitor: "Unlimited revenue & orders" },
      { feature: "Shopify App Store rating", appfox: "5.0 (4 reviews)", competitor: "4.9 (2,719 reviews)" },
      { feature: "Built for Shopify badge", appfox: false, competitor: true },
      { feature: "Volume discounts & quantity breaks", appfox: true, competitor: "On free plan" },
      { feature: "Buy X Get Y", appfox: true, competitor: "On free plan" },
      { feature: "Mix & match / build-a-box", appfox: true, competitor: "From $9.99/mo" },
      { feature: "Bundle analytics", appfox: true, competitor: "From $19.99/mo" },
      { feature: "Product-page upsells", appfox: true, competitor: "On free plan" },
      { feature: "Custom landing pages", appfox: "Hosted Build-a-Box page", competitor: "From $9.99/mo" },
      { feature: "Shopify POS", appfox: "Unclear", competitor: "On free plan" },
      { feature: "Subscription-product integration", appfox: false, competitor: true },
      { feature: "Storefront languages", appfox: "7 languages + Shopify locales", competitor: "17 languages" },
    ],
    faq: [
      {
        q: "Bundler has a real free plan - why would I use Appfox?",
        a: "Bundler's free plan is strong for volume discounts, Buy X Get Y, and POS. Mix-and-match and the analytics dashboard are paid. Appfox lists those two on the free install. Pick Bundler if POS or the free volume-discount tier is the job; pick Appfox if mix-and-match plus analytics at $0 matters more.",
      },
      {
        q: "Does Bundler cost more as I sell more bundles?",
        a: "No. Bundler's paid plans are advertised as flat monthly prices with no limits on revenue generated by the app. That is a genuine advantage versus Kaching or Fast Bundle's sales meters - and versus nothing, if you stay on Bundler's free volume-discount tier.",
      },
      {
        q: "When is Bundler the better choice?",
        a: "When you need Shopify POS on day one, a Built for Shopify badge, a 17-language widget, or subscription-product hooks - or when volume discounts alone on their free plan already do the job. Their review base is also two thousand times Appfox's.",
      },
    ],
    whereTheyWin: [
      {
        title: "A useful free plan for volume discounts",
        description:
          "Bundler's free tier includes unlimited revenue, quantity breaks, Buy X Get Y, product-page upsells, and POS. That is a better free plan than most of this category if you only need quantity breaks - including, on POS, better than Appfox.",
      },
      {
        title: "POS, languages, and the Built for Shopify badge",
        description:
          "POS is on Bundler's free plan. The listing names 17 languages. Built for Shopify is on the listing. Appfox has none of those three.",
      },
      {
        title: "Tenure and reviews",
        description:
          "Launched July 2019, 2,719 reviews. Appfox launched January 2025 with 4 reviews. For a risk-averse install, Bundler is the safer name.",
      },
      {
        title: "Landing pages and subscription hooks",
        description:
          "Paid Bundler plans add custom landing pages, funnel upsells, and integration with subscription products. Appfox does not list those.",
      },
    ],
    sources: [
      { label: "Bundler App Store listing", url: "https://apps.shopify.com/bundler-product-bundles" },
      { label: "Appfox Product Bundles App Store listing", url: "https://apps.shopify.com/trust-bundles" },
    ],
    checked: CHECKED,
  },
  {
    app: "product-bundles",
    slug: "simple-bundles",
    name: "Simple Bundles & Kits",
    shortName: "Simple Bundles",
    category: "Kits & Inventory Bundles",
    tagline:
      "Simple Bundles is the operations app: multi-SKU kits, 3PL sync, packing-slip breakdown. Appfox Product Bundles is the offer app: volume discounts and mix-and-match on the storefront.",
    framing:
      "Simple Bundles solves kitting and inventory - component sync, 3PL, POS. Appfox Product Bundles solves the product-page offer. They overlap on mix-and-match; they are not the same job.",
    metaTitle: "Simple Bundles Alternative: Appfox Product Bundles vs Simple Bundles (2026)",
    metaDescription:
      "Looking for a Simple Bundles alternative for storefront offers? Appfox is the free product-page app. Simple Bundles is the kitting and 3PL app — a different job.",
    intro:
      "Simple Bundles & Kits (Freshly Commerce) is a Built for Shopify app rated 4.9 from 804 reviews, and merchants praise it for a reason that has little to do with widgets: it breaks a bundle into component SKUs, syncs inventory across 3PL / WMS / ERP, and prints packing slips that warehouse teams can pick. The free plan is capped at 3 bundles and 50 monthly orders; paid plans are $14 / $39 / $149 per month and add unlimited bundles, POS locations, Shopify Flow, and Hydrogen. Appfox Product Bundles is a different product - storefront offers (volume discounts, mix-and-match, BOGO) with theme widgets and analytics, free, with no published kitting or 3PL story.",
    bestFor:
      "Merchants who need a storefront bundle offer - not a kitting and fulfillment system - and want that offer on a free install.",
    whyAppfox: [
      {
        title: "Unlimited bundles on the free listing",
        description:
          "Simple Bundles' free plan is 3 bundles and 50 monthly orders. Appfox lists unlimited bundles and all of its offer types on the free install.",
      },
      {
        title: "Built for the product page, not the warehouse",
        description:
          "If the job is a quantity-break widget or a mix-and-match box on a Shopify 2.0 theme, Appfox is aimed at that moment. Simple Bundles is aimed at the pick list.",
      },
      {
        title: "No plan ladder for the offer itself",
        description:
          "Simple Bundles' paid tiers unlock locations, Flow, headless, and higher order volume. Appfox does not publish that ladder because it is not selling operations features.",
      },
      {
        title: "A shorter path to the first live offer",
        description:
          "Create the bundle, drop the app block, preview. Simple Bundles can also do storefront work - merchants mention standalone bundle product pages - but the product is deeper than that setup.",
      },
    ],
    comparison: [
      { feature: "Price", appfox: "Free", competitor: "Free (capped), then $14 / $39 / $149/mo" },
      { feature: "Free-plan limits", appfox: "None", competitor: "3 bundles, 50 orders/mo" },
      { feature: "Shopify App Store rating", appfox: "5.0 (4 reviews)", competitor: "4.9 (804 reviews)" },
      { feature: "Built for Shopify badge", appfox: false, competitor: true },
      { feature: "Volume discounts & quantity breaks", appfox: true, competitor: true },
      { feature: "Mix & match / BYOB", appfox: true, competitor: true },
      { feature: "BOGO", appfox: true, competitor: true },
      { feature: "Component SKU breakdown for fulfillment", appfox: false, competitor: true },
      { feature: "3PL / WMS / ERP inventory sync", appfox: false, competitor: true },
      { feature: "Shopify POS", appfox: "Unclear", competitor: "Paid plans" },
      { feature: "Shopify Flow", appfox: false, competitor: "Grow & Advanced+" },
      { feature: "Hydrogen / headless", appfox: false, competitor: "Plus plan" },
      { feature: "AI bundle suggestions", appfox: false, competitor: "On free plan" },
      { feature: "Storefront languages", appfox: "7 languages + Shopify locales", competitor: "English, French, Japanese" },
    ],
    faq: [
      {
        q: "Can Appfox replace Simple Bundles for kits?",
        a: "Not if you depend on component-level inventory, 3PL sync, or packing-slip breakdown. Those are Simple Bundles' strengths and Appfox does not have them. Appfox is a storefront offer app, not a kitting system.",
      },
      {
        q: "Is Simple Bundles' free plan comparable to Appfox's?",
        a: "No. Simple Bundles' free plan is 3 bundles and 50 monthly orders. Appfox is free with no bundle cap. Simple Bundles' free tier is a trial of the operations product; Appfox's is the whole product.",
      },
      {
        q: "When is Simple Bundles the better choice?",
        a: "Whenever fulfillment is the hard problem: multi-SKU kits, 3PLs that need component lines, POS, Flow, or a headless storefront. Pay $14–$149/month for that. Do not install Appfox expecting a warehouse app.",
      },
    ],
    whereTheyWin: [
      {
        title: "Kitting, inventory, and 3PL",
        description:
          "Simple Bundles' listing and reviews center on automatic SKU breakdown, realtime component inventory, and connections to 3PL / WMS / MCF / ShipStation. Appfox lists theme widgets and sales reports. We do not claim a fulfillment engine we have not listed.",
      },
      {
        title: "POS, Flow, and headless",
        description:
          "Paid Simple Bundles plans add POS (single location, then unlimited), Shopify Flow, and Hydrogen. Appfox lists Checkout and Shopify Admin only.",
      },
      {
        title: "AI suggestions and review volume",
        description:
          "AI bundle suggestions from order history sit on their free plan. 804 reviews versus 4. If you want a product that has already survived complicated catalogs, start there.",
      },
      {
        title: "Standalone bundle product pages",
        description:
          "Merchants note that Simple Bundles can build on a real product page rather than only injecting a widget. Appfox's public pages describe Shopify 2.0 app blocks. Different delivery model; theirs is better when you need a dedicated kit URL with compare-at sync.",
      },
    ],
    sources: [
      { label: "Simple Bundles & Kits App Store listing", url: "https://apps.shopify.com/simple-bundles" },
      { label: "Appfox Product Bundles App Store listing", url: "https://apps.shopify.com/trust-bundles" },
    ],
    checked: CHECKED,
  },
  {
    app: "product-bundles",
    slug: "wide-bundles",
    name: "Wide Bundles ‑ Quantity Breaks",
    shortName: "Wide Bundles",
    category: "Quantity Breaks & Design",
    tagline:
      "Wide Bundles sells design control - 100+ customization options and A/B tests. Appfox Product Bundles sells a free, theme-native widget for the same offer types.",
    framing:
      "Wide Bundles meters live stores on additional revenue from $14.99/month and leads with 100+ design options; Appfox Product Bundles is free, with widgets that inherit your theme instead of a large design studio.",
    metaTitle: "Wide Bundles Alternative: Appfox Product Bundles vs Wide Bundles (2026)",
    metaDescription:
      "Looking for a Wide Bundles alternative? Appfox is free, with theme-native widgets for quantity breaks, mix-and-match, and BOGO. Wide Bundles leads on 100+ design options from $14.99/mo.",
    intro:
      "Wide Bundles (WideBundle) is a Built for Shopify quantity-break and BOGO app rated 4.9 from 320 reviews. The listing's promise is visual: 100+ customization options, A/B tests, and connectors for PageFly, GemPages, and cart-drawer apps. Live pricing is performance-based - $14.99 / $19.99 / $24.99 per month against additional-revenue caps of $500 / $1,000 / $2,000, with development stores free and a 14-day trial. Appfox Product Bundles lists the same offer family (volume discounts, mix-and-match, BOGO, fixed pricing) on a free install, with widgets that inherit the theme rather than a 100-option design surface.",
    bestFor:
      "Merchants who want quantity breaks and BOGO without a design studio or an additional-revenue bill - and who are happy to let the theme do the styling.",
    whyAppfox: [
      {
        title: "Free, not metered on additional revenue",
        description:
          "Wide Bundles charges live stores from $14.99/month once additional revenue crosses the listed caps. Appfox Product Bundles publishes no paid plans.",
      },
      {
        title: "Theme-native instead of a second design system",
        description:
          "If your theme already looks right, inheriting fonts, colors, and spacing is faster than configuring 100+ options. That is the Appfox bet.",
      },
      {
        title: "The same offer types",
        description:
          "Both listings cover quantity breaks, mix-and-match, BOGO, fixed prices, percentages, and gifts. Design depth is the separator, not the discount logic.",
      },
      {
        title: "Analytics on the free install",
        description:
          "Appfox lists sales and revenue reports with the free app. Wide Bundles includes analytics and A/B testing on every paid tier - after the trial.",
      },
    ],
    comparison: [
      { feature: "Price (live stores)", appfox: "Free", competitor: "From $14.99/mo" },
      { feature: "Pricing model", appfox: "Free, no limits", competitor: "From $14.99/mo, scales with sales" },
      { feature: "Free plan for live stores", appfox: true, competitor: "Free on dev stores; 14-day trial" },
      { feature: "Shopify App Store rating", appfox: "5.0 (4 reviews)", competitor: "4.9 (320 reviews)" },
      { feature: "Built for Shopify badge", appfox: false, competitor: true },
      { feature: "Volume discounts & quantity breaks", appfox: true, competitor: true },
      { feature: "Mix & match", appfox: true, competitor: true },
      { feature: "BOGO", appfox: true, competitor: true },
      { feature: "A/B testing", appfox: true, competitor: true },
      { feature: "Design customization", appfox: "4 layouts, 3 badge styles, brand presets", competitor: "100+ options" },
      { feature: "Page-builder / cart-drawer integrations", appfox: false, competitor: "PageFly, GemPages, others" },
      { feature: "Storefront languages", appfox: "7 languages + Shopify locales", competitor: "8 languages" },
      { feature: "Analytics", appfox: true, competitor: true },
    ],
    faq: [
      {
        q: "Is Wide Bundles only a design app?",
        a: "No. It is a quantity-break, mix-and-match, and BOGO app that leads with design control. The offer types overlap with Appfox; the billed difference is customization plus a revenue meter.",
      },
      {
        q: "Does Appfox have 100+ design options?",
        a: "Appfox has four layouts, three badge styles, brand presets, and custom CSS — not 100+ options. If you need per-pixel control, Wide Bundles is further along.",
      },
      {
        q: "When is Wide Bundles the better choice?",
        a: "When the widget has to look like a custom landing module, you want built-in A/B tests on design, or you already run PageFly / GemPages / a cart drawer they connect to. Pay the metered plan for that. If the theme is enough, Appfox is free.",
      },
    ],
    whereTheyWin: [
      {
        title: "Design depth",
        description:
          "100+ customization options is the headline on their listing and site. Appfox widgets inherit the theme. If the offer has to look like a designed campaign, they have the studio; we do not claim one.",
      },
      {
        title: "A/B tests you can actually configure",
        description:
          "Wide Bundles lists A/B testing as a first-class design feature. Appfox has weighted variants and a pick-a-winner flow. If the job is testing layouts and colors, they have more of a studio.",
      },
      {
        title: "Built for Shopify and review history",
        description:
          "Built for Shopify, 320 reviews, launched 2020. Appfox has 4 reviews and no badge. That gap is not a feature - it is a risk signal, and it favors them.",
      },
      {
        title: "Page builders and cart drawers",
        description:
          "Their listing names PageFly, GemPages, EasySell, Monster Upsells, and Releasit. Appfox lists Checkout and Shopify Admin. If those apps are already in your stack, Wide Bundles meets you there.",
      },
    ],
    sources: [
      { label: "Wide Bundles App Store listing", url: "https://apps.shopify.com/widebundle" },
      { label: "WideBundle marketing site", url: "https://en.widebundle.com/" },
      { label: "Appfox Product Bundles App Store listing", url: "https://apps.shopify.com/trust-bundles" },
    ],
    checked: CHECKED,
  },
  {
    app: "product-bundles",
    slug: "shopify-bundles",
    name: "Shopify Bundles",
    shortName: "Shopify Bundles",
    category: "Native Fixed Bundles",
    tagline:
      "Shopify Bundles is the free first-party app for fixed kits and multipacks. Appfox Product Bundles is the offer layer on top: volume discounts, mix-and-match, and BOGO.",
    framing:
      "Shopify Bundles is the right free tool for a fixed kit with component inventory; it does not do mix-and-match, quantity breaks, or BOGO widgets. Appfox Product Bundles starts where the native app stops.",
    metaTitle: "Shopify Bundles Alternative: Appfox Product Bundles vs Shopify Bundles (2026)",
    metaDescription:
      "Looking for a Shopify Bundles alternative for mix-and-match or quantity breaks? The first-party app is free for fixed kits only. Appfox adds volume discounts, mix-and-match, and BOGO — also free.",
    intro:
      "Shopify Bundles is Shopify's own free app: create fixed bundles and multipacks in the admin, let customers pick component variants, and keep component inventory in sync. It is available on every Shopify plan, sells on the Online Store, Shop, POS, and headless, and needs no third-party billing. It is also narrowly scoped. The App Store listing names two bundle types (fixed, multipacks) and one pricing model (fixed pricing). The help center documents hard limits - 30 components on a fixed bundle, 3 options / 100 variants, no location-level inventory, and bundle prices that do not update when a component price changes. Merchants have rated it 2.9 from 568 reviews. Appfox Product Bundles is a third-party offer app: volume discounts, mix-and-match, BOGO, and theme widgets, free to install, with 4 reviews and none of Shopify's native admin or POS sales-channel coverage.",
    bestFor:
      "Merchants who need promotional bundle types the native app does not list - quantity breaks, mix-and-match, BOGO - and are willing to install a third-party widget to get them.",
    whyAppfox: [
      {
        title: "Offer types Shopify Bundles does not list",
        description:
          "Volume discounts, quantity breaks, mix-and-match, and BOGO are the reason most stores install a third-party bundle app. Shopify Bundles' listing is fixed bundles and multipacks at a fixed price.",
      },
      {
        title: "A storefront widget, not only a product",
        description:
          "Shopify Bundles creates a bundle product in the admin. Appfox drops a Shopify 2.0 block on product, collection, or home pages and shows the savings on the way to cart.",
      },
      {
        title: "Automatic discounts instead of a manual bundle price",
        description:
          "Shopify's help center says the bundle price does not update when a component price changes - you edit it by hand. Appfox lists percentage, fixed-amount, and tiered discounts that apply at checkout.",
      },
      {
        title: "Still free",
        description:
          "You are not choosing between free-and-limited and paid-and-flexible. Both listings are free. The choice is which job you need done.",
      },
    ],
    comparison: [
      { feature: "Price", appfox: "Free", competitor: "Free" },
      { feature: "Shopify App Store rating", appfox: "5.0 (4 reviews)", competitor: "2.9 (568 reviews)" },
      { feature: "Fixed bundles & multipacks", appfox: true, competitor: true },
      { feature: "Mix & match / build-a-box", appfox: true, competitor: false },
      { feature: "Volume discounts & quantity breaks", appfox: true, competitor: false },
      { feature: "BOGO / Buy X Get Y", appfox: true, competitor: false },
      { feature: "Theme app-block widgets", appfox: true, competitor: "Native product page" },
      { feature: "Component inventory sync", appfox: "Theme stock checks", competitor: "Realtime components" },
      { feature: "Shopify POS sales channel", appfox: "Unclear", competitor: true },
      { feature: "Shop app / headless channels", appfox: false, competitor: true },
      { feature: "First-party Shopify admin app", appfox: false, competitor: true },
      { feature: "Bundle price follows component price", appfox: "Discount rules", competitor: "Manual update required" },
      { feature: "Analytics", appfox: "Bundle sales reports", competitor: "Sales, orders, top bundles" },
    ],
    faq: [
      {
        q: "Should I just use Shopify Bundles if it's free?",
        a: "Yes - if you only need a fixed kit or multipack with component inventory and a native product page. That is the job the first-party app is built for. If you need quantity breaks, mix-and-match, or BOGO, Shopify's own listing does not include them.",
      },
      {
        q: "Can I run both?",
        a: "Often. Shopify Bundles can own the kit SKU in the admin; Appfox can own the promotional widget on the product page. Confirm discount stacking on a development theme before you run both on production.",
      },
      {
        q: "When is Shopify Bundles the better choice?",
        a: "When you want zero third-party apps, component inventory in the admin, POS / Shop / headless publishing, and a fixed kit. Also when you do not want to depend on a four-review app for a revenue-critical flow. Their 2.9 rating is a warning about polish, not about the core kit mechanic.",
      },
    ],
    whereTheyWin: [
      {
        title: "Native, first-party, no extra app risk",
        description:
          "Shopify Bundles is built by Shopify, lives in the admin, and bills nothing. For a finance or IT team that does not want another app's scopes on the store, that is the correct default. Appfox is a third-party install.",
      },
      {
        title: "Component inventory and sales channels",
        description:
          "Realtime component inventory, plus Online Store, Shop, POS, and headless, are documented in Shopify's help center. Appfox lists Checkout and Shopify Admin and does not document POS or Shop as bundle channels.",
      },
      {
        title: "The right tool for a simple kit",
        description:
          "Merchants who only need 'these three SKUs sell as one product' do not need Appfox. Shopify Bundles does that job. We would be selling you a widget you do not need.",
      },
      {
        title: "Admin reports you already know",
        description:
          "Bundle total sales, orders, and top bundles live in the Bundles app and Shopify Analytics. If your team already lives in Shopify reports, there is no second dashboard to learn.",
      },
    ],
    sources: [
      { label: "Shopify Bundles App Store listing", url: "https://apps.shopify.com/shopify-bundles" },
      { label: "Shopify Help Center: Shopify Bundles", url: "https://help.shopify.com/en/manual/products/bundles/shopify-bundles" },
      { label: "Appfox Product Bundles App Store listing", url: "https://apps.shopify.com/trust-bundles" },
    ],
    checked: CHECKED,
  },
  {
    app: "product-bundles",
    slug: "rebolt",
    name: "Rebolt Upsell & Bundles App",
    shortName: "Rebolt",
    category: "Product Bundles & Upsells",
    tagline:
      "Rebolt is an older bundle-and-upsell suite with checkout and post-purchase offers. Appfox Product Bundles is the free, narrower app for volume discounts and mix-and-match.",
    framing:
      "Rebolt is free until $300 of bundle revenue, then $19.99/month, and lists checkout, post-purchase, and free-gift offers Appfox does not. Appfox is free past that $300 line, with a much smaller review base.",
    metaTitle: "Rebolt Alternative: Appfox Product Bundles vs Rebolt (2026)",
    metaDescription:
      "Looking for a Rebolt alternative? Appfox stays free past the $300 line for product-page bundles. Rebolt adds checkout and thank-you upsells, then $19.99/mo.",
    intro:
      "Rebolt Upsell & Bundles (Bristm LLP) has been on the App Store since 2018 and is rated 4.8 from 586 reviews. The listing is a suite: fixed and mix-and-match bundles, BOGO, volume discounts, frequently bought together, free gifts, add-ons, plus checkout, cart, and post-purchase / thank-you upsells, with A/B testing and POS in Works with. Pricing is a short free runway - free until $300 of bundle revenue - then $19.99/month unlimited, or a $299/month custom-development tier. Appfox Product Bundles lists the storefront offer types (volume discounts, mix-and-match, BOGO, analytics) on a free install and does not list checkout or post-purchase upsells, POS, or a paid plan.",
    bestFor:
      "Merchants who want product-page bundles without paying after the first $300 of attributed revenue, and who do not need Rebolt's checkout or thank-you-page offers.",
    whyAppfox: [
      {
        title: "Free past the $300 line",
        description:
          "Rebolt's listing is free until $300 of bundle revenue, then $19.99/month. Appfox publishes no revenue cap and no paid plans.",
      },
      {
        title: "A storefront app, not a second upsell stack",
        description:
          "If you already run checkout or thank-you upsells elsewhere (or do not want them), Rebolt's extra surfaces are unused weight. Appfox stays on the product-page offer.",
      },
      {
        title: "The common bundle types, included",
        description:
          "Both listings cover mix-and-match, volume discounts, and BOGO. You do not need Rebolt's post-purchase offers to launch those.",
      },
      {
        title: "No custom-development tier to decode",
        description:
          "Rebolt also lists a $299/month custom-build plan. Appfox has one listed path: install free, create a bundle, add the widget.",
      },
    ],
    comparison: [
      { feature: "Price", appfox: "Free", competitor: "Free to $300 revenue, then $19.99/mo" },
      { feature: "Shopify App Store rating", appfox: "5.0 (4 reviews)", competitor: "4.8 (586 reviews)" },
      { feature: "Volume discounts & quantity breaks", appfox: true, competitor: true },
      { feature: "Mix & match / build-a-box", appfox: true, competitor: true },
      { feature: "BOGO / Buy X Get Y", appfox: true, competitor: true },
      { feature: "Frequently bought together", appfox: true, competitor: true },
      { feature: "Free gifts / add-ons", appfox: true, competitor: true },
      { feature: "Checkout upsells", appfox: false, competitor: true },
      { feature: "Post-purchase / thank-you upsells", appfox: false, competitor: true },
      { feature: "A/B testing", appfox: true, competitor: true },
      { feature: "Shopify POS", appfox: "Unclear", competitor: true },
      { feature: "Page-builder / cart-drawer integrations", appfox: false, competitor: true },
      { feature: "Analytics", appfox: true, competitor: true },
    ],
    faq: [
      {
        q: "Is Rebolt still on the Shopify App Store?",
        a: "Yes, as of the October 2026 check. The live listing is apps.shopify.com/bundle-products-by-thimatic, rated 4.8 from 586 reviews, with published Free / $19.99 / $299 plans.",
      },
      {
        q: "How does Rebolt's free tier compare to Appfox?",
        a: "Rebolt is free until $300 of bundle revenue, then $19.99/month for the same feature list. Appfox is free with no revenue cap. Rebolt's free tier is a runway; Appfox's is the whole product.",
      },
      {
        q: "When is Rebolt the better choice?",
        a: "When you want checkout, cart, and thank-you-page upsells in the same app as bundles, plus POS and a longer review history. That suite is why they charge after $300. If you only need a product-page quantity break or mix-and-match, Appfox is the cheaper (free) tool.",
      },
    ],
    whereTheyWin: [
      {
        title: "Checkout and post-purchase offers",
        description:
          "Rebolt's listing names checkout bundles, cart offers, and thank-you / post-purchase upsells. Appfox's public Product Bundles pages do not. If those surfaces are the job, they already have them.",
      },
      {
        title: "POS and a longer track record",
        description:
          "Works with Shopify POS, launched 2018, 586 reviews. Appfox launched January 2025, 4 reviews, no POS on the listing. Tenure is a fair reason to pick them.",
      },
      {
        title: "Free gifts, add-ons, and A/B testing as a suite",
        description:
          "Those appear as first-class bullets on Rebolt's listing, alongside FBT. Appfox tags gifts and A/B testing; we do not publish an equivalent upsell-suite story.",
      },
      {
        title: "Custom development, if you need it",
        description:
          "Their $299/month plan is explicitly custom feature work. Appfox does not list a services tier. Stores that need one-off offer logic will shop that plan, not us.",
      },
    ],
    sources: [
      { label: "Rebolt Upsell & Bundles App Store listing", url: "https://apps.shopify.com/bundle-products-by-thimatic" },
      { label: "Appfox Product Bundles App Store listing", url: "https://apps.shopify.com/trust-bundles" },
    ],
    checked: CHECKED,
  },
];

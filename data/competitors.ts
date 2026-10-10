import { bundleCompetitors } from "./bundle-competitors";

export type ComparisonRow = {
  feature: string;
  appfox: string | true | false;
  competitor: string | true | false;
};

/** Which AppFox app this competitor is compared against. */
export type CompetitorApp = "order-editing" | "subscription" | "product-bundles";

export type CompetitorSource = {
  label: string;
  url: string;
};

export type Competitor = {
  /** Which AppFox app the comparison is about - drives hub grouping, CTAs, and OG copy. */
  app: CompetitorApp;
  slug: string;
  name: string;
  shortName: string;
  category: string;
  tagline: string;
  /** one-sentence neutral-but-confident framing, used on the /vs hub and OG images */
  framing: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  bestFor: string;
  whyAppfox: { title: string; description: string }[];
  comparison: ComparisonRow[];
  faq: { q: string; a: string }[];
  /** Public sources used for this comparison. Shown on the page when present. */
  sources?: CompetitorSource[];
  /** Human-readable month the public listings were checked, e.g. "October 2026". */
  checked?: string;
  /** Where this competitor is genuinely a better fit. Shown as an honesty section. */
  whereTheyWin?: { title: string; description: string }[];
};

export const competitors: Competitor[] = [
  {
    app: "order-editing",
    slug: "cleverific",
    name: "Cleverific Order Editor",
    shortName: "Cleverific",
    category: "Order Editor",
    tagline:
      "Cleverific is a powerful merchant-side editor. AppFox flips the script: customers self-serve their own edits, and you keep the control.",
    framing:
      "Cleverific has spent a decade earning its reputation in admin-side order editing; the comparison comes down to whether you want staff-driven edits metered per edit with overage fees, or customer self-service at one flat price.",
    metaTitle: "AppFox vs Cleverific: Shopify Order Editing Compared",
    metaDescription:
      "Cleverific meters staff-side edits per edit; AppFox gives customers self-service editing at one flat price. Compare pricing and features, then start free.",
    intro:
      "Cleverific has been a staple for merchant-side order editing on Shopify for years. It's a deep tool - but it's built primarily for support agents, not your customers. AppFox is the modern, customer-first alternative: shoppers fix their own orders, sensitive edits land in a clean approval queue, and you get post-purchase upsells out of the box.",
    bestFor:
      "Brands tired of fielding \"can I change my order?\" tickets and ready to let customers self-serve - while keeping merchant oversight where it matters.",
    whyAppfox: [
      {
        title: "Customer self-service, not just merchant tools",
        description:
          "Cleverific is built around the merchant admin. AppFox lets shoppers fix their own orders right on the thank-you and order status pages - without ever opening a ticket.",
      },
      {
        title: "Post-purchase upsells built in",
        description:
          "Cleverific doesn't do upsells. AppFox turns every edit moment into a revenue opportunity with one-click product recommendations inside the edit flow.",
      },
      {
        title: "Eligibility engine, not raw editing",
        description:
          "AppFox enforces edit windows, fulfillment cutoffs, and per-action rules - so customers never see an option that won't work. Cleverific leaves the policy work to the agent.",
      },
      {
        title: "Modern integrations",
        description:
          "Native Gorgias, Shopify Flow, and Slack integrations ship in the box. Cleverific has fewer modern connectors and limited automation.",
      },
    ],
    comparison: [
      { feature: "Customer self-service editing", appfox: true, competitor: false },
      { feature: "Merchant-side order editing", appfox: true, competitor: true },
      { feature: "Address change & validation", appfox: true, competitor: true },
      { feature: "Variant swap (size/color)", appfox: true, competitor: true },
      { feature: "Add / remove items", appfox: true, competitor: true },
      { feature: "Post-purchase upsells in edit flow", appfox: true, competitor: false },
      { feature: "Approval queue + auto-apply modes", appfox: true, competitor: "Limited" },
      { feature: "Per-edit-type eligibility rules", appfox: true, competitor: "Limited" },
      { feature: "Automatic payments & refunds on price delta", appfox: true, competitor: true },
      { feature: "Shopify Flow triggers + actions", appfox: true, competitor: false },
      { feature: "Native Gorgias integration", appfox: true, competitor: false },
      { feature: "Slack alerts for edit requests", appfox: true, competitor: false },
      { feature: "Order edit audit timeline", appfox: true, competitor: true },
      { feature: "Free plan", appfox: "Up to 50 edits/mo", competitor: false },
      { feature: "Starting price (paid)", appfox: "$19/mo", competitor: "$33+/mo" },
    ],
    faq: [
      {
        q: "Can I migrate from Cleverific to AppFox?",
        a: "Yes. AppFox can run alongside Cleverific while you transition. Most merchants migrate within a few hours since AppFox uses Shopify's native Order Editing API - no data export/import required.",
      },
      {
        q: "Is AppFox cheaper than Cleverific?",
        a: "Yes. AppFox starts at $0 with a free plan up to 50 edits per month, then $19/mo for unlimited. Cleverific's paid plans start higher and don't include a free tier.",
      },
      {
        q: "Does AppFox support everything Cleverific does?",
        a: "AppFox covers all the core merchant-side editing capabilities (address, variants, quantities, item add/remove, cancellations) plus customer self-service and post-purchase upsells - features Cleverific doesn't offer.",
      },
    ],
  },
  {
    app: "order-editing",
    slug: "aftersell",
    name: "AfterSell Post Purchase Upsell",
    shortName: "AfterSell",
    category: "Post-Purchase Upsell",
    tagline:
      "AfterSell focuses on upsells. AppFox does upsells PLUS the order editing infrastructure your support team is screaming for.",
    framing:
      "AfterSell is a strong checkout and thank-you page upsell app, but it doesn't let customers edit orders - so the real question is whether you want upsells alone, or upsells built into the moment customers are already managing their order.",
    metaTitle: "AppFox vs AfterSell: Order Editing + Upsells Compared",
    metaDescription:
      "AfterSell upsells at checkout but can't edit orders; AppFox puts upsells inside a self-service edit flow. See the full comparison and install AppFox free.",
    intro:
      "AfterSell is a solid pick if all you need is a post-purchase upsell funnel. But the highest-converting upsell moment isn't the order confirmation page - it's when a customer comes back to fix or change their order. AppFox owns both moments: it ships customer-facing order editing AND surfaces targeted upsells right inside the edit flow.",
    bestFor:
      "Merchants who want upsell revenue AND want to slash the support ticket volume created by customers asking for order changes.",
    whyAppfox: [
      {
        title: "Two revenue moments, not one",
        description:
          "AfterSell sells on the thank-you page. AppFox sells there AND when customers return to edit their order - typically a higher-intent moment with better conversion.",
      },
      {
        title: "Full order editing included",
        description:
          "Self-service address changes, variant swaps, item adds/removes, and cancellations are core AppFox features. AfterSell doesn't touch order editing.",
      },
      {
        title: "Eliminate \"can I change my order?\" tickets",
        description:
          "AfterSell does nothing to reduce support load. AppFox cuts the #1 support category for most Shopify stores by giving customers self-service tools.",
      },
      {
        title: "Built-in approval workflows",
        description:
          "AppFox includes a merchant approval queue for sensitive edits, plus a full audit timeline - features AfterSell doesn't need but every operations team will appreciate.",
      },
    ],
    comparison: [
      { feature: "Post-purchase upsell offers", appfox: true, competitor: true },
      { feature: "One-click add to existing order", appfox: true, competitor: true },
      { feature: "Self-service order editing", appfox: true, competitor: false },
      { feature: "Address change & validation", appfox: true, competitor: false },
      { feature: "Variant swap (size/color)", appfox: true, competitor: false },
      { feature: "Order cancellation flow", appfox: true, competitor: false },
      { feature: "Upsells inside the edit moment", appfox: true, competitor: false },
      { feature: "Order eligibility & cutoff rules", appfox: true, competitor: false },
      { feature: "Merchant approval queue", appfox: true, competitor: false },
      { feature: "Audit timeline & history", appfox: true, competitor: false },
      { feature: "Gorgias / Slack / Shopify Flow", appfox: true, competitor: "Limited" },
      { feature: "Analytics dashboard", appfox: true, competitor: true },
      { feature: "Free plan", appfox: true, competitor: true },
      { feature: "Starting price (paid)", appfox: "$19/mo", competitor: "$34.99+/mo" },
    ],
    faq: [
      {
        q: "Can I use AppFox just for upsells, like AfterSell?",
        a: "Yes. Order editing features can be left disabled - you'll still get the post-purchase upsell engine. Most merchants enable both because the edit flow becomes the #1 upsell surface.",
      },
      {
        q: "Will AppFox conflict with AfterSell if I run both?",
        a: "They can run side by side without issue. Most merchants who try AppFox end up consolidating, since AppFox covers both use cases plus order editing.",
      },
      {
        q: "Do AppFox upsells convert as well as AfterSell?",
        a: "Conversion rates depend on your products and offers, but the edit-flow upsell moment usually outperforms thank-you-page upsells because the customer has already returned with intent to engage.",
      },
    ],
  },
  {
    app: "order-editing",
    slug: "edit-order",
    name: "Edit Order by Cleverific",
    shortName: "Edit Order",
    category: "Order Editor",
    tagline:
      "Edit Order works inside the Shopify admin. AppFox brings that power to your customers - and adds an upsell engine on top.",
    framing:
      "Edit Order is Cleverific's tool for staff editing orders inside the Shopify admin; AppFox starts from the other end, letting customers resolve ~80% of common edits themselves so most tickets never reach your staff at all.",
    metaTitle: "AppFox vs Edit Order (Cleverific): Full Comparison",
    metaDescription:
      "Edit Order lets staff edit orders in the Shopify admin; AppFox lets customers self-serve ~80% of edits before a ticket exists. Compare both, start free.",
    intro:
      "Edit Order is a long-running, admin-side editing tool. It works - but every change still requires a support agent. AppFox is a generation ahead: customers self-serve their own edits right on the thank-you and order status pages, sensitive changes route through an approval queue, and your support team only gets pulled in when they actually need to be.",
    bestFor:
      "Support and ops teams drowning in manual order edits who want to push routine fixes to customer self-service.",
    whyAppfox: [
      {
        title: "Customers fix their own orders",
        description:
          "Edit Order requires an agent for every change. AppFox routes ~80% of common edits (address typos, quantity tweaks, variant swaps) directly to the customer - agents only touch what truly needs review.",
      },
      {
        title: "Eligibility rules out of the box",
        description:
          "Configure edit windows, fulfillment cutoffs, and per-action restrictions in minutes. Edit Order leaves policy decisions to the agent each time.",
      },
      {
        title: "Built-in post-purchase upsells",
        description:
          "Edit Order has no upsell layer. AppFox shows targeted product offers inside the edit flow - a free revenue lift.",
      },
      {
        title: "Modern automation",
        description:
          "Native Shopify Flow triggers, Gorgias sidebar, and Slack alerts let your stack respond to edit events automatically.",
      },
    ],
    comparison: [
      { feature: "Customer self-service editing", appfox: true, competitor: false },
      { feature: "Merchant admin order editing", appfox: true, competitor: true },
      { feature: "Address change & validation", appfox: true, competitor: true },
      { feature: "Variant swap & item add/remove", appfox: true, competitor: true },
      { feature: "Edit window & cutoff rules", appfox: true, competitor: "Manual" },
      { feature: "Approval queue + auto-apply", appfox: true, competitor: false },
      { feature: "Post-purchase upsells", appfox: true, competitor: false },
      { feature: "Automatic refunds & charges", appfox: true, competitor: true },
      { feature: "Shopify Flow integration", appfox: true, competitor: false },
      { feature: "Gorgias integration", appfox: true, competitor: false },
      { feature: "Slack alerts", appfox: true, competitor: false },
      { feature: "Free plan", appfox: true, competitor: false },
      { feature: "Starting price (paid)", appfox: "$19/mo", competitor: "$29+/mo" },
    ],
    faq: [
      {
        q: "How is AppFox different from Edit Order?",
        a: "Edit Order is admin-only - agents make every change. AppFox adds customer self-service editing on top, plus eligibility rules, approval workflows, and post-purchase upsells.",
      },
      {
        q: "Will my support team still be able to edit orders directly?",
        a: "Yes. AppFox includes a full merchant admin for edits, exactly like Edit Order. The difference is that most edits now happen on the customer side, freeing your agents.",
      },
      {
        q: "How long does migration take?",
        a: "Most stores fully switch within an afternoon. Both apps use Shopify's native Order Editing API, so there's no data to migrate.",
      },
    ],
  },
  {
    app: "order-editing",
    slug: "orderediting",
    name: "OrderEditing.com",
    shortName: "OrderEditing.com",
    category: "Order Editor",
    tagline:
      "OrderEditing.com is a premium portal used by enterprise brands. AppFox gives you the same customer-first experience at a fraction of the price.",
    framing:
      "OrderEditing is the category's premium incumbent with proof to match, a $99/month floor, and per-order address-validation surcharges; AppFox delivers self-service editing and in-flow upsells from $0, with pricing published right on the homepage.",
    metaTitle: "AppFox vs OrderEditing.com: Pricing & Features Compared",
    metaDescription:
      "OrderEditing starts at $99/mo with address-validation surcharges; AppFox starts at $0 with flat pricing. Compare features side by side and install free.",
    intro:
      "OrderEditing.com is a polished customer-facing portal - used by brands like Oh Polly, HexClad, and Ridge - that covers address edits, item swaps, cancellations, and post-purchase upsells. It's a strong product. The catch: pricing starts at $99/month and scales with order volume, making it inaccessible for most growing stores. AppFox ships the same customer-first philosophy with a generous free tier and paid plans starting at $19/month.",
    bestFor:
      "Growing stores that want OrderEditing.com-level UX without the $99+/month price tag - and need the built-in approval queue and Shopify Flow automation that OrderEditing.com lacks.",
    whyAppfox: [
      {
        title: "Dramatically lower pricing",
        description:
          "OrderEditing.com starts at $99/month (and scales up with volume). AppFox has a free plan for up to 50 edits/month and a $19/month Growth plan with unlimited edits - no volume surcharges.",
      },
      {
        title: "Merchant approval queue included",
        description:
          "AppFox routes sensitive edits through a clean approval queue with auto-apply rules per edit type. OrderEditing.com focuses on the customer flow but gives merchants less control over which edits need review.",
      },
      {
        title: "Shopify Flow + Gorgias + Slack",
        description:
          "AppFox ships native Shopify Flow triggers, a Gorgias sidebar widget, and Slack alerts. OrderEditing.com's integration story is thinner for teams that rely on automation and helpdesk tooling.",
      },
      {
        title: "No volume-based price creep",
        description:
          "OrderEditing.com charges more as your order volume grows. AppFox's flat monthly plans mean your costs are predictable no matter how fast you scale.",
      },
    ],
    comparison: [
      { feature: "Customer self-service editing", appfox: true, competitor: true },
      { feature: "Address change & validation", appfox: true, competitor: true },
      { feature: "Variant swap (size/color)", appfox: true, competitor: true },
      { feature: "Add / remove items", appfox: true, competitor: true },
      { feature: "Order cancellation", appfox: true, competitor: true },
      { feature: "Post-purchase upsells", appfox: true, competitor: true },
      { feature: "Discount code support", appfox: "Roadmap", competitor: true },
      { feature: "Merchant approval queue", appfox: true, competitor: "Limited" },
      { feature: "Per-edit-type eligibility rules", appfox: true, competitor: "Limited" },
      { feature: "Automatic payments & refunds", appfox: true, competitor: true },
      { feature: "Shopify Flow integration", appfox: true, competitor: false },
      { feature: "Native Gorgias integration", appfox: true, competitor: false },
      { feature: "Slack alerts", appfox: true, competitor: false },
      { feature: "Order edit audit timeline", appfox: true, competitor: true },
      { feature: "Free plan", appfox: "Up to 50 edits/mo", competitor: false },
      { feature: "Starting price (paid)", appfox: "$19/mo", competitor: "$99/mo" },
      { feature: "Volume-based pricing", appfox: false, competitor: true },
    ],
    faq: [
      {
        q: "Is AppFox a real alternative to OrderEditing.com for large stores?",
        a: "Yes. AppFox uses Shopify's native Order Editing API and handles all the same edit types. The main difference is pricing - AppFox is flat-rate, OrderEditing.com scales with volume. For stores doing thousands of orders a month, AppFox can save hundreds of dollars monthly.",
      },
      {
        q: "Does AppFox support multi-currency and Shopify Markets like OrderEditing.com?",
        a: "AppFox supports multi-currency orders through Shopify's native APIs. Full multi-market upsell targeting (Shopify Markets) is on the roadmap for the Growth and Pro plans.",
      },
      {
        q: "How hard is it to switch from OrderEditing.com?",
        a: "Setup takes about 5 minutes. Since both apps use Shopify's Order Editing API, there's no data migration. You can run both in parallel during your trial period.",
      },
    ],
  },
  {
    app: "order-editing",
    slug: "orderify",
    name: "Orderify – Order Edit Cancel",
    shortName: "Orderify",
    category: "Order Editor",
    tagline:
      "Orderify is cheap and simple. AppFox is the upgrade: in-place order editing, no lost payment fees, and a built-in upsell engine.",
    framing:
      "Orderify handles changes by canceling the original order and creating a new one, which forfeits Shopify Payments fees of 1.5–2.9% per edit and sends customers back through checkout; AppFox edits in place, so the order, the payment, and the fees stay intact.",
    metaTitle: "AppFox vs Orderify: In-Place Edits vs Cancel-Reorder",
    metaDescription:
      "Orderify cancels and reorders, forfeiting 1.5–2.9% in Shopify Payments fees per edit; AppFox edits in place. See the comparison and keep your fees.",
    intro:
      "Orderify is one of the most affordable order editing apps on the Shopify App Store at $4.99/month. It's a solid tool for new stores watching every dollar. The catch is architectural: Orderify handles 'edits' by cancelling the original order and dropping items back into a new cart for the customer to recheckout. That means you lose Shopify Payments processing fees on every edit - a cost that stacks up fast at volume. AppFox uses Shopify's native Order Editing API to modify orders in place, so no fees are lost and no recheck-out friction is added.",
    bestFor:
      "Stores that have outgrown Orderify's cancel-and-reorder model and want true in-place editing, without the lost payment fees or recheck-out drop-off.",
    whyAppfox: [
      {
        title: "True in-place editing - no lost payment fees",
        description:
          "Orderify cancels and recreates orders, which loses Shopify Payments processing fees (typically 1.5–2.9%) on every edit. AppFox modifies the original order in place via Shopify's API, so fees are never touched.",
      },
      {
        title: "No recheck-out friction for customers",
        description:
          "Orderify's model dumps items into a new cart and asks the customer to check out again - increasing abandonment. AppFox edits are confirmed in a single click without re-entering payment details.",
      },
      {
        title: "Post-purchase upsells built in",
        description:
          "Orderify doesn't offer upsells. AppFox surfaces targeted product recommendations inside the edit flow, turning every edit session into a potential revenue moment.",
      },
      {
        title: "Approval workflows and eligibility rules",
        description:
          "Orderify has minimal merchant controls. AppFox lets you set edit windows, fulfillment cutoffs, per-action rules, and route sensitive edits through an approval queue.",
      },
    ],
    comparison: [
      { feature: "In-place order editing (no re-checkout)", appfox: true, competitor: false },
      { feature: "Cancel & reorder model", appfox: false, competitor: true },
      { feature: "Preserves Shopify Payments fees on edits", appfox: true, competitor: false },
      { feature: "Address change", appfox: true, competitor: true },
      { feature: "Variant swap & quantity update", appfox: true, competitor: true },
      { feature: "Add / remove items", appfox: true, competitor: true },
      { feature: "One-click reorder", appfox: false, competitor: true },
      { feature: "Post-purchase upsells", appfox: true, competitor: false },
      { feature: "Merchant approval queue", appfox: true, competitor: false },
      { feature: "Per-edit-type eligibility rules", appfox: true, competitor: false },
      { feature: "Automatic payments & refunds", appfox: true, competitor: "Via recheck-out" },
      { feature: "Shopify Flow integration", appfox: true, competitor: false },
      { feature: "Analytics dashboard", appfox: true, competitor: false },
      { feature: "Free plan", appfox: "Up to 50 edits/mo", competitor: false },
      { feature: "Starting price (paid)", appfox: "$19/mo", competitor: "$4.99/mo" },
    ],
    faq: [
      {
        q: "Orderify is cheaper - why would I pay more for AppFox?",
        a: "Orderify's $4.99/month is attractive, but the hidden cost is losing Shopify Payments fees on every edit (1.5–2.9% of the order value). At 100 edits/month averaging $80/order, that's $120–$232/month in lost fees - more than AppFox's $19/month plan with fees preserved.",
      },
      {
        q: "Does AppFox support one-click reorders like Orderify?",
        a: "AppFox focuses on editing existing orders rather than reordering. If reorder functionality is important to your post-purchase flow, it can be added alongside AppFox. Most merchants find that editing solves the same customer need without the re-checkout friction.",
      },
      {
        q: "Will customers notice the difference between Orderify and AppFox?",
        a: "Significantly. With Orderify, customers cancel their order and re-checkout. With AppFox, they confirm a change in one click and get an updated order confirmation. The AppFox flow has meaningfully lower abandonment during the edit process.",
      },
    ],
  },
  {
    app: "order-editing",
    slug: "reconvert",
    name: "ReConvert Upsell (Upsell.com)",
    shortName: "ReConvert",
    category: "Post-Purchase Upsell",
    tagline:
      "ReConvert optimises your thank-you page. AppFox does that plus lets customers edit their orders - and doesn't display third-party ads on your store.",
    framing:
      "ReConvert is a thank-you page upsell specialist with no self-service order editing, which means it monetizes the post-purchase moment but can't resolve the \"can I change my order?\" tickets that fill your inbox.",
    metaTitle: "AppFox vs ReConvert: Order Editing + Upsells Compared",
    metaDescription:
      "ReConvert upsells on the thank-you page but can't resolve order-edit tickets; AppFox does both in one flow. Compare them side by side and start free.",
    intro:
      "ReConvert - now rebranded as Upsell.com - is one of the most widely installed post-purchase upsell apps on Shopify, with over 2,800 reviews. It's capable, but it comes with a pricing model that charges a 0.75% revenue share on top of monthly fees, and in early 2026, the app faced significant merchant backlash after it was found to be displaying third-party ads (including Capital One offers) on merchant thank-you pages without clear consent. AppFox offers post-purchase upsells with flat-rate pricing, no revenue share, and no third-party ads - ever.",
    bestFor:
      "Merchants who want reliable post-purchase upsells with predictable pricing, no revenue-share fees, and full order editing baked in.",
    whyAppfox: [
      {
        title: "No revenue-share fees",
        description:
          "ReConvert charges 0.75% of every sale attributed to the app on top of the monthly plan. AppFox has flat-rate pricing - your upsell revenue is 100% yours.",
      },
      {
        title: "No third-party ads on your store",
        description:
          "In early 2026, ReConvert was discovered to be showing Capital One and other third-party ads on merchant thank-you pages without explicit consent. AppFox will never display third-party ads on your storefront.",
      },
      {
        title: "Order editing included at no extra cost",
        description:
          "ReConvert is upsell-only. AppFox ships the full self-service order editing stack alongside upsells - so you solve two major post-purchase problems with one app.",
      },
      {
        title: "Predictable monthly pricing",
        description:
          "ReConvert's tiered plans scale with order volume and layer on a revenue percentage. AppFox Growth is $19/mo flat regardless of order count or upsell revenue.",
      },
    ],
    comparison: [
      { feature: "Post-purchase upsells", appfox: true, competitor: true },
      { feature: "Thank-you page customisation", appfox: "Via upsell blocks", competitor: true },
      { feature: "One-click upsell funnel", appfox: true, competitor: true },
      { feature: "Birthday collector / surveys", appfox: false, competitor: true },
      { feature: "Self-service order editing", appfox: true, competitor: false },
      { feature: "Address change & validation", appfox: true, competitor: false },
      { feature: "Order cancellation", appfox: true, competitor: false },
      { feature: "Approval queue & eligibility rules", appfox: true, competitor: false },
      { feature: "Revenue-share fee on upsells", appfox: false, competitor: "0.75%" },
      { feature: "Third-party ads on storefront", appfox: false, competitor: "Reported 2026" },
      { feature: "Shopify Flow integration", appfox: true, competitor: false },
      { feature: "Analytics dashboard", appfox: true, competitor: true },
      { feature: "Free plan", appfox: "Up to 50 edits/mo", competitor: false },
      { feature: "Starting price (paid)", appfox: "$19/mo flat", competitor: "$4.99/mo + 0.75%" },
    ],
    faq: [
      {
        q: "What happened with ReConvert and third-party ads in 2026?",
        a: "In early 2026, multiple Shopify merchants reported that ReConvert was displaying Capital One credit card offers and other third-party ads on their checkout and thank-you pages without their knowledge or explicit consent. The developer acknowledged this as an intentional feature. AppFox has no third-party ad placements and never will.",
      },
      {
        q: "How does AppFox's pricing compare to ReConvert's real cost?",
        a: "ReConvert's entry plan is $4.99/month but adds 0.75% of attributed upsell revenue. At $3,000/month in upsell revenue, that's an extra $22.50 - already more than AppFox Growth at $19/mo with no percentage. At $10,000/month in upsells, ReConvert costs $74.99/month. AppFox stays at $19.",
      },
      {
        q: "Does AppFox have as many upsell templates as ReConvert?",
        a: "ReConvert has a larger library of thank-you page widget types (birthday collectors, video blocks, countdown timers). AppFox focuses on high-converting product upsells inside the order edit flow. Most merchants find the AppFox upsell flow converts better because customers are in a higher-intent editing session.",
      },
    ],
  },
  {
    app: "order-editing",
    slug: "selfserve",
    name: "SelfServe Order Edits & Upsells",
    shortName: "SelfServe",
    category: "Order Editor & Upsell",
    tagline:
      "SelfServe is a solid combined editing + upsell app. AppFox matches it feature-for-feature and adds the automation layer - Shopify Flow, Gorgias, Slack - that growing teams need.",
    framing:
      "SelfServe is the closest competitor in spirit, with genuinely good self-service editing - but every tier caps both your order volume and your upsell revenue, so the better it works, the sooner you're forced to upgrade; AppFox caps neither.",
    metaTitle: "AppFox vs SelfServe: Uncapped Order Editing Compared",
    metaDescription:
      "SelfServe caps order volume and upsell revenue on every tier; AppFox caps neither. Compare pricing, edit types, and controls - then install AppFox free.",
    intro:
      "SelfServe is one of the most directly comparable apps to AppFox - it combines customer self-service order editing with post-purchase upsells and boasts a perfect 5-star rating on the Shopify App Store. For merchants evaluating both, the deciding factors usually come down to integrations and automation depth: AppFox ships native Shopify Flow triggers, a Gorgias helpdesk sidebar, Slack notifications, and a detailed analytics dashboard that SelfServe doesn't match at the same depth.",
    bestFor:
      "Teams that need Shopify Flow automation, helpdesk integration (Gorgias), or Slack alerts on top of their order editing and upsell stack.",
    whyAppfox: [
      {
        title: "Deeper automation with Shopify Flow",
        description:
          "AppFox exposes custom Flow triggers and actions for every edit event - auto-tag orders, notify warehouses, add gifts on upsell acceptance. SelfServe doesn't offer Flow integration.",
      },
      {
        title: "Native Gorgias integration",
        description:
          "AppFox surfaces edit eligibility and pending requests directly in the Gorgias ticket sidebar - agents can approve or trigger edits without leaving the helpdesk. SelfServe has no Gorgias connector.",
      },
      {
        title: "Slack alerts and SLA tracking",
        description:
          "AppFox notifies your merchant team on Slack when new requests arrive or SLA thresholds are breached. SelfServe has no Slack integration.",
      },
      {
        title: "Detailed analytics and audit timeline",
        description:
          "AppFox tracks edit volume, approval rates, upsell revenue, and time-to-approve in a dashboard, with a per-order audit timeline for every action. SelfServe's analytics are more limited.",
      },
    ],
    comparison: [
      { feature: "Customer self-service editing", appfox: true, competitor: true },
      { feature: "Address change & validation", appfox: true, competitor: true },
      { feature: "Variant swap & quantity update", appfox: true, competitor: true },
      { feature: "Add / remove items", appfox: true, competitor: true },
      { feature: "Post-purchase upsells", appfox: true, competitor: true },
      { feature: "Cancellation request workflow", appfox: true, competitor: true },
      { feature: "Merchant approval queue", appfox: true, competitor: true },
      { feature: "Per-edit-type eligibility rules", appfox: true, competitor: true },
      { feature: "Automatic payments & refunds", appfox: true, competitor: true },
      { feature: "Shopify Flow triggers + actions", appfox: true, competitor: false },
      { feature: "Native Gorgias integration", appfox: true, competitor: false },
      { feature: "Slack alerts & SLA tracking", appfox: true, competitor: false },
      { feature: "Analytics dashboard", appfox: true, competitor: "Limited" },
      { feature: "Per-order audit timeline", appfox: true, competitor: "Limited" },
      { feature: "Free plan", appfox: "Up to 50 edits/mo", competitor: false },
    ],
    faq: [
      {
        q: "Both apps combine editing and upsells - what's the main difference?",
        a: "The core editing and upsell features are very similar. AppFox's main advantages are the integration layer (Shopify Flow, Gorgias, Slack) and deeper analytics. If those matter to your team, AppFox is the better fit.",
      },
      {
        q: "Does SelfServe have a free plan?",
        a: "SelfServe offers a free trial but no permanent free tier. AppFox has a free plan with up to 50 edits/month that doesn't expire.",
      },
      {
        q: "Can I import my SelfServe configuration into AppFox?",
        a: "There's no direct migration tool, but AppFox's onboarding wizard covers all the same settings (edit types, windows, cutoffs, upsell rules) in about 5 minutes. Most teams are fully configured before the SelfServe trial ends.",
      },
    ],
  },
  {
    app: "subscription",
    slug: "recharge",
    name: "Recharge Subscriptions",
    shortName: "Recharge",
    category: "Subscriptions Platform",
    tagline:
      "Recharge is the enterprise heavyweight of Shopify subscriptions. AppFox Subscription covers the core jobs - widgets, recurring billing, customer portal - and is free for now.",
    framing:
      "Recharge starts at $25/mo for the first 50 subscribers, then $99 or $499 plus a cut of renewals, with 3,132 reviews. AppFox is free for new installs. Recharge is the better fit when you need cancel-save, benchmarks, or an implementation team.",
    metaTitle: "Recharge alternative | AppFox Subscriptions",
    metaDescription:
      "Recharge alternative for Shopify: AppFox Subscriptions is free for new installs and takes 0% of renewals. See the Recharge plans, where Recharge is the better fit, and what we do not do yet.",
    intro:
      "Recharge is the biggest name in Shopify subscriptions, and for complex enterprise programs - custom workflows, bundles logic, API-heavy builds - its depth is real. But that depth is priced in: a monthly platform fee plus a cut of every recurring transaction. AppFox Subscription takes the other path: subscribe-and-save widgets, auto-renewal on Shopify's native checkout, and a self-service customer portal - free for now with every feature unlocked, no subscription cap, and 0% transaction fees. For most stores adding subscriptions, that's the whole job.",
    bestFor:
      "Merchants who want subscribe-and-save and recurring billing without enterprise pricing or a percentage of every renewal.",
    whyAppfox: [
      {
        title: "Free for now, 0% transaction fees",
        description:
          "Recharge charges a monthly fee plus per-transaction pricing on recurring orders. AppFox Subscription is free for now - and never takes a cut of your renewals.",
      },
      {
        title: "Native Shopify Checkout by default",
        description:
          "AppFox creates subscriptions through Shopify's native subscription APIs and checkout - the flow your customers already trust, with no external checkout surface to maintain.",
      },
      {
        title: "Setup in minutes, not a migration project",
        description:
          "Pick products, set the frequency and discount, drop the widget on your product pages. No implementation partner, no onboarding call required.",
      },
      {
        title: "The portal that matters, included",
        description:
          "Skip, pause, swap, update payment, cancel - the self-service actions that kill support tickets are included for every store.",
      },
    ],
    comparison: [
      { feature: "Price", appfox: "Free for now", competitor: "$99+/mo" },
      { feature: "Transaction fees on renewals", appfox: false, competitor: "Yes, on standard plans" },
      { feature: "Free plan", appfox: "Every feature, no subscription cap", competitor: false },
      { feature: "Subscribe & save widgets", appfox: true, competitor: true },
      { feature: "Recurring billing & auto-renewal", appfox: true, competitor: true },
      { feature: "Customer self-service portal", appfox: true, competitor: true },
      { feature: "Shopify native checkout", appfox: true, competitor: true },
      { feature: "Subscription boxes & bundles", appfox: true, competitor: true },
      { feature: "Trials, tiered & custom pricing", appfox: true, competitor: true },
      { feature: "Enterprise workflow engine & API depth", appfox: "Core APIs", competitor: true },
      { feature: "Klaviyo integration", appfox: true, competitor: true },
      { feature: "Migration from another app", appfox: "Supported, assisted", competitor: "Concierge (enterprise)" },
    ],
    faq: [
      {
        q: "Can I migrate from Recharge to AppFox Subscription?",
        a: "A Recharge CSV can be imported. The import creates new contracts, and payment cards do not come across. Customers add a card again. The rendered comparison page has the full version of this answer.",
      },
      {
        q: "How does AppFox pricing compare to Recharge's $99+/month?",
        a: "AppFox Subscription is free for now - every feature, no cap on active subscriptions, and 0% transaction fees. Recharge's standard pricing combines a platform fee with per-transaction charges on renewals, which grows with your subscriber base.",
      },
      {
        q: "When is Recharge the better choice?",
        a: "If you're running a large, complex subscription program that needs custom workflow automation, deep API work, or an implementation team, Recharge's enterprise tooling is genuinely stronger. For subscribe-and-save, boxes, and memberships on a normal Shopify store, AppFox covers the job for a fraction of the price.",
      },
    ],
  },
  {
    app: "subscription",
    slug: "appstle",
    name: "Appstle Subscriptions",
    shortName: "Appstle",
    category: "Subscriptions Suite",
    tagline:
      "Appstle packs every subscription feature into tiered plans. AppFox Subscription keeps the essentials simple - and keeps them cheap.",
    framing:
      "Appstle is free until $500 a month in subscription revenue, then $10, $30, or $100, with 8,975 reviews and a Built for Shopify badge. Build-a-box sits on the $30 plan. AppFox includes it on a free install, and has one review.",
    metaTitle: "Appstle alternative | AppFox Subscriptions",
    metaDescription:
      "Appstle alternative for Shopify: AppFox Subscriptions is free for new installs with build-a-box included. Appstle has 8,975 reviews and puts build-a-box on the $30 plan. See the gaps.",
    intro:
      "Appstle has earned its following by shipping an enormous feature list at aggressive prices. If you want every lever - loyalty perks, build-a-box, cancellation flows - it's all in there somewhere, spread across plan tiers and a dense settings surface. AppFox Subscription is the simpler bet: the features nearly every subscription program actually runs on - widgets, auto-renewal, subscribe-and-save discounts, a customer portal - free for now, with every feature unlocked and no plan ladder to climb.",
    bestFor:
      "Merchants who want subscriptions live this afternoon - without studying a settings maze or decoding a feature grid.",
    whyAppfox: [
      {
        title: "A ladder you can read",
        description:
          "Appstle's capabilities unlock progressively across paid plans. AppFox Subscription is free for now, with every feature - widgets, billing, portal, analytics, bundles - unlocked for every store.",
      },
      {
        title: "Simple where it counts",
        description:
          "Fewer settings, faster setup, less to break. The widget matches your branding and the portal runs itself - no configuration project.",
      },
      {
        title: "Native checkout, no add-on surface",
        description:
          "Subscriptions bill through Shopify's own checkout and subscription APIs - nothing bolted on, nothing extra to test each theme update.",
      },
      {
        title: "Support without a tier gate",
        description:
          "24/7 support comes with the app - not reserved for higher plans.",
      },
    ],
    comparison: [
      { feature: "Price", appfox: "Free for now", competitor: "Free tier, then $10+/mo" },
      { feature: "Core app on the free plan (widgets, billing, portal)", appfox: true, competitor: "Varies by tier" },
      { feature: "Subscribe & save widgets", appfox: true, competitor: true },
      { feature: "Recurring billing & auto-renewal", appfox: true, competitor: true },
      { feature: "Customer self-service portal", appfox: true, competitor: true },
      { feature: "Shopify native checkout", appfox: true, competitor: true },
      { feature: "Trials, tiered & custom pricing", appfox: true, competitor: true },
      { feature: "Build-a-box / advanced box logic", appfox: true, competitor: true },
      { feature: "Loyalty & cancellation-save flows", appfox: "Basics included", competitor: "On higher tiers" },
      { feature: "Setup complexity", appfox: "Minutes", competitor: "Dense settings surface" },
      { feature: "Klaviyo integration", appfox: true, competitor: true },
      { feature: "24/7 support on the free plan", appfox: true, competitor: "Varies by tier" },
    ],
    faq: [
      {
        q: "Appstle has more features - why choose AppFox?",
        a: "Feature count isn't the job; running subscriptions is. Most programs use the same core: widgets, recurring billing, subscribe-and-save, and a portal. AppFox ships that core - free for now - and keeps it simple. If you know you need Appstle's long tail - build-a-box logic, tier-gated retention flows - it's a fine tool; you'll just be paying and configuring for it.",
      },
      {
        q: "Can I switch from Appstle without losing subscribers?",
        a: "An Appstle CSV can be imported. Payment cards do not come across. Customers add a card again.",
      },
      {
        q: "Is AppFox Subscription's free offer limited like Appstle's free tier?",
        a: "No. AppFox Subscription is free for now with every feature unlocked - widgets, recurring billing, the customer portal, analytics and bundling - no cap on active subscriptions, and 0% transaction fees.",
      },
    ],
  },
  {
    app: "subscription",
    slug: "seal-subscriptions",
    name: "Seal Subscriptions",
    shortName: "Seal",
    category: "Subscriptions",
    tagline:
      "Seal made its name as the budget-friendly subscription app. AppFox Subscription goes one better - on Shopify's native checkout, free for now.",
    framing:
      "Seal is free for 50 subscriptions, then $5.95, $9.95, or $24.95, with 0% transaction fees, 3,139 reviews, and a Built for Shopify badge. AppFox has no subscriber cap, one review, and nine languages against Seal's eighteen.",
    metaTitle: "Seal Subscriptions alternative | AppFox Subscriptions",
    metaDescription:
      "Seal Subscriptions alternative for Shopify: Seal is free for 50 subscriptions, then $5.95, with 0% fees and 3,139 reviews. AppFox is free for new installs with no subscriber cap. Compare the gaps.",
    intro:
      "Seal Subscriptions is a genuinely likeable app: transparent pricing, a real free tier, and a founder-run feel that merchants trust. If you're comparing paid plans, Seal is one of the cheapest. AppFox Subscription goes further - free for now with every feature unlocked - with billing on Shopify's native checkout, 0% transaction fees on every plan, and a portal customers work out on their own.",
    bestFor:
      "Stores that want budget-friendly subscriptions on Shopify's native checkout, with support that answers around the clock.",
    whyAppfox: [
      {
        title: "Free for now, 0% transaction fees",
        description:
          "AppFox Subscription is free for now, and it never takes a cut of your renewals - there's no app bill at all.",
      },
      {
        title: "Predictable steps as you grow",
        description:
          "No subscription allowance to track: while AppFox Subscription is free, there's no cap on active subscriptions. No surprises on the bill.",
      },
      {
        title: "Native Shopify billing",
        description:
          "Recurring charges run through Shopify's own checkout and subscription APIs - the same trusted flow as one-time orders.",
      },
      {
        title: "A portal customers figure out on their own",
        description:
          "Skip, pause, swap, cancel - self-service that reads like your store, not like a third-party account page.",
      },
    ],
    comparison: [
      { feature: "Price", appfox: "Free for now", competitor: "Free tier, then $4.95+/mo" },
      { feature: "Free plan", appfox: "No subscription cap", competitor: "Capped tier" },
      { feature: "Subscribe & save widgets", appfox: true, competitor: true },
      { feature: "Recurring billing & auto-renewal", appfox: true, competitor: true },
      { feature: "Customer self-service portal", appfox: true, competitor: true },
      { feature: "Shopify native checkout", appfox: true, competitor: true },
      { feature: "Trials, tiered & custom pricing", appfox: true, competitor: true },
      { feature: "Subscription boxes & bundles", appfox: true, competitor: true },
      { feature: "Klaviyo integration", appfox: true, competitor: true },
      { feature: "24/7 support", appfox: true, competitor: "Business-hours leaning" },
    ],
    faq: [
      {
        q: "Seal and AppFox cost about the same - what's the difference?",
        a: "AppFox is free for new installs and takes 0% of renewals. Seal's listing has 3,139 reviews, a Built for Shopify badge, and 18 languages. The rendered comparison page is the source of truth.",
      },
      {
        q: "Can I move my Seal subscribers to AppFox?",
        a: "Our import docs name Recharge and Appstle CSVs, not Seal. Do not assume a Seal file drops in. When a file does import, payment cards do not come across.",
      },
      {
        q: "What does Seal do better?",
        a: "Seal has been at this longer and carries a large review base, plus niche options power users enjoy. If a specific Seal feature anchors your program, keep it. If you need the core subscription stack, AppFox does that job and is free for now.",
      },
    ],
  },
  {
    app: "subscription",
    slug: "loop-subscriptions",
    name: "Loop Subscriptions",
    shortName: "Loop",
    category: "Subscriptions & Retention",
    tagline:
      "Loop leans into retention flows and dashboards for scaling brands. AppFox Subscription keeps recurring revenue simple - and cheap.",
    framing:
      "Loop is free for 50 active subscriptions, then $99 plus 1% or $399 plus 0.75%. Cancel flows and 15-retry dunning sit on the $99 plan. AppFox is free for new installs without that cap, and without the cancel-flow builder.",
    metaTitle: "Loop Subscriptions alternative | AppFox Subscriptions",
    metaDescription:
      "Loop Subscriptions alternative for Shopify: Loop is free for 50 active subscriptions, then $99 plus 1%. AppFox is free for new installs with no cap, and without Loop's cancel flows.",
    intro:
      "Loop Subscriptions courts scaling DTC brands: slick dashboards, gamified cancellation flows, and retention experiments - with the meaningful pieces on paid tiers that grow alongside your order volume. AppFox Subscription is the free-for-now alternative for the core job: subscribe-and-save on your product pages, auto-renewal through Shopify's checkout, and a portal where customers manage themselves. Start free, grow without a subscription cap, and add retention theater only if you ever actually need it.",
    bestFor:
      "Brands that want recurring revenue running today - not a retention-suite subscription of their own to manage.",
    whyAppfox: [
      {
        title: "Free for now, for the core job",
        description:
          "Loop's pricing scales with your subscription business. AppFox Subscription is free for now - and never takes a cut of a renewal.",
      },
      {
        title: "Less dashboard, more done",
        description:
          "Widgets, billing, portal - configured in minutes. No flow builder to learn before your first subscriber.",
      },
      {
        title: "Native Shopify subscription APIs",
        description:
          "Contracts and renewals live in Shopify's own subscription infrastructure - portable, trusted, and independent of any one app's dashboard.",
      },
      {
        title: "Self-service that prevents cancellations quietly",
        description:
          "Most cancellations start as \"I just need to skip a month.\" The portal makes skip and pause the easy path - no gamified exit survey required.",
      },
    ],
    comparison: [
      { feature: "Price", appfox: "Free for now", competitor: "Free tier, then paid tiers" },
      { feature: "Core app on the free plan (widgets, billing, portal)", appfox: true, competitor: false },
      { feature: "Subscribe & save widgets", appfox: true, competitor: true },
      { feature: "Recurring billing & auto-renewal", appfox: true, competitor: true },
      { feature: "Customer self-service portal", appfox: true, competitor: true },
      { feature: "Shopify native checkout", appfox: true, competitor: true },
      { feature: "Gamified cancellation flows", appfox: "Skip/pause built in", competitor: true },
      { feature: "Retention analytics suite", appfox: "Basics included", competitor: "On paid tiers" },
      { feature: "Subscription boxes & bundles", appfox: true, competitor: true },
      { feature: "Klaviyo integration", appfox: true, competitor: true },
    ],
    faq: [
      {
        q: "Doesn't Loop's retention tooling pay for itself?",
        a: "Sometimes - at serious subscriber volume, a good cancellation flow can earn its fee. But the cheapest retention feature is a portal where skipping a month is easier than cancelling, and AppFox ships that for every store, free for now. Start there; add paid retention tooling when the math demands it.",
      },
      {
        q: "Can I migrate from Loop to AppFox Subscription?",
        a: "Our import docs name Recharge and Appstle, not Loop. Payment cards do not come across on the imports we do document.",
      },
      {
        q: "Who should stay on Loop?",
        a: "Large DTC brands actively running retention experiments - A/B-tested cancellation flows, win-back campaigns, cohort dashboards - will use what Loop charges for. If subscriptions are a revenue line rather than a lab, AppFox covers it for a flat few dollars a month.",
      },
    ],
  },
  {
    app: "subscription",
    slug: "skio",
    name: "Skio",
    shortName: "Skio",
    category: "Subscriptions",
    tagline:
      "Skio is $599 a month plus 1% and 20¢, with a cancel-flow builder. AppFox Subscriptions is free for new installs and does not have that builder.",
    framing:
      "Skio, a Recharge company, is $599/mo plus 1% and 20¢, with a cancel-flow builder, build-a-box, and 243 reviews. There is no free plan on the listing. AppFox is the free install, without that cancel flow.",
    metaTitle: "Skio alternative | AppFox Subscriptions",
    metaDescription:
      "Skio alternative for Shopify: Skio is $599 a month plus 1% and 20¢, with a cancel-flow builder and build-a-box. AppFox Subscriptions is free for new installs and does not have that cancel flow.",
    intro:
      "Skio's public plan is $599 a month plus 1% and 20¢. That plan names a portal, passwordless login, a multi-step cancel flow, build-a-box, and migration. AppFox is free for new installs and does not have the cancel-flow builder. The full table is on this page.",
    bestFor:
      "Stores that want Skio's cancel-flow builder and can pay $599 a month before the transaction fee.",
    whyAppfox: [
      {
        title: "Free for a new install",
        description:
          "Skio's listing has one plan at $599 a month plus 1% and 20¢. AppFox has no app bill for a new install and takes 0% of renewals.",
      },
    ],
    comparison: [
      { feature: "Price for a new install", appfox: "Free for new installs", competitor: "$599/mo" },
      { feature: "Multi-step cancel flow", appfox: false, competitor: true },
    ],
    whereTheyWin: [
      {
        title: "Cancel-flow builder on the only plan",
        description:
          "Skio names a multi-step cancel flow, passwordless login, and build-a-box on the $599 plan. AppFox has build-a-box and does not have the cancel flow.",
      },
    ],
    checked: "10 October 2026",
    faq: [
      {
        q: "Is AppFox a Skio alternative?",
        a: "On price, yes. On the cancel-flow builder and 243 reviews, no. The page at this URL is rendered from the subscriptions comparison table.",
      },
    ],
  },
  ...bundleCompetitors,
];

export function getCompetitor(slug: string): Competitor | undefined {
  return competitors.find((c) => c.slug === slug);
}

/** Competitors for one AppFox app, in data order. */
export function competitorsForApp(app: CompetitorApp): Competitor[] {
  return competitors.filter((c) => c.app === app);
}

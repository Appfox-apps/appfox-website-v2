/**
 * AppFox Subscriptions comparison table.
 *
 * AppFox cells were checked on 10 October 2026 against the public product
 * docs (https://subscriptions-docs.getappfox.com) and the App Store listing
 * (https://apps.shopify.com/appfox-subscriptions). One-click checkout links
 * and inventory forecast were confirmed in the product code: the admin route
 * app/routes/app.quick-checkout.tsx builds a checkout link for a variant and
 * a selling plan, with optional email prefill and Shop Pay, and there is no
 * inventory-forecast code. The billing doc matches APP_IS_FREE: free for new
 * installs, 0% transaction fees, every feature unlocked. A merchant already
 * on a paid plan keeps it.
 *
 * Competitor cells were checked the same day against public help centers,
 * docs, pricing pages, and feature pages, then the App Store listing where
 * the docs are silent. A "?" means those pages do not say. Do not turn "?"
 * into yes. No In development or Planned cells: we do not have a public
 * roadmap for the gaps below.
 *
 * Copy stays in merchant language. Do not use "Listed", "Not listed", or
 * "No paid plans listed".
 */

import type {
  CompareCell,
  CompareFaq,
  CompareRow,
  CompareTable,
  CompareVendor,
} from "@/data/bundle-compare";

const yes: CompareCell = { kind: "yes" };
const no: CompareCell = { kind: "no" };
const text = (label: string, note?: string): CompareCell => ({
  kind: "text",
  label,
  ...(note ? { note } : {}),
});
const partial = (label: string, note?: string): CompareCell => ({
  kind: "partial",
  label,
  ...(note ? { note } : {}),
});
const via = (label: string, note?: string): CompareCell => ({
  kind: "via",
  label,
  ...(note ? { note } : {}),
});
const unknown = (note: string): CompareCell => ({ kind: "text", label: "?", note });

const A = "appfox";
const R = "recharge";
const P = "appstle";
const S = "seal-subscriptions";
const L = "loop-subscriptions";
const K = "skio";

type Id = typeof A | typeof R | typeof P | typeof S | typeof L | typeof K;

function row(
  id: string,
  feature: string,
  cells: Record<Id, CompareCell>,
  extra?: { hint?: string; more?: boolean },
): CompareRow {
  return { id, feature, cells, ...extra };
}

const CHECKED_PRODUCT = "Checked against the product on 10 Oct 2026";
const CHECKED_DOCS = "Checked against public docs on 10 Oct 2026";

export const subscriptionCompare: CompareTable = {
  product: "subscription",
  checked: "10 October 2026",
  title: "AppFox vs Recharge, Appstle, Seal, Loop & Skio",
  tagline:
    "Free for new installs, with 0% of renewals. The other apps have the reviews and, in some cases, the cancel-flow tools we do not ship.",
  bestFor:
    "A new store that wants subscribe-and-save, a portal, and build-a-box without an app bill, and can live with one public review.",
  intro:
    "This is a vendor page. AppFox Subscriptions is free for new installs, with 0% transaction fees and the features below unlocked. The current App Store listing is 5.0 from 1 review, launched 10 September 2026, and it does not have a Built for Shopify badge. Recharge, Appstle, Seal, Loop, and Skio have the review history and, in some cases, cancel-flow tools we do not ship. A question mark means the public help center, pricing page, or feature page we opened on 10 October 2026 does not say. We do not mark gaps as In development.",
  vendors: [
    {
      id: A,
      name: "AppFox Subscriptions",
      shortName: "AppFox",
      highlight: true,
      priceChip: "Free",
      href: "/subscription",
      checked: CHECKED_PRODUCT,
    },
    {
      id: R,
      name: "Recharge Subscriptions",
      shortName: "Recharge",
      priceChip: "From $25/mo",
      href: "/vs/recharge",
      checked: CHECKED_DOCS,
    },
    {
      id: P,
      name: "Appstle Subscriptions",
      shortName: "Appstle",
      priceChip: "Free to $500",
      href: "/vs/appstle",
      checked: CHECKED_DOCS,
    },
    {
      id: S,
      name: "Seal Subscriptions",
      shortName: "Seal",
      priceChip: "Free, then $5.95",
      href: "/vs/seal-subscriptions",
      checked: CHECKED_DOCS,
    },
    {
      id: L,
      name: "Loop Subscriptions",
      shortName: "Loop",
      priceChip: "Free to 50 subs",
      href: "/vs/loop-subscriptions",
      checked: CHECKED_DOCS,
    },
    {
      id: K,
      name: "Skio",
      shortName: "Skio",
      priceChip: "$599/mo",
      href: "/vs/skio",
      checked: CHECKED_DOCS,
    },
  ],
  roadmap: {
    inDevelopment:
      "We are building it now. It is not ready to install, and we will not mark a cell this way until that work is public.",
    planned:
      "It is on a public list with no ship date. A Planned cell is a statement of intent, not a feature you can use today.",
    note: "No Subscriptions roadmap statuses are published. Gaps on this page are no, a short limit, or a question mark. None of them are In development or Planned.",
  },
  footnotes: [
    {
      id: "1",
      text: "The customer portal settings list a Skip next order switch. The Reports page says customers cannot skip an order themselves, and that skipped orders come from the merchant or the app. Both pages were open on 10 October 2026, so this is not a yes.",
    },
    {
      id: "2",
      text: "There is a Shipping address updated email. The portal feature list we read does not include an address switch.",
    },
    {
      id: "3",
      text: "This is a Works with line on the Shopify App Store listing. We did not open a setup article for it.",
    },
    {
      id: "4",
      text: "This is only a category on the App Store listing. We did not find a setup article that shows the merchant how it works.",
    },
    {
      id: "5",
      text: "The free plan's feature list does not say whether the app takes a cut of renewals.",
    },
    {
      id: "6",
      text: "Retries and a failed-payment email exist. The retry schedule is set by the app. The docs say to email support to change it.",
    },
    {
      id: "7",
      text: "The $25 plan says it includes the entire Starter feature set. This item is named on Starter.",
    },
    {
      id: "8",
      text: "The App Store listing says free white-glove migration. The product docs describe a CSV import you run yourself. Payment cards do not come across.",
    },
    {
      id: "9",
      text: "Not in the public help center, pricing page, or feature pages we opened on 10 October 2026.",
    },
  ],
  sections: [
    {
      id: "at-a-glance",
      no: "00",
      title: "At a glance",
      label: "AT A GLANCE",
      caption: "What a new store pays, and how much public proof each app has.",
      rows: [
        row("price", "Price for a new install", {
          [A]: text("Free for new installs"),
          [R]: text("$25/mo, then $99 or $499"),
          [P]: text("Free, then $10 / $30 / $100"),
          [S]: text("Free, then $5.95 / $9.95 / $24.95"),
          [L]: text("Free, then $99 or $399"),
          [K]: text("$599/mo, or $5,988/yr"),
        }, { hint: "App bill only. Shopify Payments is separate." }),
        row("fee", "Cut of each renewal", {
          [A]: text("0%"),
          [R]: text("None on $25; then 1.49% + 19¢ or 1.34% + 19¢"),
          [P]: partial("0% on the $10+ plans", "5"),
          [S]: text("0% on every listed plan"),
          [L]: partial("1% on $99; 0.75% on $399", "5"),
          [K]: text("1% + 20¢"),
        }),
        row("cap", "Cap on the cheap plan", {
          [A]: text("No subscriber cap"),
          [R]: text("First 50 subscribers on the $25 plan"),
          [P]: text("$500/mo subscription revenue"),
          [S]: text("50 subscriptions"),
          [L]: text("50 active subscriptions"),
          [K]: text("No cheap plan on the listing"),
        }),
        row("rating", "Shopify App Store rating", {
          [A]: text("5.0 · 1 review"),
          [R]: text("4.8 · 3,132 reviews"),
          [P]: text("5.0 · 8,975 reviews"),
          [S]: text("4.9 · 3,139 reviews"),
          [L]: text("5.0 · 781 reviews"),
          [K]: text("5.0 · 243 reviews"),
        }),
        row("bfs", "Built for Shopify badge", {
          [A]: no,
          [R]: no,
          [P]: yes,
          [S]: yes,
          [L]: no,
          [K]: no,
        }),
        row("checkout", "Shopify checkout", {
          [A]: yes,
          [R]: yes,
          [P]: yes,
          [S]: yes,
          [L]: yes,
          [K]: yes,
        }, { hint: "Selling plans on Shopify checkout, not a separate checkout." }),
        row("portal", "Customer portal", {
          [A]: via("Shopify customer accounts"),
          [R]: text("No-code portal"),
          [P]: text("On the free plan"),
          [S]: partial("Passwordless login on the $5.95 plan"),
          [L]: text("On the free plan"),
          [K]: text("No-code portal, passwordless login"),
        }),
        row("languages", "Storefront languages on the listing", {
          [A]: text("9, including English"),
          [R]: text("English"),
          [P]: partial("English; translations are advertised"),
          [S]: text("18 languages"),
          [L]: partial("English; multilingual on the $399 plan"),
          [K]: text("English"),
        }, { more: true }),
        row("app-trial", "Free trial of the app", {
          [A]: text("No trial. The install is free."),
          [R]: text("60 days"),
          [P]: text("14 days on paid plans"),
          [S]: text("30 days on paid plans"),
          [L]: text("14 days on paid plans"),
          [K]: text("None on the listing"),
        }, { more: true }),
        row("launched", "App Store launch", {
          [A]: text("10 September 2026"),
          [R]: text("14 October 2014"),
          [P]: text("8 April 2021"),
          [S]: text("18 March 2020"),
          [L]: text("27 July 2021"),
          [K]: text("27 April 2021"),
        }, { more: true }),
        row("annual", "Annual app bill", {
          [A]: text("No app bill for new installs"),
          [R]: text("Monthly. Plus and Custom are 12-month terms."),
          [P]: text("$96 / $288 / $960 a year"),
          [S]: text("20% off the monthly price"),
          [L]: text("The public plans are monthly"),
          [K]: text("$5,988/yr (17% off)"),
        }, { more: true }),
      ],
    },
    {
      id: "billing",
      no: "01",
      title: "Billing plans",
      label: "BILLING PLANS",
      caption: "Discounts, prepaid, retries, and the rules on a selling plan.",
      rows: [
        row("discount", "Percent or fixed subscriber discount", {
          [A]: text("Percent or fixed amount"),
          [R]: text("Percent off or amount off"),
          [P]: partial("Tiered discounts advertised"),
          [S]: text("Tiered discounts on the free plan"),
          [L]: partial("Dynamic discounts in the overview"),
          [K]: text("Percent off or a set price"),
        }),
        row("frequencies", "More than one frequency on a plan", {
          [A]: yes,
          [R]: text("Days, weeks, or months on one product"),
          [P]: text("On the free plan"),
          [S]: text("Daily, weekly, monthly, or yearly"),
          [L]: text("Several frequencies on one selling plan"),
          [K]: text("Each frequency is its own interval"),
        }),
        row("intro", "Lower price for the first cycles", {
          [A]: text("Intro price, then the normal discount"),
          [R]: text("Initial discount for a set number of orders"),
          [P]: text("Joining discount, then later rewards"),
          [S]: unknown("9"),
          [L]: text("Discount can change after the first order"),
          [K]: text("A second price after a set number of cycles"),
        }, { hint: "Not the same as a $0 trial." }),
        row("shopper-trial", "$0 trial for the shopper", {
          [A]: no,
          [R]: partial("Only a listing category", "4"),
          [P]: text("Shopper trials in the overview"),
          [S]: text("Free trials in the overview"),
          [L]: text("100% off the first order, then full price"),
          [K]: partial("A later-cycle price can differ. A $0 trial is not documented."),
        }),
        row("prepaid", "Prepaid (pay once, deliver several times)", {
          [A]: yes,
          [R]: text("Pay for several shipments up front"),
          [P]: text("On the free plan"),
          [S]: text("Separate billing and delivery intervals"),
          [L]: text("Pay up front for several deliveries. The listing puts it on the $399 plan."),
          [K]: text("Prepaid selling plan"),
        }),
        row("dunning", "Retry a failed payment", {
          [A]: partial("Yes. Schedule is fixed.", "6"),
          [R]: text("On Starter, included in $25", "7"),
          [P]: text("On the free plan"),
          [S]: text("You set the retry count and the delay"),
          [L]: partial("Up to 15 retries on the $99 plan"),
          [K]: text("On the $599 plan"),
        }),
        row("min-cycles", "Block cancel until N orders", {
          [A]: text("Per plan, customer portal only"),
          [R]: unknown("9"),
          [P]: text("Minimum orders before cancel"),
          [S]: text("Minimum payments before cancel"),
          [L]: text("Minimum orders before cancel"),
          [K]: text("Minimum cycles before cancel"),
        }),
        row("anchor", "Bill on set days of the week or month", {
          [A]: yes,
          [R]: text("A set day of the month"),
          [P]: unknown("9"),
          [S]: text("A set day of the week or month"),
          [L]: text("Anchor day, with a cutoff window"),
          [K]: text("Lock the order to a specific day"),
        }, { more: true }),
        row("loyalty-tier", "Extra discount after N paid cycles", {
          [A]: text("Up to two tiers on a plan"),
          [R]: partial("Loyalty rewards on the $499 plan"),
          [P]: text("A reward ladder by order number"),
          [S]: text("Another discount after N payments"),
          [L]: partial("Rewards on the $399 plan"),
          [K]: text("A different discount after N cycles"),
        }, { more: true }),
        row("grandfather", "Existing subscribers keep their price", {
          [A]: via("Shopify"),
          [R]: unknown("9"),
          [P]: partial("Auto price sync named on the $100 plan"),
          [S]: text("On recurring invoices, you can keep the first price"),
          [L]: partial("Automatic price updates on the $99 plan"),
          [K]: text("Old subscriptions keep their original price"),
        }, { more: true, hint: "On AppFox, Shopify stores the contract price. Editing the plan does not reprice old subscribers." }),
        row("manual", "Create a subscription from the admin", {
          [A]: text("For phone or in-person sales"),
          [R]: text("From the merchant portal"),
          [P]: text("Pick the customer, plan, and card on file"),
          [S]: text("Add subscription manually"),
          [L]: text("From the admin"),
          [K]: text("Create subscription in the dashboard"),
        }, { more: true }),
      ],
    },
    {
      id: "portal",
      no: "02",
      title: "Customer portal",
      label: "CUSTOMER PORTAL",
      caption: "What a subscriber can do without emailing you.",
      rows: [
        row("pause", "Pause and resume", {
          [A]: yes,
          [R]: partial("A pause step before cancel"),
          [P]: yes,
          [S]: yes,
          [L]: yes,
          [K]: text("Indefinite, or a set length"),
        }),
        row("cancel", "Cancel", {
          [A]: text("Switch you can turn off"),
          [R]: partial("Cancel-save tools on the $99 plan"),
          [P]: partial("Cancellation control on the $30 plan"),
          [S]: partial("Cancel flow on the $9.95 plan"),
          [L]: partial("Cancel flows on the $99 plan"),
          [K]: text("Multi-step cancel flow"),
        }),
        row("skip", "Skip the next order", {
          [A]: partial("Docs disagree", "1"),
          [R]: text("Skip button in the portal"),
          [P]: yes,
          [S]: yes,
          [L]: text("With a cap on consecutive skips"),
          [K]: yes,
        }),
        row("swap", "Swap a product", {
          [A]: yes,
          [R]: text("Off until you turn it on"),
          [P]: yes,
          [S]: text("On the free plan"),
          [L]: text("Portal preference"),
          [K]: yes,
        }),
        row("frequency", "Change frequency", {
          [A]: yes,
          [R]: text("From the plans on the product, or any interval"),
          [P]: yes,
          [S]: yes,
          [L]: text("When that selling plan is on in the portal"),
          [K]: yes,
        }),
        row("reschedule", "Change the next order date", {
          [A]: yes,
          [R]: yes,
          [P]: yes,
          [S]: yes,
          [L]: text("With a maximum number of days"),
          [K]: yes,
        }),
        row("payment", "Update the card", {
          [A]: yes,
          [R]: text("Add a card, or email a Shopify update link"),
          [P]: yes,
          [S]: text("Edit sends an email to update the card"),
          [L]: yes,
          [K]: text("Pick a saved card, or add one"),
        }),
        row("line-items", "Add or remove a product", {
          [A]: yes,
          [R]: text("Add, swap, or change a variant"),
          [P]: text("Add, swap, or remove"),
          [S]: text("Add, remove, or change quantity"),
          [L]: text("Add a one-time item"),
          [K]: text("Add a product, or change quantity"),
        }, { more: true }),
        row("portal-discount", "Apply a discount code", {
          [A]: yes,
          [R]: yes,
          [P]: text("Through a quick-action link"),
          [S]: yes,
          [L]: text("Including more than one code"),
          [K]: yes,
        }, { more: true }),
        row("address", "Change the shipping address", {
          [A]: partial("Email exists; switch not documented", "2"),
          [R]: yes,
          [P]: yes,
          [S]: text("Per subscription, if you turn it on"),
          [L]: yes,
          [K]: yes,
        }, { more: true }),
        row("passwordless", "Passwordless or magic-link login", {
          [A]: via("Shopify customer accounts"),
          [R]: text("Magic link in the subscription email"),
          [P]: text("Magic link in subscription emails"),
          [S]: text("Magic link in each subscription email"),
          [L]: text("Email magic link, or Shopify accounts"),
          [K]: yes,
        }, { more: true }),
        row("cancel-flow", "Multi-step cancel flow", {
          [A]: no,
          [R]: partial("Smart cancellation prevention on the $99 plan"),
          [P]: partial("Cancellation control on the $30 plan"),
          [S]: partial("On the $9.95 plan"),
          [L]: partial("On the $99 plan"),
          [K]: yes,
        }, { more: true }),
      ],
    },
    {
      id: "offers",
      no: "03",
      title: "Offers",
      label: "OFFERS",
      caption: "Widget, boxes, bundles, add-ons, and rewards.",
      rows: [
        row("widget", "Subscribe widget on the product page", {
          [A]: text("Theme styling, no code"),
          [R]: text("On Starter, included in $25", "7"),
          [P]: partial("Themed widget on the $30 plan"),
          [S]: text("Injected on products in a rule"),
          [L]: partial("Templates on the $99 plan"),
          [K]: text("Plan picker on the product page"),
        }),
        row("bundles", "Fixed bundle (you pick the products)", {
          [A]: text("One price for the set"),
          [R]: partial("Curated sets in the overview; customizable bundles on $499"),
          [P]: partial("Bundling on the $30 plan"),
          [S]: unknown("9"),
          [L]: partial("Fixed bundles on the $99 plan"),
          [K]: unknown("9"),
        }),
        row("bab", "Build-a-box (they pick the products)", {
          [A]: text("Min and max, on the free install"),
          [R]: partial("Build-your-own in the overview"),
          [P]: partial("On the $30 plan"),
          [S]: unknown("9"),
          [L]: partial("On the $99 plan"),
          [K]: text("Static and dynamic, on the $599 plan"),
        }),
        row("addons", "Add-ons at subscription checkout", {
          [A]: yes,
          [R]: text("Upsell and cross-sell on Starter", "7"),
          [P]: unknown("9"),
          [S]: unknown("9"),
          [L]: partial("Portal upsell on the $99 plan"),
          [K]: partial("Upsells inside automated journeys"),
        }),
        row("rewards", "Reward after N paid orders", {
          [A]: text("Percent, amount, fixed price, free gift, or free shipping"),
          [R]: partial("Loyalty rewards on the $499 plan"),
          [P]: text("Discount, gift, or free shipping by order number"),
          [S]: partial("Free products are a rewards category"),
          [L]: partial("Rewards on the $399 plan"),
          [K]: text("A different discount after N cycles"),
        }),
        row("boxes", "Subscription boxes", {
          [A]: text("Fixed bundles and build-a-box"),
          [R]: text("In the overview"),
          [P]: text("In the overview"),
          [S]: text("In the overview"),
          [L]: text("In the overview"),
          [K]: text("Build-a-box on the plan"),
        }),
      ],
    },
    {
      id: "email-analytics",
      no: "04",
      title: "Email and analytics",
      label: "EMAIL AND ANALYTICS",
      caption: "What the merchant sees, and which emails go out on their own.",
      rows: [
        row("emails", "Transactional subscription emails", {
          [A]: text("14 templates, each can be turned off"),
          [R]: text("Templates you can edit, with a portal link"),
          [P]: text("Built-in emails on the free plan"),
          [S]: text("Renewal and invoice emails"),
          [L]: text("Customer alerts on the free plan"),
          [K]: partial("Automated journeys on the $599 plan"),
        }),
        row("dashboard", "Analytics dashboard", {
          [A]: text("Active, paused, cancelled, failed, AOV, next 7 days"),
          [R]: text("Analytics and benchmarks on Starter", "7"),
          [P]: text("On the free plan"),
          [S]: text("Real-time analytics in the overview"),
          [L]: text("On the free plan"),
          [K]: text("On the $599 plan"),
        }),
        row("reports", "Billing reports you can export", {
          [A]: text("Success, failed, queued, skipped"),
          [R]: unknown("9"),
          [P]: text("Forecast and order reports, export by email"),
          [S]: text("Payment calendar: completed, pending, failed, skipped"),
          [L]: text("Order, churn, and inventory reports"),
          [K]: text("Data export in the dashboard"),
        }),
        row("klaviyo", "Klaviyo", {
          [A]: text("Lifecycle events, private API key"),
          [R]: yes,
          [P]: yes,
          [S]: yes,
          [L]: yes,
          [K]: yes,
        }, { hint: "Competitor yes means Klaviyo is named under Works with." }),
        row("omnisend", "Omnisend", {
          [A]: text("Same style of lifecycle events as Klaviyo"),
          [R]: text("Started, updated, cancelled, activated"),
          [P]: text("API key in the app"),
          [S]: unknown("9"),
          [L]: yes,
          [K]: text("Lifecycle events, including a failed payment"),
        }),
      ],
    },
    {
      id: "migrations",
      no: "05",
      title: "Migrations and connections",
      label: "MIGRATIONS AND CONNECTIONS",
      caption: "Moving subscribers, and the other tools named in public docs.",
      rows: [
        row("migrate", "Help moving subscribers from another app", {
          [A]: partial("CSV from Recharge and Appstle. Cards do not come across.", "8"),
          [R]: partial("Hands-on implementation on the $499 plan"),
          [P]: text("Hands-on migration on the free plan"),
          [S]: text("Manual, CSV, or API. Some cards can move."),
          [L]: unknown("9"),
          [K]: text("Zero-downtime migration"),
        }, { hint: "On AppFox, customers add a card again. Seal can move cards from Stripe, Braintree, Authorize.net, or PayPal Express." }),
        row("flow", "Shopify Flow", {
          [A]: partial("On the listing, not in the integrations docs", "3"),
          [R]: yes,
          [P]: yes,
          [S]: unknown("9"),
          [L]: unknown("9"),
          [K]: yes,
        }, { hint: "Yes means the listing's Works with line names Flow. Loop's own Flows product is a separate tool." }),
        row("pos", "Sell a subscription on Shopify POS", {
          [A]: text("POS tile, Shopify Payments, POS 10.15+"),
          [R]: partial("Works with Shopify POS", "3"),
          [P]: partial("Works with Shopify POS", "3"),
          [S]: partial("Works with Shopify POS", "3"),
          [L]: unknown("9"),
          [K]: unknown("9"),
        }),
        row("api", "API for your own tools", {
          [A]: text("External API and MCP, on the free install"),
          [R]: partial("JavaScript SDK and Storefront API on $499"),
          [P]: partial("APIs by request on the $100 plan"),
          [S]: text("Full API and webhooks on the free plan"),
          [L]: partial("Admin and storefront APIs on the $399 plan"),
          [K]: text("API and webhooks"),
        }),
        row("gorgias", "Gorgias", {
          [A]: no,
          [R]: yes,
          [P]: yes,
          [S]: yes,
          [L]: yes,
          [K]: yes,
        }),
        row("zapier", "Zapier", {
          [A]: yes,
          [R]: yes,
          [P]: yes,
          [S]: unknown("9"),
          [L]: text("Pause, skip, or reschedule from a Zap"),
          [K]: unknown("9"),
        }),
        row("sms", "SMS", {
          [A]: no,
          [R]: partial("Concierge SMS on the $499 plan"),
          [P]: partial("SMS notifications on the $10 plan"),
          [S]: unknown("9"),
          [L]: text("Through Attentive or Postscript"),
          [K]: unknown("9"),
        }, { more: true }),
      ],
    },
    {
      id: "support",
      no: "06",
      title: "Support and fit",
      label: "SUPPORT AND FIT",
      caption: "Who the listing is written for, and what support it promises.",
      rows: [
        row("support-hours", "Support promise on the listing", {
          [A]: text("Email support in the docs"),
          [R]: text("Live chat 6am–6pm PT, weekdays"),
          [P]: text("24/7 on every plan, including free"),
          [S]: text("Support team, hours not stated"),
          [L]: partial("24×7 Slack on the $399 plan"),
          [K]: text("Live chat 9am–5pm ET, weekdays"),
        }),
        row("implementation", "Hands-on setup", {
          [A]: partial("Listing says white-glove; docs are a CSV import", "8"),
          [R]: partial("On the $499 plan"),
          [P]: text("Hands-on migration on the free plan"),
          [S]: text("You run a CSV, the API, or a manual recreate"),
          [L]: partial("Dedicated CSM on the $399 plan"),
          [K]: text("Migration named on the plan"),
        }),
        row("already-paid", "Stores already paying the app", {
          [A]: text("Old paid plans stay until you change them"),
          [R]: text("External charges may sit outside Shopify"),
          [P]: text("Revenue caps on each plan"),
          [S]: text("Subscriber caps on each plan"),
          [L]: text("Percent fee on paid plans"),
          [K]: text("One public plan"),
        }),
        row("best-cheap", "Sensible while you are small", {
          [A]: text("Free install, no subscriber cap"),
          [R]: text("$25 for the first 50, then the fee starts"),
          [P]: text("Free under $500/mo subscription revenue"),
          [S]: text("Free for 50 subscriptions"),
          [L]: text("Free for 50 active subscriptions"),
          [K]: text("$599 before the first subscriber"),
        }),
        row("best-scale", "Sensible at a large subscriber base", {
          [A]: text("Still $0 today. One public review."),
          [R]: text("$499 plan, 12 years of reviews"),
          [P]: text("$100 plan up to $100k/mo, then ask"),
          [S]: text("Bigger plans up to 150k subscriptions, on request"),
          [L]: text("$399 plan plus 0.75%"),
          [K]: text("$599 plus 1% and 20¢"),
        }),
        row("proof", "Public proof on 10 Oct 2026", {
          [A]: text("1 review, no badge"),
          [R]: text("3,132 reviews, no badge"),
          [P]: text("8,975 reviews, Built for Shopify"),
          [S]: text("3,139 reviews, Built for Shopify"),
          [L]: text("781 reviews, no badge"),
          [K]: text("243 reviews, a Recharge company"),
        }),
        row("checkout-links", "One-click checkout links", {
          [A]: text("Variant and selling plan. Optional email and Shop Pay."),
          [R]: text("Copy a checkout link from the product"),
          [P]: partial("On the $100 plan"),
          [S]: text("Quick Checkout Wizard"),
          [L]: partial("On the $99 plan"),
          [K]: text("Variant and selling plan"),
        }, { more: true }),
        row("inventory", "Inventory forecast", {
          [A]: no,
          [R]: text("Out-of-stock rules. A unit forecast is not described."),
          [P]: text("Next 7, 30, 90, and 365 days"),
          [S]: text("Next 7, 30, and 60 days"),
          [L]: text("Projected quantity in Analytics"),
          [K]: text("Queued units by SKU, plus a forecast"),
        }, { more: true }),
      ],
    },
  ],
  faq: [
    {
      q: "You make AppFox. Why should I trust this table?",
      a: "Treat it as a vendor page with the sources linked at the bottom. The AppFox column was checked against the product on 10 October 2026. Competitor columns were checked the same day against each app's public help center, pricing page, and feature pages. Where those pages do not say, the cell is a question mark. We also say, in plain language, when another app is the better fit.",
    },
    {
      q: "What does AppFox Subscriptions not do yet?",
      a: "There is no multi-step cancel-flow builder, no SMS, no Gorgias app, no referral program, and no inventory forecast. A shopper does not get a $0 trial: intro pricing is a lower price for the first cycles, then the normal discount. Payment cards do not move when you import from Recharge or Appstle. Customer skip is not a clean yes, because two of our own docs disagree. The retry schedule for failed cards is set by the app. The current listing has 1 review and no Built for Shopify badge.",
    },
    {
      q: "Is the app actually free?",
      a: "For a new install, yes. There is no app bill, no subscriber cap, and AppFox takes 0% of renewals. Shopify Payments fees still apply. If a store was already on a paid AppFox plan, that plan stays until the merchant changes it. A future paid plan would have to be approved in Shopify before any charge.",
    },
    {
      q: "AppFox has one review. Is that a real risk?",
      a: "Yes. Appstle has 8,975 reviews and a Built for Shopify badge. Seal has 3,139 and the badge. Recharge has 3,132 reviews going back to 2014. One review on a listing launched 10 September 2026 is a fair reason to pick someone else, especially if you have to justify the install. Price is the AppFox case, not tenure.",
    },
    {
      q: "Can I move subscribers from Recharge or Appstle?",
      a: "The docs describe a CSV import from Recharge and from Appstle, plus a sync for Shopify subscription contracts. The import creates new AppFox contracts. Payment cards do not transfer. You send customers a link to add a card. The App Store listing also says free white-glove migration, including from Seal. The docs we checked name Recharge and Appstle CSVs, not a done-for-you project plan.",
    },
    {
      q: "When is another app the better fit?",
      a: "Recharge, when you want cancel-save, cohort benchmarks, or the $499 implementation, loyalty, and SMS set, and you can pay the fee. Appstle, when you want 8,975 reviews, a Built for Shopify badge, and 24/7 support, and you can live with build-a-box on the $30 plan. Seal, when you want a cheap subscriber-count bill, 18 languages, and an API on the free plan, and 50 subscriptions is enough to start. Loop, when the cancel flows and 15-retry dunning on the $99 plan are the job. Skio, when you want that cancel-flow builder and build-a-box on one $599 plan and the review base matters more than a free install.",
    },
    {
      q: "Why is a cell a question mark?",
      a: "We did not find it in the public help center, pricing page, or feature page we opened on 10 October 2026. A Works with line is marked as such. A category tag alone is not a yes. If you know a public page that confirms a cell, email support and we will check it.",
    },
    {
      q: "Do you mark missing features as In development?",
      a: "Not unless that status is public. In development and Planned are defined above so the words stay stable. Right now no Subscriptions gap on this page uses either badge.",
    },
  ],
  sources: [
    { label: "AppFox Subscriptions App Store listing", url: "https://apps.shopify.com/appfox-subscriptions" },
    { label: "AppFox Subscriptions docs: pricing", url: "https://subscriptions-docs.getappfox.com/settings/billing" },
    { label: "AppFox Subscriptions docs: plans", url: "https://subscriptions-docs.getappfox.com/plans" },
    { label: "AppFox Subscriptions docs: customer portal", url: "https://subscriptions-docs.getappfox.com/storefront/customer-portal" },
    { label: "AppFox Subscriptions docs: import", url: "https://subscriptions-docs.getappfox.com/settings/import" },
    { label: "AppFox Subscriptions docs: emails", url: "https://subscriptions-docs.getappfox.com/emails" },
    { label: "AppFox Subscriptions docs: Klaviyo events (on the emails page)", url: "https://subscriptions-docs.getappfox.com/emails" },
    { label: "AppFox Subscriptions docs: Omnisend", url: "https://subscriptions-docs.getappfox.com/omnisend" },
    { label: "AppFox Subscriptions docs: reports", url: "https://subscriptions-docs.getappfox.com/reports" },
    { label: "AppFox Subscriptions docs: dashboard", url: "https://subscriptions-docs.getappfox.com/dashboard" },
    { label: "AppFox Subscriptions docs: build-a-box", url: "https://subscriptions-docs.getappfox.com/build-a-box" },
    { label: "AppFox Subscriptions docs: bundles", url: "https://subscriptions-docs.getappfox.com/bundles" },
    { label: "AppFox Subscriptions docs: rewards", url: "https://subscriptions-docs.getappfox.com/features/subscription-rewards" },
    { label: "AppFox Subscriptions docs: POS", url: "https://subscriptions-docs.getappfox.com/pos" },
    { label: "Recharge App Store listing", url: "https://apps.shopify.com/subscription-payments" },
    { label: "Appstle App Store listing", url: "https://apps.shopify.com/subscriptions-by-appstle" },
    { label: "Seal Subscriptions App Store listing", url: "https://apps.shopify.com/seal-subscriptions" },
    { label: "Loop Subscriptions App Store listing", url: "https://apps.shopify.com/loop-subscriptions" },
    { label: "Skio App Store listing", url: "https://apps.shopify.com/skio" },
    { label: "Recharge: customer portal settings", url: "https://support.getrecharge.com/hc/en-us/articles/38143430119191-Configuring-customer-portal-settings" },
    { label: "Recharge: prepaid subscriptions", url: "https://support.getrecharge.com/hc/en-us/articles/32581132524055-Offering-prepaid-subscriptions" },
    { label: "Recharge: direct checkout links", url: "https://support.getrecharge.com/hc/en-us/articles/10599255959191-Creating-direct-checkout-links" },
    { label: "Recharge: contacting support", url: "https://support.getrecharge.com/hc/en-us/articles/360008830153-Contacting-Recharge-Support" },
    { label: "Recharge pricing", url: "https://getrecharge.com/pricing/" },
    { label: "Appstle: customer portal", url: "https://intercom.help/appstle/en/articles/15410881-set-up-your-customer-portal" },
    { label: "Appstle: analytics and reports", url: "https://intercom.help/appstle/en/articles/8392402-analytics-and-reports" },
    { label: "Appstle: Omnisend", url: "https://intercom.help/appstle/en/articles/8048469-how-to-integrate-omnisend-with-appstle-subscriptions" },
    { label: "Seal Subscriptions manual", url: "https://www.sealsubscriptions.com/articles/manual" },
    { label: "Seal: editing subscriptions", url: "https://www.sealsubscriptions.com/article/editing-subscriptions" },
    { label: "Loop: customer portal", url: "https://help.loopwork.co/en/articles/12707618-customer-portal" },
    { label: "Loop: selling plans", url: "https://help.loopwork.co/en/articles/12674241-selling-plans" },
    { label: "Loop: anchor day billing", url: "https://help.loopwork.co/en/articles/12716835-anchor-day-billing" },
    { label: "Loop: reports", url: "https://help.loopwork.co/en/articles/12742177-reports" },
    { label: "Skio: selling plans", url: "https://help.skio.com/docs/getting-started-with-selling-plans" },
    { label: "Skio: customer portal", url: "https://help.skio.com/docs/customer-portal-v3-overview" },
    { label: "Skio: one-click checkout", url: "https://help.skio.com/docs/one-click-checkout-buy-now" },
    { label: "Skio: forecasting", url: "https://help.skio.com/docs/forecasting-dashboard" },
    { label: "Skio: support hours", url: "https://help.skio.com/docs/how-to-get-help-with-skio" },
  ],
};

export type SubscriptionVsPage = {
  slug: string;
  competitorId: Id;
  /** H1, and the phrase required in the title and meta description. */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  whereTheyWin: { title: string; description: string }[];
  whatWeDont: { title: string; description: string }[];
  faq: CompareFaq[];
};

export const subscriptionVsPages: SubscriptionVsPage[] = [
  {
    slug: "recharge",
    competitorId: R,
    h1: "Recharge alternative",
    metaTitle: "Recharge alternative | AppFox Subscriptions",
    metaDescription:
      "Recharge alternative for Shopify: AppFox Subscriptions is free for new installs and takes 0% of renewals. See the Recharge plans, where Recharge is the better fit, and what we do not do yet.",
    summary:
      "Recharge is the older, larger subscription app on Shopify. A new store can start at $25 a month for the first 50 subscribers, with no transaction fee on that plan. After that the public plans are $99 a month plus 1.49% and 19¢, or $499 a month plus 1.34% and 19¢. The $99 plan names a product-page widget, a portal, upsells, cancel prevention, failed-payment recovery, and analytics. Bundles, loyalty, concierge SMS, and a JavaScript SDK are named on the $499 plan. The listing shows 4.8 from 3,132 reviews, English only, launched in 2014. AppFox Subscriptions is free for new installs, takes 0% of renewals, and the current listing is 5.0 from 1 review. If cancel-save, benchmarks, or an implementation team is the job, Recharge is the better fit.",
    whereTheyWin: [
      {
        title: "3,132 reviews, since 2014",
        description:
          "The Recharge listing launched 14 October 2014 and shows 4.8 from 3,132 reviews. The AppFox listing launched 10 September 2026 and shows 5.0 from 1 review. If you need a long public record, pick Recharge.",
      },
      {
        title: "Cancel prevention and benchmarks",
        description:
          "Smart cancellation prevention, failed-payment recovery, and analytics with industry benchmarks are named on the $99 plan, which the $25 plan says it includes. AppFox does not have a multi-step cancel flow.",
      },
      {
        title: "Loyalty, SMS, and a storefront SDK",
        description:
          "The $499 plan names customizable bundles, concierge SMS, loyalty rewards, a referral program, and a JavaScript SDK. AppFox has rewards on a plan and no SMS, referral program, or public storefront SDK on the $499 feature list.",
      },
      {
        title: "Hands-on implementation",
        description:
          "Hands-on implementation is a $499 plan line. Our docs describe a CSV import you run, not a staffed migration project.",
      },
    ],
    whatWeDont: [
      {
        title: "No $0 trial for the shopper",
        description:
          "Intro pricing is a lower price for the first billing cycles, then the plan's normal discount. The docs say that is not a free trial.",
      },
      {
        title: "Cards do not move",
        description:
          "A Recharge CSV can be imported. Payment cards cannot. Customers add a card again before the next renewal.",
      },
      {
        title: "Skip is not a clean yes",
        description:
          "Portal settings list Skip next order. The Reports page says customers cannot skip an order themselves. We are not calling that a yes.",
      },
      {
        title: "No badge, no Gorgias, Flow is only a listing line",
        description:
          "No Built for Shopify badge. Gorgias is not in our integrations docs. Shopify Flow is on the Works with line and not in the integrations docs we checked.",
      },
    ],
    faq: [
      {
        q: "Is AppFox a Recharge alternative for a normal Shopify store?",
        a: "For subscribe-and-save, a portal, prepaid, build-a-box, rewards, Klaviyo, and Omnisend, on a free install, yes. It is a weak Recharge alternative if you need their cancel-save tools, cohort benchmarks, SMS, or a staffed implementation.",
      },
      {
        q: "How does the Recharge bill compare?",
        a: "Recharge's listing shows $25 a month for the first 50 subscribers with no transaction fee, then $99 a month plus 1.49% and 19¢, or $499 a month plus 1.34% and 19¢. AppFox is free for new installs and takes 0%. Shopify Payments fees still apply on both.",
      },
      {
        q: "Can I move Recharge subscribers to AppFox?",
        a: "The docs describe a Recharge CSV import. It creates new contracts. Cards do not transfer. You email customers a link to add a card. The listing also says free white-glove help. The docs we checked describe the CSV, not a project plan.",
      },
      {
        q: "You make AppFox. Is this page biased?",
        a: "Yes, it is our page. The Recharge cells are from public Recharge docs on 10 October 2026, and the AppFox cells are from our product the same day. Where Recharge is the better fit, the section above says so. Unconfirmed cells stay as a question mark.",
      },
    ],
  },
  {
    slug: "appstle",
    competitorId: P,
    h1: "Appstle alternative",
    metaTitle: "Appstle alternative | AppFox Subscriptions",
    metaDescription:
      "Appstle alternative for Shopify: AppFox Subscriptions is free for new installs with build-a-box included. Appstle has 8,975 reviews and puts build-a-box on the $30 plan. See the gaps.",
    summary:
      "Appstle is free until $500 a month in subscription revenue, then $10, $30, or $100 a month, with 0% transaction fees stated on the paid plans. The free plan names prepaid, payment retry, built-in emails, analytics, churn control, a Shopify customer portal, and 24/7 support. Build-a-box and bundling are on the $30 plan. Product swap, a custom email domain, and APIs are on the $100 plan. The listing is 5.0 from 8,975 reviews and has a Built for Shopify badge. AppFox includes build-a-box, product swap, rewards, a custom email domain, and an API on a free install, and the current listing has 1 review and no badge. If the review base and round-the-clock support are the decision, Appstle is the better fit.",
    whereTheyWin: [
      {
        title: "8,975 reviews and the badge",
        description:
          "Appstle shows 5.0 from 8,975 reviews and a Built for Shopify badge. AppFox shows 5.0 from 1 review and no badge. That gap is the main reason to stay.",
      },
      {
        title: "24/7 support on the free plan",
        description:
          "Every Appstle plan, including free, says 24/7 human support. Our docs point at email support. A single App Store review mentions reaching a person. We are not calling that 24/7.",
      },
      {
        title: "Hands-on migration on the free plan",
        description:
          "Appstle names hands-on migration on the free plan. Our docs describe a CSV you upload. The listing's white-glove line is ahead of that doc.",
      },
      {
        title: "A free tier with a revenue cap, and shopper trials",
        description:
          "The free plan runs to $500 a month in subscription revenue. The overview names shopper trials. AppFox is free with no subscriber cap, and intro pricing is not a $0 trial.",
      },
    ],
    whatWeDont: [
      {
        title: "We do not have their review base",
        description:
          "One review against 8,975 is not a close call. If a stakeholder needs the badge and the review count, do not install AppFox to save the $10.",
      },
      {
        title: "No cancel-flow builder",
        description:
          "Appstle names cancellation control on the $30 plan. AppFox lets you hide cancel, or block it until N orders. There is no multi-step save flow.",
      },
      {
        title: "Product swap is included here, and gated there",
        description:
          "This is a place we do more on the free install: swap, build-a-box, and the API are not waiting on a $30 or $100 plan. Their help center describes address changes in the portal. Checkout links are named on the $100 plan.",
      },
      {
        title: "Cards still do not move",
        description:
          "An Appstle CSV can be imported. Customers add a payment card again.",
      },
    ],
    faq: [
      {
        q: "Is AppFox an Appstle alternative if I only need the core app?",
        a: "If you want a widget, recurring billing, a portal, build-a-box, and Klaviyo without a revenue cap, AppFox is the cheaper install. It is a poor Appstle alternative if you are choosing on reviews, the Built for Shopify badge, or 24/7 support.",
      },
      {
        q: "Appstle's free plan looks generous. What is the catch?",
        a: "The listing caps it at $500 a month in subscription revenue. Build-a-box and bundling are on the $30 plan. Product swap is on the $100 plan. The paid plans state 0% transaction fees. The free plan's own list does not repeat that line.",
      },
      {
        q: "Can I move Appstle subscribers to AppFox?",
        a: "Yes, as a CSV import described in our docs. New contracts are created. Payment cards do not come across.",
      },
      {
        q: "Is this page biased?",
        a: "It is our page. Appstle's column is from public Appstle docs on 10 October 2026. We say they win on reviews, the badge, and support. Question marks are features those docs do not cover.",
      },
    ],
  },
  {
    slug: "seal-subscriptions",
    competitorId: S,
    h1: "Seal Subscriptions alternative",
    metaTitle: "Seal Subscriptions alternative | AppFox Subscriptions",
    metaDescription:
      "Seal Subscriptions alternative for Shopify: Seal is free for 50 subscriptions, then $5.95, with 0% fees and 3,139 reviews. AppFox is free for new installs with no subscriber cap. Compare the gaps.",
    summary:
      "Seal is free for 50 subscriptions and unlimited revenue, then $5.95, $9.95, or $24.95 a month, and every listed plan says 0% transaction fees. The free plan names product swaps, tiered discounts, translations, and a full API. Passwordless portal login is on the $5.95 plan. A custom cancel flow is on the $9.95 plan. The listing is 4.9 from 3,139 reviews, 18 languages, and a Built for Shopify badge, launched in 2020. AppFox does not cap subscribers and is free for new installs, with build-a-box and a custom email domain included, and with 1 review and 9 languages. If you want Seal's review base, the badge, or those 18 languages, stay with Seal.",
    whereTheyWin: [
      {
        title: "Reviews, the badge, and 18 languages",
        description:
          "4.9 from 3,139 reviews, a Built for Shopify badge, and 18 languages on the listing. AppFox has 1 review, no badge, and 9 languages.",
      },
      {
        title: "A full API on the free plan",
        description:
          "Seal names full API and webhooks on the free plan, inside the 50-subscription cap. AppFox also includes an API on the free install, so this is a tie on access and a win for Seal on how long the API has been in market.",
      },
      {
        title: "Passwordless portal and a cancel flow at low prices",
        description:
          "Passwordless login is on the $5.95 plan. A custom cancellation flow is on the $9.95 plan. AppFox uses Shopify customer accounts and does not have that cancel flow.",
      },
      {
        title: "A bill that stays flat as revenue grows",
        description:
          "Seal meters subscriber count, not revenue and not a percent of renewals. Bigger plans, up to 150,000 subscriptions, are on request. AppFox is $0 today, which is cheaper, and has almost no public track record.",
      },
    ],
    whatWeDont: [
      {
        title: "We do not have their languages or their badge",
        description:
          "Nine languages against eighteen, and no Built for Shopify badge. If the storefront has to be Arabic, Hebrew, Japanese, or Chinese, Seal's listing already names those and ours does not.",
      },
      {
        title: "No cancel flow at any price",
        description:
          "You can hide cancel or delay it for N orders. You cannot build Seal's cancellation flow.",
      },
      {
        title: "We have not confirmed a Seal import",
        description:
          "Our docs name Recharge and Appstle CSVs. The App Store listing says migration from Seal as well. We are not marking a Seal CSV as yes until the docs name it.",
      },
      {
        title: "Their free plan is capped. Ours is not. That cuts both ways.",
        description:
          "Fifty subscriptions is a real ceiling. No subscriber cap only matters if you trust a listing with one review.",
      },
    ],
    faq: [
      {
        q: "Is AppFox a Seal Subscriptions alternative on price?",
        a: "On the app bill, AppFox is cheaper: free for new installs, no 50-subscription cap, 0% of renewals. Seal is the better alternative if you want 3,139 reviews, the Built for Shopify badge, or 18 languages.",
      },
      {
        q: "Does Seal charge a transaction fee?",
        a: "Not on the plans published on the listing. Free, $5.95, $9.95, and $24.95 all say 0% transaction fee. The free plan stops at 50 subscriptions.",
      },
      {
        q: "What does Seal publish that AppFox does not?",
        a: "A cancel flow on the $9.95 plan, a magic link in subscription emails, 18 languages, and the Built for Shopify badge. Build-a-box and Omnisend are not in the Seal manual we read, so those cells stay as question marks.",
      },
      {
        q: "Is this comparison biased?",
        a: "It is written by AppFox. Seal's cells come from the public manual and help pages on 10 October 2026. The page says Seal wins on proof, languages, and the low-priced cancel flow.",
      },
    ],
  },
  {
    slug: "loop-subscriptions",
    competitorId: L,
    h1: "Loop Subscriptions alternative",
    metaTitle: "Loop Subscriptions alternative | AppFox Subscriptions",
    metaDescription:
      "Loop Subscriptions alternative for Shopify: Loop is free for 50 active subscriptions, then $99 plus 1%. AppFox is free for new installs with no cap, and without Loop's cancel flows.",
    summary:
      "Loop is free for 50 active subscriptions, with a mobile portal, customer alerts, and growth analytics on that plan. The $99 plan adds 1% and names fixed bundles, build-a-box, widget templates, a branded portal with upsells, dunning with 15 retries, and cancellation flows. The $399 plan adds 0.75%, a dedicated manager, 24×7 Slack, gamified journeys, prepaid, and APIs. The listing is 5.0 from 781 reviews. Klaviyo and Omnisend are both named. AppFox is free for new installs with no subscriber cap and 0% of renewals, and it does not have Loop's cancel-flow builder or a 15-retry control. If those retention tools are why you are shopping, Loop is the better fit.",
    whereTheyWin: [
      {
        title: "Cancel flows and 15 retries, on the $99 plan",
        description:
          "Personalized cancellation flows and smart dunning with 15 retries are $99 plan lines. AppFox retries failed cards on a schedule you cannot edit in the admin.",
      },
      {
        title: "Bundles and build-a-box on a published paid plan",
        description:
          "Fixed bundles and build-your-own are on the $99 plan, not the free plan. AppFox includes both on the free install. Loop still wins if you want those offers next to their cancel flows and a 781-review listing.",
      },
      {
        title: "Omnisend is named, and so is Klaviyo",
        description:
          "Loop's Works with line names both. AppFox documents both in the product docs. This one is a tie. Gorgias is on Loop's list and not on ours.",
      },
      {
        title: "A free plan you can read, then a clear step up",
        description:
          "Fifty active subscriptions, then $99 or $399. The free plan does not pretend to include bundles or cancel flows. That honesty is useful when you are pricing the upgrade.",
      },
    ],
    whatWeDont: [
      {
        title: "No gamified journeys",
        description:
          "The $399 plan names gamified subscriber journeys and rewards. Our rewards are a discount, gift, or free shipping after N paid cycles. There is no game layer.",
      },
      {
        title: "No 24×7 Slack",
        description:
          "Loop names that on the $399 plan, with a dedicated manager. Our docs say email support.",
      },
      {
        title: "Prepaid is in their help center, and the listing puts it on the $399 plan",
        description:
          "We do ship prepaid. Their help center describes paying up front for several deliveries. The App Store listing puts that on the $399 plan. We do not ship their prepaid-plus-gifts package or the admin API.",
      },
      {
        title: "We have not confirmed a Loop import file",
        description:
          "Our import docs name Recharge and Appstle. Loop is not named. Do not assume a Loop CSV drops in.",
      },
    ],
    faq: [
      {
        q: "Is AppFox a Loop Subscriptions alternative?",
        a: "For a free install with no 50-subscriber cap, a portal, Klaviyo, Omnisend, and build-a-box included, yes. It is not a Loop alternative if the cancel flows or the 15-retry dunning are the reason you would pay $99.",
      },
      {
        q: "What does Loop's free plan leave out?",
        a: "The free plan lists 50 active subscriptions, a mobile portal, customer alerts, and analytics. Bundles, the widget templates, dunning controls, and cancellation flows are on the $99 plan, which also adds a 1% fee.",
      },
      {
        q: "Does Loop take a cut of renewals?",
        a: "The $99 plan says 1% and 0¢. The $399 plan says 0.75% and 0¢. The free plan's feature list does not mention a fee.",
      },
      {
        q: "Is this page biased?",
        a: "Yes. Loop's column is the public help center on 10 October 2026. We say they win on cancel flows, dunning controls, and a clearer paid ladder. Cells we could not confirm are question marks.",
      },
    ],
  },
  {
    slug: "skio",
    competitorId: K,
    h1: "Skio alternative",
    metaTitle: "Skio alternative | AppFox Subscriptions",
    metaDescription:
      "Skio alternative for Shopify: Skio is $599 a month plus 1% and 20¢, with a cancel-flow builder and build-a-box. AppFox Subscriptions is free for new installs and does not have that cancel flow.",
    summary:
      "Skio's listing is titled Skio, a Recharge company. The public plan is $599 a month, or $5,988 a year, plus 1% and 20¢. That plan names a no-code portal, passwordless login, a multi-step cancel flow, static and dynamic build-a-box, automated journeys, analytics, payment recovery, and zero-downtime migration. There is no free plan and no trial on the listing. The rating is 5.0 from 243 reviews, in English, launched in 2021. AppFox is free for new installs with 0% of renewals, build-a-box included, and no cancel-flow builder. If the cancel flow and the 243 reviews are worth $599 before fees, Skio is the better fit.",
    whereTheyWin: [
      {
        title: "The cancel-flow builder is on the only plan",
        description:
          "You do not hunt through tiers for it. Multi-step cancel flows, passwordless login, and build-a-box are all on the $599 plan. AppFox has build-a-box and does not have the cancel flow.",
      },
      {
        title: "243 reviews against our 1",
        description:
          "5.0 from 243 reviews is not Recharge's 3,132, and it is a different conversation from a listing with one review.",
      },
      {
        title: "Migration is a plan line, not a footnote",
        description:
          "Zero-downtime migration is named on the plan. Our docs describe a CSV, and they say cards do not move. We have not confirmed that Skio moves cards either.",
      },
      {
        title: "It sits next to Recharge",
        description:
          "The listing calls Skio a Recharge company. If you already run Recharge and want this portal and cancel flow, that relationship is public. It does not make the $599 plan cheaper.",
      },
    ],
    whatWeDont: [
      {
        title: "No cancel-flow builder at any price",
        description:
          "Subscribers can pause, cancel, swap, and reschedule when you turn those switches on. They do not walk through a multi-step save flow.",
      },
      {
        title: "We are not a $599 product with a CSM story",
        description:
          "The Skio reviews talk about a named manager. Our docs tell you to email support. Do not expect that operating model.",
      },
      {
        title: "Passwordless login is theirs",
        description:
          "Skio names it. AppFox uses the Shopify customer account. There is no separate magic link in our portal docs.",
      },
      {
        title: "We do not have their forecast or their support hours",
        description:
          "Skio's help center describes queued units by SKU and live chat on weekdays, 9am to 5pm ET. We do not publish an inventory forecast, and our docs point at email support.",
      },
    ],
    faq: [
      {
        q: "Is AppFox a Skio alternative?",
        a: "On price, yes: free for new installs versus $599 a month plus 1% and 20¢. On the cancel-flow builder, passwordless login, and 243 reviews, no. Use Skio when those are the requirement.",
      },
      {
        q: "Does Skio have a free plan?",
        a: "Not on the App Store listing checked 10 October 2026. The header price is $599 a month. Annual billing is $5,988, which the listing describes as 17% off.",
      },
      {
        q: "Skio is a Recharge company. Does that change this page?",
        a: "It is the name on the listing, so we repeat it. The plans are still separate listings, with separate prices. Recharge has its own page.",
      },
      {
        q: "Is this page biased?",
        a: "Yes. Skio's column is the public help center on 10 October 2026. We say they win on the cancel flow, passwordless login, and reviews. We do not fill gaps with guesses.",
      },
    ],
  },
];

export function getSubscriptionVs(slug: string): SubscriptionVsPage | undefined {
  return subscriptionVsPages.find((page) => page.slug === slug);
}

/** All vendors, or AppFox plus one competitor for a /vs page. */
export function vendorsForSubscription(competitorId?: string): CompareVendor[] {
  if (!competitorId) return subscriptionCompare.vendors;
  return subscriptionCompare.vendors.filter(
    (vendor) => vendor.highlight || vendor.id === competitorId,
  );
}

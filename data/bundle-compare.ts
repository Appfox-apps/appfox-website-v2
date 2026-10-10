/**
 * Multi-competitor comparison table — types plus the Product Bundles instance.
 *
 * Types (`CompareCell`, `CompareVendor`, `CompareRow`, `CompareSection`,
 * `CompareTable`) are product-agnostic so a Subscriptions table can reuse
 * them later. The `bundleCompare` export is the Product Bundles dataset.
 *
 * Competitor cells were checked against public listings in October 2026.
 * App Store category tags on competitor listings stay "Listed", not
 * independently verified product behavior. Install counts are omitted —
 * Shopify does not publish them.
 *
 * The AppFox column was checked against bundles-app-new main (08ad87e)
 * on 9 October 2026. POS remains unverified ("Not listed").
 *
 * In development / Planned cell kinds exist for a later public roadmap.
 * No Product Bundles roadmap statuses have been supplied, so AppFox gaps
 * are "no" / "Not listed" — never promised.
 */

export type CompareCellKind =
  | "yes"
  | "no"
  | "partial"
  | "via"
  | "text"
  | "in_development"
  | "planned";

export type CompareCell = {
  kind: CompareCellKind;
  /** Shown for text / via / partial, or as a caption on yes/no. */
  label?: string;
};

export type CompareVendor = {
  id: string;
  name: string;
  shortName: string;
  /** Tinted AppFox column. */
  highlight?: boolean;
  priceChip?: string;
  href?: string;
};

export type CompareRow = {
  id: string;
  feature: string;
  hint?: string;
  cells: Record<string, CompareCell>;
  /** When true, the row sits behind "More {section} features (N)". */
  more?: boolean;
};

export type CompareSection = {
  id: string;
  no: string;
  title: string;
  label: string;
  caption?: string;
  rows: CompareRow[];
};

export type CompareFaq = { q: string; a: string };
export type CompareSource = { label: string; url: string };

export type CompareTable = {
  product: string;
  checked: string;
  title: string;
  intro: string;
  vendors: CompareVendor[];
  sections: CompareSection[];
  roadmap: {
    inDevelopment: string;
    planned: string;
    note: string;
  };
  faq: CompareFaq[];
  sources: CompareSource[];
};

const yes: CompareCell = { kind: "yes" };
const no: CompareCell = { kind: "no" };
const absent: CompareCell = { kind: "no", label: "Not listed" };
const listed: CompareCell = { kind: "partial", label: "Listed" };
const text = (label: string): CompareCell => ({ kind: "text", label });
const partial = (label: string): CompareCell => ({ kind: "partial", label });
const via = (label: string): CompareCell => ({ kind: "via", label });

const V = {
  appfox: "appfox",
  kaching: "kaching",
  fast: "fast-bundle",
  bundler: "bundler",
  simple: "simple-bundles",
  shopify: "shopify-bundles",
} as const;

function row(
  id: string,
  feature: string,
  cells: Record<string, CompareCell>,
  extra?: { hint?: string; more?: boolean },
): CompareRow {
  return { id, feature, cells, ...extra };
}

export const bundleCompare: CompareTable = {
  product: "product-bundles",
  checked: "9 October 2026",
  title: "AppFox vs Kaching, Fast Bundle, Bundler, Simple Bundles & Shopify Bundles",
  intro:
    "This is a vendor page. AppFox Product Bundles is free to install and ships volume discounts, fixed bundles, mix-and-match, BOGO, frequently bought together, free gifts, checkbox add-ons, A/B tests, scheduled countdown offers, and seven built-in storefront languages — with 5.0 from 4 reviews and no Built for Shopify badge. Kaching, Fast Bundle, Bundler, and Simple Bundles have hundreds to thousands of reviews, POS or kitting we do not claim, and (except Bundler's flat tiers) a bill that often meters additional revenue. Shopify Bundles is the free first-party app for fixed kits only. The AppFox column was checked against the product on 9 October 2026; competitor cells we could not verify from a public listing stay Listed or Not listed. Wide Bundles and Rebolt are on the one-to-one /vs pages; they are not in this table.",
  vendors: [
    {
      id: V.appfox,
      name: "AppFox Product Bundles",
      shortName: "AppFox",
      highlight: true,
      priceChip: "Free",
      href: "/product-bundles",
    },
    {
      id: V.kaching,
      name: "Kaching Bundles App & Upsells",
      shortName: "Kaching",
      priceChip: "From $14.99/mo",
      href: "/vs/kaching-bundles",
    },
    {
      id: V.fast,
      name: "FBP | Fast Bundle & Upsell App",
      shortName: "Fast Bundle",
      priceChip: "From $19/mo",
      href: "/vs/fast-bundle",
    },
    {
      id: V.bundler,
      name: "Bundler » Product Bundles App",
      shortName: "Bundler",
      priceChip: "Free, then $9.99",
      href: "/vs/bundler",
    },
    {
      id: V.simple,
      name: "Simple Bundles & Kits",
      shortName: "Simple Bundles",
      priceChip: "Free (capped)",
      href: "/vs/simple-bundles",
    },
    {
      id: V.shopify,
      name: "Shopify Bundles",
      shortName: "Shopify Bundles",
      priceChip: "Free",
      href: "/vs/shopify-bundles",
    },
  ],
  roadmap: {
    inDevelopment:
      "We are building it now. It is not ready to install, and we will not mark a cell this way until that work is public.",
    planned:
      "It is on a public list with no ship date. A Planned cell is a promise of intent, not a feature you can use today.",
    note: "No Product Bundles roadmap statuses have been published. Missing AppFox rows in this table are no or Not listed — not In development or Planned.",
  },
  sections: [
    {
      id: "at-a-glance",
      no: "00",
      title: "At a glance",
      label: "AT A GLANCE",
      caption: "Price, proof, and the offer types most stores actually run.",
      rows: [
        row("price", "Price (live stores)", {
          [V.appfox]: text("Free to install"),
          [V.kaching]: text("From $14.99/mo"),
          [V.fast]: text("From $19/mo"),
          [V.bundler]: text("Free, then $9.99 / $19.99"),
          [V.simple]: text("Free (capped), then $14+"),
          [V.shopify]: text("Free"),
        }),
        row("pricing-model", "Pricing model", {
          [V.appfox]: text("No paid plans listed"),
          [V.kaching]: text("Additional-revenue tiers"),
          [V.fast]: text("Monthly bundle-sales tiers"),
          [V.bundler]: text("Flat monthly plans"),
          [V.simple]: text("Bundle & order-volume tiers"),
          [V.shopify]: text("First-party, no app bill"),
        }),
        row("rating", "Shopify App Store rating", {
          [V.appfox]: text("5.0 · 4 reviews"),
          [V.kaching]: text("5.0 · 6,243 reviews"),
          [V.fast]: text("5.0 · 3,533 reviews"),
          [V.bundler]: text("4.9 · 2,719 reviews"),
          [V.simple]: text("4.9 · 804 reviews"),
          [V.shopify]: text("2.9 · 568 reviews"),
        }),
        row("bfs", "Built for Shopify badge", {
          [V.appfox]: no,
          [V.kaching]: yes,
          [V.fast]: absent,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: via("First-party app"),
        }),
        row("mix-match", "Mix & match / build-a-box", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("From $9.99/mo"),
          [V.simple]: yes,
          [V.shopify]: no,
        }),
        row("volume", "Volume discounts & quantity breaks", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("On free plan"),
          [V.simple]: yes,
          [V.shopify]: no,
        }),
        row("bogo", "BOGO / Buy X Get Y", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("On free plan"),
          [V.simple]: yes,
          [V.shopify]: no,
        }),
        row("pos", "Shopify POS", {
          [V.appfox]: absent,
          [V.kaching]: yes,
          [V.fast]: partial("Enterprise on their pricing page"),
          [V.bundler]: partial("On free plan"),
          [V.simple]: partial("Paid plans"),
          [V.shopify]: yes,
        }),
        row(
          "free-live",
          "Free plan for live stores",
          {
            [V.appfox]: yes,
            [V.kaching]: partial("Dev stores only"),
            [V.fast]: partial("Dev / eligible, up to $500/mo"),
            [V.bundler]: yes,
            [V.simple]: partial("3 bundles, 50 orders/mo"),
            [V.shopify]: yes,
          },
          { more: true },
        ),
        row(
          "languages",
          "Storefront languages",
          {
            [V.appfox]: text(
              "7 built-in (EN, DE, ES, FR, IT, NL, PT-BR) + any Shopify locale via Translations",
            ),
            [V.kaching]: text("9 languages"),
            [V.fast]: text("10 languages"),
            [V.bundler]: text("17 languages"),
            [V.simple]: text("EN, FR, JA"),
            [V.shopify]: via("Shopify admin languages"),
          },
          { more: true },
        ),
        row(
          "first-party",
          "First-party Shopify admin app",
          {
            [V.appfox]: no,
            [V.kaching]: no,
            [V.fast]: no,
            [V.bundler]: no,
            [V.simple]: no,
            [V.shopify]: yes,
          },
          { more: true },
        ),
        row(
          "analytics-glance",
          "Bundle analytics",
          {
            [V.appfox]: yes,
            [V.kaching]: yes,
            [V.fast]: yes,
            [V.bundler]: partial("From $19.99/mo"),
            [V.simple]: listed,
            [V.shopify]: partial("Sales, orders, top bundles"),
          },
          { more: true },
        ),
      ],
    },
    {
      id: "offer-types",
      no: "01",
      title: "Offer types",
      label: "OFFER TYPES",
      caption: "What you can actually sell, not the category tags.",
      rows: [
        row("fixed", "Fixed / classic bundles", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: listed,
          [V.simple]: yes,
          [V.shopify]: yes,
        }),
        row("mm-offers", "Mix & match / build-a-box", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("From $9.99/mo"),
          [V.simple]: yes,
          [V.shopify]: no,
        }),
        row("qb-offers", "Volume discounts & quantity breaks", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("On free plan"),
          [V.simple]: yes,
          [V.shopify]: no,
        }),
        row("bogo-offers", "BOGO / Buy X Get Y", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("On free plan"),
          [V.simple]: yes,
          [V.shopify]: no,
        }),
        row("fbt", "Frequently bought together", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: partial("AI FBT on paid plans"),
          [V.bundler]: absent,
          [V.simple]: absent,
          [V.shopify]: no,
        }),
        row("combo-sku", "Bundle as a product (combo SKU)", {
          [V.appfox]: no,
          [V.kaching]: listed,
          [V.fast]: yes,
          [V.bundler]: absent,
          [V.simple]: via("Kit product pages"),
          [V.shopify]: yes,
        }),
        row("gifts", "Free gifts", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: listed,
          [V.bundler]: listed,
          [V.simple]: listed,
          [V.shopify]: no,
        }),
        row(
          "addons",
          "Product add-ons",
          {
            [V.appfox]: { kind: "yes", label: "Checkbox add-ons, optional discount" },
            [V.kaching]: listed,
            [V.fast]: yes,
            [V.bundler]: listed,
            [V.simple]: absent,
            [V.shopify]: no,
          },
          { more: true },
        ),
        row(
          "multipacks",
          "Multipacks",
          {
            [V.appfox]: { kind: "yes", label: "Quantity breaks on one product" },
            [V.kaching]: listed,
            [V.fast]: listed,
            [V.bundler]: listed,
            [V.simple]: listed,
            [V.shopify]: yes,
          },
          { more: true },
        ),
        row(
          "sub-boxes",
          "Subscription boxes in the bundle",
          {
            [V.appfox]: absent,
            [V.kaching]: listed,
            [V.fast]: partial("Standard+ connectors"),
            [V.bundler]: listed,
            [V.simple]: absent,
            [V.shopify]: no,
          },
          { more: true },
        ),
        row(
          "ai-suggest",
          "AI bundle suggestions",
          {
            [V.appfox]: no,
            [V.kaching]: absent,
            [V.fast]: partial("AI FBT, paid"),
            [V.bundler]: absent,
            [V.simple]: partial("On free plan"),
            [V.shopify]: no,
          },
          { more: true },
        ),
      ],
    },
    {
      id: "discount-logic",
      no: "02",
      title: "Discount logic",
      label: "DISCOUNT LOGIC",
      caption: "How the saving is calculated and where it applies.",
      rows: [
        row("pct", "Percentage-off discounts", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: via("Fixed bundle price"),
        }),
        row("fixed-amt", "Fixed-amount discounts", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: listed,
          [V.simple]: listed,
          [V.shopify]: via("Fixed bundle price"),
        }),
        row("tiered", "Tiered / quantity-break pricing", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: no,
        }),
        row("auto-discount", "Automatic checkout discounts", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("On free plan"),
          [V.simple]: listed,
          [V.shopify]: via("Bundle product price"),
        }),
        row("follows-component", "Bundle price follows component prices", {
          [V.appfox]: via("Discount rules"),
          [V.kaching]: listed,
          [V.fast]: listed,
          [V.bundler]: listed,
          [V.simple]: listed,
          [V.shopify]: text("Manual update required"),
        }),
        row(
          "stack-codes",
          "Stacks with Shopify discount codes",
          {
            [V.appfox]: {
              kind: "yes",
              label: "Per bundle: combines with order / product / shipping discounts",
            },
            [V.kaching]: listed,
            [V.fast]: listed,
            [V.bundler]: listed,
            [V.simple]: listed,
            [V.shopify]: listed,
          },
          { more: true },
        ),
        row(
          "meter-pause",
          "Offers pause if a revenue cap is hit",
          {
            [V.appfox]: no,
            [V.kaching]: yes,
            [V.fast]: listed,
            [V.bundler]: no,
            [V.simple]: via("Order-volume plan limits"),
            [V.shopify]: no,
          },
          {
            more: true,
            hint: "Kaching's help center says hitting the additional-revenue limit pauses bundles until upgrade or reset.",
          },
        ),
      ],
    },
    {
      id: "widgets",
      no: "03",
      title: "Widgets",
      label: "WIDGETS",
      caption: "What the shopper sees on the product page.",
      rows: [
        row("app-blocks", "Shopify 2.0 theme app blocks", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: listed,
          [V.shopify]: via("Native product page"),
        }),
        row("theme-inherit", "Theme-inherited styling", {
          [V.appfox]: yes,
          [V.kaching]: partial("Layouts + custom CSS/HTML"),
          [V.fast]: listed,
          [V.bundler]: listed,
          [V.simple]: listed,
          [V.shopify]: via("Theme product template"),
        }),
        row("layouts", "Multiple layouts / design studio", {
          [V.appfox]: {
            kind: "yes",
            label: "4 layouts, 3 badge styles, brand presets, saved templates",
          },
          [V.kaching]: yes,
          [V.fast]: listed,
          [V.bundler]: listed,
          [V.simple]: listed,
          [V.shopify]: no,
        }),
        row("progress", "Progress bars", {
          [V.appfox]: partial("Step indicator on Build-a-Box page"),
          [V.kaching]: yes,
          [V.fast]: listed,
          [V.bundler]: listed,
          [V.simple]: absent,
          [V.shopify]: no,
        }),
        row(
          "custom-css",
          "Custom CSS / HTML",
          {
            [V.appfox]: partial("Custom CSS (no HTML)"),
            [V.kaching]: yes,
            [V.fast]: listed,
            [V.bundler]: listed,
            [V.simple]: absent,
            [V.shopify]: no,
          },
          { more: true },
        ),
        row(
          "landing",
          "Custom landing pages",
          {
            [V.appfox]: partial("Hosted Build-a-Box page (mix & match)"),
            [V.kaching]: listed,
            [V.fast]: listed,
            [V.bundler]: partial("From $9.99/mo"),
            [V.simple]: via("Standalone kit pages"),
            [V.shopify]: via("Bundle product URL"),
          },
          { more: true },
        ),
        row(
          "page-builders",
          "Page-builder / cart-drawer connectors",
          {
            [V.appfox]: no,
            [V.kaching]: listed,
            [V.fast]: partial("PageFly, GemPages, UpCart"),
            [V.bundler]: listed,
            [V.simple]: listed,
            [V.shopify]: no,
          },
          { more: true },
        ),
      ],
    },
    {
      id: "cart-checkout",
      no: "04",
      title: "Cart & checkout",
      label: "CART & CHECKOUT",
      caption: "Where the offer can appear after the product page.",
      rows: [
        row("pdp", "Product-page offer", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: yes,
        }),
        row("cart", "Cart / cart-drawer offer", {
          [V.appfox]: yes,
          [V.kaching]: listed,
          [V.fast]: listed,
          [V.bundler]: listed,
          [V.simple]: listed,
          [V.shopify]: via("Cart line of the bundle product"),
        }),
        row("checkout", "Checkout upsells", {
          [V.appfox]: no,
          [V.kaching]: listed,
          [V.fast]: listed,
          [V.bundler]: listed,
          [V.simple]: absent,
          [V.shopify]: no,
        }),
        row("post-purchase", "Post-purchase / thank-you upsells", {
          [V.appfox]: no,
          [V.kaching]: listed,
          [V.fast]: listed,
          [V.bundler]: partial("Funnel upsells, paid"),
          [V.simple]: absent,
          [V.shopify]: no,
        }),
        row(
          "channels",
          "Shop app / headless channels",
          {
            [V.appfox]: no,
            [V.kaching]: absent,
            [V.fast]: absent,
            [V.bundler]: absent,
            [V.simple]: partial("Hydrogen on Plus"),
            [V.shopify]: yes,
          },
          { more: true },
        ),
        row(
          "complete-bundle",
          "Complete-the-bundle cart upsell",
          {
            [V.appfox]: partial("Cart upsell banner"),
            [V.kaching]: listed,
            [V.fast]: listed,
            [V.bundler]: listed,
            [V.simple]: absent,
            [V.shopify]: no,
          },
          { more: true },
        ),
      ],
    },
    {
      id: "merchandising",
      no: "05",
      title: "Merchandising",
      label: "MERCHANDISING",
      caption: "Recommendations, gifts, and campaign chrome.",
      rows: [
        row("ai-fbt", "AI / frequently-bought-together", {
          [V.appfox]: partial("Manual, collection or Shopify recommendations"),
          [V.kaching]: yes,
          [V.fast]: partial("AI FBT on paid plans"),
          [V.bundler]: absent,
          [V.simple]: partial("AI suggestions on free plan"),
          [V.shopify]: no,
        }),
        row("merch-gifts", "Free gifts / gift wrap", {
          [V.appfox]: { kind: "yes", label: "Gifts; wrap via checkbox add-on" },
          [V.kaching]: yes,
          [V.fast]: listed,
          [V.bundler]: listed,
          [V.simple]: listed,
          [V.shopify]: no,
        }),
        row("countdown", "Countdown / time-limited offers", {
          [V.appfox]: { kind: "yes", label: "Start/end schedule + countdown timer" },
          [V.kaching]: listed,
          [V.fast]: listed,
          [V.bundler]: listed,
          [V.simple]: absent,
          [V.shopify]: no,
        }),
        row("spend-meter", "Spend / progress meters", {
          [V.appfox]: no,
          [V.kaching]: yes,
          [V.fast]: listed,
          [V.bundler]: listed,
          [V.simple]: absent,
          [V.shopify]: no,
        }),
        row(
          "gift-wrap",
          "Gift wrap add-on",
          {
            [V.appfox]: via("Checkbox add-on"),
            [V.kaching]: yes,
            [V.fast]: absent,
            [V.bundler]: absent,
            [V.simple]: absent,
            [V.shopify]: no,
          },
          { more: true },
        ),
      ],
    },
    {
      id: "analytics",
      no: "06",
      title: "Analytics & tests",
      label: "ANALYTICS & TESTS",
      caption: "What you can measure after the offer is live.",
      rows: [
        row("dashboard", "Bundle analytics dashboard", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("From $19.99/mo"),
          [V.simple]: listed,
          [V.shopify]: partial("In Bundles app + Analytics"),
        }),
        row("ab", "A/B testing", {
          [V.appfox]: { kind: "yes", label: "Weighted variants, pick a winner" },
          [V.kaching]: yes,
          [V.fast]: listed,
          [V.bundler]: absent,
          [V.simple]: absent,
          [V.shopify]: no,
        }),
        row("aov", "Revenue / AOV reports", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("From $19.99/mo"),
          [V.simple]: listed,
          [V.shopify]: partial("Sales, orders, top bundles"),
        }),
      ],
    },
    {
      id: "localization",
      no: "07",
      title: "Localization",
      label: "LOCALIZATION",
      caption: "Built-in languages and Shopify locale fallback.",
      rows: [
        row("lang-count", "Storefront languages", {
          [V.appfox]: text(
            "7 built-in (EN, DE, ES, FR, IT, NL, PT-BR) + any Shopify locale via Translations",
          ),
          [V.kaching]: text("9 languages"),
          [V.fast]: text("10 languages"),
          [V.bundler]: text("17 languages"),
          [V.simple]: text("English, French, Japanese"),
          [V.shopify]: via("Shopify admin languages"),
        }),
        row("english", "English storefront", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: yes,
        }),
        row("multi-currency", "Multi-currency", {
          [V.appfox]: { kind: "yes", label: "Shopper's currency, live market prices" },
          [V.kaching]: yes,
          [V.fast]: listed,
          [V.bundler]: listed,
          [V.simple]: listed,
          [V.shopify]: via("Shopify Markets"),
        }),
      ],
    },
    {
      id: "pos-ops",
      no: "08",
      title: "POS & operations",
      label: "POS & OPERATIONS",
      caption: "In-store, warehouse, and automation — where AppFox is thin.",
      rows: [
        row("pos-ops", "Shopify POS", {
          [V.appfox]: absent,
          [V.kaching]: yes,
          [V.fast]: partial("Enterprise on their pricing page"),
          [V.bundler]: partial("On free plan"),
          [V.simple]: partial("Paid plans"),
          [V.shopify]: yes,
        }),
        row("kitting", "Component SKU / kitting for fulfillment", {
          [V.appfox]: no,
          [V.kaching]: absent,
          [V.fast]: via("Bundle-as-product"),
          [V.bundler]: absent,
          [V.simple]: yes,
          [V.shopify]: yes,
        }),
        row("3pl", "3PL / WMS / ERP inventory sync", {
          [V.appfox]: no,
          [V.kaching]: absent,
          [V.fast]: absent,
          [V.bundler]: absent,
          [V.simple]: yes,
          [V.shopify]: via("Shopify inventory"),
        }),
        row("flow", "Shopify Flow", {
          [V.appfox]: no,
          [V.kaching]: listed,
          [V.fast]: listed,
          [V.bundler]: listed,
          [V.simple]: partial("Grow & Advanced+"),
          [V.shopify]: via("Shopify admin"),
        }),
        row(
          "hydrogen",
          "Hydrogen / headless",
          {
            [V.appfox]: no,
            [V.kaching]: absent,
            [V.fast]: absent,
            [V.bundler]: absent,
            [V.simple]: partial("Plus plan"),
            [V.shopify]: yes,
          },
          { more: true },
        ),
        row(
          "sub-apps",
          "Subscription-app integrations",
          {
            [V.appfox]: no,
            [V.kaching]: listed,
            [V.fast]: partial("Standard+"),
            [V.bundler]: listed,
            [V.simple]: absent,
            [V.shopify]: no,
          },
          { more: true },
        ),
        row(
          "works-checkout",
          "Works with Checkout (listing)",
          {
            [V.appfox]: yes,
            [V.kaching]: listed,
            [V.fast]: listed,
            [V.bundler]: listed,
            [V.simple]: listed,
            [V.shopify]: yes,
          },
          { more: true },
        ),
        row(
          "works-admin",
          "Works with Shopify Admin (listing)",
          {
            [V.appfox]: yes,
            [V.kaching]: listed,
            [V.fast]: listed,
            [V.bundler]: listed,
            [V.simple]: listed,
            [V.shopify]: yes,
          },
          { more: true },
        ),
      ],
    },
    {
      id: "pricing-support",
      no: "09",
      title: "Pricing & support",
      label: "PRICING & SUPPORT",
      caption: "What you pay, and who answers when it breaks.",
      rows: [
        row("start-price", "Starting price (live stores)", {
          [V.appfox]: text("Free"),
          [V.kaching]: text("$14.99/mo"),
          [V.fast]: text("$19/mo"),
          [V.bundler]: text("$0, mix-and-match $9.99"),
          [V.simple]: text("$0 capped, then $14/mo"),
          [V.shopify]: text("Free"),
        }),
        row("meter", "Usage / revenue meter", {
          [V.appfox]: no,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: no,
          [V.simple]: partial("Bundles & orders on free"),
          [V.shopify]: no,
        }),
        row("support", "Support channel", {
          [V.appfox]: text("In-app live chat + email"),
          [V.kaching]: text("Live chat + email"),
          [V.fast]: listed,
          [V.bundler]: listed,
          [V.simple]: listed,
          [V.shopify]: via("Shopify Help Center"),
        }),
        row("bfs-support", "Built for Shopify badge", {
          [V.appfox]: no,
          [V.kaching]: yes,
          [V.fast]: absent,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: via("First-party"),
        }),
        row(
          "live-chat",
          "Live chat support",
          {
            [V.appfox]: yes,
            [V.kaching]: yes,
            [V.fast]: listed,
            [V.bundler]: listed,
            [V.simple]: listed,
            [V.shopify]: via("Shopify support"),
          },
          { more: true },
        ),
        row(
          "custom-tier",
          "Custom-development tier",
          {
            [V.appfox]: no,
            [V.kaching]: via("Higher Flex Billing tiers"),
            [V.fast]: via("Enterprise"),
            [V.bundler]: no,
            [V.simple]: via("$149 Plus"),
            [V.shopify]: no,
          },
          { more: true },
        ),
        row(
          "tenure",
          "App Store launch (listing)",
          {
            [V.appfox]: text("January 2025"),
            [V.kaching]: listed,
            [V.fast]: listed,
            [V.bundler]: text("July 2019"),
            [V.simple]: listed,
            [V.shopify]: via("Shopify-built"),
          },
          { more: true },
        ),
      ],
    },
  ],
  faq: [
    {
      q: "You make AppFox. Why should I trust this table?",
      a: "You shouldn't take our word alone. The AppFox column was checked against the product on 9 October 2026 (bundles-app-new main, 08ad87e). Competitor cells are from public App Store listings, help centers, or vendor pricing pages, checked in October 2026. Where a competitor listing only tags a category, we write Listed — not yes. POS on AppFox stays Not listed because we have not verified it. Sources are linked at the bottom. We also say, in plain language, when a competitor is the better fit.",
    },
    {
      q: "AppFox has four reviews. Is that a real risk?",
      a: "Yes. Kaching has 6,243 reviews, Fast Bundle 3,533, Bundler 2,719. Four reviews and no Built for Shopify badge is a fair reason to pick someone else, especially on a Plus store that has to justify the install. Price and the verified feature set are the AppFox case, not tenure.",
    },
    {
      q: "When is each competitor the better choice?",
      a: "Shopify Bundles — a fixed kit or multipack with component inventory and zero third-party apps. Simple Bundles — kitting, 3PL, packing slips, POS, Flow. Kaching — POS, spend meters, and 6,000+ reviews. Fast Bundle — AI frequently-bought-together and bundle-as-product. Bundler — volume discounts and POS on a genuinely useful free plan, or mix-and-match at a flat $9.99. AppFox — the same core offer types plus FBT, gifts, add-ons, A/B tests, seven built-in languages, and live chat, on a free install, if a younger review base is acceptable.",
    },
    {
      q: "Does AppFox have POS, 3PL, or AI recommendations?",
      a: "POS is still Not listed — we have not verified it in the product. 3PL / WMS and component kitting are no. There is no AI bundle-suggester; frequently bought together is manual, from a collection, or from Shopify recommendations. If POS, warehouse kits, or an AI recommender is the job, this table should send you to Simple Bundles, Shopify Bundles, Kaching, or Fast Bundle — not us.",
    },
    {
      q: "How was the AppFox column checked?",
      a: "AppFox column checked against the product on 9 October 2026. Competitor columns were not re-checked against their source code; those cells still follow public listings, with Listed or Not listed where we could not verify behavior.",
    },
    {
      q: "Can I run Shopify Bundles and AppFox together?",
      a: "Often. Shopify Bundles can own the kit SKU in the admin; AppFox can own the promotional widget on the product page. Confirm discount stacking on a development theme before you run both on production.",
    },
    {
      q: "Why aren’t Wide Bundles and Rebolt in the table?",
      a: "Five competitor columns already fill a desktop row. Wide Bundles (design options, additional-revenue meter) and Rebolt (free to $300 revenue, then $19.99, with checkout and thank-you upsells) have one-to-one pages at /vs/wide-bundles and /vs/rebolt. The same research rules apply there.",
    },
    {
      q: "Do you mark missing features as In development?",
      a: "Not unless we have published that status. In development and Planned are defined above so the vocabulary is stable. Right now AppFox Product Bundles has no public roadmap statuses, so gaps stay no or Not listed. If a row you need is missing, email support and ask us to check it.",
    },
  ],
  sources: [
    { label: "AppFox Product Bundles App Store listing", url: "https://apps.shopify.com/trust-bundles" },
    { label: "Kaching Bundles App Store listing", url: "https://apps.shopify.com/bundle-deals" },
    {
      label: "Kaching Flex Billing help article",
      url: "https://support.kachingappz.com/en/articles/12290748-understanding-flex-billing-performance-based-pricing",
    },
    { label: "Fast Bundle App Store listing", url: "https://apps.shopify.com/fast-bundle-product-bundles" },
    { label: "Fast Bundle pricing page", url: "https://fastbundle.co/pricing/" },
    { label: "Bundler App Store listing", url: "https://apps.shopify.com/bundler-product-bundles" },
    { label: "Simple Bundles & Kits App Store listing", url: "https://apps.shopify.com/simple-bundles" },
    { label: "Shopify Bundles App Store listing", url: "https://apps.shopify.com/shopify-bundles" },
    {
      label: "Shopify Help Center: Shopify Bundles",
      url: "https://help.shopify.com/en/manual/products/bundles/shopify-bundles",
    },
  ],
};

export function primaryRows(section: CompareSection): CompareRow[] {
  return section.rows.filter((r) => !r.more);
}

export function moreRows(section: CompareSection): CompareRow[] {
  return section.rows.filter((r) => r.more);
}

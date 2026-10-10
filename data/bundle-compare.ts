/**
 * Multi-competitor comparison table — types plus the Product Bundles instance.
 *
 * Types (`CompareCell`, `CompareVendor`, `CompareRow`, `CompareSection`,
 * `CompareTable`) are product-agnostic so a Subscriptions table can reuse
 * them later. The `bundleCompare` export is the Product Bundles dataset.
 *
 * Competitor cells were checked against public listings in October 2026.
 * If the App Store shows a feature for a competitor, the cell is yes.
 * If we could not confirm a competitor fact from public docs, the cell
 * is unclear (?). Install counts are omitted — Shopify does not publish
 * them.
 *
 * The AppFox column was checked against bundles-app-new main (08ad87e)
 * on 9 October 2026. POS is still unclear. Missing AppFox features are
 * a dash — never promised.
 *
 * In development / Planned cell kinds exist for a later public roadmap.
 * No Product Bundles roadmap statuses have been supplied.
 */

export type CompareCellKind =
  | "yes"
  | "no"
  | "partial"
  | "via"
  | "text"
  | "unclear"
  | "in_development"
  | "planned";

export type CompareCell = {
  kind: CompareCellKind;
  /** Shown for text / via / partial, or as a caption on yes/no. */
  label?: string;
  /**
   * Footnote id, rendered as a superscript. Omitted on Product Bundles
   * cells, so that table's output does not change.
   */
  note?: string;
};

export type CompareVendor = {
  id: string;
  name: string;
  shortName: string;
  /** `/vs/<slug>` for competitor columns. */
  slug?: string;
  /** Tinted AppFox column. */
  highlight?: boolean;
  priceChip?: string;
  href?: string;
  /** When false, the vendor is on one-to-one pages only, not the hub table. */
  inHub?: boolean;
  /**
   * Per-column check sentence, e.g. "Checked against the product on 10 Oct 2026".
   * Omitted on Product Bundles vendors.
   */
  checked?: string;
};

/** Per-competitor alternative page — same table cells, unique SEO + summary. */
export type BundleAlternative = {
  slug: string;
  vendorId: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  summary: string;
  betterFit: string;
  gaps: string;
  whoShouldSwitch: string;
  faq: CompareFaq[];
  sources: CompareSource[];
};

export type CompareRow = {
  id: string;
  feature: string;
  hint?: string;
  cells: Record<string, CompareCell>;
  /** Grouping hint from research notes. All rows render in the table. */
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
  /** Short hero line — same role as a /vs tagline. */
  tagline: string;
  intro: string;
  bestFor: string;
  vendors: CompareVendor[];
  sections: CompareSection[];
  roadmap: {
    inDevelopment: string;
    planned: string;
    note: string;
  };
  faq: CompareFaq[];
  sources: CompareSource[];
  /** Optional. Product Bundles does not set this. */
  footnotes?: { id: string; text: string }[];
};

/** Tooltip / footnote for unclear competitor (and unverified AppFox) cells. */
export const UNCLEAR_NOTE = "We couldn't confirm this from their public docs.";

const yes: CompareCell = { kind: "yes" };
const no: CompareCell = { kind: "no" };
const unclear: CompareCell = { kind: "unclear" };
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
  wide: "wide-bundles",
  rebolt: "rebolt",
} as const;

function row(
  id: string,
  feature: string,
  cells: Record<string, CompareCell>,
  extra?: { hint?: string; more?: boolean },
): CompareRow {
  return {
    id,
    feature,
    cells: {
      [V.wide]: unclear,
      [V.rebolt]: unclear,
      ...cells,
    },
    ...extra,
  };
}

export const bundleCompare: CompareTable = {
  product: "product-bundles",
  checked: "9 October 2026",
  title: "AppFox vs Kaching, Fast Bundle, Bundler, Simple Bundles & Shopify Bundles",
  tagline:
    "Six Shopify bundle apps in one table — price, offer types, and where AppFox is thin.",
  bestFor:
    "Stores that want volume discounts, mix-and-match, BOGO, frequently bought together, and gifts on a free install — and can live with four reviews and no verified POS.",
  intro:
    "AppFox Product Bundles is free: volume discounts, fixed bundles, mix-and-match, BOGO, frequently bought together, free gifts, add-ons, A/B tests, countdown offers, and seven storefront languages. 5.0 from 4 reviews, no Built for Shopify badge. Kaching, Fast Bundle, Bundler, and Simple Bundles have hundreds to thousands of reviews, plus POS or warehouse kits we do not have. Most of them charge more as bundle sales grow. Shopify Bundles is the free first-party app for fixed kits only. We checked the AppFox column against the product on 9 October 2026. A ? means we could not confirm that cell from public docs. Wide Bundles and Rebolt have their own /vs pages — same table data, two columns.",
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
      slug: "kaching-bundles",
      priceChip: "From $14.99/mo",
      href: "/vs/kaching-bundles",
    },
    {
      id: V.fast,
      name: "FBP | Fast Bundle & Upsell App",
      shortName: "Fast Bundle",
      slug: "fast-bundle",
      priceChip: "From $19/mo",
      href: "/vs/fast-bundle",
    },
    {
      id: V.bundler,
      name: "Bundler » Product Bundles App",
      shortName: "Bundler",
      slug: "bundler",
      priceChip: "Free, then $9.99",
      href: "/vs/bundler",
    },
    {
      id: V.simple,
      name: "Simple Bundles & Kits",
      shortName: "Simple Bundles",
      slug: "simple-bundles",
      priceChip: "Free, then $14",
      href: "/vs/simple-bundles",
    },
    {
      id: V.shopify,
      name: "Shopify Bundles",
      shortName: "Shopify Bundles",
      slug: "shopify-bundles",
      priceChip: "Free",
      href: "/vs/shopify-bundles",
    },
    {
      id: V.wide,
      name: "Wide Bundles ‑ Quantity Breaks",
      shortName: "Wide Bundles",
      slug: "wide-bundles",
      priceChip: "From $14.99/mo",
      href: "/vs/wide-bundles",
      inHub: false,
    },
    {
      id: V.rebolt,
      name: "Rebolt Upsell & Bundles App",
      shortName: "Rebolt",
      slug: "rebolt",
      priceChip: "Free to $300",
      href: "/vs/rebolt",
      inHub: false,
    },
  ],
  roadmap: {
    inDevelopment:
      "We are building it now. It is not ready to install, and we will not mark a cell this way until that work is public.",
    planned:
      "It is on a public list with no ship date. Planned means we intend to build it — not that you can use it today.",
    note: "We have not published a Product Bundles roadmap. Missing rows are a dash or a ?, not In development or Planned.",
  },
  sections: [
    {
      id: "at-a-glance",
      no: "00",
      title: "At a glance",
      label: "AT A GLANCE",
      caption: "Price, reviews, and the offers most stores run.",
      rows: [
        row("price", "Price (live stores)", {
          [V.appfox]: text("Free"),
          [V.kaching]: text("From $14.99/mo"),
          [V.fast]: text("From $19/mo"),
          [V.bundler]: text("Free, then $9.99 / $19.99"),
          [V.simple]: text("Free, then $14+"),
          [V.shopify]: text("Free"),
          [V.wide]: text("From $14.99/mo"),
          [V.rebolt]: text("Free to $300, then $19.99/mo"),
        }),
        row("pricing-model", "Pricing model", {
          [V.appfox]: text("Free, no limits"),
          [V.kaching]: text("From $14.99/mo, scales with sales"),
          [V.fast]: text("From $19/mo, scales with sales"),
          [V.bundler]: text("Flat monthly plans"),
          [V.simple]: text("Free, then $14 / $39 / $149"),
          [V.shopify]: text("Free, no app charge"),
          [V.wide]: text("From $14.99/mo, scales with sales"),
          [V.rebolt]: text("Free to $300, then $19.99/mo"),
        }),
        row("rating", "Shopify App Store rating", {
          [V.appfox]: text("5.0 · 4 reviews"),
          [V.kaching]: text("5.0 · 6,243 reviews"),
          [V.fast]: text("5.0 · 3,533 reviews"),
          [V.bundler]: text("4.9 · 2,719 reviews"),
          [V.simple]: text("4.9 · 804 reviews"),
          [V.shopify]: text("2.9 · 568 reviews"),
          [V.wide]: text("4.9 · 320 reviews"),
          [V.rebolt]: text("4.8 · 586 reviews"),
        }),
        row("bfs", "Built for Shopify badge", {
          [V.appfox]: no,
          [V.kaching]: yes,
          [V.fast]: no,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: via("First-party app"),
          [V.wide]: yes,
          [V.rebolt]: no,
        }),
        row("mix-match", "Mix & match / build-a-box", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("From $9.99/mo"),
          [V.simple]: yes,
          [V.shopify]: no,
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("volume", "Volume discounts & quantity breaks", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("On free plan"),
          [V.simple]: yes,
          [V.shopify]: no,
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("bogo", "BOGO / Buy X Get Y", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("On free plan"),
          [V.simple]: yes,
          [V.shopify]: no,
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("pos", "Shopify POS", {
          [V.appfox]: unclear,
          [V.kaching]: yes,
          [V.fast]: partial("Enterprise plan"),
          [V.bundler]: partial("On free plan"),
          [V.simple]: partial("Paid plans"),
          [V.shopify]: yes,
          [V.wide]: unclear,
          [V.rebolt]: yes,
        }),
        row(
          "free-live",
          "Free plan for live stores",
          {
            [V.appfox]: { kind: "yes", label: "Free, no limits" },
            [V.kaching]: partial("Free on dev stores"),
            [V.fast]: partial("Free on dev stores, or up to $500/mo"),
            [V.bundler]: yes,
            [V.simple]: partial("3 bundles, 50 orders/mo"),
            [V.shopify]: yes,
            [V.wide]: partial("Free on dev stores"),
            [V.rebolt]: partial("Free to $300 revenue"),
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
            [V.wide]: text("8 languages"),
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
            [V.wide]: no,
            [V.rebolt]: no,
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
            [V.simple]: yes,
            [V.shopify]: partial("Sales, orders, top bundles"),
            [V.wide]: yes,
            [V.rebolt]: yes,
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
      caption: "The offer types you can run.",
      rows: [
        row("fixed", "Fixed / classic bundles", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: yes,
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("mm-offers", "Mix & match / build-a-box", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("From $9.99/mo"),
          [V.simple]: yes,
          [V.shopify]: no,
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("qb-offers", "Volume discounts & quantity breaks", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("On free plan"),
          [V.simple]: yes,
          [V.shopify]: no,
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("bogo-offers", "BOGO / Buy X Get Y", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("On free plan"),
          [V.simple]: yes,
          [V.shopify]: no,
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("fbt", "Frequently bought together", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: partial("AI FBT on paid plans"),
          [V.bundler]: unclear,
          [V.simple]: unclear,
          [V.shopify]: no,
          [V.rebolt]: yes,
        }),
        row("combo-sku", "Bundle as a product (combo SKU)", {
          [V.appfox]: no,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: unclear,
          [V.simple]: via("Kit product pages"),
          [V.shopify]: yes,
        }),
        row("gifts", "Free gifts", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: no,
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row(
          "addons",
          "Product add-ons",
          {
            [V.appfox]: { kind: "yes", label: "Checkbox add-ons, optional discount" },
            [V.kaching]: yes,
            [V.fast]: yes,
            [V.bundler]: yes,
            [V.simple]: unclear,
            [V.shopify]: no,
            [V.rebolt]: yes,
          },
          { more: true },
        ),
        row(
          "multipacks",
          "Multipacks",
          {
            [V.appfox]: { kind: "yes", label: "Quantity breaks on one product" },
            [V.kaching]: yes,
            [V.fast]: yes,
            [V.bundler]: yes,
            [V.simple]: yes,
            [V.shopify]: yes,
          },
          { more: true },
        ),
        row(
          "sub-boxes",
          "Subscription boxes in the bundle",
          {
            [V.appfox]: unclear,
            [V.kaching]: yes,
            [V.fast]: partial("Standard+ connectors"),
            [V.bundler]: yes,
            [V.simple]: unclear,
            [V.shopify]: no,
          },
          { more: true },
        ),
        row(
          "ai-suggest",
          "AI bundle suggestions",
          {
            [V.appfox]: no,
            [V.kaching]: unclear,
            [V.fast]: partial("AI FBT, paid"),
            [V.bundler]: unclear,
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
      caption: "How the discount is calculated.",
      rows: [
        row("pct", "Percentage-off discounts", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: via("Fixed bundle price"),
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("fixed-amt", "Fixed-amount discounts", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: via("Fixed bundle price"),
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("tiered", "Tiered / quantity-break pricing", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: no,
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("auto-discount", "Automatic checkout discounts", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("On free plan"),
          [V.simple]: yes,
          [V.shopify]: via("Bundle product price"),
        }),
        row("follows-component", "Bundle price follows component prices", {
          [V.appfox]: via("Discount rules"),
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: yes,
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
            [V.kaching]: yes,
            [V.fast]: yes,
            [V.bundler]: yes,
            [V.simple]: yes,
            [V.shopify]: yes,
          },
          { more: true },
        ),
        row(
          "meter-pause",
          "Offers pause if a revenue cap is hit",
          {
            [V.appfox]: no,
            [V.kaching]: yes,
            [V.fast]: unclear,
            [V.bundler]: no,
            [V.simple]: via("Order-volume plan limits"),
            [V.shopify]: no,
          },
          {
            more: true,
            hint: "Kaching pauses offers if you hit the monthly sales cap.",
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
          [V.simple]: yes,
          [V.shopify]: via("Native product page"),
        }),
        row("theme-inherit", "Theme-inherited styling", {
          [V.appfox]: yes,
          [V.kaching]: partial("Layouts + custom CSS/HTML"),
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: via("Theme product template"),
        }),
        row("layouts", "Multiple layouts / design studio", {
          [V.appfox]: {
            kind: "yes",
            label: "4 layouts, 3 badge styles, brand presets, saved templates",
          },
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: no,
          [V.wide]: { kind: "yes", label: "100+ design options" },
        }),
        row("progress", "Progress bars", {
          [V.appfox]: partial("Step indicator on Build-a-Box page"),
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: unclear,
          [V.shopify]: no,
        }),
        row(
          "custom-css",
          "Custom CSS / HTML",
          {
            [V.appfox]: partial("Custom CSS (no HTML)"),
            [V.kaching]: yes,
            [V.fast]: yes,
            [V.bundler]: yes,
            [V.simple]: unclear,
            [V.shopify]: no,
          },
          { more: true },
        ),
        row(
          "landing",
          "Custom landing pages",
          {
            [V.appfox]: partial("Hosted Build-a-Box page (mix & match)"),
            [V.kaching]: yes,
            [V.fast]: yes,
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
            [V.kaching]: yes,
            [V.fast]: partial("PageFly, GemPages, UpCart"),
            [V.bundler]: yes,
            [V.simple]: yes,
            [V.shopify]: no,
            [V.wide]: partial("PageFly, GemPages, others"),
            [V.rebolt]: yes,
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
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("cart", "Cart / cart-drawer offer", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: via("Cart line of the bundle product"),
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("checkout", "Checkout upsells", {
          [V.appfox]: no,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: unclear,
          [V.shopify]: no,
          [V.rebolt]: yes,
        }),
        row("post-purchase", "Post-purchase / thank-you upsells", {
          [V.appfox]: no,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("Funnel upsells, paid"),
          [V.simple]: unclear,
          [V.shopify]: no,
          [V.rebolt]: yes,
        }),
        row(
          "channels",
          "Shop app / headless channels",
          {
            [V.appfox]: no,
            [V.kaching]: unclear,
            [V.fast]: unclear,
            [V.bundler]: unclear,
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
            [V.kaching]: yes,
            [V.fast]: yes,
            [V.bundler]: yes,
            [V.simple]: unclear,
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
      caption: "Recommendations, gifts, and timed offers.",
      rows: [
        row("ai-fbt", "AI / frequently-bought-together", {
          [V.appfox]: partial("Manual, collection or Shopify recommendations"),
          [V.kaching]: yes,
          [V.fast]: partial("AI FBT on paid plans"),
          [V.bundler]: unclear,
          [V.simple]: partial("AI suggestions on free plan"),
          [V.shopify]: no,
        }),
        row("merch-gifts", "Free gifts / gift wrap", {
          [V.appfox]: { kind: "yes", label: "Gifts; wrap via checkbox add-on" },
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: no,
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("countdown", "Countdown / time-limited offers", {
          [V.appfox]: { kind: "yes", label: "Start/end schedule + countdown timer" },
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: unclear,
          [V.shopify]: no,
        }),
        row("spend-meter", "Spend / progress meters", {
          [V.appfox]: no,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: unclear,
          [V.shopify]: no,
        }),
        row(
          "gift-wrap",
          "Gift wrap add-on",
          {
            [V.appfox]: via("Checkbox add-on"),
            [V.kaching]: yes,
            [V.fast]: unclear,
            [V.bundler]: unclear,
            [V.simple]: unclear,
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
          [V.simple]: yes,
          [V.shopify]: partial("In Bundles app + Analytics"),
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("ab", "A/B testing", {
          [V.appfox]: { kind: "yes", label: "Weighted variants, pick a winner" },
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: unclear,
          [V.simple]: unclear,
          [V.shopify]: no,
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("aov", "Revenue / AOV reports", {
          [V.appfox]: yes,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: partial("From $19.99/mo"),
          [V.simple]: yes,
          [V.shopify]: partial("Sales, orders, top bundles"),
          [V.wide]: yes,
        }),
      ],
    },
    {
      id: "localization",
      no: "07",
      title: "Localization",
      label: "LOCALIZATION",
      caption: "Languages and currencies.",
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
          [V.wide]: yes,
          [V.rebolt]: yes,
        }),
        row("multi-currency", "Multi-currency", {
          [V.appfox]: { kind: "yes", label: "Shopper's currency, live market prices" },
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: via("Shopify Markets"),
        }),
      ],
    },
    {
      id: "pos-ops",
      no: "08",
      title: "POS & operations",
      label: "POS & OPERATIONS",
      caption: "In-store, warehouse, and automation. AppFox is thin here.",
      rows: [
        row("pos-ops", "Shopify POS", {
          [V.appfox]: unclear,
          [V.kaching]: yes,
          [V.fast]: partial("Enterprise plan"),
          [V.bundler]: partial("On free plan"),
          [V.simple]: partial("Paid plans"),
          [V.shopify]: yes,
          [V.rebolt]: yes,
        }),
        row("kitting", "Component SKU / kitting for fulfillment", {
          [V.appfox]: no,
          [V.kaching]: unclear,
          [V.fast]: via("Bundle-as-product"),
          [V.bundler]: unclear,
          [V.simple]: yes,
          [V.shopify]: yes,
          [V.wide]: no,
          [V.rebolt]: no,
        }),
        row("3pl", "3PL / WMS / ERP inventory sync", {
          [V.appfox]: no,
          [V.kaching]: unclear,
          [V.fast]: unclear,
          [V.bundler]: unclear,
          [V.simple]: yes,
          [V.shopify]: via("Shopify inventory"),
          [V.wide]: no,
          [V.rebolt]: no,
        }),
        row("flow", "Shopify Flow", {
          [V.appfox]: no,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: yes,
          [V.simple]: partial("Grow & Advanced+"),
          [V.shopify]: via("Shopify admin"),
        }),
        row(
          "hydrogen",
          "Hydrogen / headless",
          {
            [V.appfox]: no,
            [V.kaching]: unclear,
            [V.fast]: unclear,
            [V.bundler]: unclear,
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
            [V.kaching]: yes,
            [V.fast]: partial("Standard+"),
            [V.bundler]: yes,
            [V.simple]: unclear,
            [V.shopify]: no,
          },
          { more: true },
        ),
        row(
          "works-checkout",
          "Works with Checkout",
          {
            [V.appfox]: yes,
            [V.kaching]: yes,
            [V.fast]: yes,
            [V.bundler]: yes,
            [V.simple]: yes,
            [V.shopify]: yes,
          },
          { more: true },
        ),
        row(
          "works-admin",
          "Works with Shopify Admin",
          {
            [V.appfox]: yes,
            [V.kaching]: yes,
            [V.fast]: yes,
            [V.bundler]: yes,
            [V.simple]: yes,
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
          [V.kaching]: text("From $14.99/mo"),
          [V.fast]: text("From $19/mo"),
          [V.bundler]: text("Free, mix-and-match from $9.99"),
          [V.simple]: text("Free (3 bundles, 50 orders), then $14/mo"),
          [V.shopify]: text("Free"),
          [V.wide]: text("From $14.99/mo"),
          [V.rebolt]: text("Free to $300, then $19.99/mo"),
        }),
        row("meter", "Usage / revenue meter", {
          [V.appfox]: no,
          [V.kaching]: yes,
          [V.fast]: yes,
          [V.bundler]: no,
          [V.simple]: partial("Bundles & orders on free"),
          [V.shopify]: no,
          [V.wide]: yes,
          [V.rebolt]: partial("Free to $300 revenue"),
        }),
        row("support", "Support channel", {
          [V.appfox]: text("In-app live chat + email"),
          [V.kaching]: text("Live chat + email"),
          [V.fast]: unclear,
          [V.bundler]: unclear,
          [V.simple]: unclear,
          [V.shopify]: via("Shopify Help Center"),
        }),
        row("bfs-support", "Built for Shopify badge", {
          [V.appfox]: no,
          [V.kaching]: yes,
          [V.fast]: no,
          [V.bundler]: yes,
          [V.simple]: yes,
          [V.shopify]: via("First-party"),
          [V.wide]: yes,
          [V.rebolt]: no,
        }),
        row(
          "live-chat",
          "Live chat support",
          {
            [V.appfox]: yes,
            [V.kaching]: yes,
            [V.fast]: yes,
            [V.bundler]: yes,
            [V.simple]: yes,
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
            [V.rebolt]: via("$299/mo"),
          },
          { more: true },
        ),
        row(
          "tenure",
          "App Store launch",
          {
            [V.appfox]: text("January 2025"),
            [V.kaching]: unclear,
            [V.fast]: unclear,
            [V.bundler]: text("July 2019"),
            [V.simple]: unclear,
            [V.shopify]: via("Shopify-built"),
            [V.wide]: text("2020"),
            [V.rebolt]: text("2018"),
          },
          { more: true },
        ),
      ],
    },
  ],
  faq: [
    {
      q: "You make AppFox. Why should I trust this table?",
      a: "Don't take our word alone. We checked AppFox against the product on 9 October 2026. Competitor cells come from public App Store pages, help centers, and pricing pages (October 2026). A ? means we could not confirm it. Sources are at the bottom. We also say when a competitor is the better fit.",
    },
    {
      q: "AppFox has four reviews. Is that a real risk?",
      a: "Yes. Kaching has 6,243 reviews, Fast Bundle 3,533, Bundler 2,719. Four reviews and no Built for Shopify badge is a fair reason to pick someone else, especially on a Plus store that has to justify the install. Price and the verified feature set are the AppFox case, not tenure.",
    },
    {
      q: "When is each competitor the better choice?",
      a: "Shopify Bundles — a fixed kit or multipack with component inventory and no third-party app. Simple Bundles — kitting, 3PL, packing slips, POS, Flow. Kaching — POS, spend meters, and 6,000+ reviews. Fast Bundle — AI frequently-bought-together and bundle-as-product. Bundler — volume discounts and POS on a useful free plan, or mix-and-match at a flat $9.99. AppFox — the same core offer types plus FBT, gifts, add-ons, A/B tests, seven languages, and live chat, on a free install, if a younger review base is acceptable.",
    },
    {
      q: "Does AppFox have POS, 3PL, or AI recommendations?",
      a: "POS is unclear — we could not confirm it. 3PL / WMS and component kitting are no. There is no AI bundle suggester; frequently bought together is manual, from a collection, or from Shopify recommendations. If you need POS, warehouse kits, or AI recommendations, pick Simple Bundles, Shopify Bundles, Kaching, or Fast Bundle.",
    },
    {
      q: "How was the AppFox column checked?",
      a: "Against the product on 9 October 2026. Competitor columns follow their public docs. We did not read their source code.",
    },
    {
      q: "Can I run Shopify Bundles and AppFox together?",
      a: "Often. Shopify Bundles can own the kit SKU in the admin; AppFox can own the widget on the product page. Confirm discount stacking on a development theme before you run both live.",
    },
    {
      q: "Why aren’t Wide Bundles and Rebolt in this table?",
      a: "Five competitor columns already fill a desktop row. Same data, two columns: /vs/wide-bundles and /vs/rebolt. Wide Bundles leads on design options and bills as sales grow. Rebolt is free to $300 revenue, then $19.99, with checkout and thank-you upsells.",
    },
    {
      q: "Do you mark missing features as In development?",
      a: "Only if we have published that status. Right now there is no public Product Bundles roadmap, so gaps are a dash or a ?. Email support if a row you need is missing.",
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
    { label: "Wide Bundles App Store listing", url: "https://apps.shopify.com/widebundle" },
    { label: "WideBundle marketing site", url: "https://en.widebundle.com/" },
    { label: "Rebolt Upsell & Bundles App Store listing", url: "https://apps.shopify.com/bundle-products-by-thimatic" },
  ],
};

export function sectionHasUnclear(section: CompareSection, vendorIds?: string[]): boolean {
  return section.rows.some((r) =>
    Object.entries(r.cells).some(([id, c]) => {
      if (vendorIds && !vendorIds.includes(id)) return false;
      return c.kind === "unclear";
    }),
  );
}

export function hubVendors(): CompareVendor[] {
  return bundleCompare.vendors.filter((v) => v.inHub !== false);
}

export function vendorById(id: string): CompareVendor | undefined {
  return bundleCompare.vendors.find((v) => v.id === id);
}

export function pairVendors(competitorId: string): CompareVendor[] {
  const appfox = bundleCompare.vendors.find((v) => v.highlight);
  const competitor = vendorById(competitorId);
  return appfox && competitor ? [appfox, competitor] : [];
}

const APPFOX_LISTING: CompareSource = {
  label: "AppFox Product Bundles App Store listing",
  url: "https://apps.shopify.com/trust-bundles",
};

export const bundleAlternatives: BundleAlternative[] = [
  {
    slug: "kaching-bundles",
    vendorId: V.kaching,
    metaTitle: "Kaching Alternative: AppFox Product Bundles vs Kaching (2026)",
    metaDescription:
      "Looking for a Kaching Bundles alternative? AppFox is free, with volume discounts, mix-and-match, BOGO, and FBT. Kaching has 6,000+ reviews, POS, and a sales meter from $14.99/mo.",
    h1: "Kaching Alternative: AppFox Product Bundles vs Kaching (2026)",
    tagline: "Kaching is the most-reviewed bundle app. AppFox covers the same core offers and stays free.",
    summary:
      "Kaching has the reviews, the Built for Shopify badge, POS, spend meters, and live chat. Plans start at $14.99/mo and rise as bundle sales grow; offers can pause if you hit the cap. AppFox is free, with no sales meter, and ships volume discounts, mix-and-match, BOGO, FBT, gifts, add-ons, and A/B tests. Four reviews. POS is unclear on our side.",
    betterFit:
      "Pick Kaching if you need Shopify POS, spend meters, a large review base, or the Built for Shopify badge. That depth is real.",
    gaps:
      "AppFox does not have a verified POS channel, spend meters, or 6,000 reviews. We do not do checkout or post-purchase upsells.",
    whoShouldSwitch:
      "Switch if you want volume discounts, mix-and-match, BOGO, and FBT on a free install, and you can live with a younger app.",
    faq: [
      {
        q: "Is AppFox a real Kaching alternative?",
        a: "For quantity breaks, fixed bundles, mix-and-match, BOGO, FBT, and a product-page widget — yes. Kaching is ahead on reviews, POS, layouts, and spend meters. AppFox is ahead on price: free, with no sales cap.",
      },
      {
        q: "How does Kaching's pricing work?",
        a: "Live stores start at $14.99/mo for up to $1,000 of additional revenue, then $29.99 and $59.99. Hitting the cap pauses offers until you upgrade or the month resets. AppFox has no published cap.",
      },
      {
        q: "When should I stay on Kaching?",
        a: "If you sell on POS, want spend meters, or need a Built for Shopify badge and thousands of reviews to justify the install.",
      },
    ],
    sources: [
      APPFOX_LISTING,
      { label: "Kaching Bundles App Store listing", url: "https://apps.shopify.com/bundle-deals" },
      {
        label: "Kaching Flex Billing help article",
        url: "https://support.kachingappz.com/en/articles/12290748-understanding-flex-billing-performance-based-pricing",
      },
    ],
  },
  {
    slug: "fast-bundle",
    vendorId: V.fast,
    metaTitle: "Fast Bundle Alternative: AppFox Product Bundles vs Fast Bundle (2026)",
    metaDescription:
      "Looking for a Fast Bundle alternative? AppFox is free for volume discounts, mix-and-match, and BOGO. Fast Bundle adds AI FBT and bundle-as-product, from $19/mo as sales grow.",
    h1: "Fast Bundle Alternative: AppFox Product Bundles vs Fast Bundle (2026)",
    tagline: "Fast Bundle is a broad suite with AI recommendations. AppFox is the free core-offer app.",
    summary:
      "Fast Bundle (FBP) has 3,533 reviews, AI frequently-bought-together, bundle-as-product, and page-builder connectors. Live plans start at $19/mo and step up with monthly bundle sales. AppFox is free: the same volume, mix-and-match, and BOGO offers, plus FBT you set by hand or from Shopify recommendations. No combo SKU. No AI suggester.",
    betterFit:
      "Pick Fast Bundle if you want AI FBT, a combo SKU, or Enterprise POS. That suite is why they meter sales.",
    gaps:
      "AppFox has no bundle-as-product SKU, no AI recommender, and no page-builder connectors. POS is unclear.",
    whoShouldSwitch:
      "Switch if you only need storefront offers on a free install and do not need AI or a combo product.",
    faq: [
      {
        q: "Is Fast Bundle more expensive than AppFox?",
        a: "For a live store, yes, once you leave their free or eligible tier. Standard plans start at $19/mo and rise with bundle sales. AppFox is free.",
      },
      {
        q: "Does AppFox have AI bundle suggestions?",
        a: "No. Frequently bought together is manual, from a collection, or from Shopify recommendations.",
      },
      {
        q: "When should I stay on Fast Bundle?",
        a: "When AI FBT or selling the bundle as its own product is the job.",
      },
    ],
    sources: [
      APPFOX_LISTING,
      { label: "Fast Bundle App Store listing", url: "https://apps.shopify.com/fast-bundle-product-bundles" },
      { label: "Fast Bundle pricing page", url: "https://fastbundle.co/pricing/" },
    ],
  },
  {
    slug: "bundler",
    vendorId: V.bundler,
    metaTitle: "Bundler Alternative: AppFox Product Bundles vs Bundler (2026)",
    metaDescription:
      "Looking for a Bundler alternative? AppFox includes mix-and-match and analytics on a free install. Bundler’s free plan is strong for volume discounts and POS; mix-and-match starts at $9.99/mo.",
    h1: "Bundler Alternative: AppFox Product Bundles vs Bundler (2026)",
    tagline: "Bundler’s free plan is excellent for volume discounts. Mix-and-match and analytics are paid.",
    summary:
      "Bundler has been on the store since 2019, with 2,719 reviews, a Built for Shopify badge, 17 languages, and POS on the free plan. Volume discounts and Buy X Get Y are free. Mix-and-match starts at $9.99/mo; analytics at $19.99/mo. AppFox includes mix-and-match and analytics on a free install. We do not have a verified POS channel.",
    betterFit:
      "Pick Bundler if you want POS on day one, 17 languages, or volume discounts on a genuinely useful free plan.",
    gaps:
      "AppFox POS is unclear. We do not have Bundler’s tenure or review base.",
    whoShouldSwitch:
      "Switch if mix-and-match plus analytics at $0 matters more than POS and 2,700 reviews.",
    faq: [
      {
        q: "Bundler has a real free plan — why use AppFox?",
        a: "Bundler’s free plan is strong for volume discounts, Buy X Get Y, and POS. Mix-and-match and the dashboard are paid. AppFox includes those two on the free install.",
      },
      {
        q: "Does Bundler cost more as I sell more?",
        a: "No. Paid Bundler plans are flat monthly prices. That is a real advantage versus Kaching or Fast Bundle.",
      },
      {
        q: "When should I stay on Bundler?",
        a: "When you need POS, 17 languages, or the free volume-discount tier already does the job.",
      },
    ],
    sources: [
      APPFOX_LISTING,
      { label: "Bundler App Store listing", url: "https://apps.shopify.com/bundler-product-bundles" },
    ],
  },
  {
    slug: "simple-bundles",
    vendorId: V.simple,
    metaTitle: "Simple Bundles Alternative: AppFox Product Bundles vs Simple Bundles (2026)",
    metaDescription:
      "Looking for a Simple Bundles alternative for storefront offers? AppFox is the free product-page app. Simple Bundles is the kitting and 3PL app — a different job.",
    h1: "Simple Bundles Alternative: AppFox Product Bundles vs Simple Bundles (2026)",
    tagline: "Simple Bundles is the warehouse app. AppFox is the storefront offer app. They are not the same job.",
    summary:
      "Simple Bundles breaks kits into component SKUs, syncs 3PL / WMS, and prints packing slips. Free plan: 3 bundles and 50 orders/mo, then $14 / $39 / $149. AppFox does volume discounts, mix-and-match, and BOGO on the product page, free, with no kitting story. Do not install AppFox expecting a warehouse app.",
    betterFit:
      "Pick Simple Bundles if fulfillment is the hard problem: multi-SKU kits, 3PL, packing slips, POS, or Flow.",
    gaps:
      "AppFox has no component SKU breakdown, no 3PL sync, and no Flow. POS is unclear.",
    whoShouldSwitch:
      "Switch only if you need a storefront offer, not a kit in the warehouse. Many stores run both.",
    faq: [
      {
        q: "Can AppFox replace Simple Bundles for kits?",
        a: "No. If you need component inventory, 3PL sync, or packing-slip breakdown, stay on Simple Bundles.",
      },
      {
        q: "Is Simple Bundles’ free plan like AppFox’s?",
        a: "No. Theirs is 3 bundles and 50 orders/mo. AppFox is free with no bundle cap — and it does a different job.",
      },
      {
        q: "When should I stay on Simple Bundles?",
        a: "Whenever the pick list is the product. Pay $14–$149/mo for that.",
      },
    ],
    sources: [
      APPFOX_LISTING,
      { label: "Simple Bundles & Kits App Store listing", url: "https://apps.shopify.com/simple-bundles" },
    ],
  },
  {
    slug: "shopify-bundles",
    vendorId: V.shopify,
    metaTitle: "Shopify Bundles Alternative: AppFox Product Bundles vs Shopify Bundles (2026)",
    metaDescription:
      "Looking for a Shopify Bundles alternative for mix-and-match or quantity breaks? The first-party app is free for fixed kits only. AppFox adds volume discounts, mix-and-match, and BOGO — also free.",
    h1: "Shopify Bundles Alternative: AppFox Product Bundles vs Shopify Bundles (2026)",
    tagline: "Shopify Bundles is the free kit app. AppFox is the free offer layer on top.",
    summary:
      "Shopify Bundles is first-party and free: fixed kits and multipacks, component inventory, POS, Shop, and headless. It does not do mix-and-match, quantity breaks, or BOGO. Rated 2.9 from 568 reviews. AppFox adds those offer types as a third-party widget, also free, with four reviews and no verified POS.",
    betterFit:
      "Stay on Shopify Bundles for a fixed kit with component inventory and zero third-party apps.",
    gaps:
      "AppFox is not a native admin kit. We do not publish POS, Shop, or headless as bundle channels.",
    whoShouldSwitch:
      "Add AppFox — or switch the widget — if you need quantity breaks, mix-and-match, or BOGO. You can run both.",
    faq: [
      {
        q: "Should I just use Shopify Bundles if it’s free?",
        a: "Yes, if you only need a fixed kit or multipack. If you need quantity breaks, mix-and-match, or BOGO, their listing does not include them.",
      },
      {
        q: "Can I run both?",
        a: "Often. Shopify Bundles can own the kit SKU; AppFox can own the product-page widget. Test discount stacking on a development theme first.",
      },
      {
        q: "When is the first-party app enough?",
        a: "When the job is “these three SKUs sell as one product” and you do not want another app’s scopes on the store.",
      },
    ],
    sources: [
      APPFOX_LISTING,
      { label: "Shopify Bundles App Store listing", url: "https://apps.shopify.com/shopify-bundles" },
      {
        label: "Shopify Help Center: Shopify Bundles",
        url: "https://help.shopify.com/en/manual/products/bundles/shopify-bundles",
      },
    ],
  },
  {
    slug: "wide-bundles",
    vendorId: V.wide,
    metaTitle: "Wide Bundles Alternative: AppFox Product Bundles vs Wide Bundles (2026)",
    metaDescription:
      "Looking for a Wide Bundles alternative? AppFox is free, with theme-native widgets for quantity breaks, mix-and-match, and BOGO. Wide Bundles leads on 100+ design options from $14.99/mo.",
    h1: "Wide Bundles Alternative: AppFox Product Bundles vs Wide Bundles (2026)",
    tagline: "Wide Bundles sells design control. AppFox sells a free, theme-native widget for the same offers.",
    summary:
      "Wide Bundles is Built for Shopify, 4.9 from 320 reviews, with 100+ design options, A/B tests, and PageFly / GemPages connectors. Live stores start at $14.99/mo against additional-revenue caps. Dev stores are free; 14-day trial. AppFox lists the same offer family on a free install: four layouts, badge styles, and custom CSS, not a 100-option studio.",
    betterFit:
      "Pick Wide Bundles if the widget has to look like a designed campaign, or you already run the page builders they connect to.",
    gaps:
      "AppFox does not have 100+ design options or those page-builder connectors. POS is unclear.",
    whoShouldSwitch:
      "Switch if the theme already looks right and you do not want a sales meter.",
    faq: [
      {
        q: "Is Wide Bundles only a design app?",
        a: "No. It is a quantity-break, mix-and-match, and BOGO app that leads with design control. The offer types overlap; the billed difference is customization plus a revenue meter.",
      },
      {
        q: "Does AppFox have 100+ design options?",
        a: "No. Four layouts, three badge styles, brand presets, and custom CSS. If you need per-pixel control, they are further along.",
      },
      {
        q: "When should I stay on Wide Bundles?",
        a: "When the offer has to look like a custom landing module, or you already use PageFly / GemPages / a cart drawer they connect to.",
      },
    ],
    sources: [
      APPFOX_LISTING,
      { label: "Wide Bundles App Store listing", url: "https://apps.shopify.com/widebundle" },
      { label: "WideBundle marketing site", url: "https://en.widebundle.com/" },
    ],
  },
  {
    slug: "rebolt",
    vendorId: V.rebolt,
    metaTitle: "Rebolt Alternative: AppFox Product Bundles vs Rebolt (2026)",
    metaDescription:
      "Looking for a Rebolt alternative? AppFox stays free past the $300 line for product-page bundles. Rebolt adds checkout and thank-you upsells, then $19.99/mo.",
    h1: "Rebolt Alternative: AppFox Product Bundles vs Rebolt (2026)",
    tagline: "Rebolt is a longer-running suite with checkout upsells. AppFox is free past their $300 line.",
    summary:
      "Rebolt has been on the store since 2018, rated 4.8 from 586 reviews. It lists mix-and-match, volume discounts, BOGO, FBT, gifts, plus checkout, cart, and thank-you upsells, with POS and A/B tests. Free until $300 of bundle revenue, then $19.99/mo, or $299/mo custom. AppFox stays on the product-page offer and stays free. We do not do checkout or post-purchase upsells. POS is unclear.",
    betterFit:
      "Pick Rebolt if you want checkout and thank-you upsells in the same app as bundles, plus POS and a longer review history.",
    gaps:
      "AppFox does not list checkout or post-purchase upsells. POS is unclear. Four reviews versus 586.",
    whoShouldSwitch:
      "Switch if you only need a product-page quantity break or mix-and-match, and you do not want to pay after $300.",
    faq: [
      {
        q: "Is Rebolt still on the Shopify App Store?",
        a: "Yes, as of the October 2026 check: apps.shopify.com/bundle-products-by-thimatic, 4.8 from 586 reviews.",
      },
      {
        q: "How does Rebolt’s free tier compare?",
        a: "Free until $300 of bundle revenue, then $19.99/mo. AppFox has no revenue cap.",
      },
      {
        q: "When should I stay on Rebolt?",
        a: "When checkout, cart, and thank-you offers belong in the same app as the bundle.",
      },
    ],
    sources: [
      APPFOX_LISTING,
      {
        label: "Rebolt Upsell & Bundles App Store listing",
        url: "https://apps.shopify.com/bundle-products-by-thimatic",
      },
    ],
  },
];

export function getBundleAlternative(slug: string): BundleAlternative | undefined {
  return bundleAlternatives.find((a) => a.slug === slug);
}

export function listBundleAlternatives(): BundleAlternative[] {
  return bundleAlternatives;
}

export function bundleAlternativeSlugs(): string[] {
  return bundleAlternatives.map((a) => a.slug);
}

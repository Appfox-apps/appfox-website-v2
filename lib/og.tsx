import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Shared Open Graph image layouts - brutalist ink and signal yellow.
 *
 * ImageResponse (Satori) cannot read CSS variables or stylesheets, so the
 * design tokens from globals.css are mirrored here as literals. Styling is
 * restricted to flexbox + absolute positioning; every element with more
 * than one child sets `display: "flex"` explicitly.
 *
 * No remote/local font loading on purpose - builds stay hermetic. The
 * Georgia stack is a graceful hint; Satori falls back to its bundled face.
 */

export const ogSize = { width: 1200, height: 630 } as const;

const NIGHT = "#0A0A0A";
const CREAM = "#F4F1E8";
const MIST = "#D4D0C4";
const MARIGOLD = "#FFE500";
const MARIGOLD_SOFT = "#FFE500";
const PERF_DOT = "#FFE500";
const EDGE = "#FFE500";

const SERIF = "Arial, Helvetica, sans-serif";

const STRIP = "5-minute setup · Free plan · Works on every Shopify plan";

/** Flat ink. No wash. */

const HOST = new URL(site.url).host;

/**
 * First clause of a framing line, truncated to ~`max` characters at a word
 * boundary. Splits on the first semicolon or spaced em dash.
 */
export function firstClause(text: string, max = 90): string {
  const clause = text.split(/;|\s-\s/)[0].trim();
  if (clause.length <= max) return clause;
  const cut = clause.slice(0, max + 1);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed = cut.slice(0, lastSpace > 0 ? lastSpace : max);
  return `${trimmed.replace(/[\s,.:]+$/, "")}…`;
}

/** "AppFox" wordmark with the marigold full stop. */
function OgWordmark({ fontSize = 40 }: { fontSize?: number }) {
  const dot = Math.round(fontSize * 0.2);
  return (
    <div style={{ display: "flex", alignItems: "baseline" }}>
      <span
        style={{
          fontFamily: SERIF,
          fontWeight: 700,
          fontSize,
          letterSpacing: -1,
          color: CREAM,
        }}
      >
        AppFox
      </span>
      <div
        style={{
          width: dot,
          height: dot,
          borderRadius: 0,
          backgroundColor: MARIGOLD,
          marginLeft: Math.max(4, Math.round(fontSize * 0.08)),
        }}
      />
    </div>
  );
}

/** Receipt-perforation dot row used as a divider above the bottom strip. */
function OgPerforation() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {Array.from({ length: 44 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 7,
            height: 7,
            borderRadius: 0,
            backgroundColor: PERF_DOT,
          }}
        />
      ))}
    </div>
  );
}

/** Bottom ledger strip: trust line left, domain right. */
function OgStrip() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontSize: 23, letterSpacing: 1, color: MIST }}>{STRIP}</span>
      <span style={{ fontSize: 23, letterSpacing: 2, color: MARIGOLD_SOFT }}>{HOST}</span>
    </div>
  );
}

/** Shared frame: night wash, content slot, perforation + strip footer. */
function OgFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: NIGHT,
        border: "10px solid #FFE500",
        padding: "52px 72px 44px",
      }}
    >
      {children}
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <OgPerforation />
        <div style={{ display: "flex", marginTop: 26 }}>
          <OgStrip />
        </div>
      </div>
    </div>
  );
}

/** Layout A - brand pages (/, /features, /pricing, /vs). */
export function brandOgImage(headline: string): ImageResponse {
  return new ImageResponse(
    (
      <OgFrame>
        <OgWordmark />
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            width: "100%",
          }}
        >
          <span
            style={{
              fontFamily: SERIF,
              fontSize: 64,
              lineHeight: 1.14,
              letterSpacing: -1,
              color: CREAM,
              maxWidth: 940,
            }}
          >
            {headline}
          </span>
        </div>
      </OgFrame>
    ),
    { ...ogSize },
  );
}

/** Layout B - /vs/[slug] comparison pages. AppFox vs {competitor} split. */
export function vsOgImage(competitor: {
  shortName: string;
  framing: string;
  app?: string;
}): ImageResponse {
  const name = competitor.shortName;
  const nameSize = name.length > 10 ? 50 : 62;
  const clause = firstClause(competitor.framing);
  const kicker =
    competitor.app === "subscription"
      ? "SHOPIFY SUBSCRIPTIONS · COMPARED"
      : "SHOPIFY ORDER EDITING · COMPARED";

  return new ImageResponse(
    (
      <OgFrame>
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <OgWordmark fontSize={30} />
          <span style={{ fontSize: 19, letterSpacing: 3, color: MARIGOLD_SOFT }}>{kicker}</span>
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {/* Split row: AppFox · VS · competitor name (text only) */}
          <div
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <OgWordmark fontSize={62} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 104,
                height: 104,
                borderRadius: 0,
                border: `4px solid ${EDGE}`,
                backgroundColor: MARIGOLD,
                margin: "0 44px",
              }}
            >
              <span
                style={{
                  fontFamily: SERIF,
                  fontStyle: "normal",
                  fontSize: 40,
                  fontWeight: 800,
                  color: NIGHT,
                }}
              >
                vs
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: SERIF,
                  fontSize: nameSize,
                  letterSpacing: -1,
                  color: CREAM,
                }}
              >
                {name}
              </span>
            </div>
          </div>

          {/* First clause of the competitor's framing line */}
          <span
            style={{
              marginTop: 40,
              fontSize: 29,
              lineHeight: 1.4,
              color: MIST,
              maxWidth: 920,
              textAlign: "center",
            }}
          >
            {clause}
          </span>
        </div>
      </OgFrame>
    ),
    { ...ogSize },
  );
}

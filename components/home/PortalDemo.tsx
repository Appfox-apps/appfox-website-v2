"use client";

import { useEffect, useRef } from "react";
import styles from "./portal-demo.module.css";

/**
 * §6 Hero Centerpiece - "The Order That Fixes Itself".
 *
 * A CSS-only 19s looping product demo (16s active + 3s rest): the
 * customer fixes an address typo, swaps a tee M → L, adds a $24.00
 * beanie upsell ($86.00 → $110.00), saves - then the merchant card's
 * audit timeline lights up, an APPROVED stamp slams, and a success
 * frame with a Slack-style toast holds before the crossfade restart.
 *
 * Every keyframe lives on one shared 19s timeline in
 * portal-demo.module.css. The ONLY job of JS here is an
 * IntersectionObserver toggling `.running` (animation-play-state)
 * so the loop pauses off-screen. No-JS and reduced-motion users get
 * the static 13–16s success frame via pure CSS gating.
 */

/* Hand-drawn SVG tick (never a ✓ character) */
function Tick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
      <path
        d="M2 6.4l2.6 2.6L10 3.4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Status-bar furniture: signal · wifi · battery */
function StatusIcons() {
  return (
    <svg viewBox="0 0 44 10" className={styles.statusIcons} aria-hidden="true">
      <rect x="0" y="6" width="2" height="4" rx="0.5" fill="currentColor" />
      <rect x="3.5" y="4" width="2" height="6" rx="0.5" fill="currentColor" />
      <rect x="7" y="2" width="2" height="8" rx="0.5" fill="currentColor" />
      <path
        d="M16 6.5a6 6 0 0 1 7 0M17.7 8.3a3.4 3.4 0 0 1 3.6 0"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinecap="round"
      />
      <circle cx="19.5" cy="9.6" r="0.4" fill="currentColor" />
      <rect x="30" y="2.5" width="11" height="6" rx="1.5" fill="none" stroke="currentColor" />
      <rect x="31.5" y="4" width="6" height="3" rx="0.5" fill="currentColor" />
      <rect x="42" y="4.5" width="1.5" height="2" rx="0.5" fill="currentColor" />
    </svg>
  );
}

/* Product thumbnails - tiny line glyphs, no images */
function TeeGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8.5 4.5 4.5 7l2 3.5 2-1V19h7V9.5l2 1 2-3.5-4-2.5a3.5 3.5 0 0 1-6.5 0Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}
function ToteGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M6 8.5h12L16.8 20H7.2L6 8.5Zm3 0V7a3 3 0 0 1 6 0v1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}
function BeanieGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5.5 16a6.5 6.5 0 0 1 13 0M4.5 16.5h15v3h-15ZM12 9.5V8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="6.5" r="1.4" fill="none" stroke="currentColor" strokeWidth={1.3} />
    </svg>
  );
}

/* Pre-baked 9→0 countdown strip (decorative tick, SPEC §9.2);
   trailing 9 makes the steps(10) wrap seamless. */
const TICK_DIGITS = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "9"];

/* Per-digit roll columns, right-aligned: " $86" → "$110" + static ".00" */
const ROLL_COLUMNS: [string, string][] = [
  [" ", "$"],
  ["$", "1"],
  ["8", "1"],
  ["6", "0"],
];

export function PortalDemo() {
  const ref = useRef<HTMLDivElement>(null);

  /* The single piece of JS: play only while on screen. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.classList.toggle(styles.running, entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.stage}>
      <p className="sr-only">
        Product demo: a customer opens order #1042 on OAK &amp; ANCHOR&apos;s order status page,
        fixes a shipping-address typo with address validation, swaps a tee from size M to
        L, and adds a matching beanie for $24.00 - the total updates from $86.00 to $110.00 on
        the original payment, with no second checkout. The merchant&apos;s audit timeline records
        the edit, auto-approves it by rules, and captures the payment.
      </p>

      <div className={styles.scene} aria-hidden="true">
        {/* ── Back layer: merchant card (md+) ─────────────── */}
        <div className={styles.merchant}>
          <div className={styles.merchantHead}>
            <span className={styles.merchantLabel}>MERCHANT VIEW</span>
            <span className={`till ${styles.merchantNo}`}>#1042</span>
          </div>

          <ol className={styles.timeline}>
            <svg
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
              className={styles.spine}
              aria-hidden="true"
            >
              <line
                x1="1"
                y1="2"
                x2="1"
                y2="98"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeDasharray="2 6"
              />
            </svg>
            <li className={`${styles.node} ${styles.n1}`}>
              <span className={styles.nodeDot} />
              <span>Edit requested</span>
              <span className={`till ${styles.nodeTime}`}>14:02</span>
            </li>
            <li className={`${styles.node} ${styles.n2}`}>
              <span className={styles.nodeDot} />
              <span>Rules: auto-apply</span>
              <Tick className={styles.nodeTick} />
            </li>
            <li className={`${styles.node} ${styles.n3}`}>
              <span className={styles.nodeDot} />
              <span>Payment captured</span>
              <span className={`till ${styles.nodePay}`}>+$24.00</span>
            </li>
          </ol>

          <div className={styles.approvalRow}>
            <span>Approval</span>
            <span className={`till ${styles.stamp}`}>APPROVED</span>
          </div>
        </div>

        {/* ── Front layer: customer portal ─────────────────── */}
        <div className={styles.portal}>
          <div className={styles.statusBar}>
            <span className="till">9:41</span>
            <StatusIcons />
          </div>

          <header className={styles.storeHead}>
            <div className={styles.storeRow}>
              <span className={styles.accent} />
              <span className={styles.storeName}>OAK &amp; ANCHOR</span>
            </div>
            <div className={styles.orderRow}>
              <span className={`till ${styles.orderNo}`}>Order #1042</span>
              <span className={`till ${styles.pill}`}>
                Editable for 23:14:0
                <span className={styles.tickWin}>
                  <span className={styles.tickStrip}>
                    {TICK_DIGITS.map((d, i) => (
                      <span key={i}>{d}</span>
                    ))}
                  </span>
                </span>
              </span>
            </div>
            <div className={styles.shimmerTrack}>
              <span className={styles.shimmer} />
            </div>
          </header>

          <div className={styles.body}>
            <p className={styles.microLabel}>YOUR ITEMS</p>
            <ul className={styles.items}>
              <li className={styles.row}>
                <span className={styles.rowFlash} />
                <span className={styles.thumb}>
                  <TeeGlyph />
                </span>
                <span className={styles.rowMain}>
                  <span className={styles.rowName}>Heavyweight Tee</span>
                  <span className={styles.rowVariant}>
                    <span className={styles.varM}>Olive / M</span>
                    <span className={styles.varL}>Olive / L</span>
                  </span>
                </span>
                <span className={`till ${styles.rowPrice}`}>$32.00</span>
              </li>
              <li className={styles.row}>
                <span className={styles.thumb}>
                  <ToteGlyph />
                </span>
                <span className={styles.rowMain}>
                  <span className={styles.rowName}>Canvas Tote</span>
                  <span className={styles.rowVariant}>Natural</span>
                </span>
                <span className={`till ${styles.rowPrice}`}>$54.00</span>
              </li>
              {/* Upsell ledger row - space reserved from frame 0 */}
              <li className={`${styles.row} ${styles.rowBeanie}`}>
                <span className={styles.thumb}>
                  <BeanieGlyph />
                </span>
                <span className={styles.rowMain}>
                  <span className={styles.rowName}>Matching Beanie</span>
                  <span className={styles.rowVariant}>One size</span>
                </span>
                <span className={`till ${styles.rowPrice}`}>$24.00</span>
              </li>
            </ul>

            <div className={styles.addr}>
              <p className={styles.microLabel}>SHIPPING ADDRESS</p>
              <div className={styles.fieldWrap}>
                <div className={styles.addrField}>
                  <span className={`till ${styles.addrText}`}>
                    <span className={styles.addrTypo}>123 Mian St</span>
                    <span className={styles.addrFinal}>123 Main St</span>
                    <span className={styles.caret} />
                  </span>
                  <span className={styles.validPop}>
                    <Tick />
                  </span>
                </div>
                <div className={styles.dropdown}>
                  <div className={styles.acRow}>
                    <span className={styles.acHl} />
                    <span className={`till ${styles.acMain}`}>123 Main St</span>
                    <span className={styles.acSub}>Portland, OR</span>
                  </div>
                  <div className={styles.acRow}>
                    <span className={`till ${styles.acMain}`}>123 Maynard St</span>
                    <span className={styles.acSub}>Portland, OR</span>
                  </div>
                  <div className={styles.acRow}>
                    <span className={`till ${styles.acMain}`}>1238 Milan St</span>
                    <span className={styles.acSub}>Gresham, OR</span>
                  </div>
                </div>
              </div>
              <div className={styles.validRow}>
                <span className={`till ${styles.validChip}`}>
                  <Tick />
                  validated
                </span>
              </div>
            </div>

            <div className={styles.totals}>
              <span className={styles.totalLabel}>Total</span>
              <span className={`till ${styles.totalAmt}`}>
                {ROLL_COLUMNS.map(([from, to], i) => (
                  <span key={i} className={styles.digitWin}>
                    <span
                      className={styles.digitStrip}
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      <span>{from}</span>
                      <span>{to}</span>
                    </span>
                  </span>
                ))}
                <span>.00</span>
              </span>
            </div>

            <p className={styles.caption}>Charged to original payment - no second checkout</p>

            <span className={styles.saveBtn}>Save changes</span>

            {/* Scene 6 success frame - also the reduced-motion frame */}
            <div className={styles.success}>
              <svg viewBox="0 0 72 72" className={styles.successMark} aria-hidden="true">
                <path
                  className={styles.successCircle}
                  d="M37 7c15 1 26 12 25 29C61 52 50 65 35 64 20 63 9 52 9 36 9 19 22 6 37 7Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3.5}
                  strokeLinecap="round"
                  pathLength={100}
                />
                <path
                  className={styles.successTick}
                  d="M23 37.5 33 47l17-21"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={100}
                />
              </svg>
              <p className={styles.successMsg}>Order updated - no new checkout needed.</p>
            </div>
          </div>

          {/* ── Transient overlays ─────────────────────────── */}
          <div className={styles.scrim} />

          <div className={styles.sheet}>
            <p className={styles.sheetTitle}>Choose size</p>
            <p className={styles.sheetSub}>Heavyweight Tee - Olive</p>
            <div className={styles.chips}>
              <span className={styles.sizeChip}>S</span>
              <span className={styles.sizeChip}>
                M<span className={`${styles.chipOn} ${styles.chipOnM}`}>M</span>
              </span>
              <span className={styles.sizeChip}>
                L<span className={`${styles.chipOn} ${styles.chipOnL}`}>L</span>
              </span>
              <span className={styles.sizeChip}>XL</span>
            </div>
          </div>

          <div className={styles.tile}>
            <span className={styles.thumb}>
              <BeanieGlyph />
            </span>
            <span className={styles.tileMain}>
              <span className={styles.tileName}>Matching Beanie</span>
              <span className={`till ${styles.tilePrice}`}>$24.00</span>
            </span>
            <span className={styles.tileBtn}>Add to this order</span>
          </div>

          {/* Cursor-dot narrator */}
          <div className={styles.cursorLayer}>
            <span className={styles.cursorDot} />
          </div>
        </div>

        {/* ── Slack-style toast ───────────────────────────── */}
        <div className={styles.toast}>
          <span className={styles.toastBar} />
          <div>
            <p className={styles.toastApp}>
              Appfox
              <span className={styles.toastTag}>APP</span>
            </p>
            <p className={`till ${styles.toastMsg}`}>#1042 edited · +$24.00 upsell</p>
          </div>
        </div>
      </div>
    </div>
  );
}

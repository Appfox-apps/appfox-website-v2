/**
 * Brutalist app marks. One family: signal-yellow field, thick ink rule,
 * hard geometric glyph. Used in the chrome, the product screenshots,
 * and the portal video.
 */

type MarkProps = {
  className?: string;
  /** When set, the mark is named for assistive tech. Otherwise it is decorative. */
  title?: string;
};

function MarkFrame({
  className,
  title,
  children,
}: MarkProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="64" height="64" fill="#FFE500" />
      <rect x="3" y="3" width="58" height="58" fill="none" stroke="#0A0A0A" strokeWidth="6" />
      {children}
    </svg>
  );
}

/** House mark: heavy A and the ink square that ends the wordmark. */
export function AppFoxMark(props: MarkProps) {
  return (
    <MarkFrame {...props}>
      <path
        fill="#0A0A0A"
        fillRule="evenodd"
        d="M24 13 42 51h-7.8L31 42.5H17L13.8 51H6Zm0 16.2-5.2 13.6h10.4Z"
      />
      <rect x="46" y="46" width="10" height="10" fill="#0A0A0A" />
    </MarkFrame>
  );
}

/** Order Editing: a ledger and a checked edit. */
export function OrderEditingMark(props: MarkProps) {
  return (
    <MarkFrame {...props}>
      <rect x="12" y="16" width="22" height="5" fill="#0A0A0A" />
      <rect x="12" y="26" width="16" height="5" fill="#0A0A0A" />
      <rect x="12" y="36" width="14" height="5" fill="#0A0A0A" />
      <rect x="36" y="32" width="16" height="16" fill="#0A0A0A" />
      <path
        d="M39 40.5 42.4 44 49 36"
        fill="none"
        stroke="#FFE500"
        strokeWidth="3"
        strokeLinejoin="miter"
      />
    </MarkFrame>
  );
}

/** Subscriptions: a right-angle renewal loop. */
export function SubscriptionsMark(props: MarkProps) {
  return (
    <MarkFrame {...props}>
      <path d="M16 24h26" fill="none" stroke="#0A0A0A" strokeWidth="5" />
      <path d="M34 16h8v8" fill="none" stroke="#0A0A0A" strokeWidth="5" />
      <path d="M48 40H22" fill="none" stroke="#0A0A0A" strokeWidth="5" />
      <path d="M30 48h-8v-8" fill="none" stroke="#0A0A0A" strokeWidth="5" />
    </MarkFrame>
  );
}

/** Bundles: three stacked parcels, the front one ink. */
export function BundlesMark(props: MarkProps) {
  return (
    <MarkFrame {...props}>
      <rect x="12" y="30" width="20" height="18" fill="#F4F1E8" stroke="#0A0A0A" strokeWidth="3" />
      <rect x="22" y="22" width="20" height="18" fill="#F4F1E8" stroke="#0A0A0A" strokeWidth="3" />
      <rect x="32" y="14" width="20" height="18" fill="#0A0A0A" />
    </MarkFrame>
  );
}

const BY_SLUG = {
  "order-editing": OrderEditingMark,
  subscription: SubscriptionsMark,
  "product-bundles": BundlesMark,
} as const;

export function AppMark({
  slug,
  ...props
}: MarkProps & { slug: string }) {
  const Mark = BY_SLUG[slug as keyof typeof BY_SLUG] ?? AppFoxMark;
  return <Mark {...props} />;
}

import Image from "next/image";

/**
 * The one AppFox mark. Subscriptions, Bundles, and Order Editing
 * all use this logo — there are no per-app marks.
 */
export function AppMark({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/brand/appfox-512.png"
      alt="AppFox"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
    />
  );
}

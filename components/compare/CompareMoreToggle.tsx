"use client";

/** Opens extra comparison rows. The rows stay in the HTML; CSS hides them only when JS is on. */
export function CompareMoreToggle({ count, label }: { count: number; label: string }) {
  const closed = `More ${label} features (${count})`;
  const opened = `Hide extra ${label} features`;
  return (
    <button
      type="button"
      className="mt-4 text-sm font-medium text-brand-700 hover:text-brand-900"
      aria-expanded="false"
      onClick={(event) => {
        const root = event.currentTarget.closest("[data-compare-more]");
        if (!root) return;
        const open = root.getAttribute("data-open") === "true";
        if (open) root.removeAttribute("data-open");
        else root.setAttribute("data-open", "true");
        event.currentTarget.setAttribute("aria-expanded", open ? "false" : "true");
        event.currentTarget.textContent = open ? closed : opened;
      }}
    >
      {closed}
    </button>
  );
}

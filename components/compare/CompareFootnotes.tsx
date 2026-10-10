import type { CompareTable, CompareVendor } from "@/data/bundle-compare";

/** Full-width check sentence for each column that has one. */
export function ColumnCheckNotes({ vendors }: { vendors: CompareVendor[] }) {
  const noted = vendors.filter((vendor) => vendor.checked);
  if (noted.length === 0) return null;
  return (
    <ul className="mt-4 space-y-1 text-sm text-ink-500">
      {noted.map((vendor) => (
        <li key={vendor.id}>
          <span className="font-medium text-ink-700">{vendor.shortName}.</span> {vendor.checked}.
        </li>
      ))}
    </ul>
  );
}

export function CompareFootnotes({ notes }: { notes: CompareTable["footnotes"] }) {
  if (!notes?.length) return null;
  return (
    <ol className="mt-6 list-none space-y-2 text-sm text-ink-500">
      {notes.map((note) => (
        <li key={note.id} id={`compare-note-${note.id}`} className="flex gap-2">
          <span className="till shrink-0 text-[0.75rem] text-ink-500">{note.id}.</span>
          <span>{note.text}</span>
        </li>
      ))}
    </ol>
  );
}

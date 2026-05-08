import type { Ferry } from "@/data/trip-data";

type FerryCardProps = {
  name: Ferry["name"];
  status: Ferry["status"];
  description: Ferry["description"];
  emoji: Ferry["emoji"];
};

export function FerryCard({
  name,
  status,
  description,
  emoji,
}: FerryCardProps) {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <p className="text-3xl">{emoji}</p>
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
          {status}
        </span>
      </div>
      <h3 className="mt-3 font-bold">{name}</h3>
      <p className="mt-1 text-sm leading-5 text-slate-600">{description}</p>
    </article>
  );
}

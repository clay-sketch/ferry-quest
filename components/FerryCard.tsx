type FerryCardProps = {
  name: string;
  status: string;
  emoji: string;
};

export function FerryCard({ name, status, emoji }: FerryCardProps) {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-sm">
      <p className="text-3xl">{emoji}</p>
      <h3 className="mt-3 font-bold">{name}</h3>
      <p className="mt-1 text-sm text-slate-600">{status}</p>
    </article>
  );
}
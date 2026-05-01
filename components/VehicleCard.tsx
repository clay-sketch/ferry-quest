type VehicleCardProps = {
  name: string;
  crew: string;
  status: string;
  eta: string;
  margin: string;
  emoji: string;
};

export function VehicleCard({
  name,
  crew,
  status,
  eta,
  margin,
  emoji,
}: VehicleCardProps) {
  return (
    <article className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-3xl">{emoji}</p>
          <h3 className="mt-3 text-xl font-bold">{name}</h3>
          <p className="text-slate-600">{crew}</p>
        </div>

        <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-800">
          {status}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">ETA</p>
          <p className="font-bold">{eta}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-slate-500">Margin</p>
          <p className="font-bold">{margin}</p>
        </div>
      </div>
    </article>
  );
}
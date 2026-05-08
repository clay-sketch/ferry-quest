import type { CrewVehicle } from "@/data/trip-data";

type VehicleCardProps = {
  name: CrewVehicle["name"];
  crew: CrewVehicle["crew"];
  accent: CrewVehicle["accent"];
  status: CrewVehicle["status"];
  eta: CrewVehicle["eta"];
  margin: CrewVehicle["margin"];
  emoji: CrewVehicle["emoji"];
};

const accentStyles: Record<
  CrewVehicle["accent"],
  {
    article: string;
    badge: string;
    crew: string;
    label: string;
    name: string;
    statPanel: string;
  }
> = {
  sky: {
    article: "border border-transparent bg-white",
    badge: "bg-sky-100 text-sky-800",
    crew: "text-slate-600",
    label: "text-slate-500",
    name: "text-slate-900",
    statPanel: "bg-slate-50",
  },
  pink: {
    article: "border border-pink-200 bg-pink-50",
    badge: "bg-pink-100 text-pink-800",
    crew: "text-pink-800",
    label: "text-pink-700",
    name: "text-pink-950",
    statPanel: "bg-white/80",
  },
};

export function VehicleCard({
  name,
  crew,
  accent,
  status,
  eta,
  margin,
  emoji,
}: VehicleCardProps) {
  const styles = accentStyles[accent];

  return (
    <article className={`rounded-3xl p-6 shadow-sm ${styles.article}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-3xl">{emoji}</p>
          <h3 className={`mt-3 text-xl font-bold ${styles.name}`}>{name}</h3>
          <p className={styles.crew}>{crew}</p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${styles.badge}`}
        >
          {status}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className={`rounded-2xl p-4 ${styles.statPanel}`}>
          <p className={`text-sm ${styles.label}`}>ETA</p>
          <p className="font-bold">{eta}</p>
        </div>

        <div className={`rounded-2xl p-4 ${styles.statPanel}`}>
          <p className={`text-sm ${styles.label}`}>Margin</p>
          <p className="font-bold">{margin}</p>
        </div>
      </div>
    </article>
  );
}

import type { CrewVehicle } from "@/data/trip-data";

type MapPreviewProps = {
  vehicles: CrewVehicle[];
};

export function MapPreview({ vehicles }: MapPreviewProps) {
  const mapMarkers = [
    ...vehicles.map((vehicle) => ({
      label: vehicle.name,
      emoji: vehicle.emoji,
      position: vehicle.mapPosition,
    })),
    {
      label: "Deep Point Marina",
      emoji: "🏁",
      position: "left-[68%] top-[38%]",
    },
    {
      label: "Ferry",
      emoji: "⛴️",
      position: "left-[78%] top-[28%]",
    },
  ];

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Quest Map</h2>
          <p className="mt-1 text-slate-600">
            Static route preview for the drive, terminal, and crossing.
          </p>
        </div>

        <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-800">
          Preview mode
        </span>
      </div>

      <div className="relative mt-6 h-80 overflow-hidden rounded-3xl border border-sky-200 bg-sky-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,white,transparent_25%),radial-gradient(circle_at_80%_30%,white,transparent_22%),radial-gradient(circle_at_50%_80%,white,transparent_24%)]" />

        <div className="absolute left-[10%] top-[62%] h-2 w-[65%] -rotate-12 rounded-full bg-amber-300" />
        <div className="absolute left-[62%] top-[33%] h-2 w-[24%] -rotate-12 rounded-full bg-blue-300" />

        <div className="absolute left-[12%] top-[67%] text-sm font-semibold text-slate-500">
          Road
        </div>
        <div className="absolute left-[74%] top-[41%] text-sm font-semibold text-slate-500">
          Crossing
        </div>

        {mapMarkers.map((marker) => (
          <div
            key={marker.label}
            className={`absolute ${marker.position} -translate-x-1/2 -translate-y-1/2`}
          >
            <div className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-sm ring-4 ring-white/70">
                {marker.emoji}
              </div>
              <div className="mt-2 rounded-full bg-white px-3 py-1 text-xs font-semibold shadow-sm">
                {marker.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

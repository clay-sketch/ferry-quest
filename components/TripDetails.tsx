import type { TripData } from "@/data/trip-data";

type TripDetailsProps = {
  marinaName: TripData["marinaName"];
  marinaAddress: TripData["marinaAddress"];
  parkingReminder: TripData["parkingReminder"];
};

export function TripDetails({
  marinaName,
  marinaAddress,
  parkingReminder,
}: TripDetailsProps) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Harbor Details</h2>
      <p className="mt-1 text-slate-600">
        Quick reference for the final stretch.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-500">Marina</p>
          <p className="mt-1 font-bold">{marinaName}</p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-500">Address</p>
          <p className="mt-1 font-bold">{marinaAddress}</p>
        </div>

        <div className="rounded-2xl bg-amber-50 p-4">
          <p className="text-sm font-medium text-amber-700">
            Parking Reminder
          </p>
          <p className="mt-1 font-bold text-amber-900">{parkingReminder}</p>
        </div>
      </div>
    </section>
  );
}

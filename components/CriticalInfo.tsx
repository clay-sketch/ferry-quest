import type { TravelReminder } from "@/data/trip-data";

type CriticalInfoProps = {
  reminders: TravelReminder[];
};

export function CriticalInfo({ reminders }: CriticalInfoProps) {
  return (
    <section className="rounded-3xl bg-slate-900 p-6 text-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-200">
            Critical Info
          </p>
          <h2 className="mt-2 text-2xl font-bold">Travel Reminders</h2>
        </div>

        <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-sky-100">
          Static reference
        </span>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {reminders.map((reminder) => (
          <article key={reminder.id} className="rounded-2xl bg-white/10 p-4">
            <h3 className="font-bold">{reminder.title}</h3>
            <p className="mt-1 text-sm leading-5 text-slate-200">
              {reminder.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

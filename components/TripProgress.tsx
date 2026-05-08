import type { TripProgressStep } from "@/data/trip-data";

type TripProgressProps = {
  currentStepId: string;
  steps: TripProgressStep[];
};

export function TripProgress({ currentStepId, steps }: TripProgressProps) {
  const currentStepIndex = Math.max(
    steps.findIndex((step) => step.id === currentStepId),
    0,
  );

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Adventure Progress</h2>
          <p className="mt-1 text-slate-600">
            Follow the quest from driveway to island.
          </p>
        </div>

        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
          Step {currentStepIndex + 1} of {steps.length}
        </span>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-6">
        {steps.map((step, index) => {
          const isComplete = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div
              key={step.id}
              className={`rounded-2xl p-4 text-center shadow-sm ${
                isComplete
                  ? "bg-emerald-100 text-emerald-900"
                  : isCurrent
                    ? "bg-amber-100 text-amber-900"
                    : "bg-slate-100 text-slate-500"
              }`}
            >
              <p className="text-2xl">
                {isComplete ? "✅" : isCurrent ? "✨" : "○"}
              </p>
              <p className="mt-2 text-sm font-bold">{step.label}</p>
              <p className="mt-1 text-xs leading-snug opacity-75">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

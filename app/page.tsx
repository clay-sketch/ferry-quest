import {
  checklistItems,
  ferries,
  questItems,
  travelReminders,
  trip,
  tripProgressSteps,
  vehicles,
} from "@/data/trip-data";
import { VehicleCard } from "@/components/VehicleCard";
import { FerryCard } from "@/components/FerryCard";
import { CountdownPanel } from "@/components/CountdownPanel";
import { LiveCountdown } from "@/components/LiveCountdown";
import { FerryRouteMap } from "@/components/FerryRouteMap";
import { QuestStatusCard } from "@/components/QuestStatusCard";
import { TripProgress } from "@/components/TripProgress";
import { TripDetails } from "@/components/TripDetails";
import { TravelDayPanel } from "@/components/TravelDayPanel";
import { CriticalInfo } from "@/components/CriticalInfo";
import { MobileNavigation } from "@/components/MobileNavigation";

export default function Home() {
  return (
    <main className="min-h-screen bg-sky-100 pb-28 text-slate-900 md:pb-0">
      <MobileNavigation />

      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6 sm:px-6 md:py-8">
        <header
          id="overview"
          className="scroll-mt-6 rounded-3xl bg-white/80 p-6 shadow-sm md:p-8"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
                {trip.location}
              </p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight">
                {trip.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-700">
                A travel-day command center for ferry prep, family quests,
                static route reference, and the final hop to Bald Head Island.
              </p>
            </div>

            <nav
              aria-label="Dashboard sections"
              className="hidden rounded-full bg-slate-900 p-1 text-sm font-semibold text-white md:flex"
            >
              <a className="rounded-full px-4 py-2 hover:bg-white/10" href="#overview">
                Overview
              </a>
              <a className="rounded-full px-4 py-2 hover:bg-white/10" href="#checklist">
                Checklist
              </a>
              <a className="rounded-full px-4 py-2 hover:bg-white/10" href="#quests">
                Quests
              </a>
              <a className="rounded-full px-4 py-2 hover:bg-white/10" href="#info">
                Info
              </a>
            </nav>
          </div>
        </header>
        <TripProgress
          currentStepId={trip.currentStepId}
          steps={tripProgressSteps}
        />

        <section className="grid gap-4 md:grid-cols-4">
          <CountdownPanel
            label="Ferry Departure"
            time={trip.ferryDepartureTime}
            helperText="The ship leaves the harbor"
          />

          <CountdownPanel
            label="Target Arrival"
            time={trip.targetArrivalTime}
            helperText="Arrive, unload, park, and breathe"
          />
          <LiveCountdown targetDateTime={trip.ferryDepartureDateTime} />

          <QuestStatusCard status={trip.questStatus} />
        </section>

        <FerryRouteMap />

        <TravelDayPanel
          checklistItems={checklistItems}
          quests={questItems}
          vehicles={vehicles}
        />

        <section id="info" className="scroll-mt-6 grid gap-8">
          <CriticalInfo reminders={travelReminders} />

          <TripDetails
            marinaName={trip.marinaName}
            marinaAddress={trip.marinaAddress}
            parkingReminder={trip.parkingReminder}
          />

          <section>
            <h2 className="text-2xl font-bold">Crew Caravan</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  name={vehicle.name}
                  crew={vehicle.crew}
                  status={vehicle.status}
                  eta={vehicle.eta}
                  margin={vehicle.margin}
                  emoji={vehicle.emoji}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Ferry Route Notes</h2>
            <p className="mt-1 text-slate-600">
              Ferry route shown for reference. Verify official ferry times
              before travel.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-4">
              {ferries.map((ferry) => (
                <FerryCard
                  key={ferry.id}
                  name={ferry.name}
                  note={ferry.note}
                  emoji={ferry.emoji}
                />
              ))}
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}

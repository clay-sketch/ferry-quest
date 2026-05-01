import { ferries, trip, vehicles } from "@/data/trip-data";
import { VehicleCard } from "@/components/VehicleCard";
import { FerryCard } from "@/components/FerryCard";
import { CountdownPanel } from "@/components/CountdownPanel";
import { LiveCountdown } from "@/components/LiveCountdown";
import { MapPreview } from "@/components/MapPreview";
import { QuestStatusCard } from "@/components/QuestStatusCard";
import { TripProgress } from "@/components/TripProgress";
import { TripDetails } from "@/components/TripDetails";

export default function Home() {
  return (
    <main className="min-h-screen bg-sky-100 text-slate-900">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8">
        <header className="rounded-3xl bg-white/80 p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-700">
            {trip.location}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            {trip.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-700">
            A magical road-trip command center for tracking crews, catching the
            ferry, and keeping the island adventure stress-free.
          </p>
        </header>
        <TripProgress currentStep={trip.currentStep} />

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
        <MapPreview vehicles={vehicles} />
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
                key={vehicle.name}
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
          <h2 className="text-2xl font-bold">Ferry Fleet</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-4">
            {ferries.map((ferry) => (
              <FerryCard
                key={ferry.name}
                name={ferry.name}
                status={ferry.status}
                emoji={ferry.emoji}
              />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
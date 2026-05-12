"use client";

import type { CrewVehicle, QuestItem, TripData } from "@/data/trip-data";
import { getQuestItemsForCrew } from "@/data/quest-session";
import { useQuestSession } from "@/components/QuestSessionProvider";

type QuestStatusCardProps = {
  status: TripData["questStatus"];
  quests: QuestItem[];
  vehicles: CrewVehicle[];
};

function formatStartedAt(startedAt: string) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(startedAt));
}

export function QuestStatusCard({
  status,
  quests,
  vehicles,
}: QuestStatusCardProps) {
  const { activeQuestSession } = useQuestSession();
  const activeCrew = activeQuestSession
    ? vehicles.find((vehicle) => vehicle.id === activeQuestSession.crewId)
    : undefined;
  const activeQuestCount = activeQuestSession
    ? getQuestItemsForCrew(quests, activeQuestSession.crewId).length
    : 0;

  return (
    <div className="rounded-3xl bg-emerald-100 p-6 shadow-sm">
      <p className="text-sm font-medium text-emerald-700">Quest Status</p>
      {activeQuestSession ? (
        <>
          <p className="mt-2 text-3xl font-bold text-emerald-900">Started</p>
          <p className="mt-2 text-sm font-semibold text-emerald-800">
            {activeCrew?.crew ?? "Crew"} active since{" "}
            {formatStartedAt(activeQuestSession.startedAt)}
          </p>
          <p className="mt-1 text-sm text-emerald-700">
            {activeQuestSession.completedQuestItemIds.length} of{" "}
            {activeQuestCount} quest items complete
          </p>
        </>
      ) : (
        <>
          <p className="mt-2 text-3xl font-bold text-emerald-900">{status}</p>
          <p className="mt-2 text-sm text-emerald-700">
            Pick a crew below to start a quest session.
          </p>
        </>
      )}
    </div>
  );
}

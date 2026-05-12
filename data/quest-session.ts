import type { CrewVehicle, QuestItem, TeamId } from "@/data/trip-data";

export type QuestSessionLocation = {
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
  recordedAt: string;
  source: "manual" | "browser-geolocation";
};

export type QuestSession = {
  sessionId: string;
  crewId: TeamId;
  vehicleId?: CrewVehicle["id"];
  startedAt: string;
  completedQuestItemIds: QuestItem["id"][];
  currentQuestItemId?: QuestItem["id"];
  lastKnownLocation?: QuestSessionLocation;
};

export type CreateQuestSessionInput = {
  crewId: TeamId;
  vehicleId?: CrewVehicle["id"];
  questItems: QuestItem[];
  startedAt?: Date;
  sessionId?: string;
};

export function getQuestItemsForCrew(
  questItems: QuestItem[],
  crewId: TeamId,
) {
  return questItems.filter(
    (questItem) =>
      questItem.teamAssignment === "all" ||
      questItem.teamAssignment === crewId,
  );
}

export function createQuestSession({
  crewId,
  vehicleId,
  questItems,
  startedAt = new Date(),
  sessionId = createQuestSessionId(crewId, startedAt),
}: CreateQuestSessionInput): QuestSession {
  const availableQuestItems = getQuestItemsForCrew(questItems, crewId);

  return {
    sessionId,
    crewId,
    vehicleId,
    startedAt: startedAt.toISOString(),
    completedQuestItemIds: [],
    currentQuestItemId: availableQuestItems[0]?.id,
  };
}

function createQuestSessionId(crewId: TeamId, startedAt: Date) {
  const randomSegment =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2, 10);

  return `local-${crewId}-${startedAt.getTime()}-${randomSegment}`;
}

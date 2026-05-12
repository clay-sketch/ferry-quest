"use client";

import { useEffect, useMemo, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type {
  ChecklistSection,
  ChecklistItem,
  CrewVehicle,
  QuestCategory,
  QuestItem,
  TeamAssignment,
} from "@/data/trip-data";

type TravelDayPanelProps = {
  checklistSections: ChecklistSection[];
  checklistItems: ChecklistItem[];
  quests: QuestItem[];
  vehicles: CrewVehicle[];
};

const CHECKLIST_STORAGE_KEY = "ferry-quest:checklist-completed:v1";
const QUEST_STORAGE_KEY = "ferry-quest:quest-completed:v1";

const categoryStyles: Record<QuestCategory, string> = {
  Travel: "bg-sky-100 text-sky-800",
  Ferry: "bg-blue-100 text-blue-800",
  Island: "bg-emerald-100 text-emerald-800",
  Photo: "bg-fuchsia-100 text-fuchsia-800",
  Bonus: "bg-amber-100 text-amber-800",
};

function readStoredCompletedIds(key: string, allowedIds: Set<string>) {
  if (typeof window === "undefined") {
    return new Set<string>();
  }

  try {
    const storedValue = window.localStorage.getItem(key);
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : [];

    if (!Array.isArray(parsedValue)) {
      return new Set<string>();
    }

    return new Set(
      parsedValue.filter(
        (id): id is string => typeof id === "string" && allowedIds.has(id),
      ),
    );
  } catch {
    return new Set<string>();
  }
}

function writeStoredCompletedIds(key: string, completedIds: Set<string>) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify([...completedIds]));
  } catch {
    // Storage can be unavailable in private browsing or locked-down contexts.
  }
}

function getProgressPercent(completedCount: number, totalCount: number) {
  if (totalCount === 0) {
    return 0;
  }

  return Math.round((completedCount / totalCount) * 100);
}

function toggleCompletedId(
  id: string,
  setCompletedIds: Dispatch<SetStateAction<Set<string>>>,
) {
  setCompletedIds((currentIds) => {
    const nextIds = new Set(currentIds);

    if (nextIds.has(id)) {
      nextIds.delete(id);
    } else {
      nextIds.add(id);
    }

    return nextIds;
  });
}

function getAssignmentLabel(
  assignment: TeamAssignment,
  vehicles: CrewVehicle[],
) {
  if (assignment === "all") {
    return "All crews";
  }

  return vehicles.find((vehicle) => vehicle.id === assignment)?.crew ?? "Team";
}

export function TravelDayPanel({
  checklistSections,
  checklistItems,
  quests,
  vehicles,
}: TravelDayPanelProps) {
  const [hasHydrated, setHasHydrated] = useState(false);
  const [completedChecklistIds, setCompletedChecklistIds] = useState<
    Set<string>
  >(() => new Set());
  const [completedQuestIds, setCompletedQuestIds] = useState<Set<string>>(
    () => new Set(),
  );

  const checklistIds = useMemo(
    () => new Set(checklistItems.map((item) => item.id)),
    [checklistItems],
  );
  const questIds = useMemo(
    () => new Set(quests.map((quest) => quest.id)),
    [quests],
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setCompletedChecklistIds(
        readStoredCompletedIds(CHECKLIST_STORAGE_KEY, checklistIds),
      );
      setCompletedQuestIds(readStoredCompletedIds(QUEST_STORAGE_KEY, questIds));
      setHasHydrated(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [checklistIds, questIds]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    writeStoredCompletedIds(CHECKLIST_STORAGE_KEY, completedChecklistIds);
  }, [completedChecklistIds, hasHydrated]);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    writeStoredCompletedIds(QUEST_STORAGE_KEY, completedQuestIds);
  }, [completedQuestIds, hasHydrated]);

  const completedQuests = useMemo(
    () => quests.filter((quest) => completedQuestIds.has(quest.id)),
    [completedQuestIds, quests],
  );
  const groupedChecklistItems = useMemo(
    () =>
      checklistSections.map((section) => ({
        ...section,
        items: checklistItems.filter((item) => item.sectionId === section.id),
      })),
    [checklistItems, checklistSections],
  );

  const completedChecklistCount = completedChecklistIds.size;
  const completedQuestCount = completedQuestIds.size;
  const checklistPercent = getProgressPercent(
    completedChecklistCount,
    checklistItems.length,
  );
  const questPercent = getProgressPercent(completedQuestCount, quests.length);
  const familyScore = completedQuests.reduce(
    (total, quest) => total + quest.points,
    0,
  );
  const possibleScore = quests.reduce((total, quest) => total + quest.points, 0);
  const sharedScore = completedQuests
    .filter((quest) => quest.teamAssignment === "all")
    .reduce((total, quest) => total + quest.points, 0);
  const teamScores = vehicles.map((vehicle) => ({
    id: vehicle.id,
    crew: vehicle.crew,
    emoji: vehicle.emoji,
    score: completedQuests
      .filter((quest) => quest.teamAssignment === vehicle.id)
      .reduce((total, quest) => total + quest.points, 0),
  }));

  function resetProgress() {
    const shouldReset = window.confirm(
      "Reset all checklist and quest progress on this device?",
    );

    if (!shouldReset) {
      return;
    }

    setCompletedChecklistIds(new Set());
    setCompletedQuestIds(new Set());

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(CHECKLIST_STORAGE_KEY);
      window.localStorage.removeItem(QUEST_STORAGE_KEY);
    }
  }

  return (
    <div className="grid gap-8">
      <section
        id="checklist"
        className="scroll-mt-6 rounded-3xl bg-white p-6 shadow-sm"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
              Travel Day
            </p>
            <h2 className="mt-2 text-2xl font-bold">Checklist</h2>
            <p className="mt-1 text-slate-600">
              Travel-day progress: {completedChecklistCount} of{" "}
              {checklistItems.length} checked off
            </p>
          </div>

          <button
            type="button"
            onClick={resetProgress}
            className="min-h-11 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            Reset checklist + quests
          </button>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${checklistPercent}%` }}
          />
        </div>

        <div className="mt-6 grid gap-5">
          {groupedChecklistItems.map((section) => (
            <section key={section.id} aria-labelledby={`${section.id}-heading`}>
              <div className="mb-3">
                <h3 id={`${section.id}-heading`} className="font-bold">
                  {section.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {section.description}
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {section.items.map((item) => {
                  const isComplete = completedChecklistIds.has(item.id);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={isComplete}
                      onClick={() =>
                        toggleCompletedId(item.id, setCompletedChecklistIds)
                      }
                      className={`min-h-20 rounded-2xl border p-4 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 ${
                        isComplete
                          ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                          : "border-slate-200 bg-white text-slate-900 hover:border-sky-200 hover:bg-sky-50"
                      }`}
                    >
                      <span className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                            isComplete
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-slate-300 bg-white text-slate-400"
                          }`}
                        >
                          {isComplete ? "✓" : ""}
                        </span>
                        <span>
                          <span className="block font-bold">{item.title}</span>
                          <span className="mt-1 block text-sm leading-5 text-slate-600">
                            {item.helperText}
                          </span>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>

      <section
        id="quests"
        className="scroll-mt-6 rounded-3xl bg-white p-6 shadow-sm"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Quest Board
            </p>
            <h2 className="mt-2 text-2xl font-bold">Challenges</h2>
            <p className="mt-1 text-slate-600">
              Quest progress: {completedQuestCount} of {quests.length} complete
            </p>
          </div>

          <div className="rounded-2xl bg-amber-100 px-4 py-3 text-right text-amber-950">
            <p className="text-sm font-semibold">Family Quest Score</p>
            <p className="text-2xl font-bold">
              {familyScore} / {possibleScore}
            </p>
          </div>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-amber-500 transition-all"
            style={{ width: `${questPercent}%` }}
          />
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-500">
              All-crew points
            </p>
            <p className="mt-1 text-2xl font-bold">{sharedScore}</p>
          </div>
          {teamScores.map((team) => (
            <div key={team.id} className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-500">
                {team.emoji} {team.crew} points
              </p>
              <p className="mt-1 text-2xl font-bold">{team.score}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-2">
          {quests.map((quest) => {
            const isComplete = completedQuestIds.has(quest.id);

            return (
              <button
                key={quest.id}
                type="button"
                aria-pressed={isComplete}
                onClick={() => toggleCompletedId(quest.id, setCompletedQuestIds)}
                className={`min-h-28 rounded-2xl border p-4 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                  isComplete
                    ? "border-amber-300 bg-amber-50 text-amber-950"
                    : "border-slate-200 bg-white text-slate-900 hover:border-amber-200 hover:bg-amber-50"
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span>
                    <span className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${categoryStyles[quest.category]}`}
                      >
                        {quest.category}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                        {quest.points} pts
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
                        {getAssignmentLabel(quest.teamAssignment, vehicles)}
                      </span>
                    </span>
                    <span className="mt-3 block font-bold">{quest.title}</span>
                    <span className="mt-1 block text-sm leading-5 text-slate-600">
                      {quest.description}
                    </span>
                  </span>

                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                      isComplete
                        ? "border-amber-500 bg-amber-500 text-white"
                        : "border-slate-300 bg-white text-slate-400"
                    }`}
                  >
                    {isComplete ? "✓" : ""}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

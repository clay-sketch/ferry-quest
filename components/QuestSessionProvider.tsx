"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { QuestSession } from "@/data/quest-session";

type QuestSessionContextValue = {
  activeQuestSession: QuestSession | null;
  setActiveQuestSession: Dispatch<SetStateAction<QuestSession | null>>;
};

const QuestSessionContext = createContext<
  QuestSessionContextValue | undefined
>(undefined);

export function QuestSessionProvider({ children }: { children: ReactNode }) {
  const [activeQuestSession, setActiveQuestSession] =
    useState<QuestSession | null>(null);

  const contextValue = useMemo(
    () => ({ activeQuestSession, setActiveQuestSession }),
    [activeQuestSession],
  );

  return (
    <QuestSessionContext.Provider value={contextValue}>
      {children}
    </QuestSessionContext.Provider>
  );
}

export function useQuestSession() {
  const contextValue = useContext(QuestSessionContext);

  if (!contextValue) {
    throw new Error("useQuestSession must be used inside QuestSessionProvider");
  }

  return contextValue;
}

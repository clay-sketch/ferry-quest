export type QuestCategory = "Travel" | "Ferry" | "Island" | "Photo" | "Bonus";

export type TeamId = "clay-crew" | "hampton-crew";

export type TeamAssignment = TeamId | "all";

export type TripData = {
  name: string;
  location: string;
  ferryDepartureTime: string;
  ferryDepartureDateTime: string;
  targetArrivalTime: string;
  questStatus: string;
  currentStepId: string;
  marinaName: string;
  marinaAddress: string;
  parkingReminder: string;
};

export type TripProgressStep = {
  id: string;
  label: string;
  description: string;
};

export type CrewVehicle = {
  id: TeamId;
  name: string;
  crew: string;
  status: string;
  eta: string;
  margin: string;
  emoji: string;
};

export type Ferry = {
  id: string;
  name: string;
  note: string;
  emoji: string;
};

export type ChecklistItem = {
  id: string;
  title: string;
  helperText: string;
  progressStepId: string;
};

export type QuestItem = {
  id: string;
  title: string;
  description: string;
  category: QuestCategory;
  points: number;
  teamAssignment: TeamAssignment;
};

export type TravelReminder = {
  id: string;
  title: string;
  description: string;
};

export const trip: TripData = {
  name: "The Fam's Ferry Quest",
  location: "Bald Head Island",
  ferryDepartureTime: "4:00 PM",
  ferryDepartureDateTime: "2026-05-13T16:00:00",
  targetArrivalTime: "1:15 PM",
  questStatus: "On Track",
  currentStepId: "drive",
  marinaName: "Deep Point Marina",
  marinaAddress: "1301 Ferry Rd SE, Southport, NC",
  parkingReminder: "Unload luggage at the terminal first, then park.",
};

export const tripProgressSteps: TripProgressStep[] = [
  {
    id: "pack",
    label: "Pack",
    description: "Tickets, tram details, cooler, groceries, and luggage tags.",
  },
  {
    id: "drive",
    label: "Drive",
    description: "Caravan toward Southport with enough time to spare.",
  },
  {
    id: "arrive",
    label: "Arrive",
    description: "Pull into Deep Point Marina and start unloading.",
  },
  {
    id: "park",
    label: "Park",
    description: "Move vehicles after luggage is dropped at the terminal.",
  },
  {
    id: "board",
    label: "Board",
    description: "Get crews and carry-ons onto the ferry.",
  },
  {
    id: "island",
    label: "Island",
    description: "Arrive on Bald Head Island and connect with the tram.",
  },
];

export const vehicles: CrewVehicle[] = [
  {
    id: "clay-crew",
    name: "Dragon Wagon",
    crew: "Clay's Crew",
    status: "On the road",
    eta: "1:08 PM",
    margin: "52 min early",
    emoji: "🐉",
  },
  {
    id: "hampton-crew",
    name: "Seashell Shuttle",
    crew: "Hampton's Crew",
    status: "Almost there",
    eta: "12:58 PM",
    margin: "62 min early",
    emoji: "🐚",
  },
];

export const ferries: Ferry[] = [
  {
    id: "sans-souci",
    name: "Sans Souci",
    note: "Static fleet reference",
    emoji: "⛴️",
  },
  {
    id: "adventure",
    name: "Adventure",
    note: "Static fleet reference",
    emoji: "🌊",
  },
  {
    id: "patriot",
    name: "Patriot",
    note: "Static fleet reference",
    emoji: "⚓",
  },
  {
    id: "ranger",
    name: "Ranger",
    note: "Static fleet reference",
    emoji: "🧭",
  },
];

export const checklistItems: ChecklistItem[] = [
  {
    id: "confirm-ferry-tickets",
    title: "Confirm ferry tickets",
    helperText: "Verify the reservation before leaving home.",
    progressStepId: "pack",
  },
  {
    id: "confirm-tram-reservation",
    title: "Confirm tram reservation",
    helperText: "Check tram timing and arrival details.",
    progressStepId: "pack",
  },
  {
    id: "tag-luggage",
    title: "Tag luggage",
    helperText: "Make every bag easy to identify at handoff.",
    progressStepId: "pack",
  },
  {
    id: "pack-cooler",
    title: "Pack cooler",
    helperText: "Keep travel snacks and cold items together.",
    progressStepId: "pack",
  },
  {
    id: "load-groceries",
    title: "Load groceries",
    helperText: "Double-check pantry bags before departure.",
    progressStepId: "pack",
  },
  {
    id: "arrive-deep-point",
    title: "Arrive at Deep Point Marina",
    helperText: "Build in time to unload, park, and regroup.",
    progressStepId: "arrive",
  },
  {
    id: "unload-luggage-terminal",
    title: "Unload luggage at terminal",
    helperText: "Drop luggage before moving vehicles to parking.",
    progressStepId: "arrive",
  },
  {
    id: "park-vehicle",
    title: "Park vehicle",
    helperText: "Return to the terminal with carry-ons.",
    progressStepId: "park",
  },
  {
    id: "board-ferry",
    title: "Board ferry",
    helperText: "Keep tickets and essentials close.",
    progressStepId: "board",
  },
  {
    id: "arrive-bald-head-island",
    title: "Arrive on Bald Head Island",
    helperText: "Collect crews, luggage, and tram details.",
    progressStepId: "island",
  },
];

export const questCategories: QuestCategory[] = [
  "Travel",
  "Ferry",
  "Island",
  "Photo",
  "Bonus",
];

export const questItems: QuestItem[] = [
  {
    id: "spot-ferry-terminal",
    title: "Spot the ferry before reaching the terminal",
    description: "First person to call it out gets the point credit.",
    category: "Travel",
    points: 10,
    teamAssignment: "all",
  },
  {
    id: "deep-point-team-photo",
    title: "Take a team photo at Deep Point Marina",
    description: "Capture the crew before luggage handoff gets busy.",
    category: "Photo",
    points: 15,
    teamAssignment: "all",
  },
  {
    id: "first-golf-cart",
    title: "Find the first golf cart on the island",
    description: "Call out the first cart after arriving on Bald Head Island.",
    category: "Island",
    points: 10,
    teamAssignment: "all",
  },
  {
    id: "spot-old-baldy",
    title: "Spot Old Baldy",
    description: "Find the lighthouse from the ferry, tram, or island route.",
    category: "Island",
    points: 20,
    teamAssignment: "all",
  },
  {
    id: "find-seashell",
    title: "Find a seashell",
    description: "Any shell counts once everyone agrees it is beach-worthy.",
    category: "Island",
    points: 10,
    teamAssignment: "all",
  },
  {
    id: "ferry-trivia",
    title: "Answer a ferry trivia question",
    description: "Ask one ferry fact question and get a correct answer.",
    category: "Ferry",
    points: 15,
    teamAssignment: "all",
  },
  {
    id: "no-complaints-before-boarding",
    title: "Complete the no complaints before boarding bonus challenge",
    description: "Everyone makes it onto the ferry with good travel-day energy.",
    category: "Bonus",
    points: 25,
    teamAssignment: "all",
  },
  {
    id: "dragon-wagon-cooler-check",
    title: "Dragon Wagon cooler check",
    description: "Clay's Crew confirms drinks, snacks, and cold items are loaded.",
    category: "Travel",
    points: 10,
    teamAssignment: "clay-crew",
  },
  {
    id: "seashell-shuttle-luggage-check",
    title: "Seashell Shuttle luggage tag check",
    description: "Hampton's Crew confirms every bag has a tag.",
    category: "Travel",
    points: 10,
    teamAssignment: "hampton-crew",
  },
  {
    id: "ferry-wake-watcher",
    title: "Spot the biggest ferry wake",
    description: "Pick the best wave trail during the Cape Fear crossing.",
    category: "Ferry",
    points: 10,
    teamAssignment: "all",
  },
];

export const travelReminders: TravelReminder[] = [
  {
    id: "verify-official-schedule",
    title: "Verify official ferry schedule before leaving",
    description: "This app is a local planner and does not show live ferry status.",
  },
  {
    id: "confirm-reservations",
    title: "Confirm tickets and tram reservations",
    description: "Keep confirmation details easy to reach on travel day.",
  },
  {
    id: "remember-luggage-handling",
    title: "Remember luggage handling",
    description: "Tagged luggage should be dropped at the terminal before parking.",
  },
  {
    id: "arrive-early",
    title: "Arrive early enough to unload and park",
    description: "The buffer matters more than the dashboard countdown.",
  },
  {
    id: "deep-point-departure",
    title: "Deep Point Marina is the mainland departure point",
    description: "Use the Southport marina address for the final driving leg.",
  },
];

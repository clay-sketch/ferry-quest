export type QuestCategory = "Travel" | "Ferry" | "Island" | "Photo" | "Bonus";

export type TeamId = "clay-crew" | "hampton-crew";

export type TeamAssignment = TeamId | "all";

export type VehicleAccent = "sky" | "pink";

export type TripData = {
  name: string;
  subtitle: string;
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
  accent: VehicleAccent;
  status: string;
  eta: string;
  margin: string;
  emoji: string;
};

export type Ferry = {
  id: string;
  name: string;
  status: string;
  description: string;
  emoji: string;
};

export type ChecklistSection = {
  id: string;
  title: string;
  description: string;
};

export type ChecklistItem = {
  id: string;
  title: string;
  helperText: string;
  sectionId: ChecklistSection["id"];
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
  name: "Bald Head Ferry Quest",
  subtitle:
    "A phone-friendly travel board for getting the family from packed cars to island arrival without losing the plot.",
  location: "Bald Head Island",
  ferryDepartureTime: "4:00 PM",
  ferryDepartureDateTime: "2026-05-13T16:00:00",
  targetArrivalTime: "1:15 PM",
  questStatus: "Plan Ready",
  currentStepId: "drive",
  marinaName: "Deep Point Marina",
  marinaAddress: "1301 Ferry Rd SE, Southport, NC",
  parkingReminder: "Unload luggage at the terminal first, then park.",
};

export const tripProgressSteps: TripProgressStep[] = [
  {
    id: "pack",
    label: "Prep",
    description: "Tickets, tram details, bags, food, and confirmations.",
  },
  {
    id: "drive",
    label: "Drive",
    description: "Head toward Southport with a real arrival buffer.",
  },
  {
    id: "arrive",
    label: "Unload",
    description: "Pull into Deep Point Marina and get bags to the terminal.",
  },
  {
    id: "park",
    label: "Park",
    description: "Move vehicles after luggage is handled.",
  },
  {
    id: "board",
    label: "Board",
    description: "Keep tickets, carry-ons, and the crew together.",
  },
  {
    id: "island",
    label: "Island",
    description: "Arrive, collect bags, and connect with the tram plan.",
  },
];

export const vehicles: CrewVehicle[] = [
  {
    id: "clay-crew",
    name: "Dragon Wagon",
    crew: "Clay Crew",
    accent: "sky",
    status: "Deep Point bound",
    eta: "1:08 PM",
    margin: "52 min buffer",
    emoji: "🐉",
  },
  {
    id: "hampton-crew",
    name: "Seashell Shuttle",
    crew: "Hampton Crew",
    accent: "pink",
    status: "Deep Point bound",
    eta: "12:58 PM",
    margin: "62 min buffer",
    emoji: "🐚",
  },
];

export const ferries: Ferry[] = [
  {
    id: "sans-souci",
    name: "Sans Souci",
    status: "Fleet note",
    description: "One of the ferries you may see on the Bald Head crossing.",
    emoji: "⛴️",
  },
  {
    id: "adventure",
    name: "Adventure",
    status: "Fleet note",
    description: "Actual vessel assignments can change, so treat this as a reference.",
    emoji: "🌊",
  },
  {
    id: "patriot",
    name: "Patriot",
    status: "Fleet note",
    description: "Use official ferry updates for current operations and timing.",
    emoji: "⚓",
  },
  {
    id: "ranger",
    name: "Ranger",
    status: "Fleet note",
    description: "A familiar name for the trip board, not a live vessel tracker.",
    emoji: "🧭",
  },
];

export const checklistSections: ChecklistSection[] = [
  {
    id: "before-leaving",
    title: "Before Leaving",
    description: "Handle the details that are easiest to fix at home.",
  },
  {
    id: "deep-point-arrival",
    title: "Arrival at Deep Point Marina",
    description: "Unload first, then park and regroup at the terminal.",
  },
  {
    id: "boarding",
    title: "Boarding",
    description: "Keep the crew, tickets, and carry-ons moving together.",
  },
  {
    id: "island-arrival",
    title: "Arrival on Bald Head Island",
    description: "Collect luggage and connect with the tram plan.",
  },
];

export const checklistItems: ChecklistItem[] = [
  {
    id: "confirm-ferry-tickets",
    title: "Confirm ferry tickets",
    helperText: "Check the official reservation details and departure time.",
    sectionId: "before-leaving",
    progressStepId: "pack",
  },
  {
    id: "confirm-tram-reservation",
    title: "Confirm tram reservation if applicable",
    helperText: "Keep the tram confirmation with the ferry reservation info.",
    sectionId: "before-leaving",
    progressStepId: "pack",
  },
  {
    id: "tag-luggage",
    title: "Tag every checked bag",
    helperText: "Use names or crew labels so bags are easy to spot later.",
    sectionId: "before-leaving",
    progressStepId: "pack",
  },
  {
    id: "pack-cooler",
    title: "Pack cooler",
    helperText: "Load cold items last and keep day-of snacks reachable.",
    sectionId: "before-leaving",
    progressStepId: "pack",
  },
  {
    id: "load-groceries",
    title: "Load groceries and pantry bags",
    helperText: "Do one last look for the items that should not stay in the kitchen.",
    sectionId: "before-leaving",
    progressStepId: "pack",
  },
  {
    id: "save-reservation-info",
    title: "Save reservation and contact info",
    helperText: "Keep confirmations, contact numbers, and IDs easy to reach.",
    sectionId: "before-leaving",
    progressStepId: "pack",
  },
  {
    id: "arrive-deep-point",
    title: "Arrive at Deep Point Marina",
    helperText: "Aim for enough buffer to unload, park, and handle surprises.",
    sectionId: "deep-point-arrival",
    progressStepId: "arrive",
  },
  {
    id: "unload-luggage-terminal",
    title: "Unload luggage at terminal",
    helperText: "Drop tagged bags before moving vehicles to parking.",
    sectionId: "deep-point-arrival",
    progressStepId: "arrive",
  },
  {
    id: "park-vehicle",
    title: "Park vehicle",
    helperText: "Return to the terminal with keys, wallet, tickets, and carry-ons.",
    sectionId: "deep-point-arrival",
    progressStepId: "park",
  },
  {
    id: "bathroom-water-check",
    title: "Bathroom and water check",
    helperText: "Take care of the small needs before the boarding line matters.",
    sectionId: "boarding",
    progressStepId: "board",
  },
  {
    id: "board-ferry",
    title: "Board ferry",
    helperText: "Keep the group together and follow posted boarding instructions.",
    sectionId: "boarding",
    progressStepId: "board",
  },
  {
    id: "arrive-bald-head-island",
    title: "Arrive on Bald Head Island",
    helperText: "Gather the crew before moving toward luggage or tram pickup.",
    sectionId: "island-arrival",
    progressStepId: "island",
  },
  {
    id: "collect-luggage-tram",
    title: "Collect luggage and confirm tram plan",
    helperText: "Match bags to crews and confirm the next stop before leaving the dock area.",
    sectionId: "island-arrival",
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
    title: "First ferry sighting",
    description: "Spot a ferry from the car or terminal area without leaving the group.",
    category: "Travel",
    points: 10,
    teamAssignment: "all",
  },
  {
    id: "deep-point-team-photo",
    title: "Deep Point team photo",
    description: "Take one quick crew photo after arrival, clear of lines and walkways.",
    category: "Photo",
    points: 15,
    teamAssignment: "all",
  },
  {
    id: "terminal-sign-find",
    title: "Find the Bald Head Island sign",
    description: "Spot an official sign or route marker at the terminal.",
    category: "Travel",
    points: 10,
    teamAssignment: "all",
  },
  {
    id: "luggage-tag-sweep",
    title: "Luggage tag sweep",
    description: "Confirm every checked bag has a visible family or crew label.",
    category: "Travel",
    points: 10,
    teamAssignment: "all",
  },
  {
    id: "ferry-window-seat",
    title: "Best ferry view",
    description: "Find a good view once seated or settled, without blocking anyone.",
    category: "Ferry",
    points: 10,
    teamAssignment: "all",
  },
  {
    id: "cape-fear-crossing-photo",
    title: "Cape Fear crossing photo",
    description: "Take one safe ferry-ride photo of the water, wake, or shoreline.",
    category: "Photo",
    points: 15,
    teamAssignment: "all",
  },
  {
    id: "ferry-trivia",
    title: "Ferry trivia round",
    description: "Ask one family-friendly ferry or island question and get an answer.",
    category: "Ferry",
    points: 15,
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
    id: "first-golf-cart",
    title: "First golf cart sighting",
    description: "Call out the first golf cart after arriving on the island.",
    category: "Island",
    points: 10,
    teamAssignment: "all",
  },
  {
    id: "find-seashell",
    title: "Find a beach-worthy shell",
    description: "Any safe, allowed shell counts once the family approves it.",
    category: "Island",
    points: 10,
    teamAssignment: "all",
  },
  {
    id: "island-arrival-selfie",
    title: "Island arrival selfie",
    description: "Take one arrival photo after the group is safely off the ferry.",
    category: "Photo",
    points: 15,
    teamAssignment: "all",
  },
  {
    id: "no-complaints-before-boarding",
    title: "No complaints before boarding",
    description: "Make it onto the ferry without a major travel-day meltdown.",
    category: "Bonus",
    points: 20,
    teamAssignment: "all",
  },
  {
    id: "dragon-wagon-cooler-check",
    title: "Clay Crew cooler check",
    description: "Clay Crew confirms drinks, snacks, and cold items are loaded.",
    category: "Travel",
    points: 10,
    teamAssignment: "clay-crew",
  },
  {
    id: "seashell-shuttle-luggage-check",
    title: "Hampton Crew luggage check",
    description: "Hampton Crew confirms every bag has a visible tag.",
    category: "Travel",
    points: 10,
    teamAssignment: "hampton-crew",
  },
  {
    id: "kind-traveler-bonus",
    title: "Kind traveler bonus",
    description: "One point-worthy moment of patience, helping, or keeping things calm.",
    category: "Bonus",
    points: 10,
    teamAssignment: "all",
  },
];

export const travelReminders: TravelReminder[] = [
  {
    id: "verify-official-schedule",
    title: "Verify official ferry time and status before leaving",
    description:
      "This app is a local checklist, not a live ferry tracker or official schedule.",
  },
  {
    id: "confirm-ferry-tickets",
    title: "Confirm ferry tickets",
    description: "Check the official reservation and keep the confirmation handy.",
  },
  {
    id: "confirm-tram-reservation",
    title: "Confirm tram reservation if applicable",
    description: "Make sure arrival-side transportation details are easy to find.",
  },
  {
    id: "remember-luggage-handling",
    title: "Pack and tag luggage before the terminal rush",
    description: "Tagged bags are easier to hand off, collect, and match to each crew.",
  },
  {
    id: "arrive-early",
    title: "Arrive early enough to unload and park",
    description: "Build in time for luggage, parking, bathroom stops, and regrouping.",
  },
  {
    id: "keep-info-handy",
    title: "Keep reservation and contact info handy",
    description: "Phones, IDs, confirmations, and key contacts should stay reachable.",
  },
  {
    id: "deep-point-departure",
    title: "Deep Point Marina is the mainland departure point",
    description: "Use the Southport marina address for the final driving leg.",
  },
];

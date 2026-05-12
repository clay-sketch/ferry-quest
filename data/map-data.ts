export type MapCoordinate = [number, number];

export type FerryMapMarkerType = "terminal" | "landing" | "village" | "poi";

export type FerryMapMarker = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  coordinates: MapCoordinate;
  type: FerryMapMarkerType;
};

export type FerryRoute = {
  id: string;
  label: string;
  description: string;
  coordinates: MapCoordinate[];
};

export const ferryMapConfig = {
  center: [33.904, -77.998] as MapCoordinate,
  zoom: 12,
  minZoom: 10,
  maxZoom: 17,
};

export const ferryMapMarkers: FerryMapMarker[] = [
  {
    id: "deep-point-marina",
    label: "Deep Point Marina",
    shortLabel: "DP",
    description: "Mainland ferry terminal in Southport.",
    coordinates: [33.9312, -77.9962],
    type: "terminal",
  },
  {
    id: "bald-head-island-ferry-landing",
    label: "Bald Head Island Ferry Landing",
    shortLabel: "BH",
    description: "Island arrival point near the harbor.",
    coordinates: [33.876292, -78.000961],
    type: "landing",
  },
  {
    id: "bald-head-island-village",
    label: "Bald Head Island Village Area",
    shortLabel: "V",
    description: "Village area near the marina and island services.",
    coordinates: [33.8759, -77.9983],
    type: "village",
  },
  {
    id: "old-baldy",
    label: "Old Baldy",
    shortLabel: "OB",
    description: "Project quest point of interest.",
    coordinates: [33.8735, -78.0003],
    type: "poi",
  },
];

export const ferryRoute: FerryRoute = {
  id: "deep-point-to-bald-head-island",
  label: "Deep Point Marina to Bald Head Island Ferry Landing",
  description: "Ferry route shown for reference.",
  coordinates: [
    [33.9312, -77.9962],
    [33.905, -77.998],
    [33.876292, -78.000961],
  ],
};

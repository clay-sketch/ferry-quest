"use client";

import { useEffect, useRef, useState } from "react";
import type * as Leaflet from "leaflet";
import {
  ferryMapConfig,
  ferryMapMarkers,
  ferryRoute,
  type FerryMapMarker,
} from "@/data/map-data";

type MapLoadState = "loading" | "ready" | "error";

const markerTypeLabel: Record<FerryMapMarker["type"], string> = {
  terminal: "Mainland terminal",
  landing: "Island landing",
  village: "Village area",
  poi: "Quest POI",
};

const markerIconAnchors: Record<FerryMapMarker["type"], Leaflet.PointTuple> = {
  terminal: [18, 18],
  landing: [18, 46],
  village: [-8, 18],
  poi: [44, 18],
};

function createMarkerIcon(L: typeof Leaflet, marker: FerryMapMarker) {
  return L.divIcon({
    className: `ferry-map-marker ferry-map-marker--${marker.type}`,
    html: `<span class="ferry-map-marker__label">${marker.shortLabel}</span>`,
    iconAnchor: markerIconAnchors[marker.type],
    iconSize: [36, 36],
    popupAnchor: [0, -18],
  });
}

function createPopupContent(marker: FerryMapMarker) {
  const wrapper = document.createElement("div");
  wrapper.className = "space-y-1";

  const title = document.createElement("p");
  title.className = "font-bold text-slate-950";
  title.textContent = marker.label;

  const description = document.createElement("p");
  description.className = "text-sm text-slate-600";
  description.textContent = marker.description;

  wrapper.append(title, description);
  return wrapper;
}

export function FerryRouteMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const [mapLoadState, setMapLoadState] = useState<MapLoadState>("loading");

  useEffect(() => {
    let isMounted = true;

    async function loadMap() {
      if (!containerRef.current || mapRef.current) {
        return;
      }

      try {
        const L = await import("leaflet");

        if (!isMounted || !containerRef.current) {
          return;
        }

        const map = L.map(containerRef.current, {
          center: ferryMapConfig.center,
          minZoom: ferryMapConfig.minZoom,
          scrollWheelZoom: false,
          zoom: ferryMapConfig.zoom,
          zoomControl: true,
        });

        mapRef.current = map;

        const tileLayer = L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: ferryMapConfig.maxZoom,
          },
        );

        tileLayer.once("tileerror", () => {
          if (isMounted) {
            setMapLoadState("error");
          }
        });

        tileLayer.addTo(map);

        const routeLine = L.polyline(ferryRoute.coordinates, {
          color: "#0284c7",
          dashArray: "8 10",
          lineCap: "round",
          opacity: 0.9,
          weight: 5,
        }).addTo(map);

        routeLine.bindTooltip(ferryRoute.description, {
          direction: "top",
          sticky: true,
        });

        const routeBounds = L.latLngBounds(ferryRoute.coordinates);

        ferryMapMarkers.forEach((marker) => {
          routeBounds.extend(marker.coordinates);

          L.marker(marker.coordinates, {
            icon: createMarkerIcon(L, marker),
            title: marker.label,
          })
            .bindPopup(createPopupContent(marker))
            .addTo(map);
        });

        map.fitBounds(routeBounds, {
          maxZoom: ferryMapConfig.zoom,
          padding: [32, 32],
        });

        map.whenReady(() => {
          if (isMounted) {
            setMapLoadState("ready");
          }
        });
      } catch {
        if (isMounted) {
          setMapLoadState("error");
        }
      }
    }

    loadMap();

    return () => {
      isMounted = false;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Ferry Route Map</h2>
          <p className="mt-1 text-slate-600">{ferryRoute.description}</p>
        </div>

        <span className="self-start rounded-full bg-sky-100 px-3 py-1 text-sm font-semibold text-sky-800">
          Static reference
        </span>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="relative h-[26rem] overflow-hidden rounded-3xl border border-sky-200 bg-sky-50 sm:h-[30rem]">
          <div
            ref={containerRef}
            aria-label="Interactive map showing the Bald Head Island ferry route"
            className="h-full w-full"
          />

          {mapLoadState !== "ready" ? (
            <div className="absolute inset-0 z-[500] flex items-center justify-center bg-sky-50/90 p-6 text-center backdrop-blur-sm">
              <div>
                <p className="font-bold text-slate-950">
                  {mapLoadState === "loading"
                    ? "Loading map"
                    : "Map tiles are unavailable"}
                </p>
                <p className="mt-2 max-w-sm text-sm text-slate-600">
                  {mapLoadState === "loading"
                    ? "The ferry route and reference markers are loading."
                    : "The marker list remains available. Try again when the network is available."}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col justify-between gap-5">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Reference Points
            </h3>
            <div className="mt-3 grid gap-3">
              {ferryMapMarkers.map((marker) => (
                <div key={marker.id} className="flex gap-3">
                  <span
                    className={`ferry-map-list-marker ferry-map-list-marker--${marker.type}`}
                    aria-hidden="true"
                  >
                    {marker.shortLabel}
                  </span>
                  <div>
                    <p className="font-bold text-slate-950">{marker.label}</p>
                    <p className="text-sm text-slate-600">
                      {markerTypeLabel[marker.type]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="rounded-2xl bg-sky-50 p-4 text-sm font-medium text-sky-900">
            Static route geometry only. Verify ferry tickets, schedule, and
            terminal instructions with official sources before travel.
          </p>
        </div>
      </div>
    </section>
  );
}

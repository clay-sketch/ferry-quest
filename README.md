# Ferry Quest

Ferry Quest is a local, static Next.js app for a Bald Head Island family ferry
travel day. It keeps the trip overview, critical reminders, checklist, family
quest board, crew vehicles, and ferry notes in one phone-friendly dashboard.

The app does not use a backend, database, auth, external APIs, scraping, or live
ferry-status integrations. Verify ferry times, tickets, tram reservations, and
travel advisories with official sources before leaving.

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Editing Trip Content

Trip-specific content lives in [data/trip-data.ts](data/trip-data.ts):

- `trip`: main trip title, ferry time, arrival target, marina details, and status
- `tripProgressSteps`: overview progress labels and descriptions
- `vehicles`: crew/team vehicle cards and map marker positions
- `ferries`: static ferry fleet notes
- `checklistItems`: travel-day checklist defaults
- `questItems`: quest board challenges, categories, points, and team assignment
- `travelReminders`: critical static reminders shown in the Info section

Checklist and quest completion are stored only in the browser with
`localStorage`, so progress is per device and can be reset from the app.

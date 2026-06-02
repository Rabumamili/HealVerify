# HealVerify

A **frontend-only** healthcare license verification portal for government regulatory officers. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- **Mock authentication** with local storage (Super Admin & Officer roles)
- **Dashboard** with statistics cards and Recharts visualizations
- **Applications** list with filters, search, and pagination
- **Application details** with document placeholders and verify/reject workflow
- **Officer management** (Super Admin only)
- **Settings** page (demo UI)

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide Icons
- Recharts
- Sonner (toasts)

## Getting Started

```bash
cd healverify
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo Accounts

| Role         | Email                   | Password    |
| ------------ | ----------------------- | ----------- |
| Super Admin  | admin@healverify.gov    | admin123    |
| Officer      | officer@healverify.gov  | officer123  |

## Project Structure

```
src/
├── app/              # Next.js pages (no API routes)
├── components/       # UI, layout, feature components
├── context/          # Global app state (auth + mock data)
├── data/             # Mock seed data
├── hooks/            # Custom hooks
├── lib/              # Utilities & constants
└── types/            # TypeScript types
```

## Notes

- No backend, database, or API routes
- State persists in `localStorage` for demo purposes
- Designed for easy backend integration later (replace context methods with API calls)

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

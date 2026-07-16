# Ghost of Yōtei — 100% Completion Guide

An interactive 100% completion guide for *Ghost of Yōtei*, built as both a **web app** and a **mobile app**. Covers all 119 quests, collectibles, activities, bounties, and trophies — with progress tracking that saves locally so you never lose your place.

---

## Apps

### 🌐 Web Guide (`artifacts/guide-presentation`)
A scrollable single-page guide with a fixed sidebar navigation. Covers every section needed for 100% completion:

- All 119 quests (Main Story, Side Quests, Errands, Haiku, Mythic Tales)
- Collectibles (Records, Artifacts, Flowers, Banners)
- Activities (Hot Springs, Bamboo Strikes, Shrine Climbs, Duels, Bounties)
- Boss fights, upgrades, and trophy checklist
- Per-item progress tracking saved to your browser

### 📱 Mobile Guide (`artifacts/mobile`)
An Expo (React Native) companion app with the same content, optimised for phone use while playing.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Monorepo | pnpm workspaces |
| Language | TypeScript 5.9, Node.js 24 |
| Web app | React + Vite |
| Mobile app | Expo (React Native) |
| Styling | Tailwind CSS + shadcn/ui |
| Progress storage | localStorage (web) |
| API | Express 5 |

---

## Project Structure

```
/
├── artifacts/
│   ├── guide-presentation/      # Web guide (React + Vite)
│   │   └── src/
│   │       ├── App.tsx                  # Full site shell, all sections
│   │       ├── data/quests.ts           # All 119 quests + constants
│   │       ├── components/guide-ui.tsx  # Shared UI primitives
│   │       └── hooks/use-progress.ts   # localStorage progress hook
│   ├── mobile/                  # Expo mobile app
│   ├── api-server/              # Express API server
│   └── yotei-guide-deck/        # Slide deck (dev reference)
└── packages/                    # Shared libraries
```

---

## Running Locally

**Prerequisites:** Node.js 24, pnpm 9+

```bash
# Install dependencies
pnpm install

# Run the web guide
pnpm --filter @workspace/guide-presentation run dev

# Run the mobile app
pnpm --filter @workspace/mobile run dev

# Run the API server
pnpm --filter @workspace/api-server run dev
```

---

## Progress Tracking

The web guide tracks your completion progress item-by-item using `localStorage` — no account required. Tick off quests, collectibles, and activities as you go and your progress is saved automatically in your browser.

---

## Coverage

| Category | Count |
|----------|-------|
| Main Story Quests | Included |
| Side Quests | Included |
| Errands | Included |
| Haiku | Included |
| Mythic Tales | Included |
| **Total Quests** | **119** |
| Collectible types | 4 |
| Activity types | 5+ |
| Bounties | 31 |

---

*Built as a fan guide. Ghost of Yōtei is a trademark of Sony Interactive Entertainment.*

# Ghost of Yotei Guide — Mobile App

A 100% completion guide for **Ghost of Yotei** (PS5), built with Expo Router for iOS and Android.

## What it does

- Tracks progress across all 119 quests (Main Story, Side Tales, Bounties, Mythic Tales, Sensei Tales, Endgame)
- Tracks 319 collectibles and 54 trophies
- Persists progress locally with AsyncStorage
- Auto-backs up progress to device document storage (iCloud / Google Drive)
- Manual export/import via JSON for cross-device transfers
- Quest filter/search by region, status, and keyword

## Key screens

| Tab | File | Purpose |
|-----|------|---------|
| Dashboard | `app/(tabs)/index.tsx` | Overall % completion, recent activity |
| Quests | `app/(tabs)/categories.tsx` | Category list (Main Story, Bounties, etc.) |
| Quest category | `app/category/[id].tsx` | Per-category quest list with filters |
| Quest detail | `app/quest/[id].tsx` | Walkthrough, tasks, tips, mark complete |
| Collectibles | `app/(tabs)/collectibles.tsx` | Collectible list with completion tracking |
| Trophies | `app/(tabs)/trophies.tsx` | Trophy list |
| Progress | `app/(tabs)/progress.tsx` | Charts and breakdown by category/region |
| Settings | `app/(tabs)/settings.tsx` | Export, import, reset, auto-backup controls |

## Data files

| File | Contents |
|------|---------|
| `data/quests.ts` | 119 quests — id, title, region, category, tasks, walkthrough, tips |
| `data/collectibles.ts` | 319 collectibles — id, name, region, category, hint |
| `data/trophies.ts` | 54 trophies — id, name, description, type, rarity |
| `data/categories.ts` | Quest category definitions and labels |

## Running locally

```bash
# From the workspace root
pnpm --filter @workspace/mobile run dev
```

Then scan the QR code with **Expo Go** on your phone, or press `i` for iOS Simulator / `a` for Android Emulator.

## Building for stores

EAS Build is configured in `eas.json`:

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in to Expo
eas login

# Development build (simulator)
eas build --profile development --platform ios

# Production build
eas build --profile production --platform all
```

## Project structure

```
artifacts/mobile/
├── app/
│   ├── (tabs)/          # Tab screens
│   ├── category/        # Quest category drill-down
│   └── quest/           # Quest detail
├── assets/images/       # icon.png, splash assets
├── components/          # Shared UI components
├── context/             # ProgressContext (state + backup)
├── data/                # Static game data (quests, collectibles, trophies)
├── hooks/               # useColors, useProgress, etc.
├── app.json             # Expo config (slug, bundle IDs, adaptive icon)
├── eas.json             # EAS Build profiles
└── package.json
```

## Build identifiers

- **iOS bundle ID**: `com.ghostofyoteiguide.app`
- **Android package**: `com.ghostofyoteiguide.app`
- **EAS slug**: `ghost-of-yotei-guide`
- **App version**: `1.0.0`

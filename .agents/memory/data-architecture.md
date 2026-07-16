---
name: Data architecture — Ghost of Yōtei guide
description: Structure and conventions for the guide-presentation data layer after the architecture rebuild.
---

# Data Architecture

## Rule
All counts, totals, filter lists, and per-region breakdowns must be derived from the data arrays — never hardcoded inline in components or the NAV config.

**Why:** Previous version had hardcoded totals (319, 89, "6 Regions") that disagreed with each other. Data files are now the single source of truth.

**How to apply:** Import from `src/data/` files. Use `COLLECTIBLE_TOTAL`, `ACTIVITY_TOTAL`, `ALL_COLLECTIBLE_IDS`, `ALL_ACTIVITY_IDS`, `COLLECTIBLES_BY_REGION`, `ACTIVITIES_BY_REGION` for any aggregate or regional computation.

## File layout
- `src/data/schema.ts` — shared TypeScript types (CollectibleItem, ActivityItem, Weapon, Armour, Charm, Region, RegionName)
- `src/data/regions.ts` — 6 confirmed regions with color, abbr, sub-areas; exports `REGIONS` array and `REGION_MAP`
- `src/data/collectibles.ts` — 319 items in 8 categories; exports `COLLECTIBLE_CATEGORIES`, `COLLECTIBLE_TOTAL`, `ALL_COLLECTIBLE_IDS`, `COLLECTIBLES_BY_REGION`
- `src/data/activities.ts` — 89 items in 6 categories; exports `ACTIVITY_CATEGORIES`, `ACTIVITY_TOTAL`, `ALL_ACTIVITY_IDS`, `ACTIVITIES_BY_REGION`
- `src/data/equipment.ts` — WEAPONS, ARMOUR, CHARMS arrays
- `src/data/quests.ts` — still holds palette constants (GOLD, IMGS, etc.) + 119 quest arrays; do not move palette without updating guide-ui.tsx imports

## ID stability
Collectible IDs: `coll_{key}_{n}` (1-based). Activity IDs: `act_{key}_{n}` (1-based). These match existing localStorage keys — do NOT change the format without a migration.

## Placeholder convention
All collectible/activity items have `placeholder: true, verified: false` until Task #100 fills in real names. Equipment entries that are unverified show an "⚠ unverified" badge in the UI via the `placeholder` flag on each record.

## Region distribution
Collectible and activity items are distributed across regions in the generator functions inside each data file. Per-region totals (e.g., 57 collectibles in Yotei Grasslands) come from this distribution — they differ from the old hardcoded Progress section numbers (which were fake and inconsistent).

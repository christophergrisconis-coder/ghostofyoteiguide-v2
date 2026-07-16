---
name: Verified data rebuild
description: What changed in the data layer when real game data replaced all placeholder categories
---

## Summary
Task #106 replaced the entire collectible/activity data model with verified game data.

## Key rules
- Collectible ID format `coll_{key}_{n}` and activity ID format `act_{key}_{n}` are stable — never change them or localStorage progress breaks.
- All totals derive from data array lengths; nothing is hardcoded in components or NAV.
- Palette constants (GOLD, IMGS, REGION_COLOR, ACT_COLOR) live in `quests.ts` and are imported by `guide-ui.tsx` — do not move them.
- Quest data (119 quests in quests.ts) is complete and must not be altered.

## Current verified counts (as of 2026-07-16)
- Collectibles: 229 total across 13 categories
  - Fox Dens: 11 ✅ (names + charm rewards verified)
  - Ainu Items: 30 ✅ (names verified; per-item regions still placeholder)
  - Zeni Hajiki: 8 ✅ (locations, rewards, requirements verified)
  - All other categories: counts verified, individual names placeholder
- Activities: 93 total across 8 categories
  - Bounties: 31 ✅ (all names verified by region)
  - All other categories: counts verified, names placeholder
- Resources: 15 (all verified)
- Merchants: 15 (names verified; 10 of 15 sub-areas placeholder)

## Old categories removed (they do not exist in the game)
- Clan Trophies (68) — does not exist
- Ancient Maps (55) — does not exist
- Ainu Sacred Sites (80) — replaced by Ainu Items (30)
- Sumi-e Paintings count was 60 — corrected to 18
- Dueling Circles (25) — replaced by Dueling Trees (6)
- Haiku Stations (20) — replaced by Shamisen Songs (8)
- Liberated Settlements (18) — replaced by Yotei Six Camps (22)
- Animal Sanctuaries (12) — does not exist
- Vanity Challenges (8) — does not exist

## New data files created
- `artifacts/guide-presentation/src/data/resources.ts` — 15 Resource records
- `artifacts/guide-presentation/src/data/merchants.ts` — 15 Merchant records

## Schema additions (schema.ts)
- CollectibleItem: added `mapMarked?`, `missable?`, `reward?`, `requirement?`
- CollectibleCategory: added `catNote?` (shown in expanded checklist header)
- ActivityItem: added `reward?`
- ActivityCategory: added `catNote?`
- New: Resource interface, Merchant interface, ResourceRarity type, MerchantVendorType type

**Why:** The original data was entirely invented and contradicted the real game. This rebuild makes the guide accurate.

import type { ActivityCategory, ActivityItem, RegionName } from './schema';

// ── Activity item generator ────────────────────────────────────────────────────
// IDs use the stable format act_{key}_{n} to preserve existing localStorage
// progress data. Items are distributed across regions; placeholder: true until
// Task #100 verifies individual names and sub-areas against the shipped game.

function generateActivityItems(
  key: string,
  baseName: string,
  regionDistribution: [RegionName, number][],
): ActivityItem[] {
  const items: ActivityItem[] = [];
  let globalIndex = 1;
  for (const [region, count] of regionDistribution) {
    for (let i = 0; i < count; i++) {
      items.push({
        id: `act_${key}_${globalIndex}`,
        name: `${baseName} #${String(globalIndex).padStart(2, '0')}`,
        region,
        placeholder: true,
        verified: false,
      });
      globalIndex++;
    }
  }
  return items;
}

// ── Activity categories ────────────────────────────────────────────────────────
// Counts per category confirmed from PlayStation official materials.
// Region distributions are approximate placeholders.
//
// ⚠ ALL INDIVIDUAL ITEM NAMES AND SUB-AREAS ARE PLACEHOLDER.
// They use the format "Category #NN" until real in-game names are verified.
//
// Open questions before any entry can be set verified: true:
//   Q-ACT-1: Names and difficulty ratings of all 25 Dueling Circle opponents;
//             how many Technique Points each awards
//   Q-ACT-2: Exact viewpoint names for all 20 Haiku Stations;
//             which cosmetic dye each rewards
//   Q-ACT-3: Exact names of all 18 liberated settlements;
//             what merchant/quest triggers each liberation unlocks
//   Q-ACT-4: Each merchant's name, exact location, and item price list (Mon)
//   Q-ACT-5: Animal types and exact locations of all 12 Animal Sanctuaries;
//             Spirit Growth bonus value per visit
//   Q-ACT-6: Combat style required for each of the 8 Vanity Challenges;
//             which cosmetic armour piece each rewards
//
// See VERIFICATION_REPORT.md for the full open-questions list.

export const ACTIVITY_CATEGORIES: ActivityCategory[] = [
  {
    key: 'dueling',
    name: 'Dueling Circles',
    icon: '⚔️',
    desc: 'Challenge wandering swordsmen to earn Technique Points',
    color: '#C9A84C',
    items: generateActivityItems('dueling', 'Dueling Circle', [
      ['Yotei Grasslands', 5],
      ['Ishikari Plain',   4],
      ['Teshio Ridge',     4],
      ['Tokachi Range',    4],
      ['Nayoro Wilds',     4],
      ['Oshima Coast',     4],
    ]),
  },
  {
    key: 'haiku',
    name: 'Haiku Stations',
    icon: '🎋',
    desc: 'Compose haiku at scenic viewpoints — rewards cosmetic dyes',
    color: '#4A9B8E',
    items: generateActivityItems('haiku', 'Haiku Station', [
      ['Yotei Grasslands', 4],
      ['Ishikari Plain',   3],
      ['Teshio Ridge',     3],
      ['Tokachi Range',    4],
      ['Nayoro Wilds',     3],
      ['Oshima Coast',     3],
    ]),
  },
  {
    key: 'settlements',
    name: 'Liberated Settlements',
    icon: '🏘️',
    desc: 'Free each village from Yotei Six occupation — unlocks merchants',
    color: '#4A9B6F',
    items: generateActivityItems('settlements', 'Settlement', [
      ['Yotei Grasslands', 3],
      ['Ishikari Plain',   3],
      ['Teshio Ridge',     3],
      ['Tokachi Range',    3],
      ['Nayoro Wilds',     3],
      ['Oshima Coast',     3],
    ]),
  },
  {
    key: 'merchants',
    name: 'Merchant Stalls',
    icon: '🛒',
    desc: 'Craft material vendors — stock resets after each major region',
    color: '#B8860B',
    items: generateActivityItems('merchants', 'Merchant Stall', [
      ['Yotei Grasslands', 1],
      ['Ishikari Plain',   1],
      ['Teshio Ridge',     1],
      ['Tokachi Range',    1],
      ['Nayoro Wilds',     1],
      ['Oshima Coast',     1],
    ]),
  },
  {
    key: 'sanctuaries',
    name: 'Animal Sanctuaries',
    icon: '🐾',
    desc: 'Pet and photograph wildlife for Spirit Growth bonus',
    color: '#7B68EE',
    items: generateActivityItems('sanctuaries', 'Animal Sanctuary', [
      ['Yotei Grasslands', 2],
      ['Ishikari Plain',   2],
      ['Teshio Ridge',     2],
      ['Tokachi Range',    2],
      ['Nayoro Wilds',     2],
      ['Oshima Coast',     2],
    ]),
  },
  {
    key: 'vanity',
    name: 'Vanity Challenges',
    icon: '🗡️',
    desc: 'Complete combat style challenges for cosmetic armour pieces',
    color: '#4682B4',
    items: generateActivityItems('vanity', 'Vanity Challenge', [
      ['Yotei Grasslands', 2],
      ['Ishikari Plain',   1],
      ['Teshio Ridge',     1],
      ['Tokachi Range',    1],
      ['Nayoro Wilds',     2],
      ['Oshima Coast',     1],
    ]),
  },
];

// ── Derived totals ─────────────────────────────────────────────────────────────

/** Total activity count derived from data — currently 89 */
export const ACTIVITY_TOTAL = ACTIVITY_CATEGORIES.reduce(
  (sum, cat) => sum + cat.items.length, 0,
);

/** All activity IDs in a flat array (for bulk progress checks) */
export const ALL_ACTIVITY_IDS = ACTIVITY_CATEGORIES.flatMap(
  cat => cat.items.map(item => item.id),
);

/** Per-region activity ID map — derived from data, never hardcoded */
export const ACTIVITIES_BY_REGION = ACTIVITY_CATEGORIES.flatMap(c => c.items).reduce(
  (map, item) => {
    if (!map[item.region]) map[item.region] = [];
    map[item.region].push(item.id);
    return map;
  },
  {} as Record<string, string[]>,
);

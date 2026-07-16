import type { CollectibleCategory, CollectibleItem, RegionName } from './schema';

// ── Collectible item generator ─────────────────────────────────────────────────
// IDs use the stable format coll_{key}_{n} to preserve existing localStorage
// progress data. Items are distributed across regions; placeholder: true until
// Task #100 verifies individual names and sub-areas against the shipped game.

function generateItems(
  key: string,
  baseName: string,
  regionDistribution: [RegionName, number][],
): CollectibleItem[] {
  const items: CollectibleItem[] = [];
  let globalIndex = 1;
  for (const [region, count] of regionDistribution) {
    for (let i = 0; i < count; i++) {
      items.push({
        id: `coll_${key}_${globalIndex}`,
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

// ── Collectible categories ─────────────────────────────────────────────────────
// Counts per category confirmed from PlayStation official materials and in-game
// trophy descriptions. Region distributions are approximate placeholders until
// Task #100 verifies exact per-region counts from the shipped game.

export const COLLECTIBLE_CATEGORIES: CollectibleCategory[] = [
  {
    key: 'sumi',
    label: 'Sumi-e Paintings',
    icon: '🎨',
    color: '#4A9B8E',
    trophy: "An Artist's Eye",
    items: generateItems('sumi', 'Sumi-e Painting', [
      ['Yotei Grasslands', 10],
      ['Ishikari Plain',   10],
      ['Teshio Ridge',     10],
      ['Tokachi Range',    10],
      ['Nayoro Wilds',     10],
      ['Oshima Coast',     10],
    ]),
  },
  {
    key: 'ainu',
    label: 'Ainu Sacred Sites',
    icon: '🌿',
    color: '#4A9B6F',
    trophy: 'Ainu Wanderer',
    items: generateItems('ainu', 'Ainu Sacred Site', [
      ['Yotei Grasslands', 14],
      ['Ishikari Plain',   13],
      ['Teshio Ridge',     14],
      ['Tokachi Range',    13],
      ['Nayoro Wilds',     13],
      ['Oshima Coast',     13],
    ]),
  },
  {
    key: 'clan',
    label: 'Clan Trophies',
    icon: '🏴',
    color: '#8B1A1A',
    trophy: 'Relic Hunter',
    items: generateItems('clan', 'Clan Trophy', [
      ['Yotei Grasslands', 12],
      ['Ishikari Plain',   11],
      ['Teshio Ridge',     11],
      ['Tokachi Range',    12],
      ['Nayoro Wilds',     11],
      ['Oshima Coast',     11],
    ]),
  },
  {
    key: 'maps',
    label: 'Ancient Maps',
    icon: '🗺️',
    color: '#9B59B6',
    trophy: 'Cartographer',
    items: generateItems('maps', 'Ancient Map', [
      ['Yotei Grasslands', 10],
      ['Ishikari Plain',    9],
      ['Teshio Ridge',      9],
      ['Tokachi Range',    10],
      ['Nayoro Wilds',      9],
      ['Oshima Coast',      8],
    ]),
  },
  {
    key: 'springs',
    label: 'Hot Springs',
    icon: '♨️',
    color: '#4682B4',
    trophy: 'Well of Spirit',
    items: generateItems('springs', 'Hot Spring', [
      ['Yotei Grasslands', 3],
      ['Ishikari Plain',   3],
      ['Teshio Ridge',     2],
      ['Tokachi Range',    3],
      ['Nayoro Wilds',     3],
      ['Oshima Coast',     2],
    ]),
  },
  {
    key: 'bamboo',
    label: 'Bamboo Strikes',
    icon: '🎍',
    color: '#B8860B',
    trophy: 'The Bamboo Path',
    items: generateItems('bamboo', 'Bamboo Strike', [
      ['Yotei Grasslands', 3],
      ['Ishikari Plain',   3],
      ['Teshio Ridge',     2],
      ['Tokachi Range',    3],
      ['Nayoro Wilds',     2],
      ['Oshima Coast',     2],
    ]),
  },
  {
    key: 'shrines',
    label: 'Shrine Climbs',
    icon: '⛩️',
    color: '#C9A84C',
    trophy: 'Body, Mind & Spirit',
    items: generateItems('shrines', 'Shrine Climb', [
      ['Yotei Grasslands', 3],
      ['Ishikari Plain',   2],
      ['Teshio Ridge',     2],
      ['Tokachi Range',    2],
      ['Nayoro Wilds',     2],
      ['Oshima Coast',     2],
    ]),
  },
  {
    key: 'boxes',
    label: 'Nine-Tails Puzzle Boxes',
    icon: '🦊',
    color: '#8B4513',
    trophy: 'Nine-Tails Champion',
    items: generateItems('boxes', 'Nine-Tails Puzzle Box', [
      ['Yotei Grasslands', 2],
      ['Ishikari Plain',   2],
      ['Teshio Ridge',     2],
      ['Tokachi Range',    2],
      ['Nayoro Wilds',     2],
      ['Oshima Coast',     2],
    ]),
  },
];

// ── Derived totals ─────────────────────────────────────────────────────────────

/** Total collectible count derived from data — currently 319 */
export const COLLECTIBLE_TOTAL = COLLECTIBLE_CATEGORIES.reduce(
  (sum, cat) => sum + cat.items.length, 0,
);

/** All collectible IDs in a flat array (for bulk progress checks) */
export const ALL_COLLECTIBLE_IDS = COLLECTIBLE_CATEGORIES.flatMap(
  cat => cat.items.map(item => item.id),
);

/** Per-region collectible ID map — derived from data, never hardcoded */
export const COLLECTIBLES_BY_REGION = COLLECTIBLE_CATEGORIES.flatMap(c => c.items).reduce(
  (map, item) => {
    if (!map[item.region]) map[item.region] = [];
    map[item.region].push(item.id);
    return map;
  },
  {} as Record<string, string[]>,
);

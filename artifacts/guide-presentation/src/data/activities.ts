import type { ActivityCategory, ActivityItem, RegionName } from './schema';

// ── Activity item generator ────────────────────────────────────────────────────
// IDs use the stable format act_{key}_{n} to preserve existing localStorage
// progress data. Placeholder items use generated names until real in-game
// names are confirmed.

function generateActivityItems(
  key: string,
  baseName: string,
  regionDistribution: [RegionName, number][],
  extras?: Partial<ActivityItem>,
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
        ...extras,
      });
      globalIndex++;
    }
  }
  return items;
}

// ── Activity categories ────────────────────────────────────────────────────────
// All counts are verified from in-game data.
// Bounties have verified individual names sorted by region.
// All other categories use generated placeholder names pending confirmation.
//
// Equipment categories (Armor, Melee Weapons, Ranged Weapons, Quickfire Weapons)
// are tracked here as activities because they are acquired through gameplay
// rather than collected in the overworld.

export const ACTIVITY_CATEGORIES: ActivityCategory[] = [

  // ── Dueling Trees — 6 ────────────────────────────────────────────────────────
  {
    key: 'dueling',
    name: 'Dueling Trees',
    icon: '⚔️',
    desc: 'Challenge wandering swordsmen at carved wooden trees to earn Technique Points and improve your combat mastery.',
    color: '#C9A84C',
    catNote: 'Exactly 6 in total — one per region. Individual opponent names and exact locations unconfirmed.',
    items: generateActivityItems('dueling', 'Dueling Tree', [
      ['Yotei Grasslands', 1],
      ['Ishikari Plain',   1],
      ['Teshio Ridge',     1],
      ['Tokachi Range',    1],
      ['Nayoro Wilds',     1],
      ['Oshima Coast',     1],
    ]),
  },

  // ── Shamisen Songs — 8 ───────────────────────────────────────────────────────
  {
    key: 'shamisen',
    name: 'Shamisen Songs',
    icon: '🎵',
    desc: 'Listen to shamisen musicians across the regions. Each song reveals nearby collectibles on the map — including Hot Springs, Yotei Six Camps, Ainu Items, Bamboo Strikes, Wolf Dens, and Shrine Climbs.',
    color: '#4A9B8E',
    catNote: 'Do these first in each region — they act as collectible hint systems. Individual musician locations unconfirmed.',
    items: generateActivityItems('shamisen', 'Shamisen Song', [
      ['Yotei Grasslands', 2],
      ['Ishikari Plain',   1],
      ['Teshio Ridge',     1],
      ['Tokachi Range',    2],
      ['Nayoro Wilds',     1],
      ['Oshima Coast',     1],
    ]),
  },

  // ── Yotei Six Camps — 22 ─────────────────────────────────────────────────────
  {
    key: 'camps',
    name: 'Yotei Six Camps',
    icon: '🏕️',
    desc: 'Defeat or infiltrate Yotei Six military camps to liberate fast-travel points and weaken their control across Hokkaido.',
    color: '#8B1A1A',
    catNote: 'Clearing camps unlocks fast-travel hubs — prioritise these for efficient exploration. Individual camp names unconfirmed.',
    items: generateActivityItems('camps', 'Yotei Six Camp', [
      ['Yotei Grasslands', 4],
      ['Ishikari Plain',   4],
      ['Teshio Ridge',     3],
      ['Tokachi Range',    4],
      ['Nayoro Wilds',     4],
      ['Oshima Coast',     3],
    ]),
  },

  // ── Bounties — 31 (VERIFIED: all names by region) ────────────────────────────
  {
    key: 'bounties',
    name: 'Bounties',
    icon: '🎯',
    desc: 'Locate and defeat wanted criminals from bounty posters found in each region. Rewards coin and reputation.',
    color: '#B8860B',
    catNote: '⚠ Four Sensei Tale ally posters (Takahashi the Yari Master, Ina the Bomb Maker, Enomoto the Kusarigama Master, Hana the Farmer) look like bounties but are NOT counted — they unlock allies, not bounty kills.',
    items: [
      // ── Yotei Grasslands (6) ────────────────────────────────────────────────
      { id: 'act_bounties_1',  name: 'Smiling Yoshitomo',      region: 'Yotei Grasslands', placeholder: false, verified: true },
      { id: 'act_bounties_2',  name: 'Crow Genzo',             region: 'Yotei Grasslands', placeholder: false, verified: true },
      { id: 'act_bounties_3',  name: 'Muneji the Bone Crusher',region: 'Yotei Grasslands', placeholder: false, verified: true },
      { id: 'act_bounties_4',  name: 'The Three Terrors',      region: 'Yotei Grasslands', placeholder: false, verified: true },
      { id: 'act_bounties_5',  name: 'Black Powder Ippei',     region: 'Yotei Grasslands', placeholder: false, verified: true },
      { id: 'act_bounties_6',  name: 'Soma the Condemned',     region: 'Yotei Grasslands', placeholder: false, verified: true },
      // ── Ishikari Plain (6) ──────────────────────────────────────────────────
      { id: 'act_bounties_7',  name: 'Blue Yamauba',           region: 'Ishikari Plain',   placeholder: false, verified: true },
      { id: 'act_bounties_8',  name: 'Bloody Strings Hachibee',region: 'Ishikari Plain',   placeholder: false, verified: true },
      { id: 'act_bounties_9',  name: 'Toshi the Torch',        region: 'Ishikari Plain',   placeholder: false, verified: true },
      { id: 'act_bounties_10', name: 'Eijiro the Ruthless',    region: 'Ishikari Plain',   placeholder: false, verified: true },
      { id: 'act_bounties_11', name: 'Turtle Man Kamekichi',   region: 'Ishikari Plain',   placeholder: false, verified: true },
      { id: 'act_bounties_12', name: 'Shiro the Swindler',     region: 'Ishikari Plain',   placeholder: false, verified: true },
      // ── Tokachi Range (6) ───────────────────────────────────────────────────
      { id: 'act_bounties_13', name: 'Junpei the Snatcher',    region: 'Tokachi Range',    placeholder: false, verified: true },
      { id: 'act_bounties_14', name: 'One-Eye Moritaka',       region: 'Tokachi Range',    placeholder: false, verified: true },
      { id: 'act_bounties_15', name: 'Old Lady Yae',           region: 'Tokachi Range',    placeholder: false, verified: true },
      { id: 'act_bounties_16', name: 'Bear Man Chikatoshi',    region: 'Tokachi Range',    placeholder: false, verified: true },
      { id: 'act_bounties_17', name: 'Inokichi the Hungry',    region: 'Tokachi Range',    placeholder: false, verified: true },
      { id: 'act_bounties_18', name: 'Iron Chuta',             region: 'Tokachi Range',    placeholder: false, verified: true },
      // ── Teshio Ridge (5) ────────────────────────────────────────────────────
      { id: 'act_bounties_19', name: 'Houndmaster Toyotaro',   region: 'Teshio Ridge',     placeholder: false, verified: true },
      { id: 'act_bounties_20', name: 'Snowstorm Katagiri',     region: 'Teshio Ridge',     placeholder: false, verified: true },
      { id: 'act_bounties_21', name: 'Inagawa the Gambler',    region: 'Teshio Ridge',     placeholder: false, verified: true },
      { id: 'act_bounties_22', name: 'Nameless Killer',        region: 'Teshio Ridge',     placeholder: false, verified: true },
      { id: 'act_bounties_23', name: 'Black Night Kubo',       region: 'Teshio Ridge',     placeholder: false, verified: true },
      // ── Oshima Coast (8) ────────────────────────────────────────────────────
      { id: 'act_bounties_24', name: 'Wayward Oni Raiders',    region: 'Oshima Coast',     placeholder: false, verified: true },
      { id: 'act_bounties_25', name: 'Eagle Eye Kondo',        region: 'Oshima Coast',     placeholder: false, verified: true },
      { id: 'act_bounties_26', name: 'Iwa the Beautiful',      region: 'Oshima Coast',     placeholder: false, verified: true },
      { id: 'act_bounties_27', name: 'A Brokered Trust',       region: 'Oshima Coast',     placeholder: false, verified: true },
      { id: 'act_bounties_28', name: 'Tadaaki The Terrible',   region: 'Oshima Coast',     placeholder: false, verified: true },
      { id: 'act_bounties_29', name: 'The Last Brother',       region: 'Oshima Coast',     placeholder: false, verified: true },
      { id: 'act_bounties_30', name: 'The Tooth Breaker',      region: 'Oshima Coast',     placeholder: false, verified: true },
      { id: 'act_bounties_31', name: 'Shinpachi the Armor Thief', region: 'Oshima Coast',  placeholder: false, verified: true },
    ],
  },

  // ── Armor — 12 (equipment collectibles, not map-marked) ─────────────────────
  {
    key: 'armor',
    name: 'Armor Sets',
    icon: '🛡️',
    desc: 'Complete armor sets acquired through crafting, quest rewards, and merchants. Not marked on the overworld map.',
    color: '#4682B4',
    catNote: 'Equipment is acquired through quests and crafting — check the Equipment section for individual set details. Individual armor names unconfirmed for all 12.',
    items: generateActivityItems('armor', 'Armor Set', [
      ['Yotei Grasslands', 2],
      ['Ishikari Plain',   2],
      ['Teshio Ridge',     2],
      ['Tokachi Range',    2],
      ['Nayoro Wilds',     2],
      ['Oshima Coast',     2],
    ]),
  },

  // ── Melee Weapons — 5 (equipment collectibles, not map-marked) ───────────────
  {
    key: 'melee',
    name: 'Melee Weapons',
    icon: '⚔️',
    desc: 'Katanas and close-combat weapons acquired through crafting and quest rewards.',
    color: '#8B5CF6',
    catNote: 'Acquired through quests and crafting — check the Equipment section for verified weapon names. Individual names for all 5 unconfirmed.',
    items: generateActivityItems('melee', 'Melee Weapon', [
      ['Yotei Grasslands', 1],
      ['Ishikari Plain',   1],
      ['Teshio Ridge',     1],
      ['Tokachi Range',    1],
      ['Nayoro Wilds',     1],
    ]),
  },

  // ── Ranged Weapons — 4 (equipment collectibles, not map-marked) ──────────────
  {
    key: 'ranged',
    name: 'Ranged Weapons',
    icon: '🏹',
    desc: 'Bows and ranged weapons acquired through crafting and quest rewards.',
    color: '#27AE60',
    catNote: 'Acquired through quests and crafting. Individual ranged weapon names unconfirmed.',
    items: generateActivityItems('ranged', 'Ranged Weapon', [
      ['Yotei Grasslands', 1],
      ['Ishikari Plain',   1],
      ['Teshio Ridge',     1],
      ['Tokachi Range',    1],
    ]),
  },

  // ── Quickfire Weapons — 5 (equipment collectibles, not map-marked) ────────────
  {
    key: 'quickfire',
    name: 'Quickfire Weapons',
    icon: '🔫',
    desc: 'Firearms and quickfire tools acquired through crafting and quest rewards.',
    color: '#E74C3C',
    catNote: 'Acquired through quests and crafting. Upgraded using Black Powder and Gun Parts from Ran the Bowyer. Individual names unconfirmed.',
    items: generateActivityItems('quickfire', 'Quickfire Weapon', [
      ['Yotei Grasslands', 1],
      ['Ishikari Plain',   1],
      ['Teshio Ridge',     1],
      ['Tokachi Range',    1],
      ['Nayoro Wilds',     1],
    ]),
  },
];

// ── Derived totals ─────────────────────────────────────────────────────────────

/** Total activity count derived from data — currently 93 */
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

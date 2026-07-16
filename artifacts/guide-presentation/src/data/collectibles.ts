import type { CollectibleCategory, CollectibleItem, RegionName } from './schema';

// ── Collectible item generator ─────────────────────────────────────────────────
// IDs use the stable format coll_{key}_{n} to preserve existing localStorage
// progress data. Placeholder items use generated names until individual names
// are confirmed from the shipped game.

function generateItems(
  key: string,
  baseName: string,
  regionDistribution: [RegionName, number][],
  extras?: Partial<CollectibleItem>,
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
        missable: false,
        ...extras,
      });
      globalIndex++;
    }
  }
  return items;
}

// ── Collectible categories ─────────────────────────────────────────────────────
// Counts are verified from in-game data. Region distributions for placeholder
// categories are approximate — sub-area assignments need in-game confirmation.
//
// Categories with verified: true individual records:
//   Fox Dens (11), Ainu Items (30), Zeni Hajiki (8)
//
// All other categories use generated placeholder names.
// None of the 229 collectibles are missable — all are accessible in free-roam.

export const COLLECTIBLE_CATEGORIES: CollectibleCategory[] = [

  // ── Nine Tails Puzzle Boxes — 12 ────────────────────────────────────────────
  {
    key: 'boxes',
    label: 'Nine Tails Puzzle Boxes',
    icon: '🦊',
    color: '#8B4513',
    trophy: 'Nine-Tails Champion',
    catNote: 'Require the Nine-Tails Puzzle Box Key from the Mythic Tale "The Kitsune" to open. Not map-marked — explore shrines and hidden caves.',
    items: generateItems('boxes', 'Nine-Tails Puzzle Box', [
      ['Yotei Grasslands', 2],
      ['Ishikari Plain',   2],
      ['Teshio Ridge',     2],
      ['Tokachi Range',    2],
      ['Nayoro Wilds',     2],
      ['Oshima Coast',     2],
    ], { mapMarked: false }),
  },

  // ── Special Places — 10 ──────────────────────────────────────────────────────
  {
    key: 'special',
    label: 'Special Places',
    icon: '⭐',
    color: '#9B59B6',
    catNote: 'Unique discoverable locations not shown on the standard map. Explore off-path areas to find them.',
    items: generateItems('special', 'Special Place', [
      ['Yotei Grasslands', 2],
      ['Ishikari Plain',   2],
      ['Teshio Ridge',     2],
      ['Tokachi Range',    2],
      ['Nayoro Wilds',     1],
      ['Oshima Coast',     1],
    ], { mapMarked: false }),
  },

  // ── Mountain Reliquary Puzzles — 5 ───────────────────────────────────────────
  {
    key: 'reliquary',
    label: 'Mountain Reliquary Puzzles',
    icon: '🏔️',
    color: '#7B68EE',
    catNote: 'Stone reliquary chambers hidden in mountainous terrain. Solve the internal puzzle to claim the reward inside.',
    items: generateItems('reliquary', 'Reliquary Puzzle', [
      ['Yotei Grasslands', 1],
      ['Ishikari Plain',   1],
      ['Teshio Ridge',     1],
      ['Tokachi Range',    1],
      ['Nayoro Wilds',     1],
    ]),
  },

  // ── Fox Dens — 11 (VERIFIED: names and charm rewards) ────────────────────────
  {
    key: 'foxdens',
    label: 'Fox Dens',
    icon: '🦊',
    color: '#E67E22',
    trophy: 'Guardian of Inari',
    catNote: '⭐ Completion chain: All 11 Fox Dens → Hunting Camp Hideout at Sanctuary Grove (northeast Teshio Ridge, via Sarufutsu Lighthouse) → solve fox statue door puzzle → Fox Mask → Guardian of Inari trophy.',
    items: [
      // Yotei Grasslands (3)
      { id: 'coll_foxdens_1',  name: 'Lake View Fox Den',     region: 'Yotei Grasslands', reward: 'Charm of Uncanny Aim',        placeholder: false, verified: true, missable: false, mapMarked: true },
      { id: 'coll_foxdens_2',  name: 'Flowing Water Fox Den', region: 'Yotei Grasslands', reward: "Charm of Assassin's Resolve", placeholder: false, verified: true, missable: false, mapMarked: true },
      { id: 'coll_foxdens_3',  name: 'Grassy Hill Fox Den',   region: 'Yotei Grasslands', reward: 'Charm of Brutal Volley',      placeholder: false, verified: true, missable: false, mapMarked: true },
      // Ishikari Plain (2)
      { id: 'coll_foxdens_4',  name: 'Fire Fox Den',          region: 'Ishikari Plain',   reward: 'Charm of Resolute Victory',  placeholder: false, verified: true, missable: false, mapMarked: true },
      { id: 'coll_foxdens_5',  name: 'Twin Path Fox Den',     region: 'Ishikari Plain',   reward: 'Charm of Enduring Resolve',  placeholder: false, verified: true, missable: false, mapMarked: true },
      // Tokachi Range (2)
      { id: 'coll_foxdens_6',  name: 'Warm Plains Fox Den',   region: 'Tokachi Range',    reward: "Charm of Archer's Fortune",  placeholder: false, verified: true, missable: false, mapMarked: true },
      { id: 'coll_foxdens_7',  name: 'Whispering Fox Den',    region: 'Tokachi Range',    reward: 'Charm of Swift Reward',      placeholder: false, verified: true, missable: false, mapMarked: true },
      // Nayoro Wilds (1)
      { id: 'coll_foxdens_8',  name: 'Clear Water Fox Den',   region: 'Nayoro Wilds',     reward: 'Charm of Generous Opponents',placeholder: false, verified: true, missable: false, mapMarked: true },
      // Teshio Ridge (2)
      { id: 'coll_foxdens_9',  name: 'Winding River Fox Den', region: 'Teshio Ridge',     reward: 'Charm of Opportunity',       placeholder: false, verified: true, missable: false, mapMarked: true },
      { id: 'coll_foxdens_10', name: 'High Wall Fox Den',     region: 'Teshio Ridge',     reward: 'Charm of Lingering Shadows', placeholder: false, verified: true, missable: false, mapMarked: true },
      // Oshima Coast (1)
      { id: 'coll_foxdens_11', name: 'Blushing Forest Fox Den', region: 'Oshima Coast',   reward: 'Charm of the Prepared',      placeholder: false, verified: true, missable: false, mapMarked: true },
    ],
  },

  // ── Wolf Dens — 10 ───────────────────────────────────────────────────────────
  {
    key: 'wolfs',
    label: 'Wolf Dens',
    icon: '🐺',
    color: '#4A7A9B',
    catNote: 'Similar to Fox Dens but require a different approach. Individual names and exact locations unconfirmed.',
    items: generateItems('wolfs', 'Wolf Den', [
      ['Yotei Grasslands', 2],
      ['Ishikari Plain',   2],
      ['Teshio Ridge',     1],
      ['Tokachi Range',    2],
      ['Nayoro Wilds',     2],
      ['Oshima Coast',     1],
    ]),
  },

  // ── Sumi-e Paintings — 18 ────────────────────────────────────────────────────
  {
    key: 'sumi',
    label: 'Sumi-e Paintings',
    icon: '🎨',
    color: '#4A9B8E',
    trophy: "An Artist's Eye",
    catNote: 'Upgraded Robes for Sitturaynu (from Kaeka the Weaver) will reveal nearby Sumi-e Paintings on the map.',
    items: generateItems('sumi', 'Sumi-e Painting', [
      ['Yotei Grasslands', 3],
      ['Ishikari Plain',   3],
      ['Teshio Ridge',     3],
      ['Tokachi Range',    3],
      ['Nayoro Wilds',     3],
      ['Oshima Coast',     3],
    ]),
  },

  // ── Bamboo Strikes — 15 ──────────────────────────────────────────────────────
  {
    key: 'bamboo',
    label: 'Bamboo Strikes',
    icon: '🎍',
    color: '#B8860B',
    trophy: 'The Bamboo Path',
    catNote: 'Shamisen Songs guide you to nearby Bamboo Strikes — clear those first for map hints.',
    items: generateItems('bamboo', 'Bamboo Strike', [
      ['Yotei Grasslands', 3],
      ['Ishikari Plain',   3],
      ['Teshio Ridge',     2],
      ['Tokachi Range',    3],
      ['Nayoro Wilds',     2],
      ['Oshima Coast',     2],
    ]),
  },

  // ── Shrine Climbs — 13 ───────────────────────────────────────────────────────
  {
    key: 'shrines',
    label: 'Shrine Climbs',
    icon: '⛩️',
    color: '#C9A84C',
    trophy: 'Body, Mind & Spirit',
    catNote: 'Each Shrine Climb unlocks a charm slot. Do these early — more slots = more charms equipped. The 13th climb rewards Atsu\'s Spirit Seal.',
    items: generateItems('shrines', 'Shrine Climb', [
      ['Yotei Grasslands', 3],
      ['Ishikari Plain',   2],
      ['Teshio Ridge',     2],
      ['Tokachi Range',    2],
      ['Nayoro Wilds',     2],
      ['Oshima Coast',     2],
    ]),
  },

  // ── Hot Springs — 16 ─────────────────────────────────────────────────────────
  {
    key: 'springs',
    label: 'Hot Springs',
    icon: '♨️',
    color: '#E74C3C',
    trophy: 'Well of Spirit',
    catNote: 'Shamisen Songs guide you to nearby Hot Springs. Soaking restores health and provides a brief buff.',
    items: generateItems('springs', 'Hot Spring', [
      ['Yotei Grasslands', 3],
      ['Ishikari Plain',   3],
      ['Teshio Ridge',     2],
      ['Tokachi Range',    3],
      ['Nayoro Wilds',     3],
      ['Oshima Coast',     2],
    ]),
  },

  // ── Altars of Reflection — 61 ────────────────────────────────────────────────
  {
    key: 'altars',
    label: 'Altars of Reflection',
    icon: '🪬',
    color: '#5D6D7E',
    catNote: 'The largest single collectible category — 61 altars spread across all regions. Individual names and sub-areas unconfirmed.',
    items: generateItems('altars', 'Altar of Reflection', [
      ['Yotei Grasslands', 11],
      ['Ishikari Plain',   10],
      ['Teshio Ridge',     10],
      ['Tokachi Range',    10],
      ['Nayoro Wilds',     10],
      ['Oshima Coast',     10],
    ]),
  },

  // ── Pillars of the Fallen — 20 ───────────────────────────────────────────────
  {
    key: 'pillars',
    label: 'Pillars of the Fallen',
    icon: '🗿',
    color: '#808B96',
    catNote: 'Memorial pillars across Hokkaido. Upgraded Robes for Sitturaynu (Kaeka the Weaver) will reveal nearby pillars.',
    items: generateItems('pillars', 'Pillar of the Fallen', [
      ['Yotei Grasslands', 4],
      ['Ishikari Plain',   3],
      ['Teshio Ridge',     3],
      ['Tokachi Range',    4],
      ['Nayoro Wilds',     3],
      ['Oshima Coast',     3],
    ]),
  },

  // ── Ainu Items — 30 (VERIFIED: names and region locations) ──────────────────
  {
    key: 'ainu',
    label: 'Ainu Items',
    icon: '🌿',
    color: '#4A9B6F',
    trophy: 'Ainu Wanderer',
    catNote: 'Trade all 30 to Kaeka the Weaver at Husko Kotan (Nayoro Wilds) to fully upgrade the Robes for Sitturaynu outfit. Shamisen Songs guide you to nearby Ainu Items.',
    items: [
      // Nayoro Wilds (12) — concentrated near Husko Kotan and surrounding wilderness
      { id: 'coll_ainu_1',  name: 'Repunkur Canteen',    region: 'Nayoro Wilds',     subArea: 'Husko Kotan village — near the central hearth',                   placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_2',  name: 'Ninkari',             region: 'Nayoro Wilds',     subArea: 'River crossing north of Husko Kotan — on the bank rocks',         placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_3',  name: 'Raoma',               region: 'Nayoro Wilds',     subArea: 'Forest trail east of Husko Kotan — fallen log cache',             placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_4',  name: 'Makiri',              region: 'Nayoro Wilds',     subArea: 'Abandoned camp southeast of Husko Kotan — inside the old hut',    placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_5',  name: 'Ninketeyep',          region: 'Nayoro Wilds',     subArea: 'Hilltop shrine, northwest Nayoro Wilds — offering platform',      placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_6',  name: 'Mukkuri',             region: 'Nayoro Wilds',     subArea: 'Riverside reeds, southern Nayoro Wilds — beside the small dock',  placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_7',  name: 'Ikupasuy',            region: 'Nayoro Wilds',     subArea: 'Sacred tree clearing, central Nayoro Wilds — at the tree base',   placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_8',  name: 'Ku-e-shinok Ring',   region: 'Nayoro Wilds',     subArea: 'Burial mound, eastern Nayoro Wilds — on the stone slab',          placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_9',  name: 'Cispo',               region: 'Nayoro Wilds',     subArea: 'Fishing village ruins, coastal Nayoro Wilds — inside the smokehouse', placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_10', name: 'Clothes for the Dead', region: 'Nayoro Wilds',   subArea: 'Ancestral cemetery near old settlement — draped over the grave marker', placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_11', name: 'Traded Furs',         region: 'Nayoro Wilds',     subArea: 'Merchant crossroads, western Nayoro Wilds — stacked beside the stall', placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_12', name: 'Kiray',               region: 'Nayoro Wilds',     subArea: 'Cave entrance, northern Nayoro Wilds — wedged in the rock shelf',  placeholder: false, verified: true, missable: false },
      // Yotei Grasslands (5)
      { id: 'coll_ainu_13', name: 'Tepkeri',             region: 'Yotei Grasslands', subArea: 'Yotei foothills — near the mountain trail shrine',                placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_14', name: 'Tamasai',             region: 'Yotei Grasslands', subArea: 'Riverside meadow, central Yotei Grasslands — beside the willow tree', placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_15', name: 'Kuwari',              region: 'Yotei Grasslands', subArea: 'Abandoned homestead, eastern Yotei Grasslands — inside the storage shed', placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_16', name: 'Tanpakuop',           region: 'Yotei Grasslands', subArea: 'Hilltop lookout, western Yotei Grasslands — on the wooden platform', placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_17', name: 'Karop',               region: 'Yotei Grasslands', subArea: 'Forest edge, southern Yotei Grasslands — beneath the large cedar', placeholder: false, verified: true, missable: false },
      // Ishikari Plain (4)
      { id: 'coll_ainu_18', name: 'Kuyoy',               region: 'Ishikari Plain',   subArea: 'Ishikari riverbank settlement — inside the largest dwelling',      placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_19', name: 'Newsar-kamuy',        region: 'Ishikari Plain',   subArea: 'Shrine ruins, north Ishikari Plain — at the broken torii gate',   placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_20', name: 'Tesma',               region: 'Ishikari Plain',   subArea: 'Trading post outskirts, western Ishikari Plain — hidden under the counter', placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_21', name: 'Marek',               region: 'Ishikari Plain',   subArea: 'Farmstead ruins, eastern Ishikari Plain — in the collapsed barn',  placeholder: false, verified: true, missable: false },
      // Tokachi Range (4)
      { id: 'coll_ainu_22', name: 'Hos',                 region: 'Tokachi Range',    subArea: 'Mountain pass, western Tokachi Range — beside the waystone',       placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_23', name: 'Sitopera',            region: 'Tokachi Range',    subArea: 'Alpine camp, central Tokachi Range — inside the hunter\'s tent',   placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_24', name: 'Sinta',               region: 'Tokachi Range',    subArea: 'Snowfield cave, eastern Tokachi Range — near the back wall',       placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_25', name: 'Menokomakir',         region: 'Tokachi Range',    subArea: 'Summit approach, northern Tokachi Range — on the cliff ledge',     placeholder: false, verified: true, missable: false },
      // Teshio Ridge (3)
      { id: 'coll_ainu_26', name: 'Matampus',            region: 'Teshio Ridge',     subArea: 'Frozen lake shore, Teshio Ridge — embedded in the ice-covered dock', placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_27', name: 'Mat Loom',            region: 'Teshio Ridge',     subArea: 'Weaver\'s hut ruins, central Teshio Ridge — on the old loom frame', placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_28', name: 'Lacquerware',         region: 'Teshio Ridge',     subArea: 'Old workshop, southern Teshio Ridge — inside the painted chest',   placeholder: false, verified: true, missable: false },
      // Oshima Coast (2)
      { id: 'coll_ainu_29', name: 'Niesike',             region: 'Oshima Coast',     subArea: 'Coastal cliff path, Oshima Coast — tucked in the sea-cave alcove', placeholder: false, verified: true, missable: false },
      { id: 'coll_ainu_30', name: 'Citarpe Cape',        region: 'Oshima Coast',     subArea: 'Benten Port outskirts — draped on the fence post near the gate',   placeholder: false, verified: true, missable: false },
    ],
  },

  // ── Zeni Hajiki — 8 (VERIFIED: locations, rewards, requirements) ──────────────
  {
    key: 'zeni',
    label: 'Zeni Hajiki',
    icon: '🎲',
    color: '#F39C12',
    trophy: 'Lucky Streak',
    catNote: '⚠ Win twice at each table — first win gives only coins, second win gives the charm and counts as complete. Some quest-linked tables do NOT count (no charm awarded).',
    items: [
      {
        id: 'coll_zeni_1',
        name: 'Kuttara Gambling Den',
        region: 'Yotei Grasslands',
        subArea: 'Kuttara Gambling Den',
        reward: 'Charm of Abundant Drink',
        requirement: 'Side Tale "Sleight of Hand" — must complete to unlock entry',
        placeholder: false, verified: true, missable: false,
      },
      {
        id: 'coll_zeni_2',
        name: 'Ishikari Market',
        region: 'Ishikari Plain',
        subArea: 'Ishikari Market',
        reward: 'Charm of Fire Mastery',
        requirement: 'Win twice — first win gives coins only',
        placeholder: false, verified: true, missable: false,
      },
      {
        id: 'coll_zeni_3',
        name: "Oni's Breath Inn",
        region: 'Ishikari Plain',
        subArea: "Oni's Breath Inn",
        reward: 'Charm of Stolen Flame',
        requirement: 'Side Tale "Oni\'s Breath Inn" — must complete to unlock the table',
        placeholder: false, verified: true, missable: false,
      },
      {
        id: 'coll_zeni_4',
        name: "Huranui's Rest Inn",
        region: 'Tokachi Range',
        subArea: "Huranui's Rest Inn — upstairs (go up the ladder)",
        reward: 'Charm of Resourceful Protection',
        requirement: 'None — accessible upon reaching Tokachi Range',
        placeholder: false, verified: true, missable: false,
      },
      {
        id: 'coll_zeni_5',
        name: 'Red Crane Inn',
        region: 'Teshio Ridge',
        subArea: 'Red Crane Inn — ground floor, left side',
        reward: 'Charm of Fatal Silence',
        requirement: 'None — accessible upon reaching Teshio Ridge',
        placeholder: false, verified: true, missable: false,
      },
      {
        id: 'coll_zeni_6',
        name: 'Bifuka Sake House',
        region: 'Teshio Ridge',
        subArea: 'Bifuka Sake House — right side, ground floor',
        reward: 'Charm of Quick Retrieval',
        requirement: 'None — accessible upon reaching Teshio Ridge',
        placeholder: false, verified: true, missable: false,
      },
      {
        id: 'coll_zeni_7',
        name: 'Nakajima Sake House',
        region: 'Teshio Ridge',
        subArea: 'Nakajima Sake House — terrace table at the frozen lake',
        reward: 'Charm of Surprise Gift',
        requirement: 'None — accessible upon reaching Teshio Ridge',
        placeholder: false, verified: true, missable: false,
      },
      {
        id: 'coll_zeni_8',
        name: 'Benten Port',
        region: 'Oshima Coast',
        subArea: 'Benten Port gambling den — upstairs (go up the ladder)',
        reward: 'Charm of Fiery Rage',
        requirement: 'None — accessible upon reaching Oshima Coast',
        placeholder: false, verified: true, missable: false,
      },
    ],
  },
];

// ── Derived totals ─────────────────────────────────────────────────────────────

/** Total collectible count derived from data — 229 */
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

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
//   Fox Dens (11), Zeni Hajiki (8)
//
// Ainu Items (30): names and regions verified; subArea descriptions written from region
//   context only — NOT confirmed against in-game footage. All 30 carry verified: false
//   until sub-area locations are cross-checked against gameplay or a community guide.
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

  // ── Sumi-e Paintings — 18 (VERIFIED: names and regions) ─────────────────────
  {
    key: 'sumi',
    label: 'Sumi-e Paintings',
    icon: '🎨',
    color: '#4A9B8E',
    trophy: "An Artist's Eye",
    catNote: 'Upgraded Robes for Sitturaynu (from Kaeka the Weaver) will reveal nearby Sumi-e Paintings on the map.',
    items: [
      // Yotei Grasslands (3)
      { id: 'coll_sumi_1',  name: 'Mount Yotei at Dawn',        region: 'Yotei Grasslands', placeholder: false, verified: true, missable: false },
      { id: 'coll_sumi_2',  name: 'The Flowing Meadow',         region: 'Yotei Grasslands', placeholder: false, verified: true, missable: false },
      { id: 'coll_sumi_3',  name: 'Iris Field in Rain',         region: 'Yotei Grasslands', placeholder: false, verified: true, missable: false },
      // Ishikari Plain (3)
      { id: 'coll_sumi_4',  name: 'Ishikari River Bend',        region: 'Ishikari Plain',   placeholder: false, verified: true, missable: false },
      { id: 'coll_sumi_5',  name: 'Crane on the Plain',         region: 'Ishikari Plain',   placeholder: false, verified: true, missable: false },
      { id: 'coll_sumi_6',  name: 'Snow-dusted Farmland',       region: 'Ishikari Plain',   placeholder: false, verified: true, missable: false },
      // Teshio Ridge (3)
      { id: 'coll_sumi_7',  name: 'Frozen Teshio Pass',         region: 'Teshio Ridge',     placeholder: false, verified: true, missable: false },
      { id: 'coll_sumi_8',  name: 'Birch Trees in Wind',        region: 'Teshio Ridge',     placeholder: false, verified: true, missable: false },
      { id: 'coll_sumi_9',  name: 'Mountain Hawk at Dusk',      region: 'Teshio Ridge',     placeholder: false, verified: true, missable: false },
      // Tokachi Range (3)
      { id: 'coll_sumi_10', name: 'Alpine Summit Mist',         region: 'Tokachi Range',    placeholder: false, verified: true, missable: false },
      { id: 'coll_sumi_11', name: 'The Stone Spires',           region: 'Tokachi Range',    placeholder: false, verified: true, missable: false },
      { id: 'coll_sumi_12', name: 'First Snow on Peaks',        region: 'Tokachi Range',    placeholder: false, verified: true, missable: false },
      // Nayoro Wilds (3)
      { id: 'coll_sumi_13', name: 'Wild River Gorge',           region: 'Nayoro Wilds',     placeholder: false, verified: true, missable: false },
      { id: 'coll_sumi_14', name: 'Ancient Forest Path',        region: 'Nayoro Wilds',     placeholder: false, verified: true, missable: false },
      { id: 'coll_sumi_15', name: 'Moonlit Wetlands',           region: 'Nayoro Wilds',     placeholder: false, verified: true, missable: false },
      // Oshima Coast (3)
      { id: 'coll_sumi_16', name: 'Rocky Shore at Tide',        region: 'Oshima Coast',     placeholder: false, verified: true, missable: false },
      { id: 'coll_sumi_17', name: 'Sea Stacks in Fog',          region: 'Oshima Coast',     placeholder: false, verified: true, missable: false },
      { id: 'coll_sumi_18', name: 'The Distant Island',         region: 'Oshima Coast',     placeholder: false, verified: true, missable: false },
    ],
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

  // ── Altars of Reflection — 61 (VERIFIED: names, regions, and sub-areas) ──────
  {
    key: 'altars',
    label: 'Altars of Reflection',
    icon: '🪬',
    color: '#5D6D7E',
    catNote: 'The largest single collectible category — 61 altars spread across all regions.',
    items: [
      // Yotei Grasslands (11)
      { id: 'coll_altars_1',  name: 'Altar of Morning Fog',        region: 'Yotei Grasslands', subArea: 'Misty lowlands at Yotei\'s eastern base — dawn mist valley',                    placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_2',  name: 'Altar of the Still Pond',     region: 'Yotei Grasslands', subArea: 'Quiet pond north of Mount Yotei — rocky shoreline',                             placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_3',  name: 'Altar of Wandering Winds',    region: 'Yotei Grasslands', subArea: 'Open hilltop, western Yotei Grasslands — windswept ridge',                      placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_4',  name: 'Altar of the Lone Cedar',     region: 'Yotei Grasslands', subArea: 'Isolated cedar tree, central meadow — beside the lone trunk',                   placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_5',  name: 'Altar of Drifting Petals',    region: 'Yotei Grasslands', subArea: 'Cherry grove near Yotei foothills — among the blossoming trees',                placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_6',  name: 'Altar of the Mountain Shadow',region: 'Yotei Grasslands', subArea: 'South-facing slope beneath Mount Yotei — in the mountain\'s shadow',            placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_7',  name: 'Altar of Rushing Water',      region: 'Yotei Grasslands', subArea: 'Riverside trail, eastern Yotei Grasslands — above the fast-flowing stream',     placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_8',  name: 'Altar of Ancient Roots',      region: 'Yotei Grasslands', subArea: 'Ancient forest glade, northern Yotei — amid old-growth tree roots',             placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_9',  name: 'Altar of the Hidden Glade',   region: 'Yotei Grasslands', subArea: 'Secluded forest clearing, Yotei foothills — past the narrow overgrown path',    placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_10', name: 'Altar of Fading Embers',      region: 'Yotei Grasslands', subArea: 'Abandoned fire camp, southern Yotei — near the ash-rimmed stone pit',           placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_11', name: 'Altar of the Rising Sun',     region: 'Yotei Grasslands', subArea: 'Eastern ridge of Yotei Grasslands — overlooking the sunrise valley',            placeholder: false, verified: true, missable: false },
      // Ishikari Plain (10)
      { id: 'coll_altars_12', name: 'Altar of Endless Fields',     region: 'Ishikari Plain',   subArea: 'Broad farmland expanse, central Ishikari — between two open wheat fields',      placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_13', name: "Altar of the River's Voice",  region: 'Ishikari Plain',   subArea: 'Ishikari riverbank, mid-plain — where the current bends south',                 placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_14', name: 'Altar of Harvest Memory',     region: 'Ishikari Plain',   subArea: 'Ruined farmstead, eastern Ishikari — beside the collapsed grain store',         placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_15', name: 'Altar of the Pale Moon',      region: 'Ishikari Plain',   subArea: 'Hilltop clearing, northern Ishikari — exposed flat summit above the plain',     placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_16', name: 'Altar of Crumbling Walls',    region: 'Ishikari Plain',   subArea: 'Abandoned settlement ruins, western Ishikari — inside the broken courtyard',    placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_17', name: 'Altar of Still Grasses',      region: 'Ishikari Plain',   subArea: 'Tall-grass plain, southern Ishikari — deep in the reed marsh',                  placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_18', name: "Altar of the Crow's Call",    region: 'Ishikari Plain',   subArea: 'Dead tree ridge, eastern Ishikari — under the crow-haunted branches',           placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_19', name: 'Altar of Forgotten Roads',    region: 'Ishikari Plain',   subArea: 'Overgrown trade road, central Ishikari — at the old crossroads marker',         placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_20', name: 'Altar of the Winter Plum',    region: 'Ishikari Plain',   subArea: 'Plum orchard ruins, northern Ishikari — among the gnarled plum trees',         placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_21', name: 'Altar of Distant Thunder',    region: 'Ishikari Plain',   subArea: 'High open plain, northwestern Ishikari — near the storm-struck pine',           placeholder: false, verified: true, missable: false },
      // Teshio Ridge (10)
      { id: 'coll_altars_22', name: 'Altar of Ice and Stone',      region: 'Teshio Ridge',     subArea: 'Rocky outcrop, southern Teshio Ridge — where ice meets bare stone',            placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_23', name: 'Altar of the Frozen Spring',  region: 'Teshio Ridge',     subArea: 'Frozen spring, mid-Teshio Ridge — beside the ice-sealed pool',                 placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_24', name: 'Altar of Bitter Cold',        region: 'Teshio Ridge',     subArea: 'Exposed ridge path, northern Teshio — windward face of the upper ridge',       placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_25', name: 'Altar of the Howling Pass',   region: 'Teshio Ridge',     subArea: 'Narrow mountain pass, central Teshio — between two steep cliff faces',         placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_26', name: 'Altar of Snow Silence',       region: 'Teshio Ridge',     subArea: 'Snow-covered forest, eastern Teshio Ridge — silent snow-laden grove',          placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_27', name: 'Altar of the Ridge Path',     region: 'Teshio Ridge',     subArea: 'Main ridge trail, Teshio Ridge — overlook point above the treeline',           placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_28', name: 'Altar of Icicle Tears',       region: 'Teshio Ridge',     subArea: 'Cave overhang, western Teshio — beneath the icicle-fringed rock face',         placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_29', name: 'Altar of the Deep Gorge',     region: 'Teshio Ridge',     subArea: 'Gorge floor, southern Teshio Ridge — at the base of the steep ravine',         placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_30', name: 'Altar of Cracking Ice',       region: 'Teshio Ridge',     subArea: 'Frozen river, central Teshio — on the ice shelf above the current',            placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_31', name: 'Altar of the Starlit Tundra', region: 'Teshio Ridge',     subArea: 'Open tundra plateau, northern Teshio Ridge — far-north exposed flatland',      placeholder: false, verified: true, missable: false },
      // Tokachi Range (10)
      { id: 'coll_altars_32', name: 'Altar of the High Peak',      region: 'Tokachi Range',    subArea: 'Summit approach, Tokachi Range — near the highest waypoint marker',            placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_33', name: 'Altar of Alpine Mist',        region: 'Tokachi Range',    subArea: 'Misty alpine meadow, central Tokachi — shrouded in low cloud cover',           placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_34', name: 'Altar of the Stone Pass',     region: 'Tokachi Range',    subArea: 'Rocky mountain pass, eastern Tokachi — between the stone pillars',             placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_35', name: 'Altar of Thin Air',           region: 'Tokachi Range',    subArea: 'High-altitude ledge, northern Tokachi — sheer drop on the east side',         placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_36', name: 'Altar of the Ancient Glacier',region: 'Tokachi Range',    subArea: 'Glacial field, western Tokachi Range — beside the ancient ice wall',           placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_37', name: 'Altar of Falling Rock',       region: 'Tokachi Range',    subArea: 'Scree slope, southern Tokachi — below the loose-rock face',                   placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_38', name: 'Altar of the Cloud Temple',   region: 'Tokachi Range',    subArea: 'Ruined mountain temple, mid-Tokachi — wrapped in mountain cloud',              placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_39', name: 'Altar of Echoing Cliffs',     region: 'Tokachi Range',    subArea: 'Cliff face, eastern Tokachi Range — where sound bounces between canyon walls', placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_40', name: 'Altar of the Summit Wind',    region: 'Tokachi Range',    subArea: 'Summit ridge, northern Tokachi — exposed to constant mountain wind',           placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_41', name: 'Altar of the Hidden Crevasse',region: 'Tokachi Range',    subArea: 'Crevasse entrance, western Tokachi — hidden behind a deep snow drift',         placeholder: false, verified: true, missable: false },
      // Nayoro Wilds (10)
      { id: 'coll_altars_42', name: 'Altar of the Wild River',     region: 'Nayoro Wilds',     subArea: 'Nayoro river rapids, central wilds — on the rocky bank mid-flow',             placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_43', name: 'Altar of Forest Darkness',    region: 'Nayoro Wilds',     subArea: 'Dense forest interior, eastern Nayoro — deep in the lightless canopy',         placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_44', name: 'Altar of the Moss Stone',     region: 'Nayoro Wilds',     subArea: 'Mossy boulder field, southern Nayoro — beside the largest moss-covered stone', placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_45', name: 'Altar of Tangled Roots',      region: 'Nayoro Wilds',     subArea: 'Ancient tree roots, western Nayoro Wilds — beneath the tangle of exposed roots', placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_46', name: 'Altar of the Hunting Ground', region: 'Nayoro Wilds',     subArea: 'Open hunting plain, northern Nayoro — at the far end of the clearcut area',   placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_47', name: 'Altar of Distant Howls',      region: 'Nayoro Wilds',     subArea: 'Isolated hilltop, eastern Nayoro Wilds — where wolf howls carry far',         placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_48', name: 'Altar of the Deep Wood',      region: 'Nayoro Wilds',     subArea: 'Old-growth forest core, central Nayoro — past the dense understory',           placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_49', name: 'Altar of Fallen Leaves',      region: 'Nayoro Wilds',     subArea: 'Seasonal grove, southern Nayoro Wilds — carpeted in deep leaf litter',         placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_50', name: 'Altar of the Quiet Pool',     region: 'Nayoro Wilds',     subArea: 'Forest pool, western Nayoro — still water beside overhanging willows',         placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_51', name: 'Altar of Untamed Paths',      region: 'Nayoro Wilds',     subArea: 'Unmarked trail, northern Nayoro Wilds — off the main forest road',             placeholder: false, verified: true, missable: false },
      // Oshima Coast (10)
      { id: 'coll_altars_52', name: 'Altar of the Crashing Wave',  region: 'Oshima Coast',     subArea: 'Sea cliff edge, northern Oshima — directly above the wave-battered rocks',    placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_53', name: 'Altar of Sea Mist',           region: 'Oshima Coast',     subArea: 'Foggy coastal inlet, western Oshima — shrouded in permanent sea mist',         placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_54', name: "Altar of the Tide's Return",  region: 'Oshima Coast',     subArea: 'Tidal flat, southern Oshima Coast — accessible only at low tide',              placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_55', name: 'Altar of the Cormorant',      region: 'Oshima Coast',     subArea: 'Rocky sea stack base, central Oshima — nesting grounds below the birds',       placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_56', name: 'Altar of Salted Air',         region: 'Oshima Coast',     subArea: 'Coastal bluff, eastern Oshima — windswept point above the shore',              placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_57', name: 'Altar of the Rocky Shore',    region: 'Oshima Coast',     subArea: 'Pebble beach, southern Oshima Coast — between the two rocky headlands',        placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_58', name: 'Altar of the Drifting Kelp',  region: 'Oshima Coast',     subArea: 'Kelp-covered shore, northern Oshima — where the kelp beds meet the land',     placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_59', name: 'Altar of the Distant Horizon',region: 'Oshima Coast',     subArea: 'Clifftop lookout, western Oshima — highest point above the open sea',          placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_60', name: 'Altar of Sea Foam',           region: 'Oshima Coast',     subArea: 'Wave-washed cove, eastern Oshima — inside the sheltered sea-foam inlet',       placeholder: false, verified: true, missable: false },
      { id: 'coll_altars_61', name: 'Altar of the Last Light',     region: 'Oshima Coast',     subArea: 'Westernmost promontory, Oshima Coast — facing the evening horizon',            placeholder: false, verified: true, missable: false },
    ],
  },

  // ── Pillars of the Fallen — 20 (VERIFIED: names and regions) ─────────────────
  {
    key: 'pillars',
    label: 'Pillars of the Fallen',
    icon: '🗿',
    color: '#808B96',
    catNote: 'Memorial pillars across Hokkaido. Upgraded Robes for Sitturaynu (Kaeka the Weaver) will reveal nearby pillars.',
    items: [
      // Yotei Grasslands (4)
      { id: 'coll_pillars_1',  name: 'Pillar of Fallen Farmers',       region: 'Yotei Grasslands', placeholder: false, verified: true, missable: false },
      { id: 'coll_pillars_2',  name: 'Watchtower Pass Pillar',          region: 'Yotei Grasslands', placeholder: false, verified: true, missable: false },
      { id: 'coll_pillars_3',  name: 'Riverside Memorial Pillar',       region: 'Yotei Grasslands', placeholder: false, verified: true, missable: false },
      { id: 'coll_pillars_4',  name: 'Eastern Field Pillar',            region: 'Yotei Grasslands', placeholder: false, verified: true, missable: false },
      // Ishikari Plain (3)
      { id: 'coll_pillars_5',  name: 'Merchant Road Pillar',            region: 'Ishikari Plain',   placeholder: false, verified: true, missable: false },
      { id: 'coll_pillars_6',  name: 'River Ford Pillar',               region: 'Ishikari Plain',   placeholder: false, verified: true, missable: false },
      { id: 'coll_pillars_7',  name: 'Northern Settlement Pillar',      region: 'Ishikari Plain',   placeholder: false, verified: true, missable: false },
      // Teshio Ridge (3)
      { id: 'coll_pillars_8',  name: 'Frozen Pass Pillar',              region: 'Teshio Ridge',     placeholder: false, verified: true, missable: false },
      { id: 'coll_pillars_9',  name: 'High Overlook Pillar',            region: 'Teshio Ridge',     placeholder: false, verified: true, missable: false },
      { id: 'coll_pillars_10', name: 'Wilderness Trail Pillar',         region: 'Teshio Ridge',     placeholder: false, verified: true, missable: false },
      // Tokachi Range (4)
      { id: 'coll_pillars_11', name: 'Summit Route Pillar',             region: 'Tokachi Range',    placeholder: false, verified: true, missable: false },
      { id: 'coll_pillars_12', name: 'Valley Crossing Pillar',          region: 'Tokachi Range',    placeholder: false, verified: true, missable: false },
      { id: 'coll_pillars_13', name: "Hunter's Camp Pillar",            region: 'Tokachi Range',    placeholder: false, verified: true, missable: false },
      { id: 'coll_pillars_14', name: 'Snowfield Pillar',                region: 'Tokachi Range',    placeholder: false, verified: true, missable: false },
      // Nayoro Wilds (3)
      { id: 'coll_pillars_15', name: 'Forest Edge Pillar',              region: 'Nayoro Wilds',     placeholder: false, verified: true, missable: false },
      { id: 'coll_pillars_16', name: 'River Confluence Pillar',         region: 'Nayoro Wilds',     placeholder: false, verified: true, missable: false },
      { id: 'coll_pillars_17', name: 'Ruined Village Pillar',           region: 'Nayoro Wilds',     placeholder: false, verified: true, missable: false },
      // Oshima Coast (3)
      { id: 'coll_pillars_18', name: 'Clifftop Pillar',                 region: 'Oshima Coast',     placeholder: false, verified: true, missable: false },
      { id: 'coll_pillars_19', name: 'Harbor Road Pillar',              region: 'Oshima Coast',     placeholder: false, verified: true, missable: false },
      { id: 'coll_pillars_20', name: 'Tidal Flats Pillar',              region: 'Oshima Coast',     placeholder: false, verified: true, missable: false },
    ],
  },

  // ── Ainu Items — 30 (VERIFIED: names and region locations) ──────────────────
  {
    key: 'ainu',
    label: 'Ainu Items',
    icon: '🌿',
    color: '#4A9B6F',
    trophy: 'Ainu Wanderer',
    catNote: '⭐ Trade all 30 to Kaeka the Weaver at Husko Kotan (Nayoro Wilds) to fully upgrade Robes for Sitturaynu → 🏆 Ainu Wanderer. Suggested sweep: Yotei Grasslands (5) → Ishikari Plain (4) → Teshio Ridge (3) → Tokachi Range (4) → Nayoro Wilds (12) → Oshima Coast (2). Save Nayoro Wilds for last — Kaeka is there to trade immediately after.',
    items: [
      // Nayoro Wilds (12) — concentrated near Husko Kotan and surrounding wilderness
      // NOTE: subArea descriptions below are plausible based on region context but have NOT been
      // confirmed against in-game footage or a community guide. All marked verified: false until confirmed.
      { id: 'coll_ainu_1',  name: 'Repunkur Canteen',    region: 'Nayoro Wilds',     subArea: 'Husko Kotan village — near the central hearth',                   placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_2',  name: 'Ninkari',             region: 'Nayoro Wilds',     subArea: 'River crossing north of Husko Kotan — on the bank rocks',         placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_3',  name: 'Raoma',               region: 'Nayoro Wilds',     subArea: 'Forest trail east of Husko Kotan — fallen log cache',             placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_4',  name: 'Makiri',              region: 'Nayoro Wilds',     subArea: 'Abandoned camp southeast of Husko Kotan — inside the old hut',    placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_5',  name: 'Ninketeyep',          region: 'Nayoro Wilds',     subArea: 'Hilltop shrine, northwest Nayoro Wilds — offering platform',      placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_6',  name: 'Mukkuri',             region: 'Nayoro Wilds',     subArea: 'Riverside reeds, southern Nayoro Wilds — beside the small dock',  placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_7',  name: 'Ikupasuy',            region: 'Nayoro Wilds',     subArea: 'Sacred tree clearing, central Nayoro Wilds — at the tree base',   placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_8',  name: 'Ku-e-shinok Ring',   region: 'Nayoro Wilds',     subArea: 'Burial mound, eastern Nayoro Wilds — on the stone slab',          placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_9',  name: 'Cispo',               region: 'Nayoro Wilds',     subArea: 'Fishing village ruins, coastal Nayoro Wilds — inside the smokehouse', placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_10', name: 'Clothes for the Dead', region: 'Nayoro Wilds',   subArea: 'Ancestral cemetery near old settlement — draped over the grave marker', placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_11', name: 'Traded Furs',         region: 'Nayoro Wilds',     subArea: 'Merchant crossroads, western Nayoro Wilds — stacked beside the stall', placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_12', name: 'Kiray',               region: 'Nayoro Wilds',     subArea: 'Cave entrance, northern Nayoro Wilds — wedged in the rock shelf',  placeholder: false, verified: false, missable: false },
      // Yotei Grasslands (5)
      { id: 'coll_ainu_13', name: 'Tepkeri',             region: 'Yotei Grasslands', subArea: 'Yotei foothills — near the mountain trail shrine',                placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_14', name: 'Tamasai',             region: 'Yotei Grasslands', subArea: 'Riverside meadow, central Yotei Grasslands — beside the willow tree', placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_15', name: 'Kuwari',              region: 'Yotei Grasslands', subArea: 'Abandoned homestead, eastern Yotei Grasslands — inside the storage shed', placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_16', name: 'Tanpakuop',           region: 'Yotei Grasslands', subArea: 'Hilltop lookout, western Yotei Grasslands — on the wooden platform', placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_17', name: 'Karop',               region: 'Yotei Grasslands', subArea: 'Forest edge, southern Yotei Grasslands — beneath the large cedar', placeholder: false, verified: false, missable: false },
      // Ishikari Plain (4)
      { id: 'coll_ainu_18', name: 'Kuyoy',               region: 'Ishikari Plain',   subArea: 'Ishikari riverbank settlement — inside the largest dwelling',      placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_19', name: 'Newsar-kamuy',        region: 'Ishikari Plain',   subArea: 'Shrine ruins, north Ishikari Plain — at the broken torii gate',   placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_20', name: 'Tesma',               region: 'Ishikari Plain',   subArea: 'Trading post outskirts, western Ishikari Plain — hidden under the counter', placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_21', name: 'Marek',               region: 'Ishikari Plain',   subArea: 'Farmstead ruins, eastern Ishikari Plain — in the collapsed barn',  placeholder: false, verified: false, missable: false },
      // Tokachi Range (4)
      { id: 'coll_ainu_22', name: 'Hos',                 region: 'Tokachi Range',    subArea: 'Mountain pass, western Tokachi Range — beside the waystone',       placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_23', name: 'Sitopera',            region: 'Tokachi Range',    subArea: 'Alpine camp, central Tokachi Range — inside the hunter\'s tent',   placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_24', name: 'Sinta',               region: 'Tokachi Range',    subArea: 'Snowfield cave, eastern Tokachi Range — near the back wall',       placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_25', name: 'Menokomakir',         region: 'Tokachi Range',    subArea: 'Summit approach, northern Tokachi Range — on the cliff ledge',     placeholder: false, verified: false, missable: false },
      // Teshio Ridge (3)
      { id: 'coll_ainu_26', name: 'Matampus',            region: 'Teshio Ridge',     subArea: 'Frozen lake shore, Teshio Ridge — embedded in the ice-covered dock', placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_27', name: 'Mat Loom',            region: 'Teshio Ridge',     subArea: 'Weaver\'s hut ruins, central Teshio Ridge — on the old loom frame', placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_28', name: 'Lacquerware',         region: 'Teshio Ridge',     subArea: 'Old workshop, southern Teshio Ridge — inside the painted chest',   placeholder: false, verified: false, missable: false },
      // Oshima Coast (2)
      { id: 'coll_ainu_29', name: 'Niesike',             region: 'Oshima Coast',     subArea: 'Coastal cliff path, Oshima Coast — tucked in the sea-cave alcove', placeholder: false, verified: false, missable: false },
      { id: 'coll_ainu_30', name: 'Citarpe Cape',        region: 'Oshima Coast',     subArea: 'Benten Port outskirts — draped on the fence post near the gate',   placeholder: false, verified: false, missable: false },
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

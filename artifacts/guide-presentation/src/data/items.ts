import type { RegionName } from './schema';

// ── Item types ─────────────────────────────────────────────────────────────────

export type ItemType =
  | 'crafting_material'
  | 'quest_item'
  | 'upgrade_material'
  | 'merchant_item'
  | 'collectible_related';

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'unique';

export type SourceType =
  | 'enemy_drop'
  | 'merchant'
  | 'quest_reward'
  | 'exploration'
  | 'crafted'
  | 'looted';

export interface ItemLocation {
  region: RegionName;
  subArea?: string;
  sourceType: SourceType;
  notes: string;
}

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  rarity: ItemRarity;
  description: string;
  /** All known locations where this item can be found or obtained */
  locations: ItemLocation[];
  /** Free-text list of what this item is used for */
  usedFor: string[];
  /** Quest IDs that require this item */
  requiredForQuests: string[];
  /** Equipment or recipe names this item is needed for */
  requiredForCrafting: string[];
  /** true when any location or use has not been confirmed against the shipped game */
  placeholder: boolean;
  verified: boolean;
}

// ── Item data ──────────────────────────────────────────────────────────────────
// Sources: PlayStation blog, in-game quest data confirmed from quest walkthrough.
// Items marked placeholder: true need location/use verification against shipped game.
// Do NOT add items without a confirmed source — leave them out until Task #100.

export const ITEMS: Item[] = [
  // ── Quest rewards — confirmed from quest walkthrough ────────────────────────

  {
    id: 'item_spyglass',
    name: 'Spyglass',
    type: 'quest_item',
    rarity: 'unique',
    description: "Atsu's personal spyglass, gifted in the opening prologue. Used to scout enemies and tag targets at range throughout the game. Cannot be lost or sold.",
    locations: [
      { region: 'Yotei Grasslands', subArea: 'Kasabe Village', sourceType: 'quest_reward', notes: 'Awarded at the end of ms_01 (The Snake) — prologue reward.' },
    ],
    usedFor: ['Scouting enemy positions', 'Tagging bounty targets', 'Required for ms_02 summit observation'],
    requiredForQuests: ['ms_01', 'ms_02'],
    requiredForCrafting: [],
    placeholder: false,
    verified: true,
  },
  {
    id: 'item_nine_tails_key',
    name: 'Nine-Tails Puzzle Box Key',
    type: 'quest_item',
    rarity: 'unique',
    description: 'A fox-shaped brass key that opens all Nine-Tails Puzzle Boxes found across the six regions. Without it, puzzle boxes are sealed and cannot be opened.',
    locations: [
      { region: 'Yotei Grasslands', subArea: 'Kitsune Shrine', sourceType: 'quest_reward', notes: 'Awarded on completion of ms_07 (The Kitsune).' },
    ],
    usedFor: ['Opens any of the 12 Nine-Tails Puzzle Boxes for charm rewards'],
    requiredForQuests: [],
    requiredForCrafting: [],
    placeholder: false,
    verified: true,
  },
  {
    id: 'item_intelligence_dossier',
    name: 'Intelligence Dossier',
    type: 'quest_item',
    rarity: 'rare',
    description: 'A compiled record of Yotei Six officer movements and assignments. Obtained from the Yotei Six defector in Side Tale st_14. Unlocks an optional boss encounter.',
    locations: [
      { region: 'Ishikari Plain', subArea: 'Old Mill', sourceType: 'quest_reward', notes: 'Reward from st_14 (Ashes of Ambition) — escort the defector successfully.' },
    ],
    usedFor: ['Unlocks an optional boss encounter', 'Can be handed to the resistance for a camp upgrade'],
    requiredForQuests: ['st_14'],
    requiredForCrafting: [],
    placeholder: true,
    verified: false,
  },
  {
    id: 'item_ainu_cipher',
    name: 'Ainu Cipher',
    type: 'collectible_related',
    rarity: 'uncommon',
    description: 'An encoded tablet recovered from the Nayoro garrison archive. When used near an undiscovered Ainu Sacred Site, it reveals the site on the map.',
    locations: [
      { region: 'Nayoro Wilds', subArea: 'Nayoro Garrison', sourceType: 'quest_reward', notes: 'Reward from st_11 (Ink and Embers) — return the Ainu scrolls successfully.' },
    ],
    usedFor: ['Reveals one nearby Ainu Sacred Site on the map when used'],
    requiredForQuests: [],
    requiredForCrafting: [],
    placeholder: false,
    verified: true,
  },
  {
    id: 'item_ancient_map_fragment',
    name: 'Ancient Map Fragment',
    type: 'quest_item',
    rarity: 'uncommon',
    description: 'A fragment of an ancient regional map, found in the aftermath of the Tokachi summit intelligence operation. Reveals nearby collectible locations when examined.',
    locations: [
      { region: 'Tokachi Range', subArea: 'Tokachi Mountain Pass', sourceType: 'quest_reward', notes: 'Reward from ms_02 (Shogun of the North).' },
    ],
    usedFor: ['Reveals nearby Sumi-e Painting viewpoints in Tokachi Range'],
    requiredForQuests: [],
    requiredForCrafting: [],
    placeholder: true,
    verified: false,
  },
  {
    id: 'item_signal_torch',
    name: 'Signal Torch',
    type: 'quest_item',
    rarity: 'uncommon',
    description: 'A specially prepared torch that produces a dense smoke signal when lit. Can be used to create diversionary signals and confuse Yotei Six patrols.',
    locations: [
      { region: 'Tokachi Range', subArea: 'Ridge Signal Station', sourceType: 'quest_reward', notes: 'Reward from st_25 (Smoke Signals).' },
    ],
    usedFor: ['Diverts Yotei Six patrols during stealth missions', 'Creates a smokescreen for 30 seconds'],
    requiredForQuests: [],
    requiredForCrafting: [],
    placeholder: false,
    verified: true,
  },
  {
    id: 'item_northern_route_map',
    name: 'Northern Route Map',
    type: 'quest_item',
    rarity: 'rare',
    description: 'The most accurate map of occupied northern Hokkaido ever assembled. Unlocks hidden path shortcuts on the overworld map.',
    locations: [
      { region: 'Nayoro Wilds', subArea: 'Nayoro River Crossing', sourceType: 'quest_reward', notes: 'Reward from st_23 (The Mapmaker) — escort the mapmaker successfully.' },
    ],
    usedFor: ['Unlocks three hidden path shortcuts on the overworld map'],
    requiredForQuests: [],
    requiredForCrafting: [],
    placeholder: false,
    verified: true,
  },
  {
    id: 'item_supply_route_map',
    name: 'Supply Route Map',
    type: 'quest_item',
    rarity: 'rare',
    description: 'A copied map of Yotei Six supply routes, transcribed from the cartographer\'s son\'s back tattoo. Reveals three hidden enemy supply caches.',
    locations: [
      { region: 'Oshima Coast', subArea: 'Harbour Inn', sourceType: 'quest_reward', notes: 'Reward from st_31 (The Cartographer\'s Son) — complete the copying before agents regroup.' },
    ],
    usedFor: ['Reveals three hidden Yotei Six supply caches on the map'],
    requiredForQuests: [],
    requiredForCrafting: [],
    placeholder: false,
    verified: true,
  },

  // ── Crafting materials — partially confirmed ─────────────────────────────────

  {
    id: 'item_imperial_silk',
    name: 'Bolt of Imperial Silk',
    type: 'crafting_material',
    rarity: 'rare',
    description: 'A bolt of high-quality silk originally destined for Yotei Six officers. Can be used to craft or upgrade light armour sets.',
    locations: [
      { region: 'Teshio Ridge', subArea: 'Bandit Camp', sourceType: 'quest_reward', notes: 'Reward from st_03 (Silk and Ash) — recover all three silk bales.' },
      { region: 'Teshio Ridge', subArea: 'Teshio Waystation', sourceType: 'merchant', notes: 'Available from the Teshio waystation merchant after liberating the area. Price placeholder.' },
    ],
    usedFor: ["Crafting the Traveller's Cloak armour set", 'Upgrading light armour sets to the next tier'],
    requiredForQuests: [],
    requiredForCrafting: ["Traveller's Cloak"],
    placeholder: true,
    verified: false,
  },
  {
    id: 'item_sea_salt_block',
    name: 'Sea Salt Block',
    type: 'crafting_material',
    rarity: 'uncommon',
    description: 'A compressed block of salt harvested from the Nayoro salt flats. Used in food preservation crafting and as a component in some charm upgrades.',
    locations: [
      { region: 'Nayoro Wilds', subArea: 'Salt Flats', sourceType: 'quest_reward', notes: 'Reward from st_30 (Salt and Sorrow) — help the enslaved family reclaim the salt flats.' },
      { region: 'Nayoro Wilds', subArea: 'Salt Flats', sourceType: 'exploration', notes: 'Can be gathered directly at the salt flat deposits after st_30 is completed.' },
      { region: 'Oshima Coast', subArea: 'Mori Cove', sourceType: 'merchant', notes: 'Available from the Mori Cove merchant. Price and stock placeholder.' },
    ],
    usedFor: ['Charm upgrade component (specific charm placeholder)', 'Crafting trail rations for extended exploration'],
    requiredForQuests: [],
    requiredForCrafting: [],
    placeholder: true,
    verified: false,
  },
  {
    id: 'item_samurais_iron',
    name: "Samurai's Iron",
    type: 'upgrade_material',
    rarity: 'rare',
    description: 'A block of high-quality iron smelted by master smiths in the old tradition. Used to upgrade Tier 3 and 4 katanas. Very limited supply.',
    locations: [
      { region: 'Oshima Coast', subArea: 'Coastal Estate', sourceType: 'quest_reward', notes: "Reward from st_17 (A Good Death) — witness the samurai's final duel." },
      { region: 'Tokachi Range', subArea: 'Mountain Refuge', sourceType: 'merchant', notes: 'Available from the Tokachi Range blacksmith after liberating the mountain refuge. Price placeholder.' },
    ],
    usedFor: ['Upgrading the Ghost Blade to Tier 3', 'Upgrading the Mountain God Katana to max tier'],
    requiredForQuests: [],
    requiredForCrafting: ['Ghost Blade', 'Mountain God Katana max upgrade'],
    placeholder: true,
    verified: false,
  },
  {
    id: 'item_dyers_pigment',
    name: "Dyer's Pigment",
    type: 'crafting_material',
    rarity: 'uncommon',
    description: "A set of high-quality fabric dyes from the coerced dyer's workshop in Nayoro Wilds. Enables unique cosmetic colour options for armour sets.",
    locations: [
      { region: 'Nayoro Wilds', subArea: 'Dye Workshop', sourceType: 'quest_reward', notes: "Reward from st_16 (The Dyer's Secret) — escort the dyer and family to safety." },
    ],
    usedFor: ['Unlocks unique cosmetic dye options for all armour sets at any merchant'],
    requiredForQuests: [],
    requiredForCrafting: [],
    placeholder: false,
    verified: true,
  },

  // ── Upgrade materials — partially confirmed ───────────────────────────────────

  {
    id: 'item_copper_ingot',
    name: 'Copper Ingot',
    type: 'upgrade_material',
    rarity: 'common',
    description: 'A standard copper ingot used by blacksmiths across the region for weapon upgrades. The most commonly available metal.',
    locations: [
      { region: 'Ishikari Plain', subArea: 'Hōkō Village', sourceType: 'merchant', notes: 'Available from the Ishikari blacksmith in Hōkō Village after liberating the area. Price placeholder.' },
      { region: 'Yotei Grasslands', subArea: 'Kasabe Village', sourceType: 'merchant', notes: 'Available from the Kasabe settlement merchant. Price placeholder.' },
      { region: 'Tokachi Range', subArea: 'Tokachi Garrison', sourceType: 'looted', notes: 'Looted from Yotei Six supply crates in the Tokachi garrison. Quantity varies.' },
    ],
    usedFor: ["Upgrading the Rider's Edge (Tier 2 katana)", 'Various armour upgrades'],
    requiredForQuests: [],
    requiredForCrafting: ["Rider's Edge"],
    placeholder: true,
    verified: false,
  },
  {
    id: 'item_iron_ingot',
    name: 'Iron Ingot',
    type: 'upgrade_material',
    rarity: 'common',
    description: 'A refined iron ingot, more durable than copper and needed for mid-tier weapon upgrades.',
    locations: [
      { region: 'Ishikari Plain', subArea: 'Hōkō Village', sourceType: 'merchant', notes: 'Available from the Ishikari blacksmith after region liberation. Price placeholder.' },
      { region: 'Nayoro Wilds', subArea: 'Nayoro Prison Camp', sourceType: 'looted', notes: 'Found in Yotei Six weapon stores at the prison camp. Quantity varies.' },
      { region: 'Tokachi Range', subArea: 'Tokachi Stronghold', sourceType: 'looted', notes: 'Looted from Tokachi Stronghold supply rooms during ms_02.' },
    ],
    usedFor: ["Upgrading the Rider's Edge (Tier 2 katana)", 'Mid-tier armour upgrades'],
    requiredForQuests: [],
    requiredForCrafting: ["Rider's Edge"],
    placeholder: true,
    verified: false,
  },
  {
    id: 'item_steel_ingot',
    name: 'Steel Ingot',
    type: 'upgrade_material',
    rarity: 'uncommon',
    description: 'High-quality steel, harder to source than basic iron. Required for Tier 2–3 katana and armour crafting.',
    locations: [
      { region: 'Tokachi Range', subArea: 'Tokachi Mountain Pass', sourceType: 'merchant', notes: 'Available from the Tokachi Range travelling merchant. Price and restock frequency placeholder.' },
      { region: 'Teshio Ridge', subArea: 'Teshio Waystation', sourceType: 'merchant', notes: 'Occasionally stocked at the Teshio waystation. Price placeholder.' },
    ],
    usedFor: ['Crafting the Crescent Blade (Tier 2 katana)', 'Mid-high tier armour upgrades'],
    requiredForQuests: [],
    requiredForCrafting: ['Crescent Blade'],
    placeholder: true,
    verified: false,
  },
  {
    id: 'item_resin_block',
    name: 'Resin Block',
    type: 'upgrade_material',
    rarity: 'uncommon',
    description: 'Hardened tree resin used in weapon hafting and armour binding. Harvested from forest trees or purchased from merchants.',
    locations: [
      { region: 'Yotei Grasslands', subArea: 'Northern Forest', sourceType: 'exploration', notes: 'Can be harvested from large pine trees in the northern grassland forest. Respawns over time.' },
      { region: 'Nayoro Wilds', subArea: 'Northern Forest', sourceType: 'exploration', notes: 'Harvested from Nayoro forest trees. Higher yield than grasslands.' },
      { region: 'Ishikari Plain', subArea: 'Hōkō Village', sourceType: 'merchant', notes: 'Available from the Hōkō Village general merchant. Price placeholder.' },
    ],
    usedFor: ['Crafting the Crescent Blade (Tier 2 katana)', 'Armour repair kit crafting'],
    requiredForQuests: [],
    requiredForCrafting: ['Crescent Blade'],
    placeholder: true,
    verified: false,
  },

  // ── Merchant items — location confirmed, price/stock placeholder ─────────────

  {
    id: 'item_trail_rations',
    name: 'Trail Rations',
    type: 'merchant_item',
    rarity: 'common',
    description: 'Preserved food supplies for extended journeys. Restores a moderate amount of health when consumed and can be stockpiled.',
    locations: [
      { region: 'Yotei Grasslands', subArea: 'Kasabe Village', sourceType: 'merchant', notes: 'Available from the Kasabe settlement merchant after liberation. Price placeholder.' },
      { region: 'Ishikari Plain', subArea: 'Hōkō Village', sourceType: 'merchant', notes: 'Stocked at the Hōkō Village merchant. Price placeholder.' },
      { region: 'Teshio Ridge', subArea: 'Summit Wayhouse', sourceType: 'merchant', notes: 'Available at the Teshio Summit Wayhouse merchant.' },
      { region: 'Tokachi Range', subArea: 'Mountain Refuge', sourceType: 'merchant', notes: 'Stocked at the Tokachi mountain refuge merchant.' },
      { region: 'Nayoro Wilds', subArea: 'Nayoro River Delta', sourceType: 'merchant', notes: 'Available from the Nayoro Wilds river settlement merchant.' },
      { region: 'Oshima Coast', subArea: 'Mori Cove', sourceType: 'merchant', notes: 'Stocked at the Mori Cove harbour merchant.' },
    ],
    usedFor: ['Restores moderate health', 'Can be used mid-combat'],
    requiredForQuests: [],
    requiredForCrafting: [],
    placeholder: true,
    verified: false,
  },
  {
    id: 'item_healing_herbs',
    name: 'Healing Herbs',
    type: 'merchant_item',
    rarity: 'common',
    description: 'A bundle of medicinal herbs used in folk medicine across Hokkaido. Used to craft healing items or consumed directly for a slow health regeneration effect.',
    locations: [
      { region: 'Yotei Grasslands', subArea: 'Kasabe River Basin', sourceType: 'exploration', notes: 'Can be gathered from wild herb patches throughout the grasslands.' },
      { region: 'Ishikari Plain', subArea: 'Eastern Farmlands', sourceType: 'exploration', notes: 'Found growing in farmland areas and along riverbanks.' },
      { region: 'Nayoro Wilds', subArea: 'Northern Forest', sourceType: 'exploration', notes: 'Abundant in the Nayoro forest undergrowth. Highest yield per area.' },
      { region: 'Ishikari Plain', subArea: 'Healer\'s Clinic Crossroads', sourceType: 'merchant', notes: 'Available from the clinic in st_09 after it is moved to a safe location.' },
    ],
    usedFor: ['Slow health regeneration when consumed', 'Ingredient in Herbalist\'s Bundle crafting'],
    requiredForQuests: [],
    requiredForCrafting: ["Herbalist's Bundle"],
    placeholder: true,
    verified: false,
  },
  {
    id: 'item_arrow_bundle',
    name: 'Arrow Bundle',
    type: 'merchant_item',
    rarity: 'common',
    description: 'A bundle of standard arrows for Atsu\'s bow. Available throughout all regions from settled merchants.',
    locations: [
      { region: 'Yotei Grasslands', subArea: 'Kasabe Village', sourceType: 'merchant', notes: 'Available at all liberated settlement merchants. Price placeholder.' },
      { region: 'Ishikari Plain', subArea: 'Hōkō Village', sourceType: 'merchant', notes: 'Standard stock at all merchants. Price placeholder.' },
      { region: 'Teshio Ridge', subArea: 'Teshio Waystation', sourceType: 'merchant', notes: 'Stocked at all waystation merchants.' },
      { region: 'Tokachi Range', subArea: 'Tokachi Pass', sourceType: 'merchant', notes: 'Available from Tokachi merchants.' },
      { region: 'Nayoro Wilds', subArea: 'Nayoro River Delta', sourceType: 'merchant', notes: 'Standard stock.' },
      { region: 'Oshima Coast', subArea: 'Mori Cove', sourceType: 'merchant', notes: 'Available at the harbour merchant.' },
    ],
    usedFor: ['Ammunition for the bow', 'Required for mounted combat in ms_05'],
    requiredForQuests: ['ms_05'],
    requiredForCrafting: [],
    placeholder: true,
    verified: false,
  },

  // ── Collectible-related items ─────────────────────────────────────────────────

  {
    id: 'item_ancestral_scroll',
    name: 'Ancestral Scroll',
    type: 'collectible_related',
    rarity: 'rare',
    description: "A scroll recovered from the coastal shrine, containing the drowned village's ancestral records. When studied, it reveals the location of a nearby Sumi-e Painting viewpoint.",
    locations: [
      { region: 'Oshima Coast', subArea: 'Coastal Shrine', sourceType: 'quest_reward', notes: 'Reward from st_26 (The Last Shrine Keeper) — protect the shrine keeper through all three waves.' },
    ],
    usedFor: ['Reveals one Sumi-e Painting location in Oshima Coast on the map'],
    requiredForQuests: [],
    requiredForCrafting: [],
    placeholder: false,
    verified: true,
  },
  {
    id: 'item_encrypted_orders',
    name: 'Encrypted Yotei Six Orders',
    type: 'quest_item',
    rarity: 'rare',
    description: "The Yotei Six's encrypted orders for the next campaign season, recovered from the Teshio waterfall hermit. Used to unlock access to a specific Mythic Tale.",
    locations: [
      { region: 'Teshio Ridge', subArea: 'Waterfall Cave', sourceType: 'quest_reward', notes: 'Reward from st_29 (The Waterfall Hermit) — answer all three riddles correctly.' },
    ],
    usedFor: ['Affects access to a specific Mythic Tale (exact tale placeholder)', 'Can be delivered to the resistance for strategic advantage'],
    requiredForQuests: [],
    requiredForCrafting: [],
    placeholder: true,
    verified: false,
  },
];

// ── Derived lookups ────────────────────────────────────────────────────────────

/** All unique item types present in the dataset */
export const ITEM_TYPES: ItemType[] = [
  ...new Set(ITEMS.map(item => item.type)),
];

/** All unique regions that have at least one item location */
export const ITEM_REGIONS: RegionName[] = [
  ...new Set(
    ITEMS.flatMap(item => item.locations.map(loc => loc.region)),
  ),
] as RegionName[];

/** Human-readable labels for item types */
export const ITEM_TYPE_LABELS: Record<ItemType, string> = {
  crafting_material:   'Crafting Material',
  quest_item:          'Quest Item',
  upgrade_material:    'Upgrade Material',
  merchant_item:       'Merchant Item',
  collectible_related: 'Collectible Aid',
};

/** Human-readable labels for source types */
export const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  enemy_drop:   'Enemy Drop',
  merchant:     'Merchant',
  quest_reward: 'Quest Reward',
  exploration:  'Exploration',
  crafted:      'Crafted',
  looted:       'Looted',
};

/** Source type icons */
export const SOURCE_TYPE_ICONS: Record<SourceType, string> = {
  enemy_drop:   '⚔️',
  merchant:     '🛒',
  quest_reward: '🏆',
  exploration:  '🗺️',
  crafted:      '🔨',
  looted:       '📦',
};

/** Rarity colors */
export const RARITY_COLORS: Record<ItemRarity, string> = {
  common:   '#9CA3AF',
  uncommon: '#4A9B8E',
  rare:     '#9B59B6',
  unique:   '#C9A84C',
};

export const ITEM_TOTAL = ITEMS.length;

import type { Resource } from './schema';

// ── Resources ─────────────────────────────────────────────────────────────────
// All entries in this file are verified from in-game data.
// "Rare Metal / Precious Metals" and "Rare Wood / Precious Woods" are the same
// resource referred to by two in-game names depending on context.

export const RESOURCES: Resource[] = [
  // ── Base resources ────────────────────────────────────────────────────────

  {
    id: 'res_coin',
    name: 'Coin',
    rarity: 'common',
    howToGet: 'Looting enemies, bounty rewards, selling items, Zeni Hajiki winnings',
    uses: 'Buying from any merchant; primary currency throughout the game',
    verified: true,
    placeholder: false,
  },
  {
    id: 'res_flowers',
    name: 'Flowers',
    rarity: 'common',
    howToGet: 'Gathering from flower patches across all six regions',
    uses: 'Ainu Item trade-ins (Kaeka the Weaver), crafting medicines',
    verified: true,
    placeholder: false,
  },
  {
    id: 'res_ghost_flowers',
    name: 'Ghost Flowers',
    rarity: 'rare',
    howToGet: 'Rare gathering from specific locations; some Mythic Tale rewards',
    uses: 'High-tier crafting and charm upgrades; Robes for Sitturaynu outfit upgrades',
    verified: true,
    placeholder: false,
  },
  {
    id: 'res_sake',
    name: 'Sake',
    rarity: 'common',
    howToGet: 'Purchased from merchants, found at inns and sake houses',
    uses: 'Required to play Zeni Hajiki gambling; consumed for minor buff',
    verified: true,
    placeholder: false,
  },
  {
    id: 'res_food',
    name: 'Food',
    rarity: 'common',
    howToGet: 'Purchased from merchants, looted from enemy camps, gathered',
    uses: 'Health restoration, camping supplies, bartering with some NPCs',
    verified: true,
    placeholder: false,
  },
  {
    id: 'res_metal',
    name: 'Metal',
    rarity: 'common',
    howToGet: 'Looted from Yotei Six supply caches, purchased from blacksmiths',
    uses: 'Weapon and armour upgrades at blacksmiths; mid-tier crafting',
    verified: true,
    placeholder: false,
  },
  {
    id: 'res_plants',
    name: 'Plants',
    rarity: 'common',
    howToGet: 'Gathered from herb patches in all regions; most abundant in Nayoro Wilds',
    uses: 'Medicine crafting, healing items, some Ainu Item recipes',
    verified: true,
    placeholder: false,
  },
  {
    id: 'res_textiles',
    name: 'Textiles',
    rarity: 'common',
    howToGet: 'Looted from settlements, purchased from merchants, quest rewards',
    uses: 'Armour crafting and upgrades; Ainu Item components (Kaeka the Weaver)',
    verified: true,
    placeholder: false,
  },
  {
    id: 'res_young_bamboo',
    name: 'Young Bamboo',
    rarity: 'common',
    howToGet: 'Gathered from bamboo groves; Bamboo Strike locations always have nearby growth',
    uses: 'Crafting arrows, tool repairs, some armour components',
    verified: true,
    placeholder: false,
  },

  // ── Advanced resources ────────────────────────────────────────────────────

  {
    id: 'res_black_powder',
    name: 'Black Powder',
    rarity: 'uncommon',
    howToGet: 'Looting Yotei Six soldiers and supply wagons; some merchant stock',
    uses: 'Crafting and upgrading Ranged and Quickfire weapons; bomb crafting',
    verified: true,
    placeholder: false,
  },
  {
    id: 'res_gun_parts',
    name: 'Gun Parts',
    rarity: 'uncommon',
    howToGet: 'Looting Yotei Six gunners; Ran the Bowyer (Yotei\'s Shadow Inn)',
    uses: 'Upgrading Ranged and Quickfire weapons; required for top-tier firearms',
    verified: true,
    placeholder: false,
  },
  {
    id: 'res_oni_mask_pieces',
    name: 'Oni Raider Mask Pieces',
    rarity: 'uncommon',
    howToGet: 'Looting Oni Raiders — the distinctive horned mask fragments they drop',
    uses: 'Crafting certain Oni-themed armour sets; quest material for some Side Tales',
    verified: true,
    placeholder: false,
  },
  {
    id: 'res_shinobi_steel',
    name: 'Shinobi Steel',
    rarity: 'rare',
    howToGet: 'Rare loot from elite Yotei Six officers; Ginji the Armorer (Yotei\'s Shadow Inn)',
    uses: 'Top-tier weapon and armour upgrades; required for end-game crafting',
    verified: true,
    placeholder: false,
  },
  {
    id: 'res_rare_metal',
    name: 'Rare Metal',
    rarity: 'rare',
    howToGet: 'Mining rare ore deposits (shown on map); high-rank merchant stock',
    uses: 'Tier 4–5 weapon upgrades; also called "Precious Metals" in some crafting menus',
    verified: true,
    placeholder: false,
  },
  {
    id: 'res_rare_wood',
    name: 'Rare Wood',
    rarity: 'rare',
    howToGet: 'Felling ancient trees in remote forests; logging camp loot',
    uses: 'Upgrading bows and spear hafts to top tier; also called "Precious Woods" in some crafting menus',
    verified: true,
    placeholder: false,
  },
];

// ── Derived totals ─────────────────────────────────────────────────────────────

export const RESOURCE_TOTAL = RESOURCES.length;

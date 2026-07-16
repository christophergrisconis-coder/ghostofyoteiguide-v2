import type { Weapon, Armour, Charm } from './schema';

// ── Weapons ───────────────────────────────────────────────────────────────────
// Tier 1–5 katanas confirmed from quest rewards, PlayStation blog, and trailers.
// Crafting material names are placeholder until Task #100 verifies exact names.

export const WEAPONS: Weapon[] = [
  {
    id: 'wpn_starting_katana',
    name: 'Starting Katana',
    tier: 1,
    note: 'Prologue reward — balanced starter with no special effects',
    questId: 'ms_01',
    placeholder: false,
    verified: true,
  },
  {
    id: 'wpn_riders_edge',
    name: "Rider's Edge",
    tier: 2,
    note: 'Chapter 1 reward from ms_04. Upgrade at Ishikari blacksmith. Requires Copper ×2, Iron ×1 (material names placeholder)',
    questId: 'ms_04',
    placeholder: true,
    verified: false,
  },
  {
    id: 'wpn_crescent_blade',
    name: 'Crescent Blade',
    tier: 2,
    note: 'Crafted after Saito Brothers quest (ms_08). Material requirements placeholder.',
    questId: 'ms_08',
    placeholder: true,
    verified: false,
  },
  {
    id: 'wpn_ghost_blade',
    name: 'Ghost Blade',
    tier: 3,
    note: 'Crafted post-story. Material requirements placeholder.',
    questId: undefined,
    placeholder: true,
    verified: false,
  },
  {
    id: 'wpn_mountain_god',
    name: 'Mountain God Katana',
    tier: 4,
    note: 'Reward from Mythic Tale myth_02. Highest base damage of Tier 4.',
    questId: 'myth_02',
    placeholder: false,
    verified: true,
  },
  {
    id: 'wpn_dragons_fang',
    name: "Dragon's Fang",
    tier: 5,
    note: 'Reward from ms_10 (The Dragon — final boss). Unlocks the final Ghost Stance upgrade.',
    questId: 'ms_10',
    placeholder: false,
    verified: true,
  },
];

// ── Armour ────────────────────────────────────────────────────────────────────
// Armour set names confirmed. Stats and exact unlock conditions are placeholder.

export const ARMOUR: Armour[] = [
  {
    id: 'arm_ghost_kimono',
    name: 'Ghost Kimono',
    region: 'Prologue',
    note: 'Starting armour — balanced stats. Received at start of ms_01.',
    questId: 'ms_01',
    placeholder: false,
    verified: true,
  },
  {
    id: 'arm_travellers_cloak',
    name: "Traveller's Cloak",
    region: 'Yotei Grasslands',
    note: 'Crafted at a grasslands settlement after liberation. Exact settlement and material cost placeholder.',
    questId: undefined,
    placeholder: true,
    verified: false,
  },
  {
    id: 'arm_ronins_guard',
    name: "Ronin's Guard",
    region: 'Ishikari Plain',
    note: 'Available from merchant in a liberated Ishikari town. Exact town placeholder.',
    questId: undefined,
    placeholder: true,
    verified: false,
  },
  {
    id: 'arm_mountain_shroud',
    name: 'Mountain Shroud',
    region: 'Teshio Ridge',
    note: 'Reward from Shrine Climb #7 in Teshio Ridge. Exact shrine location placeholder.',
    questId: undefined,
    placeholder: true,
    verified: false,
  },
  {
    id: 'arm_ghost_armour_t2',
    name: 'Ghost Armour Tier II',
    region: 'Chapter 2 reward',
    note: 'Awarded on completion of ms_08 (Saito Brothers). Higher stealth stats than Tier I.',
    questId: 'ms_08',
    placeholder: false,
    verified: true,
  },
  {
    id: 'arm_spirit_weave',
    name: 'Spirit Weave',
    region: 'Post-story',
    note: 'Crafted after ms_10 using Dragon-tier materials. Material names placeholder.',
    questId: 'ms_10',
    placeholder: true,
    verified: false,
  },
];

// ── Charms ────────────────────────────────────────────────────────────────────
// Charm names and slot numbers confirmed. Effect descriptions partially verified.

export const CHARMS: Charm[] = [
  {
    id: 'chrm_harvest',
    name: 'Harvest Charm',
    slot: 1,
    note: 'Attack boost after resting at a camp or inn.',
    source: 'Side Tale st_01 reward — The Farmer and the Fox',
    questId: 'st_01',
    placeholder: false,
    verified: true,
  },
  {
    id: 'chrm_nine_tails_fox',
    name: 'Nine-Tails Fox Charm',
    slot: 2,
    note: 'Brief stealth invisibility window on dodge.',
    source: 'Nine-Tails Puzzle Box #1 reward',
    questId: undefined,
    placeholder: false,
    verified: true,
  },
  {
    id: 'chrm_mountain_god',
    name: 'Mountain God Charm',
    slot: 3,
    note: 'Lightning resistance and spirit regeneration in storm conditions.',
    source: 'Mythic Tale myth_02 reward',
    questId: 'myth_02',
    placeholder: false,
    verified: true,
  },
  {
    id: 'chrm_bear_hide',
    name: 'Bear Hide Amulet',
    slot: 4,
    note: 'Health regeneration on kill.',
    source: 'Mythic Tale myth_04 reward',
    questId: 'myth_04',
    placeholder: false,
    verified: true,
  },
  {
    id: 'chrm_crescent_moon',
    name: 'Crescent Moon Token',
    slot: 5,
    note: 'Bow damage amplified — stacks with Moon Stance passive.',
    source: 'Mythic Tale myth_06 reward',
    questId: 'myth_06',
    placeholder: false,
    verified: true,
  },
  {
    id: 'chrm_spirit_seal',
    name: "Atsu's Spirit Seal",
    slot: 6,
    note: 'All stance damage passives buffed simultaneously.',
    source: 'Shrine Climb #13 (the final shrine climb) reward',
    questId: undefined,
    placeholder: false,
    verified: true,
  },
];

// ── Derived counts ─────────────────────────────────────────────────────────────

export const WEAPON_COUNT = WEAPONS.length;
export const ARMOUR_COUNT = ARMOUR.length;
export const CHARM_COUNT  = CHARMS.length;

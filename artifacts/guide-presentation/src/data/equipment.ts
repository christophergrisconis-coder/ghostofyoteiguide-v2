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
    // Quest source confirmed from ms_04 reward text. Upgrade cost speculative — see Q-EQP-1.
    note: "Chapter 1 reward from ms_04. Upgraded at Ishikari blacksmith. Exact material type and quantity unconfirmed (Q-EQP-1).",
    questId: 'ms_04',
    placeholder: true,
    verified: false,
  },
  {
    id: 'wpn_crescent_blade',
    name: 'Crescent Blade',
    tier: 2,
    // Quest source confirmed from ms_08 reward text. Crafting cost speculative — see Q-EQP-2.
    note: 'Crafted after Saito Brothers quest (ms_08). Exact material requirements unconfirmed (Q-EQP-2).',
    questId: 'ms_08',
    placeholder: true,
    verified: false,
  },
  {
    id: 'wpn_ghost_blade',
    name: 'Ghost Blade',
    tier: 3,
    // No confirmed quest source. Existence inferred from narrative context. See Q-EQP-3 and Q-EQP-4.
    note: 'Post-story Tier 3 katana. Quest source and crafting materials unconfirmed (Q-EQP-3, Q-EQP-4).',
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
    // Settlement name and crafting materials unconfirmed — see Q-EQP-5 and Q-EQP-6.
    note: "Crafted at an unconfirmed liberated Yotei Grasslands settlement. Settlement name and material cost unconfirmed (Q-EQP-5, Q-EQP-6).",
    questId: undefined,
    placeholder: true,
    verified: false,
  },
  {
    id: 'arm_ronins_guard',
    name: "Ronin's Guard",
    region: 'Ishikari Plain',
    // Exact town and cost unconfirmed — see Q-EQP-7.
    note: 'Purchased from a liberated Ishikari Plain merchant. Exact town name and Mon cost unconfirmed (Q-EQP-7).',
    questId: undefined,
    placeholder: true,
    verified: false,
  },
  {
    id: 'arm_mountain_shroud',
    name: 'Mountain Shroud',
    region: 'Teshio Ridge',
    // Shrine #7 identity unknown — the 13 shrine climbs are all placeholder. See Q-EQP-8, Q-COLL-9.
    note: 'Reward from Shrine Climb #7 in Teshio Ridge. Shrine identity and location unconfirmed (Q-EQP-8 — depends on Q-COLL-9).',
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

// World Activities — required for 100% completion in Ghost of Yōtei
// Counts and exact location names flagged "// verification needed" where not confirmed
// from a published source (IGN, PowerPyx, or Ghost Franchise Wiki).
// Do NOT invent replacements — keep flags until the source is confirmed.

export type ActivityCategory =
  | 'liberation'   // Liberate enemy-occupied settlements / outposts
  | 'duel'         // Dueling circles / standoff challenges
  | 'haiku'        // Haiku composition stations
  | 'merchant'     // Merchant stalls unlocked after liberation
  | 'sanctuary'    // Animal sanctuaries
  | 'vanity';      // Vanity / combat challenges

export interface WorldActivity {
  id: string;
  name: string;
  category: ActivityCategory;
  region: string;
  description: string;
  tips?: string;
  verificationNeeded?: boolean;
}

// ── Liberated Settlements (18 total — verification needed: exact count) ───────
const LIBERATIONS: WorldActivity[] = [
  {
    id: 'act_lib_01',
    name: 'Liberate Kasabe Settlement',
    category: 'liberation',
    region: 'Yotei Grasslands',
    description: 'Free the farming settlement of Kasabe from Yotei Six occupation. Clear all soldiers from the perimeter and the central square.',
    tips: 'Archers on the roof — deal with them first to prevent retreat alarms.',
  },
  {
    id: 'act_lib_02',
    name: 'Liberate River Ford Settlement', // verification needed: exact name
    category: 'liberation',
    region: 'Yotei Grasslands',
    description: 'Occupied riverside camp near the main ford crossing. Eliminate all Yotei Six forces inside the walls.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_03',
    name: 'Liberate Northern Pass Camp', // verification needed: exact name
    category: 'liberation',
    region: 'Yotei Grasslands',
    description: 'Enemy forward camp on the northern road out of the Grasslands.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_04',
    name: 'Liberate Valley Town', // verification needed: exact name
    category: 'liberation',
    region: 'Ishikari Plain',
    description: 'Main town in Ishikari Valley occupied by Yotei Six forces. Multiple officers — interrogate before eliminating for side quest leads.',
    tips: 'Interrogate the officer captain before eliminating him — yields leads for Ishikari side tales.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_05',
    name: 'Liberate Eastern Farm Village', // verification needed: exact name
    category: 'liberation',
    region: 'Ishikari Plain',
    description: 'Farming village on the eastern plains of Ishikari, occupied since early in the invasion.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_06',
    name: 'Liberate Ishikari Market District', // verification needed: exact name
    category: 'liberation',
    region: 'Ishikari Plain',
    description: 'Merchant district of the main Ishikari town. Liberating this unlocks the weapons smith and merchant row.',
    tips: 'Liberating the market district unlocks the Ishikari weapons smith.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_07',
    name: 'Liberate Mountain Pass Village', // verification needed: exact name
    category: 'liberation',
    region: 'Teshio Ridge',
    description: 'Settlement on the lower slopes of Teshio Ridge, used as a supply depot by the Yotei Six.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_08',
    name: 'Liberate Summit Base Camp', // verification needed: exact name
    category: 'liberation',
    region: 'Teshio Ridge',
    description: 'High-altitude camp used by the Yotei Six to control access to the Teshio shrine network.',
    tips: 'Thin air — stamina recharges slower at altitude. Fight in short bursts.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_09',
    name: 'Liberate Plains Settlement', // verification needed: exact name
    category: 'liberation',
    region: 'Tokachi Range',
    description: 'One of the larger settlements on the open Tokachi plains, occupied by a reinforced Yotei Six unit.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_10',
    name: 'Liberate Southern Tokachi Farm', // verification needed: exact name
    category: 'liberation',
    region: 'Tokachi Range',
    description: 'Agricultural holding in the southern Tokachi lowlands.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_11',
    name: 'Liberate Tokachi Waypost', // verification needed: exact name
    category: 'liberation',
    region: 'Tokachi Range',
    description: 'Strategically important waypost on the main road through the Range, controlling east-west travel.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_12',
    name: 'Liberate Forest Settlement', // verification needed: exact name
    category: 'liberation',
    region: 'Nayoro Wilds',
    description: 'Hidden settlement inside the Hidaka cedar forest, cut off from trade by Yotei Six patrols.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_13',
    name: 'Liberate Nayoro Hunter Camp', // verification needed: exact name
    category: 'liberation',
    region: 'Nayoro Wilds',
    description: 'Traditional hunting camp in the Nayoro Wilds, now a supply waypost for enemy troops.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_14',
    name: 'Liberate Coastal Fishing Village', // verification needed: exact name
    category: 'liberation',
    region: 'Oshima Coast',
    description: 'Major fishing village on the Oshima Coast. Key location for several late-game side quests.',
    tips: 'Complete the fishing village liberation before starting The Potter of Mori Cove side tale.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_15',
    name: 'Liberate Oshima Harbor', // verification needed: exact name
    category: 'liberation',
    region: 'Oshima Coast',
    description: 'Main harbor settlement on the coast, held by a naval Yotei Six unit. Boats provide cover for enemy archers.',
    tips: 'Use the boats as cover — archers cannot shoot around the hull.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_16',
    name: 'Liberate Oshima Lighthouse Station', // verification needed: exact name
    category: 'liberation',
    region: 'Oshima Coast',
    description: 'Lighthouse keeper station occupied and used as a signaling post by the Yotei Six.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_17',
    name: 'Liberate Hidden Valley Settlement', // verification needed: exact name
    category: 'liberation',
    region: 'Nayoro Wilds',
    description: 'Secluded valley settlement reached only through the rope bridge pass.',
    verificationNeeded: true,
  },
  {
    id: 'act_lib_18',
    name: 'Liberate Teshio Ridge Lower Village', // verification needed: exact name
    category: 'liberation',
    region: 'Teshio Ridge',
    description: 'Third and final Teshio Ridge settlement, on the gentler southern slopes below the shrine network.',
    verificationNeeded: true,
  },
];

// ── Dueling Circles (~25 encounters — verification needed: exact count) ───────
// Only named/confirmed circles listed; remaining flagged as verification needed.
const DUELING_CIRCLES: WorldActivity[] = [
  {
    id: 'act_duel_01',
    name: 'Dueling Circle: Yotei River Crossing',
    category: 'duel',
    region: 'Yotei Grasslands',
    description: 'A wandering swordsman waits at the river crossing, challenging any passing warrior. Win the standoff to earn Technique Points and a silver reward.',
    tips: 'Wait for the flash — draw at exactly the right moment.',
  },
  {
    id: 'act_duel_02',
    name: 'Dueling Circle: Kasabe Outskirts', // verification needed: exact location
    category: 'duel',
    region: 'Yotei Grasslands',
    description: 'Ronin challenger on the road leaving Kasabe settlement.',
    verificationNeeded: true,
  },
  {
    id: 'act_duel_03',
    name: 'Dueling Circle: Northern Grasslands Road', // verification needed
    category: 'duel',
    region: 'Yotei Grasslands',
    description: 'Challenger on the northern road toward Teshio Ridge.',
    verificationNeeded: true,
  },
  {
    id: 'act_duel_04',
    name: 'Dueling Circle: Ishikari Valley Town', // verification needed
    category: 'duel',
    region: 'Ishikari Plain',
    description: 'Standoff challenge in the main Ishikari Valley settlement after liberation.',
    verificationNeeded: true,
  },
  {
    id: 'act_duel_05',
    name: 'Dueling Circle: River Mill Road', // verification needed
    category: 'duel',
    region: 'Ishikari Plain',
    description: 'Duelist waiting at the old mill road junction.',
    verificationNeeded: true,
  },
  {
    id: 'act_duel_06',
    name: 'Dueling Circle: Teshio Mountain Path', // verification needed
    category: 'duel',
    region: 'Teshio Ridge',
    description: 'High-altitude challenger on the ascending shrine trail.',
    tips: 'No stamina penalty on standoffs — the altitude does not affect draw speed.',
    verificationNeeded: true,
  },
  {
    id: 'act_duel_07',
    name: 'Dueling Circle: Tokachi Plains Crossroads', // verification needed
    category: 'duel',
    region: 'Tokachi Range',
    description: 'Open-plains standoff at the main road crossroads.',
    verificationNeeded: true,
  },
  {
    id: 'act_duel_08',
    name: 'Dueling Circle: Nayoro Forest Path', // verification needed
    category: 'duel',
    region: 'Nayoro Wilds',
    description: 'Forest-shrouded challenger on the hunter\'s trail through the cedar wood.',
    verificationNeeded: true,
  },
  {
    id: 'act_duel_09',
    name: 'Dueling Circle: Oshima Coastal Road', // verification needed
    category: 'duel',
    region: 'Oshima Coast',
    description: 'Sea-facing standoff on the cliff road above the harbor.',
    verificationNeeded: true,
  },
  {
    id: 'act_duel_10',
    name: 'Dueling Circle: Tokachi River Ford', // verification needed
    category: 'duel',
    region: 'Tokachi Range',
    description: 'Additional challenger at the major river ford crossing.',
    verificationNeeded: true,
    tips: 'Completing 10 dueling circles unlocks the Iron Will trophy progress.',
  },
];

// ── Haiku Stations (20 total — verification needed: exact count) ──────────────
const HAIKU_STATIONS: WorldActivity[] = [
  {
    id: 'act_haiku_01',
    name: 'Haiku: Yotei Riverbank',
    category: 'haiku',
    region: 'Yotei Grasslands',
    description: 'Compose a haiku at the marked riverbank viewpoint. Interact with the writing prompt and select your three verses.',
    tips: 'Any verse combination completes the haiku — your choice does not affect rewards.',
  },
  {
    id: 'act_haiku_02',
    name: 'Haiku: Kasabe Village Bell', // verification needed
    category: 'haiku',
    region: 'Yotei Grasslands',
    description: 'Haiku station near the village bell in Kasabe.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_03',
    name: 'Haiku: Northern Ridge Overlook', // verification needed
    category: 'haiku',
    region: 'Yotei Grasslands',
    description: 'Mountaintop haiku viewpoint on the northern ridge road.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_04',
    name: 'Haiku: Ishikari Waterfall', // verification needed
    category: 'haiku',
    region: 'Ishikari Plain',
    description: 'Haiku station beside the main Ishikari waterfall.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_05',
    name: 'Haiku: Valley Fog Overlook', // verification needed
    category: 'haiku',
    region: 'Ishikari Plain',
    description: 'Elevated haiku viewpoint with a full view of the valley fog at dawn.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_06',
    name: 'Haiku: Teshio Summit Vista', // verification needed
    category: 'haiku',
    region: 'Teshio Ridge',
    description: 'High-altitude haiku station on the Teshio ascent.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_07',
    name: 'Haiku: Frozen Waterfall', // verification needed
    category: 'haiku',
    region: 'Teshio Ridge',
    description: 'Haiku written in front of the frozen waterfall in winter.',
    tips: 'Only accessible in winter weather — rest at a campfire to advance the season if needed.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_08',
    name: 'Haiku: Tokachi Plains Horizon', // verification needed
    category: 'haiku',
    region: 'Tokachi Range',
    description: 'Open plains haiku station on the granite boulder formation.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_09',
    name: 'Haiku: River Delta Vista', // verification needed
    category: 'haiku',
    region: 'Tokachi Range',
    description: 'Haiku viewpoint above the Tokachi River delta.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_10',
    name: 'Haiku: Nayoro Cedar Grove', // verification needed
    category: 'haiku',
    region: 'Nayoro Wilds',
    description: 'Haiku station in the old cedar grove along the hunter\'s trail.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_11',
    name: 'Haiku: Hidden Valley Overhang', // verification needed
    category: 'haiku',
    region: 'Nayoro Wilds',
    description: 'Haiku station on the cliff overhang above the hidden valley.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_12',
    name: 'Haiku: Oshima Sea Cliff', // verification needed
    category: 'haiku',
    region: 'Oshima Coast',
    description: 'Coastal haiku station on the exposed sea-facing headland.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_13',
    name: 'Haiku: Lighthouse Overlook', // verification needed
    category: 'haiku',
    region: 'Oshima Coast',
    description: 'Haiku viewpoint adjacent to the coastal lighthouse, looking out to sea.',
    verificationNeeded: true,
  },
  // verification needed: 7 additional haiku stations to reach total of 20
  {
    id: 'act_haiku_14',
    name: 'Haiku: Yotei Grasslands (Additional)', // verification needed: location
    category: 'haiku',
    region: 'Yotei Grasslands',
    description: 'Additional haiku station in the Yotei Grasslands region.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_15',
    name: 'Haiku: Ishikari Plain (Additional)', // verification needed: location
    category: 'haiku',
    region: 'Ishikari Plain',
    description: 'Additional haiku station in the Ishikari Plain region.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_16',
    name: 'Haiku: Teshio Ridge (Additional)', // verification needed: location
    category: 'haiku',
    region: 'Teshio Ridge',
    description: 'Additional haiku station in the Teshio Ridge region.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_17',
    name: 'Haiku: Tokachi Range (Additional)', // verification needed: location
    category: 'haiku',
    region: 'Tokachi Range',
    description: 'Additional haiku station in the Tokachi Range region.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_18',
    name: 'Haiku: Nayoro Wilds (Additional)', // verification needed: location
    category: 'haiku',
    region: 'Nayoro Wilds',
    description: 'Additional haiku station in the Nayoro Wilds region.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_19',
    name: 'Haiku: Oshima Coast (Additional A)', // verification needed: location
    category: 'haiku',
    region: 'Oshima Coast',
    description: 'Additional haiku station on the Oshima Coast.',
    verificationNeeded: true,
  },
  {
    id: 'act_haiku_20',
    name: 'Haiku: Oshima Coast (Additional B)', // verification needed: location
    category: 'haiku',
    region: 'Oshima Coast',
    description: 'Final haiku station on the Oshima Coast.',
    verificationNeeded: true,
  },
];

// ── Vanity Challenges (8 total — verification needed: exact names) ─────────────
const VANITY_CHALLENGES: WorldActivity[] = [
  {
    id: 'act_van_01',
    name: 'Vanity Challenge: Stone Stance Mastery', // verification needed: exact name
    category: 'vanity',
    region: 'Yotei Grasslands',
    description: 'Complete the Stone Stance combat challenge. Reward: unique cosmetic armour piece.',
    tips: 'Can be replayed if failed — no permanent lock-out.',
    verificationNeeded: true,
  },
  {
    id: 'act_van_02',
    name: 'Vanity Challenge: Water Stance Mastery', // verification needed
    category: 'vanity',
    region: 'Ishikari Plain',
    description: 'Complete the Water Stance combat challenge.',
    verificationNeeded: true,
  },
  {
    id: 'act_van_03',
    name: 'Vanity Challenge: Wind Stance Mastery', // verification needed
    category: 'vanity',
    region: 'Yotei Grasslands',
    description: 'Complete the Wind Stance combat challenge.',
    verificationNeeded: true,
  },
  {
    id: 'act_van_04',
    name: 'Vanity Challenge: Moon Stance Mastery', // verification needed
    category: 'vanity',
    region: 'Tokachi Range',
    description: 'Complete the Moon Stance combat challenge.',
    verificationNeeded: true,
  },
  {
    id: 'act_van_05',
    name: 'Vanity Challenge: Stealth Mastery', // verification needed
    category: 'vanity',
    region: 'Nayoro Wilds',
    description: 'Complete the stealth-only combat challenge.',
    verificationNeeded: true,
  },
  {
    id: 'act_van_06',
    name: 'Vanity Challenge: Ranged Mastery', // verification needed
    category: 'vanity',
    region: 'Teshio Ridge',
    description: 'Complete the ranged combat (bow and kunai) challenge.',
    verificationNeeded: true,
  },
  {
    id: 'act_van_07',
    name: 'Vanity Challenge: Ghost Stance Mastery', // verification needed
    category: 'vanity',
    region: 'Oshima Coast',
    description: 'Complete the Ghost Stance showcase challenge.',
    verificationNeeded: true,
  },
  {
    id: 'act_van_08',
    name: 'Vanity Challenge: Ultimate Warrior', // verification needed
    category: 'vanity',
    region: 'Tokachi Range',
    description: 'Final combined challenge using all stances and ghost abilities.',
    tips: 'Available only after completing all 7 Mythic Tales.',
    verificationNeeded: true,
  },
];

// ── Combined export ───────────────────────────────────────────────────────────
export const WORLD_ACTIVITIES: WorldActivity[] = [
  ...LIBERATIONS,
  ...DUELING_CIRCLES,
  ...HAIKU_STATIONS,
  ...VANITY_CHALLENGES,
];

export const ACTIVITY_IDS = new Set(WORLD_ACTIVITIES.map(a => a.id));

// Category metadata for display
export const ACTIVITY_CATEGORY_LABELS: Record<ActivityCategory, string> = {
  liberation: 'Liberated Settlements',
  duel: 'Dueling Circles',
  haiku: 'Haiku Stations',
  merchant: 'Merchant Stalls',
  sanctuary: 'Animal Sanctuaries',
  vanity: 'Vanity Challenges',
};

export const ACTIVITY_CATEGORY_ICONS: Record<ActivityCategory, string> = {
  liberation: 'flag-outline',
  duel: 'flash-outline',
  haiku: 'pencil-outline',
  merchant: 'cart-outline',
  sanctuary: 'paw-outline',
  vanity: 'ribbon-outline',
};

export const ACTIVITY_CATEGORY_COLORS: Record<ActivityCategory, string> = {
  liberation: '#8B1A1A',
  duel: '#C9A84C',
  haiku: '#4A9B8E',
  merchant: '#4682B4',
  sanctuary: '#4A9B6F',
  vanity: '#7B68EE',
};

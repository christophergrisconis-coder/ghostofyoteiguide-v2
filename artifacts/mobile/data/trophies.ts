export type TrophyTier = 'platinum' | 'gold' | 'silver' | 'bronze';

export interface Trophy {
  id: string;
  name: string;
  tier: TrophyTier;
  description: string;
  tips: string;
  category: string;
}

// 54 trophies: 1 Platinum, 2 Gold, 7 Silver, 44 Bronze. None are missable.
// Source: PowerPyx Trophy Guide — https://www.powerpyx.com/ghost-of-yotei-trophy-guide-roadmap/
export const TROPHIES: Trophy[] = [
  // ── PLATINUM (1) ──────────────────────────────────────────────────────────────
  {
    id: 'plat_01',
    name: 'Ghost of Yōtei',
    tier: 'platinum',
    description: 'Unlock all other trophies.',
    tips: 'Complete every quest, collect all collectibles, and earn all other 53 trophies. Estimated 50–70 hours.',
    category: 'Completion',
  },

  // ── GOLD (2) ──────────────────────────────────────────────────────────────────
  {
    id: 'gold_01',
    name: 'The Onryo Rests',
    tier: 'gold',
    description: 'Complete the main story of Ghost of Yotei.',
    tips: 'Finish all 10 Main Tales through Chapter 3: The Cost of Revenge.',
    category: 'Story',
  },
  {
    id: 'gold_02',
    name: 'Liberator of Ezo',
    tier: 'gold',
    description: 'Complete all Main Tales, Side Tales, Mythic Tales, and Sensei Tales.',
    tips: 'Finish all 10+48+7+20 quests. Bounties are not required for this trophy.',
    category: 'Story',
  },

  // ── SILVER (7) ────────────────────────────────────────────────────────────────
  {
    id: 'silv_01',
    name: 'Master Bounty Hunter',
    tier: 'silver',
    description: 'Complete all 31 Bounties.',
    tips: 'Bounties are found on bounty boards in each region and from Kojiro the Bounty Broker. All remain available post-story.',
    category: 'Quests',
  },
  {
    id: 'silv_02',
    name: 'Body, Mind and Spirit',
    tier: 'silver',
    description: 'Discover all 13 Shrines.',
    tips: 'Shrines reward charms that upgrade your body, mind, and spirit stats. One exists in each major area. See the GAMES.GG shrine locations guide.',
    category: 'Exploration',
  },
  {
    id: 'silv_03',
    name: "An Artist's Eye",
    tier: 'silver',
    description: 'Complete all Sumi-e Paintings.',
    tips: 'Sumi-e Painting spots are scenic viewpoints across Ezo. Interact with the ink brush at each location. Completing sets rewards dye and cosmetics.',
    category: 'Collectibles',
  },
  {
    id: 'silv_04',
    name: 'Legends of Ezo',
    tier: 'silver',
    description: 'Complete all 7 Mythic Tales.',
    tips: 'Mythic Tales are found by listening to wandering storytellers in each region. Each rewards a unique weapon or technique.',
    category: 'Quests',
  },
  {
    id: 'silv_05',
    name: 'Bonds of Steel',
    tier: 'silver',
    description: 'Complete all 20 Sensei Tales.',
    tips: 'Sensei questlines are companion-driven. Exhaust all dialogue options with companions between main story missions to trigger their questlines.',
    category: 'Quests',
  },
  {
    id: 'silv_06',
    name: 'Nine-Tails Champion',
    tier: 'silver',
    description: 'Solve all Nine-Tails Puzzle Boxes.',
    tips: '12 puzzle boxes are hidden across Ezo, often in caves or ruins. Each rewards a powerful charm.',
    category: 'Collectibles',
  },
  {
    id: 'silv_07',
    name: 'Heart of the Ghost',
    tier: 'silver',
    description: 'Unlock every Ghost ability and technique.',
    tips: 'Earn Technique Points from completing quests, Bamboo Strikes, and exploration. Prioritize Ghost Weapons and Stances.',
    category: 'Progression',
  },

  // ── BRONZE (44) ───────────────────────────────────────────────────────────────
  // Story trophies
  {
    id: 'brnz_01',
    name: 'The Snake Falls',
    tier: 'bronze',
    description: 'Complete the Prologue: The Snake.',
    tips: 'Complete the opening mission to unlock Atsu\'s core abilities.',
    category: 'Story',
  },
  {
    id: 'brnz_02',
    name: 'The Lone Wolf',
    tier: 'bronze',
    description: 'Complete Chapter 1: The Lonewolf.',
    tips: 'Chapter 1 is the longest chapter — complete all main tale missions through The Kitsune and The Saito Brothers.',
    category: 'Story',
  },
  {
    id: 'brnz_03',
    name: 'The Onryo Rises',
    tier: 'bronze',
    description: 'Complete Chapter 2: The Onryo.',
    tips: 'Complete all Chapter 2 main missions including Ghosts of the Past.',
    category: 'Story',
  },
  {
    id: 'brnz_04',
    name: 'Vengeance Fulfilled',
    tier: 'bronze',
    description: 'Defeat all six members of the Yotei Six.',
    tips: 'The Yotei Six are hunted across the main story chapters. Defeating each one unlocks individual story trophies.',
    category: 'Story',
  },
  {
    id: 'brnz_05',
    name: 'The Ghost Awakens',
    tier: 'bronze',
    description: 'Unlock the Ghost Stance for the first time.',
    tips: 'Fill your Ghost Meter by defeating enemies with stealth kills, then press L1+R1 to activate Ghost Stance.',
    category: 'Combat',
  },
  {
    id: 'brnz_06',
    name: 'Way of the Sword',
    tier: 'bronze',
    description: 'Defeat 50 enemies with katana strikes.',
    tips: 'Stone Stance is best for high-damage katana combos against armored enemies.',
    category: 'Combat',
  },
  {
    id: 'brnz_07',
    name: 'Shadow Hunter',
    tier: 'bronze',
    description: 'Perform 30 stealth kills.',
    tips: 'Crouch in tall grass and wait for enemies to be isolated. The Kunai upgrades make follow-up stealth kills easier.',
    category: 'Combat',
  },
  {
    id: 'brnz_08',
    name: 'The Duel',
    tier: 'bronze',
    description: 'Win your first standoff.',
    tips: 'Wait for the sword flash effect, then press R2 at the exact moment. Standoffs scale to your Ghost reputation.',
    category: 'Combat',
  },
  {
    id: 'brnz_09',
    name: 'Iron Will',
    tier: 'bronze',
    description: 'Survive 5 standoffs in a row without taking damage.',
    tips: 'Use the Lucky Charm to extend your timing window. Standoff streaks build Ghost Meter quickly.',
    category: 'Combat',
  },
  {
    id: 'brnz_10',
    name: 'Storm of Arrows',
    tier: 'bronze',
    description: 'Kill 3 enemies with a single Explosive Arrow.',
    tips: 'Group enemies exist at large camps. Use a smoke bomb to cluster enemies before firing.',
    category: 'Combat',
  },
  {
    id: 'brnz_11',
    name: 'Wind Reader',
    tier: 'bronze',
    description: 'Deflect 100 enemy attacks.',
    tips: 'Hold L1 near attacking enemies to deflect. Deflecting builds Ghost Meter and staggers enemies.',
    category: 'Combat',
  },
  {
    id: 'brnz_12',
    name: 'Four Seasons',
    tier: 'bronze',
    description: 'Master all four combat stances.',
    tips: 'Stone, Water, Wind, and Moon stances are unlocked via Technique Points. Each is stronger against a specific enemy type.',
    category: 'Combat',
  },
  {
    id: 'brnz_13',
    name: 'Unseen Blade',
    tier: 'bronze',
    description: 'Clear an entire enemy camp without being detected.',
    tips: 'Small camps (3–5 enemies) are easiest. Use the Concentration skill to slow time when aiming.',
    category: 'Combat',
  },
  {
    id: 'brnz_14',
    name: 'Poison Wind',
    tier: 'bronze',
    description: 'Kill 5 enemies with a single Black Powder Bomb.',
    tips: 'Throw the bomb into a tightly grouped patrol. Upgrade the bomb capacity to chain multiple throws.',
    category: 'Combat',
  },
  {
    id: 'brnz_15',
    name: 'The Bamboo Path',
    tier: 'bronze',
    description: 'Complete all 15 Bamboo Strikes.',
    tips: 'Bamboo Strikes test your timing with rapid button presses. They award Technique Points and permanently improve your stats.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_16',
    name: 'Well of Spirit',
    tier: 'bronze',
    description: 'Soak in all Hot Springs.',
    tips: 'Hot Springs permanently increase your maximum health. They are found in scenic natural areas, often near rivers and mountains.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_17',
    name: "Fox's Favor",
    tier: 'bronze',
    description: 'Find and offer at 5 Spirit Offering sites.',
    tips: 'Spirit Offering sites are marked by white foxes. Follow the fox to find the altar hidden nearby.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_18',
    name: 'Nine-Tails Seeker',
    tier: 'bronze',
    description: 'Solve your first Nine-Tails Puzzle Box.',
    tips: 'Puzzle boxes are found in ruins and caves. Rotate the panels to align the fox spirit image.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_19',
    name: 'Cartographer',
    tier: 'bronze',
    description: 'Discover all Ancient Maps.',
    tips: 'Ancient Maps are found in enemy strongholds and abandoned buildings. They reveal hidden treasure locations.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_20',
    name: 'Relic Hunter',
    tier: 'bronze',
    description: 'Collect 10 Clan Trophies from enemy strongholds.',
    tips: 'Clan Trophies hang in the main halls of outposts. Clear the location fully before searching.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_21',
    name: 'Ainu Wanderer',
    tier: 'bronze',
    description: 'Discover all Ainu Sacred Sites.',
    tips: 'Ainu Sacred Sites are spiritual locations tied to the indigenous culture of Ezo. Each offers a moment of reflection and a minor reward.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_22',
    name: 'Explorer of Ezo',
    tier: 'bronze',
    description: 'Fully explore all 6 regions of Ezo.',
    tips: 'Each region is fully explored when all map locations are discovered. Use the guiding wind to find undiscovered areas.',
    category: 'Exploration',
  },
  {
    id: 'brnz_23',
    name: 'Yotei Grasslands Cleared',
    tier: 'bronze',
    description: 'Complete all activities in the Yotei Grasslands.',
    tips: 'The first and largest region. Complete all quests, collectibles, and locations to earn this.',
    category: 'Exploration',
  },
  // verification needed: brnz_24–brnz_28 use trophy-screen region names that differ from
  // quest/collectible data region names. Trophy names: "Ishikari Valley", "Shiretoko Peaks",
  // "Tokachi Wilds", "Hidaka Mountains", "Nemuro Coast". Quest/collectible data uses:
  // "Ishikari Plain", "Teshio Ridge", "Tokachi Range", "Nayoro Wilds", "Oshima Coast".
  // Confirm official region names when the final game ships and update both files together.
  {
    id: 'brnz_24',
    name: 'Ishikari Valley Cleared', // verification needed: may be "Ishikari Plain" in final game
    tier: 'bronze',
    description: 'Complete all activities in the Ishikari Valley.',
    tips: 'The Ishikari Valley is accessible from Chapter 1. Many Sensei Tales are centered here.',
    category: 'Exploration',
  },
  {
    id: 'brnz_25',
    name: 'Shiretoko Peaks Cleared', // verification needed: may be "Teshio Ridge" in final game
    tier: 'bronze',
    description: 'Complete all activities in the Shiretoko Peaks.',
    tips: 'A cold, mountainous region with many Mythic Tale locations. Bring Cold Resistance charms.',
    category: 'Exploration',
  },
  {
    id: 'brnz_26',
    name: 'Tokachi Wilds Cleared', // verification needed: may be "Tokachi Range" in final game
    tier: 'bronze',
    description: 'Complete all activities in the Tokachi Wilds.',
    tips: 'Open plains filled with enemy patrols. Bounty targets frequently appear in this region.',
    category: 'Exploration',
  },
  {
    id: 'brnz_27',
    name: 'Hidaka Mountains Cleared', // verification needed: may be "Nayoro Wilds" in final game
    tier: 'bronze',
    description: 'Complete all activities in the Hidaka Mountains.',
    tips: 'Remote and isolated. Sensei Tales and Ainu Sacred Sites are concentrated here.',
    category: 'Exploration',
  },
  {
    id: 'brnz_28',
    name: 'Nemuro Coast Cleared', // verification needed: may be "Oshima Coast" in final game
    tier: 'bronze',
    description: 'Complete all activities in the Nemuro Coast.',
    tips: 'The final region, unlocked in Chapter 3. Contains the endgame content and the climax of several questlines.',
    category: 'Exploration',
  },
  {
    id: 'brnz_29',
    name: 'The Collector',
    tier: 'bronze',
    description: 'Upgrade your equipment to the maximum level.',
    tips: 'Gather resources from exploration and enemies. Smiths and merchants are found in liberated settlements.',
    category: 'Progression',
  },
  {
    id: 'brnz_30',
    name: 'Dressed for Battle',
    tier: 'bronze',
    description: 'Equip a fully upgraded armor set.',
    tips: 'Armor can be upgraded with iron, leather, and special materials from Mythic Tale rewards.',
    category: 'Progression',
  },
  {
    id: 'brnz_31',
    name: 'Merchant of Death',
    tier: 'bronze',
    description: 'Spend 10,000 Mon at merchants.',
    tips: 'Spend coin on supplies, dyes, and equipment upgrades. Coin is earned from completing quests and bounties.',
    category: 'Progression',
  },
  {
    id: 'brnz_32',
    name: 'The Offering',
    tier: 'bronze',
    description: 'Make an offering at a Shrine for the first time.',
    tips: 'Shrines require climbing a specific path to reach. The offering restores health and grants a charm slot.',
    category: 'Exploration',
  },
  {
    id: 'brnz_33',
    name: 'Ink and Silence',
    tier: 'bronze',
    description: 'Complete your first Sumi-e Painting.',
    tips: 'Stand at the marker and select the painting prompt. Tilt the controller for composition. Any angle completes the trophy.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_34',
    name: 'Wandering Blade',
    tier: 'bronze',
    description: 'Travel 100km on horseback.',
    tips: 'Your horse accumulates distance automatically. Upgrade your saddle to increase speed.',
    category: 'Exploration',
  },
  {
    id: 'brnz_35',
    name: 'Kindred Spirit',
    tier: 'bronze',
    description: 'Reach maximum bond with your horse.',
    tips: 'Pet your horse regularly, use it in combat, and feed it at stables to build bond quickly.',
    category: 'Exploration',
  },
  {
    id: 'brnz_36',
    name: 'Liberation',
    tier: 'bronze',
    description: 'Liberate 5 enemy-occupied locations.',
    tips: 'Occupied locations are shown with red markers on the map. Eliminate all enemies to liberate them.',
    category: 'Combat',
  },
  {
    id: 'brnz_37',
    name: 'Fortress Breaker',
    tier: 'bronze',
    description: 'Liberate your first major fortress.',
    tips: 'Major fortresses have multiple objectives. Clearing them rewards significant coin and resources.',
    category: 'Combat',
  },
  {
    id: 'brnz_38',
    name: 'Spirit Senses',
    tier: 'bronze',
    description: 'Use Focused Hearing to identify 100 enemies.',
    tips: 'Hold L2 while crouching to activate Focused Hearing. Identifying enemies marks them on the minimap.',
    category: 'Stealth',
  },
  {
    id: 'brnz_39',
    name: 'Phantom Strike',
    tier: 'bronze',
    description: 'Use the Kunai to kill 3 enemies simultaneously.',
    tips: 'Upgrade the Kunai to hit up to 3 targets. Use Focused Hearing to mark closely spaced enemies.',
    category: 'Combat',
  },
  {
    id: 'brnz_40',
    name: 'Death from Above',
    tier: 'bronze',
    description: 'Perform 20 aerial kills.',
    tips: 'Stand on rooftops or cliffsides above patrolling enemies and drop attack with R2.',
    category: 'Combat',
  },
  {
    id: 'brnz_41',
    name: "The Storyteller's Trail",
    tier: 'bronze',
    description: 'Complete 3 Mythic Tales.',
    tips: 'Listen to storytellers in settlements to begin Mythic Tales. They are always available once unlocked.',
    category: 'Quests',
  },
  {
    id: 'brnz_42',
    name: 'First Tale',
    tier: 'bronze',
    description: 'Complete your first Side Tale.',
    tips: 'Side Tales are triggered by interacting with NPCs marked with a yellow quest icon.',
    category: 'Quests',
  },
  {
    id: 'brnz_43',
    name: 'Helping Hand',
    tier: 'bronze',
    description: 'Complete 20 Side Tales.',
    tips: 'Side Tales are available in every region. Many unlock after liberating nearby enemy locations.',
    category: 'Quests',
  },
  {
    id: 'brnz_44',
    name: 'First Blood',
    tier: 'bronze',
    description: 'Claim your first Bounty.',
    tips: 'Accept a bounty from the board, find the target, eliminate them, and return to the board to collect the reward.',
    category: 'Quests',
  },
];

export function getTrophyById(id: string): Trophy | undefined {
  return TROPHIES.find(t => t.id === id);
}

export function getTrophiesByTier(tier: TrophyTier): Trophy[] {
  return TROPHIES.filter(t => t.tier === tier);
}

export const TROPHY_TIER_ORDER: TrophyTier[] = ['platinum', 'gold', 'silver', 'bronze'];

export const TROPHY_TIER_LABELS: Record<TrophyTier, string> = {
  platinum: 'Platinum',
  gold: 'Gold',
  silver: 'Silver',
  bronze: 'Bronze',
};

export const TROPHY_TIER_COLORS: Record<TrophyTier, string> = {
  platinum: '#E5E4E2',
  gold: '#C9A84C',
  silver: '#A8A9AD',
  bronze: '#CD7F32',
};

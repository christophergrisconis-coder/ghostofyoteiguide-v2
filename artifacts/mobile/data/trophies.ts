// Ghost of Yōtei Trophy List — 54 trophies total
// Source: allthings.how, consolepcgaming.com, powerpyx.com (post-launch October 2025)
// Breakdown: 1 Platinum, 2 Gold, 7 Silver, 44 Bronze. No missable trophies.
// Free-roam available after story completion — everything can be done post-game.

export type TrophyTier = 'platinum' | 'gold' | 'silver' | 'bronze';

export interface Trophy {
  id: string;
  name: string;
  tier: TrophyTier;
  description: string;
  tips: string;
  category: string;
}

export const TROPHIES: Trophy[] = [
  // ── PLATINUM (1) ──────────────────────────────────────────────────────────────
  {
    id: 'plat_01',
    name: 'Legendary Onryō',
    tier: 'platinum',
    description: 'Obtain all trophies.',
    tips: 'Complete every quest, clear all 22 Yōtei Six Camps, collect all collectibles, and earn all other 53 trophies. Estimated 50–70 hours. Nothing is missable — full free-roam is available after the story.',
    category: 'Completion',
  },

  // ── GOLD (2) ──────────────────────────────────────────────────────────────────
  {
    id: 'gold_01',
    name: 'The Onryō Rests',
    tier: 'gold',
    description: 'Find a future beyond the hunt.',
    tips: 'Complete the main story of Ghost of Yōtei through to the end. Nothing is locked out after finishing — return to free-roam to wrap up remaining trophies.',
    category: 'Story',
  },
  {
    id: 'gold_02',
    name: 'Master Bounty Hunter',
    tier: 'gold',
    description: 'Complete all Bounties.',
    tips: 'Accept all 31 Bounties from bounty boards in each region and Kojiro the Bounty Broker. All bounties remain available after the story ends. Track them on the map and via the Quests menu.',
    category: 'Quests',
  },

  // ── SILVER (7) ────────────────────────────────────────────────────────────────
  {
    id: 'silv_01',
    name: 'Way of the Yari',
    tier: 'silver',
    description: 'Help Sensei Takahashi defend his dojo.',
    tips: 'Complete Sensei Takahashi\'s full questline. This unlocks the Yari (spear) as a new melee weapon and the moves needed for several combat trophies.',
    category: 'Quests',
  },
  {
    id: 'silv_02',
    name: 'Way of the Kusarigama',
    tier: 'silver',
    description: 'Help Master Enomoto confront his grandson.',
    tips: 'Complete Master Enomoto\'s questline. Unlocks the Kusarigama, needed for The Owl\'s Talon bronze trophy (Kusarigama Assassination kill).',
    category: 'Quests',
  },
  {
    id: 'silv_03',
    name: 'Way of the Odachi',
    tier: 'silver',
    description: 'Help defend Master Yoshida\'s dojo in the final battle.',
    tips: 'Complete Master Yoshida\'s questline. The Odachi is the third weapon discipline and unlocks powerful heavy attacks useful for several other trophies.',
    category: 'Quests',
  },
  {
    id: 'silv_04',
    name: 'For All Occasions',
    tier: 'silver',
    description: 'Acquire all Armor.',
    tips: 'Armor sets are found through exploration, crafting, mythic tales, and vendors. Check the Equipment menu to see which sets are still missing. Some are locked behind questlines.',
    category: 'Collectibles',
  },
  {
    id: 'silv_05',
    name: 'Body, Mind, and Spirit',
    tier: 'silver',
    description: 'Complete all Bamboo Strikes, Shrine Climbs, and Hot Springs.',
    tips: 'Requires all 15 Bamboo Strikes, all 13 Shrine Climbs, and all 16 Hot Springs. These are scattered across all 6 regions plus Mount Yōtei. Use the map filter for each activity type.',
    category: 'Exploration',
  },
  {
    id: 'silv_06',
    name: 'Moments of Reflection',
    tier: 'silver',
    description: 'Find 30 Altars of Reflection.',
    tips: 'Altars of Reflection are found inside all 22 Yōtei Six Camps (one per camp after liberation) plus 8 additional locations. Liberating all camps automatically gives you 22. Swipe down on the Touchpad to pray at each altar.',
    category: 'Exploration',
  },
  {
    id: 'silv_07',
    name: 'For the Living',
    tier: 'silver',
    description: 'Rid Ezo of all Yōtei Six Camps.',
    tips: 'Clear all 22 Yōtei Six Camps (red markers on the map). Defeat every enemy in each camp. Some camps require solving fox-statue shrine puzzles to access the hidden area. Each cleared camp also counts toward Moments of Reflection.',
    category: 'Combat',
  },

  // ── BRONZE (44) ───────────────────────────────────────────────────────────────

  // Story trophies
  {
    id: 'brnz_01',
    name: 'The Snake',
    tier: 'bronze',
    description: 'Cross the first name off your sash.',
    tips: 'Earned early in the main story — defeat the first of the Yōtei Six to unlock.',
    category: 'Story',
  },
  {
    id: 'brnz_02',
    name: 'The Oni',
    tier: 'bronze',
    description: 'Extinguish the fire of a cruel warlord.',
    tips: 'Story trophy — defeat The Oni as part of the main questline.',
    category: 'Story',
  },
  {
    id: 'brnz_03',
    name: 'The Kitsune',
    tier: 'bronze',
    description: "Send Saito's spymaster back to the shadows.",
    tips: 'Story trophy — defeat The Kitsune as part of the main questline.',
    category: 'Story',
  },
  {
    id: 'brnz_04',
    name: 'The Dragon',
    tier: 'bronze',
    description: 'Cut down the favored firstborn.',
    tips: 'Story trophy — defeat The Dragon as part of the main questline.',
    category: 'Story',
  },
  {
    id: 'brnz_05',
    name: 'The Spider',
    tier: 'bronze',
    description: 'Defeat the son of a tyrant.',
    tips: 'Story trophy — defeat The Spider as part of the main questline.',
    category: 'Story',
  },
  {
    id: 'brnz_06',
    name: 'The Woman Behind the Mask',
    tier: 'bronze',
    description: "Show mercy to the innkeeper's daughter.",
    tips: 'Story trophy — a specific story choice grants this trophy. Make the mercy decision when prompted.',
    category: 'Story',
  },
  {
    id: 'brnz_07',
    name: 'Twin Wolves',
    tier: 'bronze',
    description: 'Reunite with a ghost from the past.',
    tips: 'Story trophy earned during the main questline.',
    category: 'Story',
  },
  {
    id: 'brnz_08',
    name: 'Wrath of the Onryō',
    tier: 'bronze',
    description: 'Relive the Night of the Burning Tree.',
    tips: 'Story trophy — awarded for experiencing a key flashback sequence during the main story.',
    category: 'Story',
  },
  {
    id: 'brnz_09',
    name: 'From One Ghost to Another',
    tier: 'bronze',
    description: 'Acquire the blade of a legendary hero.',
    tips: 'Complete the "The Storm Blade" mythic tale to earn this trophy and the legendary sword.',
    category: 'Quests',
  },
  {
    id: 'brnz_10',
    name: 'Sitturaynu',
    tier: 'bronze',
    description: 'Share a meal with huci.',
    tips: 'Complete Ainu-themed tale(s) involving huci (Ainu term for elder woman/grandmother). Part of the Ainu cultural questlines.',
    category: 'Quests',
  },
  {
    id: 'brnz_11',
    name: 'A Moment to Breathe',
    tier: 'bronze',
    description: 'Get a perfect score in ku-e-shinok.',
    tips: 'Ku-e-shinok is an archery flashback mini-game requiring 6 ring hits with 6 arrows. Aim at the center as the thrown ring peaks — do not lead it.',
    category: 'Quests',
  },
  {
    id: 'brnz_12',
    name: 'Unrivaled',
    tier: 'bronze',
    description: 'Defeat Takezo the Unrivaled on the peak of Mount Yōtei.',
    tips: 'Complete the "Takezo the Unrivalled" mythic tale: defeat all 6 of Takezo\'s students at Dueling Trees around Ezo, then face Takezo himself on Mount Yōtei\'s peak. He is the hardest duel in the game.',
    category: 'Quests',
  },
  {
    id: 'brnz_13',
    name: 'Kunai Defender',
    tier: 'bronze',
    description: 'Help Hana protect her farms.',
    tips: 'Complete the "Winter Farms" tale involving Hana. This is part of a companion or side quest chain.',
    category: 'Quests',
  },
  {
    id: 'brnz_14',
    name: 'Gift for Destruction',
    tier: 'bronze',
    description: 'Help Ina fend off the Oni Raiders.',
    tips: 'Complete the questline involving Ina and the Oni Raiders.',
    category: 'Quests',
  },

  // Progression/misc combat trophies
  {
    id: 'brnz_15',
    name: 'Naming a Friend',
    tier: 'bronze',
    description: 'Pick a name for your horse.',
    tips: 'Simply interact with your horse when prompted during the early game to name it. Cannot be missed.',
    category: 'Exploration',
  },
  {
    id: 'brnz_16',
    name: 'From the Hip',
    tier: 'bronze',
    description: 'Perform a Pistol Parry during a Standoff.',
    tips: 'Unlock the pistol via the "Guns and Consequences" tale, then buy Standoff Streak and Standoff Unlock: Pistol at an Altar of Reflection. During a Standoff, use the pistol shot to finish the third opponent.',
    category: 'Combat',
  },
  {
    id: 'brnz_17',
    name: "The Owl's Talon",
    tier: 'bronze',
    description: 'Use a Kusarigama Assassination to kill an enemy from a distance.',
    tips: 'Complete the Kusarigama questline first. Buy Ferocious Whirlwind and Lethal Talons upgrades. From stealth, use the ranged kusarigama assassination prompt from a few steps away from the target.',
    category: 'Combat',
  },
  {
    id: 'brnz_18',
    name: 'Sayonara',
    tier: 'bronze',
    description: 'Shoulder Charge or Typhoon Kick an enemy off a cliff to their death.',
    tips: 'Unlock Shoulder Charge at an Altar of Reflection, or use a charged Yari heavy attack (Typhoon Kick). Position an enemy near a high ledge and knock them off so the fall is lethal.',
    category: 'Combat',
  },
  {
    id: 'brnz_19',
    name: 'You Dropped This',
    tier: 'bronze',
    description: 'Disarm and kill an enemy with their own weapon.',
    tips: 'Buy the Disarm Counter or Onryō Strike skill. Disarm an enemy, pick up their weapon, and throw it back for the kill. Damaging them first makes this consistent.',
    category: 'Combat',
  },
  {
    id: 'brnz_20',
    name: 'The Horror',
    tier: 'bronze',
    description: "Make 20 enemies collapse in fear using Onryō's Howl.",
    tips: 'Unlock Onryō\'s Howl ability, then use it repeatedly in camps with multiple enemies. Enemies who are already frightened collapse more easily.',
    category: 'Combat',
  },
  {
    id: 'brnz_21',
    name: 'Wolf Bait',
    tier: 'bronze',
    description: 'Use an empty Sake jar to trigger a Wolf kill.',
    tips: 'Unlock Wolf Howl and Wolf Strike Summon skills. Hit an enemy with an empty Sake jar to trigger a wolf finisher. It\'s chance-based — try near wolf-populated areas for faster results.',
    category: 'Combat',
  },
  {
    id: 'brnz_22',
    name: 'Two as One',
    tier: 'bronze',
    description: 'Complete a successful Standoff or Assassination with a companion.',
    tips: 'When a companion is in your party, approach a standoff or assassination opportunity and wait for the companion prompt to appear. Activate it together.',
    category: 'Combat',
  },
  {
    id: 'brnz_23',
    name: 'Brush Fire',
    tier: 'bronze',
    description: 'Kill an enemy by catching grass on fire.',
    tips: 'Upgrade the medium bow to access Fire Arrows. Ignite tall, crouch-high grass while an enemy stands in it, then let the fire spread to kill them.',
    category: 'Combat',
  },
  {
    id: 'brnz_24',
    name: 'Sake Flight',
    tier: 'bronze',
    description: 'Collect 10 full jars of Sake.',
    tips: 'Sake jars are found in enemy camps and during exploration. Collect 10 full (not empty) jars across your playthrough.',
    category: 'Exploration',
  },
  {
    id: 'brnz_25',
    name: 'Very Persuasive',
    tier: 'bronze',
    description: 'Interrogate 10 enemies.',
    tips: 'Grab a weakened enemy with the interrogate prompt (appears when an enemy is staggered and isolated). Interrogations reveal nearby points of interest on the map.',
    category: 'Combat',
  },
  {
    id: 'brnz_26',
    name: 'Charming',
    tier: 'bronze',
    description: 'Upgrade 10 charms at least once.',
    tips: 'Only unique charms upgraded at least once count. Many upgradable charms come from activity chains and vendors. Charms require materials gathered from exploration and enemies.',
    category: 'Progression',
  },
  {
    id: 'brnz_27',
    name: 'Like Father, Like Daughter',
    tier: 'bronze',
    description: 'Fully upgrade the Wolf Blade.',
    tips: 'The Wolf Blade\'s final tier requires high-end materials: Metals, Oni Raider Mask Pieces, Shinobi Steel, Gun Parts, and Rare Metals. Progress naturally through later regions and open camp reward chests.',
    category: 'Progression',
  },
  {
    id: 'brnz_28',
    name: 'Purely Decorative',
    tier: 'bronze',
    description: 'Acquire 30 pieces of Vanity Gear.',
    tips: 'Vanity Gear includes cosmetic items from exploration, questline rewards, merchants, and challenges. Check the Vanity menu to track what you own. Many pieces are sold by merchants in liberated camps.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_29',
    name: 'Tools of a Warrior',
    tier: 'bronze',
    description: 'Acquire all Melee weapons.',
    tips: 'Melee weapons include the katana, yari, kusarigama, and odachi variants. Most are unlocked via the weapon master questlines (Way of the Yari, etc.) or purchased from smiths.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_30',
    name: 'Take Aim',
    tier: 'bronze',
    description: 'Acquire all Ranged weapons.',
    tips: 'Ranged weapons include various bow types. They are purchased from weapon merchants in liberated settlements or found as exploration rewards.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_31',
    name: 'Quick Draw',
    tier: 'bronze',
    description: 'Acquire all Quickfire weapons.',
    tips: 'Quickfire weapons include the pistol and shuriken variants. The pistol is unlocked via the "Guns and Consequences" tale; others are purchased or discovered.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_32',
    name: 'Inheritance',
    tier: 'bronze',
    description: "Acquire your parents' charms from the peak of Mount Yōtei.",
    tips: 'A late-game or post-story activity: climb to the peak of Mount Yōtei to find a pair of charms left by Atsu\'s parents. The path to the summit is opened during the main story.',
    category: 'Exploration',
  },
  {
    id: 'brnz_33',
    name: 'Gifts for a Ghost',
    tier: 'bronze',
    description: 'Collect 8 offerings left for the onryō.',
    tips: 'Offerings are items left by villagers at shrines and roadside altars dedicated to the Onryō legend. Interact with each offering to collect it.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_34',
    name: 'Trickster Fox',
    tier: 'bronze',
    description: "Solve all the Nine Tails' puzzle boxes.",
    tips: 'There are 12 Nine Tails Puzzle Boxes hidden across Ezo, often in caves, ruins, and hidden Yōtei Six Camps (especially in Teshio Ridge). Rotate the fox panels to align the fox spirit image.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_35',
    name: "An Artist's Eye",
    tier: 'bronze',
    description: 'Complete all sumi-e paintings.',
    tips: 'There are 15 Sumi-e Painting viewpoints across Ezo. Stand at the marker, interact with the ink brush, and tilt the controller to compose. Any angle completes the painting.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_36',
    name: 'Memento',
    tier: 'bronze',
    description: 'Personalize a scene in Photo Mode.',
    tips: 'Open Photo Mode (hold Options button), adjust any setting (depth of field, frame, filter), and take a photo. The trophy unlocks as soon as you save a personalized shot.',
    category: 'Exploration',
  },
  {
    id: 'brnz_37',
    name: 'Guardian of Inari',
    tier: 'bronze',
    description: 'Receive the Fox Mask after completing all Fox Dens.',
    tips: 'Find and complete all 11 Fox Dens across Ezo. After the final one, return to receive the Fox Mask cosmetic, which triggers this trophy.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_38',
    name: 'Like Mother, Like Daughter',
    tier: 'bronze',
    description: 'Learn all shamisen songs.',
    tips: 'There are 7 shamisen songs to collect. They are found during exploration and questlines. Open the Inventory → Shamisen to track which songs you own.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_39',
    name: 'Wolves of Ezo',
    tier: 'bronze',
    description: 'Complete all the Wolf Dens.',
    tips: 'Find and clear all 10 Wolf Dens across Ezo. Wolf Dens are marked on the map when discovered. Completing all 10 also helps with Wolf Bait and other wolf-related challenges.',
    category: 'Exploration',
  },
  {
    id: 'brnz_40',
    name: 'Spear Fishing',
    tier: 'bronze',
    description: 'Spear 5 fish with the yari.',
    tips: 'Equip the yari (unlocked via the Way of the Yari questline). Stand at a river or pond with visible fish and throw the yari at them. Fish are most visible at dawn and dusk.',
    category: 'Combat',
  },
  {
    id: 'brnz_41',
    name: 'Child of the Mountain',
    tier: 'bronze',
    description: 'Solve all Mountain Reliquary puzzles.',
    tips: 'Mountain Reliquaries are a collectible type found on cliffsides and mountain paths. Each contains a puzzle to solve, rewarding charms or upgrades.',
    category: 'Collectibles',
  },
  {
    id: 'brnz_42',
    name: 'Good with Coins',
    tier: 'bronze',
    description: 'Win a charm from playing zeni hajiki.',
    tips: 'Zeni hajiki is a coin-flicking mini-game found at settlements. Look for NPCs inviting you to play. Win a round to earn this trophy and a charm reward.',
    category: 'Exploration',
  },
  {
    id: 'brnz_43',
    name: 'Fireside Performance',
    tier: 'bronze',
    description: 'Play a shamisen song while camping.',
    tips: 'Rest at any campfire, then select the shamisen option from the camp menu and play any song. Earned the first time you do this.',
    category: 'Exploration',
  },
  {
    id: 'brnz_44',
    name: 'Speaking with the Land',
    tier: 'bronze',
    description: 'Bow or play your shamisen at 10 special places throughout Ezo.',
    tips: 'Special places are scenic viewpoints and culturally significant spots marked with a small icon. Approach each one and use the bow gesture (swipe down on touchpad) or play your shamisen when prompted.',
    category: 'Exploration',
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

// Endgame guidance for Ghost of Yōtei 100% completion
// Updated post-launch (October 2025) against confirmed trophy list and activity counts.
// Sources: powerpyx.com, allthings.how, pushsquare.com

export interface CleanupStep {
  order: number;
  title: string;
  description: string;
  effort: string; // rough time estimate
  warning?: string; // missable / time-sensitive note
  verificationNeeded?: boolean;
}

export interface NGPlusItem {
  label: string;
  detail?: string;
  verificationNeeded: boolean;
}

export interface NGPlusInfo {
  overview: string;
  carriesOver: NGPlusItem[];
  resets: NGPlusItem[];
  verificationNeeded: boolean;
}

// ── Cleanup Roadmap ──────────────────────────────────────────────────────────
// Recommended order to reach 100% without backtracking.
// No trophies are missable — full free-roam is available after the story ends.

export const CLEANUP_ROADMAP: CleanupStep[] = [
  {
    order: 1,
    title: 'Complete the Main Story',
    description:
      'Finish all main tale missions to unlock The Onryō Rests (gold trophy). Do not rush — side content can be cleaned up in free-roam afterward. Nothing is permanently missable.',
    effort: '~8–10 hrs',
  },
  {
    order: 2,
    title: 'Complete the 3 Weapon Master questlines',
    description:
      'Finish Way of the Yari (Sensei Takahashi), Way of the Kusarigama (Master Enomoto), and Way of the Odachi (Master Yoshida) for three Silver trophies. These also unlock combat moves needed for several Bronze trophies.',
    effort: '~3–5 hrs',
  },
  {
    order: 3,
    title: 'Complete all 31 Bounties',
    description:
      'Accept bounties from regional boards and Kojiro the Bounty Broker. All 31 remain available after the story ends. Completing all earns Master Bounty Hunter (gold trophy).',
    effort: '~4–5 hrs',
  },
  {
    order: 4,
    title: 'Clear all 22 Yōtei Six Camps',
    description:
      'Clear all red-marker camps across every region to earn For the Living (silver trophy). Each cleared camp also contains an Altar of Reflection — pray at all 22, then find 8 more Altars in the open world for Moments of Reflection (silver).',
    effort: '~3–4 hrs',
    warning:
      'Some hidden camps in Teshio Ridge require solving fox-statue shrine puzzles. Check the Activities tab for tips on each camp.',
  },
  {
    order: 5,
    title: 'Complete the Takezo the Unrivalled mythic tale',
    description:
      'Find and duel all 6 Dueling Trees across Ezo (Yotei Grasslands and Tokachi Range only), then face Takezo on the peak of Mount Yōtei for the Unrivaled bronze trophy.',
    effort: '~1–2 hrs',
  },
  {
    order: 6,
    title: 'Clear all 10 Wolf Dens',
    description:
      'Find each Wolf Den mound (tree on a rock with enemy corpses), trigger the wolf, follow it to the Trapper camp, and kill all enemies. All 10 earns Wolves of Ezo (bronze). Each also rewards a Technique Point for wolf upgrades.',
    effort: '~1–2 hrs',
  },
  {
    order: 7,
    title: 'Complete all Bamboo Strikes, Shrine Climbs, and Hot Springs',
    description:
      '15 Bamboo Strikes (2 are story auto-completes), 13 Shrine Climbs (1 is story auto-complete during The Oni), and 16 Hot Springs across all regions. All three completed together earns Body, Mind, and Spirit (silver trophy). Completing all Shrine Climbs also unlocks the Golden Mask; all Hot Springs unlock the Fundoshi Armor Set.',
    effort: '~4–6 hrs',
  },
  {
    order: 8,
    title: 'Complete all 15 open-world Sumi-e Paintings',
    description:
      'Find all 15 open-world Sumi-e Painting viewpoints (not the 3 quest-related ones, which do not count). Sit on the mat and swipe the Touchpad to draw. Earns An Artist\'s Eye (bronze trophy). Each painting rewards a cosmetic Hat, Headband, or Mask.',
    effort: '~1 hr',
  },
  {
    order: 9,
    title: 'Collect all Armor sets and complete all Fox Dens',
    description:
      'Acquire all Armor sets for For All Occasions (silver). Complete all 11 Fox Dens to receive the Fox Mask cosmetic and Guardian of Inari (bronze). Also collect all 7 Shamisen songs for Like Mother, Like Daughter (bronze) and solve all 12 Nine Tails Puzzle Boxes for Trickster Fox (bronze).',
    effort: '~3–5 hrs',
  },
  {
    order: 10,
    title: 'Acquire all weapons and upgrade the Wolf Blade',
    description:
      'Collect all Melee, Ranged, and Quickfire weapons for Tools of a Warrior, Take Aim, and Quick Draw (all bronze). Fully upgrade the Wolf Blade with high-end materials (Metals, Oni Raider Mask Pieces, Shinobi Steel, Gun Parts, Rare Metals) for Like Father, Like Daughter (bronze).',
    effort: '~2–3 hrs',
  },
  {
    order: 11,
    title: 'Mop-up: combat, exploration, and misc bronze trophies',
    description:
      'Check remaining bronzes: From the Hip (Pistol Parry), The Owl\'s Talon (Kusarigama ranged kill), Sayonara (cliff knockoff), You Dropped This (disarm+return kill), The Horror (20 Onryō\'s Howl collapses), Wolf Bait, Brush Fire, Spear Fishing (5 fish with yari), Good with Coins (win a zeni hajiki charm), Fireside Performance, Speaking with the Land (10 special places), Gifts for a Ghost (8 offerings), Purely Decorative (30 Vanity Gear pieces), Charming (upgrade 10 charms), Memento (Photo Mode), Inheritance (Mount Yōtei summit charms).',
    effort: '~2–4 hrs',
  },
  {
    order: 12,
    title: 'New Game Plus (not required for any trophy)',
    description:
      'Ghost of Yōtei does not require New Game Plus for any trophies. All content is available in free-roam after the story. NG+ may be added as a future update.',
    effort: 'N/A',
    verificationNeeded: true,
  },
];

// ── New Game Plus overview ────────────────────────────────────────────────────
// NG+ was not included at launch (October 2025). Details below are estimates
// based on the Ghost of Tsushima franchise pattern and may be updated if Sucker
// Punch adds NG+ as post-launch content.

export const NG_PLUS_INFO: NGPlusInfo = {
  overview:
    'Ghost of Yōtei did not include New Game Plus at launch (October 2025). No trophies require NG+. If NG+ is added in a post-launch update, this section will be updated with confirmed details.',
  verificationNeeded: true,
  carriesOver: [
    {
      label: 'All unlocked techniques and skills',
      detail: 'Expected: full skill tree carries into NG+ (based on franchise pattern).',
      verificationNeeded: true,
    },
    {
      label: 'Cosmetics and dye colours',
      detail: 'Expected: all unlocked armour cosmetics and dyes retained.',
      verificationNeeded: true,
    },
    {
      label: 'Weapon upgrade tiers',
      detail: 'Expected: all weapons remain at their current upgrade tier.',
      verificationNeeded: true,
    },
  ],
  resets: [
    {
      label: 'Quest completion',
      detail: 'Expected: all quests restart from the beginning.',
      verificationNeeded: true,
    },
    {
      label: 'Activity and collectible progress',
      detail: 'Expected: Yōtei Six Camps, Wolf Dens, Bamboo Strikes, Hot Springs, Shrine Climbs, Sumi-e, and other activities reset.',
      verificationNeeded: true,
    },
    {
      label: 'Bounty board',
      detail: 'Expected: all 31 bounties reset and must be re-accepted.',
      verificationNeeded: true,
    },
  ],
};

// Endgame guidance for Ghost of Yōtei 100% completion
// Cleanup roadmap: recommended completion order based on the ghost franchise pattern
// NG+ details: all specifics are pre-release estimates — flagged accordingly

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
// Recommended order to reach 100% without backtracking or missed content.
// Based on Ghost of Tsushima franchise structure — verify against final game.

export const CLEANUP_ROADMAP: CleanupStep[] = [
  {
    order: 1,
    title: 'Complete the Main Story',
    description:
      'Finish all 10 main story quests in order. Do not rush — side content encountered on the way can be done now or cleaned up later.',
    effort: '~8–10 hrs',
  },
  {
    order: 2,
    title: 'Do bnty_04 (Black Powder Ippei) BEFORE Saito Compound',
    description:
      'Accept this bounty from the Yotei Grasslands board immediately — a known bug permanently removes it if you visit the Saito Compound first.',
    effort: '15 min',
    warning:
      'Missable: permanent lock if Saito Compound is approached first. Accept this before any story mission that takes you east of the Grasslands.',
  },
  {
    order: 3,
    title: 'Clear all 7 Mythic Tales',
    description:
      'Mythic Tales unlock the best techniques and weapons. Several are region-gated — do them as you open each region during the story to avoid backtracking.',
    effort: '~3–4 hrs',
  },
  {
    order: 4,
    title: 'Complete all 4 Sensei companion arcs',
    description:
      'The 20 Sensei Tales run across 4 companions (Jubei, Kei, Tomoe, Riku — 5 quests each). Finish each arc fully before the end of the story to unlock companions for The Reckoning.',
    effort: '~5–6 hrs',
    warning: 'Completing each arc before the final main quest unlocks that companion as an ally in The Reckoning.',
  },
  {
    order: 5,
    title: 'Finish all 31 Bounty Quests',
    description:
      'Bounties are available in any order and persist after the story. The final bounty (The Shadow of Ezo) unlocks only after all 30 others are complete.',
    effort: '~4–5 hrs',
  },
  {
    order: 6,
    title: 'Complete all 48 Side Tales',
    description:
      'Side Tales are region-spread across all 6 areas. Track by region in the Quests screen. None are missable after the story ends.',
    effort: '~10–12 hrs',
  },
  {
    order: 7,
    title: 'Clear the 3 Post-Story epilogue quests',
    description:
      'Three endgame quests unlock after the main story concludes. Complete these to close out all quest categories.',
    effort: '~1–2 hrs',
  },
  {
    order: 8,
    title: 'Liberate all 18 settlements',
    description:
      'Work through all 6 regions systematically. Liberating settlements unlocks smiths, merchants, and late-game upgrade materials.',
    effort: '~3–4 hrs',
    verificationNeeded: true,
  },
  {
    order: 9,
    title: 'Collect all region-specific collectibles',
    description:
      'Clear one region at a time: Ainu Sacred Sites → Sumi-e Paintings → Ancient Maps → Clan Trophies → Hot Springs → Bamboo Strikes → Shrines → Puzzle Boxes. Per-region filters in the Collectibles screen help track what is left.',
    effort: '~8–12 hrs',
    verificationNeeded: true,
  },
  {
    order: 10,
    title: 'Complete all Haiku stations and Dueling Circles',
    description:
      'Haiku stations and dueling circles are scattered across all 6 regions. Use the Activities checklist (this screen) to track completion.',
    effort: '~2–3 hrs',
    verificationNeeded: true,
  },
  {
    order: 11,
    title: 'Finish all Vanity Challenges',
    description:
      'The final Vanity Challenge (Ultimate Warrior) unlocks only after all 7 Mythic Tales are done. Complete all others first.',
    effort: '~1 hr',
    verificationNeeded: true,
  },
  {
    order: 12,
    title: 'Upgrade all weapons and armour to T5',
    description:
      'Requires liberated settlement smiths in every region. Farm late-game materials from Nayoro Wilds and Oshima Coast. Check the Upgrades tab for material requirements.',
    effort: '~2–3 hrs',
    verificationNeeded: true,
  },
  {
    order: 13,
    title: 'Mop-up: check trophy list and fill remaining gaps',
    description:
      'Open the Trophies screen and scan for any bronze/silver that have not triggered. Common gaps: haiku count, duel count, specific technique use, Sumi-e paintings.',
    effort: '~1–2 hrs',
  },
  {
    order: 14,
    title: 'New Game Plus sweep (if applicable)',
    description:
      'NG+ likely resets quest completion but carries over techniques and cosmetics. Use a second playthrough to reach any missed trophies that require specific story choices.',
    effort: 'Variable',
    verificationNeeded: true,
  },
];

// ── New Game Plus overview ────────────────────────────────────────────────────
// Based on Ghost of Tsushima NG+ pattern — all specifics need verification.

export const NG_PLUS_INFO: NGPlusInfo = {
  overview:
    'Ghost of Yōtei is expected to include a New Game Plus mode based on the franchise pattern. All details below are pre-release estimates — update this section once the game ships and NG+ is confirmed.',
  verificationNeeded: true,
  carriesOver: [
    {
      label: 'All unlocked techniques and skills',
      detail: 'Your full skill tree carries into NG+.',
      verificationNeeded: true,
    },
    {
      label: 'Cosmetics and dye colours',
      detail: 'All unlocked armour cosmetics and dyes are retained.',
      verificationNeeded: true,
    },
    {
      label: 'Charms collected',
      detail: 'Shrine charms and slots carry over.',
      verificationNeeded: true,
    },
    {
      label: 'Weapon upgrade tiers',
      detail: 'All weapons remain at their NG upgrade tier.',
      verificationNeeded: true,
    },
  ],
  resets: [
    {
      label: 'Quest completion',
      detail: 'All quests restart from the beginning.',
      verificationNeeded: true,
    },
    {
      label: 'Collectible progress',
      detail: 'Collectibles reset — all must be found again.',
      verificationNeeded: true,
    },
    {
      label: 'Settlement liberations',
      detail: 'All settlements return to occupied status.',
      verificationNeeded: true,
    },
    {
      label: 'Bounty board',
      detail: 'All 31 bounties reset and must be re-accepted.',
      verificationNeeded: true,
    },
  ],
};

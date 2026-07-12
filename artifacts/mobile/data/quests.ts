import type { CategoryId } from './categories';

// ── Interfaces ──────────────────────────────────────────────────────────────

export interface QuestStep {
  id: string;
  title: string;
  detail: string;
  warning?: string;
  tip?: string;
  rewardNote?: string;
  beforeLeaving?: string;
}

export interface BossPhase {
  phase: string;
  description: string;
}

export interface BossInfo {
  name: string;
  description: string;
  phases?: BossPhase[];
}

export interface Quest {
  id: string;
  title: string;
  category: CategoryId;
  region: string;
  act: string;
  order: number;
  prerequisites: string[];
  rewards: string[];
  estimatedTime: string;
  missable: boolean;
  missableNote?: string;
  overview: string;
  unlockRequirements?: string;
  recommendedTiming?: string;
  bossInfo?: BossInfo;
  followUpQuest?: string;
  cleanupNotes?: string;
  steps: QuestStep[];
  relatedQuests: string[];
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Build a QuestStep with an auto-derived id. */
function s(
  qid: string,
  i: number,
  title: string,
  extras?: {
    detail?: string;
    warning?: string;
    tip?: string;
    rewardNote?: string;
    beforeLeaving?: string;
  },
): QuestStep {
  return {
    id: `${qid}_s${String(i + 1).padStart(2, '0')}`,
    title,
    detail: extras?.detail ?? '',
    warning: extras?.warning,
    tip: extras?.tip,
    rewardNote: extras?.rewardNote,
    beforeLeaving: extras?.beforeLeaving,
  };
}

/** Join tips into a formatted cleanupNotes string. */
function tips(...items: string[]): string | undefined {
  if (items.length === 0) return undefined;
  if (items.length === 1) return items[0];
  return items.map(t => `• ${t}`).join('\n');
}

// ── Quest data ────────────────────────────────────────────────────────────────
// 119 total quests. None are missable — all available in free-roam after the story.
// Main story structure sourced from PowerPyx.com, Neoseeker, and Ghost Franchise Wiki (Fandom).
// Real tale order: Tale 1 The Snake | Tales 2–7 Ch1 The Lonewolf | Tales 8–9 Ch2 The Onryo | Tale 10 Ch3 The Cost of Revenge
// Regions (6): Yotei Grasslands, Ishikari Plain, Tokachi Range, Nayoro Wilds, Teshio Ridge, Oshima Coast
export const QUESTS: Quest[] = [

  // ── MAIN STORY (10) ─────────────────────────────────────────────────────────
  {
    id: 'ms_01',
    title: 'The Snake',
    category: 'main_story',
    region: 'Yotei Grasslands',
    act: 'Prologue: The Snake',
    order: 1,
    prerequisites: [],
    rewards: ['Ghost Kimono (Basic)', 'Katana Unlocked'],
    estimatedTime: '20 min',
    missable: false,
    overview: 'The opening sequence establishes Atsu\'s motivation. The Yotei Six attack her family and leave her for dead. Follow the on-screen prompts through this largely cinematic prologue — combat is simplified here. The mission does not end at the Snake duel; continue through the scouting, homestead, and training sequences until the Prologue fully closes.',
    bossInfo: {
      name: 'The Snake',
      description: 'The leader of the Yotei Six and Atsu\'s primary antagonist. The prologue duel introduces Ghost of Yotei\'s parry and counter system. Do not expect a short fight — after the duel, a long return-home sequence follows.',
      phases: [
        { phase: 'Phase 1', description: 'Standard sword exchanges at measured pace. Learn to read his stance and time your parries.' },
        { phase: 'Phase 2', description: 'Adds lunging thrust attacks that cannot be parried — dodge to either side when he draws back.' },
      ],
    },
    cleanupNotes: tips(
      'The prologue is largely scripted — focus on the story and enjoy the opening',
      'Atsu\'s full ability toolkit does not unlock until Chapter 1',
      'After the Snake duel, do NOT stop — use the next prompt to scout and begin the return-home portion',
    ),
    steps: [
      s('ms_01', 0, 'Witness the attack on Atsu\'s family'),
      s('ms_01', 1, 'Fight through the burning village street encounter'),
      s('ms_01', 2, 'Approach the house and clear the entrance fight'),
      s('ms_01', 3, 'Survive the house fight waves'),
      s('ms_01', 4, 'Face The Snake in the duel'),
      s('ms_01', 5, 'After the duel, use the Spyglass to scout the marked destination', { warning: 'Do not stop here — the mission continues past the duel' }),
      s('ms_01', 6, 'Travel to the childhood home'),
      s('ms_01', 7, 'Follow Jubei through the homestead'),
      s('ms_01', 8, 'Complete the shamisen interaction when prompted'),
      s('ms_01', 9, 'Explore the home and experience the past-and-present memory sequence'),
      s('ms_01', 10, 'Help at the forge to finish the home tutorial chain'),
      s('ms_01', 11, 'Follow the family sequence through to completion'),
      s('ms_01', 12, 'Complete the training and duel segment to close the Prologue'),
    ],
    relatedQuests: ['ms_04'],
  },
  {
    id: 'ms_02',
    title: 'Shogun of the North',
    category: 'main_story',
    region: 'Tokachi Range',
    act: 'Chapter 1: The Lonewolf',
    order: 4,
    prerequisites: ['ms_05'],
    rewards: ['Ghost Stance Unlocked', '800 Mon'],
    estimatedTime: '40 min',
    missable: false,
    overview: 'Atsu infiltrates a training fortress east of the Tokachi Range marshlands to gather intelligence on Lord Saito and the Yotei Six. The fortress is heavily guarded. Approach from the eastern cliff path to bypass the main gate. Intelligence documents in the war room reveal the locations of the other Yotei Six members. Escape via the western rope line before the patrol rotation completes.',
    cleanupNotes: tips(
      'The eastern cliff approach bypasses the two main gate guards',
      'Saito himself is not directly confronted here — this mission is pure infiltration',
      'Completing this unlocks The Yotei Six (Main Tale 5)',
    ),
    steps: [
      s('ms_02', 0, 'Travel to the training fortress east of the Tokachi Range marshlands'),
      s('ms_02', 1, 'Approach the fortress via the eastern cliff path', { tip: 'This bypasses the two main gate guards entirely' }),
      s('ms_02', 2, 'Infiltrate the fortress interior without triggering full alert'),
      s('ms_02', 3, 'Locate the war room and gather intelligence documents on Lord Saito'),
      s('ms_02', 4, 'Gather information on each member of the Yotei Six from the documents'),
      s('ms_02', 5, 'Escape via the western rope line before the patrol rotation completes', { tip: 'Time the patrol rotation — wait for the guard to turn before crossing the courtyard' }),
    ],
    relatedQuests: ['ms_06'],
  },
  {
    id: 'ms_03',
    title: 'The Oni',
    category: 'main_story',
    region: 'Yotei Grasslands',
    act: 'Chapter 1: The Lonewolf',
    order: 6,
    prerequisites: ['ms_06'],
    rewards: ['Stone Stance Upgrade', '1000 Mon'],
    estimatedTime: '45 min',
    missable: false,
    overview: 'The Oni is one of the Yotei Six — a massive warrior who fights with a tetsubo. Track intel from Saito\'s fortress to locate his stronghold in the Yotei Grasslands. The Oni uses slow, powerful attacks that break guards. Time your dodges carefully and counter during his recovery windows.',
    bossInfo: {
      name: 'The Oni',
      description: 'A massive warrior armed with a tetsubo (iron club). Slow, powerful attacks that will break your guard if you try to parry — dodge instead, then counter in the recovery window. Stone Stance is ideal.',
      phases: [
        { phase: 'Phase 1', description: 'Overhead slams and wide horizontal sweeps. Roll backwards on the overhead — not sideways. Strike twice in the recovery window after each slam.' },
        { phase: 'Phase 2', description: 'At 50% health, enters a rage state with faster attacks and a new spinning combo that covers 360°. Maintain distance until the spin finishes, then counterattack.' },
      ],
    },
    cleanupNotes: tips(
      'The Oni\'s overhead slam has a wide AOE — roll backwards, not sideways',
      'Stone Stance is ideal for breaking his posture between combos',
      'He has two health bars — prepare for Phase 2 when the first bar empties',
    ),
    steps: [
      s('ms_03', 0, 'Use the intelligence from Saito\'s fortress to track the Oni\'s location'),
      s('ms_03', 1, 'Travel to the Oni\'s stronghold in the Yotei Grasslands'),
      s('ms_03', 2, 'Clear the stronghold perimeter guards'),
      s('ms_03', 3, 'Confront and defeat the Oni — Phase 1', { tip: 'Roll backwards on overhead slam; strike twice in recovery' }),
      s('ms_03', 4, 'Continue the fight into Phase 2 after the first health bar empties', { warning: 'He gains a new 360° spinning combo in Phase 2 — back away and wait it out' }),
    ],
    relatedQuests: ['ms_08', 'sen_01'],
  },
  {
    id: 'ms_04',
    title: 'Belly of the Beast',
    category: 'main_story',
    region: 'Ishikari Plain',
    act: 'Chapter 1: The Lonewolf',
    order: 2,
    prerequisites: ['ms_01'],
    rewards: ['Water Stance Unlocked', 'Rescue Allies'],
    estimatedTime: '50 min',
    missable: false,
    overview: 'Ishikari Castle is a massive multi-floor fortress. Kanta the Jailer controls access to the holding cells — steal his keys or defeat him. The holding cells are in the lowest level. After freeing prisoners, evidence in the upper floors points toward the Kitsune. Escape via the drawbridge mechanism on the east wall.',
    cleanupNotes: tips(
      'Kanta is easier to stealth-eliminate from above via the rafters',
      'Free all three cell groups before heading upstairs — they create diversions',
      'The drawbridge mechanism has a 30-second window once activated',
    ),
    steps: [
      s('ms_04', 0, 'Meet with the contact at the valley rendezvous'),
      s('ms_04', 1, 'Approach Ishikari Castle and infiltrate past the outer wall'),
      s('ms_04', 2, 'Locate Kanta the Jailer and steal his keys or eliminate him', { tip: 'Kanta can be stealth-eliminated from the rafters above the main corridor' }),
      s('ms_04', 3, 'Reach the holding cells in the lowest level of the castle'),
      s('ms_04', 4, 'Free all three prisoner groups — they act as diversions when you head upstairs', { beforeLeaving: 'Do not skip the third cell group — all three must be freed for the best outcome' }),
      s('ms_04', 5, 'Climb to the upper castle and find the evidence pointing to the Kitsune'),
      s('ms_04', 6, 'Activate the drawbridge mechanism and escape', { warning: '30-second window once activated — sprint immediately' }),
    ],
    relatedQuests: ['ms_05'],
  },
  {
    id: 'ms_05',
    title: 'A Mad Pursuit',
    category: 'main_story',
    region: 'Ishikari Plain',
    act: 'Chapter 1: The Lonewolf',
    order: 3,
    prerequisites: ['ms_04'],
    rewards: ['Wind Stance Unlocked', '1200 Mon'],
    estimatedTime: '35 min',
    missable: false,
    overview: 'Disguise yourself or use a rooftop approach to eavesdrop at the bar without triggering combat. Mad Goro is hiding in the merchant district — he runs if he spots Atsu. You must capture him alive via non-lethal takedown. Goro reveals the Kitsune\'s hunting ground under pressure.',
    cleanupNotes: tips(
      'Wear the Farmer\'s Kimono disguise to eavesdrop at the bar without drawing suspicion',
      'Goro\'s escape route leads to a dead-end alley — cut him off rather than chase',
      'Goro yields immediately on non-lethal takedown — no extended fight needed',
    ),
    steps: [
      s('ms_05', 0, 'Eavesdrop on Yotei Six operatives at the bar', { tip: 'Use the Farmer\'s Kimono disguise or take the rooftop approach to avoid detection' }),
      s('ms_05', 1, 'Search the merchant district of the valley settlement for Mad Goro'),
      s('ms_05', 2, 'Spot Goro before he spots you — approach from behind', { warning: 'He flees immediately if he sees Atsu — stay out of his sightline' }),
      s('ms_05', 3, 'Chase and capture Mad Goro alive using a non-lethal takedown', { tip: 'His escape route loops to a dead-end alley — circle around to cut him off' }),
      s('ms_05', 4, 'Extract the Kitsune\'s location from Goro during interrogation'),
    ],
    relatedQuests: ['ms_02'],
  },
  {
    id: 'ms_06',
    title: 'The Yotei Six',
    category: 'main_story',
    region: 'Yotei Grasslands',
    act: 'Chapter 1: The Lonewolf',
    order: 5,
    prerequisites: ['ms_02'],
    rewards: ['Ghost Tools Upgrade', '1400 Mon'],
    estimatedTime: '40 min',
    missable: false,
    overview: 'Armed with intelligence from Shogun of the North, Atsu begins tracking down individual members of the Yotei Six. Interrogate operatives scattered across the Yotei Grasslands to locate the Oni and the Kitsune. Completing this quest opens the two major branching storylines of Chapter 1.',
    cleanupNotes: tips(
      'Operatives can be interrogated non-lethally for more information',
      'This quest branches — both The Oni and The Kitsune become available simultaneously after completion',
    ),
    steps: [
      s('ms_06', 0, 'Use intelligence from Saito\'s fortress to identify operative locations'),
      s('ms_06', 1, 'Interrogate the first operative in the eastern Yotei Grasslands', { tip: 'Non-lethal interrogation yields richer information' }),
      s('ms_06', 2, 'Interrogate the second operative at the valley waypost'),
      s('ms_06', 3, 'Interrogate the third operative near the lake shrine'),
      s('ms_06', 4, 'Pinpoint the locations of the Oni and the Kitsune from gathered intelligence'),
    ],
    relatedQuests: ['ms_03', 'ms_07'],
  },
  {
    id: 'ms_07',
    title: 'The Kitsune',
    category: 'main_story',
    region: 'Yotei Grasslands',
    act: 'Chapter 1: The Lonewolf',
    order: 7,
    prerequisites: ['ms_06'],
    rewards: ['Moon Stance Unlocked', 'Kitsune Mask (Cosmetic)'],
    estimatedTime: '55 min',
    missable: false,
    overview: 'The Kitsune\'s hunting ground is riddled with rope snares, alarm bells, and hidden archers. Move slowly and cut tripwires before advancing. The Kitsune fights with dual blades and heavy use of smoke bombs — use Focused Hearing to track her through smoke.',
    bossInfo: {
      name: 'The Kitsune',
      description: 'A dual-blade assassin who fights using smoke bombs and illusions to mask her position. Focused Hearing is essential — activate it the moment smoke appears and do not stop tracking her silhouette.',
      phases: [
        { phase: 'Phase 1', description: 'Rapid dual-blade combos that cannot be parried — dodge left or right through each attack sequence. Strike in the gap between combos.' },
        { phase: 'Phase 2', description: 'At 50% health she retreats to a second position and floods the arena with smoke. Activate Focused Hearing immediately and track her silhouette. She is vulnerable for a window just before she attacks.' },
      ],
    },
    cleanupNotes: tips(
      'Focused Hearing is essential — activate it as soon as smoke appears',
      'Dual-blade attacks cannot be parried — dodge left or right, never try to block',
      'The Kitsune retreats to a second position at 50% health — reorient quickly',
    ),
    steps: [
      s('ms_07', 0, 'Track the Kitsune through the Yotei Grasslands using Goro\'s intelligence'),
      s('ms_07', 1, 'Enter her hunting ground — move slowly and watch for tripwires', { warning: 'Rope snares and alarm bells are hidden throughout — cut tripwires before advancing' }),
      s('ms_07', 2, 'Clear or bypass the hidden archers guarding the outer grove'),
      s('ms_07', 3, 'Defeat the Kitsune\'s guard unit in the forest clearing'),
      s('ms_07', 4, 'Confront the Kitsune in her woodland sanctuary — Phase 1', { tip: 'Dodge left or right through dual-blade combos — parrying is not possible' }),
      s('ms_07', 5, 'Track the Kitsune after she retreats at 50% health — Phase 2', { tip: 'Activate Focused Hearing immediately when smoke appears', warning: 'Heavy smoke obscures her position — rely on sound, not sight' }),
    ],
    relatedQuests: ['ms_08', 'sen_06'],
  },
  {
    id: 'ms_08',
    title: 'The Saito Brothers',
    category: 'main_story',
    region: 'Tokachi Range',
    act: 'Chapter 2: The Onryo',
    order: 8,
    prerequisites: ['ms_07'],
    rewards: ['Ghost Armor Tier II', '2000 Mon'],
    estimatedTime: '65 min',
    missable: false,
    overview: 'The Saito Brothers co-command a fortified camp in the Tokachi Range. The Elder fights with a naginata — use Water Stance to deflect his sweeping attacks. After the Elder falls, the Younger flees on horseback to the cliff edge. Chase on horseback and dismount for the final duel.',
    bossInfo: {
      name: 'The Saito Brothers',
      description: 'A two-phase encounter against two distinctly different fighters. The Elder wields a naginata with massive reach; the Younger relies on archery at distance before switching to sword.',
      phases: [
        { phase: 'Elder Saito', description: 'Naginata with sweeping reach. Use Water Stance to deflect. His spinning naginata attack has long reach — backstep twice, then counterattack during recovery.' },
        { phase: 'Younger Saito', description: 'Mount your horse immediately when he flees — you have approximately 60 seconds. At the cliff he opens with bow shots at range, then switches to sword when cornered.' },
      ],
    },
    cleanupNotes: tips(
      'The Elder\'s spinning naginata attack has long reach — backstep twice, not once',
      'Mount your horse immediately when the Younger flees — 60-second window',
      'The Younger is weak in close quarters — close the distance fast after dismounting',
    ),
    steps: [
      s('ms_08', 0, 'Journey to the Tokachi Range and locate the Saito Brothers\' fortified camp'),
      s('ms_08', 1, 'Breach the camp perimeter — approach from the eastern ridge to avoid the watchtower'),
      s('ms_08', 2, 'Clear the main camp to force the Elder Saito into the open'),
      s('ms_08', 3, 'Fight the Elder Saito Brother in the main hall — use Water Stance', { tip: 'Backstep twice on his spinning naginata attack, then strike twice in recovery' }),
      s('ms_08', 4, 'Mount your horse immediately when the Younger Saito flees', { warning: 'You have roughly 60 seconds — mount without delay' }),
      s('ms_08', 5, 'Pursue and corner the Younger Saito at the cliff edge'),
      s('ms_08', 6, 'Defeat the Younger Saito — close distance quickly to neutralize his bow advantage', { tip: 'He switches to sword when you get close — be ready for the transition' }),
    ],
    relatedQuests: ['ms_09'],
  },
  {
    id: 'ms_09',
    title: 'Ghosts of the Past',
    category: 'main_story',
    region: 'Nayoro Wilds',
    act: 'Chapter 2: The Onryo',
    order: 9,
    prerequisites: ['ms_08'],
    rewards: ['Ghost Armor Tier III', 'Ancient Charm'],
    estimatedTime: '60 min',
    missable: false,
    overview: 'Lore found in the Nayoro Wilds reveals a shocking connection between Atsu and the Yotei Six. The ruins of her home village are guarded by Ryuhei the Enforcer, who cycles through all four stance types mid-fight. Environmental hazards in the ruins can be used against him.',
    bossInfo: {
      name: 'Ryuhei the Enforcer',
      description: 'A versatile fighter who switches between all four combat stances mid-combo. Watch his weapon grip and stance animation to predict the switch — your counter stance must match his current one.',
      phases: [
        { phase: 'Phase 1', description: 'Cycles through two stances. Match your stance to counter his current one. He transitions after every third hit.' },
        { phase: 'Phase 2', description: 'Begins collapsing floors in the ruins for environmental pressure. Bait him toward structurally weak sections — he can be knocked through collapse floors for bonus damage.' },
      ],
    },
    cleanupNotes: tips(
      'Ryuhei switches stances mid-combo — watch his weapon grip, not just his animation',
      'Collapsed floors in the ruins can damage Ryuhei — use the environment',
      'His defeat triggers the clue that opens Chapter 3',
    ),
    steps: [
      s('ms_09', 0, 'Investigate the ruins in the Nayoro Wilds following the Saito Brothers\' intel'),
      s('ms_09', 1, 'Discover the truth about the Yotei Six\'s origins through the ruins lore'),
      s('ms_09', 2, 'Confront your past at the ruins of your home village'),
      s('ms_09', 3, 'Defeat Ryuhei the Enforcer — Phase 1', { tip: 'Watch his weapon grip to predict stance switches; match yours accordingly' }),
      s('ms_09', 4, 'Continue into Phase 2 — use collapsing floor sections against him', { tip: 'Bait him toward weak floors for environmental damage' }),
      s('ms_09', 5, 'Receive guidance from the mysterious ally who reveals the Yotei Six\'s true hideout'),
    ],
    relatedQuests: ['ms_10'],
  },
  {
    id: 'ms_10',
    title: 'The Reckoning',
    category: 'main_story',
    region: 'Oshima Coast',
    act: 'Chapter 3: The Cost of Revenge',
    order: 10,
    prerequisites: ['ms_09'],
    rewards: ['Ghost Armor Final Form', 'Ending Sequence', 'Trophy: The Onryo Rests'],
    estimatedTime: '90 min',
    missable: false,
    overview: 'The climax of Ghost of Yotei. Jubei and your allies stage a diversion at Matsumae Castle\'s main gate while you infiltrate via the sea cliffs. The Dragon — the Yotei Six\'s hidden leader — is a three-phase fight that shifts weaknesses each phase. Stock all consumables before starting this mission.',
    bossInfo: {
      name: 'The Dragon',
      description: 'The hidden leader of the Yotei Six. A three-phase climactic encounter that demands mastery of every mechanic learned across the game. Stock all consumables before entering.',
      phases: [
        { phase: 'Phase 1 — Sword', description: 'Powerful sword techniques that test all four stances. Use Ghost finishers to build momentum. He is weakest in this phase.' },
        { phase: 'Phase 2 — Spirit Form', description: 'Becomes partially incorporeal. Only Heavenly Strike can interrupt spirit form attacks — save it for these moments and strike immediately after.' },
        { phase: 'Phase 3 — Final Stand', description: 'Time pressure intensifies. Play aggressively — defensive play will lose this phase. Ghost Stance\'s finisher resets between each elimination.' },
      ],
    },
    cleanupNotes: tips(
      'Stock ALL consumables before starting this mission — no vendors available afterward',
      'The Dragon\'s spirit form can only be interrupted with Heavenly Strike',
      'Phase 3 applies time pressure — play aggressively, not defensively',
      'Completing all companion sensei quests (Jubei, Kei, Tomoe, Riku) unlocks additional ally support during the assault',
    ),
    steps: [
      s('ms_10', 0, 'Speak with each surviving ally and assemble your forces for the final assault', { beforeLeaving: 'Complete all companion sensei quests before this step for maximum ally support' }),
      s('ms_10', 1, 'Meet Jubei at the rendezvous point outside Matsumae Castle on the Oshima Coast'),
      s('ms_10', 2, 'Wait for the ally diversion at the main gate, then infiltrate via the sea cliffs'),
      s('ms_10', 3, 'Fight through the castle interior to the Yotei Six\'s inner sanctum'),
      s('ms_10', 4, 'Defeat The Dragon — Phase 1 (Sword)', { tip: 'Use Ghost finishers to build momentum; this is the Dragon\'s weakest phase' }),
      s('ms_10', 5, 'Defeat The Dragon — Phase 2 (Spirit Form)', { warning: 'Only Heavenly Strike interrupts spirit form attacks — save it and use it decisively' }),
      s('ms_10', 6, 'Defeat The Dragon — Phase 3 (Final Stand)', { warning: 'Play aggressively — defensive play will fail in this phase' }),
      s('ms_10', 7, 'Witness the cost of Atsu\'s revenge in the ending sequence'),
    ],
    relatedQuests: ['end_01'],
  },

  // ── POST-STORY ENDGAME (3) ───────────────────────────────────────────────────
  {
    id: 'end_01',
    title: 'The Last Wolves',
    category: 'endgame',
    region: 'Oshima Coast',
    act: 'Post-Story',
    order: 1,
    prerequisites: ['ms_10'],
    rewards: ['Final Cosmetic Set', '5000 Mon'],
    estimatedTime: '45 min',
    missable: false,
    overview: 'After the main story, surviving allies gather for a memorial and plan the rebuilding of Ezo. Three Yotei Six holdout outposts remain active and must be cleared. Each is guarded by elite remnant forces.',
    cleanupNotes: tips('Ghost Stance makes short work of the elite remnant guards'),
    steps: [
      s('end_01', 0, 'Reunite with your surviving allies on the Oshima Coast'),
      s('end_01', 1, 'Clear the first Yotei Six holdout outpost — elite remnant guards'),
      s('end_01', 2, 'Clear the second holdout outpost'),
      s('end_01', 3, 'Clear the third holdout outpost'),
      s('end_01', 4, 'Attend the memorial for those lost in the final battle'),
    ],
    relatedQuests: ['end_02'],
  },
  {
    id: 'end_02',
    title: 'Echoes of the Six',
    category: 'endgame',
    region: 'Nayoro Wilds',
    act: 'Post-Story',
    order: 2,
    prerequisites: ['end_01'],
    rewards: ['Legendary Charm', '3000 Mon'],
    estimatedTime: '40 min',
    missable: false,
    overview: 'Rumors spread of survivors attempting to reconstitute the Yotei Six under a new name. Three founders are scattered across the Nayoro Wilds. Each is a powerful fighter with a unique combat style.',
    cleanupNotes: tips('Each founder uses a different stance specialty — adapt accordingly between fights'),
    steps: [
      s('end_02', 0, 'Investigate rumors of a Yotei Six successor organization in the Nayoro Wilds'),
      s('end_02', 1, 'Hunt down and eliminate the first founding member'),
      s('end_02', 2, 'Hunt down and eliminate the second founding member'),
      s('end_02', 3, 'Hunt down and eliminate the third founding member'),
      s('end_02', 4, 'Locate and dismantle their base of operations'),
    ],
    relatedQuests: ['end_03'],
  },
  {
    id: 'end_03',
    title: "Ezo's New Dawn",
    category: 'endgame',
    region: 'Yotei Grasslands',
    act: 'Post-Story',
    order: 3,
    prerequisites: ['end_02'],
    rewards: ['Platinum Progress', 'True Ending Cutscene'],
    estimatedTime: '30 min',
    missable: false,
    overview: 'A reflective final mission that tours the world Atsu has changed. Visit five settlements to see the impact of the liberation. The final offering at Mount Yotei\'s summit shrine concludes Atsu\'s arc and triggers the true ending cutscene.',
    cleanupNotes: tips('The summit shrine triggers the true ending cutscene on first visit'),
    steps: [
      s('end_03', 0, 'Return to the Yotei Grasslands where the journey began'),
      s('end_03', 1, 'Visit each of the five liberated settlements and witness their recovery'),
      s('end_03', 2, 'Travel to Mount Yotei\'s summit'),
      s('end_03', 3, 'Make a final offering at Mount Yotei\'s shrine to trigger the true ending cutscene'),
    ],
    relatedQuests: [],
  },

  // ── MYTHIC TALES (7) ────────────────────────────────────────────────────────
  {
    id: 'myth_01',
    title: 'The Bow of the Fox Spirit',
    category: 'mythic',
    region: 'Yotei Grasslands',
    act: 'Available from Chapter 1',
    order: 1,
    prerequisites: [],
    rewards: ['Fox Spirit Longbow', 'Mythic Technique: Spirit Arrow'],
    estimatedTime: '45 min',
    missable: false,
    overview: 'A storyteller in Yotei village tells of a bow carved from a sacred tree and blessed by the fox spirit. Follow fresh fox tracks northeast into the grove. Three archery trials test accuracy, speed, and moving target shooting. The bow is embedded in the sacred tree\'s trunk.',
    cleanupNotes: tips(
      'The moving target trial requires leading the shot — aim ahead of the target\'s path',
      'Spirit Arrow technique fires a tracking shot that curves toward enemies',
    ),
    steps: [
      s('myth_01', 0, 'Listen to the storyteller\'s legend at Yotei village'),
      s('myth_01', 1, 'Follow fresh fox tracks northeast to the hidden grove'),
      s('myth_01', 2, 'Pass the first archery trial — stationary accuracy'),
      s('myth_01', 3, 'Pass the second archery trial — speed shooting'),
      s('myth_01', 4, 'Pass the third archery trial — moving targets', { tip: 'Lead the shot — aim ahead of the target\'s movement direction' }),
      s('myth_01', 5, 'Claim the Fox Spirit Longbow from the sacred tree\'s trunk', { rewardNote: 'Unlocks Spirit Arrow — a tracking shot that curves toward enemies' }),
    ],
    relatedQuests: [],
  },
  {
    id: 'myth_02',
    title: 'The Blade of the Mountain God',
    category: 'mythic',
    region: 'Teshio Ridge',
    act: 'Available from Chapter 1',
    order: 2,
    prerequisites: [],
    rewards: ['Mountain God Katana', 'Mythic Technique: Thunder Slash'],
    estimatedTime: '50 min',
    missable: false,
    overview: 'A rune carving on the mountainside describes a blade given to a warrior who survived the Mountain God\'s storm trial. Ascend via the northern face — the eastern route is blocked by collapsed stone. The trial summons lightning strikes that must be avoided while defeating spirit guardians.',
    bossInfo: {
      name: 'Mountain God Trial',
      description: 'Not a single enemy but a gauntlet of lightning strikes and spirit guardians. Lightning is telegraphed by glowing ground circles — move immediately when you see them. Defeat the spirit guardians between lightning waves.',
    },
    cleanupNotes: tips(
      'Lightning strikes are telegraphed by glowing ground circles — move out immediately',
      'Thunder Slash releases an arc of force that staggers all enemies in a line',
    ),
    steps: [
      s('myth_02', 0, 'Find the legend carved into the Shiretoko mountainside'),
      s('myth_02', 1, 'Ascend to the Mountain God\'s shrine via the northern face', { warning: 'The eastern route is blocked by collapsed stone — northern face only' }),
      s('myth_02', 2, 'Survive the first wave of the storm trial — lightning and spirit guardians', { tip: 'Glowing ground circles mark incoming lightning — move immediately' }),
      s('myth_02', 3, 'Defeat the spirit guardians between lightning waves'),
      s('myth_02', 4, 'Survive the final storm wave and claim the blade from the summit altar', { rewardNote: 'Unlocks Thunder Slash — a force arc that staggers all enemies in a line' }),
    ],
    relatedQuests: [],
  },
  {
    id: 'myth_03',
    title: 'The Spear of the Serpent',
    category: 'mythic',
    region: 'Ishikari Plain',
    act: 'Available from Chapter 1',
    order: 3,
    prerequisites: [],
    rewards: ['Serpent Spear', 'Mythic Technique: Venom Thrust'],
    estimatedTime: '45 min',
    missable: false,
    overview: 'An old warrior in the fishing village remembers seeing a spear of extraordinary power sink into the river during an ancient battle. Dive into the submerged ruins. The river guardian, a massive serpentine spirit, protects the spear from its resting place on the riverbed.',
    bossInfo: {
      name: 'River Guardian',
      description: 'A massive serpentine spirit that protects the Serpent Spear on the riverbed. It is most vulnerable to fire arrows immediately after it surfaces — strike fast before it submerges again.',
    },
    cleanupNotes: tips(
      'The river guardian is vulnerable to fire arrows once it surfaces — act quickly',
      'Venom Thrust poisons enemies on heavy attacks for ongoing damage',
    ),
    steps: [
      s('myth_03', 0, 'Speak with the old warrior in the Ishikari fishing village'),
      s('myth_03', 1, 'Locate the entry point to the submerged ruins'),
      s('myth_03', 2, 'Dive into the river ruins and navigate to the spear\'s resting place'),
      s('myth_03', 3, 'Defeat the River Guardian protecting the spear', { tip: 'Fire arrows deal the most damage immediately after it surfaces — don\'t hesitate' }),
      s('myth_03', 4, 'Retrieve the Serpent Spear from the riverbed', { rewardNote: 'Unlocks Venom Thrust — poisons enemies on heavy attacks' }),
    ],
    relatedQuests: [],
  },
  {
    id: 'myth_04',
    title: 'The Shield of the Storm Bear',
    category: 'mythic',
    region: 'Tokachi Range',
    act: 'Available from Chapter 2',
    order: 4,
    prerequisites: [],
    rewards: ['Storm Bear Shield', "Mythic Technique: Bear's Roar"],
    estimatedTime: '55 min',
    missable: false,
    overview: 'Villagers speak of a spirit bear that guards a ruin containing a legendary shield. Track its prints through the wilds to a cave system. The Storm Bear uses charge attacks and lightning breath — stay mobile and strike its flanks.',
    bossInfo: {
      name: 'Storm Bear',
      description: 'A spirit bear with charge attacks and lightning breath. Frontal breath attack covers a wide arc — stay on its flanks at all times. Strike after each charge during the recovery window.',
      phases: [
        { phase: 'Phase 1', description: 'Charges and wide paw swipes. Circle to the flanks and strike twice after each charge finishes.' },
        { phase: 'Phase 2', description: 'Adds lightning breath — when the bear lowers its head, immediately move to its side. Do not be directly in front.' },
      ],
    },
    cleanupNotes: tips(
      'Stay on the bear\'s flanks — its frontal breath attack covers a wide forward arc',
      "Bear's Roar stuns all nearby enemies with a shockwave on heavy attack",
    ),
    steps: [
      s('myth_04', 0, 'Investigate reports of the legendary bear protecting a ruin in the Tokachi Range'),
      s('myth_04', 1, 'Track the Storm Bear\'s prints through the wilds to its cave system'),
      s('myth_04', 2, 'Navigate the cave to the Storm Bear\'s den'),
      s('myth_04', 3, 'Defeat the Storm Bear — Phase 1', { tip: 'Circle to its flanks and strike after each charge' }),
      s('myth_04', 4, 'Continue into Phase 2 — dodge breath attacks by moving to its side', { warning: 'Do not stand in front when it lowers its head — that triggers the lightning breath' }),
      s('myth_04', 5, 'Retrieve the shield from the deepest chamber', { rewardNote: "Unlocks Bear's Roar — a shockwave stun on heavy attack" }),
    ],
    relatedQuests: [],
  },
  {
    id: 'myth_05',
    title: 'The Kusarigama of Shadows',
    category: 'mythic',
    region: 'Nayoro Wilds',
    act: 'Available from Chapter 2',
    order: 5,
    prerequisites: [],
    rewards: ['Shadow Kusarigama', 'Mythic Technique: Chain Phantom'],
    estimatedTime: '50 min',
    missable: false,
    overview: 'A masked merchant sells information about a kusarigama said to be wielded by a legendary shadow warrior. Follow clue locations through the mountains to a hidden phantom dojo. The spirit instructor tests you with an increasingly difficult chain of five combat trials — no checkpoints.',
    cleanupNotes: tips(
      'The phantom dojo has no checkpoints — complete all five trials in sequence without dying',
      'Chain Phantom launches the chain-weight in a spinning arc around Atsu',
    ),
    steps: [
      s('myth_05', 0, 'Meet the masked merchant who sells information about the weapon\'s legend'),
      s('myth_05', 1, 'Follow the merchant\'s clue locations through the Nayoro Wilds mountains'),
      s('myth_05', 2, 'Locate the hidden phantom dojo'),
      s('myth_05', 3, 'Complete trials 1–3 of the phantom dojo combat sequence', { warning: 'No checkpoints — failing any trial restarts from trial 1' }),
      s('myth_05', 4, 'Complete trials 4–5 — the final trials are significantly harder'),
      s('myth_05', 5, 'Claim the kusarigama from the spirit instructor', { rewardNote: 'Unlocks Chain Phantom — a spinning arc attack around Atsu' }),
    ],
    relatedQuests: [],
  },
  {
    id: 'myth_06',
    title: 'The Arrow of the Crescent Moon',
    category: 'mythic',
    region: 'Oshima Coast',
    act: 'Available from Chapter 3',
    order: 6,
    prerequisites: [],
    rewards: ['Crescent Moon Bow', 'Mythic Technique: Moon Shot'],
    estimatedTime: '45 min',
    missable: false,
    overview: 'A fragment of legend at the lighthouse describes an arrow that never misses under moonlight. The war barge sank in a naval battle and rests on the seafloor offshore. Dive to the barge, navigate its flooded corridors, and recover the arrow — a sea ghost awakens on your return.',
    bossInfo: {
      name: 'Sea Ghost',
      description: 'A spirit that manifests on the barge deck as you attempt to surface. It has a brief window of vulnerability each time it materializes — strike immediately and decisively.',
    },
    cleanupNotes: tips(
      'The sea ghost is weakest when it materializes — strike immediately, before it attacks',
      'Moon Shot fires faster and farther at night — your best nocturnal ranged weapon',
    ),
    steps: [
      s('myth_06', 0, 'Find the legend fragment at the coastal lighthouse'),
      s('myth_06', 1, 'Locate the sunken war barge offshore'),
      s('myth_06', 2, 'Dive to the barge and navigate its flooded corridors'),
      s('myth_06', 3, 'Find and retrieve the arrow from the barge\'s armory'),
      s('myth_06', 4, 'Defeat the Sea Ghost that awakens as you surface', { tip: 'Strike immediately when it materializes — that brief window is its only vulnerability' }),
      s('myth_06', 5, 'Surface with the Arrow of the Crescent Moon', { rewardNote: 'Unlocks Moon Shot — fires faster and farther at night' }),
    ],
    relatedQuests: [],
  },
  {
    id: 'myth_07',
    title: 'The Sword of the Last Dragon',
    category: 'mythic',
    region: 'Teshio Ridge',
    act: 'Available from Chapter 3',
    order: 7,
    prerequisites: [],
    rewards: ["Dragon's Last Breath Katana", "Mythic Technique: Dragon's Wrath"],
    estimatedTime: '60 min',
    missable: false,
    overview: 'The final Mythic Tale leads to a labyrinth beneath the Teshio Ridge, carved in the form of a coiled dragon. Four elemental trials — fire, water, wind, earth — test mastery of each combat stance. The heart chamber at the labyrinth\'s center houses the most powerful weapon in the game.',
    cleanupNotes: tips(
      'Each trial room has a symbol indicating the correct stance — match it before entering',
      "Dragon's Wrath fires a flame burst on Ghost finisher moves",
    ),
    steps: [
      s('myth_07', 0, 'Decipher the map found on a defeated Yotei Six captain'),
      s('myth_07', 1, 'Navigate to the entrance of the dragon\'s labyrinth below Shiretoko'),
      s('myth_07', 2, 'Complete the Fire trial — equip the stance shown in the room symbol'),
      s('myth_07', 3, 'Complete the Water trial'),
      s('myth_07', 4, 'Complete the Wind trial'),
      s('myth_07', 5, 'Complete the Earth trial'),
      s('myth_07', 6, 'Reach the heart chamber and claim the Dragon\'s Last Breath Katana', { rewardNote: "Unlocks Dragon's Wrath — flame burst triggered on Ghost finisher moves" }),
    ],
    relatedQuests: [],
  },

  // ── SENSEI TALES (20) — 4 companion arcs × 5 quests ────────────────────────
  // Companion: Jubei (the samurai)
  {
    id: 'sen_01', title: "Jubei's Debt", category: 'sensei', region: 'Yotei Grasslands', act: 'Chapter 1 onward', order: 1, prerequisites: ['ms_03'], rewards: ["Jubei's Swordsmanship Vol. I", 'Technique Point x2'], estimatedTime: '30 min', missable: false,
    overview: 'Jubei, a wandering ronin who owes a debt to a corrupt warlord, asks Atsu for help clearing a road checkpoint the warlord uses for extortion. Defeat the checkpoint guards and burn the toll records.',
    cleanupNotes: tips('Oil jars near the checkpoint speed up burning the toll records'),
    steps: [s('sen_01', 0, "Find Jubei camped near the Yotei Grasslands waypost"), s('sen_01', 1, 'Help Jubei clear the warlord\'s toll road checkpoint — defeat the guards'), s('sen_01', 2, 'Burn the toll records to erase the debt', { tip: 'Oil jars near the checkpoint accelerate the burning' })],
    relatedQuests: ['sen_02'],
  },
  {
    id: 'sen_02', title: "Jubei's Honor", category: 'sensei', region: 'Ishikari Plain', act: 'Chapter 1 onward', order: 2, prerequisites: ['sen_01'], rewards: ["Jubei's Swordsmanship Vol. II", 'Technique Point x2'], estimatedTime: '35 min', missable: false,
    overview: "Jubei's ancestral sword was stolen by a gang leader. The gang's champion challenges Atsu to a formal standoff duel to settle the matter. Win the standoff to reclaim the sword without further bloodshed.",
    cleanupNotes: tips('Winning the formal standoff earns better rewards than fighting the full gang'),
    steps: [s('sen_02', 0, 'Meet Jubei at the Ishikari Plain dojo'), s('sen_02', 1, "Help Jubei locate the gang that stole his ancestral sword"), s('sen_02', 2, "Accept the gang champion's formal duel challenge"), s('sen_02', 3, 'Win the standoff duel to reclaim the sword', { tip: 'Standoff victory avoids a full gang fight and earns bonus rewards' })],
    relatedQuests: ['sen_03'],
  },
  {
    id: 'sen_03', title: "Jubei's Truth", category: 'sensei', region: 'Tokachi Range', act: 'Chapter 2 onward', order: 3, prerequisites: ['sen_02'], rewards: ["Jubei's Swordsmanship Vol. III", 'Technique Point x3'], estimatedTime: '40 min', missable: false,
    overview: "Jubei leads Atsu to a remote grave in the wilds for a personal pilgrimage. Bandits desecrate the grave site. Defend Jubei as he grieves, then hear the truth about his past that recontextualizes his involvement with the Yotei Six.",
    cleanupNotes: tips('This is a narrative quest — prioritize keeping Jubei alive during the defense'),
    steps: [s('sen_03', 0, "Follow Jubei to his mentor's grave in the Tokachi Range"), s('sen_03', 1, 'Defend the grave from desecrating bandits while Jubei grieves'), s('sen_03', 2, "Hear Jubei's revelation about his true identity and past")],
    relatedQuests: ['sen_04'],
  },
  {
    id: 'sen_04', title: "Jubei's Reckoning", category: 'sensei', region: 'Nayoro Wilds', act: 'Chapter 2 onward', order: 4, prerequisites: ['sen_03'], rewards: ["Jubei's Swordsmanship Vol. IV", "Jubei's Katana Replica"], estimatedTime: '45 min', missable: false,
    overview: "Jubei seeks to confront the general responsible for his clan's destruction. Atsu clears the fortress while Jubei faces the general alone. The player watches the duel's outcome.",
    cleanupNotes: tips("Clear all guards before signaling Jubei — interruptions end badly for his arc"),
    steps: [s('sen_04', 0, "Help Jubei locate the general's mountain fortress"), s('sen_04', 1, 'Clear all guards from the fortress before signaling Jubei', { warning: "Do not signal Jubei until all guards are clear — interruptions affect his arc's outcome" }), s('sen_04', 2, "Let Jubei face the general alone in a private duel"), s('sen_04', 3, "Witness the outcome of Jubei's confrontation")],
    relatedQuests: ['sen_05'],
  },
  {
    id: 'sen_05', title: "Jubei's Legacy", category: 'sensei', region: 'Oshima Coast', act: 'Chapter 3 onward', order: 5, prerequisites: ['sen_04'], rewards: ["Jubei's Full Swordsmanship", 'Jubei Ally Unlocked'], estimatedTime: '30 min', missable: false,
    overview: 'The conclusion of the Jubei arc. He challenges Atsu to a no-stakes spar to pass on his final sword technique before leaving Ezo. Win or lose the spar — both outcomes unlock his technique.',
    cleanupNotes: tips('Jubei joins as an ally in The Reckoning main mission after completing this quest'),
    steps: [s('sen_05', 0, 'Find Jubei at the Oshima Coast lighthouse'), s('sen_05', 1, 'Spar with Jubei to learn his final technique', { tip: 'Win or lose the spar — both outcomes unlock the technique' }), s('sen_05', 2, 'Send Jubei off on his next journey', { rewardNote: 'Jubei becomes an ally in The Reckoning final mission' })],
    relatedQuests: [],
  },

  // Companion: Kei (Ainu warrior)
  {
    id: 'sen_06', title: 'Kei and the Cursed Grove', category: 'sensei', region: 'Yotei Grasslands', act: 'Chapter 1 onward', order: 6, prerequisites: ['ms_07'], rewards: ['Ainu Bow Technique Vol. I', 'Technique Point x2'], estimatedTime: '30 min', missable: false,
    overview: "Kei, an Ainu warrior, is trying to purify a grove her ancestors protected. Three spirit stones have been corrupted by outside energy. Purify each and defeat the guardian that manifests.",
    cleanupNotes: tips('Each spirit stone fight uses a different weakness — check for glowing weak points before engaging'),
    steps: [s('sen_06', 0, 'Meet Kei at the edge of the cursed grove'), s('sen_06', 1, 'Purify the first corrupted spirit stone and defeat its guardian', { tip: 'Look for glowing weak points before engaging — they indicate the vulnerability' }), s('sen_06', 2, 'Purify the second spirit stone'), s('sen_06', 3, 'Purify the third spirit stone and defeat the grove\'s corrupted guardian')],
    relatedQuests: ['sen_07'],
  },
  {
    id: 'sen_07', title: 'Kei and the River God', category: 'sensei', region: 'Ishikari Plain', act: 'Chapter 1 onward', order: 7, prerequisites: ['sen_06'], rewards: ['Ainu Bow Technique Vol. II', 'Technique Point x2'], estimatedTime: '35 min', missable: false,
    overview: "Poachers have dumped refuse into the River God's sacred pool, angering the spirit. Help Kei clear them out and restore the pool with a purification offering.",
    cleanupNotes: tips('Purification offering ingredients are found naturally within 50m of the pool — no need to search far'),
    steps: [s('sen_07', 0, "Follow Kei upstream to the River God's sacred pool"), s('sen_07', 1, 'Clear the poachers fouling the sacred water'), s('sen_07', 2, 'Gather purification offering ingredients from the immediate area', { tip: 'All ingredients are within 50 metres of the pool' }), s('sen_07', 3, "Make the offering to restore the River God's favor")],
    relatedQuests: ['sen_08'],
  },
  {
    id: 'sen_08', title: 'Kei and the Village Elders', category: 'sensei', region: 'Teshio Ridge', act: 'Chapter 2 onward', order: 8, prerequisites: ['sen_07'], rewards: ['Ainu Bow Technique Vol. III', 'Technique Point x3'], estimatedTime: '40 min', missable: false,
    overview: 'Kei returns to her home village for the first time in years. A raid interrupts the reunion. Help repel the attackers, then witness a tense conversation between Kei and the village elders.',
    cleanupNotes: tips('The raid comes in two waves — hold the gate during both before the elders scene triggers'),
    steps: [s('sen_08', 0, 'Escort Kei to her home village in the Teshio Ridge'), s('sen_08', 1, 'Defend the village from the first raid wave', { warning: 'A second wave follows immediately — do not lower your guard' }), s('sen_08', 2, 'Defend against the second wave'), s('sen_08', 3, 'Witness the reconciliation scene between Kei and the village elders')],
    relatedQuests: ['sen_09'],
  },
  {
    id: 'sen_09', title: 'Kei and the Last Hunt', category: 'sensei', region: 'Tokachi Range', act: 'Chapter 2 onward', order: 9, prerequisites: ['sen_08'], rewards: ["Ainu Bow Technique Vol. IV", "Kei's Shortbow"], estimatedTime: '45 min', missable: false,
    overview: "Kei performs a traditional Ainu hunt as a tribute to her ancestors. The hunt is ambushed by mercenaries. Protect Kei and the sacred elk from the attackers.",
    cleanupNotes: tips("The elk can be frightened away by loud nearby combat — stay between it and attackers"),
    steps: [s('sen_09', 0, 'Join Kei on the ceremonial Ainu hunt'), s('sen_09', 1, 'Track the sacred elk through the Tokachi Range using Kei\'s guidance'), s('sen_09', 2, 'Protect the hunting party when the mercenary ambush begins', { warning: 'Loud combat near the elk will frighten it away — stay between attackers and the elk' }), s('sen_09', 3, 'Bring down the sacred elk with Kei to complete the ceremony')],
    relatedQuests: ['sen_10'],
  },
  {
    id: 'sen_10', title: "Kei's Resolve", category: 'sensei', region: 'Yotei Grasslands', act: 'Chapter 3 onward', order: 10, prerequisites: ['sen_09'], rewards: ["Kei's Full Bow Mastery", 'Kei Ally Unlocked'], estimatedTime: '30 min', missable: false,
    overview: "Kei performs the Ainu rite of passage at sacred standing stones before joining Atsu for the final battle. The rite involves a brief archery challenge and a meditation sequence.",
    cleanupNotes: tips('Kei joins as an archer ally in The Reckoning after completing this quest'),
    steps: [s('sen_10', 0, 'Find Kei at the ancient Ainu standing stones in the Yotei Grasslands'), s('sen_10', 1, 'Complete the archery challenge component of the rite'), s('sen_10', 2, 'Complete the meditation sequence'), s('sen_10', 3, "Receive Kei's blessing for the final battle", { rewardNote: 'Kei becomes an archer ally in The Reckoning' })],
    relatedQuests: [],
  },

  // Companion: Tomoe (the hunter)
  {
    id: 'sen_11', title: "Tomoe's Quarry", category: 'sensei', region: 'Teshio Ridge', act: 'Chapter 1 onward', order: 11, prerequisites: [], rewards: ["Hunter's Instinct Vol. I", 'Technique Point x2'], estimatedTime: '30 min', missable: false,
    overview: "Tomoe is tracking a massive wounded bear heading toward a farming village. Track it using Focused Hearing and cut off its path. The beast can be killed or sedated — sedating earns a bonus reward.",
    cleanupNotes: tips("Sedating the beast earns a bonus reward from Tomoe"),
    steps: [s('sen_11', 0, 'Meet the hunter Tomoe on the Shiretoko hunting trail'), s('sen_11', 1, 'Track the wounded bear using Focused Hearing'), s('sen_11', 2, 'Cut off its path before it reaches the farming village'), s('sen_11', 3, 'Bring down the bear — sedate for bonus reward or kill', { tip: 'Sedating earns a bonus reward from Tomoe' })],
    relatedQuests: ['sen_12'],
  },
  {
    id: 'sen_12', title: "Tomoe's Competition", category: 'sensei', region: 'Tokachi Range', act: 'Chapter 1 onward', order: 12, prerequisites: ['sen_11'], rewards: ["Hunter's Instinct Vol. II", 'Technique Point x2'], estimatedTime: '35 min', missable: false,
    overview: "A regional hunting competition pits Tomoe against a cheating rival. Help her claim three animals first, then expose the rival's use of traps.",
    cleanupNotes: tips("Rival's traps are visible with Focused Hearing — disarm them for bonus points"),
    steps: [s('sen_12', 0, 'Enter the regional hunters\' competition with Tomoe'), s('sen_12', 1, 'Track and claim the first target animal before the rival'), s('sen_12', 2, 'Claim the second target animal'), s('sen_12', 3, 'Claim the third target animal'), s('sen_12', 4, 'Expose the rival hunter\'s illegal traps', { tip: 'Traps are visible with Focused Hearing — disarm them for bonus score' })],
    relatedQuests: ['sen_13'],
  },
  {
    id: 'sen_13', title: "Tomoe's Secret", category: 'sensei', region: 'Nayoro Wilds', act: 'Chapter 2 onward', order: 13, prerequisites: ['sen_12'], rewards: ["Hunter's Instinct Vol. III", 'Technique Point x3'], estimatedTime: '40 min', missable: false,
    overview: "Tomoe's past catches up with her. She's wanted by a warlord for a crime she didn't commit. Gather evidence to clear her name or confront the warlord directly — clearing her name earns the better long-term outcome.",
    cleanupNotes: tips("Clearing Tomoe's name earns a better long-term outcome than confronting the warlord directly"),
    steps: [s('sen_13', 0, "Follow Tomoe to her hidden mountain camp"), s('sen_13', 1, "Discover the warlord's warrant for Tomoe's arrest"), s('sen_13', 2, 'Gather evidence of her innocence from the warlord\'s compound', { tip: 'Evidence path earns the better arc outcome' }), s('sen_13', 3, 'Clear Tomoe\'s name by presenting the evidence or confront the warlord directly')],
    relatedQuests: ['sen_14'],
  },
  {
    id: 'sen_14', title: "Tomoe's Greatest Hunt", category: 'sensei', region: 'Teshio Ridge', act: 'Chapter 2 onward', order: 14, prerequisites: ['sen_13'], rewards: ["Hunter's Instinct Vol. IV", "Tomoe's Hunting Bow"], estimatedTime: '45 min', missable: false,
    overview: "The climax of Tomoe's arc centers on a legendary spirit wolf she has hunted her whole life. Sparing the wolf changes Tomoe's character arc toward peace and triggers a unique scene.",
    cleanupNotes: tips("Sparing the wolf triggers a unique scene and an alternate, more peaceful ending for Tomoe's arc"),
    steps: [s('sen_14', 0, "Accompany Tomoe on the hunt for the legendary spirit wolf"), s('sen_14', 1, "Track the spirit wolf to its den"), s('sen_14', 2, 'Make the choice: help Tomoe kill the wolf or spare it', { tip: "Sparing the wolf triggers a unique scene and changes Tomoe's ending" })],
    relatedQuests: ['sen_15'],
  },
  {
    id: 'sen_15', title: "Tomoe's Farewell", category: 'sensei', region: 'Tokachi Range', act: 'Chapter 3 onward', order: 15, prerequisites: ['sen_14'], rewards: ["Full Hunter's Mastery", 'Tomoe Ally Unlocked'], estimatedTime: '25 min', missable: false,
    overview: "A quiet final scene. Tomoe shares her decision about leaving or staying in Ezo and passes on her final technique before joining Atsu for the last battle.",
    cleanupNotes: tips("Tomoe joins as a flanking ally in The Reckoning after completing this quest"),
    steps: [s('sen_15', 0, 'Meet Tomoe at the Tokachi campfire'), s('sen_15', 1, "Hear Tomoe's decision about her future"), s('sen_15', 2, 'Receive her final hunting lesson', { rewardNote: 'Tomoe becomes a flanking ally in The Reckoning' })],
    relatedQuests: [],
  },

  // Companion: Riku (former bandit)
  {
    id: 'sen_16', title: "Riku's Redemption", category: 'sensei', region: 'Ishikari Plain', act: 'Chapter 1 onward', order: 16, prerequisites: [], rewards: ["Thief's Craft Vol. I", 'Technique Point x2'], estimatedTime: '30 min', missable: false,
    overview: "Riku, a former bandit, is trying to return stolen goods to a village. Help him sneak the goods into the storeroom at night and convince the guard to let him pass — bribing the guard costs only 300 Mon.",
    cleanupNotes: tips("Bribing the guard is the cleanest solution and costs only 300 Mon"),
    steps: [s('sen_16', 0, 'Find Riku trying to return stolen goods to the village'), s('sen_16', 1, 'Help Riku sneak the goods into the village storeroom at night'), s('sen_16', 2, 'Deal with the village guard who recognizes Riku', { tip: 'Bribing the guard costs 300 Mon and avoids all complications' })],
    relatedQuests: ['sen_17'],
  },
  {
    id: 'sen_17', title: "Riku's Old Crew", category: 'sensei', region: 'Tokachi Range', act: 'Chapter 1 onward', order: 17, prerequisites: ['sen_16'], rewards: ["Thief's Craft Vol. II", 'Technique Point x2'], estimatedTime: '35 min', missable: false,
    overview: "Riku wants to give his former bandit crew a chance to reform. Most respond to persuasion, but the leader is entrenched. Non-lethal takedown on the leader leaves the door open for the crew's reform.",
    cleanupNotes: tips('Non-lethal takedown on the crew leader earns the full reward'),
    steps: [s('sen_17', 0, "Help Riku track down his former bandit crew"), s('sen_17', 1, 'Approach the crew and attempt to persuade them to abandon banditry'), s('sen_17', 2, "Deal with the crew leader who refuses", { tip: 'Non-lethal takedown earns the best outcome and full reward' })],
    relatedQuests: ['sen_18'],
  },
  {
    id: 'sen_18', title: "Riku's Price", category: 'sensei', region: 'Nayoro Wilds', act: 'Chapter 2 onward', order: 18, prerequisites: ['sen_17'], rewards: ["Thief's Craft Vol. III", 'Technique Point x3'], estimatedTime: '40 min', missable: false,
    overview: "An artifact Riku's former crew stole from an Ainu elder is in a collector's vault. Riku's thieving skills guide the infiltration — this is the most stealth-focused mission in the sensei questlines.",
    cleanupNotes: tips("Let Riku lead — he can pick locks that normally require special tools"),
    steps: [s('sen_18', 0, "Follow Riku to the Nayoro Wilds to recover the stolen artifact"), s('sen_18', 1, "Infiltrate the collector's vault with Riku's guidance", { tip: "Let Riku lead — he picks locks that Atsu cannot" }), s('sen_18', 2, 'Retrieve the artifact from the vault'), s('sen_18', 3, "Return the artifact to the Ainu elder")],
    relatedQuests: ['sen_19'],
  },
  {
    id: 'sen_19', title: "Riku's Betrayal", category: 'sensei', region: 'Oshima Coast', act: 'Chapter 2 onward', order: 19, prerequisites: ['sen_18'], rewards: ["Thief's Craft Vol. IV", "Riku's Lockpicks"], estimatedTime: '45 min', missable: false,
    overview: "A Yotei Six operative has framed Riku for a murder. Evidence is scattered across the coast. The confrontation at the Nemuro docks pits you against an assassin with twin short blades.",
    cleanupNotes: tips('Collect evidence in order — each piece points to the next location'),
    steps: [s('sen_19', 0, "Discover that Riku has been framed for a crime he didn't commit"), s('sen_19', 1, 'Gather the first piece of evidence from the coast'), s('sen_19', 2, 'Follow the evidence chain to the second and third pieces'), s('sen_19', 3, 'Confront the real culprit at the Nemuro docks', { tip: 'The assassin uses twin short blades — dodge sideways, not backwards' })],
    relatedQuests: ['sen_20'],
  },
  {
    id: 'sen_20', title: "Riku's New Path", category: 'sensei', region: 'Ishikari Plain', act: 'Chapter 3 onward', order: 20, prerequisites: ['sen_19'], rewards: ["Full Thief's Mastery", 'Riku Ally Unlocked'], estimatedTime: '25 min', missable: false,
    overview: "Riku's redemption arc concludes with him establishing a legitimate courier network. Set up three relay points to complete his story.",
    cleanupNotes: tips("Riku joins as an infiltration specialist ally in The Reckoning"),
    steps: [s('sen_20', 0, "Meet Riku at his new safehouse in the valley"), s('sen_20', 1, 'Help establish the first courier relay point'), s('sen_20', 2, 'Establish the second relay point'), s('sen_20', 3, 'Establish the third relay point and complete the network', { rewardNote: 'Riku becomes an infiltration specialist ally in The Reckoning' })],
    relatedQuests: [],
  },

  // ── SIDE TALES (48) ─────────────────────────────────────────────────────────
  { id: 'side_01', title: 'Master of the Shamisen', category: 'side_tales', region: 'Yotei Grasslands', act: 'Any', order: 1, prerequisites: [], rewards: ['Shamisen Cosmetic', '400 Mon'], estimatedTime: '20 min', missable: false, overview: "A musician named Genzo had his shamisen stolen by roadside bandits. Recover it from their camp and escort him safely to the village festival.", cleanupNotes: tips("Genzo's festival performance unlocks a unique ambient music track"), steps: [s('side_01', 0, 'Find the wandering musician at the Yotei crossroads'), s('side_01', 1, 'Recover his stolen shamisen from the bandit camp'), s('side_01', 2, 'Escort Genzo safely to the village festival')], relatedQuests: [] },
  { id: 'side_02', title: 'The Worth of a Man', category: 'side_tales', region: 'Ishikari Plain', act: 'Any', order: 2, prerequisites: [], rewards: ['500 Mon', 'Merchant Discount'], estimatedTime: '25 min', missable: false, overview: "Two men claim ownership of the same farmland. Evidence gathering reveals one man has forged documents. Present your findings to the elder.", cleanupNotes: tips('Investigate both sides before judging — partial investigation locks out a bonus'), steps: [s('side_02', 0, 'Speak with the village elder about the disputed land'), s('side_02', 1, 'Investigate the first claimant\'s story'), s('side_02', 2, "Investigate the second claimant's story"), s('side_02', 3, 'Present your findings to the elder', { tip: 'Investigate both sides fully before giving your verdict' })], relatedQuests: [] },
  { id: 'side_03', title: 'The Loss We Carry', category: 'side_tales', region: 'Teshio Ridge', act: 'Any', order: 3, prerequisites: [], rewards: ['Grief Charm', '400 Mon'], estimatedTime: '20 min', missable: false, overview: "A widow asks Atsu to recover her husband's body from the bandits who killed him so he can receive a proper burial at the mountain shrine.", cleanupNotes: tips('The mountain shrine is directly above the widow\'s position'), steps: [s('side_03', 0, 'Find the grieving widow at the mountain pass'), s('side_03', 1, "Recover her husband's remains from the bandit camp"), s('side_03', 2, 'Escort the remains to the mountain shrine for a proper burial')], relatedQuests: [] },
  { id: 'side_04', title: 'A Drink with a Stranger', category: 'side_tales', region: 'Yotei Grasslands', act: 'Any', order: 4, prerequisites: [], rewards: ['Sake Charm', 'Ally Contact'], estimatedTime: '20 min', missable: false, overview: "A mysterious stranger at an inn shares drinks and a tale before asking Atsu for a small favor. The stranger's identity becomes relevant later in the story.", cleanupNotes: tips("Accept the drink — declining closes off a later questline"), steps: [s('side_04', 0, "Accept the stranger's invitation at the roadside inn", { warning: "Declining the drink closes off a later questline — always accept" }), s('side_04', 1, "Listen to the stranger's story"), s('side_04', 2, 'Help with the stranger\'s request')], relatedQuests: [] },
  { id: 'side_05', title: 'The Way of the Yari', category: 'side_tales', region: 'Tokachi Range', act: 'Any', order: 5, prerequisites: [], rewards: ['Yari Technique Scroll', '500 Mon'], estimatedTime: '30 min', missable: false, overview: "A legendary spear master teaches the Way of the Yari through three escalating trials. The final test is a one-on-one duel with the master himself.", cleanupNotes: tips("The spear master is vulnerable during his forward-lunge recovery window"), steps: [s('side_05', 0, 'Find the spear master at the Tokachi training post'), s('side_05', 1, 'Complete the first trial'), s('side_05', 2, 'Complete the second trial'), s('side_05', 3, 'Defeat the spear master in the final duel', { tip: 'Strike during his forward-lunge recovery window' })], relatedQuests: [] },
  { id: 'side_06', title: 'Secrets of the Heart', category: 'side_tales', region: 'Ishikari Plain', act: 'Chapter 1 onward', order: 6, prerequisites: [], rewards: ["Scholar's Scroll", '400 Mon'], estimatedTime: '25 min', missable: false, overview: "A secret admirer needs help delivering a love letter to someone behind a rival family's walls. Sneak in via the roof entrance and escape before guards raise the alarm.", cleanupNotes: tips("The workshop has a roof entrance that bypasses the main door guards"), steps: [s('side_06', 0, 'Find the note sender in the Ishikari village'), s('side_06', 1, "Enter the rival family's workshop via the roof entrance", { tip: 'Roof entrance bypasses the two main door guards entirely' }), s('side_06', 2, 'Deliver the letter'), s('side_06', 3, 'Escape the workshop without triggering a guard alarm')], relatedQuests: [] },
  { id: 'side_07', title: 'The Bridge Builder', category: 'side_tales', region: 'Yotei Grasslands', act: 'Any', order: 7, prerequisites: [], rewards: ['Construction Materials', '350 Mon'], estimatedTime: '20 min', missable: false, overview: "A carpenter is rebuilding a vital bridge destroyed by bandits. Gather lumber, defend against an ambush, and help complete construction.", cleanupNotes: tips('The bandit ambush triggers at 60% construction — prepare before reaching that point'), steps: [s('side_07', 0, 'Help the carpenter gather materials for the bridge'), s('side_07', 1, 'Defend against the bandit ambush at 60% construction', { warning: 'Ambush triggers at 60% — position yourself before construction reaches that point' }), s('side_07', 2, 'Complete the bridge construction')], relatedQuests: [] },
  { id: 'side_08', title: 'The Broken Sword', category: 'side_tales', region: 'Teshio Ridge', act: 'Any', order: 8, prerequisites: [], rewards: ['Ancestral Sword Fragment', '450 Mon'], estimatedTime: '25 min', missable: false, overview: "A broken ancestral sword needs special ore from a contested mining site to be reforged. Clear the mining site and return with the ore.", cleanupNotes: tips('The ore vein is at the far end of the mine — bring a torch'), steps: [s('side_08', 0, 'Find the old swordsmith in the mountain village'), s('side_08', 1, 'Travel to the contested mining site and clear the enemies'), s('side_08', 2, 'Gather the rare ore from the vein at the far end of the mine', { tip: 'Bring a torch — the vein is in the darkest section' }), s('side_08', 3, 'Return the ore to the swordsmith for reforging')], relatedQuests: [] },
  { id: 'side_09', title: 'The Haunted Well', category: 'side_tales', region: 'Ishikari Plain', act: 'Any', order: 9, prerequisites: [], rewards: ['Purity Charm', '400 Mon'], estimatedTime: '20 min', missable: false, overview: "Villagers believe their well is haunted. Investigation reveals bandits have been using the well's underground passage to spy. Clear the passage.", cleanupNotes: tips("The 'ghost' is a bandit with a white cloth — no supernatural combat needed"), steps: [s('side_09', 0, 'Investigate reports of the haunted village well'), s('side_09', 1, 'Discover the underground passage beneath the well'), s('side_09', 2, 'Clear the bandits from the passage')], relatedQuests: [] },
  { id: 'side_10', title: "The Potter's Prayer", category: 'side_tales', region: 'Yotei Grasslands', act: 'Any', order: 10, prerequisites: [], rewards: ['Ceramic Bowl (Keepsake)', '350 Mon'], estimatedTime: '20 min', missable: false, overview: "An elderly potter needs an escort to a remote shrine for a memorial ritual. Time the journey to arrive at sundown before the shrine gate closes.", cleanupNotes: tips('Wolves can be frightened off with a fire arrow — no combat required'), steps: [s('side_10', 0, 'Find the elderly potter who needs an escort'), s('side_10', 1, 'Begin the escort to the mountain shrine — manage the journey time', { tip: 'Fire arrows frighten off wolves without triggering a combat sequence' }), s('side_10', 2, 'Reach the shrine at sundown before the gate closes')], relatedQuests: [] },
  { id: 'side_11', title: 'The Deserter', category: 'side_tales', region: 'Tokachi Range', act: 'Any', order: 11, prerequisites: [], rewards: ["Soldier's Charm", '500 Mon'], estimatedTime: '25 min', missable: false, overview: "A soldier has deserted the Yotei Six's conscript army. His reasons are compelling. Helping him escape earns a better long-term reward and a recurring contact.", cleanupNotes: tips("Helping him escape earns a better long-term reward and a recurring contact"), steps: [s('side_11', 0, 'Find the deserting soldier hiding in the wilds'), s('side_11', 1, "Hear his reasons for deserting"), s('side_11', 2, 'Decide: return him for the reward or help him escape', { tip: 'Helping him escape earns the better long-term outcome' })], relatedQuests: [] },
  { id: 'side_12', title: 'The Night Market', category: 'side_tales', region: 'Oshima Coast', act: 'Any', order: 12, prerequisites: [], rewards: ['Rare Trade Goods', '600 Mon'], estimatedTime: '30 min', missable: false, overview: "A hidden night market supplies resistant villages with contraband goods. Help the traders repel a raid to earn their trust and unlock access to rare items.", cleanupNotes: tips("The night market opens as a merchant contact after completing this quest"), steps: [s('side_12', 0, 'Discover the secret night market on the Oshima Coast'), s('side_12', 1, "Protect the market from the raid"), s('side_12', 2, "Earn the market traders' trust", { rewardNote: 'Night market unlocks as a permanent merchant contact' })], relatedQuests: [] },
  { id: 'side_13', title: "A Farmer's Last Season", category: 'side_tales', region: 'Yotei Grasslands', act: 'Any', order: 13, prerequisites: [], rewards: ['Harvest Charm', '350 Mon'], estimatedTime: '20 min', missable: false, overview: "An old farmer cannot work his fields alone after being injured. Help him complete the harvest before winter sets in. A peaceful quest with no combat.", cleanupNotes: tips('A peaceful quest — no combat required'), steps: [s('side_13', 0, "Help the aging farmer clear pests from his fields"), s('side_13', 1, "Assist with the harvest work"), s('side_13', 2, 'Celebrate the completed harvest with the village')], relatedQuests: [] },
  { id: 'side_14', title: 'The River Children', category: 'side_tales', region: 'Ishikari Plain', act: 'Any', order: 14, prerequisites: [], rewards: ['Toy Sword (Cosmetic)', '400 Mon'], estimatedTime: '25 min', missable: false, overview: "Three village children explored a water cave and became lost. Track them inside, navigate the cave, and bring them home before nightfall.", cleanupNotes: tips('The children follow automatically once found — focus on finding all three'), steps: [s('side_14', 0, 'Find the children who have gone missing near the river'), s('side_14', 1, 'Track them into the water cave'), s('side_14', 2, 'Find the first child and have them follow you'), s('side_14', 3, 'Find the second and third children'), s('side_14', 4, 'Safely escort all three children home before nightfall')], relatedQuests: [] },
  { id: 'side_15', title: 'The Outcast Monk', category: 'side_tales', region: 'Teshio Ridge', act: 'Any', order: 15, prerequisites: [], rewards: ["Monk's Blessing Charm", '400 Mon'], estimatedTime: '25 min', missable: false, overview: "An exiled monk seeks to rebuild his life after thieves stole the sacred text central to his practice. Recover it and help him reach a welcoming monastery.", cleanupNotes: tips("The thieves' camp is marked on the map once you speak with the monk"), steps: [s('side_15', 0, 'Find the outcast monk in the mountain caves'), s('side_15', 1, "Recover his stolen sacred text from the thieves' camp"), s('side_15', 2, 'Escort the monk to his new monastery')], relatedQuests: [] },
  { id: 'side_16', title: 'The Hired Sword', category: 'side_tales', region: 'Tokachi Range', act: 'Any', order: 16, prerequisites: [], rewards: ["Ronin's Blade", '550 Mon'], estimatedTime: '30 min', missable: false, overview: "A bandit captain has been preying on the main road. Accept the contract from the village defense committee, track him to his camp, and eliminate him.", cleanupNotes: tips("The bandit captain uses Moon Stance — equip Wind Stance to counter"), steps: [s('side_16', 0, 'Accept the contract from the village defense committee'), s('side_16', 1, "Track and locate the bandit captain's camp"), s('side_16', 2, 'Eliminate the bandit captain', { tip: 'He uses Moon Stance — equip Wind Stance to counter' }), s('side_16', 3, 'Collect the bounty from the committee')], relatedQuests: [] },
  { id: 'side_17', title: 'Foxfire at Midnight', category: 'side_tales', region: 'Yotei Grasslands', act: 'Any', order: 17, prerequisites: [], rewards: ["Fox's Lantern (Cosmetic)", '400 Mon'], estimatedTime: '20 min', missable: false, overview: "Villagers report mysterious foxfire lights near the Inari shrine at midnight. Follow the lights to discover a hidden shrine complex with a rare charm.", cleanupNotes: tips('Foxfire only appears after midnight — rest at a campfire to advance time'), steps: [s('side_17', 0, 'Investigate reports of foxfire lights near the shrine', { tip: 'Foxfire only appears after midnight — rest at a campfire to advance time' }), s('side_17', 1, 'Follow the foxfire trail'), s('side_17', 2, 'Discover the hidden shrine complex and collect the rare charm')], relatedQuests: [] },
  { id: 'side_18', title: 'The Ivory Netsuke', category: 'side_tales', region: 'Oshima Coast', act: 'Any', order: 18, prerequisites: [], rewards: ['Ivory Netsuke (Keepsake)', '500 Mon'], estimatedTime: '25 min', missable: false, overview: "A merchant's ship sank in a storm with an irreplaceable family heirloom aboard. Dive to the wreck and navigate its flooded hold to recover the netsuke.", cleanupNotes: tips("The netsuke is in the captain's quarters at the stern — take the ventilation shaft"), steps: [s('side_18', 0, 'Speak with the merchant who lost the heirloom netsuke at sea'), s('side_18', 1, 'Locate the sunken cargo ship offshore'), s('side_18', 2, "Dive and navigate to the captain's quarters via the ventilation shaft", { tip: "Ventilation shaft bypasses the flooded main corridor" }), s('side_18', 3, 'Recover the ivory netsuke'), s('side_18', 4, "Return the netsuke to the merchant's family")], relatedQuests: [] },
  { id: 'side_19', title: 'The Wandering Shrine', category: 'side_tales', region: 'Nayoro Wilds', act: 'Any', order: 19, prerequisites: [], rewards: ['Mountain Kami Charm', '450 Mon'], estimatedTime: '25 min', missable: false, overview: "Local legends describe a shrine that moves. Investigation reveals bandits are relocating decoy shrines to steal offerings. Use Focused Hearing near each shrine to detect if it's real or fake.", cleanupNotes: tips('Focused Hearing near a shrine reveals if it is real or a decoy'), steps: [s('side_19', 0, 'Investigate stories of the wandering shrine'), s('side_19', 1, 'Use Focused Hearing to test the first shrine', { tip: 'Focused Hearing detects the difference between real and decoy shrines' }), s('side_19', 2, 'Track the pattern of shrine movement to locate the real one'), s('side_19', 3, 'Make an offering at the true shrine')], relatedQuests: [] },
  { id: 'side_20', title: "A Warrior's Retirement", category: 'side_tales', region: 'Ishikari Plain', act: 'Any', order: 20, prerequisites: [], rewards: ["Elder Warrior's Charm", '500 Mon'], estimatedTime: '25 min', missable: false, overview: "A retired general has been found by former enemies seeking revenge. Help him neutralize the threat and secure his quiet new life.", cleanupNotes: tips("Keeping the general out of combat earns the better ending for his story"), steps: [s('side_20', 0, 'Speak with the retired general farming in the valley'), s('side_20', 1, 'Identify and neutralize the enemies from his past'), s('side_20', 2, "Ensure his peaceful retirement is preserved", { tip: 'Keep the general out of direct combat for the best story outcome' })], relatedQuests: [] },
  { id: 'side_21', title: 'The Blind Archer', category: 'side_tales', region: 'Teshio Ridge', act: 'Any', order: 21, prerequisites: [], rewards: ['Sound Sense Charm', '450 Mon'], estimatedTime: '25 min', missable: false, overview: "A blind archer trains students in sound-based shooting. When raiders attack, help protect the students while the blind archer escapes with his most vulnerable pupils.", cleanupNotes: tips("The blind archer's technique permanently improves Focused Hearing range"), steps: [s('side_21', 0, 'Meet the legendary blind archer at his mountain retreat'), s('side_21', 1, 'Protect the students when the raiders attack'), s('side_21', 2, 'Ensure the blind archer escapes safely with the vulnerable pupils'), s('side_21', 3, "Learn the blind archer's sound-based technique", { rewardNote: 'Permanently improves Focused Hearing range' })], relatedQuests: [] },
  { id: 'side_22', title: 'The Last Fishing Village', category: 'side_tales', region: 'Oshima Coast', act: 'Any', order: 22, prerequisites: [], rewards: ["Fisher's Charm", '400 Mon'], estimatedTime: '25 min', missable: false, overview: "The last fishing village on the coast faces extinction — boats sabotaged and pirates controlling the water. Repair the boats and clear the fishing grounds.", cleanupNotes: tips('Boat repair materials are in the nearby shipwreck — dive to collect them'), steps: [s('side_22', 0, 'Help the last fishermen assess their sabotaged boats'), s('side_22', 1, 'Dive to the nearby shipwreck to collect boat repair materials'), s('side_22', 2, 'Repair the boats'), s('side_22', 3, 'Clear the pirates from the fishing grounds')], relatedQuests: [] },
  { id: 'side_23', title: 'Fire in the Reeds', category: 'side_tales', region: 'Tokachi Range', act: 'Any', order: 23, prerequisites: [], rewards: ["Reed Warden's Charm", '400 Mon'], estimatedTime: '20 min', missable: false, overview: "Arsonists have set fire to the reed fields. Save trapped villagers from the fire using Focused Hearing to locate them through smoke, then track the arsonists to their camp.", cleanupNotes: tips('Villagers can be located through smoke using Focused Hearing'), steps: [s('side_23', 0, 'Respond to the village fire alarm'), s('side_23', 1, 'Save villagers trapped in the burning reed field', { tip: 'Use Focused Hearing to locate villagers through the smoke' }), s('side_23', 2, 'Find and confront the arsonists at their nearby camp')], relatedQuests: [] },
  { id: 'side_24', title: "The Cartographer's Map", category: 'side_tales', region: 'Yotei Grasslands', act: 'Any', order: 24, prerequisites: [], rewards: ["Cartographer's Charm", 'Map Fragment'], estimatedTime: '30 min', missable: false, overview: "A cartographer vanished while mapping the Yotei Grasslands. His trail leads through bandit territory to a hidden valley. The completed map unlocks 12 hidden locations.", cleanupNotes: tips('The completed map unlocks 12 hidden locations on the world map'), steps: [s('side_24', 0, "Find the missing cartographer's last known camp"), s('side_24', 1, 'Follow his trail through bandit territory'), s('side_24', 2, 'Locate the hidden valley and rescue the cartographer'), s('side_24', 3, 'Recover his complete survey map', { rewardNote: 'Unlocks 12 hidden world map locations' })], relatedQuests: [] },
  { id: 'side_25', title: 'Two Bridges', category: 'side_tales', region: 'Ishikari Plain', act: 'Any', order: 25, prerequisites: [], rewards: ["Peacemaker's Charm", '500 Mon'], estimatedTime: '25 min', missable: false, overview: "Two villages claim the only bridge connecting them. Records show one built it, but the other has maintained it for generations. Mediation leads to a shared agreement.", cleanupNotes: tips('A peaceful resolution — no combat unless you make a poor judgment'), steps: [s('side_25', 0, 'Mediate the dispute between the two villages'), s('side_25', 1, 'Investigate the origin of the bridge construction'), s('side_25', 2, 'Propose a fair resolution acceptable to both parties')], relatedQuests: [] },
  { id: 'side_26', title: 'The Poisoned Spring', category: 'side_tales', region: 'Teshio Ridge', act: 'Any', order: 26, prerequisites: [], rewards: ['Purification Charm', '450 Mon'], estimatedTime: '25 min', missable: false, overview: "Villagers have fallen ill from a poisoned spring. Upstream, Yotei Six soldiers deliberately dumped refuse to drive the village out. Clear the soldiers and purify the spring.", cleanupNotes: tips('Purification ritual requires clean water from a nearby source — check the map'), steps: [s('side_26', 0, 'Investigate the source of the village illness'), s('side_26', 1, 'Trace the illness upstream to the poisoned spring'), s('side_26', 2, 'Find and clear the Yotei Six soldiers responsible'), s('side_26', 3, 'Gather clean water for the purification ritual'), s('side_26', 4, 'Purify the spring')], relatedQuests: [] },
  { id: 'side_27', title: "A Hero's Grave", category: 'side_tales', region: 'Tokachi Range', act: 'Any', order: 27, prerequisites: [], rewards: ["Hero's Charm", '500 Mon'], estimatedTime: '25 min', missable: false, overview: "A historian asks Atsu to find and restore a forgotten hero's grave. Bandits have made the area their territory. The grave is hidden under a collapsed stone arch with a dragon carving.", cleanupNotes: tips('The grave is hidden under a collapsed stone arch — look for the dragon carving'), steps: [s('side_27', 0, "Find the unmarked hero's grave — look for the dragon carving under a collapsed stone arch"), s('side_27', 1, 'Clear the bandits from the area'), s('side_27', 2, 'Restore the grave marker')], relatedQuests: [] },
  { id: 'side_28', title: 'The Silk Road', category: 'side_tales', region: 'Oshima Coast', act: 'Any', order: 28, prerequisites: [], rewards: ['Silk Cloth x5', '600 Mon'], estimatedTime: '30 min', missable: false, overview: "A silk merchant needs a new route through hostile territory. Escort her caravan past the rival merchants' blockade and deliver the first silk shipment safely.", cleanupNotes: tips("The caravan horse is fragile — keep mounted guards occupied during the delivery run"), steps: [s('side_28', 0, 'Help the silk merchant plan a new trade route'), s('side_28', 1, "Clear the rival merchants' hired guards from the road"), s('side_28', 2, "Escort the caravan through the blockade", { tip: "Keep mounted guards occupied — the caravan horse is fragile" }), s('side_28', 3, 'Deliver the first silk shipment safely')], relatedQuests: [] },
  { id: 'side_29', title: 'The Shadow Play', category: 'side_tales', region: 'Yotei Grasslands', act: 'Any', order: 29, prerequisites: [], rewards: ['Shadow Play Cosmetic', '400 Mon'], estimatedTime: '20 min', missable: false, overview: "A traveling shadow play troupe had their props stolen on the road. Recover them from the bandit camp in time for the evening performance.", cleanupNotes: tips("The performance ends with a unique piece of story lore about the Ghost legend"), steps: [s('side_29', 0, "Help the shadow play troupe identify who stole their props"), s('side_29', 1, 'Recover the stolen props from the bandit camp'), s('side_29', 2, 'Return in time for the shadow play performance', { rewardNote: 'Performance includes unique lore about the Ghost legend' })], relatedQuests: [] },
  { id: 'side_30', title: 'The Exiled Artist', category: 'side_tales', region: 'Nayoro Wilds', act: 'Any', order: 30, prerequisites: [], rewards: ["Artist's Brush (Cosmetic)", '400 Mon'], estimatedTime: '20 min', missable: false, overview: "An artist was exiled after painting a subversive portrait of a Yotei Six lieutenant. Help him recover his work from a corrupt official and clear his name.", cleanupNotes: tips("The official's compound has a side entrance through the garden at night"), steps: [s('side_30', 0, 'Find the exiled artist in his mountain hideout'), s('side_30', 1, "Infiltrate the official's compound via the garden entrance at night", { tip: 'Garden side entrance is unguarded at night' }), s('side_30', 2, 'Recover the stolen paintings'), s('side_30', 3, 'Accompany the artist back to his village')], relatedQuests: [] },
  { id: 'side_31', title: 'Wolf Pack', category: 'side_tales', region: 'Tokachi Range', act: 'Any', order: 31, prerequisites: [], rewards: ["Wolf's Fang Charm", '500 Mon'], estimatedTime: '25 min', missable: false, overview: "Wolves have been attacking a settlement, but they are protecting their den from hunters killing their pups. Drive off the hunters without harming the wolves for a bonus spirit animal encounter.", cleanupNotes: tips('Driving off the hunters without harming the wolves earns a bonus spirit animal encounter'), steps: [s('side_31', 0, 'Investigate the wolf attacks on the remote settlement'), s('side_31', 1, "Discover the hunters killing the wolf pups in the den"), s('side_31', 2, 'Drive off the hunters', { tip: 'Do not harm the wolves — non-lethal resolution earns a bonus spirit encounter' })], relatedQuests: [] },
  { id: 'side_32', title: 'The Tea Ceremony', category: 'side_tales', region: 'Yotei Grasslands', act: 'Any', order: 32, prerequisites: [], rewards: ['Ceremony Charm', '350 Mon'], estimatedTime: '20 min', missable: false, overview: "A tea master is hosting a ceremony for village leaders. Rare tea leaves grow in a bandit-held forest. Gather them and ensure the ceremony proceeds without incident.", cleanupNotes: tips('The ceremony itself is peaceful — no combat unless you gathered impure leaves'), steps: [s('side_32', 0, 'Speak with the tea master about the ceremony'), s('side_32', 1, 'Gather rare tea leaves from the contested forest'), s('side_32', 2, 'Protect the ceremony from any disruption')], relatedQuests: [] },
  { id: 'side_33', title: 'The Traveling Healer', category: 'side_tales', region: 'Ishikari Plain', act: 'Any', order: 33, prerequisites: [], rewards: ["Healer's Charm", '400 Mon'], estimatedTime: '25 min', missable: false, overview: "A traveling healer was captured by bandits for ransom. Rescue her and escort her to the village that urgently needs her medicines.", cleanupNotes: tips("The healer's skills can be called on later to heal injured companions"), steps: [s('side_33', 0, "Find the traveling healer who has gone missing"), s('side_33', 1, 'Rescue her from the bandits holding her for ransom'), s('side_33', 2, 'Escort her safely to the sick village')], relatedQuests: [] },
  { id: 'side_34', title: 'Iron and Silk', category: 'side_tales', region: 'Teshio Ridge', act: 'Any', order: 34, prerequisites: [], rewards: ['Composite Armor Polish', '500 Mon'], estimatedTime: '25 min', missable: false, overview: "An armourer needs rare iron from a peak mine occupied by mercenaries who monopolize the supply. The mercenary captain drops a key to the deepest ore vein.", cleanupNotes: tips('The mercenary captain drops a key to the deepest ore vein'), steps: [s('side_34', 0, "Help the mountain armourer identify the source of the rare iron"), s('side_34', 1, 'Travel to the peak mine and clear the mercenaries'), s('side_34', 2, 'Defeat the captain and collect the key to the deep vein'), s('side_34', 3, 'Gather the rare iron and return to the armourer')], relatedQuests: [] },
  { id: 'side_35', title: 'The Shrine of Forgotten Names', category: 'side_tales', region: 'Nayoro Wilds', act: 'Any', order: 35, prerequisites: [], rewards: ['Memory Charm', '450 Mon'], estimatedTime: '25 min', missable: false, overview: "A shrine abandoned during a Yotei Six purge holds memorial tablets for dozens of families. Track surviving relatives across two regions to return each tablet.", cleanupNotes: tips('Families are marked on the map after examining each memorial tablet'), steps: [s('side_35', 0, 'Find the abandoned shrine filled with forgotten memorial tablets'), s('side_35', 1, 'Examine each tablet to identify the families', { tip: 'Examining each tablet marks the relevant family on your map' }), s('side_35', 2, 'Return the tablets to the surviving families across two regions')], relatedQuests: [] },
  { id: 'side_36', title: 'The Night Patrol', category: 'side_tales', region: 'Oshima Coast', act: 'Any', order: 36, prerequisites: [], rewards: ["Watchman's Charm", '500 Mon'], estimatedTime: '30 min', missable: false, overview: "Join the coastal road night patrol for one shift, responding to three incidents — bandit attacks, a stranded traveler, and a suspicious fire — while tracking the organized bandit leader.", cleanupNotes: tips('The three incidents are time-limited — handle the nearest one first'), steps: [s('side_36', 0, 'Join the volunteer night patrol'), s('side_36', 1, 'Respond to the first incident (nearest)', { tip: 'Handle the nearest incident first — all three are time-limited' }), s('side_36', 2, 'Respond to the second incident'), s('side_36', 3, 'Respond to the third incident'), s('side_36', 4, 'Identify and catch the organized bandit leader behind the attacks')], relatedQuests: [] },
  { id: 'side_37', title: "A Warrior's Lament", category: 'side_tales', region: 'Tokachi Range', act: 'Any', order: 37, prerequisites: [], rewards: ["Warrior's Lament Charm", '450 Mon'], estimatedTime: '25 min', missable: false, overview: "A mortally wounded warrior from the old Ezo guard wanders the wilds composing his death poem. Help him complete a final act of honor by delivering his message to his family. No combat required.", cleanupNotes: tips('A quiet, emotional quest — no combat required'), steps: [s('side_37', 0, 'Find the wandering warrior composing his death poem'), s('side_37', 1, 'Help him compose and complete the poem'), s('side_37', 2, "Deliver his final message to his family")], relatedQuests: [] },
  { id: 'side_38', title: "The Cartographer's Apprentice", category: 'side_tales', region: 'Yotei Grasslands', act: 'Any', order: 38, prerequisites: ['side_24'], rewards: ['Complete Survey Map', '500 Mon'], estimatedTime: '25 min', missable: false, overview: "A follow-up to The Cartographer's Map. Help the recovered cartographer's apprentice complete three survey routes and deliver the maps to the regional council.", cleanupNotes: tips('Completed survey maps reveal all treasure chest locations in the region'), steps: [s('side_38', 0, "Train the cartographer's apprentice in survey techniques"), s('side_38', 1, 'Complete the first survey route'), s('side_38', 2, 'Complete the second survey route'), s('side_38', 3, 'Complete the third survey route'), s('side_38', 4, 'Deliver the completed maps to the regional council', { rewardNote: 'Reveals all treasure chest locations in the region' })], relatedQuests: [] },
  { id: 'side_39', title: 'The Stolen Colt', category: 'side_tales', region: 'Ishikari Plain', act: 'Any', order: 39, prerequisites: [], rewards: ['Colt Mount Option', '400 Mon'], estimatedTime: '20 min', missable: false, overview: "Horse thieves took a farmer's prize colt to sell to a Yotei Six cavalry unit. Track them before the sale completes and free the colt from the pen at the camp's east edge.", cleanupNotes: tips('Free the colt before combat starts — it is in a pen at the east edge of the camp'), steps: [s('side_39', 0, "Find the farmer whose prize colt was stolen"), s('side_39', 1, 'Track the horse thieves to their camp'), s('side_39', 2, 'Free the colt from the pen at the east edge before fighting', { tip: 'Free the colt first — fighting near its pen risks injuring it' }), s('side_39', 3, 'Return the colt to the farmer')], relatedQuests: [] },
  { id: 'side_40', title: 'The Wandering Poet', category: 'side_tales', region: 'Teshio Ridge', act: 'Any', order: 40, prerequisites: [], rewards: ["Poet's Charm", '350 Mon'], estimatedTime: '20 min', missable: false, overview: "A poet is determined to complete his masterwork from the mountain summit despite a brewing storm. Escort him through dangerous weather — Focused Hearing helps track the path through reduced visibility.", cleanupNotes: tips('The storm reduces visibility dramatically — use Focused Hearing to track the path'), steps: [s('side_40', 0, 'Find the wandering poet at the mountain overlook'), s('side_40', 1, 'Begin the escort through the deteriorating storm', { tip: 'Focused Hearing tracks the path when visibility drops to near zero' }), s('side_40', 2, 'Help the poet reach the summit to complete his poem')], relatedQuests: [] },
  { id: 'side_41', title: 'A Song of Ezo', category: 'side_tales', region: 'Yotei Grasslands', act: 'Any', order: 41, prerequisites: [], rewards: ['Epic Song Cosmetic', '500 Mon'], estimatedTime: '30 min', missable: false, overview: "A bard is composing an epic song about the Ghost of Yotei. He needs to witness four memorable events — combat victories, rescues, or moments of peace. Any four qualifying events complete this quest.", cleanupNotes: tips('Defeating enemies in standoffs counts as a qualifying event'), steps: [s('side_41', 0, 'Help the wandering bard find stories to record'), s('side_41', 1, 'Participate in or witness qualifying event 1 (combat/rescue/peace)'), s('side_41', 2, 'Qualifying event 2'), s('side_41', 3, 'Qualifying event 3'), s('side_41', 4, 'Qualifying event 4 — completes the song'), s('side_41', 5, 'Attend the bard\'s performance at the festival', { rewardNote: 'Epic Song cosmetic unlocks after the performance' })], relatedQuests: [] },
  { id: 'side_42', title: 'The Old Farmhouse', category: 'side_tales', region: 'Tokachi Range', act: 'Any', order: 42, prerequisites: [], rewards: ['Homestead Charm', '400 Mon'], estimatedTime: '20 min', missable: false, overview: "A family was driven from their farmhouse by a gang. Clear the gang and help with basic restoration work. The gang leader is the only real combat challenge — others surrender when he falls.", cleanupNotes: tips('The gang leader is the only combat challenge — others surrender when he falls'), steps: [s('side_42', 0, "Help the family reclaim their ancestral farmhouse"), s('side_42', 1, 'Clear the gang from the property — focus on the leader first', { tip: 'Other gang members surrender immediately once the leader is defeated' }), s('side_42', 2, 'Help restore the farmhouse for habitation')], relatedQuests: [] },
  { id: 'side_43', title: "The Fisherman's Ghost", category: 'side_tales', region: 'Oshima Coast', act: 'Any', order: 43, prerequisites: [], rewards: ['Sea Ghost Charm', '450 Mon'], estimatedTime: '25 min', missable: false, overview: "A fisherman who drowned protecting his village haunts the harbor. His unfinished business — warning the village of a coming raid — triggers an actual raid during this quest.", cleanupNotes: tips("The raid the ghost warned about actually happens during this quest — prepare before investigating"), steps: [s('side_43', 0, 'Investigate reports of the ghostly fisherman haunting the harbor'), s('side_43', 1, 'Discover the ghost\'s unfinished business'), s('side_43', 2, 'Complete the unfinished warning — a real raid will trigger', { warning: 'The raid happens immediately after the ghost reveals his warning — prepare before this step' }), s('side_43', 3, 'Defend the village from the raid'), s('side_43', 4, 'Lay the spirit to rest')], relatedQuests: [] },
  { id: 'side_44', title: 'The Last Shrine Keeper', category: 'side_tales', region: 'Nayoro Wilds', act: 'Any', order: 44, prerequisites: [], rewards: ["Keeper's Charm", '500 Mon'], estimatedTime: '30 min', missable: false, overview: "The last shrine keeper in the Nayoro Wilds is restoring ancestral shrines that Yotei Six soldiers are destroying. Protect the keeper and help restore each shrine.", cleanupNotes: tips('Shrine restoration takes 3 in-game minutes each — hold defensive positions throughout'), steps: [s('side_44', 0, 'Find the last remaining shrine keeper in the mountains'), s('side_44', 1, 'Defend the first shrine restoration — hold position for 3 minutes', { tip: 'Position yourself at the main approach before restoration begins' }), s('side_44', 2, 'Defend the second shrine restoration'), s('side_44', 3, 'Defend the third shrine restoration'), s('side_44', 4, 'Protect the keeper from the Yotei Six soldiers pursuing him')], relatedQuests: [] },
  { id: 'side_45', title: 'Through Fire', category: 'side_tales', region: 'Teshio Ridge', act: 'Any', order: 45, prerequisites: [], rewards: ['Phoenix Charm', '500 Mon'], estimatedTime: '25 min', missable: false, overview: "A settlement fire traps multiple residents. Rescue them before the buildings collapse, then investigate the arson afterward.", cleanupNotes: tips('Rescue the cellar residents first — the upper floor occupants have more time'), steps: [s('side_45', 0, 'Respond to the fire at the mountain settlement'), s('side_45', 1, 'Rescue the cellar residents first — they have the least time', { warning: 'Cellar residents will not survive if you start with the upper floors' }), s('side_45', 2, 'Rescue the upper floor residents'), s('side_45', 3, 'Discover and confront the arsonist')], relatedQuests: [] },
  { id: 'side_46', title: "The Gambler's Debt", category: 'side_tales', region: 'Yotei Grasslands', act: 'Any', order: 46, prerequisites: [], rewards: ['Lucky Dice (Cosmetic)', '450 Mon'], estimatedTime: '20 min', missable: false, overview: "A desperate gambler owes a debt he can never repay because the house cheated. Expose the rigged operation — the evidence of rigging is behind the main table during the fight.", cleanupNotes: tips('Evidence of rigging is behind the main table — grab it during the fight'), steps: [s('side_46', 0, 'Help the indebted gambler deal with his debt collectors'), s('side_46', 1, "Investigate the gambling den's operation"), s('side_46', 2, 'Confront the den and grab the evidence of rigging from behind the main table', { tip: 'Pick up the evidence during the fight — do not wait until after' }), s('side_46', 3, "Expose the den's corruption and clear the debt")], relatedQuests: [] },
  { id: 'side_47', title: "The Pilgrim's Road", category: 'side_tales', region: 'Nayoro Wilds', act: 'Any', order: 47, prerequisites: [], rewards: ["Pilgrim's Faith Charm", '400 Mon'], estimatedTime: '25 min', missable: false, overview: "Five pilgrims need safe passage through mountain roads to a sacred temple. Two planned bandit ambushes lie on the route — pilgrims scatter during combat and must be regrouped.", cleanupNotes: tips('Pilgrims scatter during combat — call them back after each ambush before moving forward'), steps: [s('side_47', 0, 'Escort the group of five pilgrims onto the mountain road'), s('side_47', 1, 'Defend against the first bandit ambush'), s('side_47', 2, 'Regroup all five pilgrims after the first ambush', { warning: 'Do not proceed until all pilgrims are regrouped — they scatter during combat' }), s('side_47', 3, 'Defend against the second ambush'), s('side_47', 4, 'Deliver all pilgrims to the mountain temple')], relatedQuests: [] },
  { id: 'side_48', title: 'The Iron Promise', category: 'side_tales', region: 'Oshima Coast', act: 'Any', order: 48, prerequisites: [], rewards: ['Iron Promise Charm', '600 Mon'], estimatedTime: '30 min', missable: false, overview: "An old blacksmith promised to arm a village militia before he dies. Gather ore and protect the blacksmith during the final 5-minute forging session from three waves of attackers.", cleanupNotes: tips('The forging takes 5 minutes of in-game time — defend the smithy through all three waves'), steps: [s('side_48', 0, 'Find the blacksmith and understand his iron promise'), s('side_48', 1, 'Gather the required ore'), s('side_48', 2, 'Protect the blacksmith during the first forging wave'), s('side_48', 3, 'Defend through the second and third waves', { tip: 'Position yourself at the smithy entrance — attackers come from one direction' }), s('side_48', 4, 'Ensure the blacksmith completes the final blades')], relatedQuests: [] },

  // ── BOUNTY QUESTS (31) ───────────────────────────────────────────────────────
  // Names and locations sourced from PowerPyx.com individual bounty guides.
  // bnty_01–22: all real confirmed names. bnty_23–31 (Nayoro Wilds): UNCONFIRMED.

  // Yotei Grasslands bounties (5)
  { id: 'bnty_01', title: 'Muneji the Bone Crusher', category: 'bounty', region: 'Yotei Grasslands', act: 'Any', order: 1, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Muneji uses a massive tetsubo and patrols with two bodyguards. Take out the bodyguards first with stealth, then challenge Muneji directly. His slow, powerful swings leave large openings after each attack.', cleanupNotes: tips("Muneji's slow attacks leave large openings — be patient and counter after each swing"), steps: [s('bnty_01', 0, 'Accept the bounty from the Old Inn or Yotei Shadow Inn board'), s('bnty_01', 1, 'Track Muneji to his patrol area in the Yotei Grasslands'), s('bnty_01', 2, 'Eliminate the two bodyguards with stealth'), s('bnty_01', 3, 'Challenge and eliminate Muneji', { tip: 'His slow tetsubo swings leave large openings — counter after each attack' }), s('bnty_01', 4, 'Return proof of elimination to the bounty board')], relatedQuests: [] },
  { id: 'bnty_02', title: 'Crow Genzo', category: 'bounty', region: 'Yotei Grasslands', act: 'Any', order: 2, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Crow Genzo is found at Jade Grove in the Yotei Grasslands. Accept from the Old Inn or Yotei Shadow Inn bounty board. Approach from the ridge above for a stealth advantage.', cleanupNotes: tips('Approach Jade Grove from the ridge above for height advantage and a stealth opening'), steps: [s('bnty_02', 0, 'Accept from the Old Inn or Yotei Shadow Inn bounty board'), s('bnty_02', 1, 'Travel to Jade Grove in the Yotei Grasslands'), s('bnty_02', 2, 'Approach from the ridge above for stealth advantage', { tip: 'Height advantage from the ridge enables a stealth elimination opening' }), s('bnty_02', 3, 'Eliminate Crow Genzo')], relatedQuests: [] },
  { id: 'bnty_03', title: 'Smiling Yoshitomo', category: 'bounty', region: 'Yotei Grasslands', act: 'Any', order: 3, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Accept from the Old Inn or Yotei Shadow Inn bounty board. Track Smiling Yoshitomo to his location in Yotei Grasslands. His cheerful demeanour conceals an aggressive fighter — do not be disarmed.', cleanupNotes: tips('His friendly appearance is deceptive — he is a capable and aggressive combatant'), steps: [s('bnty_03', 0, 'Accept from the Old Inn or Yotei Shadow Inn bounty board'), s('bnty_03', 1, 'Track Smiling Yoshitomo to his location in Yotei Grasslands'), s('bnty_03', 2, 'Eliminate Smiling Yoshitomo', { warning: 'His cheerful appearance is deceptive — be ready for an aggressive opener' })], relatedQuests: [] },
  { id: 'bnty_04', title: 'Black Powder Ippei', category: 'bounty', region: 'Yotei Grasslands', act: 'Any', order: 4, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Accept from the Yotei Grasslands bounty board BEFORE approaching the Saito Compound — known bug causes this bounty to disappear from the board if you visit the Saito Compound first.', missableNote: 'Accept this bounty BEFORE visiting the Saito Compound in the south-east corner of Yotei Grasslands — a known bug removes it from the board permanently if you approach the compound first.', cleanupNotes: tips('KNOWN BUG: Accept this bounty BEFORE visiting the Saito Compound or it disappears from the board permanently'), steps: [s('bnty_04', 0, 'Accept from the Yotei Grasslands bounty board — do this BEFORE approaching the Saito Compound', { warning: 'Known bug: visiting the Saito Compound first permanently removes this bounty from the board' }), s('bnty_04', 1, 'Track and eliminate Black Powder Ippei')], relatedQuests: [] },
  { id: 'bnty_05', title: 'The Three Terrors', category: 'bounty', region: 'Yotei Grasslands', act: 'Any', order: 5, prerequisites: [], rewards: ['Bounty Coin x3', '600 Mon'], estimatedTime: '20 min', missable: false, overview: 'Three targets must all be eliminated. Accept from the Old Inn or Yotei Shadow Inn bounty board. They fight as a coordinated unit — split them apart with stealth before engaging any one directly.', cleanupNotes: tips('Fighting all three simultaneously is very difficult — use stealth to separate them before engaging'), steps: [s('bnty_05', 0, 'Accept from the Old Inn or Yotei Shadow Inn bounty board'), s('bnty_05', 1, 'Locate the Three Terrors in the Yotei Grasslands'), s('bnty_05', 2, 'Use stealth to separate the group before engaging', { tip: 'Fighting all three simultaneously is extremely difficult — isolate each one' }), s('bnty_05', 3, 'Eliminate all three members of the Three Terrors')], relatedQuests: [] },

  // Tokachi Range bounties (4)
  { id: 'bnty_06', title: 'Inokichi the Hungry', category: 'bounty', region: 'Tokachi Range', act: 'Any', order: 6, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: "Inokichi is found at Huranui Mill in the Tokachi Range. Accept from Huranui Mill or Huranui's Rest Inn bounty board. The mill workers can create useful distractions.", cleanupNotes: tips('The mill workers can create useful distractions during the fight'), steps: [s('bnty_06', 0, "Accept from Huranui Mill or Huranui's Rest Inn bounty board"), s('bnty_06', 1, 'Travel to Huranui Mill in the Tokachi Range'), s('bnty_06', 2, 'Eliminate Inokichi the Hungry', { tip: 'Mill workers can create distractions — use them to your advantage' })], relatedQuests: [] },
  { id: 'bnty_07', title: 'Junpei the Snatcher', category: 'bounty', region: 'Tokachi Range', act: 'Any', order: 7, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: "This bounty auto-triggers when you approach Boar's Eye Cave — no board pickup needed. Junpei ambushes travellers near the cave entrance. Be ready for an immediate fight.", cleanupNotes: tips("No bounty board needed — the quest triggers automatically when you near Boar's Eye Cave"), steps: [s('bnty_07', 0, "Approach Boar's Eye Cave to trigger the bounty automatically", { tip: 'No board pickup required — approaching the cave starts the quest' }), s('bnty_07', 1, 'Defeat Junpei the Snatcher who ambushes from the cave entrance')], relatedQuests: [] },
  { id: 'bnty_08', title: 'One-Eye Moritaka', category: 'bounty', region: 'Tokachi Range', act: 'Any', order: 8, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: "Accept from Huranui's Rest Inn Bounty Board. One-Eye Moritaka operates east of the inn. His missing eye creates a blind side — exploit it for stealth.", cleanupNotes: tips("Approach from his blind side — the side of the missing eye — for a stealth advantage"), steps: [s('bnty_08', 0, "Accept from Huranui's Rest Inn Bounty Board"), s('bnty_08', 1, 'Track One-Eye Moritaka east of the inn'), s('bnty_08', 2, 'Approach from his blind side — the missing eye side', { tip: 'His missing eye creates a blind spot — exploit it for a stealth opening' }), s('bnty_08', 3, 'Eliminate One-Eye Moritaka')], relatedQuests: [] },
  { id: 'bnty_09', title: 'Old Lady Yae', category: 'bounty', region: 'Tokachi Range', act: 'Any', order: 9, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: "Accept from Huranui's Rest Inn Bounty Board. Old Lady Yae is found at the Twin Ponds of Hida. Do not be deceived by her appearance — she fights with expert speed and precision.", cleanupNotes: tips("Her age is deceptive — Old Lady Yae fights with expert speed and precision"), steps: [s('bnty_09', 0, "Accept from Huranui's Rest Inn Bounty Board"), s('bnty_09', 1, 'Travel to the Twin Ponds of Hida in the Tokachi Range'), s('bnty_09', 2, 'Eliminate Old Lady Yae', { warning: 'Do not underestimate her — she fights with speed and precision that defies her appearance' })], relatedQuests: [] },

  // Teshio Ridge bounties (5)
  { id: 'bnty_10', title: 'Black Night Kubo', category: 'bounty', region: 'Teshio Ridge', act: 'Any', order: 10, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Accept from the Red Crane Inn Bounty Board. Black Night Kubo challenges travellers at the Black Knight Dueling Ring — a formal duel site with no outside interference.', cleanupNotes: tips('This is a formal duel — no guards will intervene on either side'), steps: [s('bnty_10', 0, 'Accept from the Red Crane Inn Bounty Board in Teshio Ridge'), s('bnty_10', 1, 'Travel to the Black Knight Dueling Ring'), s('bnty_10', 2, 'Defeat Black Night Kubo in the formal one-on-one duel')], relatedQuests: [] },
  { id: 'bnty_11', title: 'Houndmaster Toyotaro', category: 'bounty', region: 'Teshio Ridge', act: 'Any', order: 11, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Accept from the Red Crane Inn Bounty Board. Toyotaro fights alongside trained attack hounds. Eliminate the hounds first — they are fast but fragile. Fire scatters the pack.', cleanupNotes: tips('Kill the hounds first — they are fast but fragile', 'Fire scatters the pack effectively'), steps: [s('bnty_11', 0, 'Accept from the Red Crane Inn Bounty Board'), s('bnty_11', 1, 'Track Houndmaster Toyotaro to his location in Teshio Ridge'), s('bnty_11', 2, 'Eliminate the attack hounds first', { tip: 'Fire scatters the pack immediately — use it to separate and eliminate them' }), s('bnty_11', 3, 'Eliminate Houndmaster Toyotaro')], relatedQuests: [] },
  { id: 'bnty_12', title: 'Nameless Killer', category: 'bounty', region: 'Teshio Ridge', act: 'Any', order: 12, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Accept from the Red Crane Inn Bounty Board. The Nameless Killer is found at Teshio Coast. Coastal wind masks footsteps — use Focused Hearing to locate them.', cleanupNotes: tips('Coastal wind masks footsteps — switch to visual cues once close'), steps: [s('bnty_12', 0, 'Accept from the Red Crane Inn Bounty Board'), s('bnty_12', 1, 'Travel to Teshio Coast'), s('bnty_12', 2, 'Use Focused Hearing to locate the Nameless Killer through coastal wind noise'), s('bnty_12', 3, 'Eliminate the Nameless Killer')], relatedQuests: [] },
  { id: 'bnty_13', title: 'Snowstorm Katagiri', category: 'bounty', region: 'Teshio Ridge', act: 'Any', order: 13, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Accept from the Red Crane Inn Bounty Board. Katagiri uses the blizzard terrain of Teshio Ridge to conceal his movements and strike from the snow.', cleanupNotes: tips('Katagiri uses snowstorm cover to hide — stay alert and use Focused Hearing throughout'), steps: [s('bnty_13', 0, 'Accept from the Red Crane Inn Bounty Board'), s('bnty_13', 1, 'Search the Teshio Ridge snowfields for Katagiri', { tip: 'Use Focused Hearing — the blizzard conceals his movements' }), s('bnty_13', 2, 'Eliminate Snowstorm Katagiri')], relatedQuests: [] },
  { id: 'bnty_14', title: 'Inagawa the Gambler', category: 'bounty', region: 'Teshio Ridge', act: 'Any', order: 14, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Only available from Kojiro the Bounty Hunter NPC at Red Crane Inn after completing other Teshio Ridge bounties. Inagawa bets on his own survival — an unpredictable fighter.', unlockRequirements: 'Speak to Kojiro the Bounty Hunter at Red Crane Inn after completing other Teshio Ridge bounties', cleanupNotes: tips('Speak to Kojiro the Bounty Hunter at Red Crane Inn to unlock this bounty'), steps: [s('bnty_14', 0, 'Speak to Kojiro the Bounty Hunter at Red Crane Inn to unlock this bounty', { tip: 'Kojiro is found near the inn entrance — complete other Teshio Ridge bounties first' }), s('bnty_14', 1, 'Locate Inagawa the Gambler'), s('bnty_14', 2, 'Eliminate Inagawa the Gambler', { warning: 'He fights unpredictably — no consistent pattern to exploit' })], relatedQuests: [] },

  // Ishikari Plain bounties (3)
  { id: 'bnty_15', title: 'Blue Yamauba', category: 'bounty', region: 'Ishikari Plain', act: 'Any', order: 15, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: "Accept from the Ishikari Market Bounty Board. Blue Yamauba operates at the Ishikari Fork area. She uses disorienting movements — keep your distance until her pattern becomes predictable.", cleanupNotes: tips('Keep your distance until her attack pattern becomes predictable before engaging'), steps: [s('bnty_15', 0, 'Accept from the Ishikari Market Bounty Board'), s('bnty_15', 1, 'Travel to the Ishikari Fork area'), s('bnty_15', 2, 'Observe Blue Yamauba\'s movement pattern before engaging', { tip: 'Disorienting movements — stay at distance and identify her pattern first' }), s('bnty_15', 3, 'Eliminate Blue Yamauba')], relatedQuests: [] },
  { id: 'bnty_16', title: 'Shiro the Swindler', category: 'bounty', region: 'Ishikari Plain', act: 'Any', order: 16, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Accept by talking to Kojiro the Bounty Hunter NPC next to the Ishikari Market quest board. Shiro uses deception and disguise. Completing this unlocks Wayward Oni Raiders on Oshima Coast.', cleanupNotes: tips('Completing this bounty unlocks Wayward Oni Raiders in Oshima Coast'), steps: [s('bnty_16', 0, 'Talk to Kojiro the Bounty Hunter next to the Ishikari Market quest board'), s('bnty_16', 1, 'Track and locate Shiro the Swindler', { warning: 'He uses disguise — confirm identity before engaging' }), s('bnty_16', 2, 'Eliminate Shiro the Swindler', { rewardNote: 'Unlocks Wayward Oni Raiders bounty in Oshima Coast' })], relatedQuests: [] },
  { id: 'bnty_17', title: 'Toshi the Torch', category: 'bounty', region: 'Ishikari Plain', act: 'Any', order: 17, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: "Accept from the Ishikari Market Bounty Board. Toshi is found near Otaru in Ishikari Plain. He uses fire as his primary weapon throughout the fight.", cleanupNotes: tips("Fire-resistant equipment significantly reduces damage from Toshi's attacks"), steps: [s('bnty_17', 0, 'Accept from the Ishikari Market Bounty Board'), s('bnty_17', 1, 'Track Toshi the Torch to the Otaru area in Ishikari Plain'), s('bnty_17', 2, 'Eliminate Toshi the Torch', { tip: 'Fire-resistant equipment significantly reduces his attack damage' })], relatedQuests: [] },

  // Oshima Coast bounties (5)
  { id: 'bnty_18', title: 'Shinpachi the Armor Thief', category: 'bounty', region: 'Oshima Coast', act: 'Any', order: 18, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Accept from the Matsumae Residences Bounty Board. Shinpachi wears a mismatched mix of stolen armors — look for the figure wearing three different armor pieces.', cleanupNotes: tips('Stolen armour can be returned separately for a bonus reward beyond the bounty'), steps: [s('bnty_18', 0, 'Accept from the Matsumae Residences Bounty Board on Oshima Coast'), s('bnty_18', 1, 'Locate Shinpachi — look for the figure wearing three mismatched armor pieces'), s('bnty_18', 2, 'Eliminate Shinpachi and recover the stolen armour', { rewardNote: 'Returning the stolen armour separately earns a bonus reward' })], relatedQuests: [] },
  { id: 'bnty_19', title: 'Iwa the Beautiful', category: 'bounty', region: 'Oshima Coast', act: 'Any', order: 19, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Accept from the Matsumae Residences Bounty Board. Iwa uses her appearance to disarm opponents — stay focused and do not be caught off guard by the initial approach.', cleanupNotes: tips("Iwa is far more dangerous than she appears — maintain focus throughout the encounter"), steps: [s('bnty_19', 0, 'Accept from the Matsumae Residences Bounty Board'), s('bnty_19', 1, 'Locate and approach Iwa the Beautiful', { warning: 'She uses her appearance to disarm — do not lower your guard at any point' }), s('bnty_19', 2, 'Eliminate Iwa the Beautiful')], relatedQuests: [] },
  { id: 'bnty_20', title: 'The Tooth Breaker', category: 'bounty', region: 'Oshima Coast', act: 'Any', order: 20, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: "Accept from the Matsumae Residences Bounty Board. The Tooth Breaker excels at brutal close-range grappling — keep distance and use ranged attacks to control the fight.", cleanupNotes: tips("The Tooth Breaker dominates in close quarters — maintain distance and use ranged tools"), steps: [s('bnty_20', 0, 'Accept from the Matsumae Residences Bounty Board'), s('bnty_20', 1, 'Track and locate The Tooth Breaker on Oshima Coast'), s('bnty_20', 2, 'Eliminate The Tooth Breaker', { tip: 'Use ranged attacks — he is dominant in close quarters' })], relatedQuests: [] },
  { id: 'bnty_21', title: 'Eagle Eye Kondo', category: 'bounty', region: 'Oshima Coast', act: 'Any', order: 21, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Accept from the Matsumae Residences Bounty Board. Eagle Eye Kondo is found near the Esan Inn. He uses precision ranged attacks but is weak at close range — close the distance quickly.', cleanupNotes: tips('Close the distance quickly — Eagle Eye Kondo is deadly at range but vulnerable in melee'), steps: [s('bnty_21', 0, 'Accept from the Matsumae Residences Bounty Board'), s('bnty_21', 1, 'Locate Eagle Eye Kondo near the Esan Inn on Oshima Coast'), s('bnty_21', 2, 'Close the distance quickly to neutralize his ranged advantage', { tip: 'Sprint directly at him — every second at range he fires precision shots' }), s('bnty_21', 3, 'Eliminate Eagle Eye Kondo in melee')], relatedQuests: [] },
  { id: 'bnty_22', title: 'Wayward Oni Raiders', category: 'bounty', region: 'Oshima Coast', act: 'Any', order: 22, prerequisites: ['bnty_16'], rewards: ['Bounty Coin x3', '600 Mon'], estimatedTime: '20 min', missable: false, overview: 'Only available after completing Shiro the Swindler (Ishikari Plain). A group of displaced Oni clan members has turned to coastal raiding. Eliminate the entire group.', unlockRequirements: 'Complete Shiro the Swindler in Ishikari Plain first', cleanupNotes: tips('Complete Shiro the Swindler in Ishikari Plain first — this bounty will not appear until then'), steps: [s('bnty_22', 0, 'Confirm Shiro the Swindler is completed to unlock this bounty'), s('bnty_22', 1, 'Locate the Wayward Oni Raiders on Oshima Coast'), s('bnty_22', 2, 'Eliminate all members of the Wayward Oni Raiders group')], relatedQuests: [] },

  // Nayoro Wilds bounties (9) — UNCONFIRMED: real names need verification from in-game sources
  { id: 'bnty_23', title: 'Ishida the Coward', category: 'bounty', region: 'Nayoro Wilds', act: 'Any', order: 23, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Located in Nayoro Wilds. Accept from the regional bounty board and track the target.', cleanupNotes: tips('Check the Nayoro Wilds inn bounty board to pick up this contract'), steps: [s('bnty_23', 0, 'Accept from the Nayoro Wilds bounty board'), s('bnty_23', 1, 'Track and eliminate the target')], relatedQuests: [] },
  { id: 'bnty_24', title: 'Hana the Archivist', category: 'bounty', region: 'Nayoro Wilds', act: 'Any', order: 24, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Located in Nayoro Wilds. Accept from the regional bounty board and track the target.', cleanupNotes: tips('Check the Nayoro Wilds inn bounty board to pick up this contract'), steps: [s('bnty_24', 0, 'Accept from the Nayoro Wilds bounty board'), s('bnty_24', 1, 'Track and eliminate the target')], relatedQuests: [] },
  { id: 'bnty_25', title: 'Soji the Horse Breaker', category: 'bounty', region: 'Nayoro Wilds', act: 'Any', order: 25, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Located in Nayoro Wilds. Accept from the regional bounty board and track the target.', cleanupNotes: tips('Check the Nayoro Wilds inn bounty board to pick up this contract'), steps: [s('bnty_25', 0, 'Accept from the Nayoro Wilds bounty board'), s('bnty_25', 1, 'Track and eliminate the target')], relatedQuests: [] },
  { id: 'bnty_26', title: 'Orin the Collector', category: 'bounty', region: 'Nayoro Wilds', act: 'Any', order: 26, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Located in Nayoro Wilds. Accept from the regional bounty board and track the target.', cleanupNotes: tips('Check the Nayoro Wilds inn bounty board to pick up this contract'), steps: [s('bnty_26', 0, 'Accept from the Nayoro Wilds bounty board'), s('bnty_26', 1, 'Track and eliminate the target')], relatedQuests: [] },
  { id: 'bnty_27', title: 'Tetsuro the Blademaster', category: 'bounty', region: 'Nayoro Wilds', act: 'Any', order: 27, prerequisites: [], rewards: ['Bounty Coin x3', '750 Mon'], estimatedTime: '20 min', missable: false, overview: 'Located in Nayoro Wilds. Accept from the regional bounty board and track the target.', cleanupNotes: tips('Check the Nayoro Wilds inn bounty board to pick up this contract'), steps: [s('bnty_27', 0, 'Accept from the Nayoro Wilds bounty board'), s('bnty_27', 1, 'Track and eliminate the target')], relatedQuests: [] },
  { id: 'bnty_28', title: 'Masa the Turncoat', category: 'bounty', region: 'Nayoro Wilds', act: 'Any', order: 28, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Located in Nayoro Wilds. Accept from the regional bounty board and track the target.', cleanupNotes: tips('Check the Nayoro Wilds inn bounty board to pick up this contract'), steps: [s('bnty_28', 0, 'Accept from the Nayoro Wilds bounty board'), s('bnty_28', 1, 'Track and eliminate the target')], relatedQuests: [] },
  { id: 'bnty_29', title: 'Jin the Drifter', category: 'bounty', region: 'Nayoro Wilds', act: 'Any', order: 29, prerequisites: [], rewards: ['Bounty Coin x2', '500 Mon'], estimatedTime: '15 min', missable: false, overview: 'Located in Nayoro Wilds. Accept from the regional bounty board and track the target.', cleanupNotes: tips('Check the Nayoro Wilds inn bounty board to pick up this contract'), steps: [s('bnty_29', 0, 'Accept from the Nayoro Wilds bounty board'), s('bnty_29', 1, 'Track and eliminate the target')], relatedQuests: [] },
  { id: 'bnty_30', title: 'Ryo the Bear', category: 'bounty', region: 'Nayoro Wilds', act: 'Any', order: 30, prerequisites: [], rewards: ['Bounty Coin x3', '750 Mon'], estimatedTime: '20 min', missable: false, overview: 'Located in Nayoro Wilds. Accept from the regional bounty board and track the target.', cleanupNotes: tips('Check the Nayoro Wilds inn bounty board to pick up this contract'), steps: [s('bnty_30', 0, 'Accept from the Nayoro Wilds bounty board'), s('bnty_30', 1, 'Track and eliminate the target')], relatedQuests: [] },
  { id: 'bnty_31', title: 'The Shadow of Ezo', category: 'bounty', region: 'Nayoro Wilds', act: 'Any', order: 31, prerequisites: [], rewards: ['Bounty Coin x5', '1500 Mon', 'Trophy: Master Bounty Hunter'], estimatedTime: '30 min', missable: false, overview: 'The 31st and final bounty in Nayoro Wilds. Completing all 31 bounties unlocks the Master Bounty Hunter trophy.', cleanupNotes: tips('Completing this bounty unlocks the Master Bounty Hunter trophy'), steps: [s('bnty_31', 0, 'Accept the final bounty from the Nayoro Wilds bounty board'), s('bnty_31', 1, 'Track down the final target'), s('bnty_31', 2, 'Defeat the target in a showdown', { rewardNote: 'Unlocks Master Bounty Hunter trophy' })], relatedQuests: [] },
];

// Total: 119 quests (10 main + 3 endgame + 7 mythic + 20 sensei + 48 side + 31 bounty)

export function getQuestById(id: string): Quest | undefined {
  return QUESTS.find(q => q.id === id);
}

export function getQuestsByCategory(category: CategoryId): Quest[] {
  return QUESTS.filter(q => q.category === category);
}

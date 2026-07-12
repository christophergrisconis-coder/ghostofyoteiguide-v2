// World Activities — required for 100% completion in Ghost of Yōtei
// All names and counts confirmed from official post-launch guides (October 2025).
// Sources:
//   Yōtei Six Camps:  powerpyx.com/ghost-of-yotei-all-yotei-six-camps-locations/
//   Dueling Trees:    powerpyx.com/ghost-of-yotei-all-dueling-tree-locations/
//   Bamboo Strikes:   powerpyx.com/ghost-of-yotei-all-bamboo-strike-locations/
//   Shrine Climbs:    powerpyx.com/ghost-of-yotei-all-shrine-climbs-locations/
//   Hot Springs:      pushsquare.com/guides/ghost-of-yotei-all-hot-springs-locations
//   Wolf Dens:        pushsquare.com/guides/ghost-of-yotei-all-wolf-dens-locations
//   Sumi-e Paintings: powerpyx.com/ghost-of-yotei-all-sumi-e-painting-locations/

export type ActivityCategory =
  | 'camp'          // Yōtei Six Camps — enemy-occupied locations (22 total)
  | 'dueling_tree'  // Dueling Tree encounters — 6 trees + Takezo final fight = 7 duels total
  | 'wolf_den'      // Wolf Dens (10 total) — Wolves of Ezo trophy
  | 'bamboo_strike' // Bamboo Strikes (15 total) — Body, Mind, and Spirit trophy
  | 'shrine_climb'  // Shrine Climbs (13 total) — Body, Mind, and Spirit trophy + Golden Mask
  | 'hot_spring'    // Hot Springs (16 total) — Body, Mind, and Spirit trophy + Fundoshi Armor Set
  | 'sumi_e';       // Sumi-e Paintings (15 open-world total) — An Artist's Eye trophy

export interface WorldActivity {
  id: string;
  name: string;
  category: ActivityCategory;
  region: string;
  description: string;
  tips?: string;
  verificationNeeded?: boolean;
}

// ── Yōtei Six Camps (22 total) ────────────────────────────────────────────────
// Clear all enemies in a camp to liberate it. Each camp contains an Altar of
// Reflection that grants Technique Points (pray by swiping down on Touchpad).
// Hidden camps (marked below) require solving fox-statue shrine puzzles to enter.
const CAMPS: WorldActivity[] = [
  // ── Yotei Grasslands (3) ─────────────────────────────────────────────────
  {
    id: 'act_camp_01',
    name: 'Saito Compound',
    category: 'camp',
    region: 'Yotei Grasslands',
    description: 'On the southern coast of the Yotei Grasslands within the Shirahige Falls area. Bounty target Muneji the Bone Crusher is found here.',
    tips: 'Clear the outer perimeter before engaging the compound leader.',
  },
  {
    id: 'act_camp_02',
    name: 'Saito Recruitment Camp',
    category: 'camp',
    region: 'Yotei Grasslands',
    description: 'Along the northern perimeter of the Yotei Grasslands, on the far side of Nupur River.',
  },
  {
    id: 'act_camp_03',
    name: 'Outcrop Homestead',
    category: 'camp',
    region: 'Yotei Grasslands',
    description: 'In the northwestern part of the Yotei Grasslands, near where the river splits in two.',
  },

  // ── Ishikari Plain (4) ───────────────────────────────────────────────────
  {
    id: 'act_camp_04',
    name: 'Nishin Fishery',
    category: 'camp',
    region: 'Ishikari Plain',
    description: 'On the southwestern coast of Ishikari Plain. Head immediately west from the region entrance to find it at the shore.',
  },
  {
    id: 'act_camp_05',
    name: 'Broken Horn Garrison',
    category: 'camp',
    region: 'Ishikari Plain',
    description: 'Directly west of Ishikari Market — climb the cliff face to reach the garrison above.',
  },
  {
    id: 'act_camp_06',
    name: 'Bold Kaji Forge',
    category: 'camp',
    region: 'Ishikari Plain',
    description: 'In the northern section of Ishikari Plain, west of Nakagoya Spring.',
  },
  {
    id: 'act_camp_07',
    name: "Masked Man's Quarry",
    category: 'camp',
    region: 'Ishikari Plain',
    description: 'Directly in front of the Matsumae Encampment in the north of Ishikari Plain. May not appear until after defeating The Oni in the main story.',
    tips: 'Progress the main story past The Oni chapter before this camp appears on the map.',
  },

  // ── Tokachi Range (3) ────────────────────────────────────────────────────
  {
    id: 'act_camp_08',
    name: 'Saito Encampment',
    category: 'camp',
    region: 'Tokachi Range',
    description: 'North of the Ohrara Plains, east of Yubari Lake. Bounty target One-Eye Moritaka is found here.',
  },
  {
    id: 'act_camp_09',
    name: 'Marshland Homestead',
    category: 'camp',
    region: 'Tokachi Range',
    description: 'Along the eastern perimeter of Tokachi Range, in the north of the Tomamu Marshlands.',
  },
  {
    id: 'act_camp_10',
    name: 'Huranui Mill',
    category: 'camp',
    region: 'Tokachi Range',
    description: 'Along the Nupur River toward the north of Tokachi Range. Bounty target Inokichi the Hungry is found here.',
  },

  // ── Teshio Ridge (7) — 4 hidden camps require shrine puzzle access ────────
  {
    id: 'act_camp_11',
    name: 'Crossroads Trading Post',
    category: 'camp',
    region: 'Teshio Ridge',
    description: 'Along the southwestern perimeter of Teshio Ridge, south of the Crimson Forest. No boss — clear all enemies to complete.',
  },
  {
    id: 'act_camp_12',
    name: 'Snow Drift Springs Hideout',
    category: 'camp',
    region: 'Teshio Ridge',
    description: 'Hidden camp in the Crimson Forest, accessed through the Snow Drift Springs Shrine. Solve the fox-lantern puzzle to open the path. A Nine Tails puzzle box is found here.',
    tips: 'Light the 3 correct fox lanterns matching the stone fox statues on the islands to open the door. After clearing, solve one more fox puzzle at the top to reach the altar.',
  },
  {
    id: 'act_camp_13',
    name: "Snow's Blight Hideout",
    category: 'camp',
    region: 'Teshio Ridge',
    description: "Hidden camp in western Teshio Ridge, accessed via the Snow's Blight Shrine. Clear the shrine puzzle and use the revealed crawlspace. Defeating the camp leader completes the Nameless Killer bounty. A Nine Tails puzzle box is found here.",
    tips: 'Light the two braziers with lit lanterns above them; turn fox statues to match the engraved wall directions.',
  },
  {
    id: 'act_camp_14',
    name: 'Nakajima Ice Cave Hideout',
    category: 'camp',
    region: 'Teshio Ridge',
    description: 'Hidden camp accessed via the Nakajima Ice Cave (named map location) northwest of Sarobetsu Lake. Turn the two fox statues at the entrance: right fox faces right, left fox faces left (both away from the door). A Nine Tails puzzle box is found inside.',
    tips: 'Mid-cave: use the grappling hook during a jump to cross the gap — look up for the R2 prompt.',
  },
  {
    id: 'act_camp_15',
    name: 'Deserted Village',
    category: 'camp',
    region: 'Teshio Ridge',
    description: 'An abandoned settlement in Teshio Ridge taken over by Yōtei Six forces.',
    verificationNeeded: true,
  },
  {
    id: 'act_camp_16',
    name: 'Soya Port',
    category: 'camp',
    region: 'Teshio Ridge',
    description: 'A port settlement on the Teshio coast occupied by Yōtei Six forces.',
    verificationNeeded: true,
  },
  {
    id: 'act_camp_17',
    name: 'Cape Inari Hideout',
    category: 'camp',
    region: 'Teshio Ridge',
    description: 'Hidden camp at the northernmost edge of the map, accessed via the Cape Inari Shrine. Light the two fox lanterns marked with "trident" icons to open the gate.',
    tips: 'Avoid lanterns marked with "!" — they deal damage. The camp spans two mountain sections connected by ropes.',
  },

  // ── Oshima Coast (5) ─────────────────────────────────────────────────────
  {
    id: 'act_camp_18',
    name: 'Miyama Village',
    category: 'camp',
    region: 'Oshima Coast',
    description: 'High on a rock in the Tokuyama Hills, reached by heading east from the northern region entrance. Bounty target Tadaaki the Terrible is found here.',
  },
  {
    id: 'act_camp_19',
    name: 'Saito Artillery Outpost',
    category: 'camp',
    region: 'Oshima Coast',
    description: 'Fortified outpost east of Oyobe River.',
  },
  {
    id: 'act_camp_20',
    name: 'Kasuga Village',
    category: 'camp',
    region: 'Oshima Coast',
    description: 'Far east of the region, just north of Esan Inlet near Joyo Tea House. Bounty target Shinpachi the Armour Thief is found here.',
  },
  {
    id: 'act_camp_21',
    name: 'Iwasaki Farmstead',
    category: 'camp',
    region: 'Oshima Coast',
    description: 'A farming settlement on the Oshima Coast taken over by Yōtei Six forces.',
    verificationNeeded: true,
  },
  {
    id: 'act_camp_22',
    name: 'Oiso Fishing Village',
    category: 'camp',
    region: 'Oshima Coast',
    description: 'Near the western corner of the Oshima Coast, along the coast where the Otsuki River meets the ocean.',
  },
];

// ── Dueling Trees (6 trees + 1 Takezo final duel = 7 total for Unrivaled trophy) ──
// All 6 Dueling Trees are in Yotei Grasslands (3) and Tokachi Range (3).
// The Coastal Dueling Tree (#6) unlocks only after clearing the other 5.
// The 7th entry is the final Takezo fight on Mount Yōtei's peak (part of the
// Takezo the Unrivalled mythic tale, not a Dueling Tree map marker).
const DUELING_TREES: WorldActivity[] = [
  {
    id: 'act_duel_01',
    name: 'Dueling Tree — Shikotsu River',
    category: 'dueling_tree',
    region: 'Yotei Grasslands',
    description: "Just south of Shikotsu River in the Yotei Grasslands. Challenge the ronin to a 1v1 duel. Any Dueling Tree can be done first to begin the Takezo the Unrivalled mythic tale.",
    tips: 'There are only 6 Dueling Trees in Ezo, all in Yotei Grasslands and Tokachi Range.',
  },
  {
    id: 'act_duel_02',
    name: 'Dueling Tree — Yotei River',
    category: 'dueling_tree',
    region: 'Yotei Grasslands',
    description: 'Northwest of Yotei River in the Yotei Grasslands. Challenge the ronin to a 1v1 duel.',
  },
  {
    id: 'act_duel_03',
    name: 'Dueling Tree — Tokachi Cliffs',
    category: 'dueling_tree',
    region: 'Tokachi Range',
    description: 'In the northwest of Tokachi Range. You must squeeze through a small gap in the cliffside to reach this Dueling Tree.',
    tips: 'Look for the narrow gap in the cliff wall — squeeze through it to find the tree on the other side.',
  },
  {
    id: 'act_duel_04',
    name: 'Dueling Tree — Tomamu Marshlands',
    category: 'dueling_tree',
    region: 'Tokachi Range',
    description: 'Just south of Tomamu Marshlands in Tokachi Range. Challenge the ronin to a 1v1 duel.',
  },
  {
    id: 'act_duel_05',
    name: 'Dueling Tree — Niikappu Falls',
    category: 'dueling_tree',
    region: 'Tokachi Range',
    description: 'At Niikappu Falls in northeast Tokachi Range. Challenge the ronin to a 1v1 duel.',
  },
  {
    id: 'act_duel_06',
    name: 'Coastal Dueling Tree',
    category: 'dueling_tree',
    region: 'Yotei Grasslands',
    description: 'On top of the coastal cliffs in the south of Yotei Grasslands. Only appears as a quest objective after clearing all 5 other Dueling Trees. Interact with the tree stump by the campfire to wait for Takezo, then follow him to the beach for the final student duel.',
    tips: 'Use the guiding wind (track from map) to find this tree after clearing all 5 others.',
  },
  {
    id: 'act_duel_07',
    name: 'Final Duel: Takezo the Unrivaled',
    category: 'dueling_tree',
    region: 'Mount Yōtei',
    description: 'The climactic duel of the Takezo the Unrivalled mythic tale, fought on the peak of Mount Yōtei after defeating all 6 of Takezo\'s students at the Dueling Trees. Completing this earns the Unrivaled bronze trophy.',
    tips: 'Takezo is the hardest 1v1 fight in the game. Equip your best combat charms before the climb. Come prepared with fully upgraded gear.',
  },
];

// ── Wolf Dens (10 total — Wolves of Ezo trophy) ────────────────────────────────
// Find the mound of earth with a tree on top surrounded by enemy corpses.
// Examining the corpses triggers a wolf to appear and guide you to a Trapper camp.
// Clear all enemies at the Trapper camp to complete the Wolf Den.
// Each Wolf Den rewards a Technique point for the wolf's skill trees.
const WOLF_DENS: WorldActivity[] = [
  // ── Yotei Grasslands (2) ──────────────────────────────────────────────────
  {
    id: 'act_wolf_01',
    name: 'Green Hill Wolf Den',
    category: 'wolf_den',
    region: 'Yotei Grasslands',
    description: 'South of Lake Shikotsu, on a small rock. Search the corpses to trigger the wolf, then follow it to a Saito camp and kill all enemies.',
    tips: 'All 10 Wolf Dens are needed for the Wolves of Ezo bronze trophy.',
  },
  {
    id: 'act_wolf_02',
    name: 'Great Mountain Wolf Den',
    category: 'wolf_den',
    region: 'Yotei Grasslands',
    description: 'West of Nupur River, under a tree on a rock surrounded by small forests. Examine the body to trigger the wolf, then follow it to the Trapper camp.',
  },

  // ── Ishikari Plain (2) ────────────────────────────────────────────────────
  {
    id: 'act_wolf_03',
    name: 'Old Wound Wolf Den',
    category: 'wolf_den',
    region: 'Ishikari Plain',
    description: 'West of Rumoi River. Wolf hunters are throwing bombs at the tree — kill them all to make the wolf appear. Follow the wolf to the Trapper camp.',
  },
  {
    id: 'act_wolf_04',
    name: 'Dying Fire Wolf Den',
    category: 'wolf_den',
    region: 'Ishikari Plain',
    description: 'Just north of the Nakagoya Spring name on the map, on top of a rock. Examine the corpses to make the wolf appear, then follow it to the Trapper camp.',
  },

  // ── Tokachi Range (2) ────────────────────────────────────────────────────
  {
    id: 'act_wolf_05',
    name: "Hunter's Watch Wolf Den",
    category: 'wolf_den',
    region: 'Tokachi Range',
    description: 'In the middle of Ohara Plains, tree on top of a rock. Defeat the surrounding enemies, then the wolf will lead you to the Trapper camp.',
  },
  {
    id: 'act_wolf_06',
    name: 'Howling Fields Wolf Den',
    category: 'wolf_den',
    region: 'Tokachi Range',
    description: "Just south of the Boar's Eye Cave area on the map, tree on top of a rock. Follow the wolf to the Trapper camp after triggering the den.",
  },

  // ── Nayoro Wilds (2) ─────────────────────────────────────────────────────
  {
    id: 'act_wolf_07',
    name: 'Wolf Den — Nayoro Wilds (1)',
    category: 'wolf_den',
    region: 'Nayoro Wilds',
    description: 'A Wolf Den in the Nayoro Wilds. Look for the signature mound of earth with a tree on top surrounded by enemy corpses.',
    verificationNeeded: true,
  },
  {
    id: 'act_wolf_08',
    name: 'Wolf Den — Nayoro Wilds (2)',
    category: 'wolf_den',
    region: 'Nayoro Wilds',
    description: 'A second Wolf Den in the Nayoro Wilds.',
    verificationNeeded: true,
  },

  // ── Teshio Ridge (1) ─────────────────────────────────────────────────────
  {
    id: 'act_wolf_09',
    name: 'Biting Wind Wolf Den',
    category: 'wolf_den',
    region: 'Teshio Ridge',
    description: 'In the northeast of Teshio Ridge, north of Sentinel Forest on a ridge. Find the mountain range and climb up to the Wolf Den, then follow the wolf to the Trapper camp.',
  },

  // ── Oshima Coast (1) ─────────────────────────────────────────────────────
  {
    id: 'act_wolf_10',
    name: 'Waterfall Wolf Den',
    category: 'wolf_den',
    region: 'Oshima Coast',
    description: 'At the eastern end of Oshima Coast, beyond the Saito Artillery Outpost. Climb up either side of the waterfall to find the den. Follow the wolf to the final Trapper camp.',
    tips: 'The Waterfall Wolf Den is the last one most players encounter — completing it earns the Wolves of Ezo trophy if all others are done.',
  },
];

// ── Bamboo Strikes (15 total — Body, Mind, and Spirit trophy) ─────────────────
// Press buttons in the correct sequence across 3 rounds of increasing difficulty.
// 2 are completed automatically during main story missions; the remaining 13 are
// in the open world. One (Home) is hidden under the Home map label with no icon.
// One (Huranui's Rest Inn) is hidden under the Inn icon. All reward Spirit and
// 20 Young Bamboo sticks per completion.
const BAMBOO_STRIKES: WorldActivity[] = [
  // ── Story-related (2) — auto-completed, cannot be missed ──────────────────
  {
    id: 'act_bamb_01',
    name: 'Bamboo Strike — The Way of Dual Katana',
    category: 'bamboo_strike',
    region: 'Yotei Grasslands',
    description: 'Completed automatically during Main Tale: The Way of Dual Katana. Cannot be missed.',
    tips: 'All 15 Bamboo Strikes count toward the Body, Mind, and Spirit silver trophy.',
  },
  {
    id: 'act_bamb_02',
    name: 'Bamboo Strike — The Oni',
    category: 'bamboo_strike',
    region: 'Ishikari Plain',
    description: 'Completed automatically during Main Tale: The Oni. Cannot be missed.',
  },

  // ── Yotei Grasslands (3 open world) ──────────────────────────────────────
  {
    id: 'act_bamb_03',
    name: 'Father\'s Bamboo Strike',
    category: 'bamboo_strike',
    region: 'Yotei Grasslands',
    description: "At your home, across from your father's forge at the cliffs. Interact with the broken bamboo strike to rebuild it, then cut through. Not visible on the map — hidden under the Home location icon.",
    tips: "Look for the broken bamboo stand near the cliff edge at your home base.",
  },
  {
    id: 'act_bamb_04',
    name: 'Nupur River Bamboo Strike',
    category: 'bamboo_strike',
    region: 'Yotei Grasslands',
    description: 'Directly north of the Crow\'s Nest Watchtower in a wooded area. A Settler is nearby.',
  },
  {
    id: 'act_bamb_05',
    name: 'Yotei River Bamboo Strike',
    category: 'bamboo_strike',
    region: 'Yotei Grasslands',
    description: "In between the White Dye House and Master Hejiro's Garden, just north of the Yotei River.",
  },

  // ── Ishikari Plain (2 open world) ────────────────────────────────────────
  {
    id: 'act_bamb_06',
    name: 'Urara Bamboo Strike',
    category: 'bamboo_strike',
    region: 'Ishikari Plain',
    description: 'An open-world Bamboo Strike in the Ishikari Plain region.',
  },
  {
    id: 'act_bamb_07',
    name: 'Rumoi Bamboo Strike',
    category: 'bamboo_strike',
    region: 'Ishikari Plain',
    description: 'An open-world Bamboo Strike in the Ishikari Plain near Rumoi.',
  },

  // ── Tokachi Range (3) ────────────────────────────────────────────────────
  {
    id: 'act_bamb_08',
    name: "Huranui's Rest Inn Bamboo Strike",
    category: 'bamboo_strike',
    region: 'Tokachi Range',
    description: "At the Huranui's Rest Inn, outside to the left of the inn building where ronin are standing. Not marked on the map — its icon is covered by the Inn location icon. One of two hidden bamboo strikes.",
    tips: "Look for the ronin outside the inn's left side — the bamboo stand is there.",
  },
  {
    id: 'act_bamb_09',
    name: 'Misty Valley Bamboo Strike',
    category: 'bamboo_strike',
    region: 'Tokachi Range',
    description: 'In the bamboo labyrinth at the Abandoned Tominaga Estate, past the Mysterious Gate. Requires completing Mythic Tale: The Spider Lily General to access — return any time after.',
    tips: 'Complete The Spider Lily General mythic tale first to open the Mysterious Gate.',
  },
  {
    id: 'act_bamb_10',
    name: "Niikappu's Fork Bamboo Strike",
    category: 'bamboo_strike',
    region: 'Tokachi Range',
    description: 'At Niikappu Falls in northeast Tokachi Range, near the Niikappu River fork.',
  },

  // ── Teshio Ridge (3) ─────────────────────────────────────────────────────
  {
    id: 'act_bamb_11',
    name: 'Sakuru Bamboo Strike',
    category: 'bamboo_strike',
    region: 'Teshio Ridge',
    description: 'On the eastern side of Teshio Ridge, on top of a large rock north of the Kamikawa Trading Post.',
    tips: 'Climb up the rock — the bamboo stand is at the top.',
  },
  {
    id: 'act_bamb_12',
    name: 'Hakodake Bamboo Strike',
    category: 'bamboo_strike',
    region: 'Teshio Ridge',
    description: 'Up in the Hakodake Mountains. Head south from the Contested Farm near the eastern coast, go up the slope, and use the rocks and grappling points to the left to reach the stand.',
    tips: 'Look for the slide slope — the grapple points to its left lead up to the Bamboo Strike.',
  },
  {
    id: 'act_bamb_13',
    name: 'Sarobetsu Bamboo Strike',
    category: 'bamboo_strike',
    region: 'Teshio Ridge',
    description: 'From Sarobetsu Lake in the northwest of Teshio Ridge, head east to the frozen river. The Bamboo Strike is on top of a rock overlooking the frozen lake.',
  },

  // ── Oshima Coast (2) ─────────────────────────────────────────────────────
  {
    id: 'act_bamb_14',
    name: 'Atago Bamboo Strike',
    category: 'bamboo_strike',
    region: 'Oshima Coast',
    description: 'From the northern entrance to Oshima Coast, head south into the forest of blossom trees.',
    tips: 'Lightning will strike you when attempting this — throw away the nearby metal spears and swords first, as they attract the lightning strikes.',
  },
  {
    id: 'act_bamb_15',
    name: 'Matsumae Bamboo Strike',
    category: 'bamboo_strike',
    region: 'Oshima Coast',
    description: 'A Bamboo Strike in the Oshima Coast region. Completing this earns the final Spirit increase needed if all others are done.',
  },
];

// ── Shrine Climbs (13 total — Body, Mind, and Spirit trophy + Golden Mask) ──────
// Climb the mountainous path marked by torii gates; pray at the summit shrine
// by swiping down on the Touchpad. Each shrine rewards a unique charm.
// Shrine #6 (Azure Wind) is completed automatically during the main story.
const SHRINE_CLIMBS: WorldActivity[] = [
  // ── Yotei Grasslands (3) ─────────────────────────────────────────────────
  {
    id: 'act_shri_01',
    name: 'Fall\'s Rest Shrine',
    category: 'shrine_climb',
    region: 'Yotei Grasslands',
    description: 'Shrine Climb in the Yotei Grasslands. Ascend the torii-gate path to the summit and pray at the shrine. Rewards the Charm of Kanayago.',
    tips: 'All 13 Shrine Climbs count toward Body, Mind, and Spirit (silver trophy) and unlock the Golden Mask cosmetic.',
  },
  {
    id: 'act_shri_02',
    name: 'Blooming Ridge Shrine',
    category: 'shrine_climb',
    region: 'Yotei Grasslands',
    description: 'Shrine Climb in the Yotei Grasslands. Follow the torii-gate path to the summit. Rewards the Charm of Amenowakahiko.',
  },
  {
    id: 'act_shri_03',
    name: 'Mount Yōtei Shrine',
    category: 'shrine_climb',
    region: 'Yotei Grasslands',
    description: "Shrine Climb on Mount Yōtei. The summit shrine is also the site of the Inheritance bronze trophy — your parents' charms are found here. Rewards Mother's Charm and Father's Charm.",
    tips: "The path to the summit opens during the main story. Collecting the parents' charms here also earns the Inheritance bronze trophy.",
  },

  // ── Ishikari Plain (3) ───────────────────────────────────────────────────
  {
    id: 'act_shri_04',
    name: "Sun's Peak Shrine",
    category: 'shrine_climb',
    region: 'Ishikari Plain',
    description: 'Shrine Climb in Ishikari Plain. Rewards the Charm of Izanagi.',
  },
  {
    id: 'act_shri_05',
    name: 'Winding Tears Shrine',
    category: 'shrine_climb',
    region: 'Ishikari Plain',
    description: 'Shrine Climb in Ishikari Plain. Rewards the Charm of Homusubi.',
  },
  {
    id: 'act_shri_06',
    name: 'Azure Wind Shrine',
    category: 'shrine_climb',
    region: 'Ishikari Plain',
    description: 'Completed automatically during Main Tale: The Oni. This shrine area cannot be revisited, but all collectibles are obtained automatically during the mission. Rewards the Charm of Hachiman.',
    tips: 'Cannot be missed — completed automatically when you reach this point in the main story.',
  },

  // ── Tokachi Range (3) ────────────────────────────────────────────────────
  {
    id: 'act_shri_07',
    name: 'Amber Respite Shrine',
    category: 'shrine_climb',
    region: 'Tokachi Range',
    description: 'Shrine Climb in the Tokachi Range. Rewards the Charm of Masakado.',
  },
  {
    id: 'act_shri_08',
    name: 'Faithful Leap Shrine',
    category: 'shrine_climb',
    region: 'Tokachi Range',
    description: 'Shrine Climb in the Tokachi Range. Rewards the Charm of Futsunushi.',
  },
  {
    id: 'act_shri_09',
    name: 'Risen Fog Shrine',
    category: 'shrine_climb',
    region: 'Tokachi Range',
    description: 'Shrine Climb in the Tokachi Range. Rewards the Charm of Kibitsuhiko.',
  },

  // ── Nayoro Wilds (1) ─────────────────────────────────────────────────────
  {
    id: 'act_shri_10',
    name: 'Patient Frost Shrine',
    category: 'shrine_climb',
    region: 'Nayoro Wilds',
    description: 'Shrine Climb in the Nayoro Wilds. Rewards the Charm of Yamatotakeru.',
  },

  // ── Teshio Ridge (2) ─────────────────────────────────────────────────────
  {
    id: 'act_shri_11',
    name: 'Enduring Hold Shrine',
    category: 'shrine_climb',
    region: 'Teshio Ridge',
    description: 'Shrine Climb in Teshio Ridge. Rewards the Charm of Masaka.',
  },
  {
    id: 'act_shri_12',
    name: 'Chilled Peak Shrine',
    category: 'shrine_climb',
    region: 'Teshio Ridge',
    description: 'Shrine Climb in Teshio Ridge. Rewards the Charm of Sukunahikona.',
  },

  // ── Oshima Coast (1) ─────────────────────────────────────────────────────
  {
    id: 'act_shri_13',
    name: 'Budding Grace Shrine',
    category: 'shrine_climb',
    region: 'Oshima Coast',
    description: 'The final Shrine Climb, on the Oshima Coast. Note: the "Forgotten Shrine" in southwest Oshima does NOT count — it is part of the Storm Blade mythic tale, not a Shrine Climb. Rewards the Charm of Takemikazuchi.',
    tips: 'Completing all 13 Shrine Climbs unlocks the Golden Mask cosmetic in addition to the trophy progress.',
  },
];

// ── Hot Springs (16 total — Body, Mind, and Spirit trophy + Fundoshi Armor Set) ─
// Interact with the bucket by the water; Atsu soaks and reflects, increasing max health.
// Marked on the map with a wooden hot tub icon. Visiting all 16 unlocks the Fundoshi
// Armor Set in addition to counting toward Body, Mind, and Spirit.
const HOT_SPRINGS: WorldActivity[] = [
  // ── Yotei Grasslands (4) ─────────────────────────────────────────────────
  {
    id: 'act_hot_01',
    name: 'Horizon View Hot Spring',
    category: 'hot_spring',
    region: 'Yotei Grasslands',
    description: "On the southern coast of the Yotei Grasslands near the Kuttara Gambling Den. Drop down the cliff to a ledge, then cross the gap to reach the hot spring.",
    tips: 'All 16 Hot Springs count toward Body, Mind, and Spirit and unlock the Fundoshi Armor Set.',
  },
  {
    id: 'act_hot_02',
    name: "Yotei's Shadow Hot Spring",
    category: 'hot_spring',
    region: 'Yotei Grasslands',
    description: 'In the southern section of Shikotsu Woods, among large fields of red flowers. The hot spring is on a rock above a small lake.',
  },
  {
    id: 'act_hot_03',
    name: 'Wild Clearing Hot Spring',
    category: 'hot_spring',
    region: 'Yotei Grasslands',
    description: "Northeast of Yotei's Shadow Inn. Climb up a cliff to find this hot spring at the top.",
  },
  {
    id: 'act_hot_04',
    name: 'Hidden Cliff Hot Spring',
    category: 'hot_spring',
    region: 'Yotei Grasslands',
    description: 'In the northwestern tip of the Yotei Grasslands, in the Golden Foothills near a waterfall. Climb the rocks to the left of the waterfall to reach it.',
  },

  // ── Ishikari Plain (4) ───────────────────────────────────────────────────
  {
    id: 'act_hot_05',
    name: 'Cloud View Hot Spring',
    category: 'hot_spring',
    region: 'Ishikari Plain',
    description: 'In the northern part of Ishikari Plain, follow Rumoi River to its source in the east. At the waterfall, climb up the rock to the left.',
  },
  {
    id: 'act_hot_06',
    name: 'Smoky Mountains Hot Spring',
    category: 'hot_spring',
    region: 'Ishikari Plain',
    description: 'In the northeast corner of White Deer Woodlands. Find the slope you\'d normally slide down — climb the rocks to the left instead to reach the hot spring above.',
  },
  {
    id: 'act_hot_07',
    name: "Kappa's Hot Spring",
    category: 'hot_spring',
    region: 'Ishikari Plain',
    description: 'Along the eastern edge of Ishikari Plain in the Urara Forest, out in the open. Look for the red tree, or follow a Golden Bird.',
  },
  {
    id: 'act_hot_08',
    name: 'Bear Rock Hot Spring',
    category: 'hot_spring',
    region: 'Ishikari Plain',
    description: 'From Ishikari Fork, head west up the huge hill to the rock on the right. A grappling hook point on the far side leads to a path up to the hot spring.',
  },

  // ── Tokachi Range (2) ────────────────────────────────────────────────────
  {
    id: 'act_hot_09',
    name: 'Quiet Valley Hot Spring',
    category: 'hot_spring',
    region: 'Tokachi Range',
    description: 'Between Yubari Lake and Huranui Cliffs in Tokachi Range, close to the map perimeter.',
  },
  {
    id: 'act_hot_10',
    name: 'Grassy Fields Hot Spring',
    category: 'hot_spring',
    region: 'Tokachi Range',
    description: "North of Saru Plains, west of the Boar's Eye Cave lettering on the map. The hot spring is up on a hill.",
  },

  // ── Nayoro Wilds (1) ─────────────────────────────────────────────────────
  {
    id: 'act_hot_11',
    name: 'Cave Path Hot Spring',
    category: 'hot_spring',
    region: 'Nayoro Wilds',
    description: "Fast travel to Ikidomari Grove, then look along the cliff face to the left for a path up. Follow it into a cave, go right at the fork, climb up, and follow the path to the hot spring.",
    tips: 'The yellow-faced statues and an Altar of Reflection are nearby markers to help orient you.',
  },

  // ── Teshio Ridge (3) ─────────────────────────────────────────────────────
  {
    id: 'act_hot_12',
    name: 'Red Crane Inn Hot Spring',
    category: 'hot_spring',
    region: 'Teshio Ridge',
    description: 'Inside one of the outhouses at Red Crane Inn in Teshio Ridge.',
    tips: 'This hot spring costs 200 Coins to use — make sure you have enough coin.',
  },
  {
    id: 'act_hot_13',
    name: 'Black Bowl Hot Spring',
    category: 'hot_spring',
    region: 'Teshio Ridge',
    description: 'In the southwestern corner of Teshio Ridge, in the Crimson Forest. Climb a large rock to find the hot spring on top. Some enemies may need to be cleared first.',
  },
  {
    id: 'act_hot_14',
    name: 'Valley View Hot Spring',
    category: 'hot_spring',
    region: 'Teshio Ridge',
    description: 'In the far north of Teshio Ridge along its western edge, directly behind the Contested Farm. Climb the rock behind the farm to reach it.',
  },

  // ── Oshima Coast (2) ─────────────────────────────────────────────────────
  {
    id: 'act_hot_15',
    name: 'Distant Castle Hot Spring',
    category: 'hot_spring',
    region: 'Oshima Coast',
    description: 'Along the northern edge of Oshima Coast, north of Miyama Village. Climb to the top of the waterfall, continue up the hill, then squeeze through the gap in the rock to find the path up.',
  },
  {
    id: 'act_hot_16',
    name: 'Cliff View Hot Spring',
    category: 'hot_spring',
    region: 'Oshima Coast',
    description: 'Head directly south from the Saito Artillery Outpost into Shojin Hills. The hot spring is on top of a rock — climb the cliff on its south side from the very bottom to reach it.',
    tips: 'Completing this final hot spring (along with the other 15) earns Body, Mind, and Spirit and unlocks the Fundoshi Armor Set.',
  },
];

// ── Sumi-e Paintings (15 open-world total — An Artist's Eye trophy) ────────────
// Sit on the straw mat and swipe the Touchpad to draw the outlined picture.
// 15 open-world paintings are required for An Artist's Eye. 3 additional Sumi-e
// exist in quests and DO NOT count toward the trophy. Each painting rewards a
// cosmetic Hat, Headband, or Mask.
const SUMI_E_PAINTINGS: WorldActivity[] = [
  // ── Yotei Grasslands (4) ─────────────────────────────────────────────────
  {
    id: 'act_sumi_01',
    name: 'Careful Pincers Sumi-e',
    category: 'sumi_e',
    region: 'Yotei Grasslands',
    description: 'A Sumi-e Painting viewpoint in the Yotei Grasslands. Sit on the straw mat and swipe the Touchpad to complete. Rewards the Hat of Curiosity.',
    tips: 'All 15 open-world Sumi-e Paintings count toward An Artist\'s Eye. 3 additional quest Sumi-e do NOT count.',
  },
  {
    id: 'act_sumi_02',
    name: 'Plum Crane Sumi-e',
    category: 'sumi_e',
    region: 'Yotei Grasslands',
    description: 'Sumi-e Painting in the Yotei Grasslands. Rewards the Headband of Loss.',
  },
  {
    id: 'act_sumi_03',
    name: 'Mount Yōtei Sumi-e',
    category: 'sumi_e',
    region: 'Yotei Grasslands',
    description: 'Sumi-e Painting with a view of Mount Yōtei. Rewards the Headband of Yotei.',
  },
  {
    id: 'act_sumi_04',
    name: 'Chasing Frogs Sumi-e',
    category: 'sumi_e',
    region: 'Yotei Grasslands',
    description: 'Sumi-e Painting in the Yotei Grasslands. Rewards the Hat of Youth.',
  },

  // ── Ishikari Plain (3) ───────────────────────────────────────────────────
  {
    id: 'act_sumi_05',
    name: 'Crashing Waves Sumi-e',
    category: 'sumi_e',
    region: 'Ishikari Plain',
    description: 'On top of a coastal mountain in Ishikari Plain. Climb up the rocks and go over the rope to reach it. Rewards the Headband of Defiance.',
  },
  {
    id: 'act_sumi_06',
    name: 'Defiant Roots Sumi-e',
    category: 'sumi_e',
    region: 'Ishikari Plain',
    description: 'Sumi-e Painting in Ishikari Plain. Rewards the Headband of Fortitude.',
  },
  {
    id: 'act_sumi_07',
    name: 'Chatting Crows Sumi-e',
    category: 'sumi_e',
    region: 'Ishikari Plain',
    description: 'Sumi-e Painting in Ishikari Plain. Rewards the Hat of Messengers.',
  },

  // ── Tokachi Range (2) ────────────────────────────────────────────────────
  {
    id: 'act_sumi_08',
    name: 'Free Skies Sumi-e',
    category: 'sumi_e',
    region: 'Tokachi Range',
    description: 'Sumi-e Painting in the Tokachi Range. Rewards the Mask of Freedom.',
  },
  {
    id: 'act_sumi_09',
    name: "Season's Colors Sumi-e",
    category: 'sumi_e',
    region: 'Tokachi Range',
    description: 'Sumi-e Painting in the Tokachi Range. Rewards the Headband of the Seasons.',
  },

  // ── Nayoro Wilds (2) ─────────────────────────────────────────────────────
  {
    id: 'act_sumi_10',
    name: 'Peaceful Kotan Sumi-e',
    category: 'sumi_e',
    region: 'Nayoro Wilds',
    description: 'Sumi-e Painting in the Nayoro Wilds. Rewards the Mask of Community.',
  },
  {
    id: 'act_sumi_11',
    name: 'Drying Bark Sumi-e',
    category: 'sumi_e',
    region: 'Nayoro Wilds',
    description: 'Sumi-e Painting in the Nayoro Wilds. Rewards the Headband of Tranquility.',
  },

  // ── Teshio Ridge (2) ─────────────────────────────────────────────────────
  {
    id: 'act_sumi_12',
    name: 'Frozen Moment Sumi-e',
    category: 'sumi_e',
    region: 'Teshio Ridge',
    description: 'Sumi-e Painting in Teshio Ridge. Rewards the Mask of Slumber.',
  },
  {
    id: 'act_sumi_13',
    name: 'Howling Pack Sumi-e',
    category: 'sumi_e',
    region: 'Teshio Ridge',
    description: 'Sumi-e Painting in Teshio Ridge. Rewards the Headband of the Wild.',
  },

  // ── Oshima Coast (2) ─────────────────────────────────────────────────────
  {
    id: 'act_sumi_14',
    name: 'Lost Flight Sumi-e',
    category: 'sumi_e',
    region: 'Oshima Coast',
    description: 'Sumi-e Painting on the Oshima Coast. Rewards the Mask of Remembrance.',
  },
  {
    id: 'act_sumi_15',
    name: 'Imperial Sakura Sumi-e',
    category: 'sumi_e',
    region: 'Oshima Coast',
    description: 'Final open-world Sumi-e Painting, on the Oshima Coast. Rewards the Hat of Refinement. Completing this painting (and all other 14) earns An Artist\'s Eye.',
    tips: 'Note: 3 additional quest-related Sumi-e exist but do NOT count toward the An Artist\'s Eye trophy.',
  },
];

// ── Combined export ───────────────────────────────────────────────────────────
export const WORLD_ACTIVITIES: WorldActivity[] = [
  ...CAMPS,
  ...DUELING_TREES,
  ...WOLF_DENS,
  ...BAMBOO_STRIKES,
  ...SHRINE_CLIMBS,
  ...HOT_SPRINGS,
  ...SUMI_E_PAINTINGS,
];

export const ACTIVITY_IDS = new Set(WORLD_ACTIVITIES.map(a => a.id));

// Category metadata for display
export const ACTIVITY_CATEGORY_LABELS: Record<ActivityCategory, string> = {
  camp: 'Yōtei Six Camps',
  dueling_tree: 'Dueling Trees',
  wolf_den: 'Wolf Dens',
  bamboo_strike: 'Bamboo Strikes',
  shrine_climb: 'Shrine Climbs',
  hot_spring: 'Hot Springs',
  sumi_e: 'Sumi-e Paintings',
};

export const ACTIVITY_CATEGORY_ICONS: Record<ActivityCategory, string> = {
  camp: 'flag-outline',
  dueling_tree: 'flash-outline',
  wolf_den: 'paw-outline',
  bamboo_strike: 'leaf-outline',
  shrine_climb: 'triangle-outline',
  hot_spring: 'water-outline',
  sumi_e: 'brush-outline',
};

export const ACTIVITY_CATEGORY_COLORS: Record<ActivityCategory, string> = {
  camp: '#8B1A1A',
  dueling_tree: '#C9A84C',
  wolf_den: '#7B68EE',
  bamboo_strike: '#4A9B6F',
  shrine_climb: '#4A9B8E',
  hot_spring: '#4682B4',
  sumi_e: '#9B7B8B',
};

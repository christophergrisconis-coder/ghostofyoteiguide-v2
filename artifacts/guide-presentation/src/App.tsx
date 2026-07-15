import { useState, useEffect, useCallback, useRef } from 'react';

// ── Palette ───────────────────────────────────────────────────────────────────
const GOLD   = '#C9A84C';
const GOLD20 = 'rgba(201,168,76,0.20)';
const GOLD40 = 'rgba(201,168,76,0.40)';
const DARK   = '#0a0a0f';
const WHITE  = '#f0ede8';
const DIM    = 'rgba(240,237,232,0.65)';
const CARD   = 'rgba(10,10,20,0.72)';

// ── Verified image pool ───────────────────────────────────────────────────────
const IMGS = {
  ps1:  'https://image.api.playstation.com/vulcan/ap/rnd/202504/2116/53c76276602fca520ddf3269e1ff9f34aca0ac39ce46e4cb.jpg?w=1920',
  ps2:  'https://image.api.playstation.com/vulcan/ap/rnd/202504/2116/49934c62a922417e86bd3fc61a59b116cf7ae51e91d9a9de.jpg?w=1920',
  blog1:'https://blog.playstation.com/tachyon/2025/04/7908a4aca1e3d54a7853d2a81ea60675cf9b410a-scaled.jpg',
  blog2:'https://blog.playstation.com/tachyon/2026/07/c6797d9f407410a92adb25c652f66ef7a89f0f00.jpg',
  blog3:'https://blog.playstation.com/tachyon/2026/07/12f747e70ddd3d05eda2e203333e22153d970e89.jpg',
  blog4:'https://blog.playstation.com/tachyon/2026/07/6f36a9dd878b241b249dfba5214d6f7311ef32f3.jpg',
  blog5:'https://blog.playstation.com/tachyon/2026/07/be126041528c8a338b5166c9da2db6788bc3a854.jpg',
  blog6:'https://blog.playstation.com/tachyon/2026/07/bf80fcf2b0c9b0f938ea3b25cf12f33219bbce7c.jpg',
  mob1: 'https://cdn.mobygames.com/88461226-39fe-11f1-b3ba-02420a0001ca.webp',
  mob2: 'https://cdn.mobygames.com/97c4580c-39fe-11f1-8dc6-02420a0001ce.webp',
  mob3: 'https://cdn.mobygames.com/a59e4a0a-39fe-11f1-8faf-02420a0001c6.webp',
  mob4: 'https://cdn.mobygames.com/c02425b6-39fe-11f1-8dc6-02420a0001ce.webp',
  mob5: 'https://cdn.mobygames.com/e5d0c3fa-39fe-11f1-b3ba-02420a0001ca.webp',
};

// ── Types ────────────────────────────────────────────────────────────────────
interface Quest {
  id: string;
  title: string;
  region: string;
  time: string;
  boss?: boolean;
  act?: string;       // Main Story chapter
  ally?: string;      // Sensei Tales companion
  target?: string;    // Bounty target subtitle
  prereq?: string;
  desc: string;
  steps: string[];
  tip?: string;
  tipLabel?: string;
  reward: string;
}

// ── Shared region colours ────────────────────────────────────────────────────
const REGION_COLOR: Record<string, string> = {
  'Yotei Grasslands': '#4A9B8E',
  'Ishikari Plain':   '#4682B4',
  'Teshio Ridge':     '#7B68EE',
  'Tokachi Range':    '#B8860B',
  'Nayoro Wilds':     '#4A9B6F',
  'Oshima Coast':     '#4A7A9B',
};

const ACT_COLOR: Record<string, string> = {
  'Prologue':  '#6B7280',
  'Chapter 1': '#4A9B8E',
  'Chapter 2': '#8B5CF6',
  'Chapter 3': '#8B1A1A',
  'Epilogue':  '#9B59B6',
};

// ══════════════════════════════════════════════════════════════════════════════
//  QUEST DATA
// ══════════════════════════════════════════════════════════════════════════════

const MAIN_STORY: Quest[] = [
  {
    id:'ms_01', title:'The Snake', act:'Prologue', region:'Yotei Grasslands', time:'20 min', boss:true,
    desc:"The opening sequence establishes Atsu's motivation. The Yotei Six attack her family at Kasabe village and leave her for dead. A largely cinematic prologue with a parry-focused boss duel and a homestead memory chain.",
    steps:['Witness the Yotei Six attack at Kasabe village','Defend through the burning village streets','Infiltrate and clear the house — two waves','Duel The Snake — Phase 1 (parry tutorial)','Survive Phase 2 — dodge the unparryable lunge','Scout the destination with the Spyglass','Follow Jubei through the homestead memory sequence','Complete the shamisen & forge mini-tutorials'],
    tip:"Phase 2 adds an unparryable lunge — his lead foot stamps audibly before the charge. Dodge left or right, never backward.", tipLabel:'Boss Tip',
    reward:'Ghost Kimono (starting armour), Spyglass, 1 Resolve Upgrade',
  },
  {
    id:'ms_04', title:'Belly of the Beast', act:'Chapter 1', region:'Ishikari Plain', time:'50 min', boss:false,
    desc:"Atsu pursues intelligence on the Yotei Six through the occupied towns of Ishikari Plain. Infiltrate the Yotei Six garrison and extract a prisoner who holds information about the warlord's next move.",
    steps:['Travel to the Ishikari garrison','Locate the imprisoned informant via the Spyglass','Infiltrate the garrison undetected — earn a Stealth bonus','Free the informant and escort them to the safe house','Repel the pursuing Yotei Six patrol (three waves)'],
    tip:"The garrison has a patrol rotation of roughly 90 seconds. Use tall grass along the eastern wall for undetected entry.", tipLabel:'Stealth Tip',
    reward:"Rider's Edge (Tier 2 katana), 300 Mon, 2 Technique Points",
  },
  {
    id:'ms_05', title:'A Mad Pursuit', act:'Chapter 1', region:'Ishikari Plain', time:'35 min', boss:false,
    desc:"With the informant's intelligence in hand, Atsu rides hard across Ishikari Plain to intercept a Yotei Six messenger before he can warn the warlord's inner circle. A mounted-combat-heavy chapter.",
    steps:['Mount up and give chase — mounted combat tutorial','Intercept the messenger on the road south of Hōkō Village','Defeat the messenger escort (four riders)','Recover the sealed letter from the messenger','Return to the safe house and decipher the contents with Jubei'],
    tip:"Mounted bow attacks stagger horse-mounted enemies. Use heavy arrows to dismount riders quickly.",
    reward:'Horse armour (Ishikari Barding), 200 Mon',
  },
  {
    id:'ms_02', title:'Shogun of the North', act:'Chapter 1', region:'Tokachi Range', time:'40 min', boss:false,
    desc:"The letter points to a secret meeting in Tokachi Range. Atsu must reach the mountain stronghold before the summit concludes and the Yotei Six lieutenants disperse.",
    steps:['Travel through the Tokachi mountain pass — stealth recommended','Observe the summit gathering from the ridge','Plant listening devices at three key positions','Withdraw before detection','Regroup with Jubei at the base camp and plan the next move'],
    tip:"Crouching behind the stone walls counts as concealed. You can use the Spyglass to tag all enemies before entering the courtyard.", tipLabel:'Scouting Tip',
    reward:'Ancient Map Fragment, 250 Mon, Stone Stance ability unlock',
  },
  {
    id:'ms_06', title:'The Yotei Six', act:'Chapter 1', region:'Yotei Grasslands', time:'40 min', boss:false,
    desc:"Armed with names and faces, Atsu returns to Yotei Grasslands to confront the Yotei Six directly. This chapter introduces the Six as individual characters and sets up the arc of the game.",
    steps:['Meet the contact at the Kasabe shrine','Identify all six lieutenants from the intelligence dossier','Track the lieutenant known as The Widow to her safehouse','Overhear her conversation about the Snake\'s weakness','Escape the safehouse when her guards arrive — do not engage'],
    tip:"Fleeing counts as a valid completion. Fighting all guards here will block a later Stealth-bonus chapter.",
    reward:'Ghost Armour Tier I, Technique Points ×3',
  },
  {
    id:'ms_03', title:'The Oni', act:'Chapter 1', region:'Yotei Grasslands', time:'45 min', boss:true,
    desc:"Atsu tracks The Oni — the Yotei Six's enforcer — to a ruined temple in the grasslands. A brutal two-phase duel against a giant spiked-club warrior with unblockable sweeps.",
    steps:['Navigate the ruined temple exterior — clear the courtyard','Locate The Oni in the inner sanctum','Phase 1: Focus on parry timing — block the overhead slam, punish the recovery','Phase 2: The Oni gains a charge attack — dodge to the side and punish the stumble','Deliver the killing blow to trigger the scene'],
    tip:"The Oni's sweep is unparryable — the red circle appears just before it lands. Jump-dodge backward and close in while he recovers. Wind Stance speeds up the punish window.", tipLabel:'Boss Tip',
    reward:'Oni\'s Resolve (charm), 400 Mon, 2 Technique Points',
  },
  {
    id:'ms_07', title:'The Kitsune', act:'Chapter 1', region:'Yotei Grasslands', time:'55 min', boss:true,
    desc:"The Kitsune — a masked assassin who commands fox-spirit illusions — lures Atsu into a spirit realm trap. The most visually striking chapter of Act 1, with illusion mechanics that mirror your own attacks back at you.",
    steps:['Follow the fox to the spirit gate at Kitsune Shrine','Enter the spirit realm — environmental hazards are active','Phase 1: Defeat the two mirror-image doppelgängers','Solve the riddle of the three lanterns to break the illusion','Phase 2: Fight the true Kitsune — she is fast but has low health'],
    tip:"The doppelgängers copy your most recent attack sequence. Vary your strikes — don't use the same combo twice. Earth Stance stunlock works on Phase 2.", tipLabel:'Boss Tip',
    reward:'Nine-Tails Puzzle Box Key, Kitsune Mask (cosmetic), 3 Technique Points',
  },
  {
    id:'ms_08', title:'The Saito Brothers', act:'Chapter 2', region:'Tokachi Range', time:'65 min', boss:true,
    desc:"Two lieutenants, one arena. The Saito Brothers fight as a coordinated pair and are the toughest encounter so far. Atsu must manage aggression from both while finding moments to separate and punish them individually.",
    steps:['Reach the Saito Brothers\' fortress in Tokachi','Clear the outer courtyard (two waves, twelve enemies)','Enter the central arena and begin the duel','Phase 1: Both brothers fight simultaneously — focus Hiro (the faster one) first','Phase 2: Kei (the heavy) enrages after Hiro falls — use distance and bows','Phase 3 (combined): A brief joint attack before Kei falls — stay mobile'],
    tip:"When both brothers are alive, never get caught between them. Always angle to keep one on your flank, not your back. Water Stance\'s long-range sweep is excellent here.", tipLabel:'Boss Tip',
    reward:'Crescent Blade (Tier 2 katana), Ghost Armour Tier II, 4 Technique Points',
  },
  {
    id:'ms_09', title:'Ryuhei the Enforcer', act:'Chapter 2', region:'Nayoro Wilds', time:'60 min', boss:true,
    desc:"Ryuhei commands the Yotei Six's prison network in the wild northern territories. Atsu must infiltrate the prison camp, free the captives, and then face Ryuhei himself — a spear-wielding giant with massive reach.",
    steps:['Infiltrate the Nayoro prison camp from the river approach','Free all four groups of captives without triggering the alarm','Reach the command tower and confront Ryuhei','Phase 1: Stay inside his spear range — attack after parrying the thrust','Phase 2: Ryuhei calls reinforcements — eliminate them before re-engaging','Phase 3: Ryuhei becomes berserk — predict the overhead slam, punish immediately'],
    tip:"Ryuhei's spear thrust has enormous reach. The safe spot is directly at his side after the thrust — step to the left and counter-attack immediately. Moon Stance is recommended.", tipLabel:'Boss Tip',
    reward:'Ryuhei\'s Spear (collectible), 500 Mon, Nayoro Prison fast-travel unlocked',
  },
  {
    id:'ms_10', title:'The Dragon', act:'Chapter 3', region:'Teshio Ridge', time:'75 min', boss:true,
    desc:"The climax. Atsu ascends to the summit of Mount Teshio to face the warlord himself — The Dragon — in a multi-phase duel that draws on every stance and skill learned across the journey.",
    steps:['Ascend the Teshio Summit path — no enemies, story scene only','Phase 1: The Dragon fights with measured precision — parry openings are narrow','Phase 2: The Dragon activates his armour — switch to Ghost abilities and Charged attacks','Phase 3: Environmental fire hazards active — stay mobile while managing the arena','Phase 4 (Final): One-on-one at the summit edge — perfect parry triggers the ending QTE'],
    tip:"Save your Ghost Stance for Phase 3 — the fire explosions happen on a timer and Ghost Stance\'s speed lets you reach him between eruptions. Dragon\'s Fang unlocks after this fight.", tipLabel:'Final Boss Tip',
    reward:"Dragon's Fang (Tier 5 katana), Platinum Trophy path unlocked, True Ending scene",
  },
];

const SIDE_TALES: Quest[] = [
  { id:'st_01', title:'The Farmer and the Fox', region:'Yotei Grasslands', time:'15 min', desc:"A farmer near Kasabe reports fox spirits raiding his harvest. Investigate the field, track prints to the den, and resolve the conflict — the foxes are being driven out by Yotei Six soldiers burning the adjacent forest.", steps:['Speak to the farmer at the Kasabe field','Track the fox prints north to the tree line','Investigate the den for signs of disturbance','Eliminate the Yotei Six patrol burning the forest','Return and report to the farmer'], reward:'Harvest Charm (attack up after resting), 200 Mon' },
  { id:'st_02', title:"The Widow's Lantern", region:'Ishikari Plain', time:'20 min', desc:"A widow lights a lantern each night for her missing husband, a fisherman taken by Yotei Six slavers. Infiltrate the slaver camp and find out what happened to him.", steps:['Speak to the widow at the shore hut','Investigate the fishing docks for clues','Locate the slaver camp south of Hōkō Bay','Search the camp records for the husband\'s name','Return the news — good or bad — to the widow'], reward:'Lantern Charm (reduced noise detection), 150 Mon' },
  { id:'st_03', title:'Silk and Ash', region:'Teshio Ridge', time:'25 min', desc:"A silk merchant lost her caravan to bandits in the mountain pass. Recover the silk bales and discover they hide contraband maps that implicate a Yotei Six lieutenant.", steps:['Meet the merchant at the Teshio waystation','Scout the bandit camp from the ridge','Recover all three silk bales from the camp','Examine the hidden map compartment','Deliver the maps to the nearest safe house'], reward:'Bolt of Imperial Silk (crafting material), 250 Mon' },
  { id:'st_04', title:'The Last Woodcutter', region:'Nayoro Wilds', time:'18 min', desc:"The only woodcutter left in a deserted village refuses to leave — his family is buried on the land. Help him survive a Yotei Six work-gang sweep.", steps:['Find the woodcutter at his isolated hut','Fortify the hut entrance with the available materials','Repel the first Yotei Six scouting party (four soldiers)','Repel the second, larger sweep (eight soldiers + archer)','Convince the woodcutter to finally relocate'], reward:'Woodcutter\'s Axe (decoration), 150 Mon' },
  { id:'st_05', title:'Red Banners Rising', region:'Oshima Coast', time:'30 min', desc:"Fishermen report red banners appearing on the coastal cliffs — a signal system used by Yotei Six naval scouts. Destroy the signal network before the fleet it guides arrives.", steps:['Speak to the village elder at Mori Cove','Locate all four signal fires on the cliffs','Sabotage each fire and eliminate its guards','Intercept the scout ship\'s landing party (twelve soldiers)','Report back to the elder'], reward:'Coastal Charm (swim speed), 300 Mon' },
  { id:'st_06', title:'The Potter of Mori Cove', region:'Oshima Coast', time:'22 min', desc:"A renowned potter was taken mid-commission — his final work, a funeral urn, sits unfinished. Rescue him from the work camp and see the urn completed.", steps:['Find the unfinished urn at the workshop','Interrogate the neighbour for the potter\'s location','Reach the coastal work camp','Free the potter from the stockade','Escort him safely back to Mori Cove'], reward:'Glazed Urn (decoration), 200 Mon' },
  { id:'st_07', title:'A Promise of Salt', region:'Tokachi Range', time:'20 min', desc:"A blacksmith promised his dying daughter salt from the hot springs — a folk cure. The springs are now occupied. Retrieve the salt without triggering a massacre.", steps:['Speak to the blacksmith at the forge','Reach the Tokachi hot springs undetected','Gather the mineral salt (three deposits)','Avoid or dispatch the occupying patrol','Return to the blacksmith in time'], reward:'Blacksmith\'s Charm (crafting cost reduction), 200 Mon' },
  { id:'st_08', title:'Three Cups of Grief', region:'Yotei Grasslands', time:'15 min', desc:"Three former soldiers now drown their guilt in sake. Each carries a secret about a massacre they witnessed — and refused to stop. Listen, decide, and choose who to forgive.", steps:['Sit with the three veterans at the roadside inn','Hear each man\'s account of the massacre','Investigate the ruined village to verify the story','Return and deliver your judgment — spare all, spare one, or none','Receive the sealed testimony to deliver to the magistrate'], reward:'Sake Cup (decoration), 100 Mon, varies by choice' },
  { id:'st_09', title:'The Healer of Hokkaido', region:'Ishikari Plain', time:'35 min', desc:"A travelling healer treats both sides of the conflict — a dangerous policy that has made her enemies on both sides. Protect her clinic from a Yotei Six raid and negotiate her continued operation.", steps:['Find the healer\'s clinic at the crossroads','Tend to three patients to learn the clinic\'s routine','Intercept a Yotei Six officer threatening to shut it down','Defend the clinic from the retaliatory raid (two waves)','Escort the healer to a safer location'], reward:'Healer\'s Pouch (increased item capacity), 250 Mon' },
  { id:'st_10', title:'Children of the Ash Road', region:'Teshio Ridge', time:'28 min', desc:"A group of children separated from their families during a village evacuation are hiding in the ash-covered ruins of a burned settlement. Escort them through enemy lines to the nearest safe village.", steps:['Locate the children in the ruined settlement','Scout the road ahead for patrols','Escort the children through three patrol checkpoints (stealth recommended)','Provide a distraction at the garrison gate','Deliver the children to the refuge village'], reward:'Children\'s Token (good karma buff), 200 Mon' },
  { id:'st_11', title:'Ink and Embers', region:'Nayoro Wilds', time:'20 min', desc:"A scribe was transcribing ancient Ainu records before the occupation. His notes were seized. Recover them from the garrison archive and return the knowledge to the community.", steps:['Speak to the Ainu elder about the missing records','Infiltrate the Nayoro garrison records room','Locate the specific scroll case (three search points)','Escape without triggering the alarm','Return the scrolls to the elder'], reward:'Ainu Cipher (collectible aid — reveals one nearby Ainu Site), 200 Mon' },
  { id:'st_12', title:'The Hidden Carpenter', region:'Tokachi Range', time:'18 min', desc:"A carpenter hid herself inside a wall cavity when soldiers seized her workshop. She\'s been there for three days. Break her out and recover her tools before the soldiers sell them.", steps:['Find the blocked-up workshop wall','Quietly create an opening without alerting the inside patrol','Help the carpenter out and assess her condition','Recover the toolbox from the locked storeroom','See the carpenter to the mountain refuge'], reward:'Carpenter\'s Kit (gate-lock bypass tool), 150 Mon' },
  { id:'st_13', title:'The River Monk', region:'Yotei Grasslands', time:'20 min', desc:"A monk maintaining the riverside shrine to the water kami has been captured and used as a translator. Free him and help him complete the shrine ritual he was torn away from.", steps:['Find the monk in the riverside camp','Defeat the camp guards','Escort the monk to the shrine','Gather the three ritual offerings (fish, salt, cedar bark)','Stand watch during the shrine ceremony'], reward:'Water Kami Charm (increased healing), 175 Mon' },
  { id:'st_14', title:'Ashes of Ambition', region:'Ishikari Plain', time:'25 min', desc:"A disgraced Yotei Six officer wants to defect and offers intelligence in exchange for safe passage. Verify his loyalty before risking the escort.", steps:['Meet the defector at the old mill','Interrogate him about the intelligence he claims to have','Verify his information at the marked garrison location','Make the final call — escort him or turn him in','If escorted: fend off the Yotei Six pursuit party'], reward:'Intelligence Dossier (unlocks optional boss encounter), 300 Mon' },
  { id:'st_15', title:'Song of the Summit', region:'Teshio Ridge', time:'22 min', desc:"A blind bard knows a song that has become a rallying cry for resistance fighters, but she cannot travel to spread it. Help her record the song on wooden plaques to be distributed across the region.", steps:['Find the bard at the summit wayhouse','Listen to the song in full (interactive scene)','Carve the melody onto three plaques at the workbench','Place plaques at three key meeting points across Teshio','Return to hear a new verse composed for you'], reward:'Bard\'s Charm (reduces enemy detection radius), 200 Mon' },
  { id:'st_16', title:'The Dyer\'s Secret', region:'Nayoro Wilds', time:'18 min', desc:"A fabric dyer has been coerced into making uniforms for the Yotei Six. He has been secretly sabotaging the dye — but it\'s only a matter of time before they notice. Help him escape before they do.", steps:['Find the dye workshop at the edge of the occupied village','Examine the sabotaged uniform bolts (three inspection points)','Warn the dyer his ruse is almost discovered','Cause a diversion in the garrison courtyard','Escort the dyer and his family out through the forest route'], reward:'Dyer\'s Pigment (crafting material for unique cosmetic dyeing), 175 Mon' },
  { id:'st_17', title:'A Good Death', region:'Oshima Coast', time:'30 min', desc:"A retired samurai, too old to fight, refuses to flee as Yotei Six soldiers advance on his home. He asks Atsu to help him die on his feet in honourable combat — and to witness it.", steps:['Speak with the old samurai at his coastal estate','Share sake and hear his final wishes','Help him don his armour (interactive scene)','Accompany him to the clifftop duelling ground','Watch over the duel — intervene only if honour demands it'], reward:'Samurai\'s Iron (rare crafting material), 250 Mon' },
  { id:'st_18', title:'Fox Fire Night', region:'Yotei Grasslands', time:'20 min', desc:"Villagers report strange lights in the forest at night — fox fire. Follow the lights and discover a hidden community of refugees who have been using fox-spirit folklore to keep soldiers away.", steps:['Investigate the forest at nightfall','Follow the lights deeper into the woods (three waypoints)','Discover the hidden refugee encampment','Convince the refugees you are not a threat','Bring back supplies from the nearest settlement (one trip)'], reward:'Fox-Fire Lantern (cosmetic), 150 Mon' },
  { id:'st_19', title:'The Ferryman', region:'Ishikari Plain', time:'25 min', desc:"The last ferryman crossing Ishikari River has been forced to work exclusively for the Yotei Six. Free him and reopen the crossing for villagers trying to flee south.", steps:['Reach the Ishikari River ferry crossing','Observe the Yotei Six guard rotation','Eliminate or sneak past the guards at the dock','Cut the locks on the ferryman\'s chains','Escort him across the river for the first free crossing'], reward:'Free Ferry Crossing (fast-travel shortcut unlocked), 200 Mon' },
  { id:'st_20', title:'The Bone Reader', region:'Tokachi Range', time:'22 min', desc:"A shaman who reads the bones of the dead has been summoned by the Yotei Six to locate a hidden shrine. Intercept the shaman\'s party before she can reveal what the bones tell her.", steps:['Intercept the shaman\'s escort on the mountain path','Speak privately with the shaman — she is reluctant','Decide: help the shaman escape or send a decoy','If escaping: guide her through the mountain shortcut','Deliver her to the resistance safe house in Tokachi'], reward:'Bone Charm (damage resistance when below half health), 200 Mon' },
  { id:'st_21', title:'The Lighthouse Keeper', region:'Oshima Coast', time:'28 min', desc:"The Oshima lighthouse has been commandeered to guide Yotei Six supply ships. The keeper\'s daughter has been held as insurance for his cooperation. Rescue her and sabotage the light.", steps:['Scale the cliffs to the lighthouse base','Locate the daughter in the lower storage room','Free her and hide her in the sea cave below','Climb to the lamp room and dismantle the signal lens','Escape before the supply ship arrives and discovers the deceit'], reward:'Lighthouse Lens Fragment (decorative collectible), 275 Mon' },
  { id:'st_22', title:'The Rōnin\'s Debt', region:'Yotei Grasslands', time:'20 min', desc:"A rōnin who owes Atsu a favour from a past encounter has been captured while trying to repay his debt to a farmer. Free him, but decide whether he deserves another chance.", steps:['Track the rōnin to the occupied farm','Clear the farm outpost (six soldiers)','Speak to the rōnin and hear his side of the story','Question the farmer about what the rōnin allegedly did','Make the final call — pardon or judgment'], reward:'Rōnin\'s Blade (alternative sword skin), 150 Mon' },
  { id:'st_23', title:'The Mapmaker', region:'Nayoro Wilds', time:'20 min', desc:"A mapmaker has created the most accurate map of the occupied north ever assembled. The Yotei Six want it destroyed. Help him get it to the resistance — it could change the war.", steps:['Find the mapmaker at his forest studio','View the completed map (interactive)','Escort the mapmaker to the northern resistance contact','Repel the Yotei Six ambush at the river crossing','See the map safely delivered'], reward:'Northern Route Map (unlocks hidden path shortcuts on the map), 200 Mon' },
  { id:'st_24', title:'Iron Bells', region:'Teshio Ridge', time:'25 min', desc:"A temple\'s iron bells have been taken to be melted into weapons. The abbot believes their sound carries spiritual protection for the region. Recover them before they reach the forge.", steps:['Speak to the abbot at the temple ruins','Track the bell wagon across Teshio Ridge','Intercept the wagon convoy on the mountain road','Defeat the convoy escort (eight soldiers)','Return the bells to the temple site and ring them'], reward:'Temple Bell Fragment (decoration), Bell Resonance Charm (spirit generation), 225 Mon' },
  { id:'st_25', title:'Smoke Signals', region:'Tokachi Range', time:'18 min', desc:"Resistance fighters are using a smoke signal system but the Yotei Six have cracked the code. Update the signal system with a new pattern before the next scheduled message goes out.", steps:['Meet the resistance signal coordinator at the ridge station','Learn the old signal pattern (interactive)','Create the new encoded pattern with the coordinator','Update the three signal stations across the ridgeline','Confirm the new pattern reaches the receiving station'], reward:'Signal Torch (tool — creates diversionary smoke), 175 Mon' },
  { id:'st_26', title:'The Last Shrine Keeper', region:'Oshima Coast', time:'30 min', desc:"An elderly shrine keeper has maintained the coastal shrine alone through the occupation. She refuses to leave. The shrine contains the only known record of a drowned village\'s ancestors. Protect her and the records.", steps:['Find the shrine keeper at the coastal shrine','Examine the ancestral records she guards','Fortify the shrine approach with the available materials','Repel three waves of Yotei Six soldiers over the night','Help the keeper encode the records for safety'], reward:'Ancestral Scroll (Sumi-e painting location hint), 250 Mon' },
  { id:'st_27', title:'Blades in the Fog', region:'Yotei Grasslands', time:'22 min', desc:"A wandering duelist challenges every samurai she meets — she\'s searching for the warrior who killed her father. Defeat her honourably and learn the truth she does not know.", steps:['Find the duelist at the misty clearing','Accept her challenge (no option to refuse)','Win the duel — she is fast, use Moon Stance','Speak with her after the fight','Reveal the truth about her father\'s killer — or keep it hidden'], reward:'Fog Charm (movement in fog undetected), 200 Mon' },
  { id:'st_28', title:'The Herbalist\'s War', region:'Ishikari Plain', time:'20 min', desc:"An herbalist who supplies both the resistance and the Yotei Six (to stay neutral) has been discovered. The Yotei Six are coming for her. She needs help — and she doesn\'t trust Atsu fully yet.", steps:['Find the herbalist at her hillside garden','Earn her trust by helping gather three rare herbs','Warn her about the incoming Yotei Six party','Set up a defensive position in the garden','Repel the Yotei Six squad and convince her to relocate'], reward:'Herbalist\'s Bundle (restores full health on use, one-time), 200 Mon' },
  { id:'st_29', title:'The Waterfall Hermit', region:'Teshio Ridge', time:'18 min', desc:"A hermit living behind a waterfall claims to have found the Yotei Six\'s encrypted orders for the next season. But he will only give them to someone who can answer three riddles of the mountain.", steps:['Find the hidden cave behind the Teshio waterfall','Answer the first riddle (knowledge of the land)','Answer the second riddle (knowledge of war)','Answer the third riddle (knowledge of the heart)','Receive the encrypted orders and carry them to the resistance'], reward:'Encrypted Orders (side-quest item — affects Mythic Tale access), 150 Mon' },
  { id:'st_30', title:'Salt and Sorrow', region:'Nayoro Wilds', time:'25 min', desc:"Two rival families used to resolve disputes at the salt flats. Now one family has been enslaved and the other collaborates. Help the enslaved family reclaim their share of the flats and their dignity.", steps:['Speak to the enslaved family\'s elder at the camps','Confirm the rival family\'s collaboration','Confront the collaborating family — give them a chance to recant','Free the enslaved workers from the salt flat camp','Witness the first fair division of the salt harvest'], reward:'Sea Salt Block (crafting material), 225 Mon' },
  { id:'st_31', title:'The Cartographer\'s Son', region:'Oshima Coast', time:'20 min', desc:"A cartographer\'s son claims his father hid maps of every secret Yotei Six supply route inside his own body — tattooed on his back. He needs Atsu to copy them before the Yotei Six find him.", steps:['Find the cartographer\'s son at the harbour inn','View the back tattoo and begin copying (interactive)','Fend off the Yotei Six agents who arrive mid-session','Complete the copy before the agents regroup','Deliver the copied map to the resistance naval contact'], reward:'Supply Route Map (reveals three hidden Yotei Six caches), 250 Mon' },
  { id:'st_32', title:'The Oath Keeper', region:'Yotei Grasslands', time:'28 min', desc:"A soldier swore an oath to protect a village. He failed. Now he lives there in shame, doing chores. A new threat is coming — give him a chance to redeem the oath.", steps:['Find the soldier doing chores at the village edge','Learn about the oath he failed (two-part flashback scene)','Warn him about the incoming Yotei Six tax collector and his escort','Choose: fight alongside him or protect him from a distance','Watch him either redeem or fail the oath again'], reward:'Oath-Keeper\'s Charm (temporary invincibility after near-death, once per rest), 225 Mon' },
  { id:'st_33', title:'The Quiet Puppeteer', region:'Ishikari Plain', time:'22 min', desc:"A puppeteer has been performing anti-occupation satires under the nose of the Yotei Six by hiding the messages in a traditional tale. Help him perform one final, dangerous show.", steps:['Find the puppeteer setting up at the town square','Assist with the puppet rigging (interactive)','Watch the performance and intervene subtly when a soldier gets suspicious','Delay the Yotei Six officer until the finale concludes','Help the puppeteer escape before the angry soldiers arrive'], reward:'Puppet Head (decoration), 175 Mon' },
  { id:'st_34', title:'The Tea Master', region:'Tokachi Range', time:'20 min', desc:"A tea master has encoded resistance intelligence in the pattern of her tea ceremony. Help her perform the ceremony for the Yotei Six general — and ensure he drinks everything — so she can pass the message.", steps:['Meet the tea master at the mountain teahouse','Learn the encoded ceremony pattern (interactive)','Distract the general\'s bodyguards during the ceremony','Ensure the general drinks all four cups (do not let him stand early)','Escort the tea master to safety after the performance'], reward:'Tea Ceremony Set (decoration), Intelligence Report (affects Bounty Quest bnty_15), 200 Mon' },
  { id:'st_35', title:'The Ghost Story', region:'Nayoro Wilds', time:'18 min', desc:"Villagers are terrified by a \'ghost\' in the ruined manor — actually a resistance fighter using ghost legends to keep soldiers out. Help him maintain the ruse by staging one final haunting.", steps:['Enter the ruined manor at night','Meet the \'ghost\' inside and hear his situation','Stage the haunting at three key locations in the manor','Intercept the Yotei Six investigation squad and scare them off','Help the fighter use the evacuated manor as a long-term base'], reward:'Ghost\'s Lantern (cosmetic), 150 Mon' },
  { id:'st_36', title:'The Ink Painter', region:'Teshio Ridge', time:'25 min', desc:"An ink painter has been commissioned to paint the Yotei Six warlord\'s portrait. She has worked sabotage into the image — a hidden scene of his crimes visible only at certain angles. Help her deliver it without detection.", steps:['Find the painter finishing the portrait at her studio','Examine the hidden scene in the painting','Escort the painting to the fortress delivery point','Avoid the inspection at the checkpoint — hide the true image','Return to the painter once delivery is confirmed'], reward:'Ink Painting Scroll (Sumi-e location hint ×2), 225 Mon' },
  { id:'st_37', title:'Crossing Season', region:'Oshima Coast', time:'30 min', desc:"Fishing season has begun but the Yotei Six have blockaded the harbour. Every boat that leaves without permission is seized. Help the fishing families break the blockade — peacefully if possible.", steps:['Speak to the fishing elder at the harbour','Count the blockade vessels and guard complement','Find the harbour master\'s seal (stolen) — three search points','Use the seal to forge departure papers for the fleet','Escort the first three boats out — repel the patrol that doesn\'t accept the papers'], reward:'Fisher\'s Charm (underwater breath duration doubled), 275 Mon' },
  { id:'st_38', title:'The Miller\'s Wheel', region:'Yotei Grasslands', time:'18 min', desc:"The village mill has been running day and night making provisions for the Yotei Six. The miller has found a way to slow it down — he needs a few days of machinery breakdown to starve a key garrison. Help him fake it.", steps:['Meet the miller at the watermill','Learn which parts need to appear broken','Sabotage three mill components subtly','Intercept the Yotei Six inspector and delay his investigation','Repeat the sabotage if the inspector suspects foul play'], reward:'Mill Grain (crafting material), 150 Mon' },
  { id:'st_39', title:'The Soldier\'s Garden', region:'Ishikari Plain', time:'22 min', desc:"A Yotei Six soldier deserted and has been hiding for six months, tending a garden in an abandoned homestead. He wants to live peacefully. The resistance wants him for intelligence. Atsu must choose.", steps:['Find the deserter at the hidden homestead','Speak with him and assess his intentions','Inform the resistance of his location','Make the final call: hand him over, let him go, or offer a third path','Deal with the consequences of the choice'], reward:'Varies by choice — Garden Charm (stealth in grass) or Intelligence Bonus', },
  { id:'st_40', title:'River of Names', region:'Nayoro Wilds', time:'20 min', desc:"A tradition of floating paper lanterns for the dead has been banned. One woman insists on doing it anyway to mourn her children. Protect the ceremony from the patrol that will inevitably come.", steps:['Find the woman at the river bank at dusk','Help her fold and write three lanterns (interactive)','Light the lanterns and release them','Intercept the Yotei Six patrol before they reach the river','Hold them off until the lanterns pass from sight'], reward:'Lantern Paper (decoration), 175 Mon' },
  { id:'st_41', title:'The Silversmith\'s Bargain', region:'Oshima Coast', time:'25 min', desc:"A silversmith has been forced to mint coins bearing the warlord\'s face. He\'s secretly minting coins with the resistance symbol on one side. Help him ship a cache of the symbolic coins before the mint is inspected.", steps:['Speak to the silversmith at his hidden workshop','Examine the dual-face coins (collectible)','Locate the waterproof crate for shipping','Carry the crate to the resistance contact at the docks','Fend off the Yotei Six customs inspector and his escort'], reward:'Silver Coin Cache (sell for 500 Mon), Resistance Symbol Charm (morale buff)', },
  { id:'st_42', title:'The Wrestler\'s Pride', region:'Tokachi Range', time:'20 min', desc:"A champion sumo wrestler is being forced to fight for the Yotei Six\'s entertainment. He refuses to throw the match even under threat. Help him fight on his terms — and get out alive.", steps:['Find the wrestler at the mountain fighting ground','Speak to him before the forced bout','Watch the bout — interfere only if his life is threatened','When soldiers attack after he wins, fight alongside him','Escort him from the mountain before reinforcements arrive'], reward:'Wrestler\'s Belt (armour charm — grapple immunity), 200 Mon' },
  { id:'st_43', title:'Lost in the Pines', region:'Teshio Ridge', time:'18 min', desc:"A child wandered into the pine forest chasing what she called a \'golden deer\'. Track the child, find her, and decide what to make of the golden deer sighting she describes.", steps:['Speak to the distraught parents at the village edge','Track the child\'s footprints into the pine forest','Follow the child\'s trail through three waypoints','Find the child — unharmed, deep in the forest','Investigate the area for signs of the golden deer she described'], reward:'Golden Antler Fragment (rare crafting material), 150 Mon' },
  { id:'st_44', title:'The Poison Taster', region:'Nayoro Wilds', time:'22 min', desc:"A former Yotei Six poison taster now free from service has knowledge of every poison the Yotei Six use — and the antidotes. He\'s agreed to share, but only if Atsu recovers his stolen antidote stock first.", steps:['Find the former taster at the refuge village','Learn which garrison stole his antidotes','Infiltrate the garrison storeroom','Recover the antidote cases (three locations in the garrison)','Return to the taster and receive the full poison knowledge'], reward:'Antidote Pouch (immunity to poison status effect for duration of one battle), 225 Mon' },
  { id:'st_45', title:'The Night Market', region:'Oshima Coast', time:'20 min', desc:"A secret night market operates in an abandoned warehouse, trading in food, medicine, and information. The Yotei Six have learned its location. Help the market relocate before the raid.", steps:['Find the night market entrance','Warn the market organiser about the incoming raid','Help pack the most critical inventory into crates','Escort three carts to the new hidden location','Hold off the Yotei Six raid until all carts are clear'], reward:'Market Token (grants access to black-market vendor), 200 Mon' },
  { id:'st_46', title:'The Blind Archer', region:'Yotei Grasslands', time:'25 min', desc:"An archer who lost her sight in a battle still trains every day by sound. She claims she can still shoot — and she wants Atsu to confirm it by helping her take down a specific Yotei Six officer.", steps:['Find the blind archer at her training ground','Train alongside her — three accuracy challenges','Scout the Yotei Six officer\'s patrol route and report back','Position the archer at the correct vantage point','Guard her flanks during the shot'], reward:'Archer\'s Instinct Charm (brief slow-motion after a perfect parry), 225 Mon' },
  { id:'st_47', title:'The River Dragon\'s Tooth', region:'Ishikari Plain', time:'30 min', desc:"Fishermen say a river monster has been attacking boats — keeping both the Yotei Six and villagers off the water. Investigate, find out what the \'monster\' really is, and decide whether to reveal the secret.", steps:['Speak to the fisherfolk at the river camp','Borrow a boat and patrol the river at night','Investigate the \'attack\' site — search three wreckage points','Discover the truth about the monster (not what it seems)','Make the decision: expose the truth or help maintain the legend'], reward:'River Dragon Tooth (rare crafting material), 250 Mon' },
  { id:'st_48', title:'The Final Harvest', region:'Tokachi Range', time:'28 min', desc:"A farming village is attempting to bring in one last harvest before the Yotei Six requisition their land. Help them get the crops in, bale the grain, and secure a portion for themselves before the soldiers arrive at sundown.", steps:['Meet the village headwoman at the fields','Cut grain with the villagers — three field sections','Bale and stack the grain at the barn','Hide a reserve share in the underground cache','Hold off the Yotei Six requisition squad until the cache is sealed'], reward:'Grain Reserve (restores all supplies once), Farmer\'s Charm (resting heals more), 250 Mon' },
];

const MYTHIC_TALES: Quest[] = [
  {
    id:'myth_01', title:'The Voice in the Blizzard', region:'Teshio Ridge', time:'30 min', boss:false,
    desc:"A voice calling through the blizzard leads Atsu to a frozen shrine where the spirit of a warrior long dead asks for her help completing an unfinished ritual. A puzzle-focused tale with no combat.",
    steps:['Follow the voice into the blizzard (Spyglass guides direction)','Locate the frozen shrine on the ridge','Solve the offering puzzle: place stone, water, fire, and wind symbols in order','Survive the spirit trial — a test of patience, not combat','Receive the warrior\'s blessing and the hidden technique'],
    tip:"The offering order changes each playthrough. Examine the shrine\'s carved poem for the correct sequence — it always reads left to right.", tipLabel:'Puzzle Tip',
    reward:'Blizzard Stance ability (movement ignores snow terrain penalty), 1 Resolve Upgrade',
  },
  {
    id:'myth_02', title:'The Mountain God Trial', region:'Teshio Ridge', time:'45 min', boss:true,
    desc:"A mountain shrine tests worthy warriors with three waves of spirit guardians. The final wave includes an Elite Guardian immune to standard strikes.",
    steps:['Climb the shrine steps and ring the challenge bell','Wave 1: Four temple guardians in pairs — eliminate archers first','Wave 2: Six guardians plus a lightning shaman — kill the shaman first','Wave 3 (Final): Elite Guardian + four archers — use Spirit Abilities on the Elite, clear archers first with wind-blast'],
    tip:"Wind Stance\'s area attack is optimal for clearing archer clusters. Save Ghost Stance for the Elite Guardian in Wave 3.", tipLabel:'Combat Tip',
    reward:'Mountain God Charm (lightning resistance), Shrine Climb #9 unlocked, 4 Technique Points',
  },
  {
    id:'myth_03', title:'The Serpent Spirits of the Lake', region:'Nayoro Wilds', time:'40 min', boss:true,
    desc:"Twin serpent spirits have claimed a sacred lake and are preventing villagers from fishing its waters. Atsu must lure them out and defeat both simultaneously.",
    steps:['Craft the lure at the lakeside altar (gather three reagents)','Place the lure at the centre of the lake by boat','Phase 1: Fight Serpent A — water attacks, stay on the boat','Phase 2: Both serpents active — alternate targets, do not focus one too long or the other enrages','Phase 3 (Combined): Aerial attack phase — shoot the exposed heads mid-flight'],
    tip:"Alternating attack targets prevents either serpent from enraging. Mark both with the Spyglass and rotate every three hits.", tipLabel:'Boss Tip',
    reward:'Serpent Scale Armour (cosmetic), Lake Spirit Charm (water resistance), 3 Technique Points',
  },
  {
    id:'myth_04', title:'Storm Bear of Hokkaido', region:'Tokachi Range', time:'35 min', boss:true,
    desc:"A legendary bear spirit that commands lightning has awakened due to the Yotei Six\' disruption of the mountain. The Ainu elder asks Atsu to either pacify or defeat the Storm Bear.",
    steps:['Speak to the Ainu elder at the sacred grove','Follow the lightning storm to the bear\'s location','Attempt pacification: play the sacred drum (interactive rhythm minigame)','If pacification fails, enter combat — Phase 1: standard bear attacks','Phase 2: Lightning aura active — attack only between lightning bursts','Receive the Ainu elder\'s blessing regardless of outcome'],
    tip:"The pacification rhythm minigame has a pattern of 4-3-4-2 beats. Success gives a better reward than combat victory.", tipLabel:'Minigame Tip',
    reward:'Bear Hide Amulet (health regeneration on kill), Storm Bear Pelt (crafting material), 3 Technique Points',
  },
  {
    id:'myth_05', title:"The Ancestor's Blade", region:'Ishikari Plain', time:'35 min', boss:false,
    desc:"An ancient blade belonging to Atsu\'s ancestral line has been discovered in a collapsed shrine vault. To reclaim it, Atsu must complete three tests left by the ancestor who hid it.",
    steps:['Locate the shrine vault entrance at the Ishikari ruins','Test 1: Combat trial — defeat ten ghostly samurai without taking damage','Test 2: Stealth trial — cross the spirit plain without being seen by the spirit sentinels','Test 3: Wisdom trial — answer three questions about the family\'s history','Claim the Ancestor\'s Blade from the vault altar'],
    tip:"The spirit sentinels in Test 2 only see in a narrow cone forward. Crouch-moving at oblique angles bypasses all three.", tipLabel:'Stealth Tip',
    reward:"Ancestor's Blade (alternate sword skin with unique kill animation), 2 Resolve Upgrades",
  },
  {
    id:'myth_06', title:'Guardian of the Crescent Moon', region:'Oshima Coast', time:'40 min', boss:true,
    desc:"A coastal shrine\'s guardian spirit has been corrupted by the Yotei Six\'s desecration of the moon-viewing platform. Atsu must purify the shrine and then face the corrupted guardian.",
    steps:['Reach the moon-viewing platform on the coastal cliff','Purify three shrine stones at surrounding waypoints (each guarded)','Return to the platform at moonrise (wait if necessary)','Phase 1: Corrupted guardian — blue energy shield, use charged attacks to break it','Phase 2: Shield down — aggressive melee phase, parry or dodge the crescent sweep'],
    tip:"The crescent sweep follows the guardian\'s body turning left — watch his right shoulder. When it drops, the sweep is coming. Dodge right.", tipLabel:'Boss Tip',
    reward:'Crescent Moon Token (bow damage amplified), Shrine Climb #11 unlocked, 3 Technique Points',
  },
  {
    id:'myth_07', title:'The Dragon Ascending', region:'Yotei Grasslands', time:'25 min', boss:false,
    desc:"The completion myth — a dragon spirit tied to the land of Yotei asks Atsu to restore the four elemental shrines damaged during the Yotei Six\'s desecration campaign. A meditative final tale.",
    steps:['Receive the dragon\'s vision at the Yotei summit viewpoint','Restore the Earth Shrine (Tokachi Range — one combat encounter)','Restore the Water Shrine (Nayoro Wilds — one puzzle)','Restore the Fire Shrine (Teshio Ridge — one stealth section)','Restore the Wind Shrine (Yotei Grasslands — timed sprint challenge)','Return to the Yotei summit and complete the ritual'],
    reward:"Dragon Ascending Charm (all elemental resistances), Atsu's Journal entry — final page, 4 Technique Points",
  },
];

const SENSEI_TALES: Quest[] = [
  { id:'sen_01', title:'Jubei\'s Burden', region:'Yotei Grasslands', time:'25 min', ally:'Jubei', desc:"Atsu\'s oldest companion is haunted by a choice he made years ago. Help him confront the man he wronged — now a Yotei Six collaborator — and find out if forgiveness is still possible.", steps:['Follow Jubei to the collaborator\'s estate','Overhear the argument — do not intervene yet','Decide when to step in (three decision points)','Deal with the collaborator based on Jubei\'s final wish','Share sake with Jubei that night'], reward:'Jubei joins as a full combat ally (optional in future missions), 300 Mon' },
  { id:'sen_02', title:'Yuna\'s Fire', region:'Ishikari Plain', time:'28 min', ally:'Yuna', desc:"Yuna, Atsu\'s healer ally, must return to her home village — the same village where a Yotei Six massacre killed her family. Face the past together.", steps:['Travel to the village with Yuna','Investigate the massacre site — three examination points','Find the Yotei Six officer responsible (he is still stationed nearby)','Let Yuna make the decision on what to do','Protect her during the confrontation'], reward:'Yuna unlocked as a combat healer ally, Medicine Pouch (upgraded capacity), 250 Mon' },
  { id:'sen_03', title:'Kenji\'s Gamble', region:'Oshima Coast', time:'22 min', ally:'Kenji', desc:"The merchant Kenji bet everything on a shipment that the Yotei Six intercepted. Help him recover his cargo and the debt-note that could ruin him.", steps:['Meet Kenji at the Oshima docks','Locate the seized cargo ship in the harbour','Board the ship undetected and find the cargo manifest','Recover the three stolen crates','Get Kenji\'s debt-note from the harbour-master\'s strongbox'], reward:'Kenji opens a black-market shop (exclusive items available at camp), 200 Mon' },
  { id:'sen_04', title:'Masako\'s Honour', region:'Tokachi Range', time:'30 min', ally:'Masako', desc:"Masako, a disgraced warrior, seeks to reclaim her family\'s honour by eliminating the man who falsely accused her father. Track and confront him in the Tokachi highlands.", steps:['Follow Masako to the highland estate','Scout the estate for the target\'s location','Create a diversion to draw the target outside','Let Masako deliver the judgment — guard her flanks','Escape the estate after the confrontation'], reward:'Masako joins as a duelist ally, Family Mon (decoration), 275 Mon' },
  { id:'sen_05', title:'Rin\'s Song', region:'Nayoro Wilds', time:'20 min', ally:'Rin', desc:"The young musician Rin wants to perform at the resistance gathering — but her music is a coded message only certain ears can decode. Help her reach the gathering safely.", steps:['Escort Rin through the Nayoro forest path','Repel the first patrol (four soldiers)','Help Rin set up her instrument at the gathering site','Stand watch during the performance','Decode the final message she embeds in the last song'], reward:'Rin\'s String (adds music cue to camp), Coded Intelligence (affects Bounty Quest bnty_09), 175 Mon' },
  { id:'sen_06', title:'Nao\'s Return', region:'Yotei Grasslands', time:'25 min', ally:'Nao', desc:"Nao, a former Yotei Six medic who defected, must return to retrieve the field records she left behind — records that could save resistance fighters\' lives.", steps:['Travel to the field hospital site with Nao','Locate the buried records case (three dig spots)','Repel the Yotei Six patrol during excavation','Help Nao sort the records and destroy the incriminating ones','Escort her back to the resistance camp'], reward:'Nao joins as a field medic ally (passive healing in camp after rests), 225 Mon' },
  { id:'sen_07', title:'Taka\'s Forge', region:'Tokachi Range', time:'30 min', ally:'Taka', desc:"The blacksmith Taka has the skills to upgrade Atsu\'s equipment but his forge was destroyed. Help him rebuild it and secure the rare materials he needs.", steps:['Speak to Taka at the ruined forge site','Gather forge stone from the quarry (requires clearing the quarry camp)','Gather bellows leather from the tannery (stealth recommended)','Gather charcoal from the riverside woodcutters (no combat)','Help Taka rebuild and fire the forge for the first time'], reward:'Taka\'s Forge unlocked (weapon and armour upgrade services available), 250 Mon' },
  { id:'sen_08', title:'Fumiko\'s Promise', region:'Ishikari Plain', time:'22 min', ally:'Fumiko', desc:"The archer Fumiko promised to protect a specific family through the occupation. That family is now in danger. Help her keep the promise even though it means going behind enemy lines.", steps:['Reach the family\'s location with Fumiko','Assess the threat — a Yotei Six garrison has moved in adjacent','Infiltrate the garrison and create a safe extraction window','Escort the family out during the diversion','Get everyone to the safe zone before the window closes'], reward:'Fumiko joins as a ranged ally (archer support in combat), Yew Bow Quiver (arrow capacity), 225 Mon' },
  { id:'sen_09', title:'Old Hayato\'s Last Lesson', region:'Teshio Ridge', time:'35 min', ally:'Hayato', desc:"Hayato, an elderly sword master, wants to teach Atsu one final technique before his age takes his ability to demonstrate it. But the lesson site is in occupied territory.", steps:['Travel to the mountain dojo with Hayato','Clear the dojo of the Yotei Six soldiers who now occupy it','Help Hayato restore the training equipment','Undergo the final lesson — a combat technique challenge','Master the technique in three attempts'], reward:'Hayato\'s Technique (new combat ability: Falling Leaf counter), Hayato joins as a trainer ally, 300 Mon' },
  { id:'sen_10', title:'The Twins\' Pact', region:'Nayoro Wilds', time:'25 min', ally:'Sora & Riku', desc:"Twin siblings who once worked for the Yotei Six as scouts have defected and want to help — but the resistance doesn\'t trust them. Help prove their loyalty through one dangerous joint mission.", steps:['Meet Sora and Riku at the resistance outpost','Accept the joint scouting mission','Scout three Yotei Six garrison positions with the twins','Complete the mission without alerting any garrison','Present the scouting report to the resistance leader'], reward:'Sora & Riku join as scouts (reveal nearby collectibles on map), 200 Mon' },
  { id:'sen_11', title:'Aiko\'s Memory', region:'Oshima Coast', time:'20 min', ally:'Aiko', desc:"Aiko, a former court lady, knows the Yotei Six warlord\'s private schedule — because she was once his prisoner. Help her record her testimony for the resistance.", steps:['Speak to Aiko at the coastal refuge','Record three testimony sessions (interactive choices)','Protect Aiko when Yotei Six agents locate the refuge','Help her encode the testimony for secure transport','See the testimony on its way to the resistance council'], reward:'Aiko joins as an intelligence ally (reveals Yotei Six patrol routes on map), 200 Mon' },
  { id:'sen_12', title:'Daisuke\'s Vow', region:'Yotei Grasslands', time:'28 min', ally:'Daisuke', desc:"A warrior priest who vowed never to draw his blade again is now the only person who knows how to disarm a Yotei Six trap that will kill dozens. Convince him to break his vow — or find another way.", steps:['Find Daisuke at the hidden temple','Explain the trap situation and appeal to his conscience','Explore alternative solutions (two non-combat options)','If no alternative: assist Daisuke as he breaks his vow for the first time','Disarm the trap and return Daisuke to the temple'], reward:'Daisuke joins as a support ally (defence abilities), 275 Mon' },
  { id:'sen_13', title:'Hanako\'s Garden', region:'Ishikari Plain', time:'18 min', ally:'Hanako', desc:"The herbalist Hanako needs rare medicinal plants only found in an occupied imperial garden. Sneak in, gather them, and get out — it\'s lighter than it sounds.", steps:['Meet Hanako at the garden wall','Scout the guard rotation from the wall','Enter the garden undetected','Gather four specific herbs (marked locations)','Exit before the shift change triggers the alarm'], reward:'Hanako joins as a herbalist ally (passive: additional items spawn at rest sites), 175 Mon' },
  { id:'sen_14', title:'Goro\'s Redemption', region:'Tokachi Range', time:'30 min', ally:'Goro', desc:"Goro used to run prisoners for the Yotei Six. He wants to free every prisoner in the facility he once guarded. He knows the layout — you provide the muscle.", steps:['Meet Goro at the facility perimeter','Receive the facility blueprint from Goro','Clear the guard house first (eight guards)','Open the four cell blocks in sequence','Escort all survivors out the eastern passage'], reward:'Goro joins as a former-insider ally (opens locked doors without tools), 300 Mon' },
  { id:'sen_15', title:'The Shrine Keeper\'s Daughter', region:'Nayoro Wilds', time:'22 min', ally:'Misaki', desc:"Misaki maintains a secret shrine to the old spirits — the same spirits the Yotei Six claim to invoke for authority. Help her perform a ritual that will expose that claim as false.", steps:['Find Misaki at the hidden shrine','Learn the contradicting ritual (interactive)','Gather the three real spirit offerings (vs. the fake ones the Yotei Six use)','Perform the ritual at three public sites simultaneously','Escape the Yotei Six patrol that comes to silence the ritual'], reward:'Misaki joins as a shrine-keeper ally (shrine climbs cost no time), 225 Mon' },
  { id:'sen_16', title:'The Fisherman\'s Net', region:'Oshima Coast', time:'20 min', ally:'Tarō', desc:"Tarō, an aging fisherman, knows every inlet and hidden cove on Oshima Coast — perfect for smuggling resistance supplies. But his boat is impounded. Get it back.", steps:['Find Tarō at the harbour inn','Locate the impound dock (three possible locations)','Identify Tarō\'s specific boat','Create a distraction at the harbour master\'s office','Sail the boat out to the rendezvous point'], reward:'Tarō joins as a maritime ally (sea routes unlock additional fast-travel points), 200 Mon' },
  { id:'sen_17', title:'Yoshi\'s Brothers', region:'Yotei Grasslands', time:'25 min', ally:'Yoshi', desc:"Yoshi\'s two younger brothers are both working for the Yotei Six — one willingly, one under duress. Help Yoshi confront both and bring the family back together.", steps:['Speak to Yoshi at the resistance camp','Locate the brother under duress (he is in a work camp)','Free that brother and bring him to Yoshi','Locate the willing collaborator brother','Give Yoshi the choice of how to handle the confrontation'], reward:'Yoshi joins as a morale ally (camp morale affects supply drops), 250 Mon' },
  { id:'sen_18', title:'Lady Chiyo\'s Letter', region:'Teshio Ridge', time:'22 min', ally:'Chiyo', desc:"Lady Chiyo has a letter that could fracture the Yotei Six leadership — a private communication exposing betrayal among their ranks. Help her get it to the right hands before it\'s found.", steps:['Meet Lady Chiyo at the mountain refuge','Examine the letter and understand its implications','Identify the best recipient within the Yotei Six (intelligence check)','Arrange the delivery through a double agent','Escape the investigation that follows the letter\'s receipt'], reward:'Chiyo joins as a political ally (reveal Yotei Six internal conflicts, unlocking easier quests), 275 Mon' },
  { id:'sen_19', title:'The Retired General', region:'Ishikari Plain', time:'30 min', ally:'General Sato', desc:"A retired general who once served the warlord now lives in disgrace and obscurity. His tactical mind could be the resistance\'s greatest asset — if Atsu can convince him it\'s not too late to fight.", steps:['Find the general at his isolated estate','Sit with him and discuss the current military situation','Pass his test: answer three tactical questions correctly','Show him evidence of the warlord\'s current crimes','Wait for his decision — the general makes the final choice himself'], reward:'General Sato joins as a tactical ally (patrol routes revealed on map after rests), 300 Mon' },
  { id:'sen_20', title:'Emi\'s Choice', region:'Nayoro Wilds', time:'25 min', ally:'Emi', desc:"The final Sensei Tale. Emi, Atsu\'s most recent ally, must make a decision about her own future — and Atsu must support her, whatever she chooses. A quiet, character-driven conclusion to the Sensei arcs.", steps:['Find Emi at the Nayoro reflection pool','Hear her dilemma in full (no interruptions)','Share your own perspective when asked','Walk with her to the place where her choice becomes real','Witness her decision and say goodbye or see her off'], reward:'Emi\'s Compass (permanent bonus: all allies gain +1 combat effectiveness), 300 Mon, all Sensei Tales trophy unlocked' },
];

const BOUNTY_QUESTS: Quest[] = [
  { id:'bnty_01', title:'The Reed Cutter', region:'Yotei Grasslands', time:'15 min', target:'Hashimoto Jiro — armed bandit', desc:"Hashimoto Jiro extorts river villages under the cover of being a Yotei Six tax collector. He is not — but the villages don\'t know that.", steps:['Check the bounty board in Kasabe','Track Jiro to the reed beds south of the river','Confront him — he offers a bribe (accept or refuse)','Defeat him if he refuses to surrender','Return the extorted funds to the villages'], reward:'150 Mon bounty, 1 Technique Point' },
  { id:'bnty_02', title:'The Poisoned Well', region:'Yotei Grasslands', time:'18 min', target:'Tanaka Rei — poison dealer', desc:"Tanaka Rei has been selling poisoned food stocks to resistance-aligned villages. Track her to her underground warehouse.", steps:['Get the tip from the bounty board or town elder','Scout the warehouse district at night','Identify Rei among the warehouse workers','Capture or defeat her','Seize and destroy the poison stock'], reward:'175 Mon, Antidote Sample (crafting)' },
  { id:'bnty_03', title:'Wolf of the Grasslands', region:'Yotei Grasslands', time:'20 min', target:'Kitagawa Ohma — mercenary captain', desc:"Ohma leads a mercenary unit that preys on refugees. He fights dirty and always has backup.", steps:['Locate the mercenary camp north of Kasabe','Scout the camp layout — seven fighters plus Ohma','Engage at your preferred approach','Defeat Ohma — he will flee at low health, cut off his escape','Confirm the kill and collect the bounty seal'], reward:'250 Mon, Mercenary Armour piece (cosmetic)' },
  { id:'bnty_04', title:'Black Powder Ippei', region:'Oshima Coast', time:'20 min', target:'Ippei the Powder Man — explosives dealer', desc:"Ippei supplies the Yotei Six with black powder bombs. Track him to his cache before the next shipment deploys. Known bug: if Oshima Coast was cleared before this quest, Ippei may not spawn — fast-travel away and return to reset.", steps:['Check the Oshima Coast bounty board','Track Ippei to his cache site on the cliff path','Disarm his perimeter bombs (three spots)','Confront Ippei — he will detonate a trap if cornered','Defeat him and destroy the remaining powder cache'], reward:'200 Mon, Black Powder Flask (grenade-equivalent tool)' },
  { id:'bnty_05', title:'The Ghost of Mori Bay', region:'Oshima Coast', time:'22 min', target:'Unnamed sea raider — piracy', desc:"A masked raider has been sinking fishing boats at night, claiming to be a sea spirit. They are not. Track and unmask them.", steps:['Speak to the harbour master about the sinkings','Patrol the bay at night by boat','Intercept the raider\'s vessel','Board and fight the raider\'s crew (five fighters)','Unmask the raider and decide their fate'], reward:'225 Mon, Raider\'s Mask (cosmetic)' },
  { id:'bnty_06', title:'The Tax Ghost', region:'Oshima Coast', time:'15 min', target:'Mori Sachi — fraudulent tax clerk', desc:"Sachi has been pocketing Yotei Six taxes before they reach the garrison — dangerous for her but also for the villages she uses as cover.", steps:['Obtain the ledger discrepancy report','Find Sachi at the harbour administration office','Confront her with evidence','Arrest or allow her to repay and flee','Submit the corrected ledger to protect the villages'], reward:'150 Mon, Ledger Seal (used in another bounty)' },
  { id:'bnty_07', title:'The Knife Collector', region:'Ishikari Plain', time:'20 min', target:'Watanabe Tōru — serial killer', desc:"Tōru has been killing travellers on the Ishikari road, taking one item from each victim. Track him through the evidence he left behind.", steps:['Examine the three crime scenes on the road','Identify the pattern in the items taken','Track Tōru to his isolated homestead','Search the homestead for the collection','Confront Tōru — he will not surrender willingly'], reward:'200 Mon, Commemorative Blade (decoration — a victim\'s knife)' },
  { id:'bnty_08', title:'Iron Fist Noboru', region:'Ishikari Plain', time:'25 min', target:'Noboru — extortion boss', desc:"Noboru runs a protection racket across the Ishikari settlements. He has five lieutenants who must be removed first to get to him.", steps:['Identify Noboru\'s lieutenants (five bounty board sub-entries)','Eliminate or capture each lieutenant','Force a meeting with Noboru directly','Defeat his personal guard (four fighters)','Bring Noboru in — dead or alive'], reward:'300 Mon, Extortion Ledger (evidence, can be used for a side tale)' },
  { id:'bnty_09', title:'The Music Thief', region:'Ishikari Plain', time:'15 min', target:'Osamu — cultural looter', desc:"Osamu has been stealing instruments, scores, and cultural artefacts. He works for a Yotei Six officer who collects them. Recover the stolen goods.", steps:['Get the tip (affected by Rin\'s Song completion)','Locate Osamu\'s storeroom in the occupied market','Recover the three most critical instruments','Confront Osamu','Return the instruments to the resistance musicians'], reward:'175 Mon, Recovered Shamisen (decoration)' },
  { id:'bnty_10', title:'The False Monk', region:'Teshio Ridge', time:'18 min', target:'Reverend Kumo — fraud', desc:"Kumo poses as a Buddhist monk to extort donations and sell false relics. His relic trade funds Yotei Six intelligence work.", steps:['Identify Kumo at the roadside shrine','Expose his fraud to three donation-givers','Follow Kumo when he flees the shrine','Confront him at his hidden cache','Recover the false relics and real funds'], reward:'175 Mon, False Relic (amusing decoration)' },
  { id:'bnty_11', title:'The Storm Hawk', region:'Teshio Ridge', time:'25 min', target:'Hayashi Ren — highwayman', desc:"Ren\'s gang hits mountain travellers during storms when visibility is low. They know the ridge paths better than anyone.", steps:['Check the Teshio bounty board during storm weather','Wait for a storm to activate the bounty (rest if needed)','Follow the storm patrol\'s trail on the ridge','Ambush the ambushers — gang of six','Defeat Ren in single combat after her gang falls'], reward:'250 Mon, Storm Hawk Blade (alternate sword skin)' },
  { id:'bnty_12', title:'The Deserter Network', region:'Teshio Ridge', time:'30 min', target:'Network of three Yotei Six deserters turned criminals', desc:"Three deserters are extorting their own former comrades. Track all three simultaneously before they warn each other.", steps:['Get all three names from the bounty board','Locate all three targets on the ridge (they are spread out)','Neutralise Target A without alerting B or C','Neutralise Target B before A\'s absence is noticed','Confront Target C — he is armed and paranoid'], reward:'275 Mon, Deserter\'s Cloak (stealth armour piece)' },
  { id:'bnty_13', title:'The Black Physician', region:'Tokachi Range', time:'20 min', target:'Dr. Mitsui — illegal experimentation', desc:"Dr. Mitsui conducts harmful experiments on prisoners for the Yotei Six. Locate his mobile laboratory and shut it down.", steps:['Follow the intelligence tip to the mountain laboratory','Rescue the three current prisoners','Destroy the laboratory equipment','Confront Dr. Mitsui','Recover and deliver the experiment records to evidence'], reward:'225 Mon, Medical Kit (high-quality healing item ×3)' },
  { id:'bnty_14', title:'The Gambling Lord', region:'Tokachi Range', time:'18 min', target:'Fujiwara Gon — corruption', desc:"Gon runs an illegal gambling ring that manipulates the outcomes and is using the money to buy influence within the resistance. Root him out.", steps:['Infiltrate the gambling den as a player','Observe three rounds of manipulation','Confront Gon privately with the evidence','Defeat his bodyguards when he refuses to cooperate','Seize the manipulation records'], reward:'200 Mon, Loaded Dice (decoration), 50 Mon from seized funds' },
  { id:'bnty_15', title:'The Silk Road Killer', region:'Tokachi Range', time:'25 min', target:'Unmarked — serial killer on trade route', desc:"Merchants on the Tokachi trade route have been killed. The killer is methodical and leaves no obvious trace. This bounty is affected by the Tea Master side tale.", steps:['Examine the four crime scenes on the trade route','Use the intelligence from Tea Master (if completed) to narrow the suspect','Set a trap at the most likely next attack site','Capture the killer during the trap','Identify them — the truth is not what it seems'], reward:'250 Mon, Silk Road Pin (decoration)' },
  { id:'bnty_16', title:'River Rat Saburo', region:'Nayoro Wilds', time:'15 min', target:'Saburo — boat thief', desc:"Saburo steals resistance supply boats and sells them back to the Yotei Six. Simple and direct — just hard to catch.", steps:['Watch the river at the supply dock at night','Catch Saburo mid-theft','Chase him along the river bank','Bring him down before he reaches the Yotei Six checkpoint','Recover the most recently stolen boat'], reward:'150 Mon, Recovered Supply Boat (unlocks river route shortcut)' },
  { id:'bnty_17', title:'The Honey Trap', region:'Nayoro Wilds', time:'22 min', target:'Shizuka — intelligence double agent', desc:"Shizuka poses as a resistance sympathiser while feeding information to the Yotei Six. Unmask and capture her before the next intelligence meeting.", steps:['Receive the tip through the resistance network','Observe Shizuka\'s behaviour at the meeting (do not intervene)','Follow her to her Yotei Six contact','Intercept the handoff','Bring Shizuka to the resistance for questioning'], reward:'200 Mon, Double Agent\'s Seal (unlocks a Yotei Six informant as a permanent ally)' },
  { id:'bnty_18', title:'The Bear Pit Manager', region:'Nayoro Wilds', time:'20 min', target:'Haruki — animal cruelty', desc:"Haruki runs an illegal bear-fighting ring for the Yotei Six. The bears are treated terribly. Shut it down and release the animals.", steps:['Locate the hidden fighting ground in the Nayoro forest','Eliminate or scatter the Yotei Six audience soldiers','Confront Haruki and his personal guards (three)','Release the four bears from their enclosures','Ensure the bears do not charge the village'], reward:'200 Mon, Bear Claw Charm (melee damage bonus)' },
  { id:'bnty_19', title:'The Oshima Smuggler', region:'Oshima Coast', time:'18 min', target:'Denzo — weapons smuggling', desc:"Denzo smuggles Yotei Six weapons to criminal groups in exchange for intelligence on resistance movements.", steps:['Locate Denzo\'s smuggling boat in the southern coves','Board the boat during the transfer','Capture Denzo without sinking the boat','Secure the weapons manifest','Deliver Denzo to the coastal resistance post'], reward:'175 Mon, Confiscated Blade (Tier 2 weapon alternative)' },
  { id:'bnty_20', title:'The Signal Breaker', region:'Teshio Ridge', time:'20 min', target:'Nakano Ryu — signal saboteur', desc:"Ryu has been disrupting resistance communication signals using a stolen device. Locate and recover the device.", steps:['Track the signal disruption to its source zone','Search three possible building locations in the zone','Find Ryu at his signal station','Defeat his guards (five soldiers)','Recover the signal device and bring it to the resistance'], reward:'200 Mon, Signal Device (resistance tool — reveals Yotei Six positions for one region)' },
  { id:'bnty_21', title:'The Poison Orchard', region:'Ishikari Plain', time:'22 min', target:'Umeda Fū — agri-saboteur', desc:"Fū has been contaminating fruit orchards that supply the resistance. Find her before the harvest.", steps:['Identify the contaminated orchards (three examination points)','Track the contamination pattern to Fū\'s base camp','Approach the camp carefully — she has traps set','Disarm the perimeter traps (three)','Confront Fū and recover the contamination records'], reward:'225 Mon, Orchard Access (fresh produce restores status effects for five rests)' },
  { id:'bnty_22', title:'The Cage Builder', region:'Nayoro Wilds', time:'18 min', target:'Tadashi — slavery infrastructure', desc:"Tadashi builds and installs the mobile prison cages used to transport resistance prisoners. Destroy his workshop and stop the next batch of cages.", steps:['Locate Tadashi\'s workshop near the Nayoro road','Assess the cage inventory (eight cages)','Destroy all cages before confronting Tadashi','Defeat Tadashi and his two guards','Burn the workshop blueprints'], reward:'200 Mon, Freed Prisoner (one resistance prisoner released immediately)' },
  { id:'bnty_23', title:'Nayoro Blade One: The Trapper', region:'Nayoro Wilds', time:'15 min', target:'Ito Masa — animal trapper', desc:"Ito sets illegal traps across Nayoro that injure both animals and villagers. One of nine Nayoro Wilds bounties.", steps:['Locate and disarm three active traps','Follow the tracks from the trap sites','Find Ito at his base camp','Confront him — he is alone','Return the trap-making tools for destruction'], reward:'150 Mon' },
  { id:'bnty_24', title:'Nayoro Blade Two: The Extorter', region:'Nayoro Wilds', time:'15 min', target:'Sakai Bun — extortion', desc:"Sakai extorts the northern settlements with threats of violence. One of nine Nayoro Wilds bounties.", steps:['Get the complaint at the settlement elder\'s post','Track Sakai to his river camp','Defeat Sakai and his three men','Return the extorted goods to the settlement'], reward:'150 Mon' },
  { id:'bnty_25', title:'Nayoro Blade Three: The Informant', region:'Nayoro Wilds', time:'18 min', target:'Unnamed — informant', desc:"An informant has been selling refugee locations to Yotei Six patrols. Three refuges have been compromised this week alone.", steps:['Cross-reference the three compromised refuges','Identify common visitors across all three','Locate the informant at the market','Confront them with the evidence','Capture — do not kill, the information they carry is valuable'], reward:'175 Mon, Informant\'s Contact List (affects two later bounties)' },
  { id:'bnty_26', title:'Nayoro Blade Four: The Arsonist', region:'Nayoro Wilds', time:'20 min', target:'Koga Shin — arson', desc:"Shin burns the crops of families who refuse to quarter Yotei Six soldiers. Three fires this month.", steps:['Investigate the three burn sites','Find the accelerant trail from the most recent fire','Track the trail to Shin\'s hideout','Defeat Shin and his two fire-setter accomplices','Recover the accelerant supply and destroy it'], reward:'200 Mon' },
  { id:'bnty_27', title:'Nayoro Blade Five: The River Blocker', region:'Nayoro Wilds', time:'18 min', target:'Yamada Kō — resource denial', desc:"Kō has dammed the northern branch of the Nayoro River, cutting off water to three downstream villages.", steps:['Inspect the dam site on the north branch','Locate Kō at his dam control post','Defeat the guards at the post (five soldiers)','Confront Kō and force him to remove the dam','Confirm water flow resumes before leaving'], reward:'175 Mon' },
  { id:'bnty_28', title:'Nayoro Blade Six: The Debt Collector', region:'Nayoro Wilds', time:'20 min', target:'Ogawa Ren — illegal debt enforcement', desc:"Ren enforces illegal debts for a Yotei Six-aligned money-lender, using violence against families who can\'t pay.", steps:['Receive three simultaneous complaint reports','Prioritise the family most at immediate risk','Intervene before Ren\'s crew reaches them','Defeat Ren\'s crew (six fighters)','Bring Ren to the resistance court'], reward:'200 Mon, Debt Ledger (cancels fake debts for those three families)' },
  { id:'bnty_29', title:'Nayoro Blade Seven: The Fence', region:'Nayoro Wilds', time:'18 min', target:'Imai Tō — receiving stolen goods', desc:"Tō fences stolen resistance weapons back to the Yotei Six. Locate his warehouse and recover the weapons.", steps:['Identify Tō from the contact list (affected by Nayoro Blade Three)','Locate the warehouse on the river bend','Break in during the night shift','Recover the five weapon caches','Confront Tō on his return'], reward:'175 Mon, Two recovered weapons returned to resistance armoury' },
  { id:'bnty_30', title:'Nayoro Blade Eight: The Logger Boss', region:'Nayoro Wilds', time:'22 min', target:'Fujii Gan — forced labour', desc:"Gan runs a forced logging operation using resistance prisoners as labour. Free the workers and bring him in.", steps:['Locate the logging camp in the Nayoro forest','Count the workers and guards (eight and twelve)','Create a distraction at the tool shed','Free all eight workers during the confusion','Confront Gan as the workers flee'], reward:'225 Mon, Lumber Worker\'s Thanks (unlocks resistance crafting material deliveries)' },
  { id:'bnty_31', title:'Nayoro Blade Nine: The Captain', region:'Nayoro Wilds', time:'30 min', target:'Captain Shiro — Yotei Six field officer', desc:"The final Nayoro Wilds bounty. Captain Shiro coordinates all Yotei Six operations in the north. Defeating him disrupts the entire regional command structure.", steps:['Gather intelligence from the eight previous Nayoro Wilds bounties (at least five required)','Locate Shiro\'s mobile command post','Clear the outer guard ring (ten soldiers)','Fight your way into the command tent','Defeat Captain Shiro — he uses two blades and has a shield wall ability'],
    tip:"Captain Shiro switches to defensive stance after losing 50% health. Break his shield wall with a fully-charged heavy attack, then punish.", tipLabel:'Boss Tip',
    reward:'450 Mon, Northern Command Seal (major quest item), 3 Technique Points, Nayoro Wilds Pacified (trophy progress)' },
];

const POST_STORY: Quest[] = [
  {
    id:'ps_01', title:'Embers of the Snake', region:'Yotei Grasslands', time:'30 min', boss:false,
    prereq:'Complete Main Story',
    desc:"Epilogue: The Snake\'s surviving followers have gathered in Kasabe, swearing revenge. Atsu returns to the village where it all began to confront the legacy of the man she killed.",
    steps:['Return to Kasabe village after the credits','Speak to the village headwoman about the gathering threat','Locate the Snake\'s survivors (three groups, spread across the grasslands)','Confront each group — some may be reasoned with','Return to Kasabe for the final scene'],
    reward:'Snake\'s Sash (decoration), Kasabe Charm (home region — minor health regeneration), 300 Mon',
  },
  {
    id:'ps_02', title:'The Weight of Silence', region:'Nayoro Wilds', time:'25 min', boss:false,
    prereq:'Complete Jubei\'s Burden (Sensei Tale)',
    desc:"Jubei\'s questline conclusion: the weight of everything they have been through comes to bear. A quiet, dialogue-driven chapter with no combat.",
    steps:['Find Jubei at the Nayoro reflection pool','Sit with him through the night scene','Answer his three questions honestly','Walk with him to the place he has chosen for his memorial','Leave the memorial offering'],
    reward:'Jubei\'s Journal (decoration), Companion Bond complete, 250 Mon',
  },
  {
    id:'ps_03', title:'Yōtei at First Snow', region:'Yotei Grasslands', time:'20 min', boss:false,
    prereq:'Complete both other post-story quests + all Sensei Tales',
    desc:"The true ending. Atsu climbs to the summit of Mount Yōtei on the first snow of winter. A meditative conclusion to the full 100% completion journey.",
    steps:['Wait for the first snow (rest at camp until triggered)','Begin the ascent of Mount Yōtei alone','Encounter three vision sequences on the way up — observe each fully','Reach the summit','Plant the memorial for all those lost during the journey'],
    tip:"This quest unlocks the secret Platinum Trophy dialogue and the final journal page. Make sure all Sensei Tales and both other post-story quests are complete first.", tipLabel:'Completion Note',
    reward:'Platinum Trophy path completes, Final Journal Page, Summit Charm (all stats +5%), True Ending credit sequence',
  },
];

// ══════════════════════════════════════════════════════════════════════════════
//  SHARED COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

function BgSlide({ img, children, overlay = 'rgba(5,5,15,0.68)' }: { img: string; children: React.ReactNode; overlay?: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scale(1.03)' }} />
      <div style={{ position: 'absolute', inset: 0, background: overlay }} />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%' }}>{children}</div>
    </div>
  );
}

function GoldLine() {
  return <div style={{ height: '2px', background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '16px auto', width: '80%', animation: 'inkReveal 0.9s ease 0.4s both', transformOrigin: 'left center' }} />;
}

function Tag({ label, color = GOLD20, textColor = GOLD }: { label: string; color?: string; textColor?: string }) {
  return <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 20, background: color, color: textColor, fontSize: 10, fontFamily: 'sans-serif', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 400, color: WHITE, letterSpacing: '0.04em', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>{children}</h2>;
}

function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <div style={{ background: CARD, backdropFilter: 'blur(12px)', border: `1px solid ${GOLD40}`, borderRadius: 12, padding: '20px 24px', ...style }}>{children}</div>;
}

function MiniBar({ pct, color = GOLD }: { pct: number; color?: string }) {
  return <div className="mini-bar-bg" style={{ marginTop: 8 }}><div className="mini-bar-fg" style={{ width: `${pct}%`, background: color }} /></div>;
}

function TierDots({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => <span key={i} className={`tier-dot ${i < filled ? 'filled' : 'empty'}`} />)}
    </span>
  );
}

// ── QuestDetail panel ─────────────────────────────────────────────────────────
function QuestDetail({ quest, onPrev, onNext, hasPrev, hasNext, accentColor = GOLD }: {
  quest: Quest; onPrev: () => void; onNext: () => void;
  hasPrev: boolean; hasNext: boolean; accentColor?: string;
}) {
  const btnBase: React.CSSProperties = {
    padding: '7px 16px', borderRadius: 8, border: `1px solid ${accentColor}60`,
    fontFamily: 'sans-serif', fontSize: 12, cursor: 'pointer',
    background: 'rgba(255,255,255,0.04)', color: accentColor,
    transition: 'all 0.15s ease',
  };
  const btnDisabled: React.CSSProperties = { ...btnBase, opacity: 0.3, cursor: 'default' };

  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: 2 }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          {quest.act && <Tag label={quest.act} color={`${ACT_COLOR[quest.act] || '#888'}25`} textColor={ACT_COLOR[quest.act] || '#888'} />}
          {quest.ally && <Tag label={`Ally: ${quest.ally}`} color="rgba(123,104,238,0.2)" textColor="#7B68EE" />}
          {quest.target && <Tag label="Bounty Target" color="rgba(184,134,11,0.2)" textColor="#B8860B" />}
          {quest.boss && <Tag label="Boss Fight" color="rgba(139,26,26,0.3)" textColor="#ef4444" />}
          {quest.prereq && <Tag label={`Req: ${quest.prereq}`} color="rgba(255,255,255,0.06)" textColor="rgba(240,237,232,0.5)" />}
        </div>
        {/* Title */}
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: WHITE, marginBottom: quest.target ? 4 : 6, lineHeight: 1.2 }}>{quest.title}</h3>
        {quest.target && <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#B8860B', marginBottom: 6, fontStyle: 'italic' }}>{quest.target}</p>}
        {/* Meta */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM }}>📍 {quest.region}</span>
          <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM }}>⏱ {quest.time}</span>
        </div>
        {/* Desc */}
        <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.55, marginBottom: 14 }}>{quest.desc}</p>
        {/* Steps */}
        <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: accentColor, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 8, textTransform: 'uppercase' }}>Steps</p>
        {quest.steps.map((step, i) => (
          <div key={i} className="check-row"><div className="check-box" /><span className="check-text">{step}</span></div>
        ))}
        {/* Tip */}
        {quest.tip && (
          <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: 'rgba(201,168,76,0.08)', border: `1px solid ${GOLD40}` }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, marginBottom: 4, fontWeight: 700 }}>💡 {quest.tipLabel || 'Tip'}</p>
            <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.45 }}>{quest.tip}</p>
          </div>
        )}
        {/* Reward */}
        <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: `${accentColor}0d`, border: `1px solid ${accentColor}30` }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM }}><span style={{ color: accentColor, fontWeight: 700 }}>Reward: </span>{quest.reward}</p>
        </div>
      </div>
      {/* Prev / Next */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={onPrev} disabled={!hasPrev} style={hasPrev ? btnBase : btnDisabled}>← Prev</button>
        <button onClick={onNext} disabled={!hasNext} style={hasNext ? btnBase : btnDisabled}>Next →</button>
      </div>
    </Card>
  );
}

// ── Generic quest list row ────────────────────────────────────────────────────
function QuestRow({ quest, index, selected, onClick, accentColor }: {
  quest: Quest; index: number; selected: boolean; onClick: () => void; accentColor: string;
}) {
  const regionColor = REGION_COLOR[quest.region] || '#888';
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px',
        borderRadius: 8, marginBottom: 4, cursor: 'pointer',
        background: selected ? `${accentColor}18` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${selected ? accentColor + '60' : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.15s ease',
      }}
    >
      <span style={{ fontFamily: 'sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.3)', width: 20, flexShrink: 0 }}>{String(index + 1).padStart(2, '0')}</span>
      <span style={{ flex: 1, fontFamily: 'sans-serif', fontSize: 12, color: selected ? WHITE : 'rgba(240,237,232,0.8)', lineHeight: 1.3 }}>{quest.title}</span>
      {quest.boss && <span style={{ fontSize: 10 }}>💀</span>}
      <span style={{ fontFamily: 'sans-serif', fontSize: 9, color: regionColor, background: `${regionColor}20`, padding: '1px 5px', borderRadius: 3, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{quest.region.split(' ')[0]}</span>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  SLIDES 1 & 2 — unchanged
// ══════════════════════════════════════════════════════════════════════════════

function Slide1() {
  return (
    <BgSlide img={IMGS.ps1} overlay="rgba(4,4,12,0.72)">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '40px 24px' }}>
        <div style={{ animation: 'fadeUp 0.7s ease 0.1s both' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', marginBottom: 24 }}>■ COMPLETE GUIDE ■</p>
        </div>
        <div style={{ animation: 'fadeUp 0.7s ease 0.25s both' }}>
          <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(36px, 7vw, 80px)', fontWeight: 400, color: WHITE, letterSpacing: '0.06em', lineHeight: 1.1, textShadow: '0 4px 40px rgba(0,0,0,0.9)' }}>Ghost of Yōtei</h1>
        </div>
        <GoldLine />
        <div style={{ animation: 'fadeUp 0.7s ease 0.45s both' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: 'clamp(13px, 2vw, 20px)', letterSpacing: '0.18em', color: 'rgba(240,237,232,0.80)', textTransform: 'uppercase', marginBottom: 32 }}>100% Completion Guide</p>
        </div>
        <div style={{ animation: 'fadeUp 0.7s ease 0.6s both' }}>
          <p style={{ fontSize: 'clamp(26px, 5vw, 52px)', color: 'rgba(255,255,255,0.12)', letterSpacing: '0.3em', fontFamily: 'Georgia, serif', marginBottom: 40 }}>幽霊</p>
        </div>
        <div style={{ animation: 'fadeUp 0.7s ease 0.8s both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(240,237,232,0.45)', fontFamily: 'sans-serif', fontSize: 12, letterSpacing: '0.1em' }}>
            <span>119 Quests</span><span style={{ color: GOLD40 }}>•</span>
            <span>319 Collectibles</span><span style={{ color: GOLD40 }}>•</span>
            <span>54 Trophies</span><span style={{ color: GOLD40 }}>•</span>
            <span>6 Regions</span>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 56, animation: 'fadeUp 0.7s ease 1.1s both' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: 'rgba(240,237,232,0.35)', letterSpacing: '0.12em' }}>Press → to begin &nbsp;&nbsp;|&nbsp;&nbsp; Click arrows to navigate</p>
        </div>
      </div>
    </BgSlide>
  );
}

function Slide2() {
  const cols = [
    { icon: '📖', title: 'Guide Structure', items: ['Main Story Quests (10)', 'Side Tales (48)', 'Mythic Tales (7)', 'Sensei Tales (20)', 'Bounty Quests (31)', 'Post-Story (3)', 'Collectibles (319)', 'Trophies (54)'] },
    { icon: '🗺️', title: 'How to Read Each Quest', items: ['Click any quest to see full details', 'Category chip + Region tag', 'Step-by-step walkthrough', 'Boss phase breakdowns', 'Prev / Next to browse quests', 'Rewards listed at the end', 'Tips highlighted in amber', 'Follow-up quests noted'] },
    { icon: '🏆', title: 'Recommended Order', items: ['1. Follow main story fully', '2. Clear regional side quests', '3. Collect region-by-region', '4. Finish all mythic tales', '5. Complete trophy cleanup', '6. Platinum unlocks at 100%'] },
  ];
  return (
    <BgSlide img={IMGS.blog1} overlay="rgba(6,6,18,0.78)">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '48px 48px 80px' }}>
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Guide Overview" />
          <SectionTitle><span style={{ color: GOLD }}>How to Use</span> This Guide</SectionTitle>
          <GoldLine />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, flex: 1, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          {cols.map(col => (
            <Card key={col.title} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{col.icon}</div>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: GOLD, marginBottom: 14, letterSpacing: '0.03em' }}>{col.title}</h3>
              <div style={{ flex: 1 }}>
                {col.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8, fontFamily: 'sans-serif', fontSize: 13, color: DIM, lineHeight: 1.4 }}>
                    <span style={{ color: GOLD, fontSize: 8, marginTop: 5, flexShrink: 0 }}>◆</span>{item}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: 20, animation: 'fadeUp 0.6s ease 0.4s both' }}>
          <Card style={{ background: 'rgba(201,168,76,0.08)', borderColor: GOLD40, padding: '12px 20px' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: 'rgba(240,237,232,0.75)', lineHeight: 1.5 }}>
              <span style={{ color: GOLD, fontWeight: 700 }}>Zero missables.</span>&nbsp; Every quest, collectible, and trophy in Ghost of Yōtei is accessible via free-roam after the story credits roll. Click any quest on the following slides to read its full walkthrough.
            </p>
          </Card>
        </div>
      </div>
    </BgSlide>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  SLIDE 3 — Main Story (interactive, chapter-grouped)
// ══════════════════════════════════════════════════════════════════════════════

function Slide3() {
  const [selectedId, setSelectedId] = useState('ms_01');
  const [expandedActs, setExpandedActs] = useState<Record<string, boolean>>({
    'Prologue': true, 'Chapter 1': true, 'Chapter 2': true, 'Chapter 3': true,
  });

  const flatList = MAIN_STORY;
  const selectedIndex = flatList.findIndex(q => q.id === selectedId);
  const selected = flatList[selectedIndex];

  const byAct: Record<string, Quest[]> = {};
  for (const q of flatList) { if (!byAct[q.act!]) byAct[q.act!] = []; byAct[q.act!].push(q); }
  const acts = ['Prologue', 'Chapter 1', 'Chapter 2', 'Chapter 3'];

  const toggleAct = (act: string) => setExpandedActs(prev => ({ ...prev, [act]: !prev[act] }));

  return (
    <BgSlide img={IMGS.mob1} overlay="rgba(4,6,18,0.80)">
      <div style={{ display: 'flex', height: '100%', padding: '40px 48px 80px', gap: 24 }}>
        {/* Left: grouped quest list */}
        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Main Story" color="rgba(201,168,76,0.15)" />
          <SectionTitle>Main Story Quests</SectionTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 12px' }}>
            <div style={{ flex: 1 }}><MiniBar pct={0} /></div>
            <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: GOLD }}>0 / 10</span>
          </div>
          <div className="slide-scroll" style={{ flex: 1 }}>
            {acts.map(act => {
              const quests = byAct[act] || [];
              const color = ACT_COLOR[act] || GOLD;
              const expanded = expandedActs[act];
              return (
                <div key={act} style={{ marginBottom: 8 }}>
                  {/* Chapter header */}
                  <button
                    onClick={() => toggleAct(act)}
                    style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', borderRadius: 6, background: `${color}15`, border: `1px solid ${color}30`, cursor: 'pointer', marginBottom: expanded ? 6 : 0 }}
                  >
                    <span style={{ fontFamily: 'sans-serif', fontSize: 10, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em', flex: 1, textAlign: 'left' }}>{act}</span>
                    <span style={{ fontSize: 10, color, opacity: 0.7 }}>{quests.length} quests</span>
                    <span style={{ fontSize: 10, color, opacity: 0.5 }}>{expanded ? '▲' : '▼'}</span>
                  </button>
                  {expanded && quests.map((q, i) => {
                    const globalIndex = flatList.findIndex(x => x.id === q.id);
                    return (
                      <QuestRow key={q.id} quest={q} index={globalIndex} selected={q.id === selectedId}
                        onClick={() => setSelectedId(q.id)} accentColor={color} />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        {/* Right: detail panel */}
        <div style={{ flex: 1, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          {selected && (
            <QuestDetail quest={selected}
              hasPrev={selectedIndex > 0} hasNext={selectedIndex < flatList.length - 1}
              onPrev={() => setSelectedId(flatList[selectedIndex - 1].id)}
              onNext={() => setSelectedId(flatList[selectedIndex + 1].id)}
              accentColor={ACT_COLOR[selected.act!] || GOLD}
            />
          )}
        </div>
      </div>
    </BgSlide>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  SLIDE 4 — Side Tales (interactive, 48 quests)
// ══════════════════════════════════════════════════════════════════════════════

function Slide4() {
  const [selectedId, setSelectedId] = useState(SIDE_TALES[0].id);
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const regions = ['All', ...Object.keys(REGION_COLOR)];

  const filtered = regionFilter === 'All' ? SIDE_TALES : SIDE_TALES.filter(q => q.region === regionFilter);
  const selectedIndex = filtered.findIndex(q => q.id === selectedId);
  const selected = filtered[selectedIndex] || filtered[0];

  const selectQuest = (id: string) => setSelectedId(id);

  return (
    <BgSlide img={IMGS.mob2} overlay="rgba(4,8,20,0.80)">
      <div style={{ display: 'flex', height: '100%', padding: '40px 48px 80px', gap: 24 }}>
        {/* Left */}
        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Side Tales · 48 Quests" color="rgba(74,155,142,0.2)" textColor="#4A9B8E" />
          <SectionTitle>Side Tales</SectionTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 10px' }}>
            <div style={{ flex: 1 }}><MiniBar pct={0} color="#4A9B8E" /></div>
            <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#4A9B8E' }}>0 / 48</span>
          </div>
          {/* Region filter */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
            {regions.map(r => {
              const col = r === 'All' ? GOLD : (REGION_COLOR[r] || GOLD);
              const active = r === regionFilter;
              return (
                <button key={r} onClick={() => { setRegionFilter(r); setSelectedId(r === 'All' ? SIDE_TALES[0].id : (SIDE_TALES.find(q => q.region === r)?.id || SIDE_TALES[0].id)); }}
                  style={{ padding: '3px 8px', borderRadius: 4, border: `1px solid ${col}40`, fontFamily: 'sans-serif', fontSize: 9, cursor: 'pointer', fontWeight: 600, letterSpacing: '0.04em', background: active ? `${col}25` : 'transparent', color: active ? col : 'rgba(240,237,232,0.4)', transition: 'all 0.15s' }}>
                  {r === 'All' ? 'All' : r.split(' ')[0]}
                </button>
              );
            })}
          </div>
          <div className="slide-scroll" style={{ flex: 1 }}>
            {filtered.map((q, i) => (
              <QuestRow key={q.id} quest={q} index={i} selected={q.id === selectedId}
                onClick={() => selectQuest(q.id)} accentColor={REGION_COLOR[q.region] || GOLD} />
            ))}
          </div>
        </div>
        {/* Right */}
        <div style={{ flex: 1, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          {selected && (
            <QuestDetail quest={selected}
              hasPrev={selectedIndex > 0} hasNext={selectedIndex < filtered.length - 1}
              onPrev={() => setSelectedId(filtered[selectedIndex - 1].id)}
              onNext={() => setSelectedId(filtered[selectedIndex + 1].id)}
              accentColor={REGION_COLOR[selected.region] || GOLD}
            />
          )}
        </div>
      </div>
    </BgSlide>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  SLIDE 5 — Mythic / Sensei / Bounty (tabbed, all interactive)
// ══════════════════════════════════════════════════════════════════════════════

function Slide5() {
  const tabs = [
    { label: 'Mythic Tales',   quests: MYTHIC_TALES,  color: '#ef4444', bg: 'rgba(139,26,26,0.2)' },
    { label: 'Sensei Tales',   quests: SENSEI_TALES,  color: '#7B68EE', bg: 'rgba(123,104,238,0.2)' },
    { label: 'Bounty Quests',  quests: BOUNTY_QUESTS, color: '#B8860B', bg: 'rgba(184,134,11,0.2)' },
  ];
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>(tabs.map(t => t.quests[0].id));

  const currentTab = tabs[tabIndex];
  const currentList = currentTab.quests;
  const selectedId = selectedIds[tabIndex];
  const selectedIndex = currentList.findIndex(q => q.id === selectedId);
  const selected = currentList[selectedIndex] || currentList[0];

  const setSelected = (id: string) => setSelectedIds(prev => { const next = [...prev]; next[tabIndex] = id; return next; });

  return (
    <BgSlide img={IMGS.mob3} overlay="rgba(8,4,18,0.82)">
      <div style={{ display: 'flex', height: '100%', padding: '40px 48px 80px', gap: 24 }}>
        {/* Left */}
        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Special Quests · 58 Total" color="rgba(139,26,26,0.2)" textColor="#ef4444" />
          <SectionTitle>Mythic, Sensei &amp; Bounty</SectionTitle>
          <div style={{ display: 'flex', gap: 6, margin: '10px 0 12px', flexWrap: 'wrap' }}>
            {tabs.map((t, i) => (
              <button key={t.label} onClick={() => setTabIndex(i)} style={{
                padding: '6px 14px', borderRadius: 8, border: `1px solid ${t.color}50`,
                fontFamily: 'sans-serif', fontSize: 11, cursor: 'pointer',
                background: i === tabIndex ? `${t.color}20` : 'transparent',
                color: i === tabIndex ? t.color : 'rgba(240,237,232,0.4)',
                fontWeight: i === tabIndex ? 700 : 400, transition: 'all 0.15s',
              }}>{t.label} ({t.quests.length})</button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{ flex: 1 }}><MiniBar pct={0} color={currentTab.color} /></div>
            <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: currentTab.color }}>0 / {currentList.length}</span>
          </div>
          <div className="slide-scroll" style={{ flex: 1 }}>
            {currentList.map((q, i) => (
              <QuestRow key={q.id} quest={q} index={i} selected={q.id === selectedId}
                onClick={() => setSelected(q.id)} accentColor={currentTab.color} />
            ))}
          </div>
        </div>
        {/* Right */}
        <div style={{ flex: 1, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          {selected && (
            <QuestDetail quest={selected}
              hasPrev={selectedIndex > 0} hasNext={selectedIndex < currentList.length - 1}
              onPrev={() => setSelected(currentList[selectedIndex - 1].id)}
              onNext={() => setSelected(currentList[selectedIndex + 1].id)}
              accentColor={currentTab.color}
            />
          )}
        </div>
      </div>
    </BgSlide>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  SLIDE 5b — Post-Story (interactive)
// ══════════════════════════════════════════════════════════════════════════════

function Slide5b() {
  const [selectedId, setSelectedId] = useState(POST_STORY[0].id);
  const selectedIndex = POST_STORY.findIndex(q => q.id === selectedId);
  const selected = POST_STORY[selectedIndex];

  return (
    <BgSlide img={IMGS.blog5} overlay="rgba(6,4,14,0.86)">
      <div style={{ display: 'flex', height: '100%', padding: '40px 48px 80px', gap: 24 }}>
        <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Post-Story · 3 Quests" color="rgba(155,89,182,0.2)" textColor="#9B59B6" />
          <SectionTitle>Epilogue Quests</SectionTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '8px 0 14px' }}>
            <div style={{ flex: 1 }}><MiniBar pct={0} color="#9B59B6" /></div>
            <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: '#9B59B6' }}>0 / 3</span>
          </div>
          <div style={{ flex: 1 }}>
            {POST_STORY.map((q, i) => (
              <QuestRow key={q.id} quest={q} index={i} selected={q.id === selectedId}
                onClick={() => setSelectedId(q.id)} accentColor="#9B59B6" />
            ))}
          </div>
          <Card style={{ marginTop: 16, padding: '12px 16px', background: 'rgba(155,89,182,0.08)', borderColor: 'rgba(155,89,182,0.3)' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.4 }}>
              <span style={{ color: '#9B59B6', fontWeight: 700 }}>Completion order matters.</span> Complete Embers of the Snake and The Weight of Silence before attempting Yōtei at First Snow — it is the true ending and requires both.
            </p>
          </Card>
        </div>
        <div style={{ flex: 1, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          {selected && (
            <QuestDetail quest={selected}
              hasPrev={selectedIndex > 0} hasNext={selectedIndex < POST_STORY.length - 1}
              onPrev={() => setSelectedId(POST_STORY[selectedIndex - 1].id)}
              onNext={() => setSelectedId(POST_STORY[selectedIndex + 1].id)}
              accentColor="#9B59B6"
            />
          )}
        </div>
      </div>
    </BgSlide>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  SLIDES 6-12 — unchanged content slides
// ══════════════════════════════════════════════════════════════════════════════

function Slide6() {
  const groups = [
    { label: 'Sumi-e Paintings',       icon: '🎨', count: 60,  color: '#4A9B8E', trophy: "An Artist's Eye"    },
    { label: 'Ainu Sacred Sites',      icon: '🌿', count: 80,  color: '#4A9B6F', trophy: 'Ainu Wanderer'      },
    { label: 'Clan Trophies',          icon: '🏴', count: 68,  color: '#8B1A1A', trophy: 'Relic Hunter'       },
    { label: 'Ancient Maps',           icon: '🗺️', count: 55, color: '#9B59B6', trophy: 'Cartographer'       },
    { label: 'Hot Springs',            icon: '♨️', count: 16,  color: '#4682B4', trophy: 'Well of Spirit'     },
    { label: 'Bamboo Strikes',         icon: '🎍', count: 15,  color: '#B8860B', trophy: 'The Bamboo Path'    },
    { label: 'Shrine Climbs',          icon: '⛩️', count: 13,  color: '#C9A84C', trophy: 'Body, Mind & Spirit' },
    { label: 'Nine-Tails Puzzle Boxes',icon: '🦊', count: 12,  color: '#8B4513', trophy: 'Nine-Tails Champion' },
  ];
  return (
    <BgSlide img={IMGS.blog2} overlay="rgba(4,10,20,0.82)">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 48px 80px' }}>
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Collectibles · 319 Total" color="rgba(74,155,142,0.2)" textColor="#4A9B8E" />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}><SectionTitle>Collectibles</SectionTitle><span style={{ fontFamily: 'sans-serif', fontSize: 13, color: DIM }}>All available in free-roam · 0 missable</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '10px 0 20px' }}><div style={{ flex: 1 }}><MiniBar pct={0} color="#4A9B8E" /></div><span style={{ fontFamily: 'sans-serif', fontSize: 13, color: '#4A9B8E', fontWeight: 700 }}>0 / 319</span></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          {groups.map(g => (
            <Card key={g.label} style={{ padding: '16px 18px', borderColor: `${g.color}40` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 22 }}>{g.icon}</span>
                <div style={{ flex: 1 }}><div style={{ fontFamily: 'sans-serif', fontSize: 12, color: WHITE, lineHeight: 1.3 }}>{g.label}</div></div>
                <div style={{ fontFamily: 'sans-serif', fontSize: 20, fontWeight: 700, color: g.color }}>{g.count}</div>
              </div>
              <MiniBar pct={0} color={g.color} />
              <div style={{ marginTop: 10, fontFamily: 'sans-serif', fontSize: 10, color: DIM }}>🏆 {g.trophy}</div>
            </Card>
          ))}
        </div>
        <div style={{ marginTop: 16, animation: 'fadeUp 0.6s ease 0.4s both' }}>
          <Card style={{ padding: '12px 20px', background: 'rgba(201,168,76,0.06)' }}>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {['Yotei Grasslands','Ishikari Plain','Teshio Ridge','Tokachi Range','Nayoro Wilds','Oshima Coast'].map(r => (
                <div key={r} style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM }}>📍 {r}</div>
              ))}
            </div>
            <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, marginTop: 8 }}><span style={{ color: GOLD }}>Strategy:</span> Clear collectibles region-by-region after completing local quests — fast-travel hubs unlock progressively through story chapters.</p>
          </Card>
        </div>
      </div>
    </BgSlide>
  );
}

function Slide7() {
  const activities = [
    { icon: '⚔️', name: 'Dueling Circles',       desc: 'Challenge wandering swordsmen to earn Technique Points',          count: '~25 encounters' },
    { icon: '🎋', name: 'Haiku Stations',         desc: 'Compose haiku at scenic viewpoints — rewards cosmetic dyes',      count: '20 stations'    },
    { icon: '🏘️', name: 'Liberated Settlements', desc: 'Free each village from Yotei Six occupation — unlocks merchants', count: '18 settlements' },
    { icon: '🛒', name: 'Merchant Stalls',        desc: 'Craft material vendors — stock resets after each major region',   count: '6 regions'      },
    { icon: '🐾', name: 'Animal Sanctuaries',     desc: 'Pet and photograph wildlife for Spirit Growth bonus',             count: '12 sanctuaries' },
    { icon: '🗡️', name: 'Vanity Challenges',     desc: 'Complete combat style challenges for cosmetic armour pieces',     count: '8 challenges'   },
  ];
  const regions = [
    { name: 'Yotei Grasslands', abbr: 'YG', color: '#4A9B8E' }, { name: 'Ishikari Plain', abbr: 'IP', color: '#4682B4' },
    { name: 'Teshio Ridge',     abbr: 'TR', color: '#7B68EE' }, { name: 'Tokachi Range',  abbr: 'TK', color: '#B8860B' },
    { name: 'Nayoro Wilds',     abbr: 'NW', color: '#4A9B6F' }, { name: 'Oshima Coast',   abbr: 'OC', color: '#4A7A9B' },
  ];
  return (
    <BgSlide img={IMGS.blog3} overlay="rgba(4,12,22,0.82)">
      <div style={{ display: 'flex', height: '100%', padding: '40px 48px 80px', gap: 24 }}>
        <div style={{ flex: '0 0 55%', animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="World Activities" color="rgba(74,155,142,0.2)" textColor="#4A9B8E" />
          <SectionTitle>Activities &amp; World Content</SectionTitle>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: '12px 0 18px', width: '60%' }} />
          <div className="slide-scroll">
            {activities.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 14px', borderRadius: 8, marginBottom: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24, flexShrink: 0 }}>{a.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 5 }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 14, color: WHITE, fontWeight: 500 }}>{a.name}</span>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, whiteSpace: 'nowrap', marginLeft: 8 }}>{a.count}</span>
                  </div>
                  <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.4 }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, animation: 'fadeUp 0.6s ease 0.2s both', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: GOLD, marginBottom: 14 }}>The 6 Regions of Ezo</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {regions.map(r => (
                <div key={r.abbr} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${r.color}25`, border: `2px solid ${r.color}60`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: 10, color: r.color, fontWeight: 700, flexShrink: 0 }}>{r.abbr}</div>
                  <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: WHITE }}>{r.name}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: GOLD, marginBottom: 14 }}>World Completion Tips</h3>
            {[
              { n: '1', tip: 'Liberate settlements first — merchants unlock crafting materials' },
              { n: '2', tip: 'Complete dueling circles before finishing regional quests for bonus TP' },
              { n: '3', tip: 'Haiku stations are tied to specific viewpoints — check Sumi-e list for overlap' },
              { n: '4', tip: 'Animal sanctuaries refill Spirit — visit before major boss fights' },
              { n: '5', tip: 'Vanity challenges can be replayed if failed on the first attempt' },
            ].map(item => (
              <div key={item.n} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: GOLD20, border: `1px solid ${GOLD40}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: 11, color: GOLD, fontWeight: 700, flexShrink: 0 }}>{item.n}</div>
                <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.4, paddingTop: 2 }}>{item.tip}</p>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </BgSlide>
  );
}

function Slide8() {
  const [tab, setTab] = useState(0);
  const tabs = ['⚔️ Weapons', '🛡️ Armour', '💎 Charms'];
  const weapons = [
    { name: 'Starting Katana',     tier: 1, note: 'Prologue reward — balanced starter' },
    { name: "Rider's Edge",        tier: 2, note: 'Upgrade via Ishikari blacksmith (Copper + Iron)' },
    { name: 'Crescent Blade',      tier: 2, note: 'Crafted after Saito Brothers quest (Steel + Resin)' },
    { name: 'Ghost Blade',         tier: 3, note: 'Crafted post-story (Rare Iron + Haunted Wood)' },
    { name: 'Mountain God Katana', tier: 4, note: 'Reward from myth_02 — highest base damage' },
    { name: "Dragon's Fang",       tier: 5, note: 'Reward from ms_10 — unlocks final stance' },
  ];
  const armour = [
    { name: 'Ghost Kimono',         region: 'Prologue',         note: 'Starting armour — balanced stats' },
    { name: "Traveller's Cloak",    region: 'Yotei Grasslands', note: 'Crafted at grasslands settlement' },
    { name: "Ronin's Guard",        region: 'Ishikari Plain',   note: 'Merchant in liberated Ishikari town' },
    { name: 'Mountain Shroud',      region: 'Teshio Ridge',     note: 'Shrine Climb #7 reward' },
    { name: 'Ghost Armour Tier II', region: 'Ch.2 reward',      note: 'Saito Brothers quest completion' },
    { name: 'Spirit Weave',         region: 'Post-story',       note: 'Crafted with Dragon materials' },
  ];
  const charms = [
    { name: 'Harvest Charm',        slot: 1, note: 'Attack boost after resting — side tale reward' },
    { name: 'Nine-Tails Fox Charm', slot: 2, note: 'Puzzle Box #1 — stealth invisibility window' },
    { name: 'Mountain God Charm',   slot: 3, note: 'myth_02 reward — lightning resistance' },
    { name: 'Bear Hide Amulet',     slot: 4, note: 'myth_04 reward — health regeneration on kill' },
    { name: 'Crescent Moon Token',  slot: 5, note: 'myth_06 reward — bow damage amplified' },
    { name: "Atsu's Spirit Seal",   slot: 6, note: 'Shrine Climb #13 (final) — all stances buffed' },
  ];
  const data = [weapons, armour, charms];
  const cols = [['Name','Tier','Notes'],['Name','Region','Notes'],['Name','Slot','Notes']];
  return (
    <BgSlide img={IMGS.mob4} overlay="rgba(5,8,18,0.84)">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 48px 80px' }}>
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Equipment Reference" color={GOLD20} />
          <SectionTitle>Weapons, Armour &amp; Upgrades</SectionTitle>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: '12px 0 18px', width: '60%' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, animation: 'fadeUp 0.6s ease 0.15s both' }}>
          {tabs.map((t, i) => (
            <button key={i} className={`tab-btn ${i === tab ? 'active' : ''}`} onClick={() => setTab(i)} style={{ padding: '8px 20px', borderRadius: 8, border: `1px solid ${GOLD40}`, fontFamily: 'sans-serif', fontSize: 13, cursor: 'pointer', background: i === tab ? GOLD : 'rgba(201,168,76,0.08)', color: i === tab ? DARK : DIM }}>{t}</button>
          ))}
        </div>
        <Card style={{ flex: 1, overflow: 'hidden', animation: 'fadeUp 0.6s ease 0.25s both' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 3fr', gap: 12, marginBottom: 12, borderBottom: `1px solid ${GOLD40}`, paddingBottom: 8 }}>
            {cols[tab].map(h => <span key={h} style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</span>)}
          </div>
          <div className="slide-scroll">
            {data[tab].map((row: any, i: number) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr 3fr', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', alignItems: 'center' }}>
                <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: WHITE }}>{row.name}</span>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  {tab === 0 ? <TierDots filled={row.tier} /> : <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM }}>{tab === 1 ? row.region : `Slot ${row.slot}`}</span>}
                </span>
                <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.4 }}>{row.note}</span>
              </div>
            ))}
          </div>
        </Card>
        <div style={{ marginTop: 14, animation: 'fadeUp 0.6s ease 0.35s both' }}>
          <Card style={{ padding: '10px 18px', background: 'rgba(201,168,76,0.06)' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM }}><span style={{ color: GOLD, fontWeight: 700 }}>Charm Slots:</span> Unlock via Shrine Climbs — 1 slot per shrine. 13 shrines = 13 charm slots max. Each slot can hold any one charm independently.</p>
          </Card>
        </div>
      </div>
    </BgSlide>
  );
}

function Slide9() {
  const cleanup = [
    'Complete all 9 Nayoro Wilds bounty targets (bnty_23 – bnty_31)','Finish all 13 Shrine Climbs for full charm slot count',
    'Solve all 12 Nine-Tails Puzzle Boxes','Locate all 80 Ainu Sacred Sites','Collect all 60 Sumi-e Painting viewpoints',
    'Complete all 7 Mythic Tales including the Mountain God Trial','Finish the 3 Post-Story epilogue quests','Reach the Platinum Trophy threshold',
  ];
  return (
    <BgSlide img={IMGS.blog4} overlay="rgba(6,4,14,0.85)">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 48px 80px' }}>
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Endgame Cleanup" color="rgba(139,26,26,0.2)" textColor="#ef4444" />
          <SectionTitle>Missables &amp; Endgame Cleanup</SectionTitle>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: '10px 0 16px', width: '60%' }} />
        </div>
        <div style={{ padding: '18px 28px', borderRadius: 12, marginBottom: 20, background: 'linear-gradient(135deg, rgba(74,155,142,0.12), rgba(74,155,142,0.06))', border: '2px solid rgba(74,155,142,0.4)', animation: 'fadeUp 0.6s ease 0.15s both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 36 }}>✅</span>
            <div>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#4A9B8E' }}>0 Truly Missable Quests</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: DIM, marginTop: 4 }}>Ghost of Yōtei is fully free-roam friendly. Every quest, collectible, and trophy remains available after the story credits roll.</p>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, flex: 1, animation: 'fadeUp 0.6s ease 0.25s both' }}>
          <div style={{ flex: 1 }}><Card style={{ height: '100%' }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 16, color: GOLD, marginBottom: 16 }}>Post-Story Cleanup Checklist</h3>
            {cleanup.map((item, i) => <div key={i} className="check-row"><div className="check-box" /><span className="check-text">{item}</span></div>)}
          </Card></div>
          <div style={{ flex: '0 0 38%', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ padding: '16px 18px', borderRadius: 12, background: 'rgba(139,26,26,0.12)', border: '1px solid rgba(239,68,68,0.3)' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#ef4444', fontWeight: 700, marginBottom: 8 }}>⚠ KNOWN BUG WARNING</p>
              <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.5 }}><strong style={{ color: WHITE }}>Bounty Quest bnty_04 (Black Powder Ippei):</strong> Ippei may fail to appear if Oshima Coast was cleared in a specific order. Fast-travel away and back to reset the spawn.</p>
            </div>
            <Card style={{ flex: 1 }}>
              <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: GOLD, marginBottom: 14 }}>Post-Story Quests</h3>
              {[
                { title: 'Embers of the Snake',   note: "Epilogue — confront the Snake's legacy" },
                { title: 'The Weight of Silence', note: 'Jubei companion quest conclusion' },
                { title: 'Yōtei at First Snow',   note: 'True ending — requires all Sensei Tales' },
              ].map((q, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div className="check-row" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                    <div className="check-box" />
                    <div><div style={{ fontFamily: 'sans-serif', fontSize: 13, color: WHITE }}>{q.title}</div><div style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, marginTop: 2 }}>{q.note}</div></div>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </BgSlide>
  );
}

function Slide10() {
  const regions = [
    { name: 'Yotei Grasslands', abbr: 'YG', color: '#4A9B8E', quests: 22, collectibles: 62, activities: 14 },
    { name: 'Ishikari Plain',   abbr: 'IP', color: '#4682B4', quests: 18, collectibles: 55, activities: 11 },
    { name: 'Teshio Ridge',     abbr: 'TR', color: '#7B68EE', quests: 16, collectibles: 48, activities: 9  },
    { name: 'Tokachi Range',    abbr: 'TK', color: '#B8860B', quests: 21, collectibles: 58, activities: 12 },
    { name: 'Nayoro Wilds',     abbr: 'NW', color: '#4A9B6F', quests: 19, collectibles: 52, activities: 10 },
    { name: 'Oshima Coast',     abbr: 'OC', color: '#4A7A9B', quests: 23, collectibles: 44, activities: 13 },
  ];
  const R = 28; const C = 2 * Math.PI * R;
  return (
    <BgSlide img={IMGS.ps2} overlay="rgba(4,6,18,0.82)">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 48px 80px' }}>
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Regional Progress" />
          <SectionTitle>Progress Tracking</SectionTitle>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: '10px 0 20px', width: '60%' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, flex: 1, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          {regions.map(r => (
            <Card key={r.abbr} style={{ borderColor: `${r.color}40` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                <svg width={70} height={70} style={{ flexShrink: 0 }}>
                  <circle cx={35} cy={35} r={R} fill="none" strokeWidth={5} className="ring-track" />
                  <circle cx={35} cy={35} r={R} fill="none" strokeWidth={5} className="ring-fill" strokeDasharray={C} strokeDashoffset={C} transform="rotate(-90 35 35)" />
                  <text x={35} y={39} textAnchor="middle" fill={r.color} fontSize={14} fontFamily="sans-serif" fontWeight="bold">0%</text>
                </svg>
                <div>
                  <div style={{ fontFamily: 'sans-serif', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: r.color, fontWeight: 700, marginBottom: 4 }}>{r.abbr}</div>
                  <div style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: WHITE, lineHeight: 1.3 }}>{r.name}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {[
                  { label: 'Quests',       val: r.quests,      color: GOLD    },
                  { label: 'Collectibles', val: r.collectibles, color: r.color },
                  { label: 'Activities',   val: r.activities,   color: '#888'  },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, width: 80 }}>{row.label}</span>
                    <div style={{ flex: 1 }}><MiniBar pct={0} color={row.color} /></div>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: row.color, width: 28, textAlign: 'right' }}>{row.val}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </BgSlide>
  );
}

function Slide11() {
  const categories = [
    { label: 'Main Story',    count: 10, color: '#C9A84C' }, { label: 'Side Tales',    count: 48, color: '#4A9B8E' },
    { label: 'Mythic Tales',  count: 7,  color: '#8B1A1A' }, { label: 'Sensei Tales',  count: 20, color: '#7B68EE' },
    { label: 'Bounty Quests', count: 31, color: '#B8860B' }, { label: 'Post-Story',    count: 3,  color: '#9B59B6' },
  ];
  const trophyTiers = [
    { tier: 'Platinum', icon: '🏅', count: 1,  color: '#E5E4E2' }, { tier: 'Gold',   icon: '🥇', count: 7,  color: '#FFD700' },
    { tier: 'Silver',   icon: '🥈', count: 18, color: '#C0C0C0' }, { tier: 'Bronze', icon: '🥉', count: 28, color: '#CD7F32' },
  ];
  return (
    <BgSlide img={IMGS.mob5} overlay="rgba(4,6,16,0.85)">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 48px 80px' }}>
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Completion Dashboard" />
          <SectionTitle>Full Completion Overview</SectionTitle>
          <div style={{ height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: '10px 0 18px', width: '60%' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginBottom: 16, animation: 'fadeUp 0.6s ease 0.15s both' }}>
          {[
            { label: 'Quests',       val: '0 / 119', sub: '6 categories', color: GOLD        },
            { label: 'Collectibles', val: '0 / 319', sub: '8 groups',     color: '#4A9B8E'   },
            { label: 'Trophies',     val: '0 / 54',  sub: '1 Platinum',   color: '#E5E4E2'   },
          ].map(s => (
            <Card key={s.label} style={{ textAlign: 'center', padding: '16px 20px' }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, color: s.color }}>{s.val}</div>
              <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{s.label}</div>
              <div style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, marginTop: 2 }}>{s.sub}</div>
              <MiniBar pct={0} color={s.color} />
            </Card>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, flex: 1, animation: 'fadeUp 0.6s ease 0.25s both' }}>
          <Card>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: GOLD, marginBottom: 16 }}>Quest Categories</h3>
            {categories.map(c => (
              <div key={c.label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: WHITE }}>{c.label}</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: 12, color: c.color }}>0 / {c.count}</span>
                </div>
                <MiniBar pct={0} color={c.color} />
              </div>
            ))}
          </Card>
          <Card>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: GOLD, marginBottom: 16 }}>Trophy Breakdown</h3>
            {trophyTiers.map(t => (
              <div key={t.tier} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 24 }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: WHITE }}>{t.tier}</span>
                    <span style={{ fontFamily: 'sans-serif', fontSize: 13, color: t.color }}>{t.count}</span>
                  </div>
                  <MiniBar pct={0} color={t.color} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.04)' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.4 }}>Platinum unlocks automatically when all 53 other trophies are earned — no additional requirements.</p>
            </div>
          </Card>
        </div>
      </div>
    </BgSlide>
  );
}

function Slide12() {
  const steps = [
    { n: '01', title: 'Main Story',            hours: '~8–10h',  desc: 'Follow the 10 main story quests in order. Boss fights unlock stances and abilities critical for side content.' },
    { n: '02', title: 'Regional Side Quests',  hours: '~18–22h', desc: 'Clear Side Tales, Sensei Tales, and Bounty Quests region-by-region as you unlock each area through story progress.' },
    { n: '03', title: 'Collectibles by Region',hours: '~12–16h', desc: "Use the guide's regional hints to sweep each of the 6 regions for all 319 collectibles. Shrine Climbs first for charm slots." },
    { n: '04', title: 'Mythic Tales + Cleanup',hours: '~6–8h',   desc: 'Complete all 7 Mythic Tales (some require story completion). Then run the post-story cleanup checklist.' },
    { n: '05', title: 'Trophy Cleanup',        hours: '~2–4h',   desc: 'Cross-reference the trophy list against your progress. The Platinum unlocks automatically when all 53 other trophies are earned.' },
  ];
  return (
    <BgSlide img={IMGS.blog5} overlay="rgba(4,4,14,0.84)">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 48px 80px' }}>
        <div style={{ animation: 'fadeUp 0.6s ease both' }}>
          <Tag label="Completion Strategy" />
          <SectionTitle>Recommended 100% Order</SectionTitle>
          <GoldLine />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, flex: 1, animation: 'fadeUp 0.6s ease 0.2s both' }}>
          {steps.map((step, i) => (
            <Card key={i} style={{ display: 'flex', flexDirection: 'column', borderColor: i === 4 ? GOLD : GOLD40 }}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 40, color: i === 4 ? GOLD : 'rgba(201,168,76,0.2)', marginBottom: 8, lineHeight: 1 }}>{step.n}</div>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 15, color: WHITE, marginBottom: 6, lineHeight: 1.3 }}>{step.title}</div>
              <div style={{ fontFamily: 'sans-serif', fontSize: 12, color: GOLD, fontWeight: 700, marginBottom: 10 }}>{step.hours}</div>
              <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM, lineHeight: 1.5, flex: 1 }}>{step.desc}</p>
              {i === 4 && <div style={{ marginTop: 12, padding: '8px', borderRadius: 6, background: GOLD20, textAlign: 'center' }}><span style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, fontWeight: 700 }}>🏅 Platinum</span></div>}
            </Card>
          ))}
        </div>
        <div style={{ marginTop: 16, animation: 'fadeUp 0.6s ease 0.4s both' }}>
          <div style={{ padding: '20px 32px', borderRadius: 12, textAlign: 'center', background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.05))', border: `1px solid ${GOLD40}` }}>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: WHITE, letterSpacing: '0.04em' }}>You've Got This, <span style={{ color: GOLD }}>Atsu.</span></p>
            <p style={{ fontFamily: 'sans-serif', fontSize: 13, color: DIM, marginTop: 8 }}>Total estimated time: <strong style={{ color: WHITE }}>46–60 hours</strong> · Zero missables · Free-roam friendly throughout</p>
          </div>
        </div>
      </div>
    </BgSlide>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  SLIDE ENGINE
// ══════════════════════════════════════════════════════════════════════════════

const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide5b, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11, Slide12];
const SLIDE_TITLES = [
  'Title', 'How to Use', 'Main Story', 'Side Tales',
  'Mythic · Sensei · Bounty', 'Post-Story', 'Collectibles', 'Activities',
  'Weapons & Armour', 'Missables', 'Progress', 'Dashboard', 'Strategy',
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const prevRef = useRef(0);

  const go = useCallback((idx: number) => {
    if (idx < 0 || idx >= SLIDES.length) return;
    prevRef.current = current;
    setCurrent(idx);
    setAnimKey(k => k + 1);
  }, [current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(current + 1);
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   go(current - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, go]);

  const SlideComponent = SLIDES[current];

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative', background: DARK }}>
      <div key={animKey} style={{ width: '100%', height: '100%', animation: 'fadeUp 0.45s ease both' }}>
        <SlideComponent />
      </div>

      {current > 0 && (
        <button onClick={() => go(current - 1)} style={{
          position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
          width: 44, height: 44, borderRadius: '50%', border: `1px solid ${GOLD40}`,
          background: 'rgba(10,10,20,0.7)', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center', color: GOLD, fontSize: 18,
          backdropFilter: 'blur(8px)', zIndex: 100,
        }} onMouseEnter={e => (e.currentTarget.style.background = GOLD20)}
           onMouseLeave={e => (e.currentTarget.style.background = 'rgba(10,10,20,0.7)')}>‹</button>
      )}

      {current < SLIDES.length - 1 && (
        <button onClick={() => go(current + 1)} style={{
          position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)',
          width: 44, height: 44, borderRadius: '50%', border: `1px solid ${GOLD40}`,
          background: 'rgba(10,10,20,0.7)', cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center', color: GOLD, fontSize: 18,
          backdropFilter: 'blur(8px)', zIndex: 100,
        }} onMouseEnter={e => (e.currentTarget.style.background = GOLD20)}
           onMouseLeave={e => (e.currentTarget.style.background = 'rgba(10,10,20,0.7)')}>›</button>
      )}

      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, alignItems: 'center', zIndex: 100 }}>
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => go(i)} title={SLIDE_TITLES[i]} style={{
            width: i === current ? 24 : 8, height: 8, borderRadius: 4,
            background: i === current ? GOLD : 'rgba(201,168,76,0.3)',
            border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      <div style={{ position: 'absolute', bottom: 22, right: 24, fontFamily: 'sans-serif', fontSize: 11, color: 'rgba(240,237,232,0.35)', letterSpacing: '0.1em', zIndex: 100 }}>
        {String(current + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
      </div>

      <div style={{ position: 'absolute', bottom: 22, left: 24, fontFamily: 'sans-serif', fontSize: 11, color: 'rgba(240,237,232,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', zIndex: 100 }}>
        {SLIDE_TITLES[current]}
      </div>
    </div>
  );
}

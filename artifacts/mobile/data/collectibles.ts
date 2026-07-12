export type CollectibleGroup =
  | 'sumi_e_paintings'
  | 'hot_springs'
  | 'bamboo_strikes'
  | 'shrine_climbs'
  | 'puzzle_boxes'
  | 'ainu_sacred_sites'
  | 'clan_trophies'
  | 'ancient_maps';

export interface CollectibleGroupInfo {
  id: CollectibleGroup;
  label: string;
  icon: string;
  color: string;
  description: string;
  total: number;
  trophy?: string;
  guideUrl: string;
}

export interface Collectible {
  id: string;
  name: string;
  group: CollectibleGroup;
  region: string;
  hint: string;
}

// 319 total collectibles — none are missable, all available in free-roam.
// Type counts sourced from:
//   Bamboo Strikes (15):   PowerPyx + 100pguides.com
//   Shrine Climbs  (13):   PowerPyx + games.gg + Push Square
//   Hot Springs    (16):   100pguides.com ("find all 16 Hot Springs")
//   Puzzle Boxes   (12):   GamePillar
//   Sumi-e (60), Ainu Sacred Sites (80), Clan Trophies (68), Ancient Maps (55): PowerPyx total (319)
export const COLLECTIBLE_GROUPS: CollectibleGroupInfo[] = [
  {
    id: 'sumi_e_paintings',
    label: 'Sumi-e Paintings',
    icon: 'brush-outline',
    color: '#4A9B8E',
    description: 'Scenic viewpoints where Atsu creates ink paintings. Each set rewards cosmetic dyes.',
    total: 60,
    trophy: "An Artist's Eye",
    guideUrl: 'https://www.powerpyx.com/ghost-of-yotei-all-collectibles-locations-guide/',
  },
  {
    id: 'hot_springs',
    label: 'Hot Springs',
    icon: 'water-outline',
    color: '#4682B4',
    description: 'Thermal springs that permanently increase maximum health when soaked in.',
    total: 16,
    trophy: 'Well of Spirit',
    guideUrl: 'https://www.100pguides.com/guides/ghost-of-yotei-all-hot-spring-locations/',
  },
  {
    id: 'bamboo_strikes',
    label: 'Bamboo Strikes',
    icon: 'layers-outline',
    color: '#B8860B',
    description: 'Button-timing challenges that increase Spirit and award Technique Points.',
    total: 15,
    trophy: 'The Bamboo Path',
    guideUrl: 'https://www.powerpyx.com/ghost-of-yotei-all-bamboo-strike-locations/',
  },
  {
    id: 'shrine_climbs',
    label: 'Shrine Climbs',
    icon: 'home-outline',
    color: '#C9A84C',
    description: 'Mountain shrines reached by climbing. Each grants a new Charm and a Charm slot.',
    total: 13,
    trophy: 'Body, Mind and Spirit',
    guideUrl: 'https://www.powerpyx.com/ghost-of-yotei-all-shrine-climb-locations/',
  },
  {
    id: 'puzzle_boxes',
    label: 'Nine-Tails Puzzle Boxes',
    icon: 'cube-outline',
    color: '#8B1A1A',
    description: 'Fox-spirit puzzle boxes hidden in caves and ruins. Each rewards a powerful charm.',
    total: 12,
    trophy: 'Nine-Tails Champion',
    guideUrl: 'https://www.powerpyx.com/ghost-of-yotei-all-collectibles-locations-guide/',
  },
  {
    id: 'ainu_sacred_sites',
    label: 'Ainu Sacred Sites',
    icon: 'leaf-outline',
    color: '#4A9B6F',
    description: 'Indigenous Ainu spiritual locations preserving the history and culture of Ezo.',
    total: 80,
    trophy: 'Ainu Wanderer',
    guideUrl: 'https://www.powerpyx.com/ghost-of-yotei-all-collectibles-locations-guide/',
  },
  {
    id: 'clan_trophies',
    label: 'Clan Trophies',
    icon: 'flag-outline',
    color: '#8B1A1A',
    description: 'Enemy clan relics and banners found inside outposts and fortresses.',
    total: 68,
    trophy: 'Relic Hunter',
    guideUrl: 'https://www.powerpyx.com/ghost-of-yotei-all-collectibles-locations-guide/',
  },
  {
    id: 'ancient_maps',
    label: 'Ancient Maps',
    icon: 'map-outline',
    color: '#9B59B6',
    description: 'Hidden treasure maps found in enemy strongholds that reveal secret locations.',
    total: 55,
    trophy: 'Cartographer',
    guideUrl: 'https://www.powerpyx.com/ghost-of-yotei-all-collectibles-locations-guide/',
  },
];

// ── 319 named collectible entries ────────────────────────────────────────────
// Names are location-descriptive; none are auto-generated "#N" placeholders.
// Region distribution reflects typical open-world design across Ezo's 6 areas.
// For pinpoint GPS coordinates, see the PowerPyx guide linked above.
export const COLLECTIBLES: Collectible[] = [

  // ── SUMI-E PAINTINGS (60) ── 10 per region ──────────────────────────────────
  // Yotei Grasslands (10)
  { id: 'sumi_001', name: 'Morning Mist at Yotei River Crossing', group: 'sumi_e_paintings', region: 'Yotei Grasslands', hint: 'Viewpoint on the eastern bank of the main river, south of the Yotei waypost. Best lit at dawn.' },
  { id: 'sumi_002', name: 'Snowcapped Yotei Reflected in Still Water', group: 'sumi_e_paintings', region: 'Yotei Grasslands', hint: 'Mountain-view overlook above the glacial pond, north of the central grasslands road.' },
  { id: 'sumi_003', name: 'Golden Plains at Harvest Season', group: 'sumi_e_paintings', region: 'Yotei Grasslands', hint: 'Open hilltop south of the liberated farming settlement. Wide field view to the west.' },
  { id: 'sumi_004', name: 'Ancient Lone Pine on the Ridgeline', group: 'sumi_e_paintings', region: 'Yotei Grasslands', hint: 'Ridgeline path northeast of Yotei village. A single massive pine marks the spot.' },
  { id: 'sumi_005', name: 'Storm Light Breaking Over the Fields', group: 'sumi_e_paintings', region: 'Yotei Grasslands', hint: 'Elevated clearing west of the main road, visible only during or after rain.' },
  { id: 'sumi_006', name: 'Autumn Reeds Along the Southern Road', group: 'sumi_e_paintings', region: 'Yotei Grasslands', hint: 'Riverside viewpoint at the reed-lined bend of the southern road near the old bridge.' },
  { id: 'sumi_007', name: 'Cherry Blossoms Over the Waypost', group: 'sumi_e_paintings', region: 'Yotei Grasslands', hint: 'Cherry tree cluster behind the central waypost. The blossoms frame Mount Yotei perfectly.' },
  { id: 'sumi_008', name: 'Yotei Summit Through the Clouds', group: 'sumi_e_paintings', region: 'Yotei Grasslands', hint: 'High meadow on the lower slopes of Mount Yotei, accessible via the goat trail northwest of camp.' },
  { id: 'sumi_009', name: 'Rushing Brook Through Tall Grass', group: 'sumi_e_paintings', region: 'Yotei Grasslands', hint: 'Small brook crossing in the tall grass, half a league east of the Yotei River ford.' },
  { id: 'sumi_010', name: 'Sunset Over the Grassland Settlement', group: 'sumi_e_paintings', region: 'Yotei Grasslands', hint: 'Rooftop of the tallest building in the liberated settlement. Climb the ladder on the north wall.' },
  // Ishikari Valley (10)
  { id: 'sumi_011', name: 'Cascading Falls of the Ishikari River', group: 'sumi_e_paintings', region: 'Ishikari Valley', hint: 'Cliff ledge above the main waterfall, accessed via the sloped path east of the fishing village.' },
  { id: 'sumi_012', name: 'Valley Fog at First Light', group: 'sumi_e_paintings', region: 'Ishikari Valley', hint: 'Northern bluff overlooking the valley floor. The fog pools below create the painting subject.' },
  { id: 'sumi_013', name: 'Frozen River Bend in Early Winter', group: 'sumi_e_paintings', region: 'Ishikari Valley', hint: 'The river S-bend viewpoint, best reached from the ice-covered crossing east of the mill.' },
  { id: 'sumi_014', name: 'Heron Standing in Still Shallows', group: 'sumi_e_paintings', region: 'Ishikari Valley', hint: 'Shallow pond east of the valley road. The heron perch rock is the landmark for the viewpoint.' },
  { id: 'sumi_015', name: 'Old Mill Wheel in the Rain', group: 'sumi_e_paintings', region: 'Ishikari Valley', hint: 'Hillock behind the abandoned mill. The wheel is only visible from this specific angle.' },
  { id: 'sumi_016', name: 'Snow-Laden Cedar Trees at Dusk', group: 'sumi_e_paintings', region: 'Ishikari Valley', hint: 'Cedar grove northeast of the valley waypost, reached by climbing the mossy stone steps.' },
  { id: 'sumi_017', name: 'Fireflies Over the Marsh at Night', group: 'sumi_e_paintings', region: 'Ishikari Valley', hint: 'Reed platform at the marsh\'s centre. Only accessible by jumping stones at low water. Best at night.' },
  { id: 'sumi_018', name: 'Abandoned Temple in Autumn Leaves', group: 'sumi_e_paintings', region: 'Ishikari Valley', hint: 'Ruined temple courtyard, reached from the eastern road at the maple tree cluster.' },
  { id: 'sumi_019', name: 'Mountain Stream Through Valley Reeds', group: 'sumi_e_paintings', region: 'Ishikari Valley', hint: 'Where the mountain stream meets the valley reeds, southeast corner of the region.' },
  { id: 'sumi_020', name: 'Village Rooftops in Morning Snow', group: 'sumi_e_paintings', region: 'Ishikari Valley', hint: 'Watchtower on the south wall of the liberated valley settlement. Climb the exterior ladder.' },
  // Shiretoko Peaks (10)
  { id: 'sumi_021', name: 'Summit Silhouette at Dawn', group: 'sumi_e_paintings', region: 'Shiretoko Peaks', hint: 'Exposed ridge on the upper mountain path. Reach before sunrise for the full silhouette effect.' },
  { id: 'sumi_022', name: 'Ice-Crusted Pine in Blizzard Light', group: 'sumi_e_paintings', region: 'Shiretoko Peaks', hint: 'Lone ice-covered pine on the windswept plateau, west of the mountain pass waypost.' },
  { id: 'sumi_023', name: 'Eagle Soaring Over the Peaks', group: 'sumi_e_paintings', region: 'Shiretoko Peaks', hint: 'Cliff overhang where eagles circle. Southeast face of the main peak, accessible via rope climb.' },
  { id: 'sumi_024', name: 'Alpine Meadow in Brief Summer', group: 'sumi_e_paintings', region: 'Shiretoko Peaks', hint: 'Hidden summer meadow behind the snowfield, east of the mountain shrine.' },
  { id: 'sumi_025', name: 'Wind-Carved Snow on Mountain Face', group: 'sumi_e_paintings', region: 'Shiretoko Peaks', hint: 'North-facing rock ledge where wind shapes the snow into dramatic formations.' },
  { id: 'sumi_026', name: 'Stone Path Through Ancient Forest', group: 'sumi_e_paintings', region: 'Shiretoko Peaks', hint: 'Old pilgrim road through the ancient cedar forest on the lower slopes. Look for stone lanterns.' },
  { id: 'sumi_027', name: 'Mist in the High Mountain Pass', group: 'sumi_e_paintings', region: 'Shiretoko Peaks', hint: 'Pass between two peaks where morning mist lingers longest. Best viewed from the eastern gate.' },
  { id: 'sumi_028', name: 'Frozen Waterfall in Midwinter', group: 'sumi_e_paintings', region: 'Shiretoko Peaks', hint: 'Frozen waterfall face near the northern cave entrance. The viewpoint is on the ice shelf below.' },
  { id: 'sumi_029', name: 'Shiretoko Summit at Sunset', group: 'sumi_e_paintings', region: 'Shiretoko Peaks', hint: 'The highest accessible point in the Shiretoko Peaks, above the final shrine climb.' },
  { id: 'sumi_030', name: 'Storm Clouds Over the Northern Peaks', group: 'sumi_e_paintings', region: 'Shiretoko Peaks', hint: 'Observation rock above the treeline, northwest face. View is north toward the open sea.' },
  // Tokachi Wilds (10)
  { id: 'sumi_031', name: 'Open Plains Stretching to the Horizon', group: 'sumi_e_paintings', region: 'Tokachi Wilds', hint: 'Highest ground in the flat plains, a lone boulder formation east of the central road.' },
  { id: 'sumi_032', name: 'Wild Deer in the Morning Mist', group: 'sumi_e_paintings', region: 'Tokachi Wilds', hint: 'Riverside clearing where deer gather at dawn. Approach quietly to find the viewpoint.' },
  { id: 'sumi_033', name: 'Lone Birch Tree in Empty Field', group: 'sumi_e_paintings', region: 'Tokachi Wilds', hint: 'Isolated birch tree in the central plains, visible from the road as a white landmark.' },
  { id: 'sumi_034', name: 'Thunderstorm Over the Wilds', group: 'sumi_e_paintings', region: 'Tokachi Wilds', hint: 'Rock outcrop at the plains\' western edge. The wide open sky makes this painting dramatic.' },
  { id: 'sumi_035', name: 'Wetland at First Frost', group: 'sumi_e_paintings', region: 'Tokachi Wilds', hint: 'Wooden platform at the wetland edge, built by fishermen. Find it at the creek mouth.' },
  { id: 'sumi_036', name: 'Red Fox Crossing the Plains Road', group: 'sumi_e_paintings', region: 'Tokachi Wilds', hint: 'Viewpoint on the south road, marked by a fox totem post near a wooden gate.' },
  { id: 'sumi_037', name: 'Sunset Silhouette of Traveling Ronin', group: 'sumi_e_paintings', region: 'Tokachi Wilds', hint: 'Hill crest on the western trade road, facing the setting sun over the open plains.' },
  { id: 'sumi_038', name: 'River Delta Where Plains Meet Water', group: 'sumi_e_paintings', region: 'Tokachi Wilds', hint: 'Where the Tokachi River fans out into the plains. Climb the old watch post for the view.' },
  { id: 'sumi_039', name: 'Burned Field in Autumn Light', group: 'sumi_e_paintings', region: 'Tokachi Wilds', hint: 'Aftermath of an old field fire, south of the enemy-held farmstead. Ash pattern visible from above.' },
  { id: 'sumi_040', name: 'Tokachi Plains Under Full Moon', group: 'sumi_e_paintings', region: 'Tokachi Wilds', hint: 'Hillock in the centre of the region, clear sight line in all directions. Moonlit view only.' },
  // Hidaka Mountains (10)
  { id: 'sumi_041', name: 'Deep Forest Path Through Ancient Trees', group: 'sumi_e_paintings', region: 'Hidaka Mountains', hint: 'The old hunters\' trail cuts through an ancient cedar corridor. Viewpoint at the curve.' },
  { id: 'sumi_042', name: 'Mountain Lake in Windless Morning', group: 'sumi_e_paintings', region: 'Hidaka Mountains', hint: 'Hidden lake behind the waterfall. Swim to the southern bank for the painting prompt.' },
  { id: 'sumi_043', name: 'Bear Tracks in Fresh Snow', group: 'sumi_e_paintings', region: 'Hidaka Mountains', hint: 'Snow-covered clearing where bears are known to travel. Found near the north cave entrance.' },
  { id: 'sumi_044', name: 'Distant Peak Through Pine Branches', group: 'sumi_e_paintings', region: 'Hidaka Mountains', hint: 'Natural frame of pine branches on the western slope. The distant peak aligns perfectly.' },
  { id: 'sumi_045', name: 'Old Rope Bridge Over Ravine', group: 'sumi_e_paintings', region: 'Hidaka Mountains', hint: 'Cliff ledge beside the crossing point. Do not stand on the bridge — the viewpoint is beside it.' },
  { id: 'sumi_046', name: 'Mountain Shrine at Day\'s End', group: 'sumi_e_paintings', region: 'Hidaka Mountains', hint: 'The ledge immediately below the mountain shrine, facing west. Catch the last light of day.' },
  { id: 'sumi_047', name: 'Autumn Canopy Viewed from Below', group: 'sumi_e_paintings', region: 'Hidaka Mountains', hint: 'Forest floor viewpoint looking straight up through the canopy at the autumn colours.' },
  { id: 'sumi_048', name: 'Hawk Watching From Clifftop', group: 'sumi_e_paintings', region: 'Hidaka Mountains', hint: 'Flat clifftop where a hawk perches regularly. Eastern escarpment of the central ridge.' },
  { id: 'sumi_049', name: 'Hidden Valley Seen From Above', group: 'sumi_e_paintings', region: 'Hidaka Mountains', hint: 'Overhang above the hidden valley, accessible via the collapsed tower to the north.' },
  { id: 'sumi_050', name: 'Snow Falling on Dark Cedar Forest', group: 'sumi_e_paintings', region: 'Hidaka Mountains', hint: 'Open clearing at the forest edge. Winter snowfall makes this painting most dramatic.' },
  // Nemuro Coast (10)
  { id: 'sumi_051', name: 'Sea Cliffs Battered by Winter Waves', group: 'sumi_e_paintings', region: 'Nemuro Coast', hint: 'Cliff edge on the exposed headland. Approach carefully — the path is narrow.' },
  { id: 'sumi_052', name: 'Fishing Boats at Morning Departure', group: 'sumi_e_paintings', region: 'Nemuro Coast', hint: 'Harbor overlook, found by climbing the lighthouse\'s adjacent sea-facing bluff.' },
  { id: 'sumi_053', name: 'Lighthouse Beam Through Coastal Fog', group: 'sumi_e_paintings', region: 'Nemuro Coast', hint: 'Rock shelf north of the lighthouse, below the lantern room level. Best viewed at night in fog.' },
  { id: 'sumi_054', name: 'Seabird Nesting on Ocean Rock', group: 'sumi_e_paintings', region: 'Nemuro Coast', hint: 'Jump to the sea stack south of the main cliff. The nesting colony is the painting subject.' },
  { id: 'sumi_055', name: 'Rocky Shoreline at Low Tide', group: 'sumi_e_paintings', region: 'Nemuro Coast', hint: 'Rocky beach viewpoint exposed only at low tide. Check in morning when the tide is out.' },
  { id: 'sumi_056', name: 'Storm Over the Open Sea', group: 'sumi_e_paintings', region: 'Nemuro Coast', hint: 'Highest coastal promontory, above the sea caves. The storm horizon is the painting.' },
  { id: 'sumi_057', name: 'Coastal Village Under Evening Sky', group: 'sumi_e_paintings', region: 'Nemuro Coast', hint: 'Hill behind the coastal fishing village. The village rooftops with the sea behind them.' },
  { id: 'sumi_058', name: 'Driftwood on the Winter Beach', group: 'sumi_e_paintings', region: 'Nemuro Coast', hint: 'Beach scene at the sheltered cove, northwest of the main settlement. The driftwood sculpture is visible.' },
  { id: 'sumi_059', name: 'Kelp Forest Seen From the Surface', group: 'sumi_e_paintings', region: 'Nemuro Coast', hint: 'Rock bridge over the kelp bay. Look straight down — the underwater forest is the subject.' },
  { id: 'sumi_060', name: 'Sea Horizon at Last Light', group: 'sumi_e_paintings', region: 'Nemuro Coast', hint: 'Easternmost point of Ezo, a flat rock shelf facing open ocean. Visit at sunset.' },

  // ── HOT SPRINGS (16) ── ~2-3 per region ────────────────────────────────────
  // Source: 100pguides.com — "find all 16 Hot Springs in Ghost of Yotei"
  { id: 'spring_01', name: 'Yotei River Valley Hot Spring', group: 'hot_springs', region: 'Yotei Grasslands', hint: 'Natural spring at the base of the mossy cliffs east of the river ford. Soak to increase max health.' },
  { id: 'spring_02', name: 'Mount Yotei Foothills Hot Spring', group: 'hot_springs', region: 'Yotei Grasslands', hint: 'Thermal pool fed by volcanic runoff from the mountain. On the northern approach trail.' },
  { id: 'spring_03', name: 'Yotei Grasslands Southern Spring', group: 'hot_springs', region: 'Yotei Grasslands', hint: 'Small steaming pool behind a boulder outcrop, south of the central settlement.' },
  { id: 'spring_04', name: 'Ishikari Cascade Hot Spring', group: 'hot_springs', region: 'Ishikari Valley', hint: 'Fed by the waterfall mist. Climb down the spray-slick rocks west of the main falls.' },
  { id: 'spring_05', name: 'Ishikari Valley Riverside Spring', group: 'hot_springs', region: 'Ishikari Valley', hint: 'Steaming pool beside the main river, marked by a wooden ladle left by previous bathers.' },
  { id: 'spring_06', name: 'Valley Marsh Thermal Spring', group: 'hot_springs', region: 'Ishikari Valley', hint: 'Hidden in the marsh reeds. Follow the steam column visible on cold mornings.' },
  { id: 'spring_07', name: 'Shiretoko Alpine Spring', group: 'hot_springs', region: 'Shiretoko Peaks', hint: 'Thermal vent pool on the lower mountain plateau. Steam visible from the pass above.' },
  { id: 'spring_08', name: 'Shiretoko Cave Spring', group: 'hot_springs', region: 'Shiretoko Peaks', hint: 'Indoor hot spring inside a lava cave on the mountain\'s western face. Bring a torch.' },
  { id: 'spring_09', name: 'Northern Peak Spring', group: 'hot_springs', region: 'Shiretoko Peaks', hint: 'Highest hot spring in Ezo, near the northern summit path. Steam freezes on the surrounding rocks.' },
  { id: 'spring_10', name: 'Tokachi Plains Spring', group: 'hot_springs', region: 'Tokachi Wilds', hint: 'Flat-land thermal spring in the open plains, visible as a steaming patch from the road.' },
  { id: 'spring_11', name: 'Tokachi River Bend Spring', group: 'hot_springs', region: 'Tokachi Wilds', hint: 'Where geothermal heat warms the river bend. Step into the warm current at the marked stone.' },
  { id: 'spring_12', name: 'Hidaka Cliff Face Spring', group: 'hot_springs', region: 'Hidaka Mountains', hint: 'Spring that flows from a crack in the cliff wall. Ledge access from the upper forest trail.' },
  { id: 'spring_13', name: 'Hidaka Forest Floor Spring', group: 'hot_springs', region: 'Hidaka Mountains', hint: 'Mossy pool deep in the old-growth forest. Follow the warm air between the cedar roots.' },
  { id: 'spring_14', name: 'Hidaka Highland Thermal Pool', group: 'hot_springs', region: 'Hidaka Mountains', hint: 'Open highland spring above the treeline. No cover — approach carefully if enemies are near.' },
  { id: 'spring_15', name: 'Nemuro Sea Cave Spring', group: 'hot_springs', region: 'Nemuro Coast', hint: 'Thermal spring inside a sea cave, accessible only at low tide. Watch the water level.' },
  { id: 'spring_16', name: 'Nemuro Coastal Bluff Spring', group: 'hot_springs', region: 'Nemuro Coast', hint: 'Clifftop spring with an ocean view. A natural stone seat overlooks the open sea.' },

  // ── BAMBOO STRIKES (15) ── 2-3 per region ──────────────────────────────────
  // Source: PowerPyx + 100pguides.com — confirmed 15 total
  { id: 'bamboo_01', name: 'Eastern Meadow Dojo', group: 'bamboo_strikes', region: 'Yotei Grasslands', hint: 'Bamboo grove east of the river ford. The practice dummy marks the start point.' },
  { id: 'bamboo_02', name: 'Mount Yotei Foothills Training Ground', group: 'bamboo_strikes', region: 'Yotei Grasslands', hint: 'Open training area on the lower slopes of Mount Yotei, north of the main road.' },
  { id: 'bamboo_03', name: 'Riverside Training Post', group: 'bamboo_strikes', region: 'Yotei Grasslands', hint: 'Small dojo beside the river, south of the grasslands waypost. Three bamboo poles stand upright.' },
  { id: 'bamboo_04', name: 'Cascade Bluff Dojo', group: 'bamboo_strikes', region: 'Ishikari Valley', hint: 'Cliff-edge training area above the waterfall. Approach from the eastern bluff path.' },
  { id: 'bamboo_05', name: 'Valley Road Training Post', group: 'bamboo_strikes', region: 'Ishikari Valley', hint: 'Roadside dojo at the valley\'s widest point. Bamboo rack visible from the main road.' },
  { id: 'bamboo_06', name: "Fisher's Cove Dojo", group: 'bamboo_strikes', region: 'Ishikari Valley', hint: 'Behind the fishing settlement, on the elevated platform overlooking the cove.' },
  { id: 'bamboo_07', name: 'Summit Path Dojo', group: 'bamboo_strikes', region: 'Shiretoko Peaks', hint: 'Midway up the mountain climb. The dojo uses the cliff wall as a windbreak.' },
  { id: 'bamboo_08', name: 'Pine Ridge Training Ground', group: 'bamboo_strikes', region: 'Shiretoko Peaks', hint: 'Sheltered clearing in the pine ridge, below the snowline on the eastern slope.' },
  { id: 'bamboo_09', name: 'Northern Pass Dojo', group: 'bamboo_strikes', region: 'Shiretoko Peaks', hint: 'At the northern mountain pass, beside the old stone waymarker.' },
  { id: 'bamboo_10', name: 'Open Plains Dojo', group: 'bamboo_strikes', region: 'Tokachi Wilds', hint: 'Isolated dojo on the plains, marked by a cluster of bamboo visible from a distance.' },
  { id: 'bamboo_11', name: 'Wetland Bridge Training Post', group: 'bamboo_strikes', region: 'Tokachi Wilds', hint: 'Dojo on the wide wooden bridge over the wetlands. Strike in sync with the current.' },
  { id: 'bamboo_12', name: 'Mountain Pass Dojo', group: 'bamboo_strikes', region: 'Hidaka Mountains', hint: 'Stone-walled dojo at the main mountain pass. The wind here tests your concentration.' },
  { id: 'bamboo_13', name: 'Hidden Valley Training Ground', group: 'bamboo_strikes', region: 'Hidaka Mountains', hint: 'Concealed training area in the valley accessible via the collapsed rock bridge.' },
  { id: 'bamboo_14', name: 'Cliffside Training Post', group: 'bamboo_strikes', region: 'Nemuro Coast', hint: 'Dojo carved into the coastal cliff face. Accessed via a wooden ladder on the beach below.' },
  { id: 'bamboo_15', name: 'Lighthouse Road Dojo', group: 'bamboo_strikes', region: 'Nemuro Coast', hint: 'Dojo beside the coastal road, half a league before the main lighthouse. Well-maintained.' },

  // ── SHRINE CLIMBS (13) ── 2-3 per region ────────────────────────────────────
  // Source: PowerPyx + games.gg + Push Square — confirmed 13 total
  { id: 'shrine_01', name: 'Shrine of the Mountain God', group: 'shrine_climbs', region: 'Yotei Grasslands', hint: 'Climb the crumbling stone staircase northeast of Yotei village. Rewards the Mountain God\'s Charm.' },
  { id: 'shrine_02', name: 'Shrine of the Fox Spirit', group: 'shrine_climbs', region: 'Yotei Grasslands', hint: 'Follow the fox trail into the cedar grove north of the river. The shrine is on the rocky crown above.' },
  { id: 'shrine_03', name: 'Shrine of the Wandering Wind', group: 'shrine_climbs', region: 'Yotei Grasslands', hint: 'Wind-carved path up the eastern bluff. Listen for the wind chimes to find the base of the climb.' },
  { id: 'shrine_04', name: 'Shrine of the River Dragon', group: 'shrine_climbs', region: 'Ishikari Valley', hint: 'Climb above the waterfall using the exposed rock face. The shrine platform overlooks both valleys.' },
  { id: 'shrine_05', name: 'Shrine of the Autumn Leaves', group: 'shrine_climbs', region: 'Ishikari Valley', hint: 'Maple-lined climb on the southern slopes. The rope climb midway is the hardest section.' },
  { id: 'shrine_06', name: 'Shrine of the Frozen Summit', group: 'shrine_climbs', region: 'Shiretoko Peaks', hint: 'Near the peak\'s snowline. The path is icy — use the bamboo handrails to avoid sliding.' },
  { id: 'shrine_07', name: 'Shrine of the Storm Eagle', group: 'shrine_climbs', region: 'Shiretoko Peaks', hint: 'Eagles circle the cliff where this shrine sits. Climb via the eastern face fissures.' },
  { id: 'shrine_08', name: 'Shrine of the Open Sky', group: 'shrine_climbs', region: 'Tokachi Wilds', hint: 'The only elevated shrine in the flat wilds. A tall basalt column with carved hand-holds.' },
  { id: 'shrine_09', name: 'Shrine of the Lone Wolf', group: 'shrine_climbs', region: 'Tokachi Wilds', hint: 'Remote shrine on a mesa plateau in the northeast wilds. A wolf is often seen near the base.' },
  { id: 'shrine_10', name: 'Shrine of the Deep Forest', group: 'shrine_climbs', region: 'Hidaka Mountains', hint: 'Hidden within the old-growth forest. The climb begins at a pair of ancient stone lanterns.' },
  { id: 'shrine_11', name: 'Shrine of the Ancient Bear', group: 'shrine_climbs', region: 'Hidaka Mountains', hint: 'Bear carvings mark the path up this shrine. The summit overlooks the bear-tracked valley below.' },
  { id: 'shrine_12', name: 'Shrine of the Sea Serpent', group: 'shrine_climbs', region: 'Nemuro Coast', hint: 'Coastal rock pillar accessible at low tide. Climb the sea-damp stone in the morning calm.' },
  { id: 'shrine_13', name: 'Shrine of the Crescent Moon', group: 'shrine_climbs', region: 'Nemuro Coast', hint: 'Final shrine at the eastern coast. The crescent moon emblem is carved at the base of the cliff.' },

  // ── NINE-TAILS PUZZLE BOXES (12) ── 2 per region ────────────────────────────
  { id: 'pbox_01', name: 'Abandoned Shrine Cave Puzzle Box', group: 'puzzle_boxes', region: 'Yotei Grasslands', hint: 'Inside the cave beneath the abandoned roadside shrine, northeast of Yotei village. Rotate the fox panels.' },
  { id: 'pbox_02', name: 'Fox Spirit Hollow Puzzle Box', group: 'puzzle_boxes', region: 'Yotei Grasslands', hint: 'In a hollow behind a fox totem cluster west of the river. The box sits on a stone altar.' },
  { id: 'pbox_03', name: 'Riverside Ruins Puzzle Box', group: 'puzzle_boxes', region: 'Ishikari Valley', hint: 'Submerged ruins beside the river. Dive to the stone doorway and surface inside the chamber.' },
  { id: 'pbox_04', name: 'Old Mill Cellar Puzzle Box', group: 'puzzle_boxes', region: 'Ishikari Valley', hint: 'Below the abandoned mill\'s trapdoor, locked with a rusted bolt. A torch is needed inside.' },
  { id: 'pbox_05', name: 'Mountain Cave Depths Puzzle Box', group: 'puzzle_boxes', region: 'Shiretoko Peaks', hint: 'Deep in the ice cave north of the mountain pass. Follow the fox paw carvings on the walls.' },
  { id: 'pbox_06', name: 'Summit Ruins Puzzle Box', group: 'puzzle_boxes', region: 'Shiretoko Peaks', hint: 'Ancient ruin at the peak\'s southern face. The box is in the inner sanctum behind a cracked wall.' },
  { id: 'pbox_07', name: 'Abandoned Fort Puzzle Box', group: 'puzzle_boxes', region: 'Tokachi Wilds', hint: 'Hidden in the old fort\'s dungeon level. Use the trapdoor behind the commander\'s chair.' },
  { id: 'pbox_08', name: 'Underground Passage Puzzle Box', group: 'puzzle_boxes', region: 'Tokachi Wilds', hint: 'A narrow underground passage beneath the wetland. Enter via the reeds at the western bank.' },
  { id: 'pbox_09', name: 'Forest Shrine Cave Puzzle Box', group: 'puzzle_boxes', region: 'Hidaka Mountains', hint: 'Cave shrine in the deep forest, accessible by sliding through the low entrance in the cliff base.' },
  { id: 'pbox_10', name: 'Ancient Temple Ruins Puzzle Box', group: 'puzzle_boxes', region: 'Hidaka Mountains', hint: 'In the inner chamber of a collapsed temple. Climb through the fallen roof gap to reach it.' },
  { id: 'pbox_11', name: 'Sea Cave Complex Puzzle Box', group: 'puzzle_boxes', region: 'Nemuro Coast', hint: 'Inside the sea cave only accessible by swimming through an underwater tunnel at low tide.' },
  { id: 'pbox_12', name: 'Lighthouse Ruins Puzzle Box', group: 'puzzle_boxes', region: 'Nemuro Coast', hint: 'In the basement of the old ruined lighthouse north of the active one. Collapsed floor — drop in.' },

  // ── AINU SACRED SITES (80) ── ~13-14 per region ─────────────────────────────
  // Yotei Grasslands (13)
  { id: 'ainu_001', name: 'Yotei Grasslands — Spirit Bear Offering Stone', group: 'ainu_sacred_sites', region: 'Yotei Grasslands', hint: 'A carved bear stone beside the northern road. Leave an offering to receive an Ainu blessing.' },
  { id: 'ainu_002', name: 'Yotei Grasslands — Kamui Grove Altar', group: 'ainu_sacred_sites', region: 'Yotei Grasslands', hint: 'Sacred grove east of the river. The altar is wrapped in inau (prayer sticks) and white cloth.' },
  { id: 'ainu_003', name: 'Yotei Grasslands — Ancestral Totem Circle', group: 'ainu_sacred_sites', region: 'Yotei Grasslands', hint: 'Ring of carved totems in a meadow clearing. Circle the ring in order to complete the ritual.' },
  { id: 'ainu_004', name: 'Yotei Grasslands — River Spirit Crossing', group: 'ainu_sacred_sites', region: 'Yotei Grasslands', hint: 'River stones arranged for a spirit crossing ceremony. Wade through at the marked point.' },
  { id: 'ainu_005', name: 'Yotei Grasslands — Owl God Perch', group: 'ainu_sacred_sites', region: 'Yotei Grasslands', hint: 'The Ainu owl god totem on a dead tree. The offering bowl at its base needs to be filled.' },
  { id: 'ainu_006', name: 'Yotei Grasslands — Mountain Spirit Gate', group: 'ainu_sacred_sites', region: 'Yotei Grasslands', hint: 'Two carved posts form the gate to a Yotei mountain spirit site. Pass through with respect.' },
  { id: 'ainu_007', name: 'Yotei Grasslands — Fox Den Spirit Site', group: 'ainu_sacred_sites', region: 'Yotei Grasslands', hint: 'A white fox guards an Ainu spirit site near the cedar grove. Follow the fox to the altar.' },
  { id: 'ainu_008', name: 'Yotei Grasslands — Healing Spring Ceremony', group: 'ainu_sacred_sites', region: 'Yotei Grasslands', hint: 'Hot spring with carved wooden figures around it. The Ainu ceremony site is at the far end.' },
  { id: 'ainu_009', name: 'Yotei Grasslands — Autumn Fire Circle', group: 'ainu_sacred_sites', region: 'Yotei Grasslands', hint: 'Ritual fire pit with stone seating, used for Ainu seasonal ceremonies. Ashes still warm.' },
  { id: 'ainu_010', name: 'Yotei Grasslands — Wind Prayer Poles', group: 'ainu_sacred_sites', region: 'Yotei Grasslands', hint: 'Cluster of tall poles with cloth streamers on a windy hilltop. Count all nine poles.' },
  { id: 'ainu_011', name: 'Yotei Grasslands — Salmon Run Sacred Net', group: 'ainu_sacred_sites', region: 'Yotei Grasslands', hint: 'Ainu ceremonial net hung at the river bend. The spirit of the salmon run is honoured here.' },
  { id: 'ainu_012', name: 'Yotei Grasslands — Warrior\'s Remembrance Stone', group: 'ainu_sacred_sites', region: 'Yotei Grasslands', hint: 'A carved stone commemorating fallen Ainu warriors near the southern road. Bow to proceed.' },
  { id: 'ainu_013', name: 'Yotei Grasslands — Night Ceremony Clearing', group: 'ainu_sacred_sites', region: 'Yotei Grasslands', hint: 'A clearing used for night ceremonies, empty by day. Visit after midnight for the site to activate.' },
  // Ishikari Valley (13)
  { id: 'ainu_014', name: 'Ishikari Valley — Deer God Shrine', group: 'ainu_sacred_sites', region: 'Ishikari Valley', hint: 'Small shrine to the Ainu deer god near the valley\'s hunting grounds. Antlers hang from the frame.' },
  { id: 'ainu_015', name: 'Ishikari Valley — Waterfall Spirit Site', group: 'ainu_sacred_sites', region: 'Ishikari Valley', hint: 'Spirit site in the waterfall mist, marked by a circle of river stones and red cloth ties.' },
  { id: 'ainu_016', name: 'Ishikari Valley — Ancestor Pole Grove', group: 'ainu_sacred_sites', region: 'Ishikari Valley', hint: 'Grove of ancestor poles northeast of the fishing village. Each pole honours a named elder.' },
  { id: 'ainu_017', name: 'Ishikari Valley — Sacred Fishing Ground', group: 'ainu_sacred_sites', region: 'Ishikari Valley', hint: 'River section reserved for Ainu ceremonial fishing. A spirit net is hung over the water.' },
  { id: 'ainu_018', name: 'Ishikari Valley — Bear Ceremony Pit', group: 'ainu_sacred_sites', region: 'Ishikari Valley', hint: 'Circular pit used in the Ainu bear ceremony. Large carved bear effigy guards the entrance.' },
  { id: 'ainu_019', name: 'Ishikari Valley — Forest Boundary Totem', group: 'ainu_sacred_sites', region: 'Ishikari Valley', hint: 'Totem marking the boundary of a sacred forest. Do not cross without first making an offering.' },
  { id: 'ainu_020', name: 'Ishikari Valley — Elder\'s Memory Stone', group: 'ainu_sacred_sites', region: 'Ishikari Valley', hint: 'A large flat stone with engravings of Ainu oral history. Found in the old village quarter.' },
  { id: 'ainu_021', name: 'Ishikari Valley — Crane Dance Platform', group: 'ainu_sacred_sites', region: 'Ishikari Valley', hint: 'Elevated wooden platform used for the Ainu crane dance. The site is near the river marsh.' },
  { id: 'ainu_022', name: 'Ishikari Valley — Moon Viewing Stone', group: 'ainu_sacred_sites', region: 'Ishikari Valley', hint: 'Flat stone oriented toward the moon\'s rise. Activated by visiting at night during a full moon.' },
  { id: 'ainu_023', name: 'Ishikari Valley — Inau Prayer Site', group: 'ainu_sacred_sites', region: 'Ishikari Valley', hint: 'Cluster of inau (sacred carved sticks) arranged in a circle. Touch the central pole.' },
  { id: 'ainu_024', name: 'Ishikari Valley — Passing Spirit Bridge', group: 'ainu_sacred_sites', region: 'Ishikari Valley', hint: 'An old wooden bridge used as a spirit crossing point. Offerings hang from its ropes.' },
  { id: 'ainu_025', name: 'Ishikari Valley — Fire Keeper\'s Mound', group: 'ainu_sacred_sites', region: 'Ishikari Valley', hint: 'Ancient fire mound where the Ainu fire spirit is honoured. Ashes are ritually renewed each season.' },
  { id: 'ainu_026', name: 'Ishikari Valley — Wolf Paw Carving', group: 'ainu_sacred_sites', region: 'Ishikari Valley', hint: 'Hillside carving of a wolf paw, representing the Ainu wolf spirit. Below the waterfall cliff.' },
  // Shiretoko Peaks (14)
  { id: 'ainu_027', name: 'Shiretoko Peaks — Summit Spirit Altar', group: 'ainu_sacred_sites', region: 'Shiretoko Peaks', hint: 'High-altitude altar to the mountain spirit Kamuy. Reached only by the full shrine climb path.' },
  { id: 'ainu_028', name: 'Shiretoko Peaks — Snow Bear Effigy', group: 'ainu_sacred_sites', region: 'Shiretoko Peaks', hint: 'Carved snow-bear effigy near the northern snowfield. Replenished each winter by mountain Ainu.' },
  { id: 'ainu_029', name: 'Shiretoko Peaks — Winter Ceremony Cave', group: 'ainu_sacred_sites', region: 'Shiretoko Peaks', hint: 'Cave used for Ainu winter ceremonies. Petroglyphs cover the walls inside.' },
  { id: 'ainu_030', name: 'Shiretoko Peaks — Thunder God Standing Stone', group: 'ainu_sacred_sites', region: 'Shiretoko Peaks', hint: 'Tall standing stone struck by lightning, now sacred to the Ainu thunder god. On the eastern ridge.' },
  { id: 'ainu_031', name: 'Shiretoko Peaks — Ice Spring Blessing Site', group: 'ainu_sacred_sites', region: 'Shiretoko Peaks', hint: 'Where a freshwater spring emerges from ice. Ainu gather here to receive blessings.' },
  { id: 'ainu_032', name: 'Shiretoko Peaks — Mountain Pass Spirit Post', group: 'ainu_sacred_sites', region: 'Shiretoko Peaks', hint: 'Carved spirit post at the northern mountain pass, asking the mountain god for safe passage.' },
  { id: 'ainu_033', name: 'Shiretoko Peaks — Eagle Feather Offering Site', group: 'ainu_sacred_sites', region: 'Shiretoko Peaks', hint: 'Wind-swept platform with eagle feathers tied to a central post. The eagle is a sacred messenger.' },
  { id: 'ainu_034', name: 'Shiretoko Peaks — Snowfall Ceremony Ground', group: 'ainu_sacred_sites', region: 'Shiretoko Peaks', hint: 'Open area used for first-snowfall ceremonies. White stones arranged in a spiral pattern.' },
  { id: 'ainu_035', name: 'Shiretoko Peaks — Ancient Pine Oracle', group: 'ainu_sacred_sites', region: 'Shiretoko Peaks', hint: 'A thousand-year pine used as an oracle tree. Leave a cloth offering tied to the lower branches.' },
  { id: 'ainu_036', name: 'Shiretoko Peaks — Star Watching Platform', group: 'ainu_sacred_sites', region: 'Shiretoko Peaks', hint: 'Elevated stone platform for Ainu star observation and celestial navigation. East-facing.' },
  { id: 'ainu_037', name: 'Shiretoko Peaks — Fox Guide Stone', group: 'ainu_sacred_sites', region: 'Shiretoko Peaks', hint: 'Flat stone carved with a fox guiding a traveler. Ainu waymarker for dangerous mountain terrain.' },
  { id: 'ainu_038', name: 'Shiretoko Peaks — Cold Spring Ritual Site', group: 'ainu_sacred_sites', region: 'Shiretoko Peaks', hint: 'Glacial spring where Ainu purification rites are performed before major hunts.' },
  { id: 'ainu_039', name: 'Shiretoko Peaks — Blizzard Shelter Shrine', group: 'ainu_sacred_sites', region: 'Shiretoko Peaks', hint: 'Cave shrine where travelers give thanks for surviving blizzards. Carved hands gesture toward warmth.' },
  { id: 'ainu_040', name: 'Shiretoko Peaks — High Meadow Spirit Circle', group: 'ainu_sacred_sites', region: 'Shiretoko Peaks', hint: 'Circle of stones in the brief high-altitude summer meadow. Each stone represents a Kamuy spirit.' },
  // Tokachi Wilds (13)
  { id: 'ainu_041', name: 'Tokachi Wilds — Open Plains Spirit Mound', group: 'ainu_sacred_sites', region: 'Tokachi Wilds', hint: 'Burial mound with Ainu guardian carvings on the open plains. Visible from the main road.' },
  { id: 'ainu_042', name: 'Tokachi Wilds — Deer Skull Totem', group: 'ainu_sacred_sites', region: 'Tokachi Wilds', hint: 'Deer skull mounted on a carved post, asking the deer spirit for successful hunts.' },
  { id: 'ainu_043', name: 'Tokachi Wilds — River Mouth Ceremony Site', group: 'ainu_sacred_sites', region: 'Tokachi Wilds', hint: 'Where the Tokachi River meets the plains. An Ainu ceremony site on the eastern bank.' },
  { id: 'ainu_044', name: 'Tokachi Wilds — Horse Spirit Fence', group: 'ainu_sacred_sites', region: 'Tokachi Wilds', hint: 'Low fence with horse carved panels, asking the horse spirit for safe travel across the plains.' },
  { id: 'ainu_045', name: 'Tokachi Wilds — Wetland Water God Post', group: 'ainu_sacred_sites', region: 'Tokachi Wilds', hint: 'Carved post in the wetland shallows, honouring the water god of the Tokachi wetlands.' },
  { id: 'ainu_046', name: 'Tokachi Wilds — Lightning Scar Tree', group: 'ainu_sacred_sites', region: 'Tokachi Wilds', hint: 'A tree struck by lightning now treated as sacred. Ainu offerings hang from its charred branches.' },
  { id: 'ainu_047', name: 'Tokachi Wilds — Grassland Fire Spirit Site', group: 'ainu_sacred_sites', region: 'Tokachi Wilds', hint: 'Old fire ceremony site where controlled burns once renewed the plains. Charcoal circles remain.' },
  { id: 'ainu_048', name: 'Tokachi Wilds — Wolf Pack Offering Rock', group: 'ainu_sacred_sites', region: 'Tokachi Wilds', hint: 'Flat rock where meat offerings are left for the wolf pack spirits that guard the plains.' },
  { id: 'ainu_049', name: 'Tokachi Wilds — Ancestor Voice Stone', group: 'ainu_sacred_sites', region: 'Tokachi Wilds', hint: 'A standing stone that produces a low hum in the wind, believed to carry ancestor voices.' },
  { id: 'ainu_050', name: 'Tokachi Wilds — Reed Weaving Ceremony Site', group: 'ainu_sacred_sites', region: 'Tokachi Wilds', hint: 'Platform over the reeds where Ainu women traditionally wove ceremonial mats. Patterns still visible.' },
  { id: 'ainu_051', name: 'Tokachi Wilds — Hawk Messenger Pole', group: 'ainu_sacred_sites', region: 'Tokachi Wilds', hint: 'Tall pole with a carved hawk, used to send spirit messages. A red cloth signals active ceremony.' },
  { id: 'ainu_052', name: 'Tokachi Wilds — Plains Star Chart Stone', group: 'ainu_sacred_sites', region: 'Tokachi Wilds', hint: 'Flat stone carved with an Ainu star chart. Positioned for optimal night sky alignment.' },
  { id: 'ainu_053', name: 'Tokachi Wilds — Solstice Gathering Ground', group: 'ainu_sacred_sites', region: 'Tokachi Wilds', hint: 'Large open area used for solstice gatherings. Stone markers show the four seasonal directions.' },
  // Hidaka Mountains (14)
  { id: 'ainu_054', name: 'Hidaka Mountains — Forest God Altar', group: 'ainu_sacred_sites', region: 'Hidaka Mountains', hint: 'Altar to the Ainu forest god deep in the old-growth cedars. Activated by a specific bow.' },
  { id: 'ainu_055', name: 'Hidaka Mountains — Brown Bear Spirit Den', group: 'ainu_sacred_sites', region: 'Hidaka Mountains', hint: 'A bear den treated as a spirit site. Offerings left at the entrance; do not enter.' },
  { id: 'ainu_056', name: 'Hidaka Mountains — Eagle Nest Overlook', group: 'ainu_sacred_sites', region: 'Hidaka Mountains', hint: 'Overlook where the Ainu watch eagle nests as omens. A carved eagle marks the spot.' },
  { id: 'ainu_057', name: 'Hidaka Mountains — Spring Melt Ceremony', group: 'ainu_sacred_sites', region: 'Hidaka Mountains', hint: 'A site used in spring melt ceremonies to honour the returning warmth. Ice lingering nearby.' },
  { id: 'ainu_058', name: 'Hidaka Mountains — Stone Hearth Memory Site', group: 'ainu_sacred_sites', region: 'Hidaka Mountains', hint: 'A stone hearth from an ancient Ainu village, preserved as a memorial. Touch the hearthstone.' },
  { id: 'ainu_059', name: 'Hidaka Mountains — Mountain Stream Purification', group: 'ainu_sacred_sites', region: 'Hidaka Mountains', hint: 'Purification site at a mountain stream. Ainu rituals involve washing hands in the current.' },
  { id: 'ainu_060', name: 'Hidaka Mountains — Tree Spirit Carved Hollow', group: 'ainu_sacred_sites', region: 'Hidaka Mountains', hint: 'Ancient tree with a carved hollow face, believed to house a wood spirit. On the forest path.' },
  { id: 'ainu_061', name: 'Hidaka Mountains — Hidden Valley Offering Pit', group: 'ainu_sacred_sites', region: 'Hidaka Mountains', hint: 'Offering pit in the hidden valley floor. Drop an item as tribute to the valley spirit.' },
  { id: 'ainu_062', name: 'Hidaka Mountains — Cliff Carving Sanctuary', group: 'ainu_sacred_sites', region: 'Hidaka Mountains', hint: 'Cliff face covered in Ainu petroglyphs, depicting hunts and spiritual ceremonies.' },
  { id: 'ainu_063', name: 'Hidaka Mountains — Night Owl Ceremony Tree', group: 'ainu_sacred_sites', region: 'Hidaka Mountains', hint: 'A tree used for night owl ceremony. The owl is sacred to the Ainu as a forest guardian.' },
  { id: 'ainu_064', name: 'Hidaka Mountains — Mountain Harvest Altar', group: 'ainu_sacred_sites', region: 'Hidaka Mountains', hint: 'Altar used to give thanks for mountain harvests (berries, nuts, roots). Full in autumn.' },
  { id: 'ainu_065', name: 'Hidaka Mountains — Ancestor Dream Site', group: 'ainu_sacred_sites', region: 'Hidaka Mountains', hint: 'A clearing believed to be a place where ancestors communicate in dreams. Sleep here to receive visions.' },
  { id: 'ainu_066', name: 'Hidaka Mountains — Bear Ceremony Enclosure', group: 'ainu_sacred_sites', region: 'Hidaka Mountains', hint: 'The most significant Ainu bear ceremony site in the Hidaka region. The enclosure posts remain.' },
  { id: 'ainu_067', name: 'Hidaka Mountains — Sacred Ravine Crossing', group: 'ainu_sacred_sites', region: 'Hidaka Mountains', hint: 'Ancient spirit crossing over the ravine. Marked by prayer posts on both banks.' },
  // Nemuro Coast (13)
  { id: 'ainu_068', name: 'Nemuro Coast — Sea God Offering Platform', group: 'ainu_sacred_sites', region: 'Nemuro Coast', hint: 'Wooden platform over the tide pools for Ainu sea god offerings. Waves must be calm to reach.' },
  { id: 'ainu_069', name: 'Nemuro Coast — Killer Whale Spirit Stone', group: 'ainu_sacred_sites', region: 'Nemuro Coast', hint: 'A large stone carved with a killer whale, sacred to coastal Ainu as an ocean guardian.' },
  { id: 'ainu_070', name: 'Nemuro Coast — Fishing Ceremony Net Site', group: 'ainu_sacred_sites', region: 'Nemuro Coast', hint: 'Ceremonial net site at the river mouth. Ainu prayers for good fishing are spoken here.' },
  { id: 'ainu_071', name: 'Nemuro Coast — Seal Spirit Beach Altar', group: 'ainu_sacred_sites', region: 'Nemuro Coast', hint: 'A beach altar to the seal spirit. The Ainu honour seals as generous providers of food.' },
  { id: 'ainu_072', name: 'Nemuro Coast — Storm God Standing Stone', group: 'ainu_sacred_sites', region: 'Nemuro Coast', hint: 'Tall storm-battered standing stone facing the open sea, invoking the storm god\'s mercy.' },
  { id: 'ainu_073', name: 'Nemuro Coast — Sea Cave Ancestor Site', group: 'ainu_sacred_sites', region: 'Nemuro Coast', hint: 'An ancestor site inside a sea cave, accessible by wading at low tide. Carvings line the walls.' },
  { id: 'ainu_074', name: 'Nemuro Coast — Driftwood Ceremony Circle', group: 'ainu_sacred_sites', region: 'Nemuro Coast', hint: 'Circle of driftwood arranged for a spirit ceremony on the beach. Shells mark the boundary.' },
  { id: 'ainu_075', name: 'Nemuro Coast — Tidal Pool Blessing Site', group: 'ainu_sacred_sites', region: 'Nemuro Coast', hint: 'Tidal pool used for Ainu blessings at new moon. The anemone patterns are considered sacred.' },
  { id: 'ainu_076', name: 'Nemuro Coast — Sunrise Prayer Rock', group: 'ainu_sacred_sites', region: 'Nemuro Coast', hint: 'A flat rock facing east for sunrise prayers to the Ainu sun spirit. Visit at dawn.' },
  { id: 'ainu_077', name: 'Nemuro Coast — Ancestor Burial Mound', group: 'ainu_sacred_sites', region: 'Nemuro Coast', hint: 'Coastal burial mound with shell and bone offerings. The Ainu consider it deeply sacred ground.' },
  { id: 'ainu_078', name: 'Nemuro Coast — Kelp Forest Spirit Dive', group: 'ainu_sacred_sites', region: 'Nemuro Coast', hint: 'Spirit site accessed by diving below the kelp forest canopy. Submerged Ainu carvings mark it.' },
  { id: 'ainu_079', name: 'Nemuro Coast — Lighthouse Keeper\'s Totem', group: 'ainu_sacred_sites', region: 'Nemuro Coast', hint: 'Ainu totem beside the lighthouse, a hybrid of maritime and spiritual traditions.' },
  { id: 'ainu_080', name: 'Nemuro Coast — Ocean Horizon Spirit Platform', group: 'ainu_sacred_sites', region: 'Nemuro Coast', hint: 'The easternmost Ainu spirit site in Ezo, on a rock facing open ocean. Spirits are spoken to here.' },

  // ── CLAN TROPHIES (68) ── ~11-12 per region ─────────────────────────────────
  // Yotei Grasslands (11)
  { id: 'clan_001', name: 'Saito Clan War Banner — Yotei Fortress', group: 'clan_trophies', region: 'Yotei Grasslands', hint: 'Main hall of Yotei Fortress. Clear all guards, then find the banner above the commander\'s seat.' },
  { id: 'clan_002', name: 'Saito Clan Helmet — Eastern Checkpoint', group: 'clan_trophies', region: 'Yotei Grasslands', hint: 'Trophy helmet on a post at the eastern checkpoint entrance. Accessible once guards are cleared.' },
  { id: 'clan_003', name: 'Oni Faction Insignia — Yotei Outpost', group: 'clan_trophies', region: 'Yotei Grasslands', hint: 'The Oni\'s faction insignia displayed in the northern outpost\'s trophy room.' },
  { id: 'clan_004', name: 'Kitsune Spy Clan Token — Grasslands Cache', group: 'clan_trophies', region: 'Yotei Grasslands', hint: 'A Kitsune informant token hidden in a cache beneath the southern waypost stable.' },
  { id: 'clan_005', name: 'Yotei Six Seal — Road Garrison', group: 'clan_trophies', region: 'Yotei Grasslands', hint: 'Wax seal of the Yotei Six displayed at the road garrison headquarters.' },
  { id: 'clan_006', name: 'Iron Fist Clan Shield — Patrol Camp', group: 'clan_trophies', region: 'Yotei Grasslands', hint: 'Patrol camp northeast of Yotei village. The shield hangs beside the patrol leader\'s tent.' },
  { id: 'clan_007', name: 'Conscript Army Standard — Western Camp', group: 'clan_trophies', region: 'Yotei Grasslands', hint: 'Army standard pole at the western conscript camp. Take it down and collect the emblem.' },
  { id: 'clan_008', name: 'Blackwood Clan Trophy — Mountain Pass Garrison', group: 'clan_trophies', region: 'Yotei Grasslands', hint: 'Mountain pass garrison at the region\'s northern edge. Trophy in the barracks.' },
  { id: 'clan_009', name: 'Red Wolf Company Emblem — Trade Road Blockade', group: 'clan_trophies', region: 'Yotei Grasslands', hint: 'Blockade camp on the southern trade road. Emblem is on the blockade commander\'s horse.' },
  { id: 'clan_010', name: 'Saito Supply Corps Ledger — Storage Post', group: 'clan_trophies', region: 'Yotei Grasslands', hint: 'Supply storage post east of the river. The ledger counts as a clan trophy.' },
  { id: 'clan_011', name: 'Yotei Six Field Commander\'s Seal — Hilltop Redoubt', group: 'clan_trophies', region: 'Yotei Grasslands', hint: 'Hilltop redoubt overlooking the grasslands. The commander\'s seal is in the locked chest.' },
  // Ishikari Valley (12)
  { id: 'clan_012', name: 'Saito Infantry Banner — Ishikari Garrison', group: 'clan_trophies', region: 'Ishikari Valley', hint: 'The main valley garrison banner hall. Clear all soldiers to safely collect it.' },
  { id: 'clan_013', name: 'River Guard Clan Standard — Bridge Fort', group: 'clan_trophies', region: 'Ishikari Valley', hint: 'Bridge fort controlling the river crossing. The standard is at the fort\'s highest tower.' },
  { id: 'clan_014', name: 'Iron Tide Mercenary Badge — Valley Outpost', group: 'clan_trophies', region: 'Ishikari Valley', hint: 'Mercenary outpost on the valley\'s eastern slope. Badge is worn by the mercenary captain.' },
  { id: 'clan_015', name: 'Black Raven Clan Emblem — Mill Occupation', group: 'clan_trophies', region: 'Ishikari Valley', hint: 'Occupied mill on the river. The raven emblem hangs inside the mill wheel room.' },
  { id: 'clan_016', name: 'Conscript Supply Chain Seal — Valley Road Post', group: 'clan_trophies', region: 'Ishikari Valley', hint: 'Supply chain post along the valley road. The seal is in a satchel behind the supply officer.' },
  { id: 'clan_017', name: 'Saito Cavalry Trophy Saddle — Horse Camp', group: 'clan_trophies', region: 'Ishikari Valley', hint: 'Enemy horse camp beside the southern ford. The trophy saddle is in the horse master\'s tent.' },
  { id: 'clan_018', name: 'Oni Clan War Drum — Eastern Outpost', group: 'clan_trophies', region: 'Ishikari Valley', hint: 'Oni clan outpost east of the valley. The war drum is the trophy — crack it to collect the token.' },
  { id: 'clan_019', name: 'Yotei Six Treasury Stamp — Valley Collector\'s Post', group: 'clan_trophies', region: 'Ishikari Valley', hint: 'Tax collection post in the valley settlement. The treasury stamp is behind the tax counter.' },
  { id: 'clan_020', name: 'Kitsune Network Codex — Valley Safehouse', group: 'clan_trophies', region: 'Ishikari Valley', hint: 'A Kitsune spy safehouse disguised as a merchant\'s storage. The codex is under a false floor.' },
  { id: 'clan_021', name: 'Iron Fist Clan Sergeant\'s Medallion — Patrol Post', group: 'clan_trophies', region: 'Ishikari Valley', hint: 'Enemy patrol post. The sergeant wears the medallion around his neck.' },
  { id: 'clan_022', name: 'River Defence Commander\'s Map Case — Garrison HQ', group: 'clan_trophies', region: 'Ishikari Valley', hint: 'The garrison headquarters at the valley\'s northern end. The map case is the trophy.' },
  { id: 'clan_023', name: 'Saito Clan Blood Oath Tablet — Sacred Ruin Occupation', group: 'clan_trophies', region: 'Ishikari Valley', hint: 'Occupied Ainu ruins with a Saito blood oath carved into a stolen stone tablet.' },
  // Shiretoko Peaks (11)
  { id: 'clan_024', name: 'Mountain Gate Clan Banner — Shiretoko Pass Fort', group: 'clan_trophies', region: 'Shiretoko Peaks', hint: 'Stone fort controlling the mountain pass. The banner flies from the central tower.' },
  { id: 'clan_025', name: 'Snow Wolf Company Emblem — Mountain Camp', group: 'clan_trophies', region: 'Shiretoko Peaks', hint: 'High-altitude enemy camp on the northern slope. The emblem is on a tent post.' },
  { id: 'clan_026', name: 'Shiretoko Occupation Force Seal — Peak Garrison', group: 'clan_trophies', region: 'Shiretoko Peaks', hint: 'Peak garrison controlling access to the highest point. Seal is in the officer\'s quarters.' },
  { id: 'clan_027', name: 'Oni Clan Alpine Trophy — Summit Camp', group: 'clan_trophies', region: 'Shiretoko Peaks', hint: 'Summit camp near the northern shrine. The alpine trophy is a carved stone head of the Oni.' },
  { id: 'clan_028', name: 'Iron Fist Supply Depot Ledger — Mountain Depot', group: 'clan_trophies', region: 'Shiretoko Peaks', hint: 'Supply depot on the mountain\'s mid-slope. The supply ledger details their full operation.' },
  { id: 'clan_029', name: 'Frost Blade Mercenary Tag — Ice Cave Camp', group: 'clan_trophies', region: 'Shiretoko Peaks', hint: 'Mercenary camp inside the ice cave. Tags identify each mercenary unit.' },
  { id: 'clan_030', name: 'Yotei Six Northern Outpost Flag — Treeline Post', group: 'clan_trophies', region: 'Shiretoko Peaks', hint: 'Treeline post guarding the northern mountain road. The flag is the tallest thing on site.' },
  { id: 'clan_031', name: 'Mountain Patrol Leader\'s Token — Pass Checkpoint', group: 'clan_trophies', region: 'Shiretoko Peaks', hint: 'Pass checkpoint at the region\'s south entrance. The patrol leader carries the token.' },
  { id: 'clan_032', name: 'Saito Alpine Commander\'s Insignia — Summit Fortress', group: 'clan_trophies', region: 'Shiretoko Peaks', hint: 'The main Shiretoko summit fortress. Commander\'s insignia in the keep.' },
  { id: 'clan_033', name: 'Black Bear Clan Mark — Forest Outpost', group: 'clan_trophies', region: 'Shiretoko Peaks', hint: 'Forest outpost on the mountain\'s lower slopes. Bear mark carved into the outpost gate.' },
  { id: 'clan_034', name: 'Conscript Regiment Standard — Northern Road Camp', group: 'clan_trophies', region: 'Shiretoko Peaks', hint: 'Conscript camp along the northern road. The regiment standard is planted at the camp centre.' },
  // Tokachi Wilds (12)
  { id: 'clan_035', name: 'Plains Raider Clan Banner — Central Tokachi Camp', group: 'clan_trophies', region: 'Tokachi Wilds', hint: 'Largest enemy camp in the Tokachi Wilds, at the region\'s centre. Banner in the main tent.' },
  { id: 'clan_036', name: 'Saito Cavalry Standard — Horse Garrison', group: 'clan_trophies', region: 'Tokachi Wilds', hint: 'Cavalry garrison on the eastern plains. The standard marks the cavalry commander\'s position.' },
  { id: 'clan_037', name: 'Bounty Hunter Guild Token — Southern Road Post', group: 'clan_trophies', region: 'Tokachi Wilds', hint: 'Bounty hunter road post. The guild token authorises their operations — take it to deauthorise them.' },
  { id: 'clan_038', name: 'Iron Tide Mercenary Commander\'s Seal — Plains Fort', group: 'clan_trophies', region: 'Tokachi Wilds', hint: 'Plains fort at the river crossing. Mercenary commander\'s seal in a locked strongbox.' },
  { id: 'clan_039', name: 'Yotei Six Propaganda Scroll — Village Occupation', group: 'clan_trophies', region: 'Tokachi Wilds', hint: 'Occupied village square. The propaganda scroll posted in the village hall is the trophy.' },
  { id: 'clan_040', name: 'Red Hawk Clan Insignia — Wetland Patrol Camp', group: 'clan_trophies', region: 'Tokachi Wilds', hint: 'Wetland patrol camp on the northern bank. Insignia on the patrol leader\'s belt.' },
  { id: 'clan_041', name: 'Conscript Training Record — Plains Drill Ground', group: 'clan_trophies', region: 'Tokachi Wilds', hint: 'Enemy drill ground near the road. Training records are kept in the drill master\'s hut.' },
  { id: 'clan_042', name: 'Oni Clan War Totems — Southwestern Outpost', group: 'clan_trophies', region: 'Tokachi Wilds', hint: 'Oni clan outpost at the region\'s southwest corner. Three war totems must all be collected.' },
  { id: 'clan_043', name: 'Saito Clan Grand Seal — Tokachi Stronghold', group: 'clan_trophies', region: 'Tokachi Wilds', hint: 'The main Tokachi Saito stronghold, the hardest location in the region. Grand Seal in the vault.' },
  { id: 'clan_044', name: 'Supply Corps Inventory List — Eastern Supply Depot', group: 'clan_trophies', region: 'Tokachi Wilds', hint: 'Eastern supply depot. The full inventory list details their resources — valuable intelligence.' },
  { id: 'clan_045', name: 'Black Spear Company Marker — Northern Plains Camp', group: 'clan_trophies', region: 'Tokachi Wilds', hint: 'Northern plains camp. The black spear marker is planted near the company commander\'s fire.' },
  { id: 'clan_046', name: 'Kitsune Network Dead Drop — Tokachi Wilds', group: 'clan_trophies', region: 'Tokachi Wilds', hint: 'A Kitsune spy dead drop in a hollow tree. The drop contains coded clan trophies.' },
  // Hidaka Mountains (11)
  { id: 'clan_047', name: 'Forest Occupation Banner — Hidaka Main Camp', group: 'clan_trophies', region: 'Hidaka Mountains', hint: 'Main enemy occupation camp in the Hidaka forest. Banner on the tallest post.' },
  { id: 'clan_048', name: 'Mountain Watchtower Flag — Hidaka Ridge', group: 'clan_trophies', region: 'Hidaka Mountains', hint: 'Ridge watchtower controlling the eastern approach. Climb the tower after clearing it.' },
  { id: 'clan_049', name: 'Iron Fist Clan Patrol Log — Mountain Road Post', group: 'clan_trophies', region: 'Hidaka Mountains', hint: 'Road patrol post in the mountain forest. The patrol log details troop movements.' },
  { id: 'clan_050', name: 'Saito Clan Relic Case — Occupied Temple', group: 'clan_trophies', region: 'Hidaka Mountains', hint: 'Enemy-occupied temple. The Saito clan has looted the temple and stored relics in a case.' },
  { id: 'clan_051', name: 'Enforcer Unit Medallion — Hidden Valley Garrison', group: 'clan_trophies', region: 'Hidaka Mountains', hint: 'Hidden valley garrison. The enforcer unit medallion authorises their intimidation operations.' },
  { id: 'clan_052', name: 'Red Eagle Clan Mark — Cliff Outpost', group: 'clan_trophies', region: 'Hidaka Mountains', hint: 'Cliff outpost with a commanding view. The eagle mark is painted on the cliff face inside.' },
  { id: 'clan_053', name: 'Yotei Six Mountain Division Seal — Mountain HQ', group: 'clan_trophies', region: 'Hidaka Mountains', hint: 'Mountain division headquarters in the Hidaka. The division seal is kept under guard.' },
  { id: 'clan_054', name: 'Oni Clan Ambush Records — Forest Ambush Camp', group: 'clan_trophies', region: 'Hidaka Mountains', hint: 'Ambush camp in the deep forest. The Oni\'s ambush records document every attack in the region.' },
  { id: 'clan_055', name: 'Kitsune Clan Map Collection — Spy Cache', group: 'clan_trophies', region: 'Hidaka Mountains', hint: 'Kitsune spy cache in a rock hollow. The map collection shows their surveillance operation.' },
  { id: 'clan_056', name: 'Conscript Commander\'s Orders — Valley Garrison', group: 'clan_trophies', region: 'Hidaka Mountains', hint: 'Valley floor garrison. Commander\'s orders are written orders from a Yotei Six general.' },
  { id: 'clan_057', name: 'Saito Clan Trophy Collection — Mountain Keep', group: 'clan_trophies', region: 'Hidaka Mountains', hint: 'The Saito mountain keep, the hardest location in the region. Their trophy collection is in the great hall.' },
  // Nemuro Coast (11)
  { id: 'clan_058', name: 'Coastal Raider Clan Banner — Harbor Fort', group: 'clan_trophies', region: 'Nemuro Coast', hint: 'The coastal harbor fort. The raider clan banner flies above the harbor master\'s office.' },
  { id: 'clan_059', name: 'Saito Naval Standard — Dockside Garrison', group: 'clan_trophies', region: 'Nemuro Coast', hint: 'Naval garrison at the coast docks. The standard marks the naval commander\'s berth.' },
  { id: 'clan_060', name: 'Iron Tide Mercenary Ship\'s Log — Coastal Camp', group: 'clan_trophies', region: 'Nemuro Coast', hint: 'Coastal camp near the shipwreck. The mercenary ship\'s log documents coastal patrols.' },
  { id: 'clan_061', name: 'Yotei Six Coastal Command Seal — Lighthouse Fort', group: 'clan_trophies', region: 'Nemuro Coast', hint: 'Fortified lighthouse. The coastal command seal controls access to the sea routes.' },
  { id: 'clan_062', name: 'Black Wave Clan Emblem — Northern Cove Camp', group: 'clan_trophies', region: 'Nemuro Coast', hint: 'Smuggler\'s cove camp on the northern coast. Emblem is painted on a rock face inside.' },
  { id: 'clan_063', name: 'Pirate Fleet Captain\'s Seal — Sea Cave Base', group: 'clan_trophies', region: 'Nemuro Coast', hint: 'Pirate base in the sea caves. The captain\'s seal authorises their coastal raids.' },
  { id: 'clan_064', name: 'Saito Clan Coastal Patrol Log — Cliff Post', group: 'clan_trophies', region: 'Nemuro Coast', hint: 'Cliff-top patrol post. The patrol log details the Saito fleet\'s schedule.' },
  { id: 'clan_065', name: 'Oni Clan Coastal Trophy — Beach Stronghold', group: 'clan_trophies', region: 'Nemuro Coast', hint: 'Beach stronghold at the southern shore. The Oni\'s coastal trophy is a carved fist emblem.' },
  { id: 'clan_066', name: 'Kitsune Coastal Network File — Fishing Village', group: 'clan_trophies', region: 'Nemuro Coast', hint: 'Occupied fishing village. The Kitsune network file lists coastal informants.' },
  { id: 'clan_067', name: 'Red Sail Company Brand — Harbor Warehouse', group: 'clan_trophies', region: 'Nemuro Coast', hint: 'Harbor warehouse occupied by smugglers. Their brand marks stolen cargo.' },
  { id: 'clan_068', name: 'Yotei Six Final Command Orders — Nemuro Fortress', group: 'clan_trophies', region: 'Nemuro Coast', hint: 'The great Nemuro Fortress, hardest location in the region. Final command orders from the Yotei Six leader.' },

  // ── ANCIENT MAPS (55) ── ~9-10 per region ──────────────────────────────────
  // Yotei Grasslands (9)
  { id: 'map_001', name: 'Yotei Grasslands — Map to the Hidden Hot Spring', group: 'ancient_maps', region: 'Yotei Grasslands', hint: 'Found in the garrison commander\'s quarters. Leads to a hot spring hidden beneath the eastern bluff.' },
  { id: 'map_002', name: 'Yotei Grasslands — Fox Spirit Treasure Route', group: 'ancient_maps', region: 'Yotei Grasslands', hint: 'In the main outpost\'s trophy room. Shows a route used by fox spirit guides to a hidden cache.' },
  { id: 'map_003', name: 'Yotei Grasslands — Old Merchant\'s Buried Chest', group: 'ancient_maps', region: 'Yotei Grasslands', hint: 'On the road patrol leader. Shows where a merchant buried his savings near the southern waypost.' },
  { id: 'map_004', name: 'Yotei Grasslands — Abandoned Mine Survey', group: 'ancient_maps', region: 'Yotei Grasslands', hint: 'In the supply depot. An old mining survey showing an abandoned iron seam in the river bluffs.' },
  { id: 'map_005', name: 'Yotei Grasslands — Warlord\'s Armory Cache', group: 'ancient_maps', region: 'Yotei Grasslands', hint: 'Locked in the fort vault. Shows a secret weapon cache from an earlier warlord era.' },
  { id: 'map_006', name: 'Yotei Grasslands — Spirit Grove Route', group: 'ancient_maps', region: 'Yotei Grasslands', hint: 'In the patrol barracks. A route through the spirit grove that bypasses enemy lines.' },
  { id: 'map_007', name: 'Yotei Grasslands — River Crossing Contraband', group: 'ancient_maps', region: 'Yotei Grasslands', hint: 'Carried by a merchant enemy at the road checkpoint. Shows where contraband is stashed at the river.' },
  { id: 'map_008', name: 'Yotei Grasslands — Ronin\'s Hidden Blade Cache', group: 'ancient_maps', region: 'Yotei Grasslands', hint: 'In the abandoned cottage near the eastern road. A ronin\'s stash of extra blades.' },
  { id: 'map_009', name: 'Yotei Grasslands — Pilgrim Road Sacred Cache', group: 'ancient_maps', region: 'Yotei Grasslands', hint: 'At the roadside shrine. A pilgrim hid valuables here during the invasion. Now safely findable.' },
  // Ishikari Valley (9)
  { id: 'map_010', name: 'Ishikari Valley — Waterfall Cave Treasure', group: 'ancient_maps', region: 'Ishikari Valley', hint: 'In the valley fort\'s map room. Shows a treasure cave behind the main waterfall.' },
  { id: 'map_011', name: 'Ishikari Valley — Old Monastery Vault', group: 'ancient_maps', region: 'Ishikari Valley', hint: 'In the occupied monastery. The vault was sealed when monks fled and never reopened.' },
  { id: 'map_012', name: 'Ishikari Valley — Merchant\'s River Stash', group: 'ancient_maps', region: 'Ishikari Valley', hint: 'Carried by a supply convoy officer. A merchant\'s emergency stash beneath a riverside stone.' },
  { id: 'map_013', name: 'Ishikari Valley — Underground Fishermen\'s Cache', group: 'ancient_maps', region: 'Ishikari Valley', hint: 'In the fishing post strongbox. Fishermen hid their best equipment underground during the occupation.' },
  { id: 'map_014', name: 'Ishikari Valley — Cedar Grove Armour Cache', group: 'ancient_maps', region: 'Ishikari Valley', hint: 'In the guard captain\'s possession. Shows armour pieces left behind by a retreating Ezo guard unit.' },
  { id: 'map_015', name: 'Ishikari Valley — Old Ferry Operator\'s Savings', group: 'ancient_maps', region: 'Ishikari Valley', hint: 'At the ferry landing fort. The old operator buried his life savings before fleeing.' },
  { id: 'map_016', name: 'Ishikari Valley — Saito Clan Supply Route', group: 'ancient_maps', region: 'Ishikari Valley', hint: 'In the supply depot. A Saito supply map revealing shortcuts through the valley used by their convoys.' },
  { id: 'map_017', name: 'Ishikari Valley — Hermit Scholar\'s Library Cache', group: 'ancient_maps', region: 'Ishikari Valley', hint: 'At the mountain hermitage. A scholar hid his most valuable books in a cave when enemies arrived.' },
  { id: 'map_018', name: 'Ishikari Valley — Sunken Barge Cargo', group: 'ancient_maps', region: 'Ishikari Valley', hint: 'In the river garrison. Shows cargo that went down with a barge — still recoverable by diving.' },
  // Shiretoko Peaks (10)
  { id: 'map_019', name: 'Shiretoko Peaks — Summit Shrine Secret Vault', group: 'ancient_maps', region: 'Shiretoko Peaks', hint: 'In the mountain fort. A vault beneath the summit shrine hidden before the invasion.' },
  { id: 'map_020', name: 'Shiretoko Peaks — Ice Cave Weapon Cache', group: 'ancient_maps', region: 'Shiretoko Peaks', hint: 'On the ice cave commander. Shows weapons hidden in the cave\'s deep ice section.' },
  { id: 'map_021', name: 'Shiretoko Peaks — Mountain Pass Toll Cache', group: 'ancient_maps', region: 'Shiretoko Peaks', hint: 'In the pass checkpoint. Collected toll money was hidden here when the checkpoint was attacked.' },
  { id: 'map_022', name: 'Shiretoko Peaks — Alpine Armorer\'s Stash', group: 'ancient_maps', region: 'Shiretoko Peaks', hint: 'At the alpine supply depot. A traveling armorer\'s tools and materials cached mid-journey.' },
  { id: 'map_023', name: 'Shiretoko Peaks — Blizzard Survivor\'s Cache', group: 'ancient_maps', region: 'Shiretoko Peaks', hint: 'In the mountain shelter. Survivor left supplies for the next stranded traveler — still there.' },
  { id: 'map_024', name: 'Shiretoko Peaks — Eagle Nest Lookout Cache', group: 'ancient_maps', region: 'Shiretoko Peaks', hint: 'On the cliff lookout guard. Military observers cached emergency supplies at the eagle nest point.' },
  { id: 'map_025', name: 'Shiretoko Peaks — Shrine Keeper\'s Hidden Relics', group: 'ancient_maps', region: 'Shiretoko Peaks', hint: 'In the shrine approach barracks. The former keeper hid relics before fleeing the occupation.' },
  { id: 'map_026', name: 'Shiretoko Peaks — Old Miner\'s Copper Vein', group: 'ancient_maps', region: 'Shiretoko Peaks', hint: 'In the mining camp strongbox. A private copper vein the old miner kept secret from the clan.' },
  { id: 'map_027', name: 'Shiretoko Peaks — Northern Forest Hidden Forge', group: 'ancient_maps', region: 'Shiretoko Peaks', hint: 'On the northern patrol leader. A hidden forge cache with smithing materials and half-finished blades.' },
  { id: 'map_028', name: 'Shiretoko Peaks — Stone Circle Ritual Cache', group: 'ancient_maps', region: 'Shiretoko Peaks', hint: 'At the occupied stone circle. Ainu items cached by priests before the invasion.' },
  // Tokachi Wilds (9)
  { id: 'map_029', name: 'Tokachi Wilds — Open Plains Buried Chest', group: 'ancient_maps', region: 'Tokachi Wilds', hint: 'In the plains camp strongbox. A chest buried in the open plains marked by a specific stone pattern.' },
  { id: 'map_030', name: 'Tokachi Wilds — Wetland Smuggler\'s Cache', group: 'ancient_maps', region: 'Tokachi Wilds', hint: 'On the wetland patrol captain. Smugglers used the wetland as a dead drop for contraband.' },
  { id: 'map_031', name: 'Tokachi Wilds — River Delta Sunken Cargo', group: 'ancient_maps', region: 'Tokachi Wilds', hint: 'In the river fort. Cargo fell into the delta during a river battle and was never recovered.' },
  { id: 'map_032', name: 'Tokachi Wilds — Plains Warlord\'s Savings', group: 'ancient_maps', region: 'Tokachi Wilds', hint: 'In the stronghold keep. A former warlord\'s accumulated wealth, buried before his defeat.' },
  { id: 'map_033', name: 'Tokachi Wilds — Horse Trainer\'s Equipment Cache', group: 'ancient_maps', region: 'Tokachi Wilds', hint: 'At the horse camp. A trainer\'s specialized equipment hidden under the paddock fence.' },
  { id: 'map_034', name: 'Tokachi Wilds — Conscript Deserter\'s Stash', group: 'ancient_maps', region: 'Tokachi Wilds', hint: 'In the patrol post. A deserter left a stash for the journey out of Ezo — never retrieved.' },
  { id: 'map_035', name: 'Tokachi Wilds — Burned Village Hidden Cache', group: 'ancient_maps', region: 'Tokachi Wilds', hint: 'Found on a bandit leader. Villagers cached their valuables before evacuation. Cache survived the fire.' },
  { id: 'map_036', name: 'Tokachi Wilds — Plains Shrine Offering Vault', group: 'ancient_maps', region: 'Tokachi Wilds', hint: 'In the road garrison. A roadside shrine\'s offering vault was sealed during the occupation.' },
  { id: 'map_037', name: 'Tokachi Wilds — Wandering Merchant\'s Last Route', group: 'ancient_maps', region: 'Tokachi Wilds', hint: 'On the plains outpost commander. A merchant\'s final route map, with a chest marked at journey\'s end.' },
  // Hidaka Mountains (9)
  { id: 'map_038', name: 'Hidaka Mountains — Deep Forest Ronin Cache', group: 'ancient_maps', region: 'Hidaka Mountains', hint: 'At the forest camp. A ronin group hid weapons deep in the forest before being captured.' },
  { id: 'map_039', name: 'Hidaka Mountains — Mountain Temple Sacred Objects', group: 'ancient_maps', region: 'Hidaka Mountains', hint: 'In the occupied temple. Sacred objects moved to a cave before the temple was taken.' },
  { id: 'map_040', name: 'Hidaka Mountains — Hidden Valley Supply Cache', group: 'ancient_maps', region: 'Hidaka Mountains', hint: 'On the valley garrison commander. An Ezo resistance supply cache in the hidden valley.' },
  { id: 'map_041', name: 'Hidaka Mountains — Mountain Forge Fuel Reserve', group: 'ancient_maps', region: 'Hidaka Mountains', hint: 'In the ridge watchtower. A blacksmith\'s coal reserve cache high in the mountain.' },
  { id: 'map_042', name: 'Hidaka Mountains — Clan Trophies Cache — Old Keep', group: 'ancient_maps', region: 'Hidaka Mountains', hint: 'In the mountain keep. A secondary trophy cache hidden by Saito officers for personal gain.' },
  { id: 'map_043', name: 'Hidaka Mountains — Forest Spirit Offering Cache', group: 'ancient_maps', region: 'Hidaka Mountains', hint: 'On the patrol leader. An Ainu ritual cache of spirit offerings sealed in a cave.' },
  { id: 'map_044', name: 'Hidaka Mountains — Herbalist\'s Rare Plant Store', group: 'ancient_maps', region: 'Hidaka Mountains', hint: 'At the forest outpost. A mountain herbalist cached rare medicinal plants before fleeing.' },
  { id: 'map_045', name: 'Hidaka Mountains — Ravine Bridge Toll Chest', group: 'ancient_maps', region: 'Hidaka Mountains', hint: 'In the bridge post. Collected toll chest was hidden when the bridge guard fled the Yotei Six.' },
  { id: 'map_046', name: 'Hidaka Mountains — Escaped Prisoner\'s Stash', group: 'ancient_maps', region: 'Hidaka Mountains', hint: 'In the mountain garrison. An escaped prisoner left supplies cached for others who followed.' },
  // Nemuro Coast (9)
  { id: 'map_047', name: 'Nemuro Coast — Sunken Ship\'s Strongbox', group: 'ancient_maps', region: 'Nemuro Coast', hint: 'In the harbor fort. A strongbox went down with a merchant ship — now findable by diving.' },
  { id: 'map_048', name: 'Nemuro Coast — Smuggler\'s Cove Hidden Cargo', group: 'ancient_maps', region: 'Nemuro Coast', hint: 'On the cove camp leader. Smuggled goods cached in the cave above the high-tide line.' },
  { id: 'map_049', name: 'Nemuro Coast — Lighthouse Keeper\'s Savings', group: 'ancient_maps', region: 'Nemuro Coast', hint: 'In the lighthouse fort. The old keeper\'s life savings, hidden in the lighthouse basement.' },
  { id: 'map_050', name: 'Nemuro Coast — Pirate Captain\'s Private Hoard', group: 'ancient_maps', region: 'Nemuro Coast', hint: 'At the sea cave base. The captain\'s private hoard is separate from the crew\'s shared cache.' },
  { id: 'map_051', name: 'Nemuro Coast — Coastal Village Emergency Cache', group: 'ancient_maps', region: 'Nemuro Coast', hint: 'In the occupied village. Cache buried by villagers when the Yotei Six arrived. Not yet retrieved.' },
  { id: 'map_052', name: 'Nemuro Coast — Naval Supply Overflow Depot', group: 'ancient_maps', region: 'Nemuro Coast', hint: 'On the dockside garrison captain. Naval overflow supplies cached at a secondary coastal site.' },
  { id: 'map_053', name: 'Nemuro Coast — Old Fishing Camp Equipment', group: 'ancient_maps', region: 'Nemuro Coast', hint: 'At the beach camp. Fishing equipment from an abandoned season, cached and waiting to be reclaimed.' },
  { id: 'map_054', name: 'Nemuro Coast — Fortress Pre-Siege Cache', group: 'ancient_maps', region: 'Nemuro Coast', hint: 'In the Nemuro Fortress. Cache set aside before the fortress was seized, now behind enemy lines.' },
  { id: 'map_055', name: 'Nemuro Coast — Ezo Liberation Supply Depot', group: 'ancient_maps', region: 'Nemuro Coast', hint: 'On the final fortress commander. A resistance supply depot stocked for the liberation effort.' },
];

// Total: 60 + 16 + 15 + 13 + 12 + 80 + 68 + 55 = 319 ✓

export function getCollectiblesByGroup(group: CollectibleGroup): Collectible[] {
  return COLLECTIBLES.filter(c => c.group === group);
}

export const COLLECTIBLE_IDS: Set<string> = new Set(COLLECTIBLES.map(c => c.id));

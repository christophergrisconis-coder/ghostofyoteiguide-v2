export type CollectibleGroup =
  | 'haiku_stones'
  | 'bamboo_carvings'
  | 'hot_springs'
  | 'inari_shrines'
  | 'clan_banners'
  | 'fox_dens';

export interface CollectibleGroupInfo {
  id: CollectibleGroup;
  label: string;
  icon: string; // Ionicons name
  color: string;
  description: string;
  total: number;
}

export interface Collectible {
  id: string;
  name: string;
  group: CollectibleGroup;
  region: string;
  hint: string;
}

export const COLLECTIBLE_GROUPS: CollectibleGroupInfo[] = [
  {
    id: 'haiku_stones',
    label: 'Haiku Stones',
    icon: 'leaf-outline',
    color: '#4A9B6F',
    description: 'Scenic stones for haiku composition at viewpoints across Ezo',
    total: 20,
  },
  {
    id: 'bamboo_carvings',
    label: 'Bamboo Carvings',
    icon: 'layers-outline',
    color: '#B8860B',
    description: 'Carved bamboo monuments near dojo areas and training grounds',
    total: 15,
  },
  {
    id: 'hot_springs',
    label: 'Hot Springs',
    icon: 'water-outline',
    color: '#4682B4',
    description: 'Healing thermal springs that permanently upgrade your Resolve',
    total: 10,
  },
  {
    id: 'inari_shrines',
    label: 'Inari Shrines',
    icon: 'home-outline',
    color: '#C9A84C',
    description: 'Fox spirit shrines that add permanent charm slots when offered at',
    total: 12,
  },
  {
    id: 'clan_banners',
    label: 'Clan Banners',
    icon: 'flag-outline',
    color: '#8B1A1A',
    description: 'Enemy clan banners hanging in strongholds and outposts',
    total: 8,
  },
  {
    id: 'fox_dens',
    label: 'Fox Dens',
    icon: 'eye-outline',
    color: '#9B59B6',
    description: 'Hidden spirit fox dens revealed by completing Inari Shrine offerings',
    total: 15,
  },
];

export const COLLECTIBLES: Collectible[] = [
  // ── HAIKU STONES (20) ──────────────────────────────────────────────────────
  { id: 'hs_01', name: 'Stone of First Snow', group: 'haiku_stones', region: 'Shimofuri Fields', hint: 'Atop the eastern overlook above the grain storage' },
  { id: 'hs_02', name: 'Stone of Still Water', group: 'haiku_stones', region: 'Shimofuri Settlement', hint: 'On the dock facing the mill pond at sunset' },
  { id: 'hs_03', name: 'Stone of Distant Peaks', group: 'haiku_stones', region: 'Northern Highlands', hint: 'At the northern crossroads where two ridges meet' },
  { id: 'hs_04', name: 'Stone of the Frozen Lake', group: 'haiku_stones', region: 'Northern Highlands', hint: 'On the ice shelf at the lake\'s western edge' },
  { id: 'hs_05', name: 'Stone of Falling Leaves', group: 'haiku_stones', region: 'Northern Highlands', hint: 'Near the abandoned temple beneath the maple grove' },
  { id: 'hs_06', name: 'Stone of Mountain Wind', group: 'haiku_stones', region: 'Northern Highlands', hint: 'At the summit viewpoint above the blizzard pass' },
  { id: 'hs_07', name: 'Stone of Iron Gates', group: 'haiku_stones', region: 'Castle Kurokane Region', hint: 'Overlooking the castle\'s outer courtyard from the east tower' },
  { id: 'hs_08', name: 'Stone of Burning Bridges', group: 'haiku_stones', region: 'Castle Kurokane Region', hint: 'At the ruined bridge east of Kurokane Pass' },
  { id: 'hs_09', name: "Stone of the Merchant's Road", group: 'haiku_stones', region: 'Castle Kurokane Region', hint: 'At the summit of Trader\'s Road beside the waystone' },
  { id: 'hs_10', name: 'Stone of Sacred Silence', group: 'haiku_stones', region: 'Sacred Grove', hint: 'At the edge of the meditation pools, facing the spirit trees' },
  { id: 'hs_11', name: 'Stone of Ancient Roots', group: 'haiku_stones', region: 'Sacred Grove', hint: 'Beneath the oldest tree in the spirit circle' },
  { id: 'hs_12', name: 'Stone of Moonlit Tide', group: 'haiku_stones', region: 'Coastal Cliffs', hint: 'On the sea-facing promontory above the pirate cove' },
  { id: 'hs_13', name: 'Stone of Crashing Waves', group: 'haiku_stones', region: 'Coastal Cliffs', hint: 'At the tidal cave mouth, visible at low tide' },
  { id: 'hs_14', name: 'Stone of Drifting Mist', group: 'haiku_stones', region: 'Coastal Cliffs', hint: 'Atop the lighthouse cliff overlooking the open sea' },
  { id: 'hs_15', name: 'Stone of the Fallen', group: 'haiku_stones', region: 'Battlefield Memorial', hint: 'At the center of the memorial grounds' },
  { id: 'hs_16', name: 'Stone of Eternal Garden', group: 'haiku_stones', region: 'Garden of Eternity', hint: 'Beside the central spirit pond in the hidden garden' },
  { id: 'hs_17', name: 'Stone of Ascending Flame', group: 'haiku_stones', region: 'Summit Approach', hint: 'At the first summit camp, facing Mount Yotei\'s peak' },
  { id: 'hs_18', name: "Stone of the Oracle's Eye", group: 'haiku_stones', region: 'Summit Approach', hint: "Outside the Oracle's shrine, dawn only" },
  { id: 'hs_19', name: 'Stone of Forgotten Battles', group: 'haiku_stones', region: 'Summit Approach', hint: 'At the glacier edge overlooking the valley below' },
  { id: 'hs_20', name: 'Stone of the Last Breath', group: 'haiku_stones', region: 'Summit Approach', hint: 'At the mountain\'s final ridge before the summit fortress' },

  // ── BAMBOO CARVINGS (15) ────────────────────────────────────────────────────
  { id: 'bc_01', name: 'Carving of the Wanderer', group: 'bamboo_carvings', region: 'Shimofuri Settlement', hint: 'Behind the training post near the village gate' },
  { id: 'bc_02', name: 'Carving of the Tide', group: 'bamboo_carvings', region: 'Shimofuri Fields', hint: 'At the river crossing east of the fields' },
  { id: 'bc_03', name: 'Carving of Iron Will', group: 'bamboo_carvings', region: 'Northern Highlands', hint: 'Outside the mountain dojo entrance' },
  { id: 'bc_04', name: 'Carving of the Bear', group: 'bamboo_carvings', region: 'Northern Highlands', hint: "Near Kuma's den at the frozen lake's shore" },
  { id: 'bc_05', name: 'Carving of Endurance', group: 'bamboo_carvings', region: 'Northern Highlands', hint: 'At the base of the highland camp watchtower' },
  { id: 'bc_06', name: 'Carving of Steel', group: 'bamboo_carvings', region: 'Castle Kurokane Region', hint: "In the castle's outer training yard" },
  { id: 'bc_07', name: 'Carving of the Duel', group: 'bamboo_carvings', region: 'Castle Kurokane Region', hint: "In the abandoned dojo's back garden" },
  { id: 'bc_08', name: 'Carving of Patience', group: 'bamboo_carvings', region: 'Castle Kurokane Region', hint: 'Along the safehouse path, in the mill wheel shadow' },
  { id: 'bc_09', name: 'Carving of Roots', group: 'bamboo_carvings', region: 'Sacred Grove', hint: 'In the outer sanctum bamboo grove' },
  { id: 'bc_10', name: 'Carving of the Fox', group: 'bamboo_carvings', region: 'Sacred Grove', hint: 'At the meditation pools\' western edge' },
  { id: 'bc_11', name: 'Carving of the Sea', group: 'bamboo_carvings', region: 'Coastal Cliffs', hint: 'At the fishing village docks' },
  { id: 'bc_12', name: 'Carving of the Storm', group: 'bamboo_carvings', region: 'Coastal Cliffs', hint: 'Behind the lighthouse, facing the cliff' },
  { id: 'bc_13', name: 'Carving of Ascension', group: 'bamboo_carvings', region: 'Summit Approach', hint: 'At the summit base camp near the bonfire' },
  { id: 'bc_14', name: 'Carving of Ice', group: 'bamboo_carvings', region: 'Summit Approach', hint: 'At the glacier edge lookout platform' },
  { id: 'bc_15', name: 'Carving of the Last Step', group: 'bamboo_carvings', region: 'Summit Approach', hint: 'Just before the summit fortress outer gate' },

  // ── HOT SPRINGS (10) ────────────────────────────────────────────────────────
  { id: 'sp_01', name: 'Shimofuri Village Spring', group: 'hot_springs', region: 'Shimofuri Settlement', hint: 'Behind the village elder\'s home, past the cherry trees' },
  { id: 'sp_02', name: 'Eastern Fields Spring', group: 'hot_springs', region: 'Shimofuri Fields', hint: 'In the steaming hollow east of the grain storage' },
  { id: 'sp_03', name: 'Highland Gorge Spring', group: 'hot_springs', region: 'Northern Highlands', hint: 'At the bottom of the gorge beneath the old bridge' },
  { id: 'sp_04', name: 'Frozen Lake Spring', group: 'hot_springs', region: 'Northern Highlands', hint: 'On the south shore where the ice meets the warm current' },
  { id: 'sp_05', name: 'Mountain Temple Spring', group: 'hot_springs', region: 'Northern Highlands', hint: 'In the courtyard of the abandoned summit temple' },
  { id: 'sp_06', name: 'Kurokane Valley Spring', group: 'hot_springs', region: 'Castle Kurokane Region', hint: 'In the valley below the castle\'s western wall' },
  { id: 'sp_07', name: 'Sacred Grove Spring', group: 'hot_springs', region: 'Sacred Grove', hint: 'Near the oracle\'s clearing, under the spirit tree canopy' },
  { id: 'sp_08', name: 'Coastal Cave Spring', group: 'hot_springs', region: 'Coastal Cliffs', hint: 'Inside the tidal cave, accessible at low tide only' },
  { id: 'sp_09', name: 'Summit Base Spring', group: 'hot_springs', region: 'Summit Approach', hint: 'At the base camp thermal vent, east of the bonfire' },
  { id: 'sp_10', name: 'Summit Peak Spring', group: 'hot_springs', region: 'Summit Approach', hint: 'High on the final ridge, marked by rising white steam' },

  // ── INARI SHRINES (12) ─────────────────────────────────────────────────────
  { id: 'is_01', name: 'Shimofuri Hillside Shrine', group: 'inari_shrines', region: 'Shimofuri Settlement', hint: 'Follow the white fox from the village gate northward' },
  { id: 'is_02', name: 'River Crossing Shrine', group: 'inari_shrines', region: 'Shimofuri Fields', hint: 'A fox appears at the river ford at dawn' },
  { id: 'is_03', name: 'Highland Pass Shrine', group: 'inari_shrines', region: 'Northern Highlands', hint: 'Fox spotted near the blizzard pass waystone' },
  { id: 'is_04', name: 'Frozen Lake Shore Shrine', group: 'inari_shrines', region: 'Northern Highlands', hint: 'White fox on the lake\'s north shore at sunset' },
  { id: 'is_05', name: 'Mountain Dojo Shrine', group: 'inari_shrines', region: 'Northern Highlands', hint: 'Fox leads up from the dojo\'s back gate into the pines' },
  { id: 'is_06', name: 'Kurokane Foothills Shrine', group: 'inari_shrines', region: 'Castle Kurokane Region', hint: 'Fox appears on Trader\'s Road near the second waystone' },
  { id: 'is_07', name: 'Castle Moat Shrine', group: 'inari_shrines', region: 'Castle Kurokane Region', hint: 'Follow the fox along the moat\'s eastern bank' },
  { id: 'is_08', name: 'Sacred Grove Entrance Shrine', group: 'inari_shrines', region: 'Sacred Grove', hint: 'Fox waits at the grove\'s outer sanctum threshold' },
  { id: 'is_09', name: 'Spirit Tree Shrine', group: 'inari_shrines', region: 'Sacred Grove', hint: 'Fox circles the central spirit tree twice before leading south' },
  { id: 'is_10', name: 'Coastal Cliff Shrine', group: 'inari_shrines', region: 'Coastal Cliffs', hint: 'Fox on the north cliff path above the lighthouse' },
  { id: 'is_11', name: 'Garden of Eternity Shrine', group: 'inari_shrines', region: 'Garden of Eternity', hint: 'Fox emerges from the spirit pond at the garden\'s center' },
  { id: 'is_12', name: 'Summit Oracle Shrine', group: 'inari_shrines', region: 'Summit Approach', hint: 'Fox appears outside the Oracle\'s shrine at dusk' },

  // ── CLAN BANNERS (8) ────────────────────────────────────────────────────────
  { id: 'cb_01', name: 'Banner of the Vanguard', group: 'clan_banners', region: 'Shimofuri Settlement', hint: 'Hanging above the eastern raiding camp gate' },
  { id: 'cb_02', name: 'Banner of the Mountain Wolves', group: 'clan_banners', region: 'Northern Highlands', hint: 'At the highland camp\'s central post' },
  { id: 'cb_03', name: 'Banner of Kurokane', group: 'clan_banners', region: 'Castle Kurokane Region', hint: 'Above the inner courtyard entrance to the keep' },
  { id: 'cb_04', name: 'Banner of the Iron Fist', group: 'clan_banners', region: 'Castle Kurokane Region', hint: 'On the outer wall\'s northeast tower parapet' },
  { id: 'cb_05', name: 'Banner of the Sea Raiders', group: 'clan_banners', region: 'Coastal Cliffs', hint: 'At the pirate cove\'s mast flagpole' },
  { id: 'cb_06', name: 'Banner of the Shadow Guard', group: 'clan_banners', region: 'Castle Kurokane Region', hint: 'In the Shogunate outpost war room above the map table' },
  { id: 'cb_07', name: 'Banner of the Summit Legion', group: 'clan_banners', region: 'Summit Approach', hint: 'At the summit fortress outer gate\'s left tower' },
  { id: 'cb_08', name: 'Banner of the Final Stand', group: 'clan_banners', region: 'Summit Approach', hint: 'At the inner sanctum entrance, guarded by elites' },

  // ── FOX DENS (15) ──────────────────────────────────────────────────────────
  { id: 'fd_01', name: "Shimofuri Fox Den", group: 'fox_dens', region: 'Shimofuri Settlement', hint: 'Revealed by Shimofuri Hillside Shrine offering' },
  { id: 'fd_02', name: "River Fox Den", group: 'fox_dens', region: 'Shimofuri Fields', hint: 'Revealed by River Crossing Shrine offering' },
  { id: 'fd_03', name: "Highland Pass Fox Den", group: 'fox_dens', region: 'Northern Highlands', hint: 'Revealed by Highland Pass Shrine offering' },
  { id: 'fd_04', name: "Frozen Lake Fox Den", group: 'fox_dens', region: 'Northern Highlands', hint: 'Revealed by Frozen Lake Shore Shrine offering' },
  { id: 'fd_05', name: "Pine Ridge Fox Den", group: 'fox_dens', region: 'Northern Highlands', hint: 'Revealed by Mountain Dojo Shrine offering' },
  { id: 'fd_06', name: "Hidden Grotto Fox Den", group: 'fox_dens', region: 'Northern Highlands', hint: 'Behind the glacier cave near the mountain pass' },
  { id: 'fd_07', name: "Kurokane Valley Fox Den", group: 'fox_dens', region: 'Castle Kurokane Region', hint: 'Revealed by Kurokane Foothills Shrine offering' },
  { id: 'fd_08', name: "Moat Fox Den", group: 'fox_dens', region: 'Castle Kurokane Region', hint: 'Revealed by Castle Moat Shrine offering' },
  { id: 'fd_09', name: "Grove Entrance Fox Den", group: 'fox_dens', region: 'Sacred Grove', hint: 'Revealed by Sacred Grove Entrance Shrine offering' },
  { id: 'fd_10', name: "Spirit Tree Fox Den", group: 'fox_dens', region: 'Sacred Grove', hint: 'Revealed by Spirit Tree Shrine offering' },
  { id: 'fd_11', name: "Oracle Fox Den", group: 'fox_dens', region: 'Sacred Grove', hint: 'Northeast of the Sacred Grove, behind the illusory wall' },
  { id: 'fd_12', name: "Coastal Cliff Fox Den", group: 'fox_dens', region: 'Coastal Cliffs', hint: 'Revealed by Coastal Cliff Shrine offering' },
  { id: 'fd_13', name: "Garden Fox Den", group: 'fox_dens', region: 'Garden of Eternity', hint: 'Revealed by Garden of Eternity Shrine offering' },
  { id: 'fd_14', name: "Summit Oracle Fox Den", group: 'fox_dens', region: 'Summit Approach', hint: 'Revealed by Summit Oracle Shrine offering' },
  { id: 'fd_15', name: "Mountain Peak Fox Den", group: 'fox_dens', region: 'Summit Approach', hint: 'Near the summit peak viewpoint, north face' },
];

export function getCollectiblesByGroup(group: CollectibleGroup): Collectible[] {
  return COLLECTIBLES.filter(c => c.group === group);
}

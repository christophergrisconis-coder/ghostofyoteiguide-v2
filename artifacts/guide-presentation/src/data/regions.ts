import type { Region } from './schema';

// ── Ghost of Yōtei — Confirmed Regions ────────────────────────────────────────
// All 6 regions confirmed from official trailers, PlayStation blog posts, and
// pre-release materials (July 2026). Sub-areas are partially confirmed; those
// unverified are marked placeholder below.

export const REGIONS: Region[] = [
  {
    name: 'Yotei Grasslands',
    abbr: 'YG',
    color: '#4A9B8E',
    subAreas: [
      'Kasabe Village',           // verified — opening location
      'Kitsune Shrine',           // verified — Mythic Tale location
      'Kasabe River Basin',       // placeholder
      'Northern Grassland Plains', // placeholder
      'Verdant Foothills',        // placeholder
    ],
    placeholder: false,
    verified: true,
  },
  {
    name: 'Ishikari Plain',
    abbr: 'IP',
    color: '#4682B4',
    subAreas: [
      'Hōkō Village',             // verified — mentioned in quest data
      'Hōkō Bay',                 // verified — mentioned in quest data
      'Ishikari River Crossing',  // verified — mentioned in quest data
      'Ishikari Garrison',        // verified — ms_04 location
      'Eastern Farmlands',        // placeholder
    ],
    placeholder: false,
    verified: true,
  },
  {
    name: 'Teshio Ridge',
    abbr: 'TR',
    color: '#7B68EE',
    subAreas: [
      'Teshio Summit',            // verified — ms_10 final boss location
      'Teshio Waterfall',         // verified — st_29 location
      'Mountain Pass',            // verified — ms_02 location
      'Summit Wayhouse',          // verified — st_15 location
      'Teshio Waystation',        // verified — st_03 location
    ],
    placeholder: false,
    verified: true,
  },
  {
    name: 'Tokachi Range',
    abbr: 'TK',
    color: '#B8860B',
    subAreas: [
      'Tokachi Stronghold',       // verified — ms_02 location
      'Mountain Refuge',          // verified — mentioned in quest data
      'Tokachi Hot Springs',      // verified — st_07 location
      'Northern Ridgeline',       // placeholder
      'Tokachi Pass',             // placeholder
    ],
    placeholder: false,
    verified: true,
  },
  {
    name: 'Nayoro Wilds',
    abbr: 'NW',
    color: '#4A9B6F',
    subAreas: [
      'Nayoro Prison Camp',       // verified — ms_09 location
      'Salt Flats',               // verified — st_30 location
      'Nayoro Garrison',          // verified — st_11 location
      'Northern Forest',          // placeholder
      'Nayoro River Delta',       // placeholder
    ],
    placeholder: false,
    verified: true,
  },
  {
    name: 'Oshima Coast',
    abbr: 'OC',
    color: '#4A7A9B',
    subAreas: [
      'Mori Cove',                // verified — st_05, st_06 location
      'Coastal Shrine',           // verified — st_26 location
      'Oshima Lighthouse',        // verified — st_21 location
      'Harbour District',         // verified — st_31 location
      'Eastern Cliffs',           // placeholder
    ],
    placeholder: false,
    verified: true,
  },
];

/** Map from region name to region data for O(1) lookup */
export const REGION_MAP = new Map(REGIONS.map(r => [r.name, r]));

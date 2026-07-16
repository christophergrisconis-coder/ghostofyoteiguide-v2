// ── Shared TypeScript types for the Ghost of Yōtei data layer ─────────────────

export const REGION_NAMES = [
  'Yotei Grasslands',
  'Ishikari Plain',
  'Teshio Ridge',
  'Tokachi Range',
  'Nayoro Wilds',
  'Oshima Coast',
] as const;

export type RegionName = typeof REGION_NAMES[number];

// ── Collectible types ─────────────────────────────────────────────────────────

export interface CollectibleItem {
  /** Stable ID — used as the localStorage progress key. Format: coll_{key}_{n} */
  id: string;
  /** Human-readable name. Placeholder entries use the format "Category #NN ⚠" */
  name: string;
  region: RegionName;
  subArea?: string;
  description?: string;
  /** true when name/location has not been confirmed against the shipped game */
  placeholder: boolean;
  verified: boolean;
}

export interface CollectibleCategory {
  key: string;
  label: string;
  icon: string;
  color: string;
  trophy: string;
  items: CollectibleItem[];
}

// ── Activity types ────────────────────────────────────────────────────────────

export interface ActivityItem {
  /** Stable ID — used as the localStorage progress key. Format: act_{key}_{n} */
  id: string;
  name: string;
  region: RegionName;
  subArea?: string;
  description?: string;
  placeholder: boolean;
  verified: boolean;
}

export interface ActivityCategory {
  key: string;
  name: string;
  icon: string;
  desc: string;
  color: string;
  items: ActivityItem[];
}

// ── Equipment types ───────────────────────────────────────────────────────────

export interface Weapon {
  id: string;
  name: string;
  tier: number;
  note: string;
  questId?: string;
  placeholder: boolean;
  verified: boolean;
}

export interface Armour {
  id: string;
  name: string;
  region: string;
  note: string;
  questId?: string;
  placeholder: boolean;
  verified: boolean;
}

export interface Charm {
  id: string;
  name: string;
  slot: number;
  note: string;
  source: string;
  questId?: string;
  placeholder: boolean;
  verified: boolean;
}

// ── Region type ───────────────────────────────────────────────────────────────

export interface Region {
  name: RegionName;
  abbr: string;
  color: string;
  subAreas: string[];
  placeholder: boolean;
  verified: boolean;
}

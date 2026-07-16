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
  /** Human-readable name. Placeholder entries use the format "Category #NN" */
  name: string;
  region: RegionName;
  subArea?: string;
  description?: string;
  /** Charm or item reward for completing this collectible (e.g. Fox Den charms) */
  reward?: string;
  /** Quest or condition required before this collectible can be accessed */
  requirement?: string;
  /** Whether this collectible appears on the standard in-game map marker system */
  mapMarked?: boolean;
  /** Whether this collectible is permanently missable (all are false in this game) */
  missable?: boolean;
  /** true when name/location has not been confirmed against the shipped game */
  placeholder: boolean;
  verified: boolean;
}

export interface CollectibleCategory {
  key: string;
  label: string;
  icon: string;
  color: string;
  trophy?: string;
  /** Optional note shown inside the expanded checklist for this category */
  catNote?: string;
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
  /** Reward for completing this activity (bounty names, weapon names, etc.) */
  reward?: string;
  placeholder: boolean;
  verified: boolean;
}

export interface ActivityCategory {
  key: string;
  name: string;
  icon: string;
  desc: string;
  color: string;
  /** Optional warning note shown at the top of the expanded checklist */
  catNote?: string;
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

// ── Resource types ────────────────────────────────────────────────────────────

export type ResourceRarity = 'common' | 'uncommon' | 'rare';

export interface Resource {
  id: string;
  name: string;
  rarity: ResourceRarity;
  howToGet: string;
  uses: string;
  verified: boolean;
  placeholder: boolean;
}

// ── Merchant types ────────────────────────────────────────────────────────────

export type MerchantVendorType =
  | 'general'
  | 'blacksmith'
  | 'bowyer'
  | 'dye_house'
  | 'ainu_trader'
  | 'musician'
  | 'mask_artisan'
  | 'food_vendor';

export interface Merchant {
  id: string;
  name: string;
  /** Region name or descriptive string for placeholder/NG+ merchants */
  region: string;
  subArea?: string;
  vendorType: MerchantVendorType;
  unlockRequirement?: string;
  inventory: string[];
  notes?: string;
  verified: boolean;
  placeholder: boolean;
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

export type CategoryId =
  | 'main_story'
  | 'side_quests'
  | 'mythic'
  | 'sensei'
  | 'activities'
  | 'gear'
  | 'trophies'
  | 'regions'
  | 'missables'
  | 'postgame';

export interface Category {
  id: CategoryId;
  label: string;
  icon: string; // Ionicons name
  color: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'main_story',
    label: 'Main Story',
    icon: 'book-outline',
    color: '#C9A84C',
    description: "Follow Atsu's journey across the wilds of Ezo",
  },
  {
    id: 'side_quests',
    label: 'Side Quests',
    icon: 'people-outline',
    color: '#4A9B8E',
    description: 'Help the people of Ezo survive the chaos',
  },
  {
    id: 'mythic',
    label: 'Mythic Tales',
    icon: 'flame-outline',
    color: '#8B1A1A',
    description: 'Legendary challenges steeped in folklore',
  },
  {
    id: 'sensei',
    label: 'Sensei Questlines',
    icon: 'person-outline',
    color: '#7B68EE',
    description: 'Journey alongside your closest allies',
  },
  {
    id: 'activities',
    label: 'Activities',
    icon: 'fitness-outline',
    color: '#4A9B6F',
    description: 'Training, meditation, and exploration challenges',
  },
  {
    id: 'gear',
    label: 'Armor & Weapons',
    icon: 'shield-outline',
    color: '#B8860B',
    description: 'Forge, find and upgrade your equipment',
  },
  {
    id: 'trophies',
    label: 'Trophies',
    icon: 'trophy-outline',
    color: '#DAA520',
    description: 'Unlock all achievements for platinum',
  },
  {
    id: 'regions',
    label: 'Regions',
    icon: 'map-outline',
    color: '#4682B4',
    description: 'Fully explore every area of Ezo',
  },
  {
    id: 'missables',
    label: 'Missables',
    icon: 'warning-outline',
    color: '#FF6B35',
    description: 'Time-sensitive or permanently missable content',
  },
  {
    id: 'postgame',
    label: 'Postgame / NG+',
    icon: 'refresh-outline',
    color: '#9B59B6',
    description: 'End-game challenges and New Game Plus',
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(c => c.id === id);
}

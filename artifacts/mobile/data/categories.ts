export type CategoryId =
  | 'main_story'
  | 'side_tales'
  | 'mythic'
  | 'sensei'
  | 'bounty'
  | 'endgame';

export interface Category {
  id: CategoryId;
  label: string;
  icon: string; // Ionicons name
  color: string;
  description: string;
  count: number;
}

export const CATEGORIES: Category[] = [
  {
    id: 'main_story',
    label: 'Main Story',
    icon: 'book-outline',
    color: '#C9A84C',
    description: "Follow Atsu's journey of revenge across Ezo against the Yotei Six",
    count: 10,
  },
  {
    id: 'side_tales',
    label: 'Side Tales',
    icon: 'people-outline',
    color: '#4A9B8E',
    description: 'Help the people of Ezo survive and rebuild across 48 stories',
    count: 48,
  },
  {
    id: 'mythic',
    label: 'Mythic Tales',
    icon: 'flame-outline',
    color: '#8B1A1A',
    description: 'Legendary challenges steeped in Ainu and samurai folklore',
    count: 7,
  },
  {
    id: 'sensei',
    label: 'Sensei Tales',
    icon: 'person-outline',
    color: '#7B68EE',
    description: 'Journey alongside your closest allies through 20 companion questlines',
    count: 20,
  },
  {
    id: 'bounty',
    label: 'Bounty Quests',
    icon: 'skull-outline',
    color: '#B8860B',
    description: 'Track down and eliminate 31 dangerous criminals across Ezo',
    count: 31,
  },
  {
    id: 'endgame',
    label: 'Post-Story',
    icon: 'refresh-outline',
    color: '#9B59B6',
    description: 'Three epilogue tales that continue after the main story concludes',
    count: 3,
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(c => c.id === id);
}

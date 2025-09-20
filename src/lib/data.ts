import type { VocabularyList, DialogueScenario, ProgressData, LeaderboardUser, Badge, UserLanguageLevel } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

export const vocabularyLists: VocabularyList[] = [
  {
    category: 'Travel Essentials',
    icon: 'Plane',
    words: [
      { word: 'Passport', translation: 'Pasaporte', example: 'Don\'t forget your passport.' },
      { word: 'Ticket', translation: 'Boleto', example: 'I have a ticket for the 9 AM train.' },
      { word: 'Hotel', translation: 'Hotel', example: 'We are staying at a hotel near the beach.' },
      { word: 'Suitcase', translation: 'Maleta', example: 'My suitcase is very heavy.' },
    ],
  },
  {
    category: 'Restaurant & Dining',
    icon: 'UtensilsCrossed',
    words: [
      { word: 'Menu', translation: 'Menú', example: 'Could we see the menu, please?' },
      { word: 'Waiter', translation: 'Camarero', example: 'The waiter is coming to take our order.' },
      { word: 'Bill', translation: 'Cuenta', example: 'Let\'s ask for the bill.' },
      { word: 'Delicious', translation: 'Delicioso', example: 'This paella is delicious!' },
    ],
  },
  {
    category: 'Everyday Greetings',
    icon: 'Hand',
    words: [
      { word: 'Hello', translation: 'Hola', example: 'Hello, how are you?' },
      { word: 'Goodbye', translation: 'Adiós', example: 'Goodbye, see you tomorrow.' },
      { word: 'Thank you', translation: 'Gracias', example: 'Thank you for your help.' },
      { word: 'Please', translation: 'Por favor', example: 'Can you pass the salt, please?' },
    ],
  },
];

export const dialogueScenarios: DialogueScenario[] = [
  {
    id: '1',
    title: 'Ordering Coffee',
    description: 'You are at a café in Madrid and want to order a coffee.',
    difficulty: 'Easy',
    conversation: [
      { type: 'bot', text: '¡Hola! Buenos días. ¿Qué te gustaría tomar?' },
    ],
    options: [
      { text: 'Un café con leche, por favor.', response: 'Claro. ¿Algo más?', nextOptions: [{ text: 'No, eso es todo. ¡Gracias!', response: 'De nada. ¡Aquí tienes!'}, {text: 'Sí, una tostada con tomate.', response: '¡Perfecto! Enseguida te lo traigo.'}] },
      { text: 'Quisiera un té verde.', response: 'Por supuesto. ¿Frío o caliente?', nextOptions: [{ text: 'Caliente, por favor.', response: 'Marchando un té caliente.' }] },
    ]
  },
  {
    id: '2',
    title: 'Asking for Directions',
    description: 'You are lost in Barcelona and need to find the Sagrada Familia.',
    difficulty: 'Medium',
    conversation: [
        { type: 'bot', text: 'Perdona, ¿puedes ayudarme?' }
    ],
    options: [
        { text: '¡Claro! Dime.', response: 'Estoy buscando la Sagrada Familia. ¿Está lejos de aquí?', nextOptions: [{text: 'No mucho. Sigue recto y gira a la derecha en la segunda calle. La verás al final.', response: '¡Muchas gracias por tu ayuda!'}] },
        { text: 'Lo siento, no soy de aquí.', response: 'No te preocupes. Gracias de todos modos.', nextOptions: []}
    ]
  },
];

export const userProgress: ProgressData = {
  points: 1250,
  level: 8,
  dailyStreak: 5,
};

export const userLanguageLevels: UserLanguageLevel[] = [
  { language: 'Spanish', level: 'A2' },
  { language: 'French', level: 'A1' },
];

const badgeData = PlaceHolderImages.filter(img => img.id.startsWith('badge-'));

export const earnedBadges: Badge[] = [
  { id: '1', name: 'First Word', description: 'Practiced your first word.', iconUrl: badgeData.find(b => b.id === 'badge-first-word')?.imageUrl || '' },
  { id: '2', name: 'Vocab Builder', description: 'Created a vocabulary list.', iconUrl: badgeData.find(b => b.id === 'badge-vocab-builder')?.imageUrl || '' },
  { id: '3', name: 'Dialogue Expert', description: 'Completed a dialogue simulation.', iconUrl: badgeData.find(b => b.id === 'badge-dialogue-expert')?.imageUrl || '' },
];

export const leaderboard: LeaderboardUser[] = [
  { rank: 1, name: 'Isabella', points: 3400, avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026704d' },
  { rank: 2, name: 'Noah', points: 3150, avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026705d' },
  { rank: 3, name: 'You', points: 2980, avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026706d' },
  { rank: 4, name: 'Liam', points: 2800, avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026707d' },
  { rank: 5, name: 'Emma', points: 2650, avatar: 'https://i.pravatar.cc/40?u=a042581f4e29026708d' },
];

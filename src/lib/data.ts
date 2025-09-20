import type { VocabularyList, DialogueScenario, ProgressData, LeaderboardUser, Badge, UserLanguageLevel, ForumTopic } from '@/lib/types';
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

export const forumTopics: ForumTopic[] = [
  {
    id: '1',
    title: 'Best way to learn verb conjugations in Spanish?',
    authorName: 'Chris P.',
    replyCount: 12,
    lastActivity: '2 hours ago',
    post: {
      id: 'p1',
      author: { name: 'Chris P.', avatar: 'https://i.pravatar.cc/40?u=chrisp' },
      date: '1 day ago',
      content: 'I\'m really struggling with Spanish verb conjugations, especially in the subjunctive mood. Does anyone have tips, tricks, or resources that helped them? I\'ve tried flashcards but it\'s not sticking.',
      replies: [
        { id: 'r1', author: { name: 'Maria G.', avatar: 'https://i.pravatar.cc/40?u=mariag' }, date: '23 hours ago', content: 'I found that listening to Spanish music and trying to translate the lyrics really helped. You hear the conjugations in context.'},
        { id: 'r2', author: { name: 'John D.', avatar: 'https://i.pravatar.cc/40?u=johnd' }, date: '15 hours ago', content: 'There\'s a website called Conjugue.mos that has great exercises. It drills you over and over.'},
      ]
    }
  },
  {
    id: '2',
    title: 'Any good French movies to watch for beginners?',
    authorName: 'Sophie B.',
    replyCount: 8,
    lastActivity: '5 hours ago',
    post: {
      id: 'p2',
      author: { name: 'Sophie B.', avatar: 'https://i.pravatar.cc/40?u=sophieb' },
      date: '2 days ago',
      content: 'Looking for some recommendations for French films that are relatively easy for a beginner to understand. I\'m trying to improve my listening skills. Preferably something on Netflix!',
      replies: [
        { id: 'r3', author: { name: 'Pierre L.', avatar: 'https://i.pravatar.cc/40?u=pierrel' }, date: '1 day ago', content: '"Le Dîner de Cons" is a classic comedy and the dialogue is quite clear. Highly recommend it!'},
      ]
    }
  },
  {
    id: '3',
    title: 'Tips for traveling in Japan with basic Japanese',
    authorName: 'Kenji T.',
    replyCount: 25,
    lastActivity: '30 minutes ago',
    post: {
      id: 'p3',
      author: { name: 'Kenji T.', avatar: 'https://i.pravatar.cc/40?u=kenjit' },
      date: '3 days ago',
      content: 'I\'m heading to Japan next month and I only know some basic phrases. Any tips for getting around, ordering food, and being polite? I\'m a bit nervous!',
      replies: []
    }
  }
];
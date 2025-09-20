export type Word = {
  word: string;
  translation: string;
  example: string;
};

export type VocabularyList = {
  category: string;
  icon: string;
  words: Word[];
};

export type ConversationTurn = {
  type: 'user' | 'bot';
  text: string;
};

export type DialogueOption = {
  text: string;
  response: string;
  nextOptions?: DialogueOption[];
}

export type DialogueScenario = {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  conversation: ConversationTurn[];
  options: DialogueOption[];
};

export type ProgressData = {
  points: number;
  level: number;
  dailyStreak: number;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
};

export type LeaderboardUser = {
  rank: number;
  name: string;
  points: number;
  avatar: string;
};

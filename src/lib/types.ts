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

export type PlacementTestQuestion = {
  questionText: string;
  options: string[];
  correctOptionIndex: number;
  difficultyLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

export type UserLanguageLevel = {
  language: string;
  level: string;
}

export type ForumReply = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  content: string;
};

export type ForumPost = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  content: string;
  replies: ForumReply[];
};

export type ForumTopic = {
  id: string;
  title: string;
  authorName: string;
  replyCount: number;
  lastActivity: string;
  post: ForumPost;
};
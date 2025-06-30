export interface User {
  id: string;
  email?: string;
  name?: string;
  isGuest: boolean;
  preferences: {
    language: 'en' | 'ar';
    theme: 'light' | 'dark';
  };
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: EmotionTag;
}

export interface EmotionTag {
  primary: string;
  confidence: number;
  secondary?: string;
}

export interface ChatSession {
  id: string;
  userId: string;
  messages: ChatMessage[];
  startTime: Date;
  endTime?: Date;
  summary?: string;
  mood?: MoodEntry;
}

export interface MoodEntry {
  id: string;
  userId: string;
  value: number; // 1-10 scale
  timestamp: Date;
  notes?: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  targetDate: Date;
  progress: number; // 0-100 percentage
  completed: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'meditation' | 'exercise' | 'video';
  category: string;
  duration?: number; // in minutes
  url?: string;
  content?: string;
}

export interface EmergencyContact {
  id: string;
  country: string;
  name: string;
  phone: string;
  whatsapp?: string;
  type: 'crisis' | 'suicide' | 'general';
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface ChatState {
  currentSession: ChatSession | null;
  isTyping: boolean;
  suggestedReplies: string[];
}

export interface GlobalState {
  auth: AuthState;
  chat: ChatState;
  language: 'en' | 'ar';
  theme: 'light' | 'dark';
}
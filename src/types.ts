export interface Scenario {
  id: string;
  text: string;
  isSafe: boolean;
  explanation: string;
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  mode?: 'general' | 'industrial';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export type GameState = 'start' | 'rules' | 'playing' | 'explanation' | 'gameover' | 'achievements' | 'encyclopedia' | 'stats' | 'certificate' | 'tutorial';

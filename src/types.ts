export type CardCategory = 'aproximacion' | 'secuencia' | 'verdaderofalso' | 'multiplechoice';
export type CardDifficulty = 'Fácil' | 'Medio' | 'Desafío' | 'Erudito';

export interface SequenceItem {
  id: string;
  letter: 'A' | 'B' | 'C' | 'D';
  text: string;
  detail?: string;
}

export interface CardCharacteristics {
  difficultyLevel: number; // 1 to 4
  points: number;
  tacticalValue: string; // e.g. "Estratégico", "Logística", "Biográfico", "Militar"
  yearOrEpoch?: string;
  unit?: string;
}

export interface CardItem {
  id: string;
  numberId: number;
  title: string;
  category: CardCategory;
  categoryName: string;
  difficulty: CardDifficulty;
  points: number;
  question: string;
  answer: string;
  
  // Approximation specific
  numericAnswer?: number;
  unit?: string;
  toleranceMargin?: number;
  
  // Sequence specific
  sequenceItems?: SequenceItem[];
  correctSequenceOrder?: string[]; // e.g. ["C", "D", "A", "B"]

  // Verdadero / Falso specific
  isTrue?: boolean;

  // Multiple Choice specific
  options?: string[];
  correctOptionIndex?: number;
  
  explanation: string;
  historicalContext: string;
  imageUrl: string;
  tags: string[];
  characteristics: CardCharacteristics;
}

export interface Team {
  id: string;
  name: string;
  color: string;
  avatar: string;
  chips: number;
  score: number;
}

export interface Bet {
  teamId: string;
  targetTeamId: string; // Which team's answer they bet on
  chipsBet: number;
}

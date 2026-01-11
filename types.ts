export enum TabType {
  CONFIDENCE_INTERVALS = 'CI',
  RISK_CALCULATOR = 'RISK',
  ODDS_CALCULATOR = 'ODDS',
  DIAGNOSTIC_TESTING = 'DIAGNOSTIC',
  CONCEPTS = 'CONCEPTS'
}

export interface QuizQuestion {
  id: string;
  question: string;
  answer: string;
  explanation: string;
}

export interface Scenario {
  a: number;
  b: number;
  c: number;
  d: number;
}
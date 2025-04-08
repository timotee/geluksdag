type GameStatus = 'init' | 'playing' | 'win' | 'win-other' | 'win-main' | 'win-main-other' | 'loss' | 'stopped' | 'max-attempts' | 'no-prizes-left' | 'no-more-moves';

export interface GameState {
  prizes: number[];
  mainPrize: number | null;
  guesses: { playerId: string; guess: number }[];
  status: GameStatus;
}

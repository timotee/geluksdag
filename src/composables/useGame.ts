import { v4 as uuidv4 } from "uuid";
import { computed, onMounted, onUnmounted, reactive, watch } from "vue";

import { MAX_ATTEMPTS, SCRATCH_CARD_COUNT } from "@/config.ts";
import type { GameState } from "@/global";
import { generateRandomNumber, generateUniqueRandomNumbers } from "../lib.ts";

export function useGame() {
  const gameState: GameState = reactive({
    prizes: [],
    mainPrize: null,
    guesses: [],
    status: "init",
  });

  const playerId = localStorage.getItem("playerId") ?? uuidv4();

  // Game status
  const isPlaying = computed(() =>
    ["playing", "win-other", "win-main-other"].includes(gameState.status),
  );
  const isStopped = computed(() =>
    ["win", "win-main", "loss", "stopped"].includes(gameState.status),
  );

  // Player status
  const isMainWinner = computed(() => gameState.status === "win-main");
  const isWinner = computed(() => gameState.status === "win");
  const isLoser = computed(() => ["loss", "max-attempts"].includes(gameState.status));

  const guessedNumbersPlayer = computed(() =>
    gameState.guesses
      .filter((guess) => guess.playerId === playerId)
      .map((guess) => guess.guess),
  );

  const guessedNumbersOtherPlayers = computed(() =>
    gameState.guesses
      .filter((guess) => guess.playerId !== playerId)
      .map((guess) => guess.guess),
  );

  function startNewGame() {
    const prizes = generateUniqueRandomNumbers(1, SCRATCH_CARD_COUNT, 11);
    const mainPrize = prizes.pop();

    if (mainPrize) {
      gameState.prizes = prizes;
      gameState.mainPrize = mainPrize;
      gameState.guesses = [];
      gameState.status = "playing";

      saveGameState();
    }
  }

  function saveGameState() {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }

  function handleGuess(value: number) {
    if (!isPlaying.value) return;

    gameState.guesses.push({
      playerId: playerId,
      guess: value,
    });
  }

  let fakeGameStateIntervalId: ReturnType<typeof setInterval>;

  onMounted(() => {
    localStorage.setItem("playerId", playerId);
    const savedState = localStorage.getItem("gameState");

    if (savedState) {
      Object.assign(gameState, JSON.parse(savedState));
    } else {
      startNewGame();
    }

    fakeGameStateIntervalId = setInterval(() => {
      if (!isPlaying.value) {
        clearInterval(fakeGameStateIntervalId);
        return;
      }

      gameState.guesses.push({
        playerId: uuidv4(),
        guess: generateRandomNumber(1, SCRATCH_CARD_COUNT),
      });
    }, 5000);
  });

  onUnmounted(() => {
    clearInterval(fakeGameStateIntervalId);
  });

  watch(
    () => gameState.guesses,
    (guesses) => {
      if (guesses.length) {
        const lastGuess = guesses[guesses.length - 1];

        if (
          lastGuess.guess === gameState.mainPrize &&
          lastGuess.playerId === playerId
        ) {
          gameState.status = "win-main";
        } else if (
          gameState.prizes.includes(lastGuess.guess) &&
          lastGuess.playerId === playerId
        ) {
          gameState.status = "win";
        } else if (guessedNumbersPlayer.value.length >= MAX_ATTEMPTS) {
          gameState.status = "max-attempts";
        } else if (gameState.guesses.length >= SCRATCH_CARD_COUNT) {
          gameState.status = "no-more-moves";
        }
      }

      saveGameState();
    },
    { deep: true },
  );

  return {
    isPlaying,
    gameState,
    isWinner,
    isMainWinner,
    isLoser,
    isStopped,
    startNewGame,
    handleGuess,
    guessedNumbersPlayer,
    guessedNumbersOtherPlayers,
    playerId,
  };
}

/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { nextTick } from 'vue'
import { useGame } from "./useGame";
import { generateUniqueRandomNumbers } from "../lib.ts";

vi.mock("../lib.ts", () => ({
    generateUniqueRandomNumbers: vi.fn(),
}));

describe("useGame", () => {
    let game: ReturnType<typeof useGame>;

    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        game = useGame();
    });

    it("should initialize with default game state", () => {
        expect(game.gameState.prizes).toEqual([]);
        expect(game.gameState.mainPrize).toBeNull();
        expect(game.gameState.guesses).toEqual([]);
        expect(game.gameState.status).toBe("init");
    });

    it("should start a new game and generate prizes", () => {
        const mockPrizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const mockMainPrize = 11;
        (generateUniqueRandomNumbers as ReturnType<typeof vi.fn>).mockReturnValue([...mockPrizes, mockMainPrize]);

        game.startNewGame();

        expect(game.gameState.prizes).toEqual(mockPrizes);
        expect(game.gameState.mainPrize).toBe(mockMainPrize);
        expect(game.gameState.guesses).toEqual([]);
        expect(game.gameState.status).toBe("playing");
        expect(localStorage.getItem("gameState")).toBeTruthy();
    });

    it("should handle a guess and update the game state", () => {
        game.startNewGame();
        const initialGuesses = game.gameState.guesses.length;

        game.handleGuess(5);

        expect(game.gameState.guesses.length).toBe(initialGuesses + 1);
        expect(game.gameState.guesses).toContain(5);
    });

    it("should set status to 'loss' when maximum attempts are reached", async () => {
        game.startNewGame();
        const MAX_ATTEMPTS = 5;

        for (let i = 0; i < MAX_ATTEMPTS; i++) {
            game.handleGuess(i);
        }

        await nextTick()

        expect(game.gameState.status).toBe("loss");
    });

    it("should set status to 'win' when a prize is guessed", () => {
        const mockPrizes = [1, 2, 3, 4, 5];
        const mockMainPrize = 6;
        (generateUniqueRandomNumbers as ReturnType<typeof vi.fn>).mockReturnValue([...mockPrizes, mockMainPrize]);

        game.startNewGame();
        game.handleGuess(3);

        expect(game.gameState.status).toBe("win");
    });
});

export const APP_TITLE = import.meta.env.VITE_APP_TITLE || "Nationale Loterij App"
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost/"
export const SCRATCH_CARD_COUNT = Number(import.meta.env.VITE_SCRATCH_CARD_COUNT) || 1000
export const PRIZE_COUNT = Number(import.meta.env.VITE_PRIZE_COUNT) || 1
export const MAX_ATTEMPTS = Number(import.meta.env.VITE_MAX_ATTEMPTS) || 1
export const MAIN_PRIZE_AMOUNT = Number(import.meta.env.VITE_MAIN_PRIZE_AMOUNT) || 0;
export const CONSOLATION_PRIZE_AMOUNT = Number(import.meta.env.VITE_CONSOLATION_PRIZE_AMOUNT) || 0;

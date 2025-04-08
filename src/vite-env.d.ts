/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_SCRATCH_CARD_COUNT: number
  readonly VITE_MAX_ATTEMPTS: number
  readonly VITE_PRIZE_COUNT: number
  readonly VITE_MAIN_PRIZE_AMOUNT: number
  readonly VITE_CONSOLATION_PRIZE_AMOUNT: number
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

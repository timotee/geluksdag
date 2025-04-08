# Geluksdag - Vue 3 + TypeScript + Vite

Geluksdag is a scratch card game built with Vue 3, TypeScript, and Vite. The project uses modern web development tools and practices, including Vue's `<script setup>` syntax, composables, and reactive state management.

## Features

- **Scratch Card Game Logic**: A fully functional game with prizes, main prizes, and player guesses.
- **Reactive State Management**: Uses Vue's `reactive` and `computed` for dynamic updates.
- **Confetti Animation**: Celebrate wins with a confetti effect using `canvas-confetti`.
- **LocalStorage Integration**: Saves game state and player ID for persistence.
- **Responsive Design**: Optimized for various screen sizes.

## Project Setup

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd frontend
   ```

1. Install dependencies:

   ```bash
   npm install
   ```

Configure environment variables: Create a .env file in the frontend directory and add the following:

```dotenv
VITE_APP_TITLE="Geluksdag"
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_SCRATCH_CARD_COUNT=10000
VITE_MAX_ATTEMPTS=1
VITE_PRIZE_COUNT=11
VITE_MAIN_PRIZE_AMOUNT=10000
VITE_CONSOLATION_PRIZE_AMOUNT=100
```

### Usage

#### Development Server

To start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

#### Build for production

To build the project for production:

```bash
npm run build
```

The output will be in the `dist` directory.


### How to Play
1. Game starts when loading the page
1. Guess numbers on the grid to win prizes or the main prize.
1. Restart the game anytime by clicking "Begin opnieuw" in the modal

### Project Structure
- `src/components`: Vue components (e.g., Modal.vue, Button.vue).
- `src/composables`: Reusable logic (e.g., useGame.ts, useConfetti.ts).
- `src/assets`: Static assets like images and styles.
- `src/lib.ts`: Utility functions for game logic.
- `src/global.d.ts`: TypeScript type definitions.

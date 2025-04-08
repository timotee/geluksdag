<script setup lang="ts">
import Button from "@/components/Button.vue";
import Modal from "@/components/Modal.vue";
import { useConfetti } from "@/composables/useConfetti.ts";
import { useGame } from "@/composables/useGame.ts";
import { onMounted, ref, watch } from "vue";

import { APP_TITLE, SCRATCH_CARD_COUNT } from "./config.ts";

const {
  gameState,
  handleGuess,
  isMainWinner,
  isWinner,
  isLoser,
  startNewGame,
  guessedNumbersPlayer,
  guessedNumbersOtherPlayers,
} = useGame();

const { triggerConfetti } = useConfetti();

const gridSize = Math.round(Math.sqrt(SCRATCH_CARD_COUNT));
const showModal = ref(false);

watch(isMainWinner, (newValue) => {
  if (newValue) {
    showModal.value = true;
    triggerConfetti();
  }
});

watch(isWinner, (newValue) => {
  if (newValue) {
    showModal.value = true;
    triggerConfetti();
  }
});

watch(isLoser, (newValue) => {
  if (newValue) {
    showModal.value = true;
  }
});

onMounted(() => {
  document.title = APP_TITLE;
});
</script>

<template>
  <div class="overflow-hidden flex flex-col h-full bg-gray-100">
    <div class="shrink-0 bg-gradient-to-tr from-blue-400 to-blue-700">
      <div class="main-menu p-4">
        <div class="flex justify-end">
          <Button @click="startNewGame">Start new game</Button>
        </div>
      </div>

      <div class="flex justify-center p-4">
        <div class="flex items-center gap-2">
          <img
            src="/logo.svg"
            alt=""
            class="size-12 md:size-20"
          />
          <h1 class="text-4xl md:text-6xl font-bold uppercase text-white">
            {{ APP_TITLE }}
          </h1>
        </div>
      </div>
    </div>

    <Modal
      :show="showModal"
      @close="showModal = false"
    >
      <template v-if="isMainWinner">
        <div class="flex justify-center">
          <div class="size-32 rounded-full overflow-hidden">
            <img
              src="/giphy.gif"
              alt=""
              class="object-contain"
            />
          </div>
        </div>
        <div class="p-4 text-center">
          <h2 class="text-2xl font-bold mb-4">Je hebt gewonnen!</h2>
          <p>
            Gefeliciteerd met het winnen van €25.000! Wat een geweldige
            verrassing – geniet ervan en maak er iets moois van!
          </p>
        </div>
      </template>

      <template v-if="isWinner">
        <div class="p-4 text-center">
          <h2 class="text-2xl font-bold mb-4">
            Je hebt een troostprijs gewonnen!
          </h2>
          <p>
            Gefeliciteerd met het winnen van €100,-! Wat een geweldige
            verrassing – geniet ervan en maak er iets moois van!
          </p>
        </div>
      </template>

      <template v-if="isLoser">
        <div class="p-4 text-center">
          <h2 class="text-2xl font-bold mb-4">Je hebt niets gewonnen!</h2>
          <p>
            Je hebt helaas niets gewonnen. Maar de volgende keer ga je zeker
            weer wat winnen!
          </p>
        </div>
      </template>

      <div class="flex flex-col items-center my-10 gap-3">
        <Button
          @click="
            showModal = false;
            startNewGame();
          "
        >
          Begin opnieuw
        </Button>
        <Button @click="triggerConfetti">Meer confetti</Button>
      </div>
    </Modal>

    <div class="game-board overflow-auto p-4">
      <ul
        class="grid gap-2"
        :style="{
          gridTemplateColumns: `repeat(${gridSize}, minmax(auto, 1fr))`,
          gridTemplateRows: `repeat(${gridSize}, minmax(auto, 1fr))`,
        }"
      >
        <li
          v-for="label in SCRATCH_CARD_COUNT"
          :key="label"
        >
          <button
            class="number-cell bg-blue-400 hover:bg-blue-500 text-white cursor-pointer w-full h-full p-4"
            :class="{
              'bg-orange-400': guessedNumbersPlayer.includes(label),
              'bg-gray-400': guessedNumbersOtherPlayers.includes(label),
            }"
            @click.once="handleGuess(label)"
          >
            {{ label }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

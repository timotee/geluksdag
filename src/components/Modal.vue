<script setup lang="ts">
import Button from "@/components/Button.vue";
import { onClickOutside } from "@vueuse/core";
import { useTemplateRef } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  closeOnOverlayClick: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close"]);

const modalContentRef = useTemplateRef<HTMLElement>("modal-content");

onClickOutside(modalContentRef, () => handleOverlayClick());

function closeModal() {
  emit("close");
}

function handleOverlayClick() {
  if (props.closeOnOverlayClick) {
    closeModal();
  }
}
</script>

<template>
  <div
    v-if="show"
    class="modal fixed inset-0 z-50 flex items-center justify-center"
  >
    <div
      class="absolute inset-0 bg-black/50"
      @click="handleOverlayClick"
    ></div>
    <div class="absolute flex top-16 justify-center">
      <div
        class="bg-white rounded shadow-lg p-4 md:max-w-lg w-full max-md:absolute max-md:inset-0 flex flex-col"
        ref="modal-content"
      >
        <div class="shrink-0 flex justify-end">
          <Button
            @click="closeModal"
          >
            Sluiten
          </Button>
        </div>
        <slot />
      </div>
    </div>
  </div>
</template>

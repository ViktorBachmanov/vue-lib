<script setup>
const props = defineProps({
  angle: {
    type: Number,
    default: 0, // right
  },
  disabled: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24"
    :class="{ disabled: disabled }" 
    :style="{ transform: `rotateZ(${angle}deg)` }"
  >
    <path fill="currentColor" d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01"/>
  </svg>
</template>

<style scoped>
svg {
  cursor: pointer;
  width: 24px;
}

svg.disabled {
  cursor: default;
  opacity: 0.5;
  pointer-events: none;
}
</style>
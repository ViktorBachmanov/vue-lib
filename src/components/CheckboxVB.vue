<script setup>
defineProps({
  size: {
    type: Number,
    default: 20,
  },
  borderColor: {
    type: String,
    default: null,
  },
  borderWidth: {
    type: Number,
    default: 2,
  },
  markWidth: {
    type: Number,
    default: 1.5,
  }
})
const checked = defineModel()
</script>


<template>
  <label style="cursor: pointer">
    <slot name="prefix"></slot>

    <div
      class="outer"
      :style="{ minHeight: size + 'px', maxHeight: size + 'px', minWidth: size + 'px', maxWidth: size + 'px',  }"
    >
      <input 
        type="checkbox" 
        style="opacity: 0;"
        v-model="checked"
      >

      <svg 
        :width="size" 
        :height="size"
        :viewBox="`0 0 ${size} ${size}`" 
        xmlns="http://www.w3.org/2000/svg"
        style="position: absolute; top: 0; left: 0"
        :fill="checked ? 'black' : 'none'" 
        stroke="currentColor"
        :stroke-width="borderWidth"
      >
        <rect
          :x="borderWidth / 2"
          :y="borderWidth / 2"
          :width="size - borderWidth" 
          :height="size - borderWidth"
          rx="2"
        />

        <path 
          v-if="checked"
          :d="`M${0.25 * size},${0.5 * size} L${0.4 * size},${0.65 * size} L${0.8 * size},${0.3 * size}` " 
          fill="none"
          stroke="white"
          :stroke-width="markWidth"
          stroke-linecap="round"  
          stroke-linejoin="round"        
        />
      </svg>
    </div>

    <slot name="postfix"></slot>
  </label>
</template>


<style scoped>
.outer {
  position: relative; 
  display: inline-block; 
  cursor: pointer;
  box-sizing: content-box;

  color: black;
}

@media (prefers-color-scheme: dark) {
  .outer {
    color: silver;
  }
}
</style>
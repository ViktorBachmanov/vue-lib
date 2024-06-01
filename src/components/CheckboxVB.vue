<script setup>
defineProps({
  size: {
    type: Number,
    default: 20,
  },
  borderClass: {
    type: String,
    default: '',
  },
  labelClass: {
    type: String,
    default: '',
  },
  borderWidth: {
    type: Number,
    default: 2,
  },
  markWidth: {
    type: Number,
    default: 1.5,
  },
  prefixLabel: String,
  postfixLabel: String,    
})
const checked = defineModel()

const id = (Math.random() + 1).toString(36).substring(7);

function handleClick() {
  document.getElementById(id).click()
}
</script>


<template>
  <div class="outer">
    <label 
      :for="id"
      v-if="prefixLabel"
      :class="labelClass"
    >
      {{ prefixLabel }}
    </label>

    <div
      class="icon"
      :style="{ minHeight: size + 'px', maxHeight: size + 'px', minWidth: size + 'px', maxWidth: size + 'px',  }"
      @click="handleClick"
    >
      <input 
        type="checkbox" 
        style="opacity: 0;"
        v-model="checked"
        :id="id"
      >

      <svg 
        :width="size" 
        :height="size"
        :viewBox="`0 0 ${size} ${size}`" 
        xmlns="http://www.w3.org/2000/svg"
        style="position: absolute; top: 0; left: 0"
      >
        <rect
          :x="borderWidth / 2"
          :y="borderWidth / 2"
          :width="size - borderWidth" 
          :height="size - borderWidth"
          rx="2"
          :class="borderClass"
          stroke="currentColor"
          :stroke-width="borderWidth"
          :fill="checked ? 'black' : 'none'" 
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

    <label 
      :for="id"
      v-if="postfixLabel"
      :class="labelClass"
    >
      {{ postfixLabel }}
    </label>
  </div>
</template>


<style scoped>
.outer {
  display: flex;
  align-items: center;
  gap: 0.4em;
}

.icon {
  position: relative; 
  display: inline-block; 
  cursor: pointer;
  box-sizing: content-box;

  color: black;
}

label {
  cursor: pointer;
}
</style>
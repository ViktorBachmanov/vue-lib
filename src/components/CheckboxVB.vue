<script setup>
import { watch, } from 'vue';

const props = defineProps({
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
  id: String, 
  bgColorChecked: {
    type: String,
    default: 'blue',
  },
  errorSpace: {
    type: Boolean,
    default: false
  },
  errorColor: {
    type: String,
    default: '#EF4444',
  },
})

const checked = defineModel('checked')
const error = defineModel('error')

watch(checked, () => {
  error.value = ''
})

function handleClick() {
  document.getElementById(props.id).click()
}
</script>


<template>
  <div>
    <div class="checkbox-vb-body">
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
            :fill="checked ? bgColorChecked : 'none'" 
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

    <div 
      v-if="errorSpace" 
      class="error"
    >
      {{ error }}
    </div>
  </div>
</template>


<style scoped>
.checkbox-vb-body {
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

.error {
  min-height: 1.5em;
  margin-top: 2px;
  margin-left: 0.5em;
  font-size: 14px;
  line-height: 20px;
  color: v-bind('errorColor');
}
</style>
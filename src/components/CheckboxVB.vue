<script setup>
defineProps({
  size: {
    type: Number,
    default: 64,
  },
  borderColor: {
    type: String,
    default: null,
  },
  borderWidth: {
    type: Number,
    default: 8,
  }
})
const checked = defineModel()
</script>


<template>
  <label>
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

      <!-- <svg 
        width="24" 
        height="24"
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        style="position: absolute; top: 0; left: 0"
        :fill="checked ? 'black' : 'none'" 
        stroke="currentColor"
        class="checkboxBorder"
      >
        <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg> -->

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
      </svg>

      <!-- <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)"
        v-if="checked"
      >
        <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg> -->

    </div>

    <slot name="postfix"></slot>
  </label>
</template>


<style scoped>
.outer {
  position: relative; 
  display: inline-block; 
  cursor: pointer;
  /* border-style: solid;
  border-radius: 2px; */
  border: 1px solid magenta;
  box-sizing: content-box;

  color: black;
}

@media (prefers-color-scheme: dark) {
  .outer {
    color: silver;
  }
}
</style>
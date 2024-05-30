<script setup>
const checked = defineModel()
</script>


<template>
  <div
    style="position: relative; display: inline-block; min-width: 24px; min-height: 24px;"
  >
    <input 
      type="checkbox" 
      style="visibility: hidden;"
      v-model="checked"
    >

    <svg 
      width="24" 
      height="24"
      viewBox="0 0 24 24" 
      :fill="checked ? 'black' : 'none'" 
      :stroke="checked ? 'black' : '#1E1E1E'"
      xmlns="http://www.w3.org/2000/svg"
      style="position: absolute; top: 0; left: 0"
    >
      <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)"
      v-if="checked"
    >
      <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  </div>
</template>
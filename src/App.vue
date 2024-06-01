<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'

import CheckboxVB from './components/CheckboxVB.vue'


const checked_1 = ref(false)
const checked_2 = ref(false)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1em">
    <label>
      <CheckboxVB 
        v-model="checked_1"
      />
      CheckboxVB-1
    </label>

    <label>
      <CheckboxVB 
        v-model="checked_2"
      />
      CheckboxVB-2
    </label>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>

</style>

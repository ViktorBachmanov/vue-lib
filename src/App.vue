<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'

import CheckboxVB from './components/CheckboxVB.vue'


const checked_1 = ref(false)
const checked_2 = ref(false)

function handleToggleTheme() {
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1em">
    <button @click="handleToggleTheme">Toggle theme</button>

    <label>
      <CheckboxVB 
        v-model="checked_1"
      />
      CheckboxVB-1
    </label>

    <label>
      <CheckboxVB 
        v-model="checked_2"
        class="!text-blue-700 dark:!text-rose-700"
      />
      CheckboxVB-2
    </label>

    <div class="bg-stone-500">
      TailwindCSS
    </div>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>

</style>

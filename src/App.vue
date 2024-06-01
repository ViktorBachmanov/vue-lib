<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'

import CheckboxVB from './components/CheckboxVB.vue'


const checked_1 = ref(false)
const checked_2 = ref(false)
const checked_3 = ref(false)

function handleToggleTheme() {
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 1em">
    <button @click="handleToggleTheme">Toggle theme</button>

    <CheckboxVB 
      v-model="checked_1"
    >
      <template #postfix>CheckboxVB-1</template>
    </CheckboxVB>

    
      <CheckboxVB 
        v-model="checked_2"
        class="!text-blue-700 dark:!text-rose-700"
      >
        <template #postfix>CheckboxVB-2</template>
      </CheckboxVB>

    <div class="bg-stone-500">
      TailwindCSS
    </div>

    <!-- <label> -->
      <CheckboxVB 
        v-model="checked_3"
      >
        <template #postfix>CheckboxVB-3</template>
      </CheckboxVB>
    <!-- </label> -->
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>

</style>

<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'

import CheckboxVB from './components/CheckboxVB.vue'


const checked_1 = ref(false)
const checked_2 = ref(false)
const checked_3 = ref(false)
const checked_4 = ref(false)

function handleToggleTheme() {
  document.documentElement.classList.toggle('dark')
}
</script>

<template>
  <!-- <div style="display: flex; flex-direction: column; gap: 1em"> -->
  <div>
    <button @click="handleToggleTheme">Toggle theme</button>

    <CheckboxVB 
      v-model="checked_1"
      prefixLabel="CheckboxVB-1"
    />
    
    <CheckboxVB 
      v-model="checked_2"
      postfixLabel="CheckboxVB-2"
      class="!text-blue-700 dark:!text-rose-700"
    />

    <div class="bg-stone-500">
      TailwindCSS
    </div>

    <!-- <label> -->
    <CheckboxVB 
      v-model="checked_3"
      postfixLabel="CheckboxVB-3"
    />
      
    <!-- </label> -->
  </div>

  <CheckboxVB 
        v-model="checked_4"
        class="!text-blue-700 dark:!text-rose-700"
      >
        <!-- <template #postfix>CheckboxVB-2</template> -->
      </CheckboxVB>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>

</style>

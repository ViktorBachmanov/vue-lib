<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { ref, watch } from 'vue'

import CheckboxVB from './components/CheckboxVB.vue'
import InputVB from './components/InputVB.vue'


const checked_1 = ref(false)
const checked_2 = ref(false)
const checked_3 = ref(false)
const errorOn = ref(false)

function handleToggleTheme() {
  document.documentElement.classList.toggle('dark')
}

const val = ref('someVal')
const error = ref('')

watch(errorOn, (newVal) => {
  error.value = newVal
    ? 'Введены некорректные данные'
    : ''
})
</script>

<template>
  <div style="display: flex; flex-direction: column;">
    <button @click="handleToggleTheme">Toggle theme</button>

    <CheckboxVB 
      v-model="checked_1"
      prefixLabel="CheckboxVB-1"
      class="text-sm"
      borderClass="dark:text-gray-500"
      labelClass="dark:text-gray-500"
    />
    
    <CheckboxVB 
      v-model="checked_2"
      postfixLabel="CheckboxVB-2"
      class="!text-blue-700 dark:!text-rose-700"
      id="CheckboxVB-2"
    />

    <div class="bg-stone-500">
      TailwindCSS
    </div>

    <!-- <label> -->
    <CheckboxVB 
      v-model="checked_3"
      postfixLabel="CheckboxVB-3"
      id="CheckboxVB-3"
    />

    <CheckboxVB 
      v-model="errorOn"
      class="!text-blue-700 dark:!text-rose-700"
      id="ErrorOnCheckboxVB"
      postfixLabel="Error On / Off"
    />

    <InputVB 
      wrapperClass="!border-gray-400 dark:!border-blue-400"
      colorLight="#6F46C4"
      colorDark="#6F46C4"
      type="email"
      placeholder="Email"
      v-model:val="val"
      v-model:error="error"
    />
    
    <div style="border: 1px solid magenta; min-height: 2em"></div>
    <!-- </label> -->
  </div>

  
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>

</style>

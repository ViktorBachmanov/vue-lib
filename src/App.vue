<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { ref, watch, computed } from 'vue'

import CheckboxVB from './components/CheckboxVB.vue'
import InputVB from './components/InputVB.vue'
import TextareaVB from './components/TextareaVB.vue'
import SelectVB from './components/SelectVB.vue'


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

const textareaValue = ref('kbkjb')
const textareaError = ref('')

const textareaClass = computed(() => {
  let taClass = 'rounded-[20px] p-4 resize-none dark:text-gray-300 border '

  return textareaError.value
    ? taClass + '!border-red-700 dark:!border-red-500'
    : taClass + '!border-slate-800 dark:!border-slate-300'
})

function handleSubmit() {
  textareaError.value = 'Должно быть заполнено'
}

const selectValStr = ref('')
const selectValObj = ref({})
const selectValArr = ref([])
</script>

<template>
  <div style="display: flex; flex-direction: column;">
    <button @click="handleToggleTheme">Toggle theme</button>

    <fieldset class="border border-black dark:border-white p-5 rounded-lg m-10">
      <legend class="text-black dark:text-white">String</legend>
      <SelectVB
        class="my-10 dark:text-white"
        selectElClass="border border-1 border-black dark:border-white rounded-lg"
        :options="['White', 'Black']"
        v-model:value="selectValStr"
        optionsClass="!bg-slate-200 dark:!bg-slate-800"
      />

      <pre class="mb-10 dark:text-white">{{ selectValStr }}</pre>
    </fieldset>

    <fieldset class="border border-black dark:border-white p-5 rounded-lg m-10">
      <legend class="text-black dark:text-white">Object</legend>
      <SelectVB
        class="my-10 dark:text-white"
        selectElClass="border border-1 border-black dark:border-white rounded-lg"
        :options="[{ label: 'White', id: 1 }, { label: 'Black', id: 2 }]"
        v-model:value="selectValObj"
      />

      <pre class="mb-10 dark:text-white">{{ selectValObj }}</pre>
    </fieldset>

    <fieldset class="border border-black dark:border-white p-5 rounded-lg m-10">
      <legend class="text-black dark:text-white">Array</legend>
      <SelectVB
        class="my-10 dark:text-white"
        selectElClass="border border-1 border-black dark:border-white rounded-lg"
        :options="[{ label: 'White', id: 1 }, { label: 'Black', id: 2 }]"
        v-model:value="selectValArr"
        multiple
      />

      <pre class="mb-10 dark:text-white">{{ selectValArr }}</pre>
    </fieldset>

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
      v-model:value="val"
      v-model:error="error"
      id="emailInputId"
      label="Email"
    />
    
    <div style="border: 1px solid magenta; min-height: 2em"></div>
    <!-- </label> -->

    <TextareaVB
      id="textAreaId"
      label="Textarea"
      v-model:value="textareaValue"
      v-model:error="textareaError"
      labelClass="ml-[20px] dark:text-gray-300"
      :textareaClass="textareaClass"
    />

    <pre 
      style="border: 1px green solid"
      class="m-4"
    >{{ textareaValue }}</pre>

    <button
      @click="handleSubmit"
      class="m-4"
    >
      Submit
    </button>

    <textarea>
      kjsdnksjn skjnckj
    </textarea>
  </div>

  
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>


<style>
.test-class {
  border: 2px solid blue !important;
}

.dark .test-class {
  border: 2px solid cyan !important;
}

.test-class-error {
  border: 2px solid orange !important;
}

</style>

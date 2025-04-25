<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import { ref, watch, computed } from 'vue'

import CheckboxVB from './components/CheckboxVB.vue'
import InputVB from './components/InputVB.vue'
import TextareaVB from './components/TextareaVB.vue'
import SelectVB from './components/SelectVB.vue'
import IconX from './components/icon/IconX.vue';
import IconMinus from './components/icon/IconMinus.vue';
import DateInputVB from './components/DateInputVB.vue'


const checked_1 = ref(false)
const checked_2 = ref(false)
const checked_3 = ref(false)
const errorOn = ref(false)

function handleToggleTheme() {
  document.documentElement.classList.toggle('dark')
}

const val = ref('someVal')
const error = ref('')

const intVal = ref(1)
const intValError = ref('')

watch(errorOn, (newVal) => {
  error.value = newVal
    ? 'Введены некорректные данные'
    : ''
})

const textareaValue = ref('')
const textareaError = ref('')

const textareaClass = computed(() => {
  let taClass = 'rounded-[20px] p-4 resize-none dark:text-gray-300 border border-slate-800 dark:border-slate-300'

  return taClass

  // return textareaError.value
  //   ? taClass + '!border-red-700 dark:!border-red-500'
  //   : taClass + '!border-slate-800 dark:!border-slate-300'
})

function handleSubmit() {
  textareaError.value = 'Должно быть заполнено'
}

const selectValStr = ref('')
const selectErrorStr = ref('')
const selectValObj = ref({})
const selectValArr = ref([])

const date = ref(new Date)

function handleClickScopedSlot(item) {
  console.log('handleClickScopedSlot item: ', item)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; margin-bottom: 100px">
    <button 
      @click="handleToggleTheme"
    >Toggle theme</button>

    <DateInputVB
      class="m-10 dark:text-gray-300 w-[380px] h-[60px]
        rounded-[20px] border border-[#D0D3D5] text-[26px] !z-[155]" 
      v-model:date="date"
      picker
      focused-bg-color="rgb(167 243 208 / 0.6)"
      pickerCSS="shadow-xl text-xl border border-stone-500 rounded-lg"
    />

    <fieldset class="border border-black dark:border-white p-5 rounded-lg m-10">
      <legend class="text-black dark:text-white">String</legend>
      <SelectVB
        class="my-10 dark:text-white"
        selectClass="border border-1 border-black dark:border-white rounded-lg"
        :options="['White', 'Black']"
        v-model:value="selectValStr"
        optionsClass="!bg-slate-200 dark:!bg-slate-800"
        label="String select"
        :error-space="true"
        v-model:error="selectErrorStr"
        sticky
        stickySelectedOptionBgColor="#a3d6d0"
      >
        <template #postfixIcon>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke-width="2" 
            stroke="currentColor" 
            class="w-4"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </template>
      </SelectVB>

      <pre class="mb-10 dark:text-white">{{ selectValStr }}</pre>
    </fieldset>

    <fieldset class="border border-black dark:border-white p-5 rounded-lg m-10">
      <legend class="text-black dark:text-white">Object</legend>
      <SelectVB
        class="my-10 dark:text-white"
        selectClass="border border-1 border-black dark:border-white rounded-lg !max-w-[100px]"
        :options="[{ label: 'Плазменная резка', id: 1, disabled: true }, { label: 'Лазерная резка', id: 2 }, { label: 'Раскрой материала', id: 3 }]"
        v-model:value="selectValObj"
        options-in-center
        option-class="!min-w-[500px]"
        sticky
      />

      <pre class="mb-10 dark:text-white">{{ selectValObj }}</pre>
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
      bgColorChecked="magenta"
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

    <InputVB 
      wrapperClass="!border-gray-400 dark:!border-blue-400"
      colorLight="#6F46C4"
      colorDark="#6F46C4"
      type="text"
      placeholder="Введите целое число"
      v-model:value="intVal"
      v-model:error="intValError"
      id="integerInputId"
      label="Целое число"
      integer
    />
    
    <div style="border: 1px solid magenta; min-height: 2em"></div>
    <!-- </label> -->

    <DateInputVB
      class="m-10 dark:text-gray-300 w-[380px] h-[60px]
        rounded-[20px] border border-[#D0D3D5] text-[26px] !z-[155]" 
      v-model:date="date"
      picker
      focused-bg-color="rgb(167 243 208 / 0.6)"
      :picker-z-index="175"
    />

    <TextareaVB
      id="textAreaId"
      label="Textarea"
      v-model:value="textareaValue"
      v-model:error="textareaError"
      labelClass="ml-[20px] dark:text-gray-300"
      :textareaClass="textareaClass"
      placeholder="Опишите подробно"
      :placeholderCSS="{ fontSize: '16px', color: 'blue' }"
      errorColor="red"
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

    <DateInputVB
      class="m-10 dark:text-gray-300 w-[380px] h-[60px]
        rounded-[20px] border border-[#D0D3D5] text-[26px] !z-[155]" 
      v-model:date="date"
      picker
      focused-bg-color="rgb(167 243 208 / 0.6)"
      :picker-z-index="125"
    />

    <fieldset class="border border-black dark:border-white p-5 rounded-lg m-10">
      <legend class="text-black dark:text-white">Array</legend>
      <SelectVB
        class="my-10 dark:text-white"
        selectClass="!w-[400px] border border-1 border-[#D0D3D5] dark:border-white rounded-[20px] !min-h-[60px] 
          bg-white dark:!bg-slate-800 !flex-nowrap"
        :options="[{ label: 'Плазменная резка', id: 1 }, { label: 'Лазерная резка', id: 2 }, { label: 'Раскрой материала', id: 3 }]"
        v-model:value="selectValArr"
        label="Multiple"
        multiple
        chips
        chip-class="!text-[15.31px] !text-white !p-[7px] !pr-[9px] !rounded-[15px] bg-[#95C11F] !max-h-[30px] !gap-[4px] !border-0"
        chips-class="!gap-[10px]"
        optionClass="group text-gray-400 hover:!text-white hover:bg-green-400"
        optionsClass="whitespace-nowrap !rounded-[20px] !border-[#D0D3D5] bg-white py-2"
        options-placement="under"
        :offset="10"
        :z-index="55"
      >
        <template #prefixIcon>
          <IconX class="rotate-45 ml-2 shrink-0"/>
        </template>

        <template #prefixChipIcon>
          <IconX class="text-white"/>
        </template>

        <template #postfixChipIcon="{ item }">
          <svg @click.stop="handleClickScopedSlot(item)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M11.5 18c4 0 7.46-2.22 9.24-5.5C18.96 9.22 15.5 7 11.5 7s-7.46 2.22-9.24 5.5C4.04 15.78 7.5 18 11.5 18m0-12c4.56 0 8.5 2.65 10.36 6.5C20 16.35 16.06 19 11.5 19S3 16.35 1.14 12.5C3 8.65 6.94 6 11.5 6m0 2C14 8 16 10 16 12.5S14 17 11.5 17S7 15 7 12.5S9 8 11.5 8m0 1A3.5 3.5 0 0 0 8 12.5a3.5 3.5 0 0 0 3.5 3.5a3.5 3.5 0 0 0 3.5-3.5A3.5 3.5 0 0 0 11.5 9"/></svg>
        </template>

        <template #prefixOptionIcon="{ isSelected }">
          <IconMinus class="mr-1.5" v-if="isSelected"/>
          <IconX class="rotate-45 mr-2 text-gray-400 group-hover:!text-white" v-else/>
        </template>

        <template #postfixOptionIcon="{ isSelected }">
          <IconX class="rotate-45 text-gray-500" v-if="isSelected"/>
        </template>
      </SelectVB>


      <!-- <pre class="mb-10 dark:text-white">{{ selectValArr }}</pre> -->
    </fieldset>

    <fieldset class="border border-black dark:border-white p-5 rounded-lg m-10">
      <legend class="text-black dark:text-white">Object</legend>
      <SelectVB
        class="my-10 dark:text-white"
        selectClass="border border-1 border-black dark:border-white rounded-lg !max-w-[100px]"
        :options="[{ label: 'Плазменная резка', id: 1 }, { label: 'Лазерная резка', id: 2 }, { label: 'Раскрой материала', id: 3 }]"
        v-model:value="selectValObj"
        options-in-center
        option-class="!min-w-[500px]"
        sticky
      />

      <pre class="mb-10 dark:text-white">{{ selectValObj }}</pre>
    </fieldset>

    <br>
    <br>
    <br>
    <br>
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

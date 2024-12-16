<script setup>
import { ref, computed, watchEffect } from 'vue'

import DateInputPart from './DateInputPart.vue';
import DatePicker from './DatePicker.vue';


const props = defineProps({
  pickerIconSize: {
    type: Number,
    default: 24,
  },
  pickerZIndex: {
    type: Number,
    default: 55,
  }
})

const date = ref(new Date)

const num = computed({
  get: () => date.value.getDate(),
  set(newVal) {
    date.value = new Date(`${year.value}-${month.value + 1}-${newVal}`)
  }
})
// const day = ref(date.value.getDay())
const month = computed({
  get: () => date.value.getMonth(),
  set(newVal) {
    date.value = new Date(`${year.value}-${newVal + 1}-${num.value}`)
  }
})
const year = computed({
  get: () => date.value.getFullYear(),
  set(newVal) {
    date.value = new Date(`${newVal}-${month.value + 1}-${num.value}`)
  }
})

watchEffect(() => {
  date.value = new Date(`${year.value}-${month.value + 1}-${num.value}`)
})

const cNum = computed({
  get() {
    return num.value
  },
  set(newVal) {
    num.value = newVal
  }
})

const cMonth = computed({
  get() {
    return month.value + 1
  },
  set(newVal) {
    month.value = newVal - 1
  }
})

const cYear = computed({
  get() {
    return year.value - 2000
  },
  set(newVal) {
    year.value = Number(newVal) + 2000
  }
})

// const lastDigitOfYear = computed(() => year.value)

const partsRefs = {
  num: ref(null),
  month: ref(null),
  year: ref(null),
}

function handleFocus(partRef) {
  partRef.value.handleFocus()
}

const pickerIsOpen = ref(false)

function handleOpenPicker() {
  pickerIsOpen.value = true
}
</script>

<template>
  <div class="outer">
    <div>
      <DateInputPart 
        :ref="partsRefs.num"
        v-model="cNum"
        @right="handleFocus(partsRefs.month)"
      />.<DateInputPart 
        :ref="partsRefs.month"
        v-model="cMonth"
        @right="handleFocus(partsRefs.year)"
        @left="handleFocus(partsRefs.num)"
      />.<DateInputPart 
        :ref="partsRefs.year"
        prefix="20" 
        v-model="cYear"
        @left="handleFocus(partsRefs.month)"
      />
    </div>

    <slot name="calendar-icon">
      <svg xmlns="http://www.w3.org/2000/svg" 
        :width="pickerIconSize" 
        :height="pickerIconSize" 
        fill="currentColor" 
        class="bi bi-calendar3" 
        viewBox="0 0 16 16"
        style="cursor: pointer;"
        @click="handleOpenPicker"
      >
        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
      </svg>
    </slot>

    <DatePicker 
      v-if="pickerIsOpen"
      v-model="date"
      :z-index="pickerZIndex"
    />
  </div>
</template>

<style scoped>
.outer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.5em;
  padding-right: 0.5em;
  position: relative;
}
</style>
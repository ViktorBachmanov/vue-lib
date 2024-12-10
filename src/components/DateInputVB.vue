<script setup>
import { ref, computed, watchEffect } from 'vue'

import DateInputPart from './DateInputPart.vue';
import DatePicker from './DatePicker.vue';

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
</script>

<template>
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

    <DatePicker 
      v-model="date"
    />
  </div>
</template>
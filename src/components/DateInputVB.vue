<script setup>
import { ref, computed, watchEffect } from 'vue'

import DateInputPart from './DateInputPart.vue';
import DatePicker from './DatePicker.vue';

const date = ref(new Date)

const num = ref(date.value.getDate())
// const day = ref(date.value.getDay())
const month = ref(date.value.getMonth())
const year = ref(date.value.getFullYear())

watchEffect(() => {
  date.value = new Date(`${year.value}-${month.value + 1}-${num.value}`)
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
    year.value = newVal + 2000
  }
})

// const lastDigitOfYear = computed(() => year.value)

</script>

<template>
  <div>
    <DateInputPart 
      v-model="num"
    />.<DateInputPart 
      v-model="cMonth"
    />.<DateInputPart 
      prefix="20" 
      v-model="cYear"
    />

    <DatePicker 
      v-model="date"
    />
  </div>
</template>
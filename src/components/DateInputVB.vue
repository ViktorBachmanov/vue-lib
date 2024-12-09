<script setup>
import { ref, computed } from 'vue'

import DateInputPart from './DateInputPart.vue';
import DatePicker from './DatePicker.vue';

const date = ref(new Date)

const num = ref(date.value.getDate())
const day = ref(date.value.getDay())
const month = ref(date.value.getMonth())
const year = ref(date.value.getFullYear())

// const lastDigitOfYear = computed(() => year.value)

</script>

<template>
  <div>
    <DateInputPart 
      :initial-val="num"
    />.<DateInputPart 
      :initial-val="month + 1"
    />.<DateInputPart 
      prefix="20" 
      :initial-val="year - 2000"
    />

    <DatePicker />
  </div>
</template>
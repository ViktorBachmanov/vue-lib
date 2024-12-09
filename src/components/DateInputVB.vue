<script setup>
import DateInputPart from './DateInputPart.vue';
import DateInputDigit from './DateInputDigit.vue';
// const date = ref((new Date).toDateString())

// const currentDigitIndex = ref(null) // 1...6
</script>

<template>
  <div>
    <DateInputPart 
    />.<DateInputPart 
    />.<DateInputPart 
      prefix="20" 
    />

    <div class="mt-3">
      <DateInputDigit />
    </div>
  </div>
</template>
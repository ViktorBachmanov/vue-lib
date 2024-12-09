<script setup>
import DateInputPart from './DateInputPart.vue';
// const date = ref((new Date).toDateString())
</script>

<template>
  <div>
    <DateInputPart />.<DateInputPart />.<DateInputPart prefix="20" />
  </div>
</template>
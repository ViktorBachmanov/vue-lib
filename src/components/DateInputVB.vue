<script setup>
import { ref, computed, watchEffect, nextTick } from 'vue'

import DateInputPart from './DateInputPart.vue';
import DatePicker from './DatePicker.vue';


const props = defineProps({
  picker: {
    type: Boolean,
    default: false,
  },
  pickerIconSize: {
    type: Number,
    default: 24,
  },
  pickerZIndex: {
    type: Number,
    default: 55,
  },
  focusedBgColor: {
    type: String,
    default: '#95C11F'
  }
})

const date = defineModel('date')

const num = computed({
  get: () => date.value.getDate(),
  set(newVal) {
    const newDate = new Date(`${year.value}-${month.value + 1}-${newVal}`)
    // console.log('newDate: ', newDate)
    // console.log('isValidDate: ', isValidDate(newDate))
    if (isValidDate(newDate)) {
      date.value = newDate
    }
  }
})

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

// const day = ref(date.value.getDay())
const month = computed({
  get: () => date.value.getMonth(),
  set(newVal) {
    const newDate = new Date(`${year.value}-${newVal + 1}-${num.value}`)
    if (isValidDate(newDate)) {
      date.value = newDate
    }
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

async function handleTogglePicker() {
  if (pickerIsOpen.value) {
    pickerIsOpen.value = false
    window.removeEventListener('click', closePicker)
    window.removeEventListener('keyup', escape)
  } else {
    pickerIsOpen.value = true
    await nextTick()
    placePicker()
    window.addEventListener('click', closePicker)
    window.addEventListener('keyup', escape)
  }
}

function closePicker() {
  pickerIsOpen.value = false
}

function escape(e) {
  if (e.key === 'Escape') {
    closePicker()
  }
}

const outerRef = ref(null)
const pickerRef = ref(null)

function placePicker() {
  const outerRect = outerRef.value.getBoundingClientRect()
  // const pickerRect = pickerRef.value.outerRef.getBoundingClientRect()
  const pickerRect = pickerRef.value.outerRect

  const widthDiff = outerRect.width - pickerRect.width
  // pickerRef.value.outerRef.style.left = widthDiff / 2 + 'px'
  pickerRef.value.setStyle('left', widthDiff / 2 + 'px')
}
</script>

<template>
  <div 
    class="outer"
    ref="outerRef"
  >
    <div>
      <DateInputPart 
        :ref="partsRefs.num"
        v-model="cNum"
        @right="handleFocus(partsRefs.month)"
        @done="handleFocus(partsRefs.month)"
        :focusedBgColor="focusedBgColor"
      />.<DateInputPart 
        :ref="partsRefs.month"
        v-model="cMonth"
        @right="handleFocus(partsRefs.year)"
        @done="handleFocus(partsRefs.year)"
        @left="handleFocus(partsRefs.num)"
        :focusedBgColor="focusedBgColor"
      />.<DateInputPart 
        :ref="partsRefs.year"
        prefix="20" 
        v-model="cYear"
        @left="handleFocus(partsRefs.month)"
        :focusedBgColor="focusedBgColor"
      />
    </div>

    <slot name="calendar-icon" v-if="picker">
      <svg xmlns="http://www.w3.org/2000/svg" 
        :width="pickerIconSize" 
        :height="pickerIconSize" 
        fill="currentColor" 
        class="bi bi-calendar3" 
        viewBox="0 0 16 16"
        style="cursor: pointer;"
        @click.stop="handleTogglePicker"
      >
        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857z"/>
        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
      </svg>
    </slot>

    <Transition>
      <DatePicker 
        v-if="pickerIsOpen"
        v-model="date"
        :z-index="pickerZIndex"
        @click.stop
        ref="pickerRef"
      />
    </Transition>
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
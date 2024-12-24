<script setup>
import { ref, computed } from 'vue'
import { useDate } from '../composables/useDate.js'
import IconChevronDeg from './icon/IconChevronDeg.vue'


const props = defineProps({
  zIndex: {
    type: Number,
    default: 55,
  },
  weekendBg: {
    type: String,
    default: 'rgb(253 164 175 / 0.6'
  }
})

const date = defineModel()

console.log('date: ', date.value)

const { year, month, num } = useDate(date)

const monthName = computed(() => {
  switch (month.value) {
    case 0: return 'Январь'
    case 1: return 'Февраль'
    case 2: return 'Март'
    case 3: return 'Апрель'
    case 4: return 'Май'
    case 5: return 'Июнь'
    case 6: return 'Июль'
    case 7: return 'Август'
    case 8: return 'Сентябрь'
    case 9: return 'Октябрь'
    case 10: return 'Ноябрь'
    case 11: return 'Декабрь'
  }
})

// const firstDay = computed(() => day.value - num.value % 7 + 1)
const firstDay = computed(() => {
  let day = (new Date(`${year.value}-${month.value + 1}-1`)).getDay()
  if (day == 0) {
    day = 7
  }
  return day
})

console.log('firstDay: ', firstDay.value)

const weeks = computed(() => {
  const totalDays = daysInMonth(month.value, year.value)
  console.log('totalDays: ', totalDays)

  const weeks = []
  
  const totalWeeks = Math.ceil(totalDays / 7)
  // console.log('totalWeeks: ', totalWeeks)

  let currentNum = 1
  console.log('currentNum: ', currentNum)

  // for (let w = 0; w < totalWeeks; w++) {
  for (let w = 0; currentNum < totalDays && w < 7; w++) {
    weeks[w] = []
    for (let d = 0; d < 7; d++) {
      const currentDay = w * 7 + d + 1
      if (currentDay < firstDay.value  || currentNum > totalDays) {
        weeks[w][d] = ''        
      } else {
        weeks[w][d] = currentNum++
      }
    }
    // console.log('startDay: ', startDay)
  }

  return weeks
})

function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

function handleSelect(num) {
  if (!num) {
    return
  }

  date.value = new Date(`${year.value}-${month.value + 1}-${num}`)
}

const outerRef = ref(null)

const outerRect = computed(() => outerRef.value.getBoundingClientRect())

defineExpose({
  // outerRef,
  outerRect,
  setStyle,
})

function setStyle(prop, val) {
  outerRef.value.style[prop] = val
}

function handlePrevMonth() {
  month.value--
}

function handleNextMonth() {
  month.value++
}
</script>

<template>
  <div class="date-input-vb-calendar" ref="outerRef">
    <div class="date-input-vb-calendar-month">
      <IconChevronDeg
        :angle="180"
        @click="handlePrevMonth"
      />

      {{ monthName }}

      <IconChevronDeg
        @click="handleNextMonth"
      />
    </div>
    <div>{{ year }}</div>

    <table class="date-input-vb-calendar-table">
      <thead>
        <tr>
          <th>Пн</th>
          <th>Вт</th>
          <th>Ср</th>
          <th>Чт</th>
          <th>Пт</th>
          <th>Сб</th>
          <th>Вс</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="week in weeks"
        >
          <td
            v-for="d in week"
            :class="{ selectable: d, selected: d == num }"
            @click="handleSelect(d)"
          >
            <span>{{ d }}</span>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 4px;
}

th, td {
  /* border: 5px solid transparent; */
  padding: 0.25em;
}

th {
  font-weight: 500;
}

td {
  text-align: right;
}

th:nth-child(6), th:nth-child(7),
td:nth-child(6), td:nth-child(7) {
  background-color: v-bind('weekendBg');
  /* color: white; */
} 

.selectable {
  cursor: pointer;
}

.selected {
  box-shadow: inset 0 0 0 4px #c11fc1a4;
  border-radius: 10px;
}

.date-input-vb-calendar {
  z-index: v-bind('zIndex');
  background-color: white;
  position: absolute;
  top: 3em;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* gap: 0.33em; */
}

.dark .date-input-vb-calendar {
  background-color: black;
}

.date-input-vb-calendar-table {
  margin-top: 0.33em;
}

.date-input-vb-calendar-month {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-right: 0.33em;
  padding-left: 0.33em;
}
</style>

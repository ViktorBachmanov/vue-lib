<script setup>
import { ref, computed } from 'vue'


const props = defineProps({
  zIndex: {
    type: Number,
    default: 55,
  }
})

const date = defineModel()

console.log('date: ', date.value)


// const num = defineModel('num')
// const day = defineModel('day')
// const month = defineModel('month')
// const year = defineModel('year')

const num = computed(() => date.value.getDate())
// const day = computed(() => date.value.getDay())
const month = computed(() => date.value.getMonth())
const year = computed(() => date.value.getFullYear())

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
</script>

<template>
  <div class="date-input-vb-calendar">
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
th, td {
  border: 0.5px solid;
  padding: 0.25em
}

td {
  text-align: right;
}

th:nth-child(6), th:nth-child(7),
td:nth-child(6), td:nth-child(7) {
  background-color: rgb(98, 18, 68);
  color: white;
} 

.selectable {
  cursor: pointer;
}

.selected {
  box-shadow: inset 0 0 2px 3px #95C11F;
}

.date-input-vb-calendar {
  z-index: v-bind('zIndex');
  background-color: white;
  position: absolute;
  top: 3em;
  left: 0;
}

.dark .date-input-vb-calendar {
  background-color: black;
}
</style>

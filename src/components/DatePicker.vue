<script setup>
import { computed } from 'vue'

const date = defineModel()

console.log('date: ', date.value)


// const num = defineModel('num')
// const day = defineModel('day')
// const month = defineModel('month')
// const year = defineModel('year')

const num = computed(() => date.value.getDate())
const day = computed(() => date.value.getDay())
const month = computed(() => date.value.getMonth())
const year = computed(() => date.value.getFullYear())

const firstDay = computed(() => day.value - num.value % 7 + 1)

const weeks = computed(() => {
  const totalDays = daysInMonth(month.value, year.value)
  const weeks = []
  // for (let i = 0; i <= daysInMonth; i += 7) {
  //   weeks.push()
  // }
  console.log('totalDays: ', totalDays)
  const totalWeeks = Math.ceil(totalDays / 7)
  console.log('totalWeeks: ', totalWeeks)

  let currentNum = firstDay.value + 2
  console.log('currentNum: ', currentNum)

  for (let w = 0; w < totalWeeks; w++) {
    weeks[w] = []
    for (let d = 0; d < 7; d++) {
      // if (startDay > (w + 1) * (d + 1)) {
      //   weeks[w].push('')
      //   continue
      // }
      if (w * 7 + d < (totalDays - 1) && currentNum > 0) {
        weeks[w][d] = currentNum
      } else {
        weeks[w][d] = ''
      }
      currentNum++
    }
    // console.log('startDay: ', startDay)
  }

  return weeks
})

function daysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}
</script>

<template>
  <div>
    <table>
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
            :class="{ selected: d == num }"
          >
            {{ d }}
          </td>

        </tr>
      </tbody>
    </table>
    {{ firstDay }}
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

:nth-child(6), :nth-child(7) {
  background-color: rgb(98, 18, 68);
} 

.selected {
  box-shadow: inset 0 0 2px 3px #95C11F;
}
</style>

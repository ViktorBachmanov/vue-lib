import { computed } from 'vue'

export function useDate(date) {
  const year = computed({
    get: () => date.value.getFullYear(),
    set(newVal) {
      date.value = new Date(`${newVal}-${month.value + 1}-${num.value}`)
    }
  })

  const month = computed({
    get: () => date.value.getMonth(),
    set: async (newVal) => {
      if (newVal > 11) {
        year.value++
        await new Promise(resolve => setTimeout(resolve, 0))
        newVal %= 12
      } else if (newVal < 0) {
        year.value--
        await new Promise(resolve => setTimeout(resolve, 0))
        newVal += 12
      } 
      const newDate = new Date(`${year.value}-${newVal + 1}-${num.value}`)
      if (isValidDate(newDate)) {
        date.value = newDate
      }
    }
  })

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
 

  return {
    year,
    month,
    num,
  }
}


//////////////////// hepler functions //////////////////

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
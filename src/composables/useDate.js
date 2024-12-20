import { computed, } from 'vue'

export function useDate(date) {
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
    num,
  }
}


//////////////////// hepler functions //////////////////

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}
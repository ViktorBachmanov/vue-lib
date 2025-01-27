<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  prefix: String,
  focusedBgColor: {
    type: String,
    default: '#95C11F'
  }
})

// const val = ref(props.initialVal)
const val = defineModel()
const valRef = ref(null)

const cVal = computed({
  get() {
    return Number(val.value) > 9 
      ? val.value
      : '0' + val.value
  },
  set: newVal => val.value = newVal 
})

const focused = ref(false)

const digitStrokesCount = ref(0)

function handleFocus() {
  const event = new Event('focusDateInputVBPart')
  window.dispatchEvent(event)
  addEventListener('focusDateInputVBPart', handleBlur)
  addEventListener('keydown', handleKeydown)
  addEventListener('click', handleBlur, true)

  focused.value = true
}

function handleBlur() {
  focused.value = false
  removeEventListener('focusDateInputVBPart', handleBlur)
  removeEventListener('keydown', handleKeydown)
  removeEventListener('click', handleBlur)

  digitStrokesCount.value = 0
}

function handleKeydown(e) {
  // console.log('e.key: ', e.key)
  if (e.key >= '0' && e.key <= '9') { 
    switch (digitStrokesCount.value++) {
      case 0:
        if (e.key == '0') {
          digitStrokesCount.value--
          break
        }
        val.value = e.key
        break
      case 1:
        val.value += e.key
        done()
        break
      default:
        handleBlur()
        break
    }
  } else {
    switch (e.key) {
      case 'ArrowRight':
      case 'Enter':
        handleRight()
        break
      case 'ArrowLeft':
        handleLeft()
        break
      case 'Delete':
      case 'Backspace':
        handleDelete()
        break
    }
  }
}

const emit = defineEmits(['right', 'left', 'done'])

function handleRight() {
  handleBlur()
  emit('right')
}

function handleLeft() {
  handleBlur()
  emit('left')
}

function handleDelete() {
  // val.value = ''
}

function done() {
  handleBlur()
  emit('done')
}

defineExpose({
  handleFocus,
})
</script>

<template>
  <div 
    style="display: inline; cursor: pointer;"
    @click="handleFocus"
  >
    <span v-if="prefix">{{ prefix }}</span><span ref="valRef" :class="{ focused: focused }">{{ cVal }}</span>
  </div>
</template>

<style scoped>
.focused {
  background-color: v-bind('focusedBgColor');
}
</style>
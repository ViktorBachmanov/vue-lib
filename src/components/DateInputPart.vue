<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  prefix: String,
})

const val = ref(1)
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

  focused.value = true
}

function handleBlur() {
  focused.value = false
  removeEventListener('focusDateInputVBPart', handleBlur)
  removeEventListener('keydown', handleKeydown)
  digitStrokesCount.value = 0
}

function handleKeydown(e) {
  if (e.key >= '0' && e.key <= '9') { 
    switch (digitStrokesCount.value++) {
      case 0:
        val.value = e.key
        break
      case 1:
        val.value += e.key
        break
      default:
        handleBlur()
        break
    }
  }
}
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
  background-color: #95C11F;
}
</style>
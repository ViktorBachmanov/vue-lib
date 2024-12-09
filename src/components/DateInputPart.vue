<script setup>
import { ref } from 'vue'

const props = defineProps({
  prefix: String,
})

const val = ref('01')
const valRef = ref(null)

const focused = ref(false)

function handleFocus() {
  // const range = new Range()
  // range.setStart(valRef.value, 0)
  // range.setEnd(valRef.value, 1)

  // document.getSelection().removeAllRanges();
  // document.getSelection().addRange(range);

  const event = new Event('focusDateInputVBPart')
  window.dispatchEvent(event)
  addEventListener('focusDateInputVBPart', handleBlur)

  focused.value = true
}

function handleBlur() {
  focused.value = false
  removeEventListener('focusDateInputVBPart', handleBlur)
}
</script>

<template>
  <div 
    style="display: inline; cursor: pointer;"
    @click="handleFocus"
  >
    <span v-if="prefix">{{ prefix }}</span><span ref="valRef" :class="{ focused: focused }">{{ val }}</span>
  </div>
</template>

<style scoped>
.focused {
  background-color: #95C11F;
}
</style>
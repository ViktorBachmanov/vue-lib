<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: [
      {
        label: 'Option1',
        value: 'Option1',
      },
    ],
  },
  labelKey: {
    type: String,
    default: 'label',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  chips: {
    type: Boolean,
    default: false,
  },
  selectElClass: {
    type: String,
    default: '',
  }
})

const val = defineModel('value')
const error = defineModel('error')

watch(val, () => {
  error.value = ''
})

const selectEl = ref(null)
const optionsEl = ref(null)

const items = computed(() => {
  let arr

  if (Array.isArray(val.value)) {
    arr = val.value
  } else {
    arr = [val.value]
  }

  return props.chips
    ? arr
    : arr.map(item => item.label).join(', ')
})

function handleSelectOption(option) {
  if (props.multiple) {

  } else {
    val.value = option
  }
}
</script>

<template>
  <div>
    <div
      ref="selectEl"
      :class="selectElClass"
    >
      <div
        v-if="chips"
      >
        <div
          v-for="item in items"
        >

        </div>
      </div>

      <div
        v-else
      >
        {{ items }}
      </div>
    </div>

    <ul
      ref="optionsEl"
    >
      <li
        v-for="option in options"
        class="select-vb-option"
        @click="handleSelectOption(option)"
      >
        {{ option[labelKey] }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.select-vb-option {
  cursor: pointer;
}
</style>
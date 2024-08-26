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
  valueKey: {
    type: String,
    default: 'id',
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

function isSelected(option) {
  console.log('isSelected')
  if (typeof val.value === 'string' || val.value instanceof String) {
    return val.value === option
  } else if (Array.isArray(val.value)) {
    console.log('isArray')
    return val.value.some(item => item[props.valueKey] === option[props.valueKey])
  } else if (typeof val.value === 'object') {
    return val.value[props.valueKey] === option[props.valueKey]
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
        <div class="flex justify-between">
          {{ option[labelKey] }}
          <span v-if="isSelected(option)">&check;</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.select-vb-option {
  cursor: pointer;
}
</style>
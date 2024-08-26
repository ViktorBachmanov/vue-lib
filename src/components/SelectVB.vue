<script setup>
import { ref, computed, watch, nextTick, onUpdated } from 'vue'

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
  },
  placeholder: {
    type: String,
    default: 'Select',
  },
  optionsClass: {
    type: String,
    default: ''
  },
  optionClass: {
    type: String,
    default: ''
  },
  placeholderClass: {
    type: String,
    default: ''
  },
})

const val = defineModel('value')
const error = defineModel('error')

watch(val, () => {
  error.value = ''
})

const isOpen = ref(false)

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
    : arr.map(item => item[props.labelKey] || item).join(', ')
})

function handleSelectOption(option) {
  if (props.multiple) {
    const index = val.value.findIndex(item => item[props.valueKey] === option[props.valueKey])
    if (index === -1) {
      val.value.push(option)
    } else {
      val.value.splice(index, 1)
    }    
  } else {
    val.value = option
    close()
  }
}

function isSelected(option) {
  // console.log('isSelected')
  if (typeof val.value === 'string' || val.value instanceof String) {
    return val.value === option
  } else if (Array.isArray(val.value)) {
    // console.log('isArray')
    return val.value.some(item => item[props.valueKey] === option[props.valueKey])
  } else if (typeof val.value === 'object') {
    return val.value[props.valueKey] === option[props.valueKey]
  }
}

const isNoneSelected = computed(() => {
  if (typeof val.value === 'string' || val.value instanceof String) {
    return val.value == ''
  } else if (Array.isArray(val.value)) {
    return val.value.length == 0
  } else if (typeof val.value === 'object') {
    return Object.keys(val.value).length == 0 
  }
})

async function open() {
  // const width = selectEl.value.getBoundingClientRect().width
  isOpen.value = true
  // await nextTick()
  // optionsEl.value.style.width = width + 'px'
  addEventListener('click', handleClick)
}

function close() {
  isOpen.value = false
  removeEventListener('click', handleClick)
}

onUpdated(() => {  
  setOptionsWidth()   
})

watch(isOpen, async (newVal) => {
  if (newVal) {
    await nextTick()
    setOptionsWidth()
  }
})

function setOptionsWidth() {
  if (optionsEl.value) {
    const width = selectEl.value.getBoundingClientRect().width
    optionsEl.value.style.width = width + 'px'
  }
}

function handleClick(event) {
  if (event.target === optionsEl.value || event.target.closest('.select-vb-options')) {
    // console.log('click on options')
    event.stopPropagation()
    return
  }
  
  if (event.target === selectEl.value || event.target.closest('.select-vb-el')) {
    // console.log('click on select element')
    if (!isOpen.value) {
      open()
    } else {
      close()
    }
    event.stopPropagation()
    return
  }

  // console.log('click outside')

  if (isOpen.value) {
    close()
  }
}
</script>

<template>
  <div class="select-vb-outer">
    <div
      ref="selectEl"
      class="select-vb-el"
      :class="selectElClass"
      @click="handleClick"
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
        v-else-if="isNoneSelected"
        :class="placeholderClass"
        class="select-vb-placeholder"
      >
        {{ placeholder }}
      </div>

      <div
        v-else="val"
      >
        {{ items }}
      </div>

      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke-width="2" 
        stroke="#D3D5D7" 
        class="select-vb-postfix-icon"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>

      <Transition
      >
        <ul
          ref="optionsEl"
          class="select-vb-options"
          :class="optionsClass"
          v-if="isOpen"
        >
          <li
            v-for="option in options"
            @click="handleSelectOption(option)"
            :class="optionClass"
          >
            <div class="select-vb-option">
              {{ option[labelKey] || option }}
              <span 
                v-if="multiple && isSelected(option)"
                class="select-vb-check-mark"
              >&check;</span>
            </div>
          </li>
        </ul>
      </Transition>
    </div>

  </div>
</template>

<style scoped>
/* .select-vb-outer {
  
} */

.select-vb-el {
  cursor: pointer;
  position: relative;
  padding: .5em;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.select-vb-placeholder {
  color: rgb(210, 196, 196);
}

.select-vb-options {
  position: absolute;
  top: 3em;
  left: 0;
  border-radius: 1em;
  max-height: 380px;
  overflow: auto;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(27, 26, 26);

  .dark & {
    border-color: rgb(224, 214, 214);
  }
}

ul {
  background-color: white;

  .dark & {
    background-color: black;
  }
}

li {
  cursor: pointer;
  padding: .5em;

  &:hover {
    background-color: rgb(183, 212, 205);
  }

  .dark &:hover {
    background-color: rgb(33, 71, 62);
  }
}

.select-vb-check-mark {
  margin-right: .25em;
}

.select-vb-option {
  display: flex;
  justify-content: space-between;
}

.select-vb-postfix-icon {
  width: 16px;
  /* height: 20px; */
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
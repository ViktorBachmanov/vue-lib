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
  chipClass: {
    type: String,
    default: '',
  },
  chipsClass: {
    type: String,
    default: '',
  },
  label: String,
  labelClass: {
    type: String,
    default: '',
  },
  selectClass: {
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
  errorSpace: {
    type: Boolean,
    default: false,
  },
  errorClass: {
    type: String,
    default: ''
  },
  errorColor: {
    type: Object,
    default: {
      light: '#dc2626',
      dark: '#b91c1c'
    }
  },
  // postfixIconClass: {
  //   type: String,
  //   default: '',
  // }
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
    setOptionsOffset()
  }
})

function setOptionsWidth() {
  if (optionsEl.value) {
    const width = selectEl.value.getBoundingClientRect().width
    optionsEl.value.style.width = width + 'px'
  }
}

function setOptionsOffset() {
  const selectElHeight = selectEl.value.getBoundingClientRect().height
  const gap = 5;

  if (optionsEl.value) {
    const bottomEdgeCoord = optionsEl.value.getBoundingClientRect().bottom;
    if(bottomEdgeCoord > document.documentElement.clientHeight) {
      optionsEl.value.style.bottom = selectElHeight + gap + 'px';
    } else {      
      optionsEl.value.style.top = selectElHeight + gap + 'px'
    }
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
      v-if="label" 
      class="select-vb-label"
      :class="labelClass"
    >
      {{ label }}
    </div>

    <div
      ref="selectEl"
      class="select-vb-el"
      :class="[selectClass, { 'select-vb-error-border': error }]"
      @click="handleClick"
    >
      <div
        v-if="isNoneSelected"
        :class="placeholderClass"
        class="select-vb-placeholder"
      >
        {{ placeholder }}
      </div>

      <div
        v-else-if="chips"
        class="select-vb-chips"
        :class="chipsClass"
      >
        <div
          v-for="item in items"
          class="select-vb-chip"
          :class="chipClass"
        >
          <div @click.stop="handleSelectOption(item)">
            <slot name="prefixChipIcon"></slot>
          </div>
          {{ item[labelKey] }}
          <slot name="postfixChipIcon"></slot>
        </div>
      </div>

      <div
        v-else="val"
      >
        {{ items }}
      </div>

      <slot name="postfixIcon"></slot>

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

    <div 
      v-if="errorSpace"
      class="select-vb-error"
      :class="errorClass"
    >
      {{ error }}
    </div>

  </div>
</template>

<style scoped>
.select-vb-error {
  font-size: 14px;
  line-height: 20px;
  margin-top: 4px;
  margin-left: 8px;
  min-height: 20px;
  color: v-bind('errorColor.light');

  .dark & {
    color: v-bind('errorColor.dark');
  }
}

.select-vb-error-border {
  border-color: v-bind('errorColor.light');

  .dark & {
    border-color: v-bind('errorColor.dark');
  }
}

.select-vb-label {
  font-size: 14px;
  line-height: 20px;
  margin-left: 1em;
  margin-bottom: 4px;
}

.select-vb-el {
  cursor: pointer;
  position: relative;
  padding: .5em;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
}

.select-vb-placeholder {
  color: rgb(37, 33, 33);

  .dark & {
    color: rgb(210, 196, 196);
  }
}

.select-vb-options {
  position: absolute;
  /* top: 3em; */
  left: 0;
  border-radius: .5em;
  max-height: 380px;
  overflow: auto;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(27, 26, 26);
  background-color: white;

  .dark & {
    border-color: rgb(224, 214, 214);
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

.select-vb-chips {
  display: flex;
  flex-wrap: wrap;
  gap: .33em;
}

.select-vb-chip {
  padding: 0 .25em;
  border-style: solid;
  border-width: 1px;
  border-radius: .5em;
  display: flex;
  align-items: center;
  border-color: black;

  .dark & {
    border-color: white;
  }
}

.select-vb-check-mark {
  margin-right: .25em;
}

.select-vb-option {
  display: flex;
  justify-content: space-between;
}

/* .select-vb-postfix-icon {
  width: 16px;
  color: rgb(43, 40, 40);

  .dark & {
    color: rgb(207, 190, 190);
  }
} */

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
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
  optionClass: {
    type: String,
    default: ''
  },
  optionsClass: {
    type: String,
    default: ''
  },
  optionsPlacement: {
    validator(value, props) {
      return ['offset', 'under'].includes(value)
    },
    default: 'offset'
  },
  optionsInCenter: {
    type: Boolean,
    default: false,
  },
  offset: {
    type: Number,
    default: 5,
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
  zIndex: {
    type: Number,
    default: 55,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  stickySelectedOptionBgColor: {
    type: String,
    default: 'gray',
  }
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
  // console.log('handleSelectOption')

  if (props.multiple) {
    const index = val.value.findIndex(item => item[props.valueKey] === option[props.valueKey])
    if (index === -1) {
      val.value.push(option)
    } else {
      val.value.splice(index, 1)
    }    
  } else if (props.sticky) {
    if (typeof val.value === 'string' || val.value instanceof String) {
      if (val.value == option) {
        val.value = ''
      } else {
        val.value = option
      }   
    } else if (props.sticky && val.value[props.valueKey] == option[props.valueKey]) {
      val.value = {}
    } else {
      val.value = option
    }    
    close()
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

const vClickOutside = {
  mounted: (el) => {
    el.__ClickOutsideHandler__ = (event) => {
      if (!(el === event.target || el.contains(event.target)) && isOpen.value) {
          close()
      }
    }
    document.body.addEventListener('click', el.__ClickOutsideHandler__)
  },
  unmounted: (el) => {
    document.body.removeEventListener('click', el.__ClickOutsideHandler__)
  }
}

function open() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

onUpdated(() => {  
  setOptionsWidth()
  setOptionsOffset()
})

let optionsElComputedStyles, optionsElCompPaddingTop, optionsElCompPaddingBottom

watch(isOpen, async (newVal) => {
  if (newVal) {
    await nextTick()
    optionsElComputedStyles = window.getComputedStyle(optionsEl.value)
    optionsElCompPaddingTop = parseInt(optionsElComputedStyles.getPropertyValue('padding-top'))
    optionsElCompPaddingBottom = parseInt(optionsElComputedStyles.getPropertyValue('padding-bottom'))
    setOptionsWidth()
    setOptionsOffset()
  }
})

function setOptionsWidth() {
  if (optionsEl.value && !props.optionsInCenter) {
    const width = selectEl.value.getBoundingClientRect().width
    optionsEl.value.style.width = width + 'px'
  }
}

function setOptionsOffset() {
  const selectElRect = selectEl.value.getBoundingClientRect()
  const selectElHeight = selectElRect.height

  let offset, padding

  switch (props.optionsPlacement) {
    case 'offset':
      offset = selectElHeight + props.offset
      padding = null
      break;
    case 'under':
      offset = 0
      padding = selectElHeight
      break;
  }

  if (optionsEl.value) {
    optionsEl.value.style.top = offset + 'px'
    optionsEl.value.style.bottom = null
    optionsEl.value.style.paddingTop = null
    optionsEl.value.style.paddingBottom = null

    const optionsElRect = optionsEl.value.getBoundingClientRect();
    const bottomEdgeCoord = optionsElRect.bottom;
    if(bottomEdgeCoord > document.documentElement.clientHeight) {
      optionsEl.value.style.top = null
      optionsEl.value.style.bottom = offset + 'px'
      optionsEl.value.style.paddingBottom = optionsElCompPaddingBottom + padding + 'px'
    } else {      
      optionsEl.value.style.top = offset + 'px'
      optionsEl.value.style.paddingTop = optionsElCompPaddingTop + padding + 'px'
    }

    if (props.optionsInCenter) {
      const diff = selectElRect.width - optionsElRect.width
      // console.log('diff: ', diff)
      optionsEl.value.style.left = diff / 2 + 'px'
    }
  }
}

function handleClick(event) {
  // console.log('handleClick target: ', event.target)
  
  if (selectEl.value === event.target  || selectEl.value.contains(event.target)) {
    // console.log('click on select element')
    if (isOpen.value) {
      close()
    } else {
      open()
    }
    // event.stopPropagation()
    return
  }

  // console.log('click outside')

  // if (isOpen.value) {
  //   close()
  // }
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

    <div class="relative">
      <div
        ref="selectEl"
        class="select-vb-el"
        :class="[selectClass, { 'select-vb-error-border': error }]"
        @click="handleClick"
        v-click-outside
      >
        <slot name="prefixIcon"></slot>

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

            <div @click.stop="handleSelectOption(item)">
              <slot name="postfixChipIcon" :item="item"></slot>
            </div>
          </div>
        </div>

        <div
          v-else="val"
        >
          {{ items }}
        </div>

        <div class="select-vb-postfix-icon">
          <slot name="postfixIcon"></slot>
        </div>
      </div>

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
            @click.stop="handleSelectOption(option)"
            :class="[optionClass, {'selected': (sticky && isSelected(option))}, {'disabled': option.disabled}]"
          >
            <div class="select-vb-option">
              <div style="margin-left: .25em" class="select-vb-option-prefix-icon">
                <slot name="prefixOptionIcon" :isSelected="isSelected(option)"></slot>
              </div>

              {{ option[labelKey] || option }}
        
              <div style="margin-left: auto; margin-right: .25em">
                <slot name="postfixOptionIcon" :isSelected="isSelected(option)"></slot>
              </div>
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
  /* justify-content: space-between; */
  gap: 1em;
  z-index: v-bind('zIndex + 1');
}

.select-vb-placeholder {
  color: rgb(37, 33, 33);

  .dark & {
    color: rgb(210, 196, 196);
  }
}

.select-vb-options {
  position: absolute;
  left: 0;
  border-radius: .5em;
  max-height: 380px;
  overflow: auto;
  border-style: solid;
  border-width: 1px;
  z-index: v-bind('zIndex');
  border-color: rgb(27, 26, 26);

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

  &.selected {
    background-color: v-bind('stickySelectedOptionBgColor');
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
}

.select-vb-postfix-icon {
  margin-left: auto;
}

.disabled {
  cursor: auto;
  pointer-events: none;
  opacity: 0.5;
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
<script setup>
import { watch, computed, nextTick, ref } from 'vue';


const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  integer: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  errorSpace: {
    type: Boolean,
    default: true
  },
  bgColorLight: {
    type: String,
    default: 'white',
  },
  bgColorDark: {
    type: String,
    default: 'black',
  },
  colorLight: {
    type: String,
    default: 'black',
  },
  colorDark: {
    type: String,
    default: 'white',
  },
  errorColor: {
    type: String,
    default: '#EF4444',
  },
  focusBorderColor: {
    type: String,
    default: '#42b983',
  },
  wrapperClass: String,
  inputClass: String,
  id: String,
  label: String,
  labelClass: String,
  readonly: {
    type: Boolean,
    default: false,
  },
})

const val = defineModel('value')
const error = defineModel('error')

watch(val, () => {
  error.value = ''
})

const cVal = computed({
  get() {
    return val.value
  },
  async set(newVal) {
    if (props.integer && /[^0-9]/.test(newVal)) {
      const temp = val.value
      val.value = ' '
      await nextTick()
      val.value = temp
      return
    }
    val.value = newVal
  }
})

const focus = ref(false)

const borderColor = computed(() => {
  if (error.value) return props.errorColor
  if (focus.value) return props.focusBorderColor
  return ''
})
</script>


<template>
  <div class="input-vb-outer">
    <label 
      :for="id"
      v-if="label"
      :class="labelClass"
    >
      {{ label }}
    </label>

    <div 
      class="input-vb-wrapper"
      :class="wrapperClass"
      :style="{ borderColor: `${borderColor} !important`}"
    >
      <slot name="prefixIcon"></slot>

      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        v-model="cVal"
        :class="inputClass"
        :readonly="readonly"
        @focus="focus = true"
        @blur="focus = false"
      >
      <slot name="postfixIcon"></slot>
    </div>

    <div 
      v-if="errorSpace" 
      class="error"
    >
      {{ error }}
    </div>
  </div>
</template>


<style scoped>
.input-vb-outer {
  width: fit-content;
}

.input-vb-wrapper {
  display: flex; 
  align-items: center;
  column-gap: 0.5em;
  border: 1px solid gray;
  border-radius: 20px;
  height: 60px;
  padding: 0 1em;
  width: 100%;
}

input {
  background-color: transparent;
  outline: none;
  flex-grow: 1;
  max-width: 100%;

  color: v-bind('colorLight')
}

.dark input {
  color: v-bind('colorDark')
}

.error {
  min-height: 1.5em;
  margin-top: 4px;
  margin-left: 1em;
  font-size: 14px;
  line-height: 20px;
  color: v-bind('errorColor');
}

/* .dark .error {
  color: rgb(227, 37, 37);
} */

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px v-bind('bgColorLight') inset !important;
    -webkit-text-fill-color: v-bind('colorLight') !important;
}

.dark input:-webkit-autofill,
.dark input:-webkit-autofill:hover, 
.dark input:-webkit-autofill:focus, 
.dark input:-webkit-autofill:active{
    -webkit-box-shadow: 0 0 0 30px v-bind('bgColorDark') inset !important;
    -webkit-text-fill-color: v-bind('colorDark') !important;
}
</style>
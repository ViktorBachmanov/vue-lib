<script setup>
import { watch } from 'vue';


const props = defineProps({
  type: {
    type: String,
    default: 'text',
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
  wrapperClass: String,
})

const val = defineModel('value')
const error = defineModel('error')

watch(val, () => {
  error.value = ''
})

</script>


<template>
  <div class="input-vb-outer">
    <div 
      class="input-vb-wrapper"
      :class="wrapperClass"
      :style="{ borderColor: error ? `${errorColor} !important` : null }"
    >
      <slot name="prefixIcon"></slot>

      <input
        :type="type"
        class="input-vb-native"
        :placeholder="placeholder"
        v-model="val"
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

.input-vb-native {
  font-size: 14px;
  background-color: transparent;
  outline: none;
  flex-grow: 1;

  color: v-bind('colorLight')
}

.dark .input-vb-native {
  color: v-bind('colorDark')
}

.error {
  min-height: 1.5em;
  margin-left: 1em;
  font-size: 14px;
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
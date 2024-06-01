<script setup>

defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  errors: {
    type: Array,
    default: null,
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
})

const val = defineModel()
</script>


<template>
  <div class="input-vb-outer">
    <div 
      class="input-vb-wrapper"
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

    <ul v-if="errors" class="errors">
      <li
        class="error"
        v-for="error in errors"
      >
        {{ error }}
      </li>
    </ul>
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
  background-color: transparent;
  outline: none;
  flex-grow: 1;

  color: v-bind('colorLight')
}

.dark .input-vb-native {
  color: v-bind('colorDark')
}

.errors {
  min-height: 1.5em;
}

.error {
  color: rgb(158, 31, 31);
}

.dark .error {
  color: rgb(227, 37, 37);
}

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
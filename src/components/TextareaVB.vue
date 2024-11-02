<script setup>
import { watch } from 'vue'

defineProps({
  id: String,
  label: String,
  placeholder: {
    type: String,
    default: '',
  },
  placeholderCSS: {
    type: Object,
    default: {
      fontSize: '16px',
      color: '#AEAEAE',
    }
  },
  errorSpace: {
    type: Boolean,
    default: true
  },
  labelClass: String,
  errorClass: String,
  textareaClass: String,
})

const val = defineModel('value')
const error = defineModel('error')

watch(val, () => {
  error.value = ''
})
</script>


<template>
  <div class="outer">
    <label 
      :for="id"
      v-if="label"
      :class="labelClass"
    >
      {{ label }}
    </label>

    <textarea
      :id="id"
      :class="textareaClass"
      v-model="val"
      :style="{ borderColor: error ? 'red' : null }"
      :placeholder="placeholder"
    ></textarea>

    <div 
      v-if="errorSpace" 
      class="error"
      :class="errorClass"
    >{{ error }}</div>
  </div>
</template>



<style scoped>
.outer {
  width: fit-content;
  /* border: 1px solid blue; */
}

label {
  display: block;
}

textarea {
  background-color: transparent;
  outline: none;
  display: block;
}

textarea::placeholder {
  font-size: v-bind('placeholderCSS.fontSize');
  color: v-bind('placeholderCSS.color');
}

.error {
  min-height: 1.5em;
  /* margin-top: 4px; */
  margin-left: 1em;
  font-size: 14px;
  /* line-height: 20px; */
  color: red;
}
</style>
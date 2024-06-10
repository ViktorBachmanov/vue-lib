<script setup>
import { watch } from 'vue'

defineProps({
  id: String,
  label: String,
  placeholder: {
    type: String,
    default: '',
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
    >
      {{ val }}
    </textarea>

    <div 
      v-if="errorSpace" 
      class="error"
      :class="errorClass"
    >
      {{ error }}
    </div>
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
}

.error {
  min-height: 1.5em;
  margin-top: 4px;
  margin-left: 1em;
  font-size: 14px;
  line-height: 20px;
  color: red;
}
</style>
<script setup>
const props = defineProps({
  leftValue: String,
  rightValue: String,
})

const state = defineModel()

function handleToggle() {
  state.value = state.value == props.rightValue
    ? props.leftValue
    : props.rightValue
}
</script>

<template>
  <div class="toggle-vb-outer">
    <slot name="left"></slot>

    <div 
      class="toggle-vb-body"
      @click="handleToggle"
    >
      <div 
        class="toggle-vb-handle"
        :style="[ state == props.leftValue ? 'left: 1px' : 'right: 1px' ]"
      ></div>
    </div>

    <slot name="right"></slot>
  </div>
</template>

<style scoped>
.toggle-vb-outer {
  display: flex;
  gap: 6px;
  align-items: center;
}

.toggle-vb-body {
  min-height: 20px;
  width: 40px;
  border: 2px solid #6b7280;
  border-top-right-radius: 9999px;
  border-bottom-right-radius: 9999px;
  border-top-left-radius: 9999px;
  border-bottom-left-radius: 9999px;
  position: relative;
  cursor: pointer;
  background-color: #9ca3af;
}

.toggle-vb-handle {
  min-height: 14px;
  width: 14px;
  border-radius: 50%;
  border: 2px solid #4b5563;
  position: absolute;
  top: 1px;
  background-color: #6b7280;
}
</style>
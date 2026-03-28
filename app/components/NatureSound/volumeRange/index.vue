<script setup lang="ts">
interface Props {
  modelValue: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  disabled: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = Number(target.value)
  emit('update:modelValue', value)
  emit('change', value)
}

const percentage = computed(() => {
  return ((props.modelValue - props.min) / (props.max - props.min)) * 100
})
</script>

<template>
  <div class="relative w-full flex items-center h-6">
    <div class="absolute top-1/2 left-0 w-full h-2 bg-[#cce3dd] dark:bg-[#1e2b29] rounded-lg -translate-y-1/2"></div>
    <div
      class="absolute top-1/2 left-0 h-2 rounded-lg bg-gradient-to-r from-[#a8dadc] to-[#cce3dd] dark:from-[#7fbcb3] dark:to-[#1e2b29] -translate-y-1/2 pointer-events-none"
      :style="{ width: `${percentage}%` }"
    />
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :disabled="disabled"
      @input="handleInput"
      class="relative z-10 w-full h-2 bg-transparent appearance-none cursor-pointer"
    >
    <div
      class="absolute w-4 h-4 rounded-full bg-gradient-to-r from-[#a8dadc] to-[#cce3dd] dark:from-[#7fbcb3] dark:to-[#1e2b29] cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
      :style="{
        left: `calc(${percentage}% - 0.5rem)`,
        top: '50%',
        transform: 'translateY(-50%)'
      }"
    />
  </div>
</template>

<style scoped>
input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
}

input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: transparent;
  cursor: grab;
  margin-top: -7px; /* center thumb vertically */
  box-shadow: none;
  border: none;
}

input[type='range']::-webkit-slider-thumb:active {
  cursor: grabbing;
  box-shadow: none;
}

input[type='range']::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: transparent;
  cursor: grab;
  border: none;
  box-shadow: none;
}

input[type='range']::-moz-range-thumb:active {
  cursor: grabbing;
  box-shadow: none;
}
</style>
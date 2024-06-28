<script setup lang="ts">
import InputSwitch from 'primevue/inputswitch'
import { WelfareSwitchProps, WelfareSwitchEmits } from '@/models'
import { ref } from 'vue'

const props = defineProps<WelfareSwitchProps>()
const emit = defineEmits<WelfareSwitchEmits>()
const checked = ref(props.modelValue)
const eventEmit = (newValue: boolean) => {
  emit('update:modelValue', newValue)
}
</script>

<template>
  <InputSwitch v-bind="props" v-model="checked" @update:model-value="eventEmit" />
</template>

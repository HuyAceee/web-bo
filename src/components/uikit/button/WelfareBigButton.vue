<script setup lang="ts">
import Button from 'primevue/button'
import { WelfareBigButtonEmits, WelfareBigButtonProps } from '@/models'
const props = defineProps<WelfareBigButtonProps>()
const emit = defineEmits<WelfareBigButtonEmits>()

const { buttonType, ...otherProps } = props
const eventClick = () => {
  emit('onClick')
}
</script>

<template>
  <Button @click="eventClick" class="wf_button wf_big-button" v-bind="otherProps" unstyled :pt="{
    root: { class: [`wf_big-button--${buttonType} ${props.class}`] }
  }" :disabled="props.disabled">
  </Button>
</template>

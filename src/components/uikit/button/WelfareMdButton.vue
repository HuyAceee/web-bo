<script setup lang="ts">
import Button from 'primevue/button'
import { WelfareMdButtonEmits, WelfareMdButtonProps } from '@/models'
const props = defineProps<WelfareMdButtonProps>()
const emit = defineEmits<WelfareMdButtonEmits>()

const { buttonType, buttonSize, ...others } = props
const eventClick = (event?: Event) => {
  emit('onClick', event)
}
</script>

<template>
  <!-- size only  md or small -->
  <Button @click="eventClick" class="wf_button wf_md-button wf_button--icon" v-bind="others" :label="props.label" unstyled
    :class="buttonSize === 'small' ? 'wf_small-button' : ''" :pt="{
      root: { class: [`wf_md-button--${buttonType} ${props.class}`] }
    }" :disabled="props.disabled">
    <template #icon>
      <slot></slot>
    </template>
  </Button>
</template>

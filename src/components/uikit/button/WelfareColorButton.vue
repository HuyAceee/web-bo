<script setup lang="ts">
import { WelfareColorButtonEmits, WelfareColorButtonProps } from '@/models';
import Button from 'primevue/button';
const props = defineProps<WelfareColorButtonProps>()
const emit = defineEmits<WelfareColorButtonEmits>()

const { buttonSize, buttonType, ...otherProps } = props
const eventClick = () => {
  emit('onClick')
}
</script>
<template>
  <Button @click="eventClick" class="wf_button wf_md-button" v-bind="otherProps" unstyled
    :class="buttonSize === 'small' ? 'wf_small-button' : ''" :pt="{
      root: { class: [`wf_color-button--${buttonType} ${props.class}`] }
    }" :disabled="props.disabled">
  </Button>
</template>

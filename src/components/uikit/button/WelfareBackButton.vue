<script setup lang="ts">
import Button from 'primevue/button'
import { WelfareBackButtonEmits, WelfareBackButtonProps } from '@/models'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'

const props = defineProps<WelfareBackButtonProps>()
const { buttonType, isActive, ...otherProps } = props
const emit = defineEmits<WelfareBackButtonEmits>()

const emitEvents = {
  handleClick: () => {
    emit('onClick')
  }
}
</script>

<template>
  <Button
    @onClick="emitEvents.handleClick"
    v-bind="otherProps"
    unstyled
    :pt="{
      root: { class: [`wf_back_btn wf_back_btn--custom ${isActive ? 'wf_bg-nf-nc8f' : 'wf_bg-nf-ncc'} ${props.class}`] }
    }"
  >
    <template #icon>
      <IconArrowLeft v-if="buttonType === 'left'" />
      <IconArrowRight v-else />
    </template>
  </Button>
</template>

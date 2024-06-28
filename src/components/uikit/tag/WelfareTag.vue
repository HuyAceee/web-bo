<script setup lang="ts">
import IconClose from '@/components/icons/IconClose.vue'
import { WelfareTagEmits, WelfareTagProps } from '@/models'

const props = defineProps<WelfareTagProps>()
const emit = defineEmits<WelfareTagEmits>()

function click() {
  emit('click')
}

function iconClick() {
  emit('iconClick')
}
</script>

<template>
  <div class="wf-tag" :class="{ 'wf-tag-disable': props.disabled }" @click="click">
    <span>
      <slot></slot>
    </span>
    <IconClose @click="iconClick" />
  </div>
</template>

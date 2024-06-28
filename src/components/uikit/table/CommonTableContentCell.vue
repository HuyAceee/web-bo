<script setup lang="ts">
interface CommonTableContentCellProps {
  text?: string
}
defineProps<CommonTableContentCellProps>()
</script>
<template>
  <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1">
    <slot>
      <span class="wf-body_03-reg wf_text-n-33">{{ $props.text }}</span>
    </slot>
  </div>
</template>

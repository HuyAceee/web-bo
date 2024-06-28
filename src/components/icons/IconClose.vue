<script setup lang="ts">
import { defaultColor } from '@/common/color'
import { IconPropsType } from '@/models/icons/IconPropsType'
const props = withDefaults(defineProps<IconPropsType>(), {
  width: 15,
  height: 15,
  color: defaultColor._ccc
})
</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="props.width" :height="props.height" viewBox="0 0 15 15" fill="none" :stroke="props.color">
    <g clip-path="url(#clip0_98_2919)">
      <path d="M3.08105 3.16943L11.9199 12.0083" stroke="current" stroke-width="1.25" />
      <path d="M3.08105 12.0083L11.9199 3.16947" stroke="current" stroke-width="1.25" />
    </g>
    <defs>
      <clipPath id="clip0_98_2919">
        <rect width="15" height="15" fill="white" />
      </clipPath>
    </defs>
  </svg>
</template>

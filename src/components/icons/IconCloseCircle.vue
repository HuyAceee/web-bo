<script setup lang="ts">
import { defaultColor } from '@/common/color'
import { IconPropsType } from '@/models/icons/IconPropsType'
const props = withDefaults(defineProps<IconPropsType>(), {
  width: 20,
  height: 20,
  color: defaultColor._ccc
})
</script>
<template>
  <svg :width="props.width" :height="props.height" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="10" fill="#8F8F8F" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.8536 5.14645C15.0488 5.34171 15.0488 5.65829 14.8536 5.85355L5.85355 14.8536C5.65829 15.0488 5.34171 15.0488 5.14645 14.8536C4.95118 14.6583 4.95118 14.3417 5.14645 14.1464L14.1464 5.14645C14.3417 4.95118 14.6583 4.95118 14.8536 5.14645Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.14645 5.14645C5.34171 4.95118 5.65829 4.95118 5.85355 5.14645L14.8536 14.1464C15.0488 14.3417 15.0488 14.6583 14.8536 14.8536C14.6583 15.0488 14.3417 15.0488 14.1464 14.8536L5.14645 5.85355C4.95118 5.65829 4.95118 5.34171 5.14645 5.14645Z"
      fill="white"
    />
  </svg>
</template>

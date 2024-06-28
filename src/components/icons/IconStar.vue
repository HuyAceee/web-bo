<script setup lang="ts">
import { withDefaults } from 'vue'
import { defaultColor } from '@/common/color'
import { IconPropsType } from '@/models/icons/IconPropsType'
withDefaults(defineProps<IconPropsType>(), {
  width: 24,
  height: 24,
  color: defaultColor._ccc
})
</script>

<template>
  <svg :width="width" :height="height" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.06837 2.3884C8.39945 1.5396 9.60054 1.5396 9.93163 2.3884L11.253 5.77585C11.3923 6.13304 11.7236 6.37912 12.1058 6.40934L15.6654 6.69079C16.5431 6.76019 16.9092 7.84805 16.2521 8.43404L13.4565 10.9269C13.1837 11.1702 13.0653 11.543 13.1479 11.8991L14.0026 15.5857C14.2058 16.4623 13.2384 17.1403 12.4838 16.6503L9.54463 14.7416C9.2134 14.5265 8.7866 14.5265 8.45537 14.7416L5.51619 16.6503C4.76157 17.1403 3.79419 16.4623 3.99741 15.5857L4.85209 11.8991C4.93465 11.543 4.81631 11.1702 4.54347 10.9269L1.74792 8.43404C1.09077 7.84805 1.45691 6.76019 2.33464 6.69079L5.89423 6.40934C6.27643 6.37912 6.60771 6.13304 6.74704 5.77585L8.06837 2.3884Z"
      :fill="color"
    />
  </svg>
</template>

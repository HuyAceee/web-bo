<script setup lang="ts">
import { withDefaults } from 'vue'
import { defaultColor } from '@/common/color'
import { IconPropsType } from '@/models/icons/IconPropsType'
withDefaults(defineProps<IconPropsType>(), {
  width: 32,
  height: 32,
  color: defaultColor._000
})
</script>

<template>
  <svg :width="width" :height="height" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16 2.5C15.1244 2.5 14.4146 3.20979 14.4146 4.08537C14.4146 4.96094 15.1244 5.67073 16 5.67073C21.4286 5.67073 25.8293 10.0714 25.8293 15.5C25.8293 20.9286 21.4286 25.3293 16 25.3293C10.5714 25.3293 6.17073 20.9286 6.17073 15.5C6.17073 13.3249 6.8763 11.3152 8.07317 9.68645V11.061C8.07317 11.9365 8.78296 12.6463 9.65854 12.6463C10.5341 12.6463 11.2439 11.9365 11.2439 11.061V5.9878C11.2439 5.11223 10.5341 4.40244 9.65854 4.40244H4.58537C3.70979 4.40244 3 5.11223 3 5.9878C3 6.86338 3.70979 7.57317 4.58537 7.57317H5.69579C4.00635 9.76648 3 12.516 3 15.5C3 22.6797 8.8203 28.5 16 28.5C23.1797 28.5 29 22.6797 29 15.5C29 8.3203 23.1797 2.5 16 2.5Z"
      :fill="color"
    />
  </svg>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import { defaultColor } from '@/common/color'
import { IconPropsType } from '@/models/icons/IconPropsType'
withDefaults(defineProps<IconPropsType>(), {
  width: 16,
  height: 16,
  color: defaultColor._333
})
</script>

<template>
  <svg :width="width" :height="height" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="2" fill="white" />
    <rect width="12" height="12" transform="translate(2 2)" fill="white" />
    <mask id="mask0_10273_70641" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="4" y="3" width="9" height="10">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5 3.125C5.20711 3.125 5.375 3.29289 5.375 3.5V9.875H10.8447L9.23484 8.26516C9.08839 8.11872 9.08839 7.88128 9.23484 7.73484C9.38128 7.58839 9.61872 7.58839 9.76516 7.73484L12.0152 9.98483C12.1616 10.1313 12.1616 10.3687 12.0152 10.5152L9.76516 12.7652C9.61872 12.9116 9.38128 12.9116 9.23484 12.7652C9.08839 12.6187 9.08839 12.3813 9.23484 12.2348L10.8447 10.625H5C4.79289 10.625 4.625 10.4571 4.625 10.25V3.5C4.625 3.29289 4.79289 3.125 5 3.125Z"
        fill="#333333"
        stroke="#333333"
        stroke-width="0.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </mask>
    <g mask="url(#mask0_10273_70641)">
      <path d="M14 2H2V14H14V2Z" fill="black" />
    </g>
  </svg>
</template>

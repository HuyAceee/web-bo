<script>
import { defaultColor } from '@/common/color'
export default {
  props: {
    width: {
      default: 29
    },
    height: {
      default: 28
    },
    iconColor: {
      default: defaultColor._a8afbf
    }
  }
}
</script>
<template>
  <svg :width="width" :height="height" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.125 6.125C3.125 5.1585 3.9085 4.375 4.875 4.375H24.125C25.0915 4.375 25.875 5.1585 25.875 6.125V21.875C25.875 22.8415 25.0915 23.625 24.125 23.625H4.875C3.9085 23.625 3.125 22.8415 3.125 21.875V6.125ZM24.125 6.125H4.875V21.875H24.125V6.125Z"
      :fill="iconColor"
      :stroke="iconColor"
      stroke-width="0.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.125 8.75C3.125 8.26675 3.51675 7.875 4 7.875H25C25.4832 7.875 25.875 8.26675 25.875 8.75C25.875 9.23325 25.4832 9.625 25 9.625H4C3.51675 9.625 3.125 9.23325 3.125 8.75Z"
      :fill="iconColor"
      :stroke="iconColor"
      stroke-width="0.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.125 11.375C10.6082 11.375 11 11.7668 11 12.25C11 13.1783 11.3687 14.0685 12.0251 14.7249C12.6815 15.3813 13.5717 15.75 14.5 15.75C15.4283 15.75 16.3185 15.3813 16.9749 14.7249C17.6313 14.0685 18 13.1783 18 12.25C18 11.7668 18.3918 11.375 18.875 11.375C19.3582 11.375 19.75 11.7668 19.75 12.25C19.75 13.6424 19.1969 14.9777 18.2123 15.9623C17.2277 16.9469 15.8924 17.5 14.5 17.5C13.1076 17.5 11.7723 16.9469 10.7877 15.9623C9.80312 14.9777 9.25 13.6424 9.25 12.25C9.25 11.7668 9.64175 11.375 10.125 11.375Z"
      :fill="iconColor"
      :stroke="iconColor"
      stroke-width="0.3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

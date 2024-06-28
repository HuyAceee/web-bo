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
      d="M5.16699 18.6667C5.16699 17.378 6.21166 16.3333 7.50033 16.3333H11.0003C12.289 16.3333 13.3337 17.378 13.3337 18.6667V22.1667C13.3337 23.4553 12.289 24.5 11.0003 24.5H7.50033C6.21166 24.5 5.16699 23.4553 5.16699 22.1667V18.6667Z"
      :stroke="iconColor"
      stroke-width="2.2"
    />
    <path
      d="M20.8126 16.542C20.8556 16.456 20.9783 16.456 21.0213 16.542L24.9159 24.3312C24.9547 24.4087 24.8983 24.5 24.8116 24.5H17.0224C16.9357 24.5 16.8793 24.4087 16.9181 24.3312L20.8126 16.542Z"
      :stroke="iconColor"
      stroke-width="2.2"
    />
    <path
      d="M5.16699 7.58333C5.16699 5.32817 6.99516 3.5 9.25033 3.5C11.5055 3.5 13.3337 5.32817 13.3337 7.58333C13.3337 9.8385 11.5055 11.6667 9.25033 11.6667C6.99516 11.6667 5.16699 9.8385 5.16699 7.58333Z"
      :stroke="iconColor"
      stroke-width="2.2"
    />
  </svg>
</template>

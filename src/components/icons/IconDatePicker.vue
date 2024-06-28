<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 18 20" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 3.25C0 2.42157 0.671573 1.75 1.5 1.75H16.5C17.3284 1.75 18 2.42157 18 3.25V18.25C18 19.0784 17.3284 19.75 16.5 19.75H1.5C0.671573 19.75 0 19.0784 0 18.25V3.25ZM16.5 3.25H1.5V18.25H16.5V3.25Z"
      :fill="iconColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.5 0.25C13.9142 0.25 14.25 0.585786 14.25 1V4C14.25 4.41421 13.9142 4.75 13.5 4.75C13.0858 4.75 12.75 4.41421 12.75 4V1C12.75 0.585786 13.0858 0.25 13.5 0.25Z"
      :fill="iconColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.5 0.25C4.91421 0.25 5.25 0.585786 5.25 1V4C5.25 4.41421 4.91421 4.75 4.5 4.75C4.08579 4.75 3.75 4.41421 3.75 4V1C3.75 0.585786 4.08579 0.25 4.5 0.25Z"
      :fill="iconColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M0 7C0 6.58579 0.335786 6.25 0.75 6.25H17.25C17.6642 6.25 18 6.58579 18 7C18 7.41421 17.6642 7.75 17.25 7.75H0.75C0.335786 7.75 0 7.41421 0 7Z"
      :fill="iconColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.74273 15.4852C8.44984 15.7781 7.97497 15.7781 7.68207 15.4852L5.03042 12.8335C4.73753 12.5406 4.73753 12.0658 5.03042 11.7729C5.32331 11.48 5.79819 11.48 6.09108 11.7729L8.74273 14.4245C9.03563 14.7174 9.03563 15.1923 8.74273 15.4852Z"
      :fill="iconColor"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.68194 15.4852C7.38905 15.1923 7.38905 14.7174 7.68194 14.4245L11.9246 10.1819C12.2175 9.88897 12.6923 9.88897 12.9852 10.1819C13.2781 10.4748 13.2781 10.9496 12.9852 11.2425L8.7426 15.4852C8.44971 15.7781 7.97483 15.7781 7.68194 15.4852Z"
      :fill="iconColor"
    />
  </svg>
</template>
<script>
import { defaultColor } from '@/common/color'
export default {
  props: {
    width: {
      default: 18
    },
    height: {
      default: 20
    },
    iconColor: {
      default: defaultColor._8f8
    }
  }
}
</script>

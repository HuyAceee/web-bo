<script>
import { defaultColor } from '@/common/color'
export default {
  props: {
    width: {
      default: 16
    },
    height: {
      default: 16
    },
    iconColor: {
      default: defaultColor._a8afbf
    }
  }
}
</script>

<template>
  <svg :width="width" :height="height" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="mask0_625_36081" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="3" y="5" width="11" height="7">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.14645 5.64645C3.34171 5.45118 3.65829 5.45118 3.85355 5.64645L8.5 10.2929L13.1464 5.64645C13.3417 5.45118 13.6583 5.45118 13.8536 5.64645C14.0488 5.84171 14.0488 6.15829 13.8536 6.35355L8.85355 11.3536C8.65829 11.5488 8.34171 11.5488 8.14645 11.3536L3.14645 6.35355C2.95118 6.15829 2.95118 5.84171 3.14645 5.64645Z"
        fill="black"
      />
    </mask>
    <g mask="url(#mask0_625_36081)">
      <path d="M16.5 0H0.5V16H16.5V0Z" :fill="iconColor" />
    </g>
  </svg>
</template>

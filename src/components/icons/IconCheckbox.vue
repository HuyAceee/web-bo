<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 1 20 17" :stroke="color" fill="none">
    <g filter="url(#filter0_d_98_2990)">
      <path d="M3.98828 6.06067L8.93803 11.0104L16.0091 3.93935" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
      <filter
        id="filter0_d_98_2990"
        x="0.988281"
        y="0.939331"
        width="20.0209"
        height="15.071"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx="1" dy="1" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_98_2990" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_98_2990" result="shape" />
      </filter>
    </defs>
  </svg>
</template>

<script>
import { defaultColor } from '@/common/color'

export default {
  props: {
    color: {
      default: defaultColor._333
    },
    width: {
      default: 22
    },
    height: {
      default: 17
    }
  }
}
</script>

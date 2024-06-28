<script setup lang="ts">
import { getRandomString } from '@/common'
const id = getRandomString(10)
</script>
<template>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="#8F8F8F" xmlns="http://www.w3.org/2000/svg">
    <mask :id="id" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="3" y="3" width="15" height="14">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.93306 3.30806C4.17714 3.06398 4.57286 3.06398 4.81694 3.30806L11.0669 9.55806C11.311 9.80214 11.311 10.1979 11.0669 10.4419L4.81694 16.6919C4.57286 16.936 4.17714 16.936 3.93306 16.6919C3.68898 16.4479 3.68898 16.0521 3.93306 15.8081L9.74112 10L3.93306 4.19194C3.68898 3.94786 3.68898 3.55214 3.93306 3.30806ZM10.1831 3.30806C10.4271 3.06398 10.8229 3.06398 11.0669 3.30806L17.3169 9.55806C17.561 9.80214 17.561 10.1979 17.3169 10.4419L11.0669 16.6919C10.8229 16.936 10.4271 16.936 10.1831 16.6919C9.93898 16.4479 9.93898 16.0521 10.1831 15.8081L15.9911 10L10.1831 4.19194C9.93898 3.94786 9.93898 3.55214 10.1831 3.30806Z"
        fill="black"
      />
    </mask>
    <g :mask="'url(#' + id + ')'">
      <path d="M20 0H0V20H20V0Z" fill="current" />
    </g>
  </svg>
</template>

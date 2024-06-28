<script setup lang="ts">
import { getRandomString } from '@/common'
const id = getRandomString(10)
</script>
<template>
  <svg width="20" height="20" viewBox="0 0 20 20" fill="#8F8F8F" xmlns="http://www.w3.org/2000/svg">
    <mask :id="id" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="2" y="3" width="15" height="14">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M9.81694 3.30806C10.061 3.55214 10.061 3.94786 9.81694 4.19194L4.00888 10L9.81694 15.8081C10.061 16.0521 10.061 16.4479 9.81694 16.6919C9.57286 16.936 9.17714 16.936 8.93306 16.6919L2.68306 10.4419C2.43898 10.1979 2.43898 9.80214 2.68306 9.55806L8.93306 3.30806C9.17714 3.06398 9.57286 3.06398 9.81694 3.30806ZM16.0669 3.30806C16.311 3.55214 16.311 3.94786 16.0669 4.19194L10.2589 10L16.0669 15.8081C16.311 16.0521 16.311 16.4479 16.0669 16.6919C15.8229 16.936 15.4271 16.936 15.1831 16.6919L8.93306 10.4419C8.68898 10.1979 8.68898 9.80214 8.93306 9.55806L15.1831 3.30806C15.4271 3.06398 15.8229 3.06398 16.0669 3.30806Z"
        fill="black"
      />
    </mask>
    <g :mask="'url(#' + id + ')'">
      <path d="M20 0H0V20H20V0Z" fill="current" />
    </g>
  </svg>
</template>

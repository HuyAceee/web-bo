<script setup lang="ts">
import { IconPropsType } from '@/models/icons/IconPropsType'
import { computed } from 'vue'

const props = withDefaults(defineProps<IconPropsType>(), {
  width: 16,
  height: 16,
  color: '#8F8F8F'
})

const id = computed(() => {
  return Date.now().toString()
})
</script>

<template>
  <svg :width="props.width" :height="props.height" viewBox="0 0 16 16" :fill="props.color" xmlns="http://www.w3.org/2000/svg">
    <mask :id="id" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="2" y="5" width="12" height="7">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M2.64645 5.64645C2.84171 5.45118 3.15829 5.45118 3.35355 5.64645L8 10.2929L12.6464 5.64645C12.8417 5.45118 13.1583 5.45118 13.3536 5.64645C13.5488 5.84171 13.5488 6.15829 13.3536 6.35355L8.35355 11.3536C8.15829 11.5488 7.84171 11.5488 7.64645 11.3536L2.64645 6.35355C2.45118 6.15829 2.45118 5.84171 2.64645 5.64645Z"
        fill="black"
      />
    </mask>
    <g :mask="`url(#${id})`">
      <path d="M16 0H0V16H16V0Z" fill="current" />
    </g>
  </svg>
</template>

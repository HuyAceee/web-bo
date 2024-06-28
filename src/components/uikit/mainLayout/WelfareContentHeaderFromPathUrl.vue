<script setup>
import { WelfareContentHeader } from '@/components'
import { useHeaderLinkBreakCrumb } from '@/composables'
import { useRoute } from 'vue-router'

const { routes, titleName, isShowTips, tooltipElement } = useHeaderLinkBreakCrumb()
const route = useRoute()
</script>

<template>
  <WelfareContentHeader v-if="route.fullPath !== '/'" :has-tips="isShowTips" :title="titleName" :paths="routes" :tooltip-element="tooltipElement" />
</template>

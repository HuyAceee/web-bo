<script setup>
import { useLoadingProvide, useModalProvide, usePageTitle } from '@/composables'
import { LoadingComponent, ModalGlobalContainer } from './components'
import ContentApp from './ContentApp.vue'
usePageTitle()
const { loading, size } = useLoadingProvide()
const props = useModalProvide()
</script>

<template>
  <ContentApp />
  <LoadingComponent :loading="loading" :size="size" />
  <ModalGlobalContainer v-bind="props" />
</template>

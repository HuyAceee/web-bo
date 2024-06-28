<!-- BO_Y0201_010101 -->
<script setup>
import { useLoading } from '@/composables'
import { onMounted, onUnmounted } from 'vue'
import AuthLoginPage from '../authentication/login/AuthLoginPage.vue'

const { setLoading } = useLoading()
onMounted(() => {
  setLoading(true)
})
onUnmounted(() => {
  setLoading(false)
})
</script>

<template>
  <AuthLoginPage />
</template>

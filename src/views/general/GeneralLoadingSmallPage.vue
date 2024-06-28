<!-- BO_Y0201_010101 -->
<script setup>
import { useLoading } from '@/composables'
import { onMounted, onUnmounted } from 'vue'
import AuthLoginPage from '../authentication/login/AuthLoginPage.vue'

const { setLoading, setSize } = useLoading()
onMounted(() => {
  setLoading(true)
  setSize('small')
})
onUnmounted(() => {
  setLoading(false)
})
</script>

<template>
  <AuthLoginPage />
</template>

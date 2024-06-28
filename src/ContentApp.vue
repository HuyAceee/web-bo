<script setup>
import { useSilentRefreshToken } from './composables/authentication/useSilentRefreshToken'
import { useCheckLogin } from '@/composables/common/useCheckLogin'
useSilentRefreshToken()
useCheckLogin()
</script>

<template>
  <router-view></router-view>
</template>

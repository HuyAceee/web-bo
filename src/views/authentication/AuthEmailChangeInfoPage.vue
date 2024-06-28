<script setup>
import AuthenticationEmailChangeInfoVerification from '@/components/authentication/AuthenticationEmailChangeInfoVerification.vue'
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const accessToken = urlParams.get('accessToken')
</script>
<template>
  <AuthenticationEmailChangeInfoVerification :accessToken="accessToken" />
</template>

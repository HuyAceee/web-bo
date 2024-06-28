<script setup>
import EmailVerification from '@/components/authentication/AuthenticationEmailVerification.vue'
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const accessToken = urlParams.get('accessToken')
</script>
<template>
  <EmailVerification :accessToken="accessToken" />
</template>

<script setup>
import { WelfareEditor } from '@/components/uikit'
import { ref } from 'vue'
const value = ref('')
</script>

<template>
  <WelfareEditor v-model="value" />
</template>

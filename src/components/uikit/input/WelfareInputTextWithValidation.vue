<script setup lang="ts">
import { useField } from 'vee-validate'
import { WelfareInputValidationProps } from '@/models'
import { WelfareInputText } from '.'

const props = defineProps<WelfareInputValidationProps>()
const { value } = useField(() => props.name)
</script>

<template>
  <WelfareInputText v-bind="props" v-model="value" class="wf_input-validation" :class="props.invalid && 'wf_input-validation--invalid'" />
</template>

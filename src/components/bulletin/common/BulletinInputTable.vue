<script lang="ts" setup>
import { WelfareInputText } from '@/components'
import { WelfareInputProps } from '@/models'
import { useField } from 'vee-validate';

interface TNInputUpdateValueProps extends WelfareInputProps {
  id: string
}

const props = defineProps<TNInputUpdateValueProps>()

const { setValue } = useField(`${props.id}`);

</script>

<template>
  <div class="wf-tn-input-update-container">
    <WelfareInputText size="small" v-bind="props" @update:modelValue="(value) => setValue(value)" />
  </div>
</template>

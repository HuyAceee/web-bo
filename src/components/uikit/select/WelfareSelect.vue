<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { WelfareSelectEmits, WelfareSelectProps } from '@/models'
import { computed } from 'vue'
import IconSelect from '@/components/icons/IconSelect.vue'

const props = defineProps<WelfareSelectProps>()
const emit = defineEmits<WelfareSelectEmits>()

const emitEvent = (value: any) => {
  emit('update:modelValue', value)
}

const cssPerProps = computed(() => {
  return (props.small ? ' wf-select-sm ' : '') + (props.bigRadius ? 'wf-select-big-radius' : '') + (props.isError ? 'wf-select-error' : '')
})
</script>

<template>
  <div class="wf-select-label wf-select-label-col" :class="{ 'wf-select-label-sm': props.small, 'wf-select-required': props.required }">
    <label v-if="props.labelTop">{{ props.labelTop }}</label>
    <div class="wf-select-label wf-select-label-row">
      <label v-if="props.labelLeft">{{ props.labelLeft }}</label>
      <Dropdown
        v-bind="props"
        :modelValue="props.modelValue"
        :class="props.class + cssPerProps"
        :panelClass="props.panelClass + cssPerProps"
        v-on:update:modelValue="emitEvent"
      >
        <template #dropdownicon>
          <IconSelect />
        </template>
      </Dropdown>
    </div>
  </div>
</template>

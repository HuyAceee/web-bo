<script setup lang="ts">
import { DataTableContainerConfigModel } from '@/models'
import Column from 'primevue/column'

interface ComplaintOrderCancelTableColumns {
  columnConfigs: DataTableContainerConfigModel[]
}

interface ComplaintOrderCancelTableSlots {
  [key: string]: {}
}
defineProps<ComplaintOrderCancelTableColumns>()
defineSlots<ComplaintOrderCancelTableSlots>()
</script>

<template>
  <Column v-for="column in columnConfigs" :key="column.field" :column-key="column.field" class="wf-nowrap" :class="column?.class">
    <template #header>
      <slot :name="`header-${column.field}`" :props="column.header">
        {{ column.header }}
      </slot>
    </template>
    <template #body="slotProps">
      <slot :name="`body-${column.field}`" :props="slotProps">
        {{ slotProps.data?.[column.field] }}
      </slot>
    </template>
  </Column>
</template>

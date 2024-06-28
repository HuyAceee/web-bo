<script setup lang="ts">
import { getBrowser, getOS } from '@/common'
import { useBaseTable } from '@/composables/widgets/table/useBaseTable'
import { useBaseTableEmptyScroll } from '@/composables/widgets/table/useBaseTableEmptyScroll'
import { WelfareDataTableExpose, WelfareDataTableSlots, WelfareDataTreeTableEmits, defaultDataTablePropsConfig } from '@/models'
import TreeTable, { TreeTableExpandedKeys, TreeTableProps } from 'primevue/treetable'
import { onMounted } from 'vue'

const props = withDefaults(defineProps<TreeTableProps>(), defaultDataTablePropsConfig)

const emit = defineEmits<WelfareDataTreeTableEmits>()

defineSlots<WelfareDataTableSlots>()

const params = {
  ...props
}

const { scrollToTop, parentRef } = useBaseTable(params)

useBaseTableEmptyScroll(parentRef)

defineExpose<WelfareDataTableExpose>({
  scrollToTop: scrollToTop
})

onMounted(() => {
  if (getOS() === 'Windows OS') {
    if (getBrowser() === 'firefox') {
      const ref = document.querySelector('.p-datatable-table')
      ref?.classList.add('wf-window')
    }
  }
})

const handleUpExpandedKeys = (value: TreeTableExpandedKeys) => {
  emit('update:expandedKeys', value)
}
</script>

<template>
  <div ref="parentRef" class="wf-base-table-wrap">
    <TreeTable :value="props.value as any" :expanded-keys="$props.expandedKeys" @update:expanded-keys="handleUpExpandedKeys">
      <slot name="columns"></slot>
      <template #empty>
        <p v-if="!props.loading" class="wf-data-table-empty-data wf_text-n-33 wf-body_02-reg">리스트가 없습니다</p>
      </template>
    </TreeTable>
  </div>
</template>

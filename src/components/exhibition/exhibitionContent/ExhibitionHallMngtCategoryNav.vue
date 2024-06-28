<script setup lang="ts">
import CategoriesTreeMenuNode from '@/components/categories/common/CategoriesTreeMenuNode.vue';
import { CommonTable, CommonTableContentCell, CommonTableRow, CommonTableTitleCell, WelfareInputText, WelfareMdButton } from '@/components/uikit'

interface Props {
  data?: any
}

interface Emits {
  (e: 'getData', data: any): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const exampleData = {
  customerCode: 'code',
  customerName: 'customerName',
  hallCode: 'hall',
  hallName: 'hallName'
}

const onClick = () => {
  emit('getData', exampleData)
}
</script>

<template>
  <div>
    <CommonTable>
      <CommonTableRow height="42" is-last-row>
        <CommonTableTitleCell title="고객사 조회" is-first-col />
        <CommonTableContentCell>
          <div class="wf_flex wf-space-x-4 wf-pr-4">
            <WelfareInputText class="wf_flex-1" size="small" placeholder="고객사 (고객사 코드)" :model-value="$props?.data?.customerCode" readonly />
            <WelfareMdButton button-size="small" buttonType="liner" label="조회" @on-click="onClick" />
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
    </CommonTable>
    <div class="wf-mt-10">
      <CategoriesTreeMenuNode :tree="[]" />
    </div>
  </div>
</template>

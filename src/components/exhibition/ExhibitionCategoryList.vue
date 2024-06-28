<script lang="ts" setup>
import ExhibitionTitle from '@/components/exhibition/common/ExhibitionTitle.vue'
import { DataTableContainer, WelfareMdButton } from '@/components/uikit'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import {
  ExhibitionContentHallCategoryUpperDetail,
  exhibitionContentDisplayOptions,
  exhibitionHallCategoryUpperTableConfig
} from '@/models/views/exhibition/exhibitionContent/ExhibitionContentHallCategoryModel'
import { computed } from 'vue'
export interface ExhibitionCategoryListProps {
  data?: ExhibitionContentHallCategoryUpperDetail[]
  customer?: {
    customerKey?: string
    customerName?: string
  }
}
interface ExhibitionCategoryListEmits {
  (e: 'reset'): void
}
const props = defineProps<ExhibitionCategoryListProps>()
defineEmits<ExhibitionCategoryListEmits>()

const tableDataComputed = computed(() => {
  return props?.data?.length
    ? props.data.map((item, idx) => ({
        ...item,
        id: idx,
        displayYn: exhibitionContentDisplayOptions.find((it) => it.value === item?.displayYn)?.label,
        index: idx + 1
      }))
    : [{}]
})
</script>
<template>
  <div class="wf-space-y-12">
    <div class="wf_flex wf_justify-between wf_items-center">
      <ExhibitionTitle title="카테고리 전시 기본 정보" />
      <WelfareMdButton label="초기화" buttonType="neutral" buttonSize="small" @on-click="$emit('reset')" />
    </div>
    <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf_flex wf_items-center">
      <FormGroup class="wf_flex-1" is-rounded-top isRoundedBottom :isBorderBottom="false" label="고객사 코드">
        {{ props.customer?.customerKey }}
      </FormGroup>
      <FormGroup class="wf_flex-1" isBorderLeft :isBorderBottom="false" label="고객사">
        {{ props.customer?.customerName }}
      </FormGroup>
    </div>
    <div class="wf-pt-8">
      <div class="wf-space-y-12">
        <ExhibitionTitle title="상위 카테고리 목록" class="wf-mb--16" />
        <DataTableContainer :columnConfigs="exhibitionHallCategoryUpperTableConfig" is-select-invisible :value="tableDataComputed">
        </DataTableContainer>
      </div>
    </div>
  </div>
</template>

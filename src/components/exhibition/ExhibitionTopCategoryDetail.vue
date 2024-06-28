<script lang="ts" setup>
import { CommonTable, CommonTableContentCell, CommonTableRow, CommonTableTitleCell, WelfareMdButton } from '@/components'
import ExhibitionTitle from '@/components/exhibition/common/ExhibitionTitle.vue'
import {
  ExhibitionContentHallCategoryUpperDetail,
  exhibitionContentDisplayOptions,
  exhibitionContentSubUseYnOptions
} from '@/models/views/exhibition/exhibitionContent/ExhibitionContentHallCategoryModel'
import WelfareRadioGroup from '../uikit/radio/WelfareRadioGroup.vue'

interface ExhibitionTopCategoryDetailProps {
  data?: ExhibitionContentHallCategoryUpperDetail
}
interface ExhibitionTopCategoryDetailEmits {
  (e: 'setFieldValue', field: keyof ExhibitionContentHallCategoryUpperDetail, value: any): void
  (e: 'save'): void
}

defineProps<ExhibitionTopCategoryDetailProps>()
defineEmits<ExhibitionTopCategoryDetailEmits>()
</script>
<template>
  <div class="wf_flex wf_flex-col wf-space-y-12">
    <div class="wf_flex wf_justify-between wf_items-center">
      <ExhibitionTitle title="상위 카테고리 상세" />
      <WelfareMdButton label="저장" buttonType="neutral" buttonSize="small" @on-click="$emit('save')" />
    </div>

    <CommonTable>
      <CommonTableRow>
        <CommonTableTitleCell title="상위 카테고리 코드" is-first-col />
        <CommonTableContentCell :text="$props.data?.lclassCode" />
        <CommonTableTitleCell title="상위 카테고리 명" />
        <CommonTableContentCell :text="$props.data?.lclassName" />
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="전시 여부" is-first-col />
        <CommonTableContentCell>
          <WelfareRadioGroup
            gap="20"
            :options="exhibitionContentDisplayOptions"
            :model-value="$props.data?.displayYn"
            @update:model-value="(value) => $emit('setFieldValue', 'displayYn', value)"
          />
        </CommonTableContentCell>
        <CommonTableTitleCell title="하위카테고리사용여부" />
        <CommonTableContentCell>
          <WelfareRadioGroup
            gap="20"
            :options="exhibitionContentSubUseYnOptions"
            :model-value="$props.data?.sclassUseYn"
            @update:model-value="(value) => $emit('setFieldValue', 'sclassUseYn', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="등록자" is-first-col />
        <CommonTableContentCell :text="$props.data?.createdByName" />
        <CommonTableTitleCell title="등록일" />
        <CommonTableContentCell :text="$props.data?.createdDate" />
      </CommonTableRow>
      <CommonTableRow height="42" is-last-row>
        <CommonTableTitleCell title="수정자" is-first-col />
        <CommonTableContentCell :text="$props.data?.lastModifiedByName" />
        <CommonTableTitleCell title="수정일" />
        <CommonTableContentCell :text="$props.data?.lastModifiedDate" />
      </CommonTableRow>
    </CommonTable>
  </div>
</template>

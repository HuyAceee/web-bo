<script lang="ts" setup>
import { isEmpty } from '@/common/validation/validationRules'
import { CommonTable, CommonTableContentCell, CommonTableRow, CommonTableTitleCell, WelfareInputText, WelfareMdButton } from '@/components'
import ExhibitionTitle from '@/components/exhibition/common/ExhibitionTitle.vue'
import { useModalNotification } from '@/composables/widgets/modal/useModalNotification'
import {
  ExhibitionContentHallCategoryLowerDetail,
  exhibitionContentDisplayOptions
} from '@/models/views/exhibition/exhibitionContent/ExhibitionContentHallCategoryModel'
import { useForm } from 'vee-validate'
import { watch } from 'vue'
import WelfareRadioGroup from '../uikit/radio/WelfareRadioGroup.vue'
interface ExhibitionSubCategoryProps {
  data?: ExhibitionContentHallCategoryLowerDetail
}
interface ExhibitionSubCategoryEmits {
  (e: 'save', data: ExhibitionContentHallCategoryLowerDetail): void
}
const props = defineProps<ExhibitionSubCategoryProps>()
const emit = defineEmits<ExhibitionSubCategoryEmits>()

const schema = { sclassName: isEmpty }

const { openModal: openNotification } = useModalNotification()

const { values, setFieldValue, setValues, handleSubmit } = useForm<ExhibitionContentHallCategoryLowerDetail>({ validationSchema: schema })

watch(
  () => props.data,
  (v) => {
    setValues(v ?? {})
  },
  { immediate: true }
)

const onSave = handleSubmit(
  () => {
    emit('save', values)
  },
  () => {
    openNotification({ content: '필수입력 항목을 입력해주세요.' })
  }
)
</script>

<template>
  <div class="wf_flex wf_flex-col wf-space-y-12">
    <div class="wf_flex wf_justify-between wf_items-center">
      <ExhibitionTitle title="하위 카테고리 상세" />
      <WelfareMdButton label="저장" buttonType="neutral" buttonSize="small" @on-click="onSave" />
    </div>
    <CommonTable>
      <CommonTableRow>
        <CommonTableTitleCell title="하위 카테고리 코드" is-first-col />
        <CommonTableContentCell :text="values?.sclassCode" />
        <CommonTableTitleCell title="하위 카테고리명" required />
        <CommonTableContentCell>
          <WelfareInputText
            :model-value="values?.sclassName"
            @update:model-value="(value) => setFieldValue('sclassName', value)"
            size="small"
            placeholder="하위 카테고리명"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="전시 여부" is-first-col />
        <CommonTableContentCell>
          <WelfareRadioGroup
            :options="exhibitionContentDisplayOptions"
            name="displayYn"
            :model-value="values.displayYn"
            @update:model-value="(value) => setFieldValue('displayYn', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="등록자" is-first-col />
        <CommonTableContentCell :text="values.createdByName" />
        <CommonTableTitleCell title="등록일" />
        <CommonTableContentCell :text="values.createdDate" />
      </CommonTableRow>
      <CommonTableRow height="42" is-last-row>
        <CommonTableTitleCell title="수정자" is-first-col />
        <CommonTableContentCell :text="values.lastModifiedByName" />
        <CommonTableTitleCell title="수정일" />
        <CommonTableContentCell :text="values.lastModifiedDate" />
      </CommonTableRow>
    </CommonTable>
  </div>
</template>

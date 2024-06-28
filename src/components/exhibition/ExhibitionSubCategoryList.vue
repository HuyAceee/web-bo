<script lang="ts" setup>
import { DataTableContainer, WelfareInputText, WelfareMdButton } from '@/components/uikit'
import ExhibitionTitle from '@/components/exhibition/common/ExhibitionTitle.vue'
import { computed, ref } from 'vue'
import { useForm } from 'vee-validate'
import { array, object } from 'yup'
import { useModalConfirm, useModalNotification } from '@/composables'
import { isEmpty } from '@/common'
import {
  ExhibitionContentHallCategoryLowerFormItemModel,
  ExhibitionContentHallCategoryLowerListItem,
  exhibitionHallCategoryLowerTableConfig
} from '@/models/views/exhibition/exhibitionContent/ExhibitionContentHallCategoryModel'
import { BaseArrayFormModel } from '@/models'
interface ExhibitionSubCategoryListEmits {
  (e: 'save', data: ExhibitionContentHallCategoryLowerFormItemModel[]): void
  (e: 'delete', data: any): void
}

interface ExhibitionSubCategoryListProps {
  registeredData?: ExhibitionContentHallCategoryLowerListItem[]
  exhibitionStatus?: string
}
const props = defineProps<ExhibitionSubCategoryListProps>()
const emit = defineEmits<ExhibitionSubCategoryListEmits>()

interface ExhibitionSubCategoryFormItem extends ExhibitionContentHallCategoryLowerFormItemModel {
  registered?: boolean
}

type ExhibitionSubCategoryListTableFormModel = BaseArrayFormModel<ExhibitionContentHallCategoryLowerFormItemModel>

const schema = {
  formData: array().of(
    object().shape({
      sclassName: isEmpty
    })
  )
}

const { openModal: openNotification, closeModalByPop } = useModalNotification()
const { openModal: openConfirm } = useModalConfirm()
const tableRef = ref()
const selectedRow = ref()
const { values, setFieldValue, setValues, handleSubmit } = useForm<ExhibitionSubCategoryListTableFormModel>({
  validationSchema: schema,
  initialValues: { data: [] }
})

const dataTableDataComputed = computed(() => {
  let listResult: ExhibitionSubCategoryFormItem[] = []
  if (props.registeredData) {
    listResult = props.registeredData.map((it) => ({
      ...it,
      registered: true
    }))
  }
  return listResult.concat(values.data ?? []).map((it, idx) => ({ ...it, id: String(idx) }))
})

const onSelectRow = (event: any) => {
  selectedRow.value = event?.data
}

const onAddRow = () => {
  setFieldValue('data', [...values.data, { sclassName: '' }])
}

const onDeleteRow = () => {
  if (!selectedRow.value && selectedRow.value !== 0) {
    openNotification({ content: '삭제할 행을 선택해주세요.' })
    return
  }
  openConfirm({
    content: '선택 된 행을 삭제하겠습니까?',
    onConfirm: () => {
      closeModalByPop?.()
      handleDeleteRow()
    }
  })
}

const handleDeleteRow = () => {
  if (selectedRow.value?.sclassCode) {
    emit('delete', selectedRow.value)
  } else {
    setFieldValue(
      'data',
      values.data.filter((_, idx) => idx !== selectedRow.value.id - (props.registeredData?.length ?? 0))
    )
    openNotification({ content: '삭제 되었습니다.' })
  }
  tableRef?.value?.resetSelectedRow?.()
  selectedRow.value = undefined
}

const onSave = handleSubmit(
  (values) => {
    emit('save', values.data ?? [])
    setValues({ data: [] })
  },
  () => {
    openNotification({ content: '필수입력 항목을 입력해주세요.' })
  }
)
</script>
<template>
  <div class="wf-product-discount">
    <div class="wf-space-y-12">
      <div class="wf_flex wf_justify-between wf_items-center wf-mb--16">
        <ExhibitionTitle :title="`하위 카테고리 목록 총 ${dataTableDataComputed.length} 건`" />
        <div class="wf_flex wf-space-x-4">
          <WelfareMdButton label="삭제" buttonType="neutral" buttonSize="small" @on-click="onDeleteRow" />
          <WelfareMdButton label="행 추가" buttonType="neutral" buttonSize="small" @on-click="onAddRow" />
          <WelfareMdButton label="저장" buttonType="neutral" buttonSize="small" @on-click="onSave" />
        </div>
      </div>
      <DataTableContainer
        ref="tableRef"
        :columnConfigs="exhibitionHallCategoryLowerTableConfig"
        is-select-invisible
        :value="dataTableDataComputed"
        @row-click="onSelectRow"
      >
        <template #header-categoryName>
          <p>하위 카테고리명 <span class="wf_text-sub-01">*</span></p>
        </template>
        <template #body-index="{ props }">
          <div :class="selectedRow && selectedRow?.id === props.data.id && 'wf_table-single-selected-row--content'">
            <span>{{ props.index + 1 }}</span>
          </div>
        </template>
        <template #body-sclassCode="{ props }">
          <div :class="selectedRow && selectedRow?.id === props.data.id && 'wf_table-single-selected-row--content'">
            <span class="wf-text_link wf-pointer" @click="() => $router.push({ query: { ...$route.query, sclassCode: props.data?.sclassCode } })">
              {{ props.data?.sclassCode }}
            </span>
          </div>
        </template>
        <template #body-sclassName="{ props }">
          <div v-if="!props.data?.registered" class="wf_w-196">
            <WelfareInputText
              :model-value="values.data?.[props.index - ($props.registeredData?.length ?? 0)]?.sclassName"
              @update:model-value="(value) => setFieldValue(`data.${props.index - ($props.registeredData?.length ?? 0)}.sclassName`, value)"
              size="small"
              placeholder="하위 카테고리명"
              :max-length="15"
            />
          </div>
        </template>
      </DataTableContainer>
    </div>
  </div>
</template>

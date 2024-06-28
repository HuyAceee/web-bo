<script setup lang="ts">
import { ProductDataFieldFormDeliveryProductListModel, ProductSearchRecordModel, ProductSearchType } from '@/models'
import { WelfareCheckbox, WelfareInputText, WelfareRadioGroup, WelfareSelect } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { ref } from 'vue'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import ProductSearchModalWrapper from '@/components/products/common/ProductSearchModalWrapper.vue'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import { CHARACTER_SEPARATOR, TEXT_MAX_NUMBER_50 } from '@/common'
import { useModalNotification } from '@/composables'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
import { MemberPointListFormFieldModel } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAdjustmentModel'

interface ExhibitionSpecialTableProps {
  values: any
  currentFilterDate: number
  inputRow1: MemberPointListFormFieldModel[]
  selectRow2: MemberPointListFormFieldModel[]
  selectRow3: MemberPointListFormFieldModel[]
  listSelectDate: MemberPointListFormFieldModel
  listSelectSearchType: MemberPointListFormFieldModel
  querySearch: MemberPointListFormFieldModel
  sellerType?: boolean
}

interface ExhibitionSpecialTableEmits {
  (e: 'setFieldValue', field: string, value: any): void

  (e: 'handleResetFormFilter'): void

  (e: 'handleChangeCountDate', value: number): void

  (e: 'handleSubmitForm'): void

  (e: 'handleOpenPopupSearchMember'): void
}

const props = defineProps<ExhibitionSpecialTableProps>()
const emit = defineEmits<ExhibitionSpecialTableEmits>()

const eventEmit = {
  setFieldValue: (field: string, value: any) => {
    emit('setFieldValue', field, value)
  },
  handleResetFormFilter: () => {
    emit('handleResetFormFilter')
  },
  handleChangeCountDate: (value: number) => {
    emit('handleChangeCountDate', value)
  },
  handleSubmitForm: () => {
    emit('handleSubmitForm')
  },
  handleOpenPopupSearchMember: () => {
    emit('handleOpenPopupSearchMember')
  }
}
const listButtonDate = ProductDataFieldFormDeliveryProductListModel.listButtonDateFilter

const searchCustomerRef = ref()
const searchMdRef = ref()

const { openModal, closeModalByPop } = useModalNotification()
let isNotify = true

const resetFormComplaint = () => {
  searchCustomerRef?.value?.handleReset?.()
  searchMdRef?.value?.handleReset?.()
}

const handleInputFieldChange = (e: any) => {
  const arrayValue = e.target.value.split(CHARACTER_SEPARATOR)
  if (arrayValue.length > TEXT_MAX_NUMBER_50 && isNotify) {
    ;(document.activeElement as HTMLInputElement).blur()
    isNotify = false
    openModal({
      content: '최대 50개까지 입력 가능합니다.',
      onAccept() {
        isNotify = true
        closeModalByPop?.()
        eventEmit.setFieldValue(props.querySearch.field, arrayValue.splice(0, 50).join())
      }
    })
  }
}

const handleCheckBoxApplicableChannel = (field: string, value: string) => {
  const count = [
    props.values.applyChannelAllYn,
    props.values.applyChannelMobileYn,
    props.values.applyChannelPcYn,
    props.values.applyChannelMobileWebYn
  ].filter((val) => val).length

  if (count <= 1 && props.values[field]) {
    openModal?.({
      buttonLabel: '확인',
      content: '1개 이상 필수 체크해주세요.'
    })
  } else {
    eventEmit.setFieldValue(field, value)
  }
}
defineExpose({
  resetFormComplaint
})
</script>

<template>
  <div class="wf-approval-border">
    <div class="wf-form-filter">
      <div id="wf-group-filer" class="wf-group-filter">
        <div class="wf_flex wf_flex-col wf-mt-0">
          <div class="wf_flex wf_items-center wf_br-b">
            <FormGroup class="wf-w-1-4" is-rounded-top :label="sellerType ? '판매사(판매사코드)' : inputRow1[0].label" :isBorderBottom="false">
              <div class="wf_flex wf-space-x-6 wf_items-center">
                <ProductSearchModalWithTableWrapper
                  ref="searchCustomerRef"
                  :default-value="
                    values?.[inputRow1[0].field]?.value && `${values?.[inputRow1[0].field]?.label} (${values?.[inputRow1[0].field]?.value})`
                  "
                  @selectValue="(valueData) => eventEmit.setFieldValue(inputRow1[0].field, { label: valueData.name, value: valueData.code })"
                  :placeholder-input="sellerType ? '판매사 조회' : '고객사 조회'"
                  :type="sellerType ? ProductSearchType.SELLER : ProductSearchType.CUSTOMER"
                />
              </div>
            </FormGroup>
            <FormGroup class="wf-w-1-4" :label="inputRow1[1].label" is-border-left :isBorderBottom="false">
              <WelfareInputText
                class="wf_w-180 wf-mr--5"
                :placeholder="inputRow1[1].placeholder"
                :model-value="values[inputRow1[1].field]"
                @update:model-value="(value) => eventEmit.setFieldValue(inputRow1[1].field, value)"
                size="small"
              />
            </FormGroup>
            <FormGroup is-border-left class="wf-w-1-2" custom-class="wf-pr-8" :isBorderBottom="false" :label="inputRow1[2].label">
              <ProductSearchModalWrapper
                ref="searchMdRef"
                class="wf-w-228"
                :default-value="values[inputRow1[2].field]?.value && values[inputRow1[2].field]?.value + ` (${values[inputRow1[2].field]?.label})`"
                :type="ProductSearchType.MD"
                :placeholder-input="`MD 조회`"
                label-button="조회"
                @selectValue="
                  (newValue: ProductSearchRecordModel) => {
                    eventEmit.setFieldValue(inputRow1[2].field, { value: newValue.code, label: newValue.name })
                  }
                "
              />
            </FormGroup>
          </div>
          <div class="wf_flex wf_flex-row">
            <FormGroup
              class="wf_flex-1"
              custom-class="wf-pr-8"
              v-for="(selectData, index) in selectRow2"
              :key="index"
              :is-border-left="index !== 0"
              :label="selectData.label"
            >
              <WelfareRadioGroup
                @update:model-value="(value) => eventEmit.setFieldValue(selectData.field, value)"
                :model-value="values[selectData.field]"
                :options="selectData.options"
                size="sm"
              />
            </FormGroup>
          </div>
          <div class="wf_flex wf_flex-row">
            <FormGroup
              class="wf_flex-1"
              custom-class="wf-pr-8"
              v-for="(selectData, index) in selectRow3"
              :key="index"
              :is-border-left="index !== 0"
              :label="selectData.label"
            >
              <WelfareRadioGroup
                v-if="index === 0"
                @update:model-value="(value) => eventEmit.setFieldValue(selectData.field, value)"
                :model-value="values[selectData.field]"
                :options="selectData.options"
                size="sm"
              />
              <WelfareCheckbox
                v-else
                v-for="(checkedItem, index) in selectData.options"
                size="sm"
                :key="index"
                :label="checkedItem.label"
                :model-value="values[checkedItem.value]"
                @update:model-value="(value) => handleCheckBoxApplicableChannel(checkedItem.value, value)"
                :class="index !== 0 ? 'wf-ml-20' : ''"
              />
            </FormGroup>
          </div>
          <FormGroupTimeLinesFilterForm
            label="기간"
            class="wf_h-44"
            :is-border-bottom="true"
            :is-rounded-bottom="false"
            :current-active-date="currentFilterDate"
            :option-date-button="listButtonDate"
            :from-date="values.fromDate"
            :to-date="values.toDate"
            :current-type-date-product-select="values.searchPeriodType"
            :options-product-type-date="listSelectDate.options"
            @on-change-date-from="(value) => eventEmit.setFieldValue('fromDate', value)"
            @on-change-date-to="(value) => eventEmit.setFieldValue('toDate', value)"
            @on-select-type="(value) => eventEmit.setFieldValue('searchPeriodType', value)"
            @on-change-filter-date="eventEmit.handleChangeCountDate"
          />
          <div class="wf_flex wf_flex-row">
            <div class="wf-width-full">
              <FormGroup :label="listSelectSearchType.label" is-rounded-bottom class="wf_h-42" :is-border-bottom="false">
                <div class="wf_flex wf-width-full wf-space-x-6 wf_items-center">
                  <div class="wf_w-180">
                    <WelfareSelect
                      class="wf_w-180"
                      optionLabel="label"
                      :model-value="values[listSelectSearchType.field]"
                      @update:model-value="
                        (value) => {
                          eventEmit.setFieldValue(listSelectSearchType.field, value)
                        }
                      "
                      :options="sellerType ? listSelectSearchType.options : listSelectSearchType?.options?.slice(1)"
                      small
                    />
                  </div>
                  <WelfareInputText
                    class="wf-width-full"
                    :placeholder="querySearch.placeholder"
                    :model-value="values[querySearch.field]"
                    @input="handleInputFieldChange"
                    @update:model-value="(value) => eventEmit.setFieldValue(querySearch.field, value)"
                    size="small"
                  />
                </div>
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
      <FormButtonHandleForm @on-reset="eventEmit.handleResetFormFilter" @on-submit="eventEmit.handleSubmitForm" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-allocation-list.css');
</style>

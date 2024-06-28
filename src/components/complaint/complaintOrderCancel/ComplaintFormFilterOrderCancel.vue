<script setup lang="ts">
import { ProductDataFieldFormDeliveryProductListModel, ProductSearchRecordModel, ProductSearchType, SelectOptionModel } from '@/models'
import { WelfareInputText, WelfareSelect } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { computed, ref } from 'vue'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import ProductSearchModalWrapper from '@/components/products/common/ProductSearchModalWrapper.vue'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import DeliverySearchProductWrapper from '@/components/delivery/common/DeliverySearchProductWrapper.vue'
import MemberSearchWithTableWrapperModal from '@/components/members/modal/MemberSearchWithTableWrapperModal.vue'
import { complaintOrderCancelListModelConfig } from '@/models/views/complaint/complaintOrderCancel/ComplaintOrderCancelModel'
import { CHARACTER_SEPARATOR, TEXT_MAX_NUMBER_50 } from '@/common'
import { useModalNotification } from '@/composables'
import { DeliverySearchProductSelectedValueModel } from '@/models/views/delivery/modal/DeliverySearchProductModel'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
import { MemberSearchType } from '@/models/views/members/modal/MemberSearchTypeModel'
import { MemberPointListFormFieldModel } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAdjustmentModel'

interface ComplaintFormFilterOrderCancelProps {
  values: any
  currentFilterDate: number
  inputRow1: MemberPointListFormFieldModel
  selectRow1: MemberPointListFormFieldModel
  listInputRow2: MemberPointListFormFieldModel[]
  listInputRow3: MemberPointListFormFieldModel[]
  listInputRow4: MemberPointListFormFieldModel[]
  inputRow4: MemberPointListFormFieldModel
  selectRow4: MemberPointListFormFieldModel
  listSelectDate: MemberPointListFormFieldModel
  listSelectSearchType: MemberPointListFormFieldModel
  querySearch: MemberPointListFormFieldModel
  sellerCompanies: SelectOptionModel[]
}

interface MemberFormFilterPointAllocationEmits {
  (e: 'setFieldValue', field: string, value: any): void

  (e: 'handleResetFormFilter'): void

  (e: 'handleChangeCountDate', value: number): void

  (e: 'handleSubmitForm'): void

  (e: 'handleOpenPopupSearchMember'): void
}

const props = defineProps<ComplaintFormFilterOrderCancelProps>()
const emit = defineEmits<MemberFormFilterPointAllocationEmits>()

const disableOption = computed(() => {
  return props.values[props.listSelectSearchType.field].value !== complaintOrderCancelListModelConfig.listSelectSearchType.options[0].value
})

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

const searchMemberRef = ref()
const searchCustomerRef = ref()
const searchSellerRef = ref()
const searchMdRef = ref()
const searchproductRef = ref()

const { openModal, closeModalByPop } = useModalNotification()
let isNotify = true

const openPopupSearchMember = () => {
  searchMemberRef?.value?.handlePopupSearch()
}

const resetFormComplaint = () => {
  searchMemberRef.value?.handleReset?.()
  searchCustomerRef?.value?.handleReset?.()
  searchSellerRef?.value?.handleReset?.()
  searchMdRef?.value?.handleReset?.()
  searchproductRef?.value?.handleReset?.()
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
            <FormGroup class="wf-w-1-2" is-rounded-top :label="inputRow1.label" :isBorderBottom="false">
              <WelfareInputText
                class="wf_w-180"
                :max-length="20"
                :placeholder="inputRow1.placeholder"
                :model-value="values[inputRow1.field]"
                @update:model-value="(value) => eventEmit.setFieldValue(inputRow1.field, value)"
                size="small"
                :disabled="disableOption"
              />
            </FormGroup>
            <FormGroup is-border-left class="wf-w-1-2" custom-class="wf-pr-8" :isBorderBottom="false" :label="selectRow1.label">
              <WelfareSelect
                class="wf_w-180"
                optionLabel="label"
                :model-value="values[selectRow1.field]"
                @update:model-value="(value) => eventEmit.setFieldValue(selectRow1.field, value)"
                :options="selectRow1.options"
                small
                :disabled="disableOption"
              />
            </FormGroup>
          </div>
          <div class="wf_flex wf_flex-row">
            <div class="wf-w-1-2">
              <FormGroup :label="listInputRow2[0].label">
                <div class="wf_flex wf-space-x-6 wf_items-center">
                  <MemberSearchWithTableWrapperModal
                    ref="searchMemberRef"
                    @selectValue="
                      (value) => {
                        eventEmit.setFieldValue(listInputRow2[0].field, value.memberKey)
                      }
                    "
                    class="wf-product-base-info-search wf_w-full"
                    placeholder-input="(주)고객사 조회"
                    label-button="조회"
                    :type="MemberSearchType.NORMAL"
                    :disabled="disableOption"
                    @on-open-popup-search-member="openPopupSearchMember"
                  />
                </div>
              </FormGroup>
            </div>
            <div class="wf-w-1-2">
              <FormGroup :label="listInputRow2[1].label" is-border-left>
                <div class="wf_flex wf-space-x-6 wf_items-center">
                  <ProductSearchModalWithTableWrapper
                    ref="searchCustomerRef"
                    class=" wf-product-base-info-search"
                    @selectValue="(value) => eventEmit.setFieldValue(listInputRow2[1].field, value.code)"
                    placeholder-input="고객사 조회"
                    :type="ProductSearchType.CUSTOMER"
                    :disabled="disableOption"
                  />
                </div>
              </FormGroup>
            </div>
          </div>
          <div class="wf_flex wf_flex-row wf-width-full">
            <FormGroup
              class="wf_flex-1"
              custom-class="wf-pr-8"
              v-for="(input, index) in listInputRow3"
              :key="index"
              :is-border-left="index !== 0"
              :label="input.label"
            >
              <WelfareInputText
                class="wf_w-180"
                :max-length="20"
                :placeholder="input.placeholder"
                :model-value="values[input.field]"
                @update:model-value="(value) => eventEmit.setFieldValue(input.field, value)"
                size="small"
                :disabled="disableOption"
              />
            </FormGroup>
          </div>
          <div class="wf_flex wf_flex-row">
            <div class="wf-w-1-2">
              <FormGroup :label="inputRow4.label">
                <div class="wf_flex wf-space-x-6 wf_items-center">
                  <ProductSearchModalWithTableWrapper
                    ref="searchSellerRef"
                    class="wf-product-base-info-search"
                    @selectValue="(value) => eventEmit.setFieldValue(inputRow4.field, value.code)"
                    :placeholder-input="inputRow4.placeholder"
                    :type="ProductSearchType.SELLER"
                    :disabled="disableOption"
                  />
                  <WelfareSelect
                    class="wf_w-180"
                    optionLabel="label"
                    :model-value="values[selectRow4.field]"
                    @update:model-value="
                      (value) => {
                        eventEmit.setFieldValue(selectRow4.field, value)
                      }
                    "
                    :options="sellerCompanies"
                    small
                    :disabled="disableOption || sellerCompanies.length === 0"
                  />
                </div>
              </FormGroup>
            </div>
            <div class="wf_flex wf_flex-row wf-w-1-2">
              <FormGroup
                class="wf_flex-1"
                custom-class="wf-pr-8"
                v-for="(input, index) in listInputRow4"
                :key="index"
                is-border-left
                :label="input.label"
              >
                <div class="wf_flex wf-space-x-6 wf_items-center">
                  <ProductSearchModalWrapper
                    ref="searchMdRef"
                    v-if="index === 0"
                    :default-value="values?.[input.field]?.value && values?.[input.field]?.value + ' ' + values?.[input.field]?.label"
                    :type="ProductSearchType.MD"
                    :placeholder-input="`MD 조회`"
                    label-button="조회"
                    :disabled="disableOption"
                    @selectValue="
                      (newValue: ProductSearchRecordModel) => {
                        eventEmit.setFieldValue(input.field, { value: newValue.code, label: newValue.name })
                      }
                    "
                    class="wf_w-180 wf-pr-4"
                    custom-class-input="w-input-128"
                  />
                  <DeliverySearchProductWrapper
                    v-if="index === 1"
                    ref="searchproductRef"
                    @selectValue="
                      (newValue: DeliverySearchProductSelectedValueModel) => {
                        eventEmit.setFieldValue(input.field, newValue)
                      }
                    "
                    :default-value="
                      values?.[input.field]?.productCode && values?.[input.field]?.productCode + ' ' + values?.[input.field]?.productName
                    "
                    class="wf_w-180 wf-pr-4"
                    custom-class-input="w-input-128"
                    placeholder-input="회원조회"
                    label-button="조회"
                    :disabled="disableOption"
                  />
                </div>
              </FormGroup>
            </div>
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
            :current-type-date-product-select="values.periodSearchType"
            :options-product-type-date="listSelectDate.options"
            @on-change-date-from="(value) => eventEmit.setFieldValue('fromDate', value)"
            @on-change-date-to="(value) => eventEmit.setFieldValue('toDate', value)"
            @on-select-type="(value) => eventEmit.setFieldValue('periodSearchType', value)"
            @on-change-filter-date="eventEmit.handleChangeCountDate"
            :disabled="disableOption"
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
                      :options="listSelectSearchType.options"
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
                    :disabled="!disableOption"
                  />
                </div>
              </FormGroup>
            </div>
          </div>
        </div>
      </div>
      <FormButtonHandleForm class="wf-mt--4" @on-reset="eventEmit.handleResetFormFilter" @on-submit="eventEmit.handleSubmitForm" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-allocation-list.css');
</style>

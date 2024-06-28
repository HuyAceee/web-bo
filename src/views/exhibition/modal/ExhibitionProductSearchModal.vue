<!--BO_I0102_040401_P-->
<script setup lang="ts">
import { DataTablePaginationWithCheckbox, HeaderModal, WelfareInputText, WelfareMdButton, WelfareSelect } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { CHARACTER_SEPARATOR, DEFAULT_TABLE_SELECT_OPTIONS, TEXT_MAX_NUMBER_50 } from '@/common'
import {
  ExhibitionProductSearchModalProps,
  exhibitionProductSearchPeriodType,
  exhibitionProductSearchTableHeaderConfig,
  exhibitionProductSearchType
} from '@/models/views/exhibition/modal/ExhibitionProductSearchModalModel'
import { useExhibitionProductSearchModalLogic } from '@/composables/exhibition/modal/useExhibitionProductSearchModalLogic'
import { computed } from 'vue'
import { ComplaintOrderCancelKeywordSearchType } from '@/models/services/requests/complaint/complaintOrderCancel/ComplaintOrderCancelListRequest'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
import { memberRequestMarketingAgreeYn } from '@/models/views/members/modal/MemberRequestModel'
import { useModalNotification } from '@/composables'
import { deliveryProductClassification } from '@/models/views/delivery/modal/DeliverySearchProductModel'
import Column from 'primevue/column'

const props = defineProps<ExhibitionProductSearchModalProps>()

const {
  setFieldValue,
  isLoading,
  onSubmitForm,
  onPageChange,
  handleChangeCountDate,
  currentFilterDate,
  values,
  refTable,
  totalItems,
  items,
  handleResetFormFilter,
  handleSelectValue,
  onRowSelected,
  onSelectAllChange
} = useExhibitionProductSearchModalLogic(props)

const { openModal, closeModalByPop } = useModalNotification()
let isNotify = true
const handleInputFieldChange = (e: InputEvent) => {
  const target = e.target as HTMLInputElement
  const arrayValue = target.value.split(CHARACTER_SEPARATOR)
  if (arrayValue.length > TEXT_MAX_NUMBER_50 && isNotify) {
    ;(document.activeElement as HTMLInputElement).blur()
    isNotify = false
    openModal({
      content: '최대 50개까지 입력 가능합니다.',
      onAccept() {
        isNotify = true
        closeModalByPop?.()
        setFieldValue('keyword', arrayValue.splice(0, 50).join())
      }
    })
  }
}

const disableOption = computed(() => {
  return values.keywordSearchType.value !== ComplaintOrderCancelKeywordSearchType.NONE
})
</script>

<template>
  <div class="member-request-modal">
    <HeaderModal title="상품 검색" @close-modal="props.onCancel" />
    <div class="wf-p-20 wf-width-full wf_flex wf_flex-col wf-space-y-20">
      <div class="wf-search-tips wf-space-y-6 wf_h-58">
        <p class="wf-list-style wf_text-n-33 wf-body_04-mid">{{ '목록에 이미 등록된 상품은 검색되지 않습니다.' }}</p>
        <p class="wf-list-style wf_text-n-33 wf-body_04-mid">{{ '최대 100건 선택이 가능합니다.' }}</p>
      </div>
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-rounded-top label="상품구분">
            <WelfareSelect
              :modelValue="values.productClassificationCode"
              :options="deliveryProductClassification"
              optionLabel="label"
              @update:modelValue="(value) => setFieldValue('productClassificationCode', value)"
              placeholder="전체"
              small
              class="wf_w-180"
              :disabled="disableOption"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="상품명">
            <WelfareInputText
              :modelValue="values.productName"
              @update:modelValue="(value) => setFieldValue('productName', value)"
              placeholder="상품명 입력"
              size="small"
              class="wf_w-180"
              :disabled="disableOption"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="상품코드">
            <WelfareInputText
              :modelValue="values.productKey"
              @update:modelValue="(value) => setFieldValue('productKey', value)"
              placeholder="상품코드 입력"
              size="small"
              class="wf_w-180"
              :disabled="disableOption"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" label="담당 MD">
            <WelfareInputText
              :modelValue="values.mdKey"
              @update:modelValue="(value) => setFieldValue('mdKey', value)"
              placeholder="담당 MD 입력"
              size="small"
              class="wf_w-180"
              :disabled="disableOption"
            />
          </FormGroup>
          <div class="wf-w-1-3 wf_flex-row wf-width-full">
            <FormGroup class="wf-width-full wf-administrator-notes" is-border-left label="판매사">
              <WelfareInputText
                :modelValue="values.seller"
                @update:modelValue="(value) => setFieldValue('seller', value)"
                placeholder="판매사 입력"
                size="small"
                class="wf_w-180"
                :disabled="disableOption"
              />
            </FormGroup>
          </div>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="판매사코드">
            <WelfareInputText
              :modelValue="values.sellerKey"
              @update:modelValue="(value) => setFieldValue('sellerKey', value)"
              placeholder="판매사코드 입력"
              size="small"
              class="wf_w-180"
              :disabled="disableOption"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-rounded-top is-rounded-bottom label="브랜드명">
            <WelfareInputText
              :modelValue="values.brandName"
              @update:modelValue="(value) => setFieldValue('brandName', value)"
              placeholder="브랜드명 입력"
              size="small"
              class="wf_w-180"
              :disabled="disableOption"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="브랜드 코드">
            <WelfareInputText
              :modelValue="values.brandCode"
              @update:modelValue="(value) => setFieldValue('brandCode', value)"
              placeholder="브랜드코드 입력"
              size="small"
              class="wf_w-180"
              :disabled="disableOption"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="판매상태">
            <WelfareSelect
              :modelValue="values.salesStatus"
              :options="memberRequestMarketingAgreeYn"
              optionLabel="label"
              @update:modelValue="(value) => setFieldValue('salesStatus', value)"
              placeholder="전체"
              small
              class="wf_w-180"
              :disabled="disableOption"
            />
          </FormGroup>
        </div>
        <FormGroupTimeLinesFilterForm
          label="기간"
          class="wf_h-44"
          :is-border-bottom="true"
          :is-rounded-bottom="false"
          :current-active-date="currentFilterDate"
          :from-date="values.fromDate"
          :to-date="values.toDate"
          :current-type-date-product-select="values.searchDateType"
          :options-product-type-date="exhibitionProductSearchPeriodType"
          @on-change-date-from="(value) => setFieldValue('fromDate', value)"
          @on-change-date-to="(value) => setFieldValue('toDate', value)"
          @on-select-type="(value) => setFieldValue('periodSearchType', value)"
          @on-change-filter-date="handleChangeCountDate"
          :disabled="disableOption"
        />
        <div class="wf_flex wf_flex-row wf-h-42">
          <FormGroup class="wf-width-full wf-administrator-notes" :is-border-bottom="false" is-rounded-bottom label="상품코드 검색">
            <WelfareSelect
              :modelValue="values.keywordSearchType"
              :options="exhibitionProductSearchType"
              optionLabel="label"
              @update:modelValue="(value) => setFieldValue('keywordSearchType', value)"
              placeholder="전체"
              small
              class="wf_w-180"
            />
            <WelfareInputText
              :modelValue="values.keyword"
              @input="handleInputFieldChange"
              placeholder="판매사코드 입력"
              size="small"
              class="wf-width-full wf-ml-6"
              :disabled="!disableOption"
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full wf_product-border-bottom-sub-gray wf-pb-20">
        <WelfareMdButton class="wf_w-120" label="초기화" button-type="liner" @onClick="handleResetFormFilter" />
        <WelfareMdButton class="wf_w-120" label="조회" button-type="default" @onClick="onSubmitForm" />
      </div>

      <div class="wf_product-search-table">
        <DataTablePaginationWithCheckbox
          ref="refTable"
          :value="items"
          :loading="isLoading"
          :total-records="totalItems"
          @page-change="onPageChange"
          @row-checked-change="onRowSelected"
          @selectAllChange="onSelectAllChange"
          no-data-label="조회 내용이 없습니다."
          :select-props="{ small: true, options: DEFAULT_TABLE_SELECT_OPTIONS }"
        >
          <template #columns>
            <Column
              v-for="column in exhibitionProductSearchTableHeaderConfig"
              :key="column?.field"
              :column-key="column?.field"
              class="wf-nowrap"
              :class="column?.class"
            >
              <template #header>
                {{ column.header }}
              </template>
              <template #body="slotProps">
                <p v-if="column?.field === 'chargeMdName'">
                  {{ slotProps.data?.chargeMdName + ` (${slotProps.data.chargeMdKey})` }}
                </p>
                <p v-else-if="column?.field === 'createdByName'">
                  {{ slotProps.data?.createdByName + ` (${slotProps.data.createdBy})` }}
                </p>
                <p v-else-if="column?.field === 'lastModifiedByName'">
                  {{ slotProps.data?.lastModifiedByName + ` (${slotProps.data.lastModifiedBy})` }}
                </p>
                <p v-else>{{ slotProps.data[column?.field] }}</p>
              </template>
            </Column>
          </template>
          <template #title>
            <p>
              <span class="wf-body_01-semi">상품 목록</span>&nbsp;
              <span class="wf-body_01-mid wf_text-n-8-f">(총 {{ totalItems ?? 0 }}건)</span>
            </p>
          </template>
          <template #buttons>
            <div class="wf-space-x-6 wf_flex">
              <WelfareMdButton
                label="조회 결과"
                button-type="liner"
                buttonSize="small"
                class="w-66 wf-mr--2 wf_color-button--blue"
                @onClick="handleSelectValue"
              />
            </div>
          </template>
        </DataTablePaginationWithCheckbox>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/exhibition/modal/exhibition-product-search-modal.css');
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>

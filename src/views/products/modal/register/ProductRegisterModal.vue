<script setup lang="ts">
import { registerOption, selectOptions, tableRegisterOptionTitleMock, warningList } from '@/assets'
import { HeaderModal, WelfareMdButton } from '@/components'
import { useProductModalRegister } from '@/composables/products/modal/register/useProductModalRegister'
import { useProductRegisterMultipleOptionModal } from '@/composables/products/modal/register/useProductRegisterMultipleOption'
import { useProductRegisterModalAction } from '@/composables/products/modal/register/useProductRegisterModalAction'
import { useProductRegisterSingleOptionModal } from '@/composables/products/modal/register/useProductRegisterSingleOptionModal'
import {
  ProductOptionsDeliveryInfo,
  ProductTypeRegisterOptionValue,
  ProductRegisterSingleOptionModel,
  ProductRegisterOptionPropsModel
} from '@/models/views/products'
import { ref, watch } from 'vue'
import { useProductRegisterOptional } from '@/composables/products/modal/register/useProductRegisterOptional'
import { useProductContentTableData } from '@/composables/products/modal/register/useProductContentTableData'
import ProductOptionalModal from '@/components/products/modal/register/optional/ProductOptionalModal.vue'
import ProductContentTable from '@/components/products/modal/register/ProductContentTable.vue'
import ProductMultipleOptionModal from '@/components/products/modal/register/ProductMultipleOptionModal.vue'
import ProductSingleOptionModal from '@/components/products/modal/register/ProductSingleOptionModal.vue'
import ProductTableLabel from '@/components/products/modal/register/ProductTableLabel.vue'

export interface Props {
  data?: ProductRegisterSingleOptionModel
}

type RegisterModelEmits = (
  e: 'callback',
  newValue: ProductOptionsDeliveryInfo[],
  checkDataMultiple?: boolean,
  typeOption?: ProductTypeRegisterOptionValue
) => void

const { data } = withDefaults(defineProps<Props>(), {
  data() {
    return registerOption
  }
})
const dataConvert = ref<ProductRegisterSingleOptionModel>(data)

const emits = defineEmits<RegisterModelEmits>()

const emitsEvent = {
  onData(newValue: ProductOptionsDeliveryInfo[], checkDataMultiple?: boolean, typeOption?: ProductTypeRegisterOptionValue) {
    emits('callback', newValue, checkDataMultiple, typeOption)
  }
}
const selectStep = ref<ProductTypeRegisterOptionValue>(data?.type ?? 'single')

const { closeModalByPop } = useProductModalRegister()

const optionsProps: ProductRegisterOptionPropsModel = {
  baseInfoType: data?.baseInfoType,
  productKey: data?.productKey,
  productRequestKey: data?.productRequestKey
}

const {
  handleValidateSingle,
  hasDataSingle,
  dataSingle,
  decreaseRow: decreaseRowSingle,
  increaseRow: increaseRowSingle
} = useProductRegisterSingleOptionModal(emitsEvent.onData, data?.dataTable, optionsProps)

const {
  handleValidateMultiple,
  hasDataMultiple,
  dataMultiple,
  decreaseRow: decreaseRowMultiple,
  increaseRow: increaseRowMultiple,
  checkOption,
  handleUpdateCheckOption
} = useProductRegisterMultipleOptionModal(emitsEvent.onData, data?.dataTable, data?.enableMultipleValue, optionsProps)
const {
  handleSubmit,
  dataOptional,
  decreaseRow,
  increaseRow,
  dataOptionalRequired,
  decreaseRowRequired,
  increaseRowRequired,
  decreaseRowData,
  dataOptionalData,
  handleMapData,
  handleCheckAll,
  deleteMultipleRecord,
  handleChangeDate,
  dataValue,
  hasDataOptional
} = useProductRegisterOptional(emitsEvent.onData, data?.dataTable, optionsProps)
const { handleClose, handleConfirm, indexData, productName, productRequestCode } = useProductRegisterModalAction(
  selectStep,
  handleValidateSingle,
  handleValidateMultiple,
  hasDataSingle,
  hasDataMultiple,
  hasDataOptional,
  handleSubmit,
  data?.baseInfoType
)

watch(
  () => productName,
  () => {
    dataConvert.value = {
        ...data,
        productCode: productRequestCode.value,
        productName: productName.value
    }
  },
  { deep: true }
)

const { contentTableData } = useProductContentTableData(dataConvert, data.optionShow ? selectOptions : selectOptions.slice(0, 2), selectStep)
</script>

<template>
   <div class="wf-manager-info wf-manager-info--custom">
    <HeaderModal :title="'옵션 등록'" @close-modal="closeModalByPop" />
    <div class="wf_body wf-manager-info--custom-max-height-optional wf-custom-scrollbar">
      <div class="wf_modal-popup-body wf_flex wf_flex-col">
        <ProductContentTable :content-table-data="contentTableData" :select-step="selectStep" />
        <ProductTableLabel
          :label="tableRegisterOptionTitleMock?.[indexData]"
          :note-label="warningList[indexData].label ?? ''"
          :content-list="warningList[indexData].contentList"
        />
        <ProductSingleOptionModal
          v-if="selectStep === 'single'"
          :data="dataSingle"
          @increase-row="increaseRowSingle"
          @decrease-row="decreaseRowSingle"
        />
        <ProductMultipleOptionModal
          v-else-if="selectStep === 'multiple'"
          :data="dataMultiple"
          :check-option="checkOption"
          @update-check-option="handleUpdateCheckOption"
          @increase-row="increaseRowMultiple"
          @decrease-row="decreaseRowMultiple"
        />
        <ProductOptionalModal
          v-else
          :data-optional="dataOptional"
          :data-optional-data="dataOptionalData"
          :data-optional-required="dataOptionalRequired"
          :data-value="dataValue"
          @increase-row="increaseRow"
          @decrease-row="decreaseRow"
          @increase-row-required="increaseRowRequired"
          @decrease-row-required="decreaseRowRequired"
          @decrease-row-data="decreaseRowData"
          @handle-map-data="handleMapData"
          @handle-check-all="handleCheckAll"
          @delete-multiple-record="deleteMultipleRecord"
          @handle-change-date="handleChangeDate"
        />
        <div class="wf_body-action">
          <WelfareMdButton label="닫기" buttonType="cancel" class="wf_w-120" @on-click="handleClose" />
          <WelfareMdButton label="저장" buttonType="default" class="wf_w-120" @on-click="handleConfirm" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/product/modal/register/product-modal-representative.css');
</style>

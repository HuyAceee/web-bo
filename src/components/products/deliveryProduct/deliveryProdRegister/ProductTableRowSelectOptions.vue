<script setup lang="ts">
import { WelfareMdButton, WelfareRadio } from '@/components'
import { useProductModalRegister } from '@/composables/products/modal/register/useProductModalRegister'
import { ProductOptionsDeliveryInfo, ProductRegisterValueOptionType, ProductTypeRegisterOptionValue } from '@/models'

export interface ProductTableRowSelectOptionsProps {
  valueOption: ProductRegisterValueOptionType
  typeRegisterOption: ProductTypeRegisterOptionValue
  valueType: ProductOptionsDeliveryInfo[]
  dataMultipleValue?: boolean
  isShowOption?: boolean
  baseInfoType?: string
  productKey?: number
  productRequestKey?: number
  productCode?: string
  productName?: string
}

interface ProductTableRowSelectOptionsEmits {
  (e: 'update-value-type', newValue: ProductOptionsDeliveryInfo[], valueMultiple?: boolean, typeOption?: ProductTypeRegisterOptionValue): void

  (e: 'update-value-option', newValue: ProductRegisterValueOptionType): void
}

const props = defineProps<ProductTableRowSelectOptionsProps>()

const emit = defineEmits<ProductTableRowSelectOptionsEmits>()

const { onShowModal } = useProductModalRegister()

const handleData = (value: ProductOptionsDeliveryInfo[], valueMultiple?: boolean, typeOption?: ProductTypeRegisterOptionValue) => {
  emit('update-value-type', value, valueMultiple, typeOption)
}

const handleValueOption = (value: ProductRegisterValueOptionType) => {
  emit('update-value-option', value)
}
</script>

<template>
  <table class="table-row-layout wf-mt-20" aria-hidden="true">
    <caption></caption>
    <tbody>
      <tr>
        <td class="table-row-149">상품 옵션<span class="wf_text-sub-01"> *</span></td>
        <td class="table-row-550 table-p-12">
          <div class="wf_flex wf_flex-1">
            <WelfareRadio
              :model-value="props.valueOption"
              @update:model-value="handleValueOption"
              :value="ProductRegisterValueOptionType.use"
              label="사용"
              name="radio-la-sm"
              size="sm"
            />
            <WelfareRadio
              :model-value="props.valueOption"
              class="wf-ml-19"
              @update:model-value="handleValueOption"
              :value="ProductRegisterValueOptionType.notUsed"
              label="사용 안함"
              name="radio-la-sm"
              size="sm"
            />
          </div>
        </td>
        <td>옵션 등록<span class="wf_text-sub-01"> *</span></td>
        <td class="table-row-549 table-p-6">
          <div class="row-between">
            <WelfareMdButton
              label="옵션 등록하기"
              buttonType="liner"
              @click="
                onShowModal(
                  {
                    productCode: $props.productCode ?? '',
                    productName: $props.productName ?? '',
                    type: $props.typeRegisterOption,
                    dataTable: $props.valueType.length ? $props.valueType : undefined,
                    enableMultipleValue: dataMultipleValue,
                    optionShow: isShowOption,
                    baseInfoType: $props?.baseInfoType,
                    productKey: $props?.productKey,
                    productRequestKey: $props?.productRequestKey
                  },
                  handleData
                )
              "
              :disabled="props.valueOption === ProductRegisterValueOptionType.notUsed"
              buttonSize="small"
            />
            <p class="text-row-2-warning">*버튼을 클릭하면 상세 옵션을 설정할 수 있습니다.</p>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/deliveryProdRegister/product-delivery-prod-register.css');
</style>

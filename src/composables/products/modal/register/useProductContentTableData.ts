import ProductGroupOption from '@/components/products/modal/register/ProductGroupOption.vue'
import { ProductTypeRegisterOptionValue, ProductRegisterSingleOptionModel, ProductSelectOptionModel } from '@/models'
import { Ref, computed } from 'vue'

export const useProductContentTableData = (
  data: Ref<ProductRegisterSingleOptionModel>,
  selectOptions: ProductSelectOptionModel[],
  selectStep: Ref<ProductTypeRegisterOptionValue>
) => {
  const contentTableData = computed(() => [
    {
      label: '상품 ID',
      isProductCode: true,
      content: data.value.productCode,
      classNameContent: 'wf-pb-1'
    },
    {
      label: '상품명',
      content: data.value?.productName,
      className: 'wf_h-45'
    },
    {
      label: '옵션 여부 ',
      required: true,
      element: ProductGroupOption,
      props: {
        selectOptions,
        selectStep,
        type: data?.value?.type
      },
      className: 'wf_h-43',
      classNameContent: 'wf-pt-1'
    }
  ]
  )
  return { contentTableData }
}

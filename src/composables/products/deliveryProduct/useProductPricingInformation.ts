import { isInteger } from '@/common/validation'
import { useModalNotification } from '@/composables/widgets'
import { ProductPricingInformationProps, ProductSalesTax } from '@/models'
import { computed } from 'vue'

export const useProductPricingInformation = (props: ProductPricingInformationProps) => {
  const { openModal } = useModalNotification()
  const compute = computed(() => {
    return {
      productMargin: (getRatio(props?.tax) * (Number(props?.sellingPrice) * Number(props?.marginRate))) / 100 || 0,
      contractMargin: (getRatio(props?.tax) * (Number(props?.sellingPrice) * Number(props?.contractMarginRate))) / 100 || 0
    }
  })

  const getRatio = (_case?: any) => {
    if (_case === ProductSalesTax.TAXATION) return 11 / 12
    return 1
  }

  const acceptNumber = (event: KeyboardEvent) => {
    if (!isInteger(event.key)) {
      openModal({ content: '숫자만 입력 해주세요.' })
      ;(document.activeElement as HTMLInputElement).blur()
      event.preventDefault()
    }
  }

  const acceptMaxMarginRate = (event: KeyboardEvent) => {
    if (Number(`${(<HTMLInputElement>event.target).value}${event.key}`) > (props?.contractMarginRate as number)) {
      openModal({ content: '계약 마진율보다 높게 입력할 수 없습니다.' })
      ;(document.activeElement as HTMLInputElement).blur()
      event.preventDefault()
    }
  }

  return { props, compute, acceptNumber, acceptMaxMarginRate }
}

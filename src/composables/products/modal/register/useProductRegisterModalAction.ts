import { useModalConfirm } from '@/composables/widgets'
import { ProductTypeRegisterOptionValue } from '@/models'
import { ProductApprovalTicketItemOptionDetailRequest } from '@/models/services/requests/products/approval/ProductApprovalTicketItemOptionDetailRequest'
import { ProductDetailOptionPopupInfoRequest } from '@/models/services/requests/products/ticket/ProductIssuedInfoRequest'
import { productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'
import { productTicketDetailInfoApi } from '@/services/api/products/tickets/ProductTicketDetailInfoApi'
import { ComputedRef, Ref, computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export const useProductRegisterModalAction = (
  selectStep: Ref<ProductTypeRegisterOptionValue>,
  handleValidateSingle: () => void,
  handleValidateMultiple: () => void,
  hasDataSingle: ComputedRef<boolean>,
  hasDataMultiple: ComputedRef<boolean>,
  hasDataOptional: ComputedRef<boolean>,
  handleSubmit: () => void,
  baseInfoType?: string
) => {
  const route = useRoute()
  const { closeModalByPop } = useModalConfirm()
  const { openModal: openModalCancel, closeModalByPop: closeModalByPopCancel } = useModalConfirm()
  const productRequestKeyRoute = route?.query?.productRequestKey
  const code = route?.query?.code
  const classification = route?.query?.classification
  const productRequestCode = ref<string>('')
  const productName = ref<string>('')

  const handleConfirm = () => {
    switch (selectStep.value) {
      case 'single':
        return handleValidateSingle()
      case 'multiple':
        return handleValidateMultiple()
      case 'optional':
        return handleSubmit()
      default:
        return handleValidateSingle()
    }
  }

  const handleClose = () => {
    const isInvalid =
      selectStep.value === 'single' ? hasDataSingle.value : selectStep.value === 'multiple' ? hasDataMultiple.value : hasDataOptional.value
    if (isInvalid) {
      openModalCancel?.({
        content: '변경사항이 저장되지 않습니다. 닫으시겠습니까?',
        onConfirm() {
          closeModalByPopCancel?.()
          closeModalByPop?.()
        }
      })
      return
    }
    closeModalByPop?.()
  }

  const getItemRequestDetailPopupInfo = () => {
    const request: ProductApprovalTicketItemOptionDetailRequest = { productReqeustKey: Number(productRequestKeyRoute) }
    productTicketDetailInfoApi
      .getItemRequestDetailOptionPopupInfo(request)
      .then((res) => {
        const data = res.data
        productRequestCode.value = data.productReqeustCode
        productName.value = data.productName
      })
      .catch(() => {
        // show error
      })
  }

  const getItemDetailPopupInfo = () => {
    const request: ProductDetailOptionPopupInfoRequest = { productKey: classification as string, productCode: code as string }
    productTicketDetailInfoApi
      .getItemDetailOptionPopupInfo(request)
      .then((res) => {
        const data = res.data
        productRequestCode.value = data.productCode
        productName.value = data.productName
      })
      .catch(() => {
        // show error
      })
  }

  const indexData = computed(() => {
    return selectStep.value === 'single' ? 0 : selectStep.value === 'multiple' ? 1 : 2
  })

  const enabledOption = computed(() => {
    if (selectStep.value === 'single') return hasDataSingle.value
    return hasDataMultiple.value
  })

  onMounted(() => {
    if (baseInfoType === productBaseInfoType.ticket && classification && code) {
      getItemDetailPopupInfo()
    } else if (baseInfoType === productBaseInfoType.approval_ticket || productRequestKeyRoute) {
      console.log('gdggggg')

      getItemRequestDetailPopupInfo()
    }
  })

  return { handleConfirm, handleClose, indexData, enabledOption, productName, productRequestCode }
}

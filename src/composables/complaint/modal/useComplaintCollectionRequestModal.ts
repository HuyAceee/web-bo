import { ConfirmModalProps, WelfareSelectOptionType } from '@/models'
import { ref } from 'vue'

export const useComplaintCollectionRequestModal = (props: ConfirmModalProps) => {
  const complainCollectionRequestCompanyData: WelfareSelectOptionType[] = [
    { label: '택배사 선택', value: '1' },
    { label: '택배사 선택', value: '2' }
  ]

  const deliveryCompany = ref()
  const invoiceNumber = ref()

  const handleConfirm = () => {
    if (deliveryCompany.value && invoiceNumber.value) {
      props.onConfirm?.()
    } else {
      props.onCancel?.()
    }
  }

  return {
    handleConfirm,
    complainCollectionRequestCompanyData,
    deliveryCompany,
    invoiceNumber
  }
}

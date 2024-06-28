import { emptyAddress } from '@/common'
import { ConfirmModalProps, WelfareSelectOptionType } from '@/models'
import { useForm } from 'vee-validate'
import { ref } from 'vue'

export const useComplaintAddressChangeModal = (props: ConfirmModalProps) => {
  const noteOptions: WelfareSelectOptionType[] = [
    { label: '직접입력', value: '1' },
    { label: '직접입력', value: '2' }
  ]
  const emptyForm = {
    customerAddress: emptyAddress,
    recipientName: '',
    phoneNumber: '',
    contact: '',
    note: ''
  }

  const deliveryCompany = ref('')
  const invoiceNumber = ref('')
  const customerAddressRef = ref()

  const { values, errors, setFieldValue, resetForm } = useForm({
    initialValues: emptyForm
  })


  const handleConfirm = () => {
    if (!errors) {
      props.onConfirm?.()
    } else {
      props.onCancel?.()
    }
  }


  return {
    handleConfirm,
    deliveryCompany,
    invoiceNumber,
    customerAddressRef,
    values,
    errors,
    setFieldValue,
    resetForm,
    noteOptions
  }
}

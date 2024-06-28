import { execDaumPostcode, handleClickOutsideIframe, mountDaumCode } from '@/common'
import { AddressModel, FormAddressEmits, FormAddressProps } from '@/models'
import { onMounted, ref, watch } from 'vue'

export const useFormSearchAddress = (props: FormAddressProps, emits: FormAddressEmits) => {
  const wfDaumLayer = ref()

  const postcode = ref(props.modelValue.zipCode ?? '')
  const address = ref(props.modelValue.loadNameAddress ?? '')
  const detailAddress = ref(props.modelValue.detailedAddress ?? '')
  const extraAddress = ref(props.modelValue.loadLotBasedAddress ?? '')

  const isDisplayIframe = ref(false)

  watch(detailAddress, (newDetailAddress) => {
    emits('update:modelValue', {
      ...props.modelValue,
      detailedAddress: newDetailAddress
    })
  })

  const onSearchComplete = (data: AddressModel) => {
    postcode.value = data.zipCode
    address.value = data.loadNameAddress
    extraAddress.value = data.loadLotBasedAddress
    emits('update:modelValue', {
      ...props.modelValue,
      zipCode: data.zipCode,
      detailedAddress: '',
      loadNameAddress: data.loadNameAddress,
      loadLotBasedAddress: data.loadLotBasedAddress
    })
  }

  watch(postcode, () => {
    detailAddress.value = ''
  })

  watch(
    () => props.modelValue,
    (addressProps) => {
      postcode.value = addressProps.zipCode
      address.value = addressProps.loadNameAddress
      detailAddress.value = addressProps.detailedAddress
      extraAddress.value = addressProps.loadLotBasedAddress
    }
  )
  onMounted(() => {
    mountDaumCode()
  })

  const updateDetailAddress = (e: string) => {
    detailAddress.value = e
  }
  const closeDaumPostcode = () => {
    wfDaumLayer.value.style.display = 'none'
    isDisplayIframe.value = false
  }

  const handleClickOutside = (event: Event) => {
    handleClickOutsideIframe(closeDaumPostcode, wfDaumLayer, event)
  }

  const handleExecDaumPostcode = () => {
    execDaumPostcode(wfDaumLayer, isDisplayIframe, onSearchComplete)
  }
  return {
    closeDaumPostcode,
    wfDaumLayer,
    postcode,
    address,
    detailAddress,
    extraAddress,
    handleClickOutside,
    isDisplayIframe,
    handleExecDaumPostcode,
    updateDetailAddress
  }
}

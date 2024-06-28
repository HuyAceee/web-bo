import { useModal, useUploadFile } from '@/composables/common'
import { ProductRegisterFileEmits, ProductRegisterFileProps, ProductImageType } from '@/models'
import { ref } from 'vue'

export const useProductsRegisterImage = (props: ProductRegisterFileProps, emits: ProductRegisterFileEmits) => {
  const { handleFileChange, handleValidFile } = useUploadFile()
  const defaultValue = ref(props?.name ?? '')
  const altText = ref(props?.alt ?? '')
  const fileUpload = ref(null)
  const { closeModalByPop } = useModal()

  const handleChooseImage = () => {
    handleFileChange('image', (data: any) => {
      if (data === 'ERROR') {
        return
      }
      defaultValue.value = data.file.name
      fileUpload.value = data.file
    })
  }

  const handleChangeAlt = (value: string) => {
    altText.value = value
  }

  const checkValidImage = (checkTypeImage: ProductImageType) => {
    handleValidFile(fileUpload.value, altText.value, 'image', checkTypeImage, (data: any) => {
      if (data === 'ERROR') {
        return
      }
      emits('get-file', data)
      closeModalByPop?.()
    }, props.type)
  }

  return {
    defaultValue,
    altText,
    closeModalByPop,
    handleChooseImage,
    checkValidImage,
    handleChangeAlt
  }
}

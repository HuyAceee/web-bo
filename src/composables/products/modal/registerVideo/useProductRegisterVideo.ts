import { useModal, useUploadFile } from '@/composables/common'
import { ProductRegisterFileEmits, ProductRegisterFileProps, ProductSelectDefinitionType } from '@/models'
import { ref } from 'vue'

export const useProductRegisterVideo = (props: ProductRegisterFileProps, emits: ProductRegisterFileEmits) => {
  const { handleFileChange, handleValidFile } = useUploadFile()
  const defaultValue = ref(props.name)
  const altVideoNameRef = ref(props.alt)
  const fileUpload = ref(null)
  const { closeModalByPop } = useModal()
  const handleChooseVideo = () => {
    handleFileChange('video', (data: any) => {
      if (data === 'ERROR') {
        return
      }
      defaultValue.value = data.file.name
      fileUpload.value = data.file
    })
  }

  const checkValidVideo = () => {
    handleValidFile(
      fileUpload.value,
      altVideoNameRef.value ?? '',
      'video',
      '',
      (data: any) => {
        if (data === 'ERROR') {
          return
        }
        emits('get-file', data)
        closeModalByPop?.()
      },
      props.type ?? ProductSelectDefinitionType.PRODUCT
    )
  }

  return {
    closeModalByPop,
    defaultValue,
    handleChooseVideo,
    checkValidVideo,
    altVideoNameRef
  }
}

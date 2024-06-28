import { useUploadFile } from '@/composables/common'
import { ProductRegisterFileEmits, ProductRegisterFileProps } from '@/models'

export const useCompanyUploadHandleFile = (props: ProductRegisterFileProps, emits: ProductRegisterFileEmits) => {
  const { handleFileChange, handleValidFile } = useUploadFile()
  const handleChooseFile = () => {
    handleFileChange('document', (data: any) => {
      if (data === 'ERROR') {
        return
      }
      handleValidFile(data.file, '', 'document', '', (data: any) => {
        if (data === 'ERROR') {
          return
        }
        emits('get-file', data)
      })
    })
  }

  return {
    handleChooseFile
  }
}

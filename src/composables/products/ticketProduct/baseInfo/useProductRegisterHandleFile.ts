import { ProductRepresentativeProps } from '@/models'
import { reactive, ref } from 'vue'

export const useProductRegisterHandleFile = (props: ProductRepresentativeProps) => {
  const indexChange = ref<number>(0)
  const dataTable = reactive(props.dataTable)
  const getFile = (value: any) => {
    dataTable.splice(indexChange.value, 1, {
      file: value?.file,
      name: value?.file?.name,
      url: value?.url,
      alt: value?.alt,
      newData: value?.newData
    })

    props.onUpdateNewImage?.(value.newData, indexChange.value, value?.alt)
  }
  const deleteFile = () => {
    dataTable.splice(indexChange.value, 1, {
      name: '',
      url: '',
      alt: ''
    })
  }
  return { getFile, deleteFile, indexChange }
}

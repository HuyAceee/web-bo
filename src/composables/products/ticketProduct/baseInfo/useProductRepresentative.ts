import { ProductRepresentativeProps, ProductTicketFileType } from '@/models'
import { Ref, ref } from 'vue'
import { OnShowModalArgModel } from './useProductModalChangeImage'

export const useProductRepresentative = (
  props: ProductRepresentativeProps,
  onShowModal: ({ name, events }: OnShowModalArgModel) => void,
  onShowModalVideo: ({ name, events }: OnShowModalArgModel) => void,
  onShowModalDelete: (type: ProductTicketFileType) => void,
  indexChange: Ref<number>,
  getFile: (value: any) => void
) => {
  const imageChecked = ref<number>(0)
  const onRegisterFileModal = (index: number) => {
    if (props.typeFile === 'img') {
      onShowModal({ name: props.dataTable[index]?.name, events: { getFile } })
    } else {
      onShowModalVideo({ name: props.dataTable[index]?.name, events: { getFile } })
    }
    indexChange.value = index
  }

  const onDeleteFileModal = (index: number, type: ProductTicketFileType) => {
    onShowModalDelete(type)
    indexChange.value = index
  }

  const disabledDeleteBtn = (index: number, url: string) => {
    return props.typeFile === 'img' ? index === imageChecked.value || !url : !url
  }

  return {
    onRegisterFileModal,
    onDeleteFileModal,
    imageChecked,
    disabledDeleteBtn
  }
}

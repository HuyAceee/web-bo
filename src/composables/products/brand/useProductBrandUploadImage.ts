import { useModal } from '@/composables/common'
import ProductRegisterImageBrandModal from '@/views/products/modal/registerFile/ProductRegisterImageBrandModal.vue'

export const useProductBranchUploadImage = () => {
  const { showModal, closeModalByPop } = useModal()

  const openModal = (options: { name?: any; getFile?: (value: any) => void }) => {
    showModal?.({
      component: ProductRegisterImageBrandModal,
      props: {
        onClose: () => {
          closeModalByPop?.()
        },
        name: options.name
      },
      events: {
        getFile: options.getFile
          ? options.getFile
          : () => {
              // console.log(value)
            }
      }
    })
  }

  return { openModal, closeModalByPop }
}

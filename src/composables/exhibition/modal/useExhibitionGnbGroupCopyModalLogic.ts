import { computed, ref } from 'vue'
import {
  ExhibitionGnbGroupCopyDetailModalModel,
  ExhibitionGnbGroupCopyModalProps,
  exhibitionGnbGroupDefaultFakeData
} from '@/models/views/exhibition/modal/ExhibitionGnbGroupCopyModalModel'
import { useCheckBoxTable, useModalConfirm, useModalNotification } from '@/composables'

export const useExhibitionGnbGroupCopyModalLogic = (props: ExhibitionGnbGroupCopyModalProps) => {
  const gnbGroupDetail = ref<ExhibitionGnbGroupCopyDetailModalModel>(exhibitionGnbGroupDefaultFakeData)
  const { openModal } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()

  const listIdCustomerCompany = computed(() => {
    return gnbGroupDetail.value?.targetCustomers?.map((item) => item.id?.toString()) ?? []
  })

  const listIdParentCategory = computed(() => {
    return gnbGroupDetail.value?.topCategoryList?.map((item) => item.id?.toString()) ?? []
  })

  const listIdSubCategory = computed(() => {
    return gnbGroupDetail.value?.subCategoryList?.map((item) => item.id?.toString()) ?? []
  })

  const customerCompanyListCheckBox = useCheckBoxTable(listIdCustomerCompany)
  const parentCategoryListCheckBox = useCheckBoxTable(listIdParentCategory)
  const subCategoryListCheckBox = useCheckBoxTable(listIdSubCategory)

  const onCancelPopup = () => {
    openModalConfirm({
      content: '입력 내용이 있습니다. 창을 닫으시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        props.onCancel?.()
      }
    })
  }

  const onConfirm = () => {
    if (
      customerCompanyListCheckBox.listChecked.value?.length &&
      parentCategoryListCheckBox.listChecked.value?.length &&
      subCategoryListCheckBox.listChecked.value?.length &&
      gnbGroupDetail.value.customerKey
    ) {
      const hasEmptySubcategoryName = gnbGroupDetail.value.subCategoryList.some((item) => !item.subcategoryName)

      if (hasEmptySubcategoryName) {
        openModal({ content: '필수입력 값을 입력하세요.' })
      } else {
        openModalConfirm({
          content: '저장하시겠습니까?',
          onConfirm: () => {
            closeModalByPop?.()
            openModal({
              content: '저장되었습니다',
              onAccept: () => {
                closeModalByPop?.()
                props.onCancel?.()
              }
            })
          }
        })
      }
    } else {
      openModal({ content: '필수입력 값을 입력하세요.' })
    }
  }

  return {
    gnbGroupDetail,
    customerCompanyListCheckBox,
    parentCategoryListCheckBox,
    subCategoryListCheckBox,
    onCancelPopup,
    onConfirm
  }
}

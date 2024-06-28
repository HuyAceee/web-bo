import { exhibitionBannerGroupRegistrationModalApi } from '@/services/api/exhibition/ExhibitionBannerGroupRegistrationModalApi'

import { computed, ref, watch } from 'vue'
import {
  exhibitionBannerApplyChannelType,
  ExhibitionBannerExcludeCustomerModel,
  ExhibitionBannerGroupDetailModel,
  ExhibitionBannerGroupModalModalProps,
  exhibitionBannerGroupUseYnType
} from '@/models/views/exhibition/modal/ExhibitionBannerGroupRegistrationModalModel'
import { useCheckBoxTable, useModalConfirm, useModalNotification } from '@/composables'
import { useProductModalSearchWithTable } from '@/composables/products/modal/modalSearch/useProductModalSearchWithTable'
import { ProductSearchType } from '@/models'
import { DeliverySellerAndCustomerSearchTableModel } from '@/models/views/delivery/modal/DeliverySellerAndCustomerSearchModel'
import { ExhibitionBannerDetailModalRequest } from '@/models/services/requests/exhibition/ExhiibitionGnbGroupRequest'

export const useExhibitionBannerGroupRegistrationModalLogic = (props: ExhibitionBannerGroupModalModalProps) => {
  const bannerDetail = ref<ExhibitionBannerGroupDetailModel>({
    bannerGroupKey: '',
    bannerGroupName: '',
    bannerGroupUseYn: exhibitionBannerGroupUseYnType[0].value,
    applyChannelType: exhibitionBannerApplyChannelType[0].value,
    createdByName: '',
    createdDate: '',
    lastModifiedByName: '',
    lastModifiedDate: ''
  })
  const refTable = ref()

  const { openModal: openModalCustomer } = useProductModalSearchWithTable()
  const { openModal } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()

  const bannerExcludeList = ref<ExhibitionBannerExcludeCustomerModel[]>([])

  const getBannerDetail = () => {
    if (props.bannerGroupKey) {
      exhibitionBannerGroupRegistrationModalApi.getDetail(props.bannerGroupKey).then((data) => {
        if (data.data) {
          bannerDetail.value = data.data
        }
      })
    }
  }

  const getExcludeBannerDetail = () => {
    if (props.bannerGroupKey) {
      exhibitionBannerGroupRegistrationModalApi.getExcludeDetail(props.bannerGroupKey).then((data) => {
        if (data.data) {
          bannerExcludeList.value = data.data?.map((item) => {
            return {
              ...item,
              id: item.customerKey
            }
          })
        }
      })
    }
  }

  const listId = computed(() => {
    return bannerExcludeList.value?.map((item) => item?.id?.toString() ?? '') ?? []
  })

  const { listChecked, onRowSelected, onSelectAllChange, clearChecked } = useCheckBoxTable(listId)

  const getCustomerSelect = (value: DeliverySellerAndCustomerSearchTableModel) => {
    if (!bannerExcludeList.value?.find((item) => item.customerKey === value.customerKey)) {
      clearAllChecked()
      bannerExcludeList.value = [
        {
          id: value.customerKey,
          customerKey: value.customerKey,
          customerName: value.name
        },
        ...bannerExcludeList.value
      ]
    }
  }

  const clearAllChecked = () => {
    clearChecked()
    refTable.value?.clearCheckAll?.()
  }

  const deleteCustomer = (id?: string) => {
    if (id) {
      bannerExcludeList.value = bannerExcludeList.value.filter((item) => String(item.customerKey) !== String(id))
      clearAllChecked()
    } else {
      if (listChecked.value.length > 0) {
        bannerExcludeList.value = bannerExcludeList.value.filter(
          (item) => !listChecked.value.some((id) => id.toString() === item.customerKey?.toString())
        )
        clearAllChecked()
      } else {
        openModal({ content: '선택된 고객사가 없습니다.' })
      }
    }
  }

  const handleUpdate = () => {
    if (bannerDetail.value.bannerGroupKey) {
      const bodyToPut: ExhibitionBannerDetailModalRequest = {
        bannerGroupKey: bannerDetail.value.bannerGroupKey,
        bannerGroupUseYn: bannerDetail.value.bannerGroupUseYn,
        bannerGroupName: bannerDetail.value.bannerGroupName,
        applyChannelType: bannerDetail.value.applyChannelType,
        excludeCustomerCreateRequestList: bannerExcludeList.value?.map((item) => {
          return { customerKey: item.customerKey }
        })
      }
      exhibitionBannerGroupRegistrationModalApi
        .putBannerDetail(bodyToPut)
        .then(() => {
          getBannerDetail()
          getExcludeBannerDetail()
          clearAllChecked()
          openModal({
            content: '저장되었습니다',
            onAccept() {
              props.onCancel?.()
              props.onCancel?.()
              props.onSelect?.()
            }
          })
        })
        .catch(() => {})
    } else {
      const bodyToPost: ExhibitionBannerDetailModalRequest = {
        bannerGroupUseYn: bannerDetail.value.bannerGroupUseYn,
        bannerGroupName: bannerDetail.value.bannerGroupName,
        applyChannelType: bannerDetail.value.applyChannelType,
        excludeCustomerCreateRequestList: bannerExcludeList.value?.map((item) => {
          return { customerKey: item.customerKey }
        })
      }
      exhibitionBannerGroupRegistrationModalApi
        .postBannerDetail(bodyToPost)
        .then(() => {
          getBannerDetail()
          getExcludeBannerDetail()
          clearAllChecked()
          openModal({
            content: '저장되었습니다',
            onAccept() {
              props.onCancel?.()
              props.onCancel?.()
              props.onSelect?.()
            }
          })
        })
        .catch(() => {})
    }
  }

  const updateBannerDetail = () => {
    if (!bannerDetail.value.bannerGroupUseYn && !bannerDetail.value.applyChannelType && !bannerDetail.value.bannerGroupName) {
      openModal({ content: '필수입력 값을 입력하세요.' })
      return
    }
    openModalConfirm({
      content: '저장하시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        handleUpdate()
      }
    })
  }

  const onOpenModalCustomer = () => {
    openModalCustomer(ProductSearchType.CUSTOMER, getCustomerSelect)
  }

  const onCancelPopup = () => {
    openModalConfirm({
      content: '입력 내용이 있습니다. 창을 닫으시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        props.onCancel?.()
      }
    })
  }

  watch(
    () => props.bannerGroupKey,
    () => {
      getBannerDetail()
      getExcludeBannerDetail()
    },
    { immediate: true }
  )

  return {
    bannerDetail,
    bannerExcludeList,
    listChecked,
    onRowSelected,
    onSelectAllChange,
    onOpenModalCustomer,
    deleteCustomer,
    refTable,
    updateBannerDetail,
    onCancelPopup
  }
}

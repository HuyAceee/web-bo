import { exhibitionGnbManagementApi } from '@/services/api/exhibition/ExhibitionGnbManagementApi'
import { computed, reactive, Ref, ref, watch } from 'vue'
import {
  ExhibitionChooseDateTimeModel,
  exhibitionDefaultValueGnbReservationGroup,
  ExhibitionGnbDataKeyModel,
  ExhibitionGnbGroupListTableModel,
  ExhibitionGnbReservationManagementProps,
  ExhibitionGnbReservationTableModel,
  ExhibitionHandleChooseDateTimeParams
} from '@/models/views/exhibition/exhibitionGnbManagement/ExhibitionGnbManagementModel'
import { useCheckBoxTable, useModalConfirm, useModalNotification } from '@/composables'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { cloneArray, datePickerNotification, FORMAT_DATE_YYYYMMDD, formatTime, replaceDashRegex } from '@/common'
import { ExhibitionGnbLinkType } from '@/models/views/exhibition/modal/ExhibitionCornerConnectionModalModel'
import { YnOptions } from '@/models'
import { ExhibitionGnbReservationListRequest } from '@/models/services/requests/exhibition/ExhiibitionGnbGroupRequest'

export const useExhibitionGnbReservationManagement = (props: ExhibitionGnbReservationManagementProps, setHasData: (value: boolean) => void) => {
  const gnbGroupList = ref<ExhibitionGnbReservationTableModel[]>([])
  const totalItem = ref<number>(0)
  const itemsSelected = ref<ExhibitionGnbGroupListTableModel | undefined>()
  const { openModal } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()
  const isNewRow = ref<boolean>(false)
  const loading = ref<boolean>(false)
  const isSelectedAll = ref<boolean>(false)
  const oldData = ref<ExhibitionGnbReservationTableModel[]>([])

  const listId = computed(() => {
    return gnbGroupList.value?.map((item: any) => item.id) ?? []
  })

  const { listChecked, onRowSelected, onSelectAllChange, clearChecked } = useCheckBoxTable(listId)

  watch(
    () => listChecked.value,
    (newValue) => {
      if (newValue.length) {
        isSelectedAll.value = newValue.length === listId.value.length
      } else {
        isSelectedAll.value = false
      }
    }
  )

  const onSelectAll = () => {
    onSelectAllChange(!isSelectedAll.value)
  }
  const getDataGroupGnb = () => {
    if (props.gnbGroupSelect?.gnbGroupKey) {
      loading.value = true
      if (props.typeGnbCustomer) {
        exhibitionGnbManagementApi
          .getGnbReservationGroupCustomerList(props.gnbGroupSelect.gnbGroupKey)
          .then((res) => {
            gnbGroupList.value = [...res.data]
            oldData.value = cloneArray(res.data)
            totalItem.value = res.totalItems
            loading.value = false
            isNewRow.value = false
            setHasData(res.data?.length > 0)
          })
          .catch(() => {
            loading.value = false
          })
      } else {
        exhibitionGnbManagementApi
          .getGnbReservationGroupList(props.gnbGroupSelect.gnbGroupKey)
          .then((res) => {
            gnbGroupList.value = [...res.data]
            oldData.value = cloneArray(res.data)
            totalItem.value = res.totalItems
            loading.value = false
            isNewRow.value = false
            setHasData(res.data?.length > 0)
          })
          .catch(() => {
            loading.value = false
          })
      }
    }
  }

  const resetValue = () => {
    clearChecked()
    gnbGroupList.value = []
    getDataGroupGnb()
  }

  const selectedRow = (event: DataTableRowClickEvent) => {
    itemsSelected.value = event.data
  }

  const addNewRow = () => {
    if (props.gnbGroupSelect?.gnbGroupKey) {
      if (!isNewRow.value) {
        isNewRow.value = true
        gnbGroupList.value = [
          {
            ...exhibitionDefaultValueGnbReservationGroup,
            gnbGroupKey: props.gnbGroupSelect.gnbGroupKey
          },
          ...(gnbGroupList?.value || [])
        ]
      } else {
        openModal({ content: '비어있는 행 연속 추가 불가.' })
      }
    }
  }

  const submitNewGnbGroup = () => {
    const arrayCompare = exhibitionCompareElementChangeArray(gnbGroupList.value, oldData.value)
    if (arrayCompare.length) {
      const hasMissingField = arrayCompare?.some((newItem) => {
        const checkTypeValue = () => {
          switch (newItem.linkType) {
            case ExhibitionGnbLinkType.LINK_URL:
            case ExhibitionGnbLinkType.EXTERNAL:
              return !!newItem.linkUrl
            case ExhibitionGnbLinkType.NO_LINK:
              return true
            case ExhibitionGnbLinkType.EXHIBITION:
              return !!newItem.linkExhibitionKey
            case ExhibitionGnbLinkType.PROMOTION:
              return !!newItem.linkPromotionKey
            case ExhibitionGnbLinkType.PRODUCT:
              return !!newItem.linkProductKey
            case ExhibitionGnbLinkType.EVENT:
              return !!newItem.linkEventKey
            default:
              return false
          }
        }

        const checkSubTitleUse = () => {
          switch (newItem.subTitleUseYn) {
            case YnOptions.Y:
              return !!newItem.subTitleName
            case YnOptions.N:
              return true
            default:
              return false
          }
        }

        return (
          !newItem.gnbGroupKey ||
          !newItem.displayYn ||
          !newItem.mainTitleName ||
          !newItem.linkType ||
          !checkTypeValue() ||
          !newItem.subTitleUseYn ||
          !checkSubTitleUse() ||
          !newItem.displayStartDate ||
          !newItem.displayStartTime ||
          !newItem.displayEndDate ||
          !newItem.displayEndTime
        )
      })

      if (hasMissingField) {
        openModal?.({
          buttonLabel: '확인',
          content: '필수입력 값을 입력하세요.'
        })
        return
      }

      let newItemSubmit: ExhibitionGnbReservationListRequest | null = null

      const newValuePuts = arrayCompare
        ?.map((newItem) => {
          if (!newItem.gnbDisplayKey) {
            newItemSubmit = {
              gnbGroupKey: newItem.gnbGroupKey,
              displayYn: newItem.displayYn,
              mainTitleName: newItem.mainTitleName,
              linkType: newItem.linkType,
              linkUrl: newItem.linkUrl,
              linkExhibitionKey: newItem.linkExhibitionKey,
              linkEventKey: newItem.linkEventKey,
              linkProductKey: newItem.linkProductKey,
              linkPromotionKey: newItem.linkPromotionKey,
              subTitleUseYn: newItem.subTitleUseYn,
              subTitleName: newItem.subTitleName,
              displayStartDate: formatTime(newItem.displayStartDate, FORMAT_DATE_YYYYMMDD),
              displayStartTime: newItem.displayStartTime?.replace(':', ''),
              displayEndDate: formatTime(newItem.displayEndDate, FORMAT_DATE_YYYYMMDD),
              displayEndTime: newItem.displayEndTime?.replace(':', '')
            }
            return null
          }
          return {
            gnbGroupKey: newItem.gnbGroupKey,
            gnbDisplayKey: newItem.gnbDisplayKey,
            displayYn: newItem.displayYn,
            mainTitleName: newItem.mainTitleName,
            linkType: newItem.linkType,
            linkUrl: newItem.linkUrl,
            linkExhibitionKey: newItem.linkExhibitionKey,
            linkEventKey: newItem.linkEventKey,
            linkProductKey: newItem.linkProductKey,
            linkPromotionKey: newItem.linkPromotionKey,
            subTitleUseYn: newItem.subTitleUseYn,
            subTitleName: newItem.subTitleName,
            displayStartDate: formatTime(newItem.displayStartDate, FORMAT_DATE_YYYYMMDD),
            displayStartTime: newItem.displayStartTime?.replace(':', ''),
            displayEndDate: formatTime(newItem.displayEndDate, FORMAT_DATE_YYYYMMDD),
            displayEndTime: newItem.displayEndTime?.replace(':', '')
          }
        })
        .filter((item) => item !== null) as ExhibitionGnbReservationListRequest[]

      openModalConfirm({
        content: '저장하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          if (newItemSubmit) {
            if (props.typeGnbCustomer) {
              exhibitionGnbManagementApi
                .postNewGnbCustomerReservationGroup(newItemSubmit)
                .then(() => {
                  if (!newValuePuts.length) {
                    resetValue()
                    openModal({ content: '저장되었습니다' })
                  }
                })
                .catch(() => {})
            } else {
              exhibitionGnbManagementApi
                .postNewGnbReservationGroup(newItemSubmit)
                .then(() => {
                  if (!newValuePuts.length) {
                    resetValue()
                    openModal({ content: '저장되었습니다' })
                  }
                })
                .catch(() => {})
            }
          }

          if (newValuePuts.length) {
            if (props.typeGnbCustomer) {
              exhibitionGnbManagementApi
                .putNewGnbCustomerReservationGroup(newValuePuts)
                .then(() => {
                  resetValue()
                  openModal({ content: '저장되었습니다' })
                })
                .catch(() => {})
            } else {
              exhibitionGnbManagementApi
                .putNewGnbReservationGroup(newValuePuts)
                .then(() => {
                  resetValue()
                  openModal({ content: '저장되었습니다' })
                })
                .catch(() => {})
            }
          }
        }
      })
    }
  }

  const deleteGnbGroup = () => {
    if (listChecked.value?.length) {
      const itemToRemove = listChecked.value.filter((element) => element === '')
      if (itemToRemove.length && listChecked.value?.length === 1) {
        listChecked.value = []
        clearChecked()
        isNewRow.value = false
        gnbGroupList.value = gnbGroupList.value.splice(1)
        return
      }
      openModalConfirm({
        content: '선택 된 행을 삭제하겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          if (props.typeGnbCustomer) {
            if (listChecked.value.length) {
              exhibitionGnbManagementApi
                .deleteGnbCustomerReservationGroup(listChecked.value.filter((element) => element !== ''))
                .then(() => {
                  openModal({
                    content: '삭제 되었습니다.',
                    onAccept() {
                      closeModalByPop?.()
                      resetValue()
                    }
                  })
                })
                .catch(() => {})
            }
          } else {
            if (listChecked.value.length) {
              exhibitionGnbManagementApi
                .deleteGnbReservationGroup(listChecked.value.filter((element) => element !== ''))
                .then(() => {
                  openModal({
                    content: '삭제 되었습니다.',
                    onAccept() {
                      closeModalByPop?.()
                      resetValue()
                    }
                  })
                })
                .catch(() => {})
            }
          }
        }
      })
    }
  }

  const { handleChooseStartDate, handleChooseEndDate, handleChooseStartTime, handleChooseEndTime } = exhibitionHandleChooseDateTime({
    gnbGroupList: gnbGroupList
  })
  watch(
    () => props.gnbGroupSelect,
    (newValue) => {
      setHasData(false)
      if (newValue?.gnbGroupKey) {
        clearChecked()
        getDataGroupGnb()
      } else {
        gnbGroupList.value = []
        totalItem.value = 0
      }
    }
  )

  return {
    gnbGroupList,
    totalItem,
    selectedRow,
    addNewRow,
    submitNewGnbGroup,
    loading,
    deleteGnbGroup,
    onSelectAll,
    onRowSelected,
    isSelectedAll,
    listChecked,
    handleChooseStartDate,
    handleChooseEndDate,
    handleChooseStartTime,
    handleChooseEndTime
  }
}

export const exhibitionHandleChooseDateTime = (props: ExhibitionHandleChooseDateTimeParams) => {
  const gnbGroupList = reactive<Ref<ExhibitionChooseDateTimeModel[]>>(props.gnbGroupList)

  const { openModal, closeModalByPop } = useModalNotification()
  let isOpenModal: boolean
  const openModalDateNotification = (content: string) => {
    if (isOpenModal) return
    isOpenModal = true
    openModal({
      content,
      onAccept() {
        closeModalByPop?.()
        isOpenModal = false
      }
    })
  }

  const handleChooseStartDate = (value: string, index: number) => {
    const { displayEndDate, displayEndTime, displayStartTime } = gnbGroupList.value?.[index] || {}
    const endDate = displayEndDate?.replace(replaceDashRegex, '')
    const newStartDate = value?.replace(replaceDashRegex, '')

    if (endDate && endDate < newStartDate) {
      openModalDateNotification(datePickerNotification.startDate.date)
      return
    }

    if (displayStartTime && displayEndTime && endDate && endDate === newStartDate && displayStartTime > displayEndTime) {
      openModalDateNotification(datePickerNotification.startDate.date)
      return
    }
    if (gnbGroupList.value) {
      gnbGroupList.value[index].displayStartDate = value
    }
  }

  const handleChooseEndDate = (value: string, index: number) => {
    const { displayStartDate, displayEndTime, displayStartTime } = gnbGroupList.value?.[index] || {}
    const startDate = displayStartDate?.replace(replaceDashRegex, '')
    const newEndDate = value?.replace(replaceDashRegex, '')

    if (startDate && startDate > newEndDate) {
      openModalDateNotification(datePickerNotification.endDate.date)
      return
    }

    if (displayStartTime && displayEndTime && startDate && startDate === newEndDate && displayStartTime > displayEndTime) {
      openModalDateNotification(datePickerNotification.startDate.date)
      return
    }
    if (gnbGroupList.value) {
      gnbGroupList.value[index].displayEndDate = value
    }
  }

  const handleChooseStartTime = (value: string, index: number) => {
    const { displayEndDate, displayStartDate, displayEndTime, displayStartTime } = gnbGroupList.value?.[index] || {}
    gnbGroupList.value[index].displayStartTime = value
    if (!value) {
      setTimeout(() => {
        gnbGroupList.value[index].displayStartTime = displayStartTime
      })
      return
    }

    const endDate = displayEndDate?.replace(replaceDashRegex, '')
    const startDate = displayStartDate?.replace(replaceDashRegex, '')

    if (endDate && startDate && startDate === endDate && displayEndTime && displayEndTime < value) {
      openModalDateNotification(datePickerNotification.startDate.date)

      setTimeout(() => {
        gnbGroupList.value[index].displayStartTime = displayStartTime
      })
      return
    }
    if (gnbGroupList.value) gnbGroupList.value[index].displayStartTime = value
  }

  const handleChooseEndTime = (value: string, index: number) => {
    const { displayEndDate, displayStartDate, displayStartTime, displayEndTime } = gnbGroupList.value?.[index] || {}
    gnbGroupList.value[index].displayEndTime = value
    if (!value) {
      setTimeout(() => {
        gnbGroupList.value[index].displayEndTime = displayEndTime
      })
      return
    }

    const endDate = displayEndDate?.replace(replaceDashRegex, '')
    const startDate = displayStartDate?.replace(replaceDashRegex, '')

    if (endDate && startDate && startDate === endDate && displayStartTime && displayStartTime > value) {
      openModalDateNotification(datePickerNotification.endDate.date)
      setTimeout(() => {
        gnbGroupList.value[index].displayEndTime = displayEndTime
      })
      return
    }
    if (gnbGroupList.value) gnbGroupList.value[index].displayEndTime = value
  }

  return {
    handleChooseStartDate,
    handleChooseEndDate,
    handleChooseStartTime,
    handleChooseEndTime
  }
}

export const exhibitionCompareElementChangeArray = <T extends ExhibitionGnbDataKeyModel>(newArray: T[], oldArray: T[]): T[] => {
  const newArrayCheck = cloneArray(newArray)
  const additionalElements = newArrayCheck.splice(0, newArrayCheck.length - oldArray.length)
  const remainingElements = newArrayCheck.slice(newArrayCheck.length - oldArray.length, newArrayCheck.length)
  const changedElements: T[] = remainingElements?.filter((element, index) => {
    const keys = Object.keys(element)
    return keys.some((key) => element[key] !== oldArray?.[index]?.[key])
  })
  return additionalElements.concat(changedElements)
}

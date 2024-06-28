import {
  complaintOrderCancelListModelConfig,
  complaintOrderCancelSelectOptionDefault
} from '@/models/views/complaint/complaintOrderCancel/ComplaintOrderCancelModel'
import { useFormFilterTable, useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ref } from 'vue'
import {
  cloneArray,
  DATETIME_IN_THE_PAST,
  DATETIME_MESSAGES,
  DEFAULT_DATE_FORMAT,
  exportExcel,
  exportFileName,
  FORMAT_DATE_YYYYMMDD,
  formatTime,
  handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD,
  renderSortDataTable
} from '@/common'
import {
  exhibitionSellerSpecialTableExcelConfig,
  ExhibitionSpecialManagementListFormModel,
  exhibitionSpecialManagementListModelConfig,
  ExhibitionSpecialManagementModel,
  exhibitionSpecialTableExcelConfig
} from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialManagementModel'
import { exhibitionSpecialManagementApi } from '@/services/api/exhibition/ExhibitionSpecialManagementApi'
import {
  ExhibitionSellerSpecialManagementListRequestConvertor,
  ExhibitionSpecialEditListRequest,
  ExhibitionSpecialManagementListRequestConvertor
} from '@/models/services/requests/exhibition/ExhibitionSpecialManagementListRequest'
import { useExhibitionSellerSpecialConnectionModal } from '@/composables/exhibition/exhibitionContent/useExhibitionSellerSpecialConnectionModal'
import { useExhibitionSpecialConnectionManagementModal } from '@/composables/exhibition/exhibitionContent/useExhibitionSpecialConnectionManagementModal'
import { exhibitionCompareElementChangeArray } from '@/composables/exhibition/exhibitionCommon/useExhibitionGnbReservationManagement'
import dayjs from 'dayjs'

export const useExhibitionSpecialManagementList = (sellerType?: boolean) => {
  const dateActiveNumber = complaintOrderCancelListModelConfig.listButtonDateFilter[1].value
  const { openModal: openModalSeller } = useExhibitionSellerSpecialConnectionModal()
  const { openModal: openModalExhibition } = useExhibitionSpecialConnectionManagementModal()

  const initialData: ExhibitionSpecialManagementModel = {
    exhibitionName: '',
    customerKey: complaintOrderCancelSelectOptionDefault,
    chargeMdCode: complaintOrderCancelSelectOptionDefault,
    exhibitionStatusType: '',
    exhibitionType: '',
    displayYn: exhibitionSpecialManagementListModelConfig.selectRow3[0].options[0].value,
    displayOptions: '',
    applyChannelAllYn: true,
    applyChannelPcYn: false,
    applyChannelMobileYn: false,
    applyChannelMobileWebYn: false,
    searchPeriodType: exhibitionSpecialManagementListModelConfig.listSelectDate.options[0],
    fromDate: handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(dateActiveNumber).lastCustomDayString,
    toDate: handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(dateActiveNumber).currentDateString,
    searchWord: '',
    searchWordType: sellerType
      ? exhibitionSpecialManagementListModelConfig.listSelectSearchType.options[0]
      : exhibitionSpecialManagementListModelConfig.listSelectSearchType.options[1]
  }
  const ExhibitionExcelFileName = exportFileName('Exhibition-special', DEFAULT_DATE_FORMAT)
  const exhibitionSpecialFormFilterRef = ref()
  const oldValue = ref<ExhibitionSpecialManagementListFormModel[]>([])

  const { openModal } = useModalNotification()

  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()

  const submitParamsValue = ref<ExhibitionSpecialManagementModel>(initialData)

  const getExhibitionSpecialList = (page: number, size: number) => {
    if (sellerType) {
      return exhibitionSpecialManagementApi
        .getExhibitionSellerSpecialList(ExhibitionSellerSpecialManagementListRequestConvertor.from(submitParamsValue.value, page, size))
        .then((data) => {
          oldValue.value = cloneArray(data.data)
          return Promise.resolve(data)
        })
        .catch((data) => {
          return Promise.reject(data)
        })
    }
    return exhibitionSpecialManagementApi
      .getExhibitionSpecialList(ExhibitionSpecialManagementListRequestConvertor.from(submitParamsValue.value, page, size))
      .then((data) => {
        oldValue.value = cloneArray(data.data)
        return Promise.resolve(data)
      })
      .catch((data) => {
        return Promise.reject(data)
      })
  }

  const {
    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    handleResetFormFilter,
    items,
    isLoading,
    onPageChange,
    totalItems,
    refTable,
    onSubmit,
    clearChecked,
    onRowSelected,
    listChecked,
    onSelectAllChange,
    setData
  } = useFormFilterTable<ExhibitionSpecialManagementListFormModel, ExhibitionSpecialManagementModel>({
    initialDate: dateActiveNumber,
    initialValuesForm: initialData,
    fetchDataCallback: getExhibitionSpecialList,
    disabledFetchApiFirst: true
  })

  const onDownloadExcel = () => {
    if (!items.value) return
    const newItems = items.value?.map((newValue) => {
      const displayYn = exhibitionSpecialManagementListModelConfig?.selectRow3[0].options?.find((item) => item.value === newValue.displayYn)?.label
      return {
        ...newValue,
        displayYn
      }
    })
    const sortedData = renderSortDataTable(newItems, sellerType ? exhibitionSellerSpecialTableExcelConfig : exhibitionSpecialTableExcelConfig)
    exportExcel(
      sortedData,
      ExhibitionExcelFileName,
      (sellerType ? exhibitionSellerSpecialTableExcelConfig : exhibitionSpecialTableExcelConfig).map((item) => item.header)
    )
  }
  const onSubmitForm = () => {
    if (!values.toDate) {
      openModal?.({
        buttonLabel: '확인',
        content: '종료 날짜를 선택 해주세요.'
      })
      return
    }
    if (!values.fromDate) {
      openModal?.({
        buttonLabel: '확인',
        content: '시작 날짜를 선택 해주세요.'
      })
      return
    }
    if (!values.applyChannelAllYn && !values.applyChannelMobileYn && !values.applyChannelPcYn && !values.applyChannelMobileWebYn) {
      openModal?.({
        buttonLabel: '확인',
        content: '1개 이상 필수 체크해주세요.'
      })
      return
    }
    resetChecked()
    submitParamsValue.value = values
    onSubmit()
  }

  const onChangeDataTable = (field: string, value: string | undefined, index: number) => {
    if (items.value) {
      const newItem: any = [...items.value]
      newItem[index][field] = value
      setData([...newItem])
    }
  }

  const copyValueSelect = () => {
    if (listChecked.value?.length > 0) {
      if (listChecked.value?.length > 1) {
        openModal?.({
          buttonLabel: '확인',
          content: '1개의 행만 선택 가능합니다.'
        })
      } else {
        //confirm
      }
    } else {
      // openModal?.({
      //   buttonLabel: '확인',
      //   content: '필수입력 항목을 입력하세요.'
      // })
    }
  }

  const checkTimeCurrent = (date: string, time: string) => {
    const currentDate = dayjs()
    const inputDate = dayjs(`${date}T${time}`)

    return !inputDate.isAfter(currentDate)
  }

  const submitValue = () => {
    let hasMissingField = ''
    const dataCompare = exhibitionCompareElementChangeArray(items.value ?? [], oldValue.value)
    const newValuePuts = dataCompare
      ?.map((newItem) => {
        if (
          !newItem.exhibitionKey ||
          !newItem.displayYn ||
          !newItem.displayStartDate ||
          !newItem.displayStartTime ||
          !newItem.displayEndDate ||
          !newItem.displayEndTime
        ) {
          hasMissingField = '필수입력 값을 입력하세요.'
          return null
        }

        if (checkTimeCurrent(newItem.displayStartDate, newItem.displayStartTime ?? '')) {
          hasMissingField = DATETIME_MESSAGES[DATETIME_IN_THE_PAST]
          return null
        }

        return {
          exhibitionKey: newItem.exhibitionKey,
          displayYn: newItem.displayYn,
          displayStartDate: formatTime(newItem.displayStartDate, FORMAT_DATE_YYYYMMDD),
          displayStartTime: newItem.displayStartTime?.replace(':', ''),
          displayEndDate: formatTime(newItem.displayEndDate, FORMAT_DATE_YYYYMMDD),
          displayEndTime: newItem.displayEndTime?.replace(':', '')
        }
      })
      .filter((item) => item !== null) as ExhibitionSpecialEditListRequest[]

    if (hasMissingField) {
      openModal?.({
        buttonLabel: '확인',
        content: hasMissingField
      })
      return
    }

    if (sellerType) {
      exhibitionSpecialManagementApi
        .putSellerExhibition(newValuePuts)
        .then(() => {
          openModal?.({
            buttonLabel: '확인',
            content: '저장되었습니다.',
            onAccept: () => {
              closeModalByPop?.()
              onSubmitForm()
            }
          })
        })
        .catch(() => {})
      return
    }

    exhibitionSpecialManagementApi
      .putExhibition(newValuePuts)
      .then(() => {
        openModal?.({
          buttonLabel: '확인',
          content: '저장되었습니다.',
          onAccept: () => {
            closeModalByPop?.()
            onSubmitForm()
          }
        })
      })
      .catch(() => {})
  }

  const deleteValue = () => {
    const checkStatus = items.value?.some((item) => {
      return (
        item?.exhibitionKey?.toString() === listChecked?.value?.find((idChecked) => idChecked?.toString() === item?.exhibitionKey?.toString()) &&
        item?.exhibitionTypeName !== exhibitionSpecialManagementListModelConfig.selectRow2[1].options[1].label
      )
    })
    if (checkStatus) {
      openModal?.({
        buttonLabel: '확인',
        content: '전시예정 전시상태 외 삭제 불가합니다.'
      })
      return
    }
    if (sellerType) {
      exhibitionSpecialManagementApi
        .deleteSellerExhibition(listChecked.value)
        .then(() => {
          openModal?.({
            buttonLabel: '확인',
            content: '삭제되었습니다.',
            onAccept: () => {
              closeModalByPop?.()
              onSubmitForm()
            }
          })
        })
        .catch(() => {})
      return
    }
    exhibitionSpecialManagementApi
      .deleteExhibition(listChecked.value)
      .then(() => {
        openModal?.({
          buttonLabel: '확인',
          content: '삭제되었습니다.',
          onAccept: () => {
            closeModalByPop?.()
            onSubmitForm()
          }
        })
      })
      .catch(() => {})
  }

  const saveValueTable = () => {
    const dataCompare = exhibitionCompareElementChangeArray(items.value ?? [], oldValue.value)
    if (dataCompare?.length > 0) {
      openModalConfirm({
        content: '저장하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          submitValue()
        }
      })
    } else {
      openModal?.({
        buttonLabel: '확인',
        content: '필수입력 항목을 입력하세요.'
      })
    }
  }
  const deleteValueExhibition = () => {
    if (listChecked.value?.length > 0) {
      openModalConfirm({
        content: '삭제하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          deleteValue()
        }
      })
    } else {
      openModal?.({
        buttonLabel: '확인',
        content: '삭제할 행을 선택해 주세요.'
      })
    }
  }

  const resetDataForm = () => {
    submitParamsValue.value = initialData
    exhibitionSpecialFormFilterRef?.value?.resetFormComplaint()
    handleResetFormFilter()
    resetChecked()
    setData([])
    totalItems.value = 0
  }

  const resetChecked = () => {
    clearChecked()
    refTable.value?.clearCheckAll()
  }

  const openModalSellerSpecial = (exhibitionKey: string) => {
    if (sellerType) {
      openModalSeller({ exhibitionKey })
    } else {
      openModalExhibition({ exhibitionKey })
    }
  }

  const openModalExhibitionRegister = () => {
    if (sellerType) {
      openModalSeller()
    } else {
      openModalExhibition()
    }
  }

  return {
    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    handleResetFormFilter: resetDataForm,
    items,
    isLoading,
    onPageChange,
    totalItems,
    refTable,
    onSubmitForm,
    onRowSelected,
    onSelectAllChange,
    clearChecked,
    onDownloadExcel,
    exhibitionSpecialFormFilterRef,
    onChangeDataTable,
    copyValueSelect,
    saveValueTable,
    deleteValueExhibition,
    openModalSellerSpecial,
    openModalExhibitionRegister
  }
}

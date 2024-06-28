import { useForm } from 'vee-validate'
import { computed, onMounted, ref } from 'vue'
import {
  datePickerNotification,
  DAYS_PER_WEEK,
  exportExcel,
  exportFileName,
  FORMAT_DATE_YYYYMMDD,
  formatTime,
  handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD,
  isEmptyObject,
  sortObjectFields
} from '@/common'
import {
  exhibitionCommonFlagManagementFlagTypeOption,
  ExhibitionCommonFlagManagementFormModel,
  exhibitionCommonFlagManagementTableConfig,
  ExhibitionFlagManagementTableModel
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonFlagManagementModel'
import { exhibitionSpecialManagementListModelConfig } from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialManagementModel'
import { exhibitionCommonFlagRegistrationDisplayYnOption } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonFlagRegistrationPopupModel'
import { useCheckBoxTable, useDataTablePagination, useModalConfirm, useModalNotification } from '@/composables'
import { defaultPageState } from '@/models'
import { PageState } from 'primevue/paginator'
import {
  ExhibitionFlagListRequest,
  ExhibitionFlagListRequestModel,
  ExhibitionFlagModifyRequestListType,
  ExhibitionModifyFlagListRequest
} from '@/models/services/requests/exhibition/ExhibitionFlagManagementRequest'
import { exhibitionFlagManagementApi } from '@/services/api/exhibition/ExhibitionFlagManagementApi'
import { useExhibitionFlagRegistrationPopup } from '@/composables/exhibition/exhibitionCommon/useExhibitionFlagRegistrationPopup'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { array, object, string } from 'yup'
import { ExhibitionCommonExtendedImageListResponseModel } from '@/models/services/responses/exhibition/exhibitionCommon/ExhibitionCommonExtensibleImageManagementResponse'

export const useExhibitionCommonFlagManagement = () => {
  const { openModal: showNotificationModal, closeModalByPop } = useModalNotification()
  const { openModal: showConfirmModal } = useModalConfirm()
  const tableRef = ref()
  const { onShowModal } = useExhibitionFlagRegistrationPopup()
  const refPageState = ref<PageState>(defaultPageState)
  const enableQuerySearchRequest = ref(false)
  const refFilterDate = ref()
  const { values, setFieldValue, resetForm } = useForm<ExhibitionCommonFlagManagementFormModel>({
    initialValues: {
      searchPeriodType: exhibitionSpecialManagementListModelConfig.listSelectDate.options[0],
      displayYn: exhibitionCommonFlagRegistrationDisplayYnOption[0].value,
      flagType: exhibitionCommonFlagManagementFlagTypeOption[0].value
    }
  })
  const {
    values: tableFormValues,
    setFieldValue: setTableFormField,
    errors
  } = useForm<ExhibitionModifyFlagListRequest>({
    validationSchema: object().shape({
      modifyRequestList: array().of(
        object().shape({
          flagDisplayOrder: string().required(),
          flagName: string().required(),
          displayYn: string().required(),
          displayStartDate: string().required(),
          displayStartTime: string().required(),
          displayEndDate: string().required(),
          displayEndTime: string().required()
        })
      )
    })
  })

  const handleChangeCountDate = (number: number) => {
    refFilterDate.value = number
    const { currentDateString, lastCustomDayString } = handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(number)
    setFieldValue('fromDate', lastCustomDayString)
    setFieldValue('toDate', currentDateString)
  }

  const getTableData = async (page: number, size: number): Promise<DataTablePaginationResponseModel<ExhibitionFlagManagementTableModel>> => {
    const params: ExhibitionFlagListRequest = {
      ...values,
      rowSize: size,
      pageNum: page + 1,
      searchPeriodType: values.searchPeriodType?.value,
      searchWordType: values.searchWordType?.value,
      fromDate: formatTime(values?.fromDate ?? '', FORMAT_DATE_YYYYMMDD),
      toDate: formatTime(values?.toDate ?? '', FORMAT_DATE_YYYYMMDD)
    }
    return await exhibitionFlagManagementApi.getFlagList(params)
  }

  const { items, totalItems, fetchDataWith, isLoading, setData, refreshData } =
    useDataTablePagination<ExhibitionFlagManagementTableModel>(getTableData)

  const listId = computed(() => {
    return items.value?.map((it) => it.id?.toString() ?? '') ?? []
  })
  const { listChecked, onSelectAllChange, onRowSelected } = useCheckBoxTable(listId)

  const handleSearch = () => {
    fetchDataWith({
      page: refPageState.value?.page,
      numberOfItems: refPageState.value?.rows
    })
      .then(() => {
        tableRef.value?.clearCheckAll()
        tableRef.value?.scrollToTop()
      })
      .catch(() => {
        // error
      })
  }

  const onPageChange = (pageState: PageState) => {
    refPageState.value = pageState
    if (enableQuerySearchRequest.value) {
      handleSearch()
    } else {
      enableQuerySearchRequest.value = true
    }
  }

  const onResetForm = () => {
    resetForm()
    setData([])
    handleChangeCountDate(DAYS_PER_WEEK)
  }

  onMounted(() => {
    handleChangeCountDate(DAYS_PER_WEEK)
  })
  const initDefaultTableFormField = (index: number) => {
    setTableFormField(`modifyRequestList.${index}.flagKey`, items?.value?.[index].flagKey)
    if (!tableFormValues.modifyRequestList[index].flagName) {
      setTableFormField(`modifyRequestList.${index}.flagName`, items?.value?.[index].flagName)
    }
    if (!tableFormValues.modifyRequestList[index].displayYn) {
      setTableFormField(`modifyRequestList.${index}.displayYn`, items?.value?.[index].displayYn)
    }
    if (!tableFormValues.modifyRequestList[index].flagDisplayOrder) {
      setTableFormField(`modifyRequestList.${index}.flagDisplayOrder`, items?.value?.[index].flagDisplayOrder?.toString())
    }
    if (!tableFormValues.modifyRequestList[index].displayStartDate) {
      setTableFormField(`modifyRequestList.${index}.displayStartDate`, formatTime(items?.value?.[index].displayStartDate ?? '', FORMAT_DATE_YYYYMMDD))
    }
    if (!tableFormValues.modifyRequestList[index].displayEndDate) {
      setTableFormField(`modifyRequestList.${index}.displayEndDate`, formatTime(items?.value?.[index].displayEndDate ?? '', FORMAT_DATE_YYYYMMDD))
    }
    if (!tableFormValues.modifyRequestList[index].displayStartTime) {
      setTableFormField(`modifyRequestList.${index}.displayStartTime`, items?.value?.[index].displayStartTime?.replace(':', ''))
    }
    if (!tableFormValues.modifyRequestList[index].displayEndTime) {
      setTableFormField(`modifyRequestList.${index}.displayEndTime`, items?.value?.[index].displayEndTime?.replace(':', ''))
    }
  }

  const handleSetTableFormField = (field: string, value: any, index: number) => {
    setTableFormField(`modifyRequestList.${index}.${field}` as keyof ExhibitionModifyFlagListRequest, value)
    if (
      ['displayYn', 'displayStartDate', 'displayEndDate', 'displayStartTime', 'displayEndTime'].includes(field) &&
      items.value?.[index]?.[field as keyof ExhibitionFlagModifyRequestListType]
    ) {
      items.value[index][field as keyof ExhibitionFlagModifyRequestListType] = value
    }
    initDefaultTableFormField(index)
  }

  const onSave = () => {
    if (tableFormValues.modifyRequestList?.length > 0) {
      if (isEmptyObject(errors.value)) {
        showConfirmModal({
          content: '저장하시겠습니까?',
          onConfirm() {
            closeModalByPop?.()
            const body: ExhibitionModifyFlagListRequest = {
              modifyRequestList: tableFormValues.modifyRequestList
                .filter((it) => {
                  return it != null
                })
                .map((it) => {
                  return {
                    ...it,
                    displayStartDate: formatTime(it.displayStartDate ?? '', FORMAT_DATE_YYYYMMDD),
                    displayEndDate: formatTime(it.displayEndDate ?? '', FORMAT_DATE_YYYYMMDD),
                    displayStartTime: it.displayStartTime?.replace(':', ''),
                    displayEndTime: it.displayEndTime?.replace(':', '')
                  }
                })
            }
            exhibitionFlagManagementApi
              .modifyFlagList(body)
              .then(() => {
                setTableFormField('modifyRequestList', [])
                refreshData().catch(() => {
                  // error
                })
                showNotificationModal({
                  content: '저장되었습니다'
                })
              })
              .catch(() => {
                // error
              })
          }
        })
      } else {
        showNotificationModal({
          content: '필수입력 값을 입력하세요.'
        })
      }
    }
  }

  const onDelete = () => {
    if (listChecked.value.length > 0) {
      showConfirmModal({
        content: '선택하신 행을 삭제하겠습니까?',
        onConfirm() {
          closeModalByPop?.()
          exhibitionFlagManagementApi
            .deleteFlagList(listChecked.value)
            .then(() => {
              refreshData().catch(() => {
                // error
              })
              showNotificationModal({
                content: '삭제 되었습니다.'
              })
            })
            .catch(() => {
              // error
            })
          listChecked.value = []
        }
      })
    }
  }

  const onExcelDownload = () => {
    const params: ExhibitionFlagListRequestModel = {
      ...values,
      fromDate: formatTime(values.fromDate ?? '', FORMAT_DATE_YYYYMMDD),
      toDate: formatTime(values.toDate ?? '', FORMAT_DATE_YYYYMMDD),
      searchWordType: values.searchWordType?.value,
      searchPeriodType: values.searchPeriodType?.value
    }
    exhibitionFlagManagementApi
      .excelDownloadFlagList(params)
      .then((res) => {
        const headerField = exhibitionCommonFlagManagementTableConfig.map((it) => it.field)
        const headerTitle = exhibitionCommonFlagManagementTableConfig.map((it) => it.header)
        const excelData = res.data.map((it: ExhibitionCommonExtendedImageListResponseModel) =>
          sortObjectFields(it, headerField as [keyof ExhibitionCommonExtendedImageListResponseModel])
        )
        if (excelData.length > 0) {
          exportExcel<ExhibitionCommonExtendedImageListResponseModel>(excelData, exportFileName('플래그 관리'), headerTitle).catch(() => {
            // error
          })
        }
      })
      .catch(() => {
        // error
      })
  }

  const onRegister = () => {
    onShowModal(NaN, () => {
      refreshData().catch(() => {
        // error
      })
    })
  }

  const handleDateChangeTableForm = (field: string, value: string, index: number) => {
    const startDateOld = items?.value?.[index]?.displayStartDate
    const endDateOld = items?.value?.[index]?.displayEndDate
    const startTimeOld = items?.value?.[index]?.displayStartTime ?? '00:00'
    const endTimeOld = items?.value?.[index]?.displayEndTime ?? '00:00'
    handleSetTableFormField(field, value, index)
    const startDate = items?.value?.[index]?.displayStartDate
    const endDate = items?.value?.[index]?.displayEndDate
    const startTime = items?.value?.[index]?.displayStartTime
    const endTime = items?.value?.[index]?.displayEndTime
    const startDateTime = new Date(`${startDate} ${startTime}`)
    const endDateTime = new Date(`${endDate} ${endTime}`)
    if (
      (startDateOld !== startDate || startTimeOld !== startTime) &&
      ['displayStartDate', 'displayStartTime'].includes(field) &&
      startDateTime > endDateTime
    ) {
      return showNotificationModal({
        content: datePickerNotification.startDate.date,
        onAccept() {
          if (field === 'displayStartDate') {
            handleSetTableFormField('displayStartDate', startDateOld, index)
          } else if (field === 'displayStartTime') {
            handleSetTableFormField('displayStartTime', startTimeOld, index)
          }
          closeModalByPop?.()
        }
      })
    } else if (
      (endDateOld !== endDate || endTimeOld !== endTime) &&
      ['displayEndDate', 'displayEndTime'].includes(field) &&
      endDateTime < startDateTime
    ) {
      return showNotificationModal({
        content: datePickerNotification.endDate.date,
        onAccept() {
          if (field === 'displayEndDate') {
            handleSetTableFormField('displayEndDate', endDateOld, index)
          } else if (field === 'displayEndTime') {
            handleSetTableFormField('displayEndTime', endTimeOld, index)
          }
          closeModalByPop?.()
        }
      })
    }
  }

  return {
    values,
    setFieldValue,
    refFilterDate,
    handleChangeCountDate,
    items,
    totalItems,
    onPageChange,
    handleSearch,
    onResetForm,
    onSave,
    onDelete,
    onExcelDownload,
    onRegister,
    onShowModal,
    tableFormValues,
    setTableFormField,
    tableRef,
    isLoading,
    handleDateChangeTableForm,
    onSelectAllChange,
    onRowSelected,
    refreshData,
    handleSetTableFormField
  }
}

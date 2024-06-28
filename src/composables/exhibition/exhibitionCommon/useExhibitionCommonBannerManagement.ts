import { useForm } from 'vee-validate'
import { exhibitionTemplateManagementAppChannelOptions } from '@/models/views/exhibition/templateManagement/ExhibitionTemplateManagementModel'
import {
  ExhibitionBannerGroupListTableModel,
  exhibitionBannerGroupUseYnOptions,
  ExhibitionBannerListTableModel,
  ExhibitionCommonBannerFormModel,
  exhibitionCommonBannerGroupTableConfig,
  exhibitionCommonBannerSearchPeriodTypeOptions,
  exhibitionCommonBannerSearchWordTypeOptions,
  exhibitionCommonBannerTableField,
  exhibitionCommonBannerTableHeader
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonBannerManagementModel'
import { onMounted, ref } from 'vue'
import {
  DAYS_PER_WEEK,
  DEFAULT_DATE_FORMAT_DOT,
  exportExcel,
  exportFileName,
  FORMAT_DATE_YYYYMMDD,
  formatTime,
  handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD,
  renderLabelEnum,
  sortObjectFields
} from '@/common'
import { useDataTablePagination } from '@/composables'
import {
  ExhibitionBannerGroupListResponseModel,
  ExhibitionBannerListResponseModel
} from '@/models/services/responses/exhibition/exhibitionCommon/ExhibitionCommonBannerManagementResponse'
import { PageState } from 'primevue/paginator'
import { exhibitionBannerManagementApi } from '@/services/api/exhibition/ExhibitionBannerManagementApi'
import {
  ExhibitionBannerGroupListRequest,
  ExhibitionBannerGroupListRequestModel,
  ExhibitionBannerListRequest
} from '@/models/services/requests/exhibition/ExhibitionBannerManagementRequest'
import { defaultPageState } from '@/models'
import { DataTableRowClickEvent } from 'primevue/datatable'

export const useExhibitionCommonBannerManagement = () => {
  const bannerGroupTableRef = ref()
  const bannerTableRef = ref()
  const refFilterDate = ref()
  const productCustomerSearchWrapper = ref()
  const selectedRowBannerGroupListTable = ref<ExhibitionBannerGroupListTableModel>()
  const selectedRowBannerListTable = ref<ExhibitionBannerListTableModel>()
  const bannerGroupListTablePageState = ref<PageState>(defaultPageState)
  const bannerListTablePageState = ref<PageState>(defaultPageState)
  const enableQuerySearchRequest = ref(false)
  const { values, setFieldValue, resetForm } = useForm<ExhibitionCommonBannerFormModel>({
    initialValues: {
      applyChannelType: exhibitionTemplateManagementAppChannelOptions[0].value,
      bannerGroupUseYn: exhibitionBannerGroupUseYnOptions[0].value,
      searchPeriodType: exhibitionCommonBannerSearchPeriodTypeOptions[0],
      searchWordType: exhibitionCommonBannerSearchWordTypeOptions[0],
      customerKey: ''
    }
  })

  const getBannerGroupListTableData = (page: number, size: number) => {
    const params: ExhibitionBannerGroupListRequest = {
      ...values,
      pageNum: page + 1,
      rowSize: size,
      searchPeriodType: values.searchPeriodType?.value,
      searchWordType: values.searchWordType?.value,
      fromDate: formatTime(values.fromDate, FORMAT_DATE_YYYYMMDD),
      toDate: formatTime(values.toDate, FORMAT_DATE_YYYYMMDD)
    }
    return exhibitionBannerManagementApi.getBannerGroupList(params)
  }

  const getBannerListTableData = (page: number, size: number) => {
    const params: ExhibitionBannerListRequest = {
      bannerGroupKey: selectedRowBannerGroupListTable.value?.id.toString() ?? '',
      pageNum: page + 1,
      rowSize: size
    }
    return exhibitionBannerManagementApi.getBannerList(params)
  }

  const {
    items: bannerGroupListTableData,
    totalItems: bannerGroupListTotalItems,
    isLoading: isBannerGroupListTableLoading,
    fetchDataWith: fetchBannerGroupListTableData,
    refreshData: refreshBannerGroupListTableData
  } = useDataTablePagination<ExhibitionBannerGroupListTableModel>(getBannerGroupListTableData)

  const {
    items: bannerListTableData,
    totalItems: bannerListTotalItems,
    isLoading: isBannerListTableLoading,
    fetchDataWith: fetchBannerListTableData,
    refreshData: refreshBannerListTableData
  } = useDataTablePagination<ExhibitionBannerListTableModel>(getBannerListTableData)

  const handleSearchBannerGroupList = () => {
    resetBannerGroupListTable()
    resetBannerListTable()
    fetchBannerGroupListTableData({
      page: bannerGroupListTablePageState.value?.page,
      numberOfItems: bannerGroupListTablePageState.value?.rows
    }).catch(() => {
      //error
    })
  }

  const resetBannerGroupListTable = () => {
    bannerGroupTableRef.value.scrollToTop()
    bannerGroupTableRef.value.clearCheckAll()
  }

  const resetBannerListTable = () => {
    bannerTableRef.value.scrollToTop()
    bannerTableRef.value.clearCheckAll()
  }

  const onResetForm = () => {
    resetForm()
    handleChangeCountDate(DAYS_PER_WEEK)
    productCustomerSearchWrapper.value.handleReset()
    bannerGroupListTableData.value = []
    bannerListTableData.value = []
    selectedRowBannerGroupListTable.value = undefined
    selectedRowBannerListTable.value = undefined
    resetBannerGroupListTable()
    resetBannerListTable()
  }

  const handleChangeCountDate = (number: number) => {
    refFilterDate.value = number
    const { currentDateString, lastCustomDayString } = handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(number)
    setFieldValue('fromDate', lastCustomDayString)
    setFieldValue('toDate', currentDateString)
  }

  const onPageChangeOfBannerGroupListTable = (pageState: PageState) => {
    bannerGroupListTablePageState.value = pageState
    if (enableQuerySearchRequest.value) {
      handleSearchBannerGroupList()
    } else {
      enableQuerySearchRequest.value = true
    }
  }

  const onPageChangeOfBannerListTable = (pageState: PageState) => {
    bannerListTablePageState.value = pageState
  }

  const onBannerGroupListTableRowClick = (row: DataTableRowClickEvent) => {
    selectedRowBannerGroupListTable.value = row.data
    resetBannerListTable()
    fetchBannerListTableData({
      page: bannerListTablePageState.value.page,
      numberOfItems: bannerListTablePageState.value.rows
    }).catch(() => {
      // error
    })
  }

  const onBannerListTableRowClick = (row: DataTableRowClickEvent) => {
    selectedRowBannerListTable.value = row.data
  }

  const getBannerGroupListExcelDownload = () => {
    const params: ExhibitionBannerGroupListRequestModel = {
      ...values,
      searchPeriodType: values.searchPeriodType?.value,
      searchWordType: values.searchWordType?.value,
      fromDate: formatTime(values.fromDate, FORMAT_DATE_YYYYMMDD),
      toDate: formatTime(values.toDate, FORMAT_DATE_YYYYMMDD)
    }
    exhibitionBannerManagementApi
      .getBannerGroupListExcelDownload(params)
      .then((res) => {
        const excelData = res.data.map((it: ExhibitionBannerGroupListResponseModel) => {
          return {
            rowNum: it?.rowNum,
            bannerGroupKey: it?.bannerGroupKey,
            bannerGroupName: it?.bannerGroupName,
            applyChannelName: it?.applyChannelName,
            bannerGroupUseYn: renderLabelEnum(exhibitionBannerGroupUseYnOptions, it?.bannerGroupUseYn ?? ''),
            createdByName: it?.createdByName,
            createdDate: it?.createdDate,
            lastModifiedByName: it?.lastModifiedByName,
            lastModifiedDate: it?.lastModifiedDate
          }
        })
        if (excelData.length > 0) {
          exportExcel<ExhibitionBannerGroupListResponseModel>(
            excelData,
            exportFileName('banner_group_list'),
            exhibitionCommonBannerGroupTableConfig.map((it) => it.header)
          ).catch(() => {
            // error
          })
        }
      })
      .catch(() => {
        // error
      })
  }

  const getBannerListExcelDownload = () => {
    exhibitionBannerManagementApi
      .getBannerListExcelDownload(selectedRowBannerGroupListTable.value?.bannerGroupKey ?? NaN)
      .then((res) => {
        const data = res.data.map((it: ExhibitionBannerListResponseModel): ExhibitionBannerListResponseModel => {
          return {
            ...it,
            displayYn: renderLabelEnum(exhibitionBannerGroupUseYnOptions, it?.displayYn ?? exhibitionBannerGroupUseYnOptions[0].value),
            displayStartDate: formatTime(it?.displayStartDate ?? '', DEFAULT_DATE_FORMAT_DOT),
            displayEndDate: formatTime(it?.displayEndDate ?? '', DEFAULT_DATE_FORMAT_DOT),
            displayStartTime: it?.displayStartTime,
            displayEndTime: it?.displayEndTime
          }
        })
        const excelData = data.map((it: ExhibitionBannerListResponseModel) =>
          sortObjectFields(it, exhibitionCommonBannerTableField as [keyof ExhibitionBannerListResponseModel])
        )
        if (excelData.length > 0) {
          exportExcel<ExhibitionBannerListResponseModel>(excelData, exportFileName('banner_list'), exhibitionCommonBannerTableHeader).catch(() => {
            // error
          })
        }
      })
      .catch()
  }

  onMounted(() => {
    handleChangeCountDate(DAYS_PER_WEEK)
  })

  return {
    values,
    setFieldValue,
    onResetForm,
    handleChangeCountDate,
    refFilterDate,
    bannerGroupListTableData,
    bannerGroupListTotalItems,
    isBannerGroupListTableLoading,
    onPageChangeOfBannerGroupListTable,
    onPageChangeOfBannerListTable,
    handleSearchBannerGroupList,
    productCustomerSearchWrapper,
    onBannerGroupListTableRowClick,
    selectedRowBannerGroupListTable,
    getBannerGroupListExcelDownload,
    bannerListTotalItems,
    bannerListTableData,
    isBannerListTableLoading,
    selectedRowBannerListTable,
    onBannerListTableRowClick,
    refreshBannerGroupListTableData,
    getBannerListExcelDownload,
    bannerTableRef,
    bannerGroupTableRef,
    refreshBannerListTableData
  }
}

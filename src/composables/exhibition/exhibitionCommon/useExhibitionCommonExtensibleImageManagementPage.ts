import { useForm } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import {
  DAYS_PER_WEEK,
  exportExcel,
  exportFileName,
  FORMAT_DATE_YYYYMMDD,
  formatTime,
  handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD,
  isEmptyObject,
  renderLabelEnum,
  sortObjectFields
} from '@/common'
import {
  ExhibitionCommonExtensibleImageManagementFormModel,
  exhibitionCommonExtensibleImageManagementProductClassificationOptions,
  exhibitionCommonExtensibleImageManagementTableConfig,
  ExhibitionCommonExtensibleImageManagementTableModel
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonExtensibleImageManagementModel'
import {
  exhibitionCommonBannerSearchPeriodTypeOptions,
  exhibitionCommonBannerSearchWordTypeOptions
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonBannerManagementModel'
import { exhibitionCommonFlagRegistrationDisplayYnOption } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonFlagRegistrationPopupModel'
import { useCheckBoxTable, useDataTablePagination, useModalConfirm, useModalNotification, useUploadFile } from '@/composables'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { exhibitionCommonExtendedImageApi } from '@/services/api/exhibition/ExhibitionCommonExtendedImageApi'
import {
  ExhibitionCommonExtendedImageListRequest,
  ExhibitionCommonExtendedImageListRequestModel,
  ExhibitionCommonExtendedImageModifyRequestListType,
  ExhibitionCommonModifyExtendedImageListRequest
} from '@/models/services/requests/exhibition/ExhibitionCommonExtensibleImageManagementRequest'
import { PageState } from 'primevue/paginator'
import { defaultPageState } from '@/models'
import { array, object, string } from 'yup'
import { ExhibitionCommonExtendedImageListResponseModel } from '@/models/services/responses/exhibition/exhibitionCommon/ExhibitionCommonExtensibleImageManagementResponse'
import { useExhibitionProductSearchModal } from '@/composables/exhibition/modal/useExhibitionProductSearchModal'
import { ExhibitionTemplateFileUploadResponseModel } from '@/models/services/responses/display/templateManagement/ExhibitionTemplateDataResponse'
import { ProductSearchProductTableModel } from '@/models/views/products/modal/ProductSearchProductModalModel'

export const useExhibitionCommonExtensibleImageManagementPage = () => {
  const { handleFileChange } = useUploadFile()
  const { openModal: openProductSearchModal } = useExhibitionProductSearchModal()
  const { openModal: openConfirmModal, closeModalByPop } = useModalConfirm()
  const { openModal: openNotificationModal } = useModalNotification()
  const pageState = ref<PageState>(defaultPageState)
  const { values, setFieldValue, resetForm } = useForm<ExhibitionCommonExtensibleImageManagementFormModel>({
    initialValues: {
      searchWordType: exhibitionCommonBannerSearchWordTypeOptions[0],
      displayYn: exhibitionCommonFlagRegistrationDisplayYnOption[0].value,
      productClassification: exhibitionCommonExtensibleImageManagementProductClassificationOptions[0].value,
      searchPeriodType: exhibitionCommonBannerSearchPeriodTypeOptions[0]
    }
  })
  const {
    values: tableFormValues,
    errors,
    setFieldValue: setTableFieldValue
  } = useForm<ExhibitionCommonModifyExtendedImageListRequest>({
    validationSchema: object().shape({
      modifyRequestList: array().of(
        object().shape({
          filePathName: string().required()
        })
      )
    })
  })
  const refFilterDate = ref()
  const sellerWrapperRef = ref()
  const productWrapperRef = ref()
  const brandWrapperRef = ref()
  const listIds = computed(() => {
    return items.value?.map((it) => it?.id?.toString() ?? '') ?? []
  })
  const { listChecked, onSelectAllChange, onRowSelected } = useCheckBoxTable(listIds)

  const getTableData = async (
    page: number,
    size: number
  ): Promise<DataTablePaginationResponseModel<ExhibitionCommonExtensibleImageManagementTableModel>> => {
    const params: ExhibitionCommonExtendedImageListRequest = {
      ...values,
      rowSize: size,
      pageNum: page + 1,
      searchWordType: values.searchWordType.value,
      searchPeriodType: values.searchPeriodType.value,
      fromDate: formatTime(values.fromDate ?? '', FORMAT_DATE_YYYYMMDD),
      toDate: formatTime(values.toDate ?? '', FORMAT_DATE_YYYYMMDD)
    }

    return await exhibitionCommonExtendedImageApi.getExtendedImageList(params)
  }

  const { items, isLoading, fetchDataWith, totalItems, refreshData } =
    useDataTablePagination<ExhibitionCommonExtensibleImageManagementTableModel>(getTableData)

  watch(
    () => items.value,
    (newItem) => {
      setTableFieldValue(
        'modifyRequestList',
        newItem?.map((it): ExhibitionCommonExtendedImageModifyRequestListType => {
          return {
            productKey: it?.productKey,
            filePathName: it?.imageFullPathName,
            fileName: ''
          }
        }) ?? []
      )
    }
  )

  const handleSearch = () => {
    fetchDataWith({
      page: pageState.value.page,
      numberOfItems: pageState.value.rows
    }).catch(() => {
      // error
    })
  }
  const handleChangeCountDate = (number: number) => {
    refFilterDate.value = number
    const { currentDateString, lastCustomDayString } = handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(number)
    setFieldValue('fromDate', lastCustomDayString)
    setFieldValue('toDate', currentDateString)
  }

  onMounted(() => {
    handleChangeCountDate(DAYS_PER_WEEK)
  })

  const onResetForm = () => {
    resetForm()
    items.value = []
    handleChangeCountDate(DAYS_PER_WEEK)
    sellerWrapperRef.value?.handleReset()
    productWrapperRef.value?.handleReset()
    brandWrapperRef.value?.handleReset()
  }

  const onPageChange = (pageStateValue: PageState) => {
    pageState.value = pageStateValue
  }

  const onSave = () => {
    if (tableFormValues.modifyRequestList.length > 0 && isEmptyObject(errors.value)) {
      openConfirmModal({
        content: '저장하시겠습니까?',
        onConfirm() {
          closeModalByPop?.()
          exhibitionCommonExtendedImageApi
            .modifyExtendedImageList(tableFormValues.modifyRequestList.filter((it) => it.fileName))
            .then(() => {
              refreshData().catch(() => {
                // error
              })
              openNotificationModal({
                content: '저장되었습니다'
              })
            })
            .catch(() => {
              // error
            })
        }
      })
    } else {
      openNotificationModal({
        content: '필수입력 값을 입력하세요.'
      })
    }
  }
  const onAddition = () => {
    openProductSearchModal((value: ProductSearchProductTableModel[]) => {
      const addRowKeys = value.map((it) => it.productKey.toString())
      const itemKeys = items.value?.map((it) => it.productKey?.toString())
      if (itemKeys?.some((it) => addRowKeys.includes(it ?? ''))) {
        openNotificationModal({
          content: '이미 확장형 이미지가 등록되었습니다.'
        })
      } else {
        let rowNum = 0
        const addRow = value.map((it): ExhibitionCommonExtensibleImageManagementTableModel => {
          return {
            ...it,
            rowNum: (rowNum += 1),
            productKey: Number(it.productKey),
            sellerKey: Number(it.sellerKey),
            lastModifiedDate: it?.lastModifiedYyyymmdd,
            createdDate: it?.createdYyyymmdd,
            lastSaleStatusName: it?.lastProductSalesStatusName,
            createdByName: `${it?.createdByName} (${it?.createdBy})`,
            lastModifiedByName: `${it?.lastModifiedByName} (${it?.lastModifiedBy})`,
            productDisplayYn: renderLabelEnum(exhibitionCommonFlagRegistrationDisplayYnOption, it?.displayYn ?? ''),
            isSelected: false
          }
        })
        items.value = [
          ...addRow,
          ...(items.value?.map((it) => {
            return { ...it, rowNum: (rowNum += 1) }
          }) ?? [])
        ]
      }
    })
  }
  const onDelete = () => {
    if (listChecked.value.length > 0) {
      openConfirmModal({
        content: '선택하신 행을 삭제하겠습니까?',
        onConfirm() {
          closeModalByPop?.()
          exhibitionCommonExtendedImageApi
            .deleteExtendedImageList(listChecked.value)
            .then(() => {
              refreshData().catch(() => {
                // error
              })
              openNotificationModal({
                content: '삭제 되었습니다.'
              })
            })
            .catch(() => {
              // error
            })
        }
      })
    }
  }
  const onExcelDownload = () => {
    const params: ExhibitionCommonExtendedImageListRequestModel = {
      ...values,
      searchPeriodType: values.searchPeriodType.value,
      searchWordType: values.searchWordType.value,
      fromDate: formatTime(values.fromDate ?? '', FORMAT_DATE_YYYYMMDD),
      toDate: formatTime(values.toDate ?? '', FORMAT_DATE_YYYYMMDD)
    }

    exhibitionCommonExtendedImageApi
      .excelDownload(params)
      .then((res) => {
        const headerField = exhibitionCommonExtensibleImageManagementTableConfig.map((it) => it.field)
        const headerTitle = exhibitionCommonExtensibleImageManagementTableConfig.map((it) => it.header)
        const excelData = res.data.map((it: ExhibitionCommonExtendedImageListResponseModel) =>
          sortObjectFields(it, headerField as [keyof ExhibitionCommonExtendedImageListResponseModel])
        )
        if (excelData.length > 0) {
          exportExcel<ExhibitionCommonExtendedImageListResponseModel>(excelData, exportFileName('확장형 이미지 관리'), headerTitle).catch(() => {
            // error
          })
        }
      })
      .catch(() => {
        // error
      })
  }

  const onImageUpload = (index: number) => {
    handleFileChange('image', (data: any) => {
      exhibitionCommonExtendedImageApi
        .imageFileUpload(data.file)
        .then((res) => {
          const data: ExhibitionTemplateFileUploadResponseModel = res.data
          setTableFieldValue(`modifyRequestList.${index}.filePathName`, data?.filePathName)
          setTableFieldValue(`modifyRequestList.${index}.fileName`, data?.fileName)
        })
        .catch(() => {
          // error
        })
    })
  }

  return {
    values,
    setFieldValue,
    refFilterDate,
    handleChangeCountDate,
    sellerWrapperRef,
    onResetForm,
    handleSearch,
    onSave,
    onDelete,
    onExcelDownload,
    onAddition,
    items,
    isLoading,
    totalItems,
    onPageChange,
    setTableFieldValue,
    productWrapperRef,
    brandWrapperRef,
    tableFormValues,
    onRowSelected,
    onSelectAllChange,
    onImageUpload
  }
}

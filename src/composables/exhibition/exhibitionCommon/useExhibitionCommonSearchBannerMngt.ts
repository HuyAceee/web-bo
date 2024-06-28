import { countMatches } from '@/common/common'
import { CHARACTER_SEPARATOR, DEFAULT_DATE_FORMAT_DOT, FORMAT_DATE_YYYYMMDD, TEXT_MAX_NUMBER_50 } from '@/common/constant'
import { formatDate } from '@/common/dateTimeUtils'
import { DATETIME_END_REQUIRED, DATETIME_MESSAGES, DATETIME_START_REQUIRED } from '@/common/validation/errorMessages'
import { useWatchCheckAll } from '@/composables/common/useWatchCheckAll'
import { useModalNotification } from '@/composables/widgets'
import { useFormFilterTable } from '@/composables/widgets/form/useFormFilterTable'
import { GenericOptionType, YnOptions } from '@/models/common'
import { ExhibitionCommonSearchBannerGetListParamsModelRequest } from '@/models/services/requests/exhibition/ExhibitionSearchBannerModelRequest'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { ExhibitionSearchPeriodType, ExhibitionSearchWordType } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonModel'
import { ExhibitionSearchBannerMngtFormQueryModel, ExhibitionSearchBannerModel } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonSearchBannerModel'
import { exhibitionSearchBannerApi } from '@/services/api/exhibition/ExhibitionSearchBannerApi'
import { ref, watch } from 'vue'
import { mixed, string } from 'yup'

export const useExhibitionCommonSearchBannerMngt = () => {
  const exhibitionStatusOptions: GenericOptionType<YnOptions | 'all'>[] = [
    {
      label: '전체',
      value: 'all'
    },
    {
      label: '전시',
      value: YnOptions.Y
    },
    {
      label: '비전시',
      value: YnOptions.N
    }
  ]

  const applyChannelOptions: GenericOptionType<keyof ExhibitionSearchBannerMngtFormQueryModel>[] = [
    {
      label: '전체',
      value: 'applyChannelAllYn'
    },
    {
      label: 'PC',
      value: 'applyChannelPcYn'
    },
    {
      label: '모바일',
      value: 'applyChannelMobileYn'
    },
    {
      label: '모바일-웹',
      value: 'applyChannelMobileWebYn'
    }
  ]

  const periodOptions: GenericOptionType<ExhibitionSearchPeriodType>[] = [
    {
      label: '전시 시작일',
      value: ExhibitionSearchPeriodType.START_DATE
    },
    {
      label: '전시 종료일',
      value: ExhibitionSearchPeriodType.END_DATE
    },
    {
      label: '등록일',
      value: ExhibitionSearchPeriodType.CREATED_DATE
    },
    {
      label: '수정일',
      value: ExhibitionSearchPeriodType.MODIFIED_DATE
    }
  ]

  const searchOptions: GenericOptionType<ExhibitionSearchWordType>[] = [
    {
      label: '배너코드',
      value: ExhibitionSearchWordType.KEY
    },
    {
      label: '등록자',
      value: ExhibitionSearchWordType.CREATED_BY
    },
    {
      label: '수정자',
      value: ExhibitionSearchWordType.MODIFIED_BY
    }
  ]

  const defaultValue: ExhibitionSearchBannerMngtFormQueryModel = {
    displayYn: 'all',
    applyChannelAllYn: YnOptions.Y,
    applyChannelPcYn: YnOptions.Y,
    applyChannelMobileYn: YnOptions.Y,
    applyChannelMobileWebYn: YnOptions.Y,
    searchPeriodType: periodOptions[0],
    searchWordType: ExhibitionSearchWordType.KEY
  }

  const schema = {
    applyChannelAllYn: string().trim(),
    applyChannelPcYn: string().trim(),
    applyChannelMobileYn: string().trim(),
    searchPeriodType: mixed().required(),
    fromDate: string().trim().required(DATETIME_START_REQUIRED),
    toDate: string().trim().required(DATETIME_END_REQUIRED)
  }

  const { openModal: openNotification } = useModalNotification()

  const searchCustomerRef = ref()

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
    refreshData,
    clearData,
    validate
  } = useFormFilterTable<ExhibitionSearchBannerModel, ExhibitionSearchBannerMngtFormQueryModel>({
    initialValuesForm: defaultValue,
    fetchDataCallback: (page, size) => fetchData(page, size),
    validateSchema: schema,
    disabledFetchApiFirst: true
  })

  watch(() => values.searchWordType, () => {
    setFieldValue('searchWord', '')
  })

  useWatchCheckAll(values, {
    setFieldValue,
    checkAllKeyDependency: 'applyChannelAllYn',
    checkListKeyDependencies: ['applyChannelPcYn', 'applyChannelMobileYn', 'applyChannelMobileWebYn']
  })

  const fetchData = async (page: number, size: number): Promise<DataTablePaginationResponseModel<ExhibitionSearchBannerModel>> => {
    try {
      const query: ExhibitionCommonSearchBannerGetListParamsModelRequest = {
        ...values,
        fromDate: formatDate(values.fromDate ?? '', DEFAULT_DATE_FORMAT_DOT, FORMAT_DATE_YYYYMMDD),
        toDate: formatDate(values.toDate ?? '', DEFAULT_DATE_FORMAT_DOT, FORMAT_DATE_YYYYMMDD),
        displayYn: values.displayYn === 'all' ? null : values.displayYn,
        searchPeriodType: values.searchPeriodType?.value ?? '',
        pageNum: page + 1,
        rowSize: size
      }

      const { data, totalItems } = await exhibitionSearchBannerApi.getList(query)
      return Promise.resolve({
        data,
        totalItems
      })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  const onSubmit = async () => {
    const { valid, errors } = await validate()
    if (valid) {
      clearData()
      refreshData().catch(() => { })
    } else {
      let message: string = '필수입력 값을 입력하세요.'
      if (errors.fromDate) {
        message = DATETIME_MESSAGES[errors.fromDate]
      } else if (errors.toDate) {
        message = DATETIME_MESSAGES[errors.toDate]
      }
      openNotification({ content: message })
    }
  }

  const onReset = () => {
    searchCustomerRef.value?.handleReset()
    handleResetFormFilter()
    clearData()
  }

  const acceptMaxKeyWordsQuery = (event: KeyboardEvent) => {
    const value = (event?.target as HTMLInputElement)?.value
    if (
      values.searchWordType === ExhibitionSearchWordType.KEY &&
      value &&
      countMatches(value, CHARACTER_SEPARATOR) >= TEXT_MAX_NUMBER_50 - 1 &&
      event.key === CHARACTER_SEPARATOR
    ) {
      event.preventDefault()
    }
  }

  const handleAcceptMaxKeyWords = (value: string) => {
    if (
      values.searchWordType === ExhibitionSearchWordType.KEY &&
      value &&
      countMatches(value, CHARACTER_SEPARATOR) >= TEXT_MAX_NUMBER_50 - 1
    ) {
      const tempValue = value.split(CHARACTER_SEPARATOR).slice(0, TEXT_MAX_NUMBER_50).join(CHARACTER_SEPARATOR)
      setFieldValue('searchWord', tempValue)
    } else {
      setFieldValue('searchWord', value)
    }
  }

  return {
    exhibitionStatusOptions,
    applyChannelOptions,
    periodOptions,
    searchOptions,
    searchCustomerRef,
    values,
    setFieldValue,
    acceptMaxKeyWordsQuery,
    handleAcceptMaxKeyWords,
    currentFilterDate,
    handleChangeCountDate,
    handleResetFormFilter,
    items,
    isLoading,
    onPageChange,
    totalItems,
    refTable,
    refreshData,
    onSubmit,
    onReset
  }
}
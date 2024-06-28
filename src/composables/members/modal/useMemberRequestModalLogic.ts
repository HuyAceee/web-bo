import { useDataTablePagination, useModalNotification } from '@/composables'
import { useForm } from 'vee-validate'
import { defaultPageState, WelfareSelectOptionType } from '@/models'
import { onMounted, ref } from 'vue'
import { handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD, isEmptyObject } from '@/common'
import { PageState } from 'primevue/paginator'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { number, object, string } from 'yup'
import { memberSearchApi } from '@/services/api/members/MemberSearchApi'
import { MemberRequestRequestConvertor } from '@/models/services/requests/members/MemberRequest'
import {
  memberRequestAccountStatusCodeResponse,
  memberRequestGradeCode,
  memberRequestMarketingAgreeYn,
  memberRequestHoldingOfficeYn,
  MemberRequestModalProps,
  MemberRequestModel,
  MemberRequestTableModel,
  MemberSearchTableModel
} from '@/models/views/members/modal/MemberRequestModel'

export const useMemberRequestModalLogic = (props: MemberRequestModalProps, onGetDataWhenPageChanged?: () => void) => {
  const currentFilterDate = ref()
  const page = ref<PageState>(defaultPageState)
  const selectValue = ref()
  const selectedProduct = ref()
  const enableQuerySearchRequest = ref(false)
  const refTable = ref()
  const customerKeysSelectOptions = ref<WelfareSelectOptionType[]>()
  const { openModal } = useModalNotification()
  const validationSchema = {
    memberKey: number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable(),
    memberId: string().email(),
    cellphoneNumber: number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable()
  }

  const { setFieldValue, values, resetForm, errors } = useForm<MemberRequestModel>({
    validationSchema: object(validationSchema)
  })

  const handleChangeCountDate = (number: number) => {
    currentFilterDate.value = number
    handleSetDateFormCustom(number)
  }

  const handleSetDateFormCustom = (number: number) => {
    const { currentDateString, lastCustomDayString } = handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(number)

    setFieldValue('startDate', lastCustomDayString)
    setFieldValue('endDate', currentDateString)
  }

  const getData = async (page: number, size: number) => {
    // refTable?.value?.clearCheckAll?.()
    onGetDataWhenPageChanged?.()
    const params = MemberRequestRequestConvertor.from(
      {
        ...values,
        cellphoneNumber: values?.cellphoneNumber?.trim() ? values?.cellphoneNumber : undefined,
        memberKey: values?.memberKey?.trim() ? values?.memberKey : undefined
      },
      page,
      size
    )

    return await memberSearchApi.search(params, props.searchType)
  }

  const {
    items: searchResults,
    totalItems: totalSearchItems,
    isLoading,
    fetchDataWith
  } = useDataTablePagination<MemberRequestTableModel | MemberSearchTableModel>(getData)

  const handleResetForm = () => {
    resetForm()
    currentFilterDate.value = null
    searchResults.value = []
    totalSearchItems.value = 0
  }

  const handleSearch = async () => {
    if (errors.value?.memberId) {
      openModal({
        content: '아이디는 유효한 이메일이어야 합니다.'
      })

      return
    }

    if (isEmptyObject(errors.value)) {
      try {
        await fetchDataWith({
          numberOfItems: page.value.rows,
          page: page.value.page
        })
      } catch {
        /* empty */
      }
    }
  }

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    if (enableQuerySearchRequest.value) {
      handleSearch().catch(() => {
        // error
      })
    } else {
      enableQuerySearchRequest.value = true
    }
  }

  const onRowSelect = (select: DataTableRowClickEvent) => {
    selectedProduct.value = select.data
    selectValue.value = {
      memberKey: select.data.id,
      memberName: select.data.memberName
    }
  }

  const handleSelectValue = () => {
    if (selectValue.value) {
      props.onSelect(selectValue.value)
      props?.onSelectRow?.(selectedProduct.value)
    } else {
      props.onCancel?.()
    }
  }

  const getCustomerKeys = () => {
    memberSearchApi
      .getCustomerKeys()
      .then((resData) => {
        customerKeysSelectOptions.value = resData.data.map((item): WelfareSelectOptionType => {
          return {
            label: `(${item.customerKey}) ` + item.customerName,
            value: item.customerKey
          }
        })
      })
      .catch(() => {
        // error
      })
  }

  onMounted(() => {
    getCustomerKeys()
  })

  return {
    setFieldValue,
    values,
    currentFilterDate,
    handleChangeCountDate,
    memberRequestMarketingAgreeYn,
    memberRequestHoldingOfficeYn,
    memberRequestAccountStatusCodeResponse,
    memberRequestGradeCode,
    handleSelectValue,
    isLoading,
    handleSearch,
    onPageChange,
    onRowSelect,
    totalSearchItems,
    searchResults,
    handleResetForm,
    refTable,
    customerKeysSelectOptions
  }
}

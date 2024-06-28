import { useDataTablePagination } from '@/composables'
import { useForm } from 'vee-validate'
import { defaultPageState } from '@/models'
import {
  ComplaintResearchMemberModalProps,
  complaintResearchMemberModalRequestAccountStatusCode,
  complaintResearchMemberModalRequestGradeCode,
  complaintResearchMemberModalRequestMarketingAgreeYn
} from '@/models/views/complaint/modal/ComplainResearchMemberModel'

import { onMounted, ref } from 'vue'
import { DAYS_PER_MONTH, handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD, isEmptyObject } from '@/common'
import { PageState } from 'primevue/paginator'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { number, object, string } from 'yup'
import { memberSearchApi } from '@/services/api/members/MemberSearchApi'
import { MemberRequestRequestConvertor } from '@/models/services/requests/members/MemberRequest'
import { MemberRequestModel, MemberRequestTableModel, MemberSearchTableModel } from '@/models/views/members/modal/MemberRequestModel'

export const useComplaintResearchMemberModalLogic = (props: ComplaintResearchMemberModalProps) => {
  const currentFilterDate = ref()
  const page = ref<PageState>(defaultPageState)
  const selectValue = ref()
  const selectedProduct = ref()

  onMounted(() => {
    handleChangeCountDate(0)
  })

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
    const params = MemberRequestRequestConvertor.from(values, page, size)
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
    handleChangeCountDate(DAYS_PER_MONTH)
  }

  const handleSearch = async () => {
    if (isEmptyObject(errors.value)) {
      await fetchDataWith({
        numberOfItems: page.value.rows,
        page: page.value.page
      })
    }
  }

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    handleSearch()
  }

  const onRowSelect = (select: DataTableRowClickEvent) => {
    selectedProduct.value = select.data
    selectValue.value = {
      memberKey: select.data.memberKey,
      memberName: select.data.memberName
    }
  }

  const handleSelectValue = () => {
    if (selectValue.value) {
      props.onSelect(selectValue.value)
    } else {
      props.onCancel?.()
    }
  }

  return {
    setFieldValue,
    values,
    currentFilterDate,
    handleChangeCountDate,
    complaintResearchMemberModalRequestAccountStatusCode,
    complaintResearchMemberModalRequestGradeCode,
    complaintResearchMemberModalRequestMarketingAgreeYn,
    handleSelectValue,
    isLoading,
    handleSearch,
    onPageChange,
    onRowSelect,
    totalSearchItems,
    searchResults,
    handleResetForm
  }
}

import { MockDataMemberPointUsageCustomerExcel } from '@/assets'
import { useFormFilterTable, useModalNotification } from '@/composables/widgets'
import {
  MemberPUCustomerListDataTableModel,
  MemberPointUsageCustomerListFormModel,
  memberPointUsageCustomerListSelectDateOptions,
  memberPointUsageCustomerTotalPointOptions,
  memberPointUsageCustomerSearchOptions,
  MemberTotalPointUsageCustomerListFormModel
} from '@/models/views/members/pointUsageList/MemberPointUsageCustomerListModel'
import { memberPointUsageListApi } from '@/services/api/members/MemberPointUsageListApi'
import { ref, watch } from 'vue'
import * as yup from 'yup'

export const useMemberPointUsageCustomerList = () => {
  const sumItems = ref<MemberTotalPointUsageCustomerListFormModel[]>([])
  const { openModal: showModal } = useModalNotification()
  const isDisable = ref(false)
  const emptyForm: MemberPointUsageCustomerListFormModel = {
    memberPoint: memberPointUsageCustomerTotalPointOptions[0].value,
    fromDate: '',
    toDate: '',
    keyword: '',
    customer: '',
    contractStatus: memberPointUsageCustomerTotalPointOptions[0],
    customerStatus: memberPointUsageCustomerTotalPointOptions[0],
    searchType: memberPointUsageCustomerSearchOptions[0]
  }

  const formSchema = {
    minimumPoint: yup.number().positive().min(1).lessThan(yup.ref('maximumPoint')),
    maximumPoint: yup.number().positive().min(1).moreThan(yup.ref('minimumPoint'))
  }

  const fetchDataCallback = (page: number, size: number) => {
    return memberPointUsageListApi.getPointUsageCustomerList({ pageNum: page, rowSize: size })
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
    onRowSelected,
    onSelectAllChange,
    totalItems,
    refTable,
    validate
  } = useFormFilterTable<MemberPUCustomerListDataTableModel, MemberPointUsageCustomerListFormModel>({
    initialValuesForm: emptyForm,
    fetchDataCallback,
    validateSchema: formSchema
  })

  const handleSubmitForm = async () => {
    // const formFilter = JSON.stringify(values)
    const { errors: e } = await validate()
    if (Object.keys(e).length !== 0) {
      showModal?.({
        content: '포인트 최소~최대 입력 구간을 재설정 하세요.',
        buttonLabel: '확인'
      })
    } else {
      // handle form data
    }
  }

  watch(
    () => values.searchType,
    (newValue) => {
      isDisable.value = !!newValue
    }
  )

  const dataExport = MockDataMemberPointUsageCustomerExcel

  return {
    values,
    setFieldValue,
    handleResetFormFilter,
    currentFilterDate,
    handleChangeCountDate,
    memberPointUsageCustomerListSelectDateOptions,
    items,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    totalItems,
    refTable,
    memberPointUsageCustomerTotalPointOptions,
    memberPointUsageCustomerSearchOptions,
    handleSubmitForm,
    dataExport,
    sumItems,
    isDisable
  }
}

import { useFormFilterTable } from '@/composables/widgets'
import {
  MemberAutomatedShippingListFormModel,
  memberListSelectDateOptionsConfig
} from '@/models/services/responses/members/MemberAutomatedShippingListModel'
import { MemberAutomatedShippingDataTableModel } from '@/models/views/members/automatedShippingList/MemberAutomatedShippingListModel'
import { memberAutomatedShippingListApi } from '@/services/api/members/MemberAutomatedShippingListApi'

export const useMemberAutomatedShippingList = () => {
  const emptyForm: MemberAutomatedShippingListFormModel = {
    shippingCategory: 1,
    isUse: 1,
    dateSelect: memberListSelectDateOptionsConfig[0],
    fromDate: '',
    toDate: '',
    keyword: ''
  }

  const fetchDataCallback = (page: number, size: number) => {
    return memberAutomatedShippingListApi.getAutomatedShippings({
      pageNum: page,
      rowSize: size
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
    onRowSelected,
    onSelectAllChange,
    totalItems,
    refTable
  } = useFormFilterTable<MemberAutomatedShippingDataTableModel, MemberAutomatedShippingListFormModel>({
    initialValuesForm: emptyForm,
    fetchDataCallback
  })

  return {
    values,
    setFieldValue,
    handleResetFormFilter,
    currentFilterDate,
    handleChangeCountDate,
    items,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    totalItems,
    refTable
  }
}

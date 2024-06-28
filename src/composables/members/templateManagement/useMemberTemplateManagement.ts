import { useFormFilterTable } from '@/composables/widgets'
import { memberTemplateManagementApi } from '@/services/api/members/MemberTemplateManagementApi'
import {
  MemberTemplateManagementDataTableModel,
  MemberTemplateManagementFormModel,
  memberTemplateManagementFormConfig
} from '@/models/views/members/templateManagement/MemberTemplateManagementModel'

export const useMemberTemplateManagement = () => {
  const initialData: MemberTemplateManagementFormModel = {
    shippingDirectoryLevel: '1',
    listRegistered: memberTemplateManagementFormConfig.listSelectRow1.options[0],
    templateStatus: '1',
    searchSelect: memberTemplateManagementFormConfig.listSelectRow3.options[0],
    inputSearch: ''
  }

  const fetchDataCallback = (page: number, size: number) => {
    return memberTemplateManagementApi.getMemberTemplateManagementList({
      pageNum: page,
      rowSize: size
    })
  }

  const { values, setFieldValue, handleResetFormFilter, items, isLoading, onPageChange, onRowSelected, onSelectAllChange, totalItems, refTable } =
    useFormFilterTable<MemberTemplateManagementDataTableModel, MemberTemplateManagementFormModel>({
      initialValuesForm: initialData,
      fetchDataCallback
    })

  return {
    values,
    setFieldValue,
    handleResetFormFilter,
    items,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    totalItems,
    refTable,
    ...memberTemplateManagementFormConfig
  }
}

import { DEFAULT_DATE_FORMAT, OPERATE_ADMINISTRATOR_REGISTRATION, getDateByFormat, onpenWindowWithQueryString } from '@/common'
import { removeEmptyObjectProperties } from '@/common/common'
import { useBaseFormFilterTable, useCheckbox, useModalConfirm, useModalNotification } from '@/composables'
import { WelfareSelectOptionType } from '@/models'
import {
  OperatingAdministratorsFormModel,
  OperatingAdministratorsTableModel,
  OperatingDataFieldFormListConfig,
  OperatingManagerSearchType,
  OperatingPermissionUseStatusModel,
  operatingListSelectDateOrderDetailOptions,
  operatingPermisstionOptions
} from '@/models/views/operating/adminManagement/OperatingAdministratorsListOfAdministratorsModel'
import { operatingAdministratorApi } from '@/services/api/operating/OperatingAdministratorsApi'
import { computed, onMounted, ref } from 'vue'

export const useAdministratorsListOfAdministrators = () => {
  const { openModal } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()
  const authorityGroupsNames = ref<WelfareSelectOptionType[]>([])
  const statusOfUse = OperatingDataFieldFormListConfig.statusOfUse
  const listButtonDateFilter = OperatingDataFieldFormListConfig.listButtonDateFilter
  const dataHeaderAdministratorsTableModalConfig = OperatingDataFieldFormListConfig.dataHeaderAdministratorsTableModalConfig
  const emptyForm: OperatingAdministratorsFormModel = {
    authorityGroupKey: operatingPermisstionOptions[0].value,
    isActive: OperatingPermissionUseStatusModel.ALL,
    startDate: '',
    endDate: '',
    fromDate: '',
    toDate: '',
    searchType: OperatingManagerSearchType.UNDEFINED,
    searchWord: '',
    durationItem: '',
    dateSelect: operatingListSelectDateOrderDetailOptions[0]
  }

  const handleGetAuthorityGroupsNames = async () => {
    try {
      const { data } = await operatingAdministratorApi.getAuthorityGroupsNames()
      const dataMapping = data.map((item) => ({ value: item.groupKey, label: item.groupName }))?.sort((a, b) => a?.value - b?.value)
      authorityGroupsNames.value = dataMapping
    } catch (error) {
      /* empty */
    }
  }

  onMounted(() => {
    handleGetAuthorityGroupsNames()
  })
  const fetchDataCallback = async (pageNum: number, rowSize: number) => {
    const { dateSelect, fromDate = '', toDate = '', ...otherValues } = values
    const isActiveData = (isActive.listChecked.value.length === 2 ? '' : isActive.listChecked.value?.[0] ?? '') as OperatingPermissionUseStatusModel
    const params = {
      ...otherValues,
      startDate: fromDate ? getDateByFormat(fromDate, DEFAULT_DATE_FORMAT) : '',
      endDate: toDate ? getDateByFormat(toDate, DEFAULT_DATE_FORMAT) : '',
      durationItem: dateSelect?.value ?? '',
      isActive: isActiveData,
      fromDate: '',
      toDate: ''
    }
    const data = await operatingAdministratorApi.getAdministrator({
      ...removeEmptyObjectProperties(params),
      pageNum: pageNum + 1,
      rowSize
    })
    clearChecked()
    refTable?.value?.clearCheckAll()
    return data
  }

  const listStatusOfUseYnCheckBoxType = computed(() => {
    return statusOfUse.list.filter((item) => item.id !== 'all').map((item) => item.id)
  })

  const isActive = useCheckbox(listStatusOfUseYnCheckBoxType)
  const listActionCheckBox = computed(() => {
    return {
      isActive
    }
  })

  const handleSubmitAndValidate = () => {
    if (!values.fromDate) {
      openModal({
        content: '시작 날짜를 선택 해주세요.'
      })
      return
    }
    if (!values.toDate) {
      openModal({
        content: '종료 날짜를 선택 해주세요.'
      })
      return
    }
    onSubmitForm()
  }

  const onClickManagerKey = (value?: OperatingAdministratorsTableModel) => {
    const { managerKey = '' } = value ?? ({} as OperatingAdministratorsTableModel)
    onpenWindowWithQueryString(
      OPERATE_ADMINISTRATOR_REGISTRATION,
      managerKey
        ? {
            managerKey
          }
        : {}
    )
  }

  const onUpdateGroupStatus = async (isActive: OperatingPermissionUseStatusModel) => {
    if (!listChecked.value.length) return
    openModalConfirm({
      content:
        isActive === OperatingPermissionUseStatusModel.UNUSED ? '선택 항목을 미사용 처리 하시겠습니까?' : '선택 항목을 사용 상태로 변경하시겠습니까?',
      onConfirm: async () => {
        try {
          closeModalByPop?.()
          const managerKeys = listChecked.value.map((item) => Number(item))
          await operatingAdministratorApi.putUpdateGroupStatus({
            isActive,
            managerKeys
          })
          openModal({
            content:
              isActive === OperatingPermissionUseStatusModel.UNUSED
                ? '선택 항목이 미사용 처리 되었습니다.'
                : '선택 항목이 사용 상태로 변경 되었습니다.'
          })
          handleSubmitAndValidate()
        } catch (error) {
          /* empty */
        }
      }
    })
  }

  const {
    items,
    values,
    handleResetFilter,
    getIsCheckBox,
    handleCheckBoxChange,
    currentFilterDate,
    handleChangeCountDate,
    setFieldValue,
    refreshData,
    totalItems,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    refTable,
    listChecked,
    clearChecked
  } = useBaseFormFilterTable<OperatingAdministratorsTableModel, OperatingAdministratorsFormModel>({
    initialValuesForm: emptyForm,
    defaultValueControlFilter: { ...operatingListSelectDateOrderDetailOptions[0] },
    fetchDataCallback,
    listActionCheckBox,
    disabledFetchApiFirst: true
  })

  const onSubmitForm = () => {
    refreshData().catch(() => {})
  }
  const isDisableForm = computed(() => {
    return values.searchType !== OperatingManagerSearchType.UNDEFINED
  })

  const handleChangeFilterForm = (value: WelfareSelectOptionType) => {
    handleResetFilter()
    setFieldValue('searchType', value)
  }

  return {
    items,
    totalItems,
    statusOfUse,
    listButtonDateFilter,
    dataHeaderAdministratorsTableModalConfig,
    values,
    setFieldValue,
    handleCheckBoxChange,
    getIsCheckBox,
    currentFilterDate,
    handleChangeCountDate,
    handleResetFilter,
    handleSubmitAndValidate,
    isDisableForm,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    refTable,
    onClickManagerKey,
    onUpdateGroupStatus,
    listChecked,
    authorityGroupsNames,
    handleChangeFilterForm
  }
}

import { useFormFilterTable, useModalNotification } from '@/composables/widgets'
import { ref, watch } from 'vue'
import { DataTableRowClickEvent } from 'primevue/datatable'
import {
  DEFAULT_DATE_FORMAT,
  exportExcel,
  exportFileName,
  FORMAT_DATE_YYYY,
  formatTime,
  MEMBER_POINT_ADJUSTMENT_REGISTRATION,
  MEMBER_POINT_REGISTRATION_BULK,
  MEMBER_POINTS_DEDUCTION,
  renderSortDataTable
} from '@/common'
import { memberPointAllocationApi } from '@/services/api/members/MemberPointAllocationApi'
import { MemberPointDeductionRequestConvertor } from '@/models/services/requests/members/MemberPointDeductionRequestConvertor'
import { MemberPointProcessCategoryType } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointModel'
import { MemberPointDeductionListResponse } from '@/models/services/responses/members/MemberPointAllocationListResponse'
import { useRouter } from 'vue-router'
import { MemberPointAllocationListType } from '@/models/views/members/pointAllocationList/MemberPointAllocationListModel'
import {
  MemberPointAllocationFormModel,
  MemberWelfarePointAllocationTableConfig,
  memberPointAllocationListModelConfig
} from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAllocationListModel'
import {
  MemberPointAdjustmentListFormModel,
  MemberWelfarePointAdjustmentTableConfig
} from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAdjustmentModel'

export const useMemberWelfarePointAllocationList = (typePointAllocation: MemberPointAllocationListType) => {
  const router = useRouter()
  const initialData: MemberPointAllocationFormModel = {
    codeCustomer: '',
    pointAllocationName: '',
    pointAllocationCode: '',
    pointClassification: memberPointAllocationListModelConfig.listRadioLevelMember.options[0].value,
    pointType: memberPointAllocationListModelConfig.listSelectRow2[0].options[0],
    registrationStatus: memberPointAllocationListModelConfig.listSelectRow2[1].optionsNormal[0],
    dateSelect: memberPointAllocationListModelConfig.listSelectDate.options[0],
    fromDate: '',
    toDate: ''
  }
  const typePointAllocationValue = typePointAllocation === MemberPointAllocationListType.allocation
  const selectedMember = ref()
  const formFilterRef = ref()
  const { openModal } = useModalNotification()
  const ProductPointFileName = exportFileName(typePointAllocationValue ? 'Point-allocation' : 'Point-deduction', DEFAULT_DATE_FORMAT)

  const getMemberPointDeductionList = (page: number, size: number): Promise<MemberPointDeductionListResponse> => {
    return memberPointAllocationApi.getMemberPointDeductionList(MemberPointDeductionRequestConvertor.from(values, page, size))
  }

  const getMemberPointAllocationList = (page: number, size: number): Promise<MemberPointDeductionListResponse> => {
    return memberPointAllocationApi.getMemberPointAllocationList(MemberPointDeductionRequestConvertor.from(values, page, size))
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
    totalItems,
    refTable,
    refreshData
  } = typePointAllocationValue
    ? useFormFilterTable<MemberPointAdjustmentListFormModel, MemberPointAllocationFormModel>({
        initialValuesForm: initialData,
        fetchDataCallback: getMemberPointAllocationList,
        disabledFetchApiFirst: true
      })
    : useFormFilterTable<MemberPointAdjustmentListFormModel, MemberPointAllocationFormModel>({
        initialValuesForm: initialData,
        fetchDataCallback: getMemberPointDeductionList,
        disabledFetchApiFirst: true
      })

  watch(
    () => values.pointClassification,
    (newValue) => {
      switch (newValue) {
        case MemberPointProcessCategoryType.SPECIAL:
          setFieldValue('pointType', memberPointAllocationListModelConfig.listSelectRow2[0].optionsSpecial[0])
          break
        case MemberPointProcessCategoryType.NORMAL:
          setFieldValue('pointType', memberPointAllocationListModelConfig.listSelectRow2[0].optionsNormal[0])
          break
        default:
          setFieldValue('pointType', memberPointAllocationListModelConfig.listSelectRow2[0].options[0])
          break
      }
    }
  )

  const onSubmitForm = () => {
    if (!values.codeCustomer) {
      openModal?.({
        buttonLabel: '확인',
        content: '필수입력 항목을 입력하세요.'
      })
    } else {
      refreshData().catch(() => {})
    }
  }
  const onRowSelect = (select: DataTableRowClickEvent) => {
    selectedMember.value = select
  }

  const submitRegistration = () => {
    if (values.codeCustomer) {
      if (typePointAllocationValue) {
        router.push({
          path: MEMBER_POINT_REGISTRATION_BULK,
          query: {
            customerKey: values?.codeCustomer
          }
        })
      } else {
        router.push({
          path: MEMBER_POINTS_DEDUCTION,
          query: {
            customerKey: values?.codeCustomer
          }
        })
      }
    } else {
      openModal?.({
        buttonLabel: '확인',
        content: '고객사를 조회 해주세요'
      })
    }
  }

  const goToEditPage = () => {
    if (items.value && items.value.length > 0) {
      if (selectedMember.value) {
        router.push({
          path: MEMBER_POINT_ADJUSTMENT_REGISTRATION,
          query: {
            customerKey: selectedMember?.value?.customerKey,
            pointKey: selectedMember?.value?.pointKey
          }
        })
      } else {
        openModal?.({
          buttonLabel: '확인',
          content: '행을 선택 해주세요.'
        })
      }
    } else {
      openModal?.({
        buttonLabel: '확인',
        content: '고객사를 조회 해주세요.'
      })
    }
  }

  const resetFormFilter = () => {
    formFilterRef.value?.resetFormFilter?.()
    handleResetFormFilter()
  }

  const downloadExcel = () => {
    if (!items.value) return
    const itemsToExport = !typePointAllocationValue
      ? items.value?.map((item) => {
          return {
            ...item,
            processCategory: item?.processCategory?.title,
            detailedCategory: item?.detailedCategory?.title,
            registeredDate: item?.auditing?.registeredDate,
            register: item?.auditing?.registerName
          }
        })
      : items.value?.map((item) => {
          return {
            ...item,
            processCategory: item?.processCategory?.title,
            detailedCategory: item?.detailedCategory?.title,
            registeredDate: item?.auditing?.registeredDate,
            register: item?.auditing?.registerName,
            registrationStatus: item.auditing?.registerName,
            baseYear: item?.allocationDate && formatTime(item?.allocationDate, FORMAT_DATE_YYYY),
            startUsing: item?.useValidDate?.startDate,
            endOfUse: item?.useValidDate?.endDate,
            adjustmentDate: item?.auditing?.modifiedDate,
            coordinator: item?.auditing?.modifierName
          }
        })
    const sortedData = !typePointAllocationValue
      ? renderSortDataTable(itemsToExport, MemberWelfarePointAdjustmentTableConfig)
      : renderSortDataTable(itemsToExport, MemberWelfarePointAllocationTableConfig)
    exportExcel(
      sortedData,
      ProductPointFileName,
      !typePointAllocationValue
        ? MemberWelfarePointAdjustmentTableConfig.map((item) => item.header)
        : MemberWelfarePointAllocationTableConfig.map((item) => item.header)
    )
  }
  return {
    values,
    formFilterRef,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    // listInputRow1: memberPointAllocationListModelConfig.listInputRow1,
    // listRadioLevelMember: memberPointAllocationListModelConfig.listRadioLevelMember,
    // listSelectDate: memberPointAllocationListModelConfig.listSelectDate,
    // listSelectRow2: memberPointAllocationListModelConfig.listSelectRow2,
    handleResetFormFilter: resetFormFilter,
    items,
    isLoading,
    onPageChange,
    totalItems,
    refTable,
    onSubmitForm,
    onRowSelect,
    selectedMember,
    submitRegistration,
    goToEditPage,
    downloadExcel
  }
}

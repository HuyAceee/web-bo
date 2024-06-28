import { FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss, getDateByFormat, isEmpty } from '@/common'
import { useLoading } from '@/composables/common'
import { useMemberPointRegisTrationBase } from '@/composables/members/widgets/useMemberPointRegistrationBase'
import { useModalNotification } from '@/composables/widgets'
import { MemberPointDeductionRegistrationDataModelRequest } from '@/models/services/requests/members/MemberPointDeductionRequest'
import {
  MemberPointDeductionRegistrationParamsModel,
  MemberPointDetailedCategoryType,
  MemberPointManagementKindType,
  MemberPointProcessCategoryType,
  MemberPointRegistrationFormModel,
  MenberPointTargetKindType
} from '@/models/views/members/memberWelfarePoint/MemberWelfarePointModel'
import { MemberSearchUsagePointModel } from '@/models/views/members/modal/MemberRequestModel'
import { MemberDeliveryPointAllocationAdjustmentListModel } from '@/models/views/members/pointUsageList/MemberPointUsageListModel'
import { memberPointDeductionApi } from '@/services/api/members/MemberPointDeductionApi'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

export const useMemberPointDeductionRegistration = () => {
  const route = useRoute()
  const isLoading = ref<boolean>(false)
  const { customerKey } = route.query as MemberPointDeductionRegistrationParamsModel
  const pointDetail = ref<MemberDeliveryPointAllocationAdjustmentListModel>({} as MemberDeliveryPointAllocationAdjustmentListModel)
  const { setLoading } = useLoading()
  const { openModal: openNotification } = useModalNotification()

  const registerBtnDisabled = ref<boolean>(false)

  const emptyForm = ref<MemberPointRegistrationFormModel>({
    processCategory: MemberPointProcessCategoryType.NORMAL,
    detailedCategory: MemberPointDetailedCategoryType.NORMAL_ALL,
    targetKind: MenberPointTargetKindType.ALL_MEMBER,
    pointName: '',
    pointAmount: '',
    useStartDate: undefined,
    managerMemo: '',
    processReason: ''
  })

  const formValidationSchema = {
    processCategory: isEmpty,
    detailedCategory: isEmpty,
    pointName: isEmpty,
    useStartDate: isEmpty,
    pointAmount: isEmpty,
    processReason: isEmpty,
    targetKind: isEmpty
  }

  const {
    optionsPointType,
    tabPanelProps,
    isAllAllocationTarget,
    isSaved,
    values,
    listChecked,
    currentActive,
    isLoadingSuccess,
    isLoadingFail,
    totalSuccessItems,
    totalFailItems,
    pageItemsFail,
    pageItemsSuccess,
    inputFileEl,
    inputFileName,
    handleSubmit,
    resetFile,
    setFieldValue,
    onRegisterRecords,
    onDeleteRecords,
    onRowSelected,
    onSelectAllChange,
    onPageChange,
    handleTabChange,
    onDownload,
    downloadSampleFile,
    resetForm,
    openFileInput,
    onSave,
    handleFileUpload,
    handleRegisterMember,
    setValues,
    targetKindOptions,
    items,
    onResetDataTable,
    handleDownloadAllResult,
    handleExportExcel,
    listCheckedMember,
    onRowSelectedMember,
    onClickDeleteRecords,
    onSelectAllChangeMember,
    showModelSearchMember,
    memberItems,
    onDownloadResult,
    refTable,
    memberBulkItems,
    bulkItems,
    isLoadingBulk,
    memberAllItems,
    isLoadingMember,
    resultItems,
    isLoadingResult,
    allResultItems,
    fetchDataSuccessResult,
    page,
    isSubmitted
  } = useMemberPointRegisTrationBase(formValidationSchema, emptyForm)

  const renderDataForm = computed(() => {
    const { detailedCategory, managementKind, pointAmount, pointName, processCategory, targetKind, managerMemo } = pointDetail.value
    return {
      managementKind: managementKind.code,
      processCategory: processCategory.code,
      detailedCategory: detailedCategory.code,
      targetKind: targetKind.code,
      managerMemo,
      useStartDate: values.useStartDate,
      pointName,
      pointAmount: pointAmount?.toString()
    }
  })

  const onGetPointDetail = async (customerKey: string | undefined, pointKey: string | undefined) => {
    try {
      setLoading?.(true)
      if (!customerKey || !pointKey) return
      isLoading.value = true
      const { data } = await memberPointDeductionApi.getPointDeductionDetail(customerKey, pointKey as string)
      isSubmitted.value = true
      const dataMapping = data.foMemberList.map((member) => ({
        cellphoneNumber: member.memberDetails.cellphone,
        customerKey: member.memberDetails.customerDetails.customerKey,
        customerName: member.memberDetails.customerDetails.customerName,
        memberKey: member.memberDetails.memberKey,
        memberId: member.memberDetails.memberId,
        memberName: member.memberDetails.memberName,
        pointBalance: member.pointAmount
      })) as MemberSearchUsagePointModel[]
      memberItems.value = dataMapping
      allResultItems.value = dataMapping
      fetchDataSuccessResult({
        numberOfItems: page.value.rows,
        page: page.value.page
      })
      pointDetail.value = data
      setValues(renderDataForm.value)
    } catch (error) {
      /* empty */
    } finally {
      isLoading.value = false
      setLoading?.(false)
    }
  }

  const onRegister = handleSubmit(
    async (values) => {
      try {
        if (customerKey) {
          setLoading?.(true)
          const foMembers =
            items.value?.map((item) => ({
              foMemberKey: (item?.memberKey as string) ?? '',
              pointAmount: item?.pointAmount ?? item?.pointBalance,
              managerMemo: item?.managerMemo
            })) ?? []
          const reqData: MemberPointDeductionRegistrationDataModelRequest = {
            ...values,
            useValidDate: {
              startDate: getDateByFormat(values?.useStartDate ?? '', FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss)
            },
            pointAmount: -Number(values.pointAmount),
            customerKey: customerKey as string,
            managementKind: MemberPointManagementKindType.DEDUCTION,
            foMembers
          }
          const { data } = await memberPointDeductionApi.registerPointDeduction(customerKey as string, reqData)
          onGetPointDetail(customerKey as string, data?.pointKey?.toString())
          if (data?.pointKey) {
            registerBtnDisabled.value = true
            openNotification({
              content: '차감등록이 완료되었습니다.'
            })
          }
        }
      } catch (error) {
        /* empty */
      } finally {
        setLoading?.(false)
      }
    },
    () => {
      openNotification({
        content: '필수입력 값을 입력하세요.'
      })
    }
  )

  const totalPoint = computed(() => {
    if (!values.pointAmount || !pointDetail.value?.foMemberCount) return 0
    return (values.pointAmount as number) * ((pointDetail.value?.foMemberCount ?? memberBulkItems.value.length) as number) || 0
  })

  const isDisabled = computed(() => {
    return !!pointDetail.value.pointKey
  })

  return {
    registerBtnDisabled,
    optionsPointType,
    targetKindOptions,
    tabPanelProps,
    isAllAllocationTarget,
    isSaved,
    values,
    listChecked,
    currentActive,
    isLoadingSuccess,
    isLoadingFail,
    totalSuccessItems,
    totalFailItems,
    pageItemsFail,
    pageItemsSuccess,
    inputFileEl,
    inputFileName,
    resetFile,
    setFieldValue,
    onRegisterRecords,
    onDeleteRecords,
    onRowSelected,
    onSelectAllChange,
    onPageChange,
    handleTabChange,
    onDownload,
    downloadSampleFile,
    resetForm,
    openFileInput,
    onSave,
    handleFileUpload,
    handleRegisterMember,
    onRegister,
    memberItems,
    items,
    onDownloadResult,
    handleDownloadAllResult,
    showModelSearchMember,
    onRowSelectedMember,
    onSelectAllChangeMember,
    onResetDataTable,
    handleExportExcel,
    onClickDeleteRecords,
    listCheckedMember,
    pointDetail,
    refTable,
    totalPoint,
    memberBulkItems,
    isDisabled,
    bulkItems,
    isLoadingBulk,
    memberAllItems,
    isLoadingMember,
    resultItems,
    isLoadingResult
  }
}

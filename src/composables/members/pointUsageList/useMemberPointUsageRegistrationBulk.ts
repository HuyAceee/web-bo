import {
  FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm,
  FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss,
  MEMBER_POINT_ADJUSTMENT_REGISTRATION,
  TEXTAREA_NUMBER_200,
  getDateByFormat,
  isEmpty,
  isEmptyObject,
  isString,
  onpenWindowWithQueryString
} from '@/common'
import { useAuthUserInformation } from '@/composables/authentication/userInfo/useAuthUserInformation'
import { useLoading, useNotificationMaxLength } from '@/composables/common'
import { useMemberPointRegisTrationBase } from '@/composables/members/widgets/useMemberPointRegistrationBase'
import { useModalNotification } from '@/composables/widgets'
import {
  MemberPointDeductionRegistrationParamsModel,
  MemberPointDetailedCategoryType,
  MemberPointProcessCategoryType,
  MemberPointRegistrationFormModel,
  MenberPointTargetKindType
} from '@/models/views/members/memberWelfarePoint/MemberWelfarePointModel'
import { MemberSearchUsagePointModel } from '@/models/views/members/modal/MemberRequestModel'
import { MemberDeliveryPointAllocationAdjustmentListModel } from '@/models/views/members/pointUsageList/MemberPointUsageListModel'
import { memberPointUsageListApi } from '@/services/api/members/MemberPointUsageListApi'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export const useMemberPointUsageRegistrationBulk = () => {
  const { query } = useRoute()

  const { openModal: showNotification } = useModalNotification()
  const { setLoading } = useLoading()
  const { userInfo } = useAuthUserInformation()
  const isLoading = ref<boolean>(false)
  const pointHistories = ref<MemberDeliveryPointAllocationAdjustmentListModel[]>([])
  const pointDetail = ref<MemberDeliveryPointAllocationAdjustmentListModel>({} as MemberDeliveryPointAllocationAdjustmentListModel)
  const { customerKey, pointKey } = query as MemberPointDeductionRegistrationParamsModel
  const emptyForm = ref<MemberPointRegistrationFormModel>({
    processCategory: MemberPointProcessCategoryType.NORMAL,
    detailedCategory: MemberPointDetailedCategoryType.NORMAL_ALL,
    pointName: '',
    pointAmount: '',
    managerMemo: '',
    targetKind: MenberPointTargetKindType.ALL_MEMBER,
    useStartDate: undefined,
    useEndDate: undefined
  })

  const formValidationSchema = {
    detailedCategory: isEmpty,
    managerMemo: isString,
    pointName: isEmpty,
    pointAmount: isEmpty,
    processCategory: isEmpty,
    targetKind: isEmpty,
    useEndDate: isEmpty,
    useStartDate: isEmpty
  }

  const {
    optionsPointType,
    tabPanelProps,
    isAllAllocationTarget,
    isSubmitted,
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
    handleFileUpload,
    handleRegisterMember,
    handleSubmit,
    setValues,
    errors,
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
    memberBulkItems,
    onDownloadResult,
    refTable,
    bulkItems,
    isLoadingBulk,
    memberAllItems,
    isLoadingMember,
    resultItems,
    isLoadingResult,
    allResultItems,
    page,
    fetchDataSuccessResult
  } = useMemberPointRegisTrationBase(formValidationSchema, emptyForm)

  const handleSubmitForm = handleSubmit(async (values) => {
    try {
      setLoading?.(true)
      const foMembers =
        items.value?.map((item) => ({
          foMemberKey: item?.memberKey,
          pointAmount: item?.pointAmount ?? item?.pointBalance ?? (values?.pointAmount as number),
          managerMemo: item?.managerMemo
        })) ?? []
      const { data } = await memberPointUsageListApi.postPointAllocationAdjustmentList(customerKey ?? '', {
        ...values,
        customerKey: customerKey ?? '',
        pointAmount: Number(values?.pointAmount),
        pointName: values?.pointName ?? '',
        useValidDate: {
          endDate: getDateByFormat(values?.useEndDate ?? '', FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss),
          startDate: getDateByFormat(values?.useStartDate ?? '', FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss)
        },
        foMembers
      })
      fetchDataCallback(customerKey, data?.pointKey?.toString())
      fetchDataPointHistories(customerKey, data?.pointKey?.toString())
      showNotification?.({
        content: '배정 등록이 완료되었습니다.'
      })
    } catch (err) {
      /* empty */
    } finally {
      setLoading?.(false)
    }
  })

  const fetchDataPointHistories = async (customerKey: string | undefined, pointKey: string | undefined) => {
    try {
      const { data } = await memberPointUsageListApi.getUsagePointHistories(customerKey ?? '', pointKey ?? '')
      const dataMapping = data?.map((item, index) => {
        const no = data.length - index
        return {
          ...item,
          no,
          status: index === data.length - 1 ? '배정등록' : `조정등록(${no - 1})`,
          registerName: item?.auditing?.registerName,
          updateAt: item?.auditing?.registeredDate,
          processReason: index === data.length - 1 ? '최초등록' : '',
          seeDetail: {
            label: '보기',
            onClick: () => openPointAdjust()
          }
        }
      })
      pointHistories.value = dataMapping
    } catch (error) {
      /* empty */
    }
  }

  const openPointAdjust = () => {
    onpenWindowWithQueryString(MEMBER_POINT_ADJUSTMENT_REGISTRATION, {
      customerKey: customerKey ?? '',
      pointKey: pointDetail.value?.pointKey
    })
  }

  const handleSubmitValidation = () => {
    if (pointDetail.value?.pointKey) {
      if (userInfo.value.managerId) {
        openPointAdjust()
        return
      }
      showNotification?.({
        content: '페이지 권한이 없습니다. 관리자에게 문의하세요.'
      })
      return
    }
    if (isEmptyObject(errors.value)) {
      handleSubmitForm()
    } else {
      showNotification?.({
        content: '필수입력 값을 입력하세요'
      })
    }
  }

  const renderDataForm = computed(() => {
    const { detailedCategory, managementKind, pointAmount, pointName, processCategory, targetKind, managerMemo, useValidDate } = pointDetail.value
    return {
      managementKind: managementKind.code,
      processCategory: processCategory.code,
      detailedCategory: detailedCategory.code,
      targetKind: targetKind.code,
      managerMemo,
      useEndDate: getDateByFormat(useValidDate?.endDate ?? '', FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm),
      useStartDate: getDateByFormat(useValidDate?.startDate ?? '', FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm),
      pointName,
      pointAmount: pointAmount?.toString()
    }
  })

  const fetchDataCallback = async (customerKey: string | undefined, pointKey: string | undefined) => {
    try {
      setLoading?.(true)
      if (!customerKey || !pointKey) return
      isLoading.value = true
      const { data } = await memberPointUsageListApi.getUsagePointDetail(customerKey ?? '', pointKey ?? '')
      isSubmitted.value = true
      pointDetail.value = data
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
      setValues(renderDataForm.value)
    } catch (err) {
      /* empty */
    } finally {
      isLoading.value = false
      setLoading?.(false)
    }
  }

  onMounted(() => {
    if (!customerKey || !pointKey) return
    fetchDataCallback(customerKey, pointKey)
    fetchDataPointHistories(customerKey, pointKey)
  })

  onBeforeUnmount(() => {
    setLoading?.(false)
  })

  const { isReadOnly: readOnlyTextareaNotes, handelChange: handelChangeTextareaNotes } = useNotificationMaxLength({
    emit: (value: string) => {
      setFieldValue('managerMemo', value)
    },
    length: TEXTAREA_NUMBER_200
  })

  const claimStatus = computed(() => {
    if (!pointDetail?.value?.pointKey) return ''
    if (pointHistories.value.length === 1) return '배정등록'
    return '조정등록'
  })

  const totalPoint = computed(() => {
    if (!values.pointAmount || !pointDetail.value?.foMemberCount) return 0
    return (values.pointAmount as number) * ((pointDetail.value?.foMemberCount ?? memberBulkItems.value.length) as number) || 0
  })

  const isDisabled = computed(() => {
    return !!pointDetail.value.pointKey
  })

  return {
    values,
    setFieldValue,
    optionsPointType,
    handelChangeTextareaNotes,
    readOnlyTextareaNotes,
    resetForm,
    handleFileUpload,
    inputFileEl,
    openFileInput,
    resetFile,
    inputFileName,
    isAllAllocationTarget,
    handleTabChange,
    isLoadingFail,
    isLoadingSuccess,
    onDeleteRecords,
    onDownload,
    onRegisterRecords,
    onRowSelected,
    onSelectAllChange,
    pageItemsFail,
    pageItemsSuccess,
    totalFailItems,
    totalSuccessItems,
    onPageChange,
    listChecked,
    currentActive,
    tabPanelProps,
    downloadSampleFile,
    handleRegisterMember,
    isSubmitted,
    handleSubmitValidation,
    pointDetail,
    claimStatus,
    pointHistories,
    showModelSearchMember,
    targetKindOptions,
    listCheckedMember,
    onRowSelectedMember,
    onSelectAllChangeMember,
    onResetDataTable,
    handleExportExcel,
    onClickDeleteRecords,
    memberItems,
    items,
    onDownloadResult,
    handleDownloadAllResult,
    refTable,
    memberBulkItems,
    totalPoint,
    isDisabled,
    bulkItems,
    isLoadingBulk,
    memberAllItems,
    isLoadingMember,
    resultItems,
    isLoadingResult
  }
}

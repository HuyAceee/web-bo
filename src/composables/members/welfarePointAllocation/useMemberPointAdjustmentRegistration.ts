import { FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS, formatNumberDot, getDateByFormat, isEmpty } from '@/common'
import { useLoading } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { MemberPointAllocationAdjustRegistrationDataModelRequest } from '@/models/services/requests/members/MemberPointUsageListRequest'
import {
  MemberPointDetailedCategoryType,
  MemberPointManagementKindType,
  MemberPointProcessCategoryType,
  MemberPointRegistrationFormModel,
  MenberPointTargetKindType,
  memberPointNormalDetailedCategoryOptions,
  memberPointSpecialDetailedCategoryOptions,
  memberPointTargetKindOptions
} from '@/models/views/members/memberWelfarePoint/MemberWelfarePointModel'
import { memberPointAllocationApi } from '@/services/api/members/MemberPointAllocationApi'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMemberPointRegisTrationBase } from '../widgets/useMemberPointRegistrationBase'
import { TabMangerRecordModel } from '@/models/widgets/TabModel'
import { useTabManager } from '@/composables/common/useTabsManager'
import { MemberFOModel } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAdjustmentModel'

enum RegistrationStatus {
  Assignment = '배정등록',
  Adjustment = '조정등록'
}

export const useMemberPointAdjustmentRegistration = () => {
  const route = useRoute()
  const { customerKey, pointKey } = route.query

  const { setLoading } = useLoading()
  const { openModal: openNotification, closeModalByPop } = useModalNotification()
  const { openModal: openModalConfirm } = useModalConfirm()
  const { closeTabByIndex } = useTabManager()

  const registerBtnDisabled = ref<boolean>(false)
  const resgistrationStatus = ref<RegistrationStatus>(RegistrationStatus.Assignment)
  const currentData = ref()
  const memberTableRef = ref()

  const targetKindOptions = computed(() => {
    return memberPointTargetKindOptions.map((item) => {
      const renderLabel = item.value === values.targetKind ? `${item.label} (${currentData.value?.foMembers?.length ?? 0})` : item.label
      return {
        ...item,
        label: renderLabel
      }
    })
  })

  const emptyForm: MemberPointRegistrationFormModel = {
    processCategory: MemberPointProcessCategoryType.NORMAL,
    detailedCategory: MemberPointDetailedCategoryType.NORMAL_ALL,
    targetKind: MenberPointTargetKindType.ALL_MEMBER,
    pointName: '',
    pointAmount: '',
    useStartDate: undefined,
    managerMemo: '',
    processReason: ''
  }

  const formValidationSchema = {
    processCategory: isEmpty,
    detailedCategory: isEmpty,
    pointName: isEmpty,
    pointAmount: isEmpty,
    useStartDate: isEmpty,
    useEndDate: isEmpty,
    processReason: isEmpty,
    targetKind: isEmpty
  }

  const { isAllAllocationTarget, values, handleSubmit, setFieldValue, setValues } = useMemberPointRegisTrationBase(formValidationSchema, emptyForm)

  const valuesComputed = computed(() => {
    const getDetailedCategory = (detailedCategoryCode: MemberPointDetailedCategoryType) => {
      return memberPointNormalDetailedCategoryOptions
        .concat(memberPointSpecialDetailedCategoryOptions)
        .find((item) => item.value === detailedCategoryCode)?.label
    }
    return {
      totalPoints: formatNumberDot(
        currentData.value?.foMembers?.reduce((total: number, item: MemberFOModel) => total + (Number(item?.pointAmount) ?? 0), 0) +
          (memberTableRef.value?.getResultData() ?? []).reduce((total: number, item: any) => total + (Number(item?.pointAmount) ?? 0), 0)
      ),
      useStartDate: values.useStartDate ? getDateByFormat(values.useStartDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS) : '',
      useEndDate: values.useEndDate ? getDateByFormat(values.useEndDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS) : '',
      detailedCategory: values?.detailedCategory ? getDetailedCategory(values?.detailedCategory) : '',
      register:
        currentData.value?.registerId && currentData.value?.registerName
          ? `${currentData.value?.registerName}(${currentData.value?.registerKey})`
          : '',
      registeredDate: currentData.value?.registeredDate
        ? getDateByFormat(currentData.value?.registeredDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS)
        : '',
      modifier:
        currentData.value?.modifierId && currentData.value?.modifierName
          ? `${currentData.value?.modifierName}(${currentData.value?.modifierKey})`
          : '',
      modifiedDate: currentData.value?.modifiedDate ? getDateByFormat(currentData.value?.modifiedDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS) : ''
    }
  })

  onMounted(() => {
    if (customerKey && pointKey) {
      getPointDetail(customerKey as string, pointKey as string)
    }
  })

  const getPointDetail = async (customerKey: string, pointKey: string) => {
    try {
      setLoading?.(true)
      const { data } = await memberPointAllocationApi.getPointDetail(customerKey, pointKey)
      if (data) {
        currentData.value = { ...data, foMembers: handleSortFoMembers(data.foMembers) }
        const {
          managementKind,
          processCategory,
          detailedCategory,
          targetKind,
          pointName,
          pointAmount,
          useStartDate,
          useEndDate,
          managerMemo,
          processReason
        } = data
        if (managementKind === MemberPointManagementKindType.ADJUSTMENT) {
          resgistrationStatus.value = RegistrationStatus.Adjustment
        }
        const formValues: MemberPointRegistrationFormModel = {
          managementKind,
          processCategory,
          detailedCategory,
          targetKind,
          pointName,
          pointAmount,
          useStartDate,
          useEndDate,
          managerMemo,
          processReason
        }
        setValues(formValues)
      }
    } catch (error) {
      /* empty */
    } finally {
      setLoading?.(false)
    }
  }

  const onRegister = handleSubmit(
    async (values) => {
      try {
        if (customerKey && pointKey) {
          setLoading?.(true)
          const { processReason } = values
          const reqData: MemberPointAllocationAdjustRegistrationDataModelRequest = {
            customerKey: customerKey as string,
            pointKey: pointKey as string,
            managementKind: MemberPointManagementKindType.ADJUSTMENT,
            processReason,
            foMembers: memberTableRef.value?.getResultData() ?? []
          }

          await memberPointAllocationApi.registerPointAdjust(customerKey as string, pointKey as string, reqData)
          registerBtnDisabled.value = true
          getPointDetail(customerKey as string, pointKey as string)
          openNotification({
            content: '조정 요청이 완료되었습니다.'
          })
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

  const onReset = () => {
    if (currentData.value) {
      const {
        managementKind,
        processCategory,
        detailedCategory,
        targetKind,
        pointName,
        pointAmount,
        useStartDate,
        useEndDate,
        managerMemo,
        processReason
      } = currentData.value
      const formValues: MemberPointRegistrationFormModel = {
        managementKind,
        processCategory,
        detailedCategory,
        targetKind,
        pointName,
        pointAmount,
        useStartDate,
        useEndDate,
        managerMemo,
        processReason
      }
      memberTableRef.value?.reset()
      setValues(formValues)
      openNotification({ content: '초기화 되었습니다.' })
    }
  }

  const handleReset = () => {
    if (registerBtnDisabled.value) {
      openModalConfirm({
        content: '입력 내용이 있습니다. 페이지를닫으시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          onReset()
        }
      })
      return
    }

    if (currentData.value) {
      openModalConfirm({
        content: '입력 내용을 초기화하겠습니까? ',
        onConfirm: () => {
          closeModalByPop?.()
          onReset()
        }
      })
    }
  }

  const onCloseTab = (record?: TabMangerRecordModel) => {
    openModalConfirm({
      content: '입력 내용이 있습니다. 페이지를닫으시겠습니까?',
      onConfirm: () => {
        if (record) {
          closeTabByIndex(record?.index)
          closeModalByPop?.()
        }
      }
    })
    return true
  }

  const handleSortFoMembers = (data: any) => {
    return data.sort((a: MemberFOModel, b: MemberFOModel) => {
      if (a.memberName && b.memberName) {
        if (a.memberName < b.memberName) {
          return -1
        }
        if (a.memberName > b.memberName) {
          return 1
        }
      }
      return 0
    })
  }

  return {
    memberTableRef,
    currentData,
    pointKey,
    registerBtnDisabled,
    resgistrationStatus,
    targetKindOptions,
    isAllAllocationTarget,
    values,
    valuesComputed,
    setFieldValue,
    onRegister,
    onReset: handleReset,
    onCloseTab
  }
}

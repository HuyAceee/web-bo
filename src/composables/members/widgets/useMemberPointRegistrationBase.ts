import {
  ALL_MEMBER_MESSAGES,
  DATA_TABLE_NUMBER_ITEMS_PAGE_50,
  deepEqualObject,
  emailRegisterRegex,
  exportExcel,
  fileDocumentNames,
  isEmptyObject,
  isString,
  phoneNumberRegex,
  readAndValidateExcelFile,
  renderSortDataTable,
  requiredFieldMissing,
  sortObjectFields
} from '@/common'
import { handleDownloadFile } from '@/common/html'
import { useCheckBoxTable, useDataTablePagination, useModalConfirm, useModalNotification } from '@/composables/widgets'
import { MemberSpecifyInBulktabModel, defaultPageState } from '@/models'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import {
  MemberPointProcessCategoryType,
  MemberPointRegistrationFormModel,
  MenberPointTargetKindType,
  memberPointNormalDetailedCategoryOptions,
  memberPointSpecialDetailedCategoryOptions,
  memberPointTargetKindOptions
} from '@/models/views/members/memberWelfarePoint/MemberWelfarePointModel'
import { PageState } from 'primevue/paginator'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import * as yup from 'yup'
import { useMemberPointAllocationSpecifyInBulk } from '../pointUsageList/useMemberPointAllocationSpecifyInBulk'
import { memberCustomerSearchApi } from '@/services/api/members/MemberCustomerSearchApi'
import MemberSearchRequestDataTable from '@/views/members/modal/MemberSearchRequestModal.vue'
import { useModal } from '@/composables/common'
import { MemberCustomerSearchRequest } from '@/models/services/requests/members/MemberCustomerSearchRequest'
import { TabViewChangeEvent } from 'primevue/tabview'
import { memberSearchApi } from '@/services/api/members/MemberSearchApi'
import {
  memberBulkRegistrationXlsxSheetName,
  memberReasonRefusedHeaderName,
  memberReasonRefusedFieldName
} from '@/models/views/members/memberBulkRegistration/MemberBulkRegistrationModel'
import { MemberSearchUsagePointModel } from '@/models/views/members/modal/MemberRequestModel'
import { memberPointAllocationSpecifyInBulkSearchSpecificMemberHeaderTableConfig } from '@/models/views/members/pointUsageList/MemberPointAllocationSpecifyInBulkModel'
import {
  MemberPointUsageRegistrationBulkModel,
  memberPointUsageRegistrationBulkFields,
  memberPointUsageRegistrationBulkHeaders
} from '@/models/views/members/pointUsageList/MemberPointUsageRegistrationBulkModel'

export const useMemberPointRegisTrationBase = (formValidationSchema: any, emptyForm: any) => {
  const tabData = [
    { name: MemberSpecifyInBulktabModel.SUCCESS, header: '성공' },
    { name: MemberSpecifyInBulktabModel.FAIL, header: '실패' }
  ]
  const memberItems = ref<MemberSearchUsagePointModel[]>([])
  const memberBulkItems = ref<MemberSearchUsagePointModel[]>([])
  const refTable = ref()
  const { query } = useRoute()
  const { customerKey } = query
  const listId = computed(() => {
    if (currentActive.value) {
      return pageItemsFail.value?.map((item: MemberPointUsageRegistrationBulkModel) => item.id) ?? []
    }
    return pageItemsSuccess.value?.map((item: MemberPointUsageRegistrationBulkModel) => item.id) ?? []
  })
  const totalMember = ref<number>(0)
  const exceptMemberTotal = ref<number>(0)

  const optionsPointType = computed(() => {
    return values?.processCategory === MemberPointProcessCategoryType.NORMAL
      ? memberPointNormalDetailedCategoryOptions
      : memberPointSpecialDetailedCategoryOptions
  })
  const route = useRoute()
  const router = useRouter()
  const { showModal } = useModal()
  const { openModal: openNotification, closeModalByPop: closeModalByPopNotification } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()

  const emailFieldNumber = 2
  const page = ref<PageState>(defaultPageState)
  const isSubmitted = ref<boolean>(false)
  const isSaved = ref(false)
  const inputFile = ref()
  const inputFileEl = ref<HTMLInputElement | null>(null)
  const inputFileName = ref('')
  const totalItems = ref<number>()
  const totalSuccessItems = ref<number>(0)
  const totalFailItems = ref<number>(0)
  const allResultItems = ref<MemberSearchUsagePointModel[]>([])
  const allSuccessItems = ref<MemberPointUsageRegistrationBulkModel[]>([])
  const allFailItems = ref<MemberPointUsageRegistrationBulkModel[]>([])
  const { tabPanelProps, currentActive, handleTabChange: handleTabChangeExcel } = useMemberPointAllocationSpecifyInBulk()
  const { listChecked, onRowSelected, onSelectAllChange, clearChecked } = useCheckBoxTable(listId)

  const handleTabChange = (event: TabViewChangeEvent) => {
    handleTabChangeExcel(event)
    refTable?.value?.clearCheckAll()
    listChecked.value = []
  }
  const schema = yup.object().shape({
    memberKey: requiredFieldMissing,
    memberName: requiredFieldMissing,
    memberId: requiredFieldMissing.matches(emailRegisterRegex, ALL_MEMBER_MESSAGES.EMAIL_INVALID),
    cellphoneNumber: requiredFieldMissing.matches(phoneNumberRegex, ALL_MEMBER_MESSAGES.PHONE_NUMBER_INVALID),
    pointBalance: requiredFieldMissing,
    managerMemo: isString,
    customerKey: requiredFieldMissing.oneOf([customerKey as string], ALL_MEMBER_MESSAGES.CUSTOMER_KEY_INVALID)
  })

  const {
    values,
    setFieldValue,
    resetForm: handleResetForm,
    errors,
    handleSubmit,
    setValues
  } = useForm<MemberPointRegistrationFormModel>({
    initialValues: emptyForm,
    validationSchema: yup.object(formValidationSchema)
  })

  const isAllAllocationTarget = computed(() => {
    return values.targetKind === MenberPointTargetKindType.ALL_MEMBER
  })

  const resetForm = () => {
    if (deepEqualObject(emptyForm?.value, values) && exceptMemberTotal.value === 0) return
    openModalConfirm({
      content: '입력 내용을 초기화하겠습니까?',
      onConfirm: () => {
        handleResetForm?.()
        closeModalByPop?.()
        totalItems.value = 0
        isSubmitted.value = false
        exceptMemberTotal.value = 0
        isSaved.value = false
        inputFile.value = null
        inputFileEl.value = null
        inputFileName.value = ''
        totalSuccessItems.value = 0
        totalFailItems.value = 0
        allResultItems.value = []
        allSuccessItems.value = []
        allFailItems.value = []
        memberAllItems.value = []
        bulkItems.value = []
        resultItems.value = []
        memberItems.value = []
        memberBulkItems.value = []
        pageItemsSuccess.value = []
        pageItemsFail.value = []
        openNotification({
          content: '초기화 되었습니다.'
        })
      }
    })
  }

  const getDataSuccess = async (page: number, size: number) => {
    return {
      totalItems: totalItems.value,
      data: allSuccessItems.value.slice(page * size, (page + 1) * size)
    } as DataTablePaginationResponseModel<MemberPointUsageRegistrationBulkModel>
  }

  const getDataFail = async (page: number, size: number) => {
    return {
      totalItems: totalItems.value,
      data: allFailItems.value.slice(page * size, (page + 1) * size)
    } as DataTablePaginationResponseModel<MemberPointUsageRegistrationBulkModel>
  }

  const {
    items: pageItemsSuccess,
    isLoading: isLoadingSuccess,
    fetchDataWith: fetchDataSuccess
  } = useDataTablePagination<MemberPointUsageRegistrationBulkModel>(getDataSuccess)

  const {
    items: pageItemsFail,
    isLoading: isLoadingFail,
    fetchDataWith: fetchDataFail
  } = useDataTablePagination<MemberPointUsageRegistrationBulkModel>(getDataFail)

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    if (isSubmitted.value) {
      fetchDataSuccessResult({
        numberOfItems: page.value.rows,
        page: page.value.page
      })
      return
    }
    if (values.targetKind === MenberPointTargetKindType.ALL_MEMBER) {
      fetchDataSuccessMember({
        numberOfItems: page.value.rows,
        page: page.value.page
      })
      return
    }
    if (values.targetKind === MenberPointTargetKindType.SPECIFIC_MEMBER) {
      fetchDataSuccessBulk({
        numberOfItems: page.value.rows,
        page: page.value.page
      })
      return
    }
    currentActive.value
      ? fetchDataFail({
          numberOfItems: page.value.rows,
          page: page.value.page
        })
      : fetchDataSuccess({
          numberOfItems: page.value.rows,
          page: page.value.page
        })
  }

  const registerMember = async () => {
    const { validItems, invalidItems } = await readAndValidateExcelFile(
      inputFile.value,
      [...memberPointUsageRegistrationBulkFields, memberReasonRefusedFieldName],
      schema,
      {
        duplicatedErrorMessage: ALL_MEMBER_MESSAGES.DUPLICATED_EMAIL_MESSAGE,
        duplicatedFieldCheck: emailFieldNumber,
        refusedFieldName: memberReasonRefusedFieldName,
        addIdField: true,
        skipHeader: true
      }
    )
    const paramListCustomer: MemberCustomerSearchRequest = {
      customerStatus: 'All',
      contractStatus: 'All',
      customerKey: '',
      customerName: '',
      bizRegNum: '',
      corpRegNum: '',
      startDate: '',
      endDate: '',
      pageNum: 1,
      rowSize: 100000
    }
    const callCustomerList = await memberCustomerSearchApi.search(paramListCustomer)
    const newDataValid = validItems?.map((item) => {
      const index = callCustomerList?.data?.findIndex((item2) => item2?.id === item?.customerKey)
      return {
        ...item,
        customerName: callCustomerList?.data?.[index] ? callCustomerList?.data?.[index]?.name : ''
      }
    })

    const newDataValidFail = invalidItems?.map((item) => {
      const index = callCustomerList?.data?.findIndex((item2) => item2?.id === item?.customerKey)
      return {
        ...item,
        customerName: callCustomerList?.data?.[index] ? callCustomerList?.data?.[index]?.name : ''
      }
    })
    allFailItems.value = newDataValidFail
    allSuccessItems.value = newDataValid
    totalSuccessItems.value = validItems.length
    totalFailItems.value = invalidItems.length
    totalItems.value = totalSuccessItems.value + totalFailItems.value

    resetFile()
    fetchDataSuccess({
      numberOfItems: page.value.rows,
      page: page.value.page
    })

    fetchDataFail({
      numberOfItems: page.value.rows,
      page: page.value.page
    })
    router.push({
      query: {
        ...route.query,
        tab: tabData[0].name
      }
    })
  }

  const openFileInput = () => {
    inputFileEl?.value && inputFileEl.value.click()
  }

  const handleRegisterMember = () => {
    registerMember()
  }

  const handleFileUpload = (event: Event) => {
    const fileItem = (event.target as HTMLInputElement).files?.[0]
    if (fileItem) {
      inputFileName.value = fileItem.name
      inputFile.value = fileItem
    }
    ;(event.target as HTMLInputElement).value = ''
  }

  const resetFile = () => {
    inputFileName.value = ''
  }

  const onSubmitRegisterMember = () => {
    const preparedData = allSuccessItems.value.filter((item: MemberPointUsageRegistrationBulkModel) => listChecked.value.includes(item.id))
    if (!preparedData.length) {
      return
    }
    allSuccessItems.value = allSuccessItems.value.filter((item: MemberPointUsageRegistrationBulkModel) => !listChecked.value.includes(item.id))

    onPageChange(page.value)
    clearChecked()
  }

  const onRegisterRecords = () => {
    if (inputFile.value) {
      openModalConfirm({
        content: '회원을 일괄등록 하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          onSubmitRegisterMember()
          openNotification({
            content: '회원이 일괄등록 되었습니다.'
          })
        }
      })
    }
  }

  const onDeleteRecords = () => {
    openModalConfirm({
      content: '선택하신 리스트를 삭제하시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        refTable?.value?.clearCheckAll()
        onClickDeleteRecordsExcel()
        openNotification({
          content: '선택된 리스트가 삭제 되었습니다.'
        })
      }
    })
  }

  const onClickDeleteRecordsExcel = () => {
    allSuccessItems.value = allSuccessItems.value.filter((item: MemberPointUsageRegistrationBulkModel) => !listChecked.value.includes(item.id))
    clearChecked()
    totalSuccessItems.value = allSuccessItems.value.length
    refTable?.value?.clearCheckAll()
    onPageChange(page.value)
  }

  const onDownload = () => {
    if (allSuccessItems.value && currentActive.value === 0) {
      const exportedData = allSuccessItems.value.map((it: MemberPointUsageRegistrationBulkModel, index: number) => {
        const { memberKey, memberName, memberId, cellphoneNumber, pointBalance, managerMemo, customerKey, customerName } = it
        return { no: index + 1, memberKey, memberName, memberId, cellphoneNumber, pointBalance, managerMemo, customerKey, customerName }
      })
      exportExcel(exportedData, memberBulkRegistrationXlsxSheetName, memberPointUsageRegistrationBulkHeaders)
    } else if (allFailItems.value) {
      const exportedData = allFailItems.value.map((it: MemberPointUsageRegistrationBulkModel, index: number) => {
        const { memberKey, memberName, memberId, cellphoneNumber, pointBalance, managerMemo, customerKey, customerName, reasonRefused } = it
        return {
          no: index + 1,
          memberKey,
          memberName,
          memberId,
          cellphoneNumber,
          pointBalance,
          managerMemo,
          customerKey,
          customerName,
          reasonRefused
        }
      })
      exportExcel(exportedData, memberBulkRegistrationXlsxSheetName, [...memberPointUsageRegistrationBulkHeaders, memberReasonRefusedHeaderName])
    }
  }

  const downloadSampleFile = () => {
    handleDownloadFile(fileDocumentNames.memberUsagePointBulkRegistration.url, fileDocumentNames.memberUsagePointBulkRegistration.url)
  }

  const onSave = () => {
    isSaved.value = true
    if (isEmptyObject(errors.value)) {
      openModalConfirm({
        content: '회원을 등록 하시겠습니까?',
        onConfirm: () => {
          isSubmitted.value = true
          closeModalByPop?.()
        }
      })
    }
  }

  const items = computed(() => {
    if (values.targetKind === MenberPointTargetKindType.ALL_MEMBER) return memberItems.value
    if (values.targetKind === MenberPointTargetKindType.SPECIFIC_MEMBER) return memberBulkItems.value
    return pageItemsSuccess.value
  })

  const targetKindOptions = computed(() => {
    return memberPointTargetKindOptions.map((item) => {
      const renderLabel =
        item.value === values.targetKind
          ? `${item.label} (${
              values.targetKind === MenberPointTargetKindType.ALL_MEMBER
                ? isSubmitted.value
                  ? items.value?.length
                  : totalMember.value - exceptMemberTotal.value
                : items.value?.length ?? 0
            }명)`
          : item.label
      return {
        ...item,
        label: renderLabel
      }
    })
  })

  const onResetDataTable = () => {
    openModalConfirm({
      content: '조회 내용을 초기화 하겠습니까?',
      onConfirm() {
        closeModalByPop?.()
        refTable?.value?.clearCheckAll()
        memberBulkItems.value = []
        fetchDataSuccessBulk({
          numberOfItems: page.value.rows,
          page: page.value.page
        })
        openNotification({
          content: '초기화 되었습니다.',
          onAccept() {
            closeModalByPopNotification?.()
          }
        })
      }
    })
  }

  const onDownloadResult = () => {
    const data = MenberPointTargetKindType.ALL_MEMBER ? memberItems.value : memberBulkItems.value
    const dataMapping = data.map((item, index) => ({
      no: index + 1,
      ...sortObjectFields(item, memberPointUsageRegistrationBulkFields as [keyof MemberSearchUsagePointModel])
    }))
    exportExcel(dataMapping, memberBulkRegistrationXlsxSheetName, memberPointUsageRegistrationBulkHeaders)
  }

  const handleDownloadAllResult = () => {
    if (values.targetKind === MenberPointTargetKindType.BULK_ALLOCATION) {
      onDownload()
      return
    }
    onDownloadResult()
  }

  const handleExportExcel = () => {
    exportExcel(
      renderSortDataTable(memberBulkItems.value, memberPointAllocationSpecifyInBulkSearchSpecificMemberHeaderTableConfig),
      memberBulkRegistrationXlsxSheetName,
      memberPointAllocationSpecifyInBulkSearchSpecificMemberHeaderTableConfig.map((item) => item.header)
    )
  }

  const onClickDeleteRecords = () => {
    if (values.targetKind === MenberPointTargetKindType.ALL_MEMBER) {
      memberItems.value = memberItems.value.filter((item) => !item.isSelected)
      fetchDataSuccessMember({
        numberOfItems: page.value.rows,
        page: page.value.page
      })
      exceptMemberTotal.value = memberItems.value.length
      refTable?.value?.clearCheckAll()
      return
    }
    if (values.targetKind === MenberPointTargetKindType.BULK_ALLOCATION) {
      onDeleteRecords()
      return
    }
    memberBulkItems.value = memberBulkItems.value.filter((item) => !item.isSelected)
    refTable?.value?.clearCheckAll()
    fetchDataSuccessBulk({
      numberOfItems: page.value.rows,
      page: page.value.page
    })
  }

  const listIdMember = computed(() => {
    return memberItems.value?.map((item) => item?.id?.toString()) ?? []
  })

  const {
    listChecked: listCheckedMember,
    onRowSelected: onRowSelectedMember,
    onSelectAllChange: onSelectAllChangeMember
  } = useCheckBoxTable(listIdMember)

  const handleRemoveRowAllMemberList = (item: MemberSearchUsagePointModel) => {
    if (memberItems.value.length === 1) {
      refTable?.value?.clearCheckAll()
    }
    memberItems.value = memberItems.value.filter((it) => it.id !== item.id)
    exceptMemberTotal.value = exceptMemberTotal.value - 1
    fetchDataSuccessMember({
      numberOfItems: page.value.rows,
      page: page.value.page
    })
  }

  const getBulkMember = async (page: number, size: number) => {
    return {
      totalItems: memberBulkItems.value?.length ?? 0,
      data: memberBulkItems.value?.slice(page * size, (page + 1) * size)
    } as DataTablePaginationResponseModel<MemberSearchUsagePointModel>
  }

  const getMember = async (page: number, size: number) => {
    return {
      totalItems: memberItems.value?.length ?? 0,
      data: memberItems.value?.slice(page * size, (page + 1) * size)
    } as DataTablePaginationResponseModel<MemberSearchUsagePointModel>
  }

  const getResultMember = async (page: number, size: number) => {
    return {
      totalItems: allResultItems.value?.length ?? 0,
      data: allResultItems.value?.slice(page * size, (page + 1) * size)
    } as DataTablePaginationResponseModel<MemberSearchUsagePointModel>
  }

  const {
    items: memberAllItems,
    isLoading: isLoadingMember,
    fetchDataWith: fetchDataSuccessMember
  } = useDataTablePagination<MemberSearchUsagePointModel>(getMember)

  const {
    items: bulkItems,
    isLoading: isLoadingBulk,
    fetchDataWith: fetchDataSuccessBulk
  } = useDataTablePagination<MemberSearchUsagePointModel>(getBulkMember)

  const {
    items: resultItems,
    isLoading: isLoadingResult,
    fetchDataWith: fetchDataSuccessResult
  } = useDataTablePagination<MemberSearchUsagePointModel>(getResultMember)

  const showModelSearchMember = () => {
    showModal?.({
      component: MemberSearchRequestDataTable,
      props: {
        defaultDataTable: items.value
      },
      events: {
        close: closeModalByPop,
        save: (data: MemberSearchUsagePointModel[]) => {
          refTable?.value?.clearCheckAll()
          const dataMapping = data.map((item) => ({
            ...item,
            removeRow: {
              label: '삭제',
              onClick: () => handleRemoveRowAllMemberList(item)
            },
            isSelected: false
          }))
          onPageChange({
            ...page.value,
            rows: DATA_TABLE_NUMBER_ITEMS_PAGE_50
          })
          if (values.targetKind === MenberPointTargetKindType.ALL_MEMBER) {
            memberItems.value = dataMapping
            exceptMemberTotal.value = dataMapping.length
            fetchDataSuccessMember({
              numberOfItems: page.value.rows,
              page: page.value.page
            })
          } else {
            memberBulkItems.value = dataMapping
            fetchDataSuccessBulk({
              numberOfItems: page.value.rows,
              page: page.value.page
            })
          }
        }
      }
    })
  }

  watch(
    () => values?.pointAmount,
    (newValue) => {
      const newMemberList = memberBulkItems.value.map((item) => {
        return {
          ...item,
          pointBalance: newValue
        }
      })
      memberBulkItems.value = newMemberList as MemberSearchUsagePointModel[]
    }
  )

  const onGetMember = async () => {
    try {
      const { totalItems } = await memberSearchApi.search({ pageNum: 1, rowSize: 0 })
      totalMember.value = totalItems
    } catch (error) {
      /* empty */
    }
  }

  onMounted(() => {
    onGetMember()
  })

  return {
    optionsPointType,
    tabPanelProps,
    isAllAllocationTarget,
    isSaved,
    isSubmitted,
    values,
    errors,
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
    memberBulkItems,
    onDownloadResult,
    refTable,
    totalMember,
    exceptMemberTotal,
    bulkItems,
    isLoadingBulk,
    memberAllItems,
    isLoadingMember,
    resultItems,
    isLoadingResult,
    allResultItems,
    fetchDataSuccessResult,
    page
  }
}

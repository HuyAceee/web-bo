import { complaintOrderCancelListModelConfig } from '@/models/views/complaint/complaintOrderCancel/ComplaintOrderCancelModel'
import { useFormFilterTable, useModalConfirm, useModalNotification } from '../widgets'
import { WelfareRadioProps, YnOptions } from '@/models'
import { useCheckbox, useLoading } from '../common'
import {
  CHARACTER_SEPARATOR,
  DEFAULT_DATE_FORMAT,
  ID_CHECKBOX_ALL,
  NEW_CONTRACT_ROUTER,
  TEXT_MAX_NUMBER_50,
  exportExcel,
  exportFileName,
  formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM,
  formatTime
} from '@/common'
import { computed, ref } from 'vue'
import { partnerListManagementApi } from '@/services/api/partner/PartnerListManagementApi'
import { PartnerListTableDataModel, partnerListDataHeaderTableModel } from '@/models/views/partner/PartnerListDataHeaderTableModel'
import { PartnerActiveRequest, PartnerListRequest } from '@/models/services/requests/partner/PartnerListRequest'
import { PartnerContractStatus, PartnerContractType, PartnerSearchType } from '@/models/views/partner/PartnerListModel'
import { useRouter } from 'vue-router'
import { PartnerListResponseModel } from '@/models/services/responses/partner/PartnerListResponse'

interface FilterListPartnerForm {
  contractType: PartnerContractType
  sellerStatus: string
  sellerCode: string
  salesCompanyName: string
  fromDate: string
  toDate: string
  searchWordSelect: string
  searchWord: string
}

export const usePartnerManagementListPage = () => {
  const contractTypeOptions = [
    { label: '전체', value: PartnerContractType.ALL },
    { label: '위수탁계약', value: PartnerContractType.CONSIGNMENT },
    { label: '직매입계약', value: PartnerContractType.DIRECT },
    { label: '몰인몰입점 (별도 메뉴에서 조회 가능)', value: '', disabled: 'disabled' }
  ]

  const searchWordSelectOptions = [
    {
      label: '판매사코드',
      value: PartnerSearchType.KEY
    },
    {
      label: '사업자등록번호',
      value: PartnerSearchType.BIZ_REG_NUMBER
    },
    {
      label: '등록자 아이디',
      value: PartnerSearchType.REGISTER_ID
    }
  ]

  const listCheckboxContractStatusList = [
    {
      id: ID_CHECKBOX_ALL,
      label: '전체'
    },
    {
      id: PartnerContractStatus.UPCOMING,
      label: '예정'
    },
    {
      id: PartnerContractStatus.STARTED,
      label: '계약'
    },
    {
      id: PartnerContractStatus.TERMINATED,
      label: '계약 종료'
    }
  ]

  const sellerStatusRadioOptions: WelfareRadioProps[] = [
    { label: '전체', value: ID_CHECKBOX_ALL },
    { label: '활성', value: YnOptions.Y },
    { label: '비활성', value: YnOptions.N }
  ]

  const router = useRouter()
  const { setLoading } = useLoading()
  const { openModal: openModalNotification, closeModalByPop: closeModalNotification } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const fileNameDownload = exportFileName('Contract-list', DEFAULT_DATE_FORMAT)
  const dateActiveNumber = complaintOrderCancelListModelConfig.listButtonDateFilter[3].value
  const initialValuesForm = {
    contractType: contractTypeOptions[0].value,
    sellerStatus: sellerStatusRadioOptions[0].value,
    sellerCode: '',
    salesCompanyName: '',
    fromDate: '',
    toDate: '',
    searchWordSelect: undefined,
    searchWord: ''
  }

  const itemsFromApi = ref<PartnerListResponseModel[]>([])

  const getPartnerList = async (page: number, size: number) => {
    const request: PartnerListRequest = {
      pageNum: page + 1,
      rowSize: size
    }

    const contactChecked = contractStatus.listChecked.value.filter((item) => item != ID_CHECKBOX_ALL)
    if (values.contractType && values.contractType != PartnerContractType.ALL) request.contractType = values.contractType
    if (contactChecked.length > 0 && !contractStatus.isCheckboxAll.value) request.contractStatus = contactChecked.join()
    if (values.sellerStatus && values.sellerStatus != ID_CHECKBOX_ALL) request.sellerStatus = values.sellerStatus
    if (values.sellerCode) request.sellerKey = values.sellerCode
    if (values.salesCompanyName) request.sellerName = values.salesCompanyName
    if (values.searchWordSelect) request.searchType = values.searchWordSelect
    if (values.searchWord) request.searchWord = values.searchWord
    if (values.fromDate) request.startDate = formatTime(values.fromDate, DEFAULT_DATE_FORMAT)
    if (values.toDate) request.endDate = formatTime(values.toDate, DEFAULT_DATE_FORMAT)
    const response = await partnerListManagementApi.getList(request)
    itemsFromApi.value = response.data
    const data = response.data.map((item, index) => {
      let contractStatus = ''
      if (item.contractStatus === PartnerContractStatus.STARTED) {
        contractStatus = '계약'
      } else if (item.contractStatus === PartnerContractStatus.UPCOMING) {
        contractStatus = '예정'
      } else if (item.contractStatus === PartnerContractStatus.TERMINATED) {
        contractStatus = '계약 종료'
      }
      let contractType = ''
      if (item.contractType === PartnerContractType.CONSIGNMENT) {
        contractType = '위수탁계약'
      } else if (item.contractType === PartnerContractType.DIRECT) {
        contractType = '직매입계약'
      }
      return {
        id: index + 1 + '',
        seller_code: item.sellerKey,
        sales_company_name: item.sellerName,
        seller_status: item.sellerStatus === YnOptions.Y ? '활성' : '비활성',
        contract_status: contractStatus,
        contract_start_date_time: item.contractStartDate ? formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM(item.contractStartDate) : '',
        contract_end_date_time: item.contractEndDate ? formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM(item.contractEndDate) : '',
        contract_type: contractType,
        company_registration_number: item.bizRegNum,
        registrant: item.auditing.registerName,
        registration_date_time: item.auditing.registeredDate ? formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM(item.auditing.registeredDate) : ''
      } as PartnerListTableDataModel
    })
    clearChecked()
    refTable.value?.clearCheckAll()
    refTable.value?.scrollToTop()
    return Promise.resolve({
      ...response,
      data,
      totalItems: response.page.totalCount
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
    totalItems,
    refTable,
    onSubmit,
    clearChecked,
    onRowSelected,
    listChecked,
    onSelectAllChange
  } = useFormFilterTable<PartnerListTableDataModel, FilterListPartnerForm>({
    initialDate: dateActiveNumber,
    initialValuesForm: initialValuesForm,
    fetchDataCallback: getPartnerList,
    disabledFetchApiFirst: true
  })

  const handleInputFieldChangeSearchWord = (e: any) => {
    const arrayValue = e.target.value.split(CHARACTER_SEPARATOR)
    if (arrayValue.length > TEXT_MAX_NUMBER_50) {
      ;(document.activeElement as HTMLInputElement).blur()
      setFieldValue('searchWord', arrayValue.splice(0, TEXT_MAX_NUMBER_50).join())
    }
  }

  const contractStatusCheckboxType = computed(() => {
    return listCheckboxContractStatusList.map((item) => item.id)
  })

  const contractStatus = useCheckbox(
    contractStatusCheckboxType,
    listCheckboxContractStatusList.map((e) => e.id)
  )

  const getIsCheckBox = (id: string) => {
    return contractStatus.getChecked(id)
  }

  const handleCheckBoxChange = (value: boolean, id: string) => {
    contractStatus.handleChangeCheckBoxItem(value, id)
  }

  const handleResetSearch = () => {
    handleResetFormFilter()
    contractStatus.setListChecked([PartnerContractStatus.ALL])
  }

  const handleDownloadExcel = () => {
    if (!items.value) return

    exportExcel(
      items.value,
      fileNameDownload,
      partnerListDataHeaderTableModel.map((item) => item.header)
    )
  }

  const itemSelects = computed(() => {
    return itemsFromApi.value?.filter((item, index) => listChecked.value.includes(`${index + 1}`))
  })

  const emptyItemChecked = () => {
    if (listChecked.value.length == 0) {
      openModalNotification({
        content: '판매사를 선택해 주세요.'
      })
    }
    return listChecked.value.length == 0
  }

  const handleActivePartner = () => {
    if (emptyItemChecked()) {
      return
    } else if (
      itemSelects.value?.find(
        (item) => item.sellerStatus === YnOptions.Y || item.bizRegNum || item.auditing.registerName || item.auditing.registeredDate
      )
    ) {
      openModalNotification({
        content: '처리할 수 없는 판매사가 포함되어 있습니다. </br>다시 확인해 주세요.'
      })
    } else if (itemSelects.value?.find((item) => item.contractStatus === PartnerContractStatus.TERMINATED)) {
      openModalConfirm({
        content: '계약종료 판매사는</br>‘활성’상태로 변경할 수 없습니다.'
      })
    } else {
      openModalConfirm({
        content: '선택하신 판매사의 상태를</br>‘활성’ 으로 변경하시겠습니까?',
        onConfirm() {
          handleCallApiActivePartner(YnOptions.Y)
          closeModalConfirm?.()
        }
      })
    }
  }

  const handleInactivePartner = () => {
    if (emptyItemChecked()) {
      return
    } else if (itemSelects.value?.find((item) => item.sellerStatus === YnOptions.N)) {
      openModalNotification({
        content: '처리할 수 없는 판매사가 포함되어 있습니다. </br>다시 확인해 주세요.'
      })
    } else if (itemSelects.value?.find((item) => item.contractStatus === PartnerContractStatus.TERMINATED)) {
      openModalConfirm({
        content: '계약종료 판매사는</br>‘활성’상태로 변경할 수 없습니다.'
      })
    } else {
      openModalConfirm({
        content: '선택하신 판매사의 상태를</br>‘비활성’상태로 변경하시겠습니까?',
        onConfirm() {
          handleCallApiActivePartner(YnOptions.N)
          closeModalConfirm?.()
        }
      })
    }
  }

  const handleCallApiActivePartner = (type: YnOptions) => {
    const body: PartnerActiveRequest = {
      sellerStatus: type,
      sellerKeyList: itemSelects.value?.map((item) => +item.sellerKey) ?? []
    }
    setLoading?.(true)
    partnerListManagementApi
      .activePartner(body)
      .then((res) => {
        if (res.data.isUpdated) {
          openModalNotification({
            content: YnOptions.Y === type ? '‘활성’ 상태로 변경되었습니다.' : '‘비활성’ 상태로 변경되었습니다.',
            onAccept() {
              onSubmit()
              clearChecked()
              closeModalNotification?.()
            }
          })
        } else if (YnOptions.N === type) {
          openModalNotification({
            content: '진행중인 주문/클레임건이 있는 경우 또는</br>미정산 내역이 있는 경우</br>판매사 상태를 비활성상태로 변경할 수 없습니다.'
          })
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading?.(false)
      })
  }

  const redirectToRegistrationPage = () => {
    router.push(NEW_CONTRACT_ROUTER)
  }

  return {
    handleInputFieldChangeSearchWord,
    contractTypeOptions,
    sellerStatusRadioOptions,
    searchWordSelectOptions,
    getIsCheckBox,
    handleCheckBoxChange,
    listCheckboxContractStatusList,
    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    items,
    isLoading,
    onPageChange,
    totalItems,
    refTable,
    handleSearch: onSubmit,
    onRowSelected,
    onSelectAllChange,
    handleResetSearch,
    handleDownloadExcel,
    handleActivePartner,
    handleInactivePartner,
    redirectToRegistrationPage
  }
}

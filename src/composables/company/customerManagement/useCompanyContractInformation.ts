import { defaultPageState } from './../../../models/uikit/WelfarePaginationProps'
import { useDataTablePagination, useModal } from '@/composables'
import { useForm } from 'vee-validate'
import {
  companyContractInformationContractStatus,
  CompanyContractInformationExcelModel,
  CompanyContractInformationFormModel,
  companyContractInformationHeaderName
} from '@/models/views/company/customerManagement/CompanyContractInformationModel'
import { onMounted, ref } from 'vue'
import { toTypedSchema } from '@vee-validate/yup'
import { object } from 'yup'
import { handleDownloadFileBlob } from '@/common/html'
import { PageState } from 'primevue/paginator'
import {
  DATA_TABLE_NUMBER_ITEMS_PAGE_50,
  DEFAULT_DATE_FORMAT_DOT,
  FORMAT_DATE_DOT_YYYY_MM_DD_HH_mm,
  exportExcel,
  exportFileName,
  formatTime
} from '@/common'
import { useRoute } from 'vue-router'
import { companyCustomerContractInformationApi } from '@/services/api/company/customerCompanies/CompanyCustomerContractInformationApi'
import CompanyReviewContractModalVue from '@/views/company/modal/CompanyReviewContractModal.vue'
import { CompanyCustomerContactModel } from '@/models/views/company/customerManagement/CompanyCustomerRegistrationModel'

export const useCompanyContractInformationLogic = () => {
  const { showModal, closeModalByPop } = useModal()
  const route = useRoute()
  const tableRef = ref()
  const page = ref<PageState>({ ...defaultPageState, rows: DATA_TABLE_NUMBER_ITEMS_PAGE_50 })
  const { values, setFieldValue } = useForm<CompanyContractInformationFormModel>({
    initialValues: {},
    validationSchema: toTypedSchema(object({}))
  })

  onMounted(() => {
    if (route.query.modal === 'extend-contract') {
      onOpenCompanyReviewContractModal()
    }
  })

  const renderContractStatusLabel = (data: string) => {
    if (data) {
      const findContractStatus = companyContractInformationContractStatus.find((item) => item.value === data) || { label: '', value: 0 }
      return findContractStatus.label
    }
    return ''
  }

  const renderSettlementDateValue = (data: string) => {
    if (data === null) {
      return ''
    }
    return `매월 ${data}일`
  }

  const getDetailContractInformation = (customerKey: string) => {
    companyCustomerContractInformationApi
      .getDetailContractsLast(customerKey)
      .then((res) => {
        const data = res.data
        setFieldValue('contractKey', data.contractKey)
        setFieldValue('customerKey', data.customerKey)
        setFieldValue('contractStartDate', data.contractStartDate)
        setFieldValue('contractEndDate', data.contractEndDate)
        setFieldValue('contractStatus', data.contractStatus)
        setFieldValue('settlementDate', data.settlementDate)
        setFieldValue('contractRegDate', data.contractRegDate)
        setFieldValue('contractFileOriginName', data.contractFileOriginName?.toString())
        setFieldValue('contractFileSize', data.contractFileSize)
        setFieldValue('contractFileDownloadLink', data.contractFileDownloadLink)
        setFieldValue('registerKey', data.auditing?.registerKey)
        setFieldValue('registerId', data.auditing?.registerId)
        setFieldValue('registerName', data.auditing?.registerName)
        setFieldValue('registeredDate', data.auditing?.registeredDate)
        setFieldValue('modifierKey', data.auditing?.modifierKey)
        setFieldValue('modifierId', data.auditing?.modifierId)
        setFieldValue('modifierName', data.auditing?.modifierName)
        setFieldValue('modifiedDate', data.auditing?.modifiedDate)
      })
      .catch(() => {
        // error
      })
  }

  const getData = async (page: number, size: number) => {
    const params = {
      pageNum: page,
      rowSize: size
    }
    const { customerKey } = route.query
    const resData = await companyCustomerContractInformationApi.getDetailContracts((customerKey as string) || '', params)
    return Promise.resolve({
      totalItems: resData.page?.totalCount,
      data: resData.data
    })
  }

  const { items, totalItems, isLoading, fetchDataWith } = useDataTablePagination(getData)

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    fetchDataWith({
      numberOfItems: pageState.rows,
      page: pageState.page
    })
      .then(() => {
        tableRef.value.scrollToTop()
      })
      .catch(() => {})
  }

  const onDownloadContractFile = (url: string, name: string) => {
    if (url) {
      let contractFileDownloadLink = url
      if (contractFileDownloadLink.startsWith('/')) {
        contractFileDownloadLink = contractFileDownloadLink.substring(1)
      }
      companyCustomerContractInformationApi
        .downloadFileContractInformation(contractFileDownloadLink)
        .then((response) => {
          handleDownloadFileBlob(response, name)
        })
        .catch(() => {})
    }
  }

  const onDownloadExcelContractInformation = () => {
    const exportData =
      items.value?.map((it, index) => {
        return {
          no: index + 1,
          contractStatus: renderContractStatusLabel(it.contractStatus),
          contractStartDate: it.contractStartDate ? formatTime(it.contractStartDate, FORMAT_DATE_DOT_YYYY_MM_DD_HH_mm) : '',
          contractEndDate: it.contractEndDate ? formatTime(it.contractEndDate, FORMAT_DATE_DOT_YYYY_MM_DD_HH_mm) : '',
          contractRegDate: it.contractRegDate ? formatTime(it.contractRegDate, FORMAT_DATE_DOT_YYYY_MM_DD_HH_mm) : '',
          settlementDate: renderSettlementDateValue(it.settlementDate),
          contract: it.contractFileDownloadLink,
          registerName: `${it.auditing.registerName} ${it.auditing.registerKey ? `(${it.auditing.registerKey})` : ''}`,
          registeredDate: formatTime(it.auditing.registeredDate, DEFAULT_DATE_FORMAT_DOT)
        }
      }) ?? []
    exportExcel<CompanyContractInformationExcelModel>(exportData, exportFileName('contract'), companyContractInformationHeaderName)
  }

  const onOpenCompanyReviewContractModal = () => {
    showModal?.({
      component: CompanyReviewContractModalVue,
      props: {
        data: {
          contractKey: values.contractKey,
          customerKey: values.customerKey,
          contractStatus: values.contractStatus,
          contractFileOriginName: values.contractFileOriginName,
          contractFileSize: values.contractFileSize,
          contractFileDownloadLink: values.contractFileDownloadLink,
          contractRegDate: values?.contractRegDate,
          contractStartDate: values?.contractStartDate,
          contractEndDate: values?.contractEndDate,
          settlementDate: values?.settlementDate
        }
      },
      events: {
        close: closeModalByPop,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        save: (data: CompanyCustomerContactModel) => {
          const { customerKey } = route.query
          getDetailContractInformation(customerKey as string)
          fetchDataWith({
            numberOfItems: DATA_TABLE_NUMBER_ITEMS_PAGE_50,
            page: defaultPageState.page
          })
            .then(() => {
              tableRef.value.scrollToTop()
            })
            .catch(() => {})
        }
      }
    })
  }

  onMounted(() => {
    const { customerKey } = route.query
    setFieldValue('customerKey', Number(customerKey))
    getDetailContractInformation(customerKey as string)
  })

  return {
    values,
    items,
    isLoading,
    tableRef,
    totalItems,
    renderSettlementDateValue,
    renderContractStatusLabel,
    onPageChange,
    onDownloadContractFile,
    onDownloadExcelContractInformation,
    onOpenCompanyReviewContractModal
  }
}

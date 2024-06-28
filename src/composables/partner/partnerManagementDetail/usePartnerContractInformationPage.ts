import { onMounted, ref, computed } from 'vue'
import {
  PartnerContractInformationModel,
  PartnerContractDataHeaderTableModel,
  partnerContractDataHeaderTableConfig
} from '@/models/views/partner/PartnerContractInformationModel'
import { partnerContractInformationApi } from '@/services/api/partner/PartnerContractInformationApi'
import { useDataTablePagination } from '../../widgets'
import { defaultPageState } from '@/models'

import { DEFAULT_DATE_FORMAT, exportExcel, exportFileName, formatTime, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM } from '@/common'
import { PartnerContractStatus, PartnerContractType } from '@/models/views/partner/PartnerListModel'
import { PageState } from 'primevue/paginator'
import { handleDownloadFileBlob } from '@/common/html'
import { PartnerCompanyDetailTabParams } from '@/models/views/partner/partnerDetail/PartnerDetailModel'

export const usePartnerContractInformationPage = (props: PartnerCompanyDetailTabParams) => {
  const dataDetail = ref<PartnerContractInformationModel>({} as PartnerContractInformationModel)
  const page = ref<PageState>(defaultPageState)
  const tableRef = ref()

  const getContractTypeName = (contractType: string) => {
    if (contractType === PartnerContractType.CONSIGNMENT) {
      return '위수탁계약'
    } else if (contractType === PartnerContractType.DIRECT) {
      return '직매입계약'
    } else return ''
  }
  const getContractStatusName = (contractStatus: string) => {
    if (contractStatus === PartnerContractStatus.STARTED) {
      return '계약 진행 중'
    } else if (contractStatus === PartnerContractStatus.UPCOMING) {
      return '계약 예정'
    } else if (contractStatus === PartnerContractStatus.TERMINATED) {
      return '계약 완료'
    } else return ''
  }
  const initDataDetail = (sellerKey: string) => {
    partnerContractInformationApi.getDetail(sellerKey).then((result) => {
      dataDetail.value = result.data
      dataDetail.value.contractType = getContractTypeName(dataDetail.value.contractType)
      dataDetail.value.contractStatus = getContractStatusName(dataDetail.value.contractStatus)
    })
  }
  const onClickDownloadFile = (link: string, fileName: string) => {
    const convertLink = link.replace('member/bo/', '')
    partnerContractInformationApi
      .downloadFile(convertLink)
      .then((res) => {
        const blob = new Blob([res as any], { type: res.type })
        handleDownloadFileBlob(blob, fileName)
      })
      .catch(() => {})
  }

  const getData = async (page: number, size: number) => {
    // return partnerContractInfomationApi.getList(route.query?.sellerKey as string, { pageNum: page + 1, rowSize: size })
    const response = await partnerContractInformationApi.getList(props.sellerKey, { pageNum: page + 1, rowSize: size })
    const data = response.data.map((item, index) => {
      return {
        id: index + 1,
        contractStartDate: item.contractStartDate && formatTime(item.contractStartDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM),
        contractEndDate: item.contractEndDate && formatTime(item.contractEndDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM),
        contractRegDate: item.contractRegDate,
        settlementDate: item.settlementDate && `매월 ${item.settlementDate}일`,
        contractStatus: getContractStatusName(item.contractStatus),
        registerName: item?.auditing?.registerName,
        contractFileOriginName: item.contractFileOriginName,
        contractKey: item.contractKey,
        sellerKey: item.sellerKey,
        contractFileDownloadLink: item.contractFileDownloadLink,

        registeredDate: item?.auditing?.registeredDate && formatTime(item.auditing.registeredDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM)
      } as PartnerContractDataHeaderTableModel
    })

    return Promise.resolve({
      ...response,
      data
    })
  }
  const { items, totalItems, isLoading, fetchDataWith } = useDataTablePagination<PartnerContractDataHeaderTableModel>(getData)
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
  const handleDownloadExcel = () => {
    if (!items.value) return
    const dataExport = items.value.map((item) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { contractFileDownloadLink, contractFileOriginName, contractKey, sellerKey, ...rest } = item
      return rest
    })
    exportExcel(
      dataExport,
      fileNameDownload,
      partnerContractDataHeaderTableConfig.filter((x) => x.field !== 'contractFileDownloadLink').map((item) => item.header)
    )
  }
  const fileNameDownload = exportFileName('Contract-Information', DEFAULT_DATE_FORMAT)
  const isDateInRange = computed(() => {
    const currentDate = new Date()
    const startDate = new Date(dataDetail.value.contractStartDate)
    const endDate = new Date(dataDetail.value.contractEndDate)
    return currentDate >= startDate && currentDate <= endDate ? true : false
  })
  onMounted(() => {
    if (props.sellerKey) {
      initDataDetail(props.sellerKey)
    }
  })
  return {
    dataDetail,
    items,
    isLoading,
    onPageChange,
    totalItems,
    tableRef,
    handleDownloadExcel,
    isDateInRange,
    onClickDownloadFile
  }
}

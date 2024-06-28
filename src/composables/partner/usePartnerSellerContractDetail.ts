import { CONTRACT_DETAIL_ROUTER, CONTRACT_PERIOD_ROUTER, DEFAULT_DATE_FORMAT, DEFAULT_DATE_FORMAT_DOT, formatTime, renderLabelEnum } from '@/common'
import { handleDownloadFileBlob } from '@/common/html'
import {
  PartnerBankAccountInfoModel,
  PartnerBasicContractInfoModel,
  PartnerContractStatusOptions,
  PartnerContractTypeOptions,
  PartnerRegisterForSalesOptionsOptionType,
  PartnerSalesCategoryModel,
  PartnerSpecificProductSalesPermissionListModel
} from '@/models/views/partner/PartnerSellerContractDetailModel'
import { partnerContractInformationApi } from '@/services/api/partner/PartnerContractInformationApi'
import { partnerSellerCompaniesApi } from '@/services/api/partner/PartnerSellerCompaniesApi'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const usePartnerSellerContractDetail = () => {
  const registerForSalesOptions = ref<PartnerRegisterForSalesOptionsOptionType>(PartnerRegisterForSalesOptionsOptionType.NOT_USED)
  const contractInfo = ref<PartnerBasicContractInfoModel>()
  const salesCategories = ref<PartnerSalesCategoryModel[]>([])
  const permissions = ref<PartnerSpecificProductSalesPermissionListModel[]>([])
  const bankAccountInfo = ref<PartnerBankAccountInfoModel>()
  const route = useRoute()
  const router = useRouter()
  const sellerKey = route?.query?.sellerKey as string
  const contractKey = route?.query?.contractKey as string

  const getBasicContractInfo = (sellerKey: string, contractKey: string) => {
    partnerSellerCompaniesApi
      .getBasicContractInfo(sellerKey, contractKey)
      .then((res) => {
        contractInfo.value = res.data
      })
      .catch(() => {
        // empty
      })
  }

  const getSalesCategory = (sellerKey: string) => {
    partnerSellerCompaniesApi
      .getSalesCategory(sellerKey)
      .then((res) => {
        salesCategories.value = res.data
      })
      .catch(() => {
        // empty
      })
  }

  const getPermissions = (sellerKey: string) => {
    partnerSellerCompaniesApi
      .getPermissions(sellerKey)
      .then((res) => {
        registerForSalesOptions.value = res.data.submitSpecificProductSalesPermission
        permissions.value = res.data.specificProductSalesPermissionList
      })
      .catch(() => {
        // empty
      })
  }

  const getBankAccountInfo = (sellerKey: string) => {
    partnerSellerCompaniesApi
      .getBankAccountInfo(sellerKey)
      .then((res) => {
        bankAccountInfo.value = res.data
      })
      .catch(() => {
        // empty
      })
  }

  const contractTerm = computed(() => {
    return `${formatTime(contractInfo.value?.contractStartDate ?? '', DEFAULT_DATE_FORMAT_DOT)} ~ ${formatTime(contractInfo.value?.contractEndDate ?? '', DEFAULT_DATE_FORMAT_DOT)}`
  })

  const partnerContractStatusConvert = (contractStatus: string) => {
    // return PartnerContractStatusOptions.find((it) => it.value === contractStatus)?.label
    return renderLabelEnum(PartnerContractStatusOptions, contractStatus)
  }

  const partnerContractTypeConvert = (contractType: string) => {
    // return PartnerContractTypeOptions.find((it) => it.value === contractType)?.label
    return renderLabelEnum(PartnerContractTypeOptions, contractType)
  }
  const salesCategoryItem = (item: PartnerSalesCategoryModel) => {
    return `${item.standardCategoryName} (담당MD : ${item.chargeMdName} (${item.chargeMdKey})) / 계약마진율 ${item.marginRate}%`
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

  const isContractExtension = computed(() => {
    if (formatTime(contractInfo.value?.contractEndDate ?? '', DEFAULT_DATE_FORMAT) < formatTime(new Date(), DEFAULT_DATE_FORMAT)) {
      return true
    }
    return false
  })

  const linkToContractInfo = () => {
    router.push(`${CONTRACT_DETAIL_ROUTER}?id=${sellerKey}&tab=contract`)
  }

  const linkToContractPeriod = () => {
    router.push(`${CONTRACT_PERIOD_ROUTER}?sellerKey=${sellerKey}&contractKey=${contractKey}`)
  }

  onMounted(() => {
    if (sellerKey) {
      getBankAccountInfo(sellerKey)
      getPermissions(sellerKey)
      getSalesCategory(sellerKey)
      if (contractKey) {
        getBasicContractInfo(sellerKey, contractKey)
      }
    }
  })

  return {
    registerForSalesOptions,
    contractInfo,
    contractTerm,
    partnerContractStatusConvert,
    partnerContractTypeConvert,
    salesCategories,
    permissions,
    bankAccountInfo,
    salesCategoryItem,
    onClickDownloadFile,
    isContractExtension,
    linkToContractInfo,
    linkToContractPeriod
  }
}

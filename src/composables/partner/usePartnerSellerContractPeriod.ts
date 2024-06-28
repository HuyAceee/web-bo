import {
  CONTRACT_DETAIL_ROUTER,
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_FORMAT_DOT,
  MAX_NUMBER_OF_FILE_5,
  formatTime,
  isEmpty,
  isEmptyObject
} from '@/common'
import { handleDownloadFileBlob } from '@/common/html'
import {
  PartnerAttachmentType,
  PartnerBankAccountRequestModel,
  PartnerBankCodeOptions,
  PartnerCategoryListModel,
  PartnerContractRequestModel,
  PartnerContractStatusOptions,
  PartnerContractsRequestModel,
  PartnerPermissionToSellPeriodItemModel,
  PartnerSpecificProductSalesPermissionListRequestModel,
  emptyPartnerPermissionToSellPeriodItem
} from '@/models/views/partner/PartnerSellerContractDetailModel'
import { PartnerContractFileModel, partnerFileDefault } from '@/models/views/partner/PartnerUploadFileModel'
import { partnerContractInformationApi } from '@/services/api/partner/PartnerContractInformationApi'
import { partnerSellerCompaniesApi } from '@/services/api/partner/PartnerSellerCompaniesApi'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLoading } from '../common'
import { partnerUploadFileApi } from '@/services/api/partner/PartnerUploadFileApi'
import { ProductSelectDefinitionType, YnOptions } from '@/models'
import { PartnerSalesCategoryItemModel, emptyPartnerSalesCategoryItem } from '@/models/views/partner/PartnerListModel'
import { PartnerCheckBankAccountRequest } from '@/models/services/requests/partner/PartnerSellerCompanies'
import { useModalConfirm, useModalNotification } from '../widgets'

export const usePartnerSellerContractPeriod = () => {
  const partnerPermissionOptions = [
    { label: '판매권한 신청하지 않음', value: YnOptions.N },
    { label: '판매권한 신청', value: YnOptions.Y }
  ]

  const { setLoading } = useLoading()
  const route = useRoute()
  const router = useRouter()
  const sellerKey = route?.query?.sellerKey as string
  const contractKey = route?.query?.contractKey as string
  const contractFile = ref<PartnerContractFileModel>(partnerFileDefault)
  const bankAccountFile = ref<PartnerContractFileModel>(partnerFileDefault)
  const isCheckValidate = ref<boolean>(true)
  const verifiedAccount = ref<boolean>(false)
  const { openModal: openNotificationModal, closeModalByPop: closeModalByPopNotification } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const isDisableAddNew = ref(true)
  const contractType = ref<string>('')
  const schema = {
    sellerKey: isEmpty,
    sellerName: isEmpty,
    contractStartDate: isEmpty,
    contractEndDate: isEmpty,
    contractStatus: isEmpty,
    contractRegDate: isEmpty,
    settlementDate: isEmpty,

    bankCode: isEmpty,
    accountNumber: isEmpty,
    bankBranchName: isEmpty,
    accountHolderName: isEmpty
  }
  const initialValues = {
    // contract
    sellerKey: '',
    sellerName: '',
    contractStartDate: '',
    contractEndDate: '',
    contractStatus: PartnerContractStatusOptions[0].value,
    contractRegDate: '',
    settlementDate: '',

    // Sales product information
    listSalesCategory: [emptyPartnerSalesCategoryItem],
    permissionProduct: YnOptions.N,
    listPermissionProduct: [emptyPartnerPermissionToSellPeriodItem],

    // bank account
    bankCode: PartnerBankCodeOptions[0].value,
    accountNumber: '',
    bankBranchName: '',
    accountHolderName: ''
  }

  const listCategoryRef = ref()

  const { values, errors, setFieldValue } = useForm<any>({
    initialValues: initialValues,
    validationSchema: schema
  })

  const getPartnerFile = (field: string, value: any) => {
    const isHas = values[field].some((obj: any) => {
      return obj.name === value.file?.name
    })
    if (values[field].length >= MAX_NUMBER_OF_FILE_5 || isHas) return
    setFieldValue(field, [...values[field], { name: value?.file?.name, url: value?.url, size: value?.file?.size }])
  }

  const getPartnerContractFile = (data: PartnerContractFileModel) => {
    contractFile.value = data
  }

  const getPartnerBankAccountFile = (data: PartnerContractFileModel) => {
    bankAccountFile.value = data
  }

  const onClickDownloadFile = (link: string, fileName: string) => {
    const convertLink = link.replace('member/bo/', '')
    partnerContractInformationApi.downloadFile(convertLink).then((res) => {
      const blob = new Blob([res as any], { type: res.type })
      handleDownloadFileBlob(blob, fileName)
    })
  }

  const onPartnerRemoveFile = (field: string, doc: any) => {
    const _documentsList = values[field].filter((obj: any) => obj.url !== doc.url)
    setFieldValue(field, _documentsList)
  }

  const getBasicContractInfo = (sellerKey: string, contractKey: string) => {
    partnerSellerCompaniesApi
      .getBasicContractInfo(sellerKey, contractKey)
      .then((res) => {
        const data = res.data
        setFieldValue('sellerKey', data.sellerKey)
        setFieldValue('sellerName', data.sellerName)
        setFieldValue('contractStartDate', data.contractStartDate ? formatTime(data.contractStartDate, DEFAULT_DATE_FORMAT_DOT) : '')
        setFieldValue('contractEndDate', data.contractEndDate ? formatTime(data.contractEndDate, DEFAULT_DATE_FORMAT_DOT) : '')
        setFieldValue('contractStatus', data.contractStatus)
        setFieldValue('contractRegDate', data.contractRegDate ? formatTime(data.contractRegDate, DEFAULT_DATE_FORMAT_DOT) : '')
        setFieldValue('settlementDate', data.settlementDate)
        setFieldValue('sellerName', data.sellerName)
        contractType.value = data.contractType
        const file: PartnerContractFileModel = {
          attachmentFileOriginName: data.contractFileOriginName,
          attachmentFileSize: data.contractFileSize,
          contractFileDownloadLink: data.contractFileDownloadLink,
          attachmentId: undefined
        }
        contractFile.value = file
      })
      .catch(() => {
        // empty
      })
  }

  const getBankAccountInfo = (sellerKey: string) => {
    partnerSellerCompaniesApi
      .getBankAccountInfo(sellerKey)
      .then((res) => {
        const data = res.data
        setFieldValue('bankCode', data.bankCode)
        setFieldValue('accountNumber', data.accountNumber)
        setFieldValue('bankBranchName', data.bankBranchName)
        setFieldValue('accountHolderName', data.accountHolderName)
        const file: PartnerContractFileModel = {
          attachmentFileOriginName: data.accountImageOriginName,
          attachmentFileSize: data.accountImageSize,
          contractFileDownloadLink: data.accountImageDownloadLink,
          attachmentId: undefined
        }
        bankAccountFile.value = file
      })
      .catch(() => {
        // empty
      })
  }

  const getSalesCategory = (sellerKey: string) => {
    partnerSellerCompaniesApi
      .getSalesCategory(sellerKey)
      .then((res) => {
        const category: PartnerSalesCategoryItemModel[] = res.data.map((it) => {
          return {
            id: it.standardCategoryId,
            contractMarginRate: it.marginRate.toString(),
            md: `${it.chargeMdName} (${it.chargeMdKey})`,
            representative: it.isRepresentative,
            category: {
              standardCategoryId: it.standardCategoryId,
              standardCategoryName: it.standardCategoryName
            }
          }
        })
        setFieldValue('listSalesCategory', category)
        listCategoryRef.value.setListValue(category)
      })
      .catch(() => {
        // empty
      })
  }

  const getPermissions = (sellerKey: string) => {
    partnerSellerCompaniesApi
      .getPermissions(sellerKey)
      .then((res) => {
        const data = res.data
        const listPermission: PartnerPermissionToSellPeriodItemModel[] = data.specificProductSalesPermissionList.map((it) => {
          return {
            id: it.permissionKey.toString(),
            productGroup: it.permissionType,
            file: it.permissionFileDownloadLink,
            document: {
              attachmentFileOriginName: it.permissionFileOriginName,
              attachmentFileSize: it.permissionFileSize,
              contractFileDownloadLink: it.permissionFileDownloadLink,
              attachmentId: undefined
            }
          }
        })
        setFieldValue('permissionProduct', data.submitSpecificProductSalesPermission)
        setFieldValue('listPermissionProduct', listPermission)
      })
      .catch(() => {
        // empty
      })
  }

  const uploadContractFile = (file: any) => {
    setLoading(true)
    partnerUploadFileApi
      .uploadContractFile(file)
      .then((res) => {
        contractFile.value = res.data
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }

  const uploadBankAccountFile = (file: any) => {
    setLoading(true)
    partnerUploadFileApi
      .uploadBankAccountFile(file)
      .then((res) => {
        bankAccountFile.value = res.data
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }

  const uploadPermissionFile = (file: any, type?: PartnerAttachmentType, index?: number) => {
    setLoading(true)
    partnerUploadFileApi
      .uploadPermissionFile(file, type)
      .then((res) => {
        const data = res.data
        const newList = [...values.listPermissionProduct]
        newList[index ?? 0] = {
          ...values.listPermissionProduct[index ?? 0],
          file: data.attachmentId,
          document: {
            attachmentFileOriginName: data.attachmentFileOriginName,
            attachmentFileSize: data.attachmentFileSize,
            contractFileDownloadLink: data.contractFileDownloadLink,
            attachmentId: data.attachmentId
          }
        }
        setFieldValue('listPermissionProduct', newList)
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }

  const handleDeleteFile = (definitionType: ProductSelectDefinitionType, index?: number) => {
    if (definitionType === ProductSelectDefinitionType.PARTNER_CONTRACT) {
      contractFile.value = partnerFileDefault
    } else if (definitionType === ProductSelectDefinitionType.PARTNER_BANK_ACCOUNT) {
      bankAccountFile.value = partnerFileDefault
    } else if (definitionType === ProductSelectDefinitionType.PARTNER_PERMISSION) {
      const newList = [...values.listPermissionProduct]
      newList[index ?? 0] = {
        ...values.listPermissionProduct[index ?? 0],
        file: undefined,
        document: {}
      }
      setFieldValue('listPermissionProduct', newList)
    }
  }

  const checkBankAccount = () => {
    const request: PartnerCheckBankAccountRequest = {
      bankCode: values.bankCode,
      accountNumber: values.accountNumber
      // accountHolderBirthDate: '1992-11-03'
    }
    partnerSellerCompaniesApi.checkBankAccount(request).then((res) => {
      if (!res.data.isExist) {
        verifiedAccount.value = false
        openNotificationModal({ content: '<p>올바르지 않은 계좌입니다.</br>계좌정보를 확인 후 다시 입력해 주세요.</p>' })
      } else {
        verifiedAccount.value = true
        isCheckValidate.value = true
      }
    })
  }

  const handleAddNew = () => {
    const newList = [
      ...values.listPermissionProduct,
      { ...emptyPartnerPermissionToSellPeriodItem, id: (values.listPermissionProduct.length + 1).toString() }
    ]
    setFieldValue('listPermissionProduct', newList)
  }

  const handleSetProductGroup = (index: number, value: any) => {
    const newList = [...values.listPermissionProduct]
    newList[index] = {
      ...values.listPermissionProduct[index],
      productGroup: value
    }
    setFieldValue('listPermissionProduct', newList)
  }

  const handleDelete = (index: number) => {
    openModalConfirm?.({
      content: '이 권한을 삭제하시겠습니까?',
      onConfirm() {
        const newList = [...values.listPermissionProduct]
        newList.splice(index, 1)
        setFieldValue('listPermissionProduct', newList)
        closeModalConfirm?.()
      }
    })
  }

  const showEmptyError = () => {
    openNotificationModal({
      content: '필수입력 항목을 모두 기입해 주세요.'
    })
  }

  const onSaveData = () => {
    if (
      !isEmptyObject(errors.value) ||
      !values.listSalesCategory[values.listSalesCategory.length - 1].category ||
      values.listSalesCategory[values.listSalesCategory.length - 1].contractMarginRate == '' ||
      (values.permissionProduct === YnOptions.Y &&
        (!values.listPermissionProduct[values.listPermissionProduct.length - 1].productGroup ||
          !values.listPermissionProduct[values.listPermissionProduct.length - 1].file))
    ) {
      showEmptyError()
      return
    }

    if (formatTime(values.contractStartDate, DEFAULT_DATE_FORMAT) > formatTime(values.contractEndDate, DEFAULT_DATE_FORMAT)) {
      openNotificationModal({
        content: '계약기간을 다시 확인해 주세요.</br>변경 계약기간은</br>현재 계약의 종료일 이후로만 설정 가능합니다.'
      })
      return
    }

    if (values.settlementDate < 1 || values.settlementDate > 31) {
      openNotificationModal({
        content: '정산일을 다시 확인해 주세요.</br>정산일은 1~31 사이의 숫자만 입력 가능합니다.'
      })
      return
    }
    openModalConfirm({
      content: '입력하신 내용으로 계약을 연장처리 하시겠습니까?',
      onConfirm: () => {
        closeModalByPopNotification?.()
        save()
      }
    })
  }

  const save = () => {
    const bodyContract: PartnerContractRequestModel = {
      sellerKey: Number(sellerKey),
      contractType: contractType.value,
      contractRegDate: formatTime(values.contractRegDate, DEFAULT_DATE_FORMAT),
      contractStartDate: formatTime(values.contractStartDate, DEFAULT_DATE_FORMAT),
      contractEndDate: formatTime(values.contractEndDate, DEFAULT_DATE_FORMAT),
      settlementDate: values.settlementDate,
      contractFileId: contractFile.value.attachmentId ?? ''
    }

    const bodyCategoryList: PartnerCategoryListModel[] = values.listSalesCategory.map((it: PartnerSalesCategoryItemModel) => {
      return {
        standardCategoryId: it.id,
        marginRate: it.contractMarginRate,
        isRepresentative: it.representative
      }
    })
    const bodyFilePermission: PartnerSpecificProductSalesPermissionListRequestModel[] = values.listPermissionProduct.map(
      (it: PartnerPermissionToSellPeriodItemModel) => {
        return {
          permissionType: it.productGroup,
          permissionFileId: it.document.attachmentId
        }
      }
    )
    const bodyPermission = {
      submitSpecificProductSalesPermission: values.permissionProduct,
      specificProductSalesPermissionList: bodyFilePermission
    }

    const bodyBankAccount: PartnerBankAccountRequestModel = {
      bankCode: values.bankCode,
      accountNumber: values.accountNumber,
      bankBranchName: values.bankBranchName,
      accountHolderName: values.accountHolderName,
      accountImageId: bankAccountFile.value.attachmentId ?? ''
    }

    const body: PartnerContractsRequestModel = {
      contract: bodyContract,
      categoryList: bodyCategoryList,
      permission: bodyPermission,
      bankAccount: bodyBankAccount
    }

    partnerSellerCompaniesApi
      .postContracts(sellerKey, body)
      .then(() => {
        // empty
      })
      .catch(() => {
        // empty
      })
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

  const labelButtonCheckValidate = computed(() => {
    return verifiedAccount.value ? '계좌확인완료' : '계약 연장'
  })

  watch(
    () => values,
    (v) => {
      if (v.accountNumber && v.accountHolderName && v.bankBranchName && v.bankCode) {
        isCheckValidate.value = false
        verifiedAccount.value = false
      } else {
        isCheckValidate.value = true
        verifiedAccount.value = false
      }
    },
    { deep: true }
  )

  const linkToContractInfo = () => {
    router.push(`${CONTRACT_DETAIL_ROUTER}?id=${sellerKey}&tab=contract`)
  }

  watch(
    () => values.listPermissionProduct,
    (newPermissions) => {
      const lastItem = newPermissions[newPermissions.length - 1]
      if (!lastItem.file) {
        isDisableAddNew.value = lastItem.productGroup
      }
    },
    { deep: true }
  )

  return {
    values,
    getPartnerFile,
    onPartnerRemoveFile,
    setFieldValue,
    handleDeleteFile,
    contractFile,
    bankAccountFile,
    getPartnerContractFile,
    getPartnerBankAccountFile,
    onClickDownloadFile,
    uploadContractFile,
    uploadBankAccountFile,
    onSaveData,
    checkBankAccount,
    labelButtonCheckValidate,
    isCheckValidate,
    partnerPermissionOptions,
    handleAddNew,
    isDisableAddNew,
    handleDelete,
    handleSetProductGroup,
    uploadPermissionFile,
    linkToContractInfo,
    verifiedAccount,
    listCategoryRef
  }
}

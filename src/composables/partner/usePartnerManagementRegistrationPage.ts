import { WelfareRadioProps, YnOptions } from '@/models'
import { useForm } from 'vee-validate'
import { useLoading } from '../common'
import { useModalConfirm, useModalNotification } from '../widgets'
import {
  CONTRACT_DETAIL_ROUTER,
  DEFAULT_DATE_FORMAT,
  MAX_NUMBER_OF_FILE_5,
  VENDER_MANAGER_LIST_ROUTER,
  formatTime,
  isEmpty,
  isEmptyObject,
  isNumber
} from '@/common'
import { partnerListManagementApi } from '@/services/api/partner/PartnerListManagementApi'
import { onMounted, ref } from 'vue'
import {
  PartnerContractType,
  PartnerPermissionToSellItemModel,
  PartnerSalesCategoryItemModel,
  emptyPartnerPermissionToSellItem,
  emptyPartnerSalesCategoryItem
} from '@/models/views/partner/PartnerListModel'
import {
  PartnerCompanyBizType,
  PartnerRegistrationBankAccountModelRequest,
  PartnerRegistrationCategoryModelRequest,
  PartnerRegistrationCompanyModelRequest,
  PartnerRegistrationContractModelRequest,
  PartnerRegistrationModelRequest,
  PartnerRegistrationPermissionModelRequest
} from '@/models/services/requests/partner/PartnerListRequest'
import { partnerUploadFileApi } from '@/services/api/partner/PartnerUploadFileApi'
import { useRouter } from 'vue-router'
import { array, object } from 'yup'
import { PartnerBankAccountRequestModel } from '../../models/views/partner/PartnerSellerContractDetailModel'

export const usePartnerManagementRegistrationPage = () => {
  const businessClassificationOptions: WelfareRadioProps[] = [
    { label: '법인사업자', value: PartnerCompanyBizType.SOLE_PROP },
    { label: '일반사업자', value: PartnerCompanyBizType.CORPORATION }
  ]

  const contractTypeOptions = [
    { label: '위수탁계약', value: PartnerContractType.CONSIGNMENT },
    { label: '직매입계약', value: PartnerContractType.DIRECT }
  ]

  const router = useRouter()
  const { setLoading } = useLoading()
  const { openModal: openModalNotification, closeModalByPop: closeModalNotification } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()

  const businessLocationRef = ref()
  const businessTypeOptions = ref()
  const sectorOptions = ref()

  onMounted(() => {
    partnerListManagementApi
      .getBusinessClassifications()
      .then((response) => {
        businessTypeOptions.value = response.data
      })
      .catch(() => {})
  })

  const handleChangeBusinessType = (value: any) => {
    setFieldValue('businessType', value)
    sectorOptions.value = value.bizItemList
    setFieldValue('sectors', undefined)
  }

  const schema = {
    // Corporate information
    sellerName: isEmpty,
    companyRegistrationNumber: isNumber,
    businessClassification: isEmpty,
    corporationRegistrationNumber: isNumber,
    sectors: isEmpty,
    businessLocation: object().required(),
    representativeName: isEmpty,
    representativeDateOfBirth: isNumber,
    businessRegistrationFiles: array().required().min(1),
    companyProfileFiles: array().required().min(1),
    mainPhoneNumber: isEmpty,
    companyIntroductionStatement: isEmpty,
    // Basic contract information
    termFromDate: isEmpty,
    termToDate: isEmpty,
    contractType: isEmpty,
    settlementDate: isEmpty,
    contractDate: isEmpty,
    contractFiles: array().required().min(1),
    // Sales product information
    // Payment account information
    bank: isEmpty,
    bankBranchName: isEmpty,
    accountNumber: isEmpty,
    accountHolder: isEmpty,
    accountImageId: isEmpty
  }

  const initialValues = {
    // Corporate information
    sellerName: '',
    companyRegistrationNumber: '',
    businessClassification: '',
    corporationRegistrationNumber: '',
    businessType: '',
    sectors: '',
    mailOrderBusinessReportNumber: '',
    businessLocation: '',
    representativeName: '',
    representativeDateOfBirth: '',
    mainPhoneNumber: '',
    businessRegistrationFiles: [] as any[],
    companyProfileFiles: [] as any[],
    companyIntroductionStatement: '',
    companyHomepage: '',
    // Basic contract information
    termFromDate: '',
    termToDate: '',
    contractType: contractTypeOptions[0].value,
    settlementDate: '',
    contractDate: '',
    contractFiles: [] as any[],

    // Sales product information
    listSalesCategory: [emptyPartnerSalesCategoryItem],
    permissionProduct: YnOptions.N,
    listPermissionProduct: [emptyPartnerPermissionToSellItem],

    // Payment account information
    bank: undefined,
    bankBranchName: '',
    accountNumber: '',
    accountHolder: '',
    accountImageId: ''
  }

  const companyRegistrationNumberChecked = ref()

  const { values, errors, setFieldValue } = useForm<any>({
    initialValues: initialValues,
    validationSchema: schema
  })

  const handleCheckCompanyRegistrationNumber = () => {
    if (!values.companyRegistrationNumber) {
      openModalNotification({
        content: '사업자등록번호를 입력해 주세요.'
      })
    } else if (errors.value.companyRegistrationNumber) {
      openModalNotification({
        content: '사업자등록번호를 다시 확인해 주세요.</br>형식이 올바르지 않습니다.',
        onAccept() {
          setFieldValue('companyRegistrationNumber', '')
          closeModalNotification?.()
        }
      })
    } else {
      handleCallApiCheckCRNumber(values.companyRegistrationNumber)
    }
  }

  const handleCallApiCheckCRNumber = (number: number) => {
    partnerListManagementApi
      .checkExistCompanyRegistrationNumber(number)
      .then((res) => {
        if (res.data.isExist) {
          openModalNotification({
            content: '이미 등록된 사업자등록번호입니다.</br>다시 확인해 주세요.',
            onAccept() {
              setFieldValue('companyRegistrationNumber', '')
              closeModalNotification?.()
            }
          })
        } else {
          openModalNotification({
            content: '사용 가능한 사업자등록번호입니다.</br>나머지 항목을 기입 후 등록을 완료해 주세요.',
            onAccept() {
              companyRegistrationNumberChecked.value = number
              closeModalNotification?.()
            }
          })
        }
      })
      .catch(() => {})
  }

  const getPartnerFile = async (field: string, value: any) => {
    try {
      const isHas = values[field].some((obj: any) => {
        return obj.name === value.file?.name
      })
      if (values[field].length >= MAX_NUMBER_OF_FILE_5 || isHas) return
      let fileResponse
      // only this file using
      if (field === 'businessRegistrationFiles') {
        fileResponse = await partnerUploadFileApi.uploadRegistrationFile(value?.file)
      } else if (field === 'companyProfileFiles') {
        fileResponse = await partnerUploadFileApi.uploadIntroductionFile(value?.file)
      } else if (field === 'contractFiles') {
        fileResponse = await partnerUploadFileApi.uploadContractFile(value?.file)
      }
      setFieldValue(field, [
        { name: value?.file?.name, url: value?.url, size: value?.file?.size, file: value?.file, id: fileResponse?.data.attachmentId }
      ])
    } catch {
      /*** */
    }
  }

  const onPartnerRemoveFile = (field: string, doc: any) => {
    const _documentsList = values[field].filter((obj: any) => obj.url !== doc.url)
    setFieldValue(field, _documentsList)
  }

  const bankAccountChecked = ref(false)
  const handleChangeBankAccount = (data: PartnerBankAccountRequestModel) => {
    setFieldValue('bank', data.bankCode)
    setFieldValue('bankBranchName', data.bankBranchName)
    setFieldValue('accountNumber', data.accountNumber)
    setFieldValue('accountHolder', data.accountHolderName)
    setFieldValue('accountImageId', data.accountImageId)
    bankAccountChecked.value = !!data.isChecked
  }

  const bankToListPartner = () => {
    router.push(VENDER_MANAGER_LIST_ROUTER)
  }

  const showEmptyError = () => {
    openModalNotification({
      content: '필수입력 항목을 모두 기입해 주세요. </br>(중복확인이 필요한 항목은</br>중복확인을 진행해 주세요.)'
    })
  }

  const onSave = async () => {
    if (
      !isEmptyObject(errors.value) ||
      !values.listSalesCategory[values.listSalesCategory.length - 1].category ||
      values.listSalesCategory[values.listSalesCategory.length - 1].contractMarginRate == '' ||
      (values.permissionProduct === YnOptions.Y &&
        (!values.listPermissionProduct[values.listPermissionProduct.length - 1].productGroup ||
          !values.listPermissionProduct[values.listPermissionProduct.length - 1].file)) ||
      values.companyRegistrationNumber !== companyRegistrationNumberChecked.value ||
      !bankAccountChecked.value
    ) {
      showEmptyError()
      return
    }

    if (values.settlementDate < 1 || values.settlementDate > 31) {
      openModalNotification({
        content: '정산일을 다시 확인해 주세요.</br>정산일은 1~31 사이의 숫자만 입력 가능합니다.'
      })
      return
    }

    openModalConfirm({
      content: '신규 판매사를 등록하시겠습니까?',
      onConfirm() {
        save()
        closeModalConfirm?.()
      }
    })
  }

  const save = () => {
    try {
      setLoading?.(true)
      const bodyCompany: PartnerRegistrationCompanyModelRequest = {
        sellerStatus: YnOptions.Y,
        sellerName: values.sellerName,
        bizRegNum: values.companyRegistrationNumber,
        bizType: values.businessClassification,
        corpRegNum: values.corporationRegistrationNumber,
        bizItemCode: values.sectors,
        internetSalesRegNum: values.mailOrderBusinessReportNumber,
        zipCode: values.businessLocation.zipCode,
        streetAddress: values.businessLocation.loadLotBasedAddress,
        address: values.businessLocation.loadNameAddress,
        addressDetail: values.businessLocation.detailedAddress,
        representativeName: values.representativeName,
        representativeBirthDate: formatTime(values.representativeDateOfBirth, DEFAULT_DATE_FORMAT),
        representativeTelNum: values.mainPhoneNumber,
        registrationFileId: values.businessRegistrationFiles[0].id ?? 0,
        introductionFileId: values.companyProfileFiles[0].id ?? 0,
        introductionContent: values.companyIntroductionStatement,
        companyHomePageUrl: values.companyHomepage
      }

      const bodyContract: PartnerRegistrationContractModelRequest = {
        contractType: values.contractType,
        contractRegDate: formatTime(values.contractDate, DEFAULT_DATE_FORMAT),
        contractStartDate: formatTime(values.termFromDate, DEFAULT_DATE_FORMAT),
        contractEndDate: formatTime(values.termToDate, DEFAULT_DATE_FORMAT),
        settlementDate: values.settlementDate,
        contractFileId: values.contractFiles[0].id ?? 0
      }

      const bodyCategoryList: PartnerRegistrationCategoryModelRequest[] = values.listSalesCategory.map((item: PartnerSalesCategoryItemModel) => {
        return {
          standardCategoryId: item.category?.standardCategoryId,
          marginRate: item.contractMarginRate,
          isRepresentative: item.representative
        }
      })

      const bodyPermission: PartnerRegistrationPermissionModelRequest = {
        submitSpecificProductSalesPermission: values.permissionProduct,
        specificProductSalesPermissionList:
          values.permissionProduct === YnOptions.Y
            ? values.listPermissionProduct.map((item: PartnerPermissionToSellItemModel) => {
                return {
                  permissionType: item.productGroup,
                  permissionFileId: item.file.id ?? 0
                }
              })
            : []
      }

      const bodyBankAccount: PartnerRegistrationBankAccountModelRequest = {
        bankCode: values.bank,
        accountNumber: values.accountNumber,
        bankBranchName: values.bankBranchName,
        accountHolderName: values.accountHolder,
        accountImageId: values.accountImageId,
        accountImageDelYn: values.accountImageDelYn,
        accountImageAltName: values.accountImageAltName
      }

      const body: PartnerRegistrationModelRequest = {
        company: bodyCompany,
        contract: bodyContract,
        categoryList: bodyCategoryList,
        permission: bodyPermission,
        bankAccount: bodyBankAccount
      }

      partnerListManagementApi
        .saveNewPartner(body)
        .then((res) => {
          openModalNotification({
            content: '신규 판매사 정보가 생성되었습니다.</br>마스터 관리자를 등록하여</br>판매사 등록을 완료해 주세요.',
            onAccept() {
              router.push(`${CONTRACT_DETAIL_ROUTER}?id=${res?.data?.sellerKey}`)
              closeModalNotification?.()
            }
          })
        })
        .catch(() => {})
    } finally {
      setLoading?.(false)
    }
  }

  return {
    businessLocationRef,
    businessTypeOptions,
    handleChangeBusinessType,
    sectorOptions,
    businessClassificationOptions,
    contractTypeOptions,
    values,
    setFieldValue,
    companyRegistrationNumberChecked,
    handleCheckCompanyRegistrationNumber,
    getPartnerFile,
    onPartnerRemoveFile,
    handleChangeBankAccount,
    bankToListPartner,
    onSave
  }
}

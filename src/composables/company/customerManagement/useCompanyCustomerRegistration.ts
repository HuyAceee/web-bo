import { TEXT_MAX_NUMBER_1, TEXT_MAX_NUMBER_31, isEmptyObject, matchSequenceStringNumberRegex } from '@/common'
import { useLoading } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import {
  CompanyCheckExistsType,
  CompanyCustomerRegistrationModel,
  unique
} from '@/models/views/company/customerManagement/CompanyCustomerRegistrationModel'
import { companyCustomerRegistrationApi } from '@/services/api/company/customerCompanies/CompanyCustomerRegistrationApi'
import { useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { number, object, string } from 'yup'
import { WelfareSelectOptionType } from '@/models'
import { API_RESPONSE_CODE } from '@/services/api/ApiResponseCode'
import { ECustomerStatus } from '@/models/views/company/customerManagement/CompanyCustomerListModel'

export const useCompanyCustomerRegistration = () => {
  const { openModal: showNotification } = useModalNotification()
  const { openModal: showConfirmation, closeAllModal } = useModalConfirm()
  const { setLoading } = useLoading()
  const router = useRouter()
  const formSchema = {
    company: object({
      customerStatus: string(),
      customerName: string().required().max(20),
      bizType: string().required(),
      bizRegNum: string().matches(matchSequenceStringNumberRegex).required(),
      corpRegNum: string().required().max(13),
      bizItemCode: string().required(),
      zipCode: string().required(),
      streetAddress: string().required(),
      address: string().required(),
      addressDetail: string().required(),
      representativeName: string().required(),
      representativeTelNum: string().required(),
      registrationFileId: string().required(),
      registrationDelYn: string(),
      registrationAltName: string(),
      introductionFileId: string().required(),
      introductionDelYn: string(),
      introductionAltName: string(),
      introductionContent: string().required(),
      companyHomePageUrl: string(),
      customerId: string().required()
    }),
    contract: object({
      contractRegDate: string().required(),
      contractStartDate: string().required(),
      contractEndDate: string().required(),
      settlementDate: number().required(),
      contractFileId: string().required(),
      contractDelYn: string(),
      contractAltName: string()
    })
  }

  const mapCategoryToBusinessTypes = ref<{ [prop: string]: Array<WelfareSelectOptionType> }>({})
  const mapObjectBusinessTypes = ref<{ [prop: string]: WelfareSelectOptionType }>({})
  const bizCategories = ref<Array<WelfareSelectOptionType>>([])
  const mapObjectCategories = ref<{ [prop: string]: WelfareSelectOptionType }>({})

  onMounted(() => {
    fetchBusinessTypes()
  })

  const fetchBusinessTypes = async (): Promise<any> => {
    try {
      const result = await companyCustomerRegistrationApi.getBusinessClassifications()
      bizCategories.value = unique(result.data, (i) => i.bizCategoryName).map((i) => ({ value: i.bizCategoryCode, label: i.bizCategoryName }))
      mapObjectCategories.value = bizCategories.value.reduce((prev, next) => ({ ...prev, [next.value]: next }), {})
      mapCategoryToBusinessTypes.value = result.data.reduce(
        (prev, next) => {
          prev[next.bizCategoryCode] = next.bizItemList.map((i) => ({ label: i.bizItemName, value: i.bizItemCode }))
          return prev
        },
        {} as { [prop: string]: Array<WelfareSelectOptionType> }
      )
      mapObjectBusinessTypes.value = result.data
        .flatMap((i) => i.bizItemList)
        .reduce((prev, next) => ({ ...prev, [next.bizItemCode]: { value: next.bizItemCode, label: next.bizItemName } }), {})
    } catch (e) {
      showNotification({
        content: `Error unexpected happened`
      })
    }
  }

  const checkExistCustomerId = async () => {
    if (!values.company.customerId) {
      return showNotification?.({
        content: `복지몰 아이디를 입력해 주세요.`
      })
    }
    try {
      const result = await companyCustomerRegistrationApi.getCustomerIdExists(values.company.customerId)
      if (result.data.isExist) {
        return showNotification?.({
          content: `이미 등록된 복지몰 아이디입니다.
          <br>다시 확인해 주세요.`
        })
      }
      setFieldValue('tempValidCustomerId', true)
      showNotification?.({
        content: `사용 가능한 복지몰 아이디입니다.
        <br>나머지 항목을 기입 후 등록을 완료해 주세요.
        `
      })
    } catch {
      /** */
    }
  }

  const checkExistRegistrationNumber = async () => {
    if (!values.company.bizRegNum) {
      return showNotification?.({
        content: `사업자등록번호를 입력해 주세요.`
      })
    }
    if (errors.value['company.bizRegNum']) {
      return showNotification?.({
        content: `사업자등록번호를 다시 확인해 주세요.
        <br>형식이 올바르지 않습니다.`
      })
    }
    try {
      const result = await companyCustomerRegistrationApi.getRegistrationNumberExists(values.company.bizRegNum)
      if (result.data.isExist) {
        return showNotification?.({
          content: `이미 등록된 사업자등록번호입니다.
        <br>다시 확인해 주세요.
        `
        })
      }
      setFieldValue('tempValidBizRegNumber', true)
      return showNotification?.({
        content: `사용 가능한 사업자등록번호입니다.<br>
      나머지 항목을 기입 후 등록을 완료해 주세요.
      `
      })
    } catch {
      /** */
    }
  }

  const checkExistData = async (type: CompanyCheckExistsType) => {
    switch (type) {
      case 'customer-id':
        checkExistCustomerId()
        break
      case 'registration-number':
        checkExistRegistrationNumber()
        break
    }
  }

  const initData = {
    nameCompany: '',
    company: { customerStatus: ECustomerStatus.Activate, registrationDelYn: 'N', introductionDelYn: 'N' },
    contract: { contractDelYn: 'N' },
    tempRegistrationFile: undefined,
    tempIntroductionFile: undefined,
    tempContractFile: undefined,
    tempValidBizRegNumber: false,
    tempValidCustomerId: false
  }

  const { values, setFieldValue, resetForm, errors } = useForm<CompanyCustomerRegistrationModel>({
    initialValues: initData,
    validationSchema: object(formSchema)
  })

  const fnSubmitRegistration = async () => {
    closeAllModal?.()
    try {
      setLoading?.(true)

      if (!values.tempIntroductionFile?.uploaded && !values.tempRegistrationFile?.uploaded && !values.tempContractFile?.uploaded) {
        const [regisAttach, introAttach, contractAttach] = await Promise.all([
          companyCustomerRegistrationApi.postRegistrationUpload(values.tempRegistrationFile!.file),
          companyCustomerRegistrationApi.postIntroductionUpload(values.tempIntroductionFile!.file),
          companyCustomerRegistrationApi.postContractUpload(values.tempContractFile!.file)
        ])

        if (
          regisAttach.code !== API_RESPONSE_CODE.SUCCESS ||
          introAttach.code !== API_RESPONSE_CODE.SUCCESS ||
          contractAttach.code != API_RESPONSE_CODE.SUCCESS
        ) {
          throw new Error('Upload error')
        }

        setFieldValue('company.registrationFileId', regisAttach.data.attachmentId)
        setFieldValue('company.introductionFileId', introAttach.data.attachmentId)
        setFieldValue('contract.contractFileId', contractAttach.data.attachmentId)
      }

      await companyCustomerRegistrationApi.registration(omit(values, [
        'tempContractFile', 'tempIntroductionFile', 'tempRegistrationFile', 'tempValidBizRegNumber', 'tempValidCustomerId']))
      // response not success create customer
      // if (result.code !== API_RESPONSE_CODE.SUCCESS) {
      //   setLoading?.(false)
      //   closeAllModal?.();
      //   return showNotification({
      //     content: result.message
      //   })
      // }
      setFieldValue('tempContractFile', undefined)
      setFieldValue('tempIntroductionFile', undefined)
      setFieldValue('tempRegistrationFile', undefined)
      setFieldValue('tempValidBizRegNumber', false)
      setFieldValue('tempValidCustomerId', false)

      showNotification?.({
        content: `신규 고객사 정보가 생성되었습니다.
        <br/>마스터 관리자를 등록하여
        <br/>고객사 등록을 완료해 주세요.
        `
      })
      resetForm()
    } catch (e) {
      // console.log(e)
    } finally {
      setLoading?.(false)
    }
  }

  const omit = function omit<T, Key extends keyof T>(object: T, keys: Key[]) {
    const clone = { ...object }
    for (const key of keys) {
      delete clone[key]
    }
    return clone
  }

  const onHandleSave = () => {
    try {
      if (isEmptyObject(errors.value)) {
        if (Number(values.contract.settlementDate) < TEXT_MAX_NUMBER_1 || Number(values.contract.settlementDate) > TEXT_MAX_NUMBER_31) {
          return showConfirmation?.({
            content: `정산일을 다시 확인해 주세요.
            <br/>정산일은 1~31 사이의 숫자만 입력 가능합니다.
            `
          })
        }
        showConfirmation?.({
          content: `신규 고객사를 등록하시겠습니까?`,
          onConfirm: () => fnSubmitRegistration()
        })
      } else {
        showNotification?.({
          content: '필수입력 항목을 모두 기입해 주세요.'
        })
      }
    } catch (error) {
      //
    } finally {
      setLoading?.(false)
    }
  }

  const onPageChange = () => {
    router.push('/')
  }

  return {
    values,
    onPageChange,
    onHandleSave,
    setFieldValue,
    mapCategoryToBusinessTypes,
    bizCategories,
    mapObjectBusinessTypes,
    mapObjectCategories,
    checkExistData
  }
}

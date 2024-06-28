import { ProductSelectDefinitionType, YnOptions } from '@/models'
import { PartnerContractFileModel, partnerFileDefault } from '@/models/views/partner/PartnerUploadFileModel'
import { computed, ref, watch } from 'vue'
import { partnerUploadFileApi } from '@/services/api/partner/PartnerUploadFileApi'
import { PartnerBankAccountEmits, PartnerBankCodeOptions } from '@/models/views/partner/PartnerSellerContractDetailModel'
import { useForm } from 'vee-validate'
import { PartnerCheckBankAccountRequest } from '@/models/services/requests/partner/PartnerSellerCompanies'
import { partnerSellerCompaniesApi } from '@/services/api/partner/PartnerSellerCompaniesApi'
import { useModalNotification } from '../widgets'
import { isEmpty } from '@/common'

export const usePartnerBankAccountInfo = (emits: PartnerBankAccountEmits) => {
  const bankAccountFile = ref<PartnerContractFileModel>(partnerFileDefault)
  const { openModal: openNotificationModal } = useModalNotification()
  const isCheckValidate = ref<boolean>(true)
  const verifiedAccount = ref<boolean>(false)
  const schema = {
    bankCode: isEmpty,
    accountNumber: isEmpty,
    bankBranchName: isEmpty,
    accountHolderName: isEmpty,
    accountImageId: isEmpty
  }

  const initialValues = {
    bankCode: PartnerBankCodeOptions[0].value,
    accountNumber: '',
    bankBranchName: '',
    accountHolderName: '',
    accountImageId: ''
  }

  const { values, setFieldValue } = useForm<any>({
    initialValues: initialValues,
    validationSchema: schema
  })

  const uploadBankAccountFile = (file: any) => {
    partnerUploadFileApi
      .uploadBankAccountFile(file)
      .then((res) => {
        bankAccountFile.value = res.data
        setFieldValue('accountImageAltName', res.data.attachmentFileOriginName)
        setFieldValue('accountImageId', res.data.attachmentId)
        setFieldValue('accountImageDelYn', YnOptions.N)
      })
      .catch(() => {})
  }

  const handleDeleteFile = (definitionType: ProductSelectDefinitionType) => {
    if (definitionType === ProductSelectDefinitionType.PARTNER_BANK_ACCOUNT) {
      bankAccountFile.value = partnerFileDefault
    }
  }

  const checkBankAccount = () => {
    const request: PartnerCheckBankAccountRequest = {
      bankCode: values.bankCode,
      accountNumber: values.accountNumber
      // accountHolderBirthDate: '1992-11-03'
    }
    partnerSellerCompaniesApi
      .checkBankAccount(request)
      .then((res) => {
        if (!res.data.isExist) {
          verifiedAccount.value = false
          openNotificationModal({ content: '<p>올바르지 않은 계좌입니다.</br>계좌정보를 확인 후 다시 입력해 주세요.</p>' })
        } else {
          verifiedAccount.value = true
          isCheckValidate.value = true
        }
        emits('get-data', { ...values, isChecked: verifiedAccount.value })
      })
      .catch(() => {})
  }

  const labelButtonCheckValidate = computed(() => {
    return verifiedAccount.value ? '계좌확인완료' : '계약 연장'
  })

  watch(
    () => [values.accountImageId],
    () => {
      emits('get-data', { ...values, isChecked: verifiedAccount.value })
    },
    { deep: true }
  )

  watch(
    () => [values.bankCode, values.accountNumber, values.accountHolderName, values.bankBranchName],
    ([vBankCode, vAccountNumber, vAccountHolderName, vBankBranchName]) => {
      if (vBankCode && vAccountNumber && vAccountHolderName && vBankBranchName) {
        isCheckValidate.value = false
      } else {
        isCheckValidate.value = true
      }
      verifiedAccount.value = false
      emits('get-data', { ...values, isChecked: verifiedAccount.value })
    },
    { deep: true }
  )

  return {
    values,
    setFieldValue,
    bankAccountFile,
    uploadBankAccountFile,
    handleDeleteFile,
    checkBankAccount,
    isCheckValidate,
    labelButtonCheckValidate
  }
}

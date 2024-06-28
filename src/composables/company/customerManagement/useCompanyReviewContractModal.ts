import { formatDateWithFORMAT_DATE_YYYY_MM_DDDate, isEmpty, isNumber, isValidDate } from '@/common'
import { formatFileNameSize } from '@/common/data'
import { handleDownloadFile } from '@/common/html'
import { useLoading, useModalConfirm, useModalNotification, useUploadFile } from '@/composables'
import {
  CompanyAttachmentType,
  CompanyCustomerContactDataPostModel,
  CompanyReviewContractModalEmits,
  CompanyReviewContractModalProps
} from '@/models/views/company/customerManagement/CompanyCustomerRegistrationModel'
import { companyCustomerListApi } from '@/services/api/company/customerCompanies/CompanyCustomerListApi'
import dayjs from 'dayjs'
import { useForm } from 'vee-validate'
import { object } from 'yup'

export const useCompanyReviewContractModal = (props: CompanyReviewContractModalProps, emits: CompanyReviewContractModalEmits) => {
  const formData = {
    contractRegDate: isEmpty,
    contractStartDate: isEmpty,
    contractEndDate: isEmpty,
    settlementDate: isNumber,
    contractAltName: isEmpty
  }

  const initialValues = {
    contractRegDate: '',
    contractStartDate: '',
    contractEndDate: '',
    settlementDate: undefined,
    contractFileId: '',
    contractAltName: ''
  }

  const { values, setFieldValue, errors } = useForm({
    initialValues,
    validationSchema: object(formData)
  })

  const { setLoading } = useLoading()
  const { openModal } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop, closeAllModal } = useModalConfirm()

  const { handleFileChange, handleValidFile } = useUploadFile()
  let file: File | undefined

  const handleChooseFile = () => {
    handleFileChange('document', (data: any) => {
      handleValidFile(data.file, '', 'document', '', (data: any) => {
        if (data === 'ERROR') {
          return
        }
        file = data.file
        setFieldValue('contractAltName', formatFileNameSize(data.file.name ?? '', data.file.size, 1))
      })
    })
  }

  async function download() {
    try {
      setLoading(true)
      const blob = await companyCustomerListApi.getFileContact(props.data.contractFileDownloadLink.slice(11))
      const urlFile = URL.createObjectURL(blob)
      handleDownloadFile(urlFile, props.data?.contractFileOriginName ?? '')
    } catch (error) {
      /** */
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteFile = () => {
    setFieldValue('contractAltName', '')
    file = undefined
  }

  const handleKeyPressNumber = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement

    target.value = target.value.slice(0, 2)
  }

  const handleSubmitForm = () => {
    if (!file) return
    setLoading(true)
    const formData = new FormData()
    formData.append('attachmentFile', file)
    formData.append('attachmentType', CompanyAttachmentType.contract)

    companyCustomerListApi
      .postContactFile(formData)
      .then((result) => {
        const data = result.data
        const finalData: CompanyCustomerContactDataPostModel = {
          ...values,
          contractAltName: data.attachmentFileOriginName,
          contractFileId: data.attachmentId
        }
        companyCustomerListApi
          .updateContact(+props.data.customerKey, finalData)
          .then(() => {
            emits('save', {
              ...props.data,
              contractEndDate: finalData.contractEndDate,
              contractFileDownloadLink: `/customer-companies/files/contract/${finalData.contractFileId}?attachmentType=${CompanyAttachmentType.contract}`,
              contractFileOriginName: finalData.contractAltName,
              contractFileSize: data.attachmentFileSize,
              contractRegDate: finalData.contractRegDate,
              contractStartDate: finalData.contractStartDate
            })
            closeAllModal?.()
          })
          .finally(() => {
            setLoading(false)
          })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const handleSave = () => {
    if (Object.keys(errors.value).length !== 0) {
      openModal?.({
        content: '필수입력 항목을 모두 기입해 주세요.'
      })
      return
    }
    const afterDate = dayjs(values?.contractStartDate)

    const beforeDate = dayjs(props?.data?.contractEndDate)

    if (isValidDate(props?.data?.contractEndDate) && beforeDate.isAfter(afterDate)) {
      openModal?.({
        content: '계약기간을 다시 확인해 주세요. 변경 계약기간은현재 계약의 종료일 이후로만 설정 가능합니다.'
      })
      return
    }

    if (values.settlementDate && (+values?.settlementDate < 1 || +values?.settlementDate > 31)) {
      openModal?.({
        content: '정산일을 다시 확인해 주세요. 정산일은 1~31 사이의 숫자만 입력 가능합니다.'
      })
      return
    }

    openModalConfirm?.({
      content: '입력하신 내용으로 계약을 연장처리하시겠습니까?',
      onCancel: closeModalByPop,
      onConfirm: handleSubmitForm
    })
  }

  const getContractDateString = (date?: string) => {
    if (!date) return ''
    const dateData = new Date(date)
    return formatDateWithFORMAT_DATE_YYYY_MM_DDDate(dateData)
  }

  return {
    getContractDateString,
    handleSave,
    handleKeyPressNumber,
    handleDeleteFile,
    download,
    values,
    setFieldValue,
    handleChooseFile
  }
}

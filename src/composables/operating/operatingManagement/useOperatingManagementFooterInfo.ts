import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { useModalConfirm } from '@/composables/widgets'
import { 
  isEmpty, 
  isInteger, 
  isEmptyObject, 
  removeLettersPhoneNumber, 
  replaceDashRegex, 
  typeInNumbersKoreansHyphensRegex, 
  typeInNumbersHyphensRegex, 
  noEndHyphen, 
  removeUnmatchNumbersAndHyphens,
  noStartHyphenNoMoreThan2ConsecutiveHyphen,
  removeStartHyphen,
  removeEndHyphen,
  allowOnlyOneMostHyphen,
  emailRegex2,
  removeUnmatchNumbersKoreansHyphens,
  formatTime
} from '@/common'
import { object } from 'yup'
import { useLoading, useModalNotification } from '@/composables'
import { FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS, emptyAddress } from '@/common/constant'
import {
  OperatingManagementFooterInfoModel,
  OperatingManagementFooterGetApiResponseModel
} from '@/models/views/operating/operatingMangement/OperatingManagementFooterInfoModel'
import { OperatingManagementFooterInfoRequest } from '@/models/services/requests/operating/OperatingManagementFooterInfoRequest'
import { useOperatingModalChangeImage } from '@/composables/operating/ticketOperating/baseInfo/useOperatingModalChangeImage'
import { API_RESPONSE_CODE } from '@/services/api/ApiResponseCode'
import { operatingManagementFooterInfoApi } from '@/services/api/operating/OperatingManagementFooterInfoApi'
import { ProductSelectDefinitionType } from '@/models'
import { AddressModel } from '@/models/common'
import { useCreateImageBlob } from '@/composables/common/useCreateImageBlob'

export const useOperatingManagementFooterInfo = () => {
  const { openModal: openConfirmModal } = useModalConfirm()
  const { setLoading } = useLoading()
  const { openModal: openModalNotification, closeModalByPop: closeModalNotification, closeAllModal } = useModalNotification()
  const { createImageFromBlob } = useCreateImageBlob()
  const customerAddressRef = ref()
  const myForm = {
    enterpriseName: isEmpty
  }

  const { openModal } = useModalNotification()
  const { onShowModal: onShowModalImage } = useOperatingModalChangeImage()
  const emptyForm: OperatingManagementFooterInfoModel = {
    enterpriseName: '',
    representativeName: '',
    representativeTelNumber: '',
    taxpayerIdentificationNumber: '',
    mailOrderSalesCode: '',
    faxTelNumber: '',
    securityManagerName: '',
    registrationAdmin: '',
    registrationKey: undefined,
    registrationDate: '',
    modificationAdmin: '',
    modificationKey: undefined,
    modificationDate: '',
    customerServiceCenterTelNumber: '',
    medicalDeviceSalesDeclarationFileId: '',
    customerAddress: emptyAddress
  }
  const { values, errors, setFieldValue, resetForm } = useForm<OperatingManagementFooterInfoModel>({
    initialValues: emptyForm,
    validationSchema: object(myForm)
  })
  const acceptNumber = (value: InputEvent) => {
    const target = value.target as HTMLInputElement
    if (!isInteger(target.value)) {
      openModal?.({
        content: ' - 없이 숫자만 입력 해주세요.'
      })
      ;(document.activeElement as HTMLInputElement).blur()

      target.value = removeLettersPhoneNumber(target.value)
    }
  }

  const onLoad = () => {
    handleCallGetApi()
  }

  const onSave = () => {
    const errorMessages: string[] = []
    Object.entries(errors.value).forEach(([, value]) => {
      if (!errorMessages.includes(value)) {
        errorMessages.push(value)
      }
    })
    if (isEmptyObject(errors.value)) {
      handleCallSaveApi()
    } else {
      openModalNotification?.({
        content: errorMessages[0],
        buttonLabel: '확인'
      })
    }
  }
  const handleCallGetApi = () => {
    handleResetForm()
    setLoading?.(true)
    operatingManagementFooterInfoApi
      .getFooterInformation()
      .then((res) => {
        const footerFormalData: OperatingManagementFooterGetApiResponseModel = res.data
        const basicInformation = footerFormalData.basicInformation
        const siteInformation = footerFormalData.siteInformation
        const addressArr: AddressModel = {
          zipCode: basicInformation?.address?.zipCode,
          loadNameAddress: basicInformation?.address?.streetName,
          loadLotBasedAddress: basicInformation?.address?.lotNumber,
          detailedAddress: basicInformation?.address?.detailAddress
        }
        setFieldValue('enterpriseName', basicInformation?.enterpriseName)
        setFieldValue('representativeName', basicInformation?.representative?.name)
        setFieldValue('representativeTelNumber', basicInformation?.representative?.telNumber)
        setFieldValue('taxpayerIdentificationNumber', basicInformation?.taxpayerIdentificationNumber)
        setFieldValue('mailOrderSalesCode', basicInformation?.mailOrderSalesCode)
        setFieldValue('faxTelNumber', basicInformation?.faxTelNumber)
        setFieldValue('securityManagerName', basicInformation?.securityManagerName)
        setFieldValue('siteEmail', basicInformation?.siteEmail)
        setFieldValue('customerServiceCenterTelNumber', basicInformation?.customerServiceCenterTelNumber)
        setFieldValue('siteInformationTitle', siteInformation?.title)
        setFieldValue('siteInformationPageDescription', siteInformation?.pageDescription)
        setFieldValue('siteInformationName', siteInformation?.siteName)
        setFieldValue('registrationAdmin', footerFormalData?.createdBy?.name)
        setFieldValue('registrationKey', footerFormalData?.createdBy?.key)
        setFieldValue('registrationDate', formatTime(footerFormalData?.createdAt, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS))
        setFieldValue('modificationAdmin', footerFormalData?.modifiedBy?.name)
        setFieldValue('modificationKey', footerFormalData?.modifiedBy?.key)
        setFieldValue('modificationDate', formatTime(footerFormalData?.modifiedAt, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS))
        setFieldValue('customerAddress', addressArr)
        getSiteImages(footerFormalData)
      })
      .catch((res) => {
        if (res?.data?.code == API_RESPONSE_CODE.CONFLICT_CODE) {
          openModalNotification({
            content: '회원 아이디가 중복되었습니다.'
          })
        } else if (res?.data?.code == API_RESPONSE_CODE.BAD_REQUEST_CODE) {
          openModalNotification({
            content: res.data.errors[0].message || '데이터 저장 실패',
          })
        }
      })
      .finally(() => {
        setLoading?.(false)
      })
  }

  const getSiteImages = (formData: any) => {
    const ogTagImageLink = formData?.siteInformation?.ogTagFileDownloadLink
    getSiteImage(ogTagImageLink?.substring(11), 'siteInformationOgTagFilePath')
    const medicalImageLink = formData?.basicInformation?.medicalDeviceSalesDeclarationFileDownloadLink
    getSiteImage(medicalImageLink?.substring(11), 'medicalDeviceSalesDeclarationFilePath')
  }

  const getSiteImage = (link?: string, field?: 'siteInformationOgTagFilePath' | 'medicalDeviceSalesDeclarationFilePath') => {
    if (link) {
      operatingManagementFooterInfoApi
        .getImage(link)
        .then((res) => {
          const imageUrl = createImageFromBlob(res)
          if (field) {
            setFieldValue(field, imageUrl)
          }
        })
        .catch((res) => {
          if (res?.data?.code == API_RESPONSE_CODE.CONFLICT_CODE) {
            openModalNotification({
              content: '회원 아이디가 중복되었습니다.'
            })
          } else if (res?.data?.code == API_RESPONSE_CODE.BAD_REQUEST_CODE) {
            openModalNotification({
              content: res.data.errors[0].message || '데이터 저장 실패'
            })
          }
        })
    }
  }

  const handleCallSaveApi = () => {
    const data: OperatingManagementFooterInfoRequest = {
      basicInformation: {
        enterpriseName: values.enterpriseName,
        representative: {
          name: values.representativeName,
          telNumber: values.representativeTelNumber
        },
        taxpayerIdentificationNumber: values.taxpayerIdentificationNumber,
        mailOrderSalesCode: values.mailOrderSalesCode.replace(replaceDashRegex, ''),
        faxTelNumber: values.faxTelNumber,
        address: {
          zipCode: Number(values.customerAddress.zipCode),
          lotNumber: values.customerAddress.loadNameAddress,
          detailAddress: values.customerAddress.detailedAddress,
          streetName: values.customerAddress.loadLotBasedAddress
        },
        securityManagerName: values.securityManagerName,
        siteEmail: values.siteEmail,
        customerServiceCenterTelNumber: values.customerServiceCenterTelNumber,
        medicalDeviceSalesDeclarationFileId: values.medicalDeviceSalesDeclarationFileId
      },
      siteInformation: {
        title: values.siteInformationTitle,
        pageDescription: values.siteInformationPageDescription,
        siteName: values.siteInformationName,
        ogTagFileId: values.siteInformationogTagFileId
      }
    }
    setLoading?.(true)
    const hasCreatedAt = values.registrationDate !== null && values.registrationDate !== ''
    if (!hasCreatedAt) {
      operatingManagementFooterInfoApi
        .saveFooterInformation(data)
        .then(() => {
          openModalNotification({
            content: '저장이 완료되었습니다.',
            onAccept: () => {
              closeModalNotification?.()
              handleCallGetApi()
            }
          })
        })
        .catch((res) => {
          if (res?.data?.code == API_RESPONSE_CODE.CONFLICT_CODE) {
            openModalNotification({
              content: '회원 아이디가 중복되었습니다.'
            })
          } else if (res?.data?.code == API_RESPONSE_CODE.BAD_REQUEST_CODE) {
            openModalNotification({
              content: res.data.errors[0].message || '데이터 저장 실패'
            })
          }
        })
        .finally(() => {
          setLoading?.(false)
        })
    } else {
      operatingManagementFooterInfoApi
        .updateFooterInformation(data)
        .then(() => {
          openModalNotification({
            content: '저장이 완료되었습니다.',
            onAccept: () => {
              closeModalNotification?.()
              handleCallGetApi()
            }
          })
        })
        .catch((res) => {
          if (res?.data?.code == API_RESPONSE_CODE.CONFLICT_CODE) {
            openModalNotification({
              content: '회원 아이디가 중복되었습니다.'
            })
          } else if (res?.data?.code == API_RESPONSE_CODE.BAD_REQUEST_CODE) {
            openModalNotification({
              content: res.data.errors[0].message || '데이터 저장 실패'
            })
          }
        })
        .finally(() => {
          setLoading?.(false)
        })
    }
  }
  const getFileMedicalDeviceSalesDeclaration = (value: any) => {
    setFieldValue('medicalDeviceSalesDeclarationFileId', value.newData.fileId)
    setFieldValue('medicalDeviceSalesDeclarationFilePath', value.newData.url)
  }
  const onShowModalImageMedical = () => {
    onShowModalImage({
      name: '',
      events: { getFile: getFileMedicalDeviceSalesDeclaration },
      type: ProductSelectDefinitionType.OPERATING_MEDICAL_IMAGE
    })
  }

  const getFileiteInformationOgTag = (value: any) => {
    setFieldValue('siteInformationogTagFileId', value.newData.fileId)
    setFieldValue('siteInformationOgTagFilePath', value.newData.url)
  }
  const onShowModalImageOgTag = () => {
    onShowModalImage({ name: '', events: { getFile: getFileiteInformationOgTag }, type: ProductSelectDefinitionType.OPERATING_OG_TAG_IMAGE })
  }

  const handleResetForm = () => {
    resetForm()
    customerAddressRef.value.handleReset()
  }

  const inputEndHyphensValidation = (event: InputEvent, field: 'faxTelNumber' | 'taxpayerIdentificationNumber' | 'representativeTelNumber' | 'mailOrderSalesCode' | 'customerServiceCenterTelNumber') => {
    const inputElement = event.target as HTMLInputElement
    let value = inputElement.value
    if (!noEndHyphen.test(value)) {
      value = value.replace(removeEndHyphen, '')
      inputElement.value = value
      setFieldValue(field, value)
      openModalNotification?.({
        content: '유효하지 않은 형식으로 입력된 정보가 있습니다.',
        buttonLabel: '확인',
        onAccept() {
          closeAllModal?.()
        }
      })
    } else {
      setFieldValue(field, value)
    }
  }

  const inputStartAndConsecutiveHyphensValidation = (event: InputEvent, field: 'faxTelNumber' | 'taxpayerIdentificationNumber' | 'representativeTelNumber' | 'mailOrderSalesCode' | 'customerServiceCenterTelNumber') => {
    const inputElement = event.target as HTMLInputElement
    let value = inputElement.value
    if (!noStartHyphenNoMoreThan2ConsecutiveHyphen.test(value)) {
      inputElement.blur()
      value = value.replace(removeStartHyphen, '')
      value = value.replace(allowOnlyOneMostHyphen, '-')
      inputElement.value = value
      setFieldValue(field, value)
      openModalNotification?.({
        content: '유효하지 않은 형식으로 입력된 정보가 있습니다.',
        buttonLabel: '확인',
        onAccept() {
          closeAllModal?.()
        }
      })
    } else {
      setFieldValue(field, value)
    }
  }

  const inputNumbersKoreansHyphensValidation = (event: InputEvent) => {
    const inputElement = event.target as HTMLInputElement
    const value = inputElement.value
    if (!typeInNumbersKoreansHyphensRegex.test(value)) {
      inputElement.value = value.replace(removeUnmatchNumbersKoreansHyphens, '')
      openModalNotification?.({
        content: '유효하지 않은 형식으로 입력된 정보가 있습니다.',
        buttonLabel: '확인',
        onAccept() {
          closeAllModal?.()
        }
      })
    } else {
      return true
    }
  }

  const inputNumbersHyphensValidation = (event: InputEvent) => {
    const inputElement = event.target as HTMLInputElement
    const value = inputElement.value
    if (!typeInNumbersHyphensRegex.test(value)) {
      inputElement.value = value.replace(removeUnmatchNumbersAndHyphens, '')
      openModalNotification?.({
        content: '유효하지 않은 형식으로 입력된 정보가 있습니다.',
        buttonLabel: '확인',
        onAccept() {
          closeAllModal?.()
        }
      })
    } else {
      return true
    }
  }

  const inputEmailValidation = (event: InputEvent) => {
    const inputElement = event.target as HTMLInputElement
    const value = inputElement.value
    if (!emailRegex2.test(value)) {
      openModalNotification?.({
        content: '이메일주소를 다시 확인 해주세요. 이메일주소 형식이 올바르지 않습니다.',
        buttonLabel: '확인',
        onAccept() {
          closeAllModal?.()
        }
      })
    } else {
      setFieldValue('siteEmail', value)
    }
  }

  const handleClearImage = (pathField?: 'siteInformationOgTagFilePath' | 'medicalDeviceSalesDeclarationFilePath') => {
    if (pathField == 'siteInformationOgTagFilePath') {
      openConfirmModal?.({
        content: '이미지를 삭제하시겠습니까?',
        onConfirm: () => {
          setFieldValue('siteInformationogTagFileId', '')
          setFieldValue('siteInformationOgTagFilePath', '')
          openModalNotification?.({
            content: '이미지가 삭제되었습니다.',
            buttonLabel: '확인',
            onAccept() {
              closeAllModal?.()
            }
          })
        }
      })
    } else {
      openConfirmModal?.({
        content: '이미지를 삭제하시겠습니까?',
        onConfirm: () => {
          setFieldValue('medicalDeviceSalesDeclarationFileId', '')
          setFieldValue('medicalDeviceSalesDeclarationFilePath', '')
          openModalNotification?.({
            content: '이미지가 삭제되었습니다.',
            buttonLabel: '확인',
            onAccept() {
              closeAllModal?.()
            }
          })
        }
      })
    }
  }

  return {
    values,
    resetForm,
    setFieldValue,
    customerAddressRef,
    onLoad,
    onSave,
    acceptNumber,
    handleResetForm,
    handleClearImage,
    onShowModalImageMedical,
    inputEndHyphensValidation,
    inputNumbersKoreansHyphensValidation,
    inputNumbersHyphensValidation,
    inputStartAndConsecutiveHyphensValidation,
    inputEmailValidation,
    onShowModalImageOgTag
  }
}

import {
  exhibitionTemplateManagementAppChannelOptions,
  ExhibitionTemplateManagementFormType,
  ExhibitionTemplateManagementModel,
  ExhibitionTemplateManagementOptionModel,
  exhibitionTemplateManagementOptions,
  exhibitionTemplateManagementStatusOptions,
  ExhibitionTemplateManagementTableModel,
  ExhibitionTemplateManagementType
} from '@/models/views/exhibition/templateManagement/ExhibitionTemplateManagementModel'
import { useForm } from 'vee-validate'
import { exhibitionTemplateManagementApi } from '@/services/api/exhibition/ExhibitionTemplateManagementApi'
import { onMounted, ref } from 'vue'
import { useModalNotification, useUploadFile } from '@/composables'
import { renderLabelEnum } from '@/common'
import { useExhibitionCornerManagementDetailsModal } from '@/composables/exhibition/modal/useExhibitionCornerManagementDetailsModal.js'
import {
  ExhibitionDeleteAttachedFileConvertor,
  ExhibitionModifyTemplateDetailRequest,
  ExhibitionRegisterTemplateDetailRequest
} from '@/models/services/requests/exhibition/ExhibitionTemplateManagementRequest'
import { useRoute } from 'vue-router'
import { useExhibitionCouponPromotionInquiryModal } from '@/composables/exhibition/modal/useExhibitionCouponPromotionInquiryModal'
import { useExhibitionCancelCouponReasonModal } from '@/composables/exhibition/modal/useExhibitionCancelCouponReasonModal'
import { useProductModalChangeVideo } from '@/composables/products/ticketProduct/baseInfo/useProductModalChangeVideo'

export const useExhibitionTemplateManagement = () => {
  const refExhibitionTemplateManagementOptions = ref<ExhibitionTemplateManagementOptionModel[]>(exhibitionTemplateManagementOptions)
  const formType = ref<ExhibitionTemplateManagementFormType>('create')
  const refTemplateKey = ref<number>(0)
  const refTableData = ref<ExhibitionTemplateManagementTableModel[]>()
  const { onShowModal } = useExhibitionCornerManagementDetailsModal()
  const { handleFileChange } = useUploadFile()
  const { values, setFieldValue, resetForm, resetField } = useForm<ExhibitionTemplateManagementModel>({
    initialValues: {
      displayYn: exhibitionTemplateManagementStatusOptions[0].value,
      applyChannelType: exhibitionTemplateManagementAppChannelOptions[0].value,
      templateAttributeProductYn: exhibitionTemplateManagementStatusOptions[0].value,
      templateAttributeBannerYn: exhibitionTemplateManagementStatusOptions[1].value,
      templateAttributeProductGroupYn: exhibitionTemplateManagementStatusOptions[1].value,
      templateAttributeSpecialPriceYn: exhibitionTemplateManagementStatusOptions[1].value,
      templateAttributeTextYn: exhibitionTemplateManagementStatusOptions[1].value,
      imageAltName: '',
      imagePathName: '',
      imageDeleteYn: exhibitionTemplateManagementStatusOptions[1].value,
      templateRemarkContents: ''
    }
  })
  const { openModal } = useModalNotification()
  const route = useRoute()
  const { onShowModal: showModalCouponPromotionInquiry } = useExhibitionCouponPromotionInquiryModal()
  const { onShowModal: showModalCancelCouponReason } = useExhibitionCancelCouponReasonModal()
  const { onShowModalVideo: showVideoRegistration } = useProductModalChangeVideo()
  const getTableData = () => {
    exhibitionTemplateManagementApi
      .getTemplateTableData()
      .then((resData) => {
        refTableData.value = resData.data.map((item): ExhibitionTemplateManagementTableModel => {
          return {
            ...item,
            templateAttributeProductYn: renderLabelEnum(exhibitionTemplateManagementStatusOptions, item?.templateAttributeProductYn ?? ''),
            templateAttributeBannerYn: renderLabelEnum(exhibitionTemplateManagementStatusOptions, item?.templateAttributeBannerYn ?? ''),
            templateAttributeProductGroupYn: renderLabelEnum(exhibitionTemplateManagementStatusOptions, item?.templateAttributeProductGroupYn ?? ''),
            templateAttributeSpecialPriceYn: renderLabelEnum(exhibitionTemplateManagementStatusOptions, item?.templateAttributeSpecialPriceYn ?? ''),
            templateAttributeTextYn: renderLabelEnum(exhibitionTemplateManagementStatusOptions, item?.templateAttributeTextYn ?? '')
          }
        })
      })
      .catch(() => {
        // error
      })
  }

  const isValidForm = () => {
    const checkedRequired = [
      values.templateAttributeBannerYn,
      values.templateAttributeProductYn,
      values.templateAttributeTextYn,
      values.templateAttributeProductGroupYn,
      values.templateAttributeSpecialPriceYn
    ].includes(exhibitionTemplateManagementStatusOptions[0].value)
    return values.templateName && checkedRequired
  }

  const createRequest = () => {
    exhibitionTemplateManagementApi
      .registerTemplateDetail({ ...(values as ExhibitionRegisterTemplateDetailRequest) })
      .then((resData) => {
        if (resData?.code === '0201') {
          openModal({
            content: '저장 되었습니다.'
          })
        } else {
          openModal({
            content: resData?.message
          })
        }
        getTableData()
      })
      .catch(() => {
        //error
      })
  }

  const modifyRequest = () => {
    exhibitionTemplateManagementApi
      .modifyTemplateDetail({ ...(values as ExhibitionModifyTemplateDetailRequest) })
      .then((resData) => {
        if (resData?.code === '0201') {
          openModal({
            content: '저장 되었습니다.'
          })
        } else {
          openModal({
            content: resData?.message
          })
        }
        getTableData()
        getTemplateDetailByKey(refTemplateKey.value)
      })
      .catch(() => {
        // error
      })
  }

  const onSave = () => {
    if (isValidForm()) {
      if (formType.value === 'create') {
        createRequest()
        onRegistration()
      } else {
        modifyRequest()
      }
    } else {
      openModal({
        content: '필수입력 항목을 입력해주세요.'
      })
    }
  }

  const onCornerRegistration = () => {
    if (refTemplateKey.value) {
      onShowModal({
        templateKey: refTemplateKey.value,
        fileName: values.imageName,
        filePathName: values.imagePathName,
        applyChannelType: values.applyChannelType ?? ''
      })
    }
  }

  const handleChooseImage = () => {
    if (!values.imageName) {
      handleFileChange('image', (file: any) => {
        if (file === 'ERROR') {
          return
        }
        exhibitionTemplateManagementApi
          .uploadAttachFile(file)
          .then((resData) => {
            setFieldValue('imageName', resData.data.fileName)
            setFieldValue('imagePathName', resData.data.filePathName)
          })
          .catch(() => {
            // error
          })
      })
    }
  }

  const handleDeleteImage = () => {
    if (values.imagePathName && values.imageName) {
      const data = ExhibitionDeleteAttachedFileConvertor.from(values)
      exhibitionTemplateManagementApi
        .deleteAttachFile(data)
        .then(() => {
          setFieldValue('imageDeleteYn', exhibitionTemplateManagementStatusOptions[0].value)
          setFieldValue('imageName', '')
          setFieldValue('imagePathName', '')
          setFieldValue('imageAltName', '')
        })
        .catch(() => {
          // error
        })
    }
  }

  const onRegistration = () => {
    resetForm()
    formType.value = 'create'
    handleTemplateAttributeChange('templateAttributeProductYn', exhibitionTemplateManagementStatusOptions[0].value)
    refTemplateKey.value = 0
  }

  const getTemplateDetailByKey = (templateKey: number) => {
    exhibitionTemplateManagementApi
      .getTemplateDetailByKey(templateKey)
      .then((resData) => {
        const data = resData.data
        setFieldValue('templateKey', data.templateKey)
        setFieldValue('templateName', data.templateName)
        setFieldValue('displayYn', data.displayYn)
        setFieldValue('imageName', data.imageName)
        setFieldValue('imageAltName', data.imageAltName)
        setFieldValue('imageDeleteYn', data.imageDeleteYn)
        setFieldValue('imagePathName', data.imagePathName)
        setFieldValue('applyChannelType', data.applyChannelType)
        handleTemplateAttributeChange('templateAttributeProductYn', data.templateAttributeProductYn)
        handleTemplateAttributeChange('templateAttributeBannerYn', data.templateAttributeBannerYn)
        handleTemplateAttributeChange('templateAttributeProductGroupYn', data.templateAttributeProductGroupYn)
        handleTemplateAttributeChange('templateAttributeSpecialPriceYn', data.templateAttributeSpecialPriceYn)
        handleTemplateAttributeChange('templateAttributeTextYn', data.templateAttributeTextYn)
        setFieldValue('templateRemarkContents', data.templateRemarkContents)
        setFieldValue('createdByName', data.createdByName)
        setFieldValue('createdDate', data.createdDate)
        setFieldValue('lastModifiedByName', data.lastModifiedByName)
        setFieldValue('lastModifiedDate', data.lastModifiedDate)
      })
      .catch(() => {
        // error
      })
  }

  const onRowClick = (value: ExhibitionTemplateManagementTableModel) => {
    formType.value = 'modify'
    refTemplateKey.value = value.templateKey ?? 0
    getTemplateDetailByKey(refTemplateKey.value)
  }
  const handleTemplateAttributeChange = (field: ExhibitionTemplateManagementType, value?: string) => {
    setFieldValue(field, value)
    if (field === 'templateAttributeProductGroupYn') {
      refExhibitionTemplateManagementOptions.value.forEach((item) => {
        item.disabled =
          ['templateAttributeProductYn', 'templateAttributeBannerYn'].includes(item.name ?? '') &&
          value === exhibitionTemplateManagementStatusOptions[0].value
      })
      if (value === exhibitionTemplateManagementStatusOptions[0].value) {
        setFieldValue('templateAttributeProductYn', exhibitionTemplateManagementStatusOptions[1].value)
        setFieldValue('templateAttributeBannerYn', exhibitionTemplateManagementStatusOptions[1].value)
      }
    } else if (field === 'templateAttributeProductYn' || field === 'templateAttributeBannerYn') {
      refExhibitionTemplateManagementOptions.value.forEach((item) => {
        item.disabled =
          item.name === 'templateAttributeProductGroupYn' &&
          (values.templateAttributeBannerYn === exhibitionTemplateManagementStatusOptions[0].value ||
            values.templateAttributeProductYn === exhibitionTemplateManagementStatusOptions[0].value)
      })
    }
  }

  onMounted(() => {
    getTableData()
    handleTemplateAttributeChange('templateAttributeProductYn', exhibitionTemplateManagementStatusOptions[0].value)
    if (route.query.modal === 'coupon-promotion-inquiry') {
      showModalCouponPromotionInquiry?.(() => {})
    } else if (route.query.modal === 'cancel-coupon-reason') {
      // hard code for display modal on HTML list
      showModalCancelCouponReason?.('1')
    } else if (route.query.modal === 'video-registration') {
      showVideoRegistration?.({})
    }
  })

  return {
    exhibitionTemplateManagementStatusOptions,
    exhibitionTemplateManagementAppChannelOptions,
    refExhibitionTemplateManagementOptions,
    setFieldValue,
    values,
    refTableData,
    onSave,
    onCornerRegistration,
    onRowClick,
    onRegistration,
    handleChooseImage,
    resetField,
    handleTemplateAttributeChange,
    handleDeleteImage,
    openModal,
    formType
  }
}

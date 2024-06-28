import { useCheckBoxTable, useModal, useModalConfirm, useModalNotification, useUploadFile } from '@/composables'
import ExhibitionCommonFlagRegistrationPopup from '@/views/exhibition/exhibitionCommon/ExhibitionCommonFlagRegistrationPopup.vue'
import { useForm } from 'vee-validate'
import {
  exhibitionCommonFlagRegistrationDisplayYnOption,
  ExhibitionCommonFlagRegistrationExhibitionManagementTableModel,
  exhibitionCommonFlagRegistrationFlagTypeOption,
  ExhibitionCommonFlagRegistrationFormModel,
  ExhibitionCommonFlagRegistrationPopupProps,
  exhibitionCommonFlagRegistrationTargetProductTypeOptions
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonFlagRegistrationPopupModel'
import { useExhibitionProductSearchModal } from '@/composables/exhibition/modal/useExhibitionProductSearchModal'
import { computed, onMounted, ref } from 'vue'
import { useDeliveryProductCategory } from '@/composables/delivery/ticketProductOrderManagement/useDeliveryProductCategory'
import { exhibitionFlagRegistrationApi } from '@/services/api/exhibition/ExhibitionFlagRegistrationApi'
import { YnOptions } from '@/models'
import { ExhibitionDeleteAttachedFileRequest } from '@/models/services/requests/exhibition/ExhibitionTemplateManagementRequest'
import { ProductSearchProductTableModel } from '@/models/views/products/modal/ProductSearchProductModalModel'
import { FORMAT_DATE_YYYYMMDD, formatTime, isEmptyObject, renderLabelEnum } from '@/common'
import { toTypedSchema } from '@vee-validate/yup'
import { object, string } from 'yup'
import { ExhibitionFlagDetailRegisterRequest } from '@/models/services/requests/exhibition/ExhibitionFlagRegistrationPopupRequest'

export const useExhibitionFlagRegistrationPopup = () => {
  const { showModal, closeModalByPop } = useModal()

  const onShowModal = (flagKey?: number, onRegister?: () => void) => {
    showModal?.({
      component: ExhibitionCommonFlagRegistrationPopup,
      props: {
        onClose: closeModalByPop,
        flagKey: flagKey,
        onRegister: onRegister
      }
    })
  }

  return {
    onShowModal
  }
}

export const useExhibitionFlagRegistrationPopupLogic = (props?: ExhibitionCommonFlagRegistrationPopupProps) => {
  const tableRef = ref()
  const { openModal: openConfirmModal, closeModalByPop } = useModalConfirm()
  const { openModal: openNotificationModal } = useModalNotification()
  const { openModal } = useExhibitionProductSearchModal()
  const { handleFileChange } = useUploadFile()
  const productData = ref<ExhibitionCommonFlagRegistrationExhibitionManagementTableModel[]>([])
  const { values, setFieldValue, resetForm, resetField, errors } = useForm<ExhibitionCommonFlagRegistrationFormModel>({
    initialValues: {
      displayYn: exhibitionCommonFlagRegistrationDisplayYnOption[1].value,
      targetProductType: exhibitionCommonFlagRegistrationTargetProductTypeOptions[0].value,
      flagType: exhibitionCommonFlagRegistrationFlagTypeOption[0].value,
      flagDisplayOrder: '999'
    },
    validationSchema: toTypedSchema(
      object({
        flagName: string().required(),
        flagType: string().required(),
        imageAltName: string().required(),
        imageName: string().required(),
        flagDisplayOrder: string().required(),
        displayStartDate: string().required(),
        displayEndDate: string().required()
      })
    )
  })
  const listIds = computed(() => {
    return productData.value.map((it) => it?.id) ?? []
  })

  const { listChecked, onSelectAllChange, onRowSelected } = useCheckBoxTable(listIds)

  const { categoryDepth1, categoryDepth2, categoryDepth3 } = useDeliveryProductCategory<ExhibitionCommonFlagRegistrationFormModel>(
    values,
    setFieldValue as any,
    false
  )

  const onRegistration = () => {
    openModal((data: ProductSearchProductTableModel[]) => {
      productData.value = [
        ...data.map((it) => {
          return {
            ...it,
            id: it?.productKey,
            isSelected: false,
            chargeMdName: `${it.chargeMdName} (${it.chargeMdKey})`,
            lastModifiedByName: `${it?.lastModifiedByName} (${it?.lastModifiedBy})`,
            lastSaleStatusName: it?.lastProductSalesStatusName,
            productDisplayYn: renderLabelEnum(exhibitionCommonFlagRegistrationDisplayYnOption, it?.displayYn ?? '')
          }
        }),
        ...productData.value
      ].reduce((p: ExhibitionCommonFlagRegistrationExhibitionManagementTableModel[], c) => {
        if (
          !p.some((el) => {
            return el?.productKey === c.productKey
          })
        )
          p.push(c)
        return p
      }, [])
    })
  }

  const onImageUpload = () => {
    if (!values.imageName && !values.imagePathName) {
      handleFileChange('image', (data: any) => {
        exhibitionFlagRegistrationApi
          .flagImageUpload(data.file)
          .then((res) => {
            setFieldValue('imageName', res.data?.fileName)
            setFieldValue('imagePathName', res.data?.filePathName)
            setFieldValue('imageDeleteYn', YnOptions.N)
          })
          .catch(() => {
            // error
          })
      })
    }
  }

  const onDeleteImage = () => {
    if (values.imageName && values.imagePathName) {
      const body: ExhibitionDeleteAttachedFileRequest = {
        filePathName: values.imagePathName,
        fileName: values.imageName
      }
      exhibitionFlagRegistrationApi
        .flagImageDelete(body)
        .then(() => {
          setFieldValue('imageDeleteYn', YnOptions.Y)
          resetField('imageName')
          resetField('imagePathName')
        })
        .catch(() => {
          // error
        })
    }
  }

  const onClosePopup = () => {
    openConfirmModal({
      content: '입력 내용이 있습니다. 창을 닫으시겠습니까?',
      onConfirm() {
        props?.onClose?.()
        props?.onClose?.()
      }
    })
  }

  const removeFromTable = () => {
    if (listChecked.value.length > 0) {
      openConfirmModal({
        content: '선택하신 행을 삭제하겠습니까?',
        onConfirm() {
          productData.value = productData.value.filter((it) => !listChecked.value.includes(it.id))
          listChecked.value = []
          tableRef.value?.clearCheckAll()
          closeModalByPop?.()
          openNotificationModal({
            content: '삭제 되었습니다.'
          })
        }
      })
    }
  }
  const getFlagDetailByKey = (flagKey: string) => {
    exhibitionFlagRegistrationApi
      .getFlagDetail(flagKey)
      .then((res) => {
        const data = res.data
        setFieldValue('flagName', data.flagName)
        setFieldValue('flagKey', data.flagKey)
        setFieldValue('flagType', data.flagType)
        setFieldValue('targetProductType', data.targetProductType)
        setFieldValue('categoryDepthId1', data.lclassDisplayCategoryId)
        setFieldValue('categoryDepthId2', data.mclassDisplayCategoryId)
        setFieldValue('categoryDepthId3', data.sclassDisplayCategoryId)
        setFieldValue('flagDisplayOrder', data.flagDisplayOrder?.toString())
        setFieldValue('displayStartDate', data.displayStartDatetime)
        setFieldValue('displayEndDate', data.displayEndDatetime)
        setFieldValue('displayYn', data.displayYn)
        setFieldValue('imageName', data.imageName)
        setFieldValue('imageAltName', data.imageAltName)
        setFieldValue('imageDeleteYn', data.imageDeleteYn)
        setFieldValue('imagePathName', data.imagePathName)
        setFieldValue('createdDate', data.createdDate)
        setFieldValue('createdByName', data.createdByName)
        setFieldValue('lastModifiedDate', data.lastModifiedDate)
        setFieldValue('lastModifiedByName', data.lastModifiedByName)
      })
      .catch(() => {
        // error
      })
    exhibitionFlagRegistrationApi
      .getFlagDetailDisplayProduct(flagKey)
      .then((res) => {
        const data = res.data
        setFieldValue(
          'flagDisplayProductCreateRequestList',
          data.map((it) => {
            return {
              productKey: it?.productKey
            }
          })
        )
        productData.value = data.map((it): ExhibitionCommonFlagRegistrationExhibitionManagementTableModel => {
          return {
            ...it,
            id: it?.productKey.toString(),
            productKey: it?.productKey.toString(),
            isSelected: false,
            lastSaleStatusName: it?.lastSaleStatusName,
            lastModifiedYyyymmdd: it?.lastModifiedDate,
            sellerKey: it?.sellerKey.toString(),
            productDisplayYn: renderLabelEnum(exhibitionCommonFlagRegistrationDisplayYnOption.slice(1), it?.productDisplayYn)
          }
        })
      })
      .catch(() => {
        // error
      })
  }

  onMounted(() => {
    if (props?.flagKey) {
      getFlagDetailByKey(props?.flagKey)
    }
  })

  const onSave = () => {
    if (isEmptyObject(errors.value) && values.categoryDepthId1 && values.categoryDepthId2) {
      openConfirmModal({
        content: '저장하시겠습니까?',
        onConfirm() {
          closeModalByPop?.()
          const startDate = values.displayStartDate?.split(' ')[0]
          const endDate = values.displayEndDate?.split(' ')[0]
          const startTime = values.displayStartDate?.split(' ')[1].replace(':', '')
          const endTime = values.displayEndDate?.split(' ')[1].replace(':', '')
          const body: ExhibitionFlagDetailRegisterRequest = {
            ...values,
            lclassDisplayCategoryId: values.categoryDepthId1,
            mclassDisplayCategoryId: values.categoryDepthId2,
            sclassDisplayCategoryId: values.categoryDepthId3,
            displayStartDate: formatTime(startDate ?? '', FORMAT_DATE_YYYYMMDD),
            displayEndDate: formatTime(endDate ?? '', FORMAT_DATE_YYYYMMDD),
            displayStartTime: startTime,
            displayEndTime: endTime,
            flagDisplayProductCreateRequestList: productData.value.map((it) => {
              return { productKey: Number(it.productKey) }
            })
          }
          if (values.flagKey) {
            exhibitionFlagRegistrationApi
              .flagDetailModify(body)
              .then(() => {
                openNotificationModal({
                  content: '저장되었습니다',
                  onAccept() {
                    props?.onRegister?.()
                    closeModalByPop?.()
                    closeModalByPop?.()
                  }
                })
              })
              .catch(() => {
                // error
              })
          } else {
            exhibitionFlagRegistrationApi.flagDetailRegister(body).then(() => {
              openNotificationModal({
                content: '저장되었습니다',
                onAccept() {
                  props?.onRegister?.()
                  closeModalByPop?.()
                  closeModalByPop?.()
                }
              })
            })
          }
        }
      })
    } else {
      openNotificationModal({
        content: '필수입력 값을 입력하세요.'
      })
    }
  }

  const displayOrderValidate = (event: any) => {
    if (event.target.value === '0') {
      event.target.value = ''
    }
  }

  return {
    values,
    setFieldValue,
    resetForm,
    onRegistration,
    categoryDepth1,
    categoryDepth2,
    categoryDepth3,
    onImageUpload,
    onClosePopup,
    onDeleteImage,
    productData,
    onSelectAllChange,
    onRowSelected,
    removeFromTable,
    tableRef,
    onSave,
    displayOrderValidate
  }
}

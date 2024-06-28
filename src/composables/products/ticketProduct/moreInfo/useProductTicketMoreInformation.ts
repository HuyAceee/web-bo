import { useModalConfirm, useModalNotification, useStorage } from '@/composables'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { NUMBER_DATA_TABLE_IMAGE, PRODUCT_TICKET_MORE_INFO_STORAGE_KEY, strippedHtmlEditorRegex } from '@/common'
import {
  ProductTicketDataFileModel,
  ProductTicketMoreInformationIsNewImg,
  ProductTicketMoreInformationModel,
  ProductTicketMoreInformationTypeDescription,
  ProductTicketOptionTab,
  productInitValueProductTicketMoreInformationModel,
  productTicketEmptyItem
} from '@/models/views/products'
import { YnOptions } from '@/models'
import { productTicketMoreInfoApi } from '@/services/api/products/tickets/ProductTicketMoreInformationApi'
import { useProductReasonApproval } from '@/composables/products/modal/reasonProductApproval/useProductReasonApproval'
import { useProductTicketRegistration } from '../useProductTicketRegistration'
import { ProductTicketMoreInformationResponseApiConVertor } from '@/models/services/responses/products/ticket/ProductTicketMoreInformationResponse'
import { getImageUrlFrom } from '@/common/imageUtils'
import { ProductAttachFileType, productApprovalStatus } from '@/models/views/products/common/ProductTypeModel'

export const useProductTicketMoreInformation = (pathCancelConfirm: string, isApproval: boolean, isRegistration?: boolean) => {
  const { tabData } = useProductTicketRegistration()
  const route = useRoute()
  const router = useRouter()
  const indexValueDataTableImage = ref<number>(1)
  const { value: reasonText, onShowModal } = useProductReasonApproval()
  const { openModal: openConfirmModal, closeModalByPop } = useModalConfirm()
  const { openModal: openNotificationModal, closeAllModal } = useModalNotification()
  const dynamicKeyProductMoreInformationStorage = computed(() => {
    return PRODUCT_TICKET_MORE_INFO_STORAGE_KEY + route?.path
  })
  const toggleApprove = ref(true)
  const dataImage = ref<ProductTicketDataFileModel[]>([])
  const dataVideo = ref<ProductTicketDataFileModel[]>([])
  const prodKeyRegis = route.query.productRequestKey
  const SUCCESS = '0000'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [saveValue, setSaveValue] = useStorage<ProductTicketMoreInformationModel>(dynamicKeyProductMoreInformationStorage.value)
  const productId = computed(() => {
    if (prodKeyRegis && isRegistration) {
      setFieldValue('productKey', Number(route.query.productRequestKey))
      setFieldValue('productRequestKey', Number(route.query.productRequestKey))
      return { productRequestKey: route.query.productRequestKey as string }
    } else {
      if (isApproval) {
        return { productRequestKey: route.query.productRequestKey as string }
      }

      return { productCode: route.query.code as string, productClassificationCode: route.query.classification as string }
    }
  })

  const fetchDataApproval = async () => {
    try {
      const { data } = await productTicketMoreInfoApi.getDetailApprovalMoreInfo({ productReqeustKey: productId.value.productRequestKey })
      return data
    } catch (error) {
      /* empty */
    }
  }

  const fetchDataEdit = async () => {
    try {
      let data
      if (prodKeyRegis && isRegistration) {
        data = await productTicketMoreInfoApi.getDetailApprovalMoreInfo({ productReqeustKey: productId.value.productRequestKey })
      } else {
        data = await productTicketMoreInfoApi.getDetailMoreInfo({
          productCode: productId.value.productCode,
          productClassificationCode: productId.value.productClassificationCode
        })
      }
      return data.data
    } catch (error) {
      /* empty */
    }
  }

  const fetchData = async () => {
    try {
      let data: any
      if (isApproval) {
        data = await fetchDataApproval()
      } else {
        data = await fetchDataEdit()
      }
      const dataConvertor = ProductTicketMoreInformationResponseApiConVertor.from(data)
      const reqDataFile = computed(() => {
        if (!isApproval) {
          if (isRegistration && prodKeyRegis) {
            return data.boTempAttachFileList
          }
          return data.boAttachFileList
        }
        return data.boTempAttachFileList
      })
      const dataFile = ProductTicketMoreInformationResponseApiConVertor.fromDataFile(reqDataFile.value)

      dataImage.value = extendArr(dataFile.dataImages, ProductAttachFileType.IMAGE)
      dataVideo.value = extendArr(dataFile.dataVideos, ProductAttachFileType.MOV)

      resetForm({
        values: dataConvertor
      })
      setFieldValue('type', dataConvertor.type)
    } catch (error) {
      /* empty */
    }
  }

  const extendArr = (arr: ProductTicketDataFileModel[], type: string) => {
    let extended = [...arr]
    if (type === ProductAttachFileType.IMAGE) {
      if (extended.length < NUMBER_DATA_TABLE_IMAGE) {
        extended = extended.map((item, index) => {
          if (item) {
            return {
              ...item,
              id: index + 1
            }
          }
        })
        let lengthId = extended.length + 1
        for (let i = 0; i < NUMBER_DATA_TABLE_IMAGE; i++) {
          const newItem = { ...productTicketEmptyItem }
          newItem.id = lengthId
          newItem.isNewImg = ProductTicketMoreInformationIsNewImg.NEW
          extended.push(newItem)
          lengthId++
        }
      } else {
        extended.forEach((item, index) => {
          item.id = index + 1
        })
      }
      return extended.slice(0, NUMBER_DATA_TABLE_IMAGE)
    } else {
      if (extended.length < 1) {
        extended.push(productTicketEmptyItem)
      }
      return extended.slice(0, 1)
    }
  }

  onMounted(async () => {
    if (
      (isApproval && !productId.value.productRequestKey) ||
      (!isApproval &&
        (!productId.value.productCode || !productId.value.productClassificationCode) &&
        isRegistration &&
        !productId.value.productRequestKey)
    ) {
      dataImage.value = extendArr([], ProductAttachFileType.IMAGE)
      dataVideo.value = extendArr([], ProductAttachFileType.MOV)
    } else {
      await fetchData()
    }
  })

  const initialValue = computed(() => {
    return productInitValueProductTicketMoreInformationModel
  })

  const { values, setFieldValue, resetForm } = useForm<ProductTicketMoreInformationModel>({
    initialValues: initialValue.value
  })

  const isCheckOptionDesc = computed(() => {
    return values.type ? values.type : ProductTicketMoreInformationTypeDescription.ALL
  })

  const dataApprove = computed(() => {
    return { ...values }
  })

  function handleCancel() {
    openConfirmModal?.({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm() {
        router.push(pathCancelConfirm)
        closeModalByPop?.()
        resetForm()
      },
      onCancel() {
        closeModalByPop?.()
      }
    })
  }

  function changeValueField(field: keyof ProductTicketMoreInformationModel, value: any) {
    setFieldValue(field, value)
  }

  const descriptionStripedHtml = computed(() => {
    if (!values?.description) return ''
    return values.description.replace(strippedHtmlEditorRegex, '')
  })

  const mobileDescriptionStripedHtml = computed(() => {
    if (!values?.mobileDescription) return ''
    return values?.mobileDescription?.replace(strippedHtmlEditorRegex, '')
  })

  watch(reasonText, (newText) => {
    if (newText && newText.length > 0) setFieldValue('productStatus', productApprovalStatus.rejectedApproval)
  })

  const handleDeleteFile = (data: ProductTicketDataFileModel) => {
    if (data.isNewImg !== ProductTicketMoreInformationIsNewImg.NEW && !isRegistration) {
      openConfirmModal?.({
        content: '이미지를 삭제하시겠습니까?',
        onConfirm() {
          if (!isApproval) {
            productTicketMoreInfoApi
              .deleteAttachFile(data)
              .then(() => {
                openNotificationModal?.({
                  content: '이미지가 삭제되었습니다.',
                  onAccept: () => {
                    fetchData()
                    closeAllModal?.()
                  }
                })
              })
              .catch(() => {})
          } else {
            productTicketMoreInfoApi
              .deleteApprovalAttachFile(data)
              .then(() => {
                openNotificationModal?.({
                  content: '이미지가 삭제되었습니다.',
                  onAccept: () => {
                    fetchData()
                    closeAllModal?.()
                  }
                })
              })
              .catch(() => {})
          }
        }
      })
    } else {
      const matchingItemIndex = dataImage.value.findIndex((item) => item.id === data.id)
      openNotificationModal?.({
        content: '이미지가 삭제되었습니다.',
        onAccept: () => {
          if (matchingItemIndex !== -1) {
            dataImage.value[matchingItemIndex] = {
              name: '',
              url: '',
              productKey: undefined,
              originName: '',
              imageRepresentativeYn: ''
            }
          }
          closeAllModal?.()
        }
      })
    }
  }

  function handlePreview() {}

  function handleTemporary() {
    openNotificationModal?.({
      content: '입력한 정보가 저장되었습니다.',
      onAccept: () => {
        setSaveValue({ ...dataApprove.value })
        closeModalByPop?.()
      }
    })
  }
  function handleApproval() {
    openNotificationModal?.({
      content: '입력한 정보가 수정되었습니다.'
    })
  }

  const openApprovalReject = () => {
    if (values.productStatus === productApprovalStatus.rejectedApproval) {
      openNotificationModal({
        content: '이미 반려 처리되었습니다.'
      })
    } else {
      openConfirmModal({
        content: '반려된 상품은 승인요청이 있기 전까지 재승인할 수 없습니다. 선택한 상품을 반려 처리 하시겠습니까?',
        onConfirm: () => {
          // Show modal ProductReasonRejectApprovalModal
          closeModalByPop?.()
          onShowModal()
        }
      })
    }
  }

  const openConfirmApproval = () => {
    if (values.productStatus === productApprovalStatus.approvalCompleted) {
      openNotificationModal({
        content: '이미 승인완료되었습니다.'
      })
    } else {
      openConfirmModal({
        content: '선택한 상품을 승인 하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          showNotificationConfirmYesApproval()
        }
      })
    }
  }
  const showNotificationConfirmYesApproval = () => {
    openNotificationModal({
      content: '선택한 상품이 승인완료 되었습니다.'
    })
  }

  const updateIndexDataTableImage = (type: string, value: number) => {
    const index = value

    if (type === ProductAttachFileType.IMAGE) {
      if (index === value && dataImage.value[index].isNewImg === ProductTicketMoreInformationIsNewImg.NEW) {
        indexValueDataTableImage.value = value + 1

        dataImage.value[index] = {
          ...dataImage.value[index],
          imageRepresentativeYn: YnOptions.Y
        }

        dataImage.value.forEach((item, i) => {
          if (i !== index) {
            dataImage.value[i] = {
              ...dataImage.value[i],
              imageRepresentativeYn: YnOptions.N
            }
          }
        })
      }
    }
  }

  const onUpdateNewImage = (currentValue: any, attachKey: any, alt?: string) => {
    const newData = dataImage.value
    const isRepresent = computed(() => {
      return indexValueDataTableImage.value === attachKey ? YnOptions.Y : YnOptions.N
    })
    const index = newData.findIndex((item: any) => item.id === attachKey)

    const notRepresent = newData.findIndex((item) => item.imageRepresentativeYn !== '')
    if (index !== -1) {
      if (currentValue) {
        if (!isApproval && !isRegistration && !prodKeyRegis) {
          if (notRepresent !== -1) {
            newData[index] = {
              ...newData[index],
              name: currentValue.attachfileName,
              originName: currentValue.attachfileOriginName,
              url: currentValue.attachfilePathName,
              fileType: ProductAttachFileType.IMAGE,
              productKey: values.productKey,
              imageRepresentativeYn: isRepresent.value,
              alt: alt,
              urlReview: getImageUrlFrom(currentValue)
            }
            setFieldValue('arrImage', newData)
          } else {
            newData[index] = {
              ...newData[index],
              name: currentValue.attachfileName,
              originName: currentValue.attachfileOriginName,
              url: currentValue.attachfilePathName,
              fileType: ProductAttachFileType.IMAGE,
              imageRepresentativeYn: isRepresent.value,
              productKey: values.productKey,
              alt: alt,
              urlReview: getImageUrlFrom(currentValue)
            }
            setFieldValue('arrImage', newData)
          }
        } else {
          if (notRepresent !== -1) {
            newData[index] = {
              ...newData[index],
              name: currentValue.attachfileName,
              originName: currentValue.attachfileOriginName,
              url: currentValue.attachfilePathName,
              fileType: ProductAttachFileType.IMAGE,
              productRequestKey: productId.value.productRequestKey ? Number(productId.value.productRequestKey) : values.productRequestKey,
              productKey: prodKeyRegis ? null : values.productKey,
              productRequestAttachFileKey: values.productRequestKey,
              imageRepresentativeYn: isRepresent.value,
              alt: alt,
              urlReview: getImageUrlFrom(currentValue)
            }
            setFieldValue('arrFileApproval', newData)
          } else {
            newData[index] = {
              ...newData[index],
              name: currentValue.attachfileName,
              originName: currentValue.attachfileOriginName,
              url: currentValue.attachfilePathName,
              fileType: ProductAttachFileType.IMAGE,
              imageRepresentativeYn: isRepresent.value,
              productRequestKey: productId.value.productRequestKey ? Number(productId.value.productRequestKey) : values.productKey,
              productKey: prodKeyRegis ? null : values.productKey,
              productRequestAttachFileKey: values.productRequestKey,
              alt: alt,
              urlReview: getImageUrlFrom(currentValue)
            }
            setFieldValue('arrFileApproval', newData)
          }
        }
      } else {
        newData[index] = {
          ...newData[index],
          alt: alt
        }
      }
    }
  }
  const handleNextTab = () => {
    router.push({
      query: {
        ...route.query,
        tab: tabData[ProductTicketOptionTab.TAB_PROVISION_NOTICE].name
      }
    })
  }
  const handleSave = () => {
    let isValid = true
    if (!descriptionStripedHtml.value && descriptionStripedHtml.value.length === 0) {
      isValid = false
    }
    if (
      values.type === ProductTicketMoreInformationTypeDescription.PC &&
      !mobileDescriptionStripedHtml.value &&
      mobileDescriptionStripedHtml.value?.length === 0
    ) {
      isValid = false
    }
    if (!isValid) {
      openNotificationModal?.({
        content: '<p><span class="wf_text-sub-01">( * )</span>표시는 필수입력항목입니다.</p>'
      })
    } else {
      let PromiseArr
      if (!isApproval && !prodKeyRegis) {
        PromiseArr = [productTicketMoreInfoApi.updateDescriptionManager({ ...values }), productTicketMoreInfoApi.insertAttachFile(dataImage.value)]
      } else {
        PromiseArr = [
          productTicketMoreInfoApi.updateApprovalDescriptionManager({ ...values }),
          productTicketMoreInfoApi.insertApprovalAttachFile(dataImage.value)
        ]
      }

      Promise.all(PromiseArr)
        .then(([update, insert]) => {
          if (update.code === SUCCESS && insert.code === SUCCESS) {
            openNotificationModal?.({
              content: '상세정보 입력이 완료되었습니다.',
              onAccept: () => {
                fetchData()
                toggleApprove.value = false
                handleNextTab()
                closeAllModal?.()
              }
            })
          }
        })
        .catch(() => {})
    }
  }
  return {
    values,
    toggleApprove,
    changeValueField,
    handleCancel,
    handleSave,
    handleTemporary,
    handleApproval,
    handlePreview,
    openApprovalReject,
    openConfirmApproval,
    dataImage,
    dataVideo,
    handleDeleteFile,
    onUpdateNewImage,
    indexValueDataTableImage,
    updateIndexDataTableImage,
    isCheckOptionDesc
  }
}

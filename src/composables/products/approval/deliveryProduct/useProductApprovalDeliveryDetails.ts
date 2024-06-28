import { ModalNotification } from '@/components/widgets'
import { useProductRedirectLink } from '@/composables/products/common/useProductRedirectLink'
import { useModal, useTableScroll } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import {
  ProductTab,
  ProductDeliveryDetailDataSource,
  ProductDeliveryDetailsDataRow,
  productDeliveryDetailsMockDataRow,
  productDeliveryDetailsMockEmptyDataRow
} from '@/models/views'
import ProductReasonRejectApprovalModal from '@/views/products/modal/reasonProductApproval/ProductReasonRejectApprovalModal.vue'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { array, number, object, string } from 'yup'
import { productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

export const useProductApprovalDeliveryDetails = (type: string) => {
  const maxVisibleItem = 10
  const { replaceModal, closeModalByPop: closeModalShowReason } = useModal()
  const { redirectCancelLink } = useProductRedirectLink(type, ProductTab.PROVISION_NOTICE)

  const { openModal: openConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()

  const { openModal: openModalNotification, closeModalByPop } = useModalNotification()

  const productApprovalTableRef = ref()

  const router = useRouter()

  const getMockData = () => {
    const initialData = [{ ...productDeliveryDetailsMockDataRow }]
    for (let i = 1; i < 12; i++) {
      initialData.push({ ...productDeliveryDetailsMockDataRow, order: i })
    }
    return initialData
  }

  const initialData = getMockData()

  const schema = object().shape({
    dataList: array()
      .of(
        object().shape({
          order: number(),
          item: string().max(30).required(),
          description: string().max(500).required()
        })
      )
      .strict(),
    radioSelectInputDataOption: string(),
    selectedCategory: object().shape({
      label: string().required(),
      value: string().required()
    })
  })

  const { values, setFieldValue, resetForm, validate } = useForm({
    validationSchema: schema,
    initialValues: {
      dataList: initialData.map((item: ProductDeliveryDetailsDataRow) => ({ ...item })),
      radioSelectInputDataOption: ProductDeliveryDetailDataSource.external,
      selectedCategory: {
        label: '',
        value: ''
      }
    }
  })

  const dataLength = computed(() => values.dataList.length)

  useTableScroll({ tableRef: productApprovalTableRef, maxVisibleItem: maxVisibleItem, currentDataLength: dataLength })

  const onIncreaseItem = () => {
    const newData = [...values.dataList, { ...productDeliveryDetailsMockEmptyDataRow }]
    setFieldValue('dataList', newData)
  }

  const setFormData = (index: number, field: keyof ProductDeliveryDetailsDataRow, value: string) => {
    setFieldValue(`dataList.${index}.${field}`, value)
  }

  const onDeleteItem = (index: number) => {
    const newData = [...values.dataList]
    newData.splice(index, 1)
    setFieldValue('dataList', newData)
  }

  // group button
  const openConfirmCancel = () => {
    openConfirm({
      content:
        type === productBaseInfoType.delivery
          ? '상품분류를 변경하면 항목이 초기화됩니다. 계속 하시겠습니까?'
          : '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm: () => {
        closeModalConfirm?.()
        router.push(redirectCancelLink.value)
      }
    })
  }

  const onSaveClick = async () => {
    const { errors: e } = await validate()
    if (Object.keys(e).length !== 0) {
      openModalNotification?.({
        content: '( <span class="wf_text-sub-01">*</span> ) 표시는 필수입력항목입니다.',
        buttonLabel: '확인'
      })
    }
  }

  const openConfirmApprovalReject = () => {
    openConfirm({
      content:
        type === productBaseInfoType.delivery
          ? '선택한 상품을 반려 처리 하시겠습니까?'
          : '반려된 상품은 승인요청이 있기 전까지 재승인할 수 없습니다. 선택한 상품을 반려 처리 하시겠습니까?',
      onConfirm: () => {
        // closeModalConfirm?.()
        handleShowPopupReason()
      }
    })
  }

  const handleShowPopupReason = () => {
    replaceModal?.({
      component: ProductReasonRejectApprovalModal,
      events: {
        onClose: closeModalShowReason,
        onSave: (value: string) => {
          if (!value.trim()) {
            openModalNotification({
              content: '반려 사유를 입력 해주세요.',
              buttonLabel: '확인'
            })
            return
          }
          replaceModal?.({
            component: ModalNotification,
            props: {
              content: '이미 반려 처리되었습니다.',
              buttonLabel: '확인',
              onAccept: () => {
                closeModalByPop?.()
              }
            }
          })
        }
      }
    })
  }
  const openConfirmApproval = () => {
    openConfirm({
      content: '선택한 상품을 승인 하시겠습니까?',
      onConfirm: () => {
        closeModalConfirm?.()
        openModalNotification({
          content: '선택한 상품이 승인완료 되었습니다.',
          buttonLabel: '확인'
        })
        // handle when already approved
      }
    })
  }

  watch(
    () => values.selectedCategory,
    (newCategory, oldCategory) => {
      // if the category changed, the data will be reset
      // fetch new category data
      if (newCategory.value !== oldCategory.value && values.radioSelectInputDataOption === ProductDeliveryDetailDataSource.external) {
        openConfirm({
          content: '상품분류를 변경하면 항목이 초기화됩니다. 계속 하시겠습니까?',
          onConfirm: () => {
            closeModalByPop?.()
            resetForm({
              values: {
                dataList: initialData.map((item: ProductDeliveryDetailsDataRow) => ({ ...item })),
                radioSelectInputDataOption: ProductDeliveryDetailDataSource.external,
                selectedCategory: newCategory
              }
            })
          }
        })
      }
    }
  )

  return {
    onIncreaseItem,
    onDeleteItem,
    openConfirmCancel,
    openConfirmApprovalReject,
    openConfirmApproval,
    values,
    setFormData,
    onSaveClick,
    setFieldValue,
    productApprovalTableRef
  }
}

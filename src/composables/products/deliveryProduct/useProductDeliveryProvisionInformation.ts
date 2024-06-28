import { PRODUCT_TICKET_PRODUCT_LIST } from '@/common/router'
import { useLoading } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ProductTicketStandardCategoryModel } from '@/models/services/responses/products/ticket/ProductTicketListResponse'
import {
  ProductDeliveryDetailsDataRow,
  ProductProvisionInputMethodType,
  productDeliveryDetailsMockEmptyDataRow,
  productDeliveryDetailsMockDataRow
} from '@/models/views'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { array, number, object, string } from 'yup'
interface ProductTicketProvisionBaseInitValue {
  dataList: ProductDeliveryDetailsDataRow[]
  radioSelectInputDataOption: ProductProvisionInputMethodType
  selectedCategory: string
}

interface ProductTicketProvisionInformationConfigs {
  type: 'register' | 'edit'
}

export const useProductDeliveryProvisionInformation = (configs?: ProductTicketProvisionInformationConfigs) => {
  const { setLoading } = useLoading()
  // TODO: add funcs for register when type is register
  const { type = 'edit' } = configs ?? {}
  const { openModal: openConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const { openModal: openModalNotification, closeModalByPop } = useModalNotification()
  const router = useRouter()
  const isDisableApproval = ref(true)
  const categoriesData = ref<ProductTicketStandardCategoryModel[]>([])
  const productApprovalTableRef = ref()
  const initialData = ref<ProductDeliveryDetailsDataRow[]>([])
  const getMockData = () => {
    initialData.value = [{ ...productDeliveryDetailsMockDataRow }]
    for (let i = 1; i < 5; i++) {
      initialData.value.push({ ...productDeliveryDetailsMockDataRow, order: i })
    }
    return initialData
  }

  onMounted(() => {
    setValues({
      dataList: getMockData().value,
      radioSelectInputDataOption: ProductProvisionInputMethodType.FETCH
    })
  })

  const baseInitValue = {
    dataList: initialData.value.map((item: ProductDeliveryDetailsDataRow) => ({ ...item })),
    radioSelectInputDataOption: ProductProvisionInputMethodType.FETCH,
    selectedCategory: ''
  }
  const categoriesOptionsComputed = computed(() =>
    categoriesData.value.map((item) => {
      return { label: item.standardCategoryName, value: item.standardCategoryId }
    })
  )
  const initValue = computed(() => {
    return baseInitValue
  })
  const schema = object().shape({
    dataList: array()
      .of(
        object().shape({
          order: number().notRequired().nullable(),
          item: string().max(30).required(),
          description: string().max(500).required()
        })
      )
      .strict(),
    radioSelectInputDataOption: string().required(),
    selectedCategory: string().required()
  })
  const { values, setFieldValue, validate, setValues } = useForm<ProductTicketProvisionBaseInitValue>({
    validationSchema: schema,
    initialValues: initValue.value
  })
  const onIncreaseItem = () => {
    const newData = [...values.dataList, { ...productDeliveryDetailsMockEmptyDataRow }]
    setFieldValue('dataList', newData)
  }
  const setFormData = (index: number, field: keyof ProductDeliveryDetailsDataRow, value: string) => {
    setFieldValue(`dataList.${index}.${field}`, value)
  }
  const handleChangeInputMethod = (value: any) => {
    if (type === 'register') {
      // TODO: Add register logic
    }
    if (type === 'edit') {
      setFieldValue('radioSelectInputDataOption', value)
    }
  }
  const handleChangeCategory = (value: string) => {
    if (value !== values.selectedCategory) {
      openConfirm({
        content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          setFieldValue('selectedCategory', value)
        }
      })
    }
  }
  const onDeleteItem = (index: number) => {
    const newData = [...values.dataList]
    newData.splice(index, 1)
    setFieldValue('dataList', newData)
  }
  const onPreviewClick = () => {}
  const openConfirmCancel = () => {
    openConfirm({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm: () => {
        closeModalConfirm?.()
        router.push(PRODUCT_TICKET_PRODUCT_LIST)
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
    } else {
      handleSaveConfirm()
    }
  }
  const onApprovalClick = () => {
    openConfirm({
      content: '선택한 상품을 승인 하시겠습니까?',
      onConfirm: () => {
        closeModalConfirm?.()
      }
    })
  }
  const handleSaveConfirm = async () => {
    try {
      setLoading?.(true)
      openModalNotification?.({
        content: '상품정보제공고시 정보 입력이 완료되었습니다.',
        onAccept: () => {
          closeModalByPop?.()
        }
      })
    } catch (error) {
      /* empty */
    } finally {
      setLoading?.(false)
    }
  }
  const onTemporarySaveClick = () => {}
  return {
    categoriesOptionsComputed,
    onIncreaseItem,
    onDeleteItem,
    openConfirmCancel,
    onApprovalClick,
    values,
    setFormData,
    onSaveClick,
    onPreviewClick,
    setFieldValue,
    isDisableApproval,
    productApprovalTableRef,
    handleChangeCategory,
    handleChangeInputMethod,
    onTemporarySaveClick
  }
}

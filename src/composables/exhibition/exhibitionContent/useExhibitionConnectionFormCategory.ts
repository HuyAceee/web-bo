import {
  ExhibitionConnectionFormBasicInfoProps,
  exhibitionCornerListDefaultRow,
  exhibitionCornerProductListDefaultRow,
  ExhibitionCornerTableModel
} from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionMngtModel'
import { computed, ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { array, object } from 'yup'
import { DEFAULT_DATE_FORMAT_DOT, formatTime, getRandomString, isEmpty } from '@/common'
import { useValidateTimeRange } from '@/composables/widgets/dateTimePicker/useValidateTimeRange'
import { useCheckBoxTable, useModalConfirm, useModalNotification } from '@/composables'
import { useExhibitionProductSearchModal } from '@/composables/exhibition/modal/useExhibitionProductSearchModal'

export const useExhibitionConnectionFormCategory = (props: ExhibitionConnectionFormBasicInfoProps<ExhibitionCornerTableModel>) => {
  const dateRangeStart: string = formatTime(new Date(), DEFAULT_DATE_FORMAT_DOT)
  const tableRef = ref()
  const tableProductRef = ref()
  const initData: ExhibitionCornerTableModel = {
    cornerCreateRequestList: [],
    cornerProductCreateRequestList: []
  }

  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()

  const { openModal: openNotification } = useModalNotification()

  const { openModal: openModalProduct } = useExhibitionProductSearchModal()

  const schema = object().shape({
    cornerCreateRequestList: array().of(
      object().shape({
        displayYn: isEmpty,
        cornerName: isEmpty,
        displayStartDate: isEmpty,
        displayStartTime: isEmpty,
        displayEndDate: isEmpty,
        displayEndTime: isEmpty
      })
    ),
    cornerProductCreateRequestList: array().of(
      object().shape({
        displayYn: isEmpty,
        cornerProductDisplayOrder: isEmpty
      })
    )
  })

  const { values, setFieldValue, handleSubmit, controlledValues, validate, handleReset } = useForm<ExhibitionCornerTableModel>({
    validationSchema: schema,
    initialValues: initData
  })

  const listId = computed(() => {
    return values.cornerCreateRequestList?.map((item) => item.id ?? '') ?? []
  })

  const listProductId = computed(() => {
    return values.cornerProductCreateRequestList?.map((item) => item.id ?? '') ?? []
  })

  const { listChecked, onRowSelected, onSelectAllChange, clearChecked } = useCheckBoxTable(listId)

  const {
    listChecked: listCheckedProduct,
    onRowSelected: onRowSelectedProduct,
    onSelectAllChange: onSelectAllChangeProduct
  } = useCheckBoxTable(listProductId)

  const tableComputed = computed(() => {
    return values.cornerCreateRequestList?.map((v) => ({
      ...v,
      isSelected: listChecked.value.includes(v.id as string)
    }))
  })

  const tableProductComputed = computed(() => {
    return values.cornerProductCreateRequestList?.map((v) => ({
      ...v,
      isSelected: listCheckedProduct.value.includes(v.id as string)
    }))
  })

  const { validateTime } = useValidateTimeRange({ setFieldValue })

  const deleteItem = () => {
    if (listChecked.value?.length) {
      openModalConfirm({
        content: '삭제하겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          setFieldValue(
            'cornerCreateRequestList',
            values.cornerCreateRequestList?.filter((item) => {
              const idValue = item.id?.toString()
              return idValue !== listChecked.value?.find((id) => id?.toString() === idValue)?.toString()
            })
          )
          openNotification({ content: '삭제 되었습니다.' })
          tableRef.value?.clearCheckAll?.()
          listChecked.value = []
        }
      })
    }
  }

  const deleteProductItem = () => {
    if (listCheckedProduct.value?.length) {
      openModalConfirm({
        content: '삭제하겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          setFieldValue(
            'cornerProductCreateRequestList',
            values.cornerProductCreateRequestList?.filter((item) => {
              const idValue = item.id?.toString()
              return idValue !== listCheckedProduct.value?.find((id) => id?.toString() === idValue)?.toString()
            })
          )
          openNotification({ content: '삭제 되었습니다.' })
          tableProductRef.value?.clearCheckAll?.()
          listCheckedProduct.value = []
        }
      })
    }
  }

  const addNewItem = () => {
    const uid = getRandomString(10)
    setFieldValue('cornerCreateRequestList', [{ id: uid, ...exhibitionCornerListDefaultRow }, ...values.cornerCreateRequestList])
  }

  const addNewItemProduct = () => {
    openModalProduct((data) => {
      const newList = data.map((item) => {
        const uid = getRandomString(10)
        return {
          ...exhibitionCornerProductListDefaultRow,
          productKey: item.productKey,
          productName: item.productName,
          lastSaleStatusName: item.lastProductSalesStatusName,
          productSalePrice: item.salePrice,
          lastModifiedByName: item.lastModifiedByName,
          id: uid
        }
      })
      setFieldValue('cornerProductCreateRequestList', [...newList, ...values.cornerProductCreateRequestList])
    })
  }

  watch(
    () => props.data?.cornerCreateRequestList,
    (newData) => {
      if (newData) {
        tableRef.value?.clearCheckAll?.()
        listChecked.value = []
        setFieldValue(
          'cornerCreateRequestList',
          newData.map((item) => {
            return {
              id: item.exhibitionCornerKey,
              ...item
            }
          })
        )
      }
    }
  )

  watch(
    () => props.data?.cornerProductCreateRequestList,
    (newData) => {
      if (newData) {
        tableProductRef.value?.clearCheckAll?.()
        listCheckedProduct.value = []

        setFieldValue(
          'cornerProductCreateRequestList',
          newData.map((item) => {
            return {
              id: item.exhibitionCornerProductKey,
              ...item
            }
          })
        )
      }
    }
  )

  const onSubmit = async () => {
    const { valid } = await validate()
    if (valid) {
      const cornerCreateRequestList = values.cornerCreateRequestList.map((item) => {
        return {
          ...item,
          displayStartTime: item.displayStartTime.replace(':', ''),
          displayEndTime: item.displayEndTime.replace(':', ''),
          cornerOrder: item.cornerDisplayOrder
        }
      })
      const cornerProductCreateRequestList = values.cornerProductCreateRequestList.map((item) => {
        return {
          ...item,
          cornerOrder: item.cornerProductDisplayOrder
        }
      })
      return { data: { cornerProductCreateRequestList, cornerCreateRequestList }, isValid: valid }
    } else {
      openNotification({
        content: '<p><span class="wf_text-sub-01">( * )</span> 필수입력 값을 입력하세요.</p>'
      })
      return { data: {}, isValid: valid }
    }
  }

  return {
    values,
    setFieldValue,
    handleSubmit,
    dateRangeStart,
    validateTime,
    onRowSelected,
    onSelectAllChange,
    clearChecked,
    tableRef,
    controlledValues,
    tableProductRef,
    listChecked,
    listCheckedProduct,
    onRowSelectedProduct,
    onSelectAllChangeProduct,
    tableComputed,
    tableProductComputed,
    deleteItem,
    deleteProductItem,
    addNewItem,
    addNewItemProduct,
    onSubmit,
    handleReset
  }
}

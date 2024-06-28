import { onMounted, ref } from 'vue'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import { useModalConfirm } from '../widgets'
import { PartnerSalesCategoryItemEmits } from '@/components/partner/PartnerSalesCategoryItem.vue'
import {
  PartnerSalesCategoryItemFieldType,
  PartnerSalesCategoryItemModel,
  emptyPartnerSalesCategoryItem
} from '@/models/views/partner/PartnerListModel'
import { TEXT_MAX_NUMBER_10, getRandomString } from '@/common'
interface PartnerSalesCategoryItemProps {
  listSalesCategory: PartnerSalesCategoryItemModel[]
}

export const usePartnerSalesCategory = (props: PartnerSalesCategoryItemProps, emits: PartnerSalesCategoryItemEmits) => {
  const listSalesCategory = ref<PartnerSalesCategoryItemModel[]>([...props.listSalesCategory])
  const salesCategoryOptions = ref()
  const isEmptyLastSalesCategory = ref(true)
  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()

  onMounted(() => {
    productCategoryApi
      .getCategoryList()
      .then((response) => {
        const listCate = response.data.map((it) => {
          return {
            standardCategoryId: it.standardCategoryId,
            standardCategoryName: it.standardCategoryName
          }
        })
        salesCategoryOptions.value = listCate
      })
      .catch(() => {})
  })

  const handleDeleteSalesCategory = (index: number) => {
    openModalConfirm?.({
      content: '해당 카테고리를 삭제하시겠습니까?',
      onConfirm() {
        const deletedItem = listSalesCategory.value.splice(index, 1)
        if (deletedItem[0].representative) listSalesCategory.value[0].representative = true
        isEmptyLastSalesCategory.value =
          listSalesCategory.value[listSalesCategory.value.length - 1][PartnerSalesCategoryItemFieldType.contractMarginRate].length === 0
        emits('on-change', listSalesCategory.value)
        closeModalConfirm?.()
      }
    })
  }

  const handleAddNewSalesCategory = () => {
    listSalesCategory.value = [
      ...listSalesCategory.value,
      { ...emptyPartnerSalesCategoryItem, representative: false, id: getRandomString(TEXT_MAX_NUMBER_10) }
    ]
    emits('on-change', listSalesCategory.value)
    isEmptyLastSalesCategory.value = true
  }

  const handleChange = (index: number, field: PartnerSalesCategoryItemFieldType, value: any) => {
    let newList = [...listSalesCategory.value]
    if (field === PartnerSalesCategoryItemFieldType.representative) {
      newList = listSalesCategory.value.map((item) => {
        return { ...item, representative: false }
      })
    }
    newList[index] = {
      ...newList[index],
      [field]: value
    }
    if (field === PartnerSalesCategoryItemFieldType.category) {
      newList[index][PartnerSalesCategoryItemFieldType.md] = `${value.standardCategoryName}(${value.standardCategoryId})`
    }
    if (index === newList.length - 1) {
      isEmptyLastSalesCategory.value = newList[index][PartnerSalesCategoryItemFieldType.contractMarginRate].length === 0
    }
    listSalesCategory.value = newList

    emits('on-change', listSalesCategory.value)
  }

  const setListValue = (value: PartnerSalesCategoryItemModel[]) => {
    listSalesCategory.value = value
  }

  return {
    listSalesCategory,
    salesCategoryOptions,
    isEmptyLastSalesCategory,
    handleDeleteSalesCategory,
    handleAddNewSalesCategory,
    handleChange,
    setListValue
  }
}

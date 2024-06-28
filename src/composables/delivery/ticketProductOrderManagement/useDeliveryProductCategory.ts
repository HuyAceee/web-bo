import { SelectOptionModel } from '@/models'
import { DeliveryProductCategoryDepthRank } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import { onMounted, ref, watch } from 'vue'

interface DeliveryProductCategoryFormModel {
  categoryDepthId1?: string
  categoryDepthId2?: string
  categoryDepthId3?: string
}

type HasProductCategoryProperty<T> = T extends DeliveryProductCategoryFormModel ? T : never

export const useDeliveryProductCategory = <T>(
  values: HasProductCategoryProperty<T>,
  setFieldValue: (field: string, value: string) => void,
  resetFieldWhenChangeDepth1?: boolean
) => {
  const categoryDepth1 = ref<SelectOptionModel[]>([])
  const categoryDepth2 = ref<SelectOptionModel[]>([])
  const categoryDepth3 = ref<SelectOptionModel[]>([])
  let resetFieldWhenChangeDepth1Val = resetFieldWhenChangeDepth1 ?? true

  const onGetCategory = async (
    rank: DeliveryProductCategoryDepthRank = DeliveryProductCategoryDepthRank.DEPTH_1,
    params: { upperDisplayCategoryId?: string } = {}
  ) => {
    const { data } = await productCategoryApi.getCategoryDepth(rank, params)
    return data.map((item) => {
      return {
        label: item.displayCategoryName,
        value: item.displayCategoryId
      }
    })
  }

  onMounted(async () => {
    const data = await onGetCategory()
    categoryDepth1.value = data
  })

  watch(
    () => values.categoryDepthId1,
    async (newValue) => {
      if (resetFieldWhenChangeDepth1Val) {
        setFieldValue('categoryDepthId2', '')
        setFieldValue('categoryDepthId3', '')
      } else {
        resetFieldWhenChangeDepth1Val = true
      }
      if (!newValue) return (categoryDepth2.value = [])
      const data = await onGetCategory(DeliveryProductCategoryDepthRank.DEPTH_2, { upperDisplayCategoryId: values.categoryDepthId1 })
      categoryDepth2.value = data
    }
  )

  watch(
    () => values.categoryDepthId2,
    async (newValue) => {
      if (resetFieldWhenChangeDepth1Val) {
        setFieldValue('categoryDepthId3', '')
      }
      if (!newValue) return (categoryDepth3.value = [])
      const data = await onGetCategory(DeliveryProductCategoryDepthRank.DEPTH_3, { upperDisplayCategoryId: values.categoryDepthId2 })
      categoryDepth3.value = data
    }
  )

  return {
    categoryDepth1,
    categoryDepth2,
    categoryDepth3
  }
}

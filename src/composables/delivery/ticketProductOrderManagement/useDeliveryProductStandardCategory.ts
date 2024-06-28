import { SelectOptionModel, WelfareSelectOptionType } from '@/models'
import {
  DeliveryProductCategoryDepthRank,
  DeliveryCategoryTypeModel
} from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import { ref, watch } from 'vue'

interface DeliveryProductCategoryFormModel {
  categoryType: {
    label: string
    value: DeliveryCategoryTypeModel
  }
  categoryDepthId1?: WelfareSelectOptionType
  categoryDepthId2?: WelfareSelectOptionType
  categoryDepthId3?: WelfareSelectOptionType
  chargeMdKey?: string
}

type HasProductCategoryProperty<T> = T extends DeliveryProductCategoryFormModel ? T : never

export const useDeliveryProductStandardCategory = <T>(
  values: HasProductCategoryProperty<T>,
  setFieldValue: (field: string, value: string) => void,
  disableImmediate?: boolean,
  defaultValueKey?: string
) => {
  const categoryDepth1 = ref<SelectOptionModel[]>([])
  const categoryDepth2 = ref<SelectOptionModel[]>([])
  const categoryDepth3 = ref<SelectOptionModel[]>([])

  const onGetCategory = async (
    type: WelfareSelectOptionType,
    rank: DeliveryProductCategoryDepthRank = DeliveryProductCategoryDepthRank.DEPTH_1,
    params: { key?: string } = {}
  ) => {
    const isDisplay = type.value === DeliveryCategoryTypeModel.DISPLAY

    const newParams = isDisplay
      ? {
          upperDisplayCategoryId: params.key
        }
      : {
          upperStandardCategoryId: params.key
        }
    let data
    if (isDisplay) {
      data = await productCategoryApi.getCategoryDepth(rank, newParams)
    } else {
      const chargeMdKey = values?.chargeMdKey || defaultValueKey || ''
      data = await productCategoryApi.getStandardCategoryDepth(rank, {
        ...newParams,
        chargeMdKey: chargeMdKey
      })
    }

    return data.data.map((item: any) => {
      return {
        label: isDisplay ? item?.displayCategoryName : item.standardCategoryName,
        value: isDisplay ? item?.displayCategoryId : item.standardCategoryId
      }
    })
  }

  watch(
    () => values.categoryType,
    async (newType) => {
      if (!newType) return
      categoryDepth1.value = await onGetCategory(newType)
    },
    { immediate: !disableImmediate }
  )

  watch(
    () => [values.categoryDepthId1, values.categoryType],
    async ([newDep, newType]) => {
      if (!newDep || !newType) return
      categoryDepth2.value = await onGetCategory(newType, DeliveryProductCategoryDepthRank.DEPTH_2, { key: newDep.value })
      setFieldValue('categoryDepthId2', '')
      setFieldValue('categoryDepthId3', '')
    },
    { deep: true }
  )

  watch(
    () => [values.categoryDepthId2, values.categoryType],
    async ([newCategoryDepthId2, newType]) => {
      if (!newCategoryDepthId2 || !newType) return
      categoryDepth3.value = await onGetCategory(newType, DeliveryProductCategoryDepthRank.DEPTH_3, { key: newCategoryDepthId2.value })
      setFieldValue('categoryDepthId3', '')
    },
    { deep: true }
  )

  return {
    categoryDepth1,
    categoryDepth2,
    categoryDepth3
  }
}

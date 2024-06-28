import { SelectOptionModel } from '@/models'
import { memberListApi } from '@/services/api/members/MemberListApi'
import { onMounted, ref, watch } from 'vue'

interface DeliveryMemberSellerCompanyModel {
  sellerKey?: string
  subcontractKey?: string
}

type HasProductCategoryProperty<T> = T extends DeliveryMemberSellerCompanyModel ? T : never

export const useDeliveryMemberSellerCompany = <T>(values: HasProductCategoryProperty<T>, setFieldValue: (field: string, value: string) => void) => {
  const sellerCompanies = ref<SelectOptionModel[]>([])

  const onGetCategory = async (sellerKey: string) => {
    try {
      const { data } = await memberListApi.getSellerCompanyBySellerKey({ sellerKey })
      sellerCompanies.value = data?.map((item) => {
        return {
          label: item?.subSellerName ?? '',
          value: item?.managerKey?.toString() ?? ''
        }
      })
    } catch (error) { /* empty */ }
  }

  onMounted(() => {
    if (!values?.sellerKey) return
    onGetCategory(values?.sellerKey)
  })

  watch(
    () => values?.sellerKey,
    async (value) => {
      if (!value) return
      setFieldValue('subcontractKey', '')
      onGetCategory(value ?? '')
    }
  )

  return {
    sellerCompanies
  }
}

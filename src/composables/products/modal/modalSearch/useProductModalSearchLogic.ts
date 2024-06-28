import { productModalSearchBrandMeta, productModalSearchMDMeta, ProductSearchModalProps, ProductSearchRecordModel, ProductSearchType } from '@/models'
import { MemberAdminsMdsModel } from '@/models/views/members/modal/MemberAdminsMdsModel'
import { memberAdminsMdsApi } from '@/services/api/members/MemberAdminsMdsApi'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { onMounted, ref } from 'vue'
import { exhibitionBrandListPopupApi } from '@/services/api/exhibition/ExhibitionBrandListPopupApi'
import { ExhibitionBrandListPopupResponseModel } from '@/models/services/responses/exhibition/ExhibitionBrandListPopupResponse'

export const useProductModalSearchLogic = (props: ProductSearchModalProps) => {
  const res: ProductSearchRecordModel = {
    code: NaN,
    name: ''
  }
  const getSearchMetaInfo = () => {
    return props.searchType === ProductSearchType.BRAND ? productModalSearchBrandMeta : productModalSearchMDMeta
  }

  const modalSearchMetaInfo = getSearchMetaInfo()

  const searchInp = ref(props.searchInput ?? '')

  const selectValue = ref<ProductSearchRecordModel>(props.searchResData ?? res)

  const searchResults = ref<ProductSearchRecordModel[]>()

  const handlePopupSearch = async (params: string): Promise<ProductSearchRecordModel[]> => {
    if (props.searchType === ProductSearchType.BRAND) {
      const { data } = await exhibitionBrandListPopupApi.getBrandList(params)
      return Promise.resolve(
        data.map((it: ExhibitionBrandListPopupResponseModel): ProductSearchRecordModel => {
          return {
            code: it?.brandKey ?? NaN,
            name: it?.brandName ?? '',
            id: it.brandId ?? ''
          }
        })
      )
    } else {
      const { data } = await memberAdminsMdsApi.search(params)
      return Promise.resolve(
        data.map((it: MemberAdminsMdsModel): ProductSearchRecordModel => {
          return {
            code: it.managerKey,
            name: it.managerName,
            id: it.managerKey
          }
        })
      )
    }
  }

  onMounted(() => {
    if (props.searchResData) {
      handleSearch(props.searchResData.name).catch(() => {
        // error
      })
    } else if (props.searchInput) {
      handleSearch(props.searchInput).catch(() => {
        // error
      })
    }
  })

  const handleSearch = async (searchInp: string) => {
    try {
      searchResults.value = await handlePopupSearch(searchInp)
    } catch (error) {
      // handle error
    }
  }

  const handleSelectRow = (res: DataTableRowClickEvent) => {
    selectValue.value = res.data as ProductSearchRecordModel
  }

  const handleSelectValue = () => {
    if (selectValue.value.code && selectValue.value.name) {
      props.onSelect(selectValue.value)
    } else {
      props.onCancel?.()
    }
  }

  return {
    searchInp,
    searchResults,
    handleSearch,
    handleSelectRow,
    handleSelectValue,
    modalSearchMetaInfo
  }
}

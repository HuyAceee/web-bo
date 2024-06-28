import { TABLE_LOADING_WAIT_TIME, DATA_TABLE_NUMBER_ITEMS_PAGE_50 } from '@/common'
import { useDebounce } from '@/composables/common/useDebounce'
import { DataTableRequestModel } from '@/models'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { ref } from 'vue'

export function useDataTablePagination<T>(callback: DataTableRequestModel<T>) {
  const totalItems = ref()
  const isLoading = ref(false)
  const items = ref<T[]>()
  let currentPage = 0
  let numberOfItems = DATA_TABLE_NUMBER_ITEMS_PAGE_50
  const { debounce } = useDebounce()

  const fetchDataWith = (params: { page: number; numberOfItems: number }) => {
    isLoading.value = true
    numberOfItems = params.numberOfItems
    return new Promise((resolved, reject) => {
      debounce(() => {
        return callback(params.page, params.numberOfItems)
          .then((result) => {
            currentPage = params.page
            numberOfItems = params.numberOfItems
            handleSuccessResponse(result)
            resolved(result)
          })
          .catch((e) => {
            handleFailResponse()
            reject(new Error(e))
          })
      }, TABLE_LOADING_WAIT_TIME)
    })
  }
  const refreshData = () => {
    return fetchDataWith({ page: currentPage, numberOfItems })
  }
  const handleSuccessResponse = (response: DataTablePaginationResponseModel<T>) => {
    items.value = response.data
    totalItems.value = response.totalItems
    isLoading.value = false
  }

  const setData = (data: T[]) => {
    items.value = data
  }

  const handleFailResponse = () => {
    // items.value = response.data
    // totalItems.value = response.totalItems
    isLoading.value = false
  }

  const clearData = () => {
    items.value = []
    totalItems.value = 0
  }

  return {
    items,
    totalItems,
    isLoading,
    fetchDataWith,
    setData,
    clearData,
    refreshData,
    numberOfItems
  }
}

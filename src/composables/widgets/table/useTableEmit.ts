import { WelfareDataTableEmits } from '@/models'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { PageState } from 'primevue/paginator'
import { ref } from 'vue'

export const useBaseDataTablePaginationEmit = (emit: WelfareDataTableEmits) => {
  const tableRef = ref()
  const event = {
    rowClick: (event: DataTableRowClickEvent) => {
      emit('row-click', event)
    },
    pageChange: (params: PageState) => {
      emit('page-change', params)
    },
    dropDownChange: (select: any) => {
      emit('drop-down-change', select)
    }
  }

  const scrollToTop = () => {
    const table = tableRef.value.querySelector('.p-datatable-wrapper tbody')
    table?.scrollTo({
      top: 0,
      behavior: 'auto'
    })
  }

  return { event, tableRef, scrollToTop }
}

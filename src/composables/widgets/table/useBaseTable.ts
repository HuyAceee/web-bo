import { DataTableParamsModel } from '@/models'
import { onActivated, onMounted, ref, watch } from 'vue'

export const useBaseTable = (props: DataTableParamsModel) => {
  const selectRows = ref()
  const firstRowNumber = ref(props.first ?? 0)
  const defaultWidthLastHeaderColumn = ref()
  const headerColumnRef = ref()
  const parentRef = ref()
  onMounted(() => {
    // console.log(parentRef.value);
    headerColumnRef.value = parentRef?.value?.querySelector('.p-datatable-table tr:first-child th:last-child')
    if (props.selectProps?.options && props.selectProps.options.length > 0) {
      selectRows.value = props.selectProps.options[0]
    }

    defaultWidthLastHeaderColumn.value = headerColumnRef?.value?.offsetWidth ?? 0

    // Handel scroll header table when scroll body
    const body = parentRef?.value?.querySelector('.p-datatable-table tbody')
    const head = parentRef?.value?.querySelector('.p-datatable-table thead')
    if (body && head) {
      body.addEventListener('scroll', (e: any) => {
        // @ts-ignore
        head.style.transform = `translateX(${-e.currentTarget.scrollLeft}px)`
      })
    }
  })

  onActivated(() => {
    if (headerColumnRef.value) {
      const thHead = headerColumnRef.value.closest('thead')
      if (thHead) thHead.style.transform = 'translateX(0px)'
    }
  })

  watch(selectRows, (newSelectRows) => {
    const newRows = newSelectRows.value
    const page = Math.floor(firstRowNumber.value / newRows)
    firstRowNumber.value = page * newRows

    if (newSelectRows.value > 10) {
      if (headerColumnRef.value) {
        headerColumnRef.value.style.minWidth = headerColumnRef.value.offsetWidth + 6 + 'px'
      }
    } else if (headerColumnRef.value) {
      headerColumnRef.value.style.minWidth = defaultWidthLastHeaderColumn.value + 'px'
    }
    props.onPageChange({
      page,
      rows: newRows,
      first: firstRowNumber.value
    })
  })

  /* Return the first row when page change */
  const eventFirst = (value: number) => {
    firstRowNumber.value = value
  }

  const scrollToTop = () => {
    const table = parentRef.value.querySelector('.p-datatable-wrapper tbody')
    table?.scrollTo({
      top: 0,
      behavior: 'auto'
    })
  }

  return {
    selectRows,
    firstRowNumber,
    eventFirst,
    scrollToTop,
    parentRef
  }
}

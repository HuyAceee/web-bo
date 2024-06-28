import { WelfarePaginationProps } from '@/models/uikit'
import { computed, ref, watch } from 'vue'

export const useWelfarePagination = (props: WelfarePaginationProps) => {
  const page = ref<number>(0)
  const rows = computed(() => {
    return props.rows ?? 0
  })

  const totalRecords = computed(() => {
    return props.totalRecords ?? 0
  })

  const pageLinkSize = computed(() => {
    return props.pageLinkSize ?? 0
  })

  watch(totalRecords, () => {
    if (page.value >= pageCount.value) {
      handelClickLastButton()
    }
  })

  watch(pageLinkSize, () => {
    setPageLinkByPage()
  })

  watch(rows, (newRowsProps, oldRowsProps) => {
    page.value = Math.floor((page.value * oldRowsProps) / newRowsProps)
    setPageLinkByPage()
  })

  const pageCount = computed(() => {
    return Math.ceil(totalRecords.value / rows.value)
  })

  const pageLink = ref<number>(0)
  const maxLink = computed(() => {
    let max = pageLinkSize.value * (pageLink.value + 1)
    if (max > pageCount.value) max = pageCount.value
    return max
  })
  const pageLinks = computed(() => {
    const links = []
    for (let i = pageLinkSize.value * pageLink.value + 1; i <= maxLink.value; i++) {
      links.push(i)
    }
    return links
  })

  const first = computed(() => {
    return page.value * rows.value
  })

  const disabledFirst = computed(() => {
    return page.value == 0
  })

  const disabledPrev = computed(() => {
    return page.value < pageLinkSize.value
  })

  const disabledNext = computed(() => {
    return pageLink.value >= Math.floor((pageCount.value - 1) / pageLinkSize.value)
  })

  const disabledLast = computed(() => {
    return page.value == pageCount.value - 1
  })

  const handelClickPageButton = (pageClick: number) => {
    page.value = pageClick
  }

  const handelClickFirstButton = () => {
    if (!disabledFirst.value) {
      page.value = 0
      pageLink.value = 0
    }
  }

  const handelClickLastButton = () => {
    if (!disabledLast.value) {
      page.value = pageCount.value - 1
      if (page.value < 0 ) {
        page.value = 0
      }
      setPageLinkByPage()
    }
  }

  const handelClickPrevButton = () => {
    if (!disabledPrev.value) {
      pageLink.value = pageLink.value - 1
      page.value = pageLinkSize.value * (pageLink.value + 1) - 1
    }
  }

  const handelClickNextButton = () => {
    if (!disabledNext.value) {
      pageLink.value = pageLink.value + 1
      page.value = pageLinkSize.value * pageLink.value
    }
  }

  const setPageLinkByPage = () => {
    pageLink.value = Math.floor(page.value / pageLinkSize.value)

  }

  return {
    page,
    pageCount,
    rows,
    first,
    pageLinks,
    disabledFirst,
    disabledPrev,
    disabledNext,
    disabledLast,
    handelClickPageButton,
    handelClickFirstButton,
    handelClickLastButton,
    handelClickPrevButton,
    handelClickNextButton
  }
}

import { Ref, onMounted, ref, watch } from 'vue'

export const useTableScroll = (params: { tableRef: Ref<any>; maxVisibleItem: number; currentDataLength: Ref<number> }) => {
  const padding = ref()
  const width = ref()

  onMounted(() => {
    const isTableOverFlow = params.currentDataLength.value > params.maxVisibleItem
    const table = params.tableRef.value
    const children = table?.children
    const firstChild = children[0]?.lastChild
    const computedStyle = getComputedStyle(firstChild)
    width.value = computedStyle.width
    padding.value = computedStyle.paddingRight

    if (isTableOverFlow && params.tableRef.value) {
      const newPadding = parseInt(padding.value) - 3 + 'px'
      const newWidth = parseInt(width.value) - 6 + 'px'
      for (let i = 0; i < children.length; i++) {
        const child = children[i].lastChild
        child.style.paddingRight = newPadding
        child.style.paddingLeft = newPadding
        child.style.width = newWidth
      }
    }
  })

  watch(
    () => params.currentDataLength.value,
    (newDataLength) => {
      const table = params.tableRef.value
      if (newDataLength > params.maxVisibleItem) {
        const children = table.children
        const newPadding = parseInt(padding.value) - 3 + 'px'
        const newWidth = parseInt(width.value) - 6 + 'px'
        for (let i = 0; i < children.length; i++) {
          const child = children[i].lastChild
          child.style.paddingRight = newPadding
          child.style.paddingLeft = newPadding
          child.style.width = newWidth
        }
        // apply style when add last row is rendered
        setTimeout(() => {
          const child = children[children.length - 1].lastChild
          child.style.paddingRight = newPadding
          child.style.paddingLeft = newPadding
          child.style.width = newWidth
        })
      } else {
        const children = table.children
        for (let i = 0; i < children.length; i++) {
          const child = children[i].lastChild
          child.style.paddingRight = padding.value
          child.style.paddingLeft = padding.value
          child.style.width = width.value
        }
      }
    }
  )
}

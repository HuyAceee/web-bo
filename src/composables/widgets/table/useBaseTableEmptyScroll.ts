import { Ref, onMounted, onUnmounted, onUpdated, ref, watch, onActivated } from 'vue'
import { useRoute } from 'vue-router'

export const useBaseTableEmptyScroll = (parentRef: Ref<any>) => {
  const emptyRowRef = ref()
  const currentScreenWidth = ref(window.innerWidth)
  const sidebarWidth = 460
  const leftPositionTable = 0.39
  const leftPositionPopupTable = 0.42
  const maxWidthPopup = 1201
  const route = useRoute()
  const handleScrollEmptyTable = () => {
    /**
     * fn: scroll table when it has empty data.
     * The header scroll is base on body width
     * so we need to set the width of the empty row
     */
    const tableElement = parentRef.value
    emptyRowRef.value = tableElement.querySelector('[data-pc-section="emptymessage"]')
    if (emptyRowRef.value && tableElement) {
      const rowEmpty = tableElement.querySelector('[data-pc-section="emptymessagecell"]')
      if (rowEmpty?.style) {
        rowEmpty.style.setProperty('width', '190px', 'important')
        rowEmpty.style.setProperty('min-width', 'fit-content', 'important')
      }
      const headerRow = tableElement.querySelector('tr:first-child')
      const headerElement = tableElement.querySelector('thead')
      let leftPosition
      // only add scroll style when table thead(fixed) width is smaller than tr
      if (headerElement.offsetWidth < headerRow.offsetWidth) {
        emptyRowRef.value.style.setProperty('justify-content', 'unset', 'important')
        if (headerElement.offsetWidth <= maxWidthPopup) {
          leftPosition = headerElement.offsetWidth * leftPositionPopupTable
        } else {
          leftPosition = (currentScreenWidth.value - sidebarWidth) * leftPositionTable
        }
        // get offsetwidth - 1 because the width is round off
        emptyRowRef.value.style.width = headerRow.offsetWidth - 1 + 'px'
        if (rowEmpty?.style) {
          rowEmpty.style.position = 'sticky'
          rowEmpty.style.setProperty('-webkit-position', 'sticky')
          rowEmpty.style.left = leftPosition + 'px'
        }
      }
    }
  }
  const handleResizeScreen = () => {
    const rowEmpty = parentRef.value?.querySelector('[data-pc-section="emptymessagecell"]')
    if (rowEmpty) {
      const newWidth = window.innerWidth
      if (newWidth !== currentScreenWidth.value) {
        const headerElement = parentRef.value?.querySelector('thead')
        const headerRow = parentRef.value.querySelector('tr:first-child')
        if (headerElement && headerRow) {
          if (headerRow.offsetWidth <= headerElement.offsetWidth) {
            emptyRowRef.value.style.setProperty('justify-content', 'center', 'important')
            emptyRowRef.value.style.width = 'auto'
            return
          }

          emptyRowRef.value.style.setProperty('justify-content', 'unset', 'important')
          emptyRowRef.value.style.width = headerRow.offsetWidth - 1 + 'px'
          let leftPosition
          currentScreenWidth.value = newWidth

          if (headerElement.offsetWidth <= maxWidthPopup) {
            return
          } else {
            leftPosition = (currentScreenWidth.value - sidebarWidth) * leftPositionTable
          }
          rowEmpty.style.left = leftPosition + 'px'
        }
      }
    }
  }

  onMounted(() => {
    handleScrollEmptyTable()
    window.addEventListener('resize', handleResizeScreen)
  })

  watch(
    () => route.query,
    () => {
      handleScrollEmptyTable()
    }
  )

  onActivated(() => {
    handleScrollEmptyTable()
  })

  onUpdated(() => {
    handleScrollEmptyTable()
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResizeScreen)
  })
}

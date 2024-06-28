import { listRouteForwardPathFlat } from '@/router/private'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export const useHeaderLinkBreakCrumb = () => {
  const route = useRoute()

  const routes = computed(() => {
    const listRoutes = route.path.split('/')
    const isHasEdit = listRoutes.includes('edit') && listRoutes[listRoutes.length - 1] !== 'edit'
    if (isHasEdit) {
      listRoutes.pop()
      listRoutes[listRoutes.length - 1] = 'edit/:id'
    }
    const listItems = listRouteForwardPathFlat.filter((item) =>
      listRoutes.some((_item, index) => {
        return (
          Array.from({ length: index + 1 })
            .map((_, _index) => listRoutes[_index])
            .join('/') === item.path
        )
      })
    )
    return listItems.map((item) => ({ name: item.name, path: item.path, isShowTips: item.isShowTips, tooltipElement: item.tooltipElement }))
  })

  const titleName = computed(() => {
    return routes.value?.[routes.value.length - 1].name ?? ''
  })

  const isShowTips = computed(() => {
    return routes.value?.[routes.value.length - 1]?.isShowTips ?? false
  })

  const tooltipElement = computed(() => {
    return routes.value?.[routes.value.length - 1]?.tooltipElement ?? false
  })

  return {
    titleName,
    routes,
    isShowTips,
    tooltipElement
  }
}

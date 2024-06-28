import { ExhibitionHallTabType } from "@/models/views/exhibition/exhibitionContent/ExhibitionHallMngtModel"
import ExhibitionHallMngtBaseInfoTabPage from "@/views/exhibition/exhibitionContent/ExhibitionHallMngtBaseInfoTabPage.vue"
import ExhibitionHallMngtDetailedInfoTabPageVue from "@/views/exhibition/exhibitionContent/ExhibitionHallMngtDetailedInfoTabPage.vue"
import { TabViewChangeEvent } from "primevue/tabview"
import { ref, watch } from "vue"
import { useRoute, useRouter } from "vue-router"

export const useExhibitionHallMngtWrapper = () => {
  const route = useRoute()
  const router = useRouter()
  const tabData = [
    { name: ExhibitionHallTabType.BASE_INFORMATION, component: ExhibitionHallMngtBaseInfoTabPage, header: '기본정보' },
    { name: ExhibitionHallTabType.DETAILED_INFORMATION, component: ExhibitionHallMngtDetailedInfoTabPageVue, header: '상세정보' }
  ]

  const tabPanelProps = tabData.map((item) => {
    return { header: item.header }
  })

  const searchTabIndex = (tab?: string) => {
    const tabIndex = tabData.findIndex((item) => item.name === tab)
    return tabIndex > 0 ? tabIndex : 0
  }

  const currentActive = ref(searchTabIndex(route.query.tab as string))

  watch(
    () => route.query.tab,
    (value) => {
      currentActive.value = searchTabIndex(value as string)
    }
  )

  const handleTabChange = (event: TabViewChangeEvent) => {
    currentActive.value = event.index
    router.push({
      query: {
        ...route.query,
        tab: tabData[event.index].name
      }
    })
  }

  return { currentActive, tabData, tabPanelProps, handleTabChange }
}
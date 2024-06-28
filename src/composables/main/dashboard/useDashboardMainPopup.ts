import { ref, computed } from 'vue'
import data from '@/assets/mockData/data/main/main-popup.json'

export const useDashboardMainPopup = () => {
  const currentPage = ref(0)
  const dataFetch = computed(() => {
    return data.data
  })

  const currentData = computed(() => {
    return dataFetch.value[currentPage.value]
  })

  const titleTruncate = computed(() => {
    return data?.title?.length > 30 ? data.title?.slice(0, 30) + '...' : data?.title
  })

  const dataLength = computed(() => {
    return dataFetch.value?.length
  })

  function nextPage() {
    if (currentPage.value < dataFetch.value.length - 1) {
      currentPage.value++
    }
  }

  function prePage() {
    if (currentPage.value >= 1) {
      currentPage.value--
    } else {
      return false
    }
  }

  return { titleTruncate, currentPage, currentData, dataLength, nextPage, prePage }
}

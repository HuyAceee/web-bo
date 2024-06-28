import data from '@/assets/mockData/data/main/main.json'
import { useModal } from '@/composables/common'
import DashboardInstructionsModal from '@/views/main/dashboard/DashboardInstructionsModal.vue'
import { onMounted, ref } from 'vue'

export const useDashboard = () => {
  const { showModal, closeModalByPop } = useModal()
  const now = new Date()
  const lastRefreshTime = ref(0)
  const headerProps = {
    paths: [],
    title: '오늘의 메가존 플레이',
    active: true
  }

  const getTypeParameterOverview = (index: number) => {
    if (index === 0) {
      return 'orange'
    }
    return index === data.parameterOverview.length - 1 ? 'blue' : undefined
  }

  const reloadData = () => {
    data.parameterOverview[0].value = Number(data.parameterOverview[0].value) + 1 + ''
    lastRefreshTime.value = new Date().getTime()
  }

  onMounted(() => {
    showModal?.({
      component: DashboardInstructionsModal,
      props: {
        onClose: () => {
          closeModalByPop?.()
        }
      }
    })
  })

  return { now, data, headerProps, getTypeParameterOverview, lastRefreshTime, reloadData }
}

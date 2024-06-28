import { modalManualApi } from '@/services/api/main/MainModalManualApi'
import { MainManualModal } from '@/models/views/main/modal/MainManualModal'
import { icCalc, icUser, icOfficeBag, icShop } from '@/assets'
import { useModalNotification } from '@/composables'
import { onMounted, ref } from 'vue'
import { useComingSoonModal } from '@/composables/widgets/modal/useComingSoonModal'
export const useManualModal = () => {
  const { openModal } = useModalNotification()
  const { openComingSoonModal } = useComingSoonModal()
  const notes = [
    '메가존플레이 시스템별 매뉴얼을 제공해 드립니다.',
    '가급적 판매사 또는 고객사에서 메가존플레이를 처음 이용하기 전에 전달하여 이용에 불편이 없으시도록 안내해 주세요.'
  ]
  const manuals = ref()

  const getManualData = async () => {
    try {
      const response = await modalManualApi.getManual()
      if (response) {
        const { data } = response
        if (data.length < 1) {
          openModal({
            content: '등록된 매뉴얼이 없습니다. <br/> 고객센터에 문의해 주세요.'
          })
        }
        return data
      }
    } catch (error) {
      openModal({
        content: '등록된 매뉴얼이 없습니다. <br/> 고객센터에 문의해 주세요.'
      })
    }
  }
  const getData = async () => {
    try {
      const icons = [icUser, icCalc, icOfficeBag, icShop]
      const dataManual = await getManualData()
      manuals.value = dataManual?.map((item: MainManualModal, index: number) => ({
        ...item,
        icon: icons[index]
      }))
    } catch {
      /* empty */
    }
  }
  const toPage = () => {
    openComingSoonModal()
  }
  onMounted(() => {
    getData()
  })
  return { getManualData, getData, manuals, notes, toPage }
}

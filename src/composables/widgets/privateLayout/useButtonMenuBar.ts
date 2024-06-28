import { handleAddClass, handleRemoveClass } from '@/common/html'
import { ref } from 'vue'

const currentIndexActive = ref(0)

export const useButtonMenuBar = () => {
  const handleActiveIndex = (index: number) => {
    const listBtn = document.querySelectorAll('.wf_navbar-btn')
    listBtn.forEach((item) => {
      handleRemoveClass(item, 'black')
    })
    handleAddClass(listBtn?.[index], 'black')
  }
  return {
    currentIndexActive,
    handleActiveIndex
  }
}

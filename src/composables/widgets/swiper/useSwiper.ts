import { onMounted, ref, watch } from "vue"

export const useSwiper = () => {
  const indexActive = ref(0)
  const swiper = ref()
  const swiperBody = ref()
  const arrowLeft = ref()
  const arrowRight = ref()
  const items = ref()

  onMounted(() => {  
    swiper.value = document.querySelector(".wf-swiper")
    swiperBody.value = document.querySelector(".wf-swiper_body")
    arrowLeft.value = document.querySelector(".wf-swiper_arrow-left")
    arrowRight.value = document.querySelector(".wf-swiper_arrow-right")
    items.value = swiper.value.querySelectorAll(".wf-swiper_item")
    
    if(arrowLeft.value) {
      arrowLeft.value.addEventListener("click", () => {
        if(indexActive.value > 0 && !arrowLeft.value.classList.contains("wf-disable")) {
          indexActive.value--;
        } 
      })
    }

    if(arrowRight.value) {
      arrowRight.value.addEventListener("click", () => {
        if(indexActive.value < items.value.length - 1 && !arrowRight.value.classList.contains("wf-disable")) {
          indexActive.value++;
        } 
      })
    }

  })

  watch(indexActive, (newIndex: number) => {
    swiperBody.value.style.transform = `translateX(-${newIndex * 100}%)`
    arrowRight.value.classList.remove("wf-disable")
    arrowLeft.value.classList.remove("wf-disable")
    if(newIndex == 0) {
      arrowLeft.value.classList.add("wf-disable")
    } 
    if(newIndex == items.value.length - 1 ) {
      arrowRight.value.classList.add("wf-disable")
    } 
  })

  const setIndex = (index: number) => {
    indexActive.value = index
  }

  return {
    indexActive,
    setIndex
  }
}

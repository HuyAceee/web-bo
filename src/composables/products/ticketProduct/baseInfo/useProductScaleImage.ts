import { classScale } from '@/common'

export const useProductScaleImage = () => {
  const imageScaleList = document.querySelectorAll(classScale)
  imageScaleList.forEach((image: any) => {
    let refOffsetTop = 0
    let refOffsetLeft = 0
    let scale: number = 1
    image.addEventListener('mousedown', (e: any) => {
      const { pageX, pageY } = e
      const offsetX = pageX - refOffsetLeft
      const offsetY = pageY - refOffsetTop
      image.style.transition = 'all 0.25s ease'
      image.style.transform = `scale(${scale})`
      scale += 0.1
      image.style.transformOrigin = `${offsetX}px ${offsetY}px`
    })

    image.addEventListener('mouseenter', (e: any) => {
      const { top, left } = e.currentTarget.getBoundingClientRect()
      refOffsetTop = top + window.scrollY
      refOffsetLeft = left
    })

    document.addEventListener(
      'click',
      (e) => {
        if (!image.contains(e.target)) {
          scale = 1.1
          refOffsetTop = 0
          refOffsetLeft = 0
          image.style.transition = 'all 0.25s cubic-bezier(0.77, 0, 0.175, 1)'
          image.style.transform = `scale(1)`
        }
      },
      true
    )
  })
  return {}
}

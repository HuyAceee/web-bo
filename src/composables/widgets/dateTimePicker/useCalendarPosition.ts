import { DATE_TIME_PICKER_PADDING, getPositionFunction } from '@/common'
import { CalendarPositionModel } from '@/models'
import { Ref, onMounted, reactive, ref } from 'vue'

export const useCalendarPosition = (picker: Ref<HTMLElement | undefined>, openCalendar: Ref<boolean>, type?: 'date' | 'date-time') => {
  const topPosition = ref<number>(0)
  const leftPosition = ref<number>(0)
  const calendarPosition = reactive<CalendarPositionModel>({
    right: true,
    bottom: true
  })
  const DATE_TIME_PICKER_SIZE = {
    height: 429,
    width: 373
  }
  const DATE_AND_TIME_PICKER_SIZE = {
    height: 429,
    width: 495
  }

  const getOffset = (el: any) => {
    const rect = el.getBoundingClientRect()
    return {
      left: rect.left + window.scrollX,
      right: rect.right - window.scrollX,
      top: rect.top + window.scrollY,
      bottom: rect.bottom - window.scrollY
    }
  }

  const handleClickDateInput = (event: MouseEvent) => {
    const target = event.target as HTMLAnchorElement
    const { top, left } = getOffset(target)
    const heightPadding = 5

    const width = window.innerWidth
    const height = window.innerHeight
    const { height: heightDate, width: widthDate } = type === 'date-time' ? DATE_AND_TIME_PICKER_SIZE : DATE_TIME_PICKER_SIZE

    let topValue
    let leftValue
    if (top > height - heightDate - DATE_TIME_PICKER_PADDING && top > heightDate ) {
      topValue = top - heightDate - heightPadding
    } else {
      topValue = top + target.offsetHeight + heightPadding
    }
    if (left > width - widthDate - DATE_TIME_PICKER_PADDING) {
      leftValue = left - widthDate + target.offsetWidth
    } else {
      leftValue = left
    }
    topPosition.value = topValue
    leftPosition.value = leftValue
  }

  const onGetPosition = () => {
    getPositionFunction(picker.value, calendarPosition)
    openCalendar.value = false
  }

  onMounted(() => {
    onGetPosition()
  })

  return {
    calendarPosition,
    topPosition,
    leftPosition,
    handleClickDateInput
  }
}

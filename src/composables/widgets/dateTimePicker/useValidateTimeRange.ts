import { DATETIME_END_BEFORE_START, DATETIME_IN_THE_PAST, DATETIME_MESSAGES, DATETIME_START_AFTER_END } from "@/common"
import { DEFAULT_DATE_FORMAT_DOT, FORMAT_DATE_HHmm } from "@/common/constant"
import { useModalNotification } from "@/composables/widgets/modal/useModalNotification"
import dayjs from "dayjs"

export const useValidateTimeRange = (config: {
  setFieldValue: (key: any, value: any) => void
}) => {
  const { setFieldValue } = config
  const dateRangeStart: string = dayjs(new Date()).format(DEFAULT_DATE_FORMAT_DOT)

  const { openModal: openNotification, closeModalByPop } = useModalNotification()

  let hasModal = false
  const controlShowModal = (field: any, message: string, condition: boolean, isShow: boolean) => {
    if (condition) {
      setTimeout(() => setFieldValue(field, ''))
      if (isShow && !hasModal) {
        hasModal = true
        openNotification({
          content: message,
          onAccept: () => {
            hasModal = false
            closeModalByPop?.()
          }
        })
          ; (document.activeElement as HTMLElement)?.blur()
      }
    }
  }

  const validateTime = (field: any, time: string, date?: string, config?: { type?: 'start' | 'end', compareDate?: string, compareTime?: string }, isDirty: boolean = true) => {
    const preparedTime = Number(time.replace(':', ''))
    setFieldValue(field, time)
    const currentTime = Number(dayjs(new Date()).format(FORMAT_DATE_HHmm))

    // type: 'start'
    if (!config?.type || config.type === 'start') {
      if (date && date === dateRangeStart && isDirty) { 
        const minTime = currentTime
        controlShowModal(field, DATETIME_MESSAGES[DATETIME_IN_THE_PAST], preparedTime < minTime, Boolean(time))
      }
      if (date === config?.compareDate && config?.compareTime) {
        const maxTime = Number(config.compareTime.replace(':', ''))
        controlShowModal(field, DATETIME_MESSAGES[DATETIME_START_AFTER_END], preparedTime > maxTime, Boolean(time))
      }
    }

    // type === 'end'
    else if (date && date === (config.compareDate || dateRangeStart)) {
      if (date === dateRangeStart && (!config.compareTime || Number((config.compareTime).replace(':', '')) < currentTime)) {
        controlShowModal(field, DATETIME_MESSAGES[DATETIME_IN_THE_PAST], preparedTime < currentTime, Boolean(time))
      }
      else if (date === config.compareDate) {
        controlShowModal(
          field,
          DATETIME_MESSAGES[DATETIME_END_BEFORE_START],
          Boolean(config.compareTime && preparedTime < Number((config.compareTime).replace(':', ''))),
          Boolean(time)
        )
      }
    }
  }

  return { validateTime }
}
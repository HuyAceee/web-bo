import {
  checkFormatValid,
  compareAlphabetically,
  compareByLength,
  DATE_PICKER_CHOOSE_YEAR_HEIGHT,
  DATE_PICKER_YEAR_LENGTH_DEFAULT,
  DATE_PICKER_YEAR_LENGTH_MORE,
  DATE_TIME_PICKER_ENABLED_ADD_YEAR_TIME,
  datePickerNotification,
  DEFAULT_DATE_FORMAT,
  formatTime,
  getDateFormat,
  getDaysContainDay,
  getDaysOfMonth,
  getListYear,
  getListYearMore,
  getListYearPrev,
  getTimeDetail,
  HEADERS_CALENDAR,
  isValidDate,
  onScrollTo,
  renderDateType,
  renderDateValue,
  SIZE_OF_TABLE_CALENDAR_DATE,
  valueCorrect
} from '@/common'
import { defaultColor } from '@/common/color'
import { DateTimePickerProps, DateViewModel, TimeValueModel } from '@/models'
import dayjs from 'dayjs'
import { computed, reactive, ref, watch } from 'vue'
import { useModalNotification } from '../modal'

export const useDateTimePicker = (props: DateTimePickerProps, emitDate: (value: string | undefined) => void) => {
  const classScrollDateTimePicker = {
    month: {
      parent: '.wf_calendar__choose-month',
      children: '.wf_calendar__choose-item.active'
    },
    hour: {
      parent: '.wf_calendar__hour',
      children: '.wf_calendar__hour-item.select',
      childrenReset: '.wf_calendar__hour-item.reset'
    },
    minute: {
      parent: '.wf_calendar__minute',
      children: '.wf_calendar__minute-item.select',
      childrenReset: '.wf_calendar__minute-item.reset'
    }
  }

  const picker = ref<HTMLElement | undefined>(undefined)
  const hover = ref(false)
  const { format: formatDate, type: typeInput } = props
  const modelValueRef = ref(props.modelValue ?? DEFAULT_DATE_FORMAT)
  const format = computed(() => getDateFormat(formatDate, typeInput || 'date'))
  const type = computed(() => (format.value ? renderDateType(format.value) : typeInput || 'date'))
  const validFormat = computed(() => checkFormatValid(format.value || DEFAULT_DATE_FORMAT))
  let isEnabledAddYear = true
  let timeoutEnableAddYear: any

  //day
  const today = new Date()
  const openCalendar = ref<boolean>(false)
  const openChooseMonth = ref<boolean>(false)
  const dateToday = formatTime(today, format.value)
  const years = ref(getListYear(DATE_PICKER_YEAR_LENGTH_DEFAULT, props.modelValue))
  const yearSelect = ref<number>(today.getFullYear())
  const dateValue = ref<string>(DEFAULT_DATE_FORMAT)
  const defaultValue = ref<string>(DEFAULT_DATE_FORMAT)
  const timeValue = reactive<TimeValueModel>({
    hour: 0,
    minute: 0
  })

  const timeSelect = reactive<TimeValueModel>({
    hour: 0,
    minute: 0
  })

  const monthView = reactive<DateViewModel>({
    year: today.getFullYear(),
    month: today.getMonth() + 1
  })

  const { openModal, closeModalByPop } = useModalNotification()

  const onScrollTime = (
    classHourChildren: string = classScrollDateTimePicker.hour.children,
    classMinuteChildren: string = classScrollDateTimePicker.minute.children
  ) => {
    onScrollTo(picker.value, classScrollDateTimePicker.hour.parent, classHourChildren)
    onScrollTo(picker.value, classScrollDateTimePicker.minute.parent, classMinuteChildren)
  }

  const onSetMonthView = (month: number, year: number) => {
    monthView.month = month
    monthView.year = year
  }

  const onChangeMonth = (month: number, year: number) => {
    if (!month) return onSetMonthView(12, year - 1)
    if (month > 12) return onSetMonthView(1, year + 1)
    onSetMonthView(month, year)
  }

  const onChooseDay = (event: Event | undefined, date: string) => {
    event?.stopPropagation()
    dateValue.value = date
    const { month, year } = getTimeDetail(dateValue.value)
    onSetMonthView(month, year)
  }

  const onChooseMonth = (event: Event, month: number, year: number) => {
    event.stopPropagation()
    onSetMonthView(month, year)
    openChooseMonth.value = false
  }

  const onEmitDate = () => {
    timeValue.hour = timeSelect.hour
    timeValue.minute = timeSelect.minute
    defaultValue.value = value.value
    emitDate(value.value)
  }

  const handleValidate = () => {
    const minDate = dayjs(props.minDate)

    const maxDate = dayjs(props.maxDate)
    const compareValue = `${renderDateValue(modelValueRef.value)} ${valueCorrect(timeSelect.hour)}:${valueCorrect(timeSelect.minute)}`
    if (!isValidDate(props.minDate) && !isValidDate(props.maxDate)) return onEmitDate()
    if (isValidDate(props.minDate) && minDate.isAfter(compareValue)) {
      if (!props?.hiddenWarning) openModal({ content: props?.minDateMessage ?? datePickerNotification.endDate?.[type.value] })
      return
    }
    if (isValidDate(props.maxDate) && maxDate.isBefore(compareValue)) {
      if (!props?.hiddenWarning) openModal({ content: props?.maxDateMessage ?? datePickerNotification.startDate?.[type.value] })
      return
    }
    const subOneYear = dayjs(compareValue).subtract(1, 'years')
    const addOneYear = dayjs(compareValue).add(1, 'years')
    if ((isValidDate(props.minDate) && subOneYear.isAfter(minDate)) || (isValidDate(props.maxDate) && addOneYear.isBefore(maxDate)))
      return openModal({ content: datePickerNotification.maxLimit?.[type.value] })
    onEmitDate()
  }

  const onSubmitDate = (event?: Event) => {
    event?.stopPropagation()
    const formatList = [DEFAULT_DATE_FORMAT, format.value]
    if (formatList.includes(dateValue.value)) {
      openModal({
        content: '날짜를 선택해 주세요',
        onAccept() {
          setTimeout(() => {
            closeModalByPop?.()
          })
        }
      })
      return
    }
    openCalendar.value = false
    handleValidate()
  }

  const onResetDate = (newStatus: boolean = false) => {
    if (!newStatus) {
      onSetMonthView(today.getMonth() + 1, today.getFullYear())
      modelValueRef.value = DEFAULT_DATE_FORMAT
    }
    dateValue.value = DEFAULT_DATE_FORMAT
    defaultValue.value = DEFAULT_DATE_FORMAT
    timeValue.hour = 0
    timeValue.minute = 0
    timeSelect.hour = 0
    timeSelect.minute = 0
    yearSelect.value = today.getFullYear()
    years.value = getListYear(DATE_PICKER_YEAR_LENGTH_DEFAULT)
    onScrollTime(classScrollDateTimePicker.hour.childrenReset, classScrollDateTimePicker.minute.childrenReset)
  }

  const getDayValue = (date: string) => {
    if (!isValidDate(date)) return ''
    return renderDateValue(formatTime(new Date(renderDateValue(date)).toISOString(), format.value))
  }

  const handleClickDay = (event: MouseEvent, date: string) => {
    onChooseDay(event, getDayValue(date))
    modelValueRef.value = getDayValue(date)
  }

  const handleDoubleClickDay = (event: MouseEvent, date: string) => {
    handleClickDay(event, date)
    onSubmitDate()
  }

  //computed
  const daysOfTable = computed((): string[] => {
    const daysOfCurrent = getDaysOfMonth(monthView.month, monthView.year, format.value)
    const daysOfMonthPre = getDaysContainDay(new Date(daysOfCurrent[0]), format.value)
    const daysOfMonthNext = getDaysContainDay(new Date(daysOfCurrent[daysOfCurrent.length - 1]), format.value)
    let daysOfTableFull = [...new Set([...daysOfMonthPre, ...daysOfCurrent, ...daysOfMonthNext])].sort(compareAlphabetically).sort(compareByLength)
    if (daysOfTableFull.length < SIZE_OF_TABLE_CALENDAR_DATE) {
      const length = (SIZE_OF_TABLE_CALENDAR_DATE - daysOfTableFull.length) / 7
      Array(length)
        .fill(0)
        .forEach((_, index) => {
          const date = new Date(daysOfCurrent[daysOfCurrent.length - 1])
          date.setDate(date.getDate() + 7 * (index + 1))
          const tempArr = getDaysContainDay(date, format.value)
          daysOfTableFull = daysOfTableFull.concat(tempArr)
        })
    }
    return daysOfTableFull
  })

  const value = computed(() => {
    let result = ''
    if (getDateFormat(format.value, props.type ?? 'date') === DEFAULT_DATE_FORMAT) {
      result = dateValue.value
    } else {
      result = `${dateValue.value.slice(0, 10)} ${valueCorrect(timeValue.hour)}:${valueCorrect(timeValue.minute)}`
    }
    return dayjs(result).format(format.value)
  })

  const classOnlyDate = computed(() => {
    return { 'only-date': props.type === 'date' }
  })

  const valueShow = computed(() => {
    return props.modelValue || format.value
  })

  //class
  const classDay = (date: string) => {
    const { month } = getTimeDetail(date)
    return { disable: Number(month) !== monthView.month, select: modelValueRef.value.includes(date), today: dateToday.includes(date) }
  }

  const classMonth = (month: number, year: number) => ({
    select: monthView.month === month && monthView.year === year,
    today: today.getMonth() + 1 === month && today.getFullYear() === year
  })

  const colorIconDatePicker = () => {
    if (props.disabled) return defaultColor._ccc
    if (props.error) return defaultColor._d95729
    if (valueShow.value !== format.value || hover.value) return defaultColor._333
    return defaultColor._8f8
  }

  //watch
  watch(
    () => props.modelValue,
    (newValue) => {
      modelValueRef.value = newValue ?? ''
      const detail = getTimeDetail(newValue ?? '')
      if (detail.month && detail.year) onSetMonthView(detail.month, detail.year)
    }
  )

  watch(openCalendar, (newStatus: boolean) => {
    if (newStatus) {
      dateValue.value = defaultValue.value.slice(0, 10)
      onScrollTime()
    }
    const { month, year } = getTimeDetail(valueShow.value)
    dateValue.value = valueShow.value
    defaultValue.value = dateValue.value
    modelValueRef.value = dateValue.value
    if (month && year) {
      onSetMonthView(month, year)
      yearSelect.value = year
    }
    if (dateValue.value === DEFAULT_DATE_FORMAT) return onResetDate(newStatus)
    timeSelect.hour = timeValue.hour
    timeSelect.minute = timeValue.minute
  })

  watch(years, () => {
    timeoutEnableAddYear = setTimeout(() => {
      isEnabledAddYear = true
    }, DATE_TIME_PICKER_ENABLED_ADD_YEAR_TIME)
  })

  const handleAddYearMore = () => {
    const calendarChooseMonthElement = document?.querySelector('#wf_calendar__choose-month')
    if (!calendarChooseMonthElement) return
    calendarChooseMonthElement.addEventListener('wheel', (event: any) => {
      if (!isEnabledAddYear) return
      const calendarChooseYearItemElements = calendarChooseMonthElement.querySelectorAll('.wf_calendar__choose-item')
      if (!calendarChooseYearItemElements.length) return
      if (
        calendarChooseMonthElement.getBoundingClientRect().top - calendarChooseYearItemElements?.[0].getBoundingClientRect().top < 100 &&
        event.deltaY < 0 &&
        years.value[0] > 50
      ) {
        const tempYears = years.value.slice(0, DATE_PICKER_YEAR_LENGTH_DEFAULT - DATE_PICKER_YEAR_LENGTH_MORE)
        years.value = [...getListYearPrev(years.value[0]), ...tempYears]
        isEnabledAddYear = false
      }
      if (
        calendarChooseMonthElement.getBoundingClientRect().top +
          DATE_PICKER_CHOOSE_YEAR_HEIGHT -
          calendarChooseYearItemElements?.[calendarChooseYearItemElements.length - 1].getBoundingClientRect().top >
          0 &&
        event.deltaY > 0
      ) {
        const tempYears = years.value.slice(DATE_PICKER_YEAR_LENGTH_MORE)
        years.value = [...tempYears, ...getListYearMore(years.value[years.value.length - 1])]
        isEnabledAddYear = false
      }
    })
  }

  watch(openChooseMonth, (newStatus: boolean) => {
    years.value = getListYear(DATE_PICKER_YEAR_LENGTH_DEFAULT, valueShow.value)
    if (newStatus) onScrollTo(picker.value, classScrollDateTimePicker.month.parent, classScrollDateTimePicker.month.children)
    yearSelect.value = monthView.year
    handleAddYearMore()
    if (!newStatus) clearTimeout(timeoutEnableAddYear)
  })

  return {
    openCalendar,
    HEADERS_CALENDAR,
    daysOfTable,
    monthView,
    onChangeMonth,
    years,
    timeSelect,
    openChooseMonth,
    onChooseMonth,
    yearSelect,
    valueCorrect,
    classDay,
    classMonth,
    onSubmitDate,
    onResetDate,
    type,
    validFormat,
    valueShow,
    format,
    classOnlyDate,
    colorIconDatePicker,
    hover,
    picker,
    getDayValue,
    handleClickDay,
    handleDoubleClickDay,
    modelValueRef,
    onChooseDay
  }
}

export default useDateTimePicker

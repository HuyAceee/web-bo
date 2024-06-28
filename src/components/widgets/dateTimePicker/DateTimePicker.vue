<script setup lang="ts">
import { DEFAULT_DATE_ERROR_MESSAGE, DEFAULT_DATE_FORMAT_ERROR_MESSAGE } from '@/common'
import { defaultColor } from '@/common/color'
import IconDatePicker from '@/components/icons/IconDatePicker.vue'
import IconDown from '@/components/icons/IconDown.vue'
import IconUp from '@/components/icons/IconUp.vue'
import { WelfareMdButton } from '@/components/uikit'
import { useCalendarPosition } from '@/composables/widgets/dateTimePicker/useCalendarPosition'
import useDateTimePicker from '@/composables/widgets/dateTimePicker/useDateTimePicker'
import { DateTimePickerEmits, DateTimePickerProps } from '@/models'
import { watch, withDefaults } from 'vue'

const props = withDefaults(defineProps<DateTimePickerProps>(), {
  disabled: false,
  type: 'date',
  size: 'normal',
  errorMessage: DEFAULT_DATE_ERROR_MESSAGE,
  error: false
})

const emit = defineEmits<DateTimePickerEmits>()

const emitDate = (value: string | undefined) => {
  emit('update:modelValue', value ?? '')
}

const {
  openCalendar,
  HEADERS_CALENDAR,
  daysOfTable,
  monthView,
  onChangeMonth,
  onChooseDay,
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
  modelValueRef
} = useDateTimePicker(props, emitDate)

const { calendarPosition, topPosition, leftPosition, handleClickDateInput } = useCalendarPosition(picker, openCalendar, props.type)

const handleOpenCalendar = (event: MouseEvent) => {
  handleClickDateInput(event)
  setTimeout(() => {
    openCalendar.value = true
  })
}

watch(
  () => openCalendar.value,
  (newValue) => {
    const bodyContainer = document.getElementById('wf-body-content')
    const bodyTable = document.querySelectorAll('.wf-custom-scrollbar, tbody')

    const removeListeners = () => {
      bodyContainer?.removeEventListener('scroll', removeListeners)
      bodyTable.forEach((table) => {
        table?.removeEventListener('scroll', removeListeners)
      })
    }
    if (newValue) {
      bodyContainer?.addEventListener('scroll', () => {
        openCalendar.value = false
      })
      bodyTable.forEach((table) => {
        table?.addEventListener('scroll', () => {
          openCalendar.value = false
        })
      })
    } else {
      // If newValue is false, manually call removeListeners to clean up
      removeListeners()
    }
  }
)
</script>
<template>
  <div class="wf-date_picker wrapper-calendar" :class="{ 'wf-date_picker-sm': size === 'small' }" @click="handleOpenCalendar">
    <input hidden class="wf-date_picker__input" :disabled="props.disabled" :model-value="valueShow" />
    <div
      class="wf-date_picker-value"
      :class="{
        disabled: props.disabled,
        active: valueShow !== format,
        error: props.error
      }"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <span
        class="calendar-day wf-date-pointer-none"
        :class="{
          active: valueShow !== format,
          disabled: props.disabled,
          error: props.error
        }"
      >
        {{ validFormat ? valueShow : DEFAULT_DATE_FORMAT_ERROR_MESSAGE }}
      </span>
      <div class="wf-date-pointer-none wf_flex wf_align-center">
        <IconDatePicker :iconColor="colorIconDatePicker()" />
      </div>
    </div>
    <small v-if="props.error && props.errorMessage" class="wf-text-box-message error-message">{{ props.errorMessage }}</small>
    <div v-if="openCalendar">
      <Teleport to="#app" v-if="openCalendar">
        <div
          id="calendar-active"
          class="wf_calendar"
          :style="{
            top: `${topPosition}px`,
            left: `${leftPosition}px`
          }"
          ref="calendar"
          v-click-outside="
            () => {
              if (openCalendar) {
                openCalendar = false
              }
            }
          "
          :class="[
            classOnlyDate,
            { left: !calendarPosition.right, top: !calendarPosition.bottom },
            { active: openCalendar && !props.disabled && validFormat }
          ]"
        >
          <div class="wf_calendar__left" ref="picker" :class="classOnlyDate">
            <div class="wf_calendar__header-wrapper">
              <div class="wf_calendar__header">
                <div class="wf_calendar__header-left" :class="classOnlyDate" v-click-outside="() => (openChooseMonth = false)">
                  <div class="wf_calendar__header-left wf_header-choose-month" :class="classOnlyDate" @click="openChooseMonth = true">
                    <span>{{ monthView.year }}년</span>
                    <span>{{ monthView.month }}월</span>
                    <IconDown />
                  </div>
                  <div class="wf_wrapper-calendar__choose-month hidden-scrollbar" :class="{ active: openChooseMonth }">
                    <div class="wf_calendar__choose-month scrollbar-custom" id="wf_calendar__choose-month">
                      <template v-for="year in years" :key="year">
                        <div
                          class="wf_calendar__choose-item"
                          :class="{
                            active: year === yearSelect,
                            'not-border': year === yearSelect - 1
                          }"
                        >
                          <div class="wf_calendar__choose-year" @click="yearSelect = year">{{ year }} 년</div>
                          <div class="wf_calendar__choose-month-wrapper wf-translate-x--2">
                            <div
                              class="wf_calendar__choose-month-item"
                              :class="classMonth(month, year)"
                              v-for="month in 12"
                              :key="month"
                              @click="($event) => onChooseMonth($event, month, year)"
                            >
                              {{ month }}월
                            </div>
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
                <div class="wf_calendar__header-right wf-translate-x-2">
                  <IconUp @click="onChangeMonth(monthView.month + 1, monthView.year)" />
                  <IconDown :iconColor="defaultColor._8f8" @click="onChangeMonth(monthView.month - 1, monthView.year)" />
                </div>
              </div>
              <div v-if="type === 'date-time'" class="wf_calendar__header-note wf-body_02-semi"><span>시</span><span>분</span></div>
            </div>
            <div class="wf_calendar__line"></div>
            <div class="wf_calendar__wrapper-content">
              <div class="wf_calendar__content wf-translate-x--1">
                <div
                  class="wf_calendar__day header"
                  :class="{
                    large: index === 1,
                    'wf-translate-x-3': index === 4,
                    'wf-translate-x-2': index === 5,
                    'wf-translate-x-1': index === 3
                  }"
                  v-for="(header, index) in HEADERS_CALENDAR"
                  :key="header"
                >
                  {{ header }}
                </div>
                <div
                  class="wf_calendar__day"
                  v-for="date in daysOfTable"
                  :class="{
                    ...classDay(getDayValue(date)),
                    select: modelValueRef.includes(getDayValue(date))
                  }"
                  :key="date"
                  @click="
                    ($event) => {
                      onChooseDay($event, getDayValue(date))
                      modelValueRef = getDayValue(date)
                    }
                  "
                >
                  {{ new Date(getDayValue(date)).getDate() }}
                </div>
              </div>
              <div class="wf_calendar__right" v-show="type === 'date-time'">
                <div class="wf_calendar__hour hidden-scrollbar" id="calendar__hour">
                  <div
                    class="wf_calendar__hour-item"
                    v-for="hour in 24"
                    :key="hour"
                    :class="{ select: timeSelect.hour === hour - 1, reset: !(hour - 1) }"
                    @click="timeSelect.hour = hour - 1"
                  >
                    {{ valueCorrect(hour - 1) }}
                  </div>
                </div>
                <div class="wf_calendar__minute hidden-scrollbar" id="calendar__minute">
                  <div
                    class="wf_calendar__minute-item"
                    v-for="minute in 60"
                    :key="minute"
                    :class="{
                      select: minute - 1 === timeSelect.minute,
                      reset: !(minute - 1)
                    }"
                    @click="timeSelect.minute = minute - 1"
                  >
                    {{ valueCorrect(minute - 1) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="wf_calendar__line"></div>
          <div class="wf_calendar__footer">
            <div class="wf_calendar__footer-left">
              <div class="wf_calendar__footer-left--today wf-body_03-reg">오늘</div>
            </div>
            <div class="wf_calendar__footer-right">
              <WelfareMdButton class="wf_w-55" button-size="small" label="초기화" button-type="liner" @onClick="() => onResetDate()" />
              <WelfareMdButton class="wf_w-44" button-size="small" label="적용" button-type="default" @onClick="onSubmitDate" />
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

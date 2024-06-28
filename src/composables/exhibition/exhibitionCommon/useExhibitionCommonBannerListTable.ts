import { useForm } from 'vee-validate'
import {
  ExhibitionCommonBannerGroupListTableEmits,
  ExhibitionCommonBannerListTableProps
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonBannerManagementModel'
import { computed, ref, watch } from 'vue'
import {
  ExhibitionCommonBannerModifyRequestListType,
  ExhibitionCommonModifyBannerListRequest
} from '@/models/services/requests/exhibition/ExhibitionBannerManagementRequest'
import { useCheckBoxTable, useModalConfirm, useModalNotification } from '@/composables'
import { exhibitionBannerManagementApi } from '@/services/api/exhibition/ExhibitionBannerManagementApi'
import { useExhibitionCommonOpenBannerRegisPopup } from '@/composables/exhibition/exhibitionCommon/useExhibitionBannerRegistrationPopup'
import { datePickerNotification, FORMAT_DATE_YYYYMMDD, formatTime } from '@/common'

export const useExhibitionCommonBannerListTable = (props: ExhibitionCommonBannerListTableProps, emits: ExhibitionCommonBannerGroupListTableEmits) => {
  const tableRef = ref()
  const { values, setFieldValue } = useForm<ExhibitionCommonModifyBannerListRequest>()
  const { openModal: openConfirmModal, closeModalByPop } = useModalConfirm()
  const { openModal: openNotificationModal } = useModalNotification()
  const listId = computed(() => {
    return props.data?.map((it) => it.id.toString()) ?? []
  })
  const { listChecked, onRowSelected, onSelectAllChange } = useCheckBoxTable(listId)
  const { openModal: openBannerRegisterPopup } = useExhibitionCommonOpenBannerRegisPopup()

  watch(
    () => props.data,
    (newData) => {
      setFieldValue(
        'modifyRequestList',
        newData?.map((it): ExhibitionCommonBannerModifyRequestListType => {
          return {
            bannerKey: it?.bannerKey,
            displayOrder: it?.displayOrder,
            displayYn: it?.displayYn,
            displayStartDate: it?.displayStartDate,
            displayStartTime: it?.displayStartTime,
            displayEndDate: it?.displayEndDate,
            displayEndTime: it?.displayEndTime
          }
        }) ?? []
      )
    }
  )

  const onSave = () => {
    if (values.modifyRequestList.length > 0) {
      openConfirmModal({
        content: '수정 내용을 저장하겠습니까?',
        onConfirm() {
          closeModalByPop?.()
          const body = {
            modifyRequestList: values.modifyRequestList.map((it) => {
              return {
                ...it,
                displayStartDate: formatTime(it?.displayStartDate ?? '', FORMAT_DATE_YYYYMMDD),
                displayEndDate: formatTime(it?.displayEndDate ?? '', FORMAT_DATE_YYYYMMDD),
                displayStartTime: it?.displayStartTime?.replace(':', ''),
                displayEndTime: it?.displayEndTime?.replace(':', '')
              }
            })
          }
          exhibitionBannerManagementApi
            .modifyBannerList(body)
            .then(() => {
              openNotificationModal({
                content: '저장되었습니다.'
              })
            })
            .catch(() => {
              // error
            })
        }
      })
    }
  }

  const onDelete = () => {
    if (listChecked.value.length > 0) {
      openConfirmModal({
        content: '삭제하시겠습니까?',
        onConfirm() {
          closeModalByPop?.()
          exhibitionBannerManagementApi
            .deleteBannerList(listChecked.value)
            .then(() => {
              openNotificationModal({
                content: '삭제되었습니다'
              })
              emits('refresh')
            })
            .catch(() => {
              // error
            })
        }
      })
    } else {
      openNotificationModal({
        content: '삭제할 행을 선택해 주세요.'
      })
    }
  }

  const onRegistration = () => {
    if (props.bannerGroupKey) {
      openBannerRegisterPopup(
        () => {
          emits('refresh')
          tableRef.value?.clearCheckAll()
        },
        { bannerGroupKey: props.bannerGroupKey?.toString(), bannerDisplayCreateRequestList: [] },
        { type: 'register' }
      )
    }
  }

  const handleDateChangeTableForm = (field: string, value: string, index: number) => {
    const startDateOld = values.modifyRequestList[index]?.displayStartDate
    const endDateOld = values.modifyRequestList[index]?.displayEndDate
    const startTimeOld = values.modifyRequestList[index]?.displayStartTime ?? '00:00'
    const endTimeOld = values.modifyRequestList[index]?.displayEndTime ?? '00:00'
    setFieldValue(`modifyRequestList.${index}.${field as keyof ExhibitionCommonBannerModifyRequestListType}`, value)
    const startDate = values.modifyRequestList[index]?.displayStartDate
    const endDate = values.modifyRequestList[index]?.displayEndDate
    const startTime = values.modifyRequestList[index]?.displayStartTime
    const endTime = values.modifyRequestList[index]?.displayEndTime
    const startDateTime = new Date(`${startDate} ${startTime}`)
    const endDateTime = new Date(`${endDate} ${endTime}`)
    if (
      (startDateOld !== startDate || startTimeOld !== startTime) &&
      ['displayStartDate', 'displayStartTime'].includes(field) &&
      startDateTime > endDateTime
    ) {
      return openNotificationModal({
        content: datePickerNotification.startDate.date,
        onAccept() {
          if (field === 'displayStartDate') {
            setFieldValue(`modifyRequestList.${index}.displayStartDate`, startDateOld)
          } else if (field === 'displayStartTime') {
            setFieldValue(`modifyRequestList.${index}.displayStartTime`, startTimeOld)
          }
          closeModalByPop?.()
        }
      })
    } else if (
      (endDateOld !== endDate || endTimeOld !== endTime) &&
      ['displayEndDate', 'displayEndTime'].includes(field) &&
      endDateTime < startDateTime
    ) {
      return openNotificationModal({
        content: datePickerNotification.endDate.date,
        onAccept() {
          if (field === 'displayEndDate') {
            setFieldValue(`modifyRequestList.${index}.displayEndDate`, endDateOld)
          } else if (field === 'displayEndTime') {
            setFieldValue(`modifyRequestList.${index}.displayEndTime`, endTimeOld)
          }
          closeModalByPop?.()
        }
      })
    }
  }

  const onUpdate = (data: any) => {
    openBannerRegisterPopup(
      () => {
        emits('refresh')
        tableRef.value?.clearCheckAll()
      },
      data,
      { type: 'modify' }
    )
  }

  return {
    values,
    setFieldValue,
    onSave,
    onDelete,
    listChecked,
    onRowSelected,
    onSelectAllChange,
    tableRef,
    openBannerRegisterPopup,
    onRegistration,
    handleDateChangeTableForm,
    onUpdate
  }
}

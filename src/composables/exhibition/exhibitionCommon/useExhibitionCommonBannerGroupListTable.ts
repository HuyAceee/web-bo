import { useForm } from 'vee-validate'
import {
  ExhibitionCommonBannerGroupListTableEmits,
  ExhibitionCommonBannerGroupListTableProps
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonBannerManagementModel'
import { computed, ref, watch } from 'vue'
import {
  ExhibitionCommonBannerGroupModifyRequestListType,
  ExhibitionCommonModifyBannerGroupListRequest
} from '@/models/services/requests/exhibition/ExhibitionBannerManagementRequest'
import { exhibitionBannerManagementApi } from '@/services/api/exhibition/ExhibitionBannerManagementApi'
import { useCheckBoxTable, useModalConfirm, useModalNotification } from '@/composables'
import { useExhibitionBannerGroupRegistrationModal } from '@/composables/exhibition/modal/useExhibitionBannerGroupRegistrationModal'

export const useExhibitionCommonBannerGroupListTable = (
  props: ExhibitionCommonBannerGroupListTableProps,
  emits: ExhibitionCommonBannerGroupListTableEmits
) => {
  const tableRef = ref()
  const { openModal: openBannerGroupRegistrationModal } = useExhibitionBannerGroupRegistrationModal()
  const { values, setFieldValue } = useForm<ExhibitionCommonModifyBannerGroupListRequest>()
  const { openModal: openConfirmModal, closeModalByPop } = useModalConfirm()
  const { openModal: openNotificationModal } = useModalNotification()
  const listId = computed(() => {
    return props.data?.map((it) => it.id.toString()) ?? []
  })
  const { listChecked, onRowSelected, onSelectAllChange } = useCheckBoxTable(listId)

  watch(
    () => props.data,
    (newData) => {
      setFieldValue(
        'modifyRequestList',
        newData?.map((it): ExhibitionCommonBannerGroupModifyRequestListType => {
          return {
            bannerGroupKey: it?.bannerGroupKey,
            bannerGroupUseYn: it?.bannerGroupUseYn
          }
        }) ?? []
      )
    },
    { immediate: true }
  )

  const onDelete = () => {
    if (listChecked.value.length > 0) {
      openConfirmModal({
        content: '삭제하시겠습니까?',
        onConfirm() {
          closeModalByPop?.()
          exhibitionBannerManagementApi
            .deleteBannerGroupList(listChecked.value)
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

  const onSave = () => {
    if (values.modifyRequestList.length > 0) {
      openConfirmModal({
        content: '수정 내용을 저장하겠습니까?',
        onConfirm() {
          closeModalByPop?.()
          const body = { modifyRequestList: values.modifyRequestList }
          exhibitionBannerManagementApi
            .modifyBannerGroupList(body)
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

  const onRegister = () => {
    openBannerGroupRegistrationModal('', () => {
      emits('refresh')
      tableRef.value?.clearCheckAll()
    })
  }

  return {
    values,
    setFieldValue,
    onSave,
    onRowSelected,
    onSelectAllChange,
    onDelete,
    tableRef,
    onRegister,
    openBannerGroupRegistrationModal
  }
}

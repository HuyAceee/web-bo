import { TEXTAREA_NUMBER_200, formatTextLength } from '@/common'
import { useDataTablePagination, useModalConfirm, useModalNotification } from '@/composables'
import { MemberBlackReasonCodeType, MemberDetailBlackMemberModel, MemberDetailBlackMemberRegistrationModalProps, defaultPageState } from '@/models'
import { MemberDetailBlackMemberRegisterDataRequest } from '@/models/services/requests/members/MemberDetailBlackMemberRequest'
import { memberDetailBlackMemberApi } from '@/services/api/members/MemberDetailBlackMemberApi'
import { PageState } from 'primevue/paginator'
import { computed, ref } from 'vue'

export const useMemberDetailBlackMemberRegistrationModalLogic = (props: MemberDetailBlackMemberRegistrationModalProps) => {
  const { openModal: openConfirm } = useModalConfirm()
  const { openModal: openNotification, closeAllModal, closeModalByPop } = useModalNotification()

  const customSelectOptions = [{ label: '10 개씩', value: 10 }]
  const reasonOptions = [
    {
      label: '구매의사 없는 반복 구매',
      value: MemberBlackReasonCodeType.REPT_PUCH
    },
    {
      label: '언어 폭력',
      value: MemberBlackReasonCodeType.VERBAL_ABU
    },
    {
      label: '기타',
      value: MemberBlackReasonCodeType.ETC
    }
  ]
  const tableRef = ref()
  const page = ref<PageState>(defaultPageState)
  const query = ref({
    message: '',
    reason: ''
  })
  const labelRightComputed = computed(() => formatTextLength(query.value.message))
  const statusSaveButton = computed(() => !query.value.message.length || !query.value.reason)
  const memberComputed = computed(() => (props?.member?.id ? `${props?.member?.name}(${props?.member?.id})` : ''))
  const readonlyMessage = ref(false)

  const getData = async (page: number, size: number) => {
    if (!props.member.memberKey) throw new Error('Member Key is undefined')
    return memberDetailBlackMemberApi.getList(props.member.memberKey, { pageNum: page + 1, rowSize: size })
  }

  const { items, totalItems, isLoading, fetchDataWith } = useDataTablePagination<MemberDetailBlackMemberModel>(getData)

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    fetchDataWith({
      numberOfItems: pageState.rows,
      page: pageState.page
    })
      .then(() => {
        tableRef.value.scrollToTop()
      })
      .catch(() => {})
  }

  const onSave = () => {
    openConfirm({
      content: `<p>${props.member.name}</p><p>블랙회원으로 등록 하시겠습니까?</p>`,
      onConfirm: () => {
        closeModalByPop?.()
        handleSave()
      }
    })
  }

  const showPopupCheckLength = (value: any) => {
    if (value.length > TEXTAREA_NUMBER_200) {
      readonlyMessage.value = true
      openNotification?.({
        content: '한글 기준 200자 이내로 입력 해주세요.',
        onAccept: () => {
          closeModalByPop?.()
          readonlyMessage.value = false
        }
      })
      return value.slice(0, TEXTAREA_NUMBER_200)
    }
    return value
  }
  const onChangeMessage = () => {
    query.value.message = showPopupCheckLength(query.value.message)
  }

  const handleSave = async () => {
    try {
      const data: MemberDetailBlackMemberRegisterDataRequest = {
        message: query.value.message,
        reason: query.value.reason as MemberBlackReasonCodeType
      }
      await memberDetailBlackMemberApi.register(props.member.memberKey, data)
      openNotification({
        content: '블랙회원으로 등록되었습니다.',
        onAccept: () => {
          closeAllModal?.()
          props.onRefresh?.()
        }
      })
    } catch (error) {
      /* empty */
    }
  }

  return {
    customSelectOptions,
    reasonOptions,
    query,
    readonlyMessage,
    memberComputed,
    labelRightComputed,
    statusSaveButton,
    tableRef,
    items,
    isLoading,
    totalItems,
    onChangeMessage,
    onPageChange,
    onSave
  }
}

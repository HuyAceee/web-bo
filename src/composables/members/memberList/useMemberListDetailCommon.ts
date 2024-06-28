import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { MemberDetailBaseModel } from '@/models'
import { memberDetailApi } from '@/services/api/members/MemberDetailApi'
import { memberDetailBlackMemberApi } from '@/services/api/members/MemberDetailBlackMemberApi'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMemberRequestModal } from '../modal/useMemberRequestModal'
import { useMemberDetailBlackMemberRegistrationModal } from './useMemberDetailBlackMemberRegistrationModal'

export const useMemberDetailCommon = (handleTabChange: (event: any) => void) => {
  const route = useRoute()
  const router = useRouter()
  const searchText = ref<string>('')

  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const { openModal: openBlackMemberRegistration } = useMemberDetailBlackMemberRegistrationModal()
  const { openModal: openMemberModal, searchResData } = useMemberRequestModal()

  const data = ref<MemberDetailBaseModel>({
    memberKey: '',
    name: '',
    id: '',
    email: '',
    membershipLevel: undefined,
    phoneNumber: '',
    gender: undefined,
    cleanup: '',
    rank: '',
    employmentStatus: undefined,
    accountStatus: undefined,
    companyCode: '',
    customer: ''
  })

  onMounted(() => {
    if (route.query?.memberKey) {
      data.value.memberKey = route.query?.memberKey as string
      getData(route.query?.memberKey as string)
    }
  })

  watch(searchResData, (v) => {
    data.value.memberKey = v.memberKey
    router.push({
      query: {
        ...route.query,
        memberKey: v.memberKey
      }
    })
  })

  watch(
    () => route.query?.memberKey,
    (memberKey) => {
      if (memberKey && typeof memberKey === 'string') {
        getData(memberKey)
        handleTabChange({ index: 0 })
      }
    }
  )

  const getData = (memberId: string) => {
    memberDetailApi.getDetail(memberId).then((result) => {
      data.value = result.data
      searchText.value = result.data.memberKey ? `${result.data.name} (${result.data.memberKey})` : ''
    })
  }

  const onCheck = async () => {
    openMemberModal()
  }

  const refreshData = () => {
    getData(data.value.memberKey)
  }

  const onRegister = () => {
    openBlackMemberRegistration(data.value, refreshData)
  }

  const onClear = () => {
    openConfirm({
      content: `<p>${data.value.name}</p><p>블랙회원에서 해제 하시겠습니까?</p>`,
      onConfirm: () => {
        closeModalByPop?.()
        handleClear()
      }
    })
  }

  const handleClear = async () => {
    try {
      await memberDetailBlackMemberApi.release(data.value.memberKey)
      refreshData()
      openNotification({ content: '블랙회원에서 해제 되었습니다.' })
    } catch (error) {
      /* empty */
    }
  }

  const blackMemberStatus = computed(() => data.value.membershipLevel?.code === 'BLACK')

  return { data, blackMemberStatus, onCheck, onRegister, onClear, searchText }
}

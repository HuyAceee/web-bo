import { TreeExpandedKeys, TreeNode } from 'primevue/tree'
import { formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS } from '@/common'
import {
  MemberDetailBaseTabProps,
  MemberDetailWelfareMallInMallInformationModel,
  MemberDetailsMarketingPolicyAgreement,
  MemberDetailsMarketingPolicyAgreementDate,
  memberHeadersAcceptInformationTableWelfareConfig,
  memberHeadersAcceptInformationTableWelfareMallConfig
} from '@/models'
import { YnOptions } from '@/models/common'
import { MemberDetailUpdateWelfareMallRequest } from '@/models/services/requests/members/MemberDetailRequest'
import { memberDetailBaseInformationApi } from '@/services/api/members/MemberDetailBaseInformationBaseApi'
import { computed, onMounted, ref, watch } from 'vue'

const KEYS_AGREE: string[] = ['marketing', 'email', 'sms', 'kakao']
const AGREE_YN = 'AgreeYn'
const AGREE_DATE = 'AgreeDate'
export const useMemberListBaseInformationTabAccept = (props: MemberDetailBaseTabProps) => {
  const rootNodeKey = '0'
  const rootNodeKeyNumber = 0
  const memberKey = ref<any>(props?.data?.memberKey)
  const expandedKeys = ref<TreeExpandedKeys>({})
  const acceptInformationMall = ref<TreeNode[]>([])
  const acceptInformationMallInMall = ref<MemberDetailWelfareMallInMallInformationModel[]>([])

  const toggleExpandedMarketingMall = () => {
    const _expandedKeys = { ...expandedKeys.value }
    if (_expandedKeys[rootNodeKey]) delete _expandedKeys[rootNodeKey]
    else _expandedKeys[rootNodeKey] = true
    expandedKeys.value = _expandedKeys
  }

  const getAcceptInformationMall = (memberKey: string) => {
    memberDetailBaseInformationApi.getMemberAcceptInformationDetailWelfareMall({ memberKey: memberKey }).then((res) => {
      const selectAgreeItems: string[] = ['(선택) 마케팅정보 수집 및 이용동의', '이메일 수신', '문자 SMS 수신', '카카오 알림톡 수신']
      const nodes: TreeNode[] = []

      const keyAgree = `marketing${AGREE_YN}` as keyof MemberDetailsMarketingPolicyAgreement
      const isAgree = res[`${keyAgree}`]?.code === YnOptions.Y

      const keyDate = `marketing${AGREE_DATE}` as keyof MemberDetailsMarketingPolicyAgreementDate
      const agreeDate = res[keyDate]

      const node: TreeNode = {
        key: rootNodeKey,
        data: {
          selectAgreeItem: selectAgreeItems[0],
          isAgree: isAgree,
          dateApplication: formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS(agreeDate ?? ''),
          isAgreeCheck: isAgree
        },
        children: []
      }
      nodes.push(node)

      const child: TreeNode[] = []

      KEYS_AGREE.forEach((key, idx) => {
        const keyAgree = `${key}${AGREE_YN}` as keyof MemberDetailsMarketingPolicyAgreement
        const isAgree = res[`${keyAgree}`]?.code === YnOptions.Y
        const keyDate = `${key}${AGREE_DATE}` as keyof MemberDetailsMarketingPolicyAgreementDate
        const agreeDate = res[keyDate]

        if (key !== KEYS_AGREE[rootNodeKeyNumber]) {
          const node: TreeNode = {
            key: idx.toString(),
            data: {
              selectAgreeItem: selectAgreeItems[idx],
              isAgree: isAgree,
              dateApplication: formatDateWithFORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS(agreeDate ?? ''),
              isAgreeCheck: isAgree
            },
            children: []
          }
          child.push(node)
        }
      })

      nodes[rootNodeKeyNumber].children = child

      acceptInformationMall.value = nodes
    })
  }
  const getAcceptInformationMallInMall = () => {
    memberDetailBaseInformationApi.getMemberAcceptInformationDetailWelfareMallInMall({ memberKey: 'any-key' }).then((result) => {
      acceptInformationMallInMall.value = result.data.map((item) => {
        return {
          ...item,
          isAgreeCheck: item.isAgree
        }
      })
    })
  }

  const acceptListData = computed(() => {
    return [
      {
        label: '복지몰',
        data: acceptInformationMall.value,
        thead: memberHeadersAcceptInformationTableWelfareConfig,
        classGroup: 'wf-mall'
      },
      {
        label: '몰인몰',
        // api mall in mall marketinng not ready yet
        // data: acceptInformationMallInMall.value,
        data: [],
        thead: memberHeadersAcceptInformationTableWelfareMallConfig,
        classGroup: 'wf-mall-in-mall'
      }
    ]
  })

  const handleUpdateWelfareMall = () => {
    const marketingMallChild = acceptInformationMall.value[rootNodeKeyNumber]?.children
    const convertedObject: MemberDetailUpdateWelfareMallRequest = {
      marketingAgreeYn: acceptInformationMall.value[0].data.isAgreeCheck ? YnOptions.Y : YnOptions.N,
      emailAgreeYn: marketingMallChild?.[0].data.isAgreeCheck ? YnOptions.Y : YnOptions.N,
      smsAgreeYn: marketingMallChild?.[1].data.isAgreeCheck ? YnOptions.Y : YnOptions.N,
      kakaoAgreeYn: marketingMallChild?.[2].data.isAgreeCheck ? YnOptions.Y : YnOptions.N
    }

    memberDetailBaseInformationApi.updateWelfareMall({ memberKey: memberKey.value }, convertedObject).then(() => {
      getAcceptInformationMall(memberKey.value)
    })
  }

  const handleSaveInformation = (index: number) => {
    if (index === 0) {
      handleUpdateWelfareMall()
    }
  }

  // Refactor: move to common and use tree traversal algorithms to reuse
  const handleAgreeInformation = (id: string) => {
    const copyNodes: TreeNode[] = acceptInformationMall.value
    //id === 0 <-> rootNode of the tree
    const intId = Number(id)
    if (intId === rootNodeKeyNumber) {
      copyNodes[intId].data.isAgreeCheck = !copyNodes[intId].data.isAgreeCheck
    } else {
      const childIndex = intId - 1
      copyNodes[rootNodeKeyNumber].children![childIndex].data.isAgreeCheck = !copyNodes[rootNodeKeyNumber].children![childIndex].data.isAgreeCheck
    }
    acceptInformationMall.value = copyNodes
  }

  const handleResetInformation = (index: number) => {
    const copyNodes: TreeNode[] = acceptInformationMall.value
    if (index === 0) {
      copyNodes[rootNodeKeyNumber].data.isAgreeCheck = copyNodes[rootNodeKeyNumber].data.isAgree
      
      copyNodes[rootNodeKeyNumber]!.children!.forEach((_, idx) => {
        copyNodes[rootNodeKeyNumber].children![idx].data.isAgreeCheck = copyNodes[rootNodeKeyNumber].children![idx].data.isAgree
      });
      
      acceptInformationMall.value = copyNodes

      return
    }
    acceptInformationMallInMall.value = acceptInformationMallInMall.value.map((item) => ({
      ...item,
      isAgreeCheck: item.isAgree
    }))
  }

  onMounted(() => {
    getAcceptInformationMall(memberKey.value)
    getAcceptInformationMallInMall()
    toggleExpandedMarketingMall()
  })

  watch(
    () => props.data,
    () => {
      memberKey.value = props.data.memberKey
      getAcceptInformationMall(props.data.memberKey)
    }
  )

  return {
    acceptInformationMall,
    acceptInformationMallInMall,
    handleAgreeInformation,
    handleResetInformation,
    acceptListData,
    handleSaveInformation,
    expandedKeys,
    toggleExpandedMarketingMall
  }
}

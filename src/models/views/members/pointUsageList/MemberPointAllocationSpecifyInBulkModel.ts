import { DataTableContainerConfigModel } from '@/models/uikit'

export interface DataTablePointUsageContainerConfigModel extends DataTableContainerConfigModel {
  required?: boolean
}

export const memberPointAllocationSpecifyInBulkHeaderTableConfig: DataTablePointUsageContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'no',
    class: 'wf_m-w-50'
  },
  {
    header: '회원코드',
    field: 'memberKey',
    class: 'wf_m-w-140 wf-underline wf-underline-offset-2 wf_justify-start ',
    required: true
  },
  {
    header: '회원명',
    field: 'memberName',
    class: 'wf_m-w-140 ',
    required: true
  },
  {
    header: '아이디(이메일)',
    field: 'memberId',
    class: 'wf_m-w-200 ',
    required: true
  },
  {
    header: '휴대폰번호',
    field: 'cellphoneNumber',
    class: 'wf_m-w-200 ',
    required: true
  },
  {
    header: '배정 복지포인트',
    field: 'point',
    class: 'wf_m-w-200 wf_justify-end ',
    required: true
  },
  {
    header: '비고(특이사항 메모)',
    field: 'managerMemo',
    class: 'wf_m-w-200 wf_justify-end '
  },
  {
    header: '고객사코드',
    field: 'customerKey',
    class: 'wf_m-w-140 ',
    required: true
  },
  {
    header: '고객사',
    field: 'customerName',
    class: 'wf_m-w-200 wf_justify-start ',
    required: true
  }
]

export const memberPointAllocationSpecifyInBulkSearchMemberHeaderTableConfig: DataTablePointUsageContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'no',
    class: 'wf_m-w-50'
  },
  {
    header: '회원코드',
    field: 'memberKey',
    class: 'wf_m-w-140 wf-underline wf-underline-offset-2 wf_justify-start ',
    required: true
  },
  {
    header: '회원명',
    field: 'memberName',
    class: 'wf_m-w-140 ',
    required: true
  },
  {
    header: '아이디(이메일)',
    field: 'memberId',
    class: 'wf_m-w-200 ',
    required: true
  },
  {
    header: '휴대폰번호',
    field: 'cellphoneNumber',
    class: 'wf_m-w-200 ',
    required: true
  },
  {
    header: '고객사코드',
    field: 'customerKey',
    class: 'wf_m-w-140 ',
    required: true
  },
  {
    header: '고객사',
    field: 'customerName',
    class: 'wf_m-w-200 wf_justify-start ',
    required: true
  },
  {
    header: '최근접속일',
    field: 'latestLoginDate',
    class: 'wf_m-w-200 '
  },
  {
    header: '삭제',
    field: 'removeRow',
    class: 'wf_m-w-200 ',

  },
]

export const memberPointAllocationSpecifyInBulkSearchSpecificMemberHeaderTableConfig: DataTablePointUsageContainerConfigModel[] = [
  {
    header: '회원코드',
    field: 'memberKey',
    class: 'wf_m-w-140 wf-underline wf-underline-offset-2 wf_justify-start ',
    required: true
  },
  {
    header: '회원명',
    field: 'memberName',
    class: 'wf_m-w-140 ',
    required: true
  },
  {
    header: '아이디(이메일)',
    field: 'memberId',
    class: 'wf_m-w-200 ',
    required: true
  },
  {
    header: '휴대폰번호',
    field: 'cellphoneNumber',
    class: 'wf_m-w-200 ',
    required: true
  },
  {
    header: '차감 포인트',
    field: 'pointBalance',
    class: 'wf_m-w-200 wf_justify-end ',
    required: true
  },
  {
    header: '고객사코드',
    field: 'customerKey',
    class: 'wf_m-w-140 ',
    required: true
  },
  {
    header: '고객사',
    field: 'customerName',
    class: 'wf_m-w-200 wf_justify-start ',
    required: true
  }
]

export const memberTransferHistoryHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'no',
    class: 'wf_m-w-200 '
  },
  {
    header: '등록상태',
    field: 'status',
    class: 'wf_m-w-200 '
  },
  {
    header: '권한 구분',
    field: 'decentralization',
    class: 'wf_m-w-200 '
  },
  {
    header: '처리자',
    field: 'registerName',
    class: 'wf_m-w-200 '
  },
  {
    header: '업데이트 일자',
    field: 'updateAt',
    class: 'wf_m-w-200 '
  },
  {
    header: '조정 사유',
    field: 'processReason',
    class: 'wf_m-w-200 '
  },
  {
    header: '상세보기',
    field: 'seeDetail',
    class: 'wf_m-w-200 '
  }
]

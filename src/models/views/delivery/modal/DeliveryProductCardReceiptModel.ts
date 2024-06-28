import { DeliveryProductReceiptTableConfigModel } from '../common'

export const DeliveryProductCardReceiptConfigs: DeliveryProductReceiptTableConfigModel[] = [
  {
    tableRows: [
      {
        rowItems: [
          {
            title: '주문번호',
            value: '2023110790712522'
          },
          {
            title: '거래일시',
            value: '2023.11.07 12:32:57'
          }
        ]
      },
      {
        rowItems: [
          {
            title: '결제방법',
            value: '카드결제'
          },
          {
            title: '거래종류',
            value: '신용 승인'
          }
        ]
      },
      {
        rowItems: [
          {
            title: '카드종류',
            value: '삼성카드'
          },
          {
            title: '승인번호',
            value: '08958288'
          }
        ]
      },
      {
        rowItems: [
          {
            title: '할부유형',
            value: '일시불'
          },
          {
            title: '유효기간',
            value: '**/**'
          }
        ]
      },
      {
        rowItems: [
          {
            title: '카드번호',
            value: '9410-09**-****-3620'
          }
        ]
      },
      {
        rowItems: [
          {
            title: '품명',
            value: '스타벅스 아메리카노 T 외 1건'
          }
        ]
      }
    ]
  },
  {
    title: '판매자 정보',
    tableRows: [
      {
        rowItems: [
          {
            title: '상호',
            value: '(주)쿠프마케팅'
          },
          {
            title: '사업자등록번호',
            value: '105-86-86082'
          }
        ]
      },
      {
        rowItems: [
          {
            title: '대표자',
            value: '전우정'
          },
          {
            title: '전화번호',
            value: '02-514-0237'
          }
        ]
      },
      {
        rowItems: [
          {
            title: '주소',
            value: '서울특별시 성동구 성수이로 10-14'
          }
        ]
      }
    ]
  },
  {
    title: '가맹점 정보',
    tableRows: [
      {
        rowItems: [
          {
            title: '상호',
            value: '메가존디지털 주식회사'
          },
          {
            title: '사업자등록번호',
            value: '214-86-79342'
          }
        ]
      },
      {
        rowItems: [
          {
            title: '대표자',
            value: '장지황'
          },
          {
            title: '전화번호',
            value: '1566-9987'
          }
        ]
      }
    ]
  },
  {
    title: '결제금액',
    tableRows: [
      {
        rowItems: [
          {
            title: '금액',
            value: '4,500 원',
            classNameValue: 'wf_justify-end'
          }
        ]
      },

      {
        rowItems: [
          {
            title: '부가세',
            value: '0 원',
            classNameValue: 'wf_justify-end'
          }
        ]
      },
      {
        rowItems: [
          {
            title: '합계',
            value: '4,050 원',
            classNameValue: 'wf_justify-end'
          }
        ]
      }
    ]
  }
]

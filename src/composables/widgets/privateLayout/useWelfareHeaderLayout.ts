import { ref } from 'vue'

export const useWelfareHeaderLayout = () => {
  const defaultSelectFirst = ref()
  const options = [
    { label: '배송상품코드', value: '1' },
    { label: '티켓상품코드', value: '2' },
    { label: '배송주문번호', value: '3' },
    { label: '티켓주문번호', value: '4' }
  ]
  return {
    defaultSelectFirst,
    options
  }
}

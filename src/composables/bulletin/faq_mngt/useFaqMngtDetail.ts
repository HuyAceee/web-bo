import { ref } from 'vue'
import { TEXTAREA_NUMBER_1000, TEXTAREA_NUMBER_200, createEnumFromKeys } from '@/common'
import { useBaseBulletin } from '@/composables'

export const useFaqMngtDetail = () => {
  const exhibitionStatuses = [
    { name: '전시여부', value: '전시', label: '전시' },
    { name: '전시여부', value: '비전시', label: '비전시' }
  ]

  const popularQuestions = [
    { name: '전시여부', value: '해당', label: '해당' },
    { name: '전시여부', value: '비해당', label: '비해당' }
  ]

  const inquiryTypes = [
    { value: '전체', label: '전체' },
    { value: '회원문의', label: '회원문의' },
    { value: '주문/결제', label: '주문/결제' },
    { value: '배송문의', label: '배송문의' },
    { value: '반품/교환/환불', label: '반품/교환/환불' },
    { value: '복지포인트/쿠폰/적립', label: '복지포인트/쿠폰/적립' },
    { value: '상품문의', label: '상품문의' },
    { value: '이벤트문의', label: '이벤트문의' },
    { value: '거래증빙서류', label: '거래증빙서류' },
    { value: '사이트이용', label: '사이트이용' }
  ]

  const initialValues = {
    exhibition: exhibitionStatuses[0].value,
    popularQuestion: popularQuestions[0].value,
    question: '',
    zipCode: '',
    answer: '',
    inquiryType: { value: '전체', label: '전체' }
  }
  const { values, handleSubmit, closeModalByPop, openModal, openModalConfirm, setFieldValue } = useBaseBulletin({ initialValues })
  type TNFaqMngtDetailForm = typeof initialValues
  const formValues = values as TNFaqMngtDetailForm
  const formKeys = createEnumFromKeys(initialValues)
  const isReadonly = ref({
    question: false,
    answer: false
  })
  type FormKeysQa = keyof typeof isReadonly.value

  const handleChangeValueSelect = (field: keyof TNFaqMngtDetailForm, value: any) => {
    if (field === formKeys.question || field === formKeys.answer) {
      const byteCount = new TextEncoder().encode(value).length
      if (byteCount <= maxField(field)) {
        changeReadonly(field, false)
      } else {
        changeReadonly(field, true)
        return
      }
    }
    setFieldValue(field, value)
  }

  function changeReadonly(field: FormKeysQa, value: boolean) {
    isReadonly.value[field] = value
  }

  function maxField(type: string) {
    return type === formKeys.question ? TEXTAREA_NUMBER_200 : TEXTAREA_NUMBER_1000
  }

  function areAllFieldsFilled() {
    for (const key in values) {
      if (key !== formKeys.zipCode && key !== formKeys.inquiryType && values[key].trim() === '') {
        return false
      }
    }
    return true
  }

  const onSubmit = handleSubmit((values: TNFaqMngtDetailForm) => {
    //call api update-create
    console.log('values', values)
    if (areAllFieldsFilled()) {
      // if () {
      //   openModal?.({
      //     buttonLabel: '확인',
      //     content: '인기질문은 최대 10개까지만 설정 가능합니다. 다른 인기질문의 개수를 조정해 주세요.'
      //   })
      //   return
      // }
      openModalConfirm({
        content: 'FAQ 게시글을 등록하시겠습니까?',
        buttonCancelLabel: '취소',
        buttonConfirmLabel: '확인',
        onConfirm: () => {
          openModalSuccess()
        }
      })
    } else {
      openModal?.({
        buttonLabel: '확인',
        content: '필수 항목을 기입해 주세요.'
      })
    }
  })

  const openModalSuccess = () => {
    closeModalByPop?.()
    openModal?.({
      buttonLabel: '확인',
      content: '변경사항이 저장되었습니다.'
    })
  }

  return {
    inquiryTypes,
    exhibitionStatuses,
    popularQuestions,
    formValues,
    isReadonly,
    onSubmit,
    handleChangeValueSelect,
    changeReadonly
  }
}

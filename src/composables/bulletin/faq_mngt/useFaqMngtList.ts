import { ref, watch } from 'vue'
import { useBaseBulletin } from '@/composables'
import MockDataTableModel from '@/views/bulletin-board/faq-mngt/table.json'
import { useForm } from 'vee-validate'
import { DAYS_PER_THREE_MONTH, createEnumFromKeys } from '@/common'

export const useFaqMngtList = () => {
  const popularQuestions = [
    { name: '인기질문', value: '전체', label: '전체' },
    { name: '인기질문', value: '해당', label: '해당' },
    { name: '인기질문', value: '비해당', label: '비해당' }
  ]

  const exhibitionStatus = [
    { name: '전시여부', value: '전체', label: '전체' },
    { name: '전시여부', value: '전시', label: '전시' },
    { name: '전시여부', value: '비전시', label: '비전시' }
  ]

  const optionsText = [
    { label: '사용안함', value: '사용안함' },
    { label: '제목', value: '제목' },
    { label: '등록자ID', value: '등록자ID' }
  ]

  const optionsPeriodType = [
    { label: '등록일', value: '등록일' },
    { label: '수정일', value: '수정일' }
  ]

  const optionsQuestionType = [
    { label: '전체', value: '전체' },
    { label: '회원문의', value: '회원문의' },
    { label: '주문/결제', value: '주문/결제' },
    { label: '배송문의', value: '배송문의' },
    { label: '반품/교환/환불', value: '반품/교환/환불' },
    { label: '복지포인트/쿠폰/적립', value: '복지포인트/쿠폰/적립' },
    { label: '상품문의', value: '상품문의' },
    { label: '이벤트문의', value: '이벤트문의' },
    { label: '거래증빙서류', value: '거래증빙서류' },
    { label: '사이트이용', value: '사이트이용' }
  ]

  const initialValues = {
    searchWord: '',
    selectWord: { label: '사용안함', value: '사용안함' },
    exhibition: exhibitionStatus[0].value,
    popularQuestion: popularQuestions[0].value,
    fromDate: '',
    toDate: '',
    periodType: { label: '등록일', value: '등록일' },
    questionType: { label: '전체', value: '전체' }
  }

  const {
    values,
    handleSubmit,
    isLoading,
    items,
    currentActiveDate,
    totalItems,
    listChecked,
    refTable,
    maxWordSearch,
    isReadOnlySearchWord,
    handleReadOnlySearchWord,
    checkListChecked,
    closeModalByPop,
    onPageChange,
    onRowClick,
    onRowSelected,
    onSelectAllChange,
    openModal,
    openModalConfirm,
    onChangeFilterDate,
    resetForm,
    setFieldValue
  } = useBaseBulletin({ MockDataTableModel, initialValues, hasDate: true })

  const { handleSubmit: handleSubmitTable } = useForm()
  type TNFaqMngtListForm = typeof initialValues
  const formValues = values as TNFaqMngtListForm
  const formKeys = createEnumFromKeys(initialValues)
  const disableField = ref(false)
  const handleChangeValueSelect = (field: keyof TNFaqMngtListForm, value: any) => {
    if (field === formKeys.searchWord) {
      const byteCount = new TextEncoder().encode(value).length
      if (byteCount <= maxWordSearch) {
        handleReadOnlySearchWord(false)
      } else {
        handleReadOnlySearchWord(true)
        return
      }
    }
    setFieldValue(field, value)
  }

  const onSubmit = handleSubmit((values: TNFaqMngtListForm) => {
    console.log('values', values)
  })

  const onSubmitTable = handleSubmitTable((values) => {
    //call api search list
    console.log('values', values)
    openModalConfirm({
      content: '입력하신 내용으로 전시순서를 변경하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: () => {
        closeModalByPop?.()
        openModal?.({
          buttonLabel: '확인',
          content: '전시순서가 저장되었습니다.'
        })
      }
    })
  })

  const onResetForm = () => {
    resetForm()
    onChangeFilterDate(DAYS_PER_THREE_MONTH)
  }

  watch(
    () => formValues.selectWord,
    (newCurrentDate) => {
      if (newCurrentDate.value !== optionsText[0].value) disableField.value = true
      else disableField.value = false
    },
    { immediate: true }
  )

  const handleDelete = () => {
    //call api delete
    checkListChecked(() => {
      const iHas = listChecked.value.some((i) => items.value?.find((item) => item.id === i))
      handleMessage(iHas, 'delete')
    }, '처리할 게시글을 선택해 주세요.')
  }

  const handleHide = () => {
    //call api hide
    checkListChecked(() => {
      const iHas = listChecked.value.some((i) => items.value?.find((item) => item.id === i)?.popularQuestion === '비해당')
      handleMessage(iHas, 'hide')
    }, '처리할 게시글을 선택해 주세요.')
  }

  const handleMessage = (iHas: boolean, type: 'delete' | 'hide') => {
    if (iHas && type === 'delete') {
      openModalConfirm({
        content: '선택한 공지글을 삭제하시겠습니까?',
        buttonCancelLabel: '취소',
        buttonConfirmLabel: '확인',
        onConfirm: () => {
          closeModalByPop?.()
          openModal?.({
            buttonLabel: '확인',
            content: '삭제가 완료되었습니다.'
          })
        }
      })
    } else if (type === 'hide') {
      if (!iHas) {
        openModal?.({
          buttonLabel: '확인',
          content: '비전시 처리가 완료되었습니다.'
        })
      } else {
        openModal?.({
          buttonLabel: '확인',
          content: '인기질문은 비전시 처리할 수 없습니다.'
        })
      }
    }
  }

  return {
    refTable,
    exhibitionStatus,
    popularQuestions,
    optionsText,
    optionsPeriodType,
    optionsQuestionType,
    formValues,
    currentActiveDate,
    isLoading,
    items,
    totalItems,
    disableField,
    isReadOnlySearchWord,
    handleReadOnlySearchWord,
    onSubmit,
    onResetForm,
    onChangeFilterDate,
    handleChangeValueSelect,
    onPageChange,
    onRowClick,
    onSelectAllChange,
    onRowSelected,
    handleDelete,
    handleHide,
    onSubmitTable
  }
}

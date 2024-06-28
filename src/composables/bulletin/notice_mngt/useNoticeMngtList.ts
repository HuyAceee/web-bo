import { useBaseBulletin } from '@/composables'
import MockDataTableModel from '@/views/bulletin-board/notice-mngt/table.json'
import { ref, watch } from 'vue'
import { ProductSearchRecordModel } from '@/models'
import { DAYS_PER_THREE_MONTH, createEnumFromKeys } from '@/common'

export const useNoticeMngtList = () => {
  const noticeCategory = [
    { name: '공지 구분', value: '전체', label: '전체' },
    { name: '공지 구분', value: '중요', label: '중요' },
    { name: '공지 구분', value: '일반', label: '일반' }
  ]

  const exhibitionStatus = [
    { name: '전시여부', value: '전체', label: '전체' },
    { name: '전시여부', value: '전시', label: '전시' },
    { name: '전시여부', value: '비전시', label: '비전시' }
  ]

  const customerDesignation = [
    { name: '고객사 지정', value: '전체', label: '전체' },
    { name: '고객사 지정', value: '공통', label: '공통' },
    { name: '고객사 지정', value: '지정', label: '지정' }
  ]

  const optionsText = [
    { label: '사용안함', value: '사용안함' },
    { label: '제목', value: '제목' },
    { label: '등록자ID', value: '등록자ID' }
  ]

  const initialValues = {
    searchWord: '',
    selectWord: optionsText[0],
    designation: customerDesignation[0].value,
    exhibition: exhibitionStatus[0].value,
    classification: noticeCategory[0].value,
    fromDate: '',
    toDate: '',
    keywordCustomer: ''
  }

  const {
    refTable,
    values,
    handleSubmit,
    isLoading,
    items,
    currentActiveDate,
    totalItems,
    listChecked,
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
    handleChangeCountDate,
    onChangeFilterDate,
    resetForm,
    setFieldValue
  } = useBaseBulletin({ MockDataTableModel, initialValues, hasDate: true })

  type TNNoticeMngtListForm = typeof initialValues

  const formValues = values as TNNoticeMngtListForm
  const formKeys = createEnumFromKeys(initialValues)
  const disableField = ref(false)

  const handleChangeValueSelect = (field: keyof TNNoticeMngtListForm, value: any) => {
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

  const handleDelete = () => {
    //call api delete
    checkListChecked(() => {
      const iHas = listChecked.value.some((i) => items.value?.find((item) => item.id === i))
      handleMessage(iHas, 'delete')
    })
  }

  const handleHide = () => {
    //call api hide
    checkListChecked(() => {
      const iHas = listChecked.value.some((i) => items.value?.find((item) => item.id === i))
      handleMessage(iHas, 'hide')
    })
  }

  const handleMessage = (iHas: boolean, type: 'hide' | 'delete') => {
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
    } else if (iHas && type === 'hide') {
      openModal?.({
        buttonLabel: '확인',
        content: '비전시 처리가 완료되었습니다.'
      })
    }
  }

  const onSubmit = handleSubmit((values: TNNoticeMngtListForm) => {
    console.log('values', values)
    //call api search list
  })

  const onResetForm = () => {
    resetForm()
    onChangeFilterDate(DAYS_PER_THREE_MONTH)
    searchCustomerRef.value.handleReset()
  }

  watch(
    () => formValues.selectWord,
    (newCurrentDate) => {
      if (newCurrentDate.value !== optionsText[0].value) disableField.value = true
      else disableField.value = false
    },
    { immediate: true }
  )

  /* Customer information */
  const searchCustomerRef = ref()
  const changeKeywordCustomer = (value: ProductSearchRecordModel) => {
    handleChangeValueSelect('keywordCustomer', `(${value.code}) ${value.name}`)
  }

  return {
    exhibitionStatus,
    noticeCategory,
    customerDesignation,
    optionsText,
    formValues,
    currentActiveDate,
    isLoading,
    items,
    totalItems,
    disableField,
    refTable,
    isReadOnlySearchWord,
    searchCustomerRef,
    changeKeywordCustomer,
    handleDelete,
    onSubmit,
    onResetForm,
    onChangeFilterDate,
    handleChangeValueSelect,
    onPageChange,
    onRowClick,
    onSelectAllChange,
    onRowSelected,
    handleHide,
    handleReadOnlySearchWord
  }
}

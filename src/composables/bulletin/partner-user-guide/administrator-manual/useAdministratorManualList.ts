import MockDataTableModel from '@/views/bulletin-board/partner-user-guide/administrator-manual/table.json'
import { useBaseBulletin } from '@/composables'
import { ref, watch } from 'vue'
import { DAYS_PER_THREE_MONTH, createEnumFromKeys } from '@/common'

export const useAdministratorManualList = () => {
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

  const exposureWed = [
    { name: '노출 사이트', value: '전체', label: '전체' },
    { name: '노출 사이트', value: 'PO', label: 'PO' },
    { name: '노출 사이트', value: 'CO', label: 'CO' }
  ]

  const mainExposures = [
    { name: '메인 노출 여부', value: '전체', label: '전체' },
    { name: '메인 노출 여부', value: '노출', label: '노출' },
    { name: '메인 노출 여부', value: '비노출', label: '비노출' }
  ]

  const optionsText = [
    { label: '사용안함', value: '사용안함' },
    { label: '제목', value: '제목' },
    { label: '등록자ID', value: '등록자ID' },
    { label: '수정자ID', value: '수정자ID' }
  ]

  const initialValues = {
    searchWord: '',
    selectWord: { label: '사용안함', value: '사용안함' },
    exposureWed: exposureWed[1].value,
    exhibition: exhibitionStatus[0].value,
    classification: noticeCategory[0].value,
    fromDate: '',
    toDate: '',
    mainExposure: mainExposures[1].value
  }

  const {
    values,
    handleSubmit,
    currentActiveDate,
    isLoading,
    items,
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
    handleChangeCountDate,
    onChangeFilterDate,
    resetForm,
    setFieldValue
  } = useBaseBulletin({ MockDataTableModel, initialValues, hasDate: true })

  type AdministratorListForm = typeof initialValues
  const formValues = values as AdministratorListForm
  const formKeys = createEnumFromKeys(initialValues)
  const disableField = ref(false)

  const handleChangeValueSelect = (field: keyof AdministratorListForm, value: any) => {
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
    checkListChecked(() => {
      const iHas = listChecked.value.some((i) => items.value?.find((item) => item.id === i))
      handleMessage(iHas, 'delete')
    })
  }

  const handleHide = () => {
    checkListChecked(() => {
      const iHas = listChecked.value.some((i) => items.value?.find((item) => item.id === i))
      handleMessage(iHas, 'hide')
    }, '처리할 게시글을 선택해 주세요.')
  }

  const handleMessage = (iHas: boolean, type: 'hide' | 'delete') => {
    if (iHas && type === 'delete') {
      openModalConfirm({
        content: '선택한 게시글을 삭제하시겠습니까?',
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

  const onSubmit = handleSubmit((values: AdministratorListForm) => {
    //cal api search list
    console.log('values', values)
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

  return {
    exhibitionStatus,
    noticeCategory,
    exposureWed,
    optionsText,
    formValues,
    currentActiveDate,
    isLoading,
    items,
    totalItems,
    disableField,
    mainExposures,
    refTable,
    isReadOnlySearchWord,
    handleReadOnlySearchWord,
    handleDelete,
    onSubmit,
    onResetForm,
    onChangeFilterDate,
    handleChangeValueSelect,
    onPageChange,
    onRowClick,
    onSelectAllChange,
    onRowSelected,
    handleHide
  }
}

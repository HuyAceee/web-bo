import MockDataTableModel from '@/views/bulletin-board/partner-user-guide/partner-notice/table.json'
import { useBaseBulletin, useCheckbox } from '@/composables'
import { computed, ref, watch } from 'vue'
import { DAYS_PER_THREE_MONTH, ID_CHECKBOX_ALL, createEnumFromKeys } from '@/common'

export const useAdminPopupList = () => {
  const exposureSites = [
    { id: 'all', value: '전체', label: '전체' },
    { id: 'BO', value: 'BO', label: 'BO' },
    { id: 'PO', value: 'PO', label: 'PO' },
    { id: 'CO', value: 'CO', label: 'CO' }
  ]

  const optionsPeriodType = [
    { label: '등록일', value: '등록일' },
    { label: '전시시작일', value: '전시시작일' }
  ]

  const exhibitionStatus = [
    { name: '전시여부', value: '전체', label: '전체' },
    { name: '전시여부', value: '전시', label: '전시' },
    { name: '전시여부', value: '비전시', label: '비전시' }
  ]

  const optionsText = [
    { label: '사용안함', value: '사용안함' },
    { label: '제목', value: '제목' },
    { label: '등록자ID', value: '등록자ID' },
    { label: '수정자ID', value: '수정자ID' }
  ]

  const initialValues = {
    searchWord: '',
    selectWord: optionsText[0],
    exhibition: exhibitionStatus[0].value,
    fromDate: '',
    toDate: '',
    periodType: optionsPeriodType[0]
  }

  const exposureSitesBoxType = computed(() => {
    return exposureSites.filter((item) => item.id !== ID_CHECKBOX_ALL).map((item) => item.id)
  })

  const exposureSitesCheckBox = useCheckbox(exposureSitesBoxType)

  const listActionCheckBox = computed(() => {
    return {
      exposureSitesCheckBox
    }
  })

  const {
    refTable,
    values,
    handleSubmit,
    currentActiveDate,
    isLoading,
    items,
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
    setFieldValue,
    getIsCheckBox,
    handleCheckBoxChange
  } = useBaseBulletin({ MockDataTableModel, initialValues, hasDate: true, listActionCheckBox })

  type PartnerNoticeListForm = typeof initialValues
  const formValues = values as PartnerNoticeListForm
  const formKeys = createEnumFromKeys(initialValues)
  const disableField = ref(false)

  const handleChangeValueSelect = (field: keyof PartnerNoticeListForm, value: any) => {
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
    // call api delete
    checkListChecked(() => {
      const iHas = listChecked.value.some((i) => items.value?.find((item) => item.id === i))
      handleMessage(iHas, 'delete')
    })
  }

  const handleHide = () => {
    // call api hide
    checkListChecked(() => {
      const iHas = listChecked.value.some((i) => items.value?.find((item) => item.id === i))
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
    } else if (iHas && type === 'hide') {
      openModal?.({
        buttonLabel: '확인',
        content: '비전시 처리가 완료되었습니다.'
      })
    }
  }

  const onSubmit = handleSubmit((values: PartnerNoticeListForm) => {
    //call api update-create
    console.log('values', values)
    console.log('listActionCheckBox', listActionCheckBox.value.exposureSitesCheckBox.listChecked.value)
  })

  const onResetForm = () => {
    resetForm()
    onChangeFilterDate(DAYS_PER_THREE_MONTH)
    listActionCheckBox.value.exposureSitesCheckBox.handleChangeCheckBoxItem(true, ID_CHECKBOX_ALL)
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
    exposureSites,
    refTable,
    exhibitionStatus,
    optionsText,
    formValues,
    currentActiveDate,
    isLoading,
    items,
    totalItems,
    disableField,
    optionsPeriodType,
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
    handleHide,
    getIsCheckBox,
    handleCheckBoxChange
  }
}

import { ref } from 'vue'
import { useBaseBulletin, useModal } from '@/composables'
import MockDataTableModel from '@/views/bulletin-board/forbidden-words/table.json'
import { ForbiddenWordsSearch_P } from '@/views/bulletin-board'
import { DAYS_PER_THREE_MONTH, TEXT_MAX_NUMBER_60 } from '@/common'

export const useForbiddenWordsList = () => {
  const initialValues = {
    forbiddenWord: '',
    registrantName: '',
    fromDate: '',
    toDate: ''
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
  const { closeModalByPop: closeCustomModal, showModal } = useModal()
  type TNForbiddenWordsForm = typeof initialValues

  const formValues = values as TNForbiddenWordsForm
  const isReadonly = ref(false)
  const wordSearch = ref('')
  const maxSearchBytes = TEXT_MAX_NUMBER_60
  const handleChangeValueSelect = (field: keyof TNForbiddenWordsForm, value: any) => {
    setFieldValue(field, value)
  }

  const handleDelete = () => {
    checkListChecked(() => {
      const iHas = listChecked.value.some((i) => items.value?.find((item) => item.id === i))
      handleMessage(iHas)
    }, '삭제할 금칙어를 선택해 주세요.')
  }

  const handleMessage = (iHas: boolean) => {
    if (iHas) {
      //call api delete
      openModalConfirm({
        content: '선택한 금칙어를 삭제하시겠습니까?',
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
    }
  }

  const onSubmit = handleSubmit((values: TNForbiddenWordsForm) => {
    console.log('values', values)
    // call api filter list
  })

  const onResetForm = () => {
    resetForm()
    onChangeFilterDate(DAYS_PER_THREE_MONTH)
  }

  //popup search word

  const changeReadonlySearch = (value: boolean) => {
    isReadonly.value = value
  }

  const handleSearch = (value: string) => {
    const byteCount = new TextEncoder().encode(value).length
    if (byteCount <= maxSearchBytes) {
      wordSearch.value = value
      changeReadonlySearch(false)
    } else {
      changeReadonlySearch(true)
    }
  }

  const handleSearchWord = () => {
    const _wordSearch = wordSearch.value.trim()
    if (_wordSearch === '') {
      openModal?.({
        buttonLabel: '확인',
        content: '적용 금칙어를 입력해 주세요.'
      })
    } else if (_wordSearch === 'same') {
      // call api search word
      openModal?.({
        buttonLabel: '확인',
        content: '이미 등록된 금칙어입니다.'
      })
    } else {
      openModal?.({
        buttonLabel: '확인',
        content: '입력하신 금칙어를 등록하시겠습니까?'
      })
    }
  }

  const handleAddWord = () => {
    showModal?.({
      component: ForbiddenWordsSearch_P,
      props: {
        onCancel: closeCustomModal,
        onConfirm: handleSearchWord,
        isReadonly,
        wordSearch,
        handleSearch,
        changeReadonlySearch
      }
    })
  }

  return {
    formValues,
    currentActiveDate,
    isLoading,
    items,
    totalItems,
    refTable,
    handleDelete,
    onSubmit,
    onResetForm,
    onChangeFilterDate,
    handleChangeValueSelect,
    onPageChange,
    onRowClick,
    onSelectAllChange,
    onRowSelected,
    handleAddWord
  }
}

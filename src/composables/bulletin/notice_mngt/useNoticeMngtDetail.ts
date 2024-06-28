import { ref } from 'vue'
import { TEXT_MAX_NUMBER_60, createEnumFromKeys } from '@/common'
import { useBaseBulletin } from '@/composables'
import { ProductSearchRecordModel } from '@/models'

export const useNoticeMngtDetail = () => {
  const noticeCategory = [
    { name: '공지구분', value: '일반', label: '일반' },
    { name: '공지구분', value: '중요 (상단고정)', label: ' 중요 (상단고정)' }
  ]

  const exhibitionStatus = [
    { name: '전시여부', value: '전시', label: '전시' },
    { name: '전시여부', value: '비전시', label: '비전시' }
  ]

  const customerDesignation = [
    { name: '고객사 지정', value: '공통', label: '공통' },
    { name: '고객사 지정', value: '개별', label: '개별' }
  ]

  const initialValues = {
    exhibition: exhibitionStatus[0].value,
    category: noticeCategory[0].value,
    designation: customerDesignation[0].value,
    title: '',
    zipCode: '',
    editor: '',
    keywordCustomerList: [] as unknown as [string]
  }

  const { values, handleSubmit, closeModalByPop, openModal, openModalConfirm, setFieldValue } = useBaseBulletin({ initialValues })

  type TNNoticeMngtDetailForm = typeof initialValues
  const formValues = values as TNNoticeMngtDetailForm
  const formKeys = createEnumFromKeys(initialValues)
  const isReadonlyTitle = ref(false)
  const maxTitleBytes = TEXT_MAX_NUMBER_60

  const handleChangeValueSelect = (field: keyof TNNoticeMngtDetailForm, value: any) => {
    if (field === formKeys.title) {
      const byteCount = new TextEncoder().encode(value).length
      if (byteCount <= maxTitleBytes) {
        changeReadonlyTitle(false)
      } else {
        changeReadonlyTitle(true)
        return
      }
    }
    setFieldValue(field, value)
  }

  function changeReadonlyTitle(value: boolean) {
    isReadonlyTitle.value = value
  }

  function areAllFieldsFilled() {
    for (const key in formValues) {
      if (key !== formKeys.zipCode && values[key].trim() === '') {
        return false
      }
    }
    return true
  }

  const onSubmit = handleSubmit((value: TNNoticeMngtDetailForm) => {
    //call api update-create
    console.log('value', value)
    if (areAllFieldsFilled()) {
      openModalConfirm({
        content: '변경사항을 저장하시겠습니까?',
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

  /* Customer information */
  const searchCustomerRef = ref()
  const changeKeywordCustomer = (value: ProductSearchRecordModel) => {
    const keywordCustomer = `(${value.code}) ${value.name}`
    const isHas = formValues.keywordCustomerList.includes(keywordCustomer)
    if (isHas) return
    handleChangeValueSelect('keywordCustomerList', [...formValues.keywordCustomerList, keywordCustomer])
  }

  const onOpenSearchCustomer = () => {
    searchCustomerRef.value.handlePopupSearch()
  }

  const handleRemoveTag = (keyword: string) => {
    openModalConfirm({
      content: '선택한 고객사를 삭제하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: () => {
        const _keywordCustomerList = formValues.keywordCustomerList.filter((i) => i !== keyword)
        handleChangeValueSelect('keywordCustomerList', [..._keywordCustomerList])
        closeModalByPop?.()
        openModal?.({
          buttonLabel: '확인',
          content: '삭제가 완료되었습니다.'
        })
      }
    })
  }

  return {
    exhibitionStatus,
    noticeCategory,
    formValues,
    customerDesignation,
    isReadonlyTitle,
    searchCustomerRef,
    onOpenSearchCustomer,
    changeKeywordCustomer,
    onSubmit,
    handleChangeValueSelect,
    changeReadonlyTitle,
    handleRemoveTag
  }
}

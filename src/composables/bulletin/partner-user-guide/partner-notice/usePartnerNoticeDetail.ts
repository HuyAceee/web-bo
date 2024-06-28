import { TEXT_MAX_NUMBER_60, createEnumFromKeys } from '@/common'
import { useBaseBulletin } from '@/composables'
import { ref } from 'vue'

export const usePartnerNoticeDetail = () => {
  const noticeCategory = [
    { name: '공지구분', value: '일반', label: '일반' },
    { name: '공지구분', value: '중요 (상단고정)', label: ' 중요 (상단고정)' }
  ]

  const exhibitionStatus = [
    { name: '전시여부', value: '전시', label: '전시' },
    { name: '전시여부', value: '비전시', label: '비전시' }
  ]

  const exposureWebs = [
    { name: '노출 사이트', value: '전체', label: '전체' },
    { name: '노출 사이트', value: 'PO', label: 'PO' },
    { name: '노출 사이트', value: 'CO', label: 'CO' }
  ]

  const initialValues = {
    exhibition: exhibitionStatus[0].value,
    category: noticeCategory[0].value,
    exposureWeb: exposureWebs[0].value,
    title: '',
    zipCode: '',
    editor: ''
  }
  const { values, handleSubmit, closeModalByPop, openModal, openModalConfirm, setFieldValue } = useBaseBulletin({ initialValues })
  type BulletinPartnerNoticeDetailForm = typeof initialValues
  const formValues = values as BulletinPartnerNoticeDetailForm
  const formKeys = createEnumFromKeys(initialValues)
  const isReadonlyTitle = ref(false)
  const maxTitleBytes = TEXT_MAX_NUMBER_60

  const handleChangeValueSelect = (field: keyof BulletinPartnerNoticeDetailForm, value: any) => {
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

  const onSubmit = handleSubmit((value: BulletinPartnerNoticeDetailForm) => {
    //call api update-create
    console.log('value', value)
    if (areAllFieldsFilled()) {
      openModalConfirm({
        content: '파트너 공지사항을 등록하시겠습니까?',
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
      content: '파트너 공지사항이 등록되었습니다.'
    })
  }

  return {
    exhibitionStatus,
    noticeCategory,
    formValues,
    exposureWebs,
    isReadonlyTitle,
    onSubmit,
    handleChangeValueSelect,
    changeReadonlyTitle
  }
}

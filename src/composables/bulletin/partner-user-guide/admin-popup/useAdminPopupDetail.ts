import { computed, ref } from 'vue'
import { ID_CHECKBOX_ALL, TEXT_MAX_NUMBER_60, createEnumFromKeys } from '@/common'
import { useBaseBulletin, useCheckbox } from '@/composables'

export const useAdminPopupDetail = () => {
  const exposureSites = [
    { name: '노출 사이트', value: 'BO', label: 'BO' },
    { name: '노출 사이트', value: 'PO', label: 'PO' },
    { name: '노출 사이트', value: 'CO', label: 'CO' }
  ]

  const exhibitionStatus = [
    { name: '전시여부', value: '전시', label: '전시' },
    { name: '전시여부', value: '비전시', label: '비전시' }
  ]

  const optionsWidthType = [
    { label: '450px', value: '450px' },
    { label: '800px', value: '800px' },
    { label: '1200px', value: '1200px' }
  ]

  const initialValues = {
    exhibition: exhibitionStatus[0].value,
    exposureSite: exposureSites[0].value,
    title: '',
    zipCode: '',
    editor: '',
    fromDate: '',
    toDate: '',
    width: optionsWidthType[0],
    height: '450'
  }
  const { values, handleSubmit, closeModalByPop, openModal, openModalConfirm, setFieldValue } = useBaseBulletin({
    initialValues
  })
  type BulletinPartnerNoticeDetailForm = typeof initialValues
  const formValues = values as BulletinPartnerNoticeDetailForm
  const formKeys = createEnumFromKeys(initialValues)
  const isReadOnlyTitle = ref(false)
  const isReadOnlyHeight = ref(false)
  const maxTitleBytes = TEXT_MAX_NUMBER_60

  const handleChangeValueSelect = (field: keyof BulletinPartnerNoticeDetailForm, value: any) => {
    if (field === formKeys.title) {
      const byteCount = new TextEncoder().encode(value).length
      if (byteCount <= maxTitleBytes) {
        changeReadOnlyTitle(false)
      } else {
        changeReadOnlyTitle(true)
        return
      }
    } else if (field === formKeys.height) {
      if (value.length > 4) {
        changeReadOnlyHeight(true)
        return
      } else {
        changeReadOnlyTitle(false)
      }
    }
    setFieldValue(field, value)
  }

  function changeReadOnlyTitle(value: boolean) {
    isReadOnlyTitle.value = value
  }

  function changeReadOnlyHeight(value: boolean) {
    isReadOnlyHeight.value = value
  }

  function areAllFieldsFilled() {
    for (const key in formValues) {
      if (key !== formKeys.zipCode && key !== formKeys.width && values[key].trim() === '') {
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

  return {
    exhibitionStatus,
    exposureSites,
    formValues,
    isReadOnlyTitle,
    optionsWidthType,
    isReadOnlyHeight,
    onSubmit,
    handleChangeValueSelect,
    changeReadOnlyTitle,
    changeReadOnlyHeight
  }
}

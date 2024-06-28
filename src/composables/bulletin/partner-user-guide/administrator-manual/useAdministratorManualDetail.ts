import { ref, watch } from 'vue'
import { TEXT_MAX_NUMBER_60, createEnumFromKeys } from '@/common'
import { useBaseBulletin } from '@/composables'

export const useAdministratorManualDetail = () => {
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

  const mainExposures = [
    { name: '메인 노출 여부', value: '노출', label: '노출' },
    { name: '메인 노출 여부', value: '비노출', label: '비노출' }
  ]

  const optionsMainExposures = [
    { label: 'CO매뉴얼', value: 'CO매뉴얼' },
    { label: 'PO매뉴얼', value: 'PO매뉴얼' },
    { label: 'BO매뉴얼', value: 'BO매뉴얼' }
  ]

  const initialValues = {
    exhibition: exhibitionStatus[0].value,
    category: noticeCategory[0].value,
    exposureWeb: exposureWebs[0].value,
    title: '',
    zipCode: '',
    editor: '',
    mainExposure: mainExposures[1].value,
    optionsMainExposure: {},
    documentsList: [] as any[]
  }
  const { values, handleSubmit, closeModalByPop, openModal, openModalConfirm, setFieldValue } = useBaseBulletin({ initialValues })
  type BulletinAdministratorManualDetailForm = typeof initialValues
  const formKeys = createEnumFromKeys(initialValues)
  const formValues = values as BulletinAdministratorManualDetailForm
  const isReadonlyTitle = ref(false)
  const maxTitleBytes = TEXT_MAX_NUMBER_60

  const handleChangeValueSelect = (field: keyof BulletinAdministratorManualDetailForm, value: any) => {
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

  const onSubmit = handleSubmit((value: BulletinAdministratorManualDetailForm) => {
    // call api update-create
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

  watch(
    () => formValues.mainExposure,
    (newCurrentDate) => {
      if (newCurrentDate === '비노출') {
        handleChangeValueSelect('optionsMainExposure', {})
      }
    },
    { immediate: true }
  )

  const disableOptionsMainExposures = () => {
    return formValues.mainExposure === '비노출'
  }
  // upload file

  const getFile = (value: any) => {
    const isHas = formValues.documentsList.some((obj) => {
      return obj.name === value.file?.name
    })
    if (formValues.documentsList.length >= 5 || isHas) return
    handleChangeValueSelect('documentsList', [...formValues.documentsList, { name: value?.file?.name, url: value?.url, size: value?.file?.size }])
  }

  const onRemoveFile = (doc: any) => {
    const _documentsList = formValues.documentsList.filter((obj) => obj.url !== doc.url)
    handleChangeValueSelect('documentsList', [..._documentsList])
  }

  return {
    optionsMainExposures,
    mainExposures,
    exhibitionStatus,
    noticeCategory,
    formValues,
    exposureWebs,
    isReadonlyTitle,
    onRemoveFile,
    getFile,
    onSubmit,
    handleChangeValueSelect,
    changeReadonlyTitle,
    disableOptionsMainExposures
  }
}

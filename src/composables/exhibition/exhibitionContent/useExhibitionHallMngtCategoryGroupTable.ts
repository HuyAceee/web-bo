import { isEmpty } from "@/common"
import { useModalConfirm, useModalNotification } from "@/composables/widgets"
import { useForm } from "vee-validate"
import { computed, ref } from "vue"
import { array, object } from "yup"

interface FormModel {
  formData: any[]
}

export const useExhibitionHallMngtCategoryGroupTable = () => {
  const exampleItem = { aaa: 'bbb', flatform: 'ALL', exhibitionStatus: 'Y', exhibitionOrder: '', c1: 'c1', c2: 'c2', c3: 'c3', c4: 'c4', c5: 'c5' }

  const flatformOptions = [
    {
      label: '전체',
      value: 'ALL'
    },
    {
      label: 'PC',
      value: 'PC'
    },
    {
      label: '모바일 ',
      value: 'MOBILE'
    }
  ]

  const exhibitionStatusOptions = [
    {
      label: '전시',
      value: 'Y'
    },
    {
      label: '비전시',
      value: 'N'
    }
  ]

  const schema = {
    formData: array().of(
      object().shape({
        exhibitionStatus: isEmpty,
        exhibitionOrder: isEmpty,
        flatform: isEmpty
      })
    )
  }

  const tableRef = ref()

  const { openModal: openNotification, closeModalByPop } = useModalNotification()
  const { openModal: openConfirm } = useModalConfirm()

  const { values, setFieldValue, handleSubmit } = useForm<FormModel>({
    initialValues: {
      formData: Array(5)
        .fill(exampleItem)
        .map((it) => ({ ...it, key: Math.random() }))
    },
    validationSchema: schema
  })

  const tableValuesComputed = computed(() => values.formData.map((it, idx) => ({ ...it, id: idx, isSelected: it.isSelected ?? false })))

  const onRowCheck = (item: any) => {
    const rowIndex = tableValuesComputed.value.findIndex((it) => it.id === item.id)
    setFieldValue(`formData.${rowIndex}.isSelected`, item?.isSelected ?? false)
  }

  const onSelectAll = (checked: boolean) => {
    setFieldValue(
      'formData',
      values.formData.map((it) => ({ ...it, isSelected: checked }))
    )
  }

  const onCopyCorner = () => {
    openConfirm({
      content: '코너를 복사하겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        handleCopyCorner()
      }
    })
  }

  const getCheckedList = () => {
    return values.formData.filter((it) => it.isSelected)
  }

  const handleCopyCorner = () => {
    // handle
    setFieldValue('formData', values.formData.concat(getCheckedList()))
    openNotification({
      content: '코너 복사 되었습니다.'
    })
  }
  const onRegister = () => {}

  const onDelete = () => {
    openConfirm({
      content: '코너를 삭제하겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        handleDelete()
      }
    })
  }

  const handleDelete = () => {
    // handle
    const checkedList = getCheckedList()
    setFieldValue(
      'formData',
      values.formData.filter((it) => checkedList.length && checkedList.some((_) => _.key !== it.key))
    )
    openNotification({
      content: '코너 삭제 되었습니다.'
    })
  }

  const onSave = handleSubmit(
    async () => {
      // handle
      openNotification({
        content: '저장 되었습니다.'
      })
    },
    () => {
      openNotification({
        content: '필수입력 항목을 입력해주세요.'
      })
    }
  )

  return {
    flatformOptions,
    exhibitionStatusOptions,
    tableRef,
    values,
    tableValuesComputed,
    setFieldValue,
    onRowCheck,
    onSelectAll,
    onCopyCorner,
    onRegister,
    onDelete,
    onSave
  }
}
import { DataTableRowClickEvent } from 'primevue/datatable'
import { PageState } from 'primevue/paginator'
import {
  DATA_TABLE_TOTAL_ITEMS,
  DAYS_PER_THREE_MONTH,
  ID_CHECKBOX_ALL,
  TEXT_MAX_NUMBER_50,
  handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD
} from '@/common'
import {  ICheckBoxData } from '@/models'
import { useCheckBoxTable, useDataTablePagination, useModalConfirm, useModalNotification } from '@/composables'
import { ComputedRef, computed, onMounted, ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'

type useBaseBulletinProps = {
  MockDataTableModel?: any
  initialValues: any
  hasDate?: boolean
  listActionCheckBox?: ComputedRef<{ [key: string]: ICheckBoxData }>
}

//table
export const useBaseBulletin = ({ MockDataTableModel, initialValues, hasDate, listActionCheckBox }: useBaseBulletinProps) => {
  const callFakeApi = (page: number, size: number) => {
    // mock api return data with delay time
    return new Promise<DataTablePaginationResponseModel<any>>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = page * size + size
        for (let i = page * size; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockDataTableModel,
            id: index,
            code: MockDataTableModel.code + index
          })
        }
        resolve({
          totalItems: DATA_TABLE_TOTAL_ITEMS,
          data: items
        })
      })
    })
  }
  const refTable = ref()
  const { openModal } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()
  const { items, totalItems, isLoading, fetchDataWith } = useDataTablePagination<any>(callFakeApi)
  const listId = computed(() => {
    return items.value?.map((item: any) => item.id) ?? []
  })

  const { listChecked, onRowSelected, onSelectAllChange, clearChecked } = useCheckBoxTable(listId)
  const onPageChange = (pageState: PageState) => {
    clearChecked()
    fetchDataWith({
      numberOfItems: pageState.rows,
      page: pageState.page
    }).then(() => {
      refTable.value?.scrollToTop()
    })
  }
  /* Call when click one row */
  const onRowClick = (event: DataTableRowClickEvent) => {
    // console.log('rowClick', event)
    // alert('rowClick' + event.index + event.data.code)
  }

  const checkListChecked = (callback: () => void, massage = '처리할 게시글을 선택해 주세요.') => {
    if (!listChecked.value.length) {
      openModal?.({
        buttonLabel: '확인',
        content: massage
      })
      return
    }
    callback()
  }

  //default useForm

  // date picker range
  const { handleSubmit, values, resetForm, setFieldValue } = useForm({ initialValues: { ...initialValues } })
  const currentActiveDate = ref(-1)
  const handleChangeCountDate = (number: number) => {
    currentActiveDate.value = number
  }

  const onChangeFilterDate = (number: number) => {
    handleChangeCountDate(number)
    const { currentDateString, lastCustomDayString } = handleGetTimeLinesWithFORMAT_DATE_YYYY_MM_DD(number)
    setFieldValue('fromDate', lastCustomDayString)
    setFieldValue('toDate', currentDateString)
  }

  onMounted(() => {
    handleChangeCountDate(DAYS_PER_THREE_MONTH)
    // default checkbox
    listActionCheckBox?.value.exposureSitesCheckBox.handleChangeCheckBoxItem(true, ID_CHECKBOX_ALL)
  })

  watch(
    () => currentActiveDate.value,
    (newCurrentDate) => {
      if (hasDate) {
        onChangeFilterDate(newCurrentDate)
      }
    },
    { immediate: true }
  )
  // check box

  const getIsCheckBox = (fieldKey: string, id: string) => {
    const newField = fieldKey as 'exposureSitesCheckBox'
    return listActionCheckBox?.value?.[newField].getChecked(id)
  }

  const handleCheckBoxChange = (fieldKey: string, value: boolean, id: string) => {
    const newField = fieldKey as 'exposureSitesCheckBox'
    listActionCheckBox?.value?.[newField].handleChangeCheckBoxItem(value, id)
  }

  // handle change read only search word
  const isReadOnlySearchWord = ref(false)
  const maxWordSearch = TEXT_MAX_NUMBER_50

  const handleReadOnlySearchWord = (value: boolean) => {
    isReadOnlySearchWord.value = value
  }
  return {
    refTable,
    items,
    isLoading,
    totalItems,
    handleSubmit,
    values,
    currentActiveDate,
    listChecked,
    maxWordSearch,
    isReadOnlySearchWord,
    onPageChange,
    onRowClick,
    onRowSelected,
    onSelectAllChange,
    checkListChecked,
    closeModalByPop,
    openModalConfirm,
    openModal,
    resetForm,
    setFieldValue,
    onChangeFilterDate,
    handleChangeCountDate,
    handleCheckBoxChange,
    getIsCheckBox,
    handleReadOnlySearchWord
  }
}

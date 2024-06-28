import { TEXT_MAX_NUMBER_50, acceptNumberKey, cloneArray, countMatches } from '@/common'
import { exportExcel } from '@/common/excelUtils'
import { useModalConfirm, useModalNotification } from '@/composables'
import { useDataTablePagination } from '@/composables/widgets/table/useDataTablePagination'
import { defaultPageState } from '@/models'
import {
  MemberFOModel,
  MemberPointAdjustmentProps,
  MemberPointAdjustmentTableUpdateConfig
} from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAdjustmentModel'
import { PageState } from 'primevue/paginator'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'

type SearchType = 'name' | 'code'
type InsertType = 'add' | 'subtract' | ''

interface QueryType {
  type: SearchType
  query: string
  insertType: InsertType
  insertValue: string
}

type OptionType<T> = {
  label: string
  value: T
}

type SearchOptionType = OptionType<SearchType>

type InsertOptionType = OptionType<InsertType>

interface FormModelItem extends MemberFOModel {
  note?: string
  type?: InsertType
  point?: string
}

interface FormModel {
  formData: FormModelItem[]
}

export const useMemberPointAdjustmentTable = (props: MemberPointAdjustmentProps) => {
  const searchTypeOptions: SearchOptionType[] = [
    {
      label: '회원명',
      value: 'name'
    },
    {
      label: '회원코드',
      value: 'code'
    }
  ]

  const insertTypeOptions: InsertOptionType[] = [
    {
      label: '선택',
      value: ''
    },
    {
      label: '추가',
      value: 'add'
    },
    {
      label: '차감',
      value: 'subtract'
    }
  ]

  const insertAllTypeOptions: InsertOptionType[] = [
    {
      label: '일괄 조정 선택',
      value: ''
    },
    {
      label: '일괄 추가 조정',
      value: 'add'
    },
    {
      label: '일괄 차감 조정',
      value: 'subtract'
    }
  ]

  const CHARACTER_SEPARATOR = ','

  const defaultQuery: QueryType = {
    type: searchTypeOptions[0].value,
    query: '',
    insertType: insertAllTypeOptions[0].value,
    insertValue: ''
  }

  const query = ref<QueryType>(defaultQuery)

  const disableQueryInsert = computed(() => {
    return query.value.insertType === insertAllTypeOptions[0].value
  })

  const tableRef = ref()
  const defaultData = ref<MemberFOModel[]>([])
  const filterData = ref<MemberFOModel[]>([])
  let timeout: NodeJS.Timeout | undefined

  const page = ref<PageState>(defaultPageState)
  const { values, setValues, setFieldValue } = useForm<FormModel>()
  const { items, totalItems, isLoading, fetchDataWith } = useDataTablePagination<any>((page, size) => getTableData(page, size))
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()
  const { openModal } = useModalNotification()
  watch(
    () => props.data,
    (v) => {
      if (v) {
        defaultData.value = cloneArray(v)
      }
    },
    { immediate: true }
  )

  const handleFilter = (type: SearchType, searchKey: string) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      if (!searchKey) {
        const filterResult = [...defaultData.value]
        filterData.value = filterResult
        setValues({ formData: filterResult })
      } else {
        const keyList = searchKey.split(',')
        if (type === 'name') {
          const filterResult = defaultData.value.filter((item) => {
            return keyList.some((key) => {
              // search field name
              return item?.memberName?.toLocaleLowerCase()?.match(new RegExp(`${key.toLocaleLowerCase()}`))
            })
          })
          filterData.value = filterResult
          setValues({ formData: filterResult })
        } else {
          const filterResult = defaultData.value.filter((item) => {
            return keyList.some((key) => {
              // search field code
              return String(item?.foMemberKey).localeCompare(String(key)) === 0
            })
          })
          filterData.value = filterResult
          setValues({ formData: filterResult })
        }
      }
    }, 50)
  }

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    fetchDataWith({
      numberOfItems: pageState.rows,
      page: pageState.page
    })
      .then(() => {
        tableRef.value.scrollToTop()
      })
      .catch(() => {})
  }

  watch(
    [() => query.value.query, () => query.value.type, defaultData],
    ([query, type, defaultData]) => {
      if (defaultData) {
        handleFilter(type, query)
        onPageChange(page.value)
      }
    },
    { immediate: true }
  )

  const getTableData = (page: number, size: number) => {
    const showData = values.formData?.slice(page * size, (page + 1) * size)
    return Promise.resolve({
      data: showData,
      totalItems: values?.formData?.length
    })
  }

  const handleInsert = () => {
    const data = values?.formData.map((item) => {
      return {
        ...item,
        point: query.value.insertValue,
        type: query.value.insertType
      }
    })
    setValues({ formData: data })
    ;(document.activeElement as HTMLElement)?.blur()
  }

  const onReset = () => {
    openModalConfirm({
      content: '알럿) 입력 내용을 초기화 하겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        handleReset()
        openModal({ content: '입력 내용이 초기화 되었습니다.' })
      }
    })
  }

  const handleReset = () => {
    setValues({ formData: cloneArray(defaultData.value) })
    query.value = defaultQuery
  }

  const onExport = () => {
    exportExcel(
      items.value?.map((item, index) => ({
        foMemberKey: item.foMemberKey,
        memberName: item.memberName,
        memberId: item.memberId,
        cellphone: item.cellphone,
        pointAmount: item.pointAmount,
        point: getPoint(
          values?.formData?.[page.value.page * page.value.rows + index]?.type,
          values?.formData?.[page.value.page * page.value.rows + index]?.point
        ),
        pointAfter:
          Number(item.pointAmount) +
          Number(
            getPoint(
              values?.formData?.[page.value.page * page.value.rows + index]?.type,
              values?.formData?.[page.value.page * page.value.rows + index]?.point
            )
          ),
        note: values?.formData?.[page.value.page * page.value.rows + index]?.note ?? '',
        managerMemo: item.managerMemo,
        customerKey: item.customerKey,
        customerName: item.customerName
      })) ?? [],
      'MemberPoint',
      MemberPointAdjustmentTableUpdateConfig.map((item) => item.header ?? '')
    )
  }

  const getPoint = (type?: InsertType, point?: string) => {
    if (type && point) {
      return type === 'add' ? point : `-${point}`
    } else return ''
  }

  const onChangeQuery = (field: string, value: string) => {
    query.value = {
      ...query.value,
      [field]: value
    }
  }

  const getResultData = () => {
    return values?.formData
      ?.filter((item) => item.point && item.type)
      .map((item) => ({
        foMemberKey: item.foMemberKey,
        pointAmount: getPoint(item.type, item.point),
        managerMemo: item.note ?? ''
      }))
  }

  const onKeyPressNumber = (event: KeyboardEvent) => {
    acceptNumberKey(event)
    if ((event?.target as HTMLInputElement)?.selectionStart === 0 && event.key === '0') {
      event.preventDefault()
    }
  }

  const acceptMaxKeyWordsQuery = (event: KeyboardEvent) => {
    const value = (event?.target as HTMLInputElement)?.value
    if (value && countMatches(value, CHARACTER_SEPARATOR) >= TEXT_MAX_NUMBER_50 - 1 && event.key === CHARACTER_SEPARATOR) {
      event.preventDefault()
    }
  }

  return {
    searchTypeOptions,
    insertTypeOptions,
    insertAllTypeOptions,
    query,
    onChangeQuery,
    disableQueryInsert,
    tableRef,
    page,
    values,
    setFieldValue,
    items,
    totalItems,
    isLoading,
    onPageChange,
    handleInsert,
    handleReset,
    onReset,
    onExport,
    getPoint,
    getResultData,
    onKeyPressNumber,
    acceptMaxKeyWordsQuery
  }
}

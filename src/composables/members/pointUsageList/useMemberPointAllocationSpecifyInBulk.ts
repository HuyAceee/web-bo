import { fileDocumentNames } from '@/common'
import { useFormFilterTable, useModalConfirm, useModalNotification } from '@/composables/widgets'
import { MemberSpecifyInBulktabModel, defaultPageState } from '@/models'
import { memberPointAllocationSpecifyInBulkApi } from '@/services/api/members/MemberPointAllocationSpecifyInBulkApi'
import { PageState } from 'primevue/paginator'
import { TabViewChangeEvent } from 'primevue/tabview'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { handleDownloadFile } from '@/common/html'
import {
  MemberAutomatedShippingDataTableModel,
  MemberAutomatedShippingFormModel
} from '@/models/views/members/automatedShippingList/MemberAutomatedShippingListModel'

export const useMemberPointAllocationSpecifyInBulk = () => {
  const route = useRoute()
  const router = useRouter()
  const totalSuccessItems = ref<number>(0)
  const totalFailItems = ref<number>(0)

  const page = ref<PageState>(defaultPageState)
  const tabData = [
    { name: MemberSpecifyInBulktabModel.SUCCESS, header: '성공' },
    { name: MemberSpecifyInBulktabModel.FAIL, header: '실패' }
  ]

  const tabPanelProps = tabData.map((item) => {
    return { header: item.header }
  })

  const { openModal: openNotification } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()

  const searchTabIndex = (tab?: string) => {
    const tabIndex = tabData.findIndex((item) => item.name === tab)
    return tabIndex > 0 ? tabIndex : 0
  }

  const currentActive = ref(searchTabIndex(route.query.tab as string))

  const handleTabChange = (event: TabViewChangeEvent) => {
    currentActive.value = event.index
    router.push({
      query: {
        ...route.query,
        tab: tabData[event.index].name
      }
    })
  }

  const fetchDataCallback = (page: number, size: number) => {
    return memberPointAllocationSpecifyInBulkApi.getSpecifyInBulk({ pageNum: page, rowSize: size })
  }

  const downloadSampleFile = () => {
    handleDownloadFile(fileDocumentNames.memberBulkRegistration.url, fileDocumentNames.memberBulkRegistration.url)
  }

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    registerMember()
  }

  const {
    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    handleResetFormFilter,
    items,
    isLoading,
    onRowSelected,
    onSelectAllChange,
    totalItems,
    refTable,
    listChecked,
    setData,
    fetchDataWith,
    clearChecked
  } = useFormFilterTable<MemberAutomatedShippingDataTableModel, MemberAutomatedShippingFormModel>({
    fetchDataCallback,
    initialValuesForm: {}
  })

  const registerMember = () => {
    fetchDataWith({
      page: page.value.page,
      numberOfItems: page.value.rows
    }).catch(() => {})
  }

  const handleRegisterMember = () => {
    registerMember()
  }

  const onRegisterRecords = () => {
    openModalConfirm({
      content: '회원을 일괄등록 하시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        fetchDataWith({
          page: page.value.page,
          numberOfItems: page.value.rows
        }).catch(() => {})
        openNotification({
          content: '회원이 일괄등록 되었습니다.'
        })
      }
    })
  }
  const onDownload = () => {
    handleDownloadFile(fileDocumentNames.memberBulkRegistration.url, fileDocumentNames.memberBulkRegistration.name)
  }

  const onDeleteRecords = () => {
    openModalConfirm({
      content: '선택하신 리스트를 삭제하시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        clearChecked()
        fetchDataWith({
          page: page.value.page,
          numberOfItems: page.value.rows
        }).catch(() => {})
        openNotification({
          content: '선택된 리스트가 삭제 되었습니다.'
        })
      }
    })
  }

  return {
    tabData,
    tabPanelProps,
    currentActive,
    handleTabChange,

    values,
    setFieldValue,
    currentFilterDate,
    handleChangeCountDate,
    handleResetFormFilter,
    items,
    isLoading,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    totalItems,
    refTable,
    listChecked,
    setData,
    downloadSampleFile,
    handleRegisterMember,
    onDownload,
    onDeleteRecords,
    onRegisterRecords,
    totalSuccessItems,
    totalFailItems
  }
}

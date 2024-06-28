import { exhibitionGnbManagementApi } from '@/services/api/exhibition/ExhibitionGnbManagementApi'
import { onMounted, ref, watch } from 'vue'
import {
  exhibitionDefaultValueGnbGroup,
  ExhibitionGnbGroupListTableModel,
  ExhibitionGnbGroupTypeApplicationChannelValue, ExhibitionPostGnbGroupResponse, ExhibitionPutGnbGroupResponse
} from '@/models/views/exhibition/exhibitionGnbManagement/ExhibitionGnbManagementModel'
import { useModalConfirm, useModalNotification } from '@/composables'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { YnOptions } from '@/models'
import { cloneArray } from '@/common'
import {
  exhibitionCompareElementChangeArray
} from '@/composables/exhibition/exhibitionCommon/useExhibitionGnbReservationManagement'

export const useExhibitionGnbManagement = () => {
  const gnbGroupList = ref<ExhibitionGnbGroupListTableModel[]>([])
  const totalItem = ref<number>(0)
  const tableRef = ref()
  const itemsSelected = ref<ExhibitionGnbGroupListTableModel | undefined>()
  const { openModal } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()
  const filterType = ref<string>(ExhibitionGnbGroupTypeApplicationChannelValue[0].value)
  const isNewRow = ref<boolean>(false)
  const loading = ref<boolean>(false)
  const hasSubGnb = ref<boolean>(false)
  const oldData = ref<ExhibitionGnbGroupListTableModel[]>([])
  const getDataGroupGnb = (applyChannelType: string) => {
    loading.value = true
    tableRef.value?.scrollToTop?.()
    exhibitionGnbManagementApi
      .getGnbGroupList(applyChannelType)
      .then((res) => {
        gnbGroupList.value = res.data
        oldData.value = cloneArray(res.data)
        totalItem.value = res.totalItems
        loading.value = false
        isNewRow.value = false
      })
      .catch(() => {
        loading.value = false
      })
  }

  const selectedRow = (event: DataTableRowClickEvent) => {
    itemsSelected.value = event.data
  }

  const addNewRow = () => {
    if (!isNewRow.value) {
      isNewRow.value = true
      totalItem.value = totalItem.value + 1
      gnbGroupList.value = [{ ...exhibitionDefaultValueGnbGroup }, ...(gnbGroupList?.value || [])]
    } else {
      openModal({ content: '행 2개 이상 연속 추가 불가' })
    }
  }

  const submitNewGnbGroup = () => {
    const arrayCompare = exhibitionCompareElementChangeArray(gnbGroupList.value, oldData.value)
    if (arrayCompare?.length) {
      const hasMissingField = arrayCompare?.some((newItem) => {
        return (
          !newItem.displayOrder || !newItem.gnbGroupName || !newItem.gnbGroupType || !newItem.useYn || !newItem.applyChannelType || !newItem.displayYn
        )
      })

      if (hasMissingField) {
        openModal({ content: '필수입력 값을 입력하세요.' })
        return
      }

      let newItemSubmit: ExhibitionPostGnbGroupResponse | null = null

      const newValuePuts = arrayCompare
        ?.map((newItem) => {
          if (!newItem.gnbGroupKey) {
            newItemSubmit = {
              customerId: newItem.customerId,
              displayOrder: newItem.displayOrder,
              gnbGroupName: newItem.gnbGroupName,
              gnbGroupType: newItem.gnbGroupType,
              useYn: newItem.useYn,
              applyChannelType: newItem.applyChannelType,
              displayYn: newItem.displayYn ? YnOptions.Y : YnOptions.N
            }
            return null
          }
          return {
            gnbGroupKey: newItem.gnbGroupKey,
            displayOrder: newItem.displayOrder,
            gnbGroupName: newItem.gnbGroupName,
            gnbGroupType: newItem.gnbGroupType,
            useYn: newItem.useYn
          }
        })
        .filter((item) => item !== null) as ExhibitionPutGnbGroupResponse[]

      openModalConfirm({
        content: '저장하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          if (newItemSubmit) {
            exhibitionGnbManagementApi
              .postNewGnbGroup(newItemSubmit)
              .then(() => {
                if (!newValuePuts.length) {
                  openModal({
                    content: '저장되었습니다',
                    onAccept() {
                      closeModalByPop?.()
                      getDataGroupGnb(filterType.value)
                    }
                  })
                }
              })
              .catch(() => {})
          }

          if (newValuePuts.length) {
            exhibitionGnbManagementApi
              .putNewGnbGroup(newValuePuts)
              .then(() => {
                openModal({
                  content: '저장되었습니다',
                  onAccept() {
                    closeModalByPop?.()
                    getDataGroupGnb(filterType.value)
                  }
                })
              })
              .catch(() => {})
          }
        }
      })
    }
  }

  const deleteGnbGroup = () => {
    if (!itemsSelected.value) return
    if (itemsSelected.value?.gnbGroupKey) {
      if (hasSubGnb.value) {
        openModal({ content: '연결 된 하위 카테고리가 있습니다.' })
        return
      }
      openModalConfirm({
        content: '선택 된 행을 삭제하겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          exhibitionGnbManagementApi
            .deleteNewGnbGroup([itemsSelected.value?.gnbGroupKey || ''])
            .then(() => {
              openModal({
                content: '삭제 되었습니다.',
                onAccept() {
                  closeModalByPop?.()
                  getDataGroupGnb(filterType.value)
                  tableRef.value?.resetSelectedRow?.()
                  itemsSelected.value = undefined
                }
              })
            })
            .catch(() => {})
        }
      })
    } else {
      isNewRow.value = false
      totalItem.value = totalItem.value - 1
      gnbGroupList.value = gnbGroupList.value?.splice(1)
      tableRef.value?.resetSelectedRow?.()
      itemsSelected.value = undefined
    }
  }

  const setFilterType = (value: string) => {
    filterType.value = value
  }

  const setValueGnbGroup = (field: any, value: string, index: number) => {
    if (gnbGroupList.value?.[index]) {
      gnbGroupList.value[index][field] = value
    }
  }

  const setHasGnbValue = (value: boolean) => {
    hasSubGnb.value = value
  }

  watch(
    () => filterType.value,
    (newValue) => {
      itemsSelected.value = undefined
      tableRef.value?.resetSelectedRow?.()
      getDataGroupGnb(newValue)
    }
  )

  onMounted(() => {
    getDataGroupGnb(filterType.value)
  })

  return {
    gnbGroupList,
    totalItem,
    filterType,
    selectedRow,
    addNewRow,
    submitNewGnbGroup,
    loading,
    deleteGnbGroup,
    setFilterType,
    setValueGnbGroup,
    itemsSelected,
    setHasGnbValue,
    tableRef
  }
}

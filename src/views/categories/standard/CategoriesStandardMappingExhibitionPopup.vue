<!-- BO_D0103_020101_P -->
<script setup lang="ts">
import { WelfareMdButton } from '@/components'
import IconCloseRounded from '@/components/icons/IconCloseRounded.vue'
import WelfareInputText from '@/components/uikit/input/WelfareInputText.vue'
import WelfareRadio from '@/components/uikit/radio/WelfareRadio.vue'
import DataTablePaginationWithCheckbox from '@/components/uikit/table/DataTablePaginationWithCheckbox.vue'
import { useCategoriesStandardSelectExhibitionPopup } from '@/composables/categories/useCategoriesStandardSelectExhibitionPopup'
import Column from 'primevue/column'
import { TreeNode } from 'primevue/tree'
import { ProductTreeMenuConverter } from '@/models/services/responses/products/category/ProductCategoryResponse'
import { onMounted, ref, watch } from 'vue'
import { YnOptions } from '@/models'
import { ProductDisplayCategoryModel } from '@/models/services/responses/products/ticket/ProductTicketListResponse'
import { CategoriesDeep } from '@/models/views/categories/CategoriesDepthManagementModel'

interface CategoriesStandardMappingExhibitionPopupProps {
  closeModal?: () => void
  onSelect: (value?: TreeNode) => void
  onDeleteCat: (list?: TreeNode, callback?: () => void) => void
  exhibitionMapData?: ProductDisplayCategoryModel[]
}
const props = defineProps<CategoriesStandardMappingExhibitionPopupProps>()

const items = ref<ProductDisplayCategoryModel[]>([])
// const listKey = items.value?.map((it) => it.standardCategoryId || it.displayCategoryId)
const listKey = ref<string[]>([])
const checkedItems = ref<ProductDisplayCategoryModel[]>([])
const radioBtnSelectId = ref('')
const tableExhibition = ref<InstanceType<typeof DataTablePaginationWithCheckbox> | null>(null)

const onRowCheckedChange = (item: ProductDisplayCategoryModel) => {
  checkedItems.value = item?.isSelected
    ? checkedItems.value?.concat(item)
    : checkedItems.value.filter((record: any) => record.displayCategoryId !== item.displayCategoryId)
}

const onSelectAllChange = (checked: boolean) => {
  checkedItems.value = checked ? items?.value ?? [] : []
}

const { openModal: openModalSelect, selectedNode } = useCategoriesStandardSelectExhibitionPopup(items)

const handleDelete = () => {
  const listIdChecked = checkedItems.value?.map((it) => it.displayCategoryId)
  items.value = items.value.filter((item) => !listIdChecked.includes(item.displayCategoryId))
  const checkboxId = checkedItems.value.find((it) => it.representativeDisplayCategoryYn === YnOptions.Y)
  if (checkboxId) {
    radioBtnSelectId.value = items.value[0]?.displayCategoryId
  }
  tableExhibition?.value?.clearCheckAll?.()
  checkedItems.value = []
}
const handleDeleteCat = async () => {
  props?.onDeleteCat(checkedItems, handleDelete)
}

watch(selectedNode, (val) => {
  const originalArray = ProductTreeMenuConverter.flatTreeToOriginalArray<ProductDisplayCategoryModel>(val)
  const oldId = items.value?.map((it) => it.displayCategoryId)
  const newItems = originalArray
    .filter((it) => !oldId?.includes(it.displayCategoryId) && it.displayCategoryDepth === CategoriesDeep.THREE)
    .map((it) => ({
      ...it,
      standardCategoryName: it.displayCategoryPathName,
      isSelected: false,
      representativeDisplayCategoryYn: YnOptions.N,
      id: it.displayCategoryId
    }))

  items.value = [...items.value, ...newItems]

  const displayYnID = items.value?.find((it) => it.representativeDisplayCategoryYn === YnOptions.Y)?.displayCategoryId

  radioBtnSelectId.value = displayYnID || items.value[0]?.displayCategoryId

  listKey.value = items.value?.map((it) => it.standardCategoryId || it.displayCategoryId)

  checkedItems.value = []
  tableExhibition?.value?.clearCheckAll?.()
})

watch(radioBtnSelectId, () => {
  items.value = items?.value?.map((it) => {
    if (it.displayCategoryId === radioBtnSelectId.value) {
      return {
        ...it,
        representativeDisplayCategoryYn: YnOptions.Y
      }
    }
    return {
      ...it,
      representativeDisplayCategoryYn: YnOptions.N
    }
  })
})

onMounted(() => {
  items.value = props.exhibitionMapData
    ? props.exhibitionMapData.map((it) => {
        return {
          ...it,
          id: it.standardCategoryId ?? it.displayCategoryId,
          displayCategoryPathName: it.displayCategoryPathName ?? it.standardCategoryName,
          standardCategoryName: it.displayCategoryPathName ?? it.standardCategoryName,
          representativeDisplayCategoryYn: it.representativeDisplayCategoryYn ?? YnOptions.N,
          isSelected: false
        }
      })
    : ([] as ProductDisplayCategoryModel[])

  const displayYnID = items.value?.find((it) => it.representativeDisplayCategoryYn === YnOptions.Y)?.displayCategoryId

  radioBtnSelectId.value = displayYnID || items.value[0]?.displayCategoryId

  listKey.value = items.value?.map((it) => it.standardCategoryId || it.displayCategoryId)
})
</script>
<template>
  <div class="wf_w-800 wf_bg-white">
    <div class="wf-modal-header">
      <p class="wf-sub_tit_01 wf_text-n-33">전시 카테고리 맵핑</p>
      <IconCloseRounded @click="props.closeModal?.()" />
    </div>
    <div class="wf-modal-table wf-custom-scrollbar">
      <DataTablePaginationWithCheckbox
        :showSelection="!!items?.length"
        ref="tableExhibition"
        hiddenPagination
        isSelectInvisible
        :value="items"
        v-on:select-all-change="onSelectAllChange"
        v-on:row-checked-change="onRowCheckedChange"
        class="wf_w-full"
      >
        <template #columns>
          <Column column-key="standardCategoryPathName" key="standardCategoryPathName" class="wf_m-w-596 wf-overflow-x-hidden">
            <template #header>전시 카테고리</template>
            <template #body="slotProps">
              <WelfareInputText size="small" v-model="slotProps.data.displayCategoryPathName" class="wf_w-full" />
            </template>
          </Column>
          <Column column-key="representativeDisplayCategoryYn" key="representativeDisplayCategoryYn" class="">
            <template #header>대표 설정<span class="wf_text-sub-01">&nbsp; *</span></template>
            <template #body="slotProps">
              <WelfareRadio v-model="radioBtnSelectId" :value="slotProps.data.displayCategoryId" :name="slotProps.data.displayCategoryId" size="sm" />
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
    </div>
    <div class="wf_flex wf-flex-row wf-space-x-4 wf_items-center wf_justify-center wf-pb-20">
      <WelfareMdButton label="추가" class="wf_w-120" button-type="liner" @click="openModalSelect" />
      <WelfareMdButton label="삭제" class="wf_w-120" button-type="cancel" @click="handleDeleteCat()" />
      <WelfareMdButton label="저장" class="wf_w-120" button-type="default" @click="props?.onSelect(items)" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/widgets/categoryTreeMenu/categories-tree-popup.css');
</style>

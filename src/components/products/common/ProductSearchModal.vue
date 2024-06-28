<!-- BO_C0603_010101_P -->
<script setup lang="ts">
import { DataTableContainer, WelfareInputText, WelfareMdButton } from '@/components'
import IconCloseRounded from '@/components/icons/IconCloseRounded.vue'
import { useProductModalSearchLogic } from '@/composables/products/modal/modalSearch/useProductModalSearchLogic'
import { BrandSearchModalHeaderTableConfig, ProductSearchModalHeaderTableConfig, ProductSearchModalProps, ProductSearchType } from '@/models'

const props = defineProps<ProductSearchModalProps>()

const { searchInp, searchResults, handleSearch, handleSelectRow, handleSelectValue, modalSearchMetaInfo } = useProductModalSearchLogic(props)
</script>

<template>
  <div class="wf-modal-wrapper--content wf-modal-wrapper--grow wf-product-search-modal">
    <div class="wf-modal-header">
      <p class="wf-sub_tit_01 wf_text-n-33">{{ modalSearchMetaInfo.searchTitle }}</p>
      <IconCloseRounded @click="$props.onCancel" />
    </div>
    <div class="wf-modal-body wf-body_04-mid">
      <div class="wf-search-tips wf-mb-20">
        <p class="wf-list-style wf_text-n-33">{{ modalSearchMetaInfo.searchInfo }}</p>
      </div>
      <div class="wf_flex wf_flex-row wf-space-x-6">
        <WelfareInputText
          size="large"
          inputType="text"
          class="wrap-input wf_w-full"
          :placeholder="modalSearchMetaInfo.placeholderInput"
          v-model="searchInp"
        />
        <WelfareMdButton label="조회" buttonType="liner" class="wf-btn--w-45" @onClick="handleSearch(searchInp)" />
      </div>
      <DataTableContainer
        row-hover
        @row-click="handleSelectRow"
        is-select-invisible
        :column-configs="props.searchType === ProductSearchType.BRAND ? BrandSearchModalHeaderTableConfig : ProductSearchModalHeaderTableConfig"
        :value="searchResults"
        no-data-label="검색 결과가 없습니다."
      />
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf-mt-20 wf_flex-grow wf_w-full">
        <WelfareMdButton class="wf_w-120" :label="'취소'" buttonType="cancel" @onClick="props.onCancel" />
        <WelfareMdButton class="wf_w-120" :label="'확인'" buttonType="default" @onClick="handleSelectValue" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/modal/product-search-modal.css');
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>

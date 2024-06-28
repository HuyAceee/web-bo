<script setup lang="ts">
import { handleKeyBackspaceResetValue } from '@/common';
import { WelfareInputText, WelfareMdButton } from '@/components'
import { useProductModalSearch } from '@/composables/products/modal/modalSearch/useProductModalSearch'
import { productModalSearchMeta, ProductSearchModalWrapperEmits, ProductSearchModalWrapperProps, ProductSearchRecordModel } from '@/models'
import { onMounted, watch } from 'vue'

const props = defineProps<ProductSearchModalWrapperProps>()

const emits = defineEmits<ProductSearchModalWrapperEmits>()
const { openModal, searchText, searchResData } = useProductModalSearch(props.reverseSearchText)

onMounted(() => {
  searchText.value = props.defaultValue ?? ''
})
watch(
  () => props.defaultValue,
  (val) => {
    searchText.value = val ?? ''
  }
)
watch(searchResData, (searchRes) => {
  searchRes && eventEmits.handleSelect(searchRes)
})

const handleReset = () => {
  searchText.value = ''
  searchResData.value = undefined
  eventEmits.handleSelect({} as ProductSearchRecordModel)
}

defineExpose({
  handleReset
})

const eventEmits = {
  handleSelect: (searchRecord: ProductSearchRecordModel) => {
    emits('selectValue', searchRecord)
  }
}

const handlePopupSearch = () => {
  openModal(props.type)
}
</script>

<template>
  <div class="wf_flex wf_items-center wf-space-x-4">
    <div
      class="wf-search-input-wrapper wf_w-full"
      :class="{ 'wf-pointer': !props.disabled, 'wf-modal-wrapper': !searchText }"
      @click="
        () => {
          if (!props.disabled && !searchText) {
            handlePopupSearch()
          }
        }
      "
    >
      <WelfareInputText
        size="small"
        inputType="text"
        class="wrap-input wf_w-full"
        v-model="searchText"
        @keydown="($event) => handleKeyBackspaceResetValue($event, handleReset)"
        :placeholder="placeholderInput ?? productModalSearchMeta[props.type].placeholderInput"
        :disabled="props.disabled || (!searchText && props.isDisabledOnEmptySearchText)"
      />
      <div class="wf-el-overlay" v-if="!searchText"></div>
    </div>
    <WelfareMdButton label="조회" buttonType="liner" buttonSize="small" @click="handlePopupSearch" :disabled="props.disabled" />
  </div>
</template>

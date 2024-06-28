<script setup lang="ts">
import { WelfareInputText, WelfareMdButton } from '@/components'
import { useProductModalSearchWithTable } from '@/composables/products/modal/modalSearch/useProductModalSearchWithTable'
import { productModalSearchMeta, ProductSearchModalWrapperEmits, ProductSearchModalWrapperProps, ProductSearchRecordModel } from '@/models'
import { onMounted, watch } from 'vue'
import { handleKeyBackspaceResetValue } from '@/common'

const props = withDefaults(defineProps<ProductSearchModalWrapperProps>(), {
  labelButton: '조회'
})

const emits = defineEmits<ProductSearchModalWrapperEmits>()

const { openModal, searchText, searchResData } = useProductModalSearchWithTable(props.reverseSearchText)
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

const handlePopupSearch = () => {
  openModal(props.type)
}

defineExpose({
  handleReset,
  handlePopupSearch
})

const eventEmits = {
  handleSelect: (searchRecord: ProductSearchRecordModel) => {
    emits('selectValue', searchRecord)
  }
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
        :placeholder="props.placeholderInput ?? productModalSearchMeta[props.type].placeholderInput"
        :disabled="props.disabled || (!searchText && props.isDisabledOnEmptySearchText)"
      />
      <div class="wf-el-overlay" v-if="!searchText"></div>
    </div>
    <WelfareMdButton :label="props.labelButton" buttonType="liner" buttonSize="small" @click="handlePopupSearch" :disabled="props.disabled" />
  </div>
</template>

<script setup lang="ts">
import { WelfareInputText, WelfareMdButton } from '@/components'
import { useProductModalSearch } from '@/composables/products/modal/modalSearch/useProductModalSearch'
import { productModalSearchMeta, ProductSearchModalWrapperEmits, ProductSearchModalWrapperProps, ProductSearchRecord } from '@/models'
import { watch, onMounted } from 'vue'

const { openModal, searchText, searchResData } = useProductModalSearch()

const props = defineProps<ProductSearchModalWrapperProps>()

const emits = defineEmits<ProductSearchModalWrapperEmits>()

onMounted(() => {
  searchText.value = props.defaultValue || ''
})

watch(searchResData, (searchRes) => {
  searchRes && eventEmits.handleSelect(searchRes)
})

const handleReset = () => {
  searchText.value = ''
  searchResData.value = undefined
}

defineExpose({
  handleReset
})

const eventEmits = {
  handleSelect: (searchRecord: ProductSearchRecord) => {
    emits('selectValue', searchRecord)
  }
}

const handlePopupSearch = () => {
  openModal(props.type)
}
</script>

<template>
  <div class="wf_flex wf_items-center wf-space-x-4">
    <div class="wf-search-input-wrapper wf_w-full" :class="{ 'wf-pointer': !props.disabled }" @click="!props.disabled ? handlePopupSearch() : ''">
      <WelfareInputText
        size="small"
        inputType="text"
        class="wrap-input wf_w-full"
        v-model="searchText"
        :placeholder="productModalSearchMeta[props.type].placeholderInput"
        :disabled="props.disabled"
      />
      <div class="wf-el-overlay"></div>
    </div>
    <WelfareMdButton label="조회" buttonType="liner" buttonSize="small" @click="handlePopupSearch" :disabled="props.disabled" />
  </div>
</template>

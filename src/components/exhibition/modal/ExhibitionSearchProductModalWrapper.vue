<script setup lang="ts">
import { WelfareInputText, WelfareMdButton } from '@/components'
import { ref, watch } from 'vue'
import {
  ExhibitionSearchProductModalWrapperEmits,
  ExhibitionSearchProductModalWrapperProps,
  ExhibitionSearchProductRecordModel
} from '@/models/views/exhibition/modal/ExhibitionProductSearchModalModel'
import { useExhibitionProductSearchModal } from '@/composables/exhibition/modal/useExhibitionProductSearchModal'

const props = defineProps<ExhibitionSearchProductModalWrapperProps>()

const emits = defineEmits<ExhibitionSearchProductModalWrapperEmits>()

const { openModal } = useExhibitionProductSearchModal()

const searchText = ref<string>()

const searchResData = ref<ExhibitionSearchProductRecordModel | undefined>()

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
}

const handlePopupSearch = () => {
  openModal((valueData) => {
    const value = valueData[0]
    searchText.value = `${value.productName} (${value.productKey})`
    searchResData.value = {
      productCode: value.productCode,
      productKey: value.productKey,
      name: value.productName
    }
  })
}

defineExpose({
  handleReset,
  handlePopupSearch
})

const eventEmits = {
  handleSelect: (searchRecord: ExhibitionSearchProductRecordModel) => {
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
          if (!props.disabled) {
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
        placeholder="상품 조회"
        :disabled="props.disabled || (!searchText && props.isDisabledOnEmptySearchText)"
      />
      <div class="wf-el-overlay"></div>
    </div>
    <WelfareMdButton label="조회" buttonType="liner" buttonSize="small" @click="handlePopupSearch" :disabled="props.disabled" />
  </div>
</template>

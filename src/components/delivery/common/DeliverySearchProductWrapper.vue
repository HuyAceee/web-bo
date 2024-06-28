<script setup lang="ts">
import { handleKeyBackspaceResetValue } from '@/common'
import { WelfareInputText, WelfareMdButton } from '@/components'
import { useDeliverySearchProductModal } from '@/composables/delivery/modal/useDeliverySearchProductModal'
import {
  DeliverySearchProductModalWrapperEmits,
  DeliverySearchProductModalWrapperProps
} from '@/models/views/delivery/common/DeliverySearchProductWrapperModel'
import { DeliverySearchProductSelectedValueModel } from '@/models/views/delivery/modal/DeliverySearchProductModel'
import { watch } from 'vue'

const { onShowModal, searchText, searchResData } = useDeliverySearchProductModal()

const props = defineProps<DeliverySearchProductModalWrapperProps>()

const emits = defineEmits<DeliverySearchProductModalWrapperEmits>()

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
  searchResData.value = {
    productCode: '',
    productName: '',
    productKey: ''
  }
  eventEmits.handleSelect({} as DeliverySearchProductSelectedValueModel)
}

const handlePopupSearch = () => {
  onShowModal()
}

defineExpose({
  handleReset,
  handlePopupSearch
})

const eventEmits = {
  handleSelect: (searchRecord: DeliverySearchProductSelectedValueModel) => {
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
        class="wrap-input wf_w-full wf_w-180"
        :class="customClassInput"
        v-model="searchText"
        @keydown="($event) => handleKeyBackspaceResetValue($event, handleReset)"
        :placeholder="props.placeholderInput"
        :disabled="props.disabled || (!searchText && props.isDisabledOnEmptySearchText)"
      />
      <div class="wf-el-overlay" v-if="!searchText"></div>
    </div>
    <WelfareMdButton label="조회" buttonType="liner" buttonSize="small" @click="handlePopupSearch" :disabled="props.disabled" />
  </div>
</template>

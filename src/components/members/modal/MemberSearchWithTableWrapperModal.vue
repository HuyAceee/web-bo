<script setup lang="ts">
import { handleKeyBackspaceResetValue } from '@/common';
import { WelfareInputText, WelfareMdButton } from '@/components'
import { useMemberRequestModal } from '@/composables/members/modal/useMemberRequestModal'
import { MemberRequestSearchModel, MemberSearchModalWrapperProps } from '@/models/views/members/modal/MemberRequestModel'
import { onMounted, watch } from 'vue'

const props = defineProps<MemberSearchModalWrapperProps>()

const { openModal, searchText, searchResData } = useMemberRequestModal(props?.type)
type MemberSearchModalWrapperEmits = (e: 'selectValue', value: MemberRequestSearchModel) => void
interface MemberSearchModalEmits extends MemberSearchModalWrapperEmits {
  (e: 'on-open-popup-search-member'): void
}

const emits = defineEmits<MemberSearchModalEmits>()

onMounted(() => {
  searchText.value = props.defaultValue ?? ''
})

watch(searchResData, (searchRes) => {
  searchRes && eventEmits.handleSelect(searchRes)
})

const handleReset = () => {
  searchText.value = ''
  searchResData.value = { memberKey: '', memberName: '' }
  eventEmits.handleSelect({} as MemberRequestSearchModel)
}

const handlePopupSearch = () => {
  openModal()
}

defineExpose({
  handleReset,
  handlePopupSearch
})

const eventEmits = {
  handleSelect: (searchRecord: MemberRequestSearchModel) => {
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
            emits('on-open-popup-search-member')
          }
        }
      "
    >
      <WelfareInputText
        size="small"
        inputType="text"
        class="wrap-input wf_w-full test"
        v-model="searchText"
        @keydown="($event) => handleKeyBackspaceResetValue($event, handleReset)"
        :placeholder="props.placeholderInput"
        :disabled="props.disabled || (!searchText && props.isDisabledOnEmptySearchText)"
      />
      <div class="wf-el-overlay" v-if="!searchText"></div>
    </div>
    <WelfareMdButton label="조회" buttonType="liner" buttonSize="small" @click="emits('on-open-popup-search-member')" :disabled="props.disabled" />
  </div>
</template>

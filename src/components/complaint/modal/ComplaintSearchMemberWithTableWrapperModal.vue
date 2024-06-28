<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { WelfareInputText, WelfareMdButton } from '@/components'
import { useComplaintMemberRequestModal } from '@/composables/complaint/modal/useComplaintMemberRequestModal'
import {
  ComplaintResearchMemberModel,
  ComplaintResearchMemberWrapperEmits,
  ComplaintResearchMemberWrapperProps
} from '@/models/views/complaint/modal/ComplainResearchMemberModel'
import { handleKeyBackspaceResetValue } from '@/common';

const { openModal, searchText, searchResData } = useComplaintMemberRequestModal()
interface ComplaintSearchMemberEmits extends ComplaintResearchMemberWrapperEmits {
  (e: 'on-open-popup-search-member'): void
}
const props = defineProps<ComplaintResearchMemberWrapperProps>()
const emits = defineEmits<ComplaintSearchMemberEmits>()
onMounted(() => {
  searchText.value = props.defaultValue ?? ''
})

watch(searchResData, (searchRes) => {
  searchRes && eventEmits.handleSelect(searchRes)
})

const handleResetForm = () => {
  searchText.value = ''
  searchResData.value = { memberKey: '', memberName: '' }
  eventEmits.handleSelect({} as ComplaintResearchMemberModel)
}

const handlePopupSearch = () => {
  openModal()
}

defineExpose({
  handleResetForm,
  handlePopupSearch
})

const eventEmits = {
  handleSelect: (searchRecord: ComplaintResearchMemberModel) => {
    emits('selectValue', searchRecord)
  }
}
</script>
<template>
  <div class="wf_flex wf_items-center wf-space-x-4">
    <div
      class="wf-search-input-wrapper wf_w-full"
      :class="{ 'wf-pointer': !props.disabled }"
      @click="!props.disabled && !searchText ? emits('on-open-popup-search-member') : ''"
    >
      <WelfareInputText
        size="small"
        inputType="text"
        class="wrap-input wf_w-full test"
        v-model="searchText"
        @keydown="($event) => handleKeyBackspaceResetValue($event, handleResetForm)"
        :placeholder="props.placeholderInput"
        :disabled="props.disabled"
      />
      <div class="wf-el-overlay" v-if="!searchText"></div>
    </div>
    <WelfareMdButton label="조회" buttonType="liner" buttonSize="small" @click="emits('on-open-popup-search-member')" :disabled="props.disabled" />
  </div>
</template>

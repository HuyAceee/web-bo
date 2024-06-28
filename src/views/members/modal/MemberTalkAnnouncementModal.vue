<!-- BO_B0301_020101_P -->
<script setup lang="ts">
import MemberBaseTableWrapperModal from '@/components/members/modal/MemberBaseTableWrapperModal.vue'
import { HeaderModal } from '@/components/widgets'
const emit = defineEmits(['onClose', 'onSave'])
</script>
<template>
  <div class="member-container-modal">
    <HeaderModal title="발송 등록" @close-modal="() => emit('onClose')" />
    <div class="member-container-modal-content">
      <MemberBaseTableWrapperModal
        :option-distribute-applications="true"
        :option-type-message="true"
        :option-method-shipping="true"
        :option-target-member="true"
        :option-is-used="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MemberTalkAnnouncementModal'
}
</script>

<style scoped>
@import url('@/assets/css/view/member/member-base-table-popup.css');
</style>

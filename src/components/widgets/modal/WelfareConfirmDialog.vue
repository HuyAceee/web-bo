<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { WelfareConfirmDialogEmits, WelfareConfirmDialogProps } from '@/models'
import { WelfareMdButton } from '@/components'
const props = defineProps<WelfareConfirmDialogProps>()
const emit = defineEmits<WelfareConfirmDialogEmits>()

const eventEmit = {
  updateVisible: (value: boolean) => {
    emit('update:visible', value)
  },
  confirmSuccess: (event: any) => {
    emit('confirm', event)
  }
}
</script>

<template>
  <div>
    <Dialog
      v-on="eventEmit"
      :style="{ width: '300px' }"
      :visible="visible"
      :show-header="false"
      :closable="false"
      :pt="{
        root: { class: `wf_container_confirm_dialog ` },
        header: { class: `wf_header_dialog--custom` },
        headerTitle: { class: `wf-sub_tit_01` },
        content: { class: `wf_content_confirm_dialog wf-body_02-reg` },
        footer: { class: `wf_footer_confirm_dialog` }
      }"
      modal
    >
      <slot name="title">
        <div v-if="props.title">
          {{ props.title }}
        </div>
      </slot>
      <template #footer>
        <di class="wf_footer_confirm_dialog--two wf-space-x-4">
          <WelfareMdButton label="취소" buttonType="cancel" class="button-custom" @click="eventEmit.updateVisible" />
          <WelfareMdButton label="확인" buttonType="default" class="button-custom" @click="eventEmit.confirmSuccess" />
        </di>
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
@import url('@/assets/css/widgets/modal/welfare-confirm-dialog.css');
</style>

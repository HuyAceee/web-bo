<script setup lang="ts">
import { WelfareDialogEmits, WelfareDialogProps } from '@/models'
import Dialog from 'primevue/dialog'
import { WelfareCloseIcon } from '@/components'
const props = defineProps<WelfareDialogProps>()

const { header, styleRoot, styleHeaderTitle, styleContent, styleFooter, styleHeaderIcon } = props

const emit = defineEmits<WelfareDialogEmits>()

const eventEmit = {
  updateVisible: (value: boolean) => {
    emit('update:visible', value)
  },
  afterHide: () => {
    emit('after-hide')
  }
}
</script>

<template>
  <div>
    <Dialog
      v-on="eventEmit"
      :modal="props.isModal"
      :header="header"
      :visible="visible"
      :draggable="false"
      :pt="{
        root: { class: `wf_container_dialog ${styleRoot}` },
        header: { class: `wf_header_dialog--custom wf-sub_tit_01 ${styleHeader}` },
        headerTitle: { class: `wf-sub_tit_01 ${styleHeaderTitle}` },
        content: { class: `wf_content_dialog ${styleContent}` },
        footer: { class: `wf_footer_dialog ${styleFooter}` },
        headerIcons: { class: `${styleHeaderIcon}` }
      }"
    >
      <template #closeicon>
        <WelfareCloseIcon :width="18" :height="18" @click="eventEmit.updateVisible" />
      </template>
      <slot></slot>

      <template #footer>
        <slot name="footer"></slot>
      </template>
    </Dialog>
  </div>
</template>

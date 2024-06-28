<script lang="ts" setup>
import { icCloseModal } from '@/assets'
import { handleDownloadFile } from '@/common/html'
import { WelfareMdButton } from '@/components'
import { useAdministratorManualUploadFile } from '@/composables'
import { ProductRegisterFileEmits, ProductRegisterFileProps } from '@/models'

type BulletinUploadFileProps = ProductRegisterFileProps & {
  documentsList: any[]
  onRemoveFile: (doc: any) => void
  isDownload?: boolean
  isHideButtonUpload?: boolean
  classFile?: string
}

const props = defineProps<BulletinUploadFileProps>()
const emits = defineEmits<ProductRegisterFileEmits>()
const { handleChooseFile } = useAdministratorManualUploadFile(props, emits)

function renderFileName(doc: any) {
  return `${doc?.name} (${(doc?.size / (1024 * 1024)).toFixed(1)}MB)`
}

function download(url: string) {
  handleDownloadFile(url)
}
</script>

<template>
  <div class="tn-bb-widget-file-upload-container">
    <div v-if="!props.isHideButtonUpload">
      <WelfareMdButton class="wf-bt-w-69" label="파일선택" buttonType="liner" @on-click="handleChooseFile" buttonSize="small" />
    </div>
    <div class="tn-bb-widget-file-upload-widget" v-for="doc in documentsList" :key="doc.url">
      <div class="tn-bb-widget-file-upload" :class="$props.classFile">
        <p class="wf-body_03-reg">{{ renderFileName(doc) }}</p>
        <img alt="icCloseModal" :src="icCloseModal" class="tn-bb-close_icon" @click="() => onRemoveFile(doc)" />
      </div>
      <WelfareMdButton
        v-if="props.isDownload"
        class="wf-bt-w-69"
        label="다운로드"
        buttonType="liner"
        @on-click="() => download(doc?.url)"
        buttonSize="small"
      />
    </div>
  </div>
</template>

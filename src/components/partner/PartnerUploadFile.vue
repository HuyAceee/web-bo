<script lang="ts" setup>
import { ProductSelectDefinitionType } from '@/models'
import { WelfareCloseIcon, WelfareMdButton } from '../uikit'
import { PartnerContractFileModel } from '@/models/views/partner/PartnerUploadFileModel'
import { useUploadFile } from '@/composables'
import { handleDownloadFile, handleDownloadFileBlob } from '@/common/html'
import { ref } from 'vue'
import { partnerContractInformationApi } from '@/services/api/partner/PartnerContractInformationApi'
import { PartnerAttachmentType } from '@/models/views/partner/PartnerSellerContractDetailModel'
import { formatFileNameSize } from '@/common/data'

interface PartnerUploadFileProps {
  document?: PartnerContractFileModel
  isDownload?: boolean
  definitionType: ProductSelectDefinitionType
  type?: PartnerAttachmentType
  index?: number
  isHideButtonUpload?: boolean
}

interface PartnerUploadFileEmits {
  (e: 'remove-file', definitionType: ProductSelectDefinitionType, index?: number): void
  (e: 'call-api', data: any, type?: PartnerAttachmentType, index?: number): void
}

const props = defineProps<PartnerUploadFileProps>()
const emits = defineEmits<PartnerUploadFileEmits>()

const { handleFileChange, handleValidFile } = useUploadFile()
const urlFile = ref<string>('')
const handleChooseFile = () => {
  handleFileChange('document', (data: any) => {
    handleValidFile(data.file, '', 'document', '', (data: any) => {
      if (data === 'ERROR') {
        return
      }
      if (data === 'ERROR') {
        return
      }
      urlFile.value = data.url
      if (data.file) {
        emits('call-api', data.file, props.type, props.index)
      }
    })
  })
}

function download(url: string, name: string) {
  if (props.document?.contractFileDownloadLink) {
    onClickDownloadFile(props.document.contractFileDownloadLink, props.document?.attachmentFileOriginName ?? '')
  } else {
    handleDownloadFile(url, name)
  }
}

const onClickDownloadFile = (link: string, fileName: string) => {
  const convertLink = link.replace('member/bo/', '')
  partnerContractInformationApi
    .downloadFile(convertLink)
    .then((res) => {
      const blob = new Blob([res as any], { type: res.type })
      handleDownloadFileBlob(blob, fileName)
    })
    .catch(() => {})
}
</script>

<template>
  <div v-if="!props.isHideButtonUpload">
    <WelfareMdButton @on-click="handleChooseFile" button-type="liner" button-size="small" label="파일선택" class="wf-bt-w-68" />
  </div>
  <div
    v-if="props.document?.attachmentId || props.document?.contractFileDownloadLink"
    class="wf-mt-10 wf_flex wf_flex-1 wf_items-center wf_w-full wf_justify-between"
  >
    <div class="wf-pl-12 wf-partner-file-ticket wf_flex wf_flex-1 wf_items-center wf_justify-between">
      <span>{{ formatFileNameSize(props.document?.attachmentFileOriginName, props.document?.attachmentFileSize ?? 0) }}</span>
      <WelfareCloseIcon @click="() => emits('remove-file', props.definitionType, props.index)" :width="10" :height="10" />
    </div>
    <WelfareMdButton
      v-if="!props.isDownload && (props.document?.attachmentId || props.document?.contractFileDownloadLink)"
      @on-click="() => download(urlFile, props.document?.attachmentFileOriginName ?? 'download')"
      class="wf-bt-w-69 wf-ml-6"
      label="다운로드"
      buttonType="liner"
      buttonSize="small"
    />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/partner/partner-seller-contract-detail.css');
</style>

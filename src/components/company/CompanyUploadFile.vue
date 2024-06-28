<script lang="ts" setup>
import { icCloseModal } from '@/assets'
import { formatFileNameSize } from '@/common/data'
import { handleDownloadFile } from '@/common/html'
import { WelfareMdButton } from '@/components'
import { useCompanyUploadHandleFile } from '@/composables/company/useCompanyUploadHandleFile'
import { ProductRegisterFileEmits, ProductRegisterFileProps } from '@/models'
import { CompanyFileTempModel } from '@/models/views/company/customerManagement/CompanyCustomerRegistrationModel'

type CompanyUploadFileProps = ProductRegisterFileProps & {
  documentsList: CompanyFileTempModel[]
  onRemoveFile: (doc: any) => void
  singleFile?: boolean
  notShowOneRemoveBtn?: boolean
  hideDownloadBtn?: boolean
}

const props = defineProps<CompanyUploadFileProps>()
const emits = defineEmits<ProductRegisterFileEmits>()
const { handleChooseFile } = useCompanyUploadHandleFile(props, emits)

function renderFileName(doc: CompanyFileTempModel) {
  return formatFileNameSize(doc?.name, doc?.size)
}

function download(url: string) {
  handleDownloadFile(url)
}
</script>

<template>
  <div class="tn-bb-widget-file-upload-container">
    <div class="tn-bb-widget-file-upload-widget" :class="$props.singleFile ? 'tn-bb-widget-file-upload-widget-single-file' : ''">
      <WelfareMdButton class="wf-bt-w-69" label="파일선택" buttonType="liner" @on-click="handleChooseFile" buttonSize="small" />
      <img
        v-if="$props.singleFile && documentsList.length && !$props.notShowOneRemoveBtn"
        alt="icCloseModal"
        :src="icCloseModal"
        class="tn-bb-close_icon"
        :class="$props.singleFile ? 'tn-bb-close-single-file_icon' : ''"
        @click="() => onRemoveFile(documentsList[0])"
      />
    </div>
    <div class="tn-bb-widget-file-upload-widget" v-for="doc in documentsList" :key="doc.url">
      <div class="tn-bb-widget-file-upload">
        <p class="wf-body_03-reg">{{ renderFileName(doc) }}</p>
        <img
          v-if="!$props.singleFile || $props.notShowOneRemoveBtn"
          alt="icCloseModal"
          :src="icCloseModal"
          class="tn-bb-close_icon"
          @click="() => onRemoveFile(doc)"
        />
      </div>
      <WelfareMdButton
        v-if="!$props.hideDownloadBtn"
        class="wf-bt-w-69"
        label="다운로드"
        buttonType="liner"
        @on-click="() => download(doc?.url)"
        buttonSize="small"
      />
    </div>
  </div>
</template>

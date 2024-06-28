<script setup lang="ts">
import { editorDataSourceRegex, editorParseBase64SrcImgRegex, editorParseDataRegex } from '@/common'
import { getImageUrlFrom } from '@/common/imageUtils'
import { WelfareEditorProps, WelfareEditorEmits } from '@/models'
import { productUploadAttachmentApi } from '@/services/api/products/ProductUploadAttachMentApi'
import Editor from 'primevue/editor'

withDefaults(defineProps<WelfareEditorProps>(), {
  editorStyle: 'min-height:320px'
})
const emit = defineEmits<WelfareEditorEmits>()

const uploadImage = async (blob?: Blob): Promise<string> => {
  try {
    const { data } = await productUploadAttachmentApi.uploadAttachFile(blob)
    return getImageUrlFrom({ dirFileName: data?.dirFileName })
  } catch (error) {
    return ''
  }
}

function dataUrlToImageFile(dataUrl: string) {
  const [, mimeType, data] = RegExp(editorParseBase64SrcImgRegex).exec(dataUrl) as RegExpExecArray

  const binaryData = atob(data)
  const uint8Array = new Uint8Array(binaryData.length)

  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i)
  }

  return new Blob([uint8Array], { type: mimeType })
}

const onChange = async (newValue: string) => {
  let returnValue = newValue
  const base64Datas = RegExp(editorDataSourceRegex).exec(newValue)

  if (base64Datas?.length) {
    for (let _ of base64Datas) {
      const parseData = RegExp(editorParseDataRegex).exec(_)
      const dataFile = parseData?.[0].slice(0, -1)
      const blob: Blob = dataUrlToImageFile(_)
      returnValue = returnValue.replace(`${dataFile}`, await uploadImage(blob))
    }
  }
  emit('update:modelValue', `${returnValue}`)
}
</script>

<template>
  <div class="wf_editor-wrapper">
    <div v-if="$props.disabled" class="wf_editor-overlay"></div>
    <Editor
      :model-value="`${$props.modelValue ?? ''}`"
      @update:model-value="onChange"
      :editor-style="$props.editorStyle"
      :placeholder="$props.placeholder"
      :readonly="$props.readonly"
    >
      <template v-slot:toolbar>
        <span class="ql-formats">
          <select class="ql-header" defaultValue="0"></select>
        </span>
        <span class="ql-formats">
          <select class="ql-font" defaultValue="0"></select>
        </span>
        <span class="ql-formats">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
        </span>
        <span class="ql-formats">
          <select class="ql-color"></select>
          <select class="ql-background"></select>
        </span>
        <span class="ql-formats">
          <button class="ql-list" value="ordered"></button>
          <button class="ql-list" value="bullet"></button>
          <select class="ql-align"></select>
        </span>
        <span class="ql-formats">
          <button class="ql-link"></button>
          <button class="ql-image"></button>
          <button class="ql-code-block"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-clean"></button>
        </span>
      </template>
    </Editor>
  </div>
</template>

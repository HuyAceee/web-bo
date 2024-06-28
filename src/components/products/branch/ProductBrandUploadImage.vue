<script setup lang="ts">
import { WelfareMdButton } from '@/components/uikit'
import { useModalConfirm, useModalNotification } from '@/composables'
import { useProductBranchUploadImage } from '@/composables/products/brand/useProductBrandUploadImage'
import { useRoute } from 'vue-router'

enum ETestCase {
  CANT_BE_MODIFIED = 'cant-be-modified'
}

const props = defineProps<{
  file: any
}>()

const emit = defineEmits<(e: 'update:file', value: any) => void>()

const route = useRoute()

const { openModal: openUploadImage } = useProductBranchUploadImage()
const { openModal: openConfirm } = useModalConfirm()
const { openModal: openNotification, closeModalByPop } = useModalNotification()

const handleOpenModal = () => {
  openUploadImage({ name: props.file?.file?.name, getFile: (value) => emit('update:file', value) })
}

const handleDeleteImage = () => {
  if (route.query?.testCase === ETestCase.CANT_BE_MODIFIED) {
    openNotification({
      content: '브랜드 저장 완료 후 수정만 가능합니다.'
    })
    return
  }

  openConfirm({
    content: '이미지를 삭제하시겠습니까?',
    onConfirm: () => {
      closeModalByPop?.()
      emit('update:file', '')
      openNotification({
        content: '이미지가 삭제되었습니다.'
      })
    }
  })
}
</script>

<template>
  <div class="wf-space-y-12">
    <div class="wf_flex wf_justify-end wf-space-x-4">
      <WelfareMdButton class="wf_w-55" label="등록" button-type="liner" button-size="small" @on-click="handleOpenModal" />
      <WelfareMdButton class="wf_w-55" label="삭제" button-type="liner" button-size="small" :disabled="!props.file" @on-click="handleDeleteImage" />
    </div>
    <div class="wf_h-296 wf-btn-border--ncc wf_br-6 wf-px-10 wf-py-10">
      <img v-if="!!$props.file?.url" class="wf_w-full wf_h-full" :src="$props.file?.url" alt="" />
    </div>
  </div>
</template>

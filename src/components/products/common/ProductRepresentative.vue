<script setup lang="ts">
import { WelfareInputText, WelfareMdButton, WelfareRadio } from '@/components/uikit'
import { ProductRepresentativeProps } from '@/models'
import { onMounted } from 'vue'
import ProductRepresentativeNotification from './ProductRepresentativeNotification.vue'
import { useProductScaleImage } from '@/composables/products/ticketProduct/baseInfo/useProductScaleImage'
import { useProductModalChangeImage } from '@/composables/products/ticketProduct/baseInfo/useProductModalChangeImage'
import { useProductDeleteFileModal } from '@/composables/products/ticketProduct/baseInfo/useProductDeleteFileModal'
import { useProductModalChangeVideo } from '@/composables/products/ticketProduct/baseInfo/useProductModalChangeVideo'
import { useProductRepresentative } from '@/composables/products/ticketProduct/baseInfo/useProductRepresentative'
import { useProductRegisterHandleFile } from '@/composables/products/ticketProduct/baseInfo/useProductRegisterHandleFile'
import ProductTableModal from '../modal/register/ProductTableModal.vue'
import { ProductAttachFileType } from '@/models/views/products/common/ProductTypeModel'

const props = withDefaults(defineProps<ProductRepresentativeProps>(), {
  typeFile: 'img'
})

onMounted(() => {
  useProductScaleImage()
})

interface ProductRepresentativeEmits {
  (e: 'deleteFile', data: any): void
  (e: 'changeIndex', type: string, value: number): void
}

defineEmits<ProductRepresentativeEmits>()

const { deleteFile, indexChange, getFile } = useProductRegisterHandleFile(props)
const { onShowModal } = useProductModalChangeImage()
const { onShowModalVideo } = useProductModalChangeVideo()
const { onShowModalDelete } = useProductDeleteFileModal(deleteFile)
const { imageChecked, onRegisterFileModal, disabledDeleteBtn } = useProductRepresentative(
  props,
  onShowModal,
  onShowModalVideo,
  onShowModalDelete,
  indexChange,
  getFile
)
</script>

<template>
  <div class="wf_wrapper-product-representative">
    <div class="wf-re-product-group-title">
      <p class="wf-sub_tit_01 wf__text-color--33">{{ $props.label }}</p>
    </div>
    <div class="wf_line"></div>
    <div class="wf_flex wf_flex-col wf-re-product-group--filter">
      <div class="wf_flex wf_flex-col wf-space-y-10">
        <div class="wf_flex wf-space-x-20">
          <div class="wf-body-popup--item wf_flex wf_flex-1 wf_flex-col wf-space-y-12">
            <ProductRepresentativeNotification
              :notifications="notifications"
              :custom-class="props.typeFile === 'video' ? 'wf-pl-19 wf-pt-19' : 'wf-pl-24'"
            />
            <div class="wf_re-product-table-create">
              <ProductTableModal :headers="props.headers">
                <template #table-body>
                  <div class="wf_modal-popup-table-row wf_flex" v-for="(row, index) in dataTable" :key="index">
                    <span class="wf-body_03-reg wf-pl-9 wf-pt-1">{{ index + 1 }}</span>
                    <WelfareRadio
                      v-if="props.typeFile === 'img'"
                      name="avatar"
                      size="sm"
                      :value="index"
                      v-model="imageChecked"
                      @update:model-value="$emit('changeIndex', ProductAttachFileType.IMAGE, imageChecked)"
                      :disabled="!row.url"
                    />

                    <span class="wf-body_03-reg wf_flex-1 wf_justify-start wf-pb-2 wf-pl-23 wf_underline">{{ row.name }}</span>
                    <div class="wf-space-x-4 wf-pt-1">
                      <WelfareMdButton label="등록" buttonType="liner" :button-size="'small'" @on-click="onRegisterFileModal(row.id as number)" />
                      <WelfareMdButton
                        label="삭제"
                        buttonType="liner"
                        :button-size="'small'"
                        :disabled="disabledDeleteBtn(index, row.url)"
                        @on-click="$emit('deleteFile', row)"
                      />
                    </div>
                  </div>
                </template>
              </ProductTableModal>
            </div>
          </div>
          <div class="wf-body-popup--item wf_flex wf_flex-1 wf_flex-col wf-space-y-12">
            <div
              class="wf_width-full wf-re-product-h-image wf_flex wf_justify-center"
              :class="{ ' wf-re-product-h-video': props.typeFile === 'video' }"
            >
              <img
                v-if="props.typeFile === 'img'"
                class="wf-re-product-active-image image_hover image-scale"
                alt=""
                :src="dataTable[imageChecked]?.url"
              />
              <video v-else controls alt="" :src="dataTable[imageChecked]?.url" />
            </div>

            <div class="wf_flex wf_flex-2 border-alt" v-if="props.typeFile === 'img'">
              <div
                class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-43 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf-m-w-150 wf_bg-bg-gray"
              >
                alt 텍스트
              </div>
              <div class="wf_flex wf_items-center wf_justify-start wf_h-43 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14 wf-tr-match-parent">
                <WelfareInputText
                  name=""
                  size="small"
                  placeholder="팝업에서 등록된 alt 텍스트가 노출됩니다."
                  class="wf_flex-1"
                  disabled
                  :model-value="dataTable[imageChecked]?.alt"
                />
              </div>
            </div>

            <div v-else class="wf_flex wf_flex-2 border-alt">
              <div
                class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-43 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf-m-w-150 wf_bg-bg-gray"
              >
                alt 텍스트
              </div>
              <div class="wf_flex wf_items-center wf_justify-start wf_h-43 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14 wf-tr-match-parent">
                <WelfareInputText
                  name=""
                  size="small"
                  placeholder="팝업에서 등록된 alt 텍스트가 노출됩니다."
                  class="wf_flex-1"
                  disabled
                  :model-value="dataTable[imageChecked]?.alt"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/ticketProduct/baseInfo');
@import url('@/assets/css/view/product/modal/register/product-modal-representative.css');
</style>

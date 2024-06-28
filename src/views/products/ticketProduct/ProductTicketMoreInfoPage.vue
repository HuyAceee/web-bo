<!-- BO_C0202_060101 -->
<script setup lang="ts">
import { headerRepresentative, headerRepresentativeVideo, notificationsImage, notificationsVideo } from '@/assets'
import ProductDescription from '@/components/products/common/ProductDescription.vue'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import { PRODUCT_TICKET_PRODUCT_LIST } from '@/common'
import ProductRepresentativeMedia from '@/components/products/common/ProductRepresentativeMedia.vue'
import { ProductTicketImageTableInformation, ProductTicketVideoTableInformation } from '@/models'
import { useProductTicketMoreInformation } from '@/composables/products/ticketProduct/moreInfo/useProductTicketMoreInformation'
const {
  changeValueField,
  handleCancel,
  handleSave,
  handleTemporary,
  handleApproval,
  handlePreview,
  dataImage,
  dataVideo,
  values,
  onUpdateNewImage,
  handleDeleteFile,
  updateIndexDataTableImage,
  isCheckOptionDesc
} = useProductTicketMoreInformation(PRODUCT_TICKET_PRODUCT_LIST, false, true)
</script>

<template>
  <ProductRepresentativeMedia
    class="wf-product-image-group"
    :data-table="dataImage"
    label="대표 이미지"
    :notifications="notificationsImage"
    :headers="headerRepresentative"
    :config-header="ProductTicketImageTableInformation"
    @delete-file="(data) => handleDeleteFile(data)"
    :params-call-back="PRODUCT_TICKET_PRODUCT_LIST"
    :on-update-new-image="onUpdateNewImage"
    @change-index="(type, value) => updateIndexDataTableImage(type, value)"
  />
  <ProductRepresentativeMedia
    class="wf-product-video-group"
    :data-table="dataVideo"
    label="동영상 등록"
    :config-header="ProductTicketVideoTableInformation"
    :notifications="notificationsVideo"
    :headers="headerRepresentativeVideo"
    type-file="video"
    @delete-file="(data) => handleDeleteFile(data)"
    :params-call-back="PRODUCT_TICKET_PRODUCT_LIST"
    :on-update-new-image="onUpdateNewImage"
  />
  <ProductDescription
    :description="values.description"
    :mobile-description="values.mobileDescription"
    :type="isCheckOptionDesc"
    @change-value-description="(value) => changeValueField('description', value)"
    @change-value-mobile-description="(value) => changeValueField('mobileDescription', value)"
    @change-value-option="(value) => changeValueField('type', value)"
  />
  <ProductBottomButton
    approval-disabled
    previewDisabled
    :temporary-visible="false"
    @on-cancel-click="handleCancel"
    @on-save-click="handleSave"
    @on-preview-click="handlePreview"
    @on-temporary-click="handleTemporary"
    @on-approval-click="handleApproval"
  />
</template>

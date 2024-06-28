<!-- BO_C0304_060101 -->
<script setup lang="ts">
import { headerRepresentative, headerRepresentativeVideo, notificationsImage, notificationsVideo } from '@/assets'
import { PRODUCT_APPROVAL_TICKET_PRODUCT_LIST } from '@/common'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import ProductDescription from '@/components/products/common/ProductDescription.vue'
import ProductRepresentativeMedia from '@/components/products/common/ProductRepresentativeMedia.vue'
import { useProductTicketMoreInformation } from '@/composables/products/ticketProduct/moreInfo/useProductTicketMoreInformation'
import { ProductTicketImageTableInformation, ProductTicketVideoTableInformation } from '@/models'

const {
  values,
  changeValueField,
  handleCancel,
  handleSave,
  openApprovalReject,
  openConfirmApproval,
  dataImage,
  dataVideo,
  handleDeleteFile,
  updateIndexDataTableImage,
  onUpdateNewImage,
  isCheckOptionDesc
} = useProductTicketMoreInformation(PRODUCT_APPROVAL_TICKET_PRODUCT_LIST, true, false)
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
    @change-index="(type, value) => updateIndexDataTableImage(type, value)"
    :on-update-new-image="onUpdateNewImage"
  />
  <ProductRepresentativeMedia
    class="wf-product-video-group"
    :data-table="dataVideo"
    label="동영상 등록"
    :notifications="notificationsVideo"
    :headers="headerRepresentativeVideo"
    type-file="video"
    @delete-file="(data) => handleDeleteFile(data)"
    :config-header="ProductTicketVideoTableInformation"
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
    v-if="values.lastProductProgressStatusCode === '01'"
    @on-cancel-click="handleCancel"
    @on-save-click="handleSave"
    previewDisabled
    temporaryDisabled
    approvalDisabled
  />
  <ProductBottomButton
    v-else
    @on-cancel-click="handleCancel"
    @on-approval-finished-click="openConfirmApproval"
    @on-approval-reject-click="openApprovalReject"
    @on-save-click="handleSave"
    previewDisabled
    temporaryDisabled
    :approval-finished="true"
  />
</template>

<!-- BO_C0202_020101 -->
<script setup lang="ts">
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import ProductExhibitionInfo from '@/components/products/deliveryProduct/exhibitionInfo/ProductExhibitionInfo.vue'
import { useProductExhibitionInfo } from '@/composables/products/exhibitionInfo/useProductExhibitionInfo'
import { PRODUCT_STATUS_ENUM, productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

const {
  values,
  refExhibition,
  handleChangeValueField,

  optionsStatus,
  handelAddCategory,
  handelDeleteCategory,

  openConfirmCancel,
  openNotificationSaveTemporary,
  openNotificationSave,
  openNotificationApproval,
  onChangeMDSearch,
  optionsSelectFirst,
  optionsSelectSecond,
  optionsSelectThird,
  onPreviewClick
} = useProductExhibitionInfo(productBaseInfoType.ticket)
</script>

<template>
  <div class="wf-space-y-30 wf-mb--2">
    <!-- 전시정보 - Exhibition information -->
    <div class="wf-mt--1">
      <ProductTitle title="전시정보" />
      <ProductExhibitionInfo
        ref="refExhibition"
        :radioGroupCategories="values.radioGroupCategories"
        :exhibitionStatus="values.exhibitionStatus"
        :devices="values.devices"
        :startTime="values.startTime"
        :endTime="values.endTime"
        :selectFirst="values.selectFirst"
        :selectSecond="values.selectSecond"
        :selectThird="values.selectThird"
        :exhibitionCategories="values.exhibitionCategories"
        :optionsStatus="optionsStatus"
        :optionsSelectFirst="optionsSelectFirst"
        :optionsSelectSecond="optionsSelectSecond"
        :optionsSelectThird="optionsSelectThird"
        :md="values.md"
        @onChangeRadioCategories="(value: number) => handleChangeValueField('radioGroupCategories', value)"
        @onChangeExhibitionStatus="(value) => handleChangeValueField('exhibitionStatus', value)"
        @onChangeSelectFirst="(value) => handleChangeValueField('selectFirst', value)"
        @onChangeSelectSecond="(value) => handleChangeValueField('selectSecond', value)"
        @onChangeSelectThird="(value) => handleChangeValueField('selectThird', value)"
        @handelAddCategory="handelAddCategory"
        @handelDeleteCategory="handelDeleteCategory"
        @onChangeStartTime="(value) => handleChangeValueField('startTime', value)"
        @onChangeEndTime="(value) => handleChangeValueField('endTime', value)"
        @onChangeDevices="(value) => handleChangeValueField('devices', value)"
        @onChangeMDSearch="onChangeMDSearch"
      />
    </div>

    <div class="">
      <!-- <ProductBottomButton
        :approval-disabled="true"
        :preview-disabled="false"
        :temporary-visible="false"
        @on-cancel-click="openConfirmCancel"
        @on-temporary-click="openNotificationSaveTemporary"
        @on-save-click="openNotificationSave"
        @on-approval-click="openNotificationApproval"
        @onPreviewClick="onPreviewClick"
      /> -->
      <ProductBottomButton
        v-if="
          (values.productCode || values.productRequestKey) &&
          values.lastProductProgressStatusCode === PRODUCT_STATUS_ENUM.PRODUCT_REGISTRATION_IN_PROGRESS
        "
        :preview-disabled="true"
        :save-disabled="false"
        :approvalDisabled="true"
        :temporary-disabled="true"
        :temporary-visible="false"
        @on-preview-click="onPreviewClick"
        @on-cancel-click="openConfirmCancel"
        @on-temporary-click="openNotificationSaveTemporary"
        @on-save-click="openNotificationSave"
        @on-approval-click="openNotificationApproval"
      />
      <ProductBottomButton
        v-else-if="(values.productCode || values.productRequestKey) && values.lastProductProgressStatusCode === PRODUCT_STATUS_ENUM.APPROVAL_PENDING"
        :approvalDisabled="true"
        :preview-disabled="true"
        :temporary-disabled="true"
        :temporary-visible="false"
        @on-preview-click="onPreviewClick"
        @on-cancel-click="openConfirmCancel"
        @on-temporary-click="openNotificationSaveTemporary"
        @on-save-click="openNotificationSave"
        @on-approval-click="openNotificationApproval"
      />
      <ProductBottomButton
        v-else-if="
          (values.productCode || values.productRequestKey) && values.lastProductProgressStatusCode === PRODUCT_STATUS_ENUM.APPROVAL_COMPLETED
        "
        :approvalDisabled="true"
        :preview-disabled="true"
        :temporary-disabled="true"
        :temporary-visible="false"
        @on-preview-click="onPreviewClick"
        @on-cancel-click="openConfirmCancel"
        @on-temporary-click="openNotificationSaveTemporary"
        @on-save-click="openNotificationSave"
        @on-approval-click="openNotificationApproval"
      />
      <ProductBottomButton
        v-else
        :approvalDisabled="true"
        :preview-disabled="true"
        :temporary-visible="false"
        @on-preview-click="onPreviewClick"
        @on-cancel-click="openConfirmCancel"
        @on-temporary-click="openNotificationSaveTemporary"
        @on-save-click="openNotificationSave"
        @on-approval-click="openNotificationApproval"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DeliveryProductExhibitionInfo'
}
</script>

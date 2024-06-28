<!-- BO_C0304_020101 -->
<script setup lang="ts">
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import { useProductExhibitionInfo } from '@/composables/products/exhibitionInfo/useProductExhibitionInfo'
import ProductExhibitionInfo from '@/components/products/deliveryProduct/exhibitionInfo/ProductExhibitionInfo.vue'
import { productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

const {
  values,
  refExhibition,
  handleChangeValueField,
  optionsStatus,
  optionsSelectFirst,
  optionsSelectSecond,
  optionsSelectThird,
  handelAddCategory,
  handelDeleteCategory,
  onChangeMDSearch,
  openConfirmCancel,
  // openConfirmApproval,
  // openConfirmApprovalReject,
  // openNotificationSaveTemporary,
  openNotificationSave,
  // openNotificationApproval,
  // onPreviewClick
  handleRefuseApprovalByIdAction,
  handleApprovalByIdAction
} = useProductExhibitionInfo(productBaseInfoType.approval_ticket)
</script>

<template>
  <div class="wf-space-y-30">
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
      <ProductBottomButton
        v-if="values.lastProductProgressStatusCode === '01'"
        @on-cancel-click="openConfirmCancel"
        @on-save-click="openNotificationSave"
        previewDisabled
        temporaryDisabled
        approvalDisabled
      />
      <ProductBottomButton
        v-else
        @on-cancel-click="openConfirmCancel"
        @on-approval-finished-click="handleApprovalByIdAction"
        @on-approval-reject-click="handleRefuseApprovalByIdAction"
        @on-save-click="openNotificationSave"
        previewDisabled
        temporaryDisabled
        :save-disabled="true"
        :approval-finished="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProductTicketApprovalExhibitionInfoPage'
}
</script>

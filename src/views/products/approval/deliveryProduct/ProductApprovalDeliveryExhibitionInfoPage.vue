<!-- BO_C0302_020101 -->
<script setup lang="ts">
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import { useProductExhibitionInfo } from '@/composables/products/exhibitionInfo/useProductExhibitionInfo'
import { WelfareSelectOptionType } from '@/models'
import ProductExhibitionInfo from '@/components/products/deliveryProduct/exhibitionInfo/ProductExhibitionInfo.vue'
import { productApprovalStatus, productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

const optionsSelectFirst: WelfareSelectOptionType[] = [
  { label: '식품', value: '1' },
  { label: '생활/주방', value: '2' },
  { label: '패션', value: '3' },
  { label: '뷰티/잡화', value: '4' },
  { label: '가구', value: '5' },
  { label: '가전', value: '6' }
]

const optionsSelectSecond: WelfareSelectOptionType[] = [
  { label: '가공/즉석식품', value: '1' },
  { label: '가루/조미료/향신료', value: '2' },
  { label: '건강식품', value: '3' },
  { label: '냉장/냉동식품', value: '4' },
  { label: '생수/음료', value: '5' },
  { label: '스낵/간식', value: '6' }
]

const optionsSelectThird: WelfareSelectOptionType[] = [
  { label: '영양식', value: '1' },
  { label: '영양제', value: '2' },
  { label: '전통건강식품', value: '3' },
  { label: '헬스/다이어트식품', value: '4' }
]

const {
  values,
  refExhibition,
  handleChangeValueField,
  optionsStatus,
  handelAddCategory,
  handelDeleteCategory,
  onChangeMDSearch,

  openConfirmCancel,
  openNotificationSaveTemporary,
  openNotificationSave,
  openNotificationApproval,
  handleApproval,
  handleReject
} = useProductExhibitionInfo(productBaseInfoType.approval_delivery)
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
      <ProductBottomButton
        @on-cancel-click="openConfirmCancel"
        @on-temporary-click="openNotificationSaveTemporary"
        @on-save-click="openNotificationSave"
        @on-approval-click="openNotificationApproval"
        :approvalDisabled="values.productStatus === productApprovalStatus.awaitingApproval || values.productStatus === '-'"
        :previewDisabled="values.productStatus !== productApprovalStatus.approvalCompleted"
        save-disabled
        temporary-disabled
        :approval-visible="false"
        approval-finished
        @on-approval-finished-click="handleApproval"
        @on-approval-reject-click="handleReject"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProductDeliveryExhibitionInfoPage'
}
</script>

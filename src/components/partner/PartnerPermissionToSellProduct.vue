<script setup lang="ts">
import { usePartnerPermissionToSellProduct } from '@/composables/partner/usePartnerPermissionToSellProduct'
import WelfareRadioGroup from '../uikit/radio/WelfareRadioGroup.vue'
import { WelfareSelect } from '../uikit'
import WelfareMdButton from '../uikit/button/WelfareMdButton.vue'
import { PartnerPermissionToSellItemModel } from '@/models/views/partner/PartnerListModel'
import BulletinUploadFile from '../bulletin/detail-create/BulletinUploadFile.vue'
import { YnOptions } from '@/models'

interface PartnerPermissionToSellProductProps {
  permissionProduct: YnOptions
  listPermissionProduct: PartnerPermissionToSellItemModel[]
}

export interface PartnerPermissionToSellProductEmits {
  (e: 'on-change', value: PartnerPermissionToSellItemModel[]): void
  (e: 'update-permission-product', value: YnOptions): void
}

const props = defineProps<PartnerPermissionToSellProductProps>()
const emit = defineEmits<PartnerPermissionToSellProductEmits>()

const {
  isDisableAddNew,
  permissionOptions,
  selectProductGroupOptions,
  permissions,
  handleSetProductGroup,
  handleDelete,
  handleAddNew,
  getFile,
  onRemoveFile
} = usePartnerPermissionToSellProduct(props.listPermissionProduct, emit)
</script>

<template>
  <div class="wf_flex wf_flex-col wf-space-y-12 wf-pt-4 wf-pb-6 wf_w-full">
    <div class="wf_flex wf-space-x-10 wf_items-center">
      <WelfareRadioGroup
        :model-value="props.permissionProduct"
        @update:model-value="(value) => emit('update-permission-product', value)"
        :options="permissionOptions"
        name="permissionToSellProduct"
        size="sm"
      />
      <span class="wf-body_04-reg wf_text-sub-01"
        >※ 하기 상품 판매사는 판매권한 신청 후 서류 제출을 완료해야 상품 판매가 가능합니다. (미신청 시 관련 카테고리 비노출)</span
      >
    </div>
    <div class="wf_flex wf_flex-col wf-space-y-10 wf_w-full" v-for="(item, index) in permissions" :key="index + item.id">
      <div class="wf_flex wf-space-x-10 wf_items-center">
        <WelfareSelect
          :disabled="props.permissionProduct === YnOptions.N"
          class="wf_m-w-180"
          optionLabel="label"
          option-value="value"
          small
          placeholder="판매 카테고리 선택"
          :options="selectProductGroupOptions"
          :model-value="item.productGroup"
          @update:modelValue="(value) => handleSetProductGroup(index, value)"
        />
        <div class="wf_flex wf_items-center wf-space-x-4" v-if="props.permissionProduct === YnOptions.Y">
          <WelfareMdButton
            class=""
            label="삭제"
            :disabled="permissions.length === 1"
            buttonType="liner"
            @on-click="() => handleDelete(index)"
            buttonSize="small"
          />
          <WelfareMdButton
            class=""
            label="추가"
            :disabled="index < permissions.length - 1 || isDisableAddNew"
            buttonType="default"
            @on-click="handleAddNew"
            buttonSize="small"
          />
        </div>
      </div>
      <BulletinUploadFile
        v-if="props.permissionProduct === YnOptions.Y && item.productGroup"
        :is-hide-button-upload="!!item.file"
        :documents-list="item.file ? [item.file] : []"
        @get-file="(value) => getFile(index, value)"
        :on-remove-file="() => onRemoveFile(index)"
        :is-download="true"
      />
    </div>
  </div>
</template>

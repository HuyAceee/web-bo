<script setup lang="ts">
import { WelfareEditor, WelfareRadioGroup } from '@/components/uikit'
import { WelfareRadioProps } from '@/models/uikit'
import { reactive, ref } from 'vue'
import {ProductTicketMoreInformationTypeDescription} from '@/models/views/products'
const options = reactive<WelfareRadioProps[]>([
  { label: '전체', value: '01'},
  { label: 'PC', value: '02' }
])
interface ProductDescriptionEmits {
  (e: 'changeValueDescription', value: any): void
  (e: 'changeValueMobileDescription', value: any): void
  (e: 'changeValueOption', value: boolean): void
}

interface ProductDescriptionProps {
  type?: string
  description?: string
  mobileDescription?: string
}

const emit = defineEmits<ProductDescriptionEmits>()

const props = defineProps<ProductDescriptionProps>()
const ratioOption = ref(props.type)

</script>
<template>
  <div class="wf-re-product-bottom-line wf-product-description">
    <div class="wf-product-description-title">
      <p class="wf-sub_tit_01 wf__text-color--33">상품 상세 설명</p>
    </div>

    <div class="wf-product-description-table">
      <div class="wf-product-description-content wf_flex wf_flex-col wf-re-product-group--filter">
        <div class="wf_flex">
          <div class="wf-product-description-content_title wf-body_02-semi">
            <span>전시채널</span>
            <span class="required">&nbsp;*</span>
          </div>

          <div class="wf-product-description-content-bl">
            <div class="wf-product-description-content_option wf_flex wf-space-x-20">
              <div class="wf_flex wf-space-x-6">
                <WelfareRadioGroup
                  size="sm"
                  v-model="ratioOption"
                  :options="options"
                  @update:model-value="(value) => emit('changeValueOption', value)"
                />
                <span class="required wf-body_04-reg">*전체 선택 시 PC 상품상세 설명이 모바일에 자동으로 노출 됩니다.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- PC -->
      <div class="wf-product-description-content wf-product-description-content--twice wf_flex wf_flex-col wf-re-product-group--filter">
        <div class="wf_flex">
          <div class="wf-product-description-content_title wf-body_02-semi">
            <span>PC<span class="required">&nbsp;*</span></span>
          </div>
          <div class="wf-product-description-content-bl">
            <div class="wf-product-description-content_option wf-space-x-20 wf-product-description-content_option--min-h380px">
              <WelfareEditor :model-value="props.description" @update:model-value="(value) => emit('changeValueDescription', value)" />
            </div>
          </div>
        </div>
      </div>
      <!-- Mobile -->
      <div class="wf-product-description-content wf-product-description-content--twice wf_flex wf_flex-col wf-re-product-group--filter">
        <div class="wf_flex">
          <div class="wf-product-description-content_title wf-body_02-semi">
            <span>모바일</span>
          </div>

          <div class="wf-product-description-content-bl">
            <div class="wf-product-description-content_option wf-space-x-20 wf-product-description-content_option--min-h380px">
              <WelfareEditor
                :disabled="ratioOption === ProductTicketMoreInformationTypeDescription.ALL"
                :model-value="props.mobileDescription"
                @update:model-value="(value) => emit('changeValueMobileDescription', value)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

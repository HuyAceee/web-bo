<script setup lang="ts">
import { TextInputMaxLengthValidation, WelfareRadioGroup, WelfareSelect, TextareaMaxLength } from '@/components'
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import ProductBrandUploadImage from './ProductBrandUploadImage.vue'

export interface ProductBrandBaseInfoProps {
  name: any
  code: string
  description: string
  detailDescription: string
  category: any
  categoryOptions: any[]
  pcBanner: any
  pcThumbnail: any
  mobileBanner: any
  mobileThumbnail: any
  exhibition: any
  exhibitionOptions: any[]
}

interface ProductBrandBaseInfoEmits {
  (e: 'update:name', value: any): void
  (e: 'update:description', value: any): void
  (e: 'update:detailDescription', value: any): void
  (e: 'update:category', value: any): void
  (e: 'update:pcBanner', value: any): void
  (e: 'update:pcThumbnail', value: any): void
  (e: 'update:mobileBanner', value: any): void
  (e: 'update:mobileThumbnail', value: any): void
  (e: 'update:exhibition', value: any): void
}
defineProps<ProductBrandBaseInfoProps>()
defineEmits<ProductBrandBaseInfoEmits>()
</script>

<template>
  <div class="wf-space-y-20">
    <ProductTitle title="기본 정보" />
    <div class="wf-btn-border--ncc wf_br-6">
      <div class="wf_flex wf_h-44 wf-btn-border-b--ncc">
        <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf_br-tl--6 wf-pb-1">
          <span class="wf-body_02-semi wf_text-n-33">브랜드 명 <span class="wf_text-sub-01">*</span></span>
        </div>
        <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
          <div class="wf_w-180 wf-ml--1">
            <TextInputMaxLengthValidation
              :model-value="$props.name"
              @update:model-value="(value) => $emit('update:name', value)"
              size="small"
              placeholder="한글기준 30자 이내로 입력"
              :max-length="30"
            />
          </div>
        </div>
        <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf-btn-border-l--ncc wf_bg-bg-gray wf-pb-1">
          <span class="wf-body_02-semi wf_text-n-33">브랜드 코드</span>
        </div>
        <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">{{ $props.code }}</div>
        <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf-btn-border-l--ncc wf_bg-bg-gray wf-pb-1">
          <span class="wf-body_02-semi wf_text-n-33">카테고리 <span class="wf_text-sub-01">*</span></span>
        </div>
        <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
          <div class="wf_w-180">
            <WelfareSelect
              :model-value="$props.category"
              @update:model-value="(value) => $emit('update:category', value)"
              :options="$props.categoryOptions"
              option-label="label"
              small
              disabled
              placeholder="전체"
            />
          </div>
        </div>
      </div>
      <div class="wf_flex wf_h-44 wf-btn-border-b--ncc">
        <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf-pb-1">
          <span class="wf-body_02-semi wf_text-n-33">한줄 설명 <span class="wf_text-sub-01">*</span></span>
        </div>
        <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
          <div class="wf_w-full wf-mx--1">
            <TextInputMaxLengthValidation
              :model-value="$props.description"
              @update:model-value="(value) => $emit('update:description', value)"
              placeholder="한글기준 30자 이내로 입력"
              size="small"
              :max-length="30"
            />
          </div>
        </div>
      </div>
      <div class="wf_flex wf_h-150">
        <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf_br-bl--6 wf-pb-1">
          <span class="wf-body_02-semi wf_text-n-33">상세 설명 <span class="wf_text-sub-01">*</span></span>
        </div>
        <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
          <div class="wf_w-full wf-mx--1">
            <TextareaMaxLength
              :model-value="$props.detailDescription"
              @update:model-value="(value) => $emit('update:detailDescription', value)"
              placeholder="한글기준 125자 이내로 입력"
              class="wf_i-h-120"
              :label-bottom-left="' '"
              :label-bottom-right="`${$props.detailDescription.length}/125bytes`"
              :max-length="125"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="wf-space-y-12">
      <div class="wf_flex wf_justify-end">
        <p class="wf-body_03-reg wf_text-sub-01 wf-mr-2">이미지 형식: jpg, gif, png / 사이즈: 1200x000px / 용량: 5MB 이하</p>
      </div>

      <div class="wf-btn-border--ncc wf_br-6">
        <div class="wf_flex wf_h-362 wf-btn-border-b--ncc">
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf_br-tl--6 wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">PC 배너 <span class="wf_text-sub-01">*</span></span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-full wf-mx--1">
              <ProductBrandUploadImage :file="$props.pcBanner" @update:file="(value) => $emit('update:pcBanner', value)" />
            </div>
          </div>
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf-btn-border-l--ncc wf_bg-bg-gray wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">PC 썸네일 <span class="wf_text-sub-01">*</span></span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-full wf-mx--1">
              <ProductBrandUploadImage :file="$props.pcThumbnail" @update:file="(value) => $emit('update:pcThumbnail', value)" />
            </div>
          </div>
        </div>
        <div class="wf_flex wf_h-362 wf-btn-border-b--ncc">
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">모바일 배너 <span class="wf_text-sub-01">*</span></span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-full wf-mx--1">
              <ProductBrandUploadImage :file="$props.mobileBanner" @update:file="(value) => $emit('update:mobileBanner', value)" />
            </div>
          </div>
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf-btn-border-l--ncc wf_bg-bg-gray wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">모바일 썸네일 <span class="wf_text-sub-01">*</span></span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-full wf-mx--1">
              <ProductBrandUploadImage :file="$props.mobileThumbnail" @update:file="(value) => $emit('update:mobileThumbnail', value)" />
            </div>
          </div>
        </div>
        <div class="wf_flex wf_h-42">
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf_br-bl--6 wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">전시 여부 <span class="wf_text-sub-01">*</span></span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-full wf-mx--1">
              <WelfareRadioGroup
                :model-value="$props.exhibition"
                @update:model-value="(value) => $emit('update:exhibition', value)"
                :options="$props.exhibitionOptions"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

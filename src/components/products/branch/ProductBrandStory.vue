<script setup lang="ts">
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import { WelfareEditor, WelfareRadioGroup } from '@/components/uikit'

export interface ProductBrandStoryProps {
  editorOptions: any[]
  editor: any
  pcHtml: any
  mobileHtml: any
}
interface ProductBrandStoryEmits {
  (e: 'update:editor', value: any): void
  (e: 'update:pcHtml', value: any): void
  (e: 'update:mobileHtml', value: any): void
}
defineProps<ProductBrandStoryProps>()
defineEmits<ProductBrandStoryEmits>()
</script>

<template>
  <div class="wf-space-y-20">
    <ProductTitle title="브랜드 스토리" />
    <div class="wf-btn-border--ncc wf_br-6">
      <div class="wf_flex wf_h-44 wf-btn-border-b--ncc">
        <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf_br-tl--6 wf-pb-1">
          <span class="wf-body_02-semi wf_text-n-33">전시채널 <span class="wf_text-sub-01">*</span></span>
        </div>
        <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
          <div class="wf_w-full wf-mx--1 wf_flex wf_items-center wf-space-x-6">
            <WelfareRadioGroup
              :model-value="$props.editor"
              @update:model-value="(value) => $emit('update:editor', value)"
              :options="$props.editorOptions"
              size="sm"
            />
            <p class="wf-body_04-reg wf_text-sub-01">*전체 선택 시 PC 브랜드 스토리가 모바일에 자동으로 노출됩니다.</p>
          </div>
        </div>
      </div>
      <div class="wf_flex wf_h-614 wf-btn-border-b--ncc">
        <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf-pb-1">
          <span class="wf-body_02-semi wf_text-n-33">PC <span class="wf_text-sub-01">*</span></span>
        </div>
        <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
          <div class="wf_w-full wf_h-full wf-mx--1 wf-py-7">
            <WelfareEditor :model-value="$props.pcHtml" @update:model-value="(value) => $emit('update:pcHtml', value)" />
          </div>
        </div>
      </div>
      <div class="wf_flex wf_h-612">
        <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf_br-bl--6 wf-pb-1">
          <span class="wf-body_02-semi wf_text-n-33">모바일</span>
        </div>
        <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
          <div class="wf_w-full wf_h-full wf-mx--1 wf-py-7">
            <WelfareEditor
              :model-value="$props.mobileHtml"
              @update:model-value="(value) => $emit('update:mobileHtml', value)"
              :disabled="$props.editor === editorOptions[0].value"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { WelfareBigButton } from '@/components'
import ProductBrandBaseInfo from '@/components/products/branch/ProductBrandBaseInfo.vue'
import ProductBrandStory from '@/components/products/branch/ProductBrandStory.vue'
import { useProductBrandRegistration } from '@/composables/products/brand/useProductBrandRegistration'
const { categoryOptions, exhibitionOptions, editorOptions, query, onSave } = useProductBrandRegistration()
</script>

<template>
  <div class="wf-py-30 wf-px-30 wf-space-y-30">
    <ProductBrandBaseInfo
      :category-options="categoryOptions"
      :exhibitionOptions="exhibitionOptions"
      :code="query.code"
      v-model:name="query.name"
      v-model:category="query.category"
      v-model:description="query.description"
      v-model:detail-description="query.detailDescription"
      v-model:pcBanner="query.pcBanner"
      v-model:pcThumbnail="query.pcThumbnail"
      v-model:mobileBanner="query.mobileBanner"
      v-model:mobileThumbnail="query.mobileThumbnail"
      v-model:exhibition="query.exhibition"
    />
    <ProductBrandStory
      :editorOptions="editorOptions"
      v-model:editor="query.editor"
      v-model:pc-html="query.pcHtml"
      v-model:mobile-html="query.mobileHtml"
    />
    <div class="wf_flex wf_justify-center wf-space-x-20">
      <WelfareBigButton button-type="cancel" label="취소" />
      <WelfareBigButton button-type="default" label="저장" @on-click="onSave" />
    </div>
  </div>
</template>

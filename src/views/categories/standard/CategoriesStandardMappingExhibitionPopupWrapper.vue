<!-- BO_D0103_020201_P/BO_D0103_020101_P -->
<script setup lang="ts">
import { useCategoriesStandardMappingExhibitionPopup } from '@/composables/categories/useCategoriesStandardMappingExhibitionPopup'
import { useCategoriesStandardSelectExhibitionPopup } from '@/composables/categories/useCategoriesStandardSelectExhibitionPopup'

const { openModal } = useCategoriesStandardMappingExhibitionPopup()
const { openModal: openModalSelect } = useCategoriesStandardSelectExhibitionPopup()
</script>

<template>
  <div class="wf_flex wf_items-center wf-space-x-4">
    <button @click="openModal">open BO_D0103_020101_P</button>
    <button @click="openModalSelect">open BO_D0103_020101_P</button>
  </div>
</template>

<script setup lang="ts">
import ExhibitionTitle from '@/components/exhibition/common/ExhibitionTitle.vue';
import ExhibitionHallMngtCategoryGroupTable from '@/components/exhibition/exhibitionContent/ExhibitionHallMngtCategoryGroupTable.vue';
import { CommonTable, CommonTableContentCell, CommonTableRow, CommonTableTitleCell } from '@/components/uikit';

interface Props {
  data: any
}

defineProps<Props>()
</script>

<template>
  <div>
    <div>
      <ExhibitionTitle title="카테고리 전시 기본 정보" />
      <CommonTable class="wf-mt-12">
        <CommonTableRow>
          <CommonTableTitleCell title="고객사 코드" is-first-col />
          <CommonTableContentCell :text="$props.data?.customerCode" />
          <CommonTableTitleCell title="고객사" />
          <CommonTableContentCell :text="$props.data?.customerName" />
        </CommonTableRow>
        <CommonTableRow height="42" is-last-row>
          <CommonTableTitleCell title="전시관 카테고리 코드" is-first-col />
          <CommonTableContentCell :text="$props.data?.hallCode" />
          <CommonTableTitleCell title="전시관 카테고리" />
          <CommonTableContentCell :text="$props.data?.hallName" />
        </CommonTableRow>
      </CommonTable>
    </div>
    <div class="wf-mt-20">
      <ExhibitionHallMngtCategoryGroupTable v-bind="{}" />
    </div>
  </div>
</template>

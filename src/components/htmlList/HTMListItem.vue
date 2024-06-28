<script setup lang="ts">
import { HTMLListModel } from '@/models/htmlList/HTMLListModel'
import HTMListTitle from './HTMListTitle.vue'
export type HTMListItemProps = HTMLListModel
const props = defineProps<HTMListItemProps>()
</script>
<template>
  <HTMListTitle :title="props.title" />
  <table class="wf-table-container" aria-hidden="true">
    <caption></caption>
    <tr class="wf-tr-match-parent" v-for="(item, index) in props.contents" :key="index">
      <td class="wf-td-id">{{ index + 1 }}</td>
      <td class="wf-td-description wf-td-space">{{ item.title }}</td>
      <td class="wf-td-link wf-td-space">
        <router-link :to="item.link">{{ item.description }}</router-link>
        <div class="wf-td-link__history">{{ item.history }}</div>
      </td>
    </tr>
  </table>
</template>
<style scoped>
@import url('@/assets/css/welfare-html-list.css');
</style>

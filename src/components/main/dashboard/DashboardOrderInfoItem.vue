<script setup lang="ts">
import { WelfareBigButton } from '@/components'
import { ref } from 'vue';
interface DashboardOrderInfoItemProps {
  data: {
    title: string,
    value: string
  }[][]
}

const props = defineProps<DashboardOrderInfoItemProps>()

const buttons = ["총계", "일반", "상품권", "설치"]
const activeRow = ref(0)

const handleChangeActiveRow = (index: number) => {
  activeRow.value = index
}

const getActiveClass = (index: number) => {
  return index == activeRow.value ? 'wf-active' : ''
}
</script>

<template>
  <div
    class="wf-dashboard-order-info-item wf-ml--2 wf-pr-4 wf-pt-1 wf_flex-col wf_items-start wf_align-self-stretch wf-space-y-20"
  >
    <div class="wf-item-right-content-sheet wf_flex wf_items-start wf_align-self-stretch wf-space-x-16">
      <div
        class="wf-mt--2 wf-item-right-content-sheet_button wf-item-right-content-sheet_button-1 wf_flex wf_flex-col wf_items-start wf_align-self-stretch"
      >
        <div 
          v-for="(item, index) in buttons" v-bind:key="index"
          class="wf-item wf_flex wf_justify-center wf_items-center wf-space-x-12"
          :class="getActiveClass(index)"
          @click="() => handleChangeActiveRow(index)"
        >
          <span class="wf-body_03-semi">{{item}}</span>
        </div>
      </div>

      <div
        class="wf-mt--2 wf-item-right-content-sheet_row wf-item-right-content-sheet_row-1 wf_flex-1-0-0 wf_flex wf_flex-col wf_items-start wf-space-y-8"
      >
        <div v-for="(item, parentIndex) in props.data" v-bind:key="parentIndex"
          id="wf-item-right-content-sheet_button-1-content"
          class="wf-item wf_flex wf_items-start wf_align-self-stretch wf-space-x-20 wf-item-right-content-sheet_row-item"
          :class="getActiveClass(parentIndex)"
        >
          <div  v-for="(itemChild, childIndex) in item" v-bind:key="childIndex"
            class="wf-item-item wf_flex wf_items-center wf_justify-center wf_flex-1 wf-space-x-8">
            <span class="wf-text wf-body_03-mid">{{itemChild.title}}</span>
            <h6 class="wf-number">{{itemChild.value}}</h6>
          </div>
        </div>
      </div>
    </div>
    <WelfareBigButton label="더보기" buttonType="neatral" class="wf_button--ml wf-width-full"/>
  </div>
</template>



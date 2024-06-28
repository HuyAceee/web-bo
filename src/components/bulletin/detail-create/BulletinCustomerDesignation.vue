<script lang="ts" setup>
import { BulletinFilterGroupRadio, WelfareMdButton, WelfareTag } from '@/components'
import { WelfareTNRadioGroupProps } from '../common/BulletinFilterGroupRadio.vue';


interface Option {
  name: string
  value: string
  label: string
}

interface TNCustomerDesignationProps extends WelfareTNRadioGroupProps {
  options: Option[]
  onOpenSearchCustomer: () => void
  customerList: [string]
  handleRemoveTag: (keyword: string) => void
}

const props = defineProps<TNCustomerDesignationProps>()

const disableBtn = () => {
  return props.modelValue === '공통'
}
</script>

<template>
  <div class="tn-customer-designation-container">
    <div class="tn-customer-designation-widget wf_items-center">
      <BulletinFilterGroupRadio :options="options" :model-value="modelValue" :on-change="onChange" />
      <WelfareMdButton class="tn-bb-button-h_30" label="고객사 불러오기" buttonType="liner" :disabled="disableBtn()" @click="onOpenSearchCustomer"/>
    </div>
    <div class="tn-customer-sl-list" v-if="modelValue !== '공통'">
      <WelfareTag
            v-for="(keyword, idx) in customerList"
            v-bind:key="idx + keyword"
            @iconClick="() => handleRemoveTag(keyword)"
            >{{ keyword }}</WelfareTag
          ></div>
  </div>
</template>

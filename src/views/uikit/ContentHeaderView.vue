<script setup lang="ts">
import { WelfareContentHeader } from '@/components'
// import { defaultColor } from '@/common/color'
// import { IconReload } from '@/components/icons'

const headerProps = {
  paths: [
    {
      path: '',
      name: '홈'
    },
    {
      path: '#',
      name: '배송 상품'
    },
    {
      path: '#',
      name: '배송 상품 대량'
    },
    {
      path: '#',
      name: '배송 상품 대량 등록'
    }
  ],
  title: '판매사 상세',
  active: true
  // isBigHeader: true
}
</script>

<template>
  <div class="wf_container wf_container-flex">
    <WelfareContentHeader v-bind="headerProps" />
  </div>
</template>

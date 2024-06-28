<script setup lang="ts">
import { ProductWarningModel } from '@/models'

interface Props {
  notifications: ProductWarningModel[]
  customClass: string
}
const { notifications, customClass } = defineProps<Props>()
</script>

<template>
  <div class="wf_rep-notification" :class="{ [customClass]: customClass }">
    <div class="wf_rep-notification--item" v-for="notification in notifications" :key="notification.label">
      <div class="wf-body_03-mid">{{ notification.label }}</div>
      <div class="wf-body_04-reg wf_rep-notification--content-row" v-for="content in notification.contentList" :key="content">
        <div class="wf_dot"></div>
        {{ content }}
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/ticketProduct/baseInfo');
</style>

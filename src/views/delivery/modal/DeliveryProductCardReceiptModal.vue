<!-- BO_E0208_140201_P -->
<script setup lang="ts">
import DeliveryProductReceiptModal from '@/components/delivery/modal/DeliveryProductReceiptModal.vue'
import { DeliveryProductCardReceiptConfigs } from '@/models/views/delivery/modal/DeliveryProductCardReceiptModel'

interface DeliveryProductCardReceiptProps {
  id: number | string
  onCancel?: () => void
}

defineProps<DeliveryProductCardReceiptProps>()
</script>

<template>
  <DeliveryProductReceiptModal header-title="신용카드 전표" :on-cancel="$props.onCancel" :table-configs="DeliveryProductCardReceiptConfigs" />
</template>

<!-- BO_E0208_140301_P -->
<script setup lang="ts">
import DeliveryProductReceiptModal from '@/components/delivery/modal/DeliveryProductReceiptModal.vue'
import { DeliveryProductCashReceiptConfigs, DeliveryProductCashReceiptProps } from '@/models/views/delivery/modal/DeliveryProductCashReceiptModel'

defineProps<DeliveryProductCashReceiptProps>()
</script>

<template>
  <DeliveryProductReceiptModal
    header-title="현금영수증"
    :on-cancel="$props.onCancel"
    :table-configs="DeliveryProductCashReceiptConfigs"
    has-notification
  />
</template>

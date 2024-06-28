<script setup lang="ts">
import { ModalContainerProps } from "@/models"
interface WelfareModalContentComponent {
   data: ModalContainerProps<any>
   onClose: () => void
}
defineProps<WelfareModalContentComponent>()
</script>
<template lang="">
     <div class="wf-modal-container-main">
            <div class="wf-modal-overlay"></div>
            <div class="wf-modal-content">
                <component :is="data.component" v-bind="data.props ?? {}" v-on="data.events ?? {}" />
            </div>
        </div>
</template>
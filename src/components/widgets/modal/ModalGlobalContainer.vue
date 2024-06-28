
<script  setup lang="ts">
import { ModalContent } from "@/components"
import { useModal } from "@/composables"
import {ModalContainerProps } from "@/models"
defineProps<{modals: ModalContainerProps<any>[]}>()
const {closeModalByPop} = useModal()

</script>

<template lang="">
    <div v-if="modals?.length" class="wf-modal-container">
        <ModalContent v-for="(modalItem, index) in modals" :key="index" :data="modalItem" :onClose="closeModalByPop"   />
    </div>
</template>

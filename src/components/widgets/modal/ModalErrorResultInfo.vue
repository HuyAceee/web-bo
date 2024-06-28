<script setup lang="ts">
import { HeaderModal, WelfareMdButton } from '@/components'
import DeliveryHint from '@/components/delivery/modal/DeliveryHint.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useProductModalErrorResultInfo } from '@/composables/delivery/useProductModalErrorResultInfo'
import { ErrorResultInfoDataModel } from '@/models'
import { DeliveryHintModel } from '@/models/views/delivery/modal/DeliveryHintModel'

interface Props {
  data: ErrorResultInfoDataModel[]
  dataHint?: DeliveryHintModel[]
}

const props = defineProps<Props>()
const { closeAllModal } = useProductModalErrorResultInfo()
</script>

<template>
  <div class="modal-error-result-info wf_text-n-33">
    <HeaderModal title="처리 결과 안내" @close-modal="closeAllModal" />
    <div class="wf-p-20 wf-width-full wf_flex wf_flex-col wf-space-y-20">
      <DeliveryHint :data="props.dataHint" />
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div v-for="(error, index) in props.data" v-bind:key="index" class="wf_flex wf_items-center">
          <FormGroup
            custom-class="wf-body_03-reg wf_leading-120 error-content scrollbar-custom custom-form wf-pd-14-12"
            is-rounded-bottom
            is-rounded-top
            class="wf_flex-1 wf_grid wf_grid-cols-form wf_h-auto"
            :label="error.errorLabel"
          >
            {{ error.errorContent }}
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full">
        <WelfareMdButton class="wf_w-230" label="확인" button-type="cancel" @on-click="closeAllModal" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/widgets/modal/modal-error-result-info.css');
</style>

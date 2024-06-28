<script setup lang="ts">
import { HeaderModal, WelfareInputText, WelfareMdButton, WelfareSelect } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useComplaintCollectionRequestModal } from '@/composables/complaint/modal/useComplaintCollectionRequestModal'
import { ConfirmModalProps } from '@/models'

const props = defineProps<ConfirmModalProps>()
const { deliveryCompany, invoiceNumber, complainCollectionRequestCompanyData, handleConfirm } = useComplaintCollectionRequestModal(props)
</script>

<template>
  <div class="wf-modal-wrapper--content wf-modal-wrapper--grow">
    <HeaderModal title="수거요청" @close-modal="props.onCancel" />
    <div class="wf-modal-body wf-body_04-mid">
      <div class="wf-search-tips wf-mb-20">
        <p class="wf-list-style wf_text-n-33">접수하신 클레임에 대한 회수 정보를 입력해 주세요.</p>
      </div>

      <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6">
        <FormGroup class="wf_flex-1" is-rounded-top label="택배사" required>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareSelect
              class="wf_w-180"
              v-model="deliveryCompany"
              placeholder="택배사 선택"
              optionLabel="label"
              :options="complainCollectionRequestCompanyData"
              small
            />
          </div>
        </FormGroup>
        <FormGroup class="wf_flex-1 wf_complaint-request-collection-input" label="송장번호" required is-rounded-bottom :is-border-bottom="false">
          <div class="wf_flex wf-space-x-6 wf_items-center wf_complaint-request-collection-input">
            <WelfareInputText name="" size="small" placeholder="송장번호 입력" class="wf_flex-1 wf_w-180" v-model="invoiceNumber" />
          </div>
        </FormGroup>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf-mt-20 wf_flex-grow wf_w-full">
        <WelfareMdButton class="wf_w-120" :label="'취소'" buttonType="cancel" @onClick="onCancel" />
        <WelfareMdButton class="wf_w-120" :label="'수거요청'" buttonType="default" @onClick="handleConfirm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/complaint/modal/complaint-modal.css');
</style>

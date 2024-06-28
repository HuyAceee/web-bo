<script setup lang="ts">
import { formatTextLength } from '@/common'
import { HeaderModal, TextareaMaxLength, WelfareInputText, WelfareMdButton, WelfareSelect } from '@/components'
import { ConfirmModalProps } from '@/models'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useComplaintAddressChangeModal } from '@/composables/complaint/modal/useComplaintAddressChangeModal'
import FormSearchAddressEdit from '@/components/widgets/form/FormSearchAddressEdit.vue'

const props = defineProps<ConfirmModalProps>()
const { noteOptions, handleConfirm, customerAddressRef, values, setFieldValue } = useComplaintAddressChangeModal(props)
</script>

<template>
  <div class="wf-modal-wrapper--content wf-modal-wrapper--grow wf_complaint-modal-address">
    <HeaderModal title="주소변경" @close-modal="props.onCancel" />
    <div class="wf-modal-body wf-body_04-mid">
      <div class="wf-search-tips wf-mb-20">
        <p class="wf-list-style wf_text-n-33">변경 주소를 입력해 주세요.</p>
      </div>
      <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6">
        <FormGroup class="wf_flex-1" is-rounded-top label="수령자 이름" required>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareInputText
              name=""
              size="small"
              placeholder="김메가"
              class="wf_flex-1 wf_w-180"
              :model-value="values.recipientName"
              @update:model-value="(value) => setFieldValue('recipientName', value)"
            />
          </div>
        </FormGroup>
        <FormGroup class="wf_flex-1 wf_complaint-change-address-input--address" is-rounded-top label="주소" required>
          <div class="wf_w-full">
            <FormSearchAddressEdit
              class="wf_w-full wf_mt--2"
              ref="customerAddressRef"
              :model-value="values.customerAddress"
              @update:model-value="(value) => setFieldValue('customerAddress', value)"
            />
          </div>
        </FormGroup>
        <FormGroup class="wf_flex-1" is-rounded-top label="휴대폰 번호" required>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareInputText
              name=""
              size="small"
              placeholder="연락처"
              class="wf_flex-1 wf_w-180"
              :model-value="values.phoneNumber"
              @update:model-value="(value) => setFieldValue('phoneNumber', value)"
            />
          </div>
        </FormGroup>
        <FormGroup class="wf_flex-1" is-rounded-top label="연락처" required>
          <div class="wf_flex wf-space-x-6 wf_items-center">
            <WelfareInputText
              name=""
              size="small"
              placeholder="‘-’ 없이 숫자만 입력"
              class="wf_flex-1 wf_w-180"
              :model-value="values.contact"
              @update:model-value="(value) => setFieldValue('contact', value)"
            />
          </div>
        </FormGroup>
        <FormGroup class="wf_flex-1 wf_complaint-change-address-input--note" label="남기실 말씀" required is-rounded-bottom :is-border-bottom="false">
          <div class="wf_flex wf_flex-col wf-space-y-6 wf_items-center wf_w-full">
            <WelfareSelect class="wf_w-full" v-model="noteOptions" placeholder="직접입력" optionLabel="label" small />
            <TextareaMaxLength
              size="small"
              placeholder="20자 이내로 입력 가능."
              class="wf_complaint-address-textarea wf_w-full"
              :label-bottom-left="' '"
              :label-bottom-right="formatTextLength(values.note, 20)"
              :max-length="20"
              :model-value="values.note"
              @update:model-value="(value) => setFieldValue('note', value)"
            />
          </div>
        </FormGroup>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf-mt-20 wf_flex-grow wf_w-full">
        <WelfareMdButton class="wf_w-120" :label="'취소'" buttonType="cancel" @onClick="onCancel" />
        <WelfareMdButton class="wf_w-120" :label="'변경'" buttonType="default" @onClick="handleConfirm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/complaint/modal/complaint-modal.css');
</style>

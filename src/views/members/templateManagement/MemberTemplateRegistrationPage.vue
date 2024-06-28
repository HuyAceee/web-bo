<!-- BO_B0303_020101 | BO_B0303_020201 | BO_B0303_020301 | BO_B0303_020401 -->
<script setup lang="ts">
import { HeaderModal, WelfareSelect, WelfareMdButton, WelfareRadio } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useMemberTemplateRegistration } from '@/composables/members/templateManagement/useMemberTemplateRegistration'
import { MemberTemplateRegistrationValueOptionType } from '@/models/views/members/templateManagement/MemberTemplateRegistrationOptionModel'
import { watch } from 'vue'
const { options, selectOption, valueOptionRef, handleSelectChange } = useMemberTemplateRegistration()

interface MemberTemplateRegistrationOptionsEmits {
  (e: 'update-value-option', newValue: MemberTemplateRegistrationValueOptionType): void
  (e: 'update:select', newValue: any): void
}
const emit = defineEmits<MemberTemplateRegistrationOptionsEmits>()
const handleValueOption = (value: MemberTemplateRegistrationValueOptionType) => {
  emit('update-value-option', value)
  emit('update:select', value)
}

watch(valueOptionRef, () => {
  handleValueOption(valueOptionRef.value)
})
</script>
<template>
  <div class="container-template-registration">
    <HeaderModal :title="'템플릿 등록'" />
    <div class="template-registration-body wf-space-y-20">
      <div class="wf-group-filter">
        <div>
          <FormGroup is-rounded-top label="발송 구분" required>
            <div class="wf_flex wf-flex-1 wf-space-x-20">
              <WelfareRadio
                v-model="valueOptionRef"
                :value="MemberTemplateRegistrationValueOptionType.noticeTalk"
                label="알림톡"
                name="radio-la-sm"
                size="sm"
              />
              <WelfareRadio
                v-model="valueOptionRef"
                :value="MemberTemplateRegistrationValueOptionType.noticeMessage"
                label="문자"
                name="radio-la-sm"
                size="sm"
              />
              <WelfareRadio
                v-model="valueOptionRef"
                :value="MemberTemplateRegistrationValueOptionType.appPush"
                label="앱푸시"
                name="radio-la-sm"
                size="sm"
              />
              <WelfareRadio
                v-model="valueOptionRef"
                :value="MemberTemplateRegistrationValueOptionType.noticeEmail"
                label="이메일"
                name="radio-la-sm"
                size="sm"
              />
            </div>
          </FormGroup>
          <FormGroup is-rounded-bottom :is-border-bottom="false" label="발신번호 채널 ID" required>
            <div class="wf_flex wf-flex-1 wf_items-center wf-space-x-6">
              <WelfareSelect
                :modelValue="selectOption"
                @update:model-value="handleSelectChange"
                :options="options"
                :option-label="(options) => options.label"
                placeholder="발신번호/채널 선택"
                class="wf_w-180"
                small
              />
              <WelfareMdButton label="발신번호/채널 등록" class="w-117" buttonType="liner" buttonSize="small" />
            </div>
          </FormGroup>
        </div>
      </div>
      <div v-if="valueOptionRef === MemberTemplateRegistrationValueOptionType.noticeTalk">NoticeTalk</div>
      <div v-if="valueOptionRef === MemberTemplateRegistrationValueOptionType.noticeMessage">NoticeMessage</div>
      <div v-if="valueOptionRef === MemberTemplateRegistrationValueOptionType.appPush">NoticeAppPush</div>
      <div v-if="valueOptionRef === MemberTemplateRegistrationValueOptionType.noticeEmail">NoticeEmail</div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/member/member-template-registration.css');
</style>
<script lang="ts">
export default {
  name: 'MemberTemplateRegistrationPage'
}
</script>

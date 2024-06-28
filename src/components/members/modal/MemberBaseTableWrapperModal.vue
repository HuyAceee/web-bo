<script setup lang="ts">
import { WelfareSelect, WelfareMdButton, WelfareRadioGroup, WelfareDateTimePicker, WelfareInputText, WelfareTextarea } from '@/components/uikit'
import { useMemberBaseTableWrapperModal } from '@/composables/members/modal/useMemberBaseTableWrapperModal'
import MemberBaseTableRowModal from './MemberBaseTableRowModal.vue'
import {
  MemberBaseTableWrapperPopupModel,
  memberSelectTypeDeliveryConfig,
  memberSelectDeliveryTemplateConfig,
  memberOptionDistributeApplicationsConfig,
  memberOptionTypeMessageConfig,
  memberOptionMethodShippingConfig,
  memberOptionTargetMemberConfig,
  memberOptionIsUsedConfig,
  memberOptionSelectTypeTemplateConfig
} from '@/models/views/members/deliveryManagement/MemberBaseTableWrapperPopupModel'
export interface MemberBaseTableWrapperPopupProps extends MemberBaseTableWrapperPopupModel {
  isSaveTemplate?: boolean
}
const props = defineProps<MemberBaseTableWrapperPopupProps>()
const { values, handleSetFieldValue, onRegistrationPhoneRequest, checkTypeDeliveryTemplate } = useMemberBaseTableWrapperModal()
</script>
<template>
  <div class="member-container-modal-content--table">
    <div class="content-table-row wf_flex">
      <MemberBaseTableRowModal side-content="left" label="발송코드">
        <span>00000</span>
      </MemberBaseTableRowModal>

      <MemberBaseTableRowModal label="발송구분">
        <WelfareSelect
          placeholder="카카오알림톡"
          @update:model-value="(value) => handleSetFieldValue('selectTypeDelivery', value)"
          :model-value="values.selectTypeDelivery"
          :options="memberSelectTypeDeliveryConfig"
          option-label="label"
          small
        />
      </MemberBaseTableRowModal>
    </div>

    <div class="content-table-row wf_flex">
      <MemberBaseTableRowModal side-content="left" label="발송 탬플릿" required>
        <div class="wf_flex wf-space-x-6">
          <WelfareSelect
            placeholder="선택"
            :model-value="values.selectTypeDeliveryTemplate"
            :options="memberOptionSelectTypeTemplateConfig"
            option-label="label"
            @update:model-value="(value) => handleSetFieldValue('selectTypeDeliveryTemplate', value)"
            small
          />

          <WelfareSelect
            v-if="checkTypeDeliveryTemplate"
            placeholder="직접입력"
            :model-value="values.selectDeliveryTemplate"
            :options="memberSelectDeliveryTemplateConfig"
            @update:model-value="(value) => handleSetFieldValue('selectDeliveryTemplate', value)"
            option-label="label"
            small
          />

          <WelfareInputText v-if="!checkTypeDeliveryTemplate" size="small" :model-value="values.selectDeliveryTemplate" :max-length="10" />
        </div>
      </MemberBaseTableRowModal>

      <MemberBaseTableRowModal label="발신번호/채널" required>
        <div class="wf_flex wf-space-x-6">
          <WelfareSelect placeholder="@메가존 복지몰" :model-value="{}" :options="[]" option-label="label" small disabled />
          <WelfareMdButton label="추가" button-size="small" button-type="liner" @on-click="onRegistrationPhoneRequest" />
        </div>
      </MemberBaseTableRowModal>
    </div>

    <div class="content-table-row wf_flex">
      <MemberBaseTableRowModal label="발송 형태" required side-content="left">
        <span>수동</span>
      </MemberBaseTableRowModal>

      <MemberBaseTableRowModal label="앱푸시 동시발송">
        <WelfareRadioGroup
          size="sm"
          :gap="20"
          :options="memberOptionDistributeApplicationsConfig"
          :model-value="values.optionDistributeApplications"
          @update:model-value="(value) => handleSetFieldValue('optionDistributeApplications', value)"
        />
      </MemberBaseTableRowModal>
    </div>

    <div class="content-table-row wf_flex">
      <MemberBaseTableRowModal label="메시지 종류" side-content="left">
        <WelfareRadioGroup
          size="sm"
          :gap="20"
          :options="memberOptionTypeMessageConfig"
          :model-value="values.optionTypeMessage"
          @update:model-value="(value) => handleSetFieldValue('optionTypeMessage', value)"
        />
      </MemberBaseTableRowModal>

      <MemberBaseTableRowModal label="수신거부" required>
        <div class="wf_flex wf-space-x-6">
          <WelfareSelect placeholder="01012345678" :model-value="{}" :options="[]" option-label="label" small disabled />
          <WelfareMdButton label="추가" button-size="small" button-type="liner" />
        </div>
      </MemberBaseTableRowModal>
    </div>

    <div class="content-table-row wf_flex">
      <MemberBaseTableRowModal label="발송방법" side-content="left">
        <div class="wf-space-x-20 wf_flex">
          <WelfareRadioGroup
            size="sm"
            :gap="20"
            :options="memberOptionMethodShippingConfig"
            :model-value="values.optionMethodShipping"
            @update:model-value="(value) => handleSetFieldValue('optionMethodShipping', value)"
          />
          <WelfareDateTimePicker size="small" type="date-time" />
        </div>
      </MemberBaseTableRowModal>

      <MemberBaseTableRowModal label="대상 회원">
        <WelfareRadioGroup
          size="sm"
          :gap="20"
          :options="memberOptionTargetMemberConfig"
          :model-value="values.optionTargetMember"
          @update:model-value="(value) => handleSetFieldValue('optionTargetMember', value)"
        />
      </MemberBaseTableRowModal>
    </div>

    <div class="content-table-row wf_flex">
      <MemberBaseTableRowModal label="제외회원" side-content="left">
        <div class="wf-space-x-20">
          <WelfareMdButton label="회원선택" button-size="small" button-type="liner" />
        </div>
      </MemberBaseTableRowModal>

      <MemberBaseTableRowModal label="사용여부">
        <WelfareRadioGroup
          size="sm"
          :gap="20"
          :options="memberOptionIsUsedConfig"
          :model-value="values.optionIsUsed"
          @update:model-value="(value) => handleSetFieldValue('optionIsUsed', value)"
        />
      </MemberBaseTableRowModal>
    </div>

    <div class="content-table-row wf_flex">
      <MemberBaseTableRowModal label="템플릿 제목" required>
        <WelfareInputText size="small" placeholder="제목을 입력하세요." :model-value="values.title" :max-length="20" />
      </MemberBaseTableRowModal>
    </div>

    <div class="content-table-row wf_flex">
      <MemberBaseTableRowModal label="템플릿 내용" required>
        <div class="wf-tr-match-parent">
          <WelfareTextarea
            :model-value="values.description"
            size="small"
            placeholder="제목을 입력하세요."
            label-bottom-left="SMS (59/60 bytes) / LMS (61/60 bytes) / MMS (61/60 bytes) : 이미지 첨부"
            :label-bottom-right="(values.description ? values.description.length : '0') + '/60 bytes'"
            @update:model-value="(value) => handleSetFieldValue('description', value)"
          />
          <slot name="image-textarea"></slot>
        </div>
      </MemberBaseTableRowModal>
    </div>

    <div class="content-table-row wf_flex">
      <MemberBaseTableRowModal label="등록자" side-content="left">
        <span>{{ values.createdBy }}</span>
      </MemberBaseTableRowModal>

      <MemberBaseTableRowModal label="등록일시">
        <span>{{ values.createdAt }}</span>
      </MemberBaseTableRowModal>
    </div>

    <div class="content-table-row wf_flex">
      <MemberBaseTableRowModal label="수정자" side-content="left">
        <span>{{ values.updatedBy }}</span>
      </MemberBaseTableRowModal>

      <MemberBaseTableRowModal label="수정일시">
        <span>{{ values.updatedAt }}</span>
      </MemberBaseTableRowModal>
    </div>
  </div>
  <div class="member-container-modal-content--action wf_flex wf-space-x-4">
    <WelfareMdButton class="custom-button" label="초기화" button-type="liner" />

    <WelfareMdButton v-if="!props.isSaveTemplate" class="custom-button" label="저장" button-type="default" />

    <WelfareMdButton v-if="!props.isSaveTemplate" class="custom-button" label="저장 및 보내기" button-type="liner" />

    <WelfareMdButton v-if="props.isSaveTemplate" class="custom-button" label="템플릿 저장" button-type="default" />
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/member/member-base-table-popup.css');
</style>

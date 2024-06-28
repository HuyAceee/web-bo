<!-- BO_B0101_020101 -->
<script setup lang="ts">
import { FORMAT_DATE_YYYY_MM_DD_HH_mm_ss, getDateByFormat } from '@/common'
import { WelfareMdButton, WelfareRadio, WelfareBigButton } from '@/components'
import MemberListToggleInputText from '@/components/members/memberList/MemberListToggleInputText.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import FormSearchAddressEdit from '@/components/widgets/form/FormSearchAddressEdit.vue'
import { useMemberListBaseInformationTabBase } from '@/composables/members/memberList/useMemberListBaseInformationTabBase'
const {
  setFieldValue,
  resetPassword,
  listRadioEmployeesStatus,
  listRadioGender,
  listCheckboxAccountStatus,
  detailMember,
  handleReset,
  refPhone,
  refLevel,
  refEmployeeNumber,
  refBirthDate,
  refEmailPersonal,
  refAddressCustomer,
  handleSubmit
} = useMemberListBaseInformationTabBase()
</script>
<template>
  <div>
    <div class="wf-group-filter wf_padding_table wf_text-n-33">
      <div class="wf_flex">
        <FormGroup label="고객사" required class="wf_flex-1" is-rounded-top>
          <span class="wf-body_03-reg">{{ detailMember.data.customer }}</span>
        </FormGroup>
        <FormGroup label="회원명" is-border-left class="wf_flex-1">
          <span class="wf-body_03-reg">{{ detailMember.data.nameCustomer }}</span>
        </FormGroup>
      </div>
      <div class="wf_flex">
        <FormGroup label="회원아이디" class="wf_flex-1" required is-rounded-top>
          <span class="wf-body_03-reg">{{ detailMember.data.idRegister }}</span>
        </FormGroup>
        <FormGroup label="비밀번호" is-border-left custom-class="wf_justify-between wf_items-center" class="wf_flex-1">
          <div class="wf_flex wf-space-x-10 wf-body_03-reg">
            <span>{{ detailMember.data.password }}</span>
            <span v-if="detailMember.data.passwordChangeDate">(변경일자 : {{ detailMember.data.passwordChangeDate }})</span>
          </div>
          <WelfareMdButton @click="resetPassword" label="비밀번호 초기화" class="wf_w-102" buttonSize="small" buttonType="liner" />
        </FormGroup>
      </div>
      <div class="wf_flex">
        <FormGroup label="휴대폰번호" class="wf_flex-1" required custom-class="wf_justify-between wf_items-center" is-rounded-top>
          <MemberListToggleInputText ref="refPhone" type="mask" v-model:value="detailMember.data.phone" />
        </FormGroup>
        <FormGroup label="직급" is-border-left required custom-class="wf_justify-between wf_items-center" class="wf_flex-1">
          <MemberListToggleInputText ref="refLevel" v-model:value="detailMember.data.level" />
        </FormGroup>
      </div>
      <div class="wf_flex">
        <FormGroup label="사번" class="wf_flex-1" required custom-class="wf_justify-between wf_items-center" is-rounded-top>
          <MemberListToggleInputText ref="refEmployeeNumber" v-model:value="detailMember.data.employeeNumber" />
        </FormGroup>
        <FormGroup label="재직상태" is-border-left required custom-class="wf_items-center wf-space-x-20" class="wf_flex-1">
          <WelfareRadio
            v-for="(radio, index) in listRadioEmployeesStatus"
            :key="index"
            name="employeeStatus"
            :model-value="detailMember.data.employeeStatus"
            :value="radio.value"
            size="sm"
            :label="radio.label"
            @update:model-value="(value) => (detailMember.data.employeeStatus = value)"
          />
        </FormGroup>
      </div>
      <div class="wf_flex">
        <FormGroup label="생년월일" class="wf_flex-1" required custom-class="wf_justify-between wf_items-center" is-rounded-top>
          <MemberListToggleInputText ref="refBirthDate" v-model:value="detailMember.data.birthDate" type="date" />
        </FormGroup>
        <FormGroup label="성별" is-border-left required custom-class="wf_items-center wf-space-x-20" class="wf_flex-1">
          <WelfareRadio
            v-for="(radio, index) in listRadioGender"
            :key="index"
            :model-value="detailMember.data.gender"
            name="gender"
            :value="radio.value"
            size="sm"
            :label="radio.label"
            @update:model-value="(value) => (detailMember.data.gender = value)"
          />
        </FormGroup>
      </div>
      <div class="wf_flex">
        <FormGroup label="회원등급" class="wf_flex-1" required custom-class=" wf_items-center wf-body_03-reg wf-space-x-10" is-rounded-top>
          <span>{{ detailMember.data.positionMember }}</span
          ><span v-if="detailMember.data.latestBlackListChangedAdminId"
            >({{ getDateByFormat(detailMember.data.latestBlackListChangedDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) }}/{{
              detailMember.data.latestBlackListChangeAdminName
            }}({{ detailMember.data.latestBlackListChangedAdminId }}))</span
          >
        </FormGroup>
        <FormGroup label="인증여부" is-border-left class="wf_flex-1">
          <span class="wf-body_03-reg">{{ detailMember.data.certification }}</span>
        </FormGroup>
      </div>
      <div class="wf_flex">
        <FormGroup label="개인 이메일" class="wf_flex-1" required custom-class="wf_justify-between wf_items-center" is-rounded-top>
          <MemberListToggleInputText ref="refEmailPersonal" v-model:value="detailMember.data.emailPersonal" />
        </FormGroup>
        <FormGroup label="계정 상태" is-border-left custom-class="wf_items-center wf-space-x-20" class="wf_flex-1">
          <WelfareRadio
            v-for="(radio, index) in listCheckboxAccountStatus"
            :key="index"
            :model-value="detailMember.data.accountStatus"
            @update:model-value="(value) => (detailMember.data.accountStatus = value)"
            name="accountStatus"
            :value="radio.value"
            size="sm"
            :label="radio.label"
          />
        </FormGroup>
      </div>
      <div class="wf_flex">
        <FormGroup label="고객사 주소" class="wf_flex-1 wf_height-fit wf_h-141" custom-class="wf_justify-between wf_items-center " is-rounded-top>
          <FormSearchAddressEdit
            ref="companyAddressRef"
            :model-value="detailMember.data.companyAddress"
            @update:model-value="(value) => setFieldValue('companyAddress', value)"
          />
        </FormGroup>
        <FormGroup label="자택 주소" is-border-left custom-class="wf_justify-between wf_items-center" class="wf_flex-1 wf_height-fit wf_h-141">
          <FormSearchAddressEdit
            ref="refAddressCustomer"
            :model-value="detailMember.data.customerAddress"
            @update:model-value="(value) => setFieldValue('customerAddress', value)"
          />
        </FormGroup>
      </div>
      <div class="wf_flex">
        <FormGroup :is-border-bottom="false" is-rounded-bottom label="원 등록일시" custom-class="wf-space-x-10" required class="wf_flex-1">
          <span class="wf-body_03-reg">{{ detailMember.data.createdDate }}</span>
          <span v-if="detailMember.data.createdById" class="wf-body_03-reg">
            ({{ detailMember.data.createdByName }}({{ detailMember.data.createdById }}))
          </span>
        </FormGroup>
        <FormGroup :is-border-bottom="false" label="최근 접속일" is-border-left class="wf_flex-1">
          <span class="wf-body_03-reg">{{ detailMember.data.lassAccessDate }}</span>
        </FormGroup>
      </div>
    </div>
    <div class="wf_flex wf_justify-end">
      <span class="wf-body_04-reg wf_text-n-33 wf-mt-10">업데이트 일자: {{ detailMember.data.modifiedDate }}</span>
    </div>
    <div class="wf_flex wf_justify-center wf_items-center wf-mt-30 wf-space-x-20">
      <WelfareBigButton @click="handleReset" buttonType="cancel" label="초기화" class="wf_w-200" />
      <WelfareBigButton @click="handleSubmit" buttonType="default" label="저장" class="wf_w-200" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/common/form-data-table-list.css');
</style>

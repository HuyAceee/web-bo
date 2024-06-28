<!-- BO_M0202_010101 -->

<script setup lang="ts">
import { icArrowElbow } from '@/assets'
import {
  FORMAT_DATE_YYYY_MM_DD_HH_mm_ss,
  OPERATE_ADMINISTRATOR_PERMISSION_LIST,
  TEXTAREA_NUMBER_200,
  TEXT_MAX_NUMBER_10,
  TEXT_MAX_NUMBER_11,
  TEXT_MAX_NUMBER_20,
  TEXT_MAX_NUMBER_30,
  formatTime,
  isInteger
} from '@/common'
import {
  TextInputWithMaxLengthCharacters,
  TextareaMaxLengthBytes,
  WelfareBigButton,
  WelfareCheckbox,
  WelfareInputText,
  WelfareMdButton,
  WelfareRadioGroup,
  WelfareSelect
} from '@/components'
import IconExpandedMenu from '@/components/icons/IconExpandedMenu.vue'
import IconMinimizeMenu from '@/components/icons/IconMinimizeMenu.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import useOperatingAdministratorsRegistrator from '@/composables/operating/administratorsListOfAdministrators/useOperatingAdministratorsRegistrator'
import { OptionsStatusOfUseAdminRegis } from '@/models/views/operating/adminManagement/OperatingAdministratorsRegistrationModel'
import Column from 'primevue/column'
import { RouterLink } from 'vue-router'
import BaseDataTreeTablePaginationVue from '@/components/uikit/table/BaseDataTreeTablePagination.vue'

const {
  checkEmailExisted,
  checkPhoneExisted,
  checkManagerIdExisted,
  getTemporaryPassword,
  groupNameOptions,
  dataPermissionsGroupDetail,
  nodes,
  formValue,
  handleChange,
  getStatusRole,
  saveForm,
  handleDelete,
  showPopupInvadlidPhoneNumber,
  buildMenuNameStyle
} = useOperatingAdministratorsRegistrator()
</script>
<template>
  <div class="wf-p-30">
    <!-- header -->
    <div id="wf-group-filer" class="wf-group-filter">
      <div id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="권한 그룹명" :isRoundedTop="true" required>
            <WelfareSelect
              class="wf_w-180"
              placeholder="전체"
              small
              option-label="groupName"
              option-value="groupKey"
              :options="groupNameOptions"
              :model-value="formValue.authorityGroupKey"
              @update:model-value="(value) => handleChange('authorityGroupKey', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" label="사용상태" required is-border-left>
            <WelfareRadioGroup
              size="sm"
              :gap="20"
              :options="OptionsStatusOfUseAdminRegis"
              :model-value="formValue.isActive"
              @update:model-value="(value) => handleChange('isActive', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="관리자 아이디" required>
            <WelfareInputText
              class="wf_w-180 wf-mr-4"
              size="small"
              :model-value="formValue.managerId"
              :max-length="TEXT_MAX_NUMBER_20"
              :disabled="!!formValue.managerKey"
              @update:model-value="(value) => handleChange('managerId', value)"
            />
            <WelfareMdButton
              v-if="!formValue.managerKey"
              :key="formValue.checkManagerIdExisted + ''"
              button-size="small"
              :label="!formValue.checkManagerIdExisted ? '중복확인완료' : '중복확인'"
              buttonType="neutral"
              :disabled="!formValue.checkManagerIdExisted"
              @on-click="checkManagerIdExisted()"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" is-border-left label="관리자 코드">
            <WelfareInputText class="wf_w-180" size="small" :model-value="formValue.managerKey ? formValue.managerKey + '' : ''" disabled />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="관리자명" required>
            <TextInputWithMaxLengthCharacters
              class="wf_w-180"
              placeholder="한글 기준 10자 이내로 입력 해주세요."
              size="small"
              :max-length="TEXT_MAX_NUMBER_10"
              :model-value="formValue.managerName"
              @update:model-value="(value) => handleChange('managerName', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" label="비밀번호" required is-border-left>
            <WelfareInputText class="wf_w-180 wf-mr-4" size="small" :model-value="formValue.password" disabled />
            <WelfareMdButton
              button-size="small"
              :key="formValue.managerKey"
              :label="formValue.managerKey ? '비밀번호 초기화' : '임시비밀번호 발급'"
              buttonType="neutral"
              :disabled="!!formValue.password"
              @on-click="() => getTemporaryPassword()"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="휴대전화" required>
            <TextInputWithMaxLengthCharacters
              class="wf_w-180 wf-mr-4"
              placeholder="- 없이 숫자만 입력 해주세요"
              message-warning="휴대폰번호를 다시 확인해 주세요. 휴대폰번호 형식이 올바르지 않습니다."
              :hidden-warning="true"
              size="small"
              :model-value="formValue.phone"
              :max-length="TEXT_MAX_NUMBER_11"
              @update:model-value="(value) => handleChange('phone', value)"
              :on-validate-content="
                (key?: string) => {
                  if (key === '-') {
                    showPopupInvadlidPhoneNumber()
                  }
                  return isInteger(key)
                }
              "
            />
            <WelfareMdButton
              button-size="small"
              :key="formValue.managerKey"
              :label="formValue.managerKey ? '중복확인완료' : '중복확인'"
              buttonType="neutral"
              :disabled="!formValue.checkPhoneExisted"
              @on-click="checkPhoneExisted()"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" label="이메일" required is-border-left>
            <TextInputWithMaxLengthCharacters
              class="wf_w-180 wf-mr-4"
              input-type="email"
              size="small"
              :model-value="formValue.email"
              @update:model-value="(value) => handleChange('email', value)"
              :max-length="TEXT_MAX_NUMBER_30"
              :hidden-warning="true"
            />
            <WelfareMdButton
              button-size="small"
              :key="formValue.managerKey"
              :label="formValue.managerKey ? '중복확인완료' : '중복확인'"
              buttonType="neutral"
              :disabled="!formValue.checkEmailExisted"
              @on-click="checkEmailExisted()"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" label="기본 소속 정보" :is-border-bottom="false" is-rounded-bottom>
            <div class="wf-py-7 wf-width-full">
              <TextareaMaxLengthBytes
                placeholder="한글 기준 100자 이내로 입력해 주세요."
                class="wf-administrator-notes-textarea"
                :max-bytes="TEXTAREA_NUMBER_200"
                :model-value="formValue.deptInfo"
                @update:model-value="(value) => handleChange('deptInfo', value)"
              >
                <template #note>
                  <span class="wf_text-sub-01 wf-body_04-reg wf-pl-11" />
                </template>
              </TextareaMaxLengthBytes>
            </div>
          </FormGroup>
        </div>
      </div>
    </div>
    <!-- form -->
    <div class="wf-body_01-semi wf-mt-30 wf_text-n-33">권한 정보</div>
    <div class="wf_line" />
    <div id="wf-group-filer" class="wf-group-filter wf-mb-10">
      <div id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="권한 그룹명" is-rounded-top is-rounded-bottom :is-border-bottom="false">
            <WelfareInputText class="wf_w-180" placeholder="어드민그룹" size="small" :model-value="dataPermissionsGroupDetail?.name" disabled />
          </FormGroup>
          <FormGroup class="wf_flex-1" label="권한 그룹코드" :is-border-bottom="false" is-border-left>
            <WelfareInputText
              class="wf_w-180"
              placeholder=""
              size="small"
              :model-value="dataPermissionsGroupDetail?.groupKey ? dataPermissionsGroupDetail?.groupKey + '' : ''"
              disabled
            />
          </FormGroup>
        </div>
      </div>
    </div>
    <!-- table -->
    <div class="wf-register-category-depth-table p-tree-datatable-table">
      <BaseDataTreeTablePaginationVue class="p-datatable-table" :resizable-columns="true" :value="nodes as any">
        <template #columns>
          <Column field="menuName" header="메뉴" expander>
            <template #rowtogglericon="rowTogglerIconProps">
              <IconMinimizeMenu v-if="(rowTogglerIconProps as any).expanded" />
              <IconExpandedMenu v-if="!(rowTogglerIconProps as any).expanded" />
            </template>
            <template #body="slotProps">
              <slot :name="`body-${'menuName'}`" :props="slotProps">
                <img
                  :src="icArrowElbow"
                  v-if="!slotProps.node.children.length && slotProps.node.data.menuDepth > 1"
                  class="wf-mr-10 wf-ml--16"
                  alt=""
                />
                <span :style="buildMenuNameStyle(slotProps.node.data.menuDepth)">{{ slotProps.node.data?.['menuName'] }}</span>
              </slot>
              <!-- icArrowElbow -->
            </template>
          </Column>
          <Column field="size" class="wf_m-w-150">
            <template #header>
              {{ '개인정보관리 권한' }}
              <span class="wf_text-sub-01">* </span>
            </template>
            <template #body="{ node }">
              <WelfareCheckbox class="wf-ml-auto wf-mr-auto" :model-value="getStatusRole(node, 'personalInformationManagement')" readonly />
            </template>
          </Column>
          <Column field="size" class="wf_m-w-150">
            <template #header>
              {{ '읽기' }}
              <span class="wf_text-sub-01">* </span>
            </template>
            <template #body="{ node }">
              <WelfareCheckbox class="wf-ml-auto wf-mr-auto" :model-value="getStatusRole(node, 'read')" readonly />
            </template>
          </Column>
          <Column field="size" class="wf_m-w-150">
            <template #header>
              {{ '쓰기(등록/수정/삭제)' }}
              <span class="wf_text-sub-01">* </span> </template
            ><template #body="{ node }">
              <WelfareCheckbox class="wf-ml-auto wf-mr-auto" :model-value="getStatusRole(node, 'write')" readonly />
            </template>
          </Column>
          <Column field="size" class="wf_m-w-150">
            <template #header>
              {{ '승인' }}
              <span class="wf_text-sub-01">* </span> </template
            ><template #body="{ node }">
              <WelfareCheckbox class="wf-ml-auto wf-mr-auto" :model-value="getStatusRole(node, 'approve')" readonly />
            </template>
          </Column>
        </template>
      </BaseDataTreeTablePaginationVue>
    </div>
    <!-- info -->
    <div class="wf-body_01-semi wf-mt-30 wf_text-n-33">등록정보</div>
    <div class="wf_line" />
    <div id="wf-group-filer" class="wf-group-filter">
      <div id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf_text-n-33" label="등록자" :isRoundedTop="true">
            {{ formValue?.auditing?.registerName || '' }}
          </FormGroup>
          <FormGroup class="wf_flex-1 wf_text-n-33" label="등록일시" is-border-left>
            {{ formValue?.auditing?.registeredDate ? formatTime(formValue?.auditing?.registeredDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) : '' }}
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf_text-n-33" label="수정자" :is-border-bottom="false" is-rounded-bottom>
            {{ formValue?.auditing?.modifierName || '' }}
          </FormGroup>
          <FormGroup class="wf_flex-1 wf_text-n-33" label="수정일시" :is-border-bottom="false" is-border-left>
            {{ formValue?.auditing?.modifiedDate ? formatTime(formValue?.auditing?.modifiedDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) : '' }}
          </FormGroup>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="wf_flex wf_justify-center wf-gap-20 wf-mt-26">
      <RouterLink :to="OPERATE_ADMINISTRATOR_PERMISSION_LIST" class="w-232 link-underline">
        <WelfareBigButton button-type="cancel" label="목록보기" class="wf_w-230" />
      </RouterLink>
      <WelfareBigButton button-type="neatral" label="삭제" class="wf_w-230" @on-click="handleDelete()" />
      <WelfareBigButton button-type="default" label="저장" class="wf_w-230" @on-click="saveForm()" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/operate/operating/operating-adminitrator-table.css');
</style>

<script lang="ts">
export default {
  name: 'OperatingAdministratorsRegistrationPage'
}
</script>

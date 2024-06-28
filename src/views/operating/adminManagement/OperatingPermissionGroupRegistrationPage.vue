<!-- BO_M0204_010101 -->

<script setup lang="ts">
import { icArrowElbow } from '@/assets'
import { FORMAT_DATE_YYYY_MM_DD_HH_mm_ss, OPERATE_ADMINISTRATOR_PERMISSION_LIST, TEXTAREA_NUMBER_200, formatTime } from '@/common'
import {
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
import BaseDataTreeTablePagination from '@/components/uikit/table/BaseDataTreeTablePagination.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import useOperatingPermissionGroup from '@/composables/operating/administratorsListOfAdministrators/useOperatingPermissionGroupRegistration'
import {
  GroupNameOptions,
  GroupNameOptionsType,
  OptionsStatusOfUseGroupRole
} from '@/models/views/operating/adminManagement/OperatingPermissionGroupRegistrationModel'
import Column from 'primevue/column'

import { RouterLink } from 'vue-router'

const { dataDetail, nodes, formValue, handleChange, checkMenuIdExisteded, getStatusRole, setStatusRole, saveForm, handleDelete } =
  useOperatingPermissionGroup()
</script>
<template>
  <div class="wf-p-30">
    <div id="wf-group-filer" class="wf-group-filter">
      <div id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="권한 그룹명" :isRoundedTop="true" required>
            <WelfareSelect
              placeholder="MD 그룹"
              class="wf_w-180"
              small
              optionLabel="label"
              option-value="value"
              :disabled="!!formValue.groupKey"
              :options="GroupNameOptions"
              :model-value="formValue.groupName"
              @update:model-value="(value) => handleChange('groupName', value)"
            />
            <WelfareInputText
              class="wf_w-180 wf-ml-6 wf-mr-4"
              placeholder=""
              size="small"
              :disabled="formValue.groupName !== GroupNameOptionsType.textInput || !!formValue.groupKey"
              :model-value="formValue.groupNameInput"
              @update:model-value="(value) => handleChange('groupNameInput', value)"
            />
            <WelfareMdButton button-size="small" label="중복확인" buttonType="neutral" @on-click="checkMenuIdExisteded()" />
          </FormGroup>
          <FormGroup class="wf_flex-1" is-border-left label="권한 그룹코드">
            <WelfareInputText
              class="wf_w-180 wf-ml-6 wf-mr-4"
              size="small"
              disabled
              :model-value="formValue.groupKey ? formValue.groupKey.toString() : ''"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="사용상태" required>
            <WelfareRadioGroup
              size="sm"
              :gap="20"
              :options="OptionsStatusOfUseGroupRole"
              :model-value="formValue.groupUseYn"
              @update:model-value="(value) => handleChange('groupUseYn', value)"
          /></FormGroup>
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
    <!-- table -->
    <div class="wf-body_01-semi wf-mt-30 wf_text-n-33">권한 설정</div>
    <div class="wf_line" />
    <div class="wf-register-category-depth-table p-tree-datatable-table">
      <BaseDataTreeTablePagination class="p-datatable-table" :resizable-columns="true" :value="nodes as any">
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
                <span :style="{ fontWeight: 700 - slotProps.node.data.menuDepth * 100 }">{{ slotProps.node.data?.['menuName'] }}</span>
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
              <WelfareCheckbox
                class="wf-ml-auto wf-mr-auto"
                :model-value="getStatusRole(node, 'personalInformationManagement')"
                @update:model-value="
                  (value) => {
                    setStatusRole(node, 'personalInformationManagement', value)
                  }
                "
              />
            </template>
          </Column>
          <Column field="size" class="wf_m-w-150">
            <template #header>
              {{ '읽기' }}
              <span class="wf_text-sub-01">* </span>
            </template>
            <template #body="{ node }">
              <WelfareCheckbox
                class="wf-ml-auto wf-mr-auto"
                :model-value="getStatusRole(node, 'read')"
                @update:model-value="
                  (value) => {
                    setStatusRole(node, 'read', value)
                  }
                "
              />
            </template>
          </Column>
          <Column field="size" class="wf_m-w-150">
            <template #header>
              {{ '쓰기(등록/수정/삭제)' }}
              <span class="wf_text-sub-01">* </span> </template
            ><template #body="{ node }">
              <WelfareCheckbox
                class="wf-ml-auto wf-mr-auto"
                :model-value="getStatusRole(node, 'write')"
                @update:model-value="
                  (value) => {
                    setStatusRole(node, 'write', value)
                  }
                "
              />
            </template>
          </Column>
          <Column field="size" class="wf_m-w-150">
            <template #header>
              {{ '승인' }}
              <span class="wf_text-sub-01">* </span> </template
            ><template #body="{ node }">
              <WelfareCheckbox
                class="wf-ml-auto wf-mr-auto"
                :model-value="getStatusRole(node, 'approve')"
                @update:model-value="
                  (value) => {
                    setStatusRole(node, 'approve', value)
                  }
                "
              />
            </template>
          </Column>
        </template>
      </BaseDataTreeTablePagination>

      <!-- <DataTableContainer is-select-invisible :value="dataDetail?.subSiteMenu" :column-configs="operatingSiteManagementHeaderConfig" /> -->
    </div>
    <!-- info -->
    <div class="wf-body_01-semi wf-mt-30 wf_text-n-33">등록정보</div>
    <div class="wf_line" />
    <div id="wf-group-filer" class="wf-group-filter">
      <div id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf_text-n-33" label="등록자" :isRoundedTop="true">
            {{ dataDetail?.auditing.registerName }}
          </FormGroup>
          <FormGroup class="wf_flex-1 wf_text-n-33" label="등록일시" is-border-left>
            {{ dataDetail?.auditing.registeredDate ? formatTime(dataDetail?.auditing.registeredDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) : '' }}
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf_text-n-33" label="수정자" :is-border-bottom="false" is-rounded-bottom>
            {{ dataDetail?.auditing.modifierName }}
          </FormGroup>
          <FormGroup class="wf_flex-1 wf_text-n-33" label="수정일시" :is-border-bottom="false" is-border-left>
            {{ dataDetail?.auditing.modifiedDate ? formatTime(dataDetail?.auditing.modifiedDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) : '' }}
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
  name: 'OperatingPermissionGroupRegistrationPage'
}
</script>

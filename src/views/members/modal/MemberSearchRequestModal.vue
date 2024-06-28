<!-- BO_B0101_020103_P -->
<!-- BO_E0207_080101_P -->
<script setup lang="ts">
import { HeaderModal, TextInputMaxLengthValidation, WelfareInputText, WelfareMdButton, WelfareSelect } from '@/components'
import MemberSearchRequestDataTable from '@/components/members/modal/MemberSearchRequestDataTable .vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
import { useMemberSearchRequestModal } from '@/composables/members/modal/useMemberSearchRequestModal'
import { MemberRequestModalProps, MemberSearchRequestModalEmits } from '@/models/views/members/modal/MemberRequestModel'
import { MemberSearchType } from '@/models/views/members/modal/MemberSearchTypeModel'

const props = withDefaults(defineProps<MemberRequestModalProps>(), {
  searchType: MemberSearchType.REQUEST
})

const emits = defineEmits<MemberSearchRequestModalEmits>()

const {
  setFieldValue,
  handleResetForm,
  isLoading,
  handleSearch,
  searchResults,
  onPageChange,
  totalSearchItems,
  handleChangeCountDate,
  currentFilterDate,
  values,
  memberRequestMarketingAgreeYn,
  memberRequestHoldingOfficeYn,
  memberRequestGradeCode,
  listCustomerCompany,
  onRowSelected,
  onSelectAllChange,
  handleSaveDate,
  refTable
} = useMemberSearchRequestModal(props, emits)
</script>

<template>
  <div class="member-request-modal">
    <HeaderModal title="회원 조회" @close-modal="$emit('close')" />
    <div class="wf-p-20 wf-width-full wf_flex wf_flex-col wf-space-y-20">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-rounded-top is-rounded-bottom label="회원코드">
            <TextInputMaxLengthValidation
              :modelValue="values.memberKey"
              @update:modelValue="(value) => setFieldValue('memberKey', value)"
              placeholder="회원코드 조회"
              size="small"
              input-type="number"
              class="wf_w-180"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="회원명">
            <WelfareInputText
              :modelValue="values.memberName"
              @update:modelValue="(value) => setFieldValue('memberName', value)"
              placeholder="회원명 조회"
              size="small"
              class="wf_w-180"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="아이디">
            <WelfareInputText
              :modelValue="values.memberId"
              @update:modelValue="(value) => setFieldValue('memberId', value)"
              placeholder="아이디 조회"
              size="small"
              class="wf_w-180"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-rounded-top is-rounded-bottom label="고객사">
            <WelfareSelect
              placeholder="고객사 선택"
              small
              :modelValue="values.customerKey"
              @update:modelValue="(value) => setFieldValue('customerKey', value)"
              :options="listCustomerCompany"
              option-label="label"
              class="wf_w-180"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="사번">
            <WelfareInputText
              :modelValue="values.employeeNumber"
              @update:modelValue="(value) => setFieldValue('employeeNumber', value)"
              placeholder="사번 조회"
              size="small"
              class="wf_w-180"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="휴대폰 번호">
            <TextInputMaxLengthValidation
              :modelValue="values.cellphoneNumber"
              @update:modelValue="(value) => setFieldValue('cellphoneNumber', value)"
              placeholder="휴대폰번호 조회"
              input-type="number"
              :max-length="11"
              size="small"
              class="wf_w-180"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-rounded-top is-rounded-bottom label="회원등급">
            <WelfareSelect
              :modelValue="values.gradeCode"
              :options="memberRequestGradeCode"
              option-label="label"
              @update:modelValue="(value) => setFieldValue('gradeCode', value)"
              placeholder="전체"
              small
              class="wf_w-180"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="재직상태">
            <WelfareSelect
              :modelValue="values.holdingOfficeYn"
              :options="memberRequestHoldingOfficeYn"
              optionLabel="label"
              @update:modelValue="(value) => setFieldValue('holdingOfficeYn', value)"
              placeholder="전체"
              small
              class="wf_w-180"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="마케팅동의">
            <WelfareSelect
              :modelValue="values.marketingAgreeYn"
              :options="memberRequestMarketingAgreeYn"
              optionLabel="label"
              @update:modelValue="(value) => setFieldValue('marketingAgreeYn', value)"
              placeholder="전체"
              small
              class="wf_w-180"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_flex-row wf_h-42">
          <FormGroupTimeLinesFilterForm
            :hiddenSelectOption="true"
            :is-rounded-bottom="true"
            :is-border-bottom="false"
            label="회원등급"
            ref="refTable"
            @on-change-filter-date="handleChangeCountDate"
            :from-date="values.startDate"
            :to-date="values.endDate"
            :current-active-date="currentFilterDate"
            @on-change-date-from="(value) => setFieldValue('startDate', value)"
            @on-change-date-to="(value) => setFieldValue('endDate', value)"
          />
        </div>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full wf_product-border-bottom-sub-gray wf-pb-20">
        <WelfareMdButton class="wf_w-120" label="초기화" button-type="liner" @onClick="handleResetForm" />
        <WelfareMdButton class="wf_w-120" label="조회" button-type="default" @onClick="handleSearch" />
      </div>

      <!-- table -->
      <div class="wf_product-search-table wf_search-table-member">
        <MemberSearchRequestDataTable
          ref="refTable"
          class="wf-member-request-modal-table"
          :value="searchResults"
          :defaultCheckedData="props.defaultDataTable"
          :loading="isLoading"
          :total-records="totalSearchItems"
          @page-change="onPageChange"
          @row-checked-change="onRowSelected"
          @select-all-change="onSelectAllChange"
          noDataLabel="조회 내용이 없습니다."
        >
          <template #buttons>
            <div class="wf-space-x-6 wf_flex">
              <WelfareMdButton
                label="선택 등록"
                buttonType="liner"
                buttonSize="small"
                class="w-66 wf-mr--2 wf_color-button--blue"
                @onClick="handleSaveDate"
              />
            </div>
          </template>
        </MemberSearchRequestDataTable>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/modal/memberRequest/member-request.css');
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>

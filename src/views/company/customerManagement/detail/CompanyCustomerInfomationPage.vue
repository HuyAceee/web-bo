<!-- BO_O0102_010101 -->
<script setup lang="ts">
import { COMPANY_CUSTOMER_LIST, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss, formatTime } from '@/common'
import { WelfareBigButton, WelfareMdButton, WelfareRadioGroup } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useCustomerInformation } from '@/composables/company/customerManagement/detail/useCustomerInformation'

const {
  detailData,
  OptionsCustomerStatus,
  CustomerRegistrationRadioOption,
  masterData,
  setFieldValue,
  values,
  getFileIntroduce,
  getFileRegistration,
  saveForm
} = useCustomerInformation()
</script>

<template>
  <div class="wf-product-menu-wrap">
    <div class="wf-sub_tit_01 wf-mb-10">| 기업 기본정보</div>
    <div class="wf_line" />
    <!-- section 1 -->
    <div class="wf-group-container">
      <div id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="고객사 코드" required :isRoundedTop="true">
            {{ detailData?.customerKey }}
          </FormGroup>
          <FormGroup class="wf_flex-1" label="고객사 상태" required is-border-left>
            <WelfareRadioGroup
              size="sm"
              :gap="20"
              :options="OptionsCustomerStatus"
              :model-value="values.customerStatus"
              @update:model-value="(value) => setFieldValue('customerStatus', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="고객사 명" required>
            {{ detailData?.customerName }}
          </FormGroup>
          <FormGroup class="wf_flex-1" label="사업자 등록번호" required is-border-left> {{ detailData?.bizRegNum }} </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="사업자 구분" required>
            <WelfareRadioGroup size="sm" :gap="20" :options="CustomerRegistrationRadioOption" :model-value="values.bizType" disabled />
          </FormGroup>
          <FormGroup class="wf_flex-1" label="사업자 등록번호" required is-border-left> {{ detailData?.corpRegNum }} </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="업태" required>
            {{ detailData?.bizCategoryName }}
          </FormGroup>
          <FormGroup class="wf_flex-1" label="업종" required is-border-left>
            {{ detailData?.bizItemName }}
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 address-customer-group-form" label="사업장 소재지" required>
            <div class="wf-space-y-6">
              <div class="wf-space-x-6 tag-content-center">
                <p class="tag-info-shipping">도로명 주소</p>
                <span> {{ detailData?.streetAddress }}</span>
              </div>
              <div class="wf-space-x-14 tag-content-center">
                <p class="tag-info-shipping">지번 주소</p>
                <span> {{ detailData?.address }}</span>
              </div>
              <div class="wf-space-x-14 tag-content-center">
                <p class="tag-info-shipping">상세주소</p>
                <span> {{ detailData?.addressDetail }}</span>
                <span> {{ detailData?.zipCode }}</span>
              </div>
            </div>
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="대표자 명" required>
            {{ detailData?.representativeName }}
          </FormGroup>
          <FormGroup class="wf_flex-1" label="대표 전화번호" required is-border-left>
            {{ detailData?.representativeTelNum }}
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="사업자등록증" required>
            <div class="wf_flex-1">{{ detailData?.bizRegDocumentFileOriginName }}({{ detailData?.bizRegDocumentFileSize }}MB)</div>
            <WelfareMdButton button-size="small" label="다운로드" buttonType="neutral" @on-click="getFileRegistration" />
          </FormGroup>
          <FormGroup class="wf_flex-1" label="회사소개서" required is-border-left>
            <div class="wf_flex-1">{{ detailData?.introductionDocumentFileOriginName }}({{ detailData?.introductionDocumentFileSize }}MB)</div>
            <WelfareMdButton button-size="small" label="다운로드" buttonType="neutral" @on-click="getFileIntroduce" />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 introduce-group-form" label="회사소개문구" required>
            {{ detailData?.introductionContent }}
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="회사 홈페이지" :is-border-bottom="false" is-rounded-bottom>
            <a v-if="!!detailData?.customerDomainUrl" :href="detailData?.customerDomainUrl" target="_blank" class="wf_text-n-33">
              {{ detailData?.customerDomainUrl }}</a
            >
          </FormGroup>
        </div>
      </div>
    </div>
    <!-- section 2 -->
    <div class="wf-sub_tit_01 wf-mt-20 wf-mb-10 wf_flex wf_justify-between">
      <span>| 사이트 정보</span>
      <span class="wf-body_04-reg wf_text-sub-01"
        >※ 복지몰 아이디는 복지몰 URL에 사용되는 명칭으로, 사이트 관리자와 협의없이 변경할 수 없습니다.</span
      >
    </div>
    <div class="wf_line" />
    <div class="wf-group-container">
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1" label="복지몰 아이디" required :is-border-bottom="false">
          {{ detailData?.customerId }}
        </FormGroup>
        <FormGroup class="wf_flex-1" label="복지몰 URL" required :is-border-bottom="false" is-border-left>
          <a v-if="!!detailData?.companyHomePageUrl" :href="detailData?.companyHomePageUrl" target="_blank" class="wf_text-n-33">
            {{ detailData?.companyHomePageUrl }}</a
          >
        </FormGroup>
      </div>
    </div>
    <!-- section 3 -->
    <div class="wf-sub_tit_01 wf-mt-20 wf-mb-10 wf_flex wf_justify-between">
      <span>| 마스터 계정 정보</span>
      <span class="wf-body_04-reg wf_text-sub-01">*담당자 정보 수정은 마스터 관리자 정보 수정 시 반영 됩니다.</span>
    </div>
    <div class="wf_line" />
    <div class="wf-group-container">
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1" label="담당자" required>
          {{ masterData?.managerName }}
        </FormGroup>
        <FormGroup class="wf_flex-1" label="관리자 마스터 ID" required is-border-left>
          {{ masterData?.managerId }}
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1" label="휴대폰 번호" required :is-border-bottom="false">
          {{ masterData?.phone }}
        </FormGroup>
        <FormGroup class="wf_flex-1" label="이메일 주소" required :is-border-bottom="false" is-border-left>
          {{ masterData?.email }}
        </FormGroup>
      </div>
    </div>
    <!-- section 4 -->
    <div class="wf-sub_tit_01 wf-mt-20 wf-mb-10">| 등록/수정 정보</div>
    <div class="wf_line" />
    <div class="wf-group-container">
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1" label="수정일시">
          {{ detailData?.auditing?.modifiedDate ? formatTime(detailData?.auditing.modifiedDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) : '' }}
        </FormGroup>
        <FormGroup class="wf_flex-1" label="수정자" required is-border-left>
          {{ detailData?.auditing?.modifierName }}
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1" label="등록일시" :is-border-bottom="false">
          {{ detailData?.auditing?.registeredDate ? formatTime(detailData?.auditing.registeredDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) : '' }}
        </FormGroup>
        <FormGroup class="wf_flex-1" label="등록자" :is-border-bottom="false" is-border-left>
          {{ detailData?.auditing?.registerName }}
        </FormGroup>
      </div>
    </div>
    <!-- footer -->
    <div class="wf_flex wf_justify-center wf-gap-20 wf-mt-26">
      <RouterLink :to="COMPANY_CUSTOMER_LIST">
        <WelfareBigButton button-type="neatral" label="목록" class="wf_w-230" />
      </RouterLink>
      <WelfareBigButton button-type="default" label="저장" class="wf_w-230" @on-click="saveForm" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/company/customerManagement/company-customer-detail.css');
</style>

<script lang="ts">
export default {
  name: 'CompanyCustomerDetailPage'
}
</script>

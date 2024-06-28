<script setup lang="ts">
import {
  CompanyChargerTypeLabel,
  partnerCompanyApiStatusOptions,
  partnerCompanyAttachmentTypeOptions,
  partnerCompanyCategoryOptions,
  partnerCompanyDetailActiveOptions,
  PartnerCompanyDetailTabProps,
  partnerCompanyPermissionOptions
} from '@/models/views/partner/partnerDetail/PartnerDetailModel'
import { DataTablePaginationWithCheckbox, WelfareBigButton, WelfareMdButton, WelfareRadioGroup, WelfareSelect } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import Column from 'primevue/column'
import { YnOptions } from '@/models'
import { handleRedirectLink } from '@/common/html'
import { formatFileNameSize } from '@/common/data'
import { usePartnerManagementDetailTab } from '@/composables/partner/partnerManagementDetail/usePartnerManagementDetailTab'
import { ref } from 'vue'

const props = defineProps<PartnerCompanyDetailTabProps>()
const refTable = ref()
const clearCheckAll = () => {
  refTable?.value?.clearCheckAll()
}
const scrollToTop = () => {
  refTable?.value?.scrollToTop()
}

const {
  dataDetail,
  handleDownload,
  bankDetail,
  onChangeActive,
  items,
  isLoading,
  onPageChange,
  totalItems,
  onRowSelected,
  onSelectAllChange,
  apiKey,
  onActivateApi,
  adminMaster,
  getName,
  handleShowModalEditCharger,
  handleShowModalAddCharger,
  copyText,
  handleDeleteCharger,
  category,
  permission,
  onSave,
  onGenApiKey,
  sellerStatus
} = usePartnerManagementDetailTab({
  ...props,
  clearCheckAll: clearCheckAll,
  scrollToTop
})
</script>

<template>
  <div class="wf-partner-detail-section">
    <div class="wf-sub_tit_01 wf-partner-detail-sub-tit">기업 기본정보</div>
    <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-19">
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="판매사 코드" required>
          <span class="wf-body_03-reg">{{ dataDetail?.sellerKey ?? '' }}</span>
        </FormGroup>
        <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="판매사 상태" required>
          <WelfareRadioGroup
            size="sm"
            gap="20"
            :options="partnerCompanyDetailActiveOptions"
            :model-value="sellerStatus"
            @update:model-value="(value) => onChangeActive(value)"
            :disabled="dataDetail?.sellerStatus !== YnOptions.Y"
          />
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1" label="판매사명" custom-class="wf-pb-1 wf-pl-11" required>
          <span class="wf-body_03-reg">{{ dataDetail?.sellerName ?? '' }}</span>
        </FormGroup>
        <FormGroup class="wf_flex-1" label="사업자등록번호" is-border-left custom-class="wf-pb-1 wf-pl-11" required>
          <span class="wf-body_03-reg">{{ dataDetail?.bizRegNum ?? '' }}</span>
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup label="사업자 구분" custom-class="wf-pb-1 wf-pl-11" required>
          <WelfareRadioGroup size="sm" gap="20" :options="partnerCompanyCategoryOptions" disabled :model-value="dataDetail?.bizType" />
        </FormGroup>
        <FormGroup label="법인등록번호" is-border-left custom-class="wf-pb-1 wf-pl-11" required>
          <span class="wf-body_03-reg">{{ dataDetail?.corpRegNum ?? '' }}</span>
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup label="업태" custom-class="wf-pb-1 wf-pl-11" required>
          <span class="wf-body_03-reg">{{ dataDetail?.bizCategoryName ?? '' }}</span>
        </FormGroup>
        <FormGroup label="업종" custom-class="wf-pb-1 wf-pl-11" is-border-left required>
          <span class="wf-body_03-reg">{{ dataDetail?.bizItemName ?? '' }}</span>
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup label="통신판매업신고번호" custom-class="wf-pb-1 wf-pl-11" class="wf-h-42">
          <span class="wf-body_03-reg">{{ dataDetail?.internetSalesRegNum ?? '' }}</span>
        </FormGroup>
      </div>
      <div class="wf_flex">
        <FormGroup label="사업장 소재지" custom-class="wf-pb-1 wf-pl-11" required>
          <div class="wf_flex wf_flex-col wf_py-13 wf_row_gap-6">
            <div class="wf_flex wf_items-center wf_col_gap-14">
              <div class="wf-partner-detail-address-tag">도로명 주소</div>
              {{ dataDetail?.streetAddress ?? '' }}
            </div>
            <div class="wf_flex wf_items-center wf_col_gap-14">
              <div class="wf-partner-detail-address-tag">지번 주소</div>
              {{ dataDetail?.address ?? '' }}
            </div>
            <div class="wf_flex wf_items-center wf_col_gap-14">
              <div class="wf-partner-detail-address-tag">상세주소</div>
              {{ dataDetail?.addressDetail ?? '' }}
            </div>
          </div>
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup label="대표자 명" custom-class="wf-pb-1 wf-pl-11" required>
          <span class="wf-body_03-reg">{{ dataDetail?.representativeName ?? '' }}</span>
        </FormGroup>
        <FormGroup label="대표자 생년월일" custom-class="wf-pb-1 wf-pl-11" is-border-left required>
          <span class="wf-body_03-reg">{{ dataDetail?.representativeBirthDate ?? '' }}</span>
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup label="대표 전화번호" custom-class="wf-pb-1 wf-pl-11" required>
          <span class="wf-body_03-reg">{{ dataDetail?.representativeTelNum ?? '' }}</span>
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup label="사업자등록증" custom-class="wf-pb-1 wf-pl-11 wf_justify-between" required>
          <span class="wf-body_03-reg">
            {{ formatFileNameSize(dataDetail?.bizRegDocumentFileOriginName, dataDetail?.bizRegDocumentFileSize) }}
          </span>
          <WelfareMdButton
            class="wf-ml-6"
            button-size="small"
            label="다운로드"
            buttonType="neutral"
            v-if="dataDetail?.bizRegDocumentFileDownloadLink && dataDetail?.bizRegDocumentFileOriginName"
            @click="handleDownload(dataDetail?.bizRegDocumentFileDownloadLink, dataDetail?.bizRegDocumentFileOriginName)"
          >
          </WelfareMdButton>
        </FormGroup>
        <FormGroup label="회사소개서" custom-class="wf-pb-1 wf-pl-11 wf_justify-between" is-border-left required>
          <span class="wf-body_03-reg">
            {{ formatFileNameSize(dataDetail?.introductionDocumentFileOriginName, dataDetail?.introductionDocumentFileSize) }}
          </span>
          <WelfareMdButton
            class="wf-ml-6"
            button-size="small"
            label="다운로드"
            buttonType="neutral"
            v-if="dataDetail?.introductionDocumentFileDownloadLink && dataDetail?.introductionDocumentFileOriginName"
            @click="handleDownload(dataDetail?.introductionDocumentFileDownloadLink, dataDetail?.introductionDocumentFileOriginName)"
          >
          </WelfareMdButton>
        </FormGroup>
      </div>
      <div class="wf_flex">
        <FormGroup label="회사소개문구" custom-class="wf-pb-1 wf-pl-11" required>
          <div class="wf-body_03-reg wf-partner-detail-introduction-content">{{ dataDetail?.introductionContent ?? '' }}</div>
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup label="회사 홈페이지" custom-class="wf-pb-1 wf-pl-11" required is-rounded-bottom :is-border-bottom="false">
          <a class="wf-body_03-reg wf_text-n-33" :href="dataDetail?.companyHomePageUrl ?? '#'" target="_blank">
            {{ dataDetail?.companyHomePageUrl ?? '' }}
          </a>
        </FormGroup>
      </div>
    </div>
  </div>
  <div class="wf-partner-detail-section wf-mt-31">
    <div class="wf-sub_tit_01 wf-partner-detail-sub-tit">업무 담당자</div>
    <div class="wf_flex wf_flex-col wf_row_gap-16">
      <div>
        <DataTablePaginationWithCheckbox
          :value="items"
          @page-change="onPageChange"
          @select-all-change="onSelectAllChange"
          @row-checked-change="onRowSelected"
          :total-records="totalItems"
          :loading="isLoading"
          ref="refTable"
          is-select-invisible
        >
          <template #title>
            <div></div>
          </template>
          <template #buttons>
            <div class="wf_flex wf_justify-end wf_col_gap-4">
              <WelfareMdButton class="wf-w-45" label="수정" button-type="neutral" @click="handleShowModalEditCharger"></WelfareMdButton>
              <WelfareMdButton class="wf-w-45" label="삭제" button-type="neutral" @click="handleDeleteCharger"></WelfareMdButton>
              <WelfareMdButton class="wf-w-84" label="담당자 추가" button-type="default" @click="handleShowModalAddCharger"></WelfareMdButton>
            </div>
          </template>
          <template #columns>
            <Column key="id" columnKey="id" header="No." class="wf_m-w-50">
              <template #body="slotProps">
                <span>{{ slotProps.data.id }}</span>
              </template>
            </Column>
            <Column key="chargerType" columnKey="chargerType" header="직무" class="wf_m-w-50">
              <template #body="slotProps">
                <span>{{ CompanyChargerTypeLabel[slotProps.data.chargerType] ?? '' }}</span>
              </template>
            </Column>
            <Column key="chargerName" columnKey="chargerName" header="담당자명" class="wf_m-w-150">
              <template #body="slotProps">
                <span>{{ slotProps.data.chargerName ?? '' }}</span>
              </template>
            </Column>
            <Column key="chargerPosition" columnKey="chargerPosition" header="직급" class="wf_m-w-150">
              <template #body="slotProps">
                <span>{{ slotProps.data.chargerPosition ?? '' }}</span>
              </template>
            </Column>
            <Column key="chargerPhone" columnKey="chargerPhone" header="휴대폰번호" class="wf_m-w-200">
              <template #body="slotProps">
                <span>{{ slotProps.data.chargerPhone ?? '' }}</span>
              </template>
            </Column>
            <Column key="chargerEmail" columnKey="chargerEmail" header="이메일 주소" class="wf_m-w-200">
              <template #body="slotProps">
                <a class="wf_text-sub-02" href="#">
                  {{ slotProps.data.chargerEmail ?? '' }}
                </a>
              </template>
            </Column>
            <Column key="registerName" columnKey="registerName" header="등록자" class="wf_m-w-150">
              <template #body="slotProps">
                <span>{{ getName(slotProps.data.auditing.registerName, slotProps.data.auditing.registerKey) }}</span>
              </template>
            </Column>
            <Column key="registeredDate" columnKey="registeredDate" header="등록일시" class="wf_m-w-200">
              <template #body="slotProps">
                <span>{{ slotProps.data.auditing.registeredDate ?? '' }}</span>
              </template>
            </Column>
            <Column key="modifierName" columnKey="modifierName" header="수정자" class="wf_m-w-150">
              <template #body="slotProps">
                <span>
                  {{ getName(slotProps.data.auditing.modifierName, slotProps.data.auditing.modifierKey) }}
                </span>
              </template>
            </Column>
            <Column key="modifiedDate" columnKey="modifiedDate" header="수정일시" class="wf_m-w-200">
              <template #body="slotProps">
                <span>{{ slotProps.data.auditing.modifiedDate ?? '' }}</span>
              </template>
            </Column>
          </template>
        </DataTablePaginationWithCheckbox>
      </div>
    </div>
  </div>
  <div class="wf-partner-detail-section wf-mt-15">
    <div class="wf-sub_tit_01 wf-partner-detail-sub-tit wf_flex wf_justify-between">
      <span> 마스터 계정 정보 </span>
      <span class="wf-warning-sub-text">
        {{ adminMaster ? '*마스터 계정 정보는 마스터 관리자 정보 수정 시 반영 됩니다.' : '※ 마스터 관리자를 등록하여 판매사 등록을 완료해 주세요.' }}
      </span>
    </div>
    <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-10">
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="관리자 명" required>
          <span class="wf-body_03-reg">
            {{ adminMaster?.managerName ?? '' }}
          </span>
        </FormGroup>
        <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="관리자 마스터 ID" required>
          <span class="wf-body_03-reg">
            {{ adminMaster?.managerId ?? '' }}
          </span>
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1 wf-h-42" custom-class="wf-pb-1 wf-pl-11" is-rounded-bottom :is-border-bottom="false" label="휴대폰 번호" required>
          <span class="wf-body_03-reg">
            {{ adminMaster?.phone ?? '' }}
          </span>
        </FormGroup>
        <FormGroup class="wf_flex-1 wf-h-42" custom-class="wf-pb-1 wf-pl-12" is-border-left :is-border-bottom="false" label="이메일 주소" required>
          <span class="wf-body_03-reg">
            {{ adminMaster?.email ?? '' }}
          </span>
        </FormGroup>
      </div>
    </div>
  </div>
  <div class="wf-partner-detail-section wf-mt-31">
    <div class="wf-sub_tit_01 wf-partner-detail-sub-tit">판매상품정보</div>
    <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-10">
      <div class="wf_flex">
        <FormGroup label="판매 카테고리" custom-class="wf-pb-1 wf-pl-11" required is-rounded-top>
          <div class="wf_flex wf_flex-col wf_row_gap-6 wf_py-13">
            <div v-for="item in category" class="wf_flex wf_col_gap-4 wf_items-center" :key="item.categoryKey">
              <div v-if="item.isRepresentative" class="wf-partner-default-category-tag">대표</div>
              <span class="wf-body_03-reg">
                {{ item.standardCategoryName }} (담당 MD : {{ item.chargeMdName }} ({{ item.chargeMdKey ?? '' }})) / 계약 마진율
                {{ item.marginRate }}%
              </span>
            </div>
          </div>
        </FormGroup>
      </div>
      <div class="wf_flex">
        <FormGroup label="특정 상품 판매권한" custom-class="wf-pb-1 wf-pl-11" :is-border-bottom="false" is-rounded-bottom required>
          <div class="wf_flex wf_flex-col wf_row_gap-10 wf_py-14">
            <div class="wf_flex wf_items-center wf_col_gap-4">
              <WelfareRadioGroup
                :options="partnerCompanyPermissionOptions"
                size="sm"
                gap="20"
                :model-value="permission?.submitSpecificProductSalesPermission"
                disabled
              />
              <span class="wf-warning-sub-text"
                >※ 하기 상품 판매사는 판매권한 신청 후 서류 제출을 완료해야 상품 판매가 가능합니다. (미신청 시 관련 카테고리 비노출)</span
              >
            </div>
            <div class="wf_flex wf_items-center wf_col_gap-20" v-for="(item, index) in permission?.specificProductSalesPermissionList" :key="index">
              <WelfareSelect
                :model-value="item.permissionType"
                :options="partnerCompanyAttachmentTypeOptions"
                optionLabel="label"
                option-value="value"
                class="wf_w-180"
                small
                disabled
              />
              <span class="wf-body_03-reg"> {{ formatFileNameSize(item.permissionFileOriginName, item.permissionFileSize) }} </span>
              <WelfareMdButton
                button-size="small"
                label="다운로드"
                button-type="neutral"
                v-if="item.permissionFileDownloadLink && item.permissionFileOriginName"
                @click="handleDownload(item.permissionFileDownloadLink, item.permissionFileOriginName)"
              ></WelfareMdButton>
            </div>
          </div>
        </FormGroup>
      </div>
    </div>
  </div>
  <div class="wf-partner-detail-section wf-mt-31">
    <div class="wf-sub_tit_01 wf-partner-detail-sub-tit">지불 계좌 정보</div>
    <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-10">
      <div class="wf_flex wf_items-center">
        <FormGroup label="거래은행" custom-class="wf-pb-1 wf-pl-11" is-rounded-top required>
          <span class="wf-body_03-reg">
            {{ bankDetail?.bankCode ?? '' }}
          </span>
        </FormGroup>
        <FormGroup label="거래은행지점" is-border-left custom-class="wf-pb-1 wf-pl-11" required>
          <span class="wf-body_03-reg">
            {{ bankDetail?.bankBranchName ?? '' }}
          </span>
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup label="거래은행계좌번호" custom-class="wf-pb-1 wf-pl-11" required>
          <span class="wf-body_03-reg">
            {{ bankDetail?.accountNumber ?? '' }}
          </span>
        </FormGroup>
        <FormGroup label="거래계좌예금주" custom-class="wf-pb-1 wf-pl-11" is-border-left required>
          <span class="wf-body_03-reg">
            {{ bankDetail?.accountHolderName ?? '' }}
          </span>
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup label="계좌 사본" custom-class="wf-pb-1 wf-pl-11" is-rounded-bottom :is-border-bottom="false" required class="wf-h-42">
          <div class="wf_col_gap-20 wf_flex wf_items-center">
            <span class="wf-body_03-reg">
              {{ formatFileNameSize(bankDetail?.accountImageOriginName, bankDetail?.accountImageSize) }}
            </span>
            <WelfareMdButton
              button-type="neutral"
              label="다운로드"
              button-size="small"
              v-if="bankDetail?.accountImageDownloadLink && bankDetail?.accountImageOriginName"
              @click="handleDownload(bankDetail?.accountImageDownloadLink, bankDetail?.accountImageOriginName)"
            ></WelfareMdButton>
          </div>
        </FormGroup>
      </div>
    </div>
  </div>
  <div class="wf-partner-detail-section">
    <div class="wf-pb-10 wf-sub_tit_01 wf-partner-detail-sub-tit">API 정보</div>
    <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-10">
      <div class="wf_flex wf_items-center">
        <FormGroup
          class="wf_flex-1 wf-h-42"
          custom-class="wf-pb-1 wf-pl-11 wf_justify-between"
          is-rounded-top
          is-rounded-bottom
          :is-border-bottom="false"
          label="API KEY"
          required
        >
          <!--          <TextInputWithMaxLengthCharacters-->
          <!--            :model-value="apiKeyInput"-->
          <!--            v-if="!apiKey?.apiKey"-->
          <!--            :max-length="TEXT_MAX_NUMBER_10"-->
          <!--            @update:modelValue="(value: string) => onChangeApiKey(value)"-->
          <!--          ></TextInputWithMaxLengthCharacters>-->

          <span class="wf-body_03-reg wf-no-select">
            {{ apiKey?.apiKey ?? '' }}
          </span>
          <div class="wf_flex wf_col_gap-4">
            <WelfareMdButton
              button-type="neutral"
              label="복사"
              button-size="small"
              @click="copyText(apiKey?.apiKey ?? '')"
              :disabled="!Boolean(apiKey?.apiKey) || apiKey?.useYn !== YnOptions.Y"
              class="wf_w-44"
            ></WelfareMdButton>
            <WelfareMdButton
              button-type="default"
              label="생성"
              button-size="small"
              :disabled="Boolean(apiKey?.apiKey)"
              @click="onGenApiKey"
              class="wf_w-44"
            ></WelfareMdButton>
          </div>
        </FormGroup>
        <FormGroup class="wf_flex-1 wf-h-42" custom-class="wf-pb-1 wf-pl-12" is-border-left label="API 사용 설정" :is-border-bottom="false" required>
          <WelfareRadioGroup
            :options="partnerCompanyApiStatusOptions"
            size="sm"
            gap="20"
            :model-value="apiKey?.useYn"
            @update:model-value="(value) => onActivateApi(value)"
          />
        </FormGroup>
      </div>
    </div>
  </div>
  <div class="wf-partner-detail-section wf-mt-31">
    <div class="wf-sub_tit_01 wf-partner-detail-sub-tit">등록/수정 정보</div>
    <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-10">
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="수정일시">
          <span class="wf-body_03-reg">
            {{ dataDetail?.auditing?.modifiedDate ?? '' }}
          </span>
        </FormGroup>
        <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="수정자">
          <span class="wf-body_03-reg">
            {{ getName(dataDetail?.auditing?.modifierName, (dataDetail?.auditing?.modifierKey ?? '') as string) }}
          </span>
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1 wf-h-42" custom-class="wf-pb-1 wf-pl-11" is-rounded-bottom :is-border-bottom="false" label="등록일시">
          <span class="wf-body_03-reg">
            {{ dataDetail?.auditing?.registeredDate ?? '' }}
          </span>
        </FormGroup>
        <FormGroup class="wf_flex-1 wf-h-42" custom-class="wf-pb-1 wf-pl-12" is-border-left :is-border-bottom="false" label="등록자">
          <span class="wf-body_03-reg">
            {{ getName(dataDetail?.auditing?.registerName, (dataDetail?.auditing?.registerKey ?? '') as string) }}
          </span>
        </FormGroup>
      </div>
    </div>
  </div>
  <div class="wf-partner-detail-section wf_flex wf_col_gap-20 wf_justify-center">
    <WelfareBigButton label="목록" button-type="neatral" @click="handleRedirectLink(`${VENDER_MANAGER_LIST_ROUTER}`)"></WelfareBigButton>
    <WelfareBigButton label="저장" button-type="default" @click="onSave"></WelfareBigButton>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/partner/partner-detail/partner-detail.css');
</style>

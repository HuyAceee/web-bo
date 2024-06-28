<!-- BO_N0101_020302 -->
<script lang="ts" setup>
import { DEFAULT_DATE_FORMAT_DOT, formatTime } from '@/common'
import { formatFileNameSize } from '@/common/data'
import { WelfareMdButton, WelfareRadioGroup, WelfareSelect } from '@/components'
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { usePartnerSellerContractDetail } from '@/composables/partner/usePartnerSellerContractDetail'
import {
  partnerRegisterForSalesOptionsOptions,
  PartnerApplicationProductStatusOptions
} from '@/models/views/partner/PartnerSellerContractDetailModel'
const {
  registerForSalesOptions,
  contractInfo,
  contractTerm,
  partnerContractStatusConvert,
  partnerContractTypeConvert,
  bankAccountInfo,
  permissions,
  salesCategories,
  salesCategoryItem,
  onClickDownloadFile,
  isContractExtension,
  linkToContractInfo,
  linkToContractPeriod
} = usePartnerSellerContractDetail()
</script>
<template>
  <div class="wf-p-30">
    <ProductTitle title="기본 계약정보" />
    <div class="wf-mt-20 wf-btn-border--bg-color-line-gray wf_br-6">
      <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-12" is-rounded-top label="판매사명" required>
        <span class="wf-body_03-reg wf_text-n-33">{{ `${contractInfo?.sellerName} (${contractInfo?.sellerKey})` }}</span>
      </FormGroup>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="계약기간" required>
          <div class="wf_flex wf_flex-1 wf_justify-between wf_items-center">
            <span class="wf-body_03-reg wf_text-n-33">{{ contractTerm }}</span>
            <WelfareMdButton
              v-if="!isContractExtension"
              label="계약 연장"
              buttonType="default"
              buttonSize="small"
              class="wf_w-68"
              @on-click="linkToContractPeriod"
            />
          </div>
        </FormGroup>
        <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-12" is-border-left label="계약상태" required>
          <span class="wf-body_03-reg wf_text-n-33">{{ partnerContractStatusConvert(contractInfo?.contractStatus ?? '') }}</span>
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="계약일" required>
          <span class="wf-body_03-reg wf_text-n-33">{{
            contractInfo?.contractRegDate && formatTime(contractInfo?.contractRegDate, DEFAULT_DATE_FORMAT_DOT)
          }}</span>
        </FormGroup>
        <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-12" is-border-left label="정산일" required>
          <span class="wf-body_03-reg wf_text-n-33">{{ `매월 ${contractInfo?.settlementDate}일` }}</span>
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="계약 유형" required>
          <span class="wf-body_03-reg wf_text-n-33">{{ partnerContractTypeConvert(contractInfo?.contractType ?? '') }}</span>
        </FormGroup>
        <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-12" is-border-left label="계약서" required>
          <div class="wf_flex wf_flex-1 wf_items-center">
            <span class="wf-body_03-reg wf_text-n-33 wf_m-w-170 wf-pr-20">{{
              formatFileNameSize(contractInfo?.contractFileOriginName, contractInfo?.contractFileSize ?? 0)
            }}</span>
            <WelfareMdButton
              label="다운로드"
              buttonType="liner"
              buttonSize="small"
              class="wf_w-68"
              @on-click="onClickDownloadFile(contractInfo?.contractFileDownloadLink ?? '', contractInfo?.contractFileOriginName ?? '')"
            />
          </div>
        </FormGroup>
      </div>
    </div>
    <div class="wf-mt-30">
      <ProductTitle title="판매상품정보" />
      <div class="wf-mt-20 wf-btn-border--bg-color-line-gray wf_br-6">
        <FormGroup class="wf_flex-1 wf_partner-sales-product" custom-class="wf-pb-1 wf-pl-12" is-rounded-top label="판매사명" required>
          <div class="wf_w-full wf-body_03-reg wf-pt-14 wf-pb-14">
            <div v-for="(item, index) in salesCategories" :key="index" class="wf-body_03-reg wf_text-n-33">
              <div :class="item.isRepresentative && 'wf-mb-10'">
                <span class="wf-partner-represent" v-if="item.isRepresentative">대표 </span>
                <span>{{ salesCategoryItem(item) }} </span>
              </div>
            </div>
          </div>
        </FormGroup>
        <FormGroup class="wf_flex-1 wf_partner-sales-product" custom-class="wf-pb-1 wf-pl-12" is-rounded-top label="판매사명" required>
          <div class="wf_w-full wf-pt-14 wf-pb-14">
            <div class="wf_flex wf_flex-1 wf_items-center">
              <WelfareRadioGroup disabled :options="partnerRegisterForSalesOptionsOptions" size="sm" :model-value="registerForSalesOptions" />
              <p class="wf-pl-10 wf-partner-text-row-warning">
                *하기 상품 판매사는 판매권한 신청 후 서류 제출을 완료해야 상품 판매가 가능합니다. (미신청 시 관련 카테고리 비노출)
              </p>
            </div>
            <div v-for="(item, index) in permissions" :key="index" class="wf_flex wf_flex-1 wf_items-center wf-mt-12 wf-space-x-20">
              <WelfareSelect
                :model-value="item.permissionType"
                class="wf_w-300"
                option-label="label"
                option-value="value"
                :options="PartnerApplicationProductStatusOptions"
                placeholder="건강기능식품 관련"
                small
                disabled
              />
              <p v-if="item.permissionFileDownloadLink" class="wf-body_03-reg wf_text-n-33 wf-underline">
                {{ formatFileNameSize(item.permissionFileOriginName, item.permissionFileSize ?? 0) }}
              </p>
              <WelfareMdButton
                v-if="item.permissionFileDownloadLink"
                label="다운로드"
                buttonType="liner"
                buttonSize="small"
                class="wf_w-68"
                @on-click="onClickDownloadFile(item?.permissionFileDownloadLink ?? '', item?.permissionFileOriginName ?? '')"
              />
            </div>
          </div>
        </FormGroup>
      </div>
    </div>
    <div class="wf-mt-30">
      <ProductTitle title="지불 계좌 정보" />
      <div class="wf-mt-20 wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-12" is-border-left label="거래은행" required>
            <span class="wf-body_03-reg wf_text-n-33">{{ bankAccountInfo?.bankCode }}</span>
          </FormGroup>
          <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-12" is-border-left label="거래은행지점" required>
            <span class="wf-body_03-reg wf_text-n-33">{{ bankAccountInfo?.bankBranchName }}</span>
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="거래은행계좌번호" required>
            <span class="wf-body_03-reg wf_text-n-33">{{ bankAccountInfo?.accountNumber }}</span>
          </FormGroup>
          <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-12" is-border-left label="거래계좌예금주" required>
            <span class="wf-body_03-reg wf_text-n-33">{{ bankAccountInfo?.accountHolderName }}</span>
          </FormGroup>
        </div>
        <FormGroup class="wf_flex-1 wf_w-44" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="계좌 사본" required>
          <div class="wf_flex wf_flex-1 wf_items-center">
            <span class="wf_flex wf-body_03-reg wf_text-n-33 wf-pr-20">{{
              formatFileNameSize(bankAccountInfo?.accountImageOriginName, bankAccountInfo?.accountImageSize ?? 0)
            }}</span>
            <WelfareMdButton
              label="다운로드"
              buttonType="liner"
              buttonSize="small"
              class="wf_w-68"
              @on-click="onClickDownloadFile(bankAccountInfo?.accountImageDownloadLink ?? '', bankAccountInfo?.accountImageOriginName ?? '')"
            />
          </div>
        </FormGroup>
      </div>
    </div>
    <div class="wf-mt-29 wf_flex wf_flex-1 wf_items-center wf_justify-center">
      <WelfareMdButton label="목록" buttonType="liner" buttonSize="small" class="wf_w-230 wf-partner-h-50" @on-click="linkToContractInfo" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/partner/partner-seller-contract-detail.css');
</style>

<!-- BO_M0101_010101 -->
<script setup lang="ts">
import { FORMAT_DATE_YYYY_MM_DD_hh_mm_ss, TEXT_MAX_NUMBER_50, TEXT_MAX_NUMBER_60, formatTime } from '@/common'
import {
  DataTableContainer,
  TextInputValidationMaxBytes,
  TextInputWithMaxLengthCharacters,
  WelfareBigButton,
  WelfareMdButton,
  WelfareRadioGroup
} from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useOperatingSiteForm } from '@/composables/operating/operatingManagement/site/useOperatingSiteForm'
import {
  OperatingSiteManagementEmits,
  operatingSiteManagementHeaderConfig
} from '@/models/views/operating/operatingMangement/OperatingSiteCategoryModel'

const emits = defineEmits<OperatingSiteManagementEmits>()
const { parentDetail, dataDetail, formValue, handleChange, handleDeleteSite, saveForm, checkMenuIdExisteded, onValidateMenuID } =
  useOperatingSiteForm(emits)
const exhibitionStatusOptions = [
  { value: 'Y', label: '전시' },
  { value: 'N', label: '비전시' }
]
const SubMenuOptions = [
  { value: 'Y', label: '사용' },
  { value: 'N', label: '미사용' }
]
const PersonalInformationIncludeOptions = [
  { value: 'Y', label: '포함' },
  { value: 'N', label: '미포함' }
]

const NotedList = [
  '메뉴의 고유 ID를 영어 알파벳으로 입력 해주세요.',
  '띄어쓰기가 필요한 경우 언더바 ‘_’ 로 구분 해주세요. (예시. Member_List)',
  '메뉴 ID는 depth와 관계없이 다른 메뉴와 중복으로 등록할 수 없습니다.',
  '메뉴 ID는 최초 등록 완료 후 수정할 수 없습니다.'
]
</script>

<template>
  <div class="wf_text-n-33">
    <div class="wf-register-site-menu--container">
      <div class="wf-register-site-menu">
        <div>
          <div class="wf-sub_tit_01 wf-site-menu--header">| 메뉴 상세</div>
          <div class="wf-mt-24">
            <span class="wf-body_01-semi">| 메뉴 정보</span>
            <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-10">
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="상위 메뉴명">
                  <span class="wf-body_03-reg">{{ dataDetail?.parentMenuName || '-' }}</span>
                </FormGroup>
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="상위 메뉴 ID">
                  <span class="wf-body_03-reg">{{ dataDetail?.parentMenuKey || '-' }}</span>
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="레벨">
                  <span class="wf-body_03-reg">{{ dataDetail?.menuDepth || 1 }}</span>
                </FormGroup>
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="전시여부" required>
                  <WelfareRadioGroup
                    size="sm"
                    :gap="20"
                    :options="exhibitionStatusOptions"
                    :model-value="formValue.menuExhibitionStatus"
                    @update:model-value="(value) => handleChange('menuExhibitionStatus', value)"
                  />
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="메뉴명" required>
                  <TextInputValidationMaxBytes
                    size="small"
                    @update:model-value="(menuName) => handleChange('menuName', menuName)"
                    :model-value="formValue.menuName"
                    placeholder="한글 기준 30자 이내로 입력 해주세요"
                    class="wf_w-300"
                    :max-bytes="TEXT_MAX_NUMBER_60"
                  />
                </FormGroup>
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="메뉴 ID" required :note-array="NotedList">
                  <TextInputWithMaxLengthCharacters
                    size="small"
                    :model-value="formValue.menuId?.toString()"
                    @update:model-value="(menuId) => handleChange('menuId', menuId)"
                    :disabled="!!formValue.menuKey"
                    placeholder="영어 기준 50자 이내로 입력 해주세요."
                    class="wf_w-full"
                    :max-length="TEXT_MAX_NUMBER_50"
                    :on-validate-content="onValidateMenuID"
                    message-warning="영어 기준 50자 이내로 입력 해주세요."
                  />
                  <WelfareMdButton
                    class="wf-ml-6"
                    button-size="small"
                    label="중복확인"
                    buttonType="neutral"
                    :disabled="!!formValue.menuKey"
                    @click="
                      () => {
                        checkMenuIdExisteded()
                      }
                    "
                  />
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="위치">
                  <span class="wf-body_03-reg">{{
                    [
                      '홈',
                      ...Array(dataDetail?.menuDepth || 1)
                        .fill(0)
                        .map((_, index) => {
                          return index + 1 + 'depth'
                        })
                    ].join(' > ')
                  }}</span>
                </FormGroup>
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="하위 메뉴 사용 여부">
                  <WelfareRadioGroup
                    size="sm"
                    :gap="20"
                    :options="SubMenuOptions"
                    :disabled="parentDetail ? parentDetail.menuDepth >= 2 : false"
                    :model-value="formValue.subMenuActive"
                    @update:model-value="(value) => handleChange('subMenuActive', value)"
                  />
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" :is-border-bottom="false" is-rounded-bottom label="개인정보 포함여부">
                  <WelfareRadioGroup
                    size="sm"
                    :gap="20"
                    :options="PersonalInformationIncludeOptions"
                    :model-value="formValue.personalInformationInclude"
                    :disabled="formValue?.menuKey ? dataDetail?.menuDepth !== 1 : !!dataDetail?.parentMenuKey"
                    @update:model-value="(value) => handleChange('personalInformationInclude', value)"
                  />
                </FormGroup>
              </div>
            </div>
          </div>
          <div class="wf-mt-24">
            <span class="wf-body_01-semi">| 하위 메뉴 정보</span>
            <div class="wf-operating-site-manage-table">
              <DataTableContainer
                is-select-invisible
                :value="dataDetail?.subSiteMenu"
                :column-configs="operatingSiteManagementHeaderConfig"
                resizable-columns
              />
            </div>
          </div>
          <div class="wf-mt-24">
            <span class="wf-body_01-semi">| 등록정보</span>
            <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-10">
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1 wf_text-n-33" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="메뉴 구분">
                  <span class="wf-body_03-reg">{{ dataDetail?.menuKey ? dataDetail?.auditing?.modifierName : '신규 등록' }}</span>
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1 wf_text-n-33" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="등록자">
                  <span class="wf-body_03-reg">{{ dataDetail?.auditing?.registerName }}</span>
                </FormGroup>
                <FormGroup class="wf_flex-1 wf_text-n-33" custom-class="wf-pb-1 wf-pl-12" is-border-left label="등록일">
                  <span class="wf-body_03-reg">{{
                    dataDetail?.auditing?.registeredDate ? formatTime(dataDetail?.auditing?.registeredDate, FORMAT_DATE_YYYY_MM_DD_hh_mm_ss) : '-'
                  }}</span>
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" :is-border-bottom="false" is-rounded-bottom label="수정자">
                  <span class="wf-body_03-reg">{{
                    dataDetail?.menuKey ? dataDetail?.auditing?.modifierName + ' (' + (dataDetail?.auditing?.modifierKey || '-') + ')' : '-'
                  }}</span>
                </FormGroup>
                <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left :is-border-bottom="false" label="수정일">
                  <span class="wf-body_03-reg">{{
                    dataDetail?.auditing?.modifiedDate ? formatTime(dataDetail?.auditing?.modifiedDate, FORMAT_DATE_YYYY_MM_DD_hh_mm_ss) : '-'
                  }}</span>
                </FormGroup>
              </div>
            </div>
          </div>
        </div>
        <div class="wf-site-menu-depth-actions wf-gap-20 wf-mt-26">
          <WelfareBigButton button-type="cancel" label="삭제" class="wf_w-200" @on-click="handleDeleteSite()" />
          <WelfareBigButton button-type="default" label="저장" class="wf_w-200" @on-click="saveForm()" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/operating/operating-management/operating-site-manage.css');
</style>

<script lang="ts">
export default {
  name: 'OperatingSiteManagementForm'
}
</script>

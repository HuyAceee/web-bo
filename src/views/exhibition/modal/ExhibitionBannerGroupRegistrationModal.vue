<!--BO_I0302_020101_P-->
<script setup lang="ts">
import { DataTablePaginationWithCheckbox, HeaderModal, TextInputMaxLengthValidation, WelfareMdButton, WelfareRadioGroup } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { DEFAULT_TABLE_SELECT_OPTIONS } from '@/common'
import {
  exhibitionBannerApplyChannelType,
  ExhibitionBannerGroupModalModalProps,
  exhibitionBannerGroupUseYnType,
  exhibitionGnbBannerModalTableHeaderConfig
} from '@/models/views/exhibition/modal/ExhibitionBannerGroupRegistrationModalModel'
import Column from 'primevue/column'
import { useExhibitionBannerGroupRegistrationModalLogic } from '@/composables/exhibition/modal/useExhibitionBannerGroupRegistrationModalLogic'

const props = defineProps<ExhibitionBannerGroupModalModalProps>()

const {
  bannerDetail,
  bannerExcludeList,
  onRowSelected,
  onSelectAllChange,
  onOpenModalCustomer,
  deleteCustomer,
  refTable,
  updateBannerDetail,
  onCancelPopup
} = useExhibitionBannerGroupRegistrationModalLogic(props)
</script>

<template>
  <div class="member-request-modal">
    <HeaderModal title="배너 그룹 등록" @close-modal="props.onCancel" />
    <div class="wf-p-20 wf-width-full wf_flex wf_flex-col wf-space-y-20">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-rounded-top is-rounded-bottom required label="배너 그룹명">
            <TextInputMaxLengthValidation
              :modelValue="bannerDetail?.bannerGroupName"
              @update:modelValue="
                (value) => {
                  bannerDetail.bannerGroupName = value
                }
              "
              placeholder=""
              size="small"
              class="wf-width-full"
              :max-length="20"
              hidden-warning
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="배너그룹코드">
            <p class="wf-body_03-reg">{{ bannerDetail.bannerGroupKey }}</p>
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-rounded-top is-rounded-bottom required label="사용 여부">
            <WelfareRadioGroup
              size="sm"
              :gap="20"
              :options="exhibitionBannerGroupUseYnType"
              :model-value="bannerDetail.bannerGroupUseYn"
              @update:model-value="
                (value) => {
                  bannerDetail.bannerGroupUseYn = value
                }
              "
            />
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="적용 채널" required>
            <WelfareRadioGroup
              size="sm"
              :gap="20"
              :options="exhibitionBannerApplyChannelType"
              :model-value="bannerDetail.applyChannelType"
              @update:model-value="
                (value) => {
                  bannerDetail.applyChannelType = value
                }
              "
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_flex-row wf-h-42">
          <FormGroup class="wf-width-full wf-administrator-notes" :is-border-bottom="false" is-rounded-bottom label="제외 고객사">
            <WelfareMdButton label="고객사 선택" buttonType="liner" buttonSize="small" @click="onOpenModalCustomer" />
          </FormGroup>
        </div>
      </div>

      <div class="wf_product-search-table">
        <DataTablePaginationWithCheckbox
          class="wf-mt--5"
          ref="refTable"
          :column-configs="exhibitionGnbBannerModalTableHeaderConfig"
          :value="bannerExcludeList"
          :loading="false"
          :total-records="0"
          is-select-invisible
          no-data-label="선택된 고객사가 없습니다."
          :select-props="{ small: true, options: DEFAULT_TABLE_SELECT_OPTIONS }"
          @row-checked-change="onRowSelected"
          @selectAllChange="onSelectAllChange"
        >
          <template #title>
            <div></div>
          </template>
          <template #buttons>
            <WelfareMdButton label="선택 삭제" buttonType="liner" buttonSize="small" @click="() => deleteCustomer()" />
          </template>
          <template #columns>
            <Column
              v-for="item in exhibitionGnbBannerModalTableHeaderConfig"
              :key="item.field"
              :column-key="item.field"
              :field="item.field"
              :class="item.class"
            >
              <template #header>
                <p>{{ item.header }}</p>
              </template>
              <template #body="slotProps">
                <p v-if="slotProps.field === 'no'">
                  {{ slotProps.index + 1 }}
                </p>
                <div v-else-if="slotProps.field === 'action'">
                  <WelfareMdButton label="삭제" buttonType="liner" buttonSize="small" @click="deleteCustomer(slotProps.data.id)" />
                </div>
                <p v-else>
                  {{ slotProps.data?.[item.field] }}
                </p>
              </template>
            </Column>
          </template>
        </DataTablePaginationWithCheckbox>
      </div>
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-rounded-top is-rounded-bottom label="등록자">
            <p class="wf-body_03-reg">{{ bannerDetail.createdByName }}</p>
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="등록일시">
            <p class="wf-body_03-reg">{{ bannerDetail.createdDate }}</p>
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-rounded-top is-rounded-bottom label="수정자" :is-border-bottom="false">
            <p class="wf-body_03-reg">{{ bannerDetail.lastModifiedByName }}</p>
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" is-border-left label="수정일시" :is-border-bottom="false">
            <p class="wf-body_03-reg">{{ bannerDetail.lastModifiedDate }}</p>
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full wf-mt-20">
        <WelfareMdButton class="wf_w-120" label="닫기" button-type="cancel" @on-click="onCancelPopup" />
        <WelfareMdButton class="wf_w-120" label="저장" button-type="default" @on-click="updateBannerDetail" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/exhibition/modal/exhibition-product-search-modal.css');
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>

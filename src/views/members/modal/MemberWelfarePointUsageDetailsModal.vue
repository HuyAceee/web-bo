<!-- BO_B0203_010201_P -->
<script setup lang="ts">
import { BaseDataTablePagination, WelfareMdButton } from '@/components/uikit'
import { HeaderModal } from '@/components/widgets'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import Column from 'primevue/column'
import { DEFAULT_TABLE_SELECT_OPTIONS_TWO } from '@/common'
import { useMemberWelfarePointUsageDetailLogic } from '@/composables/members/modal/useMemberWelfarePointUsageDetailLogic'
import { MemberWelfarePointUsageDetailModalProps } from '@/models/services/responses/members/MemberFoInfoResponse'
import { memberPointUsageDetailsHeaderTableConfig } from '@/models/views/members/pointUsageList/MemberPointUsageListModel'

const props = defineProps<MemberWelfarePointUsageDetailModalProps>()
const { items, isLoading, onPageChange, totalItems, refTable, onDownLoad, dataMemberModel } = useMemberWelfarePointUsageDetailLogic(props)
</script>
<template>
  <div class="member-container-modal">
    <HeaderModal title="복지포인트 이용상세" @close-modal="props.onClose" />
    <div class="member-container-modal-content wf_flex wf_flex-col wf-space-y-20">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup
            class="wf_flex-1 wf-administrator-notes"
            isRoundedTop
            isRoundedBottom
            label="고객사(고객사코드)"
            custom-class="wf-body_03-reg wf-mt--3 wf_text-n-33"
          >
            {{ dataMemberModel?.company?.customerName }}
            {{ dataMemberModel?.company?.customerKey ? ' (' + dataMemberModel?.company?.customerKey + ')' : '' }}
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" isBorderLeft label="고객사 상태" custom-class="wf-body_03-reg  wf-mt--3 wf_text-n-33">
            {{ dataMemberModel?.company?.customerStatus?.title }}
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" isBorderLeft label="계약일" custom-class="wf-body_03-reg  wf-mt--3 wf_text-n-33">
            {{ dataMemberModel?.company?.contractRegDate }}
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" label="회원명(회원코드)" custom-class="wf-body_03-reg  wf-mt--3 wf_text-n-33">
            {{ dataMemberModel?.memberName }} {{ dataMemberModel?.memberKey ? ' (' + dataMemberModel?.memberKey + ')' : '' }}
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" isBorderLeft label="계정 상태" custom-class="wf-body_03-reg wf_text-n-33 wf-mt--3">
            {{ dataMemberModel.accountStatusCode?.title }}
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-administrator-notes" isBorderLeft label="회원 등록일" custom-class="wf-body_03-reg wf_text-n-33 wf-mt--3">
            {{ dataMemberModel?.auditing?.registeredDate }}
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup
            class="wf_flex-1 wf-administrator-notes"
            :is-border-bottom="false"
            is-rounded-bottom
            label="회원등급"
            custom-class="wf-body_03-reg wf_text-n-33"
          >
            {{ dataMemberModel?.company?.rankName }}
          </FormGroup>
          <FormGroup
            class="wf_flex-1 wf-administrator-notes"
            :is-border-bottom="false"
            isBorderLeft
            label="사용 가능 복지포인트"
            custom-class="wf-body_03-reg wf-mt--3 wf_text-n-33"
          >
            {{ dataMemberModel?.pointBalance }}
          </FormGroup>
          <FormGroup
            class="wf_flex-1 wf-administrator-notes"
            :is-border-bottom="false"
            isBorderLeft
            label="소멸 예정 복지포인트"
            custom-class="wf-body_03-reg wf-mt--3 wf_text-n-33"
          >
            {{ dataMemberModel?.extinctionScheduledPoint }}
          </FormGroup>
        </div>
      </div>
      <BaseDataTablePagination
        ref="refTable"
        class="data-table-5-rows"
        :value="items"
        :loading="isLoading"
        :total-records="totalItems"
        noDataLabel="복지포인트 리스트가 없습니다."
        @page-change="onPageChange"
        select-class="wf-page-item"
        :select-props="{ small: true, options: DEFAULT_TABLE_SELECT_OPTIONS_TWO }"
      >
        <template #title>
          <h6 class="wf_table_title wf-mt-1 wf_text-n-33">복지포인트 상세 내역</h6>
        </template>
        <template #buttons>
          <div class="wf-space-x-6 wf_flex">
            <WelfareMdButton label="엑셀 다운로드" class="wf_w-91 dl-excel" buttonType="liner" button-size="small" @click="onDownLoad" />
          </div>
        </template>
        <template #columns>
          <Column
            v-for="(item, index) in memberPointUsageDetailsHeaderTableConfig"
            :key="index"
            :column-key="item.field"
            :field="item.field"
            :header="item.header"
            :class="item.class"
          >
            <template #body="slotProps">
              <span>{{ slotProps.data[item.field] }}</span>
            </template>
          </Column>
        </template>
      </BaseDataTablePagination>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MemberPointUsageDetail'
}
</script>

<style scoped>
@import url('@/assets/css/view/member/member-base-table-popup.css');
</style>

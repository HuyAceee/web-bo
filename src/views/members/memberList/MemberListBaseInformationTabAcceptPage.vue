<!-- BO_B0101_020102 -->
<script setup lang="ts">
import MemberListAcceptInformationTableWrapper from '@/components/members/memberList/MemberListAcceptInformationTableWrapper.vue'
import { WelfareRadioGroup } from '@/components/uikit'
import { useMemberListBaseInformationTabAccept } from '@/composables/members/memberList/useMemberListBaseInformationTabAccept'
import { MemberDetailBaseTabProps, memberAgreeRadiosList } from '@/models'
import Column from 'primevue/column'
import BaseDataTreeTablePagination from '@/components/uikit/table/BaseDataTreeTablePagination.vue'
import IconLeafExpandedMenu from '@/components/icons/IconLeafExpandedMenu.vue'
const props = defineProps<MemberDetailBaseTabProps>()

const { handleAgreeInformation, handleResetInformation, acceptListData, handleSaveInformation, toggleExpandedMarketingMall, expandedKeys } =
  useMemberListBaseInformationTabAccept(props)
</script>
<template>
  <div>
    <MemberListAcceptInformationTableWrapper
      v-for="(item, index) in acceptListData"
      :key="index"
      @reset="() => handleResetInformation(index)"
      @save="() => handleSaveInformation(index)"
      :classGroup="item.classGroup"
      :title="item.label"
    >
      <div class="wf-base-table-wrap p-tree-datatable-table">
        <BaseDataTreeTablePagination class="p-datatable-table" :value="item.data" v-model:expandedKeys="expandedKeys">
          <template v-if="index === 1" #columns>
            <Column field="salesCompanyName" header="판매사명" expander>
              <template #body="{ node }">
                <div class="wf_flex wf_flex-row wf_justify-center">
                  <span>{{ node?.data?.salesCompanyName }}</span>
                </div>
              </template>
            </Column>
            <Column v-if="index === 1" field="division" header="구분">
              <template #body="{ node }">
                <div class="wf_flex wf_flex-row wf_justify-center">
                  <span>{{ node?.data?.division }}</span>
                </div>
              </template>
            </Column>
            <Column header="동의 여부">
              <template #body="{ node }">
                <div class="wf_flex wf_flex-row wf_justify-center">
                  <WelfareRadioGroup
                    size="sm"
                    @update:model-value="() => handleAgreeInformation(node.key)"
                    :model-value="node?.data?.isAgreeCheck"
                    :name="`wf-mall-${index}-${node.index}`"
                    :options="memberAgreeRadiosList"
                  />
                </div>
              </template>
            </Column>

            <Column field="dateApplication" header="적용일">
              <template #body="{ node }">
                <div class="wf_flex wf_flex-row wf_justify-center">
                  <span>{{ node?.data?.dateApplication }}</span>
                </div>
              </template>
            </Column>
          </template>
          <template v-else #columns>
            <Column v-if="index === 0" field="selectAgreeItem" class="wf_flex wf_flex-row wf_items-center" expander>
              <template #header>
                <span class="wf_flex wf_flex-row wf_justify-center">선택 동의 항목</span>
              </template>
              <template #body="{ node }">
                <div
                  class="wf_flex wf_flex-row wf_justify-center cursor-pointer"
                  @click="node?.children?.length > 0 ? toggleExpandedMarketingMall() : ''"
                >
                  <IconLeafExpandedMenu v-if="node?.children?.length === 0" />
                  <span>{{ node?.data?.selectAgreeItem }}</span>
                </div>
              </template>
            </Column>

            <Column header="동의 여부">
              <template #body="{ node }">
                <div class="wf_flex wf_flex-row wf_justify-center">
                  <WelfareRadioGroup
                    size="sm"
                    @update:model-value="() => handleAgreeInformation(node.key)"
                    :model-value="node?.data?.isAgreeCheck"
                    :name="`wf-mall-${index}-${node.index}`"
                    :options="memberAgreeRadiosList"
                  />
                </div>
              </template>
            </Column>

            <Column field="dateApplication" header="적용일">
              <template #body="{ node }">
                <div class="wf_flex wf_flex-row wf_justify-center">
                  <span>{{ node?.data?.dateApplication }}</span>
                </div>
              </template>
            </Column>
          </template>
        </BaseDataTreeTablePagination>
      </div>
    </MemberListAcceptInformationTableWrapper>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-list-accept-information-page.css');
</style>

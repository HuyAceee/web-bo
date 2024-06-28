<!--BO_I0304_020101_P-->
<script setup lang="ts">
import {
  DataTablePaginationWithCheckbox,
  HeaderModal,
  TextInputValidationMaxBytes,
  WelfareCheckbox,
  WelfareInputText,
  WelfareMdButton
} from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { DEFAULT_TABLE_SELECT_OPTIONS } from '@/common'
import { ProductSearchType } from '@/models'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import Column from 'primevue/column'
import {
  exhibitionGnbChildGroupModalTableHeaderConfig,
  ExhibitionGnbGroupCopyModalProps,
  exhibitionGnbGroupModalTableHeaderConfig,
  exhibitionGnbTopGroupModalTableHeaderConfig
} from '@/models/views/exhibition/modal/ExhibitionGnbGroupCopyModalModel'
import { useExhibitionGnbGroupCopyModalLogic } from '@/composables/exhibition/modal/useExhibitionGnbGroupCopyModalLogic'

const props = defineProps<ExhibitionGnbGroupCopyModalProps>()

const { gnbGroupDetail, customerCompanyListCheckBox, parentCategoryListCheckBox, subCategoryListCheckBox, onCancelPopup, onConfirm } =
  useExhibitionGnbGroupCopyModalLogic(props)
</script>

<template>
  <div class="member-request-modal">
    <HeaderModal title="GNB 그룹 복사" @close-modal="props.onCancel" />
    <div class="wf-p-20 wf-width-full wf_flex wf_flex-col wf-space-y-20 wf_mt-2">
      <div class="wf-search-tips wf-space-y-6 wf_h-40">
        <p class="wf-list-style wf_text-n-33 wf-body_04-mid wf-mt--2">{{ '선택하신 고객사의 하위 카테고리 항목을 복사 합니다.' }}</p>
      </div>

      <p class="wf-body_01-semi">복사 대상 선택</p>

      <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-12">
        <div class="wf_flex wf_flex-row wf-h-42">
          <FormGroup class="wf-width-full wf-administrator-notes" is-border-bottom required is-rounded-top is-rounded-bottom label="선택 고객사">
            <ProductSearchModalWithTableWrapper
              ref="searchCustomerKeyRef"
              @selectValue="
                (value) => {
                  gnbGroupDetail.customerKey = String(value.code)
                }
              "
              class="wf-product-base-info-search"
              placeholder-input="고객사 조회"
              label-button="조회"
              :type="ProductSearchType.CUSTOMER"
              is-disabled-on-empty-search-text
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_flex-row wf-h-44">
          <FormGroup
            class="wf-width-full wf-administrator-notes"
            :is-border-bottom="false"
            required
            is-rounded-top
            is-rounded-bottom
            label="복사 대상 고객사"
          >
            <WelfareMdButton label="고객사 선택" buttonType="liner" buttonSize="small" @click="() => {}" />
            <WelfareInputText size="small" class="wf-ml-4"></WelfareInputText>
          </FormGroup>
        </div>
      </div>

      <DataTablePaginationWithCheckbox
        class="wf-mt--5"
        ref="refTable"
        :column-configs="exhibitionGnbGroupModalTableHeaderConfig"
        :value="gnbGroupDetail.targetCustomers"
        :loading="false"
        :total-records="0"
        is-select-invisible
        no-data-label="조회 내용이 없습니다."
        :select-props="{ small: true, options: DEFAULT_TABLE_SELECT_OPTIONS }"
        @selectAllChange="customerCompanyListCheckBox.onSelectAllChange"
        @row-checked-change="customerCompanyListCheckBox.onRowSelected"
      >
        <template #columns>
          <Column
            v-for="item in exhibitionGnbGroupModalTableHeaderConfig"
            :key="item.field"
            :column-key="item.field"
            :field="item.field"
            :class="item.class"
          >
            <template #header>
              <p>{{ item.header }}</p>
            </template>
            <template #body="slotProps">
              <p>
                {{ slotProps.data?.[item.field] }}
              </p>
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
      <p class="wf-body_01-semi wf-mb--6 wf-mt-6">상위 카테고리 목록 총 {{ gnbGroupDetail.topCategoryList?.length ?? 0 }}건</p>
      <DataTablePaginationWithCheckbox
        ref="refTable"
        :column-configs="exhibitionGnbTopGroupModalTableHeaderConfig"
        :value="gnbGroupDetail.topCategoryList"
        :loading="false"
        class="wf-mt-0"
        :total-records="0"
        :show-selection="false"
        is-select-invisible
        no-data-label="상위 카테고리 목록이 없습니다."
        :select-props="{ small: true, options: DEFAULT_TABLE_SELECT_OPTIONS }"
      >
        <template #columns>
          <Column
            v-for="item in exhibitionGnbTopGroupModalTableHeaderConfig"
            :key="item.field"
            :column-key="item.field"
            :field="item.field"
            :class="item.class"
          >
            <template #header>
              <p v-if="item.field === 'parentCategoryName'">{{ item.header }}&nbsp;<span class="wf_text-sub-01">*</span></p>
              <p v-else>{{ item.header }}</p>
            </template>
            <template #body="slotProps">
              <div v-if="item.field === 'copyYn'">
                <WelfareCheckbox
                  :model-value="parentCategoryListCheckBox.listChecked.value.includes(slotProps.data.id)"
                  id="{{ slotProps.data.code }}"
                  :key="slotProps.data.code"
                  @update:modelValue="parentCategoryListCheckBox.onRowSelected(slotProps.data)"
                  size="sm"
                />
              </div>
              <p v-else-if="item.field === 'no'">
                {{ slotProps.index + 1 }}
              </p>
              <p v-else>
                {{ slotProps.data?.[item.field] }}
              </p>
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
      <p class="wf-body_01-semi wf-mb--6 wf-mt-6">하위 카테고리 목록 총 {{ gnbGroupDetail.subCategoryList?.length ?? 0 }}건</p>
      <DataTablePaginationWithCheckbox
        ref="refTable"
        :column-configs="exhibitionGnbChildGroupModalTableHeaderConfig"
        :value="gnbGroupDetail.subCategoryList"
        :loading="false"
        class="wf-mt-2"
        :total-records="0"
        :show-selection="false"
        is-select-invisible
        no-data-label="하위 카테고리 목록이 없습니다."
        :select-props="{ small: true, options: DEFAULT_TABLE_SELECT_OPTIONS }"
      >
        <template #columns>
          <Column
            v-for="item in exhibitionGnbChildGroupModalTableHeaderConfig"
            :key="item.field"
            :column-key="item.field"
            :field="item.field"
            :class="item.class"
          >
            <template #header>
              <p v-if="item.field === 'subcategoryName'">{{ item.header }}&nbsp;<span class="wf_text-sub-01">*</span></p>
              <p v-else>{{ item.header }}</p>
            </template>
            <template #body="slotProps">
              <div v-if="item.field === 'copyYn'">
                <WelfareCheckbox
                  :model-value="subCategoryListCheckBox.listChecked.value.includes(slotProps.data.id)"
                  id="{{ slotProps.data.code }}"
                  :key="slotProps.data.code"
                  @update:modelValue="subCategoryListCheckBox.onRowSelected(slotProps.data)"
                  size="sm"
                />
              </div>
              <div v-else-if="item.field === 'subcategoryName'" class="wf-width-full">
                <TextInputValidationMaxBytes
                  :model-value="slotProps.data[item.field]"
                  size="small"
                  class="wf_flex wf_flex-1"
                  :max-bytes="30"
                  @update:model-value="
                    (value) => {
                      gnbGroupDetail.subCategoryList[slotProps.index].subcategoryName = value
                    }
                  "
                ></TextInputValidationMaxBytes>
              </div>
              <p v-else-if="item.field === 'no'">
                {{ slotProps.index + 1 }}
              </p>
              <p v-else>
                {{ slotProps.data?.[item.field] }}
              </p>
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full wf-mt-5">
        <WelfareMdButton class="wf_w-120" label="닫기" button-type="cancel" @on-click="onCancelPopup" />
        <WelfareMdButton class="wf_w-120" label="저장" button-type="default" @on-click="onConfirm" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/exhibition/modal/exhibition-modal-gnb-group-copy-modal.css');
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>

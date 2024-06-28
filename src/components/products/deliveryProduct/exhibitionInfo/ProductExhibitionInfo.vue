<script setup lang="ts">
import { DEFAULT_DATE_FORMAT_DOT, getDateByFormat, isTwoArrayEqual } from '@/common'
import { WelfareCheckbox, WelfareDateTimePicker, WelfareMdButton, WelfareRadio, WelfareRadioGroup, WelfareSelect } from '@/components/uikit'
import { ProductSearchRecordModel, ProductSearchType, WelfareRadioProps, WelfareSelectOptionType } from '@/models'
import ProductSearchModalWrapper from '@/components/products/common/ProductSearchModalWrapper.vue'
import { computed, watch, ref } from 'vue'
import { useProductExhibitionDevices } from '@/composables/products/exhibitionInfo/useProductExhibitionDevices'

interface ProductExhibitionInfoProps {
  exhibitionStatus: boolean
  devices: string[]
  startTime: string
  endTime: string
  selectFirst: WelfareSelectOptionType | undefined
  selectSecond: WelfareSelectOptionType | undefined
  selectThird: WelfareSelectOptionType | undefined
  exhibitionCategories: string[]
  radioGroupCategories: number | undefined
  md: string

  optionsStatus: WelfareRadioProps[]
  optionsSelectFirst: WelfareSelectOptionType[]
  optionsSelectSecond: WelfareSelectOptionType[]
  optionsSelectThird: WelfareSelectOptionType[]
}

interface ProductExhibitionInfoEmits {
  (e: 'onChangeExhibitionStatus', value: boolean): void
  (e: 'onChangeSelectFirst', value: WelfareSelectOptionType): void
  (e: 'onChangeSelectSecond', value: WelfareSelectOptionType): void
  (e: 'onChangeSelectThird', value: WelfareSelectOptionType): void
  (e: 'handelAddCategory'): void
  (e: 'handelDeleteCategory', idx: number): void
  (e: 'onChangeStartTime', value: string): void
  (e: 'onChangeEndTime', value: string): void
  (e: 'handelDeleteCategory', idx: number): void
  (e: 'onChangeDevices', devices: string[]): void
  (e: 'onChangeRadioCategories', value: number): void
  (e: 'onChangeMDSearch', value: ProductSearchRecordModel): void
}

const props = defineProps<ProductExhibitionInfoProps>()
const emits = defineEmits<ProductExhibitionInfoEmits>()

const devices = ref(props.devices ?? [])

const { listCheckBoxDevices, getIsCheckBox, handleCheckBoxChange, setListChecked } = useProductExhibitionDevices(devices.value, (value: string[]) =>
  emits('onChangeDevices', [...value])
)

watch(
  () => props.devices,
  (newValue) => {
    devices.value = newValue
  }
)

watch(
  () => devices.value,
  (newValue, oldValue) => {
    if (!isTwoArrayEqual<string>(newValue, oldValue ?? [])) {
      setListChecked(newValue)
    }
  }
)

const handleResetDevices = (devices: string[]) => {
  setListChecked(devices)
}

defineExpose({
  handleResetDevices
})

const dataMd = computed(() => {
  return props.md
})
</script>

<template>
  <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-20">
    <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-r--ncc wf_br-tl--6 wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
        >
          전시 여부&nbsp;<span class="wf_text-sub-01">*</span>
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14">
          <WelfareRadioGroup
            :model-value="props.exhibitionStatus"
            @update:model-value="(value) => emits('onChangeExhibitionStatus', value)"
            name="exhibition-status-radio"
            :options="props.optionsStatus"
            size="sm"
          />
        </div>
      </div>
      <div class="wf_flex wf_flex-1 wf-ml-1">
        <div
          class="wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-151 wf_bg-bg-gray"
        >
          노출 채널&nbsp;<span class="wf_text-sub-01">*</span>
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-11 wf-body_03-reg wf_text--14 wf-space-x-20">
          <div v-for="(_item, _index) in listCheckBoxDevices.list" :key="_index">
            <WelfareCheckbox
              :model-value="getIsCheckBox(listCheckBoxDevices.field, _item.id)"
              @update:model-value="(value) => handleCheckBoxChange(listCheckBoxDevices.field, value, _item.id)"
              size="sm"
              :label="_item.label"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
        >
          전시 기간&nbsp;<span class="wf_text-sub-01">*</span>
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-11 wf-body_03-reg wf_text--14 wf-space-x-4">
          <WelfareDateTimePicker
            :model-value="props.startTime && getDateByFormat(props.startTime, DEFAULT_DATE_FORMAT_DOT)"
            @update:model-value="(value) => emits('onChangeStartTime', value)"
            :type="'date'"
            size="small"
            :format="DEFAULT_DATE_FORMAT_DOT"
            :max-date="props.endTime"
          />
          <span class="wf-body_01-reg wf_text-n-33">~</span>
          <WelfareDateTimePicker
            class="wf-ml-6"
            :model-value="props.endTime && getDateByFormat(props.endTime, DEFAULT_DATE_FORMAT_DOT)"
            @update:model-value="(value) => emits('onChangeEndTime', value)"
            :type="'date'"
            size="small"
            :format="DEFAULT_DATE_FORMAT_DOT"
            :min-date="props.startTime"
          />
        </div>
      </div>
      <div class="wf_flex wf_flex-1 wf-ml-1">
        <div
          class="wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-151 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
        >
          담당 MD&nbsp;<span class="wf_text-sub-01">*</span>
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14 wf-w-550">
          <ProductSearchModalWrapper
            class="wf-product-base-info-search"
            :type="ProductSearchType.MD"
            placeholder-input="MD 조회"
            label-button="조회"
            :defaultValue="dataMd"
            @selectValue="(value: ProductSearchRecordModel) => emits('onChangeMDSearch', value)"
          />
        </div>
      </div>
    </div>
    <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
        >
          표준 카테고리&nbsp;<span class="wf_text-sub-01">*</span>
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-10 wf-pr-11 wf-pb-7 wf-pt-5 wf-body_03-reg wf_text--14 wf-space-x-4">
          <WelfareSelect
            :model-value="props.selectFirst"
            @update:model-value="(value) => emits('onChangeSelectFirst', value)"
            class="wf_w-180"
            placeholder="1차 분류"
            optionLabel="label"
            :options="props.optionsSelectFirst"
            small
          />
          <WelfareSelect
            :model-value="props.selectSecond"
            @update:model-value="(value) => emits('onChangeSelectSecond', value)"
            class="wf_w-180"
            placeholder="2차 분류"
            optionLabel="label"
            :options="props.optionsSelectSecond"
            small
          />
          <WelfareSelect
            :model-value="props.selectThird"
            @update:model-value="(value) => emits('onChangeSelectThird', value)"
            class="wf_w-180"
            placeholder="3차 분류"
            optionLabel="label"
            :options="props.optionsSelectThird"
            small
          />
          <WelfareMdButton class="wf-ml-7" label="조회" buttonType="liner" buttonSize="small" @on-click="() => emits('handelAddCategory')" />
        </div>
      </div>
    </div>
    <div class="wf_flex">
      <div
        class="wf_br-bl--6 wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf-pl-14 wf-pr-11 wf-py-14 wf_w-150 wf-body_02-semi wf_text-n-33 wf_bg-bg-gray"
      >
        전시 카테고리&nbsp;<span class="wf_text-sub-01">*</span>
      </div>
      <div class="wf-ex-categories-wrap wf-custom-scrollbar wf_text-n-33 wf_flex wf_flex-1 wf_flex-col wf_justify-start wf-body_03-reg">
        <div v-for="(exh, idx) in exhibitionCategories" v-bind:key="`${exh}-${idx}`" class="wf-ex-categories wf_flex wf-btn-border-b--ncc wf_h-44">
          <div class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf-pl-11 wf-pr-12 wf-py-14 wf-body_03-reg wf_text--14">
            <WelfareRadio
              :model-value="radioGroupCategories"
              @update:model-value="(value) => emits('onChangeRadioCategories', value)"
              class=""
              :value="idx"
              name="categories-product-radio"
              size="sm"
            />
          </div>
          <div class="wf-btn-border-r--ncc wf_flex-1 wf_flex wf_items-center wf_justify-start wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14">
            {{ exh }}
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14">
            <WelfareMdButton label="삭제" buttonType="liner" buttonSize="small" @on-click="() => emits('handelDeleteCategory', idx)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/product-exhibition-info.css');
</style>

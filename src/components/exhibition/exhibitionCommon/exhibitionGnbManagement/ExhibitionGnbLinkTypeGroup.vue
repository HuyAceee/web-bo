<script lang="ts" setup>
import {
  ExhibitionGnbLinkType,
  ExhibitionGnbLinkTypePlaceholder,
  ExhibitionGnbLinkTypeTextValue
} from '@/models/views/exhibition/modal/ExhibitionCornerConnectionModalModel'
import { WelfareInputText, WelfareSelect } from '@/components'
import { computed, reactive, ref } from 'vue'
import { useExhibitionProductSearchModal } from '@/composables/exhibition/modal/useExhibitionProductSearchModal'
import { ProductSearchProductTableModel } from '@/models/views/products/modal/ProductSearchProductModalModel'
import { ExhibitionGnbLinkTypeProps, ExhibitionTextOptionKey } from '@/models/views/exhibition/exhibitionGnbManagement/ExhibitionGnbManagementModel'

const props = defineProps<ExhibitionGnbLinkTypeProps>()

const gnbGroupList = reactive(props.gnbGroupList)

const { openModal } = useExhibitionProductSearchModal()

const valueText = ref<ExhibitionTextOptionKey>()

const exhibitionLinkKey = computed(() => {
  switch (props.slotProps.data.linkType) {
    case ExhibitionGnbLinkType.EXHIBITION:
      return props.slotProps.data.linkExhibitionKey
    case ExhibitionGnbLinkType.EVENT:
      return props.slotProps.data.linkEventKey
    case ExhibitionGnbLinkType.PRODUCT:
      return props.slotProps.data.linkProductKey
    default:
      return ''
  }
})

const exhibitionLinkName = computed(() => {
  switch (props.slotProps.data.linkType) {
    case ExhibitionGnbLinkType.EXHIBITION:
      return props.slotProps.data.linkExhibitionName
    case ExhibitionGnbLinkType.EVENT:
      return props.slotProps.data.linkEventName
    case ExhibitionGnbLinkType.PRODUCT:
      return props.slotProps.data.linkProductName
    default:
      return ''
  }
})

const checkLinkType = computed(() => {
  return [ExhibitionGnbLinkType.LINK_URL, ExhibitionGnbLinkType.NO_LINK, ExhibitionGnbLinkType.EXTERNAL].includes(props.slotProps.data.linkType)
})

const setNewValueKey = (valueData: ProductSearchProductTableModel[]) => {
  const value = valueData[0]
  valueText.value = { code: value.productKey, name: value.productName }
  switch (props.slotProps.data.linkType) {
    case ExhibitionGnbLinkType.EXHIBITION:
      gnbGroupList[props.slotProps.index].linkExhibitionKey = value.productKey
      gnbGroupList[props.slotProps.index].linkExhibitionName = value.productName
      break
    case ExhibitionGnbLinkType.EVENT:
      gnbGroupList[props.slotProps.index].linkEventKey = value.productKey
      gnbGroupList[props.slotProps.index].linkEventName = value.productName
      break
    case ExhibitionGnbLinkType.PRODUCT:
      gnbGroupList[props.slotProps.index].linkProductKey = value.productKey
      gnbGroupList[props.slotProps.index].linkProductName = value.productName
      break
    default:
      break
  }
}

const setValueKey = () => {
  if (props.slotProps.data.linkType !== ExhibitionGnbLinkType.EXHIBITION && props.slotProps.data.linkType !== ExhibitionGnbLinkType.EVENT) {
    openModal(setNewValueKey)
  }
}
</script>

<template>
  <WelfareSelect
    class="wf_w-100"
    optionLabel="label"
    option-value="value"
    small
    :model-value="slotProps.data.linkType"
    @update:model-value="
      (value) => {
        gnbGroupList[slotProps.index].linkType = value
      }
    "
    :options="ExhibitionGnbLinkTypeTextValue"
  />
  <WelfareInputText
    :model-value="slotProps.data.linkUrl"
    v-if="checkLinkType"
    @update:model-value="
      (value) => {
        gnbGroupList[slotProps.index].linkUrl = value
      }
    "
    :disabled="slotProps.data.linkType === ExhibitionGnbLinkType.NO_LINK"
    class="wf-width-full wf-ml-6"
    size="small"
  />
  <div class="wf_flex wf_flex-1 wf-cursor-pointer" @click="setValueKey">
    <WelfareInputText
      :model-value="exhibitionLinkKey"
      v-if="!checkLinkType"
      :placeholder="ExhibitionGnbLinkTypePlaceholder[slotProps.data.linkType as keyof typeof ExhibitionGnbLinkTypePlaceholder]?.key ?? ''"
      class="wf_w-150 wf-ml-6 wf-date-pointer-none"
      size="small"
    />
    <WelfareInputText
      :model-value="exhibitionLinkName"
      v-if="!checkLinkType"
      :placeholder="ExhibitionGnbLinkTypePlaceholder[slotProps.data.linkType as keyof typeof ExhibitionGnbLinkTypePlaceholder]?.name ?? ''"
      class="wf-width-full wf-ml-6 wf-date-pointer-none"
      size="small"
    />
  </div>
</template>

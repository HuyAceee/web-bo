<script lang="ts" setup>
import {
  ExhibitionGnbLinkType,
  ExhibitionGnbLinkTypePlaceholder,
  ExhibitionGnbLinkTypeTextValue
} from '@/models/views/exhibition/modal/ExhibitionCornerConnectionModalModel'
import { WelfareInputText, WelfareSelect } from '@/components'
import { computed, ref } from 'vue'
import { useExhibitionProductSearchModal } from '@/composables/exhibition/modal/useExhibitionProductSearchModal'
import { ProductSearchProductTableModel } from '@/models/views/products/modal/ProductSearchProductModalModel'
import {
  ExhibitionGnbLinkTypeChooseDefaultKey,
  ExhibitionGnbLinkTypeChooseProps,
  ExhibitionTextOptionKey
} from '@/models/views/exhibition/exhibitionGnbManagement/ExhibitionGnbManagementModel'

const props = withDefaults(defineProps<ExhibitionGnbLinkTypeChooseProps>(), {
  keyField: (val) => {
    return val.keyField ?? ExhibitionGnbLinkTypeChooseDefaultKey
  }
})

interface ExhibitionGnbLinkTypeChooseEmits {
  (e: 'update:modelValue', field: any, value: string, index?: number): void
}

const emit = defineEmits<ExhibitionGnbLinkTypeChooseEmits>()
const { data, index, keyField } = props

const updateModelValue = (field: string, value: string) => {
  if (index) {
    emit('update:modelValue', field, value, index)
  } else {
    emit('update:modelValue', field, value)
  }
}

const { openModal } = useExhibitionProductSearchModal()

const valueText = ref<ExhibitionTextOptionKey>()

const exhibitionLinkKey = computed(() => {
  if (data) {
    const linkType = data?.[keyField.linkType]
    switch (linkType) {
      case ExhibitionGnbLinkType.EXHIBITION:
        return data?.[keyField.linkExhibitionKey]
      case ExhibitionGnbLinkType.EVENT:
        return data?.[keyField.linkEventKey]
      case ExhibitionGnbLinkType.PRODUCT:
        return data?.[keyField.linkProductKey]
      default:
        return ''
    }
  }
  return ''
})

const exhibitionLinkName = computed(() => {
  if (data) {
    const linkType = data?.[keyField.linkType]
    switch (linkType) {
      case ExhibitionGnbLinkType.EXHIBITION:
        return data?.[keyField.linkExhibitionKey]
      case ExhibitionGnbLinkType.EVENT:
        return data?.[keyField.linkEventName]
      case ExhibitionGnbLinkType.PRODUCT:
        return data?.[keyField.linkProductName]
      default:
        return ''
    }
  }
  return ''
})

const checkLinkType = computed(() => {
  const linkType = data?.[keyField.linkType]

  return [ExhibitionGnbLinkType.LINK_URL, ExhibitionGnbLinkType.NO_LINK, ExhibitionGnbLinkType.EXTERNAL].includes(linkType)
})

const setNewValueKey = (valueData: ProductSearchProductTableModel[]) => {
  const value = valueData[0]
  valueText.value = { code: value.productKey, name: value.productName }

  const linkType = data?.[keyField.linkType]

  if (linkType) {
    switch (linkType) {
      case ExhibitionGnbLinkType.EXHIBITION:
        updateModelValue(keyField.linkExhibitionKey, value.productKey)
        updateModelValue(keyField.linkExhibitionName, value.productName)
        break
      case ExhibitionGnbLinkType.EVENT:
        updateModelValue(keyField.linkEventKey, value.productKey)
        updateModelValue(keyField.linkEventName, value.productName)
        break
      case ExhibitionGnbLinkType.PRODUCT:
        updateModelValue(keyField.linkProductKey, value.productKey)
        updateModelValue(keyField.linkProductName, value.productName)
        break
      default:
        break
    }
  }
}

const disableOption = computed(() => {
  return data && data[keyField.linkType] === ExhibitionGnbLinkType.NO_LINK
})

const setValueKey = () => {
  if (data?.[keyField.linkType] !== ExhibitionGnbLinkType.EXHIBITION && data?.[keyField.linkType] !== ExhibitionGnbLinkType.EVENT) {
    openModal(setNewValueKey)
  }
}
</script>

<template>
  <WelfareSelect
    class="wf_w-180"
    :class="classSelect"
    optionLabel="label"
    option-value="value"
    small
    :model-value="data?.[keyField.linkType]"
    @update:model-value="
      (value) => {
        updateModelValue(keyField.linkType, value)
      }
    "
    :options="ExhibitionGnbLinkTypeTextValue"
  />
  <WelfareInputText
    :model-value="data?.[keyField.linkUrl]"
    v-if="checkLinkType"
    @update:model-value="
      (value) => {
        updateModelValue(keyField.linkUrl, value)
      }
    "
    :disabled="disableOption"
    class="wf-width-full wf-ml-6"
    size="small"
  />
  <div class="wf_flex wf_flex-1 wf-cursor-pointer" @click="setValueKey">
    <WelfareInputText
      :model-value="exhibitionLinkKey"
      v-if="!checkLinkType"
      :placeholder="ExhibitionGnbLinkTypePlaceholder[data?.[keyField.linkType] as keyof typeof ExhibitionGnbLinkTypePlaceholder]?.key ?? ''"
      class="wf_w-150 wf-ml-6 wf-date-pointer-none"
      size="small"
    />
    <WelfareInputText
      :model-value="exhibitionLinkName"
      v-if="!checkLinkType"
      :placeholder="ExhibitionGnbLinkTypePlaceholder[data?.[keyField.linkType] as keyof typeof ExhibitionGnbLinkTypePlaceholder]?.name ?? ''"
      class="wf-width-full wf-ml-6 wf-date-pointer-none"
      size="small"
    />
  </div>
</template>

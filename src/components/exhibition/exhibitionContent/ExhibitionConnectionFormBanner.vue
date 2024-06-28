<script setup lang="ts">
import {
  WelfareMdButton,
  WelfareSelect,
  WelfareCheckbox,
  WelfareInputText,
  CommonTableTitleCell,
  CommonTableRow,
  CommonTable,
  CommonTableContentCell
} from '@/components/uikit'
import { useExhibitionConnectionFormBanner } from '@/composables/exhibition/exhibitionContent/useExhibitionConnectionFormBanner'
import { YnOptions } from '@/models'
import { ExhibitionConnectionFormBannerProps } from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionFormBannerModel'
import { TEXT_MAX_NUMBER_30 } from '@/common'
import TextInputValidationMaxBytes from '@/components/widgets/textInput/TextInputValidationMaxBytes.vue'

const props = defineProps<ExhibitionConnectionFormBannerProps>()
const { values, setFieldValue, onSubmit, onChangeImage, onDeleteImage, isDisabledDeleteImgBtn } = useExhibitionConnectionFormBanner(props)
defineExpose({ submit: onSubmit })
</script>

<template>
  <div>
    <p class="wf-body_01-semi">전시 배너 관리</p>
    <CommonTable class="wf-mt-12">
      <CommonTableRow>
        <CommonTableTitleCell title="기획전 배너 이미지" required is-first-col />
        <CommonTableContentCell>
          <WelfareCheckbox
            size="sm"
            label="사용안함"
            :model-value="values.bannerImageUseYn === YnOptions.Y"
            @update:model-value="(value) => setFieldValue('bannerImageUseYn', value ? YnOptions.Y : YnOptions.N)"
          />
          <div class="wf_flex-1 wf-ml-20" @click="() => onChangeImage('bannerImagePathName', 'bannerImageName', 'bannerImageAltName')">
            <WelfareInputText
              placeholder=""
              size="small"
              readonly
              :disabled="values.bannerImageUseYn === YnOptions.Y"
              :model-value="values.bannerImageName"
            />
          </div>
          <WelfareMdButton
            button-size="small"
            button-type="liner"
            class="wf-ml-6 wf-mr--2"
            label="삭제"
            :disabled="values.bannerImageUseYn === YnOptions.Y || isDisabledDeleteImgBtn('bannerImagePathName', 'bannerImageName')"
            @on-click="() => onDeleteImage('bannerImagePathName', 'bannerImageName', 'bannerImageAltName')"
          />
        </CommonTableContentCell>
        <CommonTableTitleCell title="기획전 이미지 alt" required />
        <CommonTableContentCell>
          <TextInputValidationMaxBytes
            class="wf_w-full"
            size="small"
            placeholder=" "
            hidden-warning
            :disabled="values.bannerImageUseYn === YnOptions.Y"
            :max-bytes="TEXT_MAX_NUMBER_30"
            :model-value="values.bannerImageAltName"
            @update:model-value="(value) => setFieldValue('bannerImageAltName', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="42" is-last-row>
        <CommonTableTitleCell title="전시 카테고리 연결" required is-first-col />
        <CommonTableContentCell>
          <WelfareSelect
            small
            class="wf_w-180"
            :disabled="values.bannerImageUseYn === YnOptions.Y"
            :options="props.options"
            optionLabel="label"
            optionValue="value"
            :model-value="values.mclassDisplayCategoryId"
            @update:model-value="(value) => setFieldValue('mclassDisplayCategoryId', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
    </CommonTable>
  </div>
</template>

<script setup lang="ts">
import WelfareMdButton from '@/components/uikit/button/WelfareMdButton.vue'
import WelfareCheckbox from '@/components/uikit/checkbox/WelfareCheckbox.vue'
import WelfareInputText from '@/components/uikit/input/WelfareInputText.vue'
import WelfareRadioGroup from '@/components/uikit/radio/WelfareRadioGroup.vue'
import CommonTable from '@/components/uikit/table/CommonTable.vue'
import CommonTableContentCell from '@/components/uikit/table/CommonTableContentCell.vue'
import CommonTableRow from '@/components/uikit/table/CommonTableRow.vue'
import CommonTableTitleCell from '@/components/uikit/table/CommonTableTitleCell.vue'
import WelfareTag from '@/components/uikit/tag/WelfareTag.vue'
import { useExhibitionConnectionFormMarketingArea } from '@/composables/exhibition/exhibitionContent/useExhibitionConnectionFormMarketingArea'
import { ExhibitionConnectionFormMarketingAreaProps } from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionFormMarketingAreaModel'
import { YnOptions } from '@/models/common'
import { TEXT_MAX_NUMBER_30 } from '@/common'
import TextInputValidationMaxBytes from '@/components/widgets/textInput/TextInputValidationMaxBytes.vue'
import ExhibitionGnbLinkTypeGroupChoose from '@/components/exhibition/common/ExhibitionGnbLinkTypeGroupChoose.vue'
import {
  ExhibitionPcGnbLinkTypeChooseDefaultKey,
  ExhibitionMobileGnbLinkTypeChooseDefaultKey
} from '@/models/views/exhibition/exhibitionGnbManagement/ExhibitionGnbManagementModel'

const props = defineProps<ExhibitionConnectionFormMarketingAreaProps>()

const {
  exhibitionStatusOptions,
  exhibitionTypeOptions,
  values,
  setFieldValue,
  onSubmit,
  onDeleteCouponKey,
  onDeleteAllCouponKey,
  openModalCouponPromotionInquiry,
  isDisabledDeleteImgBtn,
  onChangeImage,
  onDeleteImage
} = useExhibitionConnectionFormMarketingArea(props)
defineExpose({ submit: onSubmit })
</script>

<template>
  <div>
    <p class="wf-body_01-semi">마케팅 영역</p>
    <CommonTable class="wf-mt-12">
      <CommonTableRow height="42" is-last-row>
        <CommonTableTitleCell title="전시 여부" is-first-col />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            gap="18"
            :options="exhibitionStatusOptions"
            :model-value="values.marketingDisplayYn"
            @update:model-value="(value) => setFieldValue(`marketingDisplayYn`, value)"
          />
        </CommonTableContentCell>
        <CommonTableTitleCell title="전시유형" />
        <CommonTableContentCell>
          <div class="wf_flex wf-space-x-20">
            <WelfareCheckbox
              v-for="(type, index) in exhibitionTypeOptions"
              :key="index"
              size="sm"
              :label="type.label"
              :model-value="values[type.value] === YnOptions.Y"
              @update:model-value="(value) => setFieldValue(type.value, value ? YnOptions.Y : YnOptions.N)"
            />
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
    </CommonTable>

    <div v-if="values.marketingBannerYn === YnOptions.Y">
      <CommonTable class="wf-mt-10">
        <CommonTableRow>
          <CommonTableTitleCell title="PC 이미지" is-first-col />
          <CommonTableContentCell>
            <div class="wf_flex wf_w-full">
              <div class="wf_w-full" @click="() => onChangeImage('pcMarketingImagePathName', 'pcMarketingImageName', 'pcMarketingImageAltName')">
                <WelfareInputText
                  size="small"
                  class="wf_flex-1"
                  placeholder="이미지url.jpg(저장 후 생성)"
                  readonly
                  :model-value="values.pcMarketingImageName"
                />
              </div>
              <WelfareMdButton
                button-size="small"
                button-type="liner"
                class="wf-ml-6 wf-mr--2"
                label="삭제"
                :disabled="isDisabledDeleteImgBtn('pcMarketingImagePathName', 'pcMarketingImageName')"
                @on-click="() => onDeleteImage('pcMarketingImagePathName', 'pcMarketingImageName', 'pcMarketingImageAltName')"
              />
            </div>
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow>
          <CommonTableTitleCell title="PC 이미지 alt" required is-first-col />
          <CommonTableContentCell>
            <TextInputValidationMaxBytes
              class="wf_w-full"
              size="small"
              placeholder=" "
              hidden-warning
              :max-bytes="TEXT_MAX_NUMBER_30"
              :model-value="values.pcMarketingImageAltName"
              @update:model-value="(value) => setFieldValue('pcMarketingImageAltName', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="42" is-last-row>
          <CommonTableTitleCell title="PC 이미지 랜딩 URL" is-first-col />
          <CommonTableContentCell>
            <div class="wf_w-full wf_flex">
              <ExhibitionGnbLinkTypeGroupChoose
                :data="values"
                :key-field="ExhibitionPcGnbLinkTypeChooseDefaultKey"
                @update:model-value="(field, value) => setFieldValue(field, value)"
              />
            </div>
          </CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>

      <CommonTable class="wf-mt-10">
        <CommonTableRow>
          <CommonTableTitleCell title="모바일 이미지" is-first-col />
          <CommonTableContentCell>
            <div class="wf_flex wf_w-full">
              <div
                class="wf_w-full"
                @click="() => onChangeImage('mobileMarketingImagePathName', 'mobileMarketingImageName', 'mobileMarketingImageAltName')"
              >
                <WelfareInputText
                  size="small"
                  class="wf_flex-1"
                  placeholder="이미지url.jpg(저장 후 생성)"
                  readonly
                  :model-value="values.mobileMarketingImageName"
                />
              </div>
              <WelfareMdButton
                button-size="small"
                button-type="liner"
                class="wf-ml-6 wf-mr--2"
                label="삭제"
                :disabled="isDisabledDeleteImgBtn('mobileMarketingImagePathName', 'mobileMarketingImageName')"
                @on-click="() => onDeleteImage('mobileMarketingImagePathName', 'mobileMarketingImageName', 'mobileMarketingImageAltName')"
              />
            </div>
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow>
          <CommonTableTitleCell title="모바일 이미지 alt" required is-first-col />
          <CommonTableContentCell>
            <TextInputValidationMaxBytes
              class="wf_w-full"
              size="small"
              placeholder=" "
              hidden-warning
              :max-bytes="TEXT_MAX_NUMBER_30"
              :model-value="values.mobileMarketingImageAltName"
              @update:model-value="(value) => setFieldValue('mobileMarketingImageAltName', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow is-last-row>
          <CommonTableTitleCell title="모바일 랜딩 url" is-first-col />
          <CommonTableContentCell>
            <div class="wf_w-full">
              <div class="wf_flex wf_items-center">
                <div class="wf_w-full wf_flex wf_items-center">
                  <ExhibitionGnbLinkTypeGroupChoose
                    class=""
                    :data="values"
                    :key-field="ExhibitionMobileGnbLinkTypeChooseDefaultKey"
                    @update:model-value="(field, value) => setFieldValue(field, value)"
                  />
                </div>
              </div>
            </div>
          </CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>
    </div>

    <CommonTable class="wf-mt-10" v-if="values.marketingCouponYn === YnOptions.Y">
      <CommonTableRow height="'auto'">
        <CommonTableTitleCell title="쿠폰조회" is-first-col />
        <CommonTableContentCell>
          <div class="wf_flex-1 wf-py-7">
            <div class="wf_flex wf_justify-between">
              <WelfareMdButton button-size="small" button-type="liner" label="쿠폰 연결" @click="openModalCouponPromotionInquiry" />
              <WelfareMdButton
                button-size="small"
                button-type="liner"
                label="삭제"
                @click="onDeleteAllCouponKey"
                v-if="values.couponCreateRequestList && values.couponCreateRequestList.length > 0"
              />
            </div>
            <div
              v-if="values.couponCreateRequestList && values.couponCreateRequestList.length > 0"
              class="wf-mt-6 wf_flex wf_exhibition-tag-container wf-mx--1"
            >
              <div class="wf_flex wf_flex-wrap wf-gap-10-10 wf_h-auto">
                <WelfareTag v-for="(tag, index) in values.couponCreateRequestList" :key="index" @icon-click="onDeleteCouponKey(index)">
                  {{ tag.couponName ?? '' }}{{ tag.couponKey ?? '' }}
                </WelfareTag>
              </div>
            </div>
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="쿠폰 이미지" is-first-col />
        <CommonTableContentCell>
          <div class="wf_flex wf_w-full">
            <div
              class="wf_w-full"
              @click="() => onChangeImage('marketingCouponImagePathName', 'marketingCouponImageName', 'marketingCouponImageAltName')"
            >
              <WelfareInputText
                size="small"
                class="wf_flex-1"
                placeholder="이미지url.jpg(저장 후 생성)"
                readonly
                :model-value="values.marketingCouponImageName"
              />
            </div>
            <WelfareMdButton
              button-size="small"
              button-type="liner"
              class="wf-ml-6 wf-mr--2"
              label="삭제"
              :disabled="isDisabledDeleteImgBtn('marketingCouponImagePathName', 'marketingCouponImageName')"
              @on-click="() => onDeleteImage('marketingCouponImagePathName', 'marketingCouponImageName', 'marketingCouponImageAltName')"
            />
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="쿠폰 이미지 alt" required is-first-col />
        <CommonTableContentCell>
          <TextInputValidationMaxBytes
            class="wf_w-full"
            size="small"
            placeholder=" "
            hidden-warning
            :max-bytes="TEXT_MAX_NUMBER_30"
            :model-value="values.marketingCouponImageAltName"
            @update:model-value="(value) => setFieldValue('marketingCouponImageAltName', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow>
        <CommonTableTitleCell title="쿠폰 메인 타이틀" is-first-col />
        <CommonTableContentCell>
          <WelfareInputText
            size="small"
            class="wf_flex-1"
            placeholder=" "
            :model-value="values.marketingCouponMainTitleName"
            @update:model-value="(value) => setFieldValue('marketingCouponMainTitleName', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="42" is-last-row>
        <CommonTableTitleCell title="쿠폰 서브 타이틀" is-first-col />
        <CommonTableContentCell>
          <WelfareInputText
            size="small"
            class="wf_flex-1"
            placeholder=" "
            :model-value="values.marketingCouponSubTitleName"
            @update:model-value="(value) => setFieldValue('marketingCouponSubTitleName', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
    </CommonTable>
  </div>
</template>

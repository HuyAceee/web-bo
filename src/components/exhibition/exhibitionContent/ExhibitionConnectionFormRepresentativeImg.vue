<script setup lang="ts">
import { WelfareInputText, WelfareMdButton, WelfareRadioGroup } from '@/components/uikit'
import WelfareCheckbox from '@/components/uikit/checkbox/WelfareCheckbox.vue'
import WelfareEditor from '@/components/uikit/editor/WelfareEditor.vue'
import WelfareTextarea from '@/components/uikit/input/WelfareTextarea.vue'
import CommonTable from '@/components/uikit/table/CommonTable.vue'
import CommonTableContentCell from '@/components/uikit/table/CommonTableContentCell.vue'
import CommonTableRow from '@/components/uikit/table/CommonTableRow.vue'
import CommonTableTitleCell from '@/components/uikit/table/CommonTableTitleCell.vue'
import FormGroupInputColor from '@/components/widgets/form/FormGroupInputColor.vue'
import { useExhibitionConnectionFormRepresentativeImg } from '@/composables/exhibition/exhibitionContent/useExhibitionConnectionFormRepresentativeImg'
import {
  ExhibitionConnectionFormRepresentativeImgModel,
  ExhibitionConnectionFormRepresentativeImgProps
} from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionMngtModel'
import { YnOptions } from '@/models'

const props = defineProps<ExhibitionConnectionFormRepresentativeImgProps<ExhibitionConnectionFormRepresentativeImgModel>>()

const {
  representativeTypeOptions,
  videoTypeOptions,
  noticeOptions,
  noticeDisplayOptions,
  values,
  setFieldValue,
  onSubmit,
  handleReset,
  onChangeImage,
  onChangeVideo
} = useExhibitionConnectionFormRepresentativeImg(props)

defineExpose({ submit: onSubmit, reset: handleReset })
</script>

<template>
  <div>
    <div>
      <div class="wf_flex">
        <p class="wf_flex-1 wf-body_01-semi">전시 대표 이미지 관리</p>
      </div>

      <CommonTable class="wf-mt-12">
        <CommonTableRow height="42" is-last-row>
          <CommonTableTitleCell title="전시 항목" is-first-col />
          <CommonTableContentCell>
            <WelfareRadioGroup
              size="sm"
              gap="18"
              :options="representativeTypeOptions"
              :model-value="values.exhibitionRepresentativeType"
              @update:model-value="(value) => setFieldValue('exhibitionRepresentativeType', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>

      <!-- option 1 -->
      <CommonTable v-if="values.exhibitionRepresentativeType === representativeTypeOptions[0].value" class="wf-mt-10">
        <CommonTableRow>
          <CommonTableTitleCell title="이미지" is-first-col />
          <CommonTableContentCell>
            <div class="wf_flex wf_w-full">
              <div class="wf_flex-1" @click="() => onChangeImage('imagePathName', 'imageName', 'imageAltName')">
                <WelfareInputText size="small" class="wf_flex-1" placeholder=" " readonly :model-value="values.imageName" />
              </div>
              <WelfareMdButton button-size="small" button-type="liner" disabled class="wf-ml-6 wf-mr--2" label="삭제" />
            </div>
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="42" is-last-row>
          <CommonTableTitleCell title="이미지 alt" required is-first-col />
          <CommonTableContentCell>
            <WelfareInputText
              size="small"
              class="wf_flex-1"
              placeholder=" "
              :model-value="values.imageAltName"
              @update:model-value="(value) => setFieldValue('imageAltName', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>

      <!-- option 2 -->
      <CommonTable v-if="values.exhibitionRepresentativeType === representativeTypeOptions[1].value" class="wf-mt-10">
        <CommonTableRow>
          <CommonTableTitleCell title="이미지" is-first-col />
          <CommonTableContentCell>
            <div class="wf_flex wf_w-full">
              <div class="wf_flex-1" @click="() => onChangeImage('imagePathName', 'imageName', 'imageAltName')">
                <WelfareInputText size="small" class="wf_flex-1" placeholder=" " readonly :model-value="values.imageName" />
              </div>
              <WelfareMdButton button-size="small" button-type="liner" disabled class="wf-ml-6 wf-mr--2" label="삭제" />
            </div>
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow>
          <CommonTableTitleCell title="이미지 alt" required is-first-col />
          <CommonTableContentCell>
            <WelfareInputText
              size="small"
              class="wf_flex-1"
              placeholder=" "
              :model-value="values.imageAltName"
              @update:model-value="(value) => setFieldValue('imageAltName', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow>
          <CommonTableTitleCell title="메인 타이틀 1" is-first-col />
          <CommonTableContentCell>
            <WelfareInputText
              size="small"
              class="wf_flex-1"
              placeholder=" "
              :model-value="values.mainTitleName1"
              @update:model-value="(value) => setFieldValue('mainTitleName1', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow>
          <CommonTableTitleCell title="메인 타이틀 2" is-first-col />
          <CommonTableContentCell>
            <WelfareInputText
              size="small"
              class="wf_flex-1"
              placeholder=" "
              :model-value="values.mainTitleName2"
              @update:model-value="(value) => setFieldValue('mainTitleName2', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow>
          <CommonTableTitleCell title="서브 타이틀" required is-first-col />
          <CommonTableContentCell>
            <WelfareInputText
              size="small"
              class="wf_flex-1"
              placeholder=" "
              :model-value="values.subTitleName"
              @update:model-value="(value) => setFieldValue('subTitleName', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="42" is-last-row>
          <CommonTableTitleCell title="배경 색상 코드" is-first-col />
          <CommonTableContentCell>
            <div class="wf_flex wf_w-full">
              <!-- color check -->
              <WelfareCheckbox
                size="sm"
                :model-value="values.colorHexaUseYn === YnOptions.Y"
                @update:model-value="
                  (value) => {
                    setFieldValue('colorHexaUseYn', value ? YnOptions.Y : YnOptions.N)
                  }
                "
                label="사용 안함"
              />
              <FormGroupInputColor
                class="wf-ml-20"
                :disabled="false"
                placeholder=" "
                :model-value="values.colorHexaValue"
                @update:model-value="(value) => setFieldValue('colorHexaValue', value)"
              />
            </div>
          </CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>

      <!-- option 3 -->
      <template v-if="values.exhibitionRepresentativeType === representativeTypeOptions[2].value">
        <CommonTable class="wf-mt-10">
          <CommonTableRow>
            <CommonTableTitleCell title="영상 유형" is-first-col />
            <CommonTableContentCell>
              <WelfareRadioGroup
                size="sm"
                gap="18"
                :options="videoTypeOptions"
                :model-value="values.exhibitionVideoType"
                @update:model-value="(value) => setFieldValue('exhibitionVideoType', value)"
              />
            </CommonTableContentCell>
          </CommonTableRow>

          <!-- option 3.1 -->
          <template v-if="values.exhibitionVideoType === videoTypeOptions[0].value">
            <CommonTableRow>
              <CommonTableTitleCell title="대표 동영상 첨부" is-first-col />
              <CommonTableContentCell>
                <div class="wf_flex wf_w-full">
                  <div class="wf_flex wf_w-full">
                    <div class="wf_flex-1" @click="() => onChangeVideo('exhibitionVideoType', 'videoName', 'videoAltName')">
                      <WelfareInputText size="small" class="wf_flex-1" placeholder=" " readonly :model-value="values.videoName" />
                    </div>
                    <WelfareMdButton button-size="small" button-type="liner" disabled class="wf-ml-6 wf-mr--2" label="삭제" />
                  </div>
                </div>
              </CommonTableContentCell>
            </CommonTableRow>
            <CommonTableRow>
              <CommonTableTitleCell title="대표 동영상 alt" required is-first-col />
              <CommonTableContentCell>
                <WelfareInputText
                  size="small"
                  class="wf_flex-1"
                  placeholder=" "
                  :model-value="values.videoAltName"
                  @update:model-value="(value) => setFieldValue('videoAltName', value)"
                />
              </CommonTableContentCell>
            </CommonTableRow>
            <CommonTableRow>
              <CommonTableTitleCell title="썸네일 동영상 첨부" is-first-col />
              <CommonTableContentCell>
                <!-- handle upload video -->
                <div class="wf_flex wf_w-full">
                  <div class="wf_flex wf_w-full">
                    <div class="wf_flex-1" @click="() => onChangeVideo('videoThumbnailPathName', 'videoThumbnailName', 'videoThumbnailAltName')">
                      <WelfareInputText size="small" class="wf_flex-1" placeholder=" " readonly :model-value="values.videoThumbnailName" />
                    </div>
                    <WelfareMdButton button-size="small" button-type="liner" disabled class="wf-ml-6 wf-mr--2" label="삭제" />
                  </div>
                </div>
              </CommonTableContentCell>
            </CommonTableRow>
            <CommonTableRow height="42" is-last-row>
              <CommonTableTitleCell title="썸네일 동영상 alt" required is-first-col />
              <CommonTableContentCell>
                <WelfareInputText
                  size="small"
                  class="wf_flex-1"
                  placeholder=" "
                  :model-value="values.videoThumbnailAltName"
                  @update:model-value="(value) => setFieldValue('videoThumbnailAltName', value)"
                />
              </CommonTableContentCell>
            </CommonTableRow>
          </template>

          <!-- option 3.2 -->
          <template v-if="values.exhibitionVideoType === videoTypeOptions[1].value">
            <CommonTableRow>
              <CommonTableTitleCell title="유튜브 URL" is-first-col />
              <CommonTableContentCell>
                <WelfareInputText
                  size="small"
                  class="wf_flex-1"
                  placeholder=" "
                  :model-value="values.youtubeUrl"
                  @update:model-value="(value) => setFieldValue('youtubeUrl', value)"
                />
              </CommonTableContentCell>
            </CommonTableRow>
            <CommonTableRow height="42" is-last-row>
              <CommonTableTitleCell title="URL alt" required is-first-col />
              <CommonTableContentCell>
                <!-- youtube url alt -->
                <WelfareInputText
                  size="small"
                  class="wf_flex-1"
                  :model-value="values.youtubeAltName"
                  @update:model-value="
                    (value) => {
                      setFieldValue('youtubeAltName', value)
                    }
                  "
                  placeholder=" "
                />
              </CommonTableContentCell>
            </CommonTableRow>
          </template>
        </CommonTable>
      </template>

      <!-- option 4 -->
      <CommonTable v-if="values.exhibitionRepresentativeType === representativeTypeOptions[3].value" class="wf-mt-10">
        <CommonTableRow height="312" is-last-row>
          <CommonTableTitleCell title="내용 입력" is-first-col />
          <CommonTableContentCell>
            <div class="wf-py-7 wf_h-full wf_w-full">
              <WelfareEditor
                editor-style="min-height: 0"
                :model-value="values.htmlContents"
                @update:model-value="(value) => setFieldValue('htmlContents', value)"
              />
            </div>
          </CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>

      <CommonTable class="wf-mt-10">
        <CommonTableRow>
          <CommonTableTitleCell title="유의사항" is-first-col />
          <CommonTableContentCell>
            <WelfareRadioGroup
              size="sm"
              gap="18"
              :options="noticeOptions"
              :model-value="values.noticeUseYn"
              @update:model-value="(value) => setFieldValue('noticeUseYn', value)"
            />
          </CommonTableContentCell>
          <CommonTableTitleCell title="유의사항 상세" />
          <CommonTableContentCell>
            <WelfareRadioGroup
              size="sm"
              gap="18"
              :options="noticeDisplayOptions"
              :model-value="values.noticeDisplayYn"
              @update:model-value="(value) => setFieldValue('noticeDisplayYn', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="132" is-last-row>
          <CommonTableTitleCell title="유의사항 내용" is-first-col />
          <CommonTableContentCell>
            <WelfareTextarea
              class="wf_i-h-120 wf_w-full"
              placeholder=" "
              :model-value="values.noticeContents"
              @update:model-value="(value) => setFieldValue('noticeContents', value)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>
    </div>
  </div>
</template>

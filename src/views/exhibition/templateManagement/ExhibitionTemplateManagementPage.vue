<!-- BO_I0101_010101 -->
<script setup lang="ts">
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { WelfareCheckbox, WelfareInputText, WelfareMdButton, WelfareRadioGroup, WelfareTextarea } from '@/components'
import { useExhibitionTemplateManagement } from '@/composables/exhibition/templateManagement/useExhibitionTemplateManagement'
import ExhibitionTemplateTable from '@/components/exhibition/templateManagement/ExhibitionTemplateTable.vue'
import { ExhibitionTemplateManagementType } from '@/models/views/exhibition/templateManagement/ExhibitionTemplateManagementModel'

const {
  exhibitionTemplateManagementStatusOptions,
  exhibitionTemplateManagementAppChannelOptions,
  refExhibitionTemplateManagementOptions,
  values,
  setFieldValue,
  refTableData,
  onSave,
  onCornerRegistration,
  onRowClick,
  onRegistration,
  handleChooseImage,
  handleTemplateAttributeChange,
  handleDeleteImage,
  formType,
  openModal
} = useExhibitionTemplateManagement()
</script>

<template>
  <div class="wf_flex wf_flex-col wf-p-30 wf_text-n-33">
    <ExhibitionTemplateTable :value="refTableData" @row-click="onRowClick" @on-registration="onRegistration" />
    <div class="wf_flex wf_justify-between wf-mt-14">
      <h6 class="wf_flex wf_items-center">템플릿 기본정보</h6>
      <div class="wf_flex">
        <WelfareMdButton label="저장" button-size="small" class="wf-mr-6" buttonType="neutral" @on-click="onSave" />
        <WelfareMdButton label="코너등록" button-size="small" buttonType="neutral" @on-click="onCornerRegistration" />
      </div>
    </div>
    <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-16">
      <div class="wf_flex wf_items-center">
        <FormGroup label="템플릿 코드" custom-class="wf-body_03-reg" is-rounded-top is-rounded-bottom>{{ values.templateKey }} </FormGroup>
        <FormGroup label="템플릿 명" is-border-left required>
          <WelfareInputText
            :model-value="values.templateName"
            @update:model-value="(value) => setFieldValue('templateName', value)"
            placeholder="템플릿명 입력"
            size="small"
            class="wf_w-180"
            :max-length="15"
          />
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup label="템플릿 미리보기" custom-class="wf-body_03-reg" is-rounded-top is-rounded-bottom>
          <WelfareInputText
            :model-value="values.imagePathName && values.imageName ? `${values.imagePathName}/${values.imageName}` : ''"
            placeholder="이미지url.jpg(저장 후 생성)"
            size="small"
            class="wf-width-full"
            @click="handleChooseImage"
            readonly
          />
          <WelfareMdButton label="삭제" class="wf_m-w-44 wf-ml-10" button-type="neutral" button-size="small" @on-click="handleDeleteImage" />
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup label="전시여부" is-rounded-top is-rounded-bottom custom-class="wf-pl-11">
          <WelfareRadioGroup
            :model-value="values.displayYn"
            @update:model-value="(value) => setFieldValue('displayYn', value)"
            :options="exhibitionTemplateManagementStatusOptions"
            size="sm"
          />
        </FormGroup>
        <FormGroup label="적용 채널" is-border-left>
          <WelfareRadioGroup
            :model-value="values.applyChannelType"
            @update:model-value="
              (value) => {
                if (formType === 'modify') {
                  openModal({
                    content: '연결 된 전시관 카테고리가 있습니다.'
                  })
                } else {
                  setFieldValue('applyChannelType', value)
                }
              }
            "
            :options="exhibitionTemplateManagementAppChannelOptions"
            size="sm"
          />
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup label="전시 성격" custom-class="wf-gap-20 wf-pl-11" is-rounded-top is-rounded-bottom required>
          <WelfareCheckbox
            v-for="(item, index) in refExhibitionTemplateManagementOptions"
            :key="index"
            :true-value="item.trueValue"
            :false-value="item.falseValue"
            :label="item.label"
            :model-value="values[item.name as ExhibitionTemplateManagementType]"
            :disabled="item.disabled"
            @update:model-value="(value) => handleTemplateAttributeChange(item.name as ExhibitionTemplateManagementType, value)"
            size="sm"
          />
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf-note" custom-class="wf-pd-7-12" label="비고" is-rounded-top is-rounded-bottom>
          <WelfareTextarea
            :model-value="values.templateRemarkContents"
            @update:model-value="(value) => setFieldValue('templateRemarkContents', value)"
            placeholder="내용입력"
            class="text-area-h-120 wf-width-full"
          />
        </FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup label="등록자" custom-class="wf-body_03-reg" is-rounded-top is-rounded-bottom>{{ values.createdByName }} </FormGroup>
        <FormGroup label="등록일" custom-class="wf-body_03-reg" is-border-left>{{ values.createdDate }}</FormGroup>
      </div>
      <div class="wf_flex wf_items-center">
        <FormGroup label="수정자" custom-class="wf-body_03-reg" is-rounded-top is-rounded-bottom :is-border-bottom="false">
          {{ values.lastModifiedByName }}
        </FormGroup>
        <FormGroup label="수정일" custom-class="wf-body_03-reg" is-border-left :is-border-bottom="false">
          {{ values.lastModifiedDate }}
        </FormGroup>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/exhibition/templateManagement/exhibition-template-management.css');
</style>

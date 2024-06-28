<script setup lang="ts">
import { MainContractInfoResponseModel } from '@/models/services/responses/main/modal/MainContractInfoResponse'
import { renderLabelEnum } from '@/common'
import { mainCompanyChargerTypeCommonCodeName } from '@/models/views/main/modal/MainContractInfoModel'

interface MenuPlayInformationItemProps {
  data: MainContractInfoResponseModel
}

defineProps<MenuPlayInformationItemProps>()
</script>
<template>
  <div class="wf-m-info-body-main-item wf-space-y-20">
    <span class="wf-sub_tit_01" v-text="renderLabelEnum(mainCompanyChargerTypeCommonCodeName, data.chargerType) + ' 담당'"></span>
    <div class="wf-m-info-wrap-f-43-44 wf-space-y-12">
      <div class="wf-frame-1000002243 wf-space-y-6">
        <span class="wf-body_03-reg title" v-text="data.sellerName"></span>
        <div class="wf-m-info-two-text wf-space-x-10">
          <span class="wf-body_01-reg" v-text="data.chargerName"></span>
        </div>
      </div>
      <div class="wf-frame1000002244 wf-space-y-10 wf-mt-11">
        <div class="wf-top wf-m-info-two-text wf-space-x-10">
          <div class="wf-frame1000002244-item wf-line-height-14 wf-first">
            <span class="wf-body_03-semi">HP : </span>
            <span class="wf-body_03-reg" v-text="data.chargerPhone"></span>
          </div>
          <div class="wf-frame1000002244-item wf-line-height-14 wf-email">
            <span class="wf-body_03-semi">EMAIL : </span>
            <a :href="`mailto:${data.chargerEmail}`" class="wf-body_03-reg wf-underline wf-underline-offset-2" v-text="data.chargerEmail"> </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

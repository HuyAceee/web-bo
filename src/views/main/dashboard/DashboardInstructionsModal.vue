<!-- BO_A0202_010101_P -->
<script setup lang="ts">
import { WelfareBaseDialog, WelfareCheckbox } from '@/components'
import IconArrowRight from '@/components/icons/IconArrowRight.vue'
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import { useDashboardMainPopup } from '@/composables/main/dashboard/useDashboardMainPopup'
import { ref } from 'vue'

defineProps(['onClose'])

const value = ref(false)

const { titleTruncate, currentPage, currentData, dataLength, nextPage, prePage } = useDashboardMainPopup()

function handleClickCheckbox() {}
</script>
<template>
  <WelfareBaseDialog
    :header="titleTruncate"
    :visible="true"
    style-root="wf_daily_modal--set"
    styleHeader="wf_daily_modal--header"
    styleContent="wf_daily_modal--content"
    style-footer="wf_daily_modal--footer"
    style-header-icon="wf_daily_modal--header-icon"
    @update:visible="onClose"
    :isModal="false"
  >
    <div class="wf_daily_modal-main">
      <div class="wf_daily_modal-main--p">
        <p class="wf_daily_modal-name wf-body_01-mid">{{ currentData.name }}</p>
        <div class="wf_daily_modal-content wf-body_01-reg">
          <p class="wf_daily_modal-content--name">{{ currentData.nameContent }}</p>
          <p class="wf_daily_modal-content--message">{{ currentData.content }}</p>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="wf_daily_modal-footer">
        <WelfareCheckbox v-model="value" class="ml-36 wf_daily_modal-footer--checkbox" label="하루 동안 보지 않기" @click="handleClickCheckbox" />

        <div class="wf_daily_modal-pagination wf-body_04-mid">
          <button type="button" @click="prePage">
            <IconArrowLeft :width="13" :height="14" />
          </button>
          <p>
            <span class="wf-body_03-mid">{{ currentPage + 1 }}</span> / <span class="wf-body_03-semi">{{ dataLength }}</span>
          </p>
          <button type="button" @click="nextPage">
            <IconArrowRight :width="13" :height="14" />
          </button>
        </div>
      </div>
    </template>
  </WelfareBaseDialog>
</template>
<style>
@import url('@/assets/css/view/main/dashboard/dashboard-modal.css');
</style>

<script lang="ts" setup>
import { WelfareBigButton } from '@/components'

interface TNWrapDetailCreateProps {
  onSubmit: (e?: Event | undefined) => Promise<void | undefined>
  onBack: () => void
}

defineProps<TNWrapDetailCreateProps>()
</script>

<template>
  <div class="wf-frame1000002102">
    <form class="wf_tn-flex-1" @submit="onSubmit">
      <div class="wf-frame-table-news-container">
        <slot></slot>
        <div class="table-news-filter-button-container">
          <WelfareBigButton label="목록" buttonType="neatral" class="wf_button--ml" @onClick="onBack" />
          <WelfareBigButton label="저장" buttonType="default" type="submit" />
        </div>
      </div>
    </form>
  </div>
</template>

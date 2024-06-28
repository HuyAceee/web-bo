<script setup lang="ts">
import { WelfareBigButton } from '@/components'

interface TNFilterListProps {
  onSubmit: (e?: Event | undefined) => Promise<void | undefined>
  onResetForm: () => void
}

defineProps<TNFilterListProps>()
</script>

<template>
  <form @submit="onSubmit" >
  <div class="wf-frame-table-news-filter-container">
    <slot></slot>
    <div class="table-news-filter-button-container">
      <WelfareBigButton label="초기화" buttonType="neatral" class="wf_button--ml" @onClick="() => onResetForm()"/>
      <WelfareBigButton label="조회" buttonType="default" type="submit"/>
    </div>
  </div>
</form>
</template>



<script setup lang="ts">
import IconArrowLink from '@/components/icons/IconArrowLink.vue'
import DashboardSessionTitle from './DashboardSessionTitle.vue'

interface DashboardSessionTitleLinkProps {
  title: string
  subTitle?: string
  link: string
  linkTitle: string
}

const props = defineProps<DashboardSessionTitleLinkProps>()
</script>

<template>
  <div class="wf-width-full wf-height-full wf_flex wf_justify-between wf_items-center wf_align-self-stretch">
    <DashboardSessionTitle :title="props.title" :subTitle="props.subTitle" />
    <router-link :to="props.link" class="wf-session-title-link wf_flex wf_justify-center wf_items-center wf-space-x-6">
      <span class="wf-text wf-body_03-mid wf-letter-spacing-0">{{ props.linkTitle }}</span>
      <IconArrowLink />
    </router-link>
  </div>
</template>

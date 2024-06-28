<script setup lang="ts">
import { WelfareTabText } from '@/components'
import { TabViewChangeEvent } from 'primevue/tabview'
import { ref } from 'vue'
import MemberListBaseInformationTabAcceptPage from '@/views/members/memberList/MemberListBaseInformationTabAcceptPage.vue'
import MemberListBaseInformationTabBasePage from '@/views/members/memberList/MemberListBaseInformationTabBasePage.vue'
import { MemberDetailBaseTabProps } from '@/models'
const currentActive = ref(0)
const props = defineProps<MemberDetailBaseTabProps>()
const tabPanelProps = [
  { header: '기본정보', disabled: false, pt: {} },
  { header: '마케팅 활용 동의', disabled: false, pt: {} }
]
const listComponent = [MemberListBaseInformationTabBasePage, MemberListBaseInformationTabAcceptPage]
const handleTabChange = (event: TabViewChangeEvent) => {
  currentActive.value = event.index
}
</script>

<template>
  <div class="wf_member_list-base-tab">
    <WelfareTabText @tab-change="handleTabChange" :activeIndex="currentActive" :wfTabPanelProps="tabPanelProps">
      <template #wf-tab-text-content="{ tabIndex }">
        <div class="wf_member_list-margin">
          <component :key="tabIndex" v-bind="props" :is="listComponent[tabIndex]" />
        </div>
      </template>
    </WelfareTabText>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-list-base-information-page.css');
</style>

<!--
Props:
- title: The title of the authentication page.
- subTitle: The subtitle of the authentication page.
- reverse-title 
- is-modal: is component behave like a modal or not. -- not implement yet

Slots:
- title: The slot for the title of the page. If the 'reverseTitle' prop is true, the title and subtitle will be reversed.
- content: The slot for the content of the page.
- footer: The slot for the footer of the page.

Usage:
<AuthenticationBaseWrapper :title="'Login'" :subTitle="'Please enter your credentials'" reverse-title=boolean>
  <template #header>
  </template>
  <template #content>
  </template>
  <template #footer>
  </template>
</AuthenticationBaseWrapper>
-->

<script setup lang="ts">
import { icLogo } from '@/assets'
import { HOMEPAGE_ROUTER } from '@/common'
import { AuthenticationBaseWrapperProps } from '@/models/views/authentication/AuthenticationBaseWrapperProps'

const props = defineProps<AuthenticationBaseWrapperProps>()
const defaultContactText = props.contactText ?? '이용에 어려움이 있으세요?'
const defaultContactPhone = props.contactPhone ?? '1588-5252'
</script>
<template>
  <div class="wf_authentication-wrapper">
    <div class="wf-space-y-40 wf_flex wf_flex-col wf_justify-center wf_items-center wf_authentication">
      <RouterLink :to="HOMEPAGE_ROUTER" class="wf-router-link-icon">
        <img alt="logo" :src="icLogo" class="wf_authentication--logo" />
      </RouterLink>
      <div class="wf_bg-white wf_w-full wf-space-y-30 wf_authentication--slot">
        <slot name="title">
          <div v-if="reverseTitle" class="wf-space-y-12 wf_text-n-33">
            <h2>{{ props.title }}</h2>
            <h5>{{ props.subTitle }}</h5>
          </div>
          <div v-else class="wf-space-y-12 wf_text-n-33">
            <h5>{{ props.subTitle }}</h5>
            <h2>{{ props.title }}</h2>
          </div>
        </slot>
        <slot name="content"></slot>
        <slot name="footer"></slot>
        <div v-if="hasContact" class="wf_flex wf_flex-col wf_items-center wf-space-y-10 wf_text-n-33 wf-mb-2 wf-ml--1 wf_authenticate--contact">
          <p class="wf-body_03-mid wf_text-n-52">{{ defaultContactText }}</p>
          <p class="wf-body_03-bold wf-underline wf-underline-offset-3">{{ defaultContactPhone }}</p>
        </div>
      </div>
      <span class="wf-body_04-reg wf_text-n-8-f">Ⓒ MEGAZONE. ALL RIGHTS RESERVED.</span>
    </div>
  </div>
</template>

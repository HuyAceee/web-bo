<!--
Props:
- titleContent: The title of the content authentication.
- message: The message of the content authentication.
- type: primary | danger (border and color of content authentication)
- class: custom class
Slot: 
- image: image of content authentication
- content: if you want custom content authentication
- title: if you want custom title
Usage:
 <AuthenticationBoxWrapper borderColor="primary" color="primary" titleContent="이메일 인증이 완료되었습니다.">
    if you need image use slot image
    <template #image>
          <img src='' />
    </template>
    <template #title>
          <span class="content-custom">Something</span>
        </template>
        <template #content></template>
          <span class="content-custom">Something</span>
        </template>
 </AuthenticationBoxWrapper>
-->

<script setup lang="ts">
import { AuthenticationBoxWrapperProps } from '@/models/views/authentication/AuthenticationBaseWrapperProps'

const props = defineProps<AuthenticationBoxWrapperProps>()
</script>

<template>
  <div class="wf_box-authentication-main" :class="props.class">
    <div class="wf_box-authentication-image" :class="`wf_box-authentication-image--${props.type === 'danger' ? 'danger' : 'primary'}`">
      <slot name="image"></slot>
    </div>
    <div class="wf_authentication-box-wrapper" :class="`wf_authentication-box-wrapper--border-${props.type === 'danger' ? 'danger' : 'primary'}`">
      <p class="wf-body_01-semi wf_box-authentication-title" :class="`wf_box-title--${props.type === 'danger' ? 'danger' : 'primary'}`">
        <slot name="title">
          <span v-if="props.titleContent">{{ props.titleContent }}</span>
        </slot>
      </p>
      <div class="wf-body_01-mid wf_box-authentication-message">
        <slot name="content" class="wf-body_01-mid wf_box-message">
          <span class="" v-if="props.messageContent">{{ props.messageContent }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

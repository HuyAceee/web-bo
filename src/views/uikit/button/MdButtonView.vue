<script setup>
import IconSelect from '@/components/icons/IconSelect.vue'
import { WelfareMdButton } from '@/components'
</script>
<template>
  <div class="wf_container wf_container--md-button">
    <!-- Medium and small button -->
    <div class="wf_container-grid" style="--grid-columns: 1fr 1fr">
      <div class="wf_container-row wf_container-row--one">
        <div class="wf_container-col">
          <WelfareMdButton label="텍스트" buttonType="liner" />
          <WelfareMdButton label="텍스트" buttonType="liner" class="hover" />
          <WelfareMdButton label="텍스트" buttonType="liner" class="active" />
          <WelfareMdButton label="텍스트" buttonType="liner" disabled />
        </div>
        <div class="wf_container-col">
          <WelfareMdButton label="텍스트" buttonType="neutral" />
          <WelfareMdButton label="텍스트" buttonType="neutral" class="hover" />
          <WelfareMdButton label="텍스트" buttonType="neutral" class="active" />
          <WelfareMdButton label="텍스트" buttonType="neutral" disabled />
        </div>
        <div class="wf_container-col">
          <WelfareMdButton label="텍스트" buttonType="default" />
          <WelfareMdButton label="텍스트" buttonType="default" class="hover" />
          <WelfareMdButton label="텍스트" buttonType="default" class="active" />
          <WelfareMdButton label="텍스트" buttonType="default" disabled />
        </div>
        <div class="wf_container-col wf_container-col--ml">
          <WelfareMdButton label="텍스트" buttonType="cancel" />
          <WelfareMdButton label="텍스트" buttonType="cancel" class="hover" />
          <WelfareMdButton label="텍스트" buttonType="cancel" class="active" />
          <WelfareMdButton label="텍스트" buttonType="cancel" disabled />
        </div>
      </div>

      <div class="wf_container-row wf_container-row--two">
        <div class="wf_container-col">
          <WelfareMdButton label="텍스트" buttonType="liner" buttonSize="small" />
          <WelfareMdButton label="텍스트" buttonType="liner" class="hover" buttonSize="small" />
          <WelfareMdButton label="텍스트" buttonType="liner" buttonSize="small" class="active" />
          <WelfareMdButton label="텍스트" buttonType="liner" disabled buttonSize="small" />
        </div>
        <div class="wf_container-col">
          <WelfareMdButton label="텍스트" buttonType="neutral" buttonSize="small" />
          <WelfareMdButton label="텍스트" buttonType="neutral" class="hover" buttonSize="small" />
          <WelfareMdButton label="텍스트" buttonType="neutral" buttonSize="small" class="active" />
          <WelfareMdButton label="텍스트" buttonType="neutral" disabled buttonSize="small" />
        </div>
        <div class="wf_container-col">
          <WelfareMdButton label="텍스트" buttonType="default" buttonSize="small" />
          <WelfareMdButton label="텍스트" buttonType="default" class="hover" buttonSize="small" />
          <WelfareMdButton label="텍스트" buttonType="default" buttonSize="small" class="active" />
          <WelfareMdButton label="텍스트" buttonType="default" disabled buttonSize="small" />
        </div>
        <div class="wf_container-col">
          <WelfareMdButton label="텍스트" buttonType="cancel" buttonSize="small" />
          <WelfareMdButton label="텍스트" buttonType="cancel" class="hover wf_container-col--ml-5" buttonSize="small" />
          <WelfareMdButton label="텍스트" buttonType="cancel" buttonSize="small" class="active wf_container-col--ml-5" />
          <WelfareMdButton label="텍스트" buttonType="cancel" disabled buttonSize="small" class="wf_container-col--ml-5" />
        </div>
      </div>
      <!-- button slot icon -->
      <div class="wf_container-row wf_container-row--three">
        <div class="wf_container-col">
          <WelfareMdButton label="텍스트" buttonType="liner">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="liner" icon class="hover">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="liner" iconclass="active">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="liner" disabled icon>
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
        </div>
        <div class="wf_container-col">
          <WelfareMdButton label="텍스트" buttonType="neutral" icon>
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="neutral" icon class="hover">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="neutral" iconclass="active">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="neutral" disabled icon>
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
        </div>
        <div class="wf_container-col">
          <WelfareMdButton label="텍스트" buttonType="default" icon>
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="default" icon class="hover">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="default" iconclass="active">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="default" disabled icon>
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
        </div>
        <div class="wf_container-col wf_container-col--ml">
          <WelfareMdButton label="텍스트" buttonType="cancel" icon>
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="cancel" icon class="hover">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="cancel" iconclass="active">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="cancel" disabled icon>
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
        </div>
      </div>

      <div class="wf_container-row wf_container-row--four">
        <div class="wf_container-col">
          <WelfareMdButton label="텍스트" buttonType="liner" icon buttonSize="small">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="liner" icon buttonSize="small" class="hover">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="liner" icon buttonSize="small" class="active">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="liner" disabled icon buttonSize="small">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
        </div>
        <div class="wf_container-col">
          <WelfareMdButton label="텍스트" buttonType="neutral" icon buttonSize="small">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="neutral" icon buttonSize="small" class="hover">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="neutral" icon buttonSize="small" class="active">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="neutral" disabled icon buttonSize="small">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
        </div>
        <div class="wf_container-col">
          <WelfareMdButton label="텍스트" buttonType="default" icon buttonSize="small">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="default" icon buttonSize="small" class="hover">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="default" icon buttonSize="small" class="active">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="default" disabled icon buttonSize="small">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
        </div>
        <div class="wf_container-col wf_container-col--ml">
          <WelfareMdButton label="텍스트" buttonType="cancel" icon buttonSize="small">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="cancel" icon buttonSize="small" class="hover">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="cancel" icon buttonSize="small" class="active">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
          <WelfareMdButton label="텍스트" buttonType="cancel" disabled icon buttonSize="small">
            <IconSelect :width="14" :height="14" />
          </WelfareMdButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/uikit/uikit-md-button-view.css');
</style>

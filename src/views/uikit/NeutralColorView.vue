<script>
export default {
  data() {
    return {
      data: [
        { col1: '#FFFFFF', col2: 'white', class: 'wf_div-color wf_bg-white wf_shadow', classContainer: 'w-50' },
        { col1: '#A8AFBF', col2: 'N_#Sp', class: 'wf_div-color wf_bg-a8', classContainer: 'w-52' },
        { col1: '#F0F0F0', col2: 'N_#F0', class: 'wf_div-color wf_bg-f0', classContainer: 'w-50' },
        { col1: '#CCCCCC', col2: 'N_#CC', class: 'wf_div-color wf_bg-cc', classContainer: 'w-53' },
        { col1: '#8F8F8F', col2: 'N_#8F', class: 'wf_div-color wf_bg-8f', classContainer: 'w-50' },
        { col1: '#525252', col2: 'N_#52', class: 'wf_div-color wf_bg-52', classContainer: 'w-50' },
        { col1: '#333333', col2: 'N_#33', class: 'wf_div-color wf_bg-33', classContainer: 'w-50' },
        { col1: '#000000', col2: 'primary', class: 'wf_div-color wf_bg-black', classContainer: 'w-50' }
      ]
    }
  }
}
</script>

<template>
  <div class="container wf_bg-white wf_h-fit">
    <div class="wf_container-row gap-40">
      <div v-for="(item, index) in data" :key="index">
        <div :class="[item.classContainer, 'wf_div-color-container']">
          <div :class="item.class"></div>
          <p class="text-sub-color">{{ item.col1 }}</p>
          <p class="text-sub-color">{{ item.col2 }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: inline-flex;
  padding: 17px 19px 10px 30px;
  align-items: center;
}

.text-sub-color {
  font-family: 'NotoSansKR', sans-serif !important;
  font-weight: var(--w-700);
  font-style: normal;
  line-height: normal !important;
}

.w-50 {
  width: 50px;
}
.w-52 {
  width: 52px;
}
.w-53 {
  width: 53px;
}

.gap-40 {
  gap: 40px;
}
</style>

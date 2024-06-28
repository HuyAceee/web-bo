<script>
export default {
  data() {
    return {
      data: [
        { col1: '#F95729', col2: 'sub_01', class: 'wf_div-color wf_bg-f9', classContainer: 'w-50' },
        { col1: '#4075F3', col2: 'sub_02', class: 'wf_div-color wf_bg-40', classContainer: 'w-50' },
        { col1: '#079467', col2: 'sub_03', class: 'wf_div-color wf_bg-07', classContainer: 'w-50' },
        { col1: '#FFC907', col2: 'star', class: 'wf_div-color wf_bg-ff', classContainer: 'w-51' },
        { col1: '#F7F8FA', col2: 'BG_gray', class: 'wf_div-color wf_bg-f7', classContainer: 'w-50' },
        { col1: '#EBF7F3', col2: 'BG_green', class: 'wf_div-color wf_bg-eb', classContainer: 'w-58' },
        { col1: '#F4F9FF', col2: 'BG_blue', class: 'wf_div-color wf_bg-f4', classContainer: 'w-50' },
        { col1: '#BAE4DA', col2: 'LINE_green', class: 'wf_div-color wf_bg-ba', classContainer: 'w-68' },
        { col1: '#E3E6EA', col2: 'LINE_gray', class: 'wf_div-color wf_bg-e3' }
      ]
    }
  }
}
</script>

<template>
  <div class="container wf_bg-white wf_h-fit">
    <div class="wf_container-row">
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
  padding: 10px 64px 4px 36px;
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

.w-51 {
  width: 51px;
}
.w-58 {
  width: 58px;
}
.w-68 {
  width: 68px;
}
</style>

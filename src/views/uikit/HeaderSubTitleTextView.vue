<script>
export default {
  data() {
    return {
      data: [
        { col1: '36 Bold', col2: 'h1' },
        { col1: '26 semi', col2: 'h2' },
        { col1: '24 reg', col2: 'h3' },
        { col1: '22 semi', col2: 'h4' },
        { col1: '22 reg', col2: 'h5' },
        { col1: '20 semi', col2: 'h6' }
      ],
      data2: [
        { col1: '18 semi', col2: 'sub_tit_01', class: 'wf-sub_tit_01 ' },
        { col1: '18 reg', col2: 'sub_tit_02', class: 'wf-sub_tit_02 ' }
      ]
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col col1">
        <div v-for="(item, index) in data" :key="index">
          <component :is="item.col2">{{ item.col1 }}</component>
        </div>
      </div>
      <div class="col col2">
        <div v-for="(item, index) in data" :key="index">
          <component :is="item.col2">{{ item.col2.toUpperCase() }}</component>
        </div>
      </div>
    </div>
    <div class="row row2 mt-50">
      <div class="col">
        <div v-for="(item, index) in data2" :key="index">
          <span :class="item.class">
            {{ item.col1 }}
          </span>
        </div>
      </div>
      <div class="col">
        <div v-for="(item, index) in data2" :key="index">
          <span :class="[item.class, 'ml-1']">{{ item.col2 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: flex-start;
  gap: 50px;
}
.row2 {
  width: 183px;
}
.ml-1 {
  margin-left: 1px;
}
.col {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.col1 {
  width: 124px;
}

.col2 {
  width: 42px;
}
.container {
  display: flex;
  width: 468px;
  height: 568px;
  padding: 40px 20px;
  flex-direction: column;
  align-items: center;
  background: var(--neutral-b-6);
}
.mt-50 {
  margin-top: 50px;
}
</style>

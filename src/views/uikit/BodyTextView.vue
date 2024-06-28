<script >
export default {
    data() {
        return {
            data: [
                { col1: "16 bold", col2: "body_01", class: "wf-body_01-bold " },
                { col1: "16 semi", col2: "body_01", class: "wf-body_01-semi " },
                { col1: "16 mid", col2: "body_01", class: "wf-body_01-mid " },
                { col1: "16 reg", col2: "body_01", class: "wf-body_01-reg " },
                { col1: "15 bold", col2: "body_02", class: "wf-body_02-bold  " },
                { col1: "15 semi", col2: "body_02", class: "wf-body_02-semi  " },
                { col1: "15 mid", col2: "body_02", class: "wf-body_02-mid  " },
                { col1: "15 reg", col2: "body_02", class: "wf-body_02-reg  " },
                { col1: "14 bold", col2: "body_03", class: "wf-body_03-bold  " },
                { col1: "14 semi", col2: "body_03", class: "wf-body_03-semi  " },
                { col1: "14 mid", col2: "body_03", class: "wf-body_03-mid  " },
                { col1: "14 reg", col2: "body_03", class: "wf-body_03-reg  " },
                { col1: "12 mid", col2: "body_04", class: "wf-body_04-mid  " },
                { col1: "12 reg", col2: "body_04", class: "wf-body_04-reg  " },
            ]
        };
    }
};
</script>

<template>
    <div class="container">
        <div class="row row2">
            <div class="col col1">
                <div v-for="(item, index) in data" :key="index">
                    <p :class="item.class">
                        {{ item.col1 }}
                    </p>
                </div>
            </div>
            <div class="col col2">
                <div v-for="(item, index) in data" :key="index">
                    <p :class="item.class">{{ item.col2 }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style  scoped>
.row {
    display: flex;
    align-items: flex-start;
    gap: 50px;
}

.col {
    display: flex;
    flex-direction: column;
    gap: 20px ;
    margin-top: 1px;
}

.col1 {
    width: 51px;
}

.col2 {
    width: 56px;
}

.container {
    display: flex;
    width: 458px;
    height: 559px;
    padding: 40px 12px;
    flex-direction: column;
    align-items: center;
    background: var(--neutral-b-6);
}

.mt-50 {
    margin-top: 50px;
}

</style>
  
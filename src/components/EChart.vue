<template>
  <a-range-picker v-model:value="range" />
  <a-select v-model:value="field" style="width: 200px">
    <a-select-option v-for="select in options" :key="select">
      {{ select }}
    </a-select-option>
  </a-select>
  <a-button :onClick="search">Search</a-button>
  <br />
  <br />
  <div id="chart"></div>
</template>

<script>
import { inject, onMounted, reactive, ref } from "vue";
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "EChart",
  setup() {
    let $echarts = inject("echarts");

    let datax = reactive([]);
    let datay = reactive([]);
    let field = ref("计算机软件");
    let selects = ["计算机软件", "会计/审计"];
    const options = ref();

    let myChart;

    const dateFormat = "YYYY-MM-DD";
    let range = ref([
      dayjs("2022-04-01", dateFormat),
      dayjs("2022-04-03", dateFormat),
    ]);

    async function search() {
      let rangef = range.value.map((v) => v.format(dateFormat));
      let params = {
        from: rangef[0],
        to: rangef[1],
        field: field.value,
      };
      let rsp = await axios.get("/api/job/", { params: params });
      datax = rsp.data.data.map((v) => v.name);
      datay = rsp.data.data;
      myChart.setOption({
        legend: {
          data: datax,
        },
        series: [
          {
            data: datay,
          },
        ],
      });
    }

    onMounted(() => {
      myChart = $echarts.init(document.getElementById("chart"));
      myChart.setOption({
        title: {
          text: "学历分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [],
        },
        series: [
          {
            name: "学历分布",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      search();

      axios
        .get("/api/options/", { params: { select: "field" } })
        .then((res) => {
          options.value = res.data.data;
        });
    });

    return {
      search,
      range,
      field,
      selects,
      options,
    };
  },
};
</script>

<style scoped>
#chart {
  height: 400px;
  width: 400px;
  margin: 0 auto;
}
</style>
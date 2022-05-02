<template>
  <a-range-picker v-model:value="range" />
  <a-button :onClick="search">Search</a-button>
  <h2>{{ datax.value }}</h2>
  <h2>{{ datay.value }}</h2>
  <br /><br />
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

    let rsp = reactive({});
    let datax = reactive([]);
    let datay = reactive([]);

    let myChart;

    const dateFormat = "YYYY/MM/DD";
    let range = ref([
      dayjs("2022/05/01", dateFormat),
      dayjs("2022/05/07", dateFormat),
    ]);

    async function search() {
      let rangef = range.value.map((v) => v.format(dateFormat));
      let params = {
        from: rangef[0],
        to: rangef[1],
      };
      rsp = await axios.get("/api/num/", { params: params });
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
          text: "Traffic Sources",
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
            name: "Traffic Sources",
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
    });

    return {
      range,
      search,
      datax,
      datay,
    };
  },
};
</script>

<style scoped>
#chart {
  height: 400px;
}
</style>
<template>
  <a-input-number v-model:value="num1" /><br />
  <a-input-number v-model:value="num2" /><br />
  <h3>{{ num }}</h3>
  <a-button :onClick="add">add</a-button>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "AddNum",

  setup() {
    let num1 = ref("1");
    let num2 = ref("2");
    let num = ref("3");

    async function add() {
      let url = "/api/add/";
      let params = {
        num1: num1.value,
        num2: num2.value,
      };
      let rsp = await axios.get(url, { params: params });
      num.value = rsp.data.data;
    }

    return {
      num1,
      num2,
      num,
      add,
    };
  },
};
</script>

<style scoped>
</style>
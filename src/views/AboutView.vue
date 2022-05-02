<template>
  <div class="about">
    <h1>This is an about page</h1>
    <AddNum /><br />
    <EChart />
  </div>
</template>

<script>
import AddNum from "@/components/AddNum";
import EChart from "@/components/EChart";
export default {
  components: {
    AddNum,
    EChart,
  },
};
</script>
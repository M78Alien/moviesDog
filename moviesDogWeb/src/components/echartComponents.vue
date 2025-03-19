<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  options: {
    type: Object,
    required: true,
  }
})
const chartRef = ref(null);
let myChart = null
onMounted(() => {
  // 在组件挂载后初始化 ECharts 实例
  setTimeout(() => {
    myChart = echarts.init(chartRef.value);
    myChart.setOption(props.options);

    const resizeHandler = () => {
      myChart.resize();
    };

    window.addEventListener('resize', resizeHandler);

    onUnmounted(() => {
      window.removeEventListener('resize', resizeHandler);
      myChart.dispose();
    });
  }, 1000)

});

watch(() => props.options, (newOption) => {
  if (myChart) {
    myChart.setOption(newOption);
  }
}, { deep: true });
</script>

<template>
  <div ref="chartRef" style="width: 600px; height: 400px;"></div>
</template>

<style scoped>

</style>

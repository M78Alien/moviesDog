<script setup>
import { ref, reactive, onMounted } from 'vue';
// import * as echarts from 'echarts';
import EchartComponents from "@/components/echartComponents.vue";
import { getSaleRank } from "@/apis/order.js"

const saleList = ref([])

// 票房排行榜统计数据
const saleOption = {
  title: {
    text: '票房排行榜'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    top: '13%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: ['蛟龙行动', '封神第二部', '熊出没', '唐探1900', '哪吒之魔童闹海']
  },
  series: [
    {
      name: '累计票房',
      type: 'bar',
      data: [36900, 113200, 68500, 296000, 344100],
      itemStyle: {
        color: '#F9C78B'
      },
      label: {
        show: true,
        color: '#656565'
      }
    },
    {
      name: '今日票房',
      type: 'bar',
      data: [226, 497, 725, 4685, 47573],
      itemStyle: {
        color: '#F39423'
      },
      label: {
        show: true,
        color: '#656565'
      }
    }
  ]
};
// 电影评分排行榜
const scoreOption = {
  title: {
    text: '电影评分排行榜'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  xAxis: [
    {
      type: 'category',
      data: ['蛟龙行动', '封神第二部', '熊出没', '唐探1900', '哪吒之魔童闹海'],
      axisPointer: {
        type: 'shadow'
      },
      axisLabel: {
        fontSize: 10,
      },
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '评论数',
      splitLine: { show: false },
    },
    {
      type: 'value',
      name: '评分',
    }
  ],
  series: [
    {
      name: '评论数',
      type: 'bar',
      data: [
        23, 67, 164, 154, 356
      ],
      label: {
        show: true,
        color: '#292929',
        position: 'top',
      }
    },
    {
      name: '评分',
      type: 'line',
      yAxisIndex: 1,
      data: [
        4.5, 7.3, 6.6, 7.4, 9.1
      ],
      itemStyle: {
        color: '#ff9c00'
      },
      label: {
        show: true,
        color: '#656565'
      }
    }
  ]
};
// 影院销量占比
const cinemaOption = {
  title: {
    text: '影院销量占比'
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: '影院销量占比',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        formatter: '{b}: {c} ({d}%)'
      },
      labelLine: {
        show: true
      },
      data: [
        { value: 1048, name: '影院1' },
        { value: 735, name: '影院2' },
        { value: 580, name: '影院3' },
        { value: 484, name: '影院4' },
        { value: 300, name: '影院5' }
      ]
    }
  ]
};

// 启动执行
onMounted(async () => {
  const response = await getSaleRank();
  console.log(response);
  saleList.value = response;
})
</script>

<template>
  <div class="homeBox">
    <div>{{saleList.length ? saleList[0][0] : ''}}</div>
    <EchartComponents :options="saleOption" style="width: 100%; height: 40%; margin-top: 25px"></EchartComponents>
    <div style="display: flex; height: 40%; width: 100%; margin-top: 50px">
      <EchartComponents :options="scoreOption" style="width: 50%; height: 100%"></EchartComponents>
      <EchartComponents :options="cinemaOption" style="width: 50%; height: 100%"></EchartComponents>
    </div>
  </div>
</template>

<style scoped>
.homeBox {
  width: 95%;
  height: 100%;
  margin: 0 auto;
}
.topBox {
  width: 100%;
  height: 22%;
  display: flex;
  justify-content: space-between;
}
.topInsideBox {
  width: 30%;
  height: 100%;
  border-radius: 25px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
  border: #d8d8d8 1px solid;
}
.topTitleText {
  width: 100%;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 2.5vh;
}
.topNum {
  width: 100%;
  font-size: 15px;
}
.topLeftBox {
  text-align: center;
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: #d8d8d8 1px solid;
}
</style>

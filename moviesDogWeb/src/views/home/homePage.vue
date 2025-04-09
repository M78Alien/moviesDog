<script setup>
import { ref, reactive, onMounted } from 'vue';
// import * as echarts from 'echarts';
import EchartComponents from "@/components/echartComponents.vue";
import { getSaleRank, getRateRank, getCinemaRank } from "@/apis/order.js"

// 票房排行榜统计数据
const saleOption = reactive({
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
    data: []
  },
  series: [
    {
      name: '累计票房',
      type: 'bar',
      data: [],
      itemStyle: {
        color: '#ffcc99'
      },
      label: {
        show: true,
        color: '#656565',
        formatter: function(params) {
          return params.value < 10000 ? params.value :
            params.value < 10000000 ? params.value/10000 + '万' :
              params.value < 100000000 ? params.value/10000000 + '千万' :
                params.value/100000000 + '亿';
        }
      }
    }
  ]
});
// 电影评分排行榜
const scoreOption = reactive({
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
      data: [],
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
      data: [],
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
      data: [],
      itemStyle: {
        color: '#ff9c00'
      },
      label: {
        show: true,
        color: '#292929'
      }
    }
  ]
});
// 影院销量占比
const cinemaOption = reactive({
  title: {
    text: '影院票房占比'
  },
  tooltip: {
    trigger: 'item'
  },
  series: [
    {
      name: '影院票房占比',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        formatter: (params) => {
          const value = params.value < 10000 ? params.value : params.value < 10000000 ? params.value/10000 + '万' : params.value < 100000000 ? params.value/10000000 + '千万' : params.value/100000000 + '亿';
          return `${params.name}\n\n${value} (${params.percent}%)`;
        },
        textStyle: {
          fontSize: 12
        }
      },
      labelLine: {
        show: true
      },
      data: []
    }
  ]
});

// 获取票房数据
const getSale = async () => {
  const response = await getSaleRank();
  saleOption.yAxis.data = response.reverse().map(item => item[0])
  saleOption.series[0].data = response.map(item => item[1])
}

// 获取评分数据
const getRate = async () => {
  const response = await getRateRank();
  scoreOption.xAxis[0].data = response.reverse().map(item => {
    if (item[0].length > 6) {
      return item[0].substring(0, 6) + '...'
    } else {
      return item[0]
    }
  })
  scoreOption.series[0].data = response.map(item => item[2])
  scoreOption.series[1].data = response.map(item => item[1])
  // console.log(scoreOption);
}

// 获取影院数据
const getCinema = async () => {
  const response = await getCinemaRank();
  cinemaOption.series[0].data = response.map(item => {
    return {'value': item[1].toFixed(1), 'name': item[0]}
  })
  // console.log(response)
}

// 启动执行
onMounted(() => {
  getSale()
  getRate()
  getCinema()
})
</script>

<template>
  <div class="homeBox">
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

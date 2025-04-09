<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from "element-plus";
import FrameCard from "@/components/frameCard.vue";
import 'element-plus/dist/index.css'
import { getOrderTable } from "@/apis/order.js";

// 验证登录身份
const isAdmin = ref(false)
// 搜索框内容
const searchInput = ref()
// 表格数据
const tableData = ref([])
// 表单窗口显示
const isFrame = ref(false)
// 窗口标题
const frameTitle = ref('卡片标题')
// 副标题内容
const secondTitle = ref('')

// 搜索点击事件
const toSearch = () => {
  console.log('To Search:', searchInput.value)
  // ElMessage({
  //   message: `搜索内容：${searchInput.value}`
  // })
  getTableData(searchInput.value)
}
// 关闭点击事件
const closeModal = () => {
  isFrame.value = false
  console.log('closeModal')
}

// 时间转换
const converseTime= (time) => {
  let date = new Date(time);
  date.setHours(date.getHours());
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
  let day = String(date.getDate()).padStart(2, '0');
  let hours = String(date.getHours()).padStart(2, '0');
  let minutes = String(date.getMinutes()).padStart(2, '0');
  let seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
// 请求表格数据
const getTableData = async (text) => {
  const response = await getOrderTable(text)
  // console.log(JSON.parse(response[0].placeList).length)
  tableData.value = response.map(item => {
    return {
      ...item,
      'createTime': converseTime(item.createTime),
      'cinemaName': item.cinemaName ? item.cinemaName : '-',
      'roomName': item.roomName ? item.roomName : '-',
      'rate': item.rate ? item.rate : '-',
      'comment': item.comment ? item.comment : '未评价',
      'count': JSON.parse(item.placeList) ? JSON.parse(item.placeList).length : 0
    }
  })
}
// 启动事件
onMounted(() => {
  getTableData("")
  const isLoggedIn = JSON.parse(localStorage.getItem('adminKey'));
  if (isLoggedIn.name === 'admin') {
    isAdmin.value = true
  }
})
</script>

<template>
  <div style="width: 95%; height: 100%; margin: 0 auto;"  v-if="isAdmin">
    <div class="topBox">
      <div id="search">
        <span style="margin-right: 20px; font-weight: bold">搜索订单</span>
        <el-input v-model="searchInput" style="width: 280px" placeholder="搜索用户关键词" />
        <el-button
          style="border-radius: 0; border: 0; background-color: #3e77ec; color: white"
          @click="toSearch"
        >搜索</el-button>
        <span style="color: #B1B1B1; font-size: 14px; font-weight: bold; margin-left: 20px">通过搜索用户名查找相关订单信息</span>
      </div>
    </div>
    <el-table
      :data="tableData"
      border
      stripe
      height="600"
      style="width: 100%; text-align: center"
      :cell-style="{'text-align':'center'}"
      :header-cell-style="{'text-align':'center', 'background-color':'#dfdfdf', 'color':'#151515'}"
    >
      <el-table-column prop="id" label="ID" width="55" />
      <el-table-column prop="userName" label="购票用户" />
      <el-table-column prop="movieName" label="电影名称" />
      <el-table-column prop="cinemaName" label="影院名称" />
      <el-table-column prop="roomName" label="影厅名称" />
      <el-table-column prop="price" label="实付票价￥" width="100" />
      <el-table-column prop="count" label="票数" width="80" />
      <el-table-column prop="createTime" label="购票时间" />
      <el-table-column prop="rate" label="评分" width="180" >
        <template #default="row">
          <div style="display: flex; align-items: center; justify-content: center;">
            <el-rate :model-value="row.row.rate/2" allow-half disabled style="margin-right: 6px" />
            <span>{{ row.row.rate }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="评价" width="180" />
    </el-table>
  </div>
  <div class="shieldLayer" style="width: 95%; height: 100%; margin: 0 auto;" v-if="!isAdmin">
    当前管理员没有管理权限
  </div>
  <FrameCard
    :frameTitle="frameTitle"
    :closeModal="closeModal"
    :secondTitle="secondTitle"
    v-show="isFrame"
  >
  </FrameCard>
</template>

<style scoped>
#search {
  display: flex;
  align-items: center;
  :deep(.el-input__wrapper) {
    border-radius: 0;
  }
}
.topBox {
  width: 100%;
  height: 10%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.shieldLayer {
  background-color: #f4f4f4;
  font-size: 24px;
  text-align: center;
  font-weight: bold;
}
</style>

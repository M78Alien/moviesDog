<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from "element-plus";
import FrameCard from "@/components/frameCard.vue";
import 'element-plus/dist/index.css'
import { getUserTable, getOrderForUser } from "@/apis/user.js"
import {View} from "@element-plus/icons-vue";

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
// 观影记录表格数据
const recordData = ref([])

// 搜索点击事件
const toSearch = async () => {
  console.log('To Search:', searchInput.value)
  // ElMessage({
  //   message: `搜索内容：${searchInput.value}`
  // })
  const response = await getUserTable(searchInput.value)
  responseConverse(response)
}
// 详情点击事件
const showDetails = async (row) => {
  // console.log('Show Details:', row.row)
  frameTitle.value = '用户观影记录'
  const response = await getOrderForUser(row.row.id)
  console.log(response)
  recordData.value = response.map((item) => {
    return {
      ...item,
      'createTime': converseTime(item.createTime),
      'count': JSON.parse(item.placeList).length
    }
  })
  isFrame.value = true
  secondTitle.value = `用户名：${row.row.name} | 手机号：${row.row.phoneNumber}`
}
// 关闭点击事件
const closeModal = () => {
  isFrame.value = false
  console.log('closeModal')
}

// response转换
const responseConverse = (response) => {
  tableData.value = response
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

onMounted(async () => {
  const response = await getUserTable()
  // console.log(response)
  responseConverse(response)
  const isLoggedIn = JSON.parse(localStorage.getItem('adminKey'));
  if (isLoggedIn.name === 'admin') {
    isAdmin.value = true
  }
})
</script>

<template>
  <div style="width: 95%; height: 100%; margin: 0 auto;" v-if="isAdmin">
    <div class="topBox">
      <div id="search">
        <span style="margin-right: 20px; font-weight: bold">搜索用户</span>
        <el-input v-model="searchInput" style="width: 280px" placeholder="搜索用户关键词" />
        <el-button
          style="border-radius: 0; border: 0; background-color: #3e77ec; color: white"
          @click="toSearch"
        >搜索</el-button>
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
      <el-table-column prop="id" label="序号" width="55" />
      <el-table-column prop="name" label="用户名称" />
      <el-table-column prop="phoneNumber" label="登录手机号" />
      <el-table-column prop="password" label="登录密码" />
      <el-table-column prop="userProfile" label="头像地址" >
        <template #default="row">
          <div v-if="!row.row.userProfile" style="height: 65px; line-height: 65px">默认头像</div>
          <el-image style="width: 65px; height: 65px" :src="row.row.userProfile" fit="cover" v-if="row.row.userProfile"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="135">
        <template #default="row">
          <el-button size="small" @click="showDetails(row)" color="#3e77ec">
            观影记录
          </el-button>
        </template>
      </el-table-column>
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
    <el-table
      :data="recordData"
      border
      stripe
      height="400"
      style="width: 100%; text-align: center"
      :cell-style="{'text-align':'center'}"
      :header-cell-style="{'text-align':'center', 'background-color':'#dfdfdf', 'color':'#151515'}"
    >
      <el-table-column prop="id" label="序号" width="55" />
      <el-table-column prop="movieName" label="电影名称" />
      <el-table-column prop="cinemaName" label="影院名称" />
      <el-table-column prop="roomName" label="影厅名称" />
      <el-table-column prop="price" label="票价￥" />
      <el-table-column prop="count" label="票数" />
      <el-table-column prop="createTime" label="购买时间" />
    </el-table>
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

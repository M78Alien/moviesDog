<script setup>
import {
  Menu as IconMenu,
  HomeFilled,
  VideoCameraFilled,
  Ticket,
  UserFilled,
  Shop
} from '@element-plus/icons-vue'
import { ref, onBeforeMount, onMounted } from "vue";
import {useRoute, useRouter} from 'vue-router';
import { testService } from "@/apis/test.js";

const currentRoute = useRoute();
const router = useRouter()
const adminName = ref("");

const toLoginPage = () => {
  localStorage.removeItem('adminKey');
  router.push('/login')
}

const testRequest = async () => {
  const response = await testService({name: '222', email: '448666855.com'})
  console.log(response)
}

onBeforeMount(() => {
  console.log(currentRoute.path)
})

onMounted(() => {
  const isLoggedIn = JSON.parse(localStorage.getItem('adminKey'));
  if (isLoggedIn.name === 'admin') {
    adminName.value = '超级管理员'
  } else {
    adminName.value = isLoggedIn.name + '管理员'
  }
})

</script>

<template>
  <div class="common-layout">
    <el-container style="height: 100vh">
      <el-header class="headerBox">
        <div style="margin-left: 40px; display: flex">
          <img src="@/assets/transparentLogo.png" alt="" style="height: 55px" @click="testRequest">
          <div style="line-height: 60px; margin-left: 20px; font-weight: bold; font-size: 18px">影趣购电影票务平台后台管理系统</div>
        </div>
        <div style="margin-right: 40px; display: flex; align-items: center;">
          <span style="font-size: 16px; font-weight: bold; margin-right: 20px">{{adminName}}</span>
          <el-button type="info" text @click="toLoginPage">退出登录</el-button>
        </div>
      </el-header>
      <el-container class="contentBox">
        <el-aside width="200px" style="border-right: #d5d5d5 solid 1px;">
          <el-menu
            :default-active="currentRoute.path"
            class="el-menu-vertical-demo"
            style="font-weight: bold"
            router
          >
            <el-menu-item index="/home">
              <el-icon><HomeFilled /></el-icon>
              <span>数据看板</span>
            </el-menu-item>
            <el-menu-item index="/movieManage">
              <el-icon><VideoCameraFilled /></el-icon>
              <span>电影管理</span>
            </el-menu-item>
            <el-menu-item index="/cinemaManage">
              <el-icon><IconMenu /></el-icon>
              <span>影院管理</span>
            </el-menu-item>
            <el-menu-item index="/roomManage">
              <el-icon><Shop /></el-icon>
              <span>影厅管理</span>
            </el-menu-item>
            <el-menu-item index="/orderManage">
              <el-icon><Ticket /></el-icon>
              <span>订单管理</span>
            </el-menu-item>
            <el-menu-item index="/userManage">
              <el-icon><UserFilled /></el-icon>
              <span>用户管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style scoped>
.common-layout {
  width: 100%;
  height: 100vh;
  background-color: #ededed;
}
.headerBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.5);
  background-color: white;
  z-index: 99;
}
.contentBox {
  background-color: white;
  width: 90%;
  margin: 0 auto;
}
</style>

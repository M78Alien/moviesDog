<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from "element-plus";
import 'element-plus/dist/index.css'
import FrameCard from "@/components/frameCard.vue";
import {WarningFilled} from "@element-plus/icons-vue";
import { register } from "@/apis/login.js"
import {deleteCinema, getCinemaTable, setStatus, updateCinema} from "@/apis/cinema.js";


// 验证登录身份
const isAdmin = ref(false)
// 选择ID
const getID = ref(0)
// 搜索框内容
const searchInput = ref()
// 表单窗口显示
const isFrame = ref(false)
// 保存对话框窗口
const isSaveDialog = ref(false)
// 删除对话框窗口
const isDeleteDialog = ref(false)
// 窗口标题
const frameTitle = ref('卡片标题')
// 输入框是否可用
const isFormEdit = ref(false)
// 营业状态
const showStatus = ref('-')
// 表格数据
const tableData = ref([])
// 表单组件
const formRef = ref(null);
// 表单数据
const formData = reactive({
  cinemaName: '',
  address: '',
  phoneNumber: '',
  notice: '',
  AdminAccount: '',
  AdminPassword: ''
})
// 手机号规则
const validatePhone = (rule, value, callback) => {
  const reg = /^1[3-9]\d{9}$/;
  if (!reg.test(value)) {
    callback(new Error('请输入正确的手机号'));
  } else {
    callback();
  }
};
// 表单校验规则
const rulesData = reactive({
  cinemaName: [
    { required: true, message: '影院名称不能为空', trigger: 'blur' },
  ],
  address: [
    { required: true, message: '影院地址不能为空', trigger: 'blur' },
  ],
  phoneNumber: [
    { required: true, message: '联系电话不能为空', trigger: 'blur' },
  ],
  notice: [],
  AdminAccount: [
    { required: true, message: '管理员登录手机号不能为空', trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' },
  ],
  AdminPassword: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6-20个字符之间', trigger: 'blur' },
  ]
})

// 搜索点击事件
const toSearch = async () => {
  console.log('To Search:', searchInput.value)
  // ElMessage({
  //   message: `搜索内容：${searchInput.value}`
  // })
  const response = await getCinemaTable(searchInput.value)
  responseConverse(response)
  console.log(tableData)
}
// 导入点击事件
const showAdd = () => {
  console.log('addMovie')
  frameTitle.value = '创建影院信息'
  isFrame.value = true
  isFormEdit.value = false
  showStatus.value = ''
  formData.cinemaName = ''
  formData.address = ''
  formData.phoneNumber = ''
  formData.notice = ''
  formData.AdminAccount = ''
  formData.AdminPassword = ''
}
// 关闭点击事件
const closeModal = () => {
  isFrame.value = false
  console.log('closeModal')
  getID.value = 0
}
// 保存点击事件
const onSave = () => {
  formRef?.value.validate((valid) => {
    if (valid) {
      isSaveDialog.value = true
    } else {
      // ElMessage({
      //   message: '注册信息内容填写错误',
      //   type: 'error'
      // });
    }
  })
  console.log('saveMovie')
}
// 删除点击事件
const onDelete = () => {
  console.log('deleteMovie')
  isDeleteDialog.value = true
}
// 详情点击事件
const showDetails = (row) => {
  console.log('Show Details:', row.row.cinemaName)
  frameTitle.value = '影院信息详情'
  isFrame.value = true
  isFormEdit.value = true
  showStatus.value = row.row.status
  getID.value = row.row.index
  formData.cinemaName = row.row.cinemaName
  formData.address = row.row.address
  formData.phoneNumber = row.row.phoneNumber
  formData.notice = row.row.notice
  formData.AdminAccount = row.row.AdminAccount
  formData.AdminPassword = row.row.AdminPassword

}
// 编辑点击事件
const showEdit = (row) => {
  console.log('Show Edit:', row.row.cinemaName)
  frameTitle.value = '编辑影院信息'
  isFrame.value = true
  isFormEdit.value = false
  showStatus.value = row.row.status
  getID.value = row.row.index
  formData.cinemaName = row.row.cinemaName
  formData.address = row.row.address
  formData.phoneNumber = row.row.phoneNumber
  formData.notice = row.row.notice
  formData.AdminAccount = row.row.AdminAccount
  formData.AdminPassword = row.row.AdminPassword
}
// 切换营业状态
const turnStatus = async () => {
  if (showStatus.value === '未营业') {
    const response = await setStatus(getID.value, showStatus.value)
    console.log(response)
    showStatus.value = '经营中'
    ElMessage({
      message: '已切换为经营中',
      type: 'success'
    })
  } else if (showStatus.value === '经营中') {
    const response = await setStatus(getID.value, showStatus.value)
    console.log(response)
    showStatus.value = '未营业'
    ElMessage({
      message: '已切换为未营业',
      type: 'success'
    })
  }
  let response1 = null
  const isLoggedIn = JSON.parse(localStorage.getItem('adminKey'));
  if (isLoggedIn.name === 'admin') {
    isAdmin.value = true
    response1 = await getCinemaTable("")
  } else {
    response1 = await getCinemaTable(isLoggedIn.name)
  }
  responseConverse(response1)
}
// 确认保存
const toSave = async () => {
  console.log('确认保存')
  let response = null
  if (getID.value === 0) {
    response = await register({
      "name": formData.cinemaName,
      "address": formData.address,
      "concactNumber": formData.phoneNumber,
      "phoneNumber": formData.AdminAccount,
      "password": formData.AdminPassword,
      "notice": formData.notice,
      "isOpen": showStatus.value === '经营中',
      "isDelete": false
    })
  } else {
    response = await updateCinema({
      "id": getID.value,
      "name": formData.cinemaName,
      "address": formData.address,
      "concactNumber": formData.phoneNumber,
      "phoneNumber": formData.AdminAccount,
      "password": formData.AdminPassword,
      "notice": formData.notice,
      "isOpen": showStatus.value === '经营中',
      "isDelete": false
    })
  }
  console.log(response)
  isSaveDialog.value = false
  isFrame.value = false
  ElMessage({
    message: '影院信息已保存',
    type: 'success'
  })
  getID.value = 0
  // console.log(formData)
  let response1 = null
  const isLoggedIn = JSON.parse(localStorage.getItem('adminKey'));
  if (isLoggedIn.name === 'admin') {
    isAdmin.value = true
    response1 = await getCinemaTable("")
  } else {
    response1 = await getCinemaTable(isLoggedIn.name)
  }
  responseConverse(response1)
  // console.log(tableData)
}
// 确认删除
const toDelete = async () => {
  // console.log('确认保存')
  isDeleteDialog.value = false
  if (!isAdmin.value) {
    ElMessage({
      message: '当前管理员没有删除权限，请联系工作人员',
      type: 'warning'
    })
    return 0;
  }
  const response = await deleteCinema(getID.value)
  if (response.success) {
    isFrame.value = false
    ElMessage({
      message: '影院信息已删除',
      type: 'success'
    })
    getID.value = 0
    let response1 = null
    const isLoggedIn = JSON.parse(localStorage.getItem('adminKey'));
    if (isLoggedIn.name === 'admin') {
      isAdmin.value = true
      response1 = await getCinemaTable("")
    } else {
      response1 = await getCinemaTable(isLoggedIn.name)
    }
    responseConverse(response1)
  } else {
    ElMessage({
      message: '影院信息删除失败',
      type: 'error'
    })
  }
}

// 类型转换
const responseConverse = (response) => {
  tableData.value = response.map(item => {
    return {
      "index": item.id,
      "cinemaName": item.name,
      "address": item.address,
      "type": item.type,
      "phoneNumber": item.concactNumber,
      "AdminAccount": item.phoneNumber,
      "AdminPassword": item.password,
      "notice": item.notice,
      "status": item.isOpen ? '经营中' : '未营业',
      "isDelete": item.isDelete}; // 创建新对象并替换属性名
  });
}

onMounted(async () => {
  let response = null
  const isLoggedIn = JSON.parse(localStorage.getItem('adminKey'));
  if (isLoggedIn.name === 'admin') {
    isAdmin.value = true
    response = await getCinemaTable("")
  } else {
    response = await getCinemaTable(isLoggedIn.name)
  }
  responseConverse(response)
  // console.log(tableData)
})
</script>

<template>
  <div style="width: 95%; height: 100%; margin: 0 auto;" >
    <div class="topBox" v-if="isAdmin">
      <div id="search">
        <span style="margin-right: 20px; font-weight: bold">搜索影院</span>
        <el-input v-model="searchInput" style="width: 280px" placeholder="搜索影院名称关键词" />
        <el-button
          style="border-radius: 0; border: 0; background-color: #3e77ec; color: white"
          @click="toSearch"
        >搜索</el-button>
        <span style="color: #B1B1B1; font-size: 14px; font-weight: bold; margin-left: 20px">影院管理包括影院管理员信息</span>
      </div>
      <el-button
        style="border-radius: 0; border: 0; background-color: #3e77ec; color: white"
        @click="showAdd"
      >创建影院信息</el-button>
    </div>
    <div class="topBox" v-if="!isAdmin">
      <span style="color: #B1B1B1; font-size: 14px; font-weight: bold; margin-left: 20px">影院管理包括影院管理员信息</span>
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
      <el-table-column prop="index" label="序号" width="55" />
      <el-table-column prop="cinemaName" label="影院名称" />
      <el-table-column prop="address" label="影院地址" />
      <el-table-column prop="phoneNumber" label="联系电话" />
      <el-table-column prop="notice" label="影院公告" />
      <el-table-column prop="status" label="经营状态" width="120" />
      <el-table-column label="操作" width="135">
        <template #default="row">
          <el-button size="small" @click="showDetails(row)">
            详情
          </el-button>
          <el-button size="small" @click="showEdit(row)" color="#3e77ec">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <FrameCard
    :frameTitle="frameTitle"
    :closeModal="closeModal"
    :on-save="onSave"
    :on-delete="onDelete"
    :showStatus="showStatus"
    :turnStatus="turnStatus"
    v-show="isFrame"
  >
    <el-form
      label-width="auto"
      label-position="left"
      style="font-weight: bold"
      :model="formData"
      :rules="rulesData"
      ref="formRef"
    >
      <el-form-item label="影院名称" prop="cinemaName">
        <el-input :disabled="isFormEdit" v-model="formData.cinemaName" placeholder="输入影院名称"></el-input>
      </el-form-item>
      <el-form-item label="影院地址" prop="address">
        <el-input :disabled="isFormEdit" v-model="formData.address" placeholder="输入影院地址"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phoneNumber">
        <el-input :disabled="isFormEdit" v-model="formData.phoneNumber" placeholder="输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="影院公告" prop="notice">
        <el-input
          v-model="formData.notice"
          style="width: 100%"
          :rows="4"
          type="textarea"
          placeholder="输入影院公告"
          :disabled="isFormEdit"
        />
      </el-form-item>
      <el-form-item label="管理员账户" prop="AdminAccount">
        <el-input :disabled="isFormEdit" v-model="formData.AdminAccount" placeholder="输入管理员账户(手机号)"></el-input>
      </el-form-item>
      <el-form-item label="管理员密码" prop="AdminPassword">
        <el-input :disabled="isFormEdit" v-model="formData.AdminPassword" placeholder="输入管理员密码"></el-input>
      </el-form-item>
    </el-form>
  </FrameCard>
  <el-dialog
    v-model="isSaveDialog"
    width="400"
  >
    <div style="display: flex; align-items: center; justify-content: start;">
      <span style="margin-right: 15px; color: #3e77ec"><el-icon size="22"><WarningFilled /></el-icon></span>
      <span style="color: black; font-size: 14px; font-weight: bold">确定要保存该影院信息吗？</span>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isSaveDialog = false">取消</el-button>
        <el-button style="background-color: #3e77ec; color: white" @click="toSave">
          确认保存
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="isDeleteDialog"
    width="400"
  >
    <div style="display: flex; align-items: center; justify-content: start;">
      <span style="margin-right: 15px; color: #ff0000"><el-icon size="22"><WarningFilled /></el-icon></span>
      <span style="color: black; font-size: 14px; font-weight: bold">确定要删除该影院信息吗？</span>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isDeleteDialog = false">取消</el-button>
        <el-button style="background-color: #ff0000; color: white" @click="toDelete">
          确认删除
        </el-button>
      </div>
    </template>
  </el-dialog>
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
</style>

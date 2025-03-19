<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from "element-plus";
import 'element-plus/dist/index.css'
import FrameCard from "@/components/frameCard.vue";
import { WarningFilled } from "@element-plus/icons-vue";
import { getCinemaTable } from "@/apis/cinema"
import {addRoom, getRoomTable, updateRoom} from "@/apis/room.js";
import {getMoviesTable} from "@/apis/movie.js";
import {addShowcase, deleteShowcase, getShowcaseTable} from "@/apis/showcase.js"


// 验证登录身份
const isAdmin = ref(false)
// 选择ID
const getID = ref(0)
// 选择影厅
const getRoom = ref()
// 选择排场ID
const getCaseId = ref(0)
// 返回完整表格数据
const responseTable = ref()
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
// 窗口副标题
const secondTitle = ref('')
// 输入框是否可用
const isFormEdit = ref(false)
// 表格数据
const tableData = ref([])
// 表单组件
const formRef = ref(null);
// 表单数据
const formData = reactive({
  cinemaName: '',
  roomName: '',
  roomType: '',
  roomFare: ''
})
// 表单校验规则
const rulesData = reactive({
  cinemaName: [
    { required: true, message: '影院名称不能为空', trigger: 'blur' },
  ],
  roomName: [
    { required: true, message: '影厅名称不能为空', trigger: 'blur' },
  ],
  roomType: [
    { required: true, message: '影厅类型不能为空', trigger: 'blur' },
  ],
  roomFare: [
    { required: true, message: '影厅定价不能为空', trigger: 'blur' },
  ]
})
// 影院列表
const cinemaList = ref([])
// 影厅类型列表
const roomTypeList = [
  {
    value: 'small',
    label: '小型影厅(40座)'
  },
  {
    value: 'medium',
    label: '中型影厅(96座)'
  },
  {
    value: 'large',
    label: '大型影厅(176座)'
  },
  {
    value: 'super',
    label: '超大型影厅(300座)'
  }
]
// 影厅尺寸
const roomSizeList = {
  'small': {
    'width': 10,
    'height': 4,
  },
  'medium': {
    'width': 16,
    'height': 6,
  },
  'large': {
    'width': 22,
    'height': 8,
  },
  'super': {
    'width': 30,
    'height': 10,
  }
}
// 座位长宽
const itemWidth = ref()
const itemHeight = ref()
// 获取长宽方法
const createWidth = () => {
  itemWidth.value = roomSizeList[formData.roomType].width
  itemHeight.value = roomSizeList[formData.roomType].height
}
// 管理排场窗口
const isShowCase = ref(false)
// 排场表格数据
const tableCaseData = ref([])
// 添加排场名称
const caseName = ref('')
// 添加排场电影名称
const caseMovieName = ref('')
// 添加排场时间选择
const caseShowTime = ref('')
// 电影选择列表
const caseMovieList = ref([])
// 排场信息保存确认弹窗
const isCaseSaveDialog = ref(false)
// 添加排场确认弹窗
const isCaseAddDialog = ref(false)
// 删除排场信息确认弹窗
const isCaseDeleteDialog = ref(false)
// 删除行选中
const caseRef = ref(null)

// 搜索点击事件
const toSearch = async () => {
  console.log('To Search:', searchInput.value)
  // ElMessage({
  //   message: `搜索内容：${searchInput.value}`
  // })
  const response1 = await getRoomTable(searchInput.value)
  responseConverse(response1)
}
// 导入点击事件
const showAdd = () => {
  console.log('addMovie')
  frameTitle.value = '创建影厅信息'
  isFrame.value = true
  isFormEdit.value = false
  formData.cinemaName = ''
  formData.roomName = ''
  formData.roomType = ''
  formData.roomFare = ''
}
// 关闭点击事件
const closeModal = () => {
  isFrame.value = false
  isShowCase.value = false
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
  frameTitle.value = '影厅信息详情'
  formData.cinemaName = row.row.cinemaName
  formData.roomName = row.row.roomName
  formData.roomType = row.row.roomType
  formData.roomFare = row.row.fare
  createWidth()
  isFrame.value = true
  isFormEdit.value = true
  getID.value = row.row.index
}
// 编辑点击事件
const showEdit = (row) => {
  console.log('Show Edit:', row.row.movieName)
  frameTitle.value = '编辑影厅信息'
  formData.cinemaName = row.row.cinemaName
  formData.roomName = row.row.roomName
  formData.roomType = row.row.roomType
  formData.roomFare = row.row.fare
  createWidth()
  isFrame.value = true
  isFormEdit.value = false
  getID.value = row.row.index
}
// 确认保存
const toSave = async () => {
  console.log('确认保存')
  isSaveDialog.value = false
  isFrame.value = false
  ElMessage({
    message: '影院信息已保存',
    type: 'success'
  })
  let response = null
  if (!getID.value) {
    response = await addRoom({
      "name": formData.roomName,
      "cinemaId": formData.cinemaName,
      "sizeType": formData.roomType,
      "price": formData.roomFare,
      "isDelete": 0
    })
  } else {
    response = await updateRoom({
      "id": getID.value,
      "name": formData.roomName,
      "cinemaId": formData.cinemaName,
      "sizeType": formData.roomType,
      "price": formData.roomFare,
      "isDelete": 0
    })
  }
  console.log(response)
  const isLoggedIn = JSON.parse(localStorage.getItem('adminKey'));
  let response1 = null
  if (isLoggedIn.name === 'admin') {
    response1 = await getRoomTable("")
  } else {
    response1 = await getRoomTable(isLoggedIn.name)
  }
  responseConverse(response1)
  getID.value = 0
}
// 确认删除
const toDelete = async () => {
  console.log('确认保存')
  isDeleteDialog.value = false
  isFrame.value = false
  const response = await updateRoom({
    "id": getID.value,
    "isDelete": 1
  })
  console.log(response)
  ElMessage({
    message: '影院信息已删除',
    type: 'success'
  })
  const isLoggedIn = JSON.parse(localStorage.getItem('adminKey'));
  let response1 = null
  if (isLoggedIn.name === 'admin') {
    response1 = await getRoomTable("")
  } else {
    response1 = await getRoomTable(isLoggedIn.name)
  }
  responseConverse(response1)
  getID.value = 0
}
// 管理排场点击事件
const onCase = async (row) => {
  isShowCase.value = true
  frameTitle.value = '管理影厅排场'
  secondTitle.value = `${row.row.cinemaName}-${row.row.roomName}`
  getRoom.value = responseTable.value.find(item => item.id === row.row.index);
  console.log(getRoom.value)
  const response = await getShowcaseTable(getRoom.value.cinemaId, getRoom.value.id)
  console.log(response)
  tableCaseData.value = response
  tableCaseData.value.forEach((obj, index) => {
    obj.showTime = timeConverse(response[index].showTime)
    obj.roomName = `${response[index].cinemaName}-${response[index].roomName}`
  });
}
// 排场保存点击事件
const onCaseSave = () => {
  console.log('排场保存')
  // isShowCase.value = false
  isCaseSaveDialog.value = true
}
// 删除排场点击事件
const onCaseDelete = (row) => {
  caseRef.value = row
  isCaseDeleteDialog.value = true
  getCaseId.value = row.row.id;
}
// 点击添加排场事件
const addCase = () => {
  if (caseMovieName.value === '' || caseShowTime.value === ''){
    ElMessage({
      message: '电影名称或放映时间未选择',
      type: 'warning'
    })
  } else {
    isCaseAddDialog.value = true
  }
}
// 添加排场事件
const showAddCase = async () => {
  showAddCase.value = false
  isCaseAddDialog.value = false
  const response = await addShowcase({
    "showcaseName": caseName.value,
    "cinemaId": getRoom.value.cinemaId,
    "roomId": getRoom.value.id,
    "movieId": caseMovieName.value,
    "showTime": caseShowTime.value,
    "price": getRoom.value.price,
    "isDelete": 0
  })
  console.log(response)
  // ElMessage({
  //   message: `添加排场：${caseMovieName.value}，时间：${caseShowTime.value}`
  // })
  // isShowCase.value = false
  const response1 = await getShowcaseTable(getRoom.value.cinemaId, getRoom.value.id)
  tableCaseData.value = response1
  tableCaseData.value.forEach((obj, index) => {
    obj.showTime = timeConverse(response1[index].showTime)
    obj.roomName = `${response1[index].cinemaName}-${response1[index].roomName}`
  });
}
// 排场确认保存
const toCaseSave = () => {
  console.log('排场保存')
  isShowCase.value = false
  isCaseSaveDialog.value = false
}
// 排场确认删除
const toDeleteCase = async () => {
  console.log('删除：', caseRef.value)
  // isShowCase.value = false
  isCaseDeleteDialog.value = false
  const response = await deleteShowcase(getCaseId.value)
  console.log(response)
  ElMessage({
    message: '删除排场成功',
    type: 'success'
  })
  const response1 = await getShowcaseTable(getRoom.value.cinemaId, getRoom.value.id)
  console.log(response1)
  tableCaseData.value = response1
  tableCaseData.value.forEach((obj, index) => {
    obj.showTime = timeConverse(response1[index].showTime)
    obj.roomName = `${response1[index].cinemaName}-${response1[index].roomName}`
  });
}

// 类型转换
const responseConverse = (response) => {
  tableData.value = response.map(item => {
    return {
      "index": item.id,
      "cinemaName": item.cinemaName,
      "roomName": item.name,
      "address": item.cinemaAddress,
      "roomType": item.sizeType,
      "fare": item.price
    }
  })
  responseTable.value = response
}

// 时间转换
const timeConverse = (time) => {
  const date = new Date(time);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 启动执行
onMounted(async () => {
  const isLoggedIn = JSON.parse(localStorage.getItem('adminKey'));
  let response = null
  let response1 = null
  if (isLoggedIn.name === 'admin') {
    response = await getCinemaTable("")
    response1 = await getRoomTable("")
    isAdmin.value = true
  } else {
    response = await getCinemaTable(isLoggedIn.name)
    response1 = await getRoomTable(isLoggedIn.name)
  }

  cinemaList.value = response?.map(item => {
    return {
      value: item.id,
      label: item.name
    }
  })
  responseConverse(response1)
  // console.log(tableData.value)
  const response2 = await getMoviesTable("")
  caseMovieList.value = response2.map(item => {
    return {
      value: item.id,
      label: item.name
    }
  })
})
</script>

<template>
  <div style="width: 95%; height: 100%; margin: 0 auto;" >
    <div class="topBox">
      <div id="search">
        <span style="margin-right: 20px; font-weight: bold" v-if="isAdmin">搜索影厅</span>
        <el-input v-model="searchInput" style="width: 280px" placeholder="搜索影院名称关键词" v-if="isAdmin"/>
        <el-button
          v-if="isAdmin"
          style="border-radius: 0; border: 0; background-color: #3e77ec; color: white"
          @click="toSearch"
        >搜索</el-button>
        <span style="color: #B1B1B1; font-size: 14px; font-weight: bold; margin-left: 20px" v-if="isAdmin">根据搜索影院以获取影厅信息</span>
        <span style="color: #B1B1B1; font-size: 14px; font-weight: bold; margin-left: 20px" v-if="!isAdmin">仅有本影院的影厅</span>
      </div>
      <el-button
        style="border-radius: 0; border: 0; background-color: #3e77ec; color: white"
        @click="showAdd"
      >创建影厅信息</el-button>
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
      <el-table-column prop="roomName" label="影厅名称" />
      <el-table-column prop="address" label="影院地址" />
      <el-table-column prop="roomType" label="影厅类型" >
        <template #default="row">
          {{
            row.row.roomType === 'small' ? '小型影厅' :
            row.row.roomType === 'medium' ? '中型影厅' :
            row.row.roomType === 'large' ? '大型影厅' :
            row.row.roomType === 'super' ? '超大型影厅' : ''
          }}
        </template>
      </el-table-column>
      <el-table-column prop="fare" label="影厅定价￥" width="100" />
      <el-table-column label="排场" width="100" >
        <template #default="row">
          <el-button size="small" @click="onCase(row)" color="#3e77ec">
            管理排场
          </el-button>
        </template>
      </el-table-column>
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
    v-show="isFrame"
  >
    <div style="display: flex; height: 100%; width: 100%; justify-content: space-between">
      <div style="width: 48%">
        <el-form
          label-width="auto"
          label-position="left"
          style="font-weight: bold"
          :model="formData"
          :rules="rulesData"
          ref="formRef"
        >
          <el-form-item label="影院名称" prop="cinemaName">
            <el-select
              v-model="formData.cinemaName"
              placeholder="选择影院"
              style="width: 100%; font-weight: normal"
              :disabled="isFormEdit"
            >
              <el-option
                v-for="item in cinemaList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="影厅名称" prop="roomName">
            <el-input :disabled="isFormEdit" v-model="formData.roomName" placeholder="输入影厅名称"></el-input>
          </el-form-item>
          <el-form-item label="影厅类型" prop="roomType">
            <el-select
              v-model="formData.roomType"
              placeholder="选择影院"
              style="width: 100%; font-weight: normal"
              :disabled="isFormEdit"
              @change="createWidth"
            >
              <el-option
                v-for="item in roomTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="影厅定价" prop="roomFare">
            <el-input-number :disabled="isFormEdit" v-model="formData.roomFare" :min="1" :max="200" />
            <span style="font-weight: normal; margin-left: 10px">元</span>
          </el-form-item>
        </el-form>
      </div>
      <div style="width: 48%">
        <div style="font-weight: bold; color: #5a5a5a;">影厅规格预览</div>
        <div class="previewBox">
          <div class="screen">大银幕</div>
          <div class="placeBox">
            <div style="display: flex; align-items: center; justify-content: center;" v-for="index in itemHeight" :key="index">
              <div v-for="index in itemWidth" :key="index" class="insideBox"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  <FrameCard
    :frameTitle="frameTitle"
    :closeModal="closeModal"
    :on-save="onCaseSave"
    :second-title="secondTitle"
    v-show="isShowCase"
  >
    <div class="topBox">
      <div id="search">
        <span style="margin-right: 20px; font-size: 14px">排场名称</span>
        <el-input v-model="caseName" style="width: 180px; margin-right: 20px" placeholder="输入排场名称" />
        <span style="margin-right: 20px; font-size: 14px">选择电影</span>
        <el-select
          v-model="caseMovieName"
          placeholder="选择电影"
          style="width: 180px"
        >
          <el-option
            v-for="item in caseMovieList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span style="margin-right: 20px; margin-left: 20px; font-size: 14px">选择放映时间</span>
        <el-date-picker
          v-model="caseShowTime"
          type="datetime"
          placeholder="选择放映时间"
        />
        <el-button
          style="border: 0; background-color: #3e77ec; color: white; margin-left: 20px"
          @click="addCase"
        >添加排场</el-button>
      </div>
    </div>
    <div>
      <el-table
        :data="tableCaseData"
        border
        stripe
        height="300"
        style="width: 100%; text-align: center"
        :cell-style="{'text-align':'center'}"
        :header-cell-style="{'text-align':'center', 'background-color':'#dfdfdf', 'color':'#151515'}"
      >
        <el-table-column prop="id" label="序号" width="55" />
        <el-table-column prop="showcaseName" label="排场名称" />
        <el-table-column prop="movieName" label="电影名称" />
        <el-table-column prop="roomName" label="影厅名称" />
        <el-table-column prop="showTime" label="放映时间" />
        <el-table-column prop="price" label="影厅定价￥" width="100" />
        <el-table-column label="操作" width="135">
          <template #default="row">
            <el-button size="small" @click="onCaseDelete(row)" color="red">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </FrameCard>
  <el-dialog
    v-model="isCaseSaveDialog"
    width="400"
  >
    <div style="display: flex; align-items: center; justify-content: start;">
      <span style="margin-right: 15px; color: #3e77ec"><el-icon size="22"><WarningFilled /></el-icon></span>
      <span style="color: black; font-size: 14px; font-weight: bold">确定要保存排场设置吗？</span>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isCaseSaveDialog = false">取消</el-button>
        <el-button style="background-color: #3e77ec; color: white" @click="toCaseSave">
          确认保存
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="isCaseAddDialog"
    width="400"
  >
    <div style="display: flex; align-items: center; justify-content: start;">
      <span style="margin-right: 15px; color: #3e77ec"><el-icon size="22"><WarningFilled /></el-icon></span>
      <span style="color: black; font-size: 14px; font-weight: bold">确定要添加该排场信息吗？</span>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isCaseAddDialog = false">取消</el-button>
        <el-button style="background-color: #3e77ec; color: white" @click="showAddCase">
          确认保存
        </el-button>
      </div>
    </template>
  </el-dialog>
  <el-dialog
    v-model="isCaseDeleteDialog"
    width="400"
  >
    <div style="display: flex; align-items: center; justify-content: start;">
      <span style="margin-right: 15px; color: #ff0000"><el-icon size="22"><WarningFilled /></el-icon></span>
      <span style="color: black; font-size: 14px; font-weight: bold">确定要删除该排场信息吗？</span>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isCaseDeleteDialog = false">取消</el-button>
        <el-button style="background-color: #ff0000; color: white" @click="toDeleteCase">
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
.previewBox {
  margin-top: 20px;
  aspect-ratio: 1 / 1;
  width: 100%;
  border: rgba(177, 177, 177, 0.71) 1px solid;
  border-radius: 6px;
}
.screen {
  width: 150px;
  margin: 10px auto;
  text-align: center;
  line-height: 25px;
  border-top: #B1B1B1 1px solid;
  box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, 0.5);
  font-size: 14px;
}
.placeBox {
  width: 100%;
  margin-top: 20px;
}
.insideBox {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: rgba(177, 177, 177, 0.71) 1px solid;
  margin: 2px;
}
</style>

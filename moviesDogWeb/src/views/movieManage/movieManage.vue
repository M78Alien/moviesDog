<script setup>
import { ref, reactive } from "vue";
import FrameCard from "@/components/frameCard.vue"
import { Plus, WarningFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import { baseURL } from '@/utils/request.js'
import {addMovie, deleteMovie, getMoviesTable, updateMovie} from "@/apis/movie.js";
import { onMounted } from 'vue';

// 验证登录身份
const isAdmin = ref(false)
// 上传地址
const uploadURL = baseURL + '/upload'
// 评分
const rateData = ref(4)
// 选择ID
const getID = ref(0)
// 表单窗口显示
const isFrame = ref(false)
// 窗口标题
const frameTitle = ref('卡片标题')
// 搜索输入框内容
const searchInput = ref()
// 保存对话框窗口
const isSaveDialog = ref(false)
// 删除对话框窗口
const isDeleteDialog = ref(false)
// 存储当前预览图片的 URL
const dialogImageUrl = ref('');
// 控制图片预览对话框的显示与隐藏
const dialogVisible = ref(false);
// 用于控制某些操作是否禁用
// const disabled = ref(false);
// 存储已上传文件的数组
const uploadedFiles = ref([]);
// 获取 el-upload 组件的引用
const uploadRef = ref(null);
// 电影类型列表
const movieTypeList = [
  {
    value: "Comedy",
    label: "喜剧"
  },
  {
    value: "Romance",
    label: "爱情"
  },
  {
    value: "Action",
    label: "动作"
  },
  {
    value: "Science_Fiction",
    label: "科幻"
  },
  {
    value: "Animation",
    label: "动画"
  },
  {
    value: "Mystery",
    label: "悬疑"
  },
  {
    value: "Crime",
    label: "犯罪"
  },
  {
    value: "adventure",
    label: "冒险"
  },
  {
    value: "Horror",
    label: "恐怖"
  },
  {
    value: "War",
    label: "战争"
  },
  {
    value: "Martial_Arts",
    label: "武侠"
  },
  {
    value: "Disaster",
    label: "灾难"
  },
  {
    value: "Youth",
    label: "青春"
  },
  {
    value: "Family",
    label: "家庭"
  },
  {
    value: "Plot",
    label: "剧情"
  },
  {
    value: "3D",
    label: "3D"
  },
  {
    value: "IMAX",
    label: "IMAX"
  },
  {
    value: "Dolby",
    label: "杜比影院"
  }
]
// 电影语言类型列表
const languageList = [
  {
    value: "Mandarin",
    label: "国语"
  },
  {
    value: "Cantonese",
    label: "粤语"
  },
  {
    value: "English",
    label: "英语"
  },
  {
    value: "Japanese",
    label: "日语"
  },
  {
    value: "Korean",
    label: "韩语"
  },
  {
    value: "Russian",
    label: "俄语"
  },
  {
    value: "other",
    label: "其他"
  }
]
// 制片国家列表
const countryList = [
  {
    value: 'China',
    label: '中国'
  },
  {
    value: 'EuUSA',
    label: '欧美'
  },
  {
    value: 'Japan',
    label: '日本'
  },
  {
    value: 'Korean',
    label: '韩国'
  },
  {
    value: 'other',
    label: '其他'
  }
]
// 输入框是否可用
const isFormEdit = ref(false)
// 是否可以添加海报
const isPicEdit = ref(false)

// 表格数据
const tableData = ref([])
// 表单组件
const formRef = ref(null);
// 表单数据
let formData = reactive({
  movieName: '',
  EnName: '',
  director: '',
  Scriptwriter: '',
  actor: '',
  movieType: '',
  language: '',
  country: '',
  releaseDate: '',
  timeLength: '',
  videoUrl: '',
  synopsis: ''
})
// 表单校验规则
const rulesData = reactive({
  movieName: [
    { required: true, message: '电影名称不能为空', trigger: 'blur' },
  ],
  EnName: [
    { required: true, message: '外文名称不能为空', trigger: 'blur' },
  ],
  director: [
    { required: true, message: '导演姓名不能为空', trigger: 'blur' },
  ],
  Scriptwriter: [
    { required: true, message: '编剧姓名不能为空', trigger: 'blur' },
  ],
  actor: [
    { required: true, message: '主演姓名不能为空', trigger: 'blur' },
  ],
  movieType: [
    { required: true, message: '电影类型不能为空', trigger: 'blur' },
  ],
  language: [
    { required: true, message: '语言类型不能为空', trigger: 'blur' },
  ],
  country: [
    { required: true, message: '制片国家不能为空', trigger: 'blur' },
  ],
  releaseDate: [
    { required: true, message: '上映时间不能为空', trigger: 'blur' },
  ],
  timeLength: [],
  videoUrl: [],
  synopsis: [
    { required: true, message: '电影简介不能为空', trigger: 'blur' },
  ]
})

// 详情点击事件
const showDetails = (row) => {
  console.log('Show Details:', row.row.movieName)
  frameTitle.value = '电影信息详情'
  rateData.value = row.row.score / 2

  formData.movieName = row.row.movieName
  formData.EnName = row.row.EnName
  formData.director = row.row.director
  formData.Scriptwriter = row.row.Scriptwriter
  formData.actor = row.row.actor
  formData.movieType = row.row.type
  formData.language = row.row.language
  formData.country = row.row.country
  formData.releaseDate = row.row.releaseDate
  formData.timeLength = row.row.lengthTime
  formData.videoUrl = row.row.previewUrl
  formData.synopsis = row.row.synopsis

  // console.log(formData)
  isFrame.value = true
  isFormEdit.value = true
  isPicEdit.value = false
}
// 编辑点击事件
const showEdit = (row) => {
  console.log('Show Edit:', row.row.movieName)
  frameTitle.value = '编辑电影信息'
  getID.value = row.row.index
  console.log(getID.value)
  formData.movieName = row.row.movieName
  formData.EnName = row.row.EnName
  formData.director = row.row.director
  formData.Scriptwriter = row.row.Scriptwriter
  formData.actor = row.row.actor
  formData.movieType = row.row.type
  formData.language = row.row.language
  formData.country = row.row.country
  formData.releaseDate = row.row.releaseDate
  formData.timeLength = row.row.lengthTime
  formData.videoUrl = row.row.previewUrl
  formData.synopsis = row.row.synopsis
  isFrame.value = true
  isFormEdit.value = false
  isPicEdit.value = false
}
// 搜索点击事件
const toSearch = async () => {
  console.log('To Search:', searchInput.value)
  const response = await getMoviesTable(searchInput.value)
  converseResponse(response)
}
// 导入点击事件
const showAdd = () => {
  console.log('addMovie')
  frameTitle.value = '导入电影信息'
  isFrame.value = true
  isFormEdit.value = false
  isPicEdit.value = true
  uploadedFiles.value = []
  uploadRef.value?.clearFiles()
  formData.movieName = ''
  formData.EnName = ''
  formData.director = ''
  formData.Scriptwriter = ''
  formData.actor = ''
  formData.movieType = ''
  formData.language = ''
  formData.country = ''
  formData.releaseDate = ''
  formData.timeLength = ''
  formData.videoUrl = ''
  formData.synopsis = ''
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
      if (uploadedFiles.value.length <= 0 && isPicEdit.value) {
        ElMessage({
          message: '电影海报未上传',
          type: 'error'
        });
      } else {
        console.log('saveMovie')
        isSaveDialog.value = true
      }
    } else {
      // ElMessage({
      //   message: '注册信息内容填写错误',
      //   type: 'error'
      // });
    }
  })

}
// 删除点击事件
const onDelete = () => {
  console.log('deleteMovie')
  isDeleteDialog.value = true
}
// 确认保存
const toSave = async () => {
  console.log('确认保存')
  let response = null
  if (getID.value === 0) {
    response = await addMovie({
      "name": formData.movieName,
      "enName": formData.EnName,
      "director": formData.director,
      "scriptwriter": formData.Scriptwriter,
      "actor": formData.actor,
      "type": formData.movieType.toString(),
      "language": formData.language,
      "country": formData.country,
      "releaseTime": formData.releaseDate,
      "lengthTime": formData.timeLength,
      "previewUrl": formData.videoUrl,
      "pictureList": uploadedFiles.value.toString(),
      "synopsis": formData.synopsis,
      "sales": 0,
      "rate": 0,
      "comment": 0,
      "count": 0,
      "isOpen": 1,
      "isDelete": 0
    })
  } else {
    response = await updateMovie({
      "id": getID.value,
      "name": formData.movieName,
      "enName": formData.EnName,
      "director": formData.director,
      "scriptwriter": formData.Scriptwriter,
      "actor": formData.actor,
      "type": formData.movieType.toString(),
      "language": formData.language,
      "country": formData.country,
      "releaseTime": formData.releaseDate,
      "lengthTime": formData.timeLength,
      "previewUrl": formData.videoUrl,
      "pictureList": uploadedFiles.value.toString(),
      "synopsis": formData.synopsis,
      "sales": 0,
      "rate": 0,
      "comment": 0,
      "count": 0,
      "isOpen": 1,
      "isDelete": 0
    })
  }
  console.log(response)
  const response1 = await getMoviesTable()
  converseResponse(response1)
  if (response.success) {
    ElMessage({
      message: '电影信息已保存',
      type: 'success'
    })
    isSaveDialog.value = false
    isFrame.value = false
    getID.value = 0
  } else {
    ElMessage({
      message: '电影信息保存失败',
      type: 'error'
    })
    isSaveDialog.value = false
  }
}
// 确认删除
const toDelete = async () => {
  console.log('确认保存')
  isDeleteDialog.value = false
  const response = await deleteMovie(getID.value)
  if (response.success) {
    ElMessage({
      message: '电影信息已删除',
      type: 'success'
    })
    isFrame.value = false
    getID.value = 0
  } else {
    ElMessage({
      message: '电影信息删除失败',
      type: 'error'
    })
  }
  console.log(response)
  const response1 = await getMoviesTable()
  converseResponse(response1)
}
// 上传成功回调
const uploadSuccess = (response) => {
  // this.$message.success('上传成功！');
  ElMessage({
    message: "上传成功",
    type: 'success',
  })
  console.log('文件访问URL：', response); // 假设后端返回文件URL
  uploadedFiles.value.push(response);
  console.log(uploadedFiles.value)
}
// 上传失败回调
const uploadError = (response) => {
  ElMessage({
    message: "上传失败",
    type: 'error',
  })
  console.log('失败:', response);
}

// 日期转换
const convertToBeijingTime = (utcTimeString) => {
  // 解析UTC时间字符串
  const date = new Date(utcTimeString);

  // 加上8小时得到北京时间
  const beijingTime = new Date(date.getTime() + (8 * 60 * 60 * 1000));

  // 提取年、月、日
  const year = beijingTime.getFullYear();
  const month = String(beijingTime.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要加1
  const day = String(beijingTime.getDate()).padStart(2, '0');

  // 返回格式化后的北京时间
  return `${year}-${month}-${day}`;
}
// tableData转换
const converseResponse = (response) => {
  tableData.value = response.map(item => {
    return {
      "index": item.id,
      "movieName": item.name,
      "EnName": item.enName,
      "director": item.director,
      "Scriptwriter": item.scriptwriter,
      "actor": item.actor,
      "type": item.type.split(","),
      "language": item.language,
      "country": item.country,
      "releaseDate": convertToBeijingTime(item.releaseTime),
      "lengthTime": item.lengthTime,
      "previewUrl": item.previewUrl,
      "pictureList": item.pictureList,
      "synopsis": item.synopsis,
      "sale": item.sales < 10000 ? item.sales :
        item.sales < 10000000 ? item.sales/10000 + '万' :
          item.sales < 100000000 ? item.sales/10000000 + '千万' :
            item.sales/100000000 + '亿',
      "score": item.rate.toFixed(1),
      "comment": item.comment,
      "count": item.count,
      "status": item.isOpen === 0 ? '未开业' : '已开业',
      "isDelete": item.isDelete}; // 创建新对象并替换属性名
  });
}

// 打开页面执行
onMounted(async () => {
  const response = await getMoviesTable()
  // console.log(response)
  converseResponse(response)
  const isLoggedIn = JSON.parse(localStorage.getItem('adminKey'));
  if (isLoggedIn.name === 'admin') {
    isAdmin.value = true
  }
})
</script>

<template>
  <div style="width: 95%; height: 100%; margin: 0 auto;" v-if="isAdmin" >
    <div class="topBox">
      <div id="search">
        <span style="margin-right: 20px; font-weight: bold">搜索电影</span>
        <el-input v-model="searchInput" style="width: 280px" placeholder="搜索电影名称关键词" />
        <el-button
          style="border-radius: 0; border: 0; background-color: #3e77ec; color: white"
          @click="toSearch"
        >搜索</el-button>
      </div>
      <el-button
        style="border-radius: 0; border: 0; background-color: #3e77ec; color: white"
        @click="showAdd"
      >导入电影信息</el-button>
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
      <el-table-column prop="index" label="ID" width="55" />
      <el-table-column prop="movieName" label="电影名称" width="150" />
      <el-table-column prop="EnName" label="外文名称" />
      <el-table-column prop="director" label="导演" />
      <el-table-column prop="actor" label="演员" />
      <el-table-column prop="releaseDate" label="上映时间" />
      <el-table-column prop="sale" label="票房" />
      <el-table-column prop="score" label="评分" />
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
  <div class="shieldLayer" style="width: 95%; height: 100%; margin: 0 auto;" v-if="!isAdmin">
    当前管理员没有管理权限
  </div>
  <FrameCard
    :frameTitle="frameTitle"
    :rateData="rateData"
    :closeModal="closeModal"
    :on-save="onSave"
    :on-delete="onDelete"
    v-show="isFrame"
  >
    <div>
      <el-form
        label-width="auto"
        label-position="left"
        style="font-weight: bold; display: flex; justify-content: space-between;"
        :model="formData"
        :rules="rulesData"
        ref="formRef"
      >
        <div style="width: 46%; height: 100%">
          <el-form-item label="电影名称" prop="movieName">
            <el-input :disabled="isFormEdit" v-model="formData.movieName" placeholder="输入电影名称"></el-input>
          </el-form-item>
          <el-form-item label="外文名称" prop="EnName">
            <el-input :disabled="isFormEdit" v-model="formData.EnName" placeholder="输入电影外文名称"></el-input>
          </el-form-item>
          <el-form-item label="导演" prop="director">
            <el-input :disabled="isFormEdit" v-model="formData.director" placeholder="输入导演姓名"></el-input>
          </el-form-item>
          <el-form-item label="编剧" prop="Scriptwriter">
            <el-input :disabled="isFormEdit" v-model="formData.Scriptwriter" placeholder="输入编剧姓名"></el-input>
          </el-form-item>
          <el-form-item label="主演" prop="actor">
            <el-input :disabled="isFormEdit" v-model="formData.actor" placeholder="输入主演姓名"></el-input>
          </el-form-item>
          <el-form-item label="电影类型" prop="movieType">
            <el-select
              v-model="formData.movieType"
              placeholder="选择电影类型"
              style="width: 100%; font-weight: normal"
              multiple
              :disabled="isFormEdit"
            >
              <el-option
                v-for="item in movieTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="语言" prop="language">
            <el-select
              v-model="formData.language"
              placeholder="选择语言"
              style="width: 100%; font-weight: normal"
              :disabled="isFormEdit"
            >
              <el-option
                v-for="item in languageList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="制片国家" prop="country">
            <el-select
              v-model="formData.country"
              placeholder="选择制片国家名称"
              style="width: 100%; font-weight: normal"
              :disabled="isFormEdit"
            >
              <el-option
                v-for="item in countryList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="上映时间" prop="releaseDate">
            <el-date-picker
              v-model="formData.releaseDate"
              type="date"
              placeholder="选择上映时间"
              style="width: 100%"
              :disabled="isFormEdit"
            />
          </el-form-item>
          <el-form-item label="片长" prop="timeLength">
            <el-input-number :disabled="isFormEdit" v-model="formData.timeLength" :min="1" :max="500" />
            <span style="font-weight: normal; margin-left: 10px">分钟</span>
          </el-form-item>
          <el-form-item label="预告片链接" prop="videoUrl">
            <el-input :disabled="isFormEdit" v-model="formData.videoUrl" placeholder="输入预告片链接"></el-input>
          </el-form-item>
        </div>
        <div style="width: 50%">
          <div style="margin-bottom: 10px;" v-if="!isFormEdit && isPicEdit">
            <span style="color: #5a5a5a; margin-right: 10px"><span style="color: red">* </span>电影海报</span>
            <div style="color: rgba(90,90,90,0.53); font-size: 12px; margin-top: 4px">最多上传5张，图片大小不超过1M，第一张需为竖版海报，第二张需为横版海报</div>
          </div>
          <div v-if="!isFormEdit && isPicEdit">
            <el-upload
              :action="uploadURL"
              ref="uploadRef"
              list-type="picture-card"
              :limit="5"
              :on-success="uploadSuccess"
              :on-error="uploadError"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img :src="dialogImageUrl" alt="Preview Image" style="width: 100%;" />
            </el-dialog>
          </div>
          <div style="margin-bottom: 10px; margin-top: 7px; color: #5a5a5a"><span style="color: red">* </span>电影简介</div>
          <div style="color: rgba(90,90,90,0.53); font-size: 12px; text-align: end;">{{ formData.synopsis.length }} / 230</div>
          <el-form-item prop="synopsis">
            <el-input
              v-model="formData.synopsis"
              style="width: 100%"
              :rows="4"
              maxlength="230"
              type="textarea"
              placeholder="输入电影简介"
              :disabled="isFormEdit"
            />
          </el-form-item>
        </div>
      </el-form>
    </div>
  </FrameCard>
  <el-dialog
    v-model="isSaveDialog"
    width="400"
  >
    <div style="display: flex; align-items: center; justify-content: start;">
      <span style="margin-right: 15px; color: #3e77ec"><el-icon size="22"><WarningFilled /></el-icon></span>
      <span style="color: black; font-size: 14px; font-weight: bold">确定要保存该电影信息吗？</span>
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
      <span style="color: black; font-size: 14px; font-weight: bold">确定要删除该电影信息吗？</span>
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
.shieldLayer {
  background-color: #f4f4f4;
  font-size: 24px;
  text-align: center;
  font-weight: bold;
}
.topBox {
  width: 100%;
  height: 10%;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.uploaded-images-preview {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}
.uploaded-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 5px;
  cursor: pointer;
}
</style>

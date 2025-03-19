<script setup>
import { ref, onUpdated } from 'vue'

const props = defineProps({
  frameTitle: {
    type: String,
    required: true,
  },
  secondTitle: {
    type: String,
    required: false,
    default: ''
  },
  rateData: {
    type: Number,
    required: false,
    default: -1
  },
  closeModal: {
    type: Function,
    required: true
  },
  onSave: {
    type: Function,
    required: false,
    default: null
  },
  onDelete: {
    type: Function,
    required: false,
    default: null
  },
  showStatus: {
    type: String,
    required: false,
    default: ''
  },
  turnStatus: {
    type: Function,
    required: false,
    default: null
  }
})
const rRateDate = ref(null)
const save = ref(null)
const dDelete = ref(null)

onUpdated(() => {
  console.log(props.frameTitle)
  if (props.frameTitle === '电影信息详情') {
    save.value = false
    dDelete.value = false
    rRateDate.value = props.rateData
  } else if (props.frameTitle === '编辑电影信息' || props.frameTitle === '编辑影院信息' || props.frameTitle === '编辑影厅信息') {
    save.value = props.onSave
    dDelete.value = props.onDelete
    rRateDate.value = null
  } else if (props.frameTitle === '导入电影信息' || props.frameTitle === '创建影院信息' || props.frameTitle === '创建影厅信息' || props.frameTitle === '管理影厅排场') {
    save.value = props.onSave
    dDelete.value = false
    rRateDate.value = null
  } else if (props.frameTitle === '影院信息详情' || props.frameTitle === '影厅信息详情') {
    save.value = false
    dDelete.value = false
  }
})
</script>

<template>
  <div class="frameBox">
    <div style="margin: 2%; width: 96%; height: 94%; ">
      <div class="cardTop">
        <div>
          <span style="font-weight: bold; font-size: 22px">{{ props.frameTitle }}</span>
          <span style="font-size: 14px; color: #B1B1B1; margin-left: 10px">{{ props.secondTitle }}</span>
        </div>

        <div style="display: flex; align-items: center">
          <div style="font-size: 16px; margin-right: 20px" v-show="showStatus">营业状态：{{ props.showStatus }}</div>
          <div style="font-size: 16px" v-show="rRateDate">评分：</div>
          <el-rate v-model="rRateDate" allow-half disabled style="margin-right: 10px" v-show="rRateDate"/>
          <span style="margin-right: 20px; font-weight: bold" v-show="rRateDate">{{ rRateDate*2 }}</span>
          <el-button type="info" @click="turnStatus" v-if="showStatus.includes('营') && dDelete">{{ showStatus==='经营中' ? '停业' : '开业' }}</el-button>
          <el-button color="#3E77EC" v-if="save" @click="save">保存</el-button>
          <el-button color="#FF0000" v-if="dDelete" @click="dDelete">删除</el-button>
          <el-button type="info" @click="closeModal">关闭</el-button>
        </div>
      </div>
      <div style="margin-top: 15px">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.frameBox {
  width: 60vw;
  height: 70vh;
  background-color: white;
  box-shadow: 2px 5px 10px 0 rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  border: rgba(177, 177, 177, 0.47) 1px solid;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 98;
}
.cardTop {
  width: 100%;
  height: 8%;
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: rgba(177, 177, 177, 0.47) 1px solid;
}
</style>

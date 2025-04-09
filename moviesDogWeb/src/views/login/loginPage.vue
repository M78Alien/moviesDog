<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/dist/index.css'
import { useRouter } from "vue-router";
import {login, register} from "@/apis/login.js";

let isRegister = ref(false)
const router = useRouter()

// 管理员
const admin = {
  phoneNumber: '15820871626',
  password: 'zys666666'
}
const validatePhone = (rule, value, callback) => {
  const reg = /^1[3-9]\d{9}$/;
  if (!reg.test(value)) {
    callback(new Error('请输入正确的手机号'));
  } else {
    callback();
  }
};

const formRegister = reactive({
  phoneNumber: '',
  password: '',
  cinemaName: '',
  cinemaAddress: ''
})
const rulesRegister = reactive({
  phoneNumber: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6-20个字符之间', trigger: 'blur' },
  ],
  cinemaName: [
    { required: true, message: '影院名称不能为空', trigger: 'blur' },
  ],
  cinemaAddress: [
    { required: true, message: '影院地址不能为空', trigger: 'blur' },
  ]
})

const formLogin = reactive({
  phoneNumber: '',
  password: '',
})
const rulesLogin = reactive({
  phoneNumber: [
    { required: true, message: '手机号不能为空', trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在6-20个字符之间', trigger: 'blur' },
  ]
})

const toRegister = () => {
  isRegister.value = !isRegister.value
  formRegister.phoneNumber = ''
  formRegister.password = ''
  formRegister.cinemaName = ''
  formRegister.cinemaAddress = ''
}

const formRef = ref(null)
const formRef2 = ref(null)
const onRegister = () => {
  formRef?.value.validate(async (valid) => {
    console.log(valid)
    if (valid) {
      const response = await register({
        "name": formRegister.cinemaName,
        "address": formRegister.cinemaAddress,
        "concactNumber": formRegister.phoneNumber,
        "phoneNumber": formRegister.phoneNumber,
        "password": formRegister.password,
        "isDelete": false,
        "isOpen": true,
      })
      if(response.success) {
        ElMessage({
          message: '注册成功',
          type: 'success',
        })
        toRegister()
      } else {
        console.log(response.message)
        ElMessage({
          message: response.message,
          type: 'error',
        })
      }
      // if (response.success) {
      //
      // }
    } else {
      ElMessage({
        message: '注册信息内容填写错误',
        type: 'error'
      });
    }
  })
}
const onLogin = () => {
  formRef2?.value.validate(async (valid) => {
    console.log(valid)
    console.log(formLogin)

    if (valid) {
      if (formLogin.phoneNumber === admin.phoneNumber && formLogin.password === admin.password) {
        ElMessage({
          message: "超级管理员登录成功",
          type: 'success',
        })
        localStorage.setItem('adminKey', JSON.stringify({ name: 'admin', phoneNumber: admin.phoneNumber }));
        router.push('/')
      } else {
        const response = await login({
          "phoneNumber": formLogin.phoneNumber,
          "password": formLogin.password,
        })
        // console.log(response)
        if (response.success) {
          ElMessage({
            message: "登录成功",
            type: 'success',
          })
          localStorage.setItem('adminKey', JSON.stringify({ name: response.data.name, phoneNumber: response.data.phoneNumber }));
          router.push('/')
        } else {
          ElMessage({
            message: response.message,
            type: 'error',
          })
        }
      }
    } else {
      ElMessage({
        message: '手机号或密码有误',
        type: 'error'
      });
    }
  })
}
</script>

<template>
  <div class="background"></div>
  <!--    登录页组件-->
  <el-row class="centerBox" v-show="!isRegister">
    <el-col :span="12" class="leftBox">
      <img src="@/assets/transparentLogo.png" alt="logo" class="logo" />
      <div class="title">影趣购电影票务平台</div>
    </el-col>
    <el-col :span="12" class="insideBox" style="padding: 5vh 4vh;">
      <div class="textTop">欢迎登录</div>
      <el-form
        label-width="auto"
        label-position="left"
        style="font-weight: bold"
        :model="formLogin"
        :rules="rulesLogin"
        ref="formRef2"
      >
        <el-form-item label="注册手机号" style="margin-bottom: 3vh" prop="phoneNumber">
          <el-input placeholder="请输入登录手机号" v-model="formLogin.phoneNumber" @keyup.enter="onLogin"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" style="margin-bottom: 3vh" prop="password">
          <el-input placeholder="请输入登录密码" v-model="formLogin.password" show-password @keyup.enter="onLogin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            color="#3e77ec"
            round
            style="width: 100%; height: 4vh; margin-top: 1vh"
            @click="onLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <el-button
        class="toRegister"
        @click="toRegister"
        size="small"
        style="padding: 0"
        text
      >
        注册影院管理员账号
      </el-button>
    </el-col>
  </el-row>

  <!--  注册页组件-->
  <el-row class="centerBox" style="background-color: white" v-show="isRegister">
    <div class="insideBox"
         style="border-radius: 10px; width: 100%; display: flex; flex-direction: column; align-items: center;">
      <div style="display: flex; align-items: flex-end; width: 100%">
        <div class="textTop" style="margin-bottom: 0">注册影院管理员</div>
        <div class="tipsText">每个影院只能有一个管理员账号，注册管理员即注册影院</div>
      </div>
      <el-divider />
      <el-form
        class="regInputBox"
        label-width="auto"
        label-position="left"
        style="font-weight: bold"
        :model="formRegister"
        :rules="rulesRegister"
        ref="formRef"
      >
        <el-form-item label="注册手机号" style="margin-bottom: 3vh" prop="phoneNumber">
          <el-input placeholder="请输入登录手机号" v-model="formRegister.phoneNumber" @keyup.enter="onRegister"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" style="margin-bottom: 3vh" prop="password">
          <el-input placeholder="请输入登录密码" v-model="formRegister.password" show-password @keyup.enter="onRegister"></el-input>
        </el-form-item>
        <el-form-item label="影院名称" style="margin-bottom: 3vh" prop="cinemaName">
          <el-input placeholder="请输入影院名称" v-model="formRegister.cinemaName" @keyup.enter="onRegister"></el-input>
        </el-form-item>
        <el-form-item label="影院地址" style="margin-bottom: 3vh" prop="cinemaAddress">
          <el-input placeholder="请输入影院地址"  v-model="formRegister.cinemaAddress" @keyup.enter="onRegister"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            color="#3e77ec"
            round
            style="width: 100%; height: 4vh; margin-top: 1vh"
            @click="onRegister"
          >
            注册
          </el-button>
          <el-button
            type="info"
            round
            style="width: 100%; height: 4vh; margin-top: 2vh; margin-left: 0"
            @click="toRegister"
          >
            返回
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-row>
</template>

<style scoped>
.background {
  background-image: url("@/assets/12.jpg");
  background-repeat: repeat-x;
  background-size: cover;
  width: 100%;
  height: 100vh;
}
.centerBox {
  width: 50vw;
  height: 60vh;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.85);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 2px 5px 10px 0 rgba(0, 0, 0, 0.5);
}
.leftBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 24px;
  font-weight: bold;
  margin-top: 30px;
}
.logo {
  width: 60%;
}
.insideBox {
  background-color: white;
  border-radius: 0 10px 10px 0;
  padding: 5vh 5vh;
}
.textTop {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 6vh;
}
.toRegister {
  font-size: 12px;
  float: right;
  color: #B1B1B1;
}
:deep(.el-input__wrapper) {
  border-radius: 25px;
}
.tipsText {
  color: #B1B1B1;
  font-size: 12px;
  margin-left: 10px;
  font-weight: bold;
}
.regInputBox {
  width: 70%;
  height: 100%;
  margin-top: 2vh;
}
</style>

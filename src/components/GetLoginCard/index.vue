<template>
  <div class="dowebok" id="dowebok" :class="{ rightPanelActive: isLogin == false }">
    <div class="form-container sign-up-container">
      <form action="#" @submit.prevent>
        <h1 style="font-size: 18px; margin-bottom: 10px">注册</h1>
        <span>请输入您的信息</span>
        <el-input v-model="registerUsername" placeholder="账号" style="margin: 20px" />
        <el-input v-model="registerPassword" type="password" placeholder="请输入密码" show-password />
        <el-input v-model="registerPasswordAll" type="password" placeholder="请确认密码" show-password
          style="margin: 20px" />
        <button @click="getRegister">注册</button>
      </form>
    </div>
    <div class="form-container sign-in-container">
      <form action="#" @submit.prevent>
        <div class="login-style">
          <h1>密码登录</h1>
          /
          <h1>手机验证码登录</h1>
        </div>
        <button style="position: absolute; top: 150px; right: 5px; padding: 5px" @click="getPhoneCode">
          获取验证码
        </button>
        <el-input v-model="loginUsername" placeholder="账号/手机号"
          style="margin: 20px 20px 20px 0; width: 200px"></el-input>
        <el-input v-model="loginPassword" type="password" placeholder="请输入密码/手机验证码" show-password
          style="width: 200px; margin: 0 20px 0 0" />
        <a href="###">忘记密码？</a>
        <button @click="pasLogin">登录</button>
        <button @click="phoneLogin" style="margin-top: 10px">手机号登录</button>
      </form>
    </div>
    <div class="overlay-container">
      <div class="overlay">
        <div class="overlay-panel overlay-left">
          <h1>已有帐号？</h1>
          <p>请使用您的帐号进行登录</p>
          <button class="ghost" id="signIn" @click="isLogin = true">登录</button>
        </div>
        <div class="overlay-panel overlay-right">
          <h1>没有帐号？</h1>
          <p>立即注册加入我们，和我们一起开始旅程吧</p>
          <button class="ghost" id="signUp" @click="isLogin = false">注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { reqRegisterUser, reqGetCode } from "@/api/module/user.js";
import { ElMessage, ElNotification } from "element-plus";
import useUserStore from "@/store/modules/user.js";
//自定义事件
let $emit = defineEmits(["loginChange"]);
let userStore = useUserStore();
let isLogin = ref(true);
//登录的input
let loginUsername = ref("");
let loginPassword = ref("");
//注册的input
let registerUsername = ref("");
let registerPassword = ref("");
let registerPasswordAll = ref("");
//注册按钮
const getRegister = async () => {
  //检验账号密码
  if (
    registerUsername.value.length === 0 ||
    registerPassword.value.length === 0 ||
    registerPasswordAll.value.length === 0
  ) {
    return ElNotification({
      title: "Error",
      message: "请按要求输入账号密码",
    });
  }
  if (registerPassword.value !== registerPasswordAll.value) {
    return ElNotification({
      title: "Error",
      message: "两次密码输入不一致,请检查",
    });
  }
  const data = {
    name: registerUsername.value,
    password: registerPassword.value,
  };
  let res = await reqRegisterUser(data);
  if (res.code != 1) {
    return ElNotification({
      title: "Error",
      message: "注册失败",
    });
  } else {
    loginUsername.value = res.data.userId;
    isLogin.value = true;
    return ElNotification({
      title: "Success",
      message: "注册成功/请登录",
    });
  }
};
//密码登录
const pasLogin = async () => {
  //检验账号密码
  if (loginUsername.value.length === 0 || loginPassword.value.length === 0) {
    return ElNotification({
      title: "Error",
      message: "请按要求输入账号密码",
    });
  }
  const data = {
    userId: loginUsername.value,
    password: loginPassword.value,
  };
  let res = userStore.pasLogin(data);
  //判断res是否成功
  res
    .then((result) => {
      console.log("成功");
      //成功后关闭登录框，自定义事件通知父组件
      //触发自定义事件
      $emit("loginChange");
    })
    .catch((error) => {
      console.log("失败");
    });
};
//手机号登录
const phoneLogin = async () => {
  const data = {
    tele: loginUsername.value,
    code: loginPassword.value,
  };
  if (loginUsername.value.length === 0 || loginPassword.value.length === 0) {
    return ElNotification({
      title: "Error",
      message: "请按要求输入手机号和验证码",
    });
  }
  let res = userStore.phoneLogin(data);
  //判断res是否成功
  res
    .then((result) => {
      console.log("成功");
      //成功后关闭登录框，自定义事件通知父组件
      //触发自定义事件
      $emit("loginChange");
    })
    .catch((error) => {
      console.log("失败");
    });
};
//或者手机验证码
const getPhoneCode = async () => {
  let ze = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
  if (!ze.test(loginUsername.value)) {
    return ElMessage({
      type: "error",
      message: "请输入正确的手机号",
    });
  }
  let res = await reqGetCode(loginUsername.value);
  if (res.code !== 1) {
    return ElMessage({
      type: "error",
      message: "获取验证码失败",
    });
  } else {
    loginPassword.value = res.data;
    return ElMessage({
      type: "success",
      message: "获取验证码成功",
    });
  }
};
</script>

<style lang="css" scoped>
p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}

span {
  font-size: 12px;
}

a {
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin: 15px 0;
}

.dowebok {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
}

.form-container form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}

.social-container a:hover {
  background-color: #eee;
}

.form-container input {
  background: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  outline: none;
}

.form-container .login-style {
  display: flex;
}

.form-container .login-style h1 {
  font-size: 18px;
}

button {
  border-radius: 20px;
  border: 1px solid lightseagreen;
  background: lightseagreen;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background: transparent;
  border-color: #fff;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.sign-up-container {
  left: 0;
  width: 50%;
  z-index: 1;
  opacity: 0;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.overlay {
  background: lightseagreen;
  background: linear-gradient(to right, lightseagreen, lightseagreen) no-repeat 0 0 / cover;
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateY(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  height: 100%;
  width: 50%;
  text-align: center;
  transform: translateY(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-right {
  right: 0;
  transform: translateY(0);
}

.overlay-left {
  transform: translateY(-20%);
}

/* Move signin to right */
.dowebok.rightPanelActive .sign-in-container {
  transform: translateY(100%);
}

/* Move overlay to left */
.dowebok.rightPanelActive .overlay-container {
  transform: translateX(-100%);
}

/* Bring signup over signin */
.dowebok.rightPanelActive .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
}

/* Move overlay back to right */
.dowebok.rightPanelActive .overlay {
  transform: translateX(50%);
}

/* Bring back the text to center */
.dowebok.rightPanelActive .overlay-left {
  transform: translateY(0);
}

/* Same effect for right */
.dowebok.rightPanelActive .overlay-right {
  transform: translateY(20%);
}
</style>

<template>
  <div class="box">
    <div class="head">
      <p class="one"></p>
      <p class="msg">个人信息</p>
    </div>
    <div class="form" v-if="userStore.userInfo.userId == $route.query.userId">
      <el-form :model="form" label-width="120px">
        <el-form-item label="昵称：" label-width="200px">
          <el-input v-model="form.name" style="width: 200px" :placeholder="userStore.userInfo.userName" />
        </el-form-item>
        <el-form-item label="电话：" label-width="200px">
          <el-input v-model="form.phone" style="width: 200px" :placeholder="userStore.userInfo.phone" />
        </el-form-item>
        <el-form-item label="个性签名：" label-width="200px">
          <el-input v-model="form.signature" type="textarea" style="width: 500px"
            :placeholder="userStore.userInfo.signature" />
        </el-form-item>
        <el-form-item label="性别：" label-width="200px">
          <el-radio-group v-model="form.sex">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日：" label-width="200px">
          <el-date-picker v-model="form.birthdate" type="date" placeholder="选择日期" clearable format="YYYY/MM/DD"
            value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="省份：" label-width="200px">
          <el-select v-model="form.province" placeholder="选择你的省份">
            <el-option :label="i.label" :value="i.label" v-for="(i, index) in chineseProvinces" />
          </el-select>
        </el-form-item>
        <el-form-item label-width="200px">
          <el-button type="primary" @click="onSubmit">修改资料</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="userinfo" v-else>
      <el-descriptions class="margin-top" title="个人信息" :column="3" :size="size" border>
        <template #extra>
          <el-button type="primary" @click="sendMessage">私信他</el-button>
        </template>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <user />
              </el-icon>
              昵称
            </div>
          </template>
          {{ userinfo.name }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <iphone />
              </el-icon>
              电话
            </div>
          </template>
          {{ userinfo.phone }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon :style="iconStyle">
                <office-building />
              </el-icon>
              Address
            </div>
          </template>
          {{ userinfo.province }}
        </el-descriptions-item>
        <el-descriptions-item label="个性签名">{{ userinfo.signature }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ userinfo.sex }}</el-descriptions-item>
        <el-descriptions-item label="生日">{{ userinfo.birthdate }}</el-descriptions-item>
      </el-descriptions>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import useUserStore from "@/store/modules/user.js";
import { reqUpdateUserInfo, reqGetUserInfo, reqCreateChannel } from "@/api/module/user.js";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from 'vue-router'
const userinfo = ref({})
const $router = useRouter()
const $route = useRoute()
const userStore = useUserStore();
const chineseProvinces = [
  {
    value: "beijing",
    label: "北京",
  },
  {
    value: "tianjin",
    label: "天津",
  },
  {
    value: "hebei",
    label: "河北",
  },
  {
    value: "shanxi",
    label: "山西",
  },
  {
    value: "neimenggu",
    label: "内蒙古",
  },
  {
    value: "liaoning",
    label: "辽宁",
  },
  {
    value: "jilin",
    label: "吉林",
  },
  {
    value: "heilongjiang",
    label: "黑龙江",
  },
  {
    value: "shanghai",
    label: "上海",
  },
  {
    value: "jiangsu",
    label: "江苏",
  },
];
const form = reactive({
  id: userStore.userInfo.id, //id
  name: userStore.userInfo.name, //name
  signature: userStore.userInfo.signature, //签名
  sex: userStore.userInfo.sex, //性别
  birthdate: userStore.userInfo.birthdate, //生日
  phone: userStore.userInfo.phone, //手机号
  province: userStore.userInfo.province, //省份
});

//修改资料
const onSubmit = async () => {
  let res = await reqUpdateUserInfo(form);

  if (res.code != 1) {
    return ElMessage({
      type: "error",
      message: "修改失败",
    });
  } else {
    //更新本地数据
    localStorage.setItem("userInfo", JSON.stringify(res.data));
    return ElMessage({
      type: "success",
      message: "修改成功",
    });
  }
};

//获取用户的信息
const getUserInfo = async () => {
  let res = await reqGetUserInfo($route.query.userId);
  if (res.code != 1) {
    return ElMessage({
      type: "error",
      message: "获取失败",
    });
  } else {
    //更新本地数据
    userinfo.value = res.data;
  }
};
//跳转到聊天页面
const sendMessage = async () => {
  //先创建聊天频道
  const data = {
    userIdA: userStore.userInfo.userId,
    userIdB: $route.query.userId,
  }
  const res = await reqCreateChannel(data)
  if (res.code == 1) {
    $router.push({
      path: "/friend/code",
      query: {
        userId: $route.query.userId,
      },
    });
  } else {
    ElMessage({
      type: "error",
      message: res.msg,
    })
  }

}
onMounted(() => {
  if ($route.query.userId !== userStore.userInfo.userId) {
    getUserInfo();
  }
});


</script>


<style lang="scss" scoped>
.box {
  width: 100%;
  margin: 0;
  display: block;

  .head {
    display: flex;
    padding: 10px 0 0 20px;
    width: 850px;
    height: 50px;
    border-bottom: 1px solid #ccc;

    .one {
      width: 4px;
      height: 20px;
      background-color: pink;
    }

    .msg {
      margin-left: 5px;
      line-height: 20px;
    }
  }

  .form {
    margin-top: 20px;
  }
}

.userinfo {
  width: 90%;
  margin: 20px auto;
}
</style>

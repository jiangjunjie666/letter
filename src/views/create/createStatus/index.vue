<template>
  <div>
    <div class="title">发布动态</div>
    <div class="form">
      <!-- <h1>1.标题</h1>
      <el-input v-model="title" placeholder="输入标题" /> -->
      <h1>1.标签</h1>
      <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false"
        @close="handleClose(tag)">
        {{ tag }}
      </el-tag>
      <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small"
        @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" style="width: 100px" />
      <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
        + New Tag
      </el-button>
      <h1>2.正文</h1>
      <el-input v-model="textarea" autosize type="textarea" placeholder="输入正文" />
      <h1>3.配图</h1>
      <el-upload v-model:file-list="fileList" :action="action" list-type="picture-card"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
      <el-button type="primary" style="margin: 10px 10px 0 0" @click="submitFrom">一键发布</el-button>
      <el-button style="margin: 10px 0 0 0" @click="reset">一键清空</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { reqDeleteImg } from "@/api/module/until.js";
import { reqCreateDynamic } from "@/api/module/create.js";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user.js";
const userStore = useUserStore();
let title = ref("");
let textarea = ref("");
const inputValue = ref("");
const inputVisible = ref(false);
const InputRef = ref(null);
const dynamicTags = ref(["动态"]);
//照片墙
const fileList = ref([]);
const imgList = ref([]);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
//上传图片的ip
const action = import.meta.env.VITE_SERVER + "/common/upload";
//取消某个tag
const handleClose = (tag) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
};
//添加tag
const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    //光标获取
    InputRef.value.focus();
  });
};
const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};
//上传图片成功的钩子
const handleSuccess = (response, uploadFile) => {
  if (response.code == 1) {
    imgList.value.push(response.data);
    ElMessage({
      type: "success",
      message: "图片上传成功",
    });
  } else {
    ElMessage({
      type: "error",
      message: "图片上传失败",
    });
  }
};
//删除照片
const handleRemove = async (uploadFile, uploadFiles) => {
  let res = await reqDeleteImg(uploadFile.response.data);
  if (res.code == 1) {
    return ElMessage({
      type: "success",
      message: "删除成功",
    });
  } else {
    return ElMessage({
      type: "error",
      message: "删除失败",
    });
  }
};
//上传图片
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url;
  dialogVisible.value = true;
};
//清空数据
const reset = () => {
  title.value = "";
  textarea.value = "";
  fileList.value = [];
  dynamicTags.value = [];
};

//发布

const submitFrom = async () => {
  let userTalksDTO = {
    userId: userStore.userInfo.userId,
    context: textarea.value,
    labels: dynamicTags.value,
    images: imgList.value,
  };
  let res = await reqCreateDynamic(userTalksDTO);
  if (res.code !== 1) {
    return ElMessage({
      type: "error",
      message: "发布失败",
    });
  } else {
    reset();
    ElMessage({
      type: "success",
      message: "发布成功",
    });
  }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}

.form {
  width: 700px;
  margin: 10px auto;

  h1 {
    font-size: 18px;
    margin: 10px 0;
    color: #999;
  }

  .mx-1 {
    margin-right: 5px;
  }
}
</style>

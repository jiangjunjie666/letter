<template>
  <div class="container">
    <div class="top">
      <div class="top-cen">
        <div class="logo">眷诗词</div>
        <div class="ipt">
          <input type="text" @mouseover="handleMouseOver" v-model="searchKey" placeholder="搜索" @focus="focus = true"
            @blur="focus = false" />
          <el-icon size="25" class="icon-search" @click="goSearch">
            <Search />
          </el-icon>
        </div>
        <div class="search-key" v-if="isFocused || searchKey !== ''" @mouseleave="handleMouseLeave">
          <!-- 显示历史搜索字 -->
          <div class="history">
            <h1>搜索记录</h1>
            <div class="taglist" v-show="searchKey.length == 0">
              <el-tag class="tag" v-for="tag in searchStore.searchList" :key="tag" type="info" effect="plain"
                @click="changeSearch(tag)">
                {{ tag }}
              </el-tag>
            </div>
            <el-button class="clear" @click="searchStore.clearSearchList">清空记录</el-button>
          </div>
          <!-- 显示推荐搜索字 -->
          <div class="like" v-show="searchKey.length !== 0">
            <p v-for="i in searchList" :key="i" @click="changeSearch(i)">
              {{ i }}
            </p>
          </div>
        </div>
        <div class="menu">
          <ul>
            <li :class="{ active: $route.name == 'home' }" @click="goLayout('/home')">
              首页
            </li>
            <li :class="{ active: $route.name == 'poetry' }" @click="goLayout('/poetry')">
              诗词
            </li>
            <li :class="{ active: $route.name == 'writar' }" @click="goLayout('/writar')">
              诗人
            </li>
            <li :class="{ active: $route.name == 'community' }" @click="goLayout('/community')">
              社区
            </li>
            <el-popover placement="bottom" trigger="hover">
              <template #reference>
                <li :class="{ active: $route.path.split('/')[1] == 'friend' }">消息</li>
              </template>
              <div class="list">
                <p style="margin-bottom: 10px; cursor: pointer" @click="goLayout('/friend/fans')">
                  新增粉丝
                </p>
                <p style="margin-bottom: 10px; cursor: pointer" @click="goLayout('/friend/like')">
                  点赞
                </p>
                <p style="margin-bottom: 10px; cursor: pointer" @click="goLayout('/friend/code')">
                  私信
                </p>
              </div>
            </el-popover>
          </ul>
        </div>
        <div class="login" @click="goLogin" :class="{ none: Object.keys(userStore.userInfo).length != 0 }">
          <el-tooltip class="box-item" effect="dark" content="登录享受所有功能" placement="right-end">
            <h1 v-if="Object.keys(userStore.userInfo).length == 0" @click="$router.push('/login')">
              登录
            </h1>
          </el-tooltip>
          <img v-if="Object.keys(userStore.userInfo).length != 0" ref="avatar" :src="userStore.userInfo.image" alt="头像"
            :class="{ avatarShow: loginCardShow }" @mouseenter="CardHandler" v-popover="popoverRef"
            v-click-outside="onClickOutside" />
          <el-popover ref="popoverRef" trigger="hover" virtual-triggering persistent>
            <div class="btn">
              <el-button class="btn1" type="success" @click="goMine">个人中心</el-button>
              <el-button type="warning" @click="loginOut">退出登录</el-button>
            </div>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import useUserStore from "@/store/modules/user.js";
import useSearchStore from "@/store/modules/search.js";
import { reqGetRecommendSearch } from '@/api/module/search'
import { ClickOutside as vClickOutside } from "element-plus";
const searchKey = ref('');
const popoverRef = ref();
const focus = ref(false);
const isFocused = ref(false);

const tags = ref([
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 3', type: 'info' },
  { name: 'Tag 3', type: 'info' },
])
const onClickOutside = () => {
  // unref(popoverRef).popperRef?.delayHide?.();
};
let userStore = useUserStore();
let searchStore = useSearchStore();
let $router = useRouter();
let $route = useRoute();
//存储推荐搜索
let searchList = ref([]);
let loginCardShow = ref(false);
// let dialogVisible = ref(false);
//获取推荐搜索
const getSearchList = async () => {
  const data = {
    index: searchKey.value,
    userId: userStore.userInfo.userId
  }
  const res = await reqGetRecommendSearch(data);
  if (res.code == 1) {
    searchList.value = res.data;
  }
}
//聚焦显示的条件
const handleMouseOver = () => {
  console.log('聚焦了');
  isFocused.value = true;
};

const handleMouseLeave = () => {
  isFocused.value = false;
  watch(searchKey, (newVal) => {
    if (newVal === '') {
      isFocused.value = false;
    }
  });
};
//监听搜索字的变化
watch(searchKey, () => {
  getSearchList();
})

const goLayout = (path) => {
  //路由跳转
  $router.push(path);
};
//登录
const goLogin = () => { };
const handleClose = (tag) => {
  //删除某个元素
};
//鼠标移入头像显示卡片
const CardHandler = () => {
  loginCardShow.value = true;
};
const goMine = () => {
  //前往个人中心
  $router.push({
    path: '/account', query: {
      userId: userStore.userInfo.userId,
    }
  })
};
//选中某个标签
const changeSearch = (i) => {
  // console.log(1);
  searchKey.value = i;
  goSearch();
}
//退出登录
const loginOut = () => {
  //清除本地userinfo
  userStore.loginOut();
  //刷新页面
  $router.push("/login");
};
//前往搜索页面
const goSearch = () => {
  searchStore.saveSearchList(searchKey.value);
  //搜索之前先将搜索词存储到本地
  $router.push({ path: "/search", query: { keyword: searchKey.value, type: 'poetry' } });

  searchKey.value = '';
}
onMounted(() => { });
</script>

<style scoped lang="scss">
.container {
  position: relative;

  .top {
    width: 100vw;
    height: $topHeight;
    background-color: #fff;
    position: absolute;
    //阴影
    box-shadow: 0 0 10px #ccc;

    .top-cen {
      width: $layoutWidth;
      height: 100%;
      margin: 0 auto;
      position: relative;

      .search-key {
        position: absolute;
        width: 300px;
        height: 220px;
        // border-radius: 10px;
        background-color: #fff;
        //阴影
        box-shadow: 0 0 10px #ccc;
        top: 60%;
        left: 200px;
        z-index: 99;

        .like {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 150px;
          overflow-y: auto;

          p {
            padding: 7px;
            font-size: 14px;


            &:hover {
              cursor: pointer;
              background-color: #adaaaa;
            }
          }
        }

        .history {
          margin-top: 10px;

          h1 {
            font-size: 16px;
            color: #333;
            margin: 10px 0 10px 10px;
          }

          .taglist {
            display: flex;
            flex-wrap: wrap;

            padding: 0 5px;

            .tag {
              margin: 5px 5px;
              cursor: pointer;
            }
          }

          .clear {
            font-size: 16px;
            //靠最下面的角落
            position: absolute;
            bottom: 2px;
            right: 15px;
          }
        }
      }

      .logo {
        font-size: $logoFontSize;
        line-height: $topHeight;
        font-family: $logoFontStyle;
        float: left;
      }

      .ipt {
        width: 320px;
        height: 30px;
        float: left;
        //渐变背景
        background: linear-gradient(to right, #e5e5e5, #fefefe);
        margin: 30px 50px 0 80px;
        border-radius: 20px;


        input {
          //清除input的所有样式
          outline: none;
          border: none;
          padding-left: 20px;
          width: 80%;
          height: 100%;
          background: transparent;
          color: #333;
        }

        .icon-search:hover {
          cursor: pointer;
        }
      }

      .menu {
        float: left;
        width: 600px;
        height: 100%;
        margin: 30px 20px 0 0;

        ul {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: space-between;

          li {
            height: 36px;
            padding: 10px 20px;
            font-size: 18px;
            font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
              "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
            text-align: center;
            border-radius: 20px;

            &:hover {
              cursor: pointer;
            }
          }

          .active {
            background-color: #cccccc;
          }
        }
      }

      .login {
        // background-color: blue;
        width: 40px;
        height: 40px;
        float: right;
        margin: 30px 120px 0 0;
        background-color: rgb(101, 185, 224);
        border-radius: 50%;
        text-align: center;

        &.none {
          background-color: #fff;
          margin: 10px 120px 0 0;
        }

        h1 {
          font-size: 18px;
          color: #fff;
          font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
            "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
          line-height: 40px;

          &:hover {
            cursor: pointer;
            // color: rgb(241, 37, 37);
          }
        }

        img {
          width: 50px;
          height: 50px;
          margin: 20px auto;
          border-radius: 50%;
          // transition: 0.3s all;
          z-index: 9;

          &:hover {
            cursor: pointer;
          }
        }

        .avatarShow {
          // margin: 30px 0 -82px 0;
          // transform: scale(1.5);
          z-index: 9;
        }
      }
    }
  }
}

.btn {
  display: flex;
  //居中对齐
  align-items: baseline;
  flex-direction: column;

  .btn1 {
    margin: 10px 0;
  }
}
</style>

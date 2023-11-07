<template>
  <div class="communityCard">
    <div class="top">
      <div class="avatar">
        <img src="@/assets/pexels-shonejai-1227511 (1).jpg" alt="" />
      </div>
      <div class="userId">jdiand</div>
    </div>
    <div class="time">1天前</div>
    <div class="text">
      <div class="tag">
        <span class="tagspan">#诗歌传作#</span>
        <span class="tagtext">想要勋章,深圳有户外大佬吗想去牛奶排！</span>
      </div>
      <div class="praise">
        <div class="praiseAvatar">
          <img src="@/assets/pexels-shonejai-1227511 (1).jpg" v-for="i in 3" />
        </div>
        <p class="praiseText">等人赞过</p>
      </div>
    </div>
    <el-divider style="margin: 24px 0 10px 0" />
    <div class="buttom">
      <ul>
        <li class="active">
          <svg t="1699339599589" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4052" width="16" height="16">
            <path
              d="M857.28 344.992h-264.832c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-71.808-153.792-140.544-143.808-60.608 8.8-89.536 59.904-89.536 125.536v59.296c0 76.064-58.208 140.928-132.224 148.064l-117.728-0.192A67.36 67.36 0 0 0 64 483.04V872c0 37.216 30.144 67.36 67.36 67.36h652.192a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824zM128 872V483.04c0-1.856 1.504-3.36 3.36-3.36H208v395.68H131.36A3.36 3.36 0 0 1 128 872z m767.328-417.088l-73.728 388.96a38.72 38.72 0 0 1-38.048 31.488H272V476.864a213.312 213.312 0 0 0 173.312-209.088V208.512c0-37.568 12.064-58.912 34.72-62.176 27.04-3.936 67.36 38.336 67.36 80.48 0 37.312-9.504 84-28.864 139.712a32 32 0 0 0 30.24 42.496h308.512a38.72 38.72 0 0 1 38.048 45.888z"
              p-id="4053"
              fill="#4596ff"
            ></path>
          </svg>
          {{ 1 }}
        </li>
        <li>
          <el-icon><Comment /></el-icon>{{ 99 }}
        </li>
        <li>
          <el-icon><Star /></el-icon>{{ 9 }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.communityCard {
  margin-top: 10px;
  width: 100%;
  // height: 100px;
  background-color: #fff;
  .top {
    display: flex;
    align-items: center;
    .avatar {
      margin: 10px 0 0 10px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .userId {
      margin-left: 10px;
    }
  }
  .time {
    margin-left: 60px;
    font-size: 14px;
    color: #999;
  }
  .text {
    margin: 10px 0 0 60px;
    .tag {
      .tagspan {
        color: #529dff;
        font-size: 14px;
      }
      .tagtext {
        width: 600px;
        font-size: 15px;
        margin-top: 5px;
        line-height: 20px;
        padding-left: 5px;
      }
    }
    .praise {
      width: 150px;
      height: 30px;
      // background-color: pink;
      //靠右边
      margin-left: auto;
      display: flex;
      align-items: center;
      .praiseAvatar {
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          margin-left: -5px;
        }
      }
      .praiseText {
        float: left;
        font-size: 14px;
        color: #999;
        padding-left: 5px;
      }
    }
  }
  .buttom {
    padding-bottom: 10px;
    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999;
        &:hover {
          cursor: pointer;
          //修改颜色
          color: #4596ff;
        }
        &.active {
          color: #4596ff;
        }
      }
    }
  }
}
</style>

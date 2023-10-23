<template>
  <div class="container">
    <!-- 轮播图 -->
    <div class="banner">
      <div class="banner-cen">
        <el-carousel :interval="5000" arrow="always">
          <el-carousel-item v-for="item in 4" :key="item">
            <img src="@/../public/coffee-6249312.jpg" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="commend">
      <div class="left">
        <!-- 今日推荐 -->
        <div class="today-recomme">
          <h1>今日推荐</h1>
          <div class="item" v-for="i in 2">
            <img src="@/../public/coffee-6249312.jpg" alt="" />
            <div class="item-right">
              <h2>《饮酒·其十七》陶渊明原文注释翻译赏析</h2>
              <p>作品简介《饮酒·其十七》是陶渊明的作品。一共20首诗，陶渊明把这一组诗题为《饮酒二十首》。这是其中第十七首。此诗作于陶渊明看破东晋黑暗，辞官隐退之时。陶渊明在偏僻山村，没有世俗侵扰，时常醉酒之后反而诗...</p>
              <div class="item-bottom">
                <div class="time">1025/12/03</div>

                <div class="icon">
                  <div class="icon-item">
                    <el-icon><View /></el-icon> <span>200</span>
                  </div>
                  <div class="icon-item">
                    <el-icon><ChatLineSquare /></el-icon> <span>3024</span>
                  </div>
                  <div class="icon-item">
                    <el-icon><Star /></el-icon> <span>20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 今日热帖 -->
        <h1 style="font-size: 2em; color: #99a9bf; padding: 10px">今日热帖</h1>
        <div class="today-post">
          <div class="post-card" v-for="i in 6">
            <div class="post-header">
              <img class="post-author-avatar" src="@/assets/vue.svg" alt="作者头像" />
              <p class="post-author">作者：用户123</p>
            </div>
            <h2 class="post-title">美丽的晚霞</h2>
            <p class="post-summary">床前明月光，疑是地上霜。举头望明月，低头思故乡。今夜无眠，满襟尘土。愿得一人心，白头不相离。</p>
            <div class="post-stats">
              <p class="post-likes">
                <el-icon><Star /></el-icon> <span>256</span>
              </p>
              <p class="post-views">
                <el-icon><ChatLineSquare /></el-icon> <span> 1456</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <!-- 热榜 -->
        <div class="win-commend">
          <h1>今日热榜</h1>
          <div class="item" v-for="i in 5">
            <el-icon color="red"><CaretTop /></el-icon>
            <span>《天净沙·秋思》马致远元曲注释翻译赏析</span>
          </div>
        </div>
        <!-- 推荐关注 -->
        <div class="atten-commend">
          <h1>推荐关注</h1>
          <div class="item" v-for="i in 5">
            <img src="@/../public/coffee-6249312.jpg" alt="" />
            <div class="resource">
              <p>大狸子</p>
              <p>爱好：唐诗，宋词</p>
              <p>简介：诗圣，诗圣，诗圣</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 340px;
  background-color: $bgcColor;
  .banner-cen {
    padding-top: 20px;
    width: 1000px;
    margin: 0 auto;
  }
}
.commend {
  display: flex;
  justify-content: space-between;
  .left {
    width: 1000px;
    height: 1050px;
    background-color: #fff;
    border-radius: 1em;
    margin-bottom: 20px;
    .today-recomme {
      h1 {
        font-size: 2em;
        color: #99a9bf;
        padding: 10px;
      }
      .item {
        display: flex;
        padding: 5px;
        width: 98%;
        margin: 5px auto;
        transition: 0.3s all;
        &:hover {
          cursor: pointer;
          box-shadow: 1px 1px 10px #99a9bf;
          transform: scale(1.01);
        }
        img {
          width: 300px;
          height: 200px;
          margin: 10px 0 0 20px;
        }
        h2 {
          font-size: 25px;
          margin: 10px 0 0 20px;
        }
        p {
          font-size: 18px;
          color: #333;
          line-height: 30px;
          margin: 20px 20px 0 30px;
        }
        .item-bottom {
          padding: 40px 0 0 20px;
          display: flex;
          .time {
            margin: 0 100px 0 10px;
          }
          .icon {
            margin: 0 10px 0 10px;
            display: flex;
            .icon-item {
              display: flex;
              margin: 0 10px;
              &:hover {
                color: #ff6767;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .today-post {
      display: flex;
      flex-wrap: wrap;

      .post-card {
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 20px 0 0 20px;
        padding: 20px;
        max-width: 300px;
        overflow: hidden;
        transition: transform 0.3s;

        &:hover {
          transform: scale(1.05);
          cursor: pointer;
        }

        .post-header {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          .post-author-avatar {
            max-width: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }

          .post-author {
            color: #777;
          }
        }

        .post-title {
          font-size: 20px;
          color: #333;
          margin-bottom: 10px;
        }

        .post-summary {
          font-size: 16px;
          color: #555;
          margin-bottom: 10px;
        }

        .post-stats {
          display: flex;
          justify-content: space-between;

          p {
            font-size: 14px;
            color: #777;
            display: flex;
          }
        }
      }
    }
  }
  .right {
    background-color: #fff;
    width: 380px;
    height: 720px;
    border-radius: 1em;
    .win-commend {
      margin-bottom: 10px;
      // border: 1px solid #f7f4f4;
      h1 {
        font-size: 20px;
        padding: 5px 0 10px 5px;
        border: 1px solid #f7f4f4;
      }
      .item {
        padding: 8px;

        span {
          white-space: nowrap; /* 防止文本换行 */
          overflow: hidden; /* 隐藏超出部分的文本 */
          text-overflow: ellipsis; /* 显示省略号 */
          max-width: 100%; /* 可以根据需要设置最大宽度 */
          display: inline-block; /* 使省略号在文本内行内显示 */
          &:hover {
            color: #1cb1d6;
            cursor: pointer;
            transform: scale(1.01);
          }
        }
      }
    }
    .atten-commend {
      margin-top: 20px;
      padding-bottom: 10px;
      // border: 1px solid #f7f4f4;
      h1 {
        font-size: 20px;
        padding: 5px 0 10px 5px;
      }
      .item {
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        transition: 0.3s all;
        &:hover {
          transform: scale(1.05);
          cursor: pointer;
          box-shadow: 1px 1px 1px 3px rgba(192, 187, 187, 0.2);
        }
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-top: 9px;
        }
        .resource {
          padding: 8px;
          p {
            padding: 4px;
          }
        }
      }
    }
  }
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

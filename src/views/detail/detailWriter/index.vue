<template>
  <div>
    <!-- 作者详情页 -->
    <el-card class="detailWriter">
      <div class="head">
        <h1>李白</h1>
        <h2>唐</h2>
      </div>
      <div class="detail">
        <img src="@/../public/coffee-6249312.jpg" alt="" />
        <p>
          徐霞客（1587年1月5日－1641年3月8日），名弘祖，字振之，号霞客，南直隶江阴县（今江苏省江阴市）人，明代地理学家、旅行家和文学家，他经30年考察撰成了60万字地理名著《徐霞客游记》，被称为“千古奇人”。
        </p>
        <!-- 渲染一些推荐的诗词 -->
        <ul class="recommend">
          <h1>
            <el-icon>
              <CollectionTag />
            </el-icon>
            <span>推荐诗词</span>
          </h1>
          <li>行路难</li>
          <li>登高</li>
          <li>望月</li>
          <li>蝶恋花</li>
          <li>狂人日记</li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.detailWriter {
  width: 90%;

  .head {
    display: flex;
    align-items: center;

    h1 {
      font-size: 2rem;
      margin: 0 10px;
    }

    h2 {
      font-size: 1.5rem;
    }
  }

  .detail {
    display: flex;
    margin: 10px 0;

    img {
      width: 200px;
      height: 250px;
    }

    p {
      margin: 0 20px;
      color: #666565;
      width: 400px;
      line-height: 25px;
    }
  }

  .recommend {
    margin-left: 100px;
    // border: 1px solid #ccc;
    width: 100px;

    li {
      margin: 10px 0;
      cursor: pointer;

      &:hover {
        color: red;
      }
    }

    h1 {
      font-size: 20px;
      display: flex;
      align-items: center;
    }
  }
}
</style>

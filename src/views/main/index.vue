<template>
  <div class="container">
    <div class="heart">
      <div class="heart-cen">
        <div class="layout-view">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="contact-info">
        <p>联系我们：contact@example.com</p>
        <p>电话：(123) 456-7890</p>
        <p>地址：123 Main St, City, Country</p>
      </div>
      <div class="social-media">
        <a href="https://www.facebook.com/example" target="_blank">Facebook</a>
        <a href="https://twitter.com/example" target="_blank">Twitter</a>
        <a href="https://www.linkedin.com/company/example" target="_blank">LinkedIn</a>
      </div>
      <div class="site-links">
        <a href="/about">关于我们</a>
        <a href="/services">我们的服务</a>
        <a href="/faq">常见问题</a>
        <a href="/privacy">隐私政策</a>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.container {
  .heart {
    width: 100vw;
    // height: 1000px;
    background-color: $bgcColor;
    .heart-cen {
      width: 1400px;
      // height: 1000px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      .layout-view {
        width: 1400px;
        // height: 1000px;
        border-radius: 20px;
        margin-top: 110px;
      }
    }
  }
  .footer {
    width: 100%;
    height: 200px;
    background-color: #888585;
    text-align: center;
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      max-width: 1200px;
      margin: 0 auto;
    }

    .contact-info,
    .social-media,
    .site-links {
      flex: 1;
      padding: 10px;
    }

    .contact-info {
      p {
        margin: 5px 0;
      }
    }

    .social-media,
    .site-links {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      a {
        color: #fff;
        text-decoration: none;
        margin: 5px 15px;
        font-size: 16px;
      }
    }
  }
}
</style>

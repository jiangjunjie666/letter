import { createApp } from 'vue'
//引入全局默认样式
import '@/style/index.scss'
//引入路由
import rouer from '@/router/index.js'
import App from './App.vue'
//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入icons
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//引入pinia
import pinia from '@/store/index.js'
const app = createApp(App)
app.use(rouer)
app.use(ElementPlus, {
  locale: zhCn
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
app.mount('#app')

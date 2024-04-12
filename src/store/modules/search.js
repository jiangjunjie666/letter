//定义info小仓库
import { defineStore } from 'pinia'
//第一个仓库:小仓库名字  第二个参数:小仓库配置对象
//defineStore方法执行会返回一个函数,函数作用就是让组件可以获取到仓库数据
import { ElMessage } from 'element-plus'
let useSearchStore = defineStore('search', {
  //存储数据:state
  state: () => {
    return {
      //历史搜索词
      searchList: localStorage.getItem('searchList') ? JSON.parse(localStorage.getItem('searchList')) : []
    }
  },
  actions: {
    //保存历史搜索词
    saveSearchList(word) {
      let searchList = this.searchList
      //查看是否超过15个
      if (searchList.length > 10) {
        //清除第一个
        searchList.shift()
      }
      searchList.push(word)
      localStorage.setItem('searchList', JSON.stringify(searchList))
    },
    //清空搜索记录
    clearSearchList() {
      localStorage.removeItem('searchList')
      this.searchList = []
    }
  },
  getters: {}
})
//对外暴露方法
export default useSearchStore

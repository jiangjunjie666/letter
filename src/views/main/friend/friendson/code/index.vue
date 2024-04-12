<template>
  <div class="code">
    <div class="left">
      <div class="search">
        <el-input placeholder="搜索联系人" v-model="input" :suffix-icon="Search"></el-input>
      </div>
      <div class="friend-list" v-for="i in chatList" :key="i.userId"
        :class="{ last: i == 9, active: i.userId == activeIndex }" @click="changeChat(i)">
        <img :src="i.userImage" alt="" />
        <div class="name">{{ i.userName }}</div>
        <div class="cate">{{ i.status }}</div>
        <div class="time">{{ i.thisTime }}</div>
        <div class="chat">{{ i.chat }}</div>
        <div class="num" v-if="i.unreadCount !== 0 && i.sender !== userStore.userInfo.userId">
          {{ i.unreadCount }}
        </div>
      </div>
    </div>
    <div class="right">
      <el-empty description="暂未选择联系人" v-if="activeIndex == -1" class="empty"></el-empty>

      <el-scrollbar height="500px" v-else class="chatListScroll" ref="scrollbar" @scroll="scroll">
        <div v-loading="isLoading" class="loading"></div>
        <div class="messageList" ref="messageList">
          <template v-for="(chatMessage, index) in chatMessageList" :key="chatMessage.sender">
            <div class="left" v-if="chatMessage.sender == activeIndex">
              <img :src="image" alt="">
              <p>{{ chatMessage.content }}</p>
              <div class="time" v-if="index % 4 == 0">{{ chatMessage.thisTime }}</div>
            </div>
            <div class="right" v-else>
              <img :src="userStore.userInfo.image" alt="">
              <p>{{ chatMessage.content }}</p>
              <div class="time" v-if="index % 4 == 0">{{ chatMessage.thisTime }}</div>
            </div>
          </template>
        </div>
      </el-scrollbar>
      <div class="text">
        <div class="icon-xiaolian iconfont"></div>
        <textarea class="textarea" v-model="textarea" cols="30" rows="10" @input="changeNum"></textarea>
        <div class="num">{{ textarea.length }}/{{ maxNum }}</div>
        <el-button type="primary" class="btn" @click="sendMessage"
          :disabled="textarea.length == 0 || activeIndex == -1">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search } from "@element-plus/icons-vue";
import { reqGetChatList, reqCreateChannel, reqGetChatMesageList } from '@/api/module/websocket'
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import useUserStore from '@/store/modules/user.js'
import dayjs from 'dayjs'
import SockJS from 'sockjs-client/dist/sockjs.min.js'
import Stomp from 'stompjs'
const userStore = useUserStore()
const activeIndex = ref(-1);
const chatList = ref([])
const textarea = ref('')
const maxNum = ref(500)
const page = ref(1)
const pageSize = ref(10)
const isLoading = ref(false)
//聊天列表的数据
const messageList = ref(null)
const scrollbar = ref(null)
//当前的聊天记录
const chatMessageList = ref([])
//当前聊天对象的头像数据
const image = ref('')
//当前的频道号
const topic = ref('')
let socket = null
let stompClient = null
// 定义要订阅的主题列表
const topics = ref([]);

//获取聊天列表
const getChatList = async () => {
  const res = await reqGetChatList(userStore.userInfo.userId)
  if (res.code == 1) {
    chatList.value = res.data
    //整合所有的topic
    topics.value = chatList.value.map(i => `/topic/public/${i.topic}`)
    //订阅所有的主题

    handleChatData()
    connectWebsocket()

  } else {
    return ElMessage({
      type: 'error',
      message: '获取聊天列表失败，请刷新重试'
    })
  }
}
//处理聊天数据，拿到最新的时间
const handleChatData = () => {
  chatList.value.forEach(i => {
    const newTime = dayjs(i.time); // 例如 "2024-03-14 15:49"
    // 获取当前时间
    const currentTime = dayjs();
    // 计算时间差
    const diff = currentTime.diff(newTime, 'minute'); // 计算相差的分钟数
    // 根据时间差返回不同的字符串
    let result;
    if (diff < 60) {
      // 一小时内，返回相差的分钟数
      result = `${diff}分钟前`;
    } else if (diff < 1440) {
      // 24小时内，返回相差的小时数
      result = `${Math.floor(diff / 60)}小时前`;
    } else {
      // 大于24小时，返回日期的简化表示，例如 "昨天" 或 "前天"
      result = newTime.format('YYYY-MM-DD');
    }
    //增加一个时间字段
    i.thisTime = result
    i.num = 0
  });
}
const changeNum = () => {
  //如果超过最大数，禁止用户输入
  if (textarea.value.length > maxNum.value) {
    textarea.value = textarea.value.slice(0, maxNum.value);
  }
}
//选择聊天对象
const changeChat = async (i) => {
  //设置滚动条的位置
  chatMessageList.value = []
  activeIndex.value = i.userId
  image.value = i.userImage
  pageSize.value = 10
  topic.value = '/topic/public/' + i.topic
  chatMessageList.value = i.chats
  i.unreadCount = 0
  //获取聊天记录
  const res = await reqGetChatMesageList(page.value, pageSize.value, i.topic, userStore.userInfo.userId)
  if (res.code == 1) {
    chatMessageList.value = res.data
    //对齐里面的消息数据进行格式化
    handleChatTime()
  }

}
//处理聊天记录的消息时间
const handleChatTime = () => {

  chatMessageList.value.forEach(i => {
    const newTime = dayjs(i.chatTime); // 例如 "2024-03-14 15:49"
    // 获取当前时间
    const currentTime = dayjs();
    // 计算时间差
    const diff = currentTime.diff(newTime, 'minute'); // 计算相差的分钟数
    // 根据时间差返回不同的字符串
    let result;
    if (diff < 60) {
      // 一小时内，返回相差的分钟数
      result = diff > 0 ? `${diff}分钟前` : '刚刚';
    } else if (diff < 1440) {
      // 24小时内，返回相差的小时数
      result = `${Math.floor(diff / 60)}小时前`;
    } else {
      // 大于24小时，返回日期的简化表示，例如 "昨天" 或 "前天"
      result = newTime.format('YYYY-MM-DD');
    }

    //修改值;
    i.thisTime = result
  })

}

//连接websocket方法
const connectWebsocket = () => {
  socket = new SockJS('http://10.2.142.129:8083/ws');
  stompClient = Stomp.over(socket);
  // 启动连接
  stompClient.connect({}, onConnected, onError);
}
const onConnected = () => {
  console.log('WebSocket 连接成功！');
  handleChatTopic()
  // 通知服务器用户加入
  stompClient.send("/app/chat.addUser", {}, JSON.stringify({ sender: userStore.userInfo.userId, type: 'JOIN' }));
};

// 定义接收到消息时的回调函数
const onMessageReceived = (message) => {
  console.log('收到消息:', message.body);
  //收到消息: {"type":"CHAT","content":"111","sender":"16e200ff8b87498682c5bcc93d291c05","receiver":"67df729499044b08b41baf8ebe264280","topic":"/topic/public/2"}
  // 处理接收到的消息
  const data = JSON.parse(message.body);
  if (data.receiver == userStore.userInfo.userId) {
    //如果自己是接收信息的人
    //首先判断当前是否是正在聊天的人
    if (activeIndex.value == data.sender) {
      chatMessageList.value.push(data)
      //修改其num值
      chatList.value.forEach(i => {
        if (i.userId == data.sender) {
          //给其num修改和chat修改
          i.chat = data.content
        }
      })
    } else {
      //如果不是正在聊天的人,遍历数组查找到那个人
      chatList.value.forEach(i => {
        if (i.userId == data.sender) {
          //给其num修改和chat修改
          i.unreadCount++
          i.chat = data.content
        }
      })
    }
  }
};
// 定义连接发生错误时的回调函数
const onError = (error) => {
  console.error('WebSocket 连接发生错误:', error);
};
//订阅所有的主题
const handleChatTopic = () => {
  // 订阅主题
  topics.value.forEach(topic => {
    stompClient.subscribe(topic, onMessageReceived);
  });
}
//创建频道号
const createChannel = async (id) => {
  const data = {
    userAId: userStore.userInfo.userId,
    userBId: id
  }
  const res = await reqCreateChannel(data)
  console.log(res);
}
const sendMessage = () => {
  let senMessage = { sender: userStore.userInfo.userId, receiver: activeIndex.value, topic: topic.value, content: textarea.value, type: 'CHAT' }
  stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(senMessage));
  //如何监听是否发送成功
  textarea.value = ''
  //修改聊天记录数据
  chatMessageList.value.push(senMessage)
}

//设置滚动条的位置
const scroll = ({ scrollTop }) => {
  if (scrollTop == 0) {
    pageSize.value += 10
    //获取当前的聊天信息
    isLoading.value = true
    let timer = null
    timer = setTimeout(async () => {
      const res = await reqGetChatMesageList(page.value, pageSize.value, topic.value.charAt(topic.value.length - 1), userStore.userInfo.userId)
      if (res.code == 1) {
        chatMessageList.value = res.data
        //对齐里面的消息数据进行格式化
        handleChatTime()
        isLoading.value = false
        //清除timer
        clearTimeout(timer)
      }
    }, 1000);
  }
}

onMounted(() => {
  getChatList()
})

</script>

<style lang="scss" scoped>
.code {
  display: flex;
  width: 100%;

  .left {
    width: 30%;
    height: 700px;
    border-right: 1px solid #d4d4d6;
    display: flex;
    flex-direction: column;

    .search {
      margin: 10px;
    }

    .friend-list {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #d4d4d6;
      position: relative;

      &:hover {
        cursor: pointer;
        background-color: #f5f5f5;
      }

      &.last {
        border: none;
      }

      &.active {
        background-color: #f5f5f5;
      }

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      .name {
        font-size: 16px;
        margin: 0 5px;
      }

      .cate {
        border-radius: 5px;
        background-color: #e0dbdb;
        font-size: 14px;
        padding: 3px;
      }

      .time {
        margin-left: auto;
        color: #b4b2b2;
      }

      .chat {
        font-size: 14px;
        color: #888;
        position: absolute;
        bottom: 10px;
        left: 60px;
        width: 200px;
        // background-color: pink;
        overflow: hidden;
        /* 隐藏溢出的内容 */
        text-overflow: ellipsis;
        /* 显示省略点 */
        white-space: nowrap;
        /* 防止文本换行 */
      }

      .num {
        padding: 2px;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        background-color: red;
        border-radius: 50%;
        font-size: 14px;
        color: #fff;
        position: absolute;
        top: 3px;
        right: 10px;
      }
    }
  }

  .right {
    width: 70%;
    height: 700px;

    .empty {
      margin-top: 200px;
    }

    .chatListScroll {
      height: 500px;
      background-color: #fdfbfb;

      :deep(.el-scrollbar__wrap) {
        border-bottom: 1px solid #e2dede;
      }

      .loading {
        width: 100%;
        height: 50px;
        position: absolute;
        top: 0;
      }

      .messageList {
        .left {
          margin: 10px 0 0 10px;
          display: flex;
          height: auto;
          flex-direction: row;
          border: none;
          position: relative;
          width: 350px;
          // background-color: pink;

          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }

          p {
            margin-top: 10px;
            background-color: #eee7e7;
            margin-left: 10px;
            text-align: center;
            padding: 10px;
            border-radius: 5px;
          }

          .time {
            position: absolute;
            right: -10px;
            background-color: #ccc;
            padding: 5px;
            color: #fff;
            border-radius: 5px;
          }
        }

        .right {
          margin: 10px 10px 0 0;
          display: flex;
          height: auto;
          flex-direction: row-reverse;
          border: none;
          position: relative;
          width: 350px;
          // background-color: pink;
          margin-left: auto;

          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }

          p {
            margin-top: 10px;
            background-color: greenyellow;
            margin-right: 10px;
            text-align: center;
            padding: 10px;
            border-radius: 5px;
          }

          .time {
            position: absolute;
            left: -20px;
            background-color: #ccc;
            padding: 5px;
            color: #fff;
            border-radius: 5px;
          }


        }
      }
    }


    .text {
      position: relative;

      .textarea {
        width: 100%;
        height: 100px;
        //去除默认边框
        border: none;
        border-radius: 0;
        //去除默认边框
        resize: none;
        margin-top: 20px;
        line-height: 20px;
        color: #666;
        padding: 5px;
        overflow-y: auto;
      }

      .num {
        position: absolute;
        bottom: 50px;
        left: 5px;
        font-size: 12px;
      }

      .iconfont {
        font-size: 20px;
        margin-top: 10px;
        margin-left: 10px;
      }

      .btn {
        margin-left: 90%;
        margin-top: 10px;
      }
    }
  }
}
</style>

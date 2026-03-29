let websock = null
let rec
let isConnect = false
let connectCallBack = null
let messageCallBack = null
let closeCallBack = null

/**
 * 建立 WebSocket 连接。
 * 负责初始化连接、发送登录指令以及注册基础事件回调。
 */
let connect = (wsurl, accessToken) => {
  try {
    let isDev = import.meta.dev
    wsurl = isDev ? 'ws://localhost:8878/im' : 'wss://https://blogserver.ideaflow.top/im'

    if (isConnect) {
      return
    }

    console.log('连接WebSocket', wsurl)
    websock = new WebSocket(wsurl)

    websock.onmessage = function (e) {
      let sendInfo = JSON.parse(e.data)
      if (sendInfo.cmd == 0) {
        heartCheck.start()
        connectCallBack && connectCallBack()
        console.log('WebSocket登录成功')
      } else if (sendInfo.cmd == 1) {
        heartCheck.reset()
      } else {
        console.log('收到消息:', sendInfo)
        messageCallBack && messageCallBack(sendInfo.cmd, sendInfo.data)
      }
    }

    websock.onclose = function (e) {
      console.log('WebSocket连接关闭')
      isConnect = false
      closeCallBack && closeCallBack(e)
    }

    websock.onopen = function () {
      console.log('WebSocket连接成功')
      isConnect = true

      let loginInfo = {
        cmd: 0,
        data: {
          accessToken
        }
      }

      websock.send(JSON.stringify(loginInfo))
    }

    websock.onerror = function () {
      console.log('WebSocket连接发生错误')
      isConnect = false
      reconnect(wsurl, accessToken)
    }
  } catch (e) {
    console.log('尝试创建连接失败')
    reconnect(wsurl, accessToken)
  }
}

/**
 * 执行断线重连。
 * 通过延迟重试避免在异常场景下过于频繁地发起连接。
 */
let reconnect = (wsurl, accessToken) => {
  console.log('尝试重新连接')
  if (isConnect) {
    return
  }

  rec && clearTimeout(rec)
  rec = setTimeout(function () {
    connect(wsurl, accessToken)
  }, 15000)
}

/**
 * 主动关闭当前连接。
 * @param code WebSocket 关闭码
 */
let close = (code) => {
  websock && websock.close(code)
}

/**
 * 心跳检测工具。
 * 用于保持连接活跃，并在收到响应后重新开始下一轮计时。
 */
let heartCheck = {
  timeout: 5000,
  timeoutObj: null,
  start: function () {
    if (isConnect) {
      console.log('发送WebSocket心跳')
      let heartBeat = {
        cmd: 1,
        data: {}
      }
      websock.send(JSON.stringify(heartBeat))
    }
  },

  reset: function () {
    clearTimeout(this.timeoutObj)
    this.timeoutObj = setTimeout(function () {
      heartCheck.start()
    }, this.timeout)
  }
}

/**
 * 发送消息。
 * 在连接尚未完全建立时会自动重试，避免消息直接丢失。
 */
let sendMessage = (agentData) => {
  if (websock.readyState === websock.OPEN) {
    websock.send(JSON.stringify(agentData))
  } else if (websock.readyState === websock.CONNECTING) {
    setTimeout(function () {
      sendMessage(agentData)
    }, 1000)
  } else {
    setTimeout(function () {
      sendMessage(agentData)
    }, 1000)
  }
}

/**
 * 注册连接成功回调。
 * @param callback 连接建立后的回调函数
 */
let onConnect = (callback) => {
  connectCallBack = callback
}

/**
 * 注册消息回调。
 * @param callback 收到业务消息后的回调函数
 */
let onMessage = (callback) => {
  messageCallBack = callback
}

/**
 * 注册关闭回调。
 * @param callback 连接关闭后的回调函数
 */
let onClose = (callback) => {
  closeCallBack = callback
}

export {
  connect,
  reconnect,
  close,
  sendMessage,
  onConnect,
  onMessage,
  onClose,
}

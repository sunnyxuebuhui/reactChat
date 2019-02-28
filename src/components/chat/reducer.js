import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://localhost:9093')

// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

/**
 * 创建reducer
 */
export function chat(state=initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        users: action.payload.users,
        chatmsg: action.payload.msgs,
        unread: action.msgs.filter(v => !v.read && v.to === action.payload.userid).length
      }
    case MSG_RECV:
      const n = action.payload.to === action.userid ? 1 : 0
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload],
        unread: state.unread = n
      }
    case MSG_READ:
      const { from, num } = action.payload
      return {
        ...state,
        chatmsg: state.chatmsg.map(v => ({...v, read: from === v.from ? true : v.read})),
        unread: state.unread - num
      }
    default:
      return state
  }
}

/**
 * 获取聊天信息列表
 */
export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getMsgList')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          const userid = getState().user._id
          dispatch(msgList(res.data.msgs, res.data.users, userid))
        }
      })
  }
}
function msgList(msgs, users, userid) {
  return {
    type: MSG_LIST,
    payload: {msgs, users, userid}
  }
}

/**
 * 发送聊天信息
 * 实时双向通信
 */
export function sendMsg({from, to, msg}) {
  return (dispatch) => {
    socket.emit('sendmsg', {from, to, msg})
  }
}

/**
 * 接受聊天信息
 * 实时双向通信
 */
export function recvMsg() {
  return (dispatch, getState) => {
    socket.on('recvmsg', (data) => {
      const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}
function msgRecv(msg, userid) {
  return {
    userid,
    type: MSG_RECV,
    payload: msg
  }
}

/**
 * 查看聊天信息
 */
export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', {from})
      .then(res => {
        const userid = getState().user._id
        if (res.status === 200 && res.data.code === 0) {
          dispatch(msgRead({userid, from, num: res.data.num}))
        }
      })
  }
}
function msgRead({from, userid, num}) {
  return {
    type: MSG_READ,
    payload: {from, userid, num}
  }
}
import axios from 'axios';
import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';
import { Toast } from 'antd-mobile'

const getLoginInfo = (data) => ({
  type: actionTypes.GET_LOGIN_INFO,
  data: fromJS(data),
})

function verifyUserInfo(user) {
  let flag = false
  if (!user.user || !user.pwd) {
    Toast.info('用户名密码必须输入！') 
    flag = true
    return flag
  }
}

export const getLogin = (data) => {
  return (dispatch) => {
    debugger
    if (verifyUserInfo(data)) return
    Toast.loading('加载中...');
    axios.post('/user/login', data).then(res => {
      Toast.hide();
      if (res.data.code === 0) {
        dispatch(getLoginInfo(res.data.data))
      } else if (res.data.code === 1) {
        Toast.info(res.data.msg) 
      }
    }, err => {
      Toast.hide();
      Toast.info('服务异常');
    })
  }
}


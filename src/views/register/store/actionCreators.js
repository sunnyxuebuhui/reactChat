import axios from 'axios';
import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';
import { Toast } from 'antd-mobile'

const getRegisterInfo = (data) => ({
  type: actionTypes.GET_REGISTER,
  data: fromJS(data),
})

function verifyUserInfo(user) {
  let flag = false
  if (!user.user || !user.pwd || !user.repeatPwd)  {
    Toast.info('用户名密码必须输入！') 
    flag = true
    return flag
  }
  if (user.pwd !== user.repeatPwd) {
    Toast.info('密码和确认密码必须相同！') 
    flag = true
    return flag
  }
}

export const getRegister = (data) => {
  return (dispatch) => {
    if (verifyUserInfo(data)) return
    Toast.loading('加载中...');
   
    axios.post('/user/register', data).then(res => {
      Toast.hide();
      if (res.data.code === 0) {
        dispatch(getRegisterInfo(data))
      } else {
        Toast.info(res.data.msg) 
      }
    }, err => {
      Toast.hide();
      Toast.info('服务异常');
    })
  }
}


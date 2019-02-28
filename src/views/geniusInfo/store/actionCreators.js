import axios from 'axios';
import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';
import { Toast } from 'antd-mobile'

const getUpdateInfo = (data) => ({
  type: actionTypes.GET_UPDATE,
  data: fromJS(data),
})

export const getUpdateGeniusInfo = (data) => {
  return (dispatch) => {
    Toast.loading('加载中...');
    axios.post('/user/update', data).then(res => {
      Toast.hide();
      if (res.data.code === 0) {
        dispatch(getUpdateInfo(data))
      } else if (res.data.code === 1) {
        Toast.info(res.data.msg) 
      }
    }, err => {
      Toast.hide();
      Toast.info('服务异常');
    })
  }
}


import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';
import { getDirectPath } from '../../../libs/utils'

const defaultState = fromJS({
  redirectTo: null,
  isAuth: false,
  user: '',
  pwd: '',
  repeatPwd: '',
  userType: ''
});


export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.GET_REGISTER:
      // return state.merge({
      //   userType: action.data.get('userType'),
      //   user: action.data.get('user'),
      //   pwd: action.data.get('pwd'),
      //   repeatPwd: action.data.get('repeatPwd')
      // });
      return Object.assign({}, state, {
        userType: action.data.get('userType'),
        user: action.data.get('user'),
        pwd: action.data.get('pwd'),
        repeatPwd: action.data.get('repeatPwd'),
        redirectTo: getDirectPath(action.data)
      })
    default:
      return action;
  }
}
import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';
import { getDirectPath } from '../../../libs/utils'

const defaultState = fromJS({
  redirectTo: null,
  user: null,
  pwd: null,
  userType: null,
  id: null,
  money: null,
  avatar: null,
  title: null,
  desc: null
});


export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.GET_LOGIN_INFO:
      return Object.assign({}, state, {
        user: action.data.get('user'),
        id: action.data.get('id'),
        userType:  action.data.get('userType'),
        pwd: action.data.get('pwd'),
        avatar: action.data.get('avatar'),
        money: action.data.get('money'),
        title: action.data.get('title'),
        desc: action.data.get('desc'),
        redirectTo: getDirectPath(action.data)
      })
    default:
      return action;
  }
}
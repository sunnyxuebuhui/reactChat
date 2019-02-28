import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  user: '',
  pwd: ''
});


export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.GET_USER_INFO:
      debugger
      return Object.assign({}, state, {
        user: action.data.get('user'),
        pwd: action.data.get('pwd')
      })
    default:
      return action;
  }
}
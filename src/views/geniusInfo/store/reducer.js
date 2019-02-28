import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';
import { getDirectPath } from '../../../libs/utils'

const defaultState = fromJS({
  redirectTo: null,
  user: null,
  money: null,
  title: null,
  company: null,
});


export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.GET_UPDATE:
      return Object.assign({}, state, {
        user: action.data.get('user'),
        money: action.data.get('money'),
        title: action.data.get('title'),
        company: action.data.get('company'),
        redirectTo: getDirectPath(action.data)
      })
    default:
      return action;
  }
}
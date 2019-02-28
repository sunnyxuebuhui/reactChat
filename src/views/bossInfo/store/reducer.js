import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';
import { getDirectPath } from '../../../libs/utils'

const defaultState = fromJS({
  redirectTo: null,
  user: null,
  money: null,
  title: null,
  company: null,
  desc: null
});


export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.GET_UPDATE:
      console.log( Object.assign({}, state, {
        user: action.data.get('user'),
        money: action.data.get('money'),
        title: action.data.get('title'),
        company: action.data.get('company'),
        desc: action.data.get('desc'),
        redirectTo: getDirectPath(action.data)
      }))
      return Object.assign({}, state, {
        user: action.data.get('user'),
        money: action.data.get('money'),
        title: action.data.get('title'),
        company: action.data.get('company'),
        desc: action.data.get('desc'),
        redirectTo: getDirectPath(action.data)
      })
    default:
      return action;
  }
}







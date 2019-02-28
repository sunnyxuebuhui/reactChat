import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

export const loadData = (data) => ({
  type: actionTypes.GET_USER_INFO,
  data: fromJS(data),
})


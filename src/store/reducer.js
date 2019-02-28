import { combineReducers } from 'redux-immutable'
import { reducer as registerReducer } from '../views/register/store';
import { reducer as loginReducer } from '../views/login/store';
import { reducer as bossInfo } from '../views/bossInfo/store';
import { reducer as geniusInfo } from '../views/geniusInfo/store';

const reducer = combineReducers({
  register: registerReducer,
  login: loginReducer,
  bossInfo: bossInfo,
  geniusInfo: geniusInfo
})

export default reducer
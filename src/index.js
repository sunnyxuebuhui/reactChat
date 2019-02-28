import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import store from './store'
import './reset'
import './index.css'

import Login from './views/login'
import Register from './views/register'
import BossInfo from './views/bossInfo'
import GeniusInfo from './views/geniusInfo'
import Dashboard from './components/dashboard'
import AuthRoute from './components/authRoute'
import Chat from './components/chat'



ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/geniusInfo' component={GeniusInfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
);

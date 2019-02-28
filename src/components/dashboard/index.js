import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, withRouter } from 'react-router-dom'
import { actionCreators } from './store'
import { NavBar } from 'antd-mobile'
import NavLinkBar from '../navlink'
import Boss from '../boss'
import Genius from '../genius'
import User from '../user'

function Msg() {
  return (
    <div><h2>消息列表</h2></div>
  )
}

class Dashboard extends Component {
  render() {
    const { pathname } = this.props.location
    const { userType }  = this.props

    const navList = [
      {
				path: '/boss',
				text: 'BOSS',
				icon: 'boss',
				title: 'BOSS列表',
				component: Boss,
				hide: userType === 'NIU'
      },
      {
				path: '/genius',
				text: '牛人',
				icon: 'job',
				title: '牛人列表',
				component: Genius,
				hide: userType === 'BOSS'
      },
      {
				path: '/msg',
				text: '消息',
				icon: 'msg',
				title: '消息列表',
				component: Msg,
      },
      {
				path: '/me',
				text: '我',
				icon: 'user',
				title:'个人中心',
				component: User
			}
    ]

    return (
      <div >
        <NavBar className="fixd-header" mode="dard">{navList.find(v => v.path === pathname).title}</NavBar>
        <div>
          <Switch>
            {navList.map( item => (
              <Route key={item.path} path={item.path} component={item.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar style={{position: 'relative', zIndex: -1}} data={navList}></NavLinkBar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.getIn(['bossInfo']).user || state.getIn(['geniusInfo']).user || state.getIn(['login']).use,
    userType: state.getIn(['bossInfo']).userType || state.getIn(['geniusInfo']).userType || state.getIn(['login']).userType
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo(data) {
      dispatch(actionCreators.loadData(data[0]))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))
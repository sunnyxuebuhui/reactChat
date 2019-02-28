import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Result, List, WhiteSpace, Modal } from "antd-mobile"
import browserCookie from 'browser-cookies'
import { actionCreators } from '../../views/login/store'
import PropTypes from 'prop-types'


class User extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  render() {
    const { avatar, user, userType, company, title, desc, money } = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return (
      <div>
        <Result
          img={<img src={require(`../../statics/${avatar}.png`)}  style={{width: 56}} alt=""/>}
          title={user}
          message={userType === 'BOSS' ? company : null}
        />
        <List renderHeader={() => '简介'}>
          <Item multipleLine>
            {title}
            {desc ? desc.split('\n').map(v => <Brief key={v}>{v}</Brief>) : null}
            {money ? <Brief>薪资：{money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    )
  }

  logout() {
    const Alert = Modal.alert
    Alert('注销', '确认退出登录吗？', [
      {text: '取消',},
      {text: '确认', onPress: () => {
        browserCookie.erase('userId');
        this.context.router.history.push('/login');
        window.location.href = 'http://localhost:3000/login'
      }}
    ])
  }

}


const mapStateToProps = (state) => {
  return {
    user: state.getIn(['login']).user,
    userType: state.getIn(['login']).userType,
    avatar: state.getIn(['login']).avatar,
    title: state.getIn(['login']).title,
    company: state.getIn(['login']).company,
    desc: state.getIn(['login']).desc,
    money: state.getIn(['login']).money
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    logoutSubmit() {
      dispatch(actionCreators.getLogin())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User))


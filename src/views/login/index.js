import React, { Component } from 'react'
import Logo from '../../components/logo'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { Redirect } from 'react-router-dom'
import { List, InputItem, Button, WhiteSpace, WingBlank } from 'antd-mobile'

class Login extends Component{
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      pwd: null
    }
  }
  render() {
    const { handleLogin, redirectTo } = this.props
    return (
      <div>
        {redirectTo ? <Redirect to={redirectTo}/> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem onChange={(v) => this.handleChange('user', v)}>用户</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={(v) => this.handleChange('pwd', v)}>密码</InputItem>
            <WhiteSpace/>
            <WhiteSpace/>
            <Button type="primary" onClick={() => register(this.state)}>登录</Button>
            <WhiteSpace  size="xl"/>
            <Button type="primary" onClick={() => this.register()}>注册</Button>
          </List>
        </WingBlank>
      </div>
    )
  }

  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  register() {
    this.props.history.push('/register')
  }


}

const mapStateToProps = (state) => {
  return {
    redirectTo: state.getIn(['login']).redirectTo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogin(state) {
      dispatch(actionCreators.getLogin(state))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
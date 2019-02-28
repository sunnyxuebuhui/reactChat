import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { Redirect } from 'react-router-dom'
import Logo from '../../components/logo'
import { List, InputItem, Button, WhiteSpace, Radio, WingBlank} from 'antd-mobile'

class Register extends Component{
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      pwd: null,
      repeatPwd: null,
      userType: 'BOSS'
    }
  }

  render() {
    const RadioItem = Radio.RadioItem
    const { handleRegister, redirectTo } = this.props
    return (
      <div>
        {redirectTo ? <Redirect to={redirectTo}/> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
            <WhiteSpace/>
            <InputItem type="password" onChange={v => this.handleChange('repeatPwd', v)}>确认密码</InputItem>
            <WhiteSpace/>
            <RadioItem
              checked={this.state.userType === 'NIU'}
              onChange={() => this.handleChange('userType', 'NIU')}>牛人</RadioItem>
            <WhiteSpace/>
            <RadioItem
              checked={this.state.userType === 'BOSS'}
              onChange={() => this.handleChange('userType', 'BOSS')}>BOSS</RadioItem>
            <WhiteSpace  size="xl"/>
            <Button type="primary" onClick={() => handleRegister(this.state)}>注册</Button>
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
}

const mapStateToProps = (state, ownProps) => {
  return {
    redirectTo: state.getIn(['register']).redirectTo
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleRegister(state) {
      dispatch(actionCreators.getRegister(state))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
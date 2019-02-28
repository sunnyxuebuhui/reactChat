import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import AvatarSelector from '../../components/avatarSelector'
import { NavBar, Icon, InputItem, Button, WhiteSpace } from 'antd-mobile'

class GeniusInfo extends Component{
  constructor(props) {
    super(props)
    this.state = {
      title: null,
      money: null,
    }
  }

  render() {
    const { update } = this.props
    return (
      <div>
        <NavBar mode="dark"
                icon={<Icon type="left" />}
                rightContent={[]}>Genius信息
        </NavBar>
        <AvatarSelector selectAvatar={(v) => this.selectAvatar(v)}>
        </AvatarSelector>
        <WhiteSpace esize="xl" />
        <InputItem clear
                   placeholder="请输入招聘职位" 
                   onChange={(v)=>this.onChange('title',v)}>招聘职位
        </InputItem>
        <InputItem clear 
                   placeholder="请输入职位薪资"  
                   onChange={(v)=>this.onChange('money',v)}>职位薪资
        </InputItem>
        <WhiteSpace  size="xl"/>
        <WhiteSpace  size="xl"/>
        <Button onClick={()=>{update(this.state)}} type='primary' style={{position: 'fixed', bottom: '0', left: '0', width: '100%'}}>保存</Button>
      </div>
    )
  }

  onChange(k, v) {
    this.setState({
      [k]: v
    })
  }

  selectAvatar(imgname) {
    this.setState({
      avatar: imgname
    })
  }

}

const mapStateToProps = (state) => {
  return {
    userType: null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update(state) {
      dispatch(actionCreators.getUpdateGeniusInfo(state))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeniusInfo);

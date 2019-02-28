import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import AvatarSelector from '../../components/avatarSelector'
import { NavBar, Icon, InputItem, TextareaItem, Button, WhiteSpace } from 'antd-mobile'

class BossInfo extends Component{
  constructor(props) {
    super(props)
    this.state = {
      title: null,
      company: null,
      money: null,
      desc: null,
    }
  }

  render() {
    const { update } = this.props
    return (
      <div>
        <NavBar mode="dark"
                icon={<Icon type="left" />}
                rightContent={[]}>BOSS信息
        </NavBar>
        <AvatarSelector selectAvatar={(v) => this.selectAvatar(v)}>
        </AvatarSelector>
        <WhiteSpace esize="xl" />
        <InputItem clear
                   placeholder="请输入招聘职位" 
                   onChange={(v)=>this.onChange('title',v)}>招聘职位
        </InputItem>
        <InputItem clear 
                   placeholder="请输入公司名称"  
                   onChange={(v)=>this.onChange('company',v)}>公司名称
        </InputItem>
        <InputItem clear 
                   placeholder="请输入职位薪资"  
                   onChange={(v)=>this.onChange('money',v)}>职位薪资
        </InputItem>
        <TextareaItem placeholder="请输入职位要求"      
                      onChange={(v)=>this.onChange('desc',v)}
                      rows={3}
                      autoHeight
                      title='职位要求'>
        </TextareaItem>
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

const mapStateToProps = () => {
  return {
    userType: null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    update(state) {
      dispatch(actionCreators.getUpdateBossInfo(state))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BossInfo);

import React, { Component } from 'react'
import UserCard from '../userCard'
import axios from "axios";
import {Toast} from "antd-mobile";


class Boss extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userList: []
    }
  }
  componentDidMount() {
    Toast.loading('加载中...')
    axios.get(`/user/list?userType=${'BOSS'}`).then(res => {
      Toast.hide()
      this.setState({
        userList: res.data
      })
    }, err => {
      console.log(err)
      Toast.hide()
      Toast.info('服务异常')
    })
  }
  render() {
    return (
      <UserCard userList={this.state.userList}></UserCard>
    )
  }
}


export default Boss
import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { actionCreators } from '../../views/login/store'

class AuthRoute extends React.Component {
  componentDidMount() {
    const publishList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publishList.indexOf(pathname) > -1) return null

    Toast.loading('加载中...');
    axios.get('/user/info').then(res => {
      Toast.hide();
      if(res.status === 200) {
        if (res.data.code === 0) {
          // 有登录信息
          this.props.getUserInfo(res.data.data)
        } else {
          this.props.history.push('/login')
        }
      }
    }, err => {
      console.log(err)
      Toast.hide()
      Toast.info('服务异常') 
    })
  }

  render() {
    return null
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo(data) {
      console.log(data[0])
      dispatch(actionCreators.getLogin(data[0]))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthRoute))
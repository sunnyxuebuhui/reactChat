import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'antd-mobile'
import { withRouter } from 'react-router-dom'

class UserCard extends Component{
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`)
  }

  render() {
    const Header = Card.Header
    const Body = Card.Body
    return (
      <div>
        {this.props.userList.map((v, i) => (
          v.avatar ? (
            <Card full key={v._id + i} onClick={() => this.handleClick(v)} style={{marginBottom: 12, border: 'none'}}>
            <Header title={v.user}
                    thumb={require(`../../statics/${v.avatar}.png`)}
                    extra={<span style={{color: '#108ee9'}}>{v.title}</span>}>
            </Header>
            <Body>
              {v.userType === 'BOSS' ? <div>公司：{v.company}</div> : null}
              {v.desc.split('\n').map(d =>
                (<div key={d}>{d}</div>)
              )}
              {v.userType === 'BOSS' ? <div>薪资：{v.money}</div> : null}
            </Body>
          </Card>) : null
        ))}
      </div>
    )
  }
}

export default withRouter(UserCard)
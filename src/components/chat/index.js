import React, {Component} from 'react'
import { List, InputItem, NavBar, Icon, Grid } from "antd-mobile"
import { connect } from 'react-redux'
import { getMsglist, sendMsg, recvMsg, readMsg } from './index'
import { getChatId } from "../../libs/utils"
import QueueAnim from 'rc-queue-anim'

class  Chat extends Component{
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  handleSubmit() {
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text

    this.props.sendMsg({from, to, msg})
    this.setState({
      text: '',
      showEmoji: false
    })
  }
  fixCarousel() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
    })
  }


  render() {
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter(v=>v)
      .map(v=>({text:v}))
    const userid = this.props.match.params.user
    const Item  = List.Item
    const users = this.props.chat.users

    if (!users[userid]) return null

    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v =>  v.chatid === chatid)

    return (
      <div id='chat-page'>
        <NavBar mode='dark'
                icon={<Icon type="left"
                onLeftClick = {() => {this.props.history.goBack()}}></Icon>}>
          {users[userid].name}
        </NavBar>
        <QueueAnim delay={50}>
          {chatmsgs.map(v => {
            const avatar = require(`../../statics/${users[v.from].avatar}.png`)
            return v.from === userid ? (
              <List key={v._id}>
                <Item thumb={avatar}>{v.content}</Item>
              </List>
            ) : (
              <list key={v._id}>
                <Item extra={<img alt='头像' src={avatar} />}
                      className='chat-me'>
                  {v.content}
                </Item>
              </list>
            )
          })}
        </QueueAnim>
        <div className="stick-footer">
          <List>
            <InputItem placeholder='请输入'
                       value={this.state.text}
                       onChange={v => {this.setState({text: v})}}
                       extra={
                         <div>
                           <span style={{marginRight: 15}}
                                 onClick={() => {
                                   this.setState({
                                     showEmoji: !this.state.showEmoji
                                   })
                                   this.fixCarousel()
                                 }}>😊</span>
                           <span onClcik={() => this.handleSubmit()}>发送</span>
                         </div>
                       } />
          </List>
          {this.state.showEmoji ? <Grid date={emoji}
                                        columnNum={9}
                                        carouselMaxRow={4}
                                        isCarousel={true}
                                        onClick={el => {
                                          this.setState({
                                            text: this.state.text + el.text
                                          })
                                        }}></Grid> : null}
        </div>
      </div>
    )
  }

}

const mapStateToProps = () => {
  return {
    userType: null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);


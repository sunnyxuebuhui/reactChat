import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Grid, List} from 'antd-mobile'

class AvatarSelector extends Component{
  static propTypes = {
		selectAvatar: PropTypes.func.isRequired
  }
  
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
												.split(',')
												.map(v=>({
													icon: require(`../../statics/${v}.png`),
													text: v
                        }))
    const gridHeader = this.state.icon
												? (<div>
														<span>已选择头像</span>
														<img style={{width:22}} src={this.state.icon} alt=""/>
													</div>)
												: (<div>请选择头像</div>)
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum={4} 
            onClick={(v) => {
              this.selectAvatar(v)
              this.props.selectAvatar(v.text)
            }}
          />					
        </List>
      </div>
    )
  }
  selectAvatar(v) {
    this.setState(v)
  }
}


export default AvatarSelector
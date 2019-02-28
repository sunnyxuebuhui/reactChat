
import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import { actionCreators } from './store'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

class NavLinkBar extends React.Component{
	static propTypes = {
		data: PropTypes.array.isRequired
	}
	render(){
		const navList = this.props.data.filter( v => !v.hide)
		const {pathname} = this.props.location

		return (
			<div style={{position: 'fixed', height: '100%', width: '100%', top: 0, zIndex: -1}}>
				<TabBar>
					{navList.map(v => (
						<TabBar.Item
							key={v.path}
							title={v.text}
							icon={{uri: require(`./img/${v.icon}.png`)}}
							selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
							selected={pathname === v.path}
							onPress={() =>{
								this.props.history.push(v.path)
							}}
						>
						
						</TabBar.Item>
					))}
				</TabBar>
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
  
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
		handleRegister(state) {
      dispatch(actionCreators.getRegister(state))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavLinkBar))
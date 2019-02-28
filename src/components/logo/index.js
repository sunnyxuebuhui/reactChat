import React, { Component } from 'react'
import {LogoWrapper} from './style'
import LogoSrc from '../../statics/logo.png'

class Logo extends Component{
  render() {
    return (
      <LogoWrapper>
        <img src={LogoSrc} width="200" height="200" alt=""/>
      </LogoWrapper>
    )
  }
}

export default  Logo

import React, { Component } from 'react'
import eqlogo from 'images/EQometer_Logo_small.png'
import { Layout } from 'antd'
import NavMenu from './NavMenu'
import PropTypes from 'prop-types'
import './desktopSideBar.css'

const { Sider } = Layout

class DesktopSideBar extends Component {
  render () {
    const {
      selectedKey,
      collapsed,
      user,
      userAssessment,
      onLogout
    } = this.props

    return (
      <Sider
        className='nav-sider'
        breakpoint='lg'
        collapsedWidth='0'
        trigger={null}
        collapsed={collapsed}
      >
        <div className='navigation-logo'>
          <div className='eq-logo-wrapper'>
            <img alt='eqometer-logo' className='responsive-logo' src={eqlogo} />
          </div>
        </div>

        <NavMenu
          selectedKey={selectedKey}
          user={user}
          userAssessment={userAssessment}
          onLogout={onLogout}
        />
      </Sider>
    )
  }
}

DesktopSideBar.propTypes = {
  selectedKey: PropTypes.string,
  collapsed: PropTypes.bool,
  user: PropTypes.object,
  userAssessment: PropTypes.object,
  onLogout: PropTypes.func
}

export default DesktopSideBar

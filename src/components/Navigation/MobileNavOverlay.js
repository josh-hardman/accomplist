import React, { Component } from 'react'
import { Drawer, Icon, Divider } from 'antd'
import eqlogo from 'images/EQometer_Logo_small.png'
import { withRouter } from 'react-router-dom'
import './mobileNavOverlay.css'
import PropTypes from 'prop-types'

class MobileNavOverlay extends Component {
  routeTo = url => () => {
    const callback = () => {
      this.props.history.push(url)
    }

    this.props.closeSidebar(callback)
  }

  renderNavItem = (name, onClick) => (
    <li onClick={onClick}>
      <a>{name}</a>
    </li>
  )

  renderNavMenu = () => {
    const { userAssessment, onLogout } = this.props
    return (
      <ul className='mobile-nav-list'>
        {!userAssessment ||
          (!userAssessment.completed_at &&
            this.renderNavItem('Assessment', this.routeTo('/assessment')))}
        {this.renderNavItem('Dashboard', this.routeTo('/dashboard'))}
        {this.renderNavItem('Micro-learning', this.routeTo('/micro-learning'))}
        <Divider />
        {this.renderNavItem('Logout', onLogout)}
      </ul>
    )
  }

  render () {
    const { collapsed, toggleSidebar } = this.props
    return (
      <Drawer
        title={
          <div className='mobile-eq-logo-wrapper'>
            <img
              alt='eqometer-logo'
              className='mobile-responsive-logo'
              src={eqlogo}
            />
            <Icon
              onClick={toggleSidebar}
              className='close-mobile-nav'
              type='close'
            />
          </div>
        }
        height='100%'
        placement='top'
        closable={false}
        onClose={toggleSidebar}
        visible={collapsed}
      >
        {this.renderNavMenu()}
      </Drawer>
    )
  }
}

MobileNavOverlay.propTypes = {
  history: PropTypes.object,
  userAssessment: PropTypes.object,
  closeSidebar: PropTypes.func,
  collapsed: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  onLogout: PropTypes.func,
  selectedKey: PropTypes.string
}

export default withRouter(MobileNavOverlay)

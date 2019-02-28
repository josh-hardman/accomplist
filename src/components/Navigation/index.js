import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import './style.css'

class NavigationBar extends Component {
  render () {
    const { handleLogout, children } = this.props

    return (
      <div>
        <Button size='small' onClick={handleLogout}>
          Logout
        </Button>
        {children}
      </div>
    )
  }
}

NavigationBar.propTypes = {
  handleLogout: PropTypes.func,
  location: PropTypes.object,
  user: PropTypes.object,
  userAssessment: PropTypes.object,
  children: PropTypes.node
}

export default withRouter(NavigationBar)

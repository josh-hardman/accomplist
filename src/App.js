import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import { withRouter } from 'react-router-dom'
import Routes from './Routes.js'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import './App.css'

@inject('store')
@observer
class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    forcePasswordReset: false
  }

  componentDidMount () {
    this.getCurrentSession()
    this.setState({ isAuthenticating: false })
  }

  getCurrentSession = () => {
    return Auth.currentSession()
      .then(async session => {
        localStorage.setItem('authorization', session.getAccessToken().jwtToken)

        await this.props.store.getEssentialUserInfo()

        this.userHasAuthenticated(true)
      })
      .catch(error => {
        if (error !== 'No current user') {
          console.log(error)
        }
      })
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated })
  }

  setForcePasswordReset = isForceReset => {
    this.setState({ forcePasswordReset: isForceReset })
  }

  handleLogout = async () => {
    await Auth.signOut()
    window.localStorage.removeItem('authorization')
    this.userHasAuthenticated(false)
    this.setForcePasswordReset(false)
    this.props.history.push('/login')
    this.props.store.reset()
  }

  render () {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      handleLogout: this.handleLogout,
      setForcePasswordReset: this.setForcePasswordReset,
      forcePasswordReset: this.state.forcePasswordReset,
      user: this.props.store.user,
      userAssessment: this.props.store.userAssessment
    }

    return (
      !this.state.isAuthenticating &&
      !this.state.setForcePasswordReset && (
        <div className='app-container'>
          <div className='route-container'>
            <Routes childProps={childProps} />
          </div>
        </div>
      )
    )
  }
}

App.propTypes = {
  history: PropTypes.object,
  fetchCurrentUserInfo: PropTypes.func,
  checkStatus: PropTypes.func,
  user: PropTypes.object,
  store: PropTypes.object
}

export default withRouter(App)

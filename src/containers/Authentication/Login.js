import React, { Component, Fragment } from 'react'
import { Form, Input, Button, Icon, Divider } from 'antd'
import { observer, inject } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import throwNotification from 'utils/throwNotification'
import ResetPasswordModal from './ResetPasswordModal'
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import PropTypes from 'prop-types'
import logo from 'images/Logo.png'
import './style.css'

const hasErrors = fieldsError => {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

@inject('store')
@observer
class Login extends Component {
  state = {
    isLoading: false,
    isSendingEmail: false,
    showModal: false
  }

  componentDidMount () {
    const signupSuccess = !!this.props.match.params.signupSuccess

    if (signupSuccess) {
      throwNotification({ type: 'success', message: 'Sign up successful' })
    }
  }

  setShowModal = visible => {
    this.setState({
      showModal: visible
    })
  }

  signIn = async () => {
    // MobX call
    await this.props.store.getEssentialUserInfo()

    this.props.userHasAuthenticated(true)
    this.setState({ isLoading: false })
  }

  setJwt = token => {
    localStorage.setItem('authorization', token)
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ isLoading: true })

        const { email, password, newPassword } = values

        Auth.signIn(email, password)
          .then(async user => {
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
              this.props.setForcePasswordReset(true)

              if (newPassword) {
                Auth.completeNewPassword(user, newPassword)
                  .then(user => {
                    this.setJwt(user.signInUserSession.accessToken.jwtToken)

                    this.signIn()
                  })
                  .catch(err => {
                    throwNotification({ type: 'error', message: err.message })
                  })
              }
            } else {
              this.setJwt(user.signInUserSession.accessToken.jwtToken)
              this.signIn()
            }
          })
          .catch(e => {
            if (e.code === 'UserNotConfirmedException') {
              throwNotification({
                type: 'error',
                message: e.message,
                description: (
                  <a href={`/confirmation/${email}`}>Confirm user</a>
                )
              })
            } else {
              throwNotification({ type: 'error', message: e.message })
            }
          })
          .finally(() => {
            this.setState({ isLoading: false })
          })
      }
    })
  }

  handleSubmitResetPassword = email => {
    this.setState({
      isSendingEmail: true
    })

    Auth.forgotPassword(email)
      .then(() => {
        window.location.href = `/reset-password/${email}`
      })
      .catch(err => {
        throwNotification({ type: 'error', message: err.message })
      })
      .finally(() => {
        this.setState({
          isSendingEmail: false,
          showModal: false
        })
      })
  }

  handleCancelResetPassword = () => {
    this.setState({
      showModal: false
    })
  }

  render () {
    const { getFieldsError, getFieldDecorator, getFieldValue } = this.props.form
    const { isLoading, isSendingEmail } = this.state
    const { forcePasswordReset } = this.props
    const email = getFieldValue('email')

    return (
      <Fragment>
        <ResetPasswordModal
          visible={this.state.showModal}
          onCancel={this.handleCancelResetPassword}
          onSubmit={this.handleSubmitResetPassword}
          isSendingEmail={isSendingEmail}
          email={email}
        />
        <Form
          name='login'
          style={{ height: '100%' }}
          onSubmit={this.handleSubmit}
        >
          <div className='auth-wrapper'>
            <div className='auth'>
              <div className='auth-top'>
                <img src={logo} alt='logo' />
                <h3 className='auth-text'>Login</h3>
              </div>
              <div className='auth-form'>
                <div className='auth-fields'>
                  <Form.Item label='Email'>
                    {getFieldDecorator('email', {
                      normalize: value =>
                        value ? value.trim().toLowerCase() : value,
                      rules: [
                        {
                          required: true,
                          message: 'Please input your email'
                        }
                      ]
                    })(
                      <Input
                        autoCapitalize='none'
                        prefix={
                          <Icon
                            type='user'
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        placeholder='Email'
                        autoComplete='username email'
                        size='large'
                      />
                    )}
                  </Form.Item>
                  <Form.Item label='Password'>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input your password'
                        }
                      ]
                    })(
                      <Input
                        prefix={
                          <Icon
                            type='lock'
                            style={{ color: 'rgba(0,0,0,.25)' }}
                          />
                        }
                        type='password'
                        autoComplete='current-password'
                        placeholder='Password'
                        size='large'
                      />
                    )}
                  </Form.Item>
                  {forcePasswordReset && (
                    <Form.Item label='New Password'>
                      {getFieldDecorator('newPassword', {
                        rules: [
                          {
                            required: true,
                            message: 'Please input your new password'
                          }
                        ]
                      })(
                        <Input
                          prefix={
                            <Icon
                              type='lock'
                              style={{ color: 'rgba(0,0,0,.25)' }}
                            />
                          }
                          type='password'
                          placeholder='New Password'
                          size='large'
                        />
                      )}
                    </Form.Item>
                  )}
                </div>
              </div>
              <div className='auth-bottom'>
                <Form.Item className='auth-button'>
                  <Button
                    type='secondary'
                    htmlType='submit'
                    size='large'
                    disabled={hasErrors(getFieldsError()) || isLoading}
                    style={{ width: '100%' }}
                    loading={isLoading}
                  >
                    Login
                  </Button>
                </Form.Item>
                <div style={{ padding: '8px' }}>
                  <Link to='/signup'>Sign up</Link>
                  <Divider type='vertical' />
                  <a onClick={() => this.setShowModal(true)}>Reset password</a>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Fragment>
    )
  }
}

export default withRouter(Form.create()(Login))

Login.propTypes = {
  form: PropTypes.object,
  match: PropTypes.object,
  checkStatus: PropTypes.func,
  userHasAuthenticated: PropTypes.func,
  setUserRole: PropTypes.func,
  fetchCurrentUserInfo: PropTypes.func,
  setForcePasswordReset: PropTypes.func,
  forcePasswordReset: PropTypes.bool,
  store: PropTypes.object
}

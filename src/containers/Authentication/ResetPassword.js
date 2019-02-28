import React, { Component } from 'react'
import { Auth } from 'aws-amplify'
import { Form, Input, Button } from 'antd'
import throwNotification from 'utils/throwNotification'
import logo from 'images/Logo.png'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

class ResetPassword extends Component {
  state = {
    isLoading: false,
    isSubmitted: false
  }
  handleResetPassword = e => {
    e.preventDefault()
    const email = this.props.match.params.email

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { code, newPassword } = values

        this.setState({
          isLoading: true
        })

        Auth.forgotPasswordSubmit(email, code, newPassword)
          .then(() => {
            this.setState({
              isSubmitted: true
            })
            throwNotification({
              type: 'success',
              message: 'Password successfuly reset',
              onClose: () => (window.location.href = '/login')
            })
          })
          .catch(err => {
            throwNotification({ type: 'error', message: err.message })
          })
          .finally(() => {
            this.setState({
              isLoading: false
            })
          })
      }
    })
  }

  render () {
    const { getFieldDecorator, getFieldsError } = this.props.form
    const { isLoading, isSubmitted } = this.state

    const hasErrors = fieldsError => {
      return Object.keys(fieldsError).some(field => fieldsError[field])
    }

    return (
      <Form
        name='reset-password'
        style={{ height: '100%' }}
        onSubmit={this.handleResetPassword}
      >
        <div className='auth-wrapper'>
          <div className='auth'>
            <div className='auth-top'>
              <img src={logo} alt='logo' />
              <h3 className='auth-text'>Reset Password</h3>
            </div>
            <div className='auth-form'>
              <div className='auth-fields'>
                <Form.Item label='Code'>
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your reset code'
                      }
                    ]
                  })(
                    <Input
                      name='resetCode'
                      placeholder='Reset Code'
                      size='large'
                    />
                  )}
                </Form.Item>
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
                      name='newPassword'
                      type='password'
                      placeholder='New Password'
                      size='large'
                    />
                  )}
                </Form.Item>
              </div>
            </div>
            <div className='auth-bottom'>
              <Form.Item className='auth-button'>
                <Button
                  type='secondary'
                  htmlType='submit'
                  size='large'
                  disabled={
                    hasErrors(getFieldsError()) || isSubmitted || isLoading
                  }
                  style={{ width: '100%' }}
                  loading={isLoading}
                >
                  Reset Password
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    )
  }
}

ResetPassword.propTypes = {
  form: PropTypes.object,
  match: PropTypes.object
}

export default withRouter(Form.create()(ResetPassword))

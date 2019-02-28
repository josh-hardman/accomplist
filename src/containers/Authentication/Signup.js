import React, { Component } from 'react'
import { Form, Input, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import logo from 'images/Logo.png'
import { Auth } from 'aws-amplify'
import throwNotification from 'utils/throwNotification'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import './style.css'

const hasErrors = fieldsError => {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

@inject('store')
@observer
class Signup extends Component {
  state = {
    confirmDirty: false,
    isLoading: false
  }

  handleConfirmBlur = e => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Your password must match')
    } else {
      callback()
    }
  }

  handleSubmit = async event => {
    event.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      const { email, password } = values

      if (!err) {
        this.setState({ isLoading: true })
        const newUser = {
          username: email,
          password: password
        }
        Auth.signUp(newUser)
          .then(() => {
            this.props.history.push(`/confirmation/${email}`)
          })
          .catch(err => {
            throwNotification({
              type: 'error',
              message: err.message
            })
          })
          .finally(() => {
            this.setState({ isLoading: false })
          })
      }
    })
  }

  renderForm () {
    const { getFieldDecorator } = this.props.form
    const { getFieldsError } = this.props.form
    const { isLoading } = this.state

    return (
      <Form style={{ height: '100%' }} onSubmit={this.handleSubmit}>
        <div className='auth-wrapper'>
          <div className='auth'>
            <div className='auth-top'>
              <img src={logo} alt='logo' />
              <h3 className='auth-text'>Sign Up</h3>
            </div>
            <div className='auth-form'>
              <div className='auth-fields'>
                <Form.Item
                  label='First Name'
                  style={{ width: '50%', paddingRight: '4px' }}
                >
                  {getFieldDecorator('firstName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your first name'
                      }
                    ]
                  })(<Input placeholder='First Name' size='large' />)}
                </Form.Item>
                <Form.Item
                  label='Last Name'
                  style={{ width: '50%', paddingLeft: '4px' }}
                >
                  {getFieldDecorator('lastName', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your last name'
                      }
                    ]
                  })(<Input placeholder='Last Name' size='large' />)}
                </Form.Item>
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
                      prefix={
                        <Icon
                          type='user'
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      placeholder='Email'
                      autoCapitalize='none'
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
                      placeholder='Password'
                      size='large'
                    />
                  )}
                </Form.Item>
                <Form.Item label='Confirm Password'>
                  {getFieldDecorator('confirmPassword', {
                    rules: [
                      {
                        required: true,
                        message: 'Please conform your password'
                      },
                      {
                        validator: this.compareToFirstPassword
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
                      onBlur={this.handleConfirmBlur}
                      placeholder='ConfirmPassword'
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
                  disabled={hasErrors(getFieldsError()) || isLoading}
                  style={{ width: '100%' }}
                  loading={isLoading}
                >
                  Sign Up
                </Button>
              </Form.Item>
              <div>
                {`Already have an account?`}
                <Link to='/login'> Login</Link>
              </div>
            </div>
          </div>
        </div>
      </Form>
    )
  }

  render () {
    return this.renderForm()
  }
}

Signup.propTypes = {
  userHasAuthenticated: PropTypes.func,
  history: PropTypes.object,
  form: PropTypes.object,
  store: PropTypes.object
}

export default Form.create()(Signup)

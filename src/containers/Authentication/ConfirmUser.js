import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import throwNotification from 'utils/throwNotification'
import logo from 'images/Logo.png'
import { Auth } from 'aws-amplify'
import PropTypes from 'prop-types'

const hasErrors = fieldsError => {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class Confirmation extends Component {
  state = {
    isLoading: false
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      const { code } = values
      const username = this.props.match.params.email

      this.setState({
        isLoading: true
      })

      if (!err) {
        try {
          await Auth.confirmSignUp(username, code)
          this.props.history.push('/login/success')
        } catch (e) {
          throwNotification({
            type: 'error',
            message: e.message
          })
        }
      }

      this.setState({
        isLoading: false
      })
    })
  }

  render () {
    const { getFieldsError, getFieldDecorator } = this.props.form
    const { isLoading } = this.state

    return (
      <Form style={{ height: '100%' }} onSubmit={this.handleConfirmationSubmit}>
        <div className='auth-wrapper'>
          <div className='auth'>
            <div className='auth-top'>
              <img src={logo} alt='logo' />
              <h3 className='auth-text'>Sign Up</h3>
            </div>
            <div className='auth-form'>
              <div className='auth-fields'>
                <Form.Item label='Confirmation Code'>
                  {getFieldDecorator('code', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter your confirmation code'
                      }
                    ]
                  })(<Input size='large' />)}
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
                  Submit
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    )
  }
}

Confirmation.propTypes = {
  form: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(Form.create()(Confirmation))

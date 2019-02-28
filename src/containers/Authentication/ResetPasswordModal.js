import React, { Component } from 'react'
import { Form, Input, Icon, Modal } from 'antd'
import PropTypes from 'prop-types'

class ResetPasswordModal extends Component {
  onSubmitReset = () => {
    const { onSubmit } = this.props
    const { getFieldValue } = this.props.form

    const email = getFieldValue('email')
    onSubmit(email)
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { email, visible, onCancel, isSendingEmail } = this.props

    return (
      <Modal
        visible={visible}
        title='Send a reset code to your email'
        okText='Send'
        onCancel={onCancel}
        confirmLoading={isSendingEmail}
        onOk={this.onSubmitReset}
      >
        <Form>
          <Form.Item label='Email'>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: 'Please input your email'
                }
              ],
              initialValue: email
            })(
              <Input
                prefix={
                  <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='Email'
                autoCapitalize='none'
                size='large'
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

ResetPasswordModal.propTypes = {
  form: PropTypes.object,
  email: PropTypes.string,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  isSendingEmail: PropTypes.bool,
  onSubmit: PropTypes.func
}

export default Form.create()(ResetPasswordModal)

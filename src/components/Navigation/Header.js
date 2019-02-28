import React, { Component } from 'react'
import {
  Layout,
  Icon,
  Avatar,
  Button,
  Popover,
  List,
  Divider,
  Modal
} from 'antd'
import ReactMarkdown from 'react-markdown'
import privacyPolicyMarkdown from 'templates/privacyPolicy.md'
import MediaQuery from 'react-responsive'
import PropTypes from 'prop-types'
import './header.css'
import Axios from 'axios'

const { Header } = Layout

const supportEmail = 'eqometer@leaderfactor.com'

class NavHeader extends Component {
  state = {
    privacyPolicyVisible: false,
    helpPopoverVisible: false,
    markdown: ''
  }

  componentWillMount () {
    Axios({
      method: 'get',
      url: privacyPolicyMarkdown
    }).then(res => {
      this.setState({ markdown: res.data })
    })
  }

  otherActions = <a onClick={this.props.handleLogout}>Logout</a>

  helpMenu = handleHelpVisibleChange => (
    <div>
      <List.Item>
        <List.Item.Meta
          title={
            <div className='questions-menu-item-container'>
              <Icon type='mail' className='questions-menu-item-icon' />
              <a href={`mailto:${supportEmail}`}>{supportEmail}</a>
            </div>
          }
        />
      </List.Item>
      <Divider style={{ margin: 0 }} />
      <List.Item>
        <List.Item.Meta
          title={
            <div className='questions-menu-item-container'>
              <Icon type='lock' className='questions-menu-item-icon' />
              <a
                onClick={() => {
                  this.setState({ privacyPolicyVisible: true })
                  handleHelpVisibleChange(false)
                }}
              >
                Privacy Policy
              </a>
            </div>
          }
        />
      </List.Item>
    </div>
  )

  handleHelpVisibleChange = visible => {
    this.setState({ helpPopoverVisible: visible })
  }

  render () {
    const { user, toggleSidebar } = this.props
    const { privacyPolicyVisible, helpPopoverVisible, markdown } = this.state

    return (
      <Header>
        <div className='nav-avatar-container'>
          <a className='nav-collapse-icon' onClick={toggleSidebar}>
            <Icon type={'ellipsis'} />
          </a>
          <div className='nav-user-wrapper'>
            <Avatar
              style={{
                color: '#EC7C2F',
                backgroundColor: '#DEDBD7',
                fontSize: '18px'
              }}
            >
              {user.email ? user.email[0].toUpperCase() : ''}
            </Avatar>
            <span style={{ padding: '8px' }}>{user.email}</span>
            <Divider type='vertical' />
            <Popover
              arrowPointAtCenter
              trigger={['click', 'hover']}
              visible={helpPopoverVisible}
              onVisibleChange={this.handleHelpVisibleChange}
              content={this.helpMenu(this.handleHelpVisibleChange)}
              placement='bottomRight'
            >
              <Button shape='circle' size='small' icon='question' />
            </Popover>
            <MediaQuery minDeviceWidth={600}>
              <Divider type='vertical' />
              <Popover
                arrowPointAtCenter
                trigger={['click', 'hover']}
                content={this.otherActions}
                placement='bottomRight'
              >
                <Icon type='down' />
              </Popover>
            </MediaQuery>
          </div>
        </div>
        <Modal
          title='Privacy Policy'
          visible={privacyPolicyVisible}
          onCancel={() => this.setState({ privacyPolicyVisible: false })}
          footer={null}
          width={800}
        >
          <ReactMarkdown source={markdown} />
        </Modal>
      </Header>
    )
  }
}
NavHeader.propTypes = {
  user: PropTypes.object,
  collapsed: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  handleLogout: PropTypes.func
}

export default NavHeader

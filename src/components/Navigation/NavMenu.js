import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { SUPER_ADMIN, ADMIN } from 'constants/roles'
import { Icon, Menu } from 'antd'
import PropTypes from 'prop-types'

const { SubMenu, Item } = Menu

const renderSuperAdminTab = (
  <SubMenu
    key='super-admin'
    title={
      <Fragment>
        <Icon type='thunderbolt' /> <a>Super Admin</a>
      </Fragment>
    }
  >
    <Item key='/super-admin/users'>
      <Link to='/super-admin/users'>
        <Icon type='user' />
        Users
      </Link>
    </Item>
    <Item key='/super-admin/questions'>
      <Link to='/super-admin/questions'>
        <Icon type='edit' />
        Questions
      </Link>
    </Item>
    <Item key='/super-admin/organizations'>
      <Link to='/super-admin/organizations'>
        <Icon type='shop' />
        Organizations
      </Link>
    </Item>
  </SubMenu>
)

const renderAdminTab = (
  <SubMenu
    key='admin'
    title={
      <Fragment>
        <Icon type='tool' /> <a>Admin</a>
      </Fragment>
    }
  >
    <Item key='/admin/participants'>
      <Link to='/admin/participants'>
        <Icon type='user' />
        Participants
      </Link>
    </Item>
    <Item key='/admin/credits'>
      <Link to='/admin/credits'>
        <Icon type='dollar' />
        Credits
      </Link>
    </Item>
  </SubMenu>
)

const NavMenu = ({ selectedKey, user, userAssessment, onLogout }) => {
  const showAssessmentTab = !userAssessment || !userAssessment.completed_at
  const showDashboardTab = userAssessment && userAssessment.completed_at

  return (
    <Menu
      mode='inline'
      selectedKeys={[selectedKey]}
      defaultOpenKeys={['super-admin', 'admin', 'micro-learning']}
    >
      {showAssessmentTab && (
        <Item key='/assessment'>
          <Link to='/assessment'>
            <Icon type='solution' />
            Assessment
          </Link>
        </Item>
      )}
      {showDashboardTab && (
        <Item key='/dashboard'>
          <Link to='/dashboard'>
            <Icon type='pie-chart' />
            Dashboard
          </Link>
        </Item>
      )}

      <Item key='/micro-learning'>
        <Link to='/micro-learning'>
          <Icon type='play-circle' />
          Micro-learning
        </Link>
      </Item>
      {user.role_id === SUPER_ADMIN && renderSuperAdminTab}
      {user.role_id === ADMIN && renderAdminTab}
    </Menu>
  )
}

NavMenu.propTypes = {
  selectedKey: PropTypes.string,
  user: PropTypes.object,
  userAssessment: PropTypes.object,
  onLogout: PropTypes.func
}

export default NavMenu

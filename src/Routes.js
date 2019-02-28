import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from 'containers/Home'
import NotFound from 'containers/NotFound'
import { Login, ResetPassword } from 'containers/Authentication'
import AuthenticatedRoute from 'components/AuthenticatedRoute'
import UnauthenticatedRoute from 'components/UnauthenticatedRoute'
import { Signup } from 'containers/Authentication'
import ConfirmUser from './containers/Authentication/ConfirmUser'
import PropTypes from 'prop-types'

const Routes = ({ childProps }) => (
  <Switch>
    <UnauthenticatedRoute
      path='/login'
      exact
      component={Login}
      props={childProps}
    />
    <UnauthenticatedRoute
      path='/login/:signupSuccess'
      exact
      component={Login}
      props={childProps}
    />
    <UnauthenticatedRoute
      path='/reset-password/:email'
      exact
      component={ResetPassword}
      props={childProps}
    />
    <UnauthenticatedRoute
      path='/confirmation/:email'
      exact
      component={ConfirmUser}
      props={childProps}
    />
    <UnauthenticatedRoute
      path='/signup'
      exact
      component={Signup}
      props={childProps}
    />
    <AuthenticatedRoute path='/' exact component={Home} props={childProps} />
    <UnauthenticatedRoute path='/' exact component={Login} props={childProps} />
    <Route component={NotFound} />
  </Switch>
)

Routes.propTypes = {
  childProps: PropTypes.object
}

export default Routes

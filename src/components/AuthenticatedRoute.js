import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Navigation from 'components/Navigation'
import PropTypes from 'prop-types'

export const AuthenticatedRoute = ({
  component: C,
  props: cProps,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        cProps.isAuthenticated ? (
          <Fragment>
            <Navigation handleLogout={cProps.handleLogout} {...cProps}>
              <C {...props} {...cProps} />
            </Navigation>
          </Fragment>
        ) : (
          <Redirect
            to={`/login?redirect=${props.location.pathname}${
              props.location.search
            }`}
          />
        )
      }
    />
  )
}

AuthenticatedRoute.propTypes = {
  component: PropTypes.func,
  props: PropTypes.object,
  authorization: PropTypes.array,
  location: PropTypes.object,
  handleLogout: PropTypes.func
}

export default AuthenticatedRoute

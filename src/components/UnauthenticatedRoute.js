import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const querystring = (name, url = window.location.href) => {
  name = name.replace(/[[]]/g, '\\$&')

  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)', 'i')
  const results = regex.exec(url)

  if (!results) {
    return null
  }
  if (!results[2]) {
    return ''
  }

  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

const UnauthenticatedRoute = ({ component: C, props: cProps, ...rest }) => {
  let defaultRedirect = '/'
  const redirect = querystring('redirect')

  return (
    <Route
      {...rest}
      render={props =>
        !cProps.isAuthenticated ? (
          <C {...props} {...cProps} />
        ) : (
          <Redirect to={redirect || defaultRedirect} />
        )
      }
    />
  )
}

UnauthenticatedRoute.propTypes = {
  component: PropTypes.func,
  props: PropTypes.object
}

export default UnauthenticatedRoute

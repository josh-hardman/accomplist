import React from 'react'
import './style.css'
import { Card } from 'antd'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const NotAuthorized = props => (
  <div className='not-authorized'>
    <Card title='Unauthorized' style={{ width: 400 }}>
      <p>{`You don't have permission to view this page`}</p>
      <p>
        {`If you feel you have reached this page by mistake, please contact your administrator.`}
      </p>
      <a onClick={props.history.goBack}>Return to the previous page</a>
    </Card>
  </div>
)

export default withRouter(NotAuthorized)

NotAuthorized.propTypes = {
  previousPage: PropTypes.string,
  history: PropTypes.object
}

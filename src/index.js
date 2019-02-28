import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as MobxProvider } from 'mobx-react'
import App from './App'
import Amplify from 'aws-amplify'
import Store from './store'
import 'video-react/dist/video-react.css'
import './index.css'

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: process.env.REACT_APP_REGION,
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_APP_CLIENT_ID
  }
})

ReactDOM.render(
  <Router>
    <MobxProvider store={Store}>
      <App />
    </MobxProvider>
  </Router>,
  document.getElementById('root')
)

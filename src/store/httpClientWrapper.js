import axios from 'axios'

export default ({ method, url, data, contentType = 'application/json' }) => {
  const fullUrl = process.env.REACT_APP_API + '/api' + url
  const authToken = window.localStorage.getItem('authorization')

  return new Promise((resolve, reject) => {
    axios({
      data,
      headers: {
        Authorization: authToken,
        'Content-Type': contentType
      },
      method,
      url: fullUrl
    })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err.response)
      })
  })
}

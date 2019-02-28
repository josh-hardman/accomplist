import { notification } from 'antd'

export default ({ type, message, description, onClose, duration }) => {
  notification[type]({
    message,
    description,
    duration,
    onClose
  })
}

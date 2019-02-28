// import httpClient from 'store/httpClientWrapper'
import { Auth } from 'aws-amplify'
import { observable } from 'mobx'

// todo: Split calls out into separate stores
class Store {
  @observable email = null

  reset = () => {
    this.email = null
  }

  getEssentialUserInfo = async () => {
    const currentUserInfo = await Auth.currentUserInfo()

    if (currentUserInfo) {
      const email = currentUserInfo.attributes['email']

      this.email = email
      return email
    }
  }
}

const singleton = new Store()
export default singleton

import { isNil } from 'lodash'

export default {
  newContentAvailable: state => !isNil(state.SWRegistrationForNewContent),
  getAppTitle: state => routeName => {
    if (!isNil(state.appBarTitle)) {
      return state.appBarTitle
    }
    return routeName
  }
}

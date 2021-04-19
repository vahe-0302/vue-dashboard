export default {
  setNetworkOnline: (state, value) => (state.networkOnLine = value),
  setSWRegistrationForNewContent: (state, value) =>
    (state.SWRegistrationForNewContent = value),
  setShowAddToHomeScreenModalForApple: (state, value) =>
    (state.showAddToHomeScreenModalForApple = value),
  setRefreshingApp: (state, value) => (state.refreshingApp = value),
  setCustomAppBarTitle: (state, title) => (state.appBarTitle = title),
  clearCustomAppBarTitle: state => (state.appBarTitle = null)
}

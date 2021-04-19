export default {
  /**
   * Reset the snackar state
   * @param {*} state
   */
  resetSnackbar(state) {
    state.show = false
    state.color = 'success'
    state.text = ''
  },
  setSnackbar(state, data) {
    state.show = data.show
    state.color = data.color ? data.color : 'success'
    state.text = data.text
  }
}

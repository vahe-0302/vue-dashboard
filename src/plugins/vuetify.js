import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#4caf50',
        secondary: '#087f23',
        accent: '#795548',
        error: '#b71c1c'
      }
    }
  }
})

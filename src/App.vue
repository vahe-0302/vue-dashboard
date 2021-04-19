<template>
  <v-app>
    <nav-drawer :show-drawer="showDrawer" @closeDrawer="showDrawer = false" />
    <v-app-bar app color="primary" dark>
      <v-btn text icon color="white" @click="leftButtonAction">
        <v-icon>{{ leftButtonIcon }}</v-icon>
      </v-btn>
      <v-toolbar-title>
        {{ currentAppTitle }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <v-container fluid class="container">
        <!-- <v-row align="center" justify="center"> -->
        <!-- <v-col cols="12"> -->
        <!-- <v-row align="center" justify="center"> -->
        <router-view class="router-container" />
        <!-- </v-row> -->
        <!-- </v-col> -->
        <!-- </v-row> -->
      </v-container>
      <new-content-available-toastr
        v-if="newContentAvailable"
        class="new-content-available-toastr"
        :refreshing-app="refreshingApp"
        @refresh="serviceWorkerSkipWaiting"
      ></new-content-available-toastr>
      <apple-add-to-home-screen-modal
        v-if="showAddToHomeScreenModalForApple"
        class="apple-add-to-home-screen-modal"
        @close="closeAddToHomeScreenModalForApple(false)"
      >
      </apple-add-to-home-screen-modal>
      <Snackbar />
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import NewContentAvailableToastr from '@/components/NewContentAvailableToastr'
import AppleAddToHomeScreenModal from '@/components/AppleAddToHomeScreenModal'
import NavDrawer from '@/components/NavDrawer'
import Snackbar from '@/components/Snackbar'

export default {
  name: 'App',
  components: {
    NewContentAvailableToastr,
    AppleAddToHomeScreenModal,
    NavDrawer,
    Snackbar
  },
  data() {
    return {
      showDrawer: false
    }
  },
  computed: {
    ...mapGetters('app', ['newContentAvailable', 'getAppTitle']),
    ...mapState('app', ['showAddToHomeScreenModalForApple', 'refreshingApp']),
    ...mapState('route', ['from']),
    currentAppTitle() {
      return this.getAppTitle(this.$route.name)
    },
    leftButtonIcon() {
      if (this.$route.meta.backRoute) {
        return 'mdi-chevron-left'
      }
      return 'mdi-menu'
    }
  },
  async beforeMount() {
    await this.fetchFeedstocks()
  },
  methods: {
    leftButtonAction() {
      if (this.$route.meta.backRoute) {
        if (this.from.name === 'check-login') {
          this.$router.push({ name: this.$route.meta.backRoute })
        } else {
          this.$router.go(-1)
        }
      } else {
        this.toggleDrawer()
      }
    },
    toggleDrawer() {
      this.showDrawer = !this.showDrawer
    },
    ...mapActions('app', [
      'fetchFeedstocks',
      'closeAddToHomeScreenModalForApple',
      'serviceWorkerSkipWaiting'
    ])
  }
}
</script>

<style lang="scss" scoped>
body {
  #app {
    .new-content-available-toastr {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
}

.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.router-container {
  width: 100%;
  max-width: 500px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

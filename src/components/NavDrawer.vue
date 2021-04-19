<template>
  <v-navigation-drawer
    v-model="showDrawerComputed"
    app
    @input="checkHideDrawer"
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title"> Recipe Calculator </v-list-item-title>
        <v-list-item-subtitle>
          {{ user ? user.email : '' }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-item-group v-model="selectedItem">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="item.action"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>

      <v-list-item v-if="user" link @click="logout">

        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import firebase from 'firebase/app'
import { mapMutations, mapState } from 'vuex'
import router from '../router'

export default {
  props: {
    showDrawer: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selectedItem: 0,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          action() {
            router.push({ name: 'Home' }).catch(err => {
              console.log('TCL: action -> err', err)
            })
          }
        },
        {
          icon: 'mdi-calculator',
          title: 'Calculator',
          action() {
            router.push({ name: 'Recipe calculator' }).catch(err => {
              console.log('TCL: action -> err', err)
            })
          }
        },
        {
          icon: 'mdi-format-list-bulleted',
          title: 'Feedstocks',
          action() {
            router.push({ name: 'Feedstocks' }).catch(err => {
              console.log('TCL: action -> err', err)
            })
          }
        },
        {
          icon: 'mdi-star',
          title: 'myFeedstocks',
          action() {
            router.push({ name: 'My Feedstocks' }).catch(err => {
              console.log('TCL: action -> err', err)
            })
          }
        },
        {
          icon: 'mdi-chart-bar',
          title: 'myRecipes',
          action() {
            router.push({ name: 'My Recipes' }).catch(err => {
              console.log('TCL: action -> err', err)
            })
          }
        },
        {
          icon: 'mdi-cog',

          title: 'Settings',
          action() {
            router.push({ name: 'Settings' }).catch(err => {
              console.log('TCL: action -> err', err)
            })
          }
        }
      ]
    }
  },
  computed: {
    showDrawerComputed: {
      get() {
        return this.showDrawer
      },
      set() {
        return null
      }
    },
    ...mapState('authentication', ['user'])
  },
  methods: {
    ...mapMutations('snackbar', ['setSnackbar']),
    async logout() {
      await firebase
        .auth()
        .signOut()
        .then(() => {
          this.setSnackbar({
            show: true,
            text: 'You have been signed out!'
          })
        })
    },
    checkHideDrawer(show) {
      if (!show) {
        this.$emit('closeDrawer')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <v-row justify="center">
    <v-btn color="accent" @click="logout">
      Logout
    </v-btn>
  </v-row>
</template>

<script>
import firebase from 'firebase/app'

export default {
  methods: {
    async logout() {
      await firebase.auth().signOut()
    }
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <v-snackbar v-model="localShow" :color="color">
    {{ text }}
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('snackbar', ['show', 'color', 'text']),
    localShow: {
      get() {
        return this.show
      },
      set() {
        this.resetSnackbar()
      }
    }
  },
  methods: {
    ...mapMutations('snackbar', ['resetSnackbar'])
  }
}
</script>

<style lang="scss" scoped></style>

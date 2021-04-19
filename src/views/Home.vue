<template>
  <div>
    <div style="width: 100%" class="pa-4">
      <v-row justify="center">
        <v-btn
          color="primary"
          @click="$router.push({ name: 'Recipe calculator' })"
        >
          go to calculator</v-btn
        >
      </v-row>
      <v-row justify="center" class="mt-5">
        <v-btn color="primary" large disabled>
          Sponsor: Your Logo/Link Here
        </v-btn>
      </v-row>
      <v-row justify="center" class="mt-5">
        <v-btn color="primary" large disabled>
          Share your lab results with us.
        </v-btn>
      </v-row>
      <v-row justify="center" class="mt-5">
        <v-btn color="primary" href="mailto:compostcalc@gmail.com">
          Contact us
        </v-btn>
      </v-row>
      <v-row justify="center" style="margin-top: 100px">
        <a href="/about">About CompostCalc</a>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  mounted() {
    this.setCustomAppBarTitle('Compost Recipe Calculator')
  },
  beforeDestroy() {
    this.clearCustomAppBarTitle(null)
  },
  methods: {
    ...mapMutations('app', ['setCustomAppBarTitle', 'clearCustomAppBarTitle'])
  }
}
</script>

<style lang="scss" scoped></style>

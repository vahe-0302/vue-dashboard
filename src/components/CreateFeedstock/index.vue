<template>
  <div>
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="green"
    ></v-progress-circular>
    <v-stepper v-else v-model="stepper">
      <v-stepper-header>
        <v-stepper-step :complete="stepper > 1" step="1" editable>
        </v-stepper-step>
        <v-row align="center" style="width: 20px; max-width: 80px">
          step 1
        </v-row>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="stepper > 2"
          step="2"
          :editable="stepper > 2"
        ></v-stepper-step>
        <v-row align="center" style="width: 20px; max-width: 80px">
          step 2
        </v-row>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <Form1 @formValid="values => nextStep(values)" />
        </v-stepper-content>

        <v-stepper-content step="2">
          <Form2 @formValid="values => createFeedstock(values)" />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import Form1 from './Form1'
import Form2 from './Form2'

export default {
  components: {
    Form1,
    Form2
  },
  data() {
    return {
      stepper: 1,
      values: {},
      loading: false
    }
  },
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('feedstocks', ['myFeedstocks'])
  },
  methods: {
    ...mapActions('feedstocks', ['insertFeedstock']),
    ...mapMutations('feedstocks', ['addFeedstockToMyFeedstocks']),
    ...mapMutations('snackbar', ['setSnackbar']),
    async createFeedstock(values) {
      if (this.myFeedstocks.length >= 10) {
        this.setSnackbar({
          show: true,
          color: 'error',
          text: 'You have reached the limit of 10 feedstocks'
        })
        return
      }

      this.setValues(values)
      this.addExtraValues()

      try {
        this.loading = true

        const newFeedstock = await this.insertFeedstock(this.values)
        this.addFeedstockToMyFeedstocks(newFeedstock)

        this.loading = false
        this.setSnackbar({
          show: true,
          text: 'Feedstock created!'
        })
        this.$router.replace({
          name: 'My feedstock',
          params: {
            id: newFeedstock.id
          }
        })
      } catch (error) {
        this.loading = false
        console.error('TCL: createFeedstock -> error', error)
        this.setSnackbar({
          show: true,
          color: 'error',
          text: 'there was an error creating the feedstock'
        })
      }
    },
    nextStep(values) {
      this.setValues(values)
      this.stepper = 2
    },
    setValues(values) {
      this.values = {
        ...values,
        ...this.values
      }
    },
    addExtraValues() {
      // eslint-disable-next-line camelcase
      const bulk_density_m =
        parseInt(this.values.bulk_density_yd, 10) * (0.593276).toFixed(2)

      this.values = {
        ...this.values,
        bulk_density_m,
        creator: this.user.id,
        public: true
      }
    }
  }
}
</script>

<style scoped></style>

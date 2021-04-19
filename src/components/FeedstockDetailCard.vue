<template>
  <div style="width:100%">
    <v-row>
      <v-col cols="12">
        <v-card style="width:100%">
          <div
            class="d-flex justify-space-between "
            style="background-color: #4b2c20; color: white"
          >
            <div>
              <v-card-title class="title">
                {{ feedstockDetails.material }}
              </v-card-title>
              <v-card-subtitle style="color:white">
                source: {{ feedstockDetails.source }}
              </v-card-subtitle>
            </div>
          </div>
          <v-card-text>
            <v-row justify="space-between">
              <v-col cols="9">
                <span class="font-weight-bold">
                  Nitrogen (% dry weight)
                </span>
              </v-col>
              <v-col cols="3">
                <div class="font-weight-bold text-end">
                  {{ parseFloat(feedstockDetails.nitrogen) }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9">
                <span class="font-weight-bold">
                  Carbon (Total, % dry weight)
                </span>
              </v-col>
              <v-col cols="3">
                <div class="font-weight-bold text-end">
                  {{ parseFloat(feedstockDetails.carbon) }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9">
                <span class="font-weight-bold">
                  C:N ratio
                </span>
              </v-col>
              <v-col cols="3">
                <div class="font-weight-bold text-end">
                  {{ feedstockDetails.cn_ratio }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9">
                <span class="font-weight-bold">
                  Moisture (%)
                </span>
              </v-col>
              <v-col cols="3">
                <div class="font-weight-bold text-end">
                  {{ parseFloat(feedstockDetails.moisture_content) }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="9">
                <span class="font-weight-bold">
                  Bulk density (lb/cy)
                </span>
              </v-col>
              <v-col cols="3">
                <div class="font-weight-bold text-end">
                  {{ Math.round(feedstockDetails.bulk_density_yd) }}
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="2"></v-col>
      <v-col cols="6">
        <v-btn color="accent" block @click="addFeedStockCalculator">
          ADD TO CALCULATOR
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-btn
          class="mx-4 float-right"
          fab
          dark
          small
          color="accent"
          @click="
            $router.push({
              name: 'Create Feedstock'
            })
          "
        >
          <v-icon dark>mdi-plus</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from 'vuex'

export default {
  props: {
    feedstockDetails: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('feedstocks', ['getFeedstockDetails']),
    ...mapState('recipe', ['ingredients'])
  },

  methods: {
    ...mapMutations('snackbar', ['setSnackbar']),
    ...mapMutations('recipe', ['addIngredient']),
    addFeedStockCalculator() {
      if (this.ingredients.length === 0) {
        const water = this.getFeedstockDetails('water')
        water.quantity = 0
        this.addIngredient(this.getFeedstockDetails('water'))
        this.addIngredient(this.feedstockDetails)
      } else {
        this.addIngredient(this.feedstockDetails)
      }
      this.setSnackbar({
        show: true,
        text: 'Feedstock added to recipe.'
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>

<template>
  <div style="width: 100%">
    <v-card style="width: 100%">
      <div
        class="d-flex justify-space-between"
        style="background-color: #087f23; color: white"
      >
        <div>
          <v-card-title class="title"> Recipe Results </v-card-title>
          <v-card-subtitle style="color: white">
            {{ feedstocks.length - 1 }} feedstocks
          </v-card-subtitle>
        </div>
        <div class="d-flex justify-center align-start ma-3">
          <v-btn color="accent" block @click="resetIngredients">
            Reset
          </v-btn>
          <!-- <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn text icon v-on="on">
                <v-icon color="white">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="resetIngredients">
                <v-list-item-title>Reset</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> -->
        </div>
      </div>
      <v-card-text>
        <v-row justify="space-between" class="pl-2 pr-2">
          <v-col cols="4" class="pr-0 pb-0 pl-1">
            <span class="font-weight-bold"> </span>
          </v-col>
          <v-col cols="4" class="pr-0 pb-0 pl-1">
            <span class="font-weight-bold" style="color: black"> Results </span>
          </v-col>
          <v-col cols="4" class="pr-0 pb-0 pl-1">
            <span class="font-weight-bold text-truncate"> Recommended </span>
          </v-col>
          <v-col cols="4" class="pr-0 pb-0 pl-1">
            <span class="font-weight-bold" style="color: black">
              C:N
            </span>
          </v-col>
          <v-col cols="4" class="pr-0 pb-0 pl-1">
            <span class="font-weight-bold" style="color: black">
              {{ getMixCN }}:1
            </span>
          </v-col>
          <v-col cols="4" class="pr-0 pb-0 pl-1">
            <span class="font-weight-bold"> 20:1 - 40:1 </span>
          </v-col>
          <v-col cols="4" class="pr-0 pb-0 pl-1">
            <span class="font-weight-bold" style="color: black">
              Moisture
            </span>
          </v-col>
          <v-col cols="4" class="pr-0 pb-0 pl-1">
            <span class="font-weight-bold" style="color: black">
              {{ getMixMoisture }}%
            </span>
          </v-col>
          <v-col cols="4" class="pr-0 pb-0 pl-1">
            <span class="font-weight-bold"> 40 - 65% </span>
          </v-col>
          <v-col cols="4" class="pr-0 pb-0 pl-1">
            <span class="font-weight-bold" style="color: black">
              Bulk density
            </span>
          </v-col>
          <v-col cols="4" class="pr-0 pb-0 pl-1">
            <span class="font-weight-bold" style="color: black">
              {{ getBulkDensity }} lb/cy
            </span>
          </v-col>
          <v-col cols="4" class="pr-0 pb-0 pl-1">
            <span class="font-weight-bold"> 800 - 1,000 lb/cy </span>
          </v-col>
        </v-row>
        <v-row justify="center" class="pt-4">
          <v-btn
            color="accent"
            :disabled="feedstocks.length <= 1"
            @click="$router.push({ name: 'Save Recipe' })"
            >Save</v-btn
          >
        </v-row>
      </v-card-text>
    </v-card>
    <!-- <div>Total Water: {{ getTotalWater }}</div>
    <div>Total Nitrogen: {{ getTotalNitrogen }}</div>
    <div>Total Carbon: {{ getTotalCarbon }}</div>
    <div>Total Mix Nitrogen: {{ getTotalMixNitrogen }}</div>
    <div>Total Mix Carbon: {{ getTotalMixCarbon }}</div>
    <div>Total Mix Water: {{ getTotalMixWater }}</div>
    <div>Total Wet Weight: {{ getTotalWetWeight }}</div> -->
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'

export default {
  props: {
    feedstocks: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState('recipe', ['toWatch']),
    ...mapGetters('feedstocks', ['getFeedstockDetails']),

    /**
     * CALCULATIONS
     */
    getTotalWater() {
      console.log(this.toWatch)
      return this.feedstocks.reduce((acc, f) => acc + this.getWater(f), 0)
    },
    getTotalNitrogen() {
      console.log(this.toWatch)
      return this.feedstocks.reduce((acc, f) => acc + this.getNitrogen(f), 0)
    },
    getTotalCarbon() {
      console.log(this.toWatch)
      return this.feedstocks.reduce((acc, f) => acc + this.getCarbon(f), 0)
    },
    getTotalMixNitrogen() {
      console.log(this.toWatch)
      return this.feedstocks.reduce(
        (acc, f) => acc + this.getMix(this.getNitrogen(f), f.quantity),
        0
      )
    },
    getTotalMixCarbon() {
      console.log(this.toWatch)
      return this.feedstocks.reduce(
        (acc, f) => acc + this.getMix(this.getCarbon(f), f.quantity),
        0
      )
    },
    getTotalMixWater() {
      console.log(this.toWatch)

      const water = this.feedstocks.find(f => f.id === 'water')
      const feedstocksWithoutWater = this.feedstocks.filter(
        f => f.id !== 'water'
      )

      const part1 = feedstocksWithoutWater.reduce(
        (acc, f) => acc + this.getMix(this.getWater(f), f.quantity),
        0
      )
      console.log(
        'TCL: getTotalMixWater -> part1 + (this.getWater(f) * f.quantity /202)',
        part1 + (this.getWater(water) * water.quantity) / 202
      )

      return Math.round(part1 + (this.getWater(water) * water.quantity) / 202)
    },
    getTotalWetWeight() {
      console.log(this.toWatch)

      const water = this.feedstocks.find(f => f.id === 'water')
      const feedstocksWithoutWater = this.feedstocks.filter(
        f => f.id !== 'water'
      )

      const part1 = feedstocksWithoutWater.reduce(
        (acc, f) => acc + this.getWetWeight(f),
        0
      )

      return Math.round(part1 + (water.bulk_density_yd * water.quantity) / 202)
    },
    getMixCN() {
      const mixCarbon = (this.getTotalMixCarbon / 479) * 100
      const MixNitrogen = (this.getTotalMixNitrogen / 479) * 100

      return Number.isNaN(Math.round(mixCarbon / MixNitrogen))
        ? ''
        : Math.round(mixCarbon / MixNitrogen)
    },
    getMixMoisture() {
      return Number.isNaN(this.getTotalMixWater / this.getTotalWetWeight)
        ? ''
        : ((this.getTotalMixWater / this.getTotalWetWeight) * 100).toFixed(1)
    },
    getBulkDensity() {
      const water = this.feedstocks.find(f => f.id === 'water')
      const feedstocksWithoutWater = this.feedstocks.filter(
        f => f.id !== 'water'
      )
      const totalQuantitiesWithoutWater = feedstocksWithoutWater.reduce(
        (acc, f) => {
          return acc + f.quantity
        },
        0
      )
      let result = Math.round(
        this.getTotalWetWeight /
          (totalQuantitiesWithoutWater + water.quantity * 0)
      )
      if (Number.isNaN(result)) result = ''
      if (!Number.isFinite(result)) result = ''
      return result
      // return Number.isNaN(
      //   Math.round(
      //     this.getTotalWetWeight /
      //       (totalQuantitiesWithoutWater + water.quantity * 0)
      //   )
      // )
      //   ? ''
      //   : Math.round(
      //       this.getTotalWetWeight /
      //         (totalQuantitiesWithoutWater + water.quantity * 0)
      //     )
    }
  },
  methods: {
    ...mapMutations('recipe', ['clearIngredients', 'addIngredient']),
    resetIngredients() {
      this.clearIngredients()
      this.addIngredient(this.getFeedstockDetails('water'))
    },
    /**
     * CALCULATIONS
     */
    getWater(feedstock) {
      return (feedstock.bulk_density_yd * feedstock.moisture_content) / 100
    },
    getNitrogen(feedstock) {
      return (
        ((feedstock.bulk_density_yd - this.getWater(feedstock)) *
          feedstock.nitrogen) /
        100
      )
    },
    getCarbon(feedstock) {
      return this.getNitrogen(feedstock) * feedstock.cn_ratio
    },
    getWetWeight(feedstock) {
      return feedstock.bulk_density_yd * feedstock.quantity
    },
    getMix(value, quantity) {
      return value * quantity
    }
  }
}
</script>

<style lang="scss" scoped></style>

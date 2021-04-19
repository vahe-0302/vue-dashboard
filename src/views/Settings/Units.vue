<template>
  <div>
    <p class="title">Units</p>
    <v-radio-group v-model="unit">
      <v-radio
        label="Imperial (lb/cubic yards, gallons)"
        value="imperial"
      ></v-radio>
      <v-radio
        label="Metric (kg/m3, liters)(Future option)"
        value="metric"
        disabled
      ></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unit: 'imperial'
    }
  }
}
</script>

<style lang="scss" scoped></style>

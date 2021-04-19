<template>
  <v-list-item-content>
    <v-list-item-title
      class="font-weight-medium"
      v-text="feedstock.material"
    ></v-list-item-title>
    <div class="flexContainer mt-1">
      <p class="flexItem2 customCondensed mb-2">
        N = {{ parseFloat(feedstock.nitrogen) }}%
      </p>
      <p class="flexItem2 customCondensed mb-2">
        C = {{ parseFloat(feedstock.carbon) }}%
      </p>
      <p class="flexItem1 customCondensed mb-2">
        C:N = {{ Math.round(feedstock.cn_ratio) }}
      </p>
      <p class="flexItem2 customCondensed mb-2">
        BD = {{ Math.round(feedstock.bulk_density_yd) }} lb/cy
      </p>
      <p class="flexItem2 customCondensed mb-2">
        Moisture = {{ Math.round(feedstock.moisture_content) }}%
      </p>
      <p class="flexItem1 customCondensed mb-2"></p>
    </div>
  </v-list-item-content>
</template>

<script>
export default {
  props: {
    feedstock: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.customCondensed {
  font-family: Roboto !important;
  font-size: 0.8em !important;
  /* font-weight: 200 !important; */
  font-stretch: condensed !important;
}
.flexContainer {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.flexItem1 {
  flex: 1 0 20%;
}
.flexItem2 {
  flex: 2 0 35%;
  margin-right: 5px;
}
</style>

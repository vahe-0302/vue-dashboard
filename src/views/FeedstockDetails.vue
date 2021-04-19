<template>
  <v-progress-circular
    v-if="feedstockDetails && Object.keys(feedstockDetails).length === 0"
    indeterminate
    color="green"
  ></v-progress-circular>
  <FeedstockDetailCard v-else :feedstock-details="feedstockDetails" />
</template>

<script>
import { mapGetters } from 'vuex'
import FeedstockDetailCard from '@/components/FeedstockDetailCard'

export default {
  components: {
    FeedstockDetailCard
  },
  computed: {
    ...mapGetters('feedstocks', ['getFeedstockDetails']),
    feedstockDetails() {
      return this.getFeedstockDetails(this.$route.params.id)
    }
  }
}
</script>

<style lang="scss" scoped></style>

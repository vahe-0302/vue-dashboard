<template>
  <v-progress-circular
    v-if="feedstocks.length === 0"
    indeterminate
    color="green"
  ></v-progress-circular>
  <FeedStocksByCategory
    v-else
    :feedstocks="feedstocks"
    :to-select-feedstock="toSelectFeedstock"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import FeedStocksByCategory from '@/components/FeedstocksByCategoryList'

export default {
  components: {
    FeedStocksByCategory
  },
  props: {
    toSelectFeedstock: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('feedstocks', ['getFeedstocksByCategoryId']),
    feedstocks() {
      return this.getFeedstocksByCategoryId(this.$route.params.categoryId)
    }
  }
}
</script>

<style scoped></style>

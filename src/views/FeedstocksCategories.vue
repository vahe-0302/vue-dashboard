<template>
  <FeedstocksCategoriesList
    :feedstocks-categories="feedstocksCategories"
    :to-select-feedstock="toSelectFeedstock"
  />
</template>

<script>
import { mapState } from 'vuex'
import FeedstocksCategoriesList from '@/components/FeedstocksCategoriesList'

export default {
  components: {
    FeedstocksCategoriesList
  },
  props: {
    toSelectFeedstock: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('feedstocks', ['feedstocksCategories'])
  }
}
</script>

<style lang="scss" scoped></style>

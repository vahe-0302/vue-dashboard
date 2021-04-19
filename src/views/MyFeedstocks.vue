<template>
  <div>
    <MyFeedstocksList
      :my-feedstocks="myFeedstocks"
      :to-select-feedstock="toSelectFeedstock"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MyFeedstocksList from '@/components/MyFeedStocksList'

export default {
  components: {
    MyFeedstocksList
  },
  props: {
    toSelectFeedstock: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('feedstocks', ['myFeedstocks'])
  }
}
</script>

<style scoped></style>

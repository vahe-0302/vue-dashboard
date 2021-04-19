<template>
  <div style="width:100%">
    <v-card style="width:100%">
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="feedstock in feedstocks"
            :key="feedstock.id"
            @click="handleItemClick(feedstock)"
          >
            <FeedstockRow :feedstock="feedstock" />
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import FeedstockRow from './FeedstockRow'

export default {
  components: {
    FeedstockRow
  },
  props: {
    feedstocks: {
      type: Array,
      required: true
    },
    toSelectFeedstock: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.setCustomAppBarTitle(this.$route.params.categoryName)
  },
  beforeDestroy() {
    this.clearCustomAppBarTitle(null)
  },
  methods: {
    ...mapMutations('app', ['setCustomAppBarTitle', 'clearCustomAppBarTitle']),
    ...mapMutations('recipe', ['addIngredient']),
    handleItemClick(feedstock) {
      console.log('TCL: handleItemClick -> feedstock', feedstock)
      if (this.toSelectFeedstock) {
        this.addIngredient(feedstock)

        this.$router.replace({
          name: 'Recipe calculator',
          params: {
            id: feedstock.id
          }
        })
      } else {
        this.$router.push({
          name: 'Feedstock',
          params: {
            id: feedstock.id
          }
        })
      }
    }
  }
}
</script>

<style scoped></style>

<template>
  <div style="width:100%">
    <FeedstocksList :ingredients="ingredients" />
    <Results :feedstocks="ingredients" class="mt-5" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import FeedstocksList from './FeedstocksList'
import Results from './Results'

export default {
  components: {
    FeedstocksList,
    Results
  },
  props: {
    preIngredients: {
      type: Array
    }
  },
  computed: {
    ...mapGetters('feedstocks', ['getFeedstockDetails']),
    ...mapState('recipe', ['ingredients'])
  },
  beforeMount() {
    if (this.preIngredients) {
      this.setIngredients(this.preIngredients)
    }

    if (this.ingredients.length === 0) {
      const water = this.getFeedstockDetails('water')
      water.quantity = 0
      this.addIngredient(this.getFeedstockDetails('water'))
    }
  },
  methods: {
    ...mapMutations('recipe', ['setIngredients']),
    ...mapMutations('recipe', ['clearIngredients', 'addIngredient'])
  }
}
</script>

<style scoped></style>

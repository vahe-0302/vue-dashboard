<template>
  <div>
    <MyRecipeList :my-recipes="myRecipes" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MyRecipeList from '../components/MyRecipesList'

export default {
  components: {
    MyRecipeList
  },
  computed: {
    ...mapState('recipe', ['myRecipes'])
  }
}
</script>

<style lang="scss" scoped></style>

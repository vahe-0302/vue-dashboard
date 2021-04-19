<template>
  <v-list-item-content>
    <v-list-item-title
      class="font-weight-medium"
      v-text="recipe.name"
    ></v-list-item-title>
  </v-list-item-content>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>

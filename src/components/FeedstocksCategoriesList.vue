<template>
  <div style="width:100%">
    <v-card style="width:100%">
      <v-list>
        <v-list-item-group>
          <v-list-item
            @click="
              $router.push({
                name: 'My Feedstocks',
                params: { toSelectFeedstock }
              })
            "
          >
            <v-list-item-icon>
              <v-icon v-text="'mdi-star'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="'My Feedstocks'"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item
            v-for="category in feedstocksCategories"
            :key="category.id"
            @click="
              $router.push({
                name: 'Material',
                params: {
                  categoryId: category.id,
                  categoryName: category.name,
                  toSelectFeedstock
                }
              })
            "
          >
            <v-list-item-icon>
              <v-icon v-text="category.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="category.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    feedstocksCategories: {
      type: Array,
      required: true
    },
    toSelectFeedstock: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped></style>

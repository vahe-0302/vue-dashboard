<template>
  <div style="width:100%">
    <v-card style="width:100%">
      <v-container class="pt-0 pb-0">
        <v-row justify="space-between" class="pa-4">
          <div class="title">
            Feedstocks
          </div>
          <v-btn fab dark small color="accent">
            <v-icon
              dark
              @click="
                $router.push({
                  name: 'Feedstocks',
                  params: {
                    toSelectFeedstock: true
                  }
                })
              "
              >mdi-plus</v-icon
            >
          </v-btn>
        </v-row>
      </v-container>
      <v-list>
        <v-list-item-group>
          <FeedstockItem
            v-for="(ingredient, index) in ingredients"
            :key="index"
            :feedstock="ingredient"
            unit="cy"
          />
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import FeedstockItem from './FeedstockItem'

export default {
  components: {
    FeedstockItem
  },
  props: {
    ingredients: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped></style>

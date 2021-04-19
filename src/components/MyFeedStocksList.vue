<template>
  <div style="width: 100%">
    <div v-if="myFeedstocks && myFeedstocks.length === 0" class="text-center">
      You do not have feedstocks yet
    </div>
    <v-progress-circular
      v-else-if="loading"
      indeterminate
      color="green"
      style="width: 100%"
    ></v-progress-circular>
    <v-card v-else>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="feedstock in myFeedstocks"
            :key="feedstock.id"
            @click.native.stop="handleItemClick(feedstock)"
          >
            <FeedstockRow :feedstock="feedstock" />
            <v-list-item-icon>
              <Dialog>
                <template slot="activator">
                  <v-btn text icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <template slot="title">
                  Delete
                </template>
                <template>
                  ¿Do you want to delete the feedstock {{ feedstock.material }}?
                </template>
                <template slot="actions">
                  <v-btn text>Cancel</v-btn>
                  <v-btn
                    color="red"
                    dark
                    @click="doDeleteFeedstock(feedstock.id)"
                    >Delete</v-btn
                  >
                </template>
              </Dialog>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>

    <v-btn
      class="mx-2"
      fab
      dark
      color="accent"
      fixed
      right
      bottom
      @click="
        $router.push({
          name: 'Create Feedstock'
        })
      "
    >
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import Dialog from '@/components/Dialog'
import FeedstockRow from './FeedstockRow'

export default {
  components: {
    Dialog,
    FeedstockRow
  },
  props: {
    myFeedstocks: {
      type: Array,
      required: true
    },
    toSelectFeedstock: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions('feedstocks', ['deleteFeedstock']),
    ...mapMutations('recipe', ['addIngredient']),
    ...mapMutations('snackbar', ['setSnackbar']),
    async doDeleteFeedstock(id) {
      try {
        this.loading = true
        await this.deleteFeedstock(id)
        this.loading = false

        this.setSnackbar({
          show: true,
          text: 'Feedstock deleted'
        })
      } catch (error) {
        this.setSnackbar({
          show: true,
          color: 'error',
          text: 'There was an error, please try again later'
        })
      }
    },
    handleItemClick(feedstock) {
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
          name: 'My feedstock',
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

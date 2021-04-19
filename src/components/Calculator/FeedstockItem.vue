<template>
  <v-list-item>
    <v-list-item-content>
      <div class="d-flex justify-space-between align-center">
        <div
          style="flex: 1; height:100% ; margin-bottom:15px"
          @click.stop="
            $router.push({
              name: 'Feedstock',
              params: {
                id: feedstock.id,
                categoryId: feedstock.material_type
              }
            })
          "
        >
          <strong>{{ feedstock.material }}</strong>
          <v-row
            v-if="feedstock.material !== 'Water'"
            class="d-flex detail-text"
          >
            <v-col cols="4" style="padding:20px 18px 0px 15px"
              >N = {{ parseFloat(feedstock.nitrogen) }}%</v-col
            >
            <v-col cols="4" style="padding:20px 18px 0px 15px"
              >C = {{ parseFloat(feedstock.carbon) }}%</v-col
            >
            <v-col cols="4" style="padding:20px 18px 0px 15px"
              >C:N = {{ feedstock.cn_ratio }}</v-col
            >
          </v-row>
          <v-row
            v-if="feedstock.material !== 'Water'"
            class=" d-flex detail-text"
          >
            <v-col cols="4" style="padding:10px 10px 0px 15px"
              >BD = {{ feedstock.bulk_density_yd }} lb/cy</v-col
            >
            <v-col cols="4" style="padding:10px 10px 0px 15px"
              >Moisture = {{ parseFloat(feedstock.moisture_content) }}%</v-col
            >
          </v-row>
        </div>
        <div class="d-flex justify-start align-center" style="width:90px">
          <div style="width: 45px">
            <v-text-field
              v-model="quantity"
              dense
              class="caption"
              inputmode="numeric"
              type="number"
              min="0"
              oninput="if(this.value < 0) this.value = '';"
            />
          </div>
          <div class="caption ml-2">
            {{ feedstock.id === 'water' ? 'Gallons' : unit }}
          </div>
        </div>
      </div>
    </v-list-item-content>
    <v-list-item-icon
      v-if="feedstock.id !== 'water'"
      style="position: absolute; right: 0; bottom: 0; margin: 0"
    >
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
          <v-btn color="red" dark @click="removeIngredient(feedstock.id)"
            >Delete</v-btn
          >
        </template>
      </Dialog>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import Dialog from '../Dialog'

export default {
  components: {
    Dialog
  },
  props: {
    feedstock: {
      type: Object,
      required: true
    },
    unit: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      allowNegative: false
    }
  },
  computed: {
    ...mapState('recipe', ['toWatch']),
    quantity: {
      get() {
        return this.getIngredientValueById()(this.feedstock.id)
      },
      set(quantity) {
        this.setToWatchValue(!this.toWatch)
        this.setIngredentQuantity({
          id: this.feedstock.id,
          quantity
        })
      }
    }
  },
  methods: {
    ...mapMutations('recipe', [
      'removeIngredient',
      'setIngredentQuantity',
      'setToWatchValue'
    ]),
    ...mapGetters('recipe', ['getIngredientValueById'])
  }
}
</script>

<style lang="scss" scoped>
.detail-text {
  font-size: 0.8em;
}
</style>

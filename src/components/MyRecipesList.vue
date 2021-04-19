<template>
  <div style="width:100%">
    <div v-if="myRecipes && myRecipes.length === 0" class="text-center">
      You do not have recipes yet
    </div>
    <v-progress-circular
      v-else-if="loading"
      indeterminate
      color="green"
      style="width:100%"
    ></v-progress-circular>
    <v-card v-else>
      <v-list>
        <v-list-item-group>
          <v-list-item
            v-for="recipe in myRecipes"
            :key="recipe.id"
            @click.native.stop="
              () => {
                $router.push({
                  name: 'Recipe calculator',
                  params: {
                    ingredients: recipe.recipe
                  }
                })
              }
            "
          >
            <RecipeRow :recipe="recipe" />
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
                  ¿Do you want to delete the recipe {{ recipe.name }}?
                </template>
                <template slot="actions">
                  <v-btn text>Cancel</v-btn>
                  <v-btn color="red" dark @click="doDeleteRecipe(recipe.id)"
                    >Delete</v-btn
                  >
                </template>
              </Dialog>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import Dialog from '@/components/Dialog'
import RecipeRow from '@/components/RecipeRow'

export default {
  components: {
    Dialog,
    RecipeRow
  },
  props: {
    myRecipes: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions('recipe', ['deleteRecipe']),
    ...mapMutations('snackbar', ['setSnackbar']),
    async doDeleteRecipe(id) {
      try {
        this.loading = true
        await this.deleteRecipe(id)
        this.loading = false

        this.setSnackbar({
          show: true,
          text: 'Recipe deleted'
        })
      } catch (error) {
        this.setSnackbar({
          show: true,
          color: 'error',
          text: 'There was an error, please try again later'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

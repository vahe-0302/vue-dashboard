import RecipesDB from '@/firebase/recipes-db'

export default {
  insertRecipe: async ({ rootState, commit }, data) => {
    const recipesDB = new RecipesDB()
    const finalData = {
      ...data,
      creator: rootState.authentication.user.id
    }

    const newRecipe = await recipesDB.create(finalData)
    commit('addRecipeToMyRecipes', newRecipe)
    return newRecipe
  },
  getMyRecipes: async ({ rootState, commit }) => {
    const recipesDB = new RecipesDB()
    const userID = rootState.authentication.user.id

    const recipes = await recipesDB.readAll([['creator', '==', userID]])
    commit('setMyRecipes', recipes)
    return recipes
  },
  deleteRecipe: async ({ commit }, id) => {
    const recipesDB = new RecipesDB()

    await recipesDB.delete(id)
    commit('removeRecipe', id)
  }
}

import { isNil } from 'lodash'
import router from '@/router'
import { createNewUserFromFirebaseAuthUser } from '@/misc/helpers'
import UsersDB from '@/firebase/users-db'

export default {
  /**
   * Callback fired when user login
   */
  login: async ({ commit, dispatch }, firebaseAuthUser) => {
    const userFromFirebase = await new UsersDB().read(firebaseAuthUser.uid)

    const user = isNil(userFromFirebase)
      ? await createNewUserFromFirebaseAuthUser(firebaseAuthUser)
      : userFromFirebase

    commit('setUser', user)

    // Getting My feedstocks from firestore
    await dispatch('feedstocks/getMyFeedstocks', null, { root: true })

    // Getting My Recipes from firestore
    await dispatch('recipe/getMyRecipes', null, { root: true })
  },

  /**
   * Callback fired when user logout
   */
  logout: ({ commit }) => {
    commit('setUser', null)
    commit('recipe/setMyRecipes', [], { root: true })
    commit('feedstocks/setMyfeedstocks', [], { root: true })

    const currentRouter = router.app.$route
    if (!(currentRouter.meta && currentRouter.meta.authNotRequired)) {
      router.push('/login')
    }
  }
}

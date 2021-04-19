import Vue from 'vue'
import Router from 'vue-router'
import Head from 'vue-head'
import { isNil } from 'lodash'
import Home from '@/views/Home'
import CheckLogin from '@/views/CheckLogin'
import store from '@/store'

Vue.use(Router)

/* If you don't know about VueHead, please refer to https://github.com/ktquez/vue-head */

Vue.use(Head, {
  complement: process.env.VUE_APP_TITLE
})

/* If you don't know about VueRouter, please refer to https://router.vuejs.org/ */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/index.html',
      redirect: { name: 'Home' }
    },
    {
      path: '/check-login',
      name: 'check-login',
      component: CheckLogin,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () =>
        import(/* webpackChunkName: "client-chunk-login" */ '@/views/Login.vue'),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/feedstocks',
      name: 'Feedstocks',
      component: () =>
        import(/* webpackChunkName: "client-chunk-feedstocks-categories" */ '@/views/FeedstocksCategories.vue'),
      props: true,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/feedstocks/:categoryId',
      name: 'Material',
      component: () =>
        import(/* webpackChunkName: "client-chunk-feedstocks" */ '@/views/Feedstocks.vue'),
      props: true,
      meta: {
        authNotRequired: true,
        backRoute: 'Feedstocks'
      }
    },
    {
      path: '/feedstocks/:categoryId/:id',
      name: 'Feedstock',
      component: () =>
        import(/* webpackChunkName: "client-chunk-feedstock-details" */ '@/views/FeedstockDetails.vue'),
      props: true,
      meta: {
        authNotRequired: true,
        backRoute: 'Material'
      }
    },
    {
      path: '/myfeedstocks',
      name: 'My Feedstocks',
      beforeEnter: (to, from, next) => {
        if (from.name === 'Feedstocks') {
          to.meta.backRoute = 'Feedstocks'
        }
        next()
      },
      props: true,
      component: () =>
        import(/* webpackChunkName: "client-chunk-myFeedstocks" */ '@/views/MyFeedstocks.vue')
    },
    {
      path: '/myfeedstocks/create',
      name: 'Create Feedstock',
      component: () =>
        import(/* webpackChunkName: "client-chunk-myFeedstocks-create" */ '@/views/CreateFeedstock.vue'),
      meta: {
        backRoute: 'My Feedstocks'
      }
    },
    {
      path: '/myfeedstocks/:id',
      name: 'My feedstock',
      component: () =>
        import(/* webpackChunkName: "client-chunk-my-feedstock-details" */ '@/views/FeedstockDetails.vue'),
      props: true,
      meta: {
        backRoute: 'My Feedstocks'
      }
    },
    {
      path: '/calculator',
      name: 'Recipe calculator',
      component: () =>
        import(/* webpackChunkName: "client-chunk-calculator" */ '@/views/Calculator.vue'),
      props: true,
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/calculator/save-recipe',
      name: 'Save Recipe',
      component: () =>
        import(/* webpackChunkName: "client-chunk-calculator" */ '@/views/SaveRecipe.vue'),
      meta: {
        backRoute: 'Recipe calculator'
      }
    },
    {
      path: '/calculator/myrecipes',
      name: 'My Recipes',
      component: () =>
        import(/* webpackChunkName: "client-chunk-my-recipes" */ '@/views/MyRecipes.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () =>
        import(/* webpackChunkName: "client-chunk-settings" */ '@/views/Settings'),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '/about',
      name: 'About',
      component: () =>
        import(/* webpackChunkName: "client-chunk-settings" */ '@/views/About'),
      meta: {
        authNotRequired: true
      }
    },
    {
      path: '*',
      component: () =>
        import(/* webpackChunkName: "client-chunk-404" */ '@/views/PageNotFound')
    }
  ]
})

/**
 * Handle user redirections
 */
// eslint-disable-next-line consistent-return
router.beforeEach((to, from, next) => {
  if (
    !(to.meta && to.meta.authNotRequired) &&
    isNil(store.state.authentication.user)
  ) {
    const path =
      store.state.authentication.user === null ? '/login' : '/check-login'
    return next(`${path}?redirectUrl=${to.path}`)
  }
  next()
})

export default router

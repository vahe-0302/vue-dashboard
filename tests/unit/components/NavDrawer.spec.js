// import Vuex from 'vuex'
import { cloneDeep } from 'lodash'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import NavDrawer from '@/components/NavDrawer'
import router from '@/router'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)

describe('NavDrawer', () => {
  test('NavDrawer snapshot test', () => {
    const wrapper = shallowMount(NavDrawer, { localVue, router })
    expect(wrapper).toMatchSnapshot()
  })
})
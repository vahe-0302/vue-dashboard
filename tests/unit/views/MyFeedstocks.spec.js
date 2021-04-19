import Vuex from 'vuex'
import { cloneDeep } from 'lodash'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import MyFeedstocks from '@/views/myFeedstocks'

const defaultStoreStructure = {
  modules: {
    feedstocks: {
      namespaced: true,
      actions: {
        getMyFeedstocks() {
          setTimeout(() => {}, 10000)
        }
      },
      state: {
        myFeedstocks: [
          {
            id: 'apple_filter_cake',
            material: 'Apple filter cake',
            material_type: 'crop_residues',
            creator: 'admin',
            source: '',
            nitrogen: '1.2',
            carbon: '15.6',
            cn_ratio: '13',
            moisture_content: '60',
            bulk_density_yd: '1197',
            bulk_density_m: '710.15',
            public: true
          },
          {
            id: 'apple_pomace',
            material: 'Apple pomace',
            material_type: 'crop_residues',
            creator: 'other',
            source: '',
            nitrogen: '1.1',
            carbon: '52.8',
            cn_ratio: '48',
            moisture_content: '88',
            bulk_density_yd: '1559',
            bulk_density_m: '924.92',
            public: true
          }
        ]
      }
    }
  }
}

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

describe('MyFeedstocks', () => {
  let storeStructure
  beforeEach(() => {
    storeStructure = cloneDeep(defaultStoreStructure)
  })

  test('should render correctly', () => {
    const store = new Vuex.Store(storeStructure)
    const wrapper = shallowMount(MyFeedstocks, {
      store,
      localVue
    })
    expect(wrapper).toMatchSnapshot()
  })
})

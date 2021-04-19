import { cloneDeep } from 'lodash'
import mutations from '@/store/feedstocks/feedstocks.mutations'

const category1 = {
  id: 'crop_residues',
  icon: 'mdi-sproud',
  name: 'Crop residues & processing waster'
}
const category2 = {
  id: 'fish_meat_animal',
  icon: 'mdi-fish',
  name: 'Fish, meat and animal by products'
}
const feedstock1 = {
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
}
const feedstock2 = {
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
const baseState = {
  feedstocksCategories: [],
  feedstocksByCategory: null,
  myFeedstocks: [],
  feedstockDetails: null
}

describe('feedstocks module mutations', () => {
  test('setFeedstocksCategories should work correctly', () => {
    const state = cloneDeep(baseState)
    mutations.setFeedstocksCategories(state, [category1, category2])
    expect(state).toEqual({
      ...baseState,
      feedstocksCategories: [category1, category2]
    })
  })
  test('setFeedstocksByCategory should work correctly', () => {
    const state = cloneDeep(baseState)
    mutations.setFeedstocksByCategory(state, [feedstock1, feedstock2])
    expect(state).toEqual({
      ...baseState,
      feedstocksByCategory: [feedstock1, feedstock2]
    })
  })
  test('setFeedstockDetails should work correctly', () => {
    const state = cloneDeep(baseState)
    mutations.setFeedstockDetails(state, feedstock1)
    expect(state).toEqual({
      ...baseState,
      feedstockDetails: feedstock1
    })
  })
  test('setMyfeedstocks should work correctly', () => {
    const state = cloneDeep(baseState)
    mutations.setMyfeedstocks(state, [feedstock1, feedstock2])
    expect(state).toEqual({
      ...baseState,
      myFeedstocks: [feedstock1, feedstock2]
    })
  })
  test('deleteFeedstock should work correctly', () => {
    const state = cloneDeep(baseState)
    mutations.setMyfeedstocks(state, [feedstock1, feedstock2])
    mutations.deleteFeedstock(state, 'apple_pomace')
    expect(state).toEqual({
      ...baseState,
      myFeedstocks: [feedstock1]
    })
  })
})

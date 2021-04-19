import actions from '@/store/feedstocks/feedstocks.actions'

jest.mock('@/firebase/feedstocks-db', () => ({
  FeedstoksDB: jest.mock()
}))
jest.mock('@/firebase/feedstocks-categories-db', () => ({
  FeedstoksCategoriesDB: jest.mock()
}))

const mockFeedstocksCategoriesDbReadAll = jest.fn()
const mockFeedstocksDbReadAll = jest.fn()
const mockFeedstocksDbRead = jest.fn()
const mockFeedstocksDbCreate = jest.fn()
const mockFeedstocksDbDelete = jest.fn()

jest.mock('@/firebase/feedstocks-categories-db', () =>
  jest.fn().mockImplementation(() => ({
    readAll: mockFeedstocksCategoriesDbReadAll
  }))
)

jest.mock('@/firebase/feedstocks-db', () =>
  jest.fn().mockImplementation(() => ({
    readAll: mockFeedstocksDbReadAll,
    read: mockFeedstocksDbRead,
    create: mockFeedstocksDbCreate,
    delete: mockFeedstocksDbDelete
  }))
)

const commit = jest.fn()
// const dispatch = jest.fn()
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
const rootState = {
  feedstocks: {
    feedstocksCategories: [],
    feedstocksByCategory: null,
    myFeedstocks: [],
    feedstockDetails: null
  },
  authentication: {
    user: {
      id: 'admin'
    }
  }
}

afterEach(() => {
  commit.mockReset()
  mockFeedstocksCategoriesDbReadAll.mockReset()
  mockFeedstocksDbReadAll.mockReset()
  mockFeedstocksDbRead.mockReset()
  mockFeedstocksDbCreate.mockReset()
  mockFeedstocksDbDelete.mockReset()
})

describe('feedstocks action', () => {
  describe('getFeedstocks', () => {
    it('getMyFeedstocks should return only my own feedstocks', async () => {
      mockFeedstocksDbReadAll.mockResolvedValue([feedstock1])
      await actions.getMyFeedstocks({ commit, rootState }, 'admin')
      expect(commit).toHaveBeenCalledWith('setMyfeedstocks', null)
      expect(commit).toHaveBeenLastCalledWith('setMyfeedstocks', [feedstock1])
    })

    it('getFeedstockByID should work correctly', async () => {
      mockFeedstocksDbRead.mockResolvedValue(feedstock1)
      await actions.getFeedstockByID({ commit }, 'apple_pomace')
      expect(commit).toHaveBeenCalledWith('setFeedstockDetails', feedstock1)
    })
  })

  describe('insert feedstock', () => {
    it('insertFeedstock should work correctly', async () => {
      mockFeedstocksDbCreate.mockResolvedValue(feedstock2)
      const id = await actions.insertFeedstock({}, feedstock2)
      expect(id).toBe('apple_pomace')
    })
  })

  describe('delete feedstock', () => {
    it('deleteFeedstock should work correctly', async () => {
      await actions.deleteFeedstock({ commit }, 'apple_pomace')
      expect(commit).toHaveBeenCalledWith('deleteFeedstock', 'apple_pomace')
      expect(mockFeedstocksDbDelete).toHaveBeenCalledWith('apple_pomace')
    })
  })
})

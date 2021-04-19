import GenericDB from './generic-db'

export default class UserFeedstocksDB extends GenericDB {
  constructor(userId) {
    super(`users/${userId}/feedstocks`)
  }

  // Here you can extend UserProductsDB with custom methods
}

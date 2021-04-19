import GenericDB from './generic-db'

export default class FeedstocksVersionsDB extends GenericDB {
  constructor() {
    super(`feedstocks_versions`)
  }
}

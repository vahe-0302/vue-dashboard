import GenericDB from './generic-db'

export default class UserProductsDB extends GenericDB {
  constructor() {
    super(`feedstocks`)
  }
}

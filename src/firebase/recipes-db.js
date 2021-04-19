import GenericDB from './generic-db'

export default class recipesDB extends GenericDB {
  constructor() {
    super(`recipes`)
  }
}

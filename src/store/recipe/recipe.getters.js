export default {
  /**
   * function to get the queantity of specific ingredient
   */
  getIngredientValueById: state => feedstockId => {
    const ingredient = state.ingredients.find(i => i.id === feedstockId)
    return ingredient.quantity
  }
}

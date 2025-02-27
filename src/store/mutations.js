export function setSearchedMeals(state, meals) {
  state.searchedMeals = meals || []
}

export function setMealsByLetter(state, { letter, meals }) {
  state.mealsByLetter = {
    ...state.mealsByLetter,
    [letter]: meals || []
  }
}

export function setMealsByIngredients(state, meals) {
  state.mealsByIngredient = meals || []
}

export function setIngredient(state, ingredient) {
  state.ingredient = ingredient
}

export function setLoading(state, loading) {
  state.loading = loading
}
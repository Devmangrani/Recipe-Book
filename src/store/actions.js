import axiosClient from "../axiosClient";

export function searchMeals({ commit }, keyword) {
  commit("setLoading", true);
  return axiosClient
    .get(`search.php?s=${keyword}`)
    .then(({ data }) => {
      commit("setSearchedMeals", data.meals);
    })
    .catch((error) => {
      console.error("Error searching meals:", error);
      commit("setSearchedMeals", []);
    })
    .finally(() => {
      commit("setLoading", false);
    });
}

export function searchMealsByLetter({ commit, state }, letter) {
  // Return cached data if available
  if (state.mealsByLetter[letter]) {
    return Promise.resolve(state.mealsByLetter[letter]);
  }

  commit("setLoading", true);
  return axiosClient
    .get(`search.php?f=${letter}`)
    .then(({ data }) => {
      commit("setMealsByLetter", { letter, meals: data.meals });
    })
    .catch((error) => {
      console.error("Error fetching meals by letter:", error);
      commit("setMealsByLetter", { letter, meals: [] });
    })
    .finally(() => {
      commit("setLoading", false);
    });
}

export function searchMealsByIngredient({ commit }, ing) {
  commit("setLoading", true);
  return axiosClient
    .get(`filter.php?i=${ing}`)
    .then(({ data }) => {
      commit("setMealsByIngredients", data.meals);
    })
    .catch((error) => {
      console.error("Error fetching meals by ingredient:", error);
      commit("setMealsByIngredients", []);
    })
    .finally(() => {
      commit("setLoading", false);
    });
}

import axios from "../api/axios";
import {
  FETCH_CATEGORY_BEGIN,
  FETCH_CATEGORY_ERROR,
  FETCH_CATEGORY_MEALS_BEGIN,
  FETCH_CATEGORY_MEALS_ERROR,
  FETCH_CATEGORY_MEALS_SUCCESS,
  FETCH_CATEGORY_SUCCESS,
  FETCH_FAV_MEALS_ERROR,
  FETCH_FAV_MEALS_SUCCESS,
  FETCH_MEALS_BEGIN,
  FETCH_MEALS_ERROR,
  FETCH_MEALS_SUCCESS,
  FETCH_SINGLE_MEAL_BEGIN,
  FETCH_SINGLE_MEAL_ERROR,
  FETCH_SINGLE_MEAL_SUCCESS,
} from "./actions";

import {
  CATEGORIES_URL,
  MEAL_CATEGORIES_URL,
  MEAL_SINGLE_URL,
  RANDOM_URL,
  SEARCH_URL,
} from "../utils/constants";

export const startFetchCategories = async (dispatch) => {
  try {
    dispatch({ type: FETCH_CATEGORY_BEGIN });
    const response = await axios.get(`${CATEGORIES_URL}`);
    dispatch({
      type: FETCH_CATEGORY_SUCCESS,
      payload: response.data.categories,
    });
  } catch (error) {
    dispatch({ type: FETCH_CATEGORY_ERROR, payload: error.message });
  }
};

export const startFetchSingleMeal = async (dispatch, id) => {
  try {
    dispatch({ type: FETCH_SINGLE_MEAL_BEGIN });
    const response = await axios.get(`${MEAL_SINGLE_URL}${id}`);
    dispatch({ type: FETCH_SINGLE_MEAL_SUCCESS, payload: response.data.meals });
  } catch (error) {
    dispatch({ type: FETCH_SINGLE_MEAL_ERROR, payload: error.message });
  }
};

export const startFetchMealByCategory = async (dispatch, category) => {
  try {
    dispatch({ type: FETCH_CATEGORY_MEALS_BEGIN });
    const response = await axios.get(`${MEAL_CATEGORIES_URL}${category}`);
    dispatch({
      type: FETCH_CATEGORY_MEALS_SUCCESS,
      payload: response.data.meals,
    });
  } catch (error) {
    dispatch({ type: FETCH_CATEGORY_MEALS_ERROR, payload: error.message });
  }
};

export const startFetchMealsBySearch = async (dispatch, searchTerm) => {
  try {
    dispatch({ type: FETCH_MEALS_BEGIN });
    const response = await axios.get(`${SEARCH_URL}${searchTerm}`);
    dispatch({ type: FETCH_MEALS_SUCCESS, payload: response.data.meals });
  } catch (error) {
    dispatch({ type: FETCH_MEALS_ERROR, payload: error.message });
  }
};

export const startFetchRandomCategories = async (dispatch) => {
  try {
    dispatch({ type: FETCH_MEALS_BEGIN });
    const response = await axios.get(`${RANDOM_URL}`);
    dispatch({ type: FETCH_MEALS_SUCCESS, payload: response.data.meals });
  } catch (error) {
    dispatch({ type: FETCH_MEALS_ERROR, payload: error.message });
  }
};
export const addFavouriteMeals = async (dispatch, favorites, meals, idMeal) => {
  try {
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal);

    if (alreadyFavorite) {
      const updatedFavorites = favorites.filter(
        (meal) => meal.idMeal !== idMeal
      );

      dispatch({ type: FETCH_FAV_MEALS_SUCCESS, payload: updatedFavorites });

      const mealsWithFavorites = meals.map((meal) => ({
        ...meal,
        isFavorite: updatedFavorites.some(
          (favorite) => favorite.idMeal === meal.idMeal
        ),
      }));

      dispatch({ type: FETCH_MEALS_SUCCESS, payload: mealsWithFavorites });

      return;
    }

    const updatedFavorites = [...favorites, meal];
    dispatch({ type: FETCH_FAV_MEALS_SUCCESS, payload: updatedFavorites });

    const mealsWithFavorites = meals.map((meal) => ({
      ...meal,
      isFavorite: updatedFavorites.some(
        (favorite) => favorite.idMeal === meal.idMeal
      ),
    }));

    dispatch({ type: FETCH_MEALS_BEGIN });
    dispatch({ type: FETCH_MEALS_SUCCESS, payload: mealsWithFavorites });
  } catch (error) {
    dispatch({ type: FETCH_FAV_MEALS_ERROR, payload: error.message });
  }
};

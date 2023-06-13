import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

export const loadRecipe = async function (id) {
  try {
    const res = await AJAX(`${API_URL}${id}`);
    const data = await res.json();

    let { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
    };
  } catch (err) {
    console.error(`${err} 💥💥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const result = await AJAX(`${API_URL}?search=${query}`);
    const data = await result.json();

    state.search.query = query;
    state.search.results = data.data.recipes.map(res => {
      return {
        id: res.id,
        title: res.title,
        image: res.image_url,
        publisher: res.publisher,
      };
    });
  } catch (err) {
    console.error(`${err} 💥💥`);
    throw err;
  }
};

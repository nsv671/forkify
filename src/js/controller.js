import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controllRecipe = async function () {
  try {
    // render spinner
    recipeView.renderSpinner();

    // loading the recipe
    const id = window.location.hash.slice(1);
    if (!id) return;

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    // render spinner
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    console.log(query);
    if (!query) return;

    // load search results
    await model.loadSearchResults(query);

    // rendering results
    console.log(model.state.search.results);
    resultsView.render(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controllRecipe);
  searchView.addHandlerSearch(controlSearchResult);
};
init();

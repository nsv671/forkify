import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import recipeView from './views/recipeView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controllRecipe = async function () {
  try {
    // render spinner
    recipeView.renderSpinner();

    // Update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.render(model.state.bookmarks);

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

    // rendering search results
    console.log(model.state.search.results);
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    //render initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  console.log(goToPage);
  // rendering NEW search results
  resultsView.render(model.getSearchResultsPage(goToPage));

  //render NEW pagination button
  paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
  // updating the recipe servings
  model.updateServings(newServing);

  // updating the recipeview
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render the bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controllRecipe);
  recipeView.addHendlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
};
init();

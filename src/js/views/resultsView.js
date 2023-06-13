import View from './view.js';
import icons from '../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipe found for you query!, Please try another one';
  _message = '';

  _markup() {
    console.log(this._data);
    return this._data.map(res => this._markupPreview(res)).join('');
  }

  _markupPreview(data) {
    return `
    <li class="preview">
        <a class="preview__link preview__link--active" href="#${data.id}">
        <figure class="preview__fig">
            <img src="${data.image}" alt="${data.image}" />
        </figure>
        <div class="preview__data">
            <h4 class="preview__title">${data.title}</h4>
            <p class="preview__publisher">${data.publisher}</p>
        </div>
        </a>
    </li>
    `;
  }
}

export default new ResultsView();

export default class Section {
  constructor({ cardList, renderer }, containerSelector) {
    this._cardList = cardList;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCard() {
    this._cardList.forEach(element => {
      this._renderer(element)
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

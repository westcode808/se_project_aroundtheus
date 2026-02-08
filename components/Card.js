export default class Card {
    constructor(data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
        
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }

    generateCard(){
        this._element = this._getTemplate();

        this._cardImageElement = this._element.querySelector(".card__image");
        this._title = this._element.querySelector(".card__title");
        this._cardLikeButton = this._element.querySelector(".card__like-button");
        this._cardTrashButton = this._element.querySelector(".card__trash-button");
     
        this._cardImageElement.src = this._link;
        this._cardImageElement.alt = this._name;
        this._title.textContent = this._name;
 

        this._setEventListeners();
  
        return this._element;  
    }

    ///     HANDLERS    ///
    _handleLikeClick() {
        this._cardLikeButton.classList.toggle("card__like-button_active");
    }

    _handleDeleteClick() {
        this._element.remove();
        this._element = null;
    }

    ///     EVENT LISTENERS     ///
    _setEventListeners() {
        this._cardLikeButton.addEventListener("click", () => {
            this._handleLikeClick();
        });
        
        this._cardTrashButton.addEventListener("click", () => {
            this._handleDeleteClick();
        });

        this._cardImageElement.addEventListener("click", () => {
            this._handleImageClick(this._name, this._link);
        });
    }

}
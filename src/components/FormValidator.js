export default class FormValidator {
    constructor(options, formElement) {
        this._options = options;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
        this._submitButton = this._formElement.querySelector(this._options.submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorMessageElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._options.inputErrorClass);
        errorMessageElement.textContent = inputElement.validationMessage;
        errorMessageElement.classList.add(this._options.errorClass);   
    }

    _hideInputError(inputElement) {
        const errorMessageElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._options.inputErrorClass);
        errorMessageElement.textContent = '';
        errorMessageElement.classList.remove(this._options.errorClass);   
    }

    _checkInputValidity(inputElement) {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _toggleButtonState() {
        let foundInvalid = false;
        this._inputList.forEach(inputElement => {
            if(!inputElement.validity.valid) {
                foundInvalid = true;
            }
        });
        if(foundInvalid) {
            this._submitButton.classList.add(this._options.inactiveButtonClass);
            this._submitButton.disabled = true;
        } else {
            this._submitButton.classList.remove(this._options.inactiveButtonClass);
            this._submitButton.disabled = false;
        }
    }

    _setEventListeners() {
        this._toggleButtonState()
    
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener("input", () => {            
            this._checkInputValidity(inputElement);            
            this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }

    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });

        this._toggleButtonState();
    }
}
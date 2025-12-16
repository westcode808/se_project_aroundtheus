function showInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(errorClass);   
};

function hideInputError(formElement, inputElement, {inputErrorClass, errorClass}) {
    const errorMessageElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorMessageElement.textContent = '';
    errorMessageElement.classList.remove(errorClass);   
};

const checkInputValidity = (formElement, inputElement, options) => {
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, options);
    } else {
        hideInputError(formElement, inputElement, options);
    }
};

function toggleButtonState(inputList, submitButton, {inactiveButtonClass}) {
    let foundInvalid = false;
    inputList.forEach(inputElement => {
        if(!inputElement.validity.valid) {
            foundInvalid = true;
        }
    });
    if(foundInvalid) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.disabled = true;
    } else {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.disabled = false;


    }
}

function setEventListeners(formElement, options) {
    const { inputSelector } = options;
    const {submitButtonSelector} = options;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", function() {            
            checkInputValidity(formElement, inputElement, options);            
            toggleButtonState(inputList, submitButton, options);

        });
    });
};

function enableValidation(options) {
    const formElements = Array.from(document.querySelectorAll(options.formSelector));
    formElements.forEach((formElement) => {
        formElement.addEventListener("submit", (event) => {
            event.preventDefault();
            formElement.reset();
            
            const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
            const submitButton = formElement.querySelector(options.submitButtonSelector);
            toggleButtonState(inputList, submitButton, options);
            
        });
        setEventListeners(formElement, options);
    });
};

function resetValidation(formElement, options) {
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    const submitButton = formElement.querySelector(options.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, options);
    });

    toggleButtonState(inputList, submitButton, options);
}
    

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

enableValidation(config);
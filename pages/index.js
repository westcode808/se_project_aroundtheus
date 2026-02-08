//  Imports //
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";


// Constants / Config //
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};


//  DOM Elements  //
// Buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const profileCloseButton = document.querySelector("#profile-close-button");
const addCardModalCloseButton = document.querySelector("#add-card-close-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const previewImageCloseButton = document.querySelector("#image-preview-close-button");

// Modals
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal")
const previewImageModal = document.querySelector("#image-preview-modal")

// Forms
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModalForm = addCardModal.querySelector("#add-card-form");

// Profile
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// Card
const cardTitleInput = addCardModalForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardModalForm.querySelector(".modal__input-type_url");

// Preview
const previewImageContainer = previewImageModal.querySelector(".modal__container_preview")
const previewImageElement = document.querySelector(".modal__preview-image")
const previewImageTitle = previewImageModal.querySelector(".modal__description");

// Cards
const cardsWrap = document.querySelector(".cards__list");


//  Modal - Functions //
let activeModal = null;
function overlayHandleClose(event) {
  if (event.key === "Escape" && activeModal) {
      closeModal(activeModal);
    }

  if (event.type === "click") {
    if (event.target.classList.contains('modal')) {
    closeModal(event.target);
    }
  }
}

function openModal(modal) {
  activeModal = modal;
  modal.classList.add("modal_opened");
  modal.addEventListener('click', overlayHandleClose);
  document.addEventListener("keydown", overlayHandleClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener('click', overlayHandleClose);
  document.removeEventListener("keydown", overlayHandleClose);
  activeModal = null;
}


//  Card - Function  //
function handleImageClick(name, link) {
 previewImageElement.src = link;
 previewImageElement.alt = name;
 previewImageTitle.textContent = name;
 openModal(previewImageModal);
}

function renderCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.generateCard();
  cardsWrap.prepend(cardElement);
};


//  Form - Handlers //
function handleProfileFormSubmit(event) {
  event.preventDefault();
  if (!profileNameInput.value.trim() || !profileDescriptionInput.value.trim()) {
    return; 
  }
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardFormSubmit(event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({name, link}, cardsWrap);
  addCardModalForm.reset();
  addCardValidator.resetValidation();
  closeModal(addCardModal);
}


//  FormValidator //
const profileEditValidator = new FormValidator(config, profileEditForm);
profileEditValidator.enableValidation();

const addCardValidator = new FormValidator(config, addCardModalForm);
addCardValidator.enableValidation();


//  Event Listeners //
// Profile Modal
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditValidator.resetValidation();
  openModal(profileEditModal);
});

profileCloseButton.addEventListener("click", () => closeModal(profileEditModal));
profileEditForm.addEventListener("submit", handleProfileFormSubmit); 

//  Add Card Modal
addNewCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

addCardModalCloseButton.addEventListener("click", () => closeModal(addCardModal));
addCardModalForm.addEventListener("submit", handleAddCardFormSubmit); 

// Preview Image Modal
previewImageCloseButton.addEventListener("click", () => closeModal(previewImageModal));


// Initial Render //
initialCards.forEach((cardData) => renderCard(cardData));

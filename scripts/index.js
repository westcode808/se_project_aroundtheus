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
/* Buttons */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileCloseButton = document.querySelector("#profile-close-button");
const addCardModalCloseButton = document.querySelector("#add-card-close-button");
const addNewCardButton = document.querySelector(".profile__add-button");


/* Elements */
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal")
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModalForm = addCardModal.querySelector("#add-card-form");
const cardsWrap = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = addCardModalForm.querySelector(".modal__input_type_title");
const cardUrlInput = addCardModalForm.querySelector(".modal__input-type_url");


/* Functions */
function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closePopUp() {
  profileEditModal.classList.remove("modal_opened");
  addCardModal.classList.remove("modal_opened");

}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardTrashButton = cardElement.querySelector(".card__trash-button");


  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");

})

  cardTrashButton.addEventListener("click", () => {
    cardElement.remove();
  })


  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;
  
  return cardElement;  
}

/* Event Handlers */
function handleProfileFormSubmit(event) {
if (!profileNameInput.value.trim() || !profileDescriptionInput.value.trim()) {
  return; 
  }
event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function handleAddCardFormSubmit(event) {
event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({name, link}, cardsWrap);
  closePopUp(addCardModal);
}

/* Event Listeners */
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileCloseButton.addEventListener("click", closePopUp);
profileEditForm.addEventListener("submit", handleProfileFormSubmit); 
addCardModalForm.addEventListener("submit", handleAddCardFormSubmit); 

// Add New Card Button
addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardModalCloseButton.addEventListener("click", closePopUp);

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

function renderCard(cardData, cardsWrap) {
  const cardElement = getCardElement(cardData);
  cardsWrap.prepend(cardElement);
}
//  Imports //
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import { 
  initialCards,
  config,
  profileEditButton,
  addNewCardButton,
  profileEditForm,
  addCardModalForm,
  profileName,
  profileDescription,
  profileNameInput,
  profileDescriptionInput,
  cardTitleInput,
  cardUrlInput, } from "../utils/constants.js";


//  Card - Function  //
function handleImageClick(name, link) {
  imagePopup.open({ name, link });
};


//  FormValidator //
const profileEditValidator = new FormValidator(config, profileEditForm);
profileEditValidator.enableValidation();

const addCardValidator = new FormValidator(config, addCardModalForm);
addCardValidator.enableValidation();


//  Event Listeners //
// Profile Modal
profileEditButton.addEventListener("click", () => {
  const currentUser = userDetails.getUserInfo();

  profileNameInput.value = currentUser.name;
  profileDescriptionInput.value = currentUser.job;
  profileEditValidator.resetValidation();
  profilePopup.open();
});


//  Add Card Modal
addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});


// Initial Render //

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item,
        "#card-template",
        handleImageClick
      )
      const cardElement = card.generateCard()

      cardSection.addItem(cardElement);
    }
  },
  ".cards__list"
);
cardSection.renderItems();


const addCardPopup = new PopupWithForm("#add-card-modal", (data) => {
  const card = new Card(
    { name: data.title, link: data.link }, 
    "#card-template", 
    handleImageClick
  );

  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
  addCardPopup.close();
});
addCardPopup.setEventListeners();


const profilePopup = new PopupWithForm("#profile-edit-modal", (data) => {
  userDetails.setUserInfo(
    { name: data.title, job: data.description}
  )
  profilePopup.close();
});
profilePopup.setEventListeners();

const imagePopup = new PopupWithImage("#image-preview-modal");
imagePopup.setEventListeners();

const userDetails = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description"
});
import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { CardContext, CardToRemoveContext } from "../contexts/CardContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import RemoveCardPopup from "./RemoveCardPopup";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import RegisterPopup from "./RegisterPopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import success from "../images/successRegister.svg";
import failRegister from "../images/registerFail.svg";
import * as auth from "../utils/auth";

function App() {
    const history = useHistory();
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [cards, setCards] = useState([]);
    const [cardToRemove, setCardToRemove] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isRemovePopupOpen, setRemovePopup] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isRegisterPopupOpen, setRegisterPopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState({
        name: "",
        link: "",
    });
    const [submitText, setSubmitText] = useState("");
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setIsImagePopupOpen(false);
        setRemovePopup(false);
        setRegisterPopup(false);
    }
    function openEditProfile() {
        setEditProfilePopupOpen(true);
    }
    function openAddPlacePopup() {
        setAddPlacePopupOpen(true);
    }
    function openEditAvatarPicture() {
        setEditAvatarPopupOpen(true);
    }

    function handleCardClick(card) {
        setIsImagePopupOpen(true);
        setSelectedCard({ name: card.name, link: card.link });
    }
    useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => console.log(err));
    }, []);

    function handleUserUpdate({ name, about }) {
        setSubmitText("Saving...");
        api.setUserInfo({ name, about })
            .then((res) => {
                setCurrentUser(res);
            })
            .then(closeAllPopups())
            .catch((err) => console.log(err))
            .finally(() => setSubmitText(""));
    }
    function handleAvatarUpdate({ avatar }) {
        setSubmitText("Saving...");
        api.updateAvatarImage({ avatar })
            .then((res) => {
                setCurrentUser(res);
            })
            .then(console.log())

            .then(closeAllPopups())
            .catch((err) => console.log(err))
            .finally(() => setSubmitText(""));
    }
    useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch((err) => console.log(err));
    }, []);
    function handleCardLike(card) {
        const isLiked = card.likes.some((user) => user._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((currentCard) =>
                        currentCard._id === card._id ? newCard : currentCard
                    )
                );
            })
            .catch((err) => console.log(err));
    }

    function handleRemovePopup(card) {
        setRemovePopup(true);
        setCardToRemove(card);
    }
    function handleSubmitRemove(card) {
        setSubmitText("Deleting...");
        api.deleteCard(card._id)
            .then((res) => {
                setCards((cards) =>
                    cards.filter((cardToStay) => cardToStay._id !== card._id)
                );
            })

            .then(closeAllPopups())
            .catch((err) => console.log(err))
            .finally(() => setSubmitText(""));
    }

    function handleCardsUpdate({ name, link }) {
        setSubmitText("Creating...");
        api.addCard({ name, link })
            .then((res) => {
                setCards([res, ...cards]);
            })

            .then(closeAllPopups())
            .catch((err) => console.log(err))
            .finally(() => setSubmitText(""));
    }

    const [registerImage, setImage] = useState("");
    const [registerText, setText] = useState("");
    function handleRegister(email, password) {
        auth.registerUser(email, password)
            .then((res) => {
                if (res.data) {
                    setImage(success);
                    setRegisterPopup(true);
                    setText("Success! You have now been registered.");
                    history.push("/signin");
                } else {
                    setImage(failRegister);
                    setRegisterPopup(true);
                    setText("Oops, something went wrong! Please try again.");
                }
            })
            .catch((err) => console.log(err));
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <CardContext.Provider value={cards}>
                <CardToRemoveContext.Provider value={cardToRemove}>
                    <RegisterPopup
                        isOpen={isRegisterPopupOpen}
                        onClose={closeAllPopups}
                        image={registerImage}
                        text={registerText}
                    />

                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                        isOpen={isImagePopupOpen}
                        submitText={submitText}
                    />
                    <RemoveCardPopup
                        onClose={closeAllPopups}
                        onSubmitHandler={handleSubmitRemove}
                        isOpen={isRemovePopupOpen}
                        submitText={submitText}
                    />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onAvatarUpdate={handleAvatarUpdate}
                        submitText={submitText}
                    />

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUserUpdate={handleUserUpdate}
                        submitText={submitText}
                    />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onCardsUpdate={handleCardsUpdate}
                        submitText={submitText}
                    />

                    <Header />

                    <Switch>
                        <ProtectedRoute exact path='/' isLoggedIn={isLoggedIn}>
                            <Main
                                onAddPlaceClick={openAddPlacePopup}
                                onEditProfileClick={openEditProfile}
                                onEditAvatarClick={openEditAvatarPicture}
                                onCardClick={handleCardClick}
                                onLike={handleCardLike}
                                onDeleteClick={handleRemovePopup}
                                onDeleteSubmit={handleSubmitRemove}
                                cards={cards}
                            />
                        </ProtectedRoute>
                        <Route path='/signup'>
                            <Register registerUser={handleRegister} />
                        </Route>
                        <Route path='/signin'>
                            <Login />
                        </Route>

                        <Route
                            path={"/"}
                            component={
                                <Redirect to={isLoggedIn ? "/" : "/signup"} />
                            }
                        />
                    </Switch>

                    <Footer />
                </CardToRemoveContext.Provider>
            </CardContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;

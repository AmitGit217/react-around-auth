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
import {
    Redirect,
    Route,
    Switch,
    useHistory,
    useLocation,
} from "react-router-dom";
import InfoToolTip from "./InfoToolTip";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import success from "../images/successRegister.svg";
import failRegister from "../images/registerFail.svg";
import auth from "../utils/auth";

function App() {
    const location = useLocation();
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
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [metaText, setMetaText] = useState("");
    const [redirection, setRedirection] = useState("");
    const [userEmail, setEmail] = useState("");
    const [registerImage, setImage] = useState("");
    const [registerText, setText] = useState("");
    const [isLoading, setLoading] = useState(false);

    const inApp = location.pathname === "/";
    const inRegister = location.pathname === "/signup";
    const inLogin = location.pathname === "/signin";

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

    function handleUserUpdate({ name, about }) {
        setLoading(true);
        api.setUserInfo({ name, about })
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }
    function handleAvatarUpdate({ avatar }) {
        setLoading(true);
        api.updateAvatarImage({ avatar })
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }

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
    function handleSubmitRemove(cardToRemove) {
        setLoading(true);
        api.deleteCard(cardToRemove._id)
            .then((res) => {
                setCards((cards) =>
                    cards.filter((card) => card._id !== cardToRemove._id)
                );
                closeAllPopups();
            })

            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }

    function handleCardsUpdate({ name, link }) {
        setLoading(true);
        api.addCard({ name, link })
            .then((res) => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }

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

    function handleLogin(email, password) {
        auth.loginUser(email, password)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem("token", res.token);
                    setEmail(email.email);
                    setLoggedIn(true);
                    history.push("/");
                } else {
                    setImage(failRegister);
                    setRegisterPopup(true);
                    setText("Oops, something went wrong! Please try again.");
                }
            })
            .catch((err) => console.log(err));
    }

    function handleRedirect() {
        if (inApp) {
            localStorage.removeItem("token");
            setEmail("");
            history.push("/signin");
            setLoggedIn(false);
        }
    }

    useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const token = localStorage.getItem("token");
            auth.checkToken(token)
                .then((res) => {
                    if (res) {
                        setEmail(res.data.email);
                        setLoggedIn(true);
                        history.push("/");
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [history]);

    useEffect(() => {
        if (inApp) {
            setMetaText("Log out");
            setRedirection("/signin");
        }
        if (inLogin) {
            setMetaText("Sign up");
            setRedirection("/signup");
        }
        if (inRegister) {
            setMetaText("Sign in");
            setRedirection("/singin");
        }
    }, [inApp, inLogin, inRegister, location.pathname]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <CardContext.Provider value={cards}>
                <CardToRemoveContext.Provider value={cardToRemove}>
                    <InfoToolTip
                        isOpen={isRegisterPopupOpen}
                        onClose={closeAllPopups}
                        image={registerImage}
                        text={registerText}
                    />

                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                        isOpen={isImagePopupOpen}
                        isLoading={isLoading}
                    />
                    <RemoveCardPopup
                        onClose={closeAllPopups}
                        onSubmitHandler={handleSubmitRemove}
                        isOpen={isRemovePopupOpen}
                        submitText={isLoading ? "Deleting..." : "Yes"}
                    />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onAvatarUpdate={handleAvatarUpdate}
                        submitText={isLoading ? "Saving..." : "Save"}
                    />

                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUserUpdate={handleUserUpdate}
                        submitText={isLoading ? "Saving..." : "Save"}
                    />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onCardsUpdate={handleCardsUpdate}
                        submitText={isLoading ? "Creating..." : "Create"}
                    />

                    <Header
                        routeText={metaText}
                        route={redirection}
                        logout={handleRedirect}
                        isLoggedIn={isLoggedIn}
                        userEmail={userEmail}
                    />

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
                            <Login loginUser={handleLogin} />
                        </Route>

                        <Route>
                            {isLoggedIn ? (
                                <Redirect to='/' />
                            ) : (
                                <Redirect to='/signin' />
                            )}
                        </Route>
                    </Switch>

                    <Footer />
                </CardToRemoveContext.Provider>
            </CardContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;

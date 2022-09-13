import React, { useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CardToRemoveContext } from "../contexts/CardContext";

function RemoveCardPopup({ onClose, isOpen, onSubmitHandler, isLoading }) {
    const currentCard = useContext(CardToRemoveContext);
    function handleSubmit(e) {
        e.preventDefault();
        onSubmitHandler(currentCard);
    }

    return (
        <PopupWithForm
            name='confirm'
            title='Are you sure?'
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}>
            <button className={`popup__submit`} type='submit'>
                {isLoading ? "Deleting..." : "Yes"}
            </button>
        </PopupWithForm>
    );
}

export default RemoveCardPopup;

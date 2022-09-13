import React from "react";
import PopupWithForm from "./PopupWithForm";

function InfoToolTip({ onClose, isOpen, text, image }) {
    return (
        <PopupWithForm name='register' onClose={onClose} isOpen={isOpen}>
            <img
                className='register__image'
                src={image}
                alt='register-status'
            />
            <h2 className='popup__title register__popup-title'>{text}</h2>
        </PopupWithForm>
    );
}

export default InfoToolTip;

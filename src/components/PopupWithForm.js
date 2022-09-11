import "../blocks/popup.css";
import React from "react";

export default function PopupWithForm({
    isOpen,
    onClose,
    title,
    name,
    children,
    onSubmit,
}) {
    return (
        <div
            className={`popup popup_type_${name} ${
                isOpen ? "popup_show" : ""
            }`}>
            <div className={`popup__wrapper popup__wrapper_type_${name}`}>
                <button
                    className='popup__close-button'
                    type='button'
                    onClick={onClose}></button>
                <div className='popup__form-wrapper'>
                    <form className='popup__form' onSubmit={onSubmit}>
                        <h2 className='popup__title'>{title}</h2>
                        {children}
                    </form>
                </div>
            </div>
        </div>
    );
}

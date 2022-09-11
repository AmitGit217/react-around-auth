import React from "react";
export default function ImagePopup(props) {
    return (
        <>
            <div
                className={`popup popup_image ${
                    props.isOpen ? "popup_show" : ""
                }`}>
                <div className='popup__wrapper'>
                    <button
                        className='popup__close-button popup__close-button_image'
                        onClick={props.onClose}
                    />
                    <img
                        className='popup__image'
                        src={`${props.card.link}`}
                        alt={props.card.caption}
                    />
                    <p className='popup__caption'>{props.card.caption}</p>
                </div>
            </div>
        </>
    );
}

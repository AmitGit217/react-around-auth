import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

export default function Card({
    card,
    likeCounter,
    onCardClick,
    onDeleteClick,

    name,
    onLike,
}) {
    const currentUser = useContext(CurrentUserContext);

    function handleClick() {
        onCardClick(card);
    }

    function deleteCard() {
        onDeleteClick(card);
    }
    function handleLike() {
        onLike(card);
    }
    const isOwn = card.owner._id === currentUser._id;

    const showRemoveButton = isOwn ? true : `card__removeButton_hidden`;
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    const showLike = isLiked ? `card__like-button_active ` : false;
    return (
        <div className='card' key={card._id}>
            <img
                className='card__image'
                src={card.link}
                alt='placeHolder'
                onClick={handleClick}
            />
            <button
                className={`card__removeButton ${showRemoveButton}`}
                onClick={deleteCard}
            />
            <div className='card__social-brand'>
                <h2 className='card__caption'>{name}</h2>
                <div className='card__like'>
                    <button
                        className={`card__like-button ${showLike}`}
                        type='button'
                        onClick={handleLike}
                    />
                    <p className='card__like-counter'>{likeCounter}</p>
                </div>
            </div>
        </div>
    );
}

import React, { useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { REQUIRED, MIN_TWO, MAX_LENGTH } from "../lib/consts";
import thereIsErrors from "../utils/formError";

function EditProfilePopup({ isOpen, onClose, onUserUpdate, submitText }) {
    const currentUser = useContext(CurrentUserContext);
    console.log(currentUser.name);
    const editProfileForm = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: currentUser.name,
            about: currentUser.about,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required(REQUIRED)
                .min(2, MIN_TWO)
                .max(30, MAX_LENGTH),
            about: Yup.string()
                .required(REQUIRED)
                .min(2, MIN_TWO)
                .max(30, MAX_LENGTH),
        }),
        onSubmit: (values) => {
            onUserUpdate({
                name: values.name,
                about: values.about,
            });
        },
    });

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={editProfileForm.handleSubmit}
            name='editProfileText'
            title='Edit profile'>
            <label className='popup__field'>
                <input
                    className='popup__input'
                    name='name'
                    type='text'
                    placeholder='Full Name'
                    value={editProfileForm.values.name}
                    onChange={editProfileForm.handleChange}
                />
                {editProfileForm.errors.name && (
                    <span className='popup__input-error popup__input_type_error'>
                        {editProfileForm.errors.name}
                    </span>
                )}
            </label>
            <label className='popup__field'>
                <input
                    className='popup__input'
                    name='about'
                    type='text'
                    placeholder='Description'
                    value={editProfileForm.values.about}
                    onChange={editProfileForm.handleChange}
                />
                {editProfileForm.errors.about && (
                    <span className='popup__input-error popup__input_type_error'>
                        {editProfileForm.errors.about}
                    </span>
                )}
            </label>
            <button
                className={`popup__submit ${
                    thereIsErrors(editProfileForm.errors)
                        ? `popup__submit-button_inactive`
                        : ""
                }`}
                type='submit'
                disabled={thereIsErrors(editProfileForm.errors) ? true : false}>
                {submitText || "Save"}
            </button>
        </PopupWithForm>
    );
}

export default EditProfilePopup;

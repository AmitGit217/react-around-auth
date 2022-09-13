import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    REQUIRED,
    MIN_TWO,
    MAX_LENGTH,
    MUST_BE_VALID_URL,
} from "../lib/consts";

import thereIsErrors from "../utils/formError";

function AddPlacePopup({ isOpen, onClose, onCardsUpdate, submitText }) {
    const addCardForm = useFormik({
        initialValues: {
            name: "",
            link: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required(REQUIRED)
                .min(2, MIN_TWO)
                .max(30, MAX_LENGTH),
            link: Yup.string().url(MUST_BE_VALID_URL).required(REQUIRED),
        }),
        onSubmit: (values) => {
            onCardsUpdate({
                name: values.name,
                link: values.link,
            });
        },
    });
    const { values } = addCardForm;
    useEffect(() => {
        values.link = "";
        values.name = "";
        addCardForm.setErrors({});
    }, [isOpen]);

    return (
        <PopupWithForm
            name='addImage'
            title='New place'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={addCardForm.handleSubmit}>
            <label className='popup__field'>
                <input
                    onChange={addCardForm.handleChange}
                    value={addCardForm.values.name || ""}
                    onBlur={addCardForm.handleBlur}
                    className='popup__input'
                    type='text'
                    name='name'
                    placeholder='Title'
                />
                {addCardForm.errors.name && addCardForm.touched.name ? (
                    <span className='popup__input-error popup__input_type_error'>
                        {addCardForm.errors.name}
                    </span>
                ) : null}
            </label>
            <label className='popup__field'>
                <input
                    onChange={addCardForm.handleChange}
                    value={addCardForm.values.link || ""}
                    onBlur={addCardForm.handleBlur}
                    className='popup__input'
                    type='url'
                    name='link'
                    placeholder='Image Link'
                    required
                />
                {addCardForm.errors.link && addCardForm.touched.link ? (
                    <span className='popup__input-error popup__input_type_error'>
                        {addCardForm.errors.link}
                    </span>
                ) : null}
            </label>
            <button
                className={`popup__submit ${
                    thereIsErrors(addCardForm.errors) ||
                    addCardForm.values.name === "" ||
                    addCardForm.values.link === ""
                        ? `popup__submit-button_inactive`
                        : ""
                }`}
                type='submit'
                disabled={thereIsErrors(addCardForm.errors) ? true : false}>
                {submitText}
            </button>
        </PopupWithForm>
    );
}

export default AddPlacePopup;

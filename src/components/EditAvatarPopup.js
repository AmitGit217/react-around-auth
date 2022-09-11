import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { REQUIRED, MUST_BE_VALID_URL } from "../lib/consts";
import thereIsErrors from "../utils/formError";

function EditAvatarPopup({ isOpen, onClose, onAvatarUpdate, submitText }) {
    const editAvatarForm = useFormik({
        initialValues: {
            avatar: "",
        },
        validationSchema: Yup.object({
            avatar: Yup.string().url(MUST_BE_VALID_URL).required(REQUIRED),
        }),
        onSubmit: (values, { resetForm }) => {
            onAvatarUpdate({
                avatar: values.avatar,
            });
            resetForm({ values: "" });
        },
    });

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={editAvatarForm.handleSubmit}
            name='editAvatar'
            title='Change profile picture'>
            <label className='popup__field'>
                <input
                    onChange={editAvatarForm.handleChange}
                    value={editAvatarForm.values.avatar}
                    className='popup__input'
                    name='avatar'
                    placeholder='Image Link'
                />
                {editAvatarForm.errors.avatar && (
                    <span className='popup__input-error popup__input_type_error'>
                        {editAvatarForm.errors.avatar}
                    </span>
                )}
            </label>
            <button
                className={`popup__submit ${
                    thereIsErrors(editAvatarForm.errors) ||
                    editAvatarForm.values.avatar === ""
                        ? `popup__submit-button_inactive`
                        : ""
                }`}
                type='submit'
                disabled={thereIsErrors(editAvatarForm.errors) ? true : false}>
                {submitText || "Save"}
            </button>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;

import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import auth from "../utils/auth";

function Register({ registerUser }) {
    const register = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values, { resetForm }) => {
            registerUser({ email: values.email, password: values.password });
            // resetForm(values);
        },
    });

    return (
        <form className='register' onSubmit={register.handleSubmit}>
            <h1 className='register__title'>Sign up</h1>
            <input
                onChange={register.handleChange}
                value={register.values.email}
                name='email'
                className='register__input'
                type={"email"}
                placeholder='Email'
            />
            <input
                onChange={register.handleChange}
                value={register.values.password}
                name='password'
                className='register__input'
                type={"password"}
                placeholder='Password'
            />

            <button type='submit' className='register__submit'>
                Sign up
            </button>
            <p className='register__link'>
                Already a member?{" "}
                <Link to={"/signin"} className={"register__link_direction"}>
                    Log in here !
                </Link>
            </p>
        </form>
    );
}

export default Register;

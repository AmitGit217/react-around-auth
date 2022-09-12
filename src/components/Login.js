import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";

function Login({ loginUser }) {
    const login = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            loginUser({ email: values.email, password: values.password });
        },
    });

    return (
        <form className='register' onSubmit={login.handleSubmit}>
            <h1 className='register__title'>Sign in</h1>
            <input
                name='email'
                className='register__input'
                type={"email"}
                value={login.values.email || ""}
                onChange={login.handleChange}
                placeholder='Email'
            />
            <input
                name='password'
                className='register__input'
                type={"password"}
                onChange={login.handleChange}
                value={login.values.password || ""}
                placeholder='Password'
            />

            <button type='submit' className='register__submit'>
                Sign in
            </button>
            <p className='register__link'>
                Not a member yet?{" "}
                <Link to={"/signup"} className={"register__link_direction"}>
                    Sign up here !
                </Link>
            </p>
        </form>
    );
}

export default Login;

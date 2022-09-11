import React from "react";
import { Link } from "react-router-dom";

function Register() {
    return (
        <form className='register'>
            <h1 className='register__title'>Sign up</h1>
            <input
                name='email'
                className='register__input'
                type={"email"}
                placeholder='Email'></input>
            <input
                name='password'
                className='register__input'
                type={"password"}
                placeholder='Password'></input>

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

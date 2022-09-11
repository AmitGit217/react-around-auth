import React from "react";
import { Link } from "react-router-dom";

function Login() {
    return (
        <form className='register'>
            <h1 className='register__title'>Sign in</h1>
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

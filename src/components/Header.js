import "../blocks/header.css";
import React from "react";
import logo from "../images/Vector.svg";
import { Link } from "react-router-dom";
export default function Header({ route, routeText, logout, userEmail }) {
    return (
        <header className='header'>
            <div className='header__top'>
                <img className='header__vector' src={logo} alt='logo' />
                <div className='header__info'>
                    <p className='header__user'>{userEmail}</p>
                    <Link
                        to={route}
                        className='header__route-link'
                        onClick={logout}>
                        {routeText}
                    </Link>
                </div>
            </div>

            <span className='header__line'></span>
        </header>
    );
}

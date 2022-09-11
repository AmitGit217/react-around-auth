import "../blocks/header.css";
import React from "react";
import logo from "../images/Vector.svg";
export default function Header() {
    return (
        <header className='header'>
            <img className='header__vector' src={logo} alt='logo' />
            <span className='header__line'></span>
        </header>
    );
}

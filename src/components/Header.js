import "../blocks/header.css";
import React, { useEffect, useState } from "react";
import logo from "../images/Vector.svg";
import { Link } from "react-router-dom";

export default function Header({
    route,
    routeText,
    logout,
    userEmail,
    isLoggedIn,
}) {
    const [menu, setMenu] = useState("");
    const [layOut, setLayout] = useState("null");
    useEffect(() => {
        if (!isLoggedIn) {
            setMenu("");
            setLayout("");
        }
    }, [isLoggedIn]);
    function showMenu() {
        setMenu("header__show");
        setLayout("header__top_mobile");
    }
    function hideMenu() {
        setMenu("");
        setLayout("");
    }
    return (
        <header className='header'>
            <div className={`header__top ${isLoggedIn && layOut}`}>
                <div className='header_flex'>
                    <img className='header__vector' src={logo} alt='logo' />
                    {menu.length && isLoggedIn ? (
                        <button
                            onClick={hideMenu}
                            type='button'
                            className='header__close-button'
                        />
                    ) : null}
                </div>
                {!menu.length && isLoggedIn ? (
                    <button
                        type='button'
                        onClick={showMenu}
                        className={`${isLoggedIn ? "header__burger" : ""} 
                        
                    `}
                    />
                ) : null}
                {isLoggedIn ? (
                    <div
                        className={`header__info  ${
                            menu.length && `header__info_show`
                        }`}>
                        <p className='header__user'>{userEmail}</p>
                        <Link
                            to={route}
                            className='header__route-link'
                            onClick={logout}>
                            {routeText}
                        </Link>
                    </div>
                ) : (
                    <>
                        <div
                            className={`header__info  ${
                                menu.length && `header__info_show`
                            }`}>
                            <p className='header__user'>{userEmail}</p>
                        </div>
                        <Link
                            to={route}
                            className='header__route-link'
                            style={{ paddingRight: "10px" }}
                            onClick={logout}>
                            {routeText}
                        </Link>
                    </>
                )}
            </div>

            <span className='header__line'></span>
        </header>
    );
}

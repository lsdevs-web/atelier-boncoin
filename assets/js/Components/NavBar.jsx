import React from 'react';
import {NavLink} from "react-router-dom";
import API from "./Services/API";

const NavBar = (props) => {

    const handleLogout = () => {
        API.logout();
        props.onLogout(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <NavLink to="/" className="navbar-brand">Leboncoin</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                   <span className="navbar-toggler-icon">

                   </span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav mr-auto">
                        <form className="form-inline my-2 my-lg-0 ml-2">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search"/>
                            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <li className="btn btn-dark ml-4 btn-sm my-2 my-sm-0">
                            <NavLink className="nav-link" to="/annonces">Déposer une annonce</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        {!props.isAuth &&
                            <>
                                <button className="btn btn-dark btn-sm mx-2">
                                    <NavLink className="nav-link" to="/register">Inscription</NavLink>
                                </button>
                                <li className="btn btn-dark btn-sm mx-2">
                                    <NavLink className="nav-link" to="/login">Connexion</NavLink>
                                </li>
                            </>
                        }
                        {props.isAuth &&
                        <button onClick={handleLogout} className="btn btn-dark btn-sm mx-2">
                            <NavLink className="nav-link" to="/">Déconnexion</NavLink>
                        </button>}

                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
import React from 'react';
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <Link to="/" className="navbar-brand">Leboncoin</Link>
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
                            <a className="nav-link" href="#">Déposer une annonce</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="btn btn-dark btn-sm">
                            <a className="nav-link" href="#">Connexion</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
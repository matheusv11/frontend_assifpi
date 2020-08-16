import React from 'react';
import {NavLink} from 'react-router-dom';

const NavBar= ()=>{

    return(
        
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <NavLink to="/" className="navbar-brand text-white">
                        <img src="assets/sobre/img/logocolor.png" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy"/>
                                ASSIFPI
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                <li className="nav-item">
                        <NavLink activeClassName="nav-link text-success" exact to="/" className="nav-link text-white">
                            Home
                        </NavLink>
                </li>

                <li className="nav-item">
                        <NavLink to="/feed" activeClassName="nav-link text-success" className="nav-link text-white">
                            Notícias
                        </NavLink>
                </li>

                <li className="nav-item">
                        <NavLink to="/convenios" activeClassName="nav-link text-success" className="nav-link text-white">
                            Convênios
                        </NavLink>
                </li>

                <li className="nav-item">
                        <NavLink to="/sobre" activeClassName="nav-link text-success" className="nav-link text-white">
                            Sobre
                        </NavLink>
                </li>

                <li className="nav-item">
                        <NavLink to="/acesso" activeClassName="nav-link text-success" className="nav-link text-white">
                            Área do associado
                        </NavLink>
                </li>

                </ul>
                
                </div>
        </nav>
    )
}

export default NavBar;
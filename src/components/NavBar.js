import React from 'react';
import {Link} from 'react-router-dom';

const NavBar= ()=>{
    
    return(
        

            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <Link to="/" className="navbar-brand text-white">
                        <img src="assets/sobre/img/logocolor.png" width="30" height="30" className="d-inline-block align-top" alt="" loading="lazy"/>
                                ASSIFPI
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                <li className="nav-item">
                        <Link to="/" className="nav-link text-white">
                            Home
                        </Link>
                </li>

                <li className="nav-item">
                        <Link to="/feed" className="nav-link text-white">
                            Notícias
                        </Link>
                </li>

                <li className="nav-item">
                        <Link to="/convenios" className="nav-link text-white">
                            Convênios
                        </Link>
                </li>

                <li className="nav-item">
                        <Link to="/sobre" className="nav-link text-white">
                            Sobre
                        </Link>
                </li>

                <li className="nav-item">
                        <Link to="/acesso" className="nav-link text-white">
                            Área do associado
                        </Link>
                </li>



                </ul>
                
                </div>
        </nav>
    )
}

export default NavBar;
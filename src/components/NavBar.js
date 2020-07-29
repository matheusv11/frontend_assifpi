import React from 'react';
import {Link} from 'react-router-dom';

const NavBar= ()=>{
    
    return(
        <nav className="navbar navbar-light navbar-expand-lg fixed-top" id="mainNav">
                <div className="container">
                <Link to="/" className="navbar-brand" >
                <img src="assets/sobre/img/logocolor.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy"/>
                    ASSIFPI
                </Link>
                <button
                    data-toggle="collapse"
                    data-target="#navbarResponsive"
                    className="navbar-toggler"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fa fa-bars" />
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item" role="presentation">
                        <Link to="/" className="nav-link">
                        Home
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/feed" class="nav-item">
                            Notícias
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/convenios" class="nav-item">
                            Convênios
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/sobre" class="nav-item">
                            Sobre
                        </Link>
                    </li>
                    <li className="nav-item" role="presentation">
                        <Link to="/acesso" class="nav-item">
                        Área do associado
                        </Link>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
    )
}

export default NavBar;
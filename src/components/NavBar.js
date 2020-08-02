import React from 'react';
import {Link} from 'react-router-dom';

const NavBar= ()=>{
    
    return(
        

            <nav class="navbar navbar-expand-lg navbar-light bg-dark">
                <Link to="/" className="navbar-brand text-white">
                        <img src="assets/sobre/img/logocolor.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy"/>
                                ASSIFPI
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">

                <li class="nav-item">
                        <Link to="/" className="nav-link text-white">
                            Home
                        </Link>
                </li>

                <li class="nav-item">
                        <Link to="/feed" class="nav-link text-white">
                            Notícias
                        </Link>
                </li>

                <li class="nav-item">
                        <Link to="/convenios" class="nav-link text-white">
                            Convênios
                        </Link>
                </li>

                <li class="nav-item">
                        <Link to="/sobre" class="nav-link text-white">
                            Sobre
                        </Link>
                </li>

                <li class="nav-item">
                        <Link to="/acesso" class="nav-link text-white">
                            Área do associado
                        </Link>
                </li>



                </ul>
                
                </div>
        </nav>
    )
}

export default NavBar;
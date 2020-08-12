import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import LoginSocio from '../components/socio/LoginSocio';
import CadastroSocio from '../components/socio/CadastroSocio';
import LoginAdm from '../components/adm/LoginAdm';
import Feed from './Feed';
import Convenios from './Convenios'

const Acesso= ()=>{

    const[isLogin,setLogin]=useState('login-socio');

    return( 
       <div id="page-acess" >

        <nav className="navbar navbar-expand-lg navbar-light bg-danger">
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
                        <label role="button" className="nav-link text-white" onClick={()=> setLogin('login-socio')}>Login Sócio</label>
                </li>

                <li className="nav-item">
                        <label role="button" className="nav-link text-white" onClick={()=> setLogin('cadastro')}>Cadastro de Sócio</label>
                </li>

                <li className="nav-item">
                        <label role="button" className="nav-link text-white" onClick={()=> setLogin('login-adm')}>Login Administrador</label>
                </li>

                </ul>
                
                </div>
        </nav>

          
          {isLogin==='login-socio' && <LoginSocio/>}
          {isLogin==='cadastro' && <CadastroSocio/>}
          {isLogin==='login-adm' && <LoginAdm/>}
          {isLogin==='feed' && <Feed/>}
          {isLogin==='convenios' && <Convenios/>}
       </div>
    )
}

export default Acesso;
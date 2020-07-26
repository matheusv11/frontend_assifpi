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

        <nav class="navbar navbar-expand-lg navbar-light bg-danger">
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
                        <label class="nav-link text-white" onClick={()=> setLogin('login-socio')}>Login Sócio</label>
                </li>

                <li class="nav-item">
                        <label class="nav-link text-white" onClick={()=> setLogin('cadastro')}>Cadastro de Sócio</label>
                </li>

                <li class="nav-item">
                        <label class="nav-link text-white" onClick={()=> setLogin('login-adm')}>Login Administrador</label>
                </li>

                <li class="nav-item">
                        <label class="nav-link text-white" onClick={()=> setLogin('feed')}>Feed de Postagens</label>
                </li>

                <li class="nav-item">
                        <label class="nav-link text-white" onClick={()=> setLogin('convenios')}>Convenios de sócios</label>
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
import React, {useState} from 'react';

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
        <a class="navbar-brand text-white" href="#">Uma imagem</a>
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
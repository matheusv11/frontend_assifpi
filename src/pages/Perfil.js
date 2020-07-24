import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../components/auth';

import PerfilSocio from '../components/socio/PerfilSocio';
import ListaDependentes from '../components/socio/ListaDependentes';
import CadastrarDependentes from '../components/socio/CadastrarDependentes';
import EditarSocio from '../components/socio/EditarSocio';
import Feed from './Feed';
import Convenios from './Convenios'


const Perfil=()=>{
      
        const [whatis,setWhatis]=useState('perfil');
        const {setToken}=useAuth();

        const Logout= ()=>{
                setToken(null);
                localStorage.removeItem('token');
        }

    return(
    <div id="page-perfil">

<nav class="navbar navbar-expand-lg navbar-light bg-danger">
        <a class="navbar-brand text-white" href="#">Uma imagem</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

        <li class="nav-item">
                <label class="nav-link text-white" onClick={()=> setWhatis('perfil')}>Meu Perfil</label>
        </li>

        <li class="nav-item">
                <label class="nav-link text-white" onClick={()=> setWhatis('dependentes')}>Perfil de Dependentes</label>
        </li>

        <li class="nav-item">
                <label class="nav-link text-white" onClick={()=> setWhatis('cd')}>Cadastrar Dependentes</label>
        </li>

        <li class="nav-item">
                <label class="nav-link text-white" onClick={()=> setWhatis('ei')}>Editar informações</label>
        </li>

        <li class="nav-item">
                <label class="nav-link text-white" onClick={()=> setWhatis()}>Pagamentos</label>
        </li>

        <li class="nav-item">
                <label class="nav-link text-white" onClick={()=> setWhatis()}>Solicitar Carteira</label>
        </li>

        <li class="nav-item">
                <label class="nav-link text-white" onClick={()=> setWhatis('feed')}>Feed de Postagens</label>
        </li>

        <li class="nav-item">
                <label class="nav-link text-white" onClick={()=> setWhatis('convenios')}>Convenios de socios</label>
        </li>

        <li class="nav-item">
                <label class="nav-link text-white" onClick={Logout}>Sair</label>
        </li>

        </ul>
        
        </div>
        </nav>


        {whatis==='perfil' && <PerfilSocio/> }
        {whatis==='dependentes' && <ListaDependentes/>}
        {whatis==='cd' && <CadastrarDependentes/>}    
        {whatis==='ei' && <EditarSocio/>}
        {whatis==='feed' && <Feed/>}
        {whatis==='convenios' && <Convenios/>}
        
    </div>
    )
}

export default Perfil;
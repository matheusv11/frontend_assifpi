import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../components/auth';

import PerfilSocio from '../components/socio/PerfilSocio';
import ListaDependentes from '../components/socio/ListaDependentes';
import CadastrarDependentes from '../components/socio/CadastrarDependentes';
import EditarSocio from '../components/socio/EditarSocio';
import Feed from './Feed';
import Convenios from './Convenios'
import Pagamentos from '../components/socio/Pagamanetos'


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
        <Link to="/" className="navbar-brand text-white">
                <img src="assets/sobre/img/logocolor.png" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy"/>
                        ASSIFPI
        </Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Pessoal
        </a>
        <div class="dropdown-menu bg-danger" aria-labelledby="navbarDropdownMenuLink">
        <label class="nav-link text-white" onClick={()=> setWhatis('perfil')}>Meu Perfil</label>
        <label class="nav-link text-white" onClick={()=> setWhatis('dependentes')}>Perfil de Dependentes</label>
        <label class="nav-link text-white" onClick={()=> setWhatis('cd')}>Cadastrar Dependentes</label>
        <label class="nav-link text-white" onClick={()=> setWhatis('ei')}>Editar informações</label>
        </div>
        </li>

        <li class="nav-item">
                <label class="nav-link text-white" onClick={()=> setWhatis('pagamentos')}>Pagamentos</label>
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
        {whatis==='pagamentos' && <Pagamentos/>}
        
    </div>
    )
}

export default Perfil;
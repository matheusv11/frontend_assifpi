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
      
        const [whatis,setWhatis]=useState(<PerfilSocio/>);
        const {setToken}=useAuth();

        const Logout= ()=>{
                setToken(null);
                localStorage.removeItem('token');
        }

    return(
    <div id="page-perfil">

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

        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle text-white" href="/#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Pessoal
        </a>
        <div className="dropdown-menu bg-danger" aria-labelledby="navbarDropdownMenuLink">
        <label role="button" className="nav-link text-white" onClick={()=> setWhatis(<PerfilSocio/>)}>Meu Perfil</label>
        <label role="button" className="nav-link text-white" onClick={()=> setWhatis(<ListaDependentes/>)}>Perfil de Dependentes</label>
        <label role="button" className="nav-link text-white" onClick={()=> setWhatis(<CadastrarDependentes/>)}>Cadastrar Dependentes</label>
        <label role="button" className="nav-link text-white" onClick={()=> setWhatis(<EditarSocio/>)}>Editar informações</label>
        </div>
        </li>

        <li className="nav-item">
                <label role="button" className="nav-link text-white" onClick={()=> setWhatis(<Pagamentos/>)}>Pagamentos</label>
        </li>

        <li className="nav-item">
                <label role="button" className="nav-link text-white" onClick={Logout}>Sair</label>
        </li>

        </ul>
        
        </div>
        </nav>


        {whatis}
       
        
    </div>
    )
}

export default Perfil;
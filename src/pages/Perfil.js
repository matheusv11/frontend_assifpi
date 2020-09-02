import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../components/auth';

import PerfilSocio from '../components/socio/PerfilSocio';
import ListaDependentes from '../components/socio/ListaDependentes';
import CadastrarDependentes from '../components/socio/CadastrarDependentes';
import EditarSocio from '../components/socio/EditarSocio';
import Pagamentos from '../components/socio/Pagamentos'
import Agenda from '../components/Agenda';

const Perfil=()=>{
      
        const [whatis,setWhatis]=useState(<PerfilSocio/>);
        const[color,setColor]=useState('lb1') 

        const {setToken}=useAuth();

        const Logout= ()=>{
                setToken(null);
                localStorage.removeItem('token');
        }

    return(
    <div id="page-perfil">

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

        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle text-white" href="/#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Pessoal
        </a>
        <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
        <label role="button" className={`nav-link text-${color==="lb1" ? "success" : "white"}`} onClick={()=> {setColor('lb1');setWhatis(<PerfilSocio/>)}}>Meu Perfil</label>
        <label role="button" className={`nav-link text-${color==="lb2" ? "success" : "white"}`} onClick={()=> {setColor('lb2');setWhatis(<ListaDependentes/>)}}>Perfil de Dependentes</label>
        <label role="button" className={`nav-link text-${color==="lb3" ? "success" : "white"}`} onClick={()=> {setColor('lb3');setWhatis(<CadastrarDependentes/>)}}>Cadastrar Dependentes</label>
        <label role="button" className={`nav-link text-${color==="lb4" ? "success" : "white"}`} onClick={()=> {setColor('lb4');setWhatis(<EditarSocio/>)}}>Editar informações</label>
       

        </div>
        </li>

        <li className="nav-item">
                <label role="button" className={`nav-link text-${color==="lb5" ? "success" : "white"}`} onClick={()=> {setColor('lb5');setWhatis(<Agenda/>)}}>Agenda de eventos</label>
        </li>

        <li className="nav-item">
                <label role="button" className={`nav-link text-${color==="lb6" ? "success" : "white"}`} onClick={()=> {setColor('lb6');setWhatis(<Pagamentos/>)}}>Pagamentos</label>
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
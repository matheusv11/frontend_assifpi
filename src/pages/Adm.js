import React,{useState} from 'react';
import {useAuth} from '../components/auth';
import {Link} from 'react-router-dom'

import CadastrarAdm from '../components/adm/CadastrarAdm'
import CadastrarPostagem from '../components/adm/CadastrarPostagem'
import ListaAdms from '../components/adm/ListaAdms'
import ListaSocios from '../components/adm/ListaSocios'
import ListaSolicitantes from '../components/adm/ListaSolicitantes'
import PainelFinanceiro from '../components/adm/PainelFinanceiro'
import Gastos from '../components/adm/Gastos'


const Adm=()=>{

        const {setAdm}= useAuth();
        const[whatis,setWhatis]=useState(<ListaSocios/>);

        const Logout= ()=>{
                setAdm(null);
                localStorage.removeItem('admToken');
        }

    return(
        <div id='page-adm'>

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
                Pessoas
        </a>
        <div className="dropdown-menu bg-danger" aria-labelledby="navbarDropdownMenuLink">
        <label role="button" className="nav-link text-white" onClick={()=> setWhatis(<CadastrarAdm/>)}>Cadastrar Administrador</label>
        <label role="button" className="nav-link text-white" onClick={()=> setWhatis(<ListaAdms/>)}>Lista Administradores</label>
        <label role="button" className="nav-link text-white" onClick={()=> setWhatis(<ListaSocios/>)}>Lista Socios e Dependentes</label>
        <label role="button" className="nav-link text-white" onClick={()=> setWhatis(<ListaSolicitantes/>)}>Lista Solicitantes de Carteira</label>
        </div>
        </li>

        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle text-white" href="/#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sistema
        </a>
        <div className="dropdown-menu bg-danger" aria-labelledby="navbarDropdownMenuLink">
        <label role="button" className="nav-link text-white" onClick={()=> setWhatis(<CadastrarPostagem/>)}>Cadastrar Postagem</label>
        <label role="button" className="nav-link text-white" onClick={()=> setWhatis(<PainelFinanceiro/>)}>Painel Financeiro</label>
        <label role="button" className="nav-link text-white" onClick={()=> setWhatis(<Gastos/>)}>Gastos</label>
        </div>
        </li>

        <li className="nav-item">
                <label role="button" className="nav-link text-white" onClick={Logout} >Sair</label>
        </li>

        </ul>
        
        </div>
        </nav>

            {whatis}


        </div>
    );
}

export default Adm;
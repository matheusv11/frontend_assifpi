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
import Agenda from '../components/Agenda';
import Negociamento from '../components/adm/Negociamento'

const Adm=()=>{

        const {setAdm}= useAuth();
        const[whatis,setWhatis]=useState(<ListaSocios/>);
        const[color,setColor]=useState('lb1') 

        const Logout= ()=>{
                setAdm(null);
                localStorage.removeItem('admToken');
                }

    return(
        <div id='page-adm'>

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
                Pessoas
        </a>
        <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
        <label role="button" className={`nav-link text-${color==="lb1" ? "success" : "white"}`} onClick={()=> {setColor('lb1');setWhatis(<CadastrarAdm/>)}}>Cadastrar Administrador</label>
        <label role="button" className={`nav-link text-${color==="lb2" ? "success" : "white"}`} onClick={()=> {setColor('lb2');setWhatis(<ListaAdms/>)}}>Lista Administradores</label>
        <label role="button" className={`nav-link text-${color==="lb3" ? "success" : "white"}`} onClick={()=> {setColor('lb3');setWhatis(<ListaSocios/>)}}>Lista Sócios e Dependentes</label>
        <label role="button" className={`nav-link text-${color==="lb4" ? "success" : "white"}`} onClick={()=> {setColor('lb4');setWhatis(<ListaSolicitantes/>)}}>Lista Solicitantes de Carteira</label>

        </div>
        </li>

        <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle text-white" href="/#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sistema
        </a>
        <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdownMenuLink">
        <label role="button" className={`nav-link text-${color==="lb5" ? "success" : "white"}`} onClick={()=> {setColor('lb5');setWhatis(<Agenda/>)}}>Agenda de eventos</label>
        <label role="button" className={`nav-link text-${color==="lb6" ? "success" : "white"}`} onClick={()=> {setColor('lb6');setWhatis(<CadastrarPostagem/>)}}>Cadastrar Postagem</label>
        <label role="button" className={`nav-link text-${color==="lb7" ? "success" : "white"}`} onClick={()=> {setColor('lb7');setWhatis(<PainelFinanceiro/>)}}>Painel Financeiro</label>
        <label role="button" className={`nav-link text-${color==="lb8" ? "success" : "white"}`} onClick={()=> {setColor('lb8');setWhatis(<Gastos/>)}}>Gastos</label>
        </div>
        </li>

        <li className="nav-item">
                <label role="button" className={`nav-link text-${color==="lb9" ? "success" : "white"}`} onClick={()=> {setColor('lb9');setWhatis(<Negociamento/>)}}>Negociamento de dívidas</label>
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
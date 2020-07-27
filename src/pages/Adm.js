import React,{useState} from 'react';
import {useAuth} from '../components/auth';
import {Link} from 'react-router-dom'

import CadastrarAdm from '../components/adm/CadastrarAdm'
import CadastrarPostagem from '../components/adm/CadastrarPostagem'
import ListaAdms from '../components/adm/ListaAdms'
import ListaSocios from '../components/adm/ListaSocios'
import ListaSolicitantes from '../components/adm/ListaSolicitantes'
import PainelFinanceiro from '../components/adm/PainelFinanceiro'
import Feed from './Feed';
import Convenios from './Convenios'
import Gastos from '../components/adm/Gastos'

const Adm=()=>{

        const {setAdm}= useAuth();
        const[whatis,setWhatis]=useState('ls');

        const Logout= ()=>{
                setAdm(null);
                localStorage.removeItem('admToken');
        }

    return(
        <div id='page-adm'>

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
                Pessoas
        </a>
        <div class="dropdown-menu bg-danger" aria-labelledby="navbarDropdownMenuLink">
        <label class="nav-link text-white" onClick={()=> setWhatis('ca')}>Cadastrar Administrador</label>
        <label class="nav-link text-white" onClick={()=> setWhatis('la')}>Lista Administradores</label>
        <label class="nav-link text-white" onClick={()=> setWhatis('ls')}>Lista Socios e Dependentes</label>
        <label class="nav-link text-white" onClick={()=> setWhatis('lc')}>Lista Solicitantes de Carteira</label>
        </div>
        </li>

        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sistema
        </a>
        <div class="dropdown-menu bg-danger" aria-labelledby="navbarDropdownMenuLink">
        <label class="nav-link text-white" onClick={()=> setWhatis('cp')}>Cadastrar Postagem</label>
        <label class="nav-link text-white" onClick={()=> setWhatis('pf')}>Painel Financeiro</label>
        <label class="nav-link text-white" onClick={()=> setWhatis('feed')}>Feed de Postagens</label>
        <label class="nav-link text-white" onClick={()=> setWhatis('convenios')}>Convenios de sócios</label>
        <label class="nav-link text-white" onClick={()=> setWhatis('gastos')}>Gastos</label>
        </div>
        </li>


        <li class="nav-item">
                <label class="nav-link text-white" onClick={Logout} >Sair</label>
        </li>


        </ul>
        
        </div>
        </nav>

            {whatis==='ca' && <CadastrarAdm/>}
            {whatis==='cp' && <CadastrarPostagem/>}
            {whatis==='la' && <ListaAdms/>}
            {whatis==='ls' && <ListaSocios/>}
            {whatis==='lc' && <ListaSolicitantes/>}
            {whatis==='pf' && <PainelFinanceiro/>}
            {whatis=='feed' && <Feed/>}
            {whatis=='convenios' && <Convenios/>}
            {whatis=='gastos' && <Gastos/>}


        </div>
    );
}

export default Adm;
import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import LoginSocio from '../components/socio/LoginSocio';
import CadastroSocio from '../components/socio/CadastroSocio';
import LoginAdm from '../components/adm/LoginAdm';

const Acesso= ()=>{

    const[isLogin,setLogin]=useState(<LoginSocio/>);
    const[color,setColor]=useState('lb1') 

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
                        <label role="button" className={`nav-link text-${color==="lb1" ? "success" : "white"}`}
                        id="lb1" onClick={()=> {setColor('lb1');setLogin(<LoginSocio/>)}}>Login Sócio</label>
                </li>

                <li className="nav-item">
                        <label href="#" role="button" className={`nav-link text-${color==="lb2" ? "success" : "white"}`}
                         id="lb2" onClick={()=> {setColor('lb2');setLogin(<CadastroSocio/>)}}>Cadastro de Sócio</label>
                </li>

                <li className="nav-item">
                        <label href="#" role="button" className={`nav-link text-${color==="lb3" ? "success" : "white"}`}
                         id="lb3" onClick={()=> {setColor('lb3');setLogin(<LoginAdm/>)}}>Login Administrador</label>
                </li>

                </ul>
                
                </div>
        </nav>
        {isLogin}
       
       </div>
    )
}

export default Acesso;
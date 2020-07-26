import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PrivateSocioRoute from './privateSocioRoutes';
import PrivateAdmRoute from './privateAdmRoutes';

import PublicRoute from './publicRoutes';
import {useAuth} from '../components/auth';
//Paginas

import Home from '../pages/Home';
import Acesso from '../pages/Acesso';
import Perfil from '../pages/Perfil';
import Adm from '../pages/Adm';
import Feed from '../pages/Feed'
import Convenios from '../pages/Convenios'
import Sobre from '../pages/Sobre'

const Routes= ()=>{
    const {loading}= useAuth();

    if(loading){
        return (
          <div class="spinner-border" role="status">
           <span class="sr-only">Loading...</span>
          </div>
        )

    }
    
    return(
        <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <PrivateSocioRoute path="/perfil" component={Perfil}/>
                    <PrivateAdmRoute path="/administracao" component={Adm}/>
                    {/* <Route path="/acesso" component={Acesso}/> */}
                    <PublicRoute path="/acesso" component={Acesso}/>
                    <Route path="/feed" component={Feed} />
                    <Route path="/convenios" component={Convenios}/>
                    <Route path="/sobre" component={Sobre}/>
                </Switch>
        </BrowserRouter>
    )
}

export default Routes;
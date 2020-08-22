import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PrivateSocioRoute from './privateSocioRoutes';
import PrivateAdmRoute from './privateAdmRoutes';
import PublicRoute from './publicRoutes';
//Paginas

import Home from '../pages/Home';
import Acesso from '../pages/Acesso';
import Perfil from '../pages/Perfil';
import Adm from '../pages/Adm';
import Feed from '../pages/Feed'
import Convenios from '../pages/Convenios'
import Sobre from '../pages/Sobre'
import Termos from '../pages/Termos'
// const Home= lazy(()=> import('../pages/Home'))
// const Acesso= lazy(()=> import('../pages/Acesso'))

const Routes= ()=>{
    
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
                    <Route path="/termosdeuso" component={Termos}/>

                </Switch>

        </BrowserRouter>


    )
}

export default Routes;
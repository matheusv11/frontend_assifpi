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
import Feed from '../pages/Feed';
import Convenios from '../pages/Convenios';
import Sobre from '../pages/Sobre';
import Recuperar from '../pages/Recuperar';
import Page404 from '../pages/Page404';
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
                    <PublicRoute path="/recuperar/:token" component={Recuperar}/>
                    <Route path="/feed" component={Feed} />
                    <Route path="/convenios" component={Convenios}/>
                    <Route path="/sobre" component={Sobre}/>
                    <Route path="*" component={Page404}/>
                </Switch>

        </BrowserRouter>


    )
}

export default Routes;
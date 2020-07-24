import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from '../components/auth';

const PrivateRoutes=({component: Component, ...rest})=>{

    const {token}= useAuth();
    
    return(
        <Route {...rest} render={()=> token ? 
        (
            <Component {...rest}/>
        )
        :
        (
            <Redirect to="/acesso"/>
        )
        } />
    )
}

export default PrivateRoutes;
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from '../components/auth';

const PrivateRoutes=({component: Component, ...rest})=>{

    const {admToken}= useAuth();
    
    return(
        <Route {...rest} render={()=> admToken ? 
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
import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useAuth} from '../components/auth';

const PublicRoutes= ({component: Component, ...rest})=>{
    const {token,admToken}= useAuth();
        
        return(

            <Route {...rest} render={()=> token ?
                (
                    <Redirect to="/perfil"/>
                )
                :
                admToken ? (<Redirect to="/administracao"/>)
                :
                (
                    <Component {...rest}/>
                )
                
            }/>
        )

}

export default PublicRoutes;
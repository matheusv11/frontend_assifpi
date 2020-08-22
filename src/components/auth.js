import React,{createContext,useContext, useState, useEffect} from 'react'
import Spinner from './Spinner';
import connection from '../services/connection';

const AuthContext= createContext();

export const AuthProvider= ({children})=>{

    const [token,setToken]=useState(null);
    const [admToken,setAdm]=useState(null);
    const [loading,setLoading]=useState(false);
    const doc_url= process.env.REACT_APP_DOC_URL || 'http://localhost:3030/files';

    useEffect(()=>{
        const token= localStorage.getItem('token');
        const admToken= localStorage.getItem('admToken');

        if (token){
            setToken(token);
        }
        if(admToken){
            setAdm(admToken);
        }
        // setLoading(false); //Por esta sendo montado direto no render ele ja carrega isso direto, nao precisando fazer loading
    },[]);

    connection.interceptors.request.use((config) => {
        console.info("✉️ ", config)
        setLoading(true);
        return config;
    }, (error) => {
        console.error("✉️ ERROR ", error);
        setLoading(false); 
        return Promise.reject(error);
    });
    
    connection.interceptors.response.use((response)=>{
        console.error("✉️ Resposta ", response); //Apesar de retornar varios dados Acho que so roda uma vez entao o set nao fica mal otimizado
        setLoading(false);
        return response;
      },(error)=>{
        console.error("✉️ ERROR ", error); 
        setLoading(false);
        return Promise.reject(error);
      });
    //   console.log('Componente montado')
    // connection.interceptors.request.eject(Interceptor);
    return(
        <AuthContext.Provider value={{token, setToken, admToken, setAdm, doc_url}}>
            {children}
            {loading && <Spinner/>}

        </AuthContext.Provider>
    )
}

export const useAuth= ()=>{
    const context= useContext(AuthContext);
    return context
}
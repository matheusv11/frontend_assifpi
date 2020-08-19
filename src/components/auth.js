import React,{createContext,useContext, useState, useEffect} from 'react'

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

    

    return(
        <AuthContext.Provider value={{token, setToken, admToken, setAdm, setLoading, loading, doc_url}}>
        {/* <AuthContext.Provider value={{token, setToken, admToken, setAdm, loading}}> */}
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth= ()=>{
    const context= useContext(AuthContext);

    return context
}
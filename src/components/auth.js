import React,{createContext,useContext, useState, useEffect} from 'react'

const AuthContext= createContext();

export const AuthProvider= ({children})=>{

    const [token,setToken]=useState(null);
    const [admToken,setAdm]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const token= localStorage.getItem('token');
        const admToken= localStorage.getItem('admToken');

        if (token){
            setToken(token);
        }
        if(admToken){
            setAdm(admToken);
        }
        setLoading(false);

    },[]);

    

    return(
        <AuthContext.Provider value={{token, setToken, admToken, setAdm, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth= ()=>{
    const context= useContext(AuthContext);

    return context
}
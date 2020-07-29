import React,{useEffect, useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';

const ListaAdms=()=>{
    
    const {admToken,setLoading}=useAuth();
    const[adm_data,setAdm]=useState([]);

    useEffect(()=>{
        setLoading(true)
        connection.get('/adm', {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setLoading(false)
            setAdm(dados.data)
        }).catch((err)=>{
            setLoading(false)
            alert(err.message)
        })
    },[])

    return (
        <div id='componente-lista-adms' style={{margin:"0 auto",width:"80%"}}>
            <h2>Lista de administradores</h2>
            
            <div class="card" style={{borderWidth: '5px',borderColor:"green"}}>
                

                <div class="card-body">
                    
                    <div class="list-group">
                    
                    {adm_data.map(dados=>(

                    <a href="/" class="list-group-item list-group-item-action">{dados.nome}-{dados.email}</a>

                    ))}
                    
                    

                    </div>
                </div>
            </div>

        </div>
    );
}

export default ListaAdms;
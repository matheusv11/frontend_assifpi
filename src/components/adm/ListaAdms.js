import React,{useEffect, useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';

const ListaAdms=()=>{
    
    const {admToken}=useAuth();
    const[adm_data,setAdm]=useState([]);
    
    useEffect(()=>{
        connection.get('/adm', {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setAdm(dados.data)
        }).catch((err)=>{
            alert(err.message)
        })
// eslint-disable-next-line 
    },[])

    return (
        <div id='componente-lista-adms' style={{margin:"0 auto",width:"80%"}}>
            <h2>Lista de administradores
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-list-stars" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"/>
            <path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53z"/>
            </svg>
            </h2>
            
            <div className="card" style={{borderWidth: '5px',borderColor:"green"}}>
                

                <div className="card-body">
                    
                    <div className="list-group">
                    
                    {adm_data.map(dados=>(

                    <button 
                    type="button" 
                    className="list-group-item list-group-item-action"
                    style={{outline: "none"}}
                    >
                        {dados.nome}-{dados.email}
                    </button>

                    ))}
                    
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ListaAdms;
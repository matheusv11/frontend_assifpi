import React,{useEffect, useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';

const PainelFinanceiro=()=>{
    
    const {admToken}= useAuth();
    const[pendentes,setPendente]=useState([]);

    useEffect(()=>{
        connection.get('/faturas', {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setPendente(dados.data)
        }).catch((err)=>{
            alert(err)
        })
    },[]);

    return (
    <div id='componente-painel-financeiro' style={{margin:"0 auto",width:"80%"}}>
        <h2>Painel Financeiro</h2>
    
        <div class="card" style={{borderWidth: '5px',borderColor:"green"}}>
            <div class="card-body">
                <button type="button"  class="btn btn-success" 
                data-toggle="collapse" data-target="#collapseExample" 
                aria-expanded="false" aria-controls="collapseExample">VIZUALIZAR PENDENTES</button>

                <div class="collapse" id="collapseExample">
                    <ul class="list-group">
                        {pendentes.map(dados=>(
                            <li class="list-group-item list-group-item-danger"><p>Nome:{dados.nome}  CPF:{dados.cpf}</p></li>   
                        ))}
                    </ul>              
                </div>

                <div>
                    mais informações
                </div>
            
            </div>
        </div>
    </div>
    );
}

export default PainelFinanceiro;
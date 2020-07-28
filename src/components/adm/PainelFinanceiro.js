import React,{useEffect, useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';
import { Line,Doughnut } from 'react-chartjs-2';


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
                            <li class="list-group-item list-group-item-danger">Nome:{dados.nome}  CPF:{dados.cpf}</li>   
                        ))}
                    </ul>              
                </div>

                <div>
                    <Line  data= {{
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                    datasets: [{
                        label: 'Arrecadamentos',
                        backgroundColor: 'transparent',
                        borderColor: 'green',
                        data: [5, 20, 5, 2, 20, 30, 45]
                    },
                    {
                        label: 'Gastos',
                        backgroundColor: 'transparent',
                        borderColor: 'red',
                        data: [5, 10, 3, 1, 21, 20, 20]}]
                        }} options={{title:{
                            display:true,
                            fontSize:30,
                            text: "Arrecadamentos e dispesas"}}}/>

                     <Doughnut data={{
                        datasets:[{
                            backgroundColor: ['green','red','black','yellow','blue'],
                            data:[38,7,40,9,10]
                        }],
                        labels: [
                            'Em dia',
                            'Pendentes',
                            'Usuarios totais',
                            'Usuarios esperando validação',
                            'Usuarios esperando confeccionamento'
                        ],}} options={{title:{
                            display:true,
                            fontSize:30,
                            text: "Dados Gerais"
                        }}}/>   
                </div>
            
            </div>
        </div>
    </div>
    );
}

export default PainelFinanceiro;
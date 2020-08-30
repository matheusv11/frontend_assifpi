import React,{useEffect, useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';
import { Line,Doughnut } from 'react-chartjs-2';

const PainelFinanceiro=()=>{

    const {admToken}= useAuth();
    const meses= ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho','Agosto', 'Setembro','Outubro','Novembro', 'Dezembro']
    const[pendentes,setPendente]=useState([]);
    const[selected_date,setDate]=useState('2019');
    const[dados,setDados]=useState({anos: [], ganhos:[], gastos:[], doughnut:[]})

    useEffect(()=>{ 
        connection.get(`index_pagamentos?ano=${selected_date}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setDados({
                anos: dados.data.anos, ganhos: dados.data.soma_ganhos,
                gastos: dados.data.soma_gastos, doughnut: dados.data.doughnut
            })
        }).catch((err)=>{
            alert(err.message)
        })
        // eslint-disable-next-line
    },[selected_date])

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
        // eslint-disable-next-line
    },[]);
    const intersection= dados.ganhos.concat(dados.gastos);
    
    const array= intersection.map((item)=>{
        const [object_name]= Object.getOwnPropertyNames(item)
        return object_name
    })

    const filter_array = [...new Set(array)].sort();

    const object_ganhos= dados.ganhos.map((item)=>{
        const [object_name]= Object.getOwnPropertyNames(item)
        return object_name
    })

    const object_gastos= dados.gastos.map((item)=>{
        const [object_name]= Object.getOwnPropertyNames(item)
        return object_name
    })

    const labels= filter_array.map((dados, index)=>{ //Talvez o index serva depois
        const ok= dados.split('/') //Talvez o index serveria se nao fosse pela quebra do array
        const labels= meses[ok[0]-1]
        return labels
    })

    return (
    <div id='componente-painel-financeiro' style={{margin:"0 auto",width:"80%"}}>
        <h2>Painel Financeiro
        <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-bar-chart-line-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z"/>
        </svg>
        </h2>
    
        <div className="card" style={{borderWidth: '5px',borderColor:"green"}}>
            <div className="card-body">
                <button type="button"  className="btn btn-success" 
                data-toggle="collapse" data-target="#collapseExample" 
                aria-expanded="false" aria-controls="collapseExample">VIZUALIZAR PENDENTES</button>
                
                <select onChange={e=> setDate(e.target.value)} style={{marginLeft: '20px', borderRadius: '6px'}} className="btn btn-primary dropdown-toggle">
                  {dados.anos.map(anos=>(
                        <option>{anos.ano}</option>
                  ))}
                </select>

                <div className="collapse" id="collapseExample">
                    <ul className="list-group">
                        {pendentes.map(dados=>(
                            <li className="list-group-item list-group-item-danger">Nome:{dados.nome}  CPF:{dados.cpf}</li>   
                        ))}
                    </ul>              
                </div>

                <div>

                    <Line data= {{
                    labels: labels, //Ou indexOf para condicao ficar dentro da labels
                    datasets: [{
                        label: 'Arrecadamentos',
                        backgroundColor: 'transparent',
                        borderColor: 'green',
                        data: filter_array.map((meses,index)=>{
                            let increment= 0;
                            let element= object_ganhos.indexOf(meses);
                            let filtered= null;
                            if(element>-1){
                                [filtered]= Object.values(dados.ganhos[element])
                            }
                            
                            while(increment<filter_array.length){
                                let pos= filter_array.indexOf(object_ganhos[increment])
                                
                                if(index===pos){
                                    // console.log(`Igual na posicao ${index} + ${increment}`)
                                    return filtered
                                }
                                increment++
                            }
                            return null
                        })
                    },

                    {
                        label: 'Gastos',
                        backgroundColor: 'transparent',
                        borderColor: 'red',
                        data: filter_array.map(((meses,index)=>{
                            let increment= 0;
                            let element= object_gastos.indexOf(meses);
                            let filtered= null;
                            if(element>-1){
                                [filtered]= Object.values(dados.gastos[element])
                            }
                            
                            while(increment<filter_array.length){
                                let pos= filter_array.indexOf(object_gastos[increment])
                                
                                if(index===pos){
                                    // console.log(`Igual na posicao ${index} + ${increment}`)
                                    return filtered
                                }
                                increment++
                            }
                            return null
                        }))
                    }]
                        }} options={{
                            title:{
                            display:true,
                            fontSize:30,
                            text: "Arrecadamentos e dispesas"
                            },
                            spanGaps: true,
                            tooltips: {
                                mode: 'index',
                                intersect: false,
                              },
                            }}/>

                     <Doughnut data={{
                        datasets:[{
                            backgroundColor: ['green','yellow'],
                            data: dados.doughnut,
                        }],
                        labels: [
                            'Em dia',
                            'Pendentes',
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
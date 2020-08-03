import React,{useEffect, useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';
import { Line,Doughnut } from 'react-chartjs-2';

const PainelFinanceiro=()=>{

    const {admToken,setLoading, loading}= useAuth();
    // const[dados,setDados]=useState({})
    const meses= ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho','Agosto', 'Setembro','Outubro','Novembro', 'Dezembro']
    const[pendentes,setPendente]=useState([]);
    const[anos,setAnos]=useState([]);
    const[soma_ganhos,setGanhos]=useState([]);
    const[soma_gastos,setGastos]=useState([]);
    const[selected_date,setDate]=useState('2020');
    const[doughnut,setDougdata]=useState('');

    useEffect(()=>{ 
        setLoading(true)
        connection.get(`index_pagamentos?ano=${selected_date}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setLoading(false)
            setAnos(dados.data.anos);
            setGanhos(dados.data.soma_ganhos)
            setGastos(dados.data.soma_gastos)
            setDougdata(dados.data.doughnut)

        }).catch((err)=>{
            setLoading(false)
            alert(err.message)
        })

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
    },[]);


    
    const intersection= soma_ganhos.concat(soma_gastos);
    
    const array= intersection.map((item)=>{
        const [object_name]= Object.getOwnPropertyNames(item)
        return object_name
    })

    const filter_array = array.filter((item, pos, self)=> {
        return self.indexOf(item) == pos;
    })

    const labels= filter_array.map((dados, index)=>{ //Talvez o index serva depois
        // const [object_name]= Object.getOwnPropertyNames(dados)
        const ok= dados.split('/') //Talvez o index serveria se nao fosse pela quebra do array
        const labels= meses[ok[0]-1]
        // return setLabel(labels); //Bom testar
        return labels
        
    })

    return (
    <div id='componente-painel-financeiro' style={{margin:"0 auto",width:"80%"}}>
        <h2>Painel Financeiro</h2>
    
        <div class="card" style={{borderWidth: '5px',borderColor:"green"}}>
            <div class="card-body">
                <button type="button"  class="btn btn-success" 
                data-toggle="collapse" data-target="#collapseExample" 
                aria-expanded="false" aria-controls="collapseExample">VIZUALIZAR PENDENTES</button>
                

                <select onChange={e=> setDate(e.target.value)} style={{marginLeft: '20px', borderRadius: '6px'}} class="btn btn-primary dropdown-toggle">
                  {anos.map(anos=>(
                        <option>{anos.ano}</option>
                  ))}
                </select>

                <div class="collapse" id="collapseExample">
                    <ul class="list-group">
                        {pendentes.map(dados=>(
                            <li class="list-group-item list-group-item-danger">Nome:{dados.nome}  CPF:{dados.cpf}</li>   
                        ))}
                    </ul>              
                </div>

                <div>

                    <Line  data= {{
                    labels: labels, //Ou indexOf para condicao ficar dentro da labels
                    datasets: [{
                        label: 'Arrecadamentos',
                        backgroundColor: 'transparent',
                        borderColor: 'green',
                        data: soma_ganhos.map((meses,index)=>{
                            let [retorno]= Object.values(meses);
                            return retorno
                            // return meses[index]
                        }),
                        // data: valores.reverse() //So dar um reverse //Reverse na label 
                    },

                    {
                        label: 'Gastos',
                        backgroundColor: 'transparent',
                        borderColor: 'red',
                        data: filter_array.map(((meses,index)=>{
                            let split= meses.split('/')
                            // let Objeto= Object.getOwnPropertyNames(soma_gastos[index])
                            // console.log(Objeto[index].split('/'));
                            // if(split[0]!== ok[0]){
                            //     return 0
                            // }
                            let [retorno]= Object.values(meses)
                            return retorno
                        }))
                    }]
                        }} options={{title:{
                            display:true,
                            fontSize:30,
                            text: "Arrecadamentos e dispesas"}}}/>

                     <Doughnut data={{
                        datasets:[{
                            backgroundColor: ['green','yellow','blue'],
                            data: doughnut,
                        }],
                        labels: [
                            'Em dia',
                            'Pendentes',
                            'Usuarios totais',
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
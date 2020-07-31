import React,{useEffect, useState} from 'react';
import {useAuth} from '../auth';
import connection from '../../services/connection';
import { Line,Doughnut } from 'react-chartjs-2';

const PainelFinanceiro=()=>{

    const {admToken, setLoading}= useAuth();
    // const[dados,setDados]=useState({})
    const[pendentes,setPendente]=useState([]);
    const[anos,setAnos]=useState([])
    const[meses_anos,setMeses]=useState([])
    const[selected_date,setDate]=useState('2020');
    const meses= ['Janeiro', 'Fevereiro', 'Marco', 'Abril', 'Maio', 'Junho', 'Julho','Agosto', 'Setembro','Outubro','Novembro', 'Dezembro']
    

    useEffect(()=>{
        setLoading(true)
        connection.get(`index_pagamentos?ano=${selected_date}`, {
            headers:{
                authorization: `Bearer ${admToken}`
            }
        }).then((dados)=>{
            setLoading(false)
            setAnos(dados.data.anos);
            setMeses(dados.data.meses_anos)
            // setDados(dados.data)//Ou setar

        }).catch((err)=>{
            setLoading(false)
            alert(err.message)
        })
    },[selected_date])

    const factory= meses_anos.map((dados, index)=>{ //Talvez o index serva depois
        const [object_name]= Object.getOwnPropertyNames(dados)
        const ok= object_name.split('/') //Talvez o index serveria se nao fosse pela quebra do array
        const labels= meses[ok[0]-1]
        return labels
        // To float pode funcionar no back //Retornar labels da posicao do mes
        // return ok[index] Pegar ano e mes // console.log(parseInt(ok[0])) 
        
    })

//Loading

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
                    labels: factory, //Ou indexOf para condicao ficar dentro da labels
                    datasets: [{
                        label: 'Arrecadamentos',
                        backgroundColor: 'transparent',
                        borderColor: 'green',
                        data: meses_anos.map((meses,index)=>{
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
                        data: [5, 10, 3, 1, 21, 20, 20]}]
                        }} options={{title:{
                            display:true,
                            fontSize:30,
                            text: "Arrecadamentos e dispesas"}}}/>

                     <Doughnut data={{
                        datasets:[{
                            backgroundColor: ['green','red','black','yellow','blue'],
                            data:[38,7,40,9,10],
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